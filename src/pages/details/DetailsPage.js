import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "../details/DetailsPage.module.css";
import useBikesApi from '../../hooks/useBikesApi';
import AuthContext from '../../contexts/AuthContext';
import ShoppingCartContext from '../../contexts/ShoppingCartContext';
import LoadingContent from '../../components/loadingContent/LoadingContent';

const DetailsPage = () => {
    const { bikeId } = useParams();
    const { onAdd } = useContext(ShoppingCartContext);
    const { getBike } = useBikesApi();
    const [bike, setBike] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [quantity,setQuantity] =useState(1)
    useEffect(() => {
        getBike(bikeId)
            .then(data => setBike(data))
            .finally(() => setIsLoading(false));
    }, [bikeId, getBike]); // Added dependencies to useEffect

    if (isLoading) {
        return <LoadingContent />;
    }

    return (
        <div className={styles.main}>
            <div className="large-wrapper app__container">
                <div className={styles.bikeContainer}>
                    <div className={styles.bikeBoxLeft}>
                        <div className={styles.bikeTitleQuantity}>
                            <span className={styles.bikeTitle}>{bike.title} |</span>
                            <span> 4парчета {bike.quantity}</span>
                        </div>
                        <div className={styles.bikeWeight}>70gr {bike.weight}</div>
                        <div className={styles.bikeDescription}>{bike.description}</div>
                    </div>
    
                    <div className={styles.bikeBoxRight}>
                        <img className={styles.bikeImage} src={`/images/${bike.image}`} alt={bike.title} />
                    </div>
                </div>
                <div className={styles.actionRow}>
                    <div className={styles.finalPrice}>Крайна цена: {(bike.price * quantity).toFixed(2)}€</div>
                
                    <div className={styles.quantityInput}>
                    <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                    <input type="text" value={quantity} readOnly />
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>

                    <button className={styles.addCartBtn} onClick={() => onAdd({...bike, quantity})}>Добави <FontAwesomeIcon icon={faCartPlus} /></button>
                    <Link to='/catalog' className={styles.backToCatalog}>Назад към меню</Link>
                </div>
            </div>
        </div>
    );
    
};

export default DetailsPage;
