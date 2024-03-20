import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player/youtube";
import styles from "../details/DetailsPage.module.css";
import useBikesApi from '../../hooks/useBikesApi';
import useReviewsApi from '../../hooks/useReviewsApi';
import AuthContext from '../../contexts/AuthContext';
import ShoppingCartContext from '../../contexts/ShoppingCartContext';
import ReviewsModal from '../../components/reviewsModal/ReviewsModal';
import LoadingContent from '../../components/loadingContent/LoadingContent';
import ReviewRatingDynamic from '../../components/reviewRatingDynamic/ReviewRatingDynamic';

const DetailsPage = () => {

    const { bikeId } = useParams();
    const { auth } = useContext(AuthContext);
    const { onAdd } = useContext(ShoppingCartContext);
    const { getBike } = useBikesApi();
    const { getBikeReviews, createReview } = useReviewsApi();

    const [bike, setBike] = useState({});
    const [reviews, setReviews] = useState([]);
    const [showReviews, setShowReviews] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [reviewValidation, setReviewValidation] = useState({});
    const [newReview, setNewReview] = useState({
        _bikeId: bikeId,
        description: "",
        rating: 0
    });

    const handleCloseReviews = () => setShowReviews(false);
    const handleShowReviews = () => setShowReviews(true);


    useEffect(() => {
        getBike(bikeId)
            .then(data => setBike(data))
            .finally(() => setIsLoading(false));

        getBikeReviews(bikeId)
            .then(data => setReviews(data));
    }, []);

    const handleReviewChange = (e) => {
        const newReviewText = e.target.value;
        setNewReview({
            ...newReview,
            description: newReviewText
        });
    }

    const submitReviewHandler = (e) => {
        e.preventDefault();

        if (newReview.description == "") {
            return setReviewValidation({ description: "Cannot submit empty review. Please enter a valid review." });
        }

        createReview(newReview)
            .then((response) => {
                if (response.status == 200) {
                    getBikeReviews(bikeId)
                        .then(data => {
                            setReviews(data);
                        });
                    alert("You have successfully added new review.");
                }
            })

        setNewReview({
            _bikeId: bikeId,
            description: "",
            rating: 0
        });
    }

    if (isLoading) {
        return <LoadingContent />
    }

    return (
        <>
            <div className="main-wrapper">
                <div className="large-wrapper app__container">
                    <div className={styles.detailHeader}>
                        <div className={styles.detailTitle}>Bike Details</div>
                    </div>
                    <div className={styles.bikeTitle}>{bike.title}</div>
                </div>

                <div className={styles.bikeContainer}>
                    <div className={styles.bikeBoxLeft}>
                        <div className={styles.bikeVideoBox}>
                            <ReactPlayer
                                url={bike.video}
                            />
                        </div>

                        <div className={styles.bikeDescriptionBox}>
                            <div className={styles.bikeDetails}>
                                <div className={styles.bikeDetailsItem}>
                                    <div className={styles.bikeFeatures}>Bike Features:
                                    </div>
                                    <div>
                                        {bike && bike.features && bike.features.map((feature, i) => {
                                            return (
                                                <span key={i} className={styles.featuresItem}>
                                                    {feature}
                                                </span>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <button
                                className={styles.reviewBtn}
                                onClick={() => handleShowReviews()}
                            >
                                View User reviews
                                <FontAwesomeIcon icon={faComments} className={styles.reviewsIcon} />
                            </button>
                            <ReviewsModal show={showReviews} reviews={reviews} handleClose={handleCloseReviews} />
                            <br />
                            <div className={styles.bikeDescription}>
                                <h4>
                                    Description
                                </h4>
                                <hr />
                                {bike.full_description}
                            </div>
                        </div>
                    </div>
                    <aside className={styles.bikeBoxRight}>
                        <img className={styles.bikeImage} src={`/images/${bike.image}`} />
                        <div className={styles.bikePrice}>Price: {bike.price.toFixed(2)}€
                            {auth.accessToken &&
                                <button
                                    className={styles.addCartBtn}
                                    onClick={() => onAdd(bike)}
                                >
                                    Add to
                                    <FontAwesomeIcon icon={faCartPlus} className={styles.cartIcon} />
                                </button>}
                        </div>
                        <div>
                            <Link to='/catalog' className={styles.backToCatalog}>
                                Back to Catalog page
                            </Link>
                        </div>
                    </aside>
                </div>
                {auth.accessToken &&
                    <div>
                        <form onSubmit={submitReviewHandler} className={styles.reviewWrapper}>
                            <label htmlFor="comment" className={styles.reviewTitle}>Rate & Review</label>
                            <ReviewRatingDynamic review={newReview} setReview={setNewReview} />

                            <div>
                                <textarea type="text" id="comment" className={styles.inputReview} value={newReview.description}
                                    onChange={handleReviewChange} rows="5" cols="50" />
                            </div>
                            {reviewValidation.description &&
                                <div className="inputReviewError">{reviewValidation.description}</div>
                            }
                            <button type="submit" className={styles.submitReview}>
                                Submit
                            </button>
                        </form>
                    </div>
                }
            </div>
        </>
    );

}

export default DetailsPage;