import { useState, useEffect } from "react";
import { useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';
import useBikesApi from "../../hooks/useBikesApi";
import styles from "./CatalogPage.module.css";
import BikeCardItem from "../../components/bikeCards/bikeCardItem/BikeCardItem";
import Pagination from "../../components/pagination/Pagination";
import LoadingContent from "../../components/loadingContent/LoadingContent";
import Title from "../../components/title/Title";


const CatalogPage = () => {
    const pageSize = 6;

    const [bikes, setBikes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [resultsCount, setResultsCount] = useState(0);
    const [searchParams] = useSearchParams();

    const { filterBikes, countBikeResults } = useBikesApi();
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

        filterBikes(query.query, query.offset, query.pageSize)
            .then(data => setBikes(data))
            .finally(() => setIsLoading(false));

        countBikeResults(query.query)
            .then(result => setResultsCount(result));
    }, [query])

    if (isLoading) {
        return <LoadingContent />
    }

    return (
        <div className="main">
            <div className="main-wrapper">
                <div className={styles.catalog}>
                    <div>
                        {bikes && (
                            <div className={styles.catalogContainerRowTitle}>
                                <Title txt="all products" color="#171717" size={40} transform="uppercase" />
                            </div>
                        )}
                    </div>
                    <input
                        className={styles.catalogSearchInput}
                        type="search"
                        name="search"
                        placeholder="Search shop"
                        value={query.query}
                        onChange={e => setQuery((state) => {
                            return {
                                ...state,
                                query: e.target.value,
                                offset: 0
                            }
                        })}
                    />



                    <div className={styles.catalogContainerRow}>
                        {bikes ? (
                            bikes.map((product, key) => <BikeCardItem bike={product} key={key} />)
                        ) : (
                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <p>
                                    No results found.
                                </p>
                            </div>
                        )}
                    </div>
                    <div>
                        <Pagination numberOfResults={resultsCount} pageSize={pageSize} handleQuery={setQuery} offset={query.offset} />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CatalogPage;
