import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// 1. Створення розмітки карток галереї
const galleryCards = galleryItems
  .map(({ preview, original, description }) => {
    return `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`;
  })
  .join(' ');

// 2. Додавання розмітки в DOM, підключення слухача подій
const galleryEl = document.querySelector('.gallery');
galleryEl.insertAdjacentHTML('beforeend', galleryCards);
galleryEl.addEventListener('click', onCardClick);

// 3. Функція обробки кліку на картку галереї
function onCardClick(event) {
  event.preventDefault();

  if (event.target.nodeName === `IMG`) {
    createModalGallery();
  }
}

// 4. Створення розмітки та відкриття модального вікна перегляду зображення
function createModalGallery() {
  const modalGallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  modalGallery.open();
}

console.log(galleryItems);
