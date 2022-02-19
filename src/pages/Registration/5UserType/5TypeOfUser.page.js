//19, 69,
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../../hooks/useMobile";
import { FaAngleLeft } from "react-icons/all";
import AuthContainerPage from "../AuthContainer.page";
import img1 from "../../../assets/images/auth/typeOfuser/Group 741.svg";
import img2 from "../../../assets/images/auth/typeOfuser/SVG/provider.svg";
import routes from "../../../routes";
import { updateUserTypeService } from "../../../services/Auth/Registration/registrationService";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { adminFetchUserAction } from "../../../redux/actions/userAction";

const TypeOfUserPage = (props) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.userReducer?.data);

  useEffect(() => {
    if (localStorage.getItem("promoteToProvider")) {
      setSelected(2);
    }
    return () => {
      localStorage.removeItem("promoteToProvider");
    };
  }, []);

  const updateUser = async () => {
    setIsLoading(true);
    const response = await updateUserTypeService({
      userId: user?._id,
      userType: selected === 1 ? "Customer" : "Provider",
    });
    setIsLoading(false);
    if (response.ok) {
      dispatch(adminFetchUserAction(user?._id));
      if (selected === 1) {
        history.push(`${routes.createyourprofile}?step=1`);
      } else {
        history.push(routes.providerServiceType);
      }
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  return (
    <AuthContainerPage>
      <div className="typeOfUser position-relative">
        {/*  <FaAngleLeft
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
        />*/}
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="d-flex flex-column justify-content-around h-100">
              <div className="w-100">
                <h4 className="text-center mt-5 mt-md-0">
                  What type of user are you?
                </h4>
                <p className="text-center">
                  Start by choosing the type of user you <br /> want to be on
                  Whisper.
                </p>
              </div>
              <div className="flexrowbetween typeOfUser__cards">
                <div
                  className={`d-flex justify-content-center align-items-center mr-md-5  ${
                    selected === 1 && "active"
                  }`}
                  onClick={() => setSelected(1)}
                >
                  <div className="d-flex flex-column">
                    <div className="d-flex justify-content-center">
                      <img
                        src={img1}
                        className="img-fluid"
                        alt=""
                        style={{
                          width: "6.2rem",
                          objectFit: "contain",
                          height: "6.2rem",
                        }}
                      />
                    </div>
                    <h5 className="text-center mt-4">Customer</h5>
                    <small className="text-center">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sodales proin enim
                    </small>
                  </div>
                </div>
                <div
                  className={`d-flex justify-content-center align-items-center  ${
                    selected === 2 && "active"
                  }`}
                  onClick={() => setSelected(2)}
                >
                  <div className="d-flex flex-column">
                    <div className="d-flex justify-content-center">
                      <img
                        src={img2}
                        className="img-fluid"
                        alt=""
                        style={{
                          width: "6.2rem",
                          objectFit: "contain",
                          height: "6.2rem",
                        }}
                      />
                    </div>
                    <h5 className="text-center mt-4">Provider</h5>
                    <small className="text-center">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sodales proin enim
                    </small>
                  </div>
                </div>
              </div>
              {/* /.d-flex justify-content-between */}
              <button
                className="btn btn-primary btn-block mb-5"
                onClick={updateUser}
                disabled={!selected || isLoading}
              >
                {isLoading ? (
                  <span className="spinner-border text-white" />
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </div>
          {/* /.col-md-6 */}
        </div>
      </div>
    </AuthContainerPage>
  );
};

export default TypeOfUserPage;
