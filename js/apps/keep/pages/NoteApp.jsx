import { noteService } from '../services/note.service.js';
import { Loader } from '../../../cmps/Loader.jsx';

import { NoteDetails } from '../../keep/pages/NoteDetails.jsx'

import { NoteFilter } from '../cmps/NoteFilter.jsx';
import { NoteList } from '../cmps/NoteList.jsx';

const { Route } = ReactRouterDOM

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
        const { notes, selectedNote } = this.state
        if (!notes) return <Loader />
        return (
            <section className="note-app">
                <NoteFilter onSetFilter={this.onSetFilter} />
                <NoteList onSelectNote={this.onSelectNote} onRemoveNote={this.onRemoveNote} notes={notes} />
                {/* {selectedNote && <Route component={NoteDetails} path="/note/:noteId"></Route>} */}
                

            </section>
        )
    }
}

