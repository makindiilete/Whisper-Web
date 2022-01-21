import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { DatePicker, Form, Input, Select } from "antd";
import { BsUpload, FiUpload, MdLocationPin } from "react-icons/all";
import { countries } from "../../../components/countryList";
import useMobile from "../../../hooks/useMobile";

const StepTwo = ({ currentStep, setCurrentStep, title, subTitle }) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const [data, setData] = useState({
    idType: "",
    idNumber: "",
    idImgUri: "",
  });
  const [idTypes, setIdTypes] = useState([
    `Driver's licence`,
    "International Password",
    "NIMC",
    "National ID Card",
  ]);

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
          name="idType"
          label="ID Card Type"
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
          >
            {idTypes?.map((item) => (
              <Select.Option value={item} key={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>{" "}
        <Form.Item
          className="mb-3 mb-md-0 mt-2"
          initialValue=""
          name="idNumber"
          label="ID Card Number"
          rules={[
            {
              required: true,
              message: "Required field",
            },
          ]}
        >
          <Input onChange={(e) => handleChange(e.target.value, "idNumber")} />
        </Form.Item>
        <div className="flexrowbetweencenter">
          <div
            style={{
              width: "1rem",
              height: "1rem",
              borderRadius: "0.3rem",
              backgroundColor: "#7917CE",
            }}
          />
          <p className="padding-none ml-2">
            It is important that you provide correct ID card Number.
          </p>
        </div>
      </Form>
    );
  };
  return (
    <>
      <div className="d-flex flex-column justify-content-around h-100">
        <div className="w-100">
          <br />
          <h4 className="text-center mt-5 mt-md-0">{title}</h4>
          <p className="text-center">{subTitle}</p>
        </div>
        <div className="flexrowaround">
          {regForm()}
          <div className="uploadBox">
            <div className="d-flex flex-column align-items-center">
              <FiUpload className="primary-light-text" size="3rem" />
              <h5 className="font-weight-bold text-center mt-4">
                ID Card Number
              </h5>
              <p className="text-muted">
                Kindly Upload your Govt. Issued ID card
              </p>
              <h5 className="font-weight-bold">Browse Files</h5>
              {/* /.font-weight-bold */}
              {/* /.font-weight-bold */}
            </div>
          </div>
          {/* /.uploadBox */}
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setCurrentStep(currentStep + 1)}
          style={mobile ? null : { margin: "6rem 30rem" }}
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default StepTwo;
