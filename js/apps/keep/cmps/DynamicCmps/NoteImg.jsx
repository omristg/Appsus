export function NoteImg(props) {

    // console.log(note);
    const { note, onRemoveNote } = props
    const { info } = props.note
    return (
        <div className="note-preview" >
            <h4>{info.title}</h4>
            <div className="note-img-container">
                <img src={info.url} alt="" />
            </div>
            <button onClick={() => onRemoveNote(note)}>Delete</button>
        </div>
    )
}