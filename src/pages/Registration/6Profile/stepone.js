import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { DatePicker, Form, Input, message, Select } from "antd";
import { MdLocationPin } from "react-icons/all";
import { countries } from "../../../components/countryList";
import { updateCustomerProfileService } from "../../../services/Customers/Profile/ProfileService";
import { updateProviderProfileService } from "../../../services/Providers/Profile/ProfileService";
import { useDispatch } from "react-redux";
import {
  adminFetchUserAction,
  fetchUserTypeDataAction,
} from "../../../redux/actions/userAction";
import LoaderComponent from "../../../components/LoaderComponent";
import moment from "moment";
import routes from "../../../routes";
import { useCoords } from "../../../hooks/useCoords";

const Stepone = ({
  currentStep,
  setCurrentStep,
  title,
  subTitle,
  user,
  userType,
}) => {
  let location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const coords = useCoords();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    long: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hookLoading, setHookLoading] = useState(false);
  const [data, setData] = useState({
    dateOfBirth: "",
    gender: "",
    city: "",
    state: "",
    country: "",
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await coords.getCoords(data.city, data.state, data.country);
    if (res.lat && res.lng) {
      const formdata = new FormData();
      formdata.append("dateOfBirth", data.dateOfBirth);
      formdata.append("gender", data.gender);
      formdata.append("city", data.city);
      formdata.append("state", data.state);
      formdata.append("country", data.country);
      formdata.append("latitude", res.lat);
      formdata.append("longitude", res.lng);
      formdata.append("userId", user?._id);
      const response =
        userType === "customer"
          ? await updateCustomerProfileService(formdata)
          : await updateProviderProfileService(formdata);
      setIsLoading(false);
      if (response.ok) {
        dispatch(adminFetchUserAction(user?._id));
        setCurrentStep(currentStep + 1);
        history.push(`${routes.createyourprofile}?step=${currentStep + 1}`);
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
  function disabledDate(current) {
    return current && current > moment().subtract(18, "years");
  }

  function handleChange(value, name) {
    setData({ ...data, [name]: value });
  }

  const regForm = () => {
    return (
      <Form
        layout="vertical"
        scrollToFirstError
        onFinish={handleSubmit}
        size="large"
      >
        <Form.Item
          className="mb-3 mb-md-0 mt-2"
          initialValue=""
          name="dateOfBirth"
          rules={[
            {
              required: true,
              message: "Required field",
            },
          ]}
        >
          <DatePicker
            /*   defaultValue={moment(
              `07/04/${new Date().getFullYear() - 18}`,
              "DD/MM/YYYY"
            )}*/
            onChange={(date, dateString) =>
              handleChange(
                moment(date).utc().format("DD-MM-YYYY"),
                "dateOfBirth"
              )
            }
            placeholder="Date Of Birth"
            disabledDate={disabledDate}
          />
        </Form.Item>
        <Form.Item
          className="mb-3 mb-md-0 mt-2"
          name="gender"
          rules={[
            {
              required: true,
              message: "Required field",
            },
          ]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            placeholder="What's your gender"
            onChange={(value) => handleChange(value, "gender")}
          >
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="Non-Binary">Non-Binary</Select.Option>
            <Select.Option value="Transgender">Transgender</Select.Option>
            <Select.Option value="Intersex">Intersex</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          className="mb-3 mb-md-0 mt-2"
          initialValue=""
          name="city"
          rules={[
            {
              required: true,
              message: "Required field",
            },
          ]}
        >
          <Input
            placeholder="City"
            onChange={(e) => handleChange(e.target.value, "city")}
          />
        </Form.Item>
        <Form.Item
          className="mb-3 mb-md-0 mt-2"
          initialValue=""
          name="state"
          rules={[
            {
              required: true,
              message: "Required field",
            },
          ]}
        >
          <Input
            placeholder="State"
            onChange={(e) => handleChange(e.target.value, "state")}
          />
        </Form.Item>
        <Form.Item
          className="mb-3 mb-md-0 mt-2"
          name="country"
          rules={[
            {
              required: true,
              message: "Required field",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Country"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            prefix={<MdLocationPin className="primary-text" />}
            onChange={(value) => handleChange(value, "country")}
          >
            {countries?.map((item) => (
              <Select.Option value={item?.name}>{item?.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <button className="btn btn-primary btn-block my-3">Continue</button>
      </Form>
    );
  };
  return (
    <>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <div className="d-flex flex-column justify-content-around h-100 col-md-6 offset-md-3">
          <div className="w-100">
            <h4 className="text-center mt-5 mt-md-0">{title}</h4>
            <p className="text-center">{subTitle}</p>
          </div>
          {regForm()}
        </div>
      )}
    </>
  );
};

export default Stepone;
