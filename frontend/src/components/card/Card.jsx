import React from "react";
import "./Card.css";

const Card = ({ card }) => {
    const { title, description, gif, owner, votes = 0 } = card || {};

    return (
        <div className="card">
            <h3>{title}</h3>
            <p className="description">{description}</p>
            {gif && <img src={gif} alt="GIF" className="card-image" />}
            <p className="owner">Created by: {owner}</p>
            <div className="card-actions">
                <button className='upvote-button'>Upvote: {votes}</button>
                <button className="delete-button">Delete</button>
            </div>
        </div>
    );
};

export default Card;
