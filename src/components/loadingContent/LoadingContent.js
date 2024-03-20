import Title from "../title/Title";
import styles from "../../pages/catalog/CatalogPage.module.css";

const LoadingContent = () => {
    return (
        <>
            <div className="main-wrapper">
                <section className={styles.home}>
                    <div className={styles.homeContainer}>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "30px" }}>
                            <Title txt="Loading..." size={25} color="#171717" transform="uppercase" />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default LoadingContent;