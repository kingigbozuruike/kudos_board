import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import "./HomePage.css";
import BoardGrid from "../components/board/Boardgrid";
import Createboard from "../components/board/Createboard";
import Modal from "../components/modal/Modal";
import { fetchAllBoards, createBoard, deleteBoard, searchBoards, fetchRecentBoards } from "../services/api";

const HomePage = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        const getBoards = async () => {
            try {
                setLoading(true);

                if (activeFilter === 'recent') {
                    const data = await fetchRecentBoards();
                    setBoards(data);
                } else {
                    const data = await fetchAllBoards();
                    setBoards(data);
                }

                setError(null);
            } catch (err) {
                console.error("Failed to fetch boards:", err);
                setError("Failed to load boards. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        getBoards();
    }, [activeFilter]);

    const categories = [
        { id: 'all', label: 'All' },
        { id: 'recent', label: 'Recent' },
        { id: 'celebration', label: 'Celebration' },
        { id: 'thank you', label: 'Thank You' },
        { id: 'inspiration', label: 'Inspiration' }
    ];

    const filteredBoards = boards.filter(board => {
        if (activeFilter === 'all' || activeFilter === 'recent') {
            return true;
        }

        return board.category === activeFilter;
    });

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            return;
        }

        try {
            setLoading(true);
            const results = await searchBoards(searchQuery);
            setBoards(results);
            setError(null);
        } catch (err) {
            console.error("Failed to search boards:", err);
            setError("Failed to search boards. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleClearSearch = async () => {
        setSearchQuery('');

        try {
            setLoading(true);
            const data = await fetchAllBoards();
            setBoards(data);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch boards:", err);
            setError("Failed to load boards. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBoard = async (boardId) => {
        try {
            await deleteBoard(boardId);
            setBoards(boards.filter(board => board.id !== boardId));
        } catch (err) {
            console.error("Failed to delete board:", err);
            alert("Failed to delete board. Please try again.");
        }
    };

    return (
        <div className="home-containter">
            <Header/>
            <div className="filter_create">
                <div className="search">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                    }}>
                        <input
                            type="text"
                            placeholder="Search boards..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button
                            type="submit"
                            className="button main-search-button"
                        >
                            Search
                        </button>
                        <button
                            type="button"
                            className="button clear-button"
                            onClick={handleClearSearch}
                        >
                            Clear
                        </button>
                    </form>
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
            {loading ? (
                <div className="loading-container">
                    <p>Loading boards...</p>
                </div>
            ) : error ? (
                <div className="error-container">
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>Retry</button>
                </div>
            ) : (
                <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                    <Createboard onSubmit={async (boardData) => {
                        try {
                            const newBoard = await createBoard(boardData);
                            setBoards([...boards, newBoard]);
                            setIsCreateModalOpen(false);
                        } catch (err) {
                            console.error("Failed to create board:", err);
                            alert("Failed to create board. Please try again.");
                        }
                    }} />
                </Modal>
            )}
        </div>
    );
};

export default HomePage;
