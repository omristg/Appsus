import { NotePreview } from './NotePreview.jsx'

export function NoteList(props) {

    const { notes } = props

    if (!notes.length) return <h3>There are no notes to show!</h3>

    return (
        <section className="note-list">
            {notes.map(note => {
                return <NotePreview {...props} note={note} key={note.id} />
            })}
        </section>
    )
}
