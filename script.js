/* =====================================================================
   Sahil Kumar | Portfolio: script.js
   Features:
     1. Dark / light mode            (saved in localStorage)
     2. Project filter buttons       (choice saved in localStorage)
     3. Image gallery (lightbox)     (click an image, arrow buttons, Esc to close)
     4. Contact form validation      (real-time error messages)
     5. Back-to-top button, scroll reveal, active menu link
     6. Dynamic content              (time-of-day greeting, footer year, counters)
   ===================================================================== */
'use strict';
 
/* ---------- Reusable helpers ---------- */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
 
// localStorage can be blocked (private mode), so every call is wrapped in try/catch.
const store = {
  get(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (error) {
      return fallback;
    }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) { /* ignore */ }
  }
};
 
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 
console.log('script.js loaded'); // Day 1 test
 
/* ---------- 1. Dark mode ---------- */
const themeButton = $('#theme-toggle');
 
function applyTheme(isDark) {
  document.body.classList.toggle('dark-mode', isDark);
  themeButton.setAttribute('aria-pressed', String(isDark));
  themeButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  themeButton.textContent = isDark ? '\u2600 Light mode' : '\u263E Dark mode';
}
 
function toggleDarkMode() {
  const isDark = !document.body.classList.contains('dark-mode');
  applyTheme(isDark);
  store.set('darkMode', isDark);
}
 
/* ---------- 2. Project filter ---------- */
const filterButtons = $$('.filter-btn');
const projectCards = $$('.project-card');
const projectCount = $('#project-count');
 
function filterProjects(category) {
  let shown = 0;
  projectCards.forEach(card => {
    const match = category === 'all' || card.dataset.category === category;
    card.hidden = !match;
    if (match) shown += 1;
  });
  filterButtons.forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.filter === category)));
  const kind = category === 'all' ? '' : $(`.filter-btn[data-filter="${category}"]`).textContent + ' ';
  projectCount.textContent = `Showing ${shown} ${kind}project${shown === 1 ? '' : 's'}`;
  store.set('projectFilter', category);
}
 
/* ---------- 3. Image gallery (lightbox) ---------- */
const lightbox = $('#lightbox');
const lightboxImg = $('#lightbox-img');
const lightboxCaption = $('#lightbox-caption');
let galleryImages = [];   // images of the cards that are currently visible
let galleryIndex = 0;
 
function showGalleryImage(index) {
  galleryIndex = (index + galleryImages.length) % galleryImages.length; // wraps around
  const img = galleryImages[galleryIndex];
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = img.closest('.project-card').querySelector('h3').textContent;
}
 
function openLightbox(img) {
  if (typeof lightbox.showModal !== 'function') return; // very old browsers
  galleryImages = $$('.project-card:not([hidden]) img');
  showGalleryImage(galleryImages.indexOf(img));
  lightbox.showModal();
  $('#lightbox-close').focus();
}
 
function closeLightbox() {
  if (lightbox.open) lightbox.close();
}
 
/* ---------- 4. Contact form validation ---------- */
const form = $('#contact-form');
const formStatus = $('#form-status');
const counter = $('#message-counter');
const MESSAGE_MAX = 500;
 
// Each validator returns an error message, or '' when the value is fine.
const validators = {
  name(value) {
    if (value.length === 0) return 'Please enter your name.';
    if (value.length < 2) return 'Name must be at least 2 characters.';
    if (value.length > 60) return 'Name must be 60 characters or fewer.';
    return '';
  },
  email(value) {
    if (value.length === 0) return 'Please enter your email address.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return 'Please enter a valid email address, like name@example.com.';
    return '';
  },
  message(value) {
    if (value.length === 0) return 'Please write a message.';
    if (value.length < 10) return `Message must be at least 10 characters (${value.length} so far).`;
    if (value.length > MESSAGE_MAX) return `Message must be ${MESSAGE_MAX} characters or fewer.`;
    return '';
  }
};
 
function showError(field, message) {
  $(`#${field.id}-error`).textContent = message;
  field.setAttribute('aria-invalid', 'true');
  field.classList.remove('is-valid');
}
 
function clearError(field) {
  $(`#${field.id}-error`).textContent = '';
  field.removeAttribute('aria-invalid');
  field.classList.add('is-valid');
}
 
function validateField(field) {
  const message = validators[field.name](field.value.trim());
  if (message) { showError(field, message); } else { clearError(field); }
  return message === '';
}
 
function setStatus(text, type) {
  formStatus.textContent = text;
  formStatus.className = 'form-status' + (type ? ' ' + type : '');
}
 
function updateCounter() {
  const length = form.elements.message.value.length;
  counter.textContent = `${length} / ${MESSAGE_MAX}`;
  counter.classList.toggle('warn', length > MESSAGE_MAX - 50);
}
 
function resetFormState() {
  form.reset();
  $$('input, textarea', form).forEach(field => {
    field.removeAttribute('aria-invalid');
    field.classList.remove('is-valid');
    delete field.dataset.touched;
  });
  $$('.field-error', form).forEach(p => { p.textContent = ''; });
  updateCounter();
}
 
function handleSubmit(event) {
  event.preventDefault();
  const fields = [form.elements.name, form.elements.email, form.elements.message];
  const results = fields.map(field => { field.dataset.touched = 'true'; return validateField(field); });
 
  if (results.includes(false)) {
    setStatus('Please fix the errors above and try again.', 'err');
    fields[results.indexOf(false)].focus();
    return false;
  }
 
  // GitHub Pages has no server, so the message is sent through the visitor's email app.
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
  setStatus(`Thanks, ${name}! Your email app is opening with your message.`, 'ok');
  window.location.href = `mailto:Sahil080805@gmail.com?subject=${subject}&body=${body}`;
  resetFormState();
  return true;
}
 
/* ---------- 5. Back to top, scroll reveal, active menu link ---------- */
const backToTop = $('#back-to-top');
 
function updateBackToTop() {
  backToTop.classList.toggle('show', window.scrollY > 500);
}
 
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}
 
function setupScrollReveal() {
  const targets = $$('main section > h2, .facts li, .project-card, #skill-list article, .job, #connect article, #contact form');
  targets.forEach(el => el.classList.add('reveal'));
  if (!('IntersectionObserver' in window)) { targets.forEach(el => el.classList.add('visible')); return; }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  targets.forEach(el => observer.observe(el));
}
 
function setupActiveNav() {
  if (!('IntersectionObserver' in window)) return;
  const links = $$('nav a[href^="#"]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(link => { const section = $(link.getAttribute('href')); if (section) observer.observe(section); });
}
 
/* ---------- 6. Dynamic content ---------- */
function getGreeting(hour) {
  if (hour < 5) return 'Hello, night owl!';
  if (hour < 12) return 'Good morning!';
  if (hour < 17) return 'Good afternoon!';
  if (hour < 21) return 'Good evening!';
  return 'Hello, night owl!';
}
 
function updateDynamicContent() {
  $('#greeting').textContent = getGreeting(new Date().getHours());
  $('#year').textContent = new Date().getFullYear();
  updateCounter();
}
 
/* ---------- Event listeners ---------- */
function init() {
  document.documentElement.classList.add('js');
 
  // Saved preferences
  applyTheme(store.get('darkMode', false));
  const savedFilter = store.get('projectFilter', 'all');
  filterProjects($(`.filter-btn[data-filter="${savedFilter}"]`) ? savedFilter : 'all');
 
  updateDynamicContent();
  setupScrollReveal();
  setupActiveNav();
  updateBackToTop();
 
  // Dark mode
  themeButton.addEventListener('click', toggleDarkMode);
 
  // Filters
  filterButtons.forEach(btn => btn.addEventListener('click', () => filterProjects(btn.dataset.filter)));
 
  // Gallery: click or press Enter/Space on a project image
  $$('.project-card img').forEach(img => {
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.title = 'Click to enlarge';
    img.addEventListener('click', () => openLightbox(img));
    img.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openLightbox(img); }
    });
  });
  $('#lightbox-close').addEventListener('click', closeLightbox);
  $('#lightbox-prev').addEventListener('click', () => showGalleryImage(galleryIndex - 1));
  $('#lightbox-next').addEventListener('click', () => showGalleryImage(galleryIndex + 1));
  lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); }); // click on the dark backdrop
  lightbox.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') showGalleryImage(galleryIndex - 1);
    if (event.key === 'ArrowRight') showGalleryImage(galleryIndex + 1);
  });
 
  // Form: custom messages replace the browser's default pop-ups
  form.noValidate = true;
  form.addEventListener('submit', handleSubmit);
  [form.elements.name, form.elements.email, form.elements.message].forEach(field => {
    field.addEventListener('blur', () => { field.dataset.touched = 'true'; validateField(field); });
    field.addEventListener('input', () => {
      if (field.dataset.touched) validateField(field);   // real-time feedback after the first visit
      if (field === form.elements.message) updateCounter();
      if (formStatus.textContent) setStatus('', '');
    });
  });
 
  // Back to top
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  backToTop.addEventListener('click', scrollToTop);
}
 
init();
