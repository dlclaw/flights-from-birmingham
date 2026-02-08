/**
 * LIVE FLIGHT DEALS - UPDATED WITH PROPER AFFILIATE LINKS
 * 
 * 🚨 IMPORTANT: This file replaces the old Google Flights links with proper affiliate links
 * 
 * Real prices sourced from Google Flights and verified manually.
 * Last updated: 2026-02-08
 * 
 * ✅ NOW USING: Skyscanner affiliate links (EARNS MONEY!)
 * ❌ OLD: Google Flights links (EARNED £0)
 * 
 * TO USE:
 * 1. Sign up for Skyscanner affiliate program: partners.skyscanner.net
 * 2. Get your affiliate ID
 * 3. Open js/affiliate-config.js
 * 4. Replace 'REPLACE_WITH_YOUR_SKYSCANNER_ID' with your actual ID
 * 5. This file will automatically use your ID for all links
 * 
 * Prices are in GBP, converted from EUR at current rates.
 */

// Import affiliate config (make sure to load affiliate-config.js before this file)
const AFFILIATE_ID = typeof AFFILIATE_CONFIG !== 'undefined' ? 
    AFFILIATE_CONFIG.skyscanner.affiliateId : 
    'YOUR_SKYSCANNER_ID_HERE'; // Fallback

const LIVE_DEALS_UPDATED = {
    lastUpdated: '2026-02-08T20:30:00Z',
    source: 'Google Flights + Manual Verification',
    origin: 'BHX',
    currency: 'GBP',
    affiliateNote: 'All links now use Skyscanner affiliate program for proper monetization',
    
    deals: [
        // European Short-Haul (verified 2026-02-07)
        {
            destination: 'Dublin',
            destinationCode: 'DUB',
            country: 'Ireland',
            flag: '🇮🇪',
            price: 33,
            originalPrice: 39,
            originalCurrency: 'EUR',
            airline: 'Ryanair',
            duration: '1h 5m',
            stops: 0,
            dates: 'Feb 16-23',
            // OLD (BROKEN): Google Flights link
            // NEW (WORKING): Skyscanner affiliate link
            bookingUrl: `https://www.skyscanner.net/transport/flights/bhx/dub/?adultsv2=1&cabinclass=economy&ref=${AFFILIATE_ID}`,
            type: 'hot-deal'
        },
        {
            destination: 'Barcelona',
            destinationCode: 'BCN',
            country: 'Spain',
            flag: '🇪🇸',
            price: 35,
            originalPrice: 41,
            originalCurrency: 'EUR',
            airline: 'Ryanair',
            duration: '2h 30m',
            stops: 0,
            dates: 'Feb 23-Mar 4',
            bookingUrl: `https://www.skyscanner.net/transport/flights/bhx/bcn/?adultsv2=1&cabinclass=economy&ref=${AFFILIATE_ID}`,
            type: 'hot-deal'
        },
        {
            destination: 'Milan',
            destinationCode: 'MIL',
            country: 'Italy',
            flag: '🇮🇹',
            price: 34,
            originalPrice: 40,
            originalCurrency: 'EUR',
            airline: 'Ryanair',
            duration: '2h 5m',
            stops: 0,
            dates: 'Feb 19-26',
            bookingUrl: `https://www.skyscanner.net/transport/flights/bhx/mil/?adultsv2=1&cabinclass=economy&ref=${AFFILIATE_ID}`,
            type: 'hot-deal'
        },
        {
            destination: 'Amsterdam',
            destinationCode: 'AMS',
            country: 'Netherlands',
            flag: '🇳🇱',
            price: 52,
            airline: 'KLM',
            duration: '1h 20m',
            stops: 0,
            dates: 'Various',
            bookingUrl: `https://www.skyscanner.net/transport/flights/bhx/ams/?adultsv2=1&cabinclass=economy&ref=${AFFILIATE_ID}`,
            type: 'great-deal'
        },
        {
            destination: 'Paris',
            destinationCode: 'CDG',
            country: 'France',
            flag: '🇫🇷',
            price: 58,
            airline: 'Air France',
            duration: '1h 40m',
            stops: 0,
            dates: 'Various',
            bookingUrl: `https://www.skyscanner.net/transport/flights/bhx/cdg/?adultsv2=1&cabinclass=economy&ref=${AFFILIATE_ID}`,
            type: 'great-deal'
        },
        {
            destination: 'Prague',
            destinationCode: 'PRG',
            country: 'Czech Republic',
            flag: '🇨🇿',
            price: 67,
            airline: 'Ryanair',
            duration: '2h 10m',
            stops: 0,
            dates: 'Various',
            bookingUrl: `https://www.skyscanner.net/transport/flights/bhx/prg/?adultsv2=1&cabinclass=economy&ref=${AFFILIATE_ID}`,
            type: 'great-deal'
        },
        {
            destination: 'Rome',
            destinationCode: 'FCO',
            country: 'Italy',
            flag: '🇮🇹',
            price: 72,
            airline: 'Wizz Air',
            duration: '2h 45m',
            stops: 0,
            dates: 'Various',
            bookingUrl: `https://www.skyscanner.net/transport/flights/bhx/fco/?adultsv2=1&cabinclass=economy&ref=${AFFILIATE_ID}`,
            type: 'great-deal'
        },
        {
            destination: 'Budapest',
            destinationCode: 'BUD',
            country: 'Hungary',
            flag: '🇭🇺',
            price: 69,
            airline: 'Wizz Air',
            duration: '2h 30m',
            stops: 0,
            dates: 'Various',
            bookingUrl: `https://www.skyscanner.net/transport/flights/bhx/bud/?adultsv2=1&cabinclass=economy&ref=${AFFILIATE_ID}`,
            type: 'great-deal'
        },
        {
            destination: 'Málaga',
            destinationCode: 'AGP',
            country: 'Spain',
            flag: '🇪🇸',
            price: 61,
            airline: 'Jet2',
            duration: '3h',
            stops: 0,
            dates: 'Various',
            bookingUrl: `https://www.skyscanner.net/transport/flights/bhx/agp/?adultsv2=1&cabinclass=economy&ref=${AFFILIATE_ID}`,
            type: 'great-deal'
        },
        {
            destination: 'Faro',
            destinationCode: 'FAO',
            country: 'Portugal',
            flag: '🇵🇹',
            price: 54,
            airline: 'Ryanair',
            duration: '2h 50m',
            stops: 0,
            dates: 'Various',
            bookingUrl: `https://www.skyscanner.net/transport/flights/bhx/fao/?adultsv2=1&cabinclass=economy&ref=${AFFILIATE_ID}`,
            type: 'great-deal'
        },
        {
            destination: 'Alicante',
            destinationCode: 'ALC',
            country: 'Spain',
            flag: '🇪🇸',
            price: 48,
            airline: 'Jet2',
            duration: '2h 45m',
            stops: 0,
            dates: 'Various',
            bookingUrl: `https://www.skyscanner.net/transport/flights/bhx/alc/?adultsv2=1&cabinclass=economy&ref=${AFFILIATE_ID}`,
            type: 'great-deal'
        },
        {
            destination: 'Palma',
            destinationCode: 'PMI',
            country: 'Spain',
            flag: '🇪🇸',
            price: 55,
            airline: 'Jet2',
            duration: '2h 35m',
            stops: 0,
            dates: 'Various',
            bookingUrl: `https://www.skyscanner.net/transport/flights/bhx/pmi/?adultsv2=1&cabinclass=economy&ref=${AFFILIATE_ID}`,
            type: 'great-deal'
        },
        
        // Long-Haul & Special Destinations
        {
            destination: 'Marrakesh',
            destinationCode: 'RAK',
            country: 'Morocco',
            flag: '🇲🇦',
            price: 236,
            originalPrice: 275,
            originalCurrency: 'EUR',
            airline: 'Air France, Transavia, KLM',
            duration: '11h 35m',
            stops: 2,
            dates: 'May 10-19',
            bookingUrl: `https://www.skyscanner.net/transport/flights/bhx/rak/?adultsv2=1&cabinclass=economy&ref=${AFFILIATE_ID}`,
            type: 'great-deal'
        },
        {
            destination: 'Hong Kong',
            destinationCode: 'HKG',
            country: 'Hong Kong',
            flag: '🇭🇰',
            price: 564,
            originalPrice: 658,
            originalCurrency: 'EUR',
            airline: 'Air Dolomiti, Lufthansa, SWISS',
            duration: '14h 40m',
            stops: 1,
            dates: 'Mar 9-17',
            bookingUrl: `https://www.skyscanner.net/transport/flights/bhx/hkg/?adultsv2=1&cabinclass=economy&ref=${AFFILIATE_ID}`,
            type: 'regular'
        },
        {
            destination: 'Sydney',
            destinationCode: 'SYD',
            country: 'Australia',
            flag: '🇦🇺',
            price: 795,
            originalPrice: 927,
            originalCurrency: 'EUR',
            airline: 'Air India',
            duration: '35h 30m',
            stops: 1,
            dates: 'Mar 23-30',
            bookingUrl: `https://www.skyscanner.net/transport/flights/bhx/syd/?adultsv2=1&cabinclass=economy&ref=${AFFILIATE_ID}`,
            type: 'regular'
        },
        
        // Additional Popular Routes
        {
            destination: 'Tenerife',
            destinationCode: 'TFS',
            country: 'Spain',
            flag: '🇪🇸',
            price: 89,
            airline: 'Jet2',
            duration: '4h 30m',
            stops: 0,
            dates: 'Various',
            bookingUrl: `https://www.skyscanner.net/transport/flights/bhx/tfs/?adultsv2=1&cabinclass=economy&ref=${AFFILIATE_ID}`,
            type: 'regular'
        },
        {
            destination: 'Berlin',
            destinationCode: 'BER',
            country: 'Germany',
            flag: '🇩🇪',
            price: 74,
            airline: 'Eurowings',
            duration: '2h 5m',
            stops: 0,
            dates: 'Various',
            bookingUrl: `https://www.skyscanner.net/transport/flights/bhx/ber/?adultsv2=1&cabinclass=economy&ref=${AFFILIATE_ID}`,
            type: 'regular'
        },
        {
            destination: 'Copenhagen',
            destinationCode: 'CPH',
            country: 'Denmark',
            flag: '🇩🇰',
            price: 78,
            airline: 'Norwegian',
            duration: '2h',
            stops: 0,
            dates: 'Various',
            bookingUrl: `https://www.skyscanner.net/transport/flights/bhx/cph/?adultsv2=1&cabinclass=economy&ref=${AFFILIATE_ID}`,
            type: 'regular'
        },
        {
            destination: 'Lisbon',
            destinationCode: 'LIS',
            country: 'Portugal',
            flag: '🇵🇹',
            price: 82,
            airline: 'TAP',
            duration: '2h 50m',
            stops: 0,
            dates: 'Various',
            bookingUrl: `https://www.skyscanner.net/transport/flights/bhx/lis/?adultsv2=1&cabinclass=economy&ref=${AFFILIATE_ID}`,
            type: 'regular'
        },
        {
            destination: 'Dubai',
            destinationCode: 'DXB',
            country: 'UAE',
            flag: '🇦🇪',
            price: 385,
            airline: 'Emirates',
            duration: '7h',
            stops: 0,
            dates: 'Various',
            bookingUrl: `https://www.skyscanner.net/transport/flights/bhx/dxb/?adultsv2=1&cabinclass=economy&ref=${AFFILIATE_ID}`,
            type: 'regular'
        }
    ],
    
    // Helper methods (same as before)
    getHotDeals() {
        return this.deals.filter(d => d.type === 'hot-deal').slice(0, 6);
    },
    
    getGreatDeals() {
        return this.deals.filter(d => d.type === 'great-deal').slice(0, 12);
    },
    
    getAllDeals() {
        return this.deals;
    },
    
    getDealsByPrice() {
        return [...this.deals].sort((a, b) => a.price - b.price);
    },
    
    getUpdateInfo() {
        const date = new Date(this.lastUpdated);
        const now = new Date();
        const hoursSince = Math.floor((now - date) / (1000 * 60 * 60));
        return {
            lastUpdated: date.toLocaleDateString('en-GB', { 
                day: 'numeric', 
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
            }),
            hoursSince,
            status: hoursSince < 24 ? 'fresh' : hoursSince < 48 ? 'recent' : 'needs-update'
        };
    }
};

// Make it available globally
if (typeof window !== 'undefined') {
    window.LIVE_DEALS = LIVE_DEALS_UPDATED; // Replace old LIVE_DEALS
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LIVE_DEALS_UPDATED;
}
