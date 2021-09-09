import './App.css';
import React from 'react';
import {HashRouter as Router, Switch, Route, Link} from "react-router-dom";
import axios from "axios";
import Footer from "./components/Footer";
import UserList from "./components/User";
import ProjectList from "./components/Project";
import NoteList from "./components/Note";
import LoginForm from "./components/Auth";
import Cookies from "universal-cookie";
import ProjectForm from "./components/ProjectForm";
import NoteForm from "./components/NoteForm";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        'users': [],
        'projects': [],
        'notes': []
    }
  }

  set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.get_data())
  }

  is_auth() {
        return !!this.state.token
  }

  logout() {
      this.set_token('')
  }

  get_token_from_storage() {
      const cookies  = new Cookies()
      const token = cookies.get('token')
      this.setState({'token': token}, () => this.get_data())
  }

  get_token(username, password) {
     axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))
  }

  get_headers() {
      let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_auth()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
  }

  get_data() {
      const headers = this.get_headers()

      axios.get('http://127.0.0.1:8000/api/1.0/users/', {headers})
       .then(response => {
           this.setState(
               {
                   'users': response.data.results
               }
           );
       }).catch(error => {
            this.setState({
                    'users': []
                })
          console.error(error)
      });

       axios.get('http://127.0.0.1:8000/api/1.0/projects/', {headers})
       .then(response => {
           this.setState(
               {
                   'projects': response.data.results
               }
           );
       }).catch(error => {
           this.setState({
                    'projects': []
                })
           console.error(error)
       });

        axios.get('http://127.0.0.1:8000/api/1.0/todos/', {headers})
       .then(response => {
           this.setState(
               {
                   'notes' : response.data.results
               }
           );
       }).catch(error => {
            this.setState({
                    'notes': []
                })
                console.error(error)
        });
  }

  deleteProject(id) {
      const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/1.0/projects/${id}`, {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item) => item.id !== id)})
            }).catch(error => console.log(error))
  }

  createProject(name, repository_url, users) {
        const headers = this.get_headers()
        const data = {name: name, repository_url: repository_url, users: [users]}
        axios.post(`http://127.0.0.1:8000/api/1.0/projects/`, data, {headers})
            .then(response => {
                let new_project = response.data
                this.setState({projects: [this.state.projects, new_project]})
            }).catch(error => console.log(error))
    }

    deleteNote(id) {
      const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/1.0/todos/${id}`, {headers})
            .then(response => {
                this.setState({notes: this.state.notes.filter((item) => item.id !== id)})
            }).catch(error => console.log(error))
    }

    createNote(text, author, project) {
        const headers = this.get_headers()
        const data = {text: text, author: author, project: project}
        axios.post(`http://127.0.0.1:8000/api/1.0/todos/`, data, {headers})
            .then(response => {
                let new_todo = response.data
                this.setState({notes: [this.state.notes, new_todo]})
            }).catch(error => console.log(error))
    }

  componentDidMount() {
      this.get_token_from_storage()
  }

  render() {
    return (
        <div className="App">
        <Router>
            <nav>
                <ul>
                    <li><Link to='/'>Users</Link></li>
                    <li><Link to='/projects'>Projects</Link></li>
                    <li><Link to='/todos'>Notes</Link></li>
                    <li>
                        {this.is_auth() ? <button onClick={() => this.logout()}>Logout</button> :
                                    <Link to='/login'>Login</Link>}
                     </li>
                </ul>
            </nav>
                <Route exact path='/projects/create' component={() => <ProjectForm users={this.state.users}
                        createProject={(name, repository_url, users) => this.createProject(name, repository_url, users)}/>}/>

                    <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}
                                                                                deleteProject={(id) => this.deleteProject(id)}/>}/>

                    <Route exact path='/todos/create' component={() => <NoteForm author={this.state.users} project={this.state.projects}
                        createTODO={(text, author, project, state) => this.createNote(text, author, project, state)}/>}/>

                    <Route exact path='/todos' component={() => <NoteList items={this.state.notes}
                                                                                deleteNote={(id) => this.deleteNote(id)}/>}/>
                    <Route exact path='/login' component={() => <LoginForm
                        get_token={(username, password) => this.get_token(username, password)}/>}/>
        </Router>
            <Footer/>
        </div>
    );
  }
}

export default App;
