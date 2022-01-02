
import { Loader } from "../../../cmps/Loader.jsx"
import { noteService } from "../services/note.service.js"


export class NoteDetails extends React.Component {

    state = {
        note: null
    }

    componentDidMount() {
        const { noteId } = this.props.match.params
        this.loadNote(noteId)
    }

    loadNote = (noteId) => {
        noteService.getNoteById(noteId).then(note => {
            if (!note) return this.props.history.push('/note')
            this.setState({ note })
        })
    }

    onGoBack = () => {
        this.props.history.push('/note')
    }

    render() {
        const { note } = this.state

        if (!note) return <Loader />

        switch (note.type) {
            case 'note-txt':
                return <NoteDetailsTxt onGoBack={this.onGoBack} note={note} />
            // case 'note-todos':
            //     return <NoteTodos {...props} />
            // case 'note-img':
            //     return <NoteImg  {...props} />

        }
    }
}

export class NoteDetailsTxt extends React.Component {

    state = {
        note: null
    }

    componentDidMount() {
        this.setState({ note: this.props.note })
    }


    render() {
        const { note } = this.state
        const { onGoBack } = this.props
        if (!note) return <Loader />

        return (
            <section className="note-details item-center">
                <section className="details-container">
                    <h3>{note.info.txt}</h3>
                    <button onClick={onGoBack}>Back</button>
                </section>
            </section>
        )
    }
}