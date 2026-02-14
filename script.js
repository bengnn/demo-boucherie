document.documentElement.classList.remove("no-js");

document.addEventListener("DOMContentLoaded", () => {

  /* ===== ELEMENTS EXISTANTS ===== */
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section-anchor");
  const reveals = document.querySelectorAll(".reveal");

  /* On commente les variables du Modal tant qu'elles ne sont pas dans le HTML
     pour éviter de faire planter le script.
  */
  // const modal = document.getElementById("bookingModal");
  // const form = document.getElementById("bookingForm");
  // etc...

  /* ===== MENU ACTIF (Scroll Spy) ===== */
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // On récupère l'ID de la section visible
        const id = entry.target.id;
        
        // On enlève la classe active de TOUS les liens
        navLinks.forEach(link => link.classList.remove("active"));
        
        // On cherche le lien correspondant à cette section
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        
        // Si on le trouve, on le met en gras
        if (activeLink) {
            activeLink.classList.add("active");
        }
      }
    });
  }, { rootMargin: "-30% 0px -70% 0px" }); 
  // J'ai ajusté le rootMargin pour que le changement se fasse un peu plus haut dans la page

  sections.forEach(section => {
    sectionObserver.observe(section);
  });


  /* ===== FADE IN (Apparition au scroll) ===== */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Optionnel : on arrête d'observer une fois apparu pour économiser des ressources
        revealObserver.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => {
    revealObserver.observe(el);
  });

});
