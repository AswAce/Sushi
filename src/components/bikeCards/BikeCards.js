import { useEffect, useState } from "react";
import BikeCardItem from "./bikeCardItem/BikeCardItem";
import styles from './BikeCards.module.css'

const BikeList = () => {

    const [inStockBikes, setInStockBikes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/data/bikes?where=status IN ("in-stock")')
            .then(response => response.json())
            .then(data => setInStockBikes(data));
    }, [])

    return (
        <div className={styles.widgetContainer}>
            <div className={styles.bikesWidget}>
                <div className={styles.bikesWidgetTitle}>
                    In-Stock Bikes
                </div>
                <div className={styles.bikesWidgetCards}>
                    {inStockBikes.map((bike) => (
                        <BikeCardItem key={bike._id} bike={bike} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BikeList;