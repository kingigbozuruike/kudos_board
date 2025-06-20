import React, { useState } from 'react';
import './Createboard.css';

const Createboard = ({ onSubmit }) => {
const [formData, setFormData] = useState({
title: '',
category: '',
author: '',
description: '',
image: `https://picsum.photos/seed/${Date.now()}/200/300`
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

if (!formData.category.trim()) {
    newErrors.category = 'Category is required';
}

setErrors(newErrors);
return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e) => {
e.preventDefault();

if (validateForm()) {
    const uniqueSeed = `board-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    const imageUrl = `https://picsum.photos/seed/${uniqueSeed}/200/300`;

    const submissionData = {
        ...formData,
        image: imageUrl
    };
    onSubmit(submissionData);
    setFormData({
    title: '',
    category: '',
    author: '',
    image: `https://picsum.photos/seed/${Date.now()}/200/300`,
    description: '',
    });
}
};

return (
<div className="board-form-container">
    <h2>Create New Board</h2>
    <div className='board-form-inner-container'>
        <form onSubmit={handleSubmit} className="board-form">
            <div className="form-group --title">
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

            <div className="form-group --category">
            <label htmlFor="category">Category *</label>
            <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={errors.category ? 'error' : ''}
            >
                <option value="">Select a category</option>
                <option value="welcome">Welcome</option>
                <option value="celebration">Celebration</option>
                <option value="thank you">Thank You</option>
                <option value="inspiration">Inspiration</option>
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
            </div>

            <div className="form-group --author">
            <label htmlFor="author">Author</label>
            <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
            />
            </div>
            <div className="form-group --description">
            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
            />
            </div>


            <button type="submit" className="submit-btn">Create Board</button>
        </form>
    </div>

</div>
);
};

export default Createboard;
