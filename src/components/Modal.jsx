
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Modal = ({ isOpen, onClose, onAdd }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [jobTitle, setJobTitle] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();

    const newTestimonial = {
        title,
        body,
        image,
        name,
        jobTitle,
    };

    try {
        const response = await axios.post('https://669fd2c4b132e2c136ff474c.mockapi.io/testimonials', newTestimonial);
        onAdd(response.data);
        onClose();
    } catch (error) {
        console.error('Error adding testimonial:', error);
    }
};

    if (!isOpen) return null;

  return (
    <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Project</h5>
            <button type="button" className="close" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} className="d-flex flex-column">
              <label>Title</label>
              <input className="p-1 rounded " type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <label>Body Content</label>
              <textarea className="p-1 rounded" placeholder="description" rows="4" cols="50" value={body} onChange={(e) => setBody(e.target.value)} required></textarea>
              <label>Image</label>
              <input className="p-1 rounded" type="file" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
              <label>Name</label>
              <input className="p-1 rounded" type="text" placeholder="your name here" value={name} onChange={(e) => setName(e.target.value)} required />
              <label>Job Title</label>
              <input className="p-1 rounded" type="text" placeholder="your job title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
              <button type="submit" className="btn btn-info mt-3">Save changes</button>
              
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
