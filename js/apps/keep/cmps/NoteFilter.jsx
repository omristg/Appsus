import { NoteAddSelector } from '../cmps/DynamicCmps/NoteAddSelector.jsx';

export class NoteFilter extends React.Component {
    state = {
        filterBy: {
            type: ''
        }
    }

    componentDidMount() {
        console.log(this.props);
    }
    
    
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filterBy.type)
        })
    }

    onSubmitFilter = (ev) => {
        ev.preventDefault()
    }

    render() {

        const { type } = this.state.filterBy
        const { loadNotes } = this.props

        return (
            <section className="note-filter">
                {/* <h4>Filter Notes</h4> */}
                <form onSubmit={this.onSubmitFilter}>
                    <label htmlFor="by-type"> Filter By Type: </label>
                    <select name="type" id="by-type" value={type} onChange={this.handleChange}>
                        <option value="note-txt">Text</option>
                        <option value="note-todos">Todos</option>
                        <option value="note-img">Images</option>
                        <option value="">All</option>
                    </select>
                </form>
                <NoteAddSelector loadNotes={loadNotes} />
            </section>
        )
    }
}