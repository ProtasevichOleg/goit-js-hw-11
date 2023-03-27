import Notiflix from 'notiflix';
import { fetchImagesFromPixabayApi } from '../api/pixabayApiService.js';
import { renderImages } from './renderers.js';
import { refs } from '../../index.js';
import { hideLoadMoreButton } from './loadMoreButton.js';

export async function fetchImages() {
  try {
    const { hits, totalHits } = await fetchImagesFromPixabayApi(
      refs.searchQuery,
      refs.currentPage
    );
    if (hits.length === 0) {
      if (refs.currentPage > 1) {
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      return { totalHits: 0, error: true };
    }
    return { images: hits, totalHits };
  } catch (error) {
    if (error.response && error.response.status === 400) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results"
      );
    } else {
      Notiflix.Notify.failure('An error occurred. Please try again.');
    }
    console.error(error);
    return { error: true };
  }
}

export async function fetchAndRenderImages() {
  const { images, totalHits, error } = await fetchImages();

  if (!error) {
    if (images && refs.currentPage === 1) {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }

    renderImages(images);
  } else {
    hideLoadMoreButton();
  }
}
