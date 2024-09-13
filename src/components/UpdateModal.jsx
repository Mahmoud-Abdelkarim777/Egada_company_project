import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import StarRating from './StarRating';

const UpdateModal = ({ isOpen, onClose, onAdd, onUpdate, initialData }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [rating, setRating] = useState(0); // Initialize rating as a number
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [imageFile, setImageFile] = useState(null); // State to hold selected file

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setBody(initialData.body || '');
      setRating(initialData.rating || 0); // Set initial rating
      setImage(initialData.image || '');
      setName(initialData.name || '');
      setJobTitle(initialData.jobTitle || '');
    }
  }, [initialData]); 

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create a URL for the file (for preview)
      const url = URL.createObjectURL(file);
      setImage(url); // Set the image URL for preview
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = image;
    if (imageFile) {
      // Upload the image to the server
      const formData = new FormData();
      formData.append('file', imageFile);
      try {
        const response = await axios.post('https://your-image-upload-endpoint', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        imageUrl = response.data.url; // Get the URL of the uploaded image
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    const testimonial = {
      title,
      body,
      rating,
      image: imageUrl,
      name,
      jobTitle,
    };
//  post + put = update 
    try {
      if (initialData) {
        // Update existing testimonial
        const response = await axios.put(`https://669fd2c4b132e2c136ff474c.mockapi.io/testimonials/${initialData.id}`, testimonial);
        onUpdate(response.data);
      } else {
        // Add new testimonial
        const response = await axios.post('https://669fd2c4b132e2c136ff474c.mockapi.io/testimonials', testimonial);
        onAdd(response.data);
      }
      onClose();
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{initialData ? 'Update Testimonial' : 'Add Testimonial'}</h5>
            <button type="button" className="close" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} className="d-flex flex-column">
              <label>Title</label>
              <input className="p-1" type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <label>Body Content</label>
              <textarea className="p-1" placeholder="description" rows="4" cols="50" value={body} onChange={(e) => setBody(e.target.value)} required></textarea>
              <label>Rating</label>
              <StarRating rating={rating} onChange={setRating} />
              <label>Image</label>
              <input className="p-1" type="file" accept="image/*" onChange={handleFileChange} />
              {image && <img src={image} alt="Preview" style={{ width: '10%', marginTop: '10px' }} />} {/* Show image preview */}
              <label>Name</label>
              <input className="p-1" type="text" placeholder="your name here" value={name} onChange={(e) => setName(e.target.value)} required />
              <label>Job Title</label>
              <input className="p-1" type="text" placeholder="your job title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
              <button type="submit" className="btn btn-info mt-3">{initialData ? 'Update' : 'Save changes'}</button>
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

export default UpdateModal;
