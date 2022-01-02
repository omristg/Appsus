import { NotePreview } from './NotePreview.jsx'

export function PinnedNotes(props) {

    const { notes } = props

    if (!notes.length) return <React.Fragment />

    return (
        <section className="pinned-notes">
            <h3>Pinned Notes</h3>
            <div className="notes-container">
                {notes.map(note => {
                    return <NotePreview {...props} note={note} key={note.id} />
                })}
            </div>
                <h3>latest Notes</h3>
        </section>
    )
}
