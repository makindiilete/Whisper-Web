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
import { message, Upload } from "antd";

const UploadPhotosPage = () => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
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
    { id: 5, url: null },
    { id: 6, url: null },
    { id: 7, url: null },
    { id: 8, url: null },
  ]);

  const props = {
    // name: "file",
    // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    // headers: {
    //   authorization: "authorization-text",
    // },
    progress: {
      strokeColor: {
        "0%": "#e8dcfe",
        "70%": "#190a36",
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
    beforeUpload: (file) => {
      console.log("file to upload = ", file);
      // this.setState(state => ({
      //   fileList: [...state.fileList, file],
      // }));
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
    // setLoadingImg({ status: true, id: id });
    let arr = [...images];
    let imgToChange = arr.find((i) => i.id === id);
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    imgToChange.url = URL.createObjectURL(info.file);
    // "https://cdn.pixabay.com/photo/2014/01/30/01/36/girl-254708_960_720.jpg";
    /*    if (info.file.status === "done") {
      imgToChange.url =
        "https://cdn.pixabay.com/photo/2014/01/30/01/36/girl-254708_960_720.jpg";
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      imgToChange.url =
        "https://cdn.pixabay.com/photo/2014/01/30/01/36/girl-254708_960_720.jpg";
      // message.error(`${info.file.name} file upload failed.`);
      message.success(`${info.file.name} file uploaded successfully`);
    }*/
    setImages(arr);
    handleShowContinueBtn(arr);
    /* setTimeout(() => {
      setLoadingImg({ status: false, id: null });
      setImages(arr);
      handleShowContinueBtn(arr);
    }, 2000);*/
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
                  {images?.map((img) => (
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
                            <div className="position-relative">
                              <img
                                src={img?.url}
                                alt=""
                                className="img-fluid"
                                style={{
                                  width: "30rem",
                                  height: "16.8rem",
                                  objectFit: "cover",
                                }}
                              />
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
                    className={`col-md-6 offset-md-3 ${styles.attributesCol} `}
                  >
                    <p
                      className="primary-text text-center cursor"
                      onClick={() => {
                        if (localStorage.getItem("userType") === "customer") {
                          history.push(routes.whatYouAreLookingFor);
                        } else {
                          history.push(routes.serviceYouWantToRender);
                        }
                      }}
                    >
                      Skip <BiRightArrowAlt className="ml-3" />
                    </p>
                  </div>
                  {/* /.col-md-6 offset-md-3 */}
                </div>
                {showContinue && (
                  <div className="row">
                    <div
                      className={`col-md-6 offset-md-3 ${styles.attributesCol} `}
                    >
                      <button
                        className={`btn btn-primary btn-block`}
                        onClick={() => {
                          if (localStorage.getItem("userType") === "customer") {
                            history.push(routes.whatYouAreLookingFor);
                          } else {
                            history.push(routes.serviceYouWantToRender);
                          }
                        }}
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
