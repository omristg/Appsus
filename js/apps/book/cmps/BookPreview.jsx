import { bookService } from '../services/book.service.js';

const {Link} = ReactRouterDOM

export function BookPreview({ book }) {

    const { currencyCode, amount: price } = book.listPrice
    const priceFormatted = bookService.getPriceFormatted(price, currencyCode)
    return (
        <Link to={`/book/${book.id}`}>
            <article className="book-preview">
                <h2>{book.title}</h2>
                <div className="img-container">
                    <img src={book.thumbnail} alt="" />
                </div>
                <div className="price"> Price: {priceFormatted}</div>
            </article>
        </Link>
    )
}