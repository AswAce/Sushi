import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faAngry } from "@fortawesome/free-regular-svg-icons";
import styles from "./ReviewRatingStatic.module.css";


const ReviewRatingStatic = ({ rating }) => {
    var reviewFaces = [];
    let isPositiveReview = false;
    if (rating >= 3) {
        isPositiveReview = true;
    }

    for (var i = 1; i <= rating; i++) {
        reviewFaces.push(<FontAwesomeIcon key={i} icon={isPositiveReview ? faSmile : faAngry} className={isPositiveReview ? styles.smileFace : styles.angryFace} />);
    }

    return reviewFaces;
}

export default ReviewRatingStatic;