import { NoteTodoSingle } from './NoteTodoSingle.jsx'

export function NoteTodos(props) {

    const { note, onRemoveNote } = props
    // console.log(note);

    return (
        <div className="note-preview" >
            <h4>{note.info.label}</h4>
            <ul className="note-todos">
                {note.info.todos.map((todo, idx) => {
                    return <NoteTodoSingle key={idx} idx={idx} todo={todo} />
                })}
            </ul>
            <button onClick={() => onRemoveNote(note)}>Delete</button>
        </div>
    )
}

