import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import { HomeContainerPage } from "../Home/HomeContainer.page";
import { SubscribePremium } from "../../components/SubscribePremium";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import routes from "../../routes";
import { AiOutlineEdit } from "react-icons/all";
import { DatePicker, Form, Input, message, Switch } from "antd";
import modalImg from "../../assets/images/auth/40.svg";
import SuccessModal from "../../components/Modals/successModal";
import { useDispatch, useSelector } from "react-redux";
import { toSentenceCase } from "../../Utils/toSentenceCase";
import { updateProfile } from "../../services/Customers/Profile/ProfileService";
import { adminFetchUserAction } from "../../redux/actions/userAction";
import LoaderComponent from "../../components/LoaderComponent";
import moment from "moment";
import { changePasswordService } from "../../services/Auth/Change Password/changePasswordService";
import {
  createUserBankDetailsService,
  getUserBankDetailsByUserIdService,
  updateUserBankDetailsService,
} from "../../services/App/User Bank Details/userBankDetailsService";

const EditProfilePage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const userSub = useSelector((state) => state.userReducer.activeSub);
  const user = useSelector((state) => state.userReducer?.data);
  const userProfile = useSelector(
    (state) =>
      state.userReducer?.data?.customerProfile ||
      state.userReducer?.data?.providerProfile
  );
  const [userBank, setUserBank] = useState({});
  const [userBankDetails, setUserBankDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [genders, setGenders] = useState([
    "male",
    "female",
    "Non-Binary",
    "Transgender",
    "Intersex",
  ]);
  const [selected, setSelected] = useState(userProfile?.gender);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);
  const [showBasicInfoSuccess, setShowBasicInfoSuccess] = useState(false);
  const [showBasicInfoForm, setShowBasicInfoForm] = useState(false);
  const [showYourAccount, setShowYourAcct] = useState(false);
  const [showYourBankAccount, setShowYourBankAcct] = useState(false);
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
    firstName: user?.firstName,
    lastName: user?.lastName,
    dob: userProfile?.dateOfBirth,
    gender: userProfile?.gender,
  });
  const [yourAccount, setYourAccount] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  function onChange(name, value) {
    setNotifications({ ...notifications, [name]: value });
  }

  function disabledDate(current) {
    return current && current > moment().subtract(18, "years");
  }

  const fetchUserBankDetails = async () => {
    setIsLoading(true);
    const response = await getUserBankDetailsByUserIdService(user?._id);
    if (response.ok) {
      setIsLoading(false);
      setUserBank(response?.data?.data[0]);
      setUserBankDetails(response?.data?.data[0]);
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  useEffect(() => {
    if (user?.userType?.toLowerCase() === "provider") {
      fetchUserBankDetails();
    }
  }, []);

  const handleSubmit = async (values, formName) => {
    if (formName === "basicInfo") {
      setIsLoading(true);
      /*const formdata = new FormData();
      formdata.append("dateOfBirth", basicInfo.dob);
      formdata.append("gender", basicInfo.gender);
      formdata.append("firstName", basicInfo.firstName);
      formdata.append("lastName", basicInfo.lastName);
      formdata.append("userId", user?._id);*/
      basicInfo.dateOfBirth = basicInfo.dob;
      basicInfo.userId = user?._id;
      const response = await updateProfile(basicInfo);
      setIsLoading(false);
      if (response.ok) {
        setShowBasicInfoForm(false);
        setShowBasicInfoSuccess(true);
        dispatch(adminFetchUserAction(user?._id));
      } else {
        message.error(
          response?.data?.errors[0].message || "Something went wrong"
        );
      }
    } else if (formName === "bankAcct") {
      setIsLoading(true);
      userBank.user = user?._id;
      userBank.primaryAccount = true;
      console.log("user bank details = ", Object.keys(userBankDetails));
      const response =
        Object.keys(userBankDetails)?.length === 0
          ? await createUserBankDetailsService(userBank)
          : await updateUserBankDetailsService(userBank);

      setIsLoading(false);
      if (response.ok) {
        setShowYourBankAcct(false);
        message.success("Bank Details Updated!");
      } else {
        message.error(
          response?.data?.errors[0].message || "Something went wrong"
        );
      }
    } else {
      setIsLoading(true);
      yourAccount.userId = user?._id;
      const response = await changePasswordService(yourAccount);
      setIsLoading(false);
      if (response.ok) {
        setShowYourAcct(false);
        setShowPasswordSuccess(true);
      } else {
        message.error(
          response?.data?.errors[0].message || "Something went wrong"
        );
      }
    }
  };

  const handleChangeBasicinfo = (name, value) => {
    setBasicInfo({ ...basicInfo, [name]: value });
  };

  const handleChangeAcctinfo = (name, value) => {
    setYourAccount({ ...yourAccount, [name]: value });
  };

  const handleChangeBankAcctinfo = (name, value) => {
    setUserBank({ ...userBank, [name]: value });
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
            initialValue={user?.firstName}
            name="firstName"
            label="First Name"
            /*   rules={[
              {
                required: true,
                message: "Required field",
              },
            ]}*/
          >
            <Input
              onChange={(e) =>
                handleChangeBasicinfo("firstName", e.target.value)
              }
            />
          </Form.Item>

          <Form.Item
            className="mb-3 mb-md-0 mt-2"
            initialValue={user?.lastName}
            name="lastName"
            label="Last Name"
            /*    rules={[
              {
                required: true,
                message: "Required field",
              },
            ]}*/
          >
            <Input
              onChange={(e) =>
                handleChangeBasicinfo("lastName", e.target.value)
              }
            />
          </Form.Item>

          <Form.Item
            className="mb-3 mb-md-0 mt-2"
            initialValue=""
            name="dob"
            label="Date of Birth"
            /*   rules={[
              {
                required: true,
                message: "Required field",
              },
            ]}*/
          >
            <DatePicker
              placeholder="Date Of Birth"
              onChange={(date, dateString) =>
                handleChangeBasicinfo(
                  "dob",
                  moment(date).utc().format("DD-MM-YYYY")
                )
              }
              disabledDate={disabledDate}
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
                    {toSentenceCase(item)}
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
            name="oldPassword"
            label="Old Password"
            rules={[
              {
                required: true,
                message: "Required field",
              },
            ]}
          >
            <Input
              onChange={(e) =>
                handleChangeAcctinfo("oldPassword", e.target.value)
              }
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 6,
                message: "Password must contain atleast 6 digits",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              onChange={(e) =>
                handleChangeAcctinfo("newPassword", e.target.value)
              }
            />
          </Form.Item>

          <Form.Item
            name="confirmNewPassword"
            label="Confirm New Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
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
                handleChangeAcctinfo("confirmNewPassword", e.target.value)
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

  const yourBankAccountForm = () => {
    return (
      <>
        <Form
          layout="vertical"
          scrollToFirstError
          onFinish={(values) => handleSubmit(values, "bankAcct")}
        >
          <Form.Item
            className="mb-3 mb-md-0 mt-2"
            name="bankName"
            label="Bank Name"
            rules={[
              {
                required: true,
                message: "Required field",
              },
            ]}
          >
            <Input
              onChange={(e) =>
                handleChangeBankAcctinfo("bankName", e.target.value)
              }
            />
          </Form.Item>

          <Form.Item
            className="mb-3 mb-md-0 mt-2"
            name="accountName"
            label="Account Name"
            rules={[
              {
                required: true,
                message: "Required field",
              },
            ]}
          >
            <Input
              onChange={(e) =>
                handleChangeBankAcctinfo("accountName", e.target.value)
              }
            />
          </Form.Item>

          <Form.Item
            className="mb-3 mb-md-0 mt-2"
            name="accountNumber"
            label="Account Number"
            rules={[
              {
                required: true,
                message: "Required field",
              },
            ]}
          >
            <Input
              onChange={(e) =>
                handleChangeBankAcctinfo("accountNumber", e.target.value)
              }
            />
          </Form.Item>
          <br />
          <div className="d-block d-md-flex justify-content-md-between">
            <button className="btn btn-primary btn-sm-block btn-md-auto mr-md-3 mb-3 mb-md-0">
              Save
            </button>
            <button
              onClick={() => setShowYourBankAcct(false)}
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
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <section className="profile pb-5">
          <div className="row">
            <SubscribePremium
              handlePremium={() => setShowActivatePremium(true)}
              subscribed={userSub?.length > 0}
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
                      <small className="text-muted">{`${user?.firstName} ${user?.lastName}`}</small>
                    </div>
                    <div className="d-flex justify-content-between mb-4">
                      <small className="text-dark"> Date Of Birth </small>
                      <small className="text-muted">
                        {userProfile?.dateOfBirth}
                      </small>
                    </div>
                    <div className="d-flex justify-content-between mb-4">
                      <small className="text-dark"> Gender </small>
                      <small className="text-muted">
                        {toSentenceCase(userProfile?.gender)}
                      </small>
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
              {user?.userType?.toLowerCase() === "provider" && (
                <>
                  <br />
                  <div
                    className={`dotted-divider ${mobile ? "w-100" : "w-50"}`}
                  />
                  <br />

                  <div className="col-md-6 mt-3">
                    <div className="d-flex align-items-center mb-5">
                      <h5 className="padding-none mr-5">Bank Details</h5>
                      <AiOutlineEdit
                        onClick={() => setShowYourBankAcct(true)}
                        size="2rem"
                        className="cursor"
                      />
                    </div>
                    {user?.userType?.toLowerCase() === "customer" &&
                    showYourBankAccount ? (
                      yourBankAccountForm()
                    ) : (
                      <>
                        <div className="d-flex justify-content-between mb-4">
                          <small className="text-dark"> Bank Name </small>
                          <small className="text-muted">
                            {userBank?.bankName}
                          </small>
                        </div>
                        <div className="d-flex justify-content-between mb-4">
                          <small className="text-dark"> Account Name </small>
                          <small className="text-muted">
                            {userBank?.accountName}
                          </small>
                        </div>
                        <div className="d-flex justify-content-between mb-4">
                          <small className="text-dark"> Account Number </small>
                          <small className="text-muted">
                            {userBank?.accountNumber}
                          </small>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
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
      )}
      <SuccessModal
        visible={showSuccess || showPasswordSuccess || showBasicInfoSuccess}
        onCancel={() => {
          setShowSuccess(false);
          setShowPasswordSuccess(false);
          setShowBasicInfoSuccess(false);
        }}
        title="Changes saved successfully"
        subtitle="Have fun on Whisper"
        image={modalImg}
      />
    </HomeContainerPage>
  );
};

export default EditProfilePage;
