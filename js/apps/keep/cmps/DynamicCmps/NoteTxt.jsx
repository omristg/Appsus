import { noteService } from "../../services/note.service.js";
import { ColorInput } from "./ColorInput.jsx";


export class NoteTxt extends React.Component {
    state = {
        note: this.props.note,
        isNoteSelected: false,
        txt: this.props.note.info.txt,
        styles: this.props.note.styles,
        isColorInputShown: false
    }

    onChangeNoteColor = (field, value) => {
        this.onToggleColorInput()
        this.setState((prevState) => ({ styles: { ...prevState.styles, [field]: value } }))
        const { note } = this.state
        const noteToSave = { ...note, styles: { [field]: value } }
        noteService.saveNote(noteToSave).then(this.props.loadNotes())
    }

    onToggleIsNotePinned = () => {
        const { note } = this.state
        note.isPinned = !note.isPinned;
        console.log(note);
        noteService.saveNote(note).then(this.props.loadNotes())
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

    onToggleColorInput = () => {
        this.setState({ isColorInputShown: !this.state.isColorInputShown })
    }

    onDuplicateNote = () => {
        const { note } = this.state
        noteService.duplicateNote(note)
            .then(this.props.loadNotes())
    }

    render() {

        const { note, onRemoveNote } = this.props
        const { isNoteSelected, txt, isColorInputShown, styles } = this.state


        if (!isNoteSelected) return (
            <section style={styles} className="note-preview">
                <button className="btn-pin fa-solid pin" onClick={this.onToggleIsNotePinned}></button>
                <div className="note-txt">
                    <div>{note.info.txt}</div>
                </div>
                <div className="note-btns-fa-container">
                    <button className="fa trash" onClick={() => onRemoveNote(note)}></button>
                    <button className="fa edit-filled" onClick={this.onToggleNoteSelected} ></button>
                    <button className="fa-solid color" onClick={this.onToggleColorInput} ></button>
                    <button className="fa clone" onClick={this.onDuplicateNote}></button>
                </div>
                {isColorInputShown && <ColorInput onChangeNoteColor={this.onChangeNoteColor} />}
            </section>
        )


        else return (
            <section style={styles} className="note-preview" >
                <div className="note-txt">
                    <form className="note-txt-form">
                        <textarea name="txt" cols="20" rows="10"
                            value={txt} onChange={this.handleChange}
                        ></textarea>
                        <button className="fa-solid check btn-enter-edit" onClick={this.onSubmitEdit}></button>
                    </form>
                </div>
                <div className="note-btns-fa-container">
                    <button className="fa trash" onClick={() => onRemoveNote(note)}></button>
                    <button className="fa-solid close-filled" onClick={this.onToggleNoteSelected} ></button>
                </div>
            </section>
        )
    }
}


