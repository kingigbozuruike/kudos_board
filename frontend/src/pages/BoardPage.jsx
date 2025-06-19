import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/header/Header";
import Card from "../components/card/Card";
import "./BoardPage.css";

const BoardPage = () => {
    const { boardId } = useParams();
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);

    // Simulating fetching board data
    useEffect(() => {
        // In a real app, this would be an API call
        const fetchBoard = () => {
            // Mock data - in a real app, you would fetch this from an API
            const boards = [
                {
                    id: '1',
                    title: 'Welcome to Kudos Board',
                    image: '/img/placeholder1.png',
                    category: 'welcome',
                    description: 'A place to share appreciation and celebrate achievements',
                    author: 'Admin',
                    createdAt: new Date().toISOString(),
                    cards: [
                        {
                            id: '101',
                            title: 'Thank you for creating this amazing platform!',
                            description: 'This platform is going to be a game-changer for our team!',
                            gif: 'https://via.placeholder.com/150?text=Thank+You',
                            owner: 'John Doe',
                            votes: 5,
                            category: 'thank you'
                        },
                        {
                            id: '102',
                            title: 'Excited to use this for our team recognition!',
                            description: 'Looking forward to recognizing all the great work our team does.',
                            gif: 'https://via.placeholder.com/150?text=Excited',
                            owner: 'Jane Smith',
                            votes: 3,
                            category: 'celebration'
                        }
                    ]
                },
                {
                    id: '2',
                    title: 'Team Celebration',
                    image: './img/placeholder1.png',
                    category: 'celebration',
                    description: 'Celebrate our team accomplishments',
                    author: 'Team Lead',
                    createdAt: new Date().toISOString(),
                    cards: [
                        {
                            id: '201',
                            title: 'Congratulations on shipping the new feature!',
                            description: 'The new feature is amazing and will help our users tremendously.',
                            gif: 'https://via.placeholder.com/150?text=Congrats',
                            owner: 'Manager',
                            votes: 8,
                            category: 'celebration'
                        }
                    ]
                },
                {
                    id: '3',
                    title: 'Thank You Notes',
                    image: './img/placeholder1.png',
                    category: 'thank you',
                    description: 'Express gratitude to your colleagues',
                    author: 'HR Department',
                    createdAt: new Date().toISOString(),
                    cards: []
                },
                {
                    id: '4',
                    title: 'Inspiration Wall',
                    image: './img/placeholder1.png',
                    category: 'inspiration',
                    description: 'Share inspiring quotes and stories',
                    author: 'Creative Team',
                    createdAt: new Date().toISOString(),
                    cards: [
                        {
                            id: '401',
                            title: '"The best way to predict the future is to create it."',
                            description: 'Abraham Lincoln',
                            gif: 'https://via.placeholder.com/150?text=Inspiration',
                            owner: 'Motivational Speaker',
                            votes: 12,
                            category: 'inspiration'
                        }
                    ]
                }
            ];

            const foundBoard = boards.find(b => b.id === boardId);
            setBoard(foundBoard);
            setLoading(false);
        };

        fetchBoard();
    }, [boardId]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!board) {
        return (
            <div className="board-not-found">
                <Header />
                <div className="not-found-content">
                    <h2>Board Not Found</h2>
                    <p>The board you're looking for doesn't exist or has been removed.</p>
                    <Link to="/" className="back-button">Back to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="board-page">
            <Header />
            <div className="board-header">
                <Link to="/" className="back-button">← Back to Boards</Link>
                <h1>{board.title}</h1>
                <p className="board-description">{board.description}</p>
                <div className="board-meta">
                    <span className="board-category">Category: {board.category}</span>
                    <span className="board-author">Created by: {board.author}</span>
                    <span className="board-date">
                        Created: {new Date(board.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>

            <div className="board-actions">
                <button className="add-card-button">Add New Card</button>
            </div>

            <div className="cards-container">
                {board.cards.length > 0 ? (
                    <div className="cards-grid">
                        {board.cards.map(card => (
                            <Card key={card.id} card={card} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-cards">
                        <h3>No cards yet</h3>
                        <p>Be the first to add a card to this board!</p>
                        <button className="add-card-button">Add New Card</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BoardPage;
