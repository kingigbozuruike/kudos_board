import React, { useState } from "react";
import Header from "../components/header/Header";
import "./HomePage.css";
import BoardGrid from "../components/board/Boardgrid";
import Createboard from "../components/board/Createboard";
import Modal from "../components/modal/Modal";

const HomePage = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [boards, setBoards] = useState([
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
                    content: 'Thank you for creating this amazing platform!',
                    author: 'John Doe',
                    createdAt: new Date().toISOString(),
                    gifUrl: 'https://via.placeholder.com/150?text=Thank+You',
                    upvotes: 5
                },
                {
                    id: '102',
                    content: 'Excited to use this for our team recognition!',
                    author: 'Jane Smith',
                    createdAt: new Date().toISOString(),
                    gifUrl: 'https://via.placeholder.com/150?text=Excited',
                    upvotes: 3
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
                    content: 'Congratulations on shipping the new feature!',
                    author: 'Manager',
                    createdAt: new Date().toISOString(),
                    gifUrl: 'https://via.placeholder.com/150?text=Congrats',
                    upvotes: 8
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
                    content: '"The best way to predict the future is to create it." - Abraham Lincoln',
                    author: 'Motivational Speaker',
                    createdAt: new Date().toISOString(),
                    gifUrl: 'https://via.placeholder.com/150?text=Inspiration',
                    upvotes: 12
                }
            ]
        }
    ]);



    const [activeFilter, setActiveFilter] = useState('all');

    const categories = [
        { id: 'all', label: 'All' },
        { id: 'recent', label: 'Recent' },
        { id: 'celebration', label: 'Celebration' },
        { id: 'thank you', label: 'Thank You' },
        { id: 'inspiration', label: 'Inspiration' }
    ];

    const filteredBoards = activeFilter === 'all' ? boards : boards.filter(board => board.category === activeFilter);

    const handleDeleteBoard = (boardId) => {
        setBoards(boards.filter(board => board.id !== boardId));
    };

    return (
        <div className="home-containter">
            <Header/>
            <div className="filter_create">
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search boards..."
                    />
                    <button className="button main-search-button">
                        Search
                    </button>
                    <button className="button clear-button">
                        Clear
                    </button>
                </div>
                <div className="filter-container">
                    {categories.map(category => (
                    <button
                        key={category.id}
                        className={`filter-button ${activeFilter === category.id ? 'active' : ''}`}
                        onClick={() => setActiveFilter(category.id)}
                    >
                        {category.label}
                    </button>
                    ))}
                </div>
                <button className="create-button" onClick={() => setIsCreateModalOpen(true)}>Create a New Board</button>
            </div>

            {filteredBoards.length > 0 ? (
                <BoardGrid boards={filteredBoards} onDeleteBoard={handleDeleteBoard} />
            ) : (
                <div className="empty-state">
                    <h2>No boards found</h2>
                    <p>Create your first kudos board to get started!</p>
                    <button className="create-button" onClick={() => setIsCreateModalOpen(true)}>Create New Board</button>
                </div>
            )}
            <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                <Createboard onSubmit={(boardData) => {
                    const newBoard = {
                        ...boardData,
                        id: Date.now().toString(),
                        createdAt: new Date().toISOString(),
                        cards: []
                    };
                    setBoards([...boards, newBoard]);
                    setIsCreateModalOpen(false);
                }} />
            </Modal>
        </div>
    );
};

export default HomePage;
