export class NoteFilter extends React.Component {
    state = {
        filterBy: {
            type: ''
        }
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

        return (
            <section className="note-filter">
                <h4>Filter Notes</h4>
                <form onSubmit={this.onSubmitFilter}>
                    <label htmlFor="by-type">By Type: </label>
                    <select name="type" id="by-type" value={type} onChange={this.handleChange}>
                        <option value="note-txt">Text</option>
                        <option value="note-todos">Todos</option>
                        <option value="note-img">Images</option>
                    </select>
                </form>
            </section>
        )
    }
}