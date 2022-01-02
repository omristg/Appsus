import { BookPreview } from './BookPreview.jsx';

export function BookList({ books }) {

    if (!books.length) return <h2>There are no books to show</h2>

    return (
        <section className="book-list">
            {books.map(book => <BookPreview book={book} key={book.id} />)}

        </section>
    )
}