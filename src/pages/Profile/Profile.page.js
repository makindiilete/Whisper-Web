import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import { HomeContainerPage } from "../Home/HomeContainer.page";
import { SubscribePremium } from "../../components/SubscribePremium";
import customer from "../../assets/css/customerHome.module.css";
import {
  AiOutlineEdit,
  FiLogOut,
  GrTrash,
  GrUserSettings,
} from "react-icons/all";
import { Upload } from "antd";
import LoaderComponent from "../../components/LoaderComponent";
import "../../assets/css/ProfilePage.css";
import { Badge } from "../../components/Badge";
import MapComponent from "../../components/MapComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import routes from "../../routes";
import DeleteAccountModal from "../../components/DeleteAccountModal";
import modalImg from "../../assets/images/auth/40.svg";
import deleteImg from "../../assets/images/deleteAcct.png";
import SuccessModal from "../../components/Modals/successModal";

const ProfilePage = () => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [loadingImg, setLoadingImg] = useState({
    status: false,
    id: null,
  });
  const [premiumActive, setPremiumActive] = useState(false);
  const [showActivatePremium, setShowActivatePremium] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [images, setImages] = useState([
    { id: 1, url: null },
    { id: 2, url: null },
    { id: 3, url: null },
    { id: 4, url: null },
    { id: 5, url: null },
    { id: 6, url: null },
  ]);

  function handleLogout() {
    localStorage.removeItem("user");
    history.push(routes.login);
  }

  const props = {
    progress: {
      strokeColor: {
        "0%": "#e8dcfe",
        "70%": "#190a36",
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
    beforeUpload: (file) => {
      return false;
    },
  };

  const handleDeleteImg = (id) => {
    let arr = [...images];
    let imgToChange = arr.find((i) => i.id === id);
    imgToChange.url = null;
    setImages(arr);
    handleShowContinueBtn(arr);
  };

  const handleGeneratePreview = (info, id) => {
    let arr = [...images];
    let imgToChange = arr.find((i) => i.id === id);
    if (info.file.status !== "uploading") {
    }
    imgToChange.url = URL.createObjectURL(info.file);
    setImages(arr);
    handleShowContinueBtn(arr);
  };

  const handleShowContinueBtn = (array = []) => {
    let arr = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].url) {
        arr.push(array[i]);
      }
    }
    if (arr?.length > 0) {
      setShowContinue(true);
    } else {
      setShowContinue(false);
    }
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
            <div className="d-md-flex justify-content-md-end">
              <div
                className="d-flex align-items-center mr-md-5 mb-3 mb-md-0 cursor"
                onClick={() => history.push(routes.EDIT_PROFILE)}
              >
                <FontAwesomeIcon
                  icon={icons.faUserCog}
                  className="primary-text"
                />
                <p className="primary-text padding-none ml-2">Edit Settings</p>
              </div>
              <div>
                <button
                  className="btn btn-outline-primary btn-sm-block btn-md-auto"
                  onClick={() => {
                    history.push(routes.usertype);
                    localStorage.setItem("promoteToProvider", "yes");
                  }}
                >
                  Become a Provider
                </button>
              </div>
            </div>
            <br />
            <h4>{`${user?.name}, ${user?.age}`}</h4>
            <br />
            <br />
            <div className="ml-md-5 grid__Container">
              {images?.map((img) => (
                <div className={mobile ? "w-100" : ""}>
                  <Upload
                    style={mobile ? { width: "100%" } : null}
                    disabled={img?.url}
                    accept="image/*"
                    {...props}
                    showUploadList={false}
                    maxCount={1}
                    onChange={(info) => handleGeneratePreview(info, img?.id)}
                  >
                    <div className="uploadBox img">
                      {loadingImg.status && img?.id === loadingImg.id ? (
                        <LoaderComponent theme="primaryLight" />
                      ) : img?.url ? (
                        <div
                          className="position-relative"
                          style={mobile ? { width: "100%" } : null}
                        >
                          <img src={img?.url} alt="" className="img-fluid" />
                          <div
                            className="cursor p-2 bg-light d-flex justify-content-center align-items-center position-absolute"
                            style={{
                              top: "1rem",
                              right: "1rem",
                              borderRadius: "5px",
                            }}
                            onClick={() => handleDeleteImg(img?.id)}
                          >
                            <GrTrash />
                          </div>
                        </div>
                      ) : (
                        <div className="cursor d-flex justify-content-center align-items-center imgThumbnail">
                          <p className="font-weight-bold">+</p>
                        </div>
                      )}
                    </div>
                  </Upload>
                </div>
              ))}
            </div>
            <div className="dotted-divider w-100" />
            <section className="bio mt-5">
              <div className="col-md-8">
                <div className="d-flex justify-content-between">
                  <h5>Bio</h5>
                  <AiOutlineEdit
                    onClick={() => history.push(routes.EDIT_PROFILE)}
                    size="2rem"
                    className="cursor"
                  />
                </div>
                <div>
                  <small className="text-muted">{user?.bio}</small>
                </div>
              </div>
              <br />
              <div className="col-md-8 mt-3">
                <div className="d-flex justify-content-between">
                  <h5>Attributes</h5>
                  <AiOutlineEdit
                    onClick={() => history.push(routes.EDIT_PROFILE)}
                    size="2rem"
                    className="cursor"
                  />
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <small className="text-muted"> Body Type </small>
                  <small className="text-muted">
                    {user?.attributes?.bodyType}
                  </small>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <small className="text-muted"> Height </small>
                  <small className="text-muted">
                    {user?.attributes?.Height}
                  </small>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <small className="text-muted"> Education </small>
                  <small className="text-muted">
                    {user?.attributes?.Education}
                  </small>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <small className="text-muted"> Drinking </small>
                  <small className="text-muted">
                    {user?.attributes?.Drinking}
                  </small>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <small className="text-muted"> Smoking </small>
                  <small className="text-muted">
                    {user?.attributes?.Smoking}
                  </small>
                </div>
              </div>
              <br />
              <div className="dotted-divider w-100" />
              <br />
              <div className="col-md-8">
                <div className="d-flex justify-content-between">
                  <h5>I am interested in</h5>
                  <AiOutlineEdit
                    onClick={() => history.push(routes.EDIT_PROFILE)}
                    size="2rem"
                    className="cursor"
                  />
                </div>
                <div>
                  {user?.interests?.map((item) => (
                    <Badge text={item} key={item} />
                  ))}
                </div>
              </div>
              <br />
              <div className="dotted-divider w-100" />
              <br />
              <div className="col-md-8">
                <div className="d-flex justify-content-between">
                  <h5>I am here for</h5>
                  <AiOutlineEdit
                    onClick={() => history.push(routes.EDIT_PROFILE)}
                    size="2rem"
                    className="cursor"
                  />
                </div>
                <div>
                  {user?.hereFor?.map((item) => (
                    <Badge text={item} key={item} />
                  ))}
                </div>
              </div>
              <br />
              <div className="dotted-divider w-100" />

              <br />
              <div className="col-md-8">
                <div className="d-flex justify-content-between">
                  <h5>Job Title</h5>
                  <h5>Phone Number</h5>
                  <h5>Email</h5>
                  <AiOutlineEdit
                    onClick={() => history.push(routes.EDIT_PROFILE)}
                    size="2rem"
                    className="cursor"
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <small className="text-muted">{user?.occupation}</small>
                  </div>
                  <div>
                    <small className="text-muted">{user?.phone}</small>
                  </div>
                  <div>
                    <small className="text-muted">{user?.email}</small>
                  </div>
                </div>
              </div>
              <br />
              <div className="dotted-divider w-100" />

              <br />
              <div className="col-md-8" style={{ height: "20rem" }}>
                <h5>Location</h5>

                <div>
                  <MapComponent />
                </div>
              </div>
              <br />
              <br />
              <br />
              <div className="col-md-8 d-md-flex justify-content-md-between">
                <button
                  className="btn btn-outline-primary  btn-sm-block btn-md-auto mb-2 mb-md-0 mr-md-3"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete Account
                </button>
                <button
                  className="btn btn-primary btn-sm-block btn-md-auto"
                  onClick={handleLogout}
                >
                  <FiLogOut /> Logout
                </button>
              </div>
            </section>
          </div>
        </div>
        {/* /.row */}
      </section>
      <DeleteAccountModal
        visible={showDeleteModal}
        onCancel={(arg) => {
          if (arg === "continue") {
            setShowDeleteModal(false);
            setShowSuccess(true);
          } else {
            setShowDeleteModal(false);
          }
        }}
      />

      <SuccessModal
        visible={showSuccess}
        onCancel={() => {
          setShowSuccess(false);
          handleLogout();
        }}
        title="Your account has been permanently deleted."
        subtitle=""
        image={deleteImg}
      />
    </HomeContainerPage>
  );
};

export default ProfilePage;
