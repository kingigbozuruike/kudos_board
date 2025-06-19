import React from 'react';
import './Boardgrid.css';
import BoardCard from './Board';

const BoardGrid = ({ boards, onDeleteBoard }) => {
return (
    <div className="board-grid-container">
        {boards.length === 0 ? (
        <div className="no-boards-message">
            <p>No boards found. Create your first board!</p>
        </div>
        ) : (
        <div className="board-grid">
            {boards.map(board => (
            <BoardCard
                key={board.id}
                board={board}
                onDelete={() => onDeleteBoard(board.id)}
            />
            ))}
        </div>
        )}
    </div>
);
};

export default BoardGrid;
