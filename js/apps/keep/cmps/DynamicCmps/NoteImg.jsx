import { noteService } from "../../services/note.service.js"
import { ColorInput } from "./ColorInput.jsx"

export class NoteImg extends React.Component {
    state = {
        note: this.props.note,
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

    onToggleColorInput = () => {
        this.setState({ isColorInputShown: !this.state.isColorInputShown })
    }

    onToggleIsNotePinned = () => {
        const { note } = this.state
        note.isPinned = !note.isPinned;
        console.log(note);
        noteService.saveNote(note).then(this.props.loadNotes())
    }


    onDuplicateNote = () => {
        const { note } = this.state
        noteService.duplicateNote(note)
            .then(this.props.loadNotes())
    }


    render() {

        const { note, onRemoveNote } = this.props
        const { info } = this.props.note
        const { styles, isColorInputShown } = this.state

        return (
            <section style={styles} className="note-preview" >
                <button className="btn-pin fa-solid pin" onClick={this.onToggleIsNotePinned}></button>
                <h4>{info.title}</h4>
                <div className="note-img-container">
                    <img src={info.url} alt="" />
                </div>
                <div className="note-btns-fa-container">
                    <button className="fa trash" onClick={() => onRemoveNote(note)}></button>
                    <button className="fa-solid color" onClick={this.onToggleColorInput} ></button>
                    <button title="Duplicate" className="fa clone" onClick={this.onDuplicateNote}></button>
                </div>
                {isColorInputShown && <ColorInput onChangeNoteColor={this.onChangeNoteColor} />}
            </section>
        )
    }
}
