import { noteService } from "../../services/note.service.js"

export class NoteAddTxt extends React.Component {
    state = {
        txt: ''
    }


    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ ...prevState, [field]: value }))
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
        const { onToggleIsTypeSelected } = this.props

        return (
            <section className="note-add-txt item-center">
                <h4>Write something</h4>
                <form onSubmit={this.onSubmit}>
                    <textarea name="txt" cols="30" rows="10"
                        value={txt} onChange={this.handleChange}
                    ></textarea>
                </form>
                <div className="btns-container">
                    <button onClick={this.onSubmit}>Add</button>
                    <button onClick={onToggleIsTypeSelected}>Cancel</button>
                </div>
            </section>
        )
    }
}