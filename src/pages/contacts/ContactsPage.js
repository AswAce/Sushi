import styles from "./ContactsPage.module.css";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text, style }) => (
  <div style={style}>{text}</div>
);

export default function ContactsPage() {
  const defaultProps = {
    center: {
      lat: 42.710629,
      lng: 23.290906
    },
    zoom: 15
  };

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const a = isMobile ? 400 : 600;
  const b = isMobile ? 400 : 600;
  const direction = isMobile ? 'column' : 'row';

  const componentStyle = {
    position: 'absolute',
    width: 40,
    height: 40,
    left: -40 / 2,
    top: -40 / 2,
    border: '1px solid #f44336',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Transparent white background
    textAlign: 'center',
    alignItems: 'center',
    color: '#3f51b5',
    fontSize: 10,
    fontWeight: 'bold',
    padding: 4
  };

  return (
    <div className={styles.container}>
      <div className={styles.contactInfo}>
        {/* Contact info */}
        <div className={styles.contactInfoBox}>
          <div className={styles.contactInfoItem}><strong>Име:</strong> Sushi Spot</div>
          <div className={styles.contactInfoItem}><strong>Адрес:</strong> София, Света Троица улица Бабина Поляна 12</div>
          <div className={styles.contactInfoItem}><strong>Телефон:</strong> 123-456-7890</div>
          <div className={styles.socialMediaIcons}>
          <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className={styles.icon}>
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer" className={styles.icon}>
            <i className="fab fa-instagram"></i>
    </a>
  </div>  
        </div>
      </div>
      <div className={styles.map}>
        {/* Map */}
        <div style={{ width: a, height: b }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyCWVRuM63WaxKZWTispQh6zql_mIozL2aw" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={42.710629}
              lng={23.290906}
              text={'Sushi'}
              style={componentStyle}
            />
          </GoogleMapReact>
        </div>
      </div>
    </div>
  );
}
