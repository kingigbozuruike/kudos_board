import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/header/Header";
import Card from "../components/card/Card";
import Modal from "../components/modal/Modal";
import CreateCard from "../components/card/Createcard";
import "./BoardPage.css";

const BoardPage = () => {
    const { boardId } = useParams();
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);
    const [upvotedCards, setUpvotedCards] = useState(() => {
        // Load upvoted cards from localStorage
        const savedUpvotes = localStorage.getItem('upvotedCards');
        return savedUpvotes ? JSON.parse(savedUpvotes) : {};
    });

    // fetching from local storage
    useEffect(() => {
        const fetchBoard = () => {
            const savedBoards = localStorage.getItem('kudosBoards');
            const boards = savedBoards ? JSON.parse(savedBoards) : [];

            const foundBoard = boards.find(b => b.id === boardId);
            setBoard(foundBoard);
            setLoading(false);
        };

        fetchBoard();
    }, [boardId]);

    // Save upvoted cards to localStorage when they change
    useEffect(() => {
        localStorage.setItem('upvotedCards', JSON.stringify(upvotedCards));
    }, [upvotedCards]);

    // Function to update the board in localStorage
    const updateBoardInStorage = (updatedBoard) => {
        const savedBoards = localStorage.getItem('kudosBoards');
        if (savedBoards) {
            const boards = JSON.parse(savedBoards);
            const updatedBoards = boards.map(b =>
                b.id === updatedBoard.id ? updatedBoard : b
            );
            localStorage.setItem('kudosBoards', JSON.stringify(updatedBoards));
        }
    };

    // Handle toggling upvote on a card
    const handleUpvoteCard = (cardId) => {
        if (!board) return;

        // Check if user has already upvoted this card
        const cardKey = `${boardId}-${cardId}`;
        const hasUpvoted = upvotedCards[cardKey];

        // Update upvoted cards state
        const newUpvotedCards = { ...upvotedCards };

        if (hasUpvoted) {
            // Remove upvote
            delete newUpvotedCards[cardKey];
        } else {
            // Add upvote
            newUpvotedCards[cardKey] = true;
        }

        setUpvotedCards(newUpvotedCards);

        // Update card upvotes count
        const updatedCards = board.cards.map(card => {
            if (card.id === cardId) {
                return {
                    ...card,
                    upvotes: hasUpvoted
                        ? Math.max(0, (card.upvotes || 0) - 1) // Decrease count, but not below 0
                        : (card.upvotes || 0) + 1 // Increase count
                };
            }
            return card;
        });

        const updatedBoard = {
            ...board,
            cards: updatedCards
        };

        setBoard(updatedBoard);
        updateBoardInStorage(updatedBoard);
    };

    // Handle deleting a card
    const handleDeleteCard = (cardId) => {
        if (!board) return;

        const updatedCards = board.cards.filter(card => card.id !== cardId);
        const updatedBoard = {
            ...board,
            cards: updatedCards
        };

        setBoard(updatedBoard);
        updateBoardInStorage(updatedBoard);
    };

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
                <button className="add-card-button" onClick={() => setIsCreateCardModalOpen(true)}>Add New Card</button>
            </div>

            <div className="cards-container">
                {board.cards.length > 0 ? (
                    <div className="cards-grid">
                        {board.cards.map(card => (
                            <Card
                                key={card.id}
                                card={card}
                                onUpvote={handleUpvoteCard}
                                onDelete={handleDeleteCard}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-cards">
                        <h3>No cards yet</h3>
                        <p>Be the first to add a card to this board!</p>
                        <button className="add-card-button" onClick={() => setIsCreateCardModalOpen(true)}>Add New Card</button>
                    </div>
                )}
            </div>

            <Modal isOpen={isCreateCardModalOpen} onClose={() => setIsCreateCardModalOpen(false)}>
                <CreateCard onSubmit={(cardData) => {
                    // Ensure consistent card structure
                    const newCard = {
                        ...cardData,
                        id: Date.now().toString(),
                        createdAt: new Date().toISOString(),
                        // Add both naming conventions for compatibility
                        content: cardData.title,
                        author: cardData.owner,
                        gifUrl: cardData.gif,
                        upvotes: cardData.votes || 0
                    };

                    const updatedBoard = {
                        ...board,
                        cards: [...board.cards, newCard]
                    };
                    setBoard(updatedBoard);
                    updateBoardInStorage(updatedBoard);
                    setIsCreateCardModalOpen(false);
                }} />
            </Modal>
        </div>
    );
};

export default BoardPage;
