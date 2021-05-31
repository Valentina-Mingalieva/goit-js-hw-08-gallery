import images from "./gallery-items.js";

// References

const galleryEl = document.querySelector(".js-gallery"); 
const lightboxEl = document.querySelector(".js-lightbox");
const lightboxContent = document.querySelector(".lightbox__image");
const closeBtn = document.querySelector("[data-action='close-lightbox']");
const overlayEl = document.querySelector(".lightbox__overlay");

// 1. 

const markup = images.reduce(
    (string, image) => string +
    `<li class="gallery__item">
        <a class="gallery__link" href="${image.original}">
            <img class="gallery__image" src="${image.preview}" data-source="${image.original}" alt="${image.description}">
        </a>
    </li>`,
    ""
);

galleryEl.insertAdjacentHTML("beforeend", markup);

console.log(galleryEl);

// 2. делегирование

galleryEl.addEventListener('click', catchClick);

function catchClick (e) {
    e.preventDefault();  
    if (e.target.nodeName !== "IMG") return;  
    openModal(e.target)
}

// 3. открытие модального окна по клику

function openModal(e) {
    lightboxEl.classList.add("is-open");
    
    changeModalAtt(e);

    closeBtn.addEventListener('click', closeModal);
    overlayEl.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModalByEscape);
    document.addEventListener('keydown', changePhoto);
}

// 4. подмена аттрибута

function changeModalAtt(e) {
    lightboxContent.src = e.dataset.source;
    lightboxContent.alt = e.alt;
}

// 5. Закрытие модального окна по клику на кнопку button
// 6. Очистка значения атрибута src
// 7. Закрытие модального окна по клику на div.lightbox__overlay
    
function closeModal() {
    lightboxEl.classList.remove("is-open");

    lightboxContent.src = "";
    lightboxContent.alt = "";

    closeBtn.removeEventListener('click', closeModal);
    overlayEl.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', closeModalByEscape);
    document.removeEventListener('keydown', changePhoto);
}

// 8. Закрытие модального окна по нажатию клавиши ESC.

function closeModalByEscape(e) {
    const ESCAPE_CODE = "Escape";
    if (e.key === ESCAPE_CODE) {
        closeModal();
    }
}
 
// 9. Пролистывание изображений

function changePhoto(e) {
    console.dir(e);
    let newIndex;
    const currentId = images.findIndex(photo => photo.original === lightboxContent.src);
    if (e.key === 'ArrowLeft') {
        newIndex = currentId - 1;
        if (newIndex === -1) {
            newIndex = images.length - 1;
        }
    } else if (e.key === 'ArrowRight') {
        newIndex = currentId + 1;
        if (newIndex === images.length) {
            newIndex = 0;
        }
    }
    lightboxContent.src = images[newIndex].original;
    lightboxContent.alt = images[newIndex].description;
}