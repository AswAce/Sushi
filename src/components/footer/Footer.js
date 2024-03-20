import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer>
            <div className={styles.footerWrapper}>
                <div className={styles.footerCopyright}>
                    <span>©2022 MTB-Shop, INC. ALL RIGHTS RESERVED.</span>
                    <br />
                    <span>
                        All trademarks and registered trademarks are the property of their
                        respective owners.
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;