import { noteService } from "../../services/note.service.js";

export class NoteTodos extends React.Component {
    state = {
        isNoteSelected: false,
        note: this.props.note,
        txtInput: ''
    }

    onToggleNoteSelected = () => {
        const { isNoteSelected } = this.state
        if (isNoteSelected) this.clearForm()
        this.setState({ isNoteSelected: !isNoteSelected })

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

    render() {

        const { note, onRemoveNote } = this.props
        const { label, todos } = note.info
        const { isNoteSelected, txtInput } = this.state

        return (
            <div className="note-preview" >
                <h4>{label}</h4>
                <ul className="note-todos clean-list">
                    {todos.map((todo, idx) => {
                        return (
                            <li key={idx} >
                                <span className={todo.doneAt ? 'todo-done' : ''} onClick={() => { this.onSetTodoDone(idx) }}>{todo.txt}</span>
                                <button className="fa times" onClick={() => { this.onRemoveTodo(idx) }}></button>
                            </li>)
                    })}
                </ul>
                {isNoteSelected && <form onSubmit={this.onSubmit}>
                    <input type="text" name="txtInput" value={txtInput} onChange={this.handleChange} />
                    <button className="fa-solid plus" onSubmit={this.onSubmit}></button>
                </form>}
                <div className="todos-btns-container">
                    <button className="fa trash" onClick={() => onRemoveNote(note)}></button>
                    {/* <button className="fa edit-filled" onClick={this.onToggleNoteSelected}> {!isNoteSelected ? 'Add' : 'Cancel'} </button> */}
                    {!isNoteSelected && <button className="fa edit-filled" onClick={this.onToggleNoteSelected}></button>}
                    {isNoteSelected && <button className="fa-solid close-filled" onClick={this.onToggleNoteSelected}></button>}

                </div>
            </div>
        )

    }
}

