const API_BASE_URL = 'https://kudos-board-ixwv.onrender.com';

export const fetchAllBoards = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/board/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch boards');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching boards:', error);
    throw error;
  }
};

export const searchBoards = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/board/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    if (!response.ok) {
      throw new Error('Failed to search boards');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching boards:', error);
    throw error;
  }
};

export const fetchRecentBoards = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/board/recent`);
    if (!response.ok) {
      throw new Error('Failed to fetch recent boards');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching recent boards:', error);
    throw error;
  }
};

export const fetchBoardById = async (boardId) => {
  try {
    const allBoards = await fetchAllBoards();

    const board = allBoards.find(board => board.id === parseInt(boardId));

    if (!board) {
      throw new Error(`Board with ID ${boardId} not found`);
    }

    return board;
  } catch (error) {
    console.error(`Error fetching board ${boardId}:`, error);
    throw error;
  }
};

export const createBoard = async (boardData) => {
  try {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 10);
    const titleFragment = boardData.title ? boardData.title.substring(0, 10).replace(/\s+/g, '-').toLowerCase() : '';
    const seed = `${titleFragment}-${timestamp}-${randomString}`;

    const boardWithImage = {
      ...boardData,
      image: `https://picsum.photos/seed/${seed}/300/400`
    };

    console.log("Creating board with image seed:", seed);

    const response = await fetch(`${API_BASE_URL}/api/board/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(boardWithImage),
    });
    if (!response.ok) {
      throw new Error('Failed to create board');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating board:', error);
    throw error;
  }
};

export const deleteBoard = async (boardId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/board/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: boardId }),
    });
    if (!response.ok) {
      throw new Error('Failed to delete board');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error deleting board ${boardId}:`, error);
    throw error;
  }
};

export const createCard = async (cardData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/board/card/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cardData),
    });
    if (!response.ok) {
      throw new Error('Failed to create card');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating card:', error);
    throw error;
  }
};

export const upvoteCard = async (cardId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/board/card/upvote`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: cardId }),
    });
    if (!response.ok) {
      throw new Error('Failed to upvote card');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error upvoting card ${cardId}:`, error);
    throw error;
  }
};

export const deleteCard = async (cardId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/board/card/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: cardId }),
    });
    if (!response.ok) {
      throw new Error('Failed to delete card');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error deleting card ${cardId}:`, error);
    throw error;
  }
};
