import { LongTxt } from '../../../cmps/LongTxt.jsx'
import { Loader } from '../../../cmps/Loader.jsx';

import { bookService } from '../services/book.service.js';
import { BookCategories } from '../cmps/BookCategories.jsx';
import { ReviewAdd } from '../cmps/ReviewAdd.jsx';
import { ReviewList } from '../cmps/ReviewList.jsx';


export class BookDetails extends React.Component {
    state = {
        book: null,
        isLongTextShown: false,
        isReviewModalShown: false,
    }

    componentDidMount() {
        const { bookId } = this.props.match.params
        this.loadBook(bookId)

    }

    loadBook = (bookId) => {
        bookService.getBookById(bookId).then(book => {
            if (!book) return this.props.history.push('/')
            this.setState({ book })
        })
    }

    onGoBack = () => {
        this.props.history.push('/book')
    }

    onRemoveBook = () => {
        const { id } = this.state.book
        bookService.remove(id)
            .then(this.onGoBack())
    }

    onToggleShowText = () => {
        this.setState({ isLongTextShown: !this.state.isLongTextShown })
    }

    onToggleReviewModal = () => {
        const { isReviewModalShown } = this.state
        this.setState({ isReviewModalShown: !isReviewModalShown })
    }

    onAddReview = (review) => {
        if (!review.content) return
        const { id } = this.state.book
        bookService.addReview(id, review)
            .then(this.loadBook(id))
        this.onToggleReviewModal()
    }

    onRemoveReview = (reviewIdx) => {
        const { id } = this.state.book
        bookService.removeReview(id, reviewIdx)
            .then(this.loadBook(id))
    }

    render() {

        const { book, isLongTextShown, isReviewModalShown } = this.state
        if (!book) return <Loader />

        const { currencyCode, amount: price } = book.listPrice
        const isOnSale = book.listPrice.isOnSale
        const pageCountProp = bookService.getPageCountProp(book.pageCount)
        const publishedDateProp = bookService.getPulishedDateProp(book.publishedDate)
        const priceClass = bookService.getPriceProp(price)
        const priceFormatted = bookService.getPriceFormatted(price, currencyCode)
        const lang = bookService.getLang(book.language)
        const authors = book.authors.join(' ')

        return (
            <section className="book-details">
                <h1>{book.title}</h1>
                <main>
                    <aside>
                        <img src={book.thumbnail} alt="" />
                        {(isOnSale) && <div className="sale">Sale!</div>}
                    </aside>
                    <article>
                        <div><span className="ctgs-title">Categories: </span>  <BookCategories bookCategories={book.categories} /></div>
                        <div className={priceClass}><span >Price: </span>{priceFormatted}</div>
                        <div><span>Subtitle: </span> {book.subtitle}</div>
                        <div><span>Authors: </span>{authors}</div>
                        <div><span>Page Count: </span>{book.pageCount} {pageCountProp && <span className="book-labels">{pageCountProp}</span>}</div>
                        <div><span>Language: </span>{lang}</div>
                        <div><span>Publish Date: </span>{book.publishedDate} {publishedDateProp && <span className="book-labels">{publishedDateProp}</span>}</div>
                        <div><span>Description: </span><LongTxt text={book.description} isLongTextShown={isLongTextShown} /></div>
                        <div className="btns-container">
                            <button onClick={this.onToggleShowText}>{!isLongTextShown ? 'Show More' : 'Show Less'}</button>
                            <button onClick={this.onGoBack} >Go Back</button>
                            {/* <button onClick={this.onRemoveBook}>Delete Book</button> */}
                        </div>
                    </article>
                </main>
                <footer>
                    <ReviewList reviews={book.reviews} onRemoveReview={this.onRemoveReview} />
                    <button onClick={this.onToggleReviewModal}>{!isReviewModalShown ? 'Add Review' : 'Close Section'}</button>
                    {isReviewModalShown && <ReviewAdd onToggleReviewModal={this.onToggleReviewModal} onAddReview={this.onAddReview} />}
                </footer>
            </section >
        )
    }
}






    // get getPriceFormatted() {
    //     let localeForamt;
    //     const { currencyCode, price } = this.props.book.listPrice
    //     switch (currencyCode) {
    //         case 'EUR':
    //             localeForamt = 'fr-FR'
    //             break;
    //         case 'ILS':
    //             localeForamt = 'he-IL'
    //             break;
    //         case 'USD':
    //             localeForamt = 'en-US'
    //             break;
    //     }
    //     const priceFormatted = new Intl.NumberFormat(
    //         localeForamt, { style: 'currency', currency: currencyCode }).format(price)
    //     return priceFormatted
    // }
