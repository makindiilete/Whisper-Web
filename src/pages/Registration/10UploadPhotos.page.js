//59, 60,
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import SuccessModal from "../../components/Modals/successModal";
import warningImg from "../../assets/images/auth/warning.svg";
import LoaderComponent from "../../components/LoaderComponent";
import { BiRightArrowAlt, FaAngleLeft, GrTrash } from "react-icons/all";
import styles from "../../assets/css/auth/yourAttributes.module.css";
import routes from "../../routes";
import AuthContainerPage from "./AuthContainer.page";
import { Input, message, Switch, Upload } from "antd";
import { v4 as uuidv4 } from "uuid";
import { updateCustomerProfileService } from "../../services/Customers/Profile/ProfileService";
import { updateProviderProfileService } from "../../services/Providers/Profile/ProfileService";
import { adminFetchUserAction } from "../../redux/actions/userAction";
import {
  uploadCustomerGalleryService,
  uploadCustomerGalleryWithLinkService,
} from "../../services/Customers/Gallery/GalleryService";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadProviderGalleryService,
  uploadProviderGalleryWithLinkService,
} from "../../services/Providers/Gallery/Gallery";

const UploadPhotosPage = () => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const user = useSelector((state) => state.userReducer?.data);
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [caption, setCaption] = useState("");
  const [makePrivate, setMakePrivate] = useState(true);
  const [showContinue, setShowContinue] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState({
    status: false,
    id: null,
  });
  const [images, setImages] = useState([
    { id: 1, url: null },
    { id: 2, url: null },
    { id: 3, url: null },
    { id: 4, url: null },
    /*  { id: 5, url: null },
    { id: 6, url: null },
    { id: 7, url: null },
    { id: 8, url: null },*/
  ]);

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

  const handleDeleteImg = (id, index) => {
    let arr = [...images];
    let imgToChange = arr.find((i) => i.id === id);
    imgToChange.url = null;
    setImages(arr);
    let filesTo = files;
    filesTo = filesTo.filter((f) => f.id !== id);
    setFiles(filesTo);
    handleShowContinueBtn(arr);
  };

  const handleGeneratePreview = (info, id) => {
    console.log("id sent = ", id);
    let arr = [...images];
    let imgToChange = arr.find((i) => i.id === id);
    if (info.file.status !== "uploading") {
    }
    imgToChange.url = URL.createObjectURL(info.file);
    setImages(arr);
    setFiles([...files, { id: id, file: info.file }]);
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

  const handleSubmit = async () => {
    setIsLoading(true);
    const formdata = new FormData();

    formdata.append("userId", user?._id);
    formdata.append("caption", caption);
    formdata.append("isPrivate", makePrivate);
    files.map((item) => {
      if (item?.file) {
        formdata.append("galleryPictures", item?.file);
      }
    });
    const response =
      user?.userType?.toLowerCase() === "customer"
        ? await uploadCustomerGalleryService(formdata)
        : await uploadProviderGalleryService(formdata);
    setIsLoading(false);
    if (response.ok) {
      if (user?.userType?.toLowerCase() === "customer") {
        history.push(routes.whatYouAreLookingFor);
      } else {
        history.push(routes.whoWillYouProvideTo);
      }
      dispatch(adminFetchUserAction(user?._id));
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  return (
    <>
      <AuthContainerPage>
        {isLoading ? (
          <LoaderComponent />
        ) : (
          <div className="uploadPhotos position-relative ">
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
                // style={{ minHeight: "47.4rem", marginBottom: "-10rem" }}
                style={{ minHeight: "47.4rem" }}
              >
                <div className="w-100">
                  <br />
                  <h4 className="text-center mt-5 mt-md-0">
                    Upload your Photos
                  </h4>
                  <p className="text-center">Add your best photos</p>
                </div>
                <div
                  className="d-flex justify-content-between flex-wrap"
                  style={mobile ? null : { margin: "0 15rem" }}
                >
                  {images?.map((img, index) => (
                    <div className={mobile ? "w-100" : ""}>
                      <Upload
                        style={mobile ? { width: "100%" } : null}
                        disabled={img?.url}
                        accept="image/*"
                        {...props}
                        showUploadList={false}
                        maxCount={1}
                        onChange={(info) =>
                          handleGeneratePreview(info, img?.id)
                        }
                      >
                        <div className="uploadBox img">
                          {loadingImg.status && img?.id === loadingImg.id ? (
                            <LoaderComponent theme="primaryLight" />
                          ) : img?.url ? (
                            <div
                              className="position-relative"
                              style={mobile ? { width: "100%" } : null}
                            >
                              <img
                                src={img?.url}
                                alt=""
                                className="img-fluid"
                                style={
                                  mobile
                                    ? {
                                        width: "100%",
                                        height: "25rem",
                                        objectFit: "cover",
                                      }
                                    : {
                                        height: "16.8rem",
                                        width: "16.8rem",
                                        objectFit: "cover",
                                      }
                                }
                              />
                              <div
                                className="cursor p-2 bg-light d-flex justify-content-center align-items-center position-absolute"
                                style={{
                                  top: "1rem",
                                  right: "1rem",
                                  borderRadius: "5px",
                                }}
                                onClick={() => handleDeleteImg(img?.id, index)}
                              >
                                <GrTrash />
                              </div>
                            </div>
                          ) : (
                            <div
                              className="cursor d-flex justify-content-center align-items-center"
                              style={{
                                width: mobile ? "100%" : "16.8rem",
                                height: "16.8rem",
                              }}
                            >
                              <p className="font-weight-bold">+</p>
                            </div>
                          )}
                        </div>
                      </Upload>
                    </div>
                  ))}
                </div>
                <div className="row">
                  <div
                    className={`col-md-8 offset-md-2 ${styles.attributesCol} `}
                  >
                    {user?.userType?.toLowerCase() === "customer" ? (
                      <div className="d-flex justify-content-center">
                        <Input
                          className="mt-3 mt-md-0"
                          placeholder="Add Caption"
                          style={
                            mobile ? { width: "100%" } : { width: "25rem" }
                          }
                          onChange={(e) => setCaption(e.target.value)}
                        />
                      </div>
                    ) : (
                      <div className="flexrowaround align-items-md-center">
                        <Switch
                          checkedChildren="Make Private"
                          unCheckedChildren="Make Public"
                          defaultChecked={makePrivate}
                          onChange={() => setMakePrivate(!makePrivate)}
                        />
                        <Input
                          className="mt-3 mt-md-0"
                          placeholder="Add Caption"
                          style={
                            mobile ? { width: "100%" } : { width: "25rem" }
                          }
                          onChange={(e) => setCaption(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div
                    className={`col-md-6 offset-md-3 ${styles.attributesCol} `}
                  >
                    <p
                      className="primary-text text-center cursor"
                      onClick={() => {
                        if (user?.userType?.toLowerCase() === "customer") {
                          history.push(routes.whatYouAreLookingFor);
                        } else {
                          history.push(routes.whoWillYouProvideTo);
                        }
                      }}
                    >
                      Skip <BiRightArrowAlt className="ml-3" />
                    </p>
                  </div>
                </div>
                {showContinue && (
                  <div className="row">
                    <div
                      className={`col-md-6 offset-md-3 ${styles.attributesCol} `}
                    >
                      <button
                        className={`btn btn-primary btn-block`}
                        onClick={handleSubmit}
                      >
                        Continue
                      </button>
                    </div>
                    {/* /.col-md-6 offset-md-3 */}
                  </div>
                )}
              </div>
            </div>
            {/* /.col-md-6 */}
          </div>
        )}
      </AuthContainerPage>

      <SuccessModal
        title="Notice!"
        subtitle="Please Note that Nude pictures are not allowed, put in your best and sexiest picture without being completely nude.

Nude images will be flagged and taken down.  Violating account could be blocked. "
        visible={showWarning}
        onCancel={() => setShowWarning(false)}
        showButton
        btnText="Continue"
        btnClickHandler={() => setShowWarning(false)}
        image={warningImg}
      />
    </>
  );
};

export default UploadPhotosPage;
