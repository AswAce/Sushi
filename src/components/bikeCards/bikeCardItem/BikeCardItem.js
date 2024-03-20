import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import styles from './BikeCardItem.module.css'
import ShoppingCartContext from '../../../contexts/ShoppingCartContext';
import AuthContext from '../../../contexts/AuthContext';

const BikeCardItem = ({ bike }) => {

    const { onAdd } = useContext(ShoppingCartContext);
    const { auth } = useContext(AuthContext);

    return (
        <div className={styles.shopCard}>
            <div className={styles.title}>
                {bike.title}
            </div>
            <div className={styles.desc}>
                {bike.description}, 70gr
                {/* {bike.} */}
            </div>
            <div className={styles.price}>Цена:{bike.price.toFixed(2)}лв</div>

            <div className={styles.slider}>
                <figure data-color="#E24938, #A30F22">
                    <img
                        className={styles.cardImage}
                        src={`/images/${bike.image}`}
                        alt={bike.title}
                    />
                </figure>
            </div>
           
            <div className={styles.cta}>
                {
                    <button
                        className={styles.addCartBtn}
                        onClick={() => onAdd(bike)}
                    >
                       Добавяне
                        <FontAwesomeIcon icon={faCartPlus} className={styles.cartIcon} />
                    </button>}
                <Link to={`/details/${bike._id}`} className={styles.btn}>Детайли<span></span></Link>
            </div>
        </div>
    );
}

export default BikeCardItem;