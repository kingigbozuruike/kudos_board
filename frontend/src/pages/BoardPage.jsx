import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/header/Header";
import Card from "../components/card/Card";
import Modal from "../components/modal/Modal";
import CreateCard from "../components/card/Createcard";
import "./BoardPage.css";
import { fetchBoardById, createCard, upvoteCard, deleteCard } from "../services/api";

const BoardPage = () => {
    const { boardId } = useParams();
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);

    // Fetch board data from API
    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                const boardData = await fetchBoardById(boardId);

                const mappedCards = (boardData.card || []).map(card => ({
                    id: card.id,
                    content: card.title,
                    description: card.description,
                    gifUrl: card.gifUrl,
                    author: "Anonymous",
                    upvotes: card.upvote
                }));

                setBoard({
                    id: boardData.id,
                    title: boardData.title,
                    category: boardData.category,
                    author: boardData.author || "Anonymous",
                    createdAt: boardData.createdAt,
                    image: boardData.image,
                    cards: mappedCards
                });
            } catch (error) {
                console.error("Error fetching board:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBoardData();
    }, [boardId]);

    const handleUpvoteCard = async (cardId) => {
        if (!board) return;

        try {
            const updatedCardData = await upvoteCard(cardId);

            const updatedCards = board.cards.map(card => {
                if (card.id === cardId) {
                    return {
                        ...card,
                        upvotes: updatedCardData.upvote
                    };
                }
                return card;
            });

            setBoard({
                ...board,
                cards: updatedCards
            });
        } catch (error) {
            console.error("Error upvoting card:", error);
            alert("Failed to upvote card. Please try again.");
        }
    };

    const handleDeleteCard = async (cardId) => {
        if (!board) return;

        try {
            await deleteCard(cardId);

            const updatedCards = board.cards.filter(card => card.id !== cardId);
            setBoard({
                ...board,
                cards: updatedCards
            });
        } catch (error) {
            console.error("Error deleting card:", error);
            alert("Failed to delete card. Please try again.");
        }
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
                <CreateCard onSubmit={async (cardData) => {
                    try {
                        const apiCardData = {
                            title: cardData.title,
                            description: cardData.description || "",
                            gifUrl: cardData.gif || "",
                            boardId: parseInt(boardId)
                        };

                        console.log("Creating card with data:", apiCardData);

                        const newCard = await createCard(apiCardData);

                        const mappedCard = {
                            id: newCard.id,
                            content: newCard.title,
                            description: newCard.description,
                            gifUrl: newCard.gifUrl,
                            author: cardData.owner || "Anonymous",
                            upvotes: newCard.upvote
                        };

                        setBoard({
                            ...board,
                            cards: [...board.cards, mappedCard]
                        });

                        setIsCreateCardModalOpen(false);
                    } catch (error) {
                        console.error("Error creating card:", error);
                        alert("Failed to create card. Please try again.");
                    }
                }} />
            </Modal>
        </div>
    );
};

export default BoardPage;
