import React, { useState } from 'react';
import './CreateCard.css';
import { getRandomGif } from '../../utils/giphyApi';

const CreateCard = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    owner: '',
    gif: '',
    category: ''
  });

  const [isGifLoading, setIsGifLoading] = useState(false);
  const [previewGif, setPreviewGif] = useState('');
  const [gifSearchTerm, setGifSearchTerm] = useState('');

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

  const fetchRandomGif = async (searchTerm) => {
    setIsGifLoading(true);
    try {
      const gifUrl = await getRandomGif(searchTerm);
      setPreviewGif(gifUrl);
      setFormData(prev => ({
        ...prev,
        gif: gifUrl
      }));
    } catch (error) {
      console.error('Error fetching GIF:', error);
    } finally {
      setIsGifLoading(false);
    }
  };

  // Search for a GIF
  const handleGifSearch = (e) => {
    e.preventDefault();
    if (gifSearchTerm.trim()) {
      fetchRandomGif(gifSearchTerm.trim());
    }
  };

  // Get a new random GIF
  const handleRefreshGif = () => {
    const searchTerm = gifSearchTerm || formData.title;
    fetchRandomGif(searchTerm);
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
      // If no GIF has been selected, get one before submitting
      if (!formData.gif) {
        const searchTerm = formData.category || formData.title || 'thank you';
        getRandomGif(searchTerm).then(gifUrl => {
          onSubmit({
            ...formData,
            gif: gifUrl,
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
          setPreviewGif('');
        });
      } else {
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
        setPreviewGif('');
      }
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
            <label htmlFor="gif">GIF</label>
            <div className="gif-search">
              <input
                type="text"
                placeholder="Search for a GIF..."
                value={gifSearchTerm}
                onChange={(e) => setGifSearchTerm(e.target.value)}
              />
              <button
                type="button"
                onClick={handleGifSearch}
                className="search-gif-btn"
              >
                Search
              </button>
            </div>
            <div className="gif-container">
              {isGifLoading ? (
                <div className="gif-loading">Loading GIF...</div>
              ) : previewGif ? (
                <div className="gif-preview">
                  <img src={previewGif} alt="GIF Preview" />
                </div>
              ) : (
                <div className="no-gif">No GIF selected</div>
              )}
              <div className="gif-actions">
                <button
                  type="button"
                  className="refresh-gif-btn"
                  onClick={handleRefreshGif}
                >
                  {previewGif ? "Get Another GIF" : "Get Random GIF"}
                </button>
              </div>
            </div>
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
