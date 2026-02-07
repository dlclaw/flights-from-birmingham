/**
 * CONFIGURATION
 * 
 * This file contains all configuration for the Flights from Birmingham site.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Sign up for a Kiwi.com Tequila API key at: https://tequila.kiwi.com/
 * 2. Replace 'YOUR_API_KEY_HERE' with your actual API key
 * 3. (Optional) Set up Unsplash API for destination images
 * 
 * IMPORTANT: Never commit real API keys to public repositories!
 * Use environment variables or GitHub Secrets in production.
 */

const CONFIG = {
    // Kiwi.com Tequila API
    api: {
        // Get your API key from: https://tequila.kiwi.com/
        key: 'YOUR_API_KEY_HERE',
        baseUrl: 'https://api.tequila.kiwi.com',
        
        // Affiliate partner ID (optional - get from Kiwi.com affiliate program)
        affiliateId: 'flightsfrombirm',
        
        // API endpoints
        endpoints: {
            search: '/v2/search',
            locations: '/locations/query'
        }
    },
    
    // Unsplash API for destination images (optional)
    unsplash: {
        // Get your API key from: https://unsplash.com/developers
        accessKey: 'YOUR_UNSPLASH_KEY_HERE',
        enabled: false // Set to true when you have a key
    },
    
    // Default search parameters
    defaults: {
        origin: 'BHX', // Birmingham Airport
        currency: 'GBP',
        locale: 'en',
        
        // Search parameters
        maxStopovers: 2,
        adults: 1,
        limit: 30,
        
        // Date range for flexible searches (days from today)
        dateFrom: 7,
        dateTo: 180,
        
        // Price cache duration (milliseconds)
        cacheDuration: 2 * 60 * 60 * 1000 // 2 hours
    },
    
    // Popular destinations for quick access
    popularDestinations: [
        { code: 'DUB', city: 'Dublin', country: 'Ireland' },
        { code: 'AMS', city: 'Amsterdam', country: 'Netherlands' },
        { code: 'BCN', city: 'Barcelona', country: 'Spain' },
        { code: 'PMI', city: 'Palma', country: 'Spain' },
        { code: 'AGP', city: 'Málaga', country: 'Spain' },
        { code: 'FAO', city: 'Faro', country: 'Portugal' },
        { code: 'MAD', city: 'Madrid', country: 'Spain' },
        { code: 'CDG', city: 'Paris', country: 'France' },
        { code: 'PRG', city: 'Prague', country: 'Czech Republic' },
        { code: 'BUD', city: 'Budapest', country: 'Hungary' }
    ],
    
    // Deal thresholds for badges
    deals: {
        // Price per km to qualify as "Great Deal"
        greatDealThreshold: 0.05, // £0.05 per km
        // Price to qualify as "Hot Deal"
        hotDealThreshold: 50 // Under £50
    },
    
    // Feature flags
    features: {
        enableDestinationImages: true,
        enablePriceCache: true,
        enableAnalytics: false
    }
};

// Check if API key is configured
window.addEventListener('DOMContentLoaded', () => {
    if (CONFIG.api.key === 'YOUR_API_KEY_HERE') {
        console.warn('⚠️ API key not configured! Please update js/config.js');
        console.log('Get your free API key at: https://tequila.kiwi.com/');
    }
});
