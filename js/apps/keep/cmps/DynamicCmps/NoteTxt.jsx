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
                <div className="note-txt">
                    <div>{note.info.txt}</div>
                </div>
                <div className="note-btns-fa-container">
                    <button className="fa trash" onClick={() => onRemoveNote(note)}></button>
                    <button className="fa edit-filled" onClick={this.onToggleNoteSelected} ></button>
                </div>
            </section>
        )


        else return (
            <section className="note-preview" >
                <div className="note-txt">
                    <form className="note-txt-form">
                        <textarea name="txt" cols="20" rows="10"
                            value={txt} onChange={this.handleChange}
                        ></textarea>
                    </form>
                </div>
                <div className="note-btns-fa-container">
                    <button className="fa trash" onClick={() => onRemoveNote(note)}></button>
                    <button className="fa edit-filled" onClick={this.onToggleNoteSelected} ></button>
                    {isNoteSelected && <button className="fa-solid check" onClick={this.onSubmitEdit}></button>}
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