import { noteService } from '../../services/note.service.js'

export class NoteAddImg extends React.Component {
    state = {
        inputURL: '',
        inputTitle: ''
    }

    inputRef = React.createRef()

    componentDidMount() {
        this.inputRef.current.focus()
    }


    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ ...prevState, [field]: value }))
    }

    onSubmit = (ev) => {
        ev.preventDefault();
        const { inputURL, inputTitle } = this.state
        const noteToSave = this.createNotetoSave(inputURL, inputTitle)
        console.log(noteToSave);
        noteService.saveNote(noteToSave)
            .then(this.props.loadNotes())
            .then(this.clearForm())
    }

    clearForm = () => {
        this.setState({ inputURL: '' })
        this.props.onToggleIsTypeSelected()
    }

    createNotetoSave = (inputURL, inputTitle) => {
        return {
            id: null,
            type: 'note-img',
            isPinned: false,
            info: { url: inputURL, title: inputTitle }
        }
    }


    render() {

        const { inputURL, inputTitle } = this.state
        const { onToggleIsTypeSelected } = this.props

        return (
            <section className="note-add-img item-center">
                <h4>Enter image URL</h4>
                <form>
                    <input type="text" ref={this.inputRef} placeholder="Image Title" name="inputTitle" value={inputTitle} onChange={this.handleChange} />
                    <input type="text" placeholder="URL" name="inputURL" value={inputURL} onChange={this.handleChange} />
                </form>
                <div className="btns-container">
                    <button onClick={this.onSubmit}>Add</button>
                    <button onClick={onToggleIsTypeSelected}>Cancel</button>
                </div>
            </section>
        )
    }
}