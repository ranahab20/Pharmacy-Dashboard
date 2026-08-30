import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../Button/Button";
import "./UpLoadFile.css";
import { BsCloudUpload } from "react-icons/bs";

const UploadFile = ({ children, onFileSelect }) => {
  const [status, setStatus] = useState("idle");
  const [file, setFile] = useState(null);
  const [upLoadProgress, setUpUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setUpUploadProgress(0);
    }
  };
  //
  const handleFileUpload = async () => {
    if (!file) return;

    try {
      setStatus("uploading");

      // إرسال الملف إلى AddProduct
      onFileSelect?.(file);

      setUpUploadProgress(100);
      setStatus("success");
    } catch (error) {
      console.error("Error selecting file:", error);
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
        <p id="upload-label">{file ? "اختر صورة أخرى" : "اختر صورة المنتج"}</p>
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
