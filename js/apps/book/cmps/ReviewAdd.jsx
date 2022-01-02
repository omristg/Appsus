

export class ReviewAdd extends React.Component {
    state = {
        review: {
            fullName: 'Books Reader',
            rate: 0,
            readAt: new Date,
            content: ''
        }
    }

    componentDidMount() {
        console.log(this.props);
    }
    
    
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ review: { ...prevState.review, [field]: value } }))
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        this.onAddReview()
        this.clearForm()
    }

    clearForm = () => {
        this.setState({
            review: {
                fullName: 'Books Reader',
                rate: 0,
                readAt: '',
                content: ''
            }
        })
    }

    onAddReview = () => {
        const { review } = this.state
        this.props.onAddReview(review)
        this.clearForm()
    }

    render() {

        const { fullName, content, readAt, rate } = this.state.review
        const {onToggleReviewModal} = this.props

        return (
            <section className="review-add item-center">
                <h2>Add Review</h2>
                <form onSubmit={this.onSubmit}>
                    <label htmlFor="reader-name">Full name: </label>
                    <input
                        type="text"
                        id="reader-name"
                        name="fullName"
                        placeholder="Enter your name"
                        value={fullName}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="rate">Rating</label>
                    <select id="rate" name="rate" value={rate} onChange={this.handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <input type="date" name="readAt" value={readAt} onChange={this.handleChange} />
                    <label htmlFor="review-text"></label>
                    <textarea
                        name="content"
                        value={content}
                        id="review-text"
                        cols="30" rows="10"
                        onChange={this.handleChange}
                    >
                    </textarea>
                </form>
                <button onClick={this.onAddReview}>Add Review</button>
                <button onClick={onToggleReviewModal}>Canel</button>
            </section>
        )
    }
}