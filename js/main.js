// Mobile menu
const menu = document.getElementById("mobile-menu");
const openBtn = document.getElementById("menu-toggle");
const closeBtn = document.getElementById("close-menu");

openBtn.addEventListener("click", () => {
  menu.style.right = "0";
});

closeBtn.addEventListener("click", () => {
  menu.style.right = "-100%";
});

// Navbar Active Class
const setActiveNav = () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll("nav a, #mobile-menu a").forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("text-indigo-600", "font-semibold");
    } else {
      link.classList.remove("text-indigo-600", "font-semibold");
    }
  });
};

// fetch category
const category = async () => {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const categories = await res.json();
  const container = document.getElementById("category-list");

  container.innerHTML = `
    <button class="category-btn bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer" data-category="all">
      All
    </button>
  `;
  categories.forEach((category) => {
    container.innerHTML += `
      <button 
        class="category-btn border border-indigo-600 px-4 py-2 rounded cursor-pointer"
        data-category="${category}">
        ${category}
      </button>
    `;
  });
  categoryEvents();
};

// filter category and added active class
const categoryEvents = () => {
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".category-btn").forEach((b) => {
        b.classList.remove("bg-indigo-600", "text-white");
        b.classList.add("border", "border-indigo-600");
      });

      e.target.classList.add("bg-indigo-600", "text-white");
      e.target.classList.remove("border", "border-indigo-600");

      const category = e.target.dataset.category;
      if (category === "all") {
        loadAllProducts();
      } else {
        loadProductsByCategory(category);
      }
    });
  });
};

// Load Products By category
const loadProductsByCategory = async (category) => {
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${category}`,
  );
  const products = await res.json();
  console.log(products, "all-products");
  renderProducts(products);
};

// Fetch all products
const loadAllProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  renderProducts(products);
};

// Show All Products
const renderProducts = (products) => {
  const container = document.getElementById("all-products");

  container.innerHTML = products
    .map(
      (product) => `
    <div class="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <!-- Image Area -->
      <div class="bg-gray-100 flex items-center justify-center p-6 h-56">
        <img src="${product.image}" class="h-full object-contain mix-blend-multiply"/>
      </div>

      <!-- Card Body -->
      <div class="p-4 flex flex-col gap-2 flex-1">
        <!-- Category + Rating -->
        <div class="flex items-center justify-between">
          <span class="text-xs text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full font-medium">
            ${product.category}
          </span>
          <span class="text-sm text-gray-600 flex items-center gap-1">
            <i class="fa-solid fa-star text-yellow-400 text-xs"></i>
            ${product.rating.rate} (${product.rating.count})
          </span>
        </div>

        <!-- Title -->
        <h3 class="text-sm font-semibold text-gray-800 truncate">${product.title}</h3>

        <!-- Price -->
        <p class="text-xl font-bold text-gray-900">$${product.price}</p>

        <!-- Buttons -->
        <div class="flex gap-2 mt-auto pt-2">
          <button class="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 text-sm py-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <i class="fa-regular fa-eye"></i> Details
          </button>
<button
  onclick="toggleCart(${product.id}, this)"
  class="flex-1 flex items-center justify-center gap-2 ${getCart().find((i) => i.id === product.id) ? "bg-red-500 hover:bg-red-600" : "bg-indigo-600 hover:bg-indigo-700"} text-white text-sm py-2 rounded-lg transition cursor-pointer">
  <i class="fa-solid fa-${getCart().find((i) => i.id === product.id) ? "trash" : "cart-shopping"}"></i>
  ${getCart().find((i) => i.id === product.id) ? "Remove" : "Add"}
</button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
};

// Trending Products by rating
const loadTrendingProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  const trending = products
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 4);

  const container = document.getElementById("top-products");

  container.innerHTML = trending
    .map(
      (product) => `
    <div class="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <!-- Image Area -->
      <div class="bg-gray-100 flex items-center justify-center p-6 h-56">
        <img src="${product.image}" class="h-full object-contain mix-blend-multiply"/>
      </div>

      <!-- Card Body -->
      <div class="p-4 flex flex-col gap-2 flex-1">
        <!-- Category + Rating -->
        <div class="flex items-center justify-between">
          <span class="text-xs text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full font-medium">
            ${product.category}
          </span>
          <span class="text-sm text-gray-600 flex items-center gap-1">
            <i class="fa-solid fa-star text-yellow-400 text-xs"></i>
            ${product.rating.rate} (${product.rating.count})
          </span>
        </div>

        <!-- Title -->
        <h3 class="text-sm font-semibold text-gray-800 truncate">${product.title}</h3>

        <!-- Price -->
        <p class="text-xl font-bold text-gray-900">$${product.price}</p>

        <!-- Buttons -->
        <div class="flex gap-2 mt-auto pt-2">
          <button class="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 text-sm py-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <i class="fa-regular fa-eye"></i> Details
          </button>
          <button
  onclick="toggleCart(${product.id}, this)"
  class="flex-1 flex items-center justify-center gap-2 ${getCart().find((i) => i.id === product.id) ? "bg-red-500 hover:bg-red-600" : "bg-indigo-600 hover:bg-indigo-700"} text-white text-sm py-2 rounded-lg transition cursor-pointer">
  <i class="fa-solid fa-${getCart().find((i) => i.id === product.id) ? "trash" : "cart-shopping"}"></i>
  ${getCart().find((i) => i.id === product.id) ? "Remove" : "Add"}
</button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
};

// Cart functions for localStorage
const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
const saveCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));

// Cart count update
const updateCartCount = () => {
  const total = getCart().reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = total;
};

const toggleCart = (id, btn) => {
  const cart = getCart();
  const existing = cart.find((item) => item.id === id);

  if (existing) {
    const updated = cart.filter((item) => item.id !== id);
    saveCart(updated);
    btn.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Add';
    btn.classList.remove("bg-red-500", "hover:bg-red-600");
    btn.classList.add("bg-indigo-600", "hover:bg-indigo-700");
  } else {
    cart.push({ id, quantity: 1 });
    saveCart(cart);
    btn.innerHTML = '<i class="fa-solid fa-trash"></i> Remove';
    btn.classList.remove("bg-indigo-600", "hover:bg-indigo-700");
    btn.classList.add("bg-red-500", "hover:bg-red-600");
  }

  updateCartCount();
};

document.addEventListener("DOMContentLoaded", async () => {
  setActiveNav();
  updateCartCount();
  if (document.getElementById("category-list")) {
    await category();
    await loadAllProducts();
  }

  if (document.getElementById("top-products")) {
    await loadTrendingProducts();
  }
  document.getElementById("spinner").style.display = "none";
});
