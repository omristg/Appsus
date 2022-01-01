import { noteService } from "../../services/note.service.js";
import { ColorInput } from "./ColorInput.jsx";

export class NoteTodos extends React.Component {
    state = {
        isNoteSelected: false,
        note: this.props.note,
        txtInput: '',
        isColorInputShown: false,
        styles: this.props.note.styles
    }

    onToggleIsNotePinned = () => {
        const { note } = this.state
        note.isPinned = !note.isPinned
        noteService.saveNote(note).then(this.props.loadNotes())
    }


    onToggleNoteSelected = () => {
        const { isNoteSelected } = this.state
        if (isNoteSelected) this.clearForm()
        this.setState({ isNoteSelected: !isNoteSelected })
    }

    onToggleColorInput = () => {
        this.setState({ isColorInputShown: !this.state.isColorInputShown })
    }

    onSetTodoDone = (idx) => {
        let { note } = this.state
        let selectedLine = note.info.todos[idx]
        selectedLine.doneAt = (selectedLine.doneAt) ? null : Date.now()
        noteService.saveNote(note)
            .then(this.props.loadNotes())
    }

    onRemoveTodo = (idx) => {
        let { note } = this.state
        note.info.todos.splice(idx, 1)
        console.log(note);
        noteService.saveNote(note)
            .then(this.props.loadNotes())
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ ...prevState, [field]: value }))
    }


    onSubmit = (ev) => {
        ev.preventDefault();
        const { txtInput } = this.state
        const noteToSave = this.createNotetoSave(txtInput)
        noteService.saveNote(noteToSave)
            .then(this.props.loadNotes())
            .then(this.clearForm())
    }

    createNotetoSave(txtInput) {
        let { note } = this.state
        note.info.todos.push({ txt: txtInput, doneAt: null })
        return note
    }

    clearForm = () => {
        this.setState({ txtInput: '' })
        this.setState({ isNoteSelected: !this.state.isNoteSelected })
    }

    
    onChangeNoteColor = (field, value) => {
        this.onToggleColorInput()
        this.setState((prevState) => ({ styles: { ...prevState.styles, [field]: value } }))
        const { note } = this.state
        const noteToSave = { ...note, styles: { [field]: value } }
        noteService.saveNote(noteToSave).then(this.props.loadNotes())
    }

    onDuplicateNote = () => {
        const {note} = this.state
        noteService.duplicateNote(note)
        .then(this.props.loadNotes())
    }

    
    render() {

        const { note, onRemoveNote } = this.props
        const { label, todos } = note.info
        const { isNoteSelected, txtInput, styles } = this.state
        const { isColorInputShown } = this.state

        return (
            <section style={styles} className="note-preview" >
                  <button className="btn-pin fa-solid pin" onClick={this.onToggleIsNotePinned}></button>
                <h4>{label}</h4>
                <ul className="note-todos clean-list">
                    {todos.map((todo, idx) => {
                        return (
                            <li key={idx} >
                                <span className={todo.doneAt ? 'todo-done' : ''} onClick={() => { this.onSetTodoDone(idx) }}>{todo.txt}</span>
                                <button className="fa times" onClick={() => { this.onRemoveTodo(idx) }}></button>
                            </li>)
                    })}
                    {isNoteSelected && <form onSubmit={this.onSubmit}>
                        <input type="text" name="txtInput" value={txtInput} onChange={this.handleChange} />
                        <button className="fa-solid plus" onSubmit={this.onSubmit}></button>
                    </form>}
                </ul>
                <div className="note-btns-fa-container">
                    <button className="fa trash" onClick={() => onRemoveNote(note)}></button>
                    <button className={!isNoteSelected ? 'fa edit-filled' : 'fa-solid close-filled'} onClick={this.onToggleNoteSelected}></button>
                    <button className="fa-solid color" onClick={this.onToggleColorInput} ></button>
                    <button className="fa clone" onClick={this.onDuplicateNote}></button>
                </div>
                {isColorInputShown && <ColorInput onChangeNoteColor={this.onChangeNoteColor} />}
            </section>
        )

    }
}

