
export class BookFilter extends React.Component {
    state = {
        filterBy: {
            name: '',
            minPrice: '',
            maxPrice: ''
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    onSubmitFilter = (ev) => {
        ev.preventDefault();
        this.props.onSetFilter(this.state.filterBy)
        this.cleanForm()
    }

    cleanForm = () => {
        this.setState({ filterBy: { name: '', minPrice: '', maxPrice: '' } })
    }

    render() {
        const { name, minPrice, maxPrice } = this.state.filterBy
        return (
            <form className="book-filter" onSubmit={this.onSubmitFilter}>
                {/* <label htmlFor="by-name">By Name: </label> */}
                <input
                    type="text"
                    id="by-name"
                    name="name"
                    placeholder="Enter book name"
                    value={name}
                    onChange={this.handleChange}
                />
                {/* <label htmlFor="by-min-price">Minimun Price: </label> */}
                <input
                    type="number"
                    id="by-min-price"
                    name="minPrice"
                    placeholder="Enter minimum price"
                    value={minPrice}
                    onChange={this.handleChange}
                />
                {/* <label htmlFor="by-max-price">Maximum Price: </label> */}
                <input
                    type="number"
                    id="by-max-price"
                    name="maxPrice"
                    placeholder="Enter maximum price"
                    value={maxPrice}
                    onChange={this.handleChange}
                />

                {/* <button onClick={this.onSubmitFilter} >Filter</button> */}
            </form>
        )
    }
}