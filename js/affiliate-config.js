/**
 * Affiliate Configuration
 * 
 * Central config for all affiliate IDs and link generation
 */

const AFFILIATE_CONFIG = {
    // Skyscanner Affiliate ID (Get from partners.skyscanner.net)
    skyscanner: {
        affiliateId: 'REPLACE_WITH_YOUR_SKYSCANNER_ID', // TODO: Add after approval
        enabled: true,
    },
    
    // Travelpayouts/Aviasales (Get from travelpayouts.com)
    travelpayouts: {
        marker: 'REPLACE_WITH_YOUR_TRAVELPAYOUTS_MARKER', // TODO: Add after approval
        enabled: false, // Enable after getting approved
    },
    
    // Kiwi.com (if you get approved)
    kiwi: {
        affiliateId: 'REPLACE_WITH_YOUR_KIWI_ID',
        enabled: false,
    }
};

/**
 * Generate Skyscanner deep link
 * @param {string} origin - Origin airport code (e.g., 'BHX')
 * @param {string} dest - Destination airport code (e.g., 'DUB')
 * @param {string} outDate - Outbound date YYMMDD (optional)
 * @param {string} inDate - Return date YYMMDD (optional)
 * @returns {string} Skyscanner URL with affiliate tracking
 */
function generateSkyscannerUrl(origin, dest, outDate = '', inDate = '') {
    const base = 'https://www.skyscanner.net/transport/flights';
    const o = origin.toLowerCase();
    const d = dest.toLowerCase();
    
    // If dates provided, use specific search
    if (outDate && inDate) {
        return `${base}/${o}/${d}/${outDate}/${inDate}/?adultsv2=1&cabinclass=economy&ref=${AFFILIATE_CONFIG.skyscanner.affiliateId}&rtn=1`;
    } else if (outDate) {
        // One-way
        return `${base}/${o}/${d}/${outDate}/?adultsv2=1&cabinclass=economy&ref=${AFFILIATE_CONFIG.skyscanner.affiliateId}&rtn=0`;
    } else {
        // General search (no dates)
        return `${base}/${o}/${d}/?adultsv2=1&cabinclass=economy&ref=${AFFILIATE_CONFIG.skyscanner.affiliateId}`;
    }
}

/**
 * Generate Kiwi.com deep link
 * @param {string} origin - Origin airport code
 * @param {string} dest - Destination airport code
 * @param {string} outDate - Outbound date (DD/MM/YYYY format)
 * @param {string} inDate - Return date (DD/MM/YYYY format)
 * @returns {string} Kiwi.com URL with affiliate tracking
 */
function generateKiwiUrl(origin, dest, outDate = '', inDate = '') {
    const base = 'https://www.kiwi.com/deep';
    
    if (outDate && inDate) {
        return `${base}?from=${origin}&to=${dest}&departure=${outDate}&return=${inDate}&affilid=${AFFILIATE_CONFIG.kiwi.affiliateId}`;
    } else {
        return `${base}?from=${origin}&to=${dest}&affilid=${AFFILIATE_CONFIG.kiwi.affiliateId}`;
    }
}

/**
 * Generate Travelpayouts/Aviasales link
 * @param {string} origin - Origin city/airport
 * @param {string} dest - Destination city/airport
 * @returns {string} Aviasales URL with tracking
 */
function generateTravelpayoutsUrl(origin, dest) {
    return `https://www.aviasales.com/search/${origin}${dest}?marker=${AFFILIATE_CONFIG.travelpayouts.marker}`;
}

/**
 * Generate multiple comparison links for a route
 * @param {string} origin - Origin airport code
 * @param {string} dest - Destination airport code
 * @param {string} outDate - Optional outbound date
 * @param {string} inDate - Optional return date
 * @returns {Object} Object with multiple affiliate links
 */
function generateAllLinks(origin, dest, outDate = '', inDate = '') {
    return {
        skyscanner: generateSkyscannerUrl(origin, dest, outDate, inDate),
        kiwi: AFFILIATE_CONFIG.kiwi.enabled ? generateKiwiUrl(origin, dest, outDate, inDate) : null,
        aviasales: AFFILIATE_CONFIG.travelpayouts.enabled ? generateTravelpayoutsUrl(origin, dest) : null,
    };
}

// Make available globally
if (typeof window !== 'undefined') {
    window.AFFILIATE_CONFIG = AFFILIATE_CONFIG;
    window.generateSkyscannerUrl = generateSkyscannerUrl;
    window.generateKiwiUrl = generateKiwiUrl;
    window.generateTravelpayoutsUrl = generateTravelpayoutsUrl;
    window.generateAllLinks = generateAllLinks;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AFFILIATE_CONFIG,
        generateSkyscannerUrl,
        generateKiwiUrl,
        generateTravelpayoutsUrl,
        generateAllLinks,
    };
}
