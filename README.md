# ✈️ Flights from Birmingham - V2

**A modern flight deal discovery hub** - Find the cheapest flights from Birmingham to anywhere in the world.

![Status](https://img.shields.io/badge/status-active-success)
![Version](https://img.shields.io/badge/version-2.0-blue)

---

## 🎯 What This Is

A **deal discovery platform** that shows real flight prices on your site - not redirects. Think Skyscanner meets Product Hunt.

### Key Features

✅ **Real Prices Displayed** - No redirect needed, see prices immediately  
✅ **Browse Best Deals** - 20-30 live deals sorted by value  
✅ **Flexible Search** - "Anywhere from Birmingham" with flexible dates  
✅ **Modern UI** - Card-based, mobile-first, fast loading  
✅ **Affiliate Revenue** - Earn commissions on bookings  
✅ **Auto-Updating** - Prices refresh automatically  

---

## 🚀 Quick Start

### 1. Get Your API Key

Sign up for a **free** Kiwi.com Tequila API key:

👉 **https://tequila.kiwi.com/**

- Free tier: 100 requests/month (perfect for testing)
- Paid tier: £30/month for unlimited requests
- Returns real prices, flexible search, affiliate links

### 2. Configure the Site

Open `js/config.js` and replace:

```javascript
key: 'YOUR_API_KEY_HERE',
```

With your actual API key:

```javascript
key: 'abc123your-real-api-key-here',
```

### 3. Test Locally

```bash
# Use any local server
python -m http.server 8000
# or
npx serve
```

Open `http://localhost:8000` and you should see live deals!

### 4. Deploy to GitHub Pages

```bash
git add .
git commit -m "v2: Deal discovery hub with real prices"
git push origin v2-rebuild
```

Then in your GitHub repo:
- Go to **Settings** → **Pages**
- Set source to `v2-rebuild` branch
- Your site will be live at `https://yourusername.github.io/flights-from-birmingham`

---

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript (no frameworks)
- **API**: Kiwi.com Tequila API
- **Hosting**: GitHub Pages (free, fast, CDN)
- **Images**: Gradient placeholders (or optional Unsplash)

### Why These Choices?

**Kiwi.com Tequila API** - The best option for deal discovery:
- ✅ Returns actual prices you can display
- ✅ "Anywhere from BHX" searches
- ✅ Flexible date ranges
- ✅ Affiliate deep links included
- ✅ Great documentation
- ✅ Free tier for testing

**Alternatives Considered:**
- ❌ Aviasales - Redirect-only, no price display
- ❌ Skyscanner - API not available for affiliates
- ❌ Amadeus - More complex, enterprise-focused
- ❌ Google Flights - No official API

---

## 📁 Project Structure

```
flights-from-birmingham/
├── index.html          # Main page
├── css/
│   └── styles.css      # All styles (mobile-first)
├── js/
│   ├── config.js       # Configuration & API keys
│   └── app.js          # Main application logic
├── README.md           # This file
└── .gitignore          # Don't commit API keys!
```

---

## 🎨 Design Philosophy

### Product Thinking

- **Deal discovery, not search** - Users come to browse and discover
- **Prices front and center** - No hiding behind "from £X"
- **Visual hierarchy** - Price is hero, destination is star
- **Keep users engaged** - Browse like shopping, not just search

### UX Principles

1. **Mobile-first** - Most users browse deals on phones
2. **Fast loading** - < 2s initial load
3. **Progressive enhancement** - Works without JavaScript
4. **Clear value** - "Updated 2h ago", trust signals
5. **Easy conversion** - One click to booking

### Color Psychology

- 🟢 **Green (#10b981)** - Great deals, savings, go
- 🟡 **Amber (#f59e0b)** - Hot deals, urgency
- ⚪ **Clean whites** - Professional, trustworthy
- 🎨 **Gradients** - Modern, exciting

---

## ⚙️ Configuration

### Essential Settings (`js/config.js`)

```javascript
// Your Kiwi.com API key (REQUIRED)
key: 'YOUR_API_KEY_HERE',

// Your affiliate ID (optional but recommended)
affiliateId: 'flightsfrombirm',

// Default search parameters
defaults: {
    origin: 'BHX',              // Birmingham Airport
    currency: 'GBP',            // British Pounds
    maxStopovers: 2,            // Up to 2 stops
    limit: 30,                  // 30 deals per load
    dateFrom: 7,                // Start 7 days from now
    dateTo: 180,                // Up to 6 months ahead
    cacheDuration: 7200000      // Cache 2 hours
}
```

### Optional: Unsplash Images

For real destination photos instead of gradients:

1. Get free API key: https://unsplash.com/developers
2. Update `js/config.js`:

```javascript
unsplash: {
    accessKey: 'YOUR_UNSPLASH_KEY',
    enabled: true
}
```

---

## 💰 Revenue Model

### How You Earn

Every "View Deal" button includes your affiliate ID:

```javascript
https://www.kiwi.com/deep?affilid=YOUR_ID&from=BHX&to=BCN...
```

### Commission Structure (Kiwi.com)

- **Flights**: 0.5-1% of booking value
- **Payment**: Monthly via PayPal
- **Cookie duration**: 30 days
- **Typical earnings**: £2-5 per booking

### Example Revenue

If your site generates:
- 1,000 visitors/month
- 5% click-through rate (50 clicks)
- 10% conversion (5 bookings)
- Average booking £200

**Monthly revenue: ~£10-25**

Scale to 10,000 visitors = £100-250/month

### Optimization Tips

1. **Update deals frequently** - Fresh deals = more engagement
2. **Add destination content** - SEO + value
3. **Test different CTAs** - "View Deal" vs "Book Now"
4. **Track top destinations** - Focus on what converts
5. **Mobile optimization** - Most traffic is mobile

---

## 🔧 Customization

### Change Origin City

In `js/config.js`:

```javascript
origin: 'MAN',  // Change to Manchester (or any airport)
```

Update homepage text:

```html
<h1>Find the Cheapest Flights from Manchester</h1>
```

### Add More Popular Destinations

In `js/config.js`:

```javascript
popularDestinations: [
    { code: 'NYC', city: 'New York', country: 'USA' },
    { code: 'BKK', city: 'Bangkok', country: 'Thailand' },
    // Add more...
]
```

### Adjust Deal Thresholds

What qualifies as a "hot deal":

```javascript
deals: {
    greatDealThreshold: 0.05,  // £0.05 per km
    hotDealThreshold: 50       // Under £50
}
```

---

## 📊 Performance

### Optimization

- **Lazy loading images** - Only load visible cards
- **API caching** - Don't spam API, cache 2 hours
- **Minimal dependencies** - No frameworks, fast load
- **CDN delivery** - GitHub Pages uses Fastly CDN

### Lighthouse Scores (Target)

- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

---

## 🐛 Troubleshooting

### "API key not configured"

**Problem**: You see a warning in console  
**Solution**: Update `js/config.js` with your real Kiwi.com API key

### "Could not load deals"

**Problem**: Deals won't load  
**Solution**:
1. Check browser console for errors
2. Verify API key is correct
3. Check Kiwi.com API dashboard for quota
4. Try different destination

### "CORS error"

**Problem**: API blocked by browser  
**Solution**: Must test on a real server (not `file://`). Use:
```bash
python -m http.server 8000
```

### No images showing

**Problem**: Destination images broken  
**Solution**: Gradients should work always. If using Unsplash, check your API key.

---

## 🚢 Deployment

### GitHub Pages (Recommended)

```bash
# Push to GitHub
git add .
git commit -m "v2: Deal discovery hub"
git push origin v2-rebuild

# Enable GitHub Pages
# Repo Settings → Pages → Source: v2-rebuild branch
```

Your site will be live at:
`https://YOUR_USERNAME.github.io/flights-from-birmingham`

### Custom Domain (Optional)

1. Buy domain (e.g., `flightsfrombirm.com`)
2. Add CNAME file:
```bash
echo "flightsfrombirm.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```
3. Update DNS:
```
CNAME: www → YOUR_USERNAME.github.io
A:     @   → 185.199.108.153
              185.199.109.153
              185.199.110.153
              185.199.111.153
```

---

## 🎯 Next Steps

### Phase 1: Launch ✅
- [x] Set up Kiwi.com API
- [x] Build deal discovery UI
- [x] Deploy to GitHub Pages
- [ ] Test on mobile devices
- [ ] Share with friends for feedback

### Phase 2: Growth
- [ ] Add destination guides for SEO
- [ ] Set up Google Analytics
- [ ] A/B test different CTAs
- [ ] Add email newsletter signup
- [ ] Price drop alerts

### Phase 3: Scale
- [ ] Server-side API proxy (hide key)
- [ ] Price history tracking
- [ ] User accounts & favorites
- [ ] Social sharing features
- [ ] Multi-city search

---

## 📚 Resources

### API Documentation
- **Kiwi.com Tequila**: https://tequila.kiwi.com/portal/docs/tequila_api
- **Search API**: https://tequila.kiwi.com/portal/docs/tequila_api/search_api
- **Locations API**: https://tequila.kiwi.com/portal/docs/tequila_api/locations_api

### Affiliate Programs
- **Kiwi.com Partners**: https://www.kiwi.com/en/pages/affiliates
- **Alternative**: Join Awin, TradeDoubler networks

### Inspiration
- **Skyscanner** - Search flexibility
- **Google Flights** - Price insights UI
- **Jack's Flight Club** - Deal presentation
- **Going.com** - Email alerts style

---

## 🤝 Contributing

Found a bug? Have an idea? Open an issue or PR!

---

## 📄 License

MIT License - Do whatever you want with this!

---

## 💬 Support

Need help?
- Check [Troubleshooting](#-troubleshooting) section
- Review Kiwi.com docs: https://tequila.kiwi.com/portal/docs
- Open a GitHub issue

---

## 🎉 You Did It!

You now have a modern flight deal discovery site that:
- Shows **real prices** on YOUR site
- Helps people **discover** cheap flights
- Earns **affiliate commissions**
- Looks **professional** and modern

**Now go find some cheap flights!** ✈️🌍

---

Built with ❤️ for travelers who love a good deal.
