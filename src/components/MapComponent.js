import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Loader from "react-loader-spinner";
import { message } from "antd";

const mapStyles = {
  width: "100%",
  height: "20rem",
};

const MapComponent = (props) => {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  /*  const coords = async () => {
    setIsLoading(true);
    const address = encodeURI(props.address);
    const res = await propertyLocationCoords(address);
    if (typeof res !== "undefined") {
      setLat(res.geometry.location.lat);
      setLong(res.geometry.location.lng);
      setIsLoading(false);
    } else {
      setLat(6.605874);
      setLong(3.349149);
      setIsLoading(false);
    }
  };*/

  useEffect(() => {
    // setLat(6.605874);
    // setLong(3.349149);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      },
      (error) => {
        setIsLoading(false);
        if (error.code === 1) {
          message.error("Turn on device location to see people around you");
        } else {
          message.error(error.message);
        }
      }
    );
  }, []);

  return (
    <>
      {lat === 0 || long === 0 ? (
        <Loader
          className="mr-2"
          type="Circles"
          color="#FFFF8300"
          height={20}
          width={20}
        />
      ) : (
        <Map
          google={props.google}
          style={mapStyles}
          zoom={15}
          initialCenter={{
            lat: lat,
            lng: long,
          }}
          center={{
            lat: lat,
            lng: long,
          }}
          streetViewControl={false}
          mapTypeControl={false}
        >
          <Marker
            position={{
              lat: lat,
              lng: long,
            }}
          />
        </Map>
      )}
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapComponent);
