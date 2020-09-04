import galleryImages from './gallery-items.js';

const refs = {
    galleryItem: document.querySelector('.js-gallery'),
    imageGallery = document.querySelector('.gallery__image'),
};

const createList = galleryImages.map(gallery => {
  const item = document.createElement('li');
  const link = document.createElement('a');
  const imgGallery = document.createElement('img');

  item.append(link);
  link.append(imgGallery);

  item.classList.add('gallery__item');

  link.classList.add('gallery__link');

  imgGallery.classList.add('gallery__image');
  imgGallery.dataset.sourse = gallery.original;
  imgGallery.src = gallery.preview;
  imgGallery.alt = gallery.description;

  return item;
});

refs.galleryItem.append(...createList);



const onImagesClick = event => {
  event.preventDefault();
  const imagesClick = event.target;
  if (imagesClick.nodeName !== 'IMG') {
    return;
  }

  const largeImageURL = imagesClick.dataset.sourse;
  imageGallery.src = largeImageURL;
};

refs.galleryItem.addEventListener('click', onImagesClick);
