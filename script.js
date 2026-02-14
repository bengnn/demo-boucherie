document.documentElement.classList.remove("no-js");
document.addEventListener("DOMContentLoaded", () => {

  /* ===== ELEMENTS ===== */
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section-anchor");
  const reveals = document.querySelectorAll(".reveal");

  const modal = document.getElementById("bookingModal");
  const successModal = document.getElementById("successModal");
  const closeBtn = document.querySelector(".close");
  const closeSuccess = document.getElementById("closeSuccess");

  const form = document.getElementById("bookingForm");
  const confirmBtn = document.getElementById("confirmBtn");
  const serviceInput = document.getElementById("selectedService");
  const dateInput = form.querySelector('input[type="date"]');

  /* ===== MENU ACTIF ===== */
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("active"));
        const id = entry.target.id;
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  }, { rootMargin: "-40% 0px -40% 0px" });

 sections.forEach(section => {
  if (section) sectionObserver.observe(section);
});


  /* ===== FADE IN ===== */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.15 });

reveals.forEach(el => {
  if (el) revealObserver.observe(el);
});


  /* ===== OUVERTURE MODAL ===== 
  document.querySelectorAll(".card.price").forEach(card => {
    card.addEventListener("click", () => {

      form.reset();
      confirmBtn.disabled = true;
      confirmBtn.classList.remove("enabled");

      serviceInput.value = card.dataset.service;
      modal.style.display = "block";
    });
  });

  /* ===== FERMETURE MODAL ===== 
  closeBtn.addEventListener("click", () => modal.style.display = "none");

  window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });

  /* ===== VALIDATION FORM ===== 
  function checkForm() {
    const fields = form.querySelectorAll("input, select");
    let allFilled = true;

    fields.forEach(field => {
      if (!field.value) allFilled = false;
    });

    confirmBtn.disabled = !allFilled;
    confirmBtn.classList.toggle("enabled", allFilled);
  }

  form.querySelectorAll("input, select").forEach(field => {
    field.addEventListener("input", checkForm);
    field.addEventListener("change", checkForm);
  });

  /* ===== FERMETURE AUTO CALENDRIER ===== 
  dateInput.addEventListener("change", () => {
    dateInput.blur();
  });

  /* ===== SUBMIT ===== 
  form.addEventListener("submit", e => {
    e.preventDefault();
    modal.style.display = "none";
    successModal.style.display = "block";
  });

  closeSuccess.addEventListener("click", () => {
    successModal.style.display = "none";
  });
*/
});

