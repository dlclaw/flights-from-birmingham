// Travelpayouts API Integration
const API = {
    
    // Build affiliate link for Travelpayouts
    buildSearchLink(origin, destination, departDate = null, returnDate = null) {
        const baseUrl = 'https://www.aviasales.com/search';
        const params = new URLSearchParams({
            origin: origin,
            destination: destination,
            marker: CONFIG.travelpayouts.marker
        });
        
        if (departDate) {
            params.append('depart_date', departDate);
        }
        if (returnDate) {
            params.append('return_date', returnDate);
        }
        
        return `${baseUrl}?${params.toString()}`;
    },
    
    // Build direct booking link with affiliate tracking
    buildDirectLink(destination) {
        return this.buildSearchLink(CONFIG.origin.code, destination);
    },
    
    // Fetch cheapest flights (cached or demo data)
    async getCheapestFlights() {
        if (!CONFIG.isConfigured()) {
            console.log('Using demo data - API not configured');
            return this.getDemoData();
        }
        
        try {
            // Travelpayouts API endpoint for cheapest prices
            const url = `https://${CONFIG.travelpayouts.host}/v2/prices/latest`;
            const params = new URLSearchParams({
                origin: CONFIG.origin.code,
                currency: 'GBP',
                token: CONFIG.travelpayouts.token,
                period_type: 'year',
                limit: 30
            });
            
            const response = await fetch(`${url}?${params.toString()}`);
            
            if (!response.ok) {
                throw new Error('API request failed');
            }
            
            const data = await response.json();
            return this.formatFlightData(data.data || []);
            
        } catch (error) {
            console.error('API Error:', error);
            console.log('Falling back to demo data');
            return this.getDemoData();
        }
    },
    
    // Format API response data
    formatFlightData(flights) {
        return flights.map(flight => {
            const destination = this.getDestinationInfo(flight.destination);
            return {
                destination: destination.name,
                destinationCode: flight.destination,
                price: Math.round(flight.value),
                currency: '£',
                dates: this.formatDates(flight.depart_date, flight.return_date),
                airline: flight.airline || 'Various airlines',
                link: this.buildSearchLink(
                    CONFIG.origin.code, 
                    flight.destination,
                    flight.depart_date,
                    flight.return_date
                )
            };
        }).slice(0, 12);
    },
    
    // Get destination information
    getDestinationInfo(code) {
        const dest = CONFIG.popularDestinations.find(d => d.code === code) ||
                     CONFIG.airports.find(a => a.code === code);
        return dest || { name: code, country: '', flag: '✈️' };
    },
    
    // Format dates for display
    formatDates(departDate, returnDate) {
        if (!departDate) return 'Flexible dates';
        
        const options = { month: 'short', day: 'numeric' };
        const depart = new Date(departDate).toLocaleDateString('en-GB', options);
        
        if (returnDate) {
            const ret = new Date(returnDate).toLocaleDateString('en-GB', options);
            return `${depart} - ${ret}`;
        }
        
        return `From ${depart}`;
    },
    
    // Get demo data when API is not configured
    getDemoData() {
        return CONFIG.demoDeals.map(deal => ({
            ...deal,
            link: this.buildDirectLink(deal.destinationCode)
        }));
    },
    
    // Get popular routes with estimated prices
    async getPopularRoutes() {
        const routes = CONFIG.popularDestinations.map(dest => {
            // Estimate prices based on distance (rough approximation)
            const priceRanges = {
                'AMS': { min: 45, max: 120 },
                'DUB': { min: 30, max: 85 },
                'CDG': { min: 50, max: 130 },
                'BCN': { min: 55, max: 150 },
                'DXB': { min: 350, max: 650 },
                'AGP': { min: 60, max: 140 },
                'FAO': { min: 55, max: 130 },
                'ALC': { min: 50, max: 135 },
                'TFS': { min: 70, max: 180 },
                'PMI': { min: 55, max: 145 },
                'BER': { min: 60, max: 140 },
                'PRG': { min: 50, max: 125 }
            };
            
            const range = priceRanges[dest.code] || { min: 50, max: 200 };
            
            return {
                ...dest,
                priceFrom: range.min,
                link: this.buildDirectLink(dest.code)
            };
        });
        
        return routes;
    },
    
    // Search airports for autocomplete
    searchAirports(query) {
        if (!query || query.length < 2) return [];
        
        const searchTerm = query.toLowerCase();
        return CONFIG.airports.filter(airport => 
            airport.name.toLowerCase().includes(searchTerm) ||
            airport.city.toLowerCase().includes(searchTerm) ||
            airport.code.toLowerCase().includes(searchTerm) ||
            airport.country.toLowerCase().includes(searchTerm)
        ).slice(0, 8);
    }
};
