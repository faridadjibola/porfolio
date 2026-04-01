const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in all fields before sending.';
    return;
  }

  formStatus.textContent = 'Thank you! Your message has been sent.';
  contactForm.reset();
});
