// Configuration
const CONFIG = {
    // Travelpayouts API Configuration
    // Get your API credentials at: https://www.travelpayouts.com/
    travelpayouts: {
        token: 'YOUR_API_TOKEN_HERE', // Replace with your Travelpayouts API token
        marker: 'YOUR_MARKER_HERE',   // Replace with your affiliate marker
        host: 'api.travelpayouts.com'
    },
    
    // Origin airport
    origin: {
        code: 'BHX',
        name: 'Birmingham',
        city: 'Birmingham'
    },
    
    // Popular destinations from Birmingham
    popularDestinations: [
        { code: 'AMS', name: 'Amsterdam', country: 'Netherlands', flag: '🇳🇱', slug: 'amsterdam' },
        { code: 'DXB', name: 'Dubai', country: 'UAE', flag: '🇦🇪', slug: 'dubai' },
        { code: 'DUB', name: 'Dublin', country: 'Ireland', flag: '🇮🇪', slug: 'dublin' },
        { code: 'CDG', name: 'Paris', country: 'France', flag: '🇫🇷', slug: 'paris' },
        { code: 'BCN', name: 'Barcelona', country: 'Spain', flag: '🇪🇸', slug: 'barcelona' },
        { code: 'AGP', name: 'Malaga', country: 'Spain', flag: '🇪🇸', slug: 'malaga' },
        { code: 'FAO', name: 'Faro', country: 'Portugal', flag: '🇵🇹', slug: 'faro' },
        { code: 'ALC', name: 'Alicante', country: 'Spain', flag: '🇪🇸', slug: 'alicante' },
        { code: 'TFS', name: 'Tenerife', country: 'Spain', flag: '🇪🇸', slug: 'tenerife' },
        { code: 'PMI', name: 'Palma', country: 'Spain', flag: '🇪🇸', slug: 'palma' },
        { code: 'BER', name: 'Berlin', country: 'Germany', flag: '🇩🇪', slug: 'berlin' },
        { code: 'PRG', name: 'Prague', country: 'Czech Republic', flag: '🇨🇿', slug: 'prague' }
    ],
    
    // Demo data for when API is not configured
    demoDeals: [
        {
            destination: 'Amsterdam',
            destinationCode: 'AMS',
            price: 45,
            currency: '£',
            dates: 'Mar 15 - Mar 22',
            airline: 'KLM'
        },
        {
            destination: 'Dublin',
            destinationCode: 'DUB',
            price: 32,
            currency: '£',
            dates: 'Apr 5 - Apr 12',
            airline: 'Ryanair'
        },
        {
            destination: 'Barcelona',
            destinationCode: 'BCN',
            price: 58,
            currency: '£',
            dates: 'May 10 - May 17',
            airline: 'Vueling'
        },
        {
            destination: 'Dubai',
            destinationCode: 'DXB',
            price: 385,
            currency: '£',
            dates: 'Jun 1 - Jun 14',
            airline: 'Emirates'
        }
    ],
    
    // Searchable airports (autocomplete)
    airports: [
        { code: 'AMS', name: 'Amsterdam', city: 'Amsterdam', country: 'Netherlands' },
        { code: 'CDG', name: 'Paris Charles de Gaulle', city: 'Paris', country: 'France' },
        { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'UAE' },
        { code: 'DUB', name: 'Dublin', city: 'Dublin', country: 'Ireland' },
        { code: 'BCN', name: 'Barcelona', city: 'Barcelona', country: 'Spain' },
        { code: 'MAD', name: 'Madrid', city: 'Madrid', country: 'Spain' },
        { code: 'AGP', name: 'Malaga', city: 'Malaga', country: 'Spain' },
        { code: 'FAO', name: 'Faro', city: 'Faro', country: 'Portugal' },
        { code: 'ALC', name: 'Alicante', city: 'Alicante', country: 'Spain' },
        { code: 'PMI', name: 'Palma de Mallorca', city: 'Palma', country: 'Spain' },
        { code: 'TFS', name: 'Tenerife South', city: 'Tenerife', country: 'Spain' },
        { code: 'BER', name: 'Berlin Brandenburg', city: 'Berlin', country: 'Germany' },
        { code: 'MUC', name: 'Munich', city: 'Munich', country: 'Germany' },
        { code: 'FRA', name: 'Frankfurt', city: 'Frankfurt', country: 'Germany' },
        { code: 'FCO', name: 'Rome Fiumicino', city: 'Rome', country: 'Italy' },
        { code: 'VCE', name: 'Venice Marco Polo', city: 'Venice', country: 'Italy' },
        { code: 'PRG', name: 'Prague', city: 'Prague', country: 'Czech Republic' },
        { code: 'VIE', name: 'Vienna', city: 'Vienna', country: 'Austria' },
        { code: 'ZRH', name: 'Zurich', city: 'Zurich', country: 'Switzerland' },
        { code: 'CPH', name: 'Copenhagen', city: 'Copenhagen', country: 'Denmark' },
        { code: 'ARN', name: 'Stockholm Arlanda', city: 'Stockholm', country: 'Sweden' },
        { code: 'OSL', name: 'Oslo', city: 'Oslo', country: 'Norway' },
        { code: 'HEL', name: 'Helsinki', city: 'Helsinki', country: 'Finland' },
        { code: 'IST', name: 'Istanbul', city: 'Istanbul', country: 'Turkey' },
        { code: 'ATH', name: 'Athens', city: 'Athens', country: 'Greece' },
        { code: 'LIS', name: 'Lisbon', city: 'Lisbon', country: 'Portugal' },
        { code: 'WAW', name: 'Warsaw', city: 'Warsaw', country: 'Poland' },
        { code: 'BUD', name: 'Budapest', city: 'Budapest', country: 'Hungary' },
        { code: 'JFK', name: 'New York JFK', city: 'New York', country: 'USA' },
        { code: 'LAX', name: 'Los Angeles', city: 'Los Angeles', country: 'USA' },
        { code: 'ORD', name: 'Chicago O\'Hare', city: 'Chicago', country: 'USA' },
        { code: 'MIA', name: 'Miami', city: 'Miami', country: 'USA' },
        { code: 'YYZ', name: 'Toronto Pearson', city: 'Toronto', country: 'Canada' }
    ]
};

// Check if API is configured
CONFIG.isConfigured = function() {
    return this.travelpayouts.token !== 'YOUR_API_TOKEN_HERE' && 
           this.travelpayouts.token.length > 0;
};
