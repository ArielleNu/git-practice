/* ─────────────────────────────────────────────────────────
   Journey popups
───────────────────────────────────────────────────────── */
// shows the popup whose id matches
function openPopup(popupId) {
  document.getElementById(popupId).style.display = 'block';
}

// hides the given popup element
function closePopup(popupElement) {
  popupElement.style.display = 'none';
}

// attach click handlers to buttons with data-popup attribute
// when clicked, they open the corresponding popup
const journeyButtons = document.querySelectorAll('[data-popup]');
journeyButtons.forEach(button => {
  button.onclick = () => openPopup(button.dataset.popup);
});

const journeyCloseButtons = document.querySelectorAll('.journey-popup .close-btn');
journeyCloseButtons.forEach(closeBtn => {
  closeBtn.onclick = () => closePopup(closeBtn.parentElement.parentElement);
});

/* ─────────────────────────────────────────────────────────
   Image carousel
───────────────────────────────────────────────────────── */
const carouselTrack = document.querySelector('.carousel-track');
const carouselSlidesArray = Array.from(document.querySelectorAll('.carousel-slide'));
const nextCarouselBtn = document.querySelector('.carousel-btn.next');
const prevCarouselBtn = document.querySelector('.carousel-btn.prev');
let currentSlideIndex = 0;

// moves the track to show the current slide
const moveCarousel = () => {
  carouselTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
};

// go to next or previous slide
nextCarouselBtn.onclick = () => {
  currentSlideIndex = (currentSlideIndex + 1) % carouselSlidesArray.length;
  moveCarousel();
};

prevCarouselBtn.onclick = () => {
  currentSlideIndex = (currentSlideIndex - 1 + carouselSlidesArray.length) % carouselSlidesArray.length;
  moveCarousel();
};

/* ─────────────────────────────────────────────────────────
   Gallery popup with sidebar table‑of‑contents
───────────────────────────────────────────────────────── */
const galleryPopupEl = document.getElementById('gallery-popup');
const galleryCloseBtn = galleryPopupEl.querySelector('.close-gallery');
const sidebarElement = document.getElementById('sidebar');
const galleryImagesNode = document.querySelectorAll('#photo-grid img');
const sidebarToggleBtn = document.getElementById('sidebar-toggle');

// open gallery when a carousel slide is clicked
carouselSlidesArray.forEach(slide =>
  slide.onclick = () => openPopup('gallery-popup')
);

// close button inside gallery
galleryCloseBtn.onclick = () => closePopup(galleryPopupEl);

// sidebar hamburger toggle
sidebarToggleBtn.onclick = () => sidebarElement.classList.toggle('open');

// filter gallery by section
sidebarElement.onclick = event => {
  if (event.target.tagName !== 'LI') return;

  // highlight active section
  sidebarElement.querySelectorAll('li').forEach(li => li.classList.remove('active'));
  event.target.classList.add('active');

  const selectedSection = event.target.dataset.section; 

  galleryImagesNode.forEach(img => {
    const matches = selectedSection === 'all' || img.dataset.section === selectedSection;
    img.style.display = matches ? 'block' : 'none';
  });
};

// close gallery popup when clicking outside the image grid
window.onclick = event => {
  document.querySelectorAll('.popup').forEach(popup => {
    if (event.target === popup) closePopup(popup);
  });
};

/* ─────────────────────────────────────────────────────────
   Fun‑fact sparkles
───────────────────────────────────────────────────────── */
const funFactCards = document.querySelectorAll('.fact-card');

funFactCards.forEach(card => {
  card.addEventListener('click', () => {
    const sparkleCount = 5;
    const cardRect = card.getBoundingClientRect();

    for (let n = 0; n < sparkleCount; n++) {
      const sparkleSpan = document.createElement('span');
      sparkleSpan.className = 'sparkle';
      sparkleSpan.textContent = '✨';

      // Random position inside the card 
      sparkleSpan.style.left = `${Math.random() * cardRect.width}px`;
      sparkleSpan.style.top = `${Math.random() * cardRect.height}px`;

      card.appendChild(sparkleSpan);

      // Remove sparkle after animation ends
      sparkleSpan.addEventListener('animationend', () => sparkleSpan.remove());
    }
  });
});
