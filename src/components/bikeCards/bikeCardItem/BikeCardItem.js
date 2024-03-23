import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import styles from './BikeCardItem.module.css'
import ShoppingCartContext from '../../../contexts/ShoppingCartContext';

const BikeCardItem = ({ bike }) => {

    const { onAdd } = useContext(ShoppingCartContext);
    return (
        <div className={styles.bikeCard}>
            <Link to={`/details/${bike._id}`} className={styles.imageLink}>
                <img
                    src={`/images/${bike.image}`}
                    alt={bike.title}
                    className={styles.bikeImage}
                />
            </Link>
            <div className={styles.bikeInfo}>
                <div className={styles.bikeName}>{bike.title} - {bike.quantity}</div>
                <div className={styles.bikeSubInfo}>
                    {bike.price} | {bike.weight}
                </div>
                {/* <div className={styles.bikeDescription}>{bike.description}</div> */}
                <div className={styles.bikeActions}>
                <button className={styles.cardButton} onClick={() => onAdd(bike)}>
                       Добавяне
                        <FontAwesomeIcon icon={faCartPlus} className={styles.cartIcon} />
                    </button>
                <Link to={`/details/${bike._id}`} className={styles.detailsButton}>Детайли<span></span></Link>
                </div>
            </div>
        </div>
    );
}

export default BikeCardItem;