// jsModules/components/loadMoreButton.js

import { refs } from '../..';

export function showLoadMoreButton() {
  refs.loadMoreBtnEl.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  refs.loadMoreBtnEl.classList.add('hidden');
}
