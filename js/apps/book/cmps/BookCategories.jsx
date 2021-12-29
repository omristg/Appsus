
export function BookCategories({ bookCategories }) {

    return (
        <section className="book-ctgs">
            {bookCategories.map(category => {
                return <div key={category}>{category}</div>
            })}
        </section>
    )
}