// 58,
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import AuthContainerPage from "./AuthContainer.page";
import LoaderComponent from "../../components/LoaderComponent";
import { FaAngleLeft } from "react-icons/all";
import styles from "../../assets/css/auth/yourAttributes.module.css";
import routes from "../../routes";
import { Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomerProfileService } from "../../services/Customers/Profile/ProfileService";
import { updateProviderProfileService } from "../../services/Providers/Profile/ProfileService";
import { adminFetchUserAction } from "../../redux/actions/userAction";

const AboutYourselfPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.userReducer?.data);
  const [bio, setBio] = useState("");

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("userId", user?._id);
    formdata.append("biography", bio);
    const response =
      user?.userType?.toLowerCase() === "customer"
        ? await updateCustomerProfileService(formdata)
        : await updateProviderProfileService(formdata);
    setIsLoading(false);
    if (response.ok) {
      dispatch(adminFetchUserAction(user?._id));
      history.push(routes.uploadYourPhotos);
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  return (
    <AuthContainerPage>
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <div className="typeOfUser position-relative ">
          <FaAngleLeft
            fontSize={mobile ? "4rem" : "2rem"}
            color="#000"
            style={{
              position: "absolute",
              top: mobile ? "3rem" : "3.5rem",
              left: "5rem",
              cursor: "pointer",
              zIndex: "999999",
            }}
            onClick={() => history.goBack()}
          />
          <div className="container px-5 pb-5 pb-md-0">
            <div
              className="d-flex flex-column justify-content-around"
              style={{ minHeight: "47.4rem" }}
            >
              <div className="w-100">
                <br />
                <h4 className="text-center mt-5 mt-md-0">
                  Tell Us a little bit about yourself
                </h4>
                <p className="text-center">
                  Just a little information about yourself.
                </p>
              </div>
              <div className={`col-md-6 offset-md-3 ${styles.attributesCol} `}>
                <Form
                  layout="vertical"
                  scrollToFirstError
                  onFinish={handleSubmit}
                >
                  <Form.Item
                    className="mb-3 mb-md-0 mt-2"
                    initialValue=""
                    name="otp"
                    rules={[{ required: true, message: "Required field" }]}
                  >
                    <Input.TextArea
                      placeholder="Bio"
                      showCount
                      rows={5}
                      maxLength={140}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </Form.Item>
                  <br />
                  <button className={`btn btn-primary btn-block`}>
                    Continue
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
    </AuthContainerPage>
  );
};

export default AboutYourselfPage;
