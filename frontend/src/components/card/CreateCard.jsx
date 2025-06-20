import React, { useState } from 'react';
import './CreateCard.css';

const CreateCard = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    owner: '',
    gif: '',
    category: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({
        ...formData,
        votes: 0,
        id: Date.now().toString()
      });
      setFormData({
        title: '',
        description: '',
        owner: '',
        gif: '',
        category: ''
      });
    }
  };

  return (
    <div className="card-form-container">
      <h2>Create New Card</h2>
      <div className='card-form-inner-container'>
        <form onSubmit={handleSubmit} className="card-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="owner">Your Name</label>
            <input
              type="text"
              id="owner"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="gif">GIF URL</label>
            <input
              type="url"
              id="gif"
              name="gif"
              value={formData.gif}
              onChange={handleChange}
              placeholder="GIF link (optional)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              <option value="welcome">Welcome</option>
              <option value="celebration">Celebration</option>
              <option value="thank you">Thank You</option>
              <option value="inspiration">Inspiration</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">Create Card</button>
        </form>
      </div>
    </div>
  );
};

export default CreateCard;
