import { bookService } from "../services/book.service.js"
import { BooksSearchOpts } from "./BooksSearchOpts.jsx"
import { eventBusService } from "../../../services/event-bus.service.js";

export class BookAdd extends React.Component {
    state = {
        search: '',
        booksOpts: []
    }

    onSubmitSearch = (ev) => {
        ev.preventDefault();
        const { search } = this.state
        if (!search) return
        bookService.searchBooks(search).then(booksOpts => {
            this.setState({ booksOpts })
        });

    }

    onAddBook = (idx) => {
        const selectedBook = this.state.booksOpts[idx]
        console.log(selectedBook);
        bookService.addBook(selectedBook)
            .then(this.cleanForm)
            .then(eventBusService.emit('user-msg', { txt: 'Book Added!', type: 'success' }))
            .then(this.props.loadBooks())
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({ ...prevState, [field]: value }))
    }



    cleanForm = () => {
        this.setState({ search: '', booksOpts: [] })
    }

    render() {

        const { search, booksOpts } = this.state
        return (
            <section onSubmit={this.onSubmitSearch} className="book-add" >
                <form>
                    <label htmlFor="search">Search Books </label>
                    <input type="text"
                        id="search"
                        name="search"
                        value={search}
                        onChange={this.handleChange} />
                    <button onSubmit={this.onSubmitSearch} >Search</button>
                </form>


                {booksOpts.length > 0 && <BooksSearchOpts onAddBook={this.onAddBook} booksOpts={booksOpts} />}

            </section >
        )
    }
}