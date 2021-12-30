import { noteService } from "../../services/note.service.js"

export class NoteAddTxt extends React.Component {
    state = {
        txt: ''
    }

    componentDidMount() {
        console.log(this.props);
    }


    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ ...prevState, [field]: value }))
        console.log(this.state.txt);
    }


    onSubmit = (ev) => {
        ev.preventDefault();
        const { txt } = this.state
        const noteToSave = this.createNotetoSave(txt)
        console.log(noteToSave);
        noteService.saveNote(noteToSave)
            .then(this.props.loadNotes())
            .then(this.clearForm())
    }

    clearForm = () => {
        this.setState({ txt: '' })
        this.props.onToggleIsTypeSelected()
    }

    createNotetoSave = (txt) => {
        return {
            id: null,
            type: 'note-txt',
            isPinned: false,
            info: { txt: txt }
        }
    }


    render() {

        const { txt } = this.state

        return (
            <section className="note-add-txt item-center">
                <h4>Write something</h4>
                <form onSubmit={this.onSubmit}>
                    <textarea name="txt" cols="30" rows="10"
                        value={txt} onChange={this.handleChange}
                    ></textarea>
                    <button onSubmit={this.onSubmit}>Add</button>
                </form>
            </section>
        )
    }
}