import { noteService } from "../../services/note.service.js";


export class NoteTxt extends React.Component {
    state = {
        isNoteSelected: false,
        txt: this.props.note.info.txt

    }

    onToggleNoteSelected = () => {
        this.setState({ isNoteSelected: !this.state.isNoteSelected })
    }

    handleChange = ({ target }) => {
        console.log(this.props.note);
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ ...prevState, [field]: value }))
    }

    onSubmitEdit = (ev) => {
        ev.preventDefault();
        const { txt } = this.state
        let { note } = this.props
        note.info.txt = txt
        noteService.saveNote(note).then(this.props.loadNotes())
        this.onToggleNoteSelected()
    }

    render() {

        const { note, onRemoveNote } = this.props
        const { isNoteSelected, txt } = this.state

        if (!isNoteSelected) return (
            <section className="note-preview">
                <div>{note.info.txt}</div>
                <div className="note-btns-container">
                    <button className="fa trash" onClick={() => onRemoveNote(note)}></button>
                    <button onClick={this.onToggleNoteSelected} >edit</button>
                </div>
            </section>
        )


        else return (
            <section className="note-preview" >
                <form className="note-txt-form">
                    <textarea name="txt" cols="20" rows="10"
                     value={txt} onChange={this.handleChange}
                    ></textarea>
                </form>
                <div className="note-btns-container">
                    <button className="fa trash" onClick={() => onRemoveNote(note)}></button>
                    <button onClick={this.onToggleNoteSelected} >edit</button>
                    {isNoteSelected && <button onClick={this.onSubmitEdit}>enter</button>}
                </div>

            </section>
        )
    }
}




















{/* <Link to={`/note/${note.id}`} onClick={() => props.onSelectNote(note)}>
<div className="note-preview">
    {note.info.txt}
    <button className="fa trash" onClick={() => onRemoveNote(note)}></button>
</div>
</Link> */}