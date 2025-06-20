import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import "./HomePage.css";
import BoardGrid from "../components/board/Boardgrid";
import Createboard from "../components/board/Createboard";
import Modal from "../components/modal/Modal";

const HomePage = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    // storing in local storage for now
    const [boards, setBoards] = useState(() => {
        const savedBoards = localStorage.getItem('kudosBoards');
        const defaultBoards = [
        {
            id: '1',
            title: 'Welcome to Kudos Board',
            image: 'https://picsum.photos/seed/board1/200/300',
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
                    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDdtY2JlNGt1a2E3bWF0MnJ5NnBnNXlxcnJ1NnIxcnVlcWRmajFmaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IcGkqdUmYLFGE/giphy.gif',
                    upvotes: 5
                },
                {
                    id: '102',
                    content: 'Excited to use this for our team recognition!',
                    author: 'Jane Smith',
                    createdAt: new Date().toISOString(),
                    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXJnZnRkNnJlZWJlNnRnMnJnZnRkNnJlZWJlNnRnMnJnZnRkNnJlZWJlNnRnMnJnZnRkNnJlZWJlNnRnJmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l3q2LH45XElEk/giphy.gif',
                    upvotes: 3
                }
            ]
        },
        {
            id: '2',
            title: 'Team Celebration',
            image: 'https://picsum.photos/seed/board2/200/300',
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
                    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXJnZnRkNnJlZWJlNnRnMnJnZnRkNnJlZWJlNnRnMnJnZnRkNnJlZWJlNnRnMnJnZnRkNnJlZWJlNnRnJmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/g9582DNuQppxC/giphy.gif',
                    upvotes: 8
                }
            ]
        },
        {
            id: '3',
            title: 'Thank You Notes',
            image: 'https://picsum.photos/seed/board3/200/300',
            category: 'thank you',
            description: 'Express gratitude to your colleagues',
            author: 'HR Department',
            createdAt: new Date().toISOString(),
            cards: []
        },
        {
            id: '4',
            title: 'Inspiration Wall',
            image: 'https://picsum.photos/seed/board4/200/300',
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
                    gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXJnZnRkNnJlZWJlNnRnMnJnZnRkNnJlZWJlNnRnMnJnZnRkNnJlZWJlNnRnMnJnZnRkNnJlZWJlNnRnJmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3oz8xD9XNhXmTKe7S8/giphy.gif',
                    upvotes: 12
                }
            ]
        }
        ];
        return savedBoards ? JSON.parse(savedBoards) : defaultBoards;
    });

    // storing in local storage for now
    useEffect(() => {
        localStorage.setItem('kudosBoards', JSON.stringify(boards));
    }, [boards]);

    const [activeFilter, setActiveFilter] = useState('all');

    const categories = [
        { id: 'all', label: 'All' },
        { id: 'recent', label: 'Recent' },
        { id: 'celebration', label: 'Celebration' },
        { id: 'thank you', label: 'Thank You' },
        { id: 'inspiration', label: 'Inspiration' }
    ];

    // Filter boards based on both category and search query
    const filteredBoards = boards.filter(board => {
        // First apply category filter
        const matchesCategory = activeFilter === 'all' || board.category === activeFilter;

        // Then apply search filter if there's a search query
        const matchesSearch = searchQuery === '' ||
            board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            board.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            board.author.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle search button click
    const handleSearch = () => {
        // The search is already applied as the user types, but this could be used
        // for additional search functionality if needed
    };

    // Handle clear button click
    const handleClearSearch = () => {
        setSearchQuery('');
    };

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
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button
                        className="button main-search-button"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                    <button
                        className="button clear-button"
                        onClick={handleClearSearch}
                    >
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
