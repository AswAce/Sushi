import { useState, useEffect } from "react";
import { useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';
import useBikesApi from "../../hooks/useBikesApi";
import styles from "./CatalogPage.module.css";
import BikeCardItem from "../../components/bikeCards/bikeCardItem/BikeCardItem";
import Pagination from "../../components/pagination/Pagination";
import LoadingContent from "../../components/loadingContent/LoadingContent";
import Title from "../../components/title/Title";


const CatalogPage = () => {
    const [productType, setProductType] = useState('SASHIMI');

    const handleButtonClick = (type) => {
      setProductType(type);
    };
    const pageSize = 6;

    const [bikes, setBikes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [resultsCount, setResultsCount] = useState(0);
    const [searchParams] = useSearchParams();

    const { filterBikes, countBikeResults, getBikesByType } = useBikesApi();
    const navigate = useNavigate();

    const [query, setQuery] = useState({
        query: searchParams.get('query') || "",
        offset: searchParams.get('offset') || 0,
        pageSize: pageSize,
    });

    useEffect(() => {
        navigate({
            pathname: "/catalog",
            search: `?${createSearchParams(query)}`
        });

        
        getBikesByType(productType)
            .then(data => setBikes(data))
            .finally(() => setIsLoading(false));
    
    //     countBikeResults(query.query)
    //         .then(result => setResultsCount(result));
    }, [query, productType])

    if (isLoading) {
        return <LoadingContent />
    }

    return (
        
        <div className={styles.main}>
            <div className="main-wrapper">
                <div className={styles.catalog}>
                    <div>
                        {bikes && (
               
            <div className={`${styles.catalogContainerRowTitle} ${styles.buttonContainer}`}>
            <button
            className={`${styles.buttonSushiTypes} ${productType === 'Всички продукти' ? styles.active : ''}`}
            onClick={() => handleButtonClick('Всички продукти')}>Всички продукти
            </button>
            <button
            className={`${styles.buttonSushiTypes} ${productType === 'SASHIMI' ? styles.active : ''}`}
            onClick={() => handleButtonClick('SASHIMI')}>Сашими
            </button>
            <button
            className={`${styles.buttonSushiTypes} ${productType === 'NIGIRIZUSHI' ? styles.active : ''}`}
            onClick={() => handleButtonClick('NIGIRIZUSHI')}>Нигири
            </button>
            <button
            className={`${styles.buttonSushiTypes} ${productType === 'Напитки' ? styles.active : ''}`}
            onClick={() => handleButtonClick('Напитки')}>Напитки
            </button>
        </div>)}
        </div>
        <div className={styles.catalogContainerRow}>
                {bikes ? (
                    bikes.map((product, key) => <BikeCardItem bike={product} key={key} />)
                    ) : (
                     <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <p>
                                No results found.
                            </p>
                    </div>)}
        </div>
        <div>
            {/* <Pagination numberOfResults={resultsCount} pageSize={pageSize} handleQuery={setQuery} offset={query.offset} /> */}
        </div>
                </div>
            </div>
        </div >
    );
};

export default CatalogPage;
