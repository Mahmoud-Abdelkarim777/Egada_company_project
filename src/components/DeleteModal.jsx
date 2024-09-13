// src/components/DeleteModal.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button type="button" className="close" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this item?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" onClick={onDelete}>Delete</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Keep it</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
