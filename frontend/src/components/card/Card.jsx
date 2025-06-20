import React, { useState, useEffect } from "react";
import "./Card.css";
import { getRandomGif } from "../../utils/giphyApi";

const Card = ({ card, onUpvote, onDelete }) => {
    const title = card.content;
    const description = card.description || "";
    const [imageUrl, setImageUrl] = useState(card.gifUrl);
    const owner = card.author ? card.author : "Anonymous";
    const votes = card.upvotes || 0;
    const [isLoading, setIsLoading] = useState(false);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        setImgError(false);
    }, [imageUrl]);

    const handleImageError = async () => {
        console.error("Failed to load GIF:", imageUrl);
        setImgError(true);

        try {
            setIsLoading(true);
            const searchTerm = title || description || "thank you";
            const newGifUrl = await getRandomGif(searchTerm);
            setImageUrl(newGifUrl);
            setImgError(false);
        } catch (error) {
            console.error("Failed to fetch replacement GIF:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpvote = () => {
        if (onUpvote) {
            onUpvote(card.id);
        }
    };

    const handleDelete = () => {
        if (onDelete && window.confirm(`Are you sure you want to delete this card: "${title}"?`)) {
            onDelete(card.id);
        }
    };

    return (
        <div className="card">
            <h3>{title}</h3>
            <p className="description">{description}</p>
            {isLoading ? (
                <div className="card-image-placeholder">
                    Loading GIF...
                </div>
            ) : imageUrl && !imgError ? (
                <img
                    src={imageUrl}
                    alt="Card Image"
                    className="card-image"
                    onError={handleImageError}
                />
            ) : (
                <div className="card-image-placeholder">
                    GIF not available
                </div>
            )}
            <p className="owner">Created by: {owner}</p>
            <div className="card-actions">
                <button
                    className="upvote-button"
                    onClick={handleUpvote}
                >
                    Upvote: {votes}
                </button>
                <button className="delete-button" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default Card;
