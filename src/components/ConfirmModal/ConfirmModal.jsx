import React from "react";
import "./ConfirmModal.css";

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = "تأكيد",
  cancelText = "إلغاء",
  onConfirm,
  onCancel,
  onClick
}) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal">
        <h3>{title}</h3>

        <p>{message}</p>

        <div className="confirm-modal-actions">
          <button type="button" className="confirm-btn" onClick={onConfirm}>
            {confirmText}
          </button>

          <button type="button" className="cancel-btn" onClick={onCancel}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
