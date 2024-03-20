import { useContext, useState, useEffect } from "react";
import { Link, useSearchParams, createSearchParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faUserPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { isEmptyReview } from "../../utils/validationUtils";

import styles from "./ProfilePage.module.css";
import useAuthApi from "../../hooks/useAuthApi";
import useReviewsApi from "../../hooks/useReviewsApi";
import AuthContext from "../../contexts/AuthContext";
import ReviewRatingStatic from "../../components/reviewRatingStatic/ReviewRatingStatic";
import LoadingContent from "../../components/loadingContent/LoadingContent";
import Pagination from "../../components/pagination/Pagination";
import ReviewRatingDynamic from "../../components/reviewRatingDynamic/ReviewRatingDynamic";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const ProfilePage = () => {

    const numberOfReviewsToShow = 3;

    const { getUser } = useAuthApi();
    const { getReviewsByUser, getUserReviewsCount, editReview, deleteReview } = useReviewsApi();

    const { auth } = useContext(AuthContext);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});
    const [userReviews, setUserReviews] = useState([]);
    const [resultsCount, setResultsCount] = useState(0);
    const [showEditReviewModal, setShowEditReviewModal] = useState(false);
    const [editReviewValidation, setEditReviewValidation] = useState({});

    const handleCloseReviewModal = () => setShowEditReviewModal(false);
    const handleShowReviewModal = () => setShowEditReviewModal(true);

    const [editModal, setEditModal] = useState({
        description: "",
        rating: 0,
        _bikeId: 0,
        _id: 0
    });


    const [query, setQuery] = useState({
        offset: searchParams.get('offset') || 0,
        pageSize: numberOfReviewsToShow,
    });

    const handleEditReviewChange = (e) => {
        const value = e.target.value;
        setEditModal({
            ...editModal,
            [e.target.name]: value
        });
    }

    function openReviewEditModal(review) {
        setEditModal({
            description: review.description,
            rating: review.rating,
            _bikeId: review._bikeId,
            _id: review._id
        });
    }

    const submitEditHandler = (e) => {
        e.preventDefault();
        setEditReviewValidation({});


        if (isEmptyReview(editModal)) {
            return setEditReviewValidation({ description: "Cannot submit empty review. Please enter a valid review." });
        }

        editReview(editModal)
            .then((response) => {
                if (response.status == 200) {
                    getReviewsByUser(auth.id, query.offset, query.pageSize)
                        .then(data => setUserReviews(data));

                    alert("You have successfully edited your review.")
                }
            })

        setEditModal({
            description: "",
            rating: 0,
            _bikeId: 0,
            _id: 0
        });

        handleCloseReviewModal();
    }

    const handleDelete = (reviewId) => {
        deleteReview(reviewId)
            .then((response) => {
                if (response.status == 200) {
                    setUserReviews(userReviews.filter((x) => x._id !== reviewId));
                    setQuery((state) => {
                        return {
                            ...state,
                            offset: query.offset
                        }
                    })
                }
            })
    }

    useEffect(() => {
        navigate({
            pathname: "/profile",
            search: `?${createSearchParams(query)}`
        });

        getUser()
            .then(data => setUser(data))
            .finally(setIsLoading(false));

        getReviewsByUser(auth.id, query.offset, query.pageSize)
            .then(data => setUserReviews(data));

        getUserReviewsCount(auth.id)
            .then(result => setResultsCount(result));

    }, [auth.accessToken, auth.id, query]);

    if (isLoading) {
        return <LoadingContent />
    }

    return (
        <>
            <div className="main-wrapper">
                <div className="large-wrapper app__container">
                    <div className={styles.pageWrapper}>
                        <div className={styles.accountBox}>
                            <div className={styles.boxHeader}>
                                Account information
                            </div>
                            <div className={styles.accountBoxContent}>
                                <div>
                                    <img src="/images/user.jpg" alt="user-avatar" className={styles.userAvatar}></img>
                                </div>
                                <div>
                                    <p className={styles.accountBoxHeadings}>Username</p>
                                    <h5 className="text-muted f-w-400">{user.username}</h5>
                                </div>
                                <div>
                                    <p className={styles.accountBoxHeadings}>Email</p>
                                    <h5 className="text-muted f-w-400">{user.email}</h5>
                                </div>
                            </div>
                        </div>
                        <div className={styles.reviewsBox}>
                            <div className={styles.boxHeader}>
                                Your reviews
                            </div>
                            {userReviews.length
                                ? userReviews.map((review) => {
                                    return (
                                        <div key={review._id} className={styles.reviewCard}>
                                            <div className={styles.review}>
                                                <div className={styles.reviewHeader}>
                                                    <p className="text-muted pt-5 pt-sm-3">
                                                        <ReviewRatingStatic rating={review.rating} />
                                                    </p>
                                                </div>
                                                <h5 className="text-primary mt-3">{review.description}</h5>
                                                <p className="text-muted pt-5 pt-sm-3">Review for product: {review.product.title}</p>
                                                <Link to={`/details/${review._bikeId}`} >
                                                    <button className={styles.cardActionIcon}>
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </button>
                                                </Link>
                                                <button
                                                    className={styles.cardActionIcon}
                                                    onClick={() => {
                                                        handleShowReviewModal();
                                                        openReviewEditModal(review);
                                                    }}>
                                                    <FontAwesomeIcon icon={faUserPen} />
                                                </button>
                                                <button className={styles.cardActionIcon} onClick={() => handleDelete(review._id)}>
                                                    <FontAwesomeIcon icon={faTrashCan} />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                                : <div className={styles.emptyReviews}>
                                    No recent activities.
                                </div>
                            }
                            <Pagination numberOfResults={resultsCount} pageSize={numberOfReviewsToShow} handleQuery={setQuery} offset={query.offset} />
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showEditReviewModal} onHide={handleCloseReviewModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit your review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => submitEditHandler(e)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <ReviewRatingDynamic review={editModal} setReview={setEditModal} />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Control as="textarea" rows={3} value={editModal.description} onChange={handleEditReviewChange} name="description" />
                        </Form.Group>
                        {editReviewValidation.description &&
                            <div className="inputReviewError">{editReviewValidation.description}</div>
                        }
                        <input type="submit" value="Submit" />
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ProfilePage;