import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import { HomeContainerPage } from "../Home/HomeContainer.page";
import { SubscribePremium } from "../../components/SubscribePremium";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import routes from "../../routes";
import { AiOutlineEdit } from "react-icons/all";
import { DatePicker, Form, Input, Switch } from "antd";
import modalImg from "../../assets/images/auth/40.svg";
import SuccessModal from "../../components/Modals/successModal";

const EditProfilePage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [genders, setGenders] = useState([
    "Male",
    "Female",
    "Non- Binary",
    "Transgender",
    "Intersex",
  ]);
  const [selected, setSelected] = useState("Male");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showBasicInfoForm, setShowBasicInfoForm] = useState(false);
  const [showYourAccount, setShowYourAcct] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [premiumActive, setPremiumActive] = useState(false);
  const [showActivatePremium, setShowActivatePremium] = useState(false);
  const [notifications, setNotifications] = useState({
    all: true,
    message: false,
    match: false,
    mail: false,
    sms: false,
  });
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    dob: "",
    gender: "",
  });
  const [yourAccount, setYourAccount] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  function onChange(name, value) {
    setNotifications({ ...notifications, [name]: value });
  }

  const handleSubmit = (values, formName) => {
    if (formName === "basicInfo") {
      setShowBasicInfoForm(false);
      console.log(values);
    } else {
      setShowYourAcct(false);
      console.log(values);
    }
    setShowSuccess(true);
  };

  const handleChangeBasicinfo = (name, value) => {
    setBasicInfo({ ...basicInfo, [name]: value });
  };

  const handleChangeAcctinfo = (name, value) => {
    setYourAccount({ ...yourAccount, [name]: value });
  };

  const basicInfoForm = () => {
    return (
      <>
        <Form
          layout="vertical"
          scrollToFirstError
          onFinish={(values) => handleSubmit(values, "basicInfo")}
        >
          <Form.Item
            className="mb-3 mb-md-0 mt-2"
            initialValue={user?.name}
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Required field",
              },
            ]}
          >
            <Input
              onChange={(e) => handleChangeBasicinfo("name", e.target.value)}
            />
          </Form.Item>

          <Form.Item
            className="mb-3 mb-md-0 mt-2"
            initialValue=""
            name="dob"
            label="Date of Birth"
            rules={[
              {
                required: true,
                message: "Required field",
              },
            ]}
          >
            <DatePicker
              placeholder="Date Of Birth"
              onChange={(date, dateString) =>
                handleChangeBasicinfo("dob", dateString)
              }
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
                    selected === item && "active"
                  }`}
                  onClick={() => {
                    setSelected(item);
                    setBasicInfo({ ...basicInfo, gender: item });
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
          <br />
          <div className="d-block d-md-flex justify-content-md-between">
            <button className="btn btn-primary btn-sm-block btn-md-auto mr-md-3 mb-3 mb-md-0">
              Save
            </button>
            <button
              onClick={() => setShowBasicInfoForm(false)}
              className="btn btn-outline-primary btn-sm-block btn-md-auto"
            >
              Cancel
            </button>
          </div>
        </Form>
      </>
    );
  };

  const yourAccountForm = () => {
    return (
      <>
        <Form
          layout="vertical"
          scrollToFirstError
          onFinish={(values) => handleSubmit(values, "account")}
        >
          <Form.Item
            className="mb-3 mb-md-0 mt-2"
            initialValue={user?.email}
            name="email"
            label="Email Address"
            rules={[
              {
                required: true,
                message: "Required field",
              },
              {
                type: "email",
                message: "Enter a valid email",
              },
            ]}
          >
            <Input
              onChange={(e) => handleChangeAcctinfo("email", e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              onChange={(e) => handleChangeAcctinfo("email", e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              onChange={(e) =>
                handleChangeAcctinfo("confirmPassword", e.target.value)
              }
            />
          </Form.Item>

          <br />
          <div className="d-block d-md-flex justify-content-md-between">
            <button className="btn btn-primary btn-sm-block btn-md-auto mr-md-3 mb-3 mb-md-0">
              Save
            </button>
            <button
              onClick={() => setShowYourAcct(false)}
              className="btn btn-outline-primary btn-sm-block btn-md-auto"
            >
              Cancel
            </button>
          </div>
        </Form>
      </>
    );
  };

  return (
    <HomeContainerPage>
      <section className="profile pb-5">
        <div className="row">
          <SubscribePremium
            handlePremium={() => setShowActivatePremium(true)}
            visible={!premiumActive}
          />
          <div
            className={`${
              premiumActive ? `col-md-8 offset-md-2` : `col-md-9`
            } `}
          >
            <div onClick={() => history.push(routes.PROFILE)}>
              <FontAwesomeIcon
                icon={icons.faAngleLeft}
                size="2x"
                className="cursor"
              />
            </div>
            <br />

            <div className="col-md-6 mt-3">
              <div className="d-flex align-items-center mb-5">
                <h5 className="padding-none mr-5">Your Basic information</h5>
                <AiOutlineEdit
                  onClick={() => setShowBasicInfoForm(true)}
                  size="2rem"
                  className="cursor"
                />
              </div>
              {showBasicInfoForm ? (
                basicInfoForm()
              ) : (
                <>
                  <div className="d-flex justify-content-between mb-4">
                    <small className="text-dark"> Name </small>
                    <small className="text-muted">{user?.name}</small>
                  </div>
                  <div className="d-flex justify-content-between mb-4">
                    <small className="text-dark"> Date Of Birth </small>
                    <small className="text-muted">{user?.dob}</small>
                  </div>
                  <div className="d-flex justify-content-between mb-4">
                    <small className="text-dark"> Gender </small>
                    <small className="text-muted">{user?.gender}</small>
                  </div>
                </>
              )}
            </div>
            <br />
            <div className={`dotted-divider ${mobile ? "w-100" : "w-50"}`} />
            <br />
            <div className="col-md-6 mt-3">
              <div className="d-flex align-items-center mb-5">
                <h5 className="padding-none mr-5">Your Account</h5>
                <AiOutlineEdit
                  onClick={() => setShowYourAcct(true)}
                  size="2rem"
                  className="cursor"
                />
              </div>
              {showYourAccount ? (
                yourAccountForm()
              ) : (
                <>
                  <div className="d-flex justify-content-between mb-4">
                    <small className="text-dark"> Email Address </small>
                    <small className="text-muted">{user?.email}</small>
                  </div>
                  <div className="d-flex justify-content-between mb-4">
                    <small className="text-dark"> Password </small>
                    <small className="text-muted">************</small>
                  </div>
                </>
              )}
            </div>
            <br />
            <div className={`dotted-divider ${mobile ? "w-100" : "w-50"}`} />
            <br />
            <div className="col-md-6 mt-3">
              <div className="d-flex align-items-center mb-5">
                <h5 className="padding-none mr-5">Notifications</h5>
                <AiOutlineEdit
                  onClick={() => history.push(routes.EDIT_PROFILE)}
                  size="2rem"
                  className="cursor"
                />
              </div>
              <div className="d-flex justify-content-between mb-5">
                <small className="text-dark"> All Notifications </small>
                <Switch
                  checked={notifications.all}
                  onChange={(checked) => onChange("all", checked)}
                />
              </div>

              <div className="d-flex justify-content-between mb-5">
                <small className="text-dark"> Message Notifications </small>
                <Switch
                  checked={notifications.message}
                  onChange={(checked) => onChange("message", checked)}
                />
              </div>

              <div className="d-flex justify-content-between mb-5">
                <small className="text-dark"> Match Notifications </small>
                <Switch
                  checked={notifications.match}
                  onChange={(checked) => onChange("match", checked)}
                />
              </div>

              <div className="d-flex justify-content-between mb-5">
                <small className="text-dark">
                  Receive Notifications by Mail
                </small>
                <Switch
                  checked={notifications.mail}
                  onChange={(checked) => onChange("mail", checked)}
                />
              </div>

              <div className="d-flex justify-content-between mb-5">
                <small className="text-dark">
                  Receive Notifications by SMS
                </small>
                <Switch
                  checked={notifications.sms}
                  onChange={(checked) => onChange("sms", checked)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <SuccessModal
        visible={showSuccess}
        onCancel={() => {
          setShowSuccess(false);
        }}
        title="Changes saved successfully"
        subtitle="Have fun on Whisper"
        image={modalImg}
      />
    </HomeContainerPage>
  );
};

export default EditProfilePage;
