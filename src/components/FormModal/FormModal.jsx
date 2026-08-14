import React from "react";
import "./FormModal.css";

const FormModal = ({
  title,
  label,
  placeholder,
  value,
  onChange,
  onSubmit,
  onClose,
}) => {
  return (
    <div className="form-overlay">
      <div className="form-modal">
        <h3>{title}</h3>
        <label>{label}</label>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <div className="form-buttons">
          <button type="button" className="cancel-btn" onClick={onClose}>
            إلغاء
          </button>
          <button type="button" className="save-btn" onClick={onSubmit}>
            حفظ
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
