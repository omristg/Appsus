export function BooksSearchOpts({ booksOpts, onAddBook }) {

    console.log(booksOpts);

    return (
        <section className="books-search-opts-modal">
            {booksOpts.map((book, idx) => {
                return <div className="book-search-opt" key={idx}>
                    <span> {book.volumeInfo.title}</span>
                    <button className="fa-solid plus" onClick={() => { onAddBook(idx) }}></button>
                </div>
            })}
        </section>
    )
}
