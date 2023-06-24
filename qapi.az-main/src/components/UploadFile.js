/* eslint-disable */
import Dropzone from "react-dropzone";
import { useEffect, useState } from "react";
import "../styles/UploadFile.css";
import CircularProgressBar from "./CircularProgressBar";
import { storage } from "../firebase";
import { toast, ToastContainer } from "react-toastify";

function UploadFile({ setFileLink, files, setFiles, multiple, type }) {
  const [progresses, setProgresses] = useState({});
  const [ln, setLn] = useState(0);
  const handleDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const folder = type === "video" ? "videos" : "images";
    let list = [];
    for (let i = 0; i < files.length; i++) {
      if (files[i]) {
        const dateAsString = new Date().toString();
        const imageName = files[i].name + dateAsString;
        const uploadTask = storage.ref(`${folder}/${imageName}`).put(files[i]);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgresses({ ...progresses, [files[i].name]: progress });
          },
          (error) => {
            console.log(error);
            alert(error.message);
          },
          async () => {
            await storage
              .ref(folder)
              .child(imageName)
              .getDownloadURL()
              .then((url) => {
                list.push({ name: imageName, url });
                setProgresses({});
                setLn(list.length);
                setFileLink(list);
              });
          }
        );
      } else {
        alert("Error. Select images");
      }
    }
  };

  useEffect(() => {
    if (ln !== 0 && ln === files.length) {
      toast.success("Fayllar ugurla elave olundu", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setFiles([]);
    }
  }, [ln]);

  return (
    <form
      className="uploadFile__form"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <Dropzone onDrop={handleDrop} multiple={!!multiple}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} name="file" />
            <p>Drag and drop files, or click to select files</p>
          </div>
        )}
      </Dropzone>
      <div>
        <strong>Files:</strong>
        <ul>
          {files.map((file) => (
            <li key={file.name}>
              <ul className="uploadFile__ul">
                <li>{file.name}</li>
                <li>
                  <CircularProgressBar value={progresses[file.name] || 0} text={`${Math.round(progresses[file.name]) || 0}%`} color='textSecondary' />
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="uploadFile__button"
        onClick={handleSubmit}
      >
        Upload
      </button>
    </form>
  );
}

export default UploadFile;
