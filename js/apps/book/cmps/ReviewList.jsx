import { ReviewPreview } from './ReviewPreview.jsx'

export function ReviewList({ reviews, onRemoveReview }) {
    return (
        <section className="review-list" >
            <h3>Reviews</h3>
            <main>

                {(!reviews || !reviews.length) && <h4>No reviews for this book</h4>}
                {reviews && reviews.map((review, idx) => {
                    return <ReviewPreview key={idx} reviewIdx={idx}
                        review={review}
                        onRemoveReview={onRemoveReview} />
                })}
            </main>
        </section>
    )

}