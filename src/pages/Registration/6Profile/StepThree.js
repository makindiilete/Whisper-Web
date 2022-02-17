import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import useMobile from "../../../hooks/useMobile";
import { message, Upload } from "antd";
import { FiUpload } from "react-icons/all";
import routes from "../../../routes";
import {
  updateCustomerProfilePicService,
  updateCustomerProfileService,
} from "../../../services/Customers/Profile/ProfileService";
import { updateProviderProfileService } from "../../../services/Providers/Profile/ProfileService";
import { adminFetchUserAction } from "../../../redux/actions/userAction";
import { useDispatch } from "react-redux";

const StepThree = ({
  currentStep,
  setCurrentStep,
  title,
  subTitle,
  user,
  userType,
}) => {
  let location = useLocation();
  const history = useHistory();
  const mobile = useMobile();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [isLoading, setIsLoading] = useState(false);
  const [imgPath, setImgPath] = useState("");
  const [imgFile, setImgFile] = useState();

  const props = {
    // name: "file",
    // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    // headers: {
    //   authorization: "authorization-text",
    // },
    beforeUpload: (file) => {
      // this.setState(state => ({
      //   fileList: [...state.fileList, file],
      // }));
      return false;
    },
    onChange(info) {
      setImgPath(URL.createObjectURL(info.file));
      setImgFile(info.file);
      if (info.file.status !== "uploading") {
      }
      // if (info.file.status === "done") {
      //   setImgPath(URL.createObjectURL(info.file));
      //   message.success(`${info.file.name} file uploaded successfully`);
      // } else if (info.file.status === "error") {
      //   setImgPath(URL.createObjectURL(info.file));
      //   // message.error(`${info.file.name} file upload failed.`);
      //   message.success(`${info.file.name} file uploaded successfully`);
      // }
    },
    progress: {
      strokeColor: {
        "0%": "#e8dcfe",
        "70%": "#190a36",
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  const handleSubmit = async (values) => {
    const formdata = new FormData();
    formdata.append("profilePictures", imgFile);
    formdata.append("userId", user?._id);
    setIsLoading(true);
    const response =
      userType === "customer"
        ? await updateCustomerProfilePicService(formdata)
        : await updateCustomerProfilePicService(formdata);
    setIsLoading(false);
    if (response.ok) {
      dispatch(adminFetchUserAction(user?._id));
      history.push(routes.verifyphonenumber);
    } else {
      message.error(
        response?.data?.errors[0].message || "Something went wrong"
      );
    }
  };

  return (
    <>
      <div
        className="d-flex flex-column justify-content-around  h-100 col-md-6 offset-md-3"
        style={{ minHeight: "47.4rem" }}
      >
        <div className="w-100">
          <br />
          <h4 className="text-center mt-5 mt-md-0">{title}</h4>
          <p className="text-center">{subTitle}</p>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <div className="uploadBox rounded">
            <div
              className=" w-100 h-100"
              style={{ borderRadius: "50%", backgroundColor: "lightgrey" }}
            >
              {imgPath && (
                <img
                  src={imgPath}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
          </div>
          {/* /.uploadBox */}
        </div>
        <div className="d-flex justify-content-center mb-4">
          <Upload
            accept="image/*"
            {...props}
            maxCount={1}
            showUploadList={false}
          >
            {!imgPath ? (
              <p className="primary-text text-center">Browse & Upload image</p>
            ) : (
              <p className="primary-text text-center">Change image</p>
            )}
          </Upload>
        </div>
        <button
          className="btn btn-primary"
          disabled={!imgFile || isLoading}
          onClick={handleSubmit}
          // style={mobile ? null : { margin: "6rem 30rem" }}
        >
          {isLoading ? (
            <span className="spinner-border text-white" />
          ) : (
            "Continue"
          )}
        </button>

        {/* /.primary-text */}
      </div>
    </>
  );
};

export default StepThree;
