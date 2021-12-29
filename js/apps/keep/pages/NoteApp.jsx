import { noteSerive } from '../services/note.service.js';
import { Loader } from '../../../cmps/Loader.jsx';

import { NoteDetails } from './NoteDetails.jsx';
import { NoteFilter } from '../cmps/NoteFilter.jsx';
import { NoteList } from '../cmps/NoteList.jsx';

export class NoteApp extends React.Component {
    state = {
        notes: null,
        filterBy: null,
        selectedNote: null
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadNotes)
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        const { filterBy } = this.state
        noteSerive.query(filterBy)
            .then(notes => this.setState({ notes }))
    }

    onSelectNote = (selectedNote) => {
        console.log(selectedNote);
        this.setState({ selectedNote })
    }

    onGoBack = () => {
        this.setState({ selectedNote: null })
    }

    onRemoveNote = (note) => {
        noteSerive.removeNote(note.id).then(this.loadNotes())
    }

    render() {
        const { notes, selectedNote } = this.state
        if (!notes) return <Loader />
        return (
            <section className="note-app">
                <h2>Keep</h2>
                <NoteFilter onSetFilter={this.onSetFilter} />
                <NoteList onSelectNote={this.onSelectNote} onRemoveNote={this.onRemoveNote} notes={notes} />
                {selectedNote && <NoteDetails note={selectedNote} onGoBack={this.onGoBack} />}
            </section>
        )
    }
}