const API_KEY = '18445929-e575d6623fb59f5ed7bcd7f03';

export async function fetchImagesFromPixabayApi(searchQuery, page) {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
        searchQuery
      )}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );

    if (!response.ok) {
      throw new Error(
        `An error occurred while fetching images: ${response.statusText}`
      );
    }

    const { hits, totalHits } = await response.json();
    return { hits, totalHits };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
