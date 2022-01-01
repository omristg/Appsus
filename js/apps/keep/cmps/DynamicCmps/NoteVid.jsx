import { noteService } from "../../services/note.service.js"
import { ColorInput } from "./ColorInput.jsx"

export class NoteVid extends React.Component {
    state = {
        note: this.props.note,
        style: this.props.note.styles,
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

        const { onRemoveNote, note } = this.props
        const { videoId } = this.props.note.info
        const { isColorInputShown, styles } = this.state



        return (
            <section style={styles} className="note-preview">
                 <button className="btn-pin fa-solid pin" onClick={this.onToggleIsNotePinned}></button>
                <div className="note-vid">
                    <iframe src={`https://www.youtube.com/embed/${videoId}`}
                        frameBorder="0"
                        width="420" height="315"
                        allowFullScreen="1"

                    >
                    </iframe>
                </div>
                <div className="note-btns-fa-container">
                    <button className="fa trash" onClick={() => { onRemoveNote(note) }}></button>
                    <button className="fa-solid color" onClick={this.onToggleColorInput} ></button>
                    <button className="fa clone" onClick={this.onDuplicateNote}></button>
                </div>
                {isColorInputShown && <ColorInput onChangeNoteColor={this.onChangeNoteColor} />}
            </section>
        )
    }
}


 // <iframe src={`https://www.youtube.com/embed/${embedURL(videoId)}`}

// const embedURL = (url) => {
//     return url.replace('https://www.youtube.com/embed/', '')
// }
