import { useEffect, useState } from "react";
import { countries } from "../components/countryList";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

export default function useLocationHook() {
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
    setCountryList(countries);
  }, []);

  const handleChangeDropDown = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    const splittedAddress = address.split(",")[0];
    setAddress(splittedAddress);
    geocodeByAddress(address).then((results) => {
      getLatLng(results[0]);
      for (let ac = 0; ac < results[0].address_components.length; ac++) {
        const component = results[0].address_components[ac];
        switch (component.types[0]) {
          case "administrative_area_level_1":
            setState(component.long_name);
            break;
          case "administrative_area_level_2":
            setCity(component.long_name);
            break;
          default:
            break;
        }
      }
    });
    return splittedAddress;
  };

  const handleChange = (name, value) => {
    switch (name) {
      case "country":
        let countryValue;
        countryValue = countryList.filter((country) => country.name === value);
        setSelectedCountryCode(countryValue[0]?.sortname);
        setCountry(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "state":
        setState(value);
        break;
      case "city":
        setCity(value);
        break;
      case "postalCode":
        setPostalCode(value);
        break;
      default:
        break;
    }
  };

  return {
    selectedCountryCode,
    countryList,
    address,
    state,
    city,
    country,
    postalCode,
    handleChange,
    handleChangeDropDown,
    handleSelect,
  };
}
