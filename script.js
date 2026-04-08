/* 
   Explore Nepal - JavaScript
   Features: Image Slider, Form Validation
  */

/* IMAGE SLIDER */
let currentSlide = 0;
let slideTimer;

function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');

  if (slides.length === 0) return;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startAuto() {
    slideTimer = setInterval(nextSlide, 4500);
  }

  function stopAuto() {
    clearInterval(slideTimer);
  }

  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      stopAuto();
      nextSlide();
      startAuto();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      stopAuto();
      prevSlide();
      startAuto();
    });
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      stopAuto();
      showSlide(i);
      startAuto();
    });
  });

  showSlide(0);
  startAuto();
}

/* CONTACT FORM VALIDATION */
function initFormValidation() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + 'Error');
    if (field) field.style.borderColor = '#c0392b';
    if (error) {
      error.textContent = message;
      error.style.display = 'block';
    }
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + 'Error');
    if (field) field.style.borderColor = '#d0c8b8';
    if (error) error.style.display = 'none';
  }

  function isValidEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function isValidPhone(phone) {
    var re = /^[0-9\+\-\s]{7,15}$/;
    return re.test(phone);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;

    var name = document.getElementById('name').value.trim();
    clearError('name');
    if (name === '') {
      showError('name', 'Please enter your full name.');
      valid = false;
    } else if (name.length < 3) {
      showError('name', 'Name must be at least 3 characters.');
      valid = false;
    }

    var email = document.getElementById('email').value.trim();
    clearError('email');
    if (email === '') {
      showError('email', 'Please enter your email address.');
      valid = false;
    } else if (!isValidEmail(email)) {
      showError('email', 'Please enter a valid email address.');
      valid = false;
    }

    var phone = document.getElementById('phone').value.trim();
    clearError('phone');
    if (phone === '') {
      showError('phone', 'Please enter your phone number.');
      valid = false;
    } else if (!isValidPhone(phone)) {
      showError('phone', 'Please enter a valid phone number (7-15 digits).');
      valid = false;
    }

    var destination = document.getElementById('destination').value;
    clearError('destination');
    if (destination === '') {
      showError('destination', 'Please select a destination.');
      valid = false;
    }

    var travelDate = document.getElementById('travelDate').value;
    clearError('travelDate');
    if (travelDate === '') {
      showError('travelDate', 'Please select your travel date.');
      valid = false;
    } else {
      var today = new Date();
      var selected = new Date(travelDate);
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        showError('travelDate', 'Travel date must be today or in the future.');
        valid = false;
      }
    }

    var message = document.getElementById('message').value.trim();
    clearError('message');
    if (message === '') {
      showError('message', 'Please enter a message.');
      valid = false;
    } else if (message.length < 10) {
      showError('message', 'Message must be at least 10 characters.');
      valid = false;
    }

    if (valid) {
      var successMsg = document.getElementById('successMsg');
      if (successMsg) successMsg.style.display = 'block';
      form.reset();
      window.scrollTo({ top: form.offsetTop - 100, behavior: 'smooth' });
    }
  });

  var fields = ['name', 'email', 'phone', 'destination', 'travelDate', 'message'];
  fields.forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', function () { clearError(id); });
      el.addEventListener('change', function () { clearError(id); });
    }
  });
}

/*  ACTIVE NAV LINK HIGHLIGHT */
function setActiveNav() {
  var currentPage = window.location.pathname.split('/').pop();
  if (currentPage === '' || currentPage === '/') currentPage = 'index.html';
  var navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}

/* INIT ON DOM READY */
document.addEventListener('DOMContentLoaded', function () {
  initSlider();
  initFormValidation();
  setActiveNav();
});
