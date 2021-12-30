const { Link } = ReactRouterDOM

export function NoteTxt(props) {

    const { note, onRemoveNote } = props
    // console.log(note);
    // console.log(todos);
    return (
        <Link to={`/note/${note.id}`} onClick={() => props.onSelectNote(note)}>
            <div className="note-preview">
                {note.info.txt}
                <button className="fa trash" onClick={() => onRemoveNote(note)}></button>
            </div>
        </Link>
    )
}


