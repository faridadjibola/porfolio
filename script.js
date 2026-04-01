// ==================== MOBILE MENU TOGGLE ====================

const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  
  // Animate hamburger icon
  menuToggle.classList.toggle('active');
});

// Close mobile menu when link is clicked
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    menuToggle.classList.remove('active');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.header') && !e.target.closest('.mobile-menu')) {
    mobileMenu.classList.remove('active');
    menuToggle.classList.remove('active');
  }
});

// ==================== CONTACT FORM SUBMISSION ====================

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validation
  if (!name || !email || !subject || !message) {
    showError('Please fill in all fields.');
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError('Please enter a valid email address.');
    return;
  }

  // Show success message
  showSuccess('Thank you! Your message has been sent successfully.');
  
  // Reset form
  contactForm.reset();

  // Clear status message after 5 seconds
  setTimeout(() => {
    formStatus.textContent = '';
    formStatus.classList.remove('success');
  }, 5000);
});

// Show error message
function showError(message) {
  formStatus.textContent = message;
  formStatus.classList.remove('success');
  formStatus.classList.add('error');
}

// Show success message
function showSuccess(message) {
  formStatus.textContent = message;
  formStatus.classList.remove('error');
  formStatus.classList.add('success');
}

// ==================== SMOOTH SCROLL NAVIGATION ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip if href is just "#"
    if (href === '#') return;
    
    const target = document.querySelector(href);
    
    if (target) {
      e.preventDefault();
      
      // Close mobile menu if open
      mobileMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      
      // Scroll to target
      target.scrollIntoView({
        behavior: 'auto',
        block: 'start'
      });
    }
  });
});

// ==================== ACTIVE NAV LINK HIGHLIGHTING ====================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe skill cards and project cards
document.querySelectorAll('.skill-card, .project-card, .stat-item').forEach(el => {
  observer.observe(el);
});

// ==================== FORM INPUT ENHANCEMENTS ====================

const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
  // Add focus styling
  input.addEventListener('focus', function() {
    this.parentElement.classList.add('focused');
  });

  input.addEventListener('blur', function() {
    this.parentElement.classList.remove('focused');
  });
});

// ==================== PREVENT MOBILE ZOOM ON INPUT ====================

document.addEventListener('touchmove', function(event) {
  const target = event.target;
  
  // Allow default behavior for inputs, textareas, and buttons
  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'BUTTON') {
    return true;
  }
}, { passive: true });

// ==================== UTILITY: ADD ACTIVE CLASS STYLE ====================

const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    color: var(--primary-color);
  }

  .nav-link.active::after {
    width: 100%;
  }

  .form-group.focused input,
  .form-group.focused textarea {
    border-color: var(--primary-color);
    background: rgba(14, 165, 233, 0.02);
  }

  .skill-card.visible,
  .project-card.visible,
  .stat-item.visible {
    animation: fadeInUp 0.6s ease forwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// ==================== PAGE LOAD OPTIMIZATION ====================

// Defer non-critical JavaScript
window.addEventListener('DOMContentLoaded', () => {
  // Page is now fully loaded and parsed
  console.log('Portfolio website loaded successfully!');
});

// ==================== CONSOLE LOG ====================

console.log('%cWelcome to Okoro Farid Portfolio!', 'font-size: 16px; font-weight: bold; color: #0ea5e9;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'font-size: 12px; color: #64748b;');
