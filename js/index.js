import galleryImages from './gallery-items.js';

const refs = {
  galleryItem: document.querySelector('.js-gallery'),
  imageGallery: document.querySelector('.lightbox__image'),
  modalWindow: document.querySelector('.js-lightbox'),
  modalBtn: document.querySelector('.lightbox__button'),
  overlay: document.querySelector('.lightbox__content'),
};

const createList = galleryImages.map(gallery => {
  const item = document.createElement('li');
  const link = document.createElement('a');
  const imgGallery = document.createElement('img');

  item.append(link);
  link.append(imgGallery);

  item.classList.add('gallery__item');

  link.classList.add('gallery__link');
  link.href = gallery.original;

  imgGallery.classList.add('gallery__image');
  imgGallery.dataset.sourse = gallery.original;
  imgGallery.src = gallery.preview;
  imgGallery.alt = gallery.description;

  return item;
});

refs.galleryItem.append(...createList);
refs.galleryItem.addEventListener('click', onImagesClick);
refs.galleryItem.addEventListener('click', onOpenModalWindow);
refs.modalBtn.addEventListener('click', onCloseModalWindow);
refs.overlay.addEventListener('click', onOverlayClick);

function onImagesClick(event) {
  event.preventDefault();
  const imagesClick = event.target;
  if (imagesClick.nodeName !== 'IMG') {
    return;
  }
  const largeImageURL = imagesClick.dataset.sourse;
  setLargeImageSrc(largeImageURL);
}

function setLargeImageSrc(url) {
  refs.imageGallery.src = url;
}

function onOpenModalWindow() {
  const imagesClick = event.target;
  if (imagesClick.nodeName !== 'IMG') {
    return;
  }
  window.addEventListener('keydown', onPressEscape);
  refs.modalWindow.classList.add('is-open');
}

function onCloseModalWindow() {
  window.removeEventListener('keydown', onPressEscape);
  refs.modalWindow.classList.remove('is-open');
  refs.imageGallery.src = '';
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseModalWindow();
  }
}
function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModalWindow();
  }
}
