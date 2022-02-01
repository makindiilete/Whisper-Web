import React, { useEffect, useState } from "react";
import { toastError, toastSuccess } from "../components/successToast";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";
import cancel from "../assets/images/imageCancel.svg";
import { toast } from "react-toastify";

export const useImageUpload = ({
  endpoint,
  uploadMultiple = true,
  id,
  closeHeaderFromHook,
  type = "photo",
}) => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [imgUploadLoading, setimgUploadLoading] = useState(false);
  const [uploadFailed, setUploadFailed] = useState(false);
  const [uploadButtonClicked, setUploadButtonClicked] = useState(false);
  const [showUpload, setShowUpload] = React.useState(false);
  const [myFiles, setMyFiles] = React.useState([]);
  const [stateFiles, setStateFiles] = React.useState([]);

  //ds function receives the current upload progress
  const onUploadProgress = (progress) => {
    setProgress(progress);
  };

  useEffect(() => {
    localStorage.removeItem("closeUpload");
  }, []);

  const onDrop = React.useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 0) {
        return toast.error("Select an image!");
      }
      setShowUpload(true);
      const joined = myFiles.concat(...acceptedFiles);
      setStateFiles(joined);
      setMyFiles(joined);
      myFiles.push(acceptedFiles);
    },
    [myFiles]
  );

  const {
    getRootProps,
    getInputProps,
    open,
    acceptedFiles,
    inputRef,
  } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    maxSize: 500000, //5mb - 10 & 1,000,000 bytes
    multiple: uploadMultiple,
    maxFiles: uploadMultiple ? 0 : 1,
    onDrop,
    accept: "image/jpeg, image/png",
  });

  const handleRemoveFile = (file) => {
    let originalFiles = myFiles;
    originalFiles = originalFiles.filter((f) => f.name !== file);
    setMyFiles(originalFiles);
  };

  const files = React.useMemo(
    () =>
      myFiles.map((file, index) => (
        <>
          <ul className="list-group list-group-horizontal" id="useImageUpload">
            <span style={{ zIndex: "1000" }}>
              <FontAwesomeIcon
                icon={icons.faTimes}
                size="sm"
                className="text-muted mx-2"
                style={{ cursor: "pointer" }}
                onClick={() => handleRemoveFile(file.name)}
              />
            </span>
            <li key={file.path} style={{ color: "#2A74E3" }}>
              {file.name}
              {/* <span style={{ position: "absolute", right: "50%" }}>
                {(file.size / 1000).toFixed(2)} kb
              </span>*/}
            </li>
          </ul>
        </>
      )),
    [myFiles]
  );

  return {
    progress,
    isLoading,
    imgUploadLoading,
    myFiles,
    getRootProps,
    getInputProps,
    open,
    files,
  };
};
