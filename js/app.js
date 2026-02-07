/**
 * FLIGHTS FROM BIRMINGHAM - MAIN APPLICATION
 * Deal discovery hub with live flight prices
 */

// ==========================================
// STATE MANAGEMENT
// ==========================================
const state = {
    deals: [],
    filteredDeals: [],
    destinations: [],
    loading: false,
    lastUpdate: null,
    cache: new Map()
};

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Format date for API (YYYY-MM-DD)
 */
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

/**
 * Calculate days from now
 */
function addDays(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
}

/**
 * Format price
 */
function formatPrice(price, currency = 'GBP') {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

/**
 * Calculate distance between two points (rough approximation)
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

/**
 * Get relative time string
 */
function getRelativeTime(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
}

/**
 * Determine if price is a great deal
 */
function isGreatDeal(price, distance) {
    if (!distance) return false;
    const pricePerKm = price / distance;
    return pricePerKm < CONFIG.deals.greatDealThreshold;
}

/**
 * Get destination image URL (placeholder or Unsplash)
 */
function getDestinationImage(cityName) {
    if (CONFIG.unsplash.enabled && CONFIG.unsplash.accessKey !== 'YOUR_UNSPLASH_KEY_HERE') {
        return `https://source.unsplash.com/800x400/?${encodeURIComponent(cityName)},travel`;
    }
    // Gradient placeholder
    const hue = Math.abs(hashCode(cityName)) % 360;
    return `data:image/svg+xml,${encodeURIComponent(`
        <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:hsl(${hue}, 70%, 60%);stop-opacity:1" />
                    <stop offset="100%" style="stop-color:hsl(${(hue + 60) % 360}, 70%, 50%);stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="800" height="400" fill="url(#grad)"/>
            <text x="50%" y="50%" text-anchor="middle" fill="white" font-size="48" font-weight="bold" font-family="Arial">${cityName}</text>
        </svg>
    `)}`;
}

function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

// ==========================================
// API FUNCTIONS
// ==========================================

/**
 * Make API request to Kiwi.com
 */
async function makeApiRequest(endpoint, params = {}) {
    const url = new URL(`${CONFIG.api.baseUrl}${endpoint}`);
    Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
            url.searchParams.append(key, params[key]);
        }
    });
    
    try {
        const response = await fetch(url.toString(), {
            headers: {
                'apikey': CONFIG.api.key
            }
        });
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

/**
 * Search for flights from Birmingham to anywhere
 */
async function searchFlights(destination = null, dates = null) {
    const params = {
        fly_from: CONFIG.defaults.origin,
        fly_to: destination || 'anywhere',
        date_from: dates?.from || formatDate(addDays(CONFIG.defaults.dateFrom)),
        date_to: dates?.to || formatDate(addDays(CONFIG.defaults.dateTo)),
        return_from: dates?.returnFrom || formatDate(addDays(CONFIG.defaults.dateFrom + 3)),
        return_to: dates?.returnTo || formatDate(addDays(CONFIG.defaults.dateTo)),
        flight_type: 'round',
        adults: CONFIG.defaults.adults,
        max_stopovers: CONFIG.defaults.maxStopovers,
        curr: CONFIG.defaults.currency,
        locale: CONFIG.defaults.locale,
        limit: CONFIG.defaults.limit,
        sort: 'price',
        partner: CONFIG.api.affiliateId
    };
    
    const data = await makeApiRequest(CONFIG.api.endpoints.search, params);
    return data.data || [];
}

/**
 * Search for destination by name
 */
async function searchDestinations(query) {
    if (query.length < 2) return [];
    
    const params = {
        term: query,
        locale: CONFIG.defaults.locale,
        location_types: 'city',
        limit: 10
    };
    
    const data = await makeApiRequest(CONFIG.api.endpoints.locations, params);
    return data.locations || [];
}

// ==========================================
// UI FUNCTIONS
// ==========================================

/**
 * Create deal card HTML
 */
function createDealCard(deal) {
    const cityTo = deal.cityTo || 'Unknown';
    const countryTo = deal.countryTo?.name || '';
    const price = deal.price || 0;
    const currency = deal.conversion?.GBP ? 'GBP' : (deal.currency || 'EUR');
    const finalPrice = deal.conversion?.GBP || price;
    
    // Calculate deal quality
    const distance = deal.distance || 0;
    const isHotDeal = finalPrice < CONFIG.deals.hotDealThreshold;
    const isGoodDeal = distance > 0 && isGreatDeal(finalPrice, distance);
    
    // Format dates
    const departDate = new Date(deal.route?.[0]?.local_departure || deal.dTime).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short'
    });
    const returnDate = new Date(deal.route?.[deal.route.length - 1]?.local_arrival || deal.aTime).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short'
    });
    
    // Calculate duration
    const durationHours = Math.floor(deal.duration?.total || 0 / 3600);
    const durationText = durationHours > 24 ? `${Math.floor(durationHours / 24)}d` : `${durationHours}h`;
    
    // Stops
    const stops = (deal.route?.length || 2) - 1;
    const stopsText = stops === 0 ? 'Direct' : stops === 1 ? '1 stop' : `${stops} stops`;
    
    // Airlines
    const airlines = [...new Set(deal.route?.map(r => r.airline) || [deal.airlines?.[0]])].join(', ');
    
    // Deep link with affiliate tracking
    const bookingLink = deal.deep_link || `https://www.kiwi.com/deep?affilid=${CONFIG.api.affiliateId}&from=${CONFIG.defaults.origin}&to=${deal.flyTo}`;
    
    // Badge
    let badge = '';
    if (isHotDeal) {
        badge = '<span class="deal-badge hot">🔥 Hot Deal</span>';
    } else if (isGoodDeal) {
        badge = '<span class="deal-badge">✨ Great Value</span>';
    }
    
    return `
        <div class="deal-card" data-price="${finalPrice}" data-distance="${distance}" data-duration="${deal.duration?.total || 0}">
            <img src="${getDestinationImage(cityTo)}" alt="${cityTo}" class="deal-image" loading="lazy">
            <div class="deal-content">
                ${badge}
                <div class="deal-header">
                    <div class="deal-destination">
                        <div class="deal-city">${cityTo}</div>
                        <div class="deal-country">${countryTo}</div>
                    </div>
                    <div class="deal-price">
                        <div class="deal-price-label">from</div>
                        <div class="deal-price-amount">
                            <span class="deal-price-currency">£</span>${Math.round(finalPrice)}
                        </div>
                    </div>
                </div>
                <div class="deal-details">
                    <div class="deal-detail">
                        <div class="deal-detail-label">Dates</div>
                        <div class="deal-detail-value">${departDate} - ${returnDate}</div>
                    </div>
                    <div class="deal-detail">
                        <div class="deal-detail-label">Duration</div>
                        <div class="deal-detail-value">${durationText}</div>
                    </div>
                    <div class="deal-detail">
                        <div class="deal-detail-label">Stops</div>
                        <div class="deal-detail-value">${stopsText}</div>
                    </div>
                </div>
                <div class="deal-footer">
                    <div class="deal-airline">${airlines}</div>
                    <a href="${bookingLink}" target="_blank" rel="noopener" class="deal-cta">
                        View Deal →
                    </a>
                </div>
            </div>
        </div>
    `;
}

/**
 * Render deals to the grid
 */
function renderDeals(deals) {
    const grid = document.getElementById('dealsGrid');
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');
    
    loadingState.style.display = 'none';
    errorState.style.display = 'none';
    
    if (!deals || deals.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #6b7280;">No deals found. Try adjusting your search.</p>';
        return;
    }
    
    grid.innerHTML = deals.map(deal => createDealCard(deal)).join('');
    
    // Update count
    document.getElementById('dealsCount').textContent = `${deals.length} amazing deals`;
}

/**
 * Show loading state
 */
function showLoading() {
    document.getElementById('loadingState').style.display = 'block';
    document.getElementById('dealsGrid').innerHTML = '';
    document.getElementById('errorState').style.display = 'none';
}

/**
 * Show error state
 */
function showError(message) {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('dealsGrid').innerHTML = '';
    document.getElementById('errorState').style.display = 'block';
    document.getElementById('errorMessage').textContent = message;
}

/**
 * Filter and sort deals
 */
function filterAndSortDeals() {
    const sortBy = document.getElementById('sortBy').value;
    const filterRegion = document.getElementById('filterRegion').value;
    
    let filtered = [...state.deals];
    
    // Filter by region
    if (filterRegion === 'europe') {
        filtered = filtered.filter(deal => (deal.distance || 0) < 3000);
    } else if (filterRegion === 'longhaul') {
        filtered = filtered.filter(deal => (deal.distance || 0) >= 3000);
    }
    
    // Sort
    filtered.sort((a, b) => {
        if (sortBy === 'price') {
            return (a.conversion?.GBP || a.price) - (b.conversion?.GBP || b.price);
        } else if (sortBy === 'distance') {
            return (a.distance || 0) - (b.distance || 0);
        } else if (sortBy === 'duration') {
            return (a.duration?.total || 0) - (b.duration?.total || 0);
        }
        return 0;
    });
    
    state.filteredDeals = filtered;
    renderDeals(filtered);
}

// ==========================================
// INITIALIZATION
// ==========================================

/**
 * Load initial deals
 */
async function loadDeals() {
    showLoading();
    
    try {
        const deals = await searchFlights();
        state.deals = deals;
        state.filteredDeals = deals;
        state.lastUpdate = Date.now();
        
        filterAndSortDeals();
        
        // Update timestamp
        document.getElementById('updateTime').textContent = 'just now';
        
        // Set up auto-refresh of timestamp
        setInterval(() => {
            if (state.lastUpdate) {
                document.getElementById('updateTime').textContent = getRelativeTime(state.lastUpdate);
            }
        }, 60000); // Update every minute
        
    } catch (error) {
        console.error('Failed to load deals:', error);
        showError('Could not load deals. Please check your API configuration in js/config.js');
    }
}

/**
 * Set up destination autocomplete
 */
function setupDestinationAutocomplete() {
    const input = document.getElementById('destination');
    const suggestions = document.getElementById('destinationSuggestions');
    let timeout;
    
    input.addEventListener('input', (e) => {
        clearTimeout(timeout);
        const query = e.target.value.trim();
        
        if (query.length < 2) {
            suggestions.classList.remove('active');
            return;
        }
        
        timeout = setTimeout(async () => {
            try {
                const results = await searchDestinations(query);
                
                if (results.length > 0) {
                    suggestions.innerHTML = results.map(loc => `
                        <div class="suggestion-item" data-code="${loc.code}" data-city="${loc.name}">
                            <div class="suggestion-city">${loc.name}</div>
                            <div class="suggestion-country">${loc.country?.name || ''}</div>
                        </div>
                    `).join('');
                    suggestions.classList.add('active');
                } else {
                    suggestions.classList.remove('active');
                }
            } catch (error) {
                console.error('Destination search failed:', error);
            }
        }, 300);
    });
    
    // Handle suggestion selection
    suggestions.addEventListener('click', (e) => {
        const item = e.target.closest('.suggestion-item');
        if (item) {
            input.value = item.dataset.city;
            input.dataset.code = item.dataset.code;
            suggestions.classList.remove('active');
        }
    });
    
    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !suggestions.contains(e.target)) {
            suggestions.classList.remove('active');
        }
    });
}

/**
 * Set up search functionality
 */
function setupSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const dateMode = document.getElementById('dateMode');
    const dateInputs = document.getElementById('dateInputs');
    
    // Toggle date inputs
    dateMode.addEventListener('change', () => {
        if (dateMode.value === 'specific') {
            dateInputs.style.display = 'grid';
            // Set default dates
            const departDate = document.getElementById('departDate');
            const returnDate = document.getElementById('returnDate');
            departDate.value = formatDate(addDays(14));
            returnDate.value = formatDate(addDays(21));
        } else {
            dateInputs.style.display = 'none';
        }
    });
    
    // Handle search
    searchBtn.addEventListener('click', async () => {
        const destination = document.getElementById('destination').dataset.code || null;
        const dateMode = document.getElementById('dateMode').value;
        
        let dates = null;
        if (dateMode === 'specific') {
            const departDate = document.getElementById('departDate').value;
            const returnDate = document.getElementById('returnDate').value;
            
            if (departDate && returnDate) {
                dates = {
                    from: departDate,
                    to: departDate,
                    returnFrom: returnDate,
                    returnTo: returnDate
                };
            }
        }
        
        showLoading();
        
        try {
            const deals = await searchFlights(destination, dates);
            state.deals = deals;
            state.lastUpdate = Date.now();
            filterAndSortDeals();
        } catch (error) {
            console.error('Search failed:', error);
            showError('Search failed. Please try again.');
        }
    });
    
    // Popular destination chips
    document.querySelectorAll('.popular-chip').forEach(chip => {
        chip.addEventListener('click', async () => {
            const destination = chip.dataset.destination;
            
            showLoading();
            
            try {
                const deals = await searchFlights(destination);
                state.deals = deals;
                state.lastUpdate = Date.now();
                filterAndSortDeals();
                
                // Scroll to deals
                document.getElementById('deals').scrollIntoView({ behavior: 'smooth' });
            } catch (error) {
                console.error('Search failed:', error);
                showError('Search failed. Please try again.');
            }
        });
    });
}

/**
 * Set up filters
 */
function setupFilters() {
    document.getElementById('sortBy').addEventListener('change', filterAndSortDeals);
    document.getElementById('filterRegion').addEventListener('change', filterAndSortDeals);
}

/**
 * Initialize app
 */
document.addEventListener('DOMContentLoaded', () => {
    // Check API key
    if (CONFIG.api.key === 'YOUR_API_KEY_HERE') {
        showError('API key not configured. Please update js/config.js with your Kiwi.com API key. Get one free at: https://tequila.kiwi.com/');
        return;
    }
    
    // Set up all functionality
    setupDestinationAutocomplete();
    setupSearch();
    setupFilters();
    
    // Load initial deals
    loadDeals();
});
