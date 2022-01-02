

export function ReviewPreview({ review, reviewIdx, onRemoveReview }) {
    if (!review.rate) {
        review.rate = 'No rate for this book'
    }
    const timeopts = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,

    }
    let reviewDate = new Date(review.readAt)
    reviewDate = `${reviewDate.toLocaleDateString('he-IL')} ${reviewDate.toLocaleTimeString([], timeopts)} `

    return (
        <section className="reviews-preview">
            <div> <span>Name: </span>{review.fullName}</div>
            <div><span>Review: </span> {review.content}</div>
            <div> <span>Rate: </span>{review.rate}</div>
            {/* <div><span>Read At: </span>{`${review.readAt}`}</div> */}
            <div><span>Read At: </span>{reviewDate}</div>
            <button onClick={() => { onRemoveReview(reviewIdx) }}>Delete Review</button>
        </section>
    )
}