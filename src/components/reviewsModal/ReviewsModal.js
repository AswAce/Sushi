import Modal from 'react-bootstrap/Modal';
import styles from './ReviewsModal.module.css';
import ReviewRatingStatic from '../reviewRatingStatic/ReviewRatingStatic';

const ReviewsModal = (props) => {

    const { show, handleClose, reviews } = props;


    return (
        <>
            <Modal
                size="lg"
                scrollable={true}
                show={show}
                onHide={() => handleClose()}
            >
                <Modal.Header>
                    <Modal.Title>Bike Reveiws</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {reviews.length
                        ? reviews.map((review) => {
                            return (
                                <div key={review._id} className={styles.reviewCard}>
                                    <div className={styles.review}>
                                        <div className={styles.reviewHeader}>
                                            <p className="text-muted pt-5 pt-sm-3">
                                                <ReviewRatingStatic rating={review.rating} />
                                            </p>
                                        </div>
                                        <h5 className="text-primary mt-3">{review.description}</h5>
                                        <p className="text-muted pt-5 pt-sm-3">{review.author.email}</p>
                                    </div>
                                </div>
                            )
                        })
                        : <div className={styles.emptyReviews}>
                            Oops no reviews. Be the first one to leave feedback.
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ReviewsModal;