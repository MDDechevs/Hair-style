const topbar = document.querySelector('.topbar');
const primaryBook = document.querySelector('.primary-book');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

function syncChrome() {
  topbar.classList.toggle('is-scrolled', window.scrollY > 100);
  if (primaryBook) {
    primaryBook.setAttribute('href', window.innerWidth <= 640 ? 'tel:+359893509632' : '#booking');
  }
}

function closeMenu() {
  document.body.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  mobileMenu?.setAttribute('aria-hidden', 'true');
}

syncChrome();
window.addEventListener('scroll', syncChrome, { passive: true });
window.addEventListener('resize', syncChrome);
menuToggle?.addEventListener('click', () => {
  const isOpen = document.body.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  mobileMenu?.setAttribute('aria-hidden', String(!isOpen));
});
document.querySelectorAll('.mobile-menu a').forEach((link) => link.addEventListener('click', closeMenu));

document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('.services-grid, .reviews-grid, .masonry-gallery').forEach((group) => {
  [...group.children].forEach((child, index) => {
    child.style.transitionDelay = `${index * 50}ms`;
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

function revealVisibleNow() {
  document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      el.classList.add('is-visible');
      observer.unobserve(el);
    }
  });
}
requestAnimationFrame(revealVisibleNow);
setTimeout(revealVisibleNow, 250);
window.addEventListener('hashchange', () => setTimeout(revealVisibleNow, 120));

const reviewTrack = document.querySelector('.reviews-grid');
const reviewDots = [...document.querySelectorAll('.testimonial-dots button')];
reviewDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    const card = reviewTrack?.children[index];
    card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  });
});
reviewTrack?.addEventListener('scroll', () => {
  if (!reviewDots.length) return;
  const cards = [...reviewTrack.children];
  const active = cards.reduce((best, card, index) => {
    const distance = Math.abs(card.getBoundingClientRect().left - reviewTrack.getBoundingClientRect().left);
    return distance < best.distance ? { index, distance } : best;
  }, { index: 0, distance: Infinity }).index;
  reviewDots.forEach((dot, index) => dot.classList.toggle('active', index === active));
}, { passive: true });

const contactForm = document.querySelector('.contact-form');
contactForm?.querySelectorAll('input[required], select[required]').forEach((field) => {
  const error = document.createElement('span');
  error.className = 'form-error';
  error.textContent = 'Моля, попълнете това поле.';
  field.closest('label')?.append(error);
  field.addEventListener('input', () => field.closest('label')?.classList.toggle('invalid', !field.validity.valid));
});
contactForm?.addEventListener('submit', (event) => {
  if (!contactForm.checkValidity()) {
    event.preventDefault();
    contactForm.querySelectorAll('input[required], select[required]').forEach((field) => {
      field.closest('label')?.classList.toggle('invalid', !field.validity.valid);
    });
  }
});

const galleryItems = [...document.querySelectorAll('[data-lightbox]')];
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const closeButton = document.querySelector('.lightbox-close');
const prevButton = document.querySelector('.lightbox-prev');
const nextButton = document.querySelector('.lightbox-next');
let activeImage = 0;

function openLightbox(index) {
  activeImage = index;
  lightboxImage.src = galleryItems[activeImage].dataset.lightbox;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
  lightboxImage.removeAttribute('src');
}

function moveLightbox(direction) {
  activeImage = (activeImage + direction + galleryItems.length) % galleryItems.length;
  lightboxImage.src = galleryItems[activeImage].dataset.lightbox;
}

galleryItems.forEach((item, index) => item.addEventListener('click', () => openLightbox(index)));
closeButton?.addEventListener('click', closeLightbox);
prevButton?.addEventListener('click', () => moveLightbox(-1));
nextButton?.addEventListener('click', () => moveLightbox(1));
lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
    if (lightbox?.classList.contains('is-open')) closeLightbox();
  }
  if (!lightbox?.classList.contains('is-open')) return;
  if (event.key === 'ArrowLeft') moveLightbox(-1);
  if (event.key === 'ArrowRight') moveLightbox(1);
});
