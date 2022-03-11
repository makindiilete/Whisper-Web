import React, { useState } from "react";
import axios from "axios";

export function useCoords() {
  const [isLoading, setIsLoading] = useState(false);
  const [lat, setLat] = useState();
  const [long, setLong] = useState();

  const propertyLocationCoords = async (state) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${state}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );
      return response.data.results[0];
    } catch (e) {
      return "Could not fetch location, Please Try Again";
    }
  };

  const getCoords = async (city, state, country, addr = null) => {
    setIsLoading(true);
    let address;
    if (addr) {
      address = encodeURI(addr);
    } else {
      address = encodeURI(`${city},${state},${country}`);
    }
    const res = await propertyLocationCoords(address);
    setIsLoading(false);
    if (typeof res !== "undefined") {
      setLat(res.geometry.location.lat);
      setLong(res.geometry.location.lng);
    }
    return { lat: res.geometry.location.lat, lng: res.geometry.location.lng };
  };

  return {
    isLoading,
    getCoords,
  };
}
