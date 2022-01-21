import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { DatePicker, Form, Input, Select } from "antd";
import { MdLocationPin } from "react-icons/all";
import { countries } from "../../../components/countryList";

const Stepone = ({ currentStep, setCurrentStep, title, subTitle }) => {
  let location = useLocation();
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const [data, setData] = useState({
    phoneNumber: "",
    dob: "",
    gender: "",
    country: "",
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

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
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Required field",
            },
          ]}
        >
          <Input
            placeholder="Email"
            onChange={(e) => handleChange(e.target.value, "phoneNumber")}
          />
        </Form.Item>

        <Form.Item
          className="mb-3 mb-md-0 mt-2"
          initialValue=""
          name="dob"
          rules={[
            {
              required: true,
              message: "Required field",
            },
          ]}
        >
          <DatePicker placeholder="Date Of Birth" />
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
          >
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="others">Others</Select.Option>
          </Select>
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
          >
            {countries?.map((item) => (
              <Select.Option value={item?.name}>{item?.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    );
  };
  return (
    <>
      <div className="d-flex flex-column justify-content-around h-100">
        <div className="w-100">
          <h4 className="text-center mt-5 mt-md-0">{title}</h4>
          <p className="text-center">{subTitle}</p>
        </div>
        {regForm()}
        <button
          className="btn btn-primary btn-block my-3"
          onClick={() => setCurrentStep(currentStep + 1)}
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default Stepone;
