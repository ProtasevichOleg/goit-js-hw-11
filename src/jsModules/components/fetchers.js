import Notiflix from 'notiflix';
import { fetchImagesFromPixabayApi } from '../api/pixabayApiService.js';
import { renderImages } from './renderers.js';
import { refs } from '../../index.js';

export async function fetchImages() {
  try {
    const { hits, totalHits } = await fetchImagesFromPixabayApi(
      // Додайте totalHits
      refs.searchQuery,
      refs.currentPage
    );
    if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return null;
    }
    return { images: hits, totalHits }; // Замініть повернення результатів на об'єкт
  } catch (error) {
    Notiflix.Notify.failure('An error occurred. Please try again.');
    console.error(error);
    return null;
  }
}

export async function fetchAndRenderImages() {
  const { images, totalHits } = await fetchImages(); // Додайте totalHits

  if (images && refs.currentPage === 1) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  }

  renderImages(images);
}
