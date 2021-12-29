import { BookPreview } from './bookPreview.jsx';

export function BookList({ books }) {
    
    if (!books.length) return  <h2>There are no books to show</h2>
  
    return (
        <section className="book-list">
            {books.map(book => { 
             return <BookPreview book={book} key={book.id}/> })}
        </section>
    )
}