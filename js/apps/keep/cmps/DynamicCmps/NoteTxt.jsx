export function NoteTxt(props) {

    const { note, onRemoveNote } = props
    // console.log(note);
    // console.log(todos);
    return (
        <div onClick={() => props.onSelectNote(note)} className="note-preview">
            {note.info.txt}
            <button onClick={() => onRemoveNote(note)}>Delete</button>
        </div>
    )
}


