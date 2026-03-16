/* =====================================================
   PEAKMALE — script.js
   Built for the Bold — All JavaScript Logic
   ===================================================== */

'use strict';

// ==================== PRODUCT DATA ====================
const products = [
  {
    id: 1,
    name: "Minecraft Diamond Sword",
    category: "gaming",
    price: 1499,
    rating: 5,
    ratingCount: 128,
    description: "3D printed replica, 60cm length. Iconic blue diamond finish.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80",
    badge: "⚔️ Gaming"
  },
  {
    id: 2,
    name: "Minecraft Pickaxe Replica",
    category: "gaming",
    price: 999,
    rating: 4,
    ratingCount: 96,
    description: "3D printed pickaxe, 55cm. Perfect desk or wall display piece.",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&q=80",
    badge: "⚔️ Gaming"
  },
  {
    id: 3,
    name: "Among Us Crewmate Figure",
    category: "gaming",
    price: 799,
    rating: 5,
    ratingCount: 74,
    description: "15cm figure with LED glowing base. Looks amazing in the dark.",
    image: "https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=500&q=80",
    badge: "⚔️ Gaming"
  },
  {
    id: 4,
    name: "Cyberpunk Katana Replica",
    category: "gaming",
    price: 2499,
    rating: 5,
    ratingCount: 52,
    description: "Decorative 70cm katana. Neon accented handle. Wall-mount included.",
    image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=500&q=80",
    badge: "⚔️ Gaming"
  },
  {
    id: 5,
    name: "Zelda Master Sword",
    category: "gaming",
    price: 1599,
    rating: 5,
    ratingCount: 89,
    description: "3D printed, 65cm. Faithful replica of the legendary Hylian blade.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80",
    badge: "⚔️ Gaming"
  },
  {
    id: 6,
    name: "Gaming Controller Wall Mount",
    category: "gaming",
    price: 449,
    rating: 4,
    ratingCount: 163,
    description: "Acrylic wall mount. Fits PS, Xbox & Nintendo controllers.",
    image: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500&q=80",
    badge: "⚔️ Gaming"
  },
    {
    id: 6,
    name: "Demo",
    category: "tech",
    price: 449,
    rating: 4,
    ratingCount: 163,
    description: "Acrylic wall mount. Fits PS, Xbox & Nintendo controllers.",
    image: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500&q=80",
    badge: "⚔️ Gaming"
  },
];

// ==================== CART STATE ====================
let cart = [];
let currentFilter = 'all';

// ==================== DOM REFS ====================
const navbar       = document.getElementById('navbar');
const hamburger    = document.getElementById('hamburger');
const navLinks     = document.getElementById('navLinks');
const cartBtn      = document.getElementById('cartBtn');
const cartBadge    = document.getElementById('cartBadge');
const cartClose    = document.getElementById('cartClose');
const cartSidebar  = document.getElementById('cartSidebar');
const cartOverlay  = document.getElementById('cartOverlay');
const cartItems    = document.getElementById('cartItems');
const cartFooter   = document.getElementById('cartFooter');
const cartCountTxt = document.getElementById('cartCountText');
const productsGrid = document.getElementById('productsGrid');
const filterTabs   = document.querySelectorAll('.filter-tab');
const toastCont    = document.getElementById('toastContainer');
const subscribeBtn = document.getElementById('subscribeBtn');
const emailInput   = document.getElementById('emailInput');
const newsletterOk = document.getElementById('newsletterSuccess');
const heroParticles= document.getElementById('heroParticles');

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  renderProducts('all');
  initScrollReveal();
  initNavbar();
  initHamburger();
  initFilterTabs();
  initCartEvents();
  initCountdown();
  initNewsletter();
  initCategoryCards();
  spawnParticles();
  updateCartUI();
});

// ==================== NAVBAR ====================
/**
 * Add .scrolled class to navbar after 50px scroll
 */
function initNavbar() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ==================== HAMBURGER MENU ====================
function initHamburger() {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// ==================== PARTICLES ====================
/**
 * Spawn CSS animated particles in the hero section
 */
function spawnParticles() {
  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 8;
    p.style.cssText = `
      left: ${left}%;
      width: ${size}px;
      height: ${size}px;
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
    `;
    heroParticles.appendChild(p);
  }
}

// ==================== PRODUCT RENDERING ====================
/**
 * Renders star rating as HTML string
 * @param {number} rating - 1 to 5
 * @returns {string} HTML stars
 */
function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += i <= rating ? '★' : '☆';
  }
  return stars;
}

/**
 * Format price to Indian Rupee string
 * @param {number} price
 * @returns {string}
 */
function formatPrice(price) {
  return '₹' + price.toLocaleString('en-IN');
}

/**
 * Renders a single product card element
 * @param {Object} product
 * @returns {HTMLElement}
 */
function createProductCard(product) {
  const card = document.createElement('article');
  card.classList.add('product-card');
  card.setAttribute('data-id', product.id);
  card.setAttribute('data-category', product.category);
  card.setAttribute('aria-label', `${product.name} - ${formatPrice(product.price)}`);

  card.innerHTML = `
    <div class="product-img-wrap">
      <img
        src="${product.image}"
        alt="${product.name}"
        loading="lazy"
        onerror="this.src='https://images.unsplash.com/photo-1629654291663-b91ad427698f?w=500&q=80'"
      />
      <span class="product-cat-badge ${product.category}" aria-hidden="true">${product.badge}</span>
      <div class="product-overlay" aria-hidden="true">
        <button class="quick-add" data-id="${product.id}" aria-label="Quick add ${product.name} to cart">
          + Add to Cart
        </button>
      </div>
    </div>
    <div class="product-info">
      <h3 class="product-name">${product.name}</h3>
      <div class="product-rating" aria-label="${product.rating} out of 5 stars">
        <span>${renderStars(product.rating)}</span>
        <span class="product-rating-count">(${product.ratingCount})</span>
      </div>
      <div class="product-price-row">
        <span class="product-price">${formatPrice(product.price)}</span>
        <button class="add-to-cart" data-id="${product.id}" aria-label="Add ${product.name} to cart">
          Add +
        </button>
      </div>
    </div>
  `;

  return card;
}

/**
 * Renders products into the grid, filtered by category
 * @param {string} filter - 'all', 'gaming', or 'cars'
 */
function renderProducts(filter) {
  currentFilter = filter;
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

  productsGrid.innerHTML = '';

  filtered.forEach((product, index) => {
    const card = createProductCard(product);
    // Stagger reveal delay
    card.style.transitionDelay = `${index * 0.07}s`;
    productsGrid.appendChild(card);
  });

  // Re-observe new cards for scroll reveal
  observeProductCards();
}

// ==================== FILTER TABS ====================
function initFilterTabs() {
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');

      // Update active state
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      renderProducts(filter);
    });
  });
}

// ==================== CATEGORY CARDS ====================
/**
 * Category cards filter the shop section on click
 */
function initCategoryCards() {
  document.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const cat = card.getAttribute('data-cat');
      // Activate the corresponding filter tab
      filterTabs.forEach(tab => {
        const match = tab.getAttribute('data-filter') === cat;
        tab.classList.toggle('active', match);
        tab.setAttribute('aria-selected', match ? 'true' : 'false');
      });
      renderProducts(cat);
    });
  });
}

// ==================== INTERSECTION OBSERVER ====================
/**
 * Observe product cards and animate on scroll
 */
function observeProductCards() {
  const cards = productsGrid.querySelectorAll('.product-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  cards.forEach(card => observer.observe(card));
}

/**
 * Observe general reveal elements
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => revealObserver.observe(el));
}

// ==================== CART FUNCTIONS ====================
/**
 * Save cart to localStorage
 */
function saveCart() {
  try {
    localStorage.setItem('peakmale_cart', JSON.stringify(cart));
  } catch (e) {
    console.warn('Could not save cart:', e);
  }
}

/**
 * Load cart from localStorage
 */
function loadCart() {
  try {
    const saved = localStorage.getItem('peakmale_cart');
    if (saved) {
      cart = JSON.parse(saved);
    }
  } catch (e) {
    cart = [];
    console.warn('Could not load cart:', e);
  }
}

/**
 * Add a product to cart or increment quantity if already in cart
 * @param {number} productId
 */
function addToCart(productId) {
  const product = products.find(p => p.id === parseInt(productId));
  if (!product) return;

  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1
    });
  }

  saveCart();
  updateCartUI();
  showToast(`${product.name} added to cart ✓`);
  animateCartIcon();
}

/**
 * Remove a product from cart entirely
 * @param {number} productId
 */
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== parseInt(productId));
  saveCart();
  updateCartUI();
}

/**
 * Change quantity of a cart item
 * @param {number} productId
 * @param {number} delta - +1 or -1
 */
function changeQty(productId, delta) {
  const item = cart.find(i => i.id === parseInt(productId));
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  updateCartUI();
}

/**
 * Animate cart icon with bump effect
 */
function animateCartIcon() {
  cartBtn.classList.remove('bump');
  void cartBtn.offsetWidth; // Force reflow
  cartBtn.classList.add('bump');
}

/**
 * Get total number of items in cart
 */
function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

/**
 * Get cart subtotal
 */
function getCartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

/**
 * Re-render entire cart UI (badge + sidebar items + footer)
 */
function updateCartUI() {
  const count = getCartCount();
  const total = getCartTotal();

  // Update badge
  cartBadge.textContent = count;
  cartBadge.style.transform = count > 0 ? 'scale(1)' : 'scale(0.7)';

  // Update count text in header
  if (cartCountTxt) {
    cartCountTxt.textContent = `${count} item${count !== 1 ? 's' : ''}`;
  }

  // Render items
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add some bold gear to get started.</p>
      </div>
    `;
    cartFooter.innerHTML = '';
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img
          class="cart-item-img"
          src="${item.image}"
          alt="${item.name}"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1629654291663-b91ad427698f?w=100&q=80'"
        />
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${formatPrice(item.price)}</div>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn" data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity of ${item.name}">−</button>
          <span class="qty-value" aria-label="Quantity: ${item.qty}">${item.qty}</span>
          <button class="qty-btn" data-action="increase" data-id="${item.id}" aria-label="Increase quantity of ${item.name}">+</button>
        </div>
        <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove ${item.name} from cart">✕</button>
      </div>
    `).join('');

    cartFooter.innerHTML = `
      <div class="cart-subtotal">
        <span>Subtotal</span>
        <strong>${formatPrice(total)}</strong>
      </div>
      <p class="cart-note">Taxes &amp; shipping calculated at checkout</p>
      <button class="btn btn-primary cart-checkout-btn" id="checkoutBtn" aria-label="Proceed to checkout">
        Proceed to Checkout →
      </button>
      <button class="cart-continue-btn" id="continueShoppingBtn" aria-label="Continue shopping">
        Continue Shopping
      </button>
    `;

    // Attach checkout and continue shopping listeners
    document.getElementById('checkoutBtn')?.addEventListener('click', () => {
  showToast('🚀 Redirecting to checkout...');
  
  closeCart();

  setTimeout(() => {
    window.location.href = "checkout.html";
  }, 500);
});

    document.getElementById('continueShoppingBtn')?.addEventListener('click', closeCart);
  }
}

// ==================== CART EVENTS ====================
function initCartEvents() {
  // Open cart
  cartBtn.addEventListener('click', openCart);

  // Close cart
  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
  });

  // Delegate: Add to Cart (bottom button) + Quick Add (overlay)
  document.addEventListener('click', (e) => {
    // Add to cart / Quick add
    if (e.target.matches('.add-to-cart, .quick-add')) {
      const id = parseInt(e.target.getAttribute('data-id'));
      addToCart(id);
      return;
    }

    // Quantity controls
    if (e.target.matches('.qty-btn')) {
      const id = parseInt(e.target.getAttribute('data-id'));
      const action = e.target.getAttribute('data-action');
      changeQty(id, action === 'increase' ? 1 : -1);
      return;
    }

    // Remove item
    if (e.target.matches('.cart-item-remove')) {
      const id = parseInt(e.target.getAttribute('data-id'));
      removeFromCart(id);
      return;
    }
  });
}

function openCart() {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('open');
  cartSidebar.setAttribute('aria-hidden', 'false');
  cartOverlay.setAttribute('aria-hidden', 'false');
  cartBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('open');
  cartSidebar.setAttribute('aria-hidden', 'true');
  cartOverlay.setAttribute('aria-hidden', 'true');
  cartBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

// ==================== TOAST ====================
/**
 * Show a notification toast
 * @param {string} message
 * @param {number} duration - ms before auto-dismiss
 */
function showToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.setAttribute('role', 'status');
  toast.innerHTML = `<span class="toast-icon">✓</span><span>${message}</span>`;
  toastCont.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    toast.addEventListener('animationend', () => toast.remove());
  }, duration);
}

// ==================== COUNTDOWN TIMER ====================
function initCountdown() {
  // Set target 3 days from now, store in sessionStorage so it's consistent per session
  let target;
  try {
    const stored = sessionStorage.getItem('peakmale_countdown');
    if (stored) {
      target = parseInt(stored);
    } else {
      target = Date.now() + 3 * 24 * 60 * 60 * 1000;
      sessionStorage.setItem('peakmale_countdown', target);
    }
  } catch (e) {
    target = Date.now() + 3 * 24 * 60 * 60 * 1000;
  }

  function tick() {
    const now = Date.now();
    const remaining = target - now;

    if (remaining <= 0) {
      document.getElementById('countDays').textContent = '00';
      document.getElementById('countHours').textContent = '00';
      document.getElementById('countMins').textContent = '00';
      document.getElementById('countSecs').textContent = '00';
      return;
    }

    const days  = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const secs  = Math.floor((remaining % (1000 * 60)) / 1000);

    document.getElementById('countDays').textContent  = String(days).padStart(2, '0');
    document.getElementById('countHours').textContent = String(hours).padStart(2, '0');
    document.getElementById('countMins').textContent  = String(mins).padStart(2, '0');
    document.getElementById('countSecs').textContent  = String(secs).padStart(2, '0');
  }

  tick(); // Initial render
  setInterval(tick, 1000);
}

// ==================== NEWSLETTER ====================
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(event) {
    event.preventDefault();

    subscribeBtn.textContent = 'Sending...';

    emailjs.sendForm('default_service', 'template_e7qh9ac', this)
      .then(function() {
        subscribeBtn.textContent = 'SUBSCRIBED ✓';
        newsletterOk.hidden = false;
        emailInput.value = '';
      })
      .catch(function(error) {
        subscribeBtn.textContent = 'SUBSCRIBE';
        alert('Error: ' + JSON.stringify(error));
      });
  });
}

// ==================== SMOOTH ANCHOR SCROLL ====================
// Native smooth scroll handles it via CSS, but this catches hash links for older browsers
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
