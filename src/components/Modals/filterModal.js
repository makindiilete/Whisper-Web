import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Form, Input, Modal, Slider, Tooltip, Menu, Dropdown } from "antd";
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
import { HiLocationMarker } from "react-icons/all";
import "../../assets/css/filterModal.css";
import useLocationHook from "../../hooks/useLocationHook";
import PlacesAutocomplete from "react-places-autocomplete";

const FilterModal = ({ visible, onCancel, data, setData, handleSearch }) => {
  let location = useLocation();
  const { address, handleChangeDropDown, handleSelect } = useLocationHook();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const mobile = useMobile();
  const [age, setAge] = useState({
    startRange: 18,
    endRange: 25,
  });
  const [genders, setGenders] = useState([
    "Male",
    "Female",
    "Non- Binary",
    "Transgender",
    "Intersex",
  ]);
  const [places, setPlaces] = useState([]);
  const [selected, setSelected] = useState("Male");

  const handleSubmit = (values) => {
    console.log(values);
    onCancel("continue");
  };

  function handleChange(value, name) {
    setData({ ...data, [name]: value });
  }

  function onChange(value) {
    setData({ ...data, startAge: value[0], endAge: value[1] });
  }

  function onAfterChange(value) {
    setData({ ...data, startAge: value[0], endAge: value[1] });
  }

  const slider = {
    width: "100%",
    // height: "4.8rem",
    // border: "1px solid #DADADA",
    // borderRadius: "8px",
    padding: "1.7rem 1rem",
    marginTop: mobile ? "-2rem" : null,
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  };

  const placesMenu = (
    <Menu>
      {places?.map((item) => (
        <Menu.Item key={item?.description}>
          {" "}
          <span className="mr-2">
            <HiLocationMarker color="#31005c" size="1.5rem" />
          </span>{" "}
          {item?.description}
        </Menu.Item>
      ))}
    </Menu>
  );

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
      <div className="py-5 container-fluid filterModal">
        <h4>Filter</h4>
        <br />
        <Form
          layout="vertical"
          scrollToFirstError
          onFinish={handleSubmit}
          // size="large"
        >
          <Dropdown overlay={placesMenu} visible={places?.length > 0}>
            <Form.Item
              className="mb-3 mb-md-0 mt-2"
              initialValue=""
              name="location"
              label="Location"
              rules={[
                {
                  required: true,
                  message: "Required field",
                },
              ]}
            >
              <PlacesAutocomplete
                required
                value={address}
                onChange={(address) => handleChangeDropDown(address)}
                onSelect={(address) => handleSelect(address)}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => {
                  setPlaces(suggestions);
                  console.log("suggestions array = ", suggestions);
                  return (
                    <div>
                      <Input
                        prefix={
                          <HiLocationMarker color="#31005c" size="2.5rem" />
                        }
                        {...getInputProps({
                          placeholder: "Enter location",
                        })}
                        type="text"
                        autoComplete="off"
                      />

                      <div
                        className="autocomplete-dropdown-container position-absolute"
                        style={{ zIndex: "1" }}
                      >
                        {loading && (
                          <div className="px-4 bg-light">Loading...</div>
                        )}
                        {/*  {suggestions?.map((suggestion) => {
                      console.log("Places = ", suggestion);
                    })}*/}
                      </div>
                    </div>
                  );
                }}
              </PlacesAutocomplete>
            </Form.Item>
          </Dropdown>

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
                    selected === item && "active"
                  }`}
                  onClick={() => {
                    setSelected(item);
                    setData({ ...data, gender: item });
                  }}
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
          <button className="btn btn-primary btn-block" onClick={handleSearch}>
            Search
          </button>
        </Form>
      </div>
    </Modal>
  );
};

export default FilterModal;
