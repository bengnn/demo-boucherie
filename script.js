document.documentElement.classList.remove("no-js");

document.addEventListener("DOMContentLoaded", () => {

  // --- 1. DATA : NOS PRODUITS ET PRIX ---
  // C'est ici que tu configures tes prix !
  const productsDB = {
    "Boeuf": [
      { name: "Entrecôte", price: 29.90 },
      { name: "Faux-filet", price: 24.90 },
      { name: "Bavette d'aloyau", price: 19.50 },
      { name: "Steak haché", price: 14.90 },
      { name: "Côte de boeuf", price: 35.00 }
    ],
    "Porc": [
      { name: "Côtes de porc", price: 12.90 },
      { name: "Rôti filet", price: 15.50 },
      { name: "Saucisses (le kg)", price: 13.90 },
      { name: "Travers (Ribs)", price: 14.50 }
    ],
    "Agneau": [
      { name: "Gigot entier", price: 22.90 },
      { name: "Côtelettes", price: 26.00 },
      { name: "Épaule désossée", price: 24.50 }
    ],
    "Poulet": [
      { name: "Poulet entier (pièce)", price: 15.00, unit: "pièce" }, 
      { name: "Filets de poulet", price: 16.90 },
      { name: "Cuisses", price: 11.90 }
    ]
  };

  // --- 2. VARIABLES ---
  let cart = []; // Notre panier vide
  let currentCategory = ""; // La catégorie en cours (ex: Boeuf)

  const modal = document.getElementById("orderModal");
  const successModal = document.getElementById("successModal");
  const closeBtns = document.querySelectorAll(".close, #closeSuccess");
  
  // Elements du DOM
  const modalTitle = document.getElementById("modalTitle");
  const cutSelect = document.getElementById("cutSelect");
  const priceDisplay = document.getElementById("priceDisplay");
  const quantityInput = document.getElementById("quantityInput");
  const prepInput = document.getElementById("prepInput");
  const addToCartBtn = document.getElementById("addToCartBtn");
  
  const cartList = document.getElementById("cartList");
  const totalPriceEl = document.getElementById("totalPrice");
  const finalForm = document.getElementById("finalOrderForm");

  // --- 3. OUVERTURE DU MODAL ---
  document.querySelectorAll(".card.price").forEach(card => {
    card.addEventListener("click", () => {
      currentCategory = card.dataset.service; // ex: "Boeuf"
      
      // On met à jour le titre
      modalTitle.textContent = `Commander du ${currentCategory}`;
      
      // On remplit le Select avec les morceaux correspondants
      populateCuts(currentCategory);
      
      // On ouvre le modal
      modal.style.display = "block";
    });
  });

  // --- 4. FONCTIONS UTILITAIRES ---
  
  // Remplir la liste déroulante
  function populateCuts(category) {
    cutSelect.innerHTML = ""; // Vider la liste
    const items = productsDB[category];

    if (items) {
      items.forEach((item, index) => {
        const option = document.createElement("option");
        option.value = index; // On stocke l'index pour retrouver le prix facilement
        option.textContent = item.name;
        cutSelect.appendChild(option);
      });
      updatePriceDisplay(); // Mettre à jour le prix du premier élément
    }
  }

  // Afficher le prix quand on change de sélection
  function updatePriceDisplay() {
    const selectedIndex = cutSelect.value;
    const item = productsDB[currentCategory][selectedIndex];
    const unit = item.unit ? item.unit : "kg"; // "kg" par défaut sauf si spécifié "pièce"
    priceDisplay.textContent = `${item.price.toFixed(2)} € / ${unit}`;
  }

  cutSelect.addEventListener("change", updatePriceDisplay);

  // --- 5. AJOUTER AU PANIER ---
  addToCartBtn.addEventListener("click", () => {
    const qty = parseFloat(quantityInput.value);
    
    if (!qty || qty <= 0) {
      alert("Veuillez entrer une quantité valide.");
      return;
    }

    const selectedIndex = cutSelect.value;
    const itemData = productsDB[currentCategory][selectedIndex];
    const itemTotal = itemData.price * qty;

    // Création de l'objet "Article"
    const orderItem = {
      category: currentCategory,
      name: itemData.name,
      qty: qty,
      unit: itemData.unit || "kg",
      note: prepInput.value,
      totalPrice: itemTotal
    };

    // Ajouter au tableau cart
    cart.push(orderItem);

    // Mettre à jour l'affichage
    renderCart();
    
    // Reset des champs d'ajout
    quantityInput.value = "";
    prepInput.value = "";
  });

  // --- 6. AFFICHAGE DU PANIER ---
  function renderCart() {
    cartList.innerHTML = ""; // Vider la liste visuelle
    let grandTotal = 0;

    if (cart.length === 0) {
      cartList.innerHTML = "<li class='empty-cart'>Votre panier est vide</li>";
      totalPriceEl.textContent = "0.00 €";
      return;
    }

    cart.forEach((item, index) => {
      grandTotal += item.totalPrice;

      const li = document.createElement("li");
      li.innerHTML = `
        <span>
          <strong>${item.category} - ${item.name}</strong><br>
          <small>${item.qty} ${item.unit} ${item.note ? '('+item.note+')' : ''}</small>
        </span>
        <span>
          ${item.totalPrice.toFixed(2)} €
          <span class="item-remove" data-index="${index}">×</span>
        </span>
      `;
      cartList.appendChild(li);
    });

    totalPriceEl.textContent = grandTotal.toFixed(2) + " €";

    // Gestion de la suppression d'article
    document.querySelectorAll(".item-remove").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const indexToRemove = e.target.dataset.index;
        cart.splice(indexToRemove, 1); // Enlever du tableau
        renderCart(); // Rafraichir l'affichage
      });
    });
  }

  // --- 7. VALIDATION FINALE ---
  finalForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Votre panier est vide !");
      return;
    }

    // ICI : Tu pourrais envoyer les données à un serveur ou par email
    // Pour l'instant, on simule une réussite
    console.log("Commande envoyée :", {
      client: document.getElementById("clientName").value,
      phone: document.getElementById("clientPhone").value,
      date: document.getElementById("pickupDate").value,
      panier: cart
    });

    modal.style.display = "none";
    successModal.style.display = "block";
    
    // Vider le panier après commande
    cart = [];
    renderCart();
    finalForm.reset();
  });

  // Gestion Fermeture Modals
  closeBtns.forEach(btn => btn.addEventListener("click", () => {
    modal.style.display = "none";
    successModal.style.display = "none";
  }));

  window.addEventListener("click", (e) => {
    if (e.target == modal) modal.style.display = "none";
    if (e.target == successModal) successModal.style.display = "none";
  });

  /* --- MENU SCROLL & REVEAL (Ton ancien code conservé) --- */
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section-anchor");
  const reveals = document.querySelectorAll(".reveal");

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("active"));
        const id = entry.target.id;
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  }, { rootMargin: "-30% 0px -70% 0px" });

  sections.forEach(section => sectionObserver.observe(section));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => revealObserver.observe(el));
});
