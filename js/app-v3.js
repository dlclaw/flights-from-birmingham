/**
 * Flight Deals App - V3 (Live Prices)
 * Simple, fast, data-driven flight deals display
 */

const App = {
    init() {
        console.log('✈️ Flights from Birmingham - Loading...');
        this.renderDeals();
        this.updateTimestamp();
        this.initSearch();
    },
    
    renderDeals() {
        const container = document.getElementById('deals-container');
        if (!container) return;
        
        const deals = LIVE_DEALS.getDealsByPrice();
        
        container.innerHTML = deals.map(deal => this.createDealCard(deal)).join('');
        
        console.log(`✅ Loaded ${deals.length} live deals`);
    },
    
    createDealCard(deal) {
        const badgeClass = deal.type === 'hot-deal' ? 'badge-hot' : deal.type === 'great-deal' ? 'badge-great' : 'badge-regular';
        const badgeText = deal.type === 'hot-deal' ? '🔥 Hot Deal' : deal.type === 'great-deal' ? '✨ Great Deal' : '';
        const badge = badgeText ? `<span class="deal-badge ${badgeClass}">${badgeText}</span>` : '';
        
        return `
            <div class="deal-card" data-destination="${deal.destinationCode}">
                ${badge}
                <div class="deal-header">
                    <div class="destination-info">
                        <span class="flag">${deal.flag || '✈️'}</span>
                        <h3>${deal.destination}</h3>
                    </div>
                    <div class="price-info">
                        <div class="price">£${deal.price}</div>
                        <div class="price-label">return</div>
                    </div>
                </div>
                <div class="deal-details">
                    <div class="detail">
                        <span class="detail-icon">✈️</span>
                        <span>${deal.airline}</span>
                    </div>
                    <div class="detail">
                        <span class="detail-icon">⏱️</span>
                        <span>${deal.duration}</span>
                    </div>
                    <div class="detail">
                        <span class="detail-icon">🔄</span>
                        <span>${deal.stops === 0 ? 'Direct' : deal.stops + ' stop' + (deal.stops > 1 ? 's' : '')}</span>
                    </div>
                </div>
                <div class="deal-dates">
                    <span class="dates-icon">📅</span>
                    <span>${deal.dates}</span>
                </div>
                <a href="${deal.bookingUrl}" target="_blank" rel="noopener" class="btn-book">
                    View Deal →
                </a>
            </div>
        `;
    },
    
    updateTimestamp() {
        const timestampEl = document.getElementById('last-updated');
        if (!timestampEl) return;
        
        const info = LIVE_DEALS.getUpdateInfo();
        timestampEl.textContent = `Updated ${info.lastUpdated} (${info.hoursSince}h ago)`;
        
        // Add status indicator
        if (info.status === 'needs-update') {
            timestampEl.classList.add('outdated');
        }
    },
    
    initSearch() {
        const searchInput = document.getElementById('search-input');
        if (!searchInput) return;
        
        searchInput.addEventListener('input', (e) => {
            this.filterDeals(e.target.value);
        });
    },
    
    filterDeals(query) {
        const cards = document.querySelectorAll('.deal-card');
        const searchTerm = query.toLowerCase().trim();
        
        if (!searchTerm) {
            cards.forEach(card => card.style.display = 'block');
            return;
        }
        
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(searchTerm) ? 'block' : 'none';
        });
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}
