import React from "react";
import "./Modal.css";

function Modal({ isOpen, onClose, data, onFieldChange }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">{data.name}</h2>
        <div className="modal-fields">
          {Object.keys(data.fields).map((key) => (
            <label key={key} className="modal-field">
              <span>{data.fields[key]}</span>
              <input
                type="checkbox"
                checked={data.values[key]}
                onChange={(e) => onFieldChange(key, e.target.checked)}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Modal;


