import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { showLoadMoreButton } from './loadMoreButton.js';
import { refs } from '../../index.js';

export function renderImageGallery(images, gallery) {
  const markup = images
    .map(image => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;
      return `
      <div class="gallery__item">
        <a href="${largeImageURL}" class="gallery__link" target="_blank">
          <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <div class="info__item">
            <b>Likes:</b>
            <span>${likes}</span>
          </div>
          <div class="info__item">
            <b>Views:</b>
            <span>${views}</span>
          </div>
          <div class="info__item">
            <b>Comments:</b>
            <span>${comments}</span>
          </div>
          <div class="info__item">
            <b>Downloads:</b>
            <span>${downloads}</span>
          </div>
        </div>
      </div>
    `;
    })
    .join('');

  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}

export function clearImageGallery(gallery) {
  refs.galleryEl.innerHTML = '';
}

function initLightbox() {
  const lightbox = new SimpleLightbox('.gallery__link', {});
  lightbox.refresh();
}

function scrollToImages() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 0.35,
    behavior: 'smooth',
  });
}

export function renderImages(images) {
  if (images) {
    renderImageGallery(images, refs.galleryEl);
    showLoadMoreButton();
    initLightbox();
    scrollToImages();
  }
}
