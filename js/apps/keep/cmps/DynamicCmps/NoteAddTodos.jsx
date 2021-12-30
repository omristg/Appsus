import { noteService } from "../../services/note.service.js"

export class NoteAddTodos extends React.Component {
    state = {
        titleInput: '',
        todosInput: ''
    }


    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ ...prevState, [field]: value }))
    }

    onSubmit = (ev) => {
        ev.preventDefault();
        const { titleInput, todosInput } = this.state
        const noteToSave = this.createNotetoSave(titleInput, todosInput)
        noteService.saveNote(noteToSave)
            .then(this.props.loadNotes())
            .then(this.clearForm())
    }

    createNotetoSave(titleInput, todosInput) {
        const todosTxts = todosInput.split(',')
        const todos = todosTxts.map(todoTxt => { return { txt: todoTxt, donaAt: null } })
        return {
            id: null,
            type: 'note-todos',
            info: {
                label: titleInput,
                todos: todos
            }
        }
    }

    clearForm = () => {
        this.setState({ titleInput: '', todosInput: '' })
        this.props.onToggleIsTypeSelected()
    }

    render() {
        const { titleInput, todosInput } = this.state
        const { onToggleIsTypeSelected } = this.props

        return (
            <section className="note-add-todos item-center">
                <h4>What do you need to do?</h4>
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="titleInput" value={titleInput}
                        onChange={this.handleChange}
                    />
                    <input type="text" name="todosInput" value={todosInput}
                        onChange={this.handleChange}
                    />
                </form>
                <div className="btns-container">
                    <button onClick={this.onSubmit}>Add</button>
                    <button onClick={onToggleIsTypeSelected}>Cancel</button>
                </div>
            </section>
        )
    }
}