# ✈️ Flights from Birmingham

A modern, SEO-optimized flight affiliate website for finding the best deals from Birmingham Airport (BHX).

**Target Revenue:** £700-1,200/month  
**Market:** Birmingham Airport (5.9M catchment, 13M passengers/year, 150+ routes)  
**Affiliate:** Travelpayouts integration

## 🚀 Live Site

Once deployed, your site will be live at: `https://dlclaw.github.io/flights-from-birmingham/`

## 📋 What's Included

### Core Features
- ✅ Modern, mobile-first responsive design
- ✅ Flight search functionality from Birmingham
- ✅ Popular routes showcase
- ✅ Best deals section (auto-updating)
- ✅ SEO-optimized route pages (Amsterdam, Dublin, Dubai)
- ✅ Birmingham Airport guide
- ✅ Travelpayouts affiliate integration
- ✅ Fast loading, clean code

### Pages
- **Homepage:** Flight search + popular routes + deals
- **Airport Guide:** Complete Birmingham Airport information
- **Route Pages:** Detailed guides for top destinations
  - Birmingham to Amsterdam
  - Birmingham to Dublin
  - Birmingham to Dubai

### Technical Stack
- Static HTML5/CSS3/JavaScript (no build process needed)
- Vanilla JavaScript (no framework dependencies)
- Travelpayouts API integration
- Google Fonts (Inter)
- Mobile-first responsive design
- SEO-optimized structure

## 🎨 Design Philosophy

- **Clean & Modern:** Inspired by Skyscanner/Kayak aesthetics
- **Conversion-Focused:** Clear CTAs, compelling copy, easy search
- **Professional:** Trust signals, no spammy elements
- **Fast:** Optimized for quick loading and smooth UX

## 📦 Installation & Setup

### Option 1: Quick Start (Demo Mode)

The site works out of the box with demo data - no API setup required for testing!

```bash
# Clone the repository
git clone https://github.com/dlclaw/flights-from-birmingham.git
cd flights-from-birmingham

# Open in browser
open index.html
# or on Linux: xdg-open index.html
# or just drag index.html into your browser
```

### Option 2: Production Setup with API

For live flight data and affiliate commissions:

#### 1. Sign up for Travelpayouts

1. Visit [https://www.travelpayouts.com/](https://www.travelpayouts.com/)
2. Create a free account
3. Complete your profile and add your website
4. Wait for approval (usually 24-48 hours)
5. Once approved, get your credentials:
   - **API Token** (from API section)
   - **Marker** (your affiliate ID)

#### 2. Configure API Credentials

Edit `js/config.js` and update these lines:

```javascript
travelpayouts: {
    token: 'YOUR_API_TOKEN_HERE',      // Replace with your actual token
    marker: 'YOUR_MARKER_HERE',         // Replace with your marker/affiliate ID
    host: 'api.travelpayouts.com'
}
```

#### 3. Test Locally

Open `index.html` in your browser. Check the browser console:
- ✅ If configured correctly: Live flight data will load
- ⚠️ If not configured: Demo data will display with a console message

## 🚢 Deployment to GitHub Pages

### Step 1: Create GitHub Repository

```bash
# Navigate to your project
cd flights-from-birmingham

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Complete flight affiliate website"

# Create repository on GitHub
# Go to: https://github.com/new
# Name: flights-from-birmingham
# Leave it PUBLIC
# Don't initialize with README (we already have one)

# Add remote and push
git remote add origin git@github.com:dlclaw/flights-from-birmingham.git
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository: `https://github.com/dlclaw/flights-from-birmingham`
2. Click **Settings** (top right)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 2-3 minutes for deployment

Your site will be live at: `https://dlclaw.github.io/flights-from-birmingham/`

### Step 3: Custom Domain (Optional)

To use `flightsfrombirmingham.co.uk`:

1. **In GitHub:**
   - Settings → Pages → Custom domain
   - Enter: `flightsfrombirmingham.co.uk`
   - Save

2. **In Your Domain Registrar:**
   Add these DNS records:
   ```
   Type: CNAME
   Name: www
   Value: dlclaw.github.io

   Type: A (add all four)
   Name: @
   Values:
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
   ```

3. **Enable HTTPS** (recommended)
   - Wait for DNS to propagate (up to 24 hours)
   - GitHub will automatically provision SSL certificate
   - Check "Enforce HTTPS" in Pages settings

## 🔧 Customization Guide

### Adding New Route Pages

1. Copy an existing route page (e.g., `routes/amsterdam.html`)
2. Rename it (e.g., `routes/barcelona.html`)
3. Update these sections:
   - `<title>` and `<meta description>`
   - Page header (title, emoji flag)
   - Destination code in search links
   - Content (attractions, tips, etc.)
   - Sidebar information

4. Add to config (`js/config.js`):
```javascript
{ code: 'BCN', name: 'Barcelona', country: 'Spain', flag: '🇪🇸', slug: 'barcelona' }
```

5. Link from homepage footer and other route pages

### Updating Prices

Prices are auto-fetched from Travelpayouts API when configured. For demo mode, edit `js/config.js`:

```javascript
demoDeals: [
    {
        destination: 'Amsterdam',
        destinationCode: 'AMS',
        price: 45,           // Update this
        currency: '£',
        dates: 'Mar 15 - Mar 22',
        airline: 'KLM'
    },
    // ...
]
```

### Styling Changes

Edit `css/style.css`. Key variables at the top:

```css
:root {
    --primary: #2563eb;        /* Main brand color */
    --secondary: #0ea5e9;      /* Accent color */
    --accent: #f59e0b;         /* Highlight color */
    /* ... more variables ... */
}
```

### Adding More Destinations to Autocomplete

Edit `js/config.js` - add to `airports` array:

```javascript
{ code: 'BCN', name: 'Barcelona', city: 'Barcelona', country: 'Spain' }
```

## 📊 SEO & Content Strategy

### Current SEO Setup
- ✅ Semantic HTML5 structure
- ✅ Meta descriptions on all pages
- ✅ Keyword-optimized titles
- ✅ Open Graph tags
- ✅ Fast loading (no heavy frameworks)
- ✅ Mobile-responsive
- ✅ Clean URLs

### Next Steps for SEO Growth

1. **Submit to Google Search Console**
   - Verify ownership
   - Submit sitemap (create with online tool)
   - Monitor indexing

2. **Create More Route Pages**
   - Priority: Top 20 destinations from BHX
   - Use template from existing pages
   - Target: "flights from birmingham to [city]"

3. **Add Blog Content** (future enhancement)
   - Travel guides
   - Booking tips
   - Seasonal deals
   - Airport news

4. **Build Backlinks**
   - List on travel directories
   - Guest posts on travel blogs
   - Social media presence

5. **Monitor Performance**
   - Google Analytics setup
   - Track conversions
   - Monitor affiliate earnings
   - A/B test different approaches

## 💰 Monetization

### How It Works
- Users search for flights on your site
- Click "Search Flights" or "Book Now"
- Redirected to Travelpayouts partner sites
- You earn commission on completed bookings

### Travelpayouts Revenue Share
- **50-70% commission** from booking fees
- Payment terms: Monthly, NET-30
- Minimum payout: Usually $50
- Payment methods: PayPal, Wire transfer, Payoneer

### Optimizing Revenue

1. **Traffic Quality** - Target users ready to book
2. **Popular Routes** - Focus on high-traffic destinations
3. **Seasonal Content** - Update for peak travel times
4. **Mobile Experience** - Most users book on mobile
5. **Trust Signals** - Professional design increases conversions

### Expected Revenue (£700-1,200/month)

Based on:
- 5,000-10,000 monthly visitors
- 5% click-through rate
- £15-25 average commission per booking
- 10-15% conversion rate

## 📱 Testing Checklist

Before launch, verify:

- [ ] All pages load correctly
- [ ] Search form works
- [ ] Affiliate links open in new tabs
- [ ] Mobile responsive on all devices
- [ ] Fast loading (< 3 seconds)
- [ ] All images/resources load
- [ ] No console errors
- [ ] Links work (no 404s)
- [ ] Contact info correct
- [ ] API configured (or demo mode acknowledged)

## 🛠 Maintenance

### Regular Tasks

**Weekly:**
- Check for broken links
- Monitor affiliate dashboard
- Update "Hot Deals" if needed

**Monthly:**
- Review analytics
- Add new route pages
- Update seasonal content
- Check competitor pricing

**Quarterly:**
- Update airport information
- Refresh design elements
- Add new features
- Review and improve SEO

## 🐛 Troubleshooting

### API Not Working

**Problem:** Deals not loading, console errors  
**Solution:**
1. Check API credentials in `js/config.js`
2. Verify Travelpayouts account is approved
3. Check browser console for error messages
4. Ensure CORS is not blocking requests
5. Fallback to demo mode if needed

### GitHub Pages Not Updating

**Problem:** Changes not reflecting on live site  
**Solution:**
1. Clear browser cache
2. Wait 5-10 minutes for GitHub to rebuild
3. Check GitHub Actions tab for build status
4. Force refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Mobile Layout Issues

**Problem:** Design broken on mobile  
**Solution:**
1. Test on real devices, not just browser emulation
2. Check responsive breakpoints in `css/style.css`
3. Ensure viewport meta tag is present
4. Validate CSS for syntax errors

## 📚 Resources

### Documentation
- [Travelpayouts API Docs](https://support.travelpayouts.com/hc/en-us/categories/115000474268)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)

### Tools
- [Google Analytics](https://analytics.google.com/)
- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

## 🎯 Launch Roadmap

### Phase 1: Launch (Week 1)
- [x] Build complete website
- [ ] Configure Travelpayouts API
- [ ] Deploy to GitHub Pages
- [ ] Set up custom domain
- [ ] Submit to Google Search Console
- [ ] Set up Google Analytics

### Phase 2: Content (Weeks 2-4)
- [ ] Add 10 more route pages
- [ ] Create blog section
- [ ] Write airport parking guide
- [ ] Add deals newsletter signup

### Phase 3: Growth (Month 2-3)
- [ ] SEO optimization
- [ ] Social media presence
- [ ] Build backlinks
- [ ] Monitor and improve conversions

### Phase 4: Scale (Month 4+)
- [ ] Add more UK airports
- [ ] Implement advanced search
- [ ] Add price alerts
- [ ] Mobile app (future)

## 👨‍💻 Technical Details

### Browser Support
- Chrome, Firefox, Safari, Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome)
- No IE11 support (can be added if needed)

### Performance Targets
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 3.5s

### File Structure
```
flights-from-birmingham/
├── index.html              # Homepage
├── airport-guide.html      # Airport information
├── css/
│   └── style.css          # All styles
├── js/
│   ├── config.js          # Configuration & data
│   ├── api.js             # API integration
│   └── main.js            # Main application logic
├── routes/
│   ├── amsterdam.html     # Route pages
│   ├── dublin.html
│   └── dubai.html
└── README.md              # This file
```

## 📄 License

This project is for personal/commercial use by Dave (dlclaw).

---

## 🚀 Quick Commands Reference

```bash
# Local development
open index.html

# Git workflow
git add .
git commit -m "Update content"
git push

# Check site status
curl -I https://dlclaw.github.io/flights-from-birmingham/

# Test API (replace with your token)
curl "https://api.travelpayouts.com/v2/prices/latest?origin=BHX&currency=GBP&token=YOUR_TOKEN"
```

---

**Built with ❤️ for flightsfrombirmingham.co.uk**  
**Questions?** Check the Travelpayouts support or GitHub Issues

**Ready to launch? Let's get those commissions rolling! 💰✈️**
