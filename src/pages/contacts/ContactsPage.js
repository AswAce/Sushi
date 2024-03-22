import styles from "./ContactsPage.module.css";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function ContactsPage(){
  const defaultProps = {
    center: {
      lat:  42.710629,
      lng: 23.290906
    },
    zoom: 11 
  }; 
    return (
        // Important! Always set the container height explicitly
        <div style={{width: 400, height: 400}}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyCWVRuM63WaxKZWTispQh6zql_mIozL2aw" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            
            
          >
            <AnyReactComponent
              lat={42.710629}
              lng={23.290906}
              text="Sushi"
            />
          </GoogleMapReact>
        </div>
      );
}

