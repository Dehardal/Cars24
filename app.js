// Cars24 Visual Design System Web Application JS Engine

// State Management
const STATE = {
  activeView: 'home',
  searchQuery: '',
  selectedCategory: 'Hatchback',
  selectedFilters: {
    budget: null,
    fuel: null,
    trans: null,
    body: null,
    km: null,
  },
  activeEmi: '₹12,450',
  activeDetailCar: null,
};

// Cars Datastore
const CARS = [
  {
    id: 'swift-2021',
    title: '2021 Maruti Swift',
    variant: 'VXI',
    location: 'Bangalore',
    price: '₹6.45 Lakh',
    priceVal: 645000,
    emi: '₹12,450/mo',
    emiVal: 12450,
    km: '15,000 km',
    kmVal: 15000,
    fuel: 'Petrol',
    trans: 'Manual',
    owner: '1st Owner',
    certified: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5OB2Ngr4nztYzyHD3ULJfBnyFXwAWGteRupgorZGqBZLubcsWnknHrBZWv-Lma1-osmfQwJYk5HQCKJ_I6XecOjVwG8nBef4RO4CT9P2rzCqNiiulbFGwtJJhgcaBykvSJvNKC6IyR6bmOA9VczVzbQu6Gf-6HrEGBLEbAHVX5xWQOFkPN1gJu-hWkGNWyHeZat8iuc5F4OgJA2ROJnxffErWJz3mkbrmntE45cf3_lTivsW6ur27Hw',
    bodyType: 'Hatchback',
    imagesCount: 14
  },
  {
    id: 'creta-2020',
    title: '2020 Hyundai Creta',
    variant: 'SX',
    location: 'Bangalore',
    price: '₹12.80 Lakh',
    priceVal: 1280000,
    emi: '₹24,100/mo',
    emiVal: 24100,
    km: '32,000 km',
    kmVal: 32000,
    fuel: 'Diesel',
    trans: 'Automatic',
    owner: '1st Owner',
    certified: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHPcOUnkBx_4feZ37LbsoRkl36Pf-Jayac86JLpQ3e1-xxQLLwMdLVKfnMDeZLHsPn3FNWd8XFPQZXbCYuVQ7MhSXYw0HNTeJ6NX4On_A3xvMfVBZ1-TCfjph-qDdt_SIL8REGKvKMZxAPwRAfsVp5T53iXUS0O956NsdTdReBGhlOc0M7KAMXHwgYC1-EdqefiTTonj6ae-5bHUYuBh3ULD9GqoOTiVj5a5_wFn1TOIIAMSQ-yKeD9g',
    bodyType: 'SUV',
    imagesCount: 18
  },
  {
    id: 'swift-2019',
    title: '2019 Maruti Swift',
    variant: 'VXI',
    location: 'Bangalore',
    price: '₹5.25 Lakh',
    priceVal: 525000,
    emi: '₹12,450/mo',
    emiVal: 12450,
    km: '45,000 km',
    kmVal: 45000,
    fuel: 'Petrol',
    trans: 'Manual',
    owner: '1st Owner',
    certified: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnQ3vjz6AjCgstDroHpWA16V6tvyCjkjn9IgOROkOtny8E-DNGe-9dB4dZi18Jqs7ZV-MiulGDZR6bgRIFv_raoWCoy8aapPs-qvT9eDMdkA4sli2VmmXpzri7wK00CQKgE3jdFBBz-HbF7Ux0x68UhzpebpZLKt3UyJ7nfsB8wbRRfFZEEu90iCsBm_VyWaKxQXXyyQp5t0MpizNqJDyXXYeR99wVHuECTDoDF6FLLSQ3Gqa7EQePpg',
    bodyType: 'Hatchback',
    imagesCount: 12
  },
  {
    id: 'creta-2021',
    title: '2021 Hyundai Creta',
    variant: 'SX Opt Diesel AT',
    location: 'Bangalore',
    price: '₹15.80 Lakh',
    priceVal: 1580000,
    emi: '₹28,900/mo',
    emiVal: 28900,
    km: '28,500 km',
    kmVal: 28500,
    fuel: 'Diesel',
    trans: 'Automatic',
    owner: '1st Owner',
    certified: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRQMwCvMeiCdXHhXVoxl8Yj5NdekpM8YDXhXVY6HR_ahKvBbRJuBsf3oonCjZeqnIIwM5I-fUlwYb4mXhNu5FVBb6kM3ppcOWNQ6pJ3vxFItzik7zp8Ovxs4lIQMXM6iVWgEv6VIWrl1oAVIeGTXvAhD05RHRuQMJKANDhkg8cPV16OcLkd7GqGW2-vYQhST193xFOnXAScInKJs-v5CYAjU72z4w3VPnGunwLz5Si4Z6GlR-wi5smHw',
    bodyType: 'SUV',
    imagesCount: 20
  },
  {
    id: 'city-2018',
    title: '2018 Honda City',
    variant: 'V MT',
    location: 'Bangalore',
    price: '₹7.15 Lakh',
    priceVal: 715000,
    emi: '₹15,200/mo',
    emiVal: 15200,
    km: '52,000 km',
    kmVal: 52000,
    fuel: 'Petrol',
    trans: 'Manual',
    owner: '2nd Owner',
    certified: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR0WoNmg-LxlKeOq7PEXAr3p8FZyEi1zcz6Jti5-zJvn8ldpCCueiII6eHQdPq2w1XcSmxM6m6W6sO9rMIU9_c0dFNdXgX8-KShfHSjDhKa98KwUSPkORSdx1LwzyWw62_QY9qzk0kDzky9Pfjb1jeyoEFWdChU2RQSPZhdLjt6w3m2mXAg9qtt9v32KruLzYo3sC-rnnawbKGw1Pb-DJ_426oUliQHPJglkt7IAF6XkPLujmNm08umg',
    bodyType: 'Sedan',
    imagesCount: 8
  }
];

// Document Elements
const DOM = {
  views: document.querySelectorAll('.view'),
  navButtons: document.querySelectorAll('nav [data-view-btn]'),
  listingsContainer: document.getElementById('listings-container'),
  recommendedContainer: document.getElementById('recommended-container'),
  searchInput: document.getElementById('search-input'),
  searchListingsInput: document.getElementById('search-listings-input'),
  emiDisplay: document.getElementById('live-emi-display'),
  emiButtons: document.querySelectorAll('[data-emi-btn]'),
  sellOverlay: document.getElementById('sell-overlay'),
  sellTriggerButtons: document.querySelectorAll('[data-trigger-sell]'),
  sellCloseBtn: document.getElementById('sell-close'),
  carNumberInput: document.getElementById('carNumber'),
  getInstantPriceBtn: document.getElementById('get-instant-price'),
  carDetailModal: document.getElementById('car-detail-modal'),
  carDetailContent: document.getElementById('car-detail-content'),
  categoryButtons: document.querySelectorAll('[data-category]'),
};

// Router - Switch Views
function switchView(viewId) {
  if (viewId === 'sell') {
    openSellBottomSheet();
    return;
  }
  
  STATE.activeView = viewId;
  
  DOM.views.forEach(view => {
    if (view.id === `view-${viewId}`) {
      view.classList.add('active');
      view.scrollTop = 0;
    } else {
      view.classList.remove('active');
    }
  });

  // Update Bottom Nav Styling
  DOM.navButtons.forEach(btn => {
    const btnView = btn.getAttribute('data-view-btn');
    const label = btn.querySelector('span:last-child');
    const icon = btn.querySelector('.material-symbols-outlined');
    
    if (btnView === viewId) {
      btn.className = "flex flex-col items-center justify-center text-primary dark:text-primary-fixed-dim hover:opacity-80 active:scale-95 transition-transform cursor-pointer";
      if (icon) icon.style.fontVariationSettings = "'FILL' 1";
    } else {
      btn.className = "flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim hover:opacity-80 active:scale-95 transition-transform cursor-pointer";
      if (icon) icon.style.fontVariationSettings = "'FILL' 0";
    }
  });

  // Dynamic initialization per view
  if (viewId === 'listings') {
    renderListings();
  }
}

// EMI Selector Updater
function updateEMI(element, amount) {
  STATE.activeEmi = amount;
  if (DOM.emiDisplay) {
    DOM.emiDisplay.innerHTML = `${amount}<span class="font-body-sm text-body-sm font-normal">/mo</span>`;
  }
  
  DOM.emiButtons.forEach(btn => {
    if (btn === element) {
      btn.className = 'flex-1 py-1.5 rounded-lg border border-primary bg-primary/10 font-body-sm text-body-sm text-primary transition-colors';
    } else {
      btn.className = 'flex-1 py-1.5 rounded-lg border border-gray-300 bg-surface font-body-sm text-body-sm text-secondary transition-colors hover:bg-surface-container-low';
    }
  });
}

// Category Selection (Home screen pills)
function selectCategory(categoryName, element) {
  STATE.selectedCategory = categoryName;
  
  // Update styling
  DOM.categoryButtons.forEach(btn => {
    if (btn === element) {
      btn.className = 'px-4 py-2 rounded-full border border-primary bg-primary/10 font-body-sm text-body-sm text-primary font-medium whitespace-nowrap transition-colors';
    } else {
      btn.className = 'px-4 py-2 rounded-full border border-gray-300 bg-surface font-body-sm text-body-sm text-secondary whitespace-nowrap hover:bg-surface-container-low transition-colors';
    }
  });

  // Switch to listings view and apply body type filter
  STATE.selectedFilters.body = categoryName;
  switchView('listings');
  renderListings();
}

// Open/Close Bottom Sheet
function openSellBottomSheet() {
  DOM.sellOverlay.classList.add('active');
  setTimeout(() => {
    DOM.carNumberInput.focus();
  }, 100);
}

function closeSellBottomSheet() {
  DOM.sellOverlay.classList.remove('active');
  DOM.carNumberInput.value = '';
}

// Validate License Plate (Indian Format: AA 00 AA 0000)
function validateCarNumber(value) {
  const cleanVal = value.replace(/\s+/g, '').toUpperCase();
  // Standard Indian vehicle plate regex
  const regex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;
  return regex.test(cleanVal);
}

// Get Instant Price Form Logic
function handleGetInstantPrice() {
  const value = DOM.carNumberInput.value.trim();
  if (!value) {
    alert('Please enter your car registration number.');
    return;
  }
  
  if (!validateCarNumber(value)) {
    alert('Please enter a valid Indian registration number (e.g., KA 03 MS 1234).');
    return;
  }

  // Visual success feedback
  DOM.getInstantPriceBtn.innerHTML = `
    <span class="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
    Calculating Value...
  `;
  DOM.getInstantPriceBtn.disabled = true;

  setTimeout(() => {
    closeSellBottomSheet();
    alert(`Success! A custom valuation request has been submitted for vehicle registration "${value.toUpperCase()}". A Cars24 pricing specialist will contact you shortly.`);
    DOM.getInstantPriceBtn.innerHTML = `
      Get Instant Price
      <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 0;">arrow_forward</span>
    `;
    DOM.getInstantPriceBtn.disabled = false;
  }, 1500);
}

// Render Listings with Filters and Search
function renderListings() {
  if (!DOM.listingsContainer) return;
  
  const query = STATE.searchQuery.toLowerCase();
  const bodyFilter = STATE.selectedFilters.body;
  
  const filtered = CARS.filter(car => {
    const matchesSearch = car.title.toLowerCase().includes(query) || 
                          car.variant.toLowerCase().includes(query) ||
                          car.bodyType.toLowerCase().includes(query);
                          
    const matchesBody = !bodyFilter || car.bodyType === bodyFilter;
    
    return matchesSearch && matchesBody;
  });

  if (filtered.length === 0) {
    DOM.listingsContainer.innerHTML = `
      <div class="col-span-full py-8 text-center text-secondary">
        <span class="material-symbols-outlined text-[48px] opacity-40 mb-2">search_off</span>
        <p class="font-headline-sm">No cars match your search</p>
        <button class="mt-4 px-4 py-2 border border-primary text-primary rounded-lg text-body-sm font-semibold" onclick="clearFilters()">Clear Filters</button>
      </div>
    `;
    return;
  }

  DOM.listingsContainer.innerHTML = filtered.map(car => `
    <article class="bg-white rounded-2xl card-shadow overflow-hidden flex flex-col relative hover-scale cursor-pointer" onclick="openCarDetail('${car.id}')">
      <!-- Badges -->
      <div class="absolute top-3 left-3 z-10 flex gap-1">
        ${car.certified ? `
          <span class="bg-tertiary text-white px-2 py-1 rounded font-caption text-caption uppercase tracking-wider flex items-center gap-1">
            <span class="material-symbols-outlined text-[12px] font-bold" style="font-variation-settings: 'FILL' 1;">verified</span> Certified
          </span>
        ` : ''}
      </div>
      <!-- Image Area -->
      <div class="relative w-full h-48 bg-surface-container-low">
        <img alt="${car.title}" class="w-full h-full object-cover" src="${car.image}" />
        <div class="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded font-caption text-caption flex items-center gap-1">
          <span class="material-symbols-outlined text-[14px]">photo_library</span> ${car.imagesCount}
        </div>
      </div>
      <!-- Content Area -->
      <div class="p-4 flex flex-col gap-2">
        <!-- Title & Location -->
        <div>
          <h3 class="font-headline-sm text-on-surface line-clamp-1">${car.title}</h3>
          <p class="font-body-sm text-secondary">${car.variant} • ${car.location}</p>
        </div>
        <!-- Attributes -->
        <div class="flex gap-1 flex-wrap mt-1">
          <span class="bg-surface-container-low text-secondary px-2 py-1 rounded font-body-sm text-body-sm">${car.km}</span>
          <span class="bg-surface-container-low text-secondary px-2 py-1 rounded font-body-sm text-body-sm">${car.fuel}</span>
          <span class="bg-surface-container-low text-secondary px-2 py-1 rounded font-body-sm text-body-sm">${car.trans}</span>
          <span class="bg-surface-container-low text-secondary px-2 py-1 rounded font-body-sm text-body-sm">${car.owner}</span>
        </div>
        <!-- Price & Action -->
        <div class="flex justify-between items-end mt-2 pt-3 border-t border-surface-container">
          <div>
            <div class="font-display-price-mobile text-display-price-mobile text-secondary font-extrabold">${car.price}</div>
            <div class="font-body-sm text-body-sm text-secondary">EMI starts at ${car.emi}</div>
          </div>
          <button class="bg-primary hover:bg-primary-container text-white h-10 px-4 rounded-lg font-label-bold text-label-bold transition-colors">
            View Details
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

// Clear active body filters
function clearFilters() {
  STATE.selectedFilters.body = null;
  STATE.searchQuery = '';
  if (DOM.searchInput) DOM.searchInput.value = '';
  if (DOM.searchListingsInput) DOM.searchListingsInput.value = '';
  
  DOM.categoryButtons.forEach(btn => {
    btn.className = 'px-4 py-2 rounded-full border border-gray-300 bg-surface font-body-sm text-body-sm text-secondary whitespace-nowrap hover:bg-surface-container-low transition-colors';
  });
  renderListings();
}

// Open Detailed View Modal
function openCarDetail(carId) {
  const car = CARS.find(c => c.id === carId);
  if (!car) return;
  
  STATE.activeDetailCar = car;
  
  DOM.carDetailContent.innerHTML = `
    <!-- Large Car Image -->
    <div class="relative w-full h-64 bg-surface-container">
      <img src="${car.image}" alt="${car.title}" class="w-full h-full object-cover" />
      <button onclick="closeCarDetail()" class="absolute top-4 left-4 bg-black/60 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors">
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <div class="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full font-caption text-caption flex items-center gap-1">
        <span class="material-symbols-outlined text-[14px]">photo_library</span> 1 of ${car.imagesCount} Photos
      </div>
    </div>
    
    <div class="p-6 flex flex-col gap-6">
      <!-- Title & Price Block -->
      <div class="flex justify-between items-start">
        <div>
          <span class="bg-primary-container/10 text-primary px-2.5 py-1 rounded-full font-caption text-caption font-bold mb-2 inline-block">
            2026 Verification Passed
          </span>
          <h2 class="font-headline-lg text-on-surface">${car.title}</h2>
          <p class="font-body-md text-secondary mt-1">${car.variant} • ${car.location}</p>
        </div>
        <div class="text-right">
          <div class="font-display-price text-primary font-black">${car.price}</div>
          <p class="font-caption text-caption text-secondary">Ex-showroom Price</p>
        </div>
      </div>
      
      <!-- Quick Specs Grid -->
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-surface-container-low p-3.5 rounded-xl flex items-center gap-3">
          <span class="material-symbols-outlined text-primary text-[24px]">speed</span>
          <div>
            <div class="font-caption text-caption text-secondary">Kilometers</div>
            <div class="font-body-md text-body-md font-bold">${car.km}</div>
          </div>
        </div>
        <div class="bg-surface-container-low p-3.5 rounded-xl flex items-center gap-3">
          <span class="material-symbols-outlined text-primary text-[24px]">local_gas_station</span>
          <div>
            <div class="font-caption text-caption text-secondary">Fuel Type</div>
            <div class="font-body-md text-body-md font-bold">${car.fuel}</div>
          </div>
        </div>
        <div class="bg-surface-container-low p-3.5 rounded-xl flex items-center gap-3">
          <span class="material-symbols-outlined text-primary text-[24px]">settings_input_hdmi</span>
          <div>
            <div class="font-caption text-caption text-secondary">Transmission</div>
            <div class="font-body-md text-body-md font-bold">${car.trans}</div>
          </div>
        </div>
        <div class="bg-surface-container-low p-3.5 rounded-xl flex items-center gap-3">
          <span class="material-symbols-outlined text-primary text-[24px]">person</span>
          <div>
            <div class="font-caption text-caption text-secondary">Owner Type</div>
            <div class="font-body-md text-body-md font-bold">${car.owner}</div>
          </div>
        </div>
      </div>
      
      <!-- Certification & Trust Badges -->
      <div class="border border-tertiary/20 bg-tertiary/5 rounded-xl p-4 flex gap-4 items-start">
        <span class="material-symbols-outlined text-tertiary text-[28px] pulse-success bg-white rounded-full p-0.5">verified</span>
        <div>
          <h4 class="font-headline-sm text-tertiary text-[15px] font-bold">Cars24 Certified Vehicle</h4>
          <p class="font-body-sm text-secondary mt-1">Passed rigorous 140-point quality check. Covered under our 7-Day Hassle-free Return policy.</p>
        </div>
      </div>
      
      <!-- EMI Calculator Inside Details -->
      <div class="bg-white border border-surface-container-high rounded-xl p-4 shadow-level-1">
        <div class="flex justify-between items-center mb-3">
          <span class="font-body-md text-body-md font-bold">Estimated EMI Plan</span>
          <span class="font-body-lg text-body-lg font-black text-secondary">${car.emi}</span>
        </div>
        <p class="font-caption text-caption text-secondary mb-4">Calculated for 36 months tenure at 9.5% interest rate. Customize downpayment on call.</p>
        <button onclick="bookTestDrive()" class="w-full h-12 bg-primary hover:bg-primary-container text-white rounded-lg font-headline-sm text-headline-sm transition-colors shadow-[0px_4px_12px_rgba(239,95,60,0.2)]">
          Book Free Test Drive
        </button>
      </div>
    </div>
  `;
  
  DOM.carDetailModal.classList.add('active');
}

function closeCarDetail() {
  DOM.carDetailModal.classList.remove('active');
  STATE.activeDetailCar = null;
}

function bookTestDrive() {
  if (!STATE.activeDetailCar) return;
  alert(`Test Drive Booked! A confirmation SMS for booking your ${STATE.activeDetailCar.title} test drive in Bangalore has been sent. Thank you for choosing Cars24.`);
  closeCarDetail();
}

// Event Bindings
function init() {
  // Navigation Buttons click handlers
  DOM.navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view-btn');
      switchView(view);
    });
  });

  // Search input change handlers
  const handleSearch = (e) => {
    STATE.searchQuery = e.target.value;
    if (STATE.activeView !== 'listings') {
      switchView('listings');
    }
    // Sync both inputs
    if (DOM.searchInput) DOM.searchInput.value = STATE.searchQuery;
    if (DOM.searchListingsInput) DOM.searchListingsInput.value = STATE.searchQuery;
    renderListings();
  };

  if (DOM.searchInput) DOM.searchInput.addEventListener('input', handleSearch);
  if (DOM.searchListingsInput) DOM.searchListingsInput.addEventListener('input', handleSearch);

  // Bottom Sheet Sell click triggers
  DOM.sellTriggerButtons.forEach(btn => {
    btn.addEventListener('click', openSellBottomSheet);
  });
  
  if (DOM.sellCloseBtn) DOM.sellCloseBtn.addEventListener('click', closeSellBottomSheet);
  
  if (DOM.getInstantPriceBtn) {
    DOM.getInstantPriceBtn.addEventListener('click', handleGetInstantPrice);
  }

  // Keyboard shortcut to close sheet on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSellBottomSheet();
      closeCarDetail();
    }
  });

  // Render initial recommended rail on Home screen
  renderRecommended();
}

// Render recommended list on Home Screen
function renderRecommended() {
  if (!DOM.recommendedContainer) return;
  
  // Show first 2 cars
  const recs = CARS.slice(0, 2);
  DOM.recommendedContainer.innerHTML = recs.map(car => `
    <div class="w-[200px] bg-white rounded-xl shadow-level-1 flex flex-col overflow-hidden hover-scale cursor-pointer flex-shrink-0" onclick="openCarDetail('${car.id}')">
      <div class="h-[120px] relative bg-surface-container-low">
        <img class="object-cover w-full h-full" src="${car.image}" alt="${car.title}" />
        <div class="absolute top-2 left-2 bg-[#F1F3F7] text-secondary px-2 py-0.5 rounded font-caption text-caption">${car.fuel}</div>
      </div>
      <div class="p-3 flex flex-col gap-1">
        <h3 class="font-body-md text-body-md font-semibold text-on-surface line-clamp-1">${car.title}</h3>
        <div class="font-caption text-caption text-secondary flex gap-1 items-center">
          <span>${car.km}</span> • <span>${car.trans}</span>
        </div>
        <div class="mt-2">
          <div class="font-headline-md text-headline-md text-secondary font-bold">${car.price}</div>
          <div class="font-body-sm text-body-sm text-secondary">EMI starts at ${car.emi}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// SDUI Schema Object (Loaded dynamically or fallbacks to this inline block)
const SDUI_SCHEMA = {
  "screenId": "cars24_home",
  "schemaVersion": "1.0",
  "minAppVersion": 1,
  "state": {
    "selected_category": "hatchback",
    "tenure_months": 24
  },
  "sections": [
    {
      "id": "search_header",
      "type": "search_header",
      "minAppVersion": 1,
      "props": { "placeholder": "Search by brand, model or budget", "location": "Delhi" },
      "actions": { "onTap": { "type": "navigate", "target": "search_screen" } }
    },
    {
      "id": "hero_banner_carousel",
      "type": "carousel",
      "minAppVersion": 1,
      "props": {
        "autoScrollMs": 4000,
        "items": [
          { "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuC3Be6njH2Mp-7_rjingXEYQUGofpqTvQrst7xanUJKb2DAD5B-WioAK0nTgbwavSM3EjAH8gDaLwIgT_F0AARdIBJRo2yLUwhL8dNu8bov2-nnrPCWIxZ0ZC1gG60ic2Yy2UnPr3xNjNy13rLmWQdv515vBlamtMp0tQCm6NOgVBU4bVzwdwI0LphtRNnVjl0vmTvwJe6wQnDnfciBwACsjdZS4L3jUaVFA_RWAnp1LVyS4sX9ObWLbg",
            "actions": { "onTap": { "type": "navigate", "target": "offer_details", "params": { "offerId": "XYZ" } } } }
        ]
      }
    },
    {
      "id": "category_chips",
      "type": "chip_group",
      "minAppVersion": 1,
      "props": {
        "selectedId": "hatchback",
        "options": [ { "id": "hatchback", "label": "Hatchback" }, { "id": "suv", "label": "SUV" }, { "id": "sedan", "label": "Sedan" } ]
      },
      "actions": {
        "onSelect": { "type": "update_state", "stateKey": "selected_category", "then": { "type": "refetch_section", "sectionId": "car_rail" } }
      }
    },
    {
      "id": "car_rail",
      "type": "horizontal_rail",
      "minAppVersion": 1,
      "props": {
        "title": "Recommended for you",
        "itemType": "car_card",
        "items": [
          { "carId": "swift-2021", "title": "2021 Maruti Swift", "price": "₹6.45L", "km": "15,000 km", "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuD5OB2Ngr4nztYzyHD3ULJfBnyFXwAWGteRupgorZGqBZLubcsWnknHrBZWv-Lma1-osmfQwJYk5HQCKJ_I6XecOjVwG8nBef4RO4CT9P2rzCqNiiulbFGwtJJhgcaBykvSJvNKC6IyR6bmOA9VczVzbQu6Gf-6HrEGBLEbAHVX5xWQOFkPN1gJu-hWkGNWyHeZat8iuc5F4OgJA2ROJnxffErWJz3mkbrmntE45cf3_lTivsW6ur27Hw" },
          { "carId": "creta-2020", "title": "2020 Hyundai Creta", "price": "₹12.8L", "km": "32,000 km", "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuAHPcOUnkBx_4feZ37LbsoRkl36Pf-Jayac86JLpQ3e1-xxQLLwMdLVKfnMDeZLHsPn3FNWd8XFPQZXbCYuVQ7MhSXYw0HNTeJ6NX4On_A3xvMfVBZ1-TCfjph-qDdt_SIL8REGKvKMZxAPwRAfsVp5T53iXUS0O956NsdTdReBGhlOc0M7KAMXHwgYC1-EdqefiTTonj6ae-5bHUYuBh3ULD9GqoOTiVj5a5_wFn1TOIIAMSQ-yKeD9g" }
        ]
      },
      "actions": { "onItemTap": { "type": "navigate", "target": "car_details", "paramsFromItem": ["carId"] } }
    },
    {
      "id": "emi_calculator",
      "type": "tenure_selector",
      "minAppVersion": 1,
      "props": { "options": [12, 24, 36, 48], "selectedBind": "state.tenure_months", "displayBind": "computed.emi" },
      "actions": { "onSelect": { "type": "update_state", "stateKey": "tenure_months", "recompute": ["emi"] } },
      "computed": { "emi": { "formula": "principal_rate_tenure_amortization", "inputs": ["principal", "rate", "state.tenure_months"] } }
    },
    {
      "id": "value_prop_strip",
      "type": "icon_text_row",
      "minAppVersion": 1,
      "props": { "items": [ { "icon": "shield", "label": "140 point inspection" }, { "icon": "refresh", "label": "5 day money back" } ] }
    },
    {
      "id": "footer_cta",
      "type": "cta_banner",
      "minAppVersion": 1,
      "props": { "title": "Sell your car", "ctaLabel": "Get Price" },
      "actions": { "onTap": { "type": "open_sheet", "sheetId": "sell_car_sheet" } }
    }
  ],
  "fallback": { "unknownComponent": { "render": "skip_with_log" } }
};

// SDUI State Variables
STATE.sduiMode = false;
STATE.sduiState = JSON.parse(JSON.stringify(SDUI_SCHEMA.state));
let ORIGINAL_HOME_HTML = '';

// Toggle SDUI rendering
function toggleSduiMode(checkbox) {
  STATE.sduiMode = checkbox.checked;
  const homeView = document.getElementById('view-home');
  if (!homeView) return;

  if (STATE.sduiMode) {
    if (!ORIGINAL_HOME_HTML) {
      ORIGINAL_HOME_HTML = homeView.innerHTML;
    }
    renderSduiHome();
  } else {
    if (ORIGINAL_HOME_HTML) {
      homeView.innerHTML = ORIGINAL_HOME_HTML;
      reinitStaticHome();
    }
  }
}

// Render dynamic SDUI sections
function renderSduiHome() {
  const homeView = document.getElementById('view-home');
  if (!homeView) return;

  homeView.innerHTML = '';
  homeView.className = 'view active pt-2 px-4 gap-4 flex flex-col';

  SDUI_SCHEMA.sections.forEach(section => {
    const componentHtml = renderSduiSection(section);
    homeView.insertAdjacentHTML('beforeend', componentHtml);
  });
}

// Render individual SDUI component
function renderSduiSection(section) {
  switch (section.type) {
    case 'search_header':
      return `
        <div class="relative mt-2 cursor-pointer" onclick="handleSduiAction(${JSON.stringify(section.actions.onTap)})">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <div class="w-full bg-[#f8f9fb] border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-xs text-gray-400 select-none">
            ${section.props.placeholder} (Location: ${section.props.location})
          </div>
        </div>
      `;
      
    case 'carousel':
      return `
        <section class="w-full overflow-x-auto hide-scrollbar rounded-xl shadow-sm cursor-pointer" onclick="handleSduiAction(${JSON.stringify(section.props.items[0].actions.onTap)})">
          <div class="w-full h-32 rounded-xl relative overflow-hidden">
            <img class="object-cover w-full h-full absolute inset-0" src="${section.props.items[0].imageUrl}" alt="SDUI Carousel" />
            <div class="absolute inset-0 bg-gradient-to-r from-[#2D3E50]/95 to-transparent p-4 flex flex-col justify-center">
              <span class="text-sm font-bold text-white">SDUI Exchange Offer</span>
              <span class="text-xs text-white/80 mt-1">Tap to navigate: offer_details</span>
            </div>
          </div>
        </section>
      `;

    case 'chip_group':
      return `
        <section class="overflow-x-auto hide-scrollbar -mx-4 px-4 flex gap-2">
          ${section.props.options.map(opt => {
            const isSelected = STATE.sduiState.selected_category === opt.id;
            const btnClass = isSelected 
              ? 'px-4 py-2 rounded-full border border-primary bg-primary/10 font-body-sm text-body-sm text-primary font-medium whitespace-nowrap'
              : 'px-4 py-2 rounded-full border border-gray-300 bg-surface font-body-sm text-body-sm text-secondary whitespace-nowrap hover:bg-surface-container-low';
            
            const selectAction = {
              type: 'update_state',
              stateKey: 'selected_category',
              value: opt.id,
              then: section.actions.onSelect.then
            };
            
            return `
              <button class="${btnClass}" onclick="handleSduiAction(${JSON.stringify(selectAction)})">
                ${opt.label}
              </button>
            `;
          }).join('')}
        </section>
      `;

    case 'horizontal_rail':
      const category = STATE.sduiState.selected_category;
      const matchingCars = CARS.filter(c => c.bodyType.toLowerCase() === category.toLowerCase());
      
      return `
        <section>
          <div class="flex justify-between items-center mb-2.5">
            <h2 class="text-sm font-bold text-[#2D3E50]">${section.props.title}</h2>
            <span class="text-xs text-primary font-bold cursor-pointer" onclick="switchView('listings')">See All</span>
          </div>
          <div class="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            ${matchingCars.length > 0 ? matchingCars.map(car => `
              <div class="w-[200px] bg-white rounded-xl shadow-level-1 flex flex-col overflow-hidden hover-scale cursor-pointer flex-shrink-0" onclick="handleSduiAction({type: 'navigate', target: 'car_details', params: {carId: '${car.id}'}})">
                <div class="h-[120px] relative bg-surface-container-low">
                  <img class="object-cover w-full h-full" src="${car.image}" alt="${car.title}" />
                  <div class="absolute top-2 left-2 bg-[#F1F3F7] text-secondary px-2 py-0.5 rounded font-caption text-caption">${car.fuel}</div>
                </div>
                <div class="p-3 flex flex-col gap-1">
                  <h3 class="font-body-md text-body-md font-semibold text-on-surface line-clamp-1">${car.title}</h3>
                  <div class="font-caption text-caption text-secondary flex gap-1 items-center">
                    <span>${car.km}</span> • <span>${car.trans}</span>
                  </div>
                  <div class="mt-2">
                    <div class="font-headline-md text-headline-md text-secondary font-bold">${car.price}</div>
                    <div class="font-body-sm text-body-sm text-secondary">EMI starts at ${car.emi}</div>
                  </div>
                </div>
              </div>
            `).join('') : `
              <div class="w-full py-6 text-center text-xs text-gray-400 bg-surface-container-low rounded-xl">
                No matching ${category}s available.
              </div>
            `}
          </div>
        </section>
      `;

    case 'tenure_selector':
      const principal = 500000;
      const rate = 9.5 / 100 / 12;
      const tenure = STATE.sduiState.tenure_months;
      
      const emiAmount = Math.round((principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1));
      const formattedEmi = '₹' + emiAmount.toLocaleString('en-IN');
      
      return `
        <section class="bg-white p-4 rounded-xl shadow-level-1 border border-surface-container-high">
          <div class="flex justify-between items-end mb-3">
            <div>
              <span class="text-xs text-gray-500 font-bold uppercase tracking-wider">SDUI EMI Calculator</span>
              <div class="text-sm font-medium text-gray-800 mt-0.5">Calculated dynamically</div>
            </div>
            <span class="text-lg font-black text-secondary">${formattedEmi}<span class="text-xs font-normal text-gray-500">/mo</span></span>
          </div>
          <div class="flex justify-between gap-1.5">
            ${section.props.options.map(months => {
              const isSelected = STATE.sduiState.tenure_months === months;
              const btnClass = isSelected
                ? 'flex-1 py-1.5 rounded-lg border border-primary bg-primary/10 font-body-sm text-body-sm text-primary transition-colors'
                : 'flex-1 py-1.5 rounded-lg border border-gray-300 bg-surface font-body-sm text-body-sm text-secondary transition-colors hover:bg-surface-container-low';
              
              const action = {
                type: 'update_state',
                stateKey: 'tenure_months',
                value: months
              };
              
              return `
                <button class="${btnClass}" onclick="handleSduiAction(${JSON.stringify(action)})">
                  ${months}m
                </button>
              `;
            }).join('')}
          </div>
        </section>
      `;

    case 'icon_text_row':
      return `
        <section class="flex justify-around items-center py-3 px-2 bg-surface-container-low rounded-xl">
          ${section.props.items.map((item, idx) => `
            ${idx > 0 ? '<div class="w-px h-8 bg-gray-300"></div>' : ''}
            <div class="flex flex-col items-center gap-1 flex-1">
              <span class="material-symbols-outlined text-primary text-[20px]">${item.icon === 'shield' ? 'security' : 'replay'}</span>
              <span class="text-[10px] text-secondary font-semibold text-center leading-tight">${item.label.replace(' ', '<br/>')}</span>
            </div>
          `).join('')}
        </section>
      `;

    case 'cta_banner':
      return `
        <section class="bg-secondary text-white rounded-xl p-4 flex justify-between items-center relative overflow-hidden shadow-sm">
          <div class="absolute -right-8 -top-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div class="z-10">
            <h3 class="text-sm font-bold">${section.props.title}</h3>
            <p class="text-[11px] text-white/80 mt-0.5">SDUI Driven CTA</p>
          </div>
          <button class="z-10 bg-primary hover:bg-primary-container text-white px-4 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-md" onclick="handleSduiAction(${JSON.stringify(section.actions.onTap)})">
            ${section.props.ctaLabel}
          </button>
        </section>
      `;

    default:
      console.warn('Unknown component type:', section.type);
      return '';
  }
}

// Handle dynamic SDUI interactions
function handleSduiAction(action) {
  if (!action) return;
  
  switch (action.type) {
    case 'navigate':
      if (action.target === 'search_screen') {
        switchView('listings');
      } else if (action.target === 'offer_details') {
        alert(`Navigating to Offer details page. Offer ID: ${action.params?.offerId || 'N/A'}`);
      } else if (action.target === 'car_details') {
        const carId = action.params?.carId;
        if (carId) {
          openCarDetail(carId);
        }
      }
      break;
      
    case 'update_state':
      if (action.stateKey) {
        STATE.sduiState[action.stateKey] = action.value;
        renderSduiHome();
        if (action.then) {
          handleSduiAction(action.then);
        }
      }
      break;
      
    case 'refetch_section':
      console.log('Refetching SDUI section:', action.sectionId);
      break;
      
    case 'open_sheet':
      if (action.sheetId === 'sell_car_sheet') {
        openSellBottomSheet();
      }
      break;
      
    default:
      console.warn('Unhandled SDUI action:', action.type);
  }
}

// Re-init static view bindings on toggle off
function reinitStaticHome() {
  DOM.searchInput = document.getElementById('search-input');
  DOM.emiDisplay = document.getElementById('live-emi-display');
  DOM.emiButtons = document.querySelectorAll('[data-emi-btn]');
  DOM.categoryButtons = document.querySelectorAll('[data-category]');
  
  if (DOM.searchInput) {
    DOM.searchInput.addEventListener('input', (e) => {
      STATE.searchQuery = e.target.value;
      if (STATE.activeView !== 'listings') {
        switchView('listings');
      }
      if (DOM.searchListingsInput) DOM.searchListingsInput.value = STATE.searchQuery;
      renderListings();
    });
  }
  renderRecommended();
}

// Expose functions globally for element event attributes (e.g. inline onclick)
window.switchView = switchView;
window.updateEMI = updateEMI;
window.selectCategory = selectCategory;
window.clearFilters = clearFilters;
window.openCarDetail = openCarDetail;
window.closeCarDetail = closeCarDetail;
window.bookTestDrive = bookTestDrive;
window.toggleSduiMode = toggleSduiMode;
window.handleSduiAction = handleSduiAction;

// Initialize on load
document.addEventListener('DOMContentLoaded', init);

