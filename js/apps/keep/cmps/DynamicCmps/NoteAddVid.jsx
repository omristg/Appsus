import { noteService } from "../../services/note.service.js";
import { YoutubeOptsModal } from "../YoutubeOptsModal.jsx";

export class NoteAddVid extends React.Component {
    state = {
        searchVal: '',
        isYBOptsModalOpen: false
    }

    inputRef = React.createRef()

    componentDidMount() {
        this.inputRef.current.focus()
    }
    

    onToggleYTVideosModal = (val) => {
        this.setState({ isYBOptsModalOpen: val })
    }


    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ ...prevState, [field]: value }))
    }

    onSubmit = (ev) => {
        ev.preventDefault();
        this.onToggleYTVideosModal(true)
    }

    createNoteToSave = (videoId) => {
        console.log(videoId);
        const noteToSave =
        {
            id: null,
            type: 'note-vid',
            isPinned: false,
            info: { videoId: videoId }
        }
        noteService.saveNote(noteToSave)
            .then(this.props.loadNotes())
            .then(this.onToggleYTVideosModal(false))
            
    }


    clearForm = () => {
        this.setState({ searchVal: '' })
        // this.props.onToggleIsTypeSelected()
    }

    render() {

        const { searchVal, isYBOptsModalOpen } = this.state
        const { onToggleIsTypeSelected } = this.props

        return (
            <section className="note-add-vid item-center">
                <h4>Search Youtube videos</h4>
                <form onSubmit={this.onSubmit}>
                    <input type="text" ref={this.inputRef} placeholder="search" name="searchVal" value={searchVal} onChange={this.handleChange} />
                </form>
                <div className="btns-container">
                    <button onClick={this.onSubmit}>Enter</button>
                    <button onClick={onToggleIsTypeSelected}>Cancel</button>
                </div>
                {isYBOptsModalOpen && <YoutubeOptsModal createNoteToSave={this.createNoteToSave} 
                onToggleYTVideosModal={this.onToggleYTVideosModal} searchVal={searchVal} />}
            </section>
        )
    }
}