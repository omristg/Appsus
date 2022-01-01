import { noteService } from '../services/note.service.js';
import { Loader } from '../../../cmps/Loader.jsx';

import { NoteAddSelector } from '../cmps/DynamicCmps/NoteAddSelector.jsx';
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
        noteService.query(filterBy)
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
        noteService.removeNote(note.id).then(this.loadNotes())
    }

    render() {
        const { notes } = this.state
        if (!notes) return <Loader />
        return (
            <section className="note-app">
                 <NoteAddSelector loadNotes={this.loadNotes} />
                <NoteFilter onSetFilter={this.onSetFilter} />
                <NoteList onSelectNote={this.onSelectNote} loadNotes={this.loadNotes} onRemoveNote={this.onRemoveNote} notes={notes} />
            </section>
        )
    }
}

