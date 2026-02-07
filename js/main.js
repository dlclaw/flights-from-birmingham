// Main Application Logic
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

// Initialize the page
async function initializePage() {
    // Set default dates
    setDefaultDates();
    
    // Initialize search form
    initializeSearchForm();
    
    // Load popular routes
    await loadPopularRoutes();
    
    // Load deals
    await loadDeals();
    
    // Initialize destination autocomplete
    initializeAutocomplete();
    
    // Show API configuration notice if needed
    showAPINoticeIfNeeded();
}

// Set default dates (tomorrow and a week later)
function setDefaultDates() {
    const departureInput = document.getElementById('departure');
    const returnInput = document.getElementById('return');
    
    if (departureInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        departureInput.value = tomorrow.toISOString().split('T')[0];
        departureInput.min = tomorrow.toISOString().split('T')[0];
    }
    
    if (returnInput) {
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 8);
        returnInput.value = nextWeek.toISOString().split('T')[0];
        returnInput.min = new Date().toISOString().split('T')[0];
    }
}

// Initialize search form submission
function initializeSearchForm() {
    const form = document.getElementById('searchForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleSearch();
    });
}

// Handle search submission
function handleSearch() {
    const destinationInput = document.getElementById('destination');
    const departureInput = document.getElementById('departure');
    const returnInput = document.getElementById('return');
    
    const destination = destinationInput.value.trim();
    
    if (!destination) {
        alert('Please enter a destination');
        return;
    }
    
    // Try to find airport code
    const airports = API.searchAirports(destination);
    const destinationCode = airports.length > 0 ? airports[0].code : destination.toUpperCase();
    
    // Build search URL
    const searchUrl = API.buildSearchLink(
        CONFIG.origin.code,
        destinationCode,
        departureInput.value || null,
        returnInput.value || null
    );
    
    // Open in new tab
    window.open(searchUrl, '_blank');
}

// Load popular routes
async function loadPopularRoutes() {
    const container = document.getElementById('popularRoutes');
    if (!container) return;
    
    container.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading routes...</p></div>';
    
    try {
        const routes = await API.getPopularRoutes();
        
        if (routes.length === 0) {
            container.innerHTML = '<p class="text-center">No routes available</p>';
            return;
        }
        
        container.innerHTML = routes.map(route => `
            <a href="${route.link}" target="_blank" class="route-card">
                <span class="route-flag">${route.flag}</span>
                <h3 class="route-destination">${route.name}</h3>
                <p class="route-info">${route.country}</p>
                <div class="route-price">
                    <span class="price-label">from</span>
                    <span class="price-amount">£${route.priceFrom}</span>
                </div>
            </a>
        `).join('');
        
    } catch (error) {
        console.error('Error loading routes:', error);
        container.innerHTML = '<p class="text-center">Unable to load routes</p>';
    }
}

// Load deals
async function loadDeals() {
    const container = document.getElementById('dealsGrid');
    if (!container) return;
    
    container.innerHTML = '<div class="loading"><div class="spinner"></div><p>Finding best deals...</p></div>';
    
    try {
        const deals = await API.getCheapestFlights();
        
        if (deals.length === 0) {
            container.innerHTML = '<p class="text-center">No deals available</p>';
            return;
        }
        
        container.innerHTML = deals.slice(0, 6).map(deal => `
            <div class="deal-card">
                <div class="deal-badge">Hot Deal</div>
                <div class="deal-content">
                    <h3 class="deal-route">Birmingham → ${deal.destination}</h3>
                    <p class="deal-dates">${deal.dates}</p>
                    <div class="deal-price-row">
                        <div class="deal-price">${deal.currency}${deal.price}</div>
                        <a href="${deal.link}" target="_blank" class="btn btn-primary">Book Now</a>
                    </div>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading deals:', error);
        container.innerHTML = '<p class="text-center">Unable to load deals</p>';
    }
}

// Initialize destination autocomplete
function initializeAutocomplete() {
    const input = document.getElementById('destination');
    const suggestionsContainer = document.getElementById('destinationSuggestions');
    
    if (!input || !suggestionsContainer) return;
    
    let debounceTimer;
    
    input.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        
        const query = this.value.trim();
        
        if (query.length < 2) {
            suggestionsContainer.classList.remove('active');
            return;
        }
        
        debounceTimer = setTimeout(() => {
            showSuggestions(query);
        }, 200);
    });
    
    // Close suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!input.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.classList.remove('active');
        }
    });
}

// Show autocomplete suggestions
function showSuggestions(query) {
    const suggestionsContainer = document.getElementById('destinationSuggestions');
    const results = API.searchAirports(query);
    
    if (results.length === 0) {
        suggestionsContainer.classList.remove('active');
        return;
    }
    
    suggestionsContainer.innerHTML = results.map(airport => `
        <div class="suggestion-item" data-code="${airport.code}" data-name="${airport.city}">
            <span class="suggestion-code">${airport.code}</span>
            <span class="suggestion-name">${airport.city}, ${airport.country}</span>
        </div>
    `).join('');
    
    // Add click handlers
    suggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', function() {
            const input = document.getElementById('destination');
            input.value = this.dataset.name;
            input.dataset.code = this.dataset.code;
            suggestionsContainer.classList.remove('active');
        });
    });
    
    suggestionsContainer.classList.add('active');
}

// Show API configuration notice
function showAPINoticeIfNeeded() {
    if (!CONFIG.isConfigured()) {
        console.log('%c⚠️ API Not Configured', 'font-size: 16px; font-weight: bold; color: #f59e0b;');
        console.log('%cThis site is using demo data. To enable live flight data:', 'font-size: 14px;');
        console.log('%c1. Sign up at https://www.travelpayouts.com/', 'font-size: 12px;');
        console.log('%c2. Get your API token and marker', 'font-size: 12px;');
        console.log('%c3. Update js/config.js with your credentials', 'font-size: 12px;');
        console.log('%c4. Redeploy your site', 'font-size: 12px;');
        
        // Optional: Show banner on page (commented out by default)
        // showAPIBanner();
    }
}

// Show API configuration banner (optional)
function showAPIBanner() {
    const banner = document.createElement('div');
    banner.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #fef3c7;
        border: 2px solid #f59e0b;
        padding: 16px;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        max-width: 300px;
        z-index: 1000;
        font-size: 14px;
    `;
    
    banner.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 8px;">⚠️ Demo Mode</div>
        <div style="color: #78716c; margin-bottom: 12px;">
            Configure Travelpayouts API for live flight data.
        </div>
        <button onclick="this.parentElement.remove()" style="
            background: #f59e0b;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
        ">Got it</button>
    `;
    
    document.body.appendChild(banner);
    
    // Auto-hide after 10 seconds
    setTimeout(() => banner.remove(), 10000);
}

// Utility: Format currency
function formatCurrency(amount, currency = '£') {
    return `${currency}${Math.round(amount)}`;
}

// Utility: Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short',
        year: 'numeric'
    });
}
