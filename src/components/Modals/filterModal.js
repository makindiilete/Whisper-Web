import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Form,
  Input,
  Modal,
  Slider,
  Tooltip,
  Menu,
  Dropdown,
  message,
  Select,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { isMobile } from "react-device-detect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import useMobile from "../../hooks/useMobile";
import cardImg from "../../assets/images/homeInApp/customer/circledCard.svg";
import walletImg from "../../assets/images/homeInApp/customer/circledWallet.svg";
import card from "../../assets/images/homeInApp/customer/card.svg";
import "../../assets/css/paymentModal.css";
import { InfoCircleOutlined } from "@ant-design/icons";
import { HiLocationMarker, MdLocationPin } from "react-icons/all";
import "../../assets/css/filterModal.css";
import useLocationHook from "../../hooks/useLocationHook";
import PlacesAutocomplete from "react-places-autocomplete";
import { countries } from "../countryList";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomerProfileService } from "../../services/Customers/Profile/ProfileService";
import { updateProviderProfileService } from "../../services/Providers/Profile/ProfileService";
import styles from "../../assets/css/auth/yourAttributes.module.css";
import { updateCustomerPreferenceService } from "../../services/Customers/Preference/PrefenceService";
import LoaderComponent from "../LoaderComponent";
import { adminFetchUserAction } from "../../redux/actions/userAction";
import { useCoords } from "../../hooks/useCoords";

const FilterModal = ({ visible, onCancel, data, setData, handleSearch }) => {
  let location = useLocation();
  const user = useSelector((state) => state.userReducer.data);
  const { address, handleChangeDropDown, handleSelect } = useLocationHook();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const dispatch = useDispatch();
  const mobile = useMobile();
  const coords = useCoords();
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    long: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [age, setAge] = useState({
    startRange: 18,
    endRange: 25,
  });
  const [genders, setGenders] = useState([
    "Man",
    "Woman",
    "Gay",
    "Lesbian",
    "Trans-Man",
    "Trans-Woman",
  ]);
  const [places, setPlaces] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [providerLocation, setProviderLocation] = useState("");

  const addRemoveItem = (item) => {
    //Add
    if (!selectedGender?.includes(item)) {
      setSelectedGender([...selectedGender, item]);
    }

    //Remove
    else {
      const filterItem = selectedGender?.filter((i) => i !== item);
      setSelectedGender(filterItem);
    }
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const res = await coords.getCoords(null, null, null, providerLocation);
    if (res.lat && res.lng) {
      const formdata = new FormData();
      formdata.append("city", providerLocation.city);
      formdata.append("state", providerLocation.state);
      formdata.append("country", providerLocation.country);
      formdata.append("userId", user?._id);
      let response = await updateCustomerPreferenceService({
        userId: user?._id,
        IAmInto: selectedGender,
        minAge: Number(age.startRange),
        maxAge: Number(age.endRange),
        providerLocation: providerLocation,
        providerLatitude: res.lat,
        providerLogitiude: res.lng,
      });
      setIsLoading(false);
      if (response.ok) {
        dispatch(adminFetchUserAction(user?._id));
        handleSearch();
        onCancel("continue");
      } else {
        message.error(
          response?.data?.errors[0].message || "Something went wrong"
        );
      }
    } else {
      setIsLoading(false);
      message.error("Cannot fetch coordinates");
    }
  };

  function onChange(value) {
    setData({ ...data, startAge: value[0], endAge: value[1] });
  }

  function onAfterChange(value) {
    setData({ ...data, startAge: value[0], endAge: value[1] });
  }

  const slider = {
    width: "100%",
    padding: "1.7rem 1rem",
    marginTop: mobile ? "-2rem" : null,
  };

  return (
    <Modal
      centered
      visible={visible}
      onCancel={onCancel}
      width={mobile ? "100vw" : "60vw"}
      closable
      footer={null}
      closeIcon={
        <FontAwesomeIcon
          icon={icons.faTimesCircle}
          className="text-dark"
          size="lg"
        />
      }
      style={{
        borderRadius: "20px",
        overflow: "hidden",
        paddingBottom: 0,
      }}
    >
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <div className="py-5 container-fluid filterModal">
          <h4>Filter</h4>
          <br />
          <Form
            layout="vertical"
            scrollToFirstError
            onFinish={handleSubmit}
            // size="large"
          >
            <Form.Item
              className="mb-3 mb-md-0 mt-2"
              initialValue=""
              name="providerLocation"
              rules={[
                {
                  required: true,
                  message: "Required field",
                },
              ]}
            >
              <Input
                placeholder="City, State, Country"
                onChange={(e) => setProviderLocation(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              className="mb-3 mb-md-0 mt-2"
              initialValue=""
              name="gender"
              label="Gender"
            >
              <div className="filterModal__gender">
                {genders?.map((item) => (
                  <div
                    key={item}
                    className={`filterModal__gender__item ${
                      selectedGender?.includes(item) && "active"
                    }`}
                    onClick={() => addRemoveItem(item)}
                  >
                    <p
                      className="padding-none"
                      style={{
                        fontSize: "1.4rem",
                        fontWeight: "bold",
                        color: "#000",
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </Form.Item>

            <Form.Item
              className="mb-3 mb-md-0 mt-2"
              initialValue=""
              name="age"
              label={
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ width: "100vw" }}
                >
                  <div>Age</div>
                  <div>
                    {data?.startAge}-{data?.endAge}
                  </div>
                </div>
              }
            >
              <div style={slider}>
                <Slider
                  range
                  step={1}
                  defaultValue={[18, 25]}
                  onChange={onChange}
                  onAfterChange={onAfterChange}
                  min={18}
                />
              </div>
            </Form.Item>
            <br />
            <button className="btn btn-primary btn-block">Search</button>
          </Form>
        </div>
      )}
    </Modal>
  );
};

export default FilterModal;
