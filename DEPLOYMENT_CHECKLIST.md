# 🚀 Deployment Checklist

Follow this checklist to deploy your flight deal discovery site to GitHub Pages.

---

## Pre-Deployment

### ✅ 1. API Configuration

- [ ] Kiwi.com API key added to `js/config.js`
- [ ] Tested locally - deals loading correctly
- [ ] Affiliate ID configured (if you have one)
- [ ] No API errors in browser console

### ✅ 2. Content Review

- [ ] Homepage title/description correct for your city
- [ ] Popular destinations relevant to your audience
- [ ] Footer text updated with your info
- [ ] No placeholder text remaining

### ✅ 3. Testing

- [ ] Site works on desktop
- [ ] Site works on mobile
- [ ] All links work (check "View Deal" buttons)
- [ ] Search functionality works
- [ ] Filters work (sort by price, region)
- [ ] No console errors

### ✅ 4. Performance

- [ ] Images loading quickly
- [ ] Page loads in <3 seconds
- [ ] No JavaScript errors
- [ ] Deals render smoothly

---

## GitHub Deployment

### ✅ 1. Commit Changes

```bash
cd flights-from-birmingham

# Check what changed
git status

# Add all files
git add .

# Commit
git commit -m "v2: Modern deal discovery hub with real prices"
```

### ✅ 2. Push to GitHub

```bash
# Push v2-rebuild branch
git push origin v2-rebuild
```

### ✅ 3. Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings**
3. Scroll to **Pages** section
4. Under "Source":
   - Branch: `v2-rebuild`
   - Folder: `/ (root)`
5. Click **Save**

### ✅ 4. Wait for Deployment

- GitHub will build your site (takes 1-2 minutes)
- You'll see: "Your site is published at `https://USERNAME.github.io/flights-from-birmingham`"
- Click the link to verify

---

## Post-Deployment

### ✅ 1. Verify Live Site

- [ ] Site loads at GitHub Pages URL
- [ ] Deals display correctly
- [ ] Search works
- [ ] Mobile responsive
- [ ] Affiliate links include your ID

### ✅ 2. Test Booking Flow

1. Click a "View Deal" button
2. Verify redirects to Kiwi.com
3. Check URL includes your affiliate ID: `?affilid=YOUR_ID`
4. Verify flight details match your site

### ✅ 3. Analytics (Optional)

If you want to track visitors:

**Google Analytics:**
1. Create GA4 property at https://analytics.google.com
2. Get tracking ID
3. Add to `index.html` before `</head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### ✅ 4. SEO Setup

**Update index.html metadata:**

```html
<meta name="description" content="Find the cheapest flights from Birmingham to anywhere. Browse live deals, compare prices, save money.">
<meta property="og:title" content="Cheapest Flights from Birmingham">
<meta property="og:description" content="Discover amazing flight deals from Birmingham to destinations worldwide">
<meta property="og:image" content="https://yourusername.github.io/flights-from-birmingham/og-image.png">
<meta name="twitter:card" content="summary_large_image">
```

**Create og-image.png:**
- Size: 1200x630px
- Include: "Flights from Birmingham" + sample deal
- Upload to repo root

---

## Custom Domain (Optional)

### ✅ 1. Buy Domain

Recommended registrars:
- Namecheap (~£10/year)
- Google Domains (~£10/year)
- Cloudflare (~£8/year)

Example: `flightsfrombirm.com`

### ✅ 2. Add CNAME File

In your repo root:

```bash
echo "flightsfrombirm.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push origin v2-rebuild
```

### ✅ 3. Configure DNS

In your domain registrar, add DNS records:

**For www.flightsfrombirm.com:**
```
Type: CNAME
Host: www
Value: USERNAME.github.io
```

**For flightsfrombirm.com (apex):**
```
Type: A
Host: @
Value: 185.199.108.153

Type: A
Host: @
Value: 185.199.109.153

Type: A
Host: @
Value: 185.199.110.153

Type: A
Host: @
Value: 185.199.111.153
```

### ✅ 4. Enable HTTPS

1. GitHub Pages → Settings
2. Check "Enforce HTTPS"
3. Wait 10-15 minutes for certificate

### ✅ 5. Verify

Visit both:
- `http://flightsfrombirm.com`
- `https://www.flightsfrombirm.com`

Should both work and redirect to HTTPS.

---

## Maintenance

### Daily

- [ ] Check site is loading
- [ ] Verify deals are updating

### Weekly

- [ ] Review analytics
- [ ] Check for broken deals/links
- [ ] Monitor API quota usage

### Monthly

- [ ] Review popular destinations
- [ ] Update seasonal deals
- [ ] Check affiliate earnings
- [ ] Optimize high-traffic pages

---

## Promotion

### ✅ 1. Share on Social Media

**Twitter/X:**
```
🎉 Just launched a new site to find the cheapest flights from Birmingham!

✈️ Real prices (no redirects)
🌍 Search anywhere with flexible dates
📱 Mobile-friendly

Check it out: flightsfrombirm.com

#Travel #Flights #Birmingham
```

**Facebook/Instagram:**
- Share with screenshot of best deal
- Tag local travel groups

### ✅ 2. Submit to Directories

- [ ] Google Search Console
- [ ] Bing Webmaster Tools
- [ ] Local Birmingham directories
- [ ] Travel deal aggregators

### ✅ 3. SEO

**Quick wins:**
- [ ] Submit sitemap to Google
- [ ] Add structured data (schema.org)
- [ ] Optimize page titles/descriptions
- [ ] Add alt text to images
- [ ] Internal linking

### ✅ 4. Content Marketing

**Blog post ideas:**
- "10 Cheapest Destinations from Birmingham in 2026"
- "How to Find Cheap Flights: Tips from a Deal Hunter"
- "Birmingham Airport Guide: Everything You Need to Know"

---

## Troubleshooting

### Site Not Loading

**Check:**
1. GitHub Pages enabled?
2. Correct branch selected?
3. DNS propagated? (if using custom domain)
4. HTTPS enforced?

**Wait:** Initial deployment can take 10-15 minutes

### Deals Not Showing

**Check:**
1. API key correct in `js/config.js`?
2. Browser console for errors?
3. Network tab - API calls succeeding?
4. Quota not exceeded?

### Custom Domain Not Working

**Check:**
1. CNAME file in repo root?
2. DNS records correct?
3. Wait 24-48 hours for DNS propagation
4. Clear browser cache

---

## Success Metrics

Track these to measure success:

### Week 1
- Site loads without errors
- 10+ unique visitors
- 1+ deal click-through

### Month 1
- 100+ unique visitors
- 5+ bookings
- £10+ commission

### Month 3
- 500+ unique visitors
- 25+ bookings
- £50+ commission

### Month 6
- 2,000+ unique visitors
- 100+ bookings
- £200+ commission

---

## Next Steps After Launch

### Quick Wins

1. **Add destination guides** - SEO + value
2. **Email newsletter** - Capture emails for alerts
3. **Social sharing** - Let users share deals
4. **Price history** - "Best price in 6 months!"

### Growth Features

1. **Price alerts** - Email when price drops
2. **User accounts** - Save favorite destinations
3. **Multi-city search** - Complex itineraries
4. **Mobile app** - PWA for notifications

### Monetization

1. **Optimize affiliate links** - A/B test
2. **Add more affiliate networks** - Diversify income
3. **Display ads** - Once you have traffic
4. **Premium features** - Paid alerts, priority access

---

## 🎉 Congratulations!

Your flight deal discovery site is now LIVE!

**Share your success:**
- Tweet your site URL
- Post in travel communities
- Tell friends and family

**Keep improving:**
- Listen to user feedback
- Track what deals convert best
- Add features users want

---

## Support

Need help?
- **Technical:** Open GitHub issue
- **API:** tequila-support@kiwi.com
- **Affiliate:** Kiwi.com affiliate support

---

**Now go help people find cheap flights!** ✈️🌍

Built with ❤️ for travelers.
