
export function NoteVid(props) {

    const { onRemoveNote, note } = props
    const { videoId } = props.note.info

    const embedURL = (url) => {
        return url.replace('https://www.youtube.com/embed/', '')
    }

    return (
        <section className="note-preview">
            <div className="note-vid">
                <iframe src={`https://www.youtube.com/embed/${embedURL(videoId)}`}
                    frameBorder="0"
                    width="420" height="315"
                    allowFullScreen="1"

                >
                </iframe>
            </div>
            <div className="note-btns-fa-container">
                <button className="fa trash" onClick={() => { onRemoveNote(note) }}></button>
            </div>
        </section>
    )
}
