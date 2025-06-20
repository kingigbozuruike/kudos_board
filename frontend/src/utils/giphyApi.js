const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs';
const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
export const getRandomGif = async (tag = '') => {
    try {
        if (tag) {
        const searchParams = new URLSearchParams({
            api_key: GIPHY_API_KEY,
            q: tag,
            limit: 1,
            offset: Math.floor(Math.random() * 50),
            rating: 'g'
        });

        const response = await fetch(`${GIPHY_API_URL}/search?${searchParams}`);
        const data = await response.json();

        if (data.data && data.data.length > 0) {
            return data.data[0].images.fixed_height.url;
            }
        }

        const randomParams = new URLSearchParams({
        api_key: GIPHY_API_KEY,
        rating: 'g'
        });

        if (tag) {
            randomParams.append('tag', tag);
        }

        const response = await fetch(`${GIPHY_API_URL}/random?${randomParams}`);
        const data = await response.json();

        return data.data.images.fixed_height.url;
    } catch (error) {
        console.error('Error fetching GIF from Giphy:', error);
        return 'https://via.placeholder.com/200x200?text=GIF+Not+Found';
    }
};

export const getRandomGifSync = (tag = '') => {
  const encodedTag = encodeURIComponent(tag);

  return `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=${encodedTag}&rating=g`;
};
