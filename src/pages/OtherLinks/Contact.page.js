import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import OtherLinksContainer from "./OtherLinksContainer";
import background from "../../assets/images/others/getInTouch.jpg";
import { Form, Input, message } from "antd";
import routes from "../../routes";
import SuccessModal from "../../components/Modals/successModal";
import warningImg from "../../assets/images/auth/warning.svg";
import { contactUsService } from "../../services/App/contactUs";

const ContactPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const response = await contactUsService(data);
    setIsLoading(false);

    if (response.ok) {
      setShowSuccess(true);
      form.resetFields();
    } else {
      message.error(response?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <OtherLinksContainer>
        <div className="position-relative" style={{ marginTop: "-4rem" }}>
          <img
            src={background}
            style={{
              width: "100%",
              height: "39.7rem",
              objectFit: "cover",
            }}
            alt=""
            className="img-fluid"
          />
          <div className="position-absolute" style={{ top: "0" }}>
            <div
              className="w-100 d-flex align-items-center"
              style={{ height: "39.7rem" }}
            >
              <div style={!mobile ? { marginLeft: "19rem" } : null}>
                <h3 className="text-white text-center text-md-left ">
                  Get In touch
                </h3>
                {!mobile ? (
                  <p className="text-white text-center text-md-left ">
                    Ac amet proin volutpat morbi. Leo rhoncus nisi <br />{" "}
                    pretium senectus arcu interdum nullam aliquam
                  </p>
                ) : (
                  <p className="text-white text-center text-md-left ">
                    Ac amet proin volutpat morbi. Leo rhoncus nisi pretium
                    senectus arcu interdum nullam aliquam
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-2 mb-md-0">
              <h5>Address</h5>
              <small>4517 Washington Ave. Manchester, Kentucky 39495</small>
              <br />
              <br />
              <h5>Phone Number</h5>
              <small>(480) 555-0103</small>
              <br />
              <small>(704) 555-0127</small>
            </div>
            <div className="col-md-6">
              <Form
                layout="vertical"
                scrollToFirstError
                onFinish={handleSubmit}
                form={form}
              >
                <Form.Item
                  className="mb-3 mb-md-0 mt-2"
                  initialValue=""
                  name="firstName"
                  label="First Name"
                  required
                  rules={[{ required: true, message: "Required field" }]}
                >
                  <Input
                    onChange={(e) => handleChange("firstName", e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  className="mb-3 mb-md-0 mt-2"
                  initialValue=""
                  name="lastName"
                  label="Last Name"
                  required
                  rules={[{ required: true, message: "Required field" }]}
                >
                  <Input
                    onChange={(e) => handleChange("lastName", e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  className="mb-3 mb-md-0 mt-2"
                  initialValue=""
                  name="phone"
                  label="Phone Number"
                  required
                  rules={[{ required: true, message: "Required field" }]}
                >
                  <Input
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  className="mb-3 mb-md-0 mt-2"
                  initialValue=""
                  name="email"
                  label="Email"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Required field",
                    },
                    {
                      type: "email",
                      message: "Enter a valid email address",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  className="mb-3 mb-md-0 mt-2"
                  initialValue=""
                  name="message"
                  label="Message"
                  required
                  rules={[{ required: true, message: "Required field" }]}
                >
                  <Input.TextArea
                    rows={5}
                    onChange={(e) => handleChange("message", e.target.value)}
                  />
                </Form.Item>
                <br />
                <div className="d-md-flex justify-content-md-end">
                  <button
                    className={`btn btn-primary ${mobile && "btn-block"}`}
                  >
                    {isLoading ? (
                      <span className="spinner-border text-white" />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
                <br />
              </Form>
            </div>
          </div>
        </div>
        <SuccessModal
          title="Yay!"
          subtitle="Form submitted successfully"
          visible={showSuccess}
          onCancel={() => {
            setShowSuccess(false);
            // form.resetFields();
          }}
        />
      </OtherLinksContainer>
    </>
  );
};

export default ContactPage;
