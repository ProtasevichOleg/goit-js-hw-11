import Notiflix from 'notiflix';
import { refs } from '../../index.js';
import { clearImageGallery } from './renderers';
import { fetchAndRenderImages } from './fetchers';
import { hideLoadMoreButton } from './loadMoreButton';

export async function onSearchFormSubmit(event) {
  event.preventDefault();
  refs.searchQuery = event.target.elements[0].value.trim();

  if (!refs.searchQuery) {
    Notiflix.Notify.warning('Please, enter a search query.');
    return;
  }

  refs.currentPage = 1;
  refs.totalImagesFetched = 0;
  clearImageGallery(refs.galleryEl);
  hideLoadMoreButton();
  await fetchAndRenderImages();
}

export async function onLoadMoreButtonClick() {
  refs.currentPage += 1;
  await fetchAndRenderImages(true);
}
