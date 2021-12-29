export function BooksSearchOpts({ booksOpts ,onAddBook}) {

    console.log(booksOpts);

    return (
        <section className="books-search-opts">
            {booksOpts.map((book, idx) => {
                return <div key={idx}>
                    {book.volumeInfo.title}
                    <button onClick={()=> {onAddBook(idx)}}></button>
                </div>
            })}
        </section>
    )
}
