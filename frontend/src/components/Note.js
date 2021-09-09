import React from 'react';
import {Link} from "react-router-dom";

const NoteItem = ({note, deleteNote}) => {
  return (
      <tr>
          <td>
              {note?.project}
          </td>
          <td>
              {note?.author}
          </td>
          <td>
              {note?.text}
          </td>
          <td>
              {note?.created_at}
          </td>
          <td>
              {note?.updated_at}
          </td>
          <td>
                <button onClick={() => deleteNote(todo.id)} type='button'>Delete</button>
            </td>
      </tr>
  )
};

const NoteList = ({items, deleteNote}) => {
    return (
       <div>
       <table>
           <th>
               Текст
           </th>
           <th>
               Дата создания
           </th>
           <th>
               Состояние
           </th>
           <th>
               Автор
           </th>
           <th>
           </th>
           {items.map((item) => <NoteItem todo={item} deleteNote={deleteNote}/>)}
       </table>
            <Link to='/todos/create'>Create</Link>
        </div>
   )
};

export default NoteList;