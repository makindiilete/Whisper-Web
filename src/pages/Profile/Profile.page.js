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
import { message, Upload, Image } from "antd";
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
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCustomerGalleryService,
  getCustomerGalleryByIdService,
  uploadCustomerGalleryService,
} from "../../services/Customers/Gallery/GalleryService";
import {
  deleteProviderGalleryService,
  getProviderGalleryByIdService,
  uploadProviderGalleryService,
} from "../../services/Providers/Gallery/Gallery";
import {
  adminFetchUserAction,
  fetchUserGalleryAction,
} from "../../redux/actions/userAction";
import PopUpModal from "../../components/Modals/popUpModal";
import { constants } from "../../redux/actions/types";
import { useCoords } from "../../hooks/useCoords";

const ProfilePage = () => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const coords = useCoords();
  const user = useSelector((state) => state.userReducer?.data);
  const userProfile = useSelector(
    (state) =>
      state.userReducer?.data?.customerProfile ||
      state.userReducer?.data?.providerProfile
  );
  const userPref = useSelector(
    (state) => state.userReducer?.data?.customerPreference
  );
  const providerService = useSelector(
    (state) => state.userReducer?.data?.providerService
  );
  const userAttributes = useSelector(
    (state) =>
      state.userReducer?.data?.customerAttributes ||
      state.userReducer?.data?.providerAttributes
  );
  const userGallery = useSelector((state) => state.userReducer?.gallery);
  const galleryLoading = useSelector(
    (state) => state.userReducer?.galleryLoading
  );
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0,
  });
  const [imgPreview, setImgPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState({
    type: "",
    status: false,
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedImgInfo, setSelectedImgInfo] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [loadingImg, setLoadingImg] = useState({
    status: false,
    id: null,
  });
  const [premiumActive, setPremiumActive] = useState(false);
  const [showActivatePremium, setShowActivatePremium] = useState(false);
  const [images, setImages] = useState([
    { id: 0, url: null },
    { id: 1, url: null },
    { id: 2, url: null },
    { id: 3, url: null },
    { id: 4, url: null },
    { id: 5, url: null },
  ]);

  const handleSetUserImages = (pics) => {
    let gallery = [...images];
    for (let i = 0; i < pics.length; i++) {
      gallery[i].id = i;
      gallery[i].url = pics[i].imageUri[0];
      gallery[i].deleteId = pics[i]?._id;
    }
    for (let i = 0; i < gallery.length; i++) {
      if (!gallery[i]?.deleteId || gallery[i]?.deleteId === null) {
        gallery[i].url = null;
      }
    }
    setImages(gallery);
  };

  const fetchGallery = async () => {
    const response =
      user?.userType?.toLowerCase() === "customer"
        ? await getCustomerGalleryByIdService(user?._id)
        : await getProviderGalleryByIdService(user?._id);
    if (response.ok) {
      dispatch(fetchUserGalleryAction(response?.data?.data));
      handleSetUserImages(response?.data?.data);
    } else {
      message.error(
        response?.data?.errors[0].message ||
          "Something went wrong fetching gallery"
      );
    }
  };

  useEffect(() => {
    coords
      .getCoords(userProfile?.city, userProfile?.state, userProfile?.country)
      .then((r) => setCoordinates({ lat: r.lat, lng: r.lng }))
      .catch((error) => message.error("Could not fetch coordinates."));
    fetchGallery();
  }, []);

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

  const handleImageUpload = async (file) => {
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("userId", user?._id);
    formdata.append("caption", "");
    formdata.append("isPrivate", true);
    formdata.append("galleryPictures", file);
    const response =
      user?.userType?.toLowerCase() === "customer"
        ? await uploadCustomerGalleryService(formdata)
        : await uploadProviderGalleryService(formdata);
    setIsLoading(false);
    if (response.ok) {
      let gallery = [...images];
      for (let i = 0; i < gallery.length; i++) {
        gallery[i].url = null;
      }
      setImages(gallery);
      message.success("Image uploaded successfully!");
      fetchGallery();
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  const handleImageDelete = async () => {
    setIsLoading(true);
    const response =
      user?.userType?.toLowerCase() === "customer"
        ? await deleteCustomerGalleryService(selectedImgInfo?.deleteId)
        : await deleteProviderGalleryService(selectedImgInfo?.deleteId);
    setIsLoading(false);
    if (response.ok) {
      let gallery = [...images];
      for (let i = 0; i < gallery.length; i++) {
        gallery[i].url = null;
      }
      setImages(gallery);
      message.success("Image deleted successfully!");
      fetchGallery();
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
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
                  <p className="primary-text padding-none ml-2">
                    Edit Settings
                  </p>
                </div>
                <div>
                  <button
                    className="btn btn-outline-primary btn-sm-block btn-md-auto"
                    onClick={() => {
                      localStorage.removeItem("token");
                      history.push(routes.signup_createAccount);
                    }}
                  >
                    {user?.userType?.toLowerCase() === "customer"
                      ? "Become a Provider"
                      : "Become a Customer"}
                  </button>
                </div>
              </div>
              <br />
              <h4>{`${user?.firstName} ${user?.lastName} ${
                userProfile?.age || ""
              }`}</h4>
              <br />
              <br />
              <div className="ml-md-5 grid__Container">
                {images?.map((img) => (
                  <div key={img?.id} className={mobile ? "w-100" : ""}>
                    <Upload
                      style={mobile ? { width: "100%" } : null}
                      disabled={img?.url}
                      accept="image/*"
                      {...props}
                      showUploadList={false}
                      maxCount={1}
                      onChange={(info) => {
                        setImgPreview(URL.createObjectURL(info.file));
                        setSelectedImgInfo({ info: info, id: img?.id });
                        setShowConfirmation({ type: "upload", status: true });
                      }}
                    >
                      <div className="uploadBox img">
                        {loadingImg.status && img?.id === loadingImg.id ? (
                          <LoaderComponent theme="primaryLight" />
                        ) : img?.url ? (
                          <div
                            className="position-relative"
                            style={mobile ? { width: "100%" } : null}
                          >
                            <Image
                              src={img?.url}
                              alt=""
                              className="img-fluid"
                            />
                            <div
                              className="cursor p-2 bg-light d-flex justify-content-center align-items-center position-absolute"
                              style={{
                                top: "1rem",
                                right: "1rem",
                                borderRadius: "5px",
                              }}
                              onClick={() => {
                                setShowConfirmation({
                                  type: "delete",
                                  status: true,
                                });
                                setImgPreview(img?.url);
                                setSelectedImgInfo({
                                  info: null,
                                  id: img?.id,
                                  deleteId: img?.deleteId,
                                });
                              }}
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
                    <small className="text-muted">
                      {userProfile?.biography}
                    </small>
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
                      {userAttributes?.bodyType}
                    </small>
                  </div>
                  <div className="d-flex justify-content-between mb-4">
                    <small className="text-muted"> Height </small>
                    <small className="text-muted">
                      {userAttributes?.height}
                    </small>
                  </div>
                  <div className="d-flex justify-content-between mb-4">
                    <small className="text-muted"> Education </small>
                    <small className="text-muted">
                      {userAttributes?.education}
                    </small>
                  </div>
                  <div className="d-flex justify-content-between mb-4">
                    <small className="text-muted"> Drinking </small>
                    <small className="text-muted">
                      {userAttributes?.drinkType}
                    </small>
                  </div>
                  <div className="d-flex justify-content-between mb-4">
                    <small className="text-muted"> Smoking </small>
                    <small className="text-muted">
                      {user?.attributes?.smokeType}
                    </small>
                  </div>
                </div>
                <br />
                <div className="dotted-divider w-100" />

                <>
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
                    {user?.userType?.toLowerCase() === "customer" ? (
                      <div>
                        {userPref?.IAmInto?.map((item) => (
                          <Badge text={item} key={item} />
                        ))}
                      </div>
                    ) : (
                      <div>
                        {providerService?.providingFor?.map((item) => (
                          <Badge text={item} key={item} />
                        ))}
                      </div>
                    )}
                  </div>
                </>

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

                  {user?.userType?.toLowerCase() === "customer" ? (
                    <div>
                      {userPref?.lookingFor?.map((item) => (
                        <Badge text={item} key={item} />
                      ))}
                    </div>
                  ) : (
                    <div>
                      {["Anal", "Blow Job", "Group"]?.map((item) => (
                        <Badge text={item} key={item} />
                      ))}
                    </div>
                  )}
                </div>
                <br />
                <div className="dotted-divider w-100" />

                <br />
                <div className="col-md-8">
                  <div className="d-flex justify-content-between">
                    {/*<h5 className="text-white">Job Title</h5>*/}
                    <h5>Phone Number</h5>
                    <h5>Email</h5>
                    <AiOutlineEdit
                      onClick={() => history.push(routes.EDIT_PROFILE)}
                      size="2rem"
                      className="cursor"
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    {/*<div>
                    <small className="text-muted">{user?.occupation}</small>
                  </div>*/}
                    <div>
                      <small className="text-muted">{userProfile?.phone}</small>
                    </div>
                    <div>
                      <small className="text-muted">{user?.email}</small>
                    </div>
                    <AiOutlineEdit size="2rem" color="#fff" />
                  </div>
                </div>
                <br />
                <div className="dotted-divider w-100" />

                <br />
                <div className="col-md-8" style={{ height: "20rem" }}>
                  <h5>Location</h5>

                  <div>
                    <MapComponent
                      latt={coordinates.lat}
                      lngg={coordinates.lng}
                    />
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
      )}
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

      <PopUpModal
        visible={showConfirmation.status}
        deleteFn={showConfirmation.type === "delete"}
        uploadFn={showConfirmation.type === "upload"}
        imageToUpload={imgPreview}
        onCancel={(arg) => {
          if (arg === "continue" && showConfirmation.type === "delete") {
            setShowConfirmation({ type: "", status: false });
            handleImageDelete();
          } else if (arg === "continue" && showConfirmation.type === "upload") {
            setShowConfirmation({ type: "", status: false });
            handleImageUpload(selectedImgInfo.info.file);
          } else {
            setShowConfirmation({ type: "", status: false });
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
