import { Loader } from "../../../cmps/Loader.jsx"
import { noteService } from "../services/note.service.js"

export class YoutubeOptsModal extends React.Component {
    state = {
        searchResults: null
    }

    componentDidMount() {
        const { searchVal } = this.props
        this.getYTVideosOpts(searchVal)
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log(prevProps.searchVal);
        // console.log(this.props.searchVal);
        if (prevProps.searchVal !== this.props.searchVal) {
            this.getYTVideosOpts()
        }
    }

    onSelectVid = (videoId) => {
        this.props.createNoteToSave(videoId)
        // this.props.onToggleYTVideosModal(false)
    }

    getYTVideosOpts(searchVal) {
        noteService.getYTVideosOpts(searchVal)
        .then((recievedData) => {
            this.setState({ searchResults: recievedData })
        })
    }

    render() {

        const { searchResults } = this.state

        if (!searchResults) return <Loader />

        return (
            <section className="youtube-opts-modal">
                {searchResults.map(result => {
                    const { videoId } = result.id
                    const { url } = result.snippet.thumbnails.default
                    const { title } = result.snippet
                    return (
                        <div className="video-search-opt" key={videoId}
                            onClick={() => { this.onSelectVid(videoId) }}>
                            <span>{title}</span>
                            <div className="img-container">
                                <img src={`${url}`} alt="" />
                            </div>
                        </div>
                    )
                })}
            </section>
        )
    }
}