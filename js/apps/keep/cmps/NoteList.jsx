import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, onSelectNote, onRemoveNote }) {

    if (!notes.length) return <h3>There are no notes to show!</h3>

    return (
        <section className="note-list">
            {notes.map(note => {
                return <NotePreview onSelectNote={onSelectNote} onRemoveNote={onRemoveNote} note={note} key={note.id} />
            })}
        </section>
    )
}