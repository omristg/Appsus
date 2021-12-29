
export class NoteDetails extends React.Component {


    render() {
        const { note } = this.props
        return (
            <section className="note-details">
                <h3>{note.info.txt}</h3>
            </section>
        )
    }
}