import React from 'react';

class NoteForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: '', author: props.author[0].id, project: props.project[0].id }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createNote(this.state.text, this.state.author, this.state.project)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>

                <div className="form-group">
                    <label htmlFor="author">author</label>
                    <select name="author" className='form-control' onChange={(event) => this.handleChange(event)}>
                        {this.props.author.map((item) => <option value={item.id}>{item.first_name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="project">project</label>
                    <select name="project" className='form-control' onChange={(event) => this.handleChange(event)}>
                        {this.props.project.map((item) => <option value={item.id}>{item.name}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label for="text">text</label>
                    <input type="text" className="form-control" name="text" value={this.state.text}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default NoteForm;