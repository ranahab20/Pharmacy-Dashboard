import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../Button/Button";
import axios from "axios";
import "./UpLoadFile.css";
import { BsCloudUpload } from "react-icons/bs";

const UploadFile = ({children}) => {
  const [status, setStatus] = useState("idle");
  const [file, setFile] = useState(null);
  const [upLoadProgress, setUpUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setUpUploadProgress(0);
    }
  };
  const handleFileUpload = async () => {
    if (!file) return;
    setStatus("uploading");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("https://httpbin.org/post", formData, {
        headers: {
          "content-Type": "  multipart/form-data",
        },
        onUploadProgress: (ProgressEvent) => {
          const progress = ProgressEvent.total
            ? Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
            : 0;
          setUpUploadProgress(progress);
        },
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };
  return (
    <div className="upload-container">
     <p>{children}</p> 
      <div className="file-input-wrapper">
        <div className="upload-icon">
          <BsCloudUpload />
        </div>
        <p id="upload-label">
          {file ? "اختر صورة أخرى" : "اختر صورة المنتج"}
        </p>
        <Input type="file" accept="image/*" onChange={handleFileChange}>
          {" "}
        </Input>
      </div>

      {file && (
        <div className="file-info">
          <p className="file-name">📄 {file.name}</p>
          <small>{(file.size / 1024).toFixed(1)} KB</small>
        </div>
      )}

      {file && status === "idle" && (
        <Button className="upload-btn" onClick={handleFileUpload}>
          رفع صورة المنتج
        </Button>
      )}

      {status === "uploading" && (
        <div className="progress-container">
          <div className="progress-header">
            <span>جاري التحميل...</span>
            <span>{upLoadProgress}%</span>
          </div>
          <div className="progress-bar-background">
            <div
              className="progress-bar-fill"
              style={{ width: `${upLoadProgress}%` }}
            />
          </div>
        </div>
      )}

      {status === "success" && (
        <div className="status-message success">تم رفع الصورة بنجاح! ✅</div>
      )}

      {status === "error" && (
        <div className="status-message error">حدث خطأ أثناء الرفع ❌</div>
      )}
    </div>
  );
};

export default UploadFile;
