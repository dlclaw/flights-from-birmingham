# 🔑 API Setup Guide

Complete step-by-step guide to get your Kiwi.com API key and configure the site.

---

## Step 1: Sign Up for Kiwi.com Tequila API

### 1.1 Go to Tequila Portal

Visit: **https://tequila.kiwi.com/**

### 1.2 Create Account

Click "Sign Up" and register with:
- Email address
- Password
- Company name (can be personal blog name)

### 1.3 Verify Email

Check your inbox and click the verification link.

---

## Step 2: Get Your API Key

### 2.1 Access Dashboard

Log in to: **https://tequila.kiwi.com/portal/dashboard**

### 2.2 Create New API Key

1. Click "API Keys" or "Create New Key"
2. Give it a name (e.g., "Flights from Birmingham")
3. Select permissions:
   - ✅ Search API (required)
   - ✅ Locations API (required)
4. Click "Create"

### 2.3 Copy Your Key

You'll see something like:
```
abc123def456ghi789jkl012mno345pqr
```

**⚠️ IMPORTANT:** Copy this key immediately. You might not see it again!

---

## Step 3: Configure the Site

### 3.1 Open Config File

Open `js/config.js` in a text editor.

### 3.2 Replace API Key

Find this line:
```javascript
key: 'YOUR_API_KEY_HERE',
```

Replace with your actual key:
```javascript
key: 'abc123def456ghi789jkl012mno345pqr',
```

### 3.3 (Optional) Add Affiliate ID

Sign up for Kiwi.com affiliate program:
**https://www.kiwi.com/en/pages/affiliates**

Then update:
```javascript
affiliateId: 'your-affiliate-id',
```

### 3.4 Save File

Save `js/config.js`.

---

## Step 4: Test Locally

### 4.1 Start Local Server

Choose one:

**Python:**
```bash
python -m http.server 8000
```

**Node.js:**
```bash
npx serve
```

**PHP:**
```bash
php -S localhost:8000
```

### 4.2 Open in Browser

Visit: `http://localhost:8000`

### 4.3 Check Console

Open browser DevTools (F12) and check Console tab.

**Success:** You should see deals loading!

**Error?** See [Troubleshooting](#troubleshooting) below.

---

## Step 5: Deploy

See [README.md](README.md#-deployment) for deployment instructions.

---

## 🔄 API Quotas & Limits

### Free Tier

- **100 requests/month**
- Perfect for testing and small sites
- Resets on 1st of each month

**Usage tips:**
- Cache results (2-4 hours)
- Don't call API on every page view
- Implement rate limiting

### Paid Tiers

| Tier | Requests/Month | Price |
|------|---------------|-------|
| Startup | 1,000 | £10/month |
| Growth | 10,000 | £30/month |
| Business | 100,000 | £100/month |

**Recommended:** Start with free, upgrade when you hit 1,000+ visitors/day.

---

## 💰 Affiliate Program Setup

### Why Join?

- Earn 0.5-1% commission on bookings
- 30-day cookie duration
- Monthly PayPal payments
- No cost to join

### How to Join

1. Visit: **https://www.kiwi.com/en/pages/affiliates**
2. Click "Join Now"
3. Fill in application:
   - Website URL
   - Expected traffic
   - Promotion method
4. Wait for approval (usually 1-3 days)

### After Approval

1. Log in to affiliate dashboard
2. Get your affiliate ID (e.g., `flightsfrombirm`)
3. Update `js/config.js`:
```javascript
affiliateId: 'flightsfrombirm',
```

### Tracking

All "View Deal" buttons automatically include your affiliate ID:
```
https://www.kiwi.com/deep?affilid=YOUR_ID&...
```

---

## 🔒 Security Best Practices

### DON'T Commit API Keys

Your `.gitignore` file already prevents this, but double-check:

```bash
# Check what will be committed
git status

# If config.js is listed, add to .gitignore
echo "js/config.js" >> .gitignore
```

### Use Environment Variables (Advanced)

For production sites with server-side functions:

1. Create `.env` file:
```
KIWI_API_KEY=abc123def456...
```

2. Update config to read from env:
```javascript
key: process.env.KIWI_API_KEY || 'YOUR_API_KEY_HERE',
```

3. Add `.env` to `.gitignore`

### GitHub Secrets

For GitHub Pages with Actions:

1. Go to repo Settings → Secrets
2. Add `KIWI_API_KEY` secret
3. Update deployment workflow to inject it

---

## 📊 Monitoring Usage

### Check Your Quota

1. Log in to Kiwi.com Tequila portal
2. Go to Dashboard
3. View "API Usage" chart

### Set Up Alerts

1. Dashboard → Notifications
2. Enable "Quota Warning" at 80%
3. Add email for alerts

---

## 🐛 Troubleshooting

### "API key not configured"

**Symptom:** Warning in browser console  
**Solution:** Update `js/config.js` with your real API key

### "Authentication failed"

**Symptom:** 401 error in Network tab  
**Solution:**
- Check API key is correct (no extra spaces)
- Verify key is active in Kiwi.com dashboard
- Regenerate key if needed

### "Quota exceeded"

**Symptom:** 429 error  
**Solution:**
- Check usage in Kiwi.com dashboard
- Wait until quota resets (1st of month)
- Upgrade to paid tier
- Implement better caching

### "CORS error"

**Symptom:** "Access-Control-Allow-Origin" error  
**Solution:**
- Must use a web server (not `file://`)
- Start local server with Python/Node
- Should work fine on GitHub Pages

### "No deals loading"

**Symptom:** Infinite loading spinner  
**Solution:**
1. Check browser console for errors
2. Verify API key in config.js
3. Check Network tab - is API call succeeding?
4. Try different destination/dates

---

## 🧪 Testing

### Test Checklist

- [ ] Homepage loads without errors
- [ ] Deals display with prices
- [ ] Search box works
- [ ] Destination autocomplete works
- [ ] Popular destination chips work
- [ ] Filters (sort/region) work
- [ ] Deal cards link to Kiwi.com with affiliate ID
- [ ] Mobile responsive
- [ ] Fast loading (<3s)

### Sample Searches

Try these to verify functionality:

1. **Popular destination:** Click "Barcelona" chip
2. **Flexible search:** Leave destination as "Anywhere"
3. **Specific destination:** Type "Paris" in search
4. **Specific dates:** Switch to specific dates, choose dates

---

## 📞 Support

### Kiwi.com Support

- **Docs:** https://tequila.kiwi.com/portal/docs
- **Email:** tequila-support@kiwi.com
- **Portal:** Log in to Tequila portal for support tickets

### This Project

- **Issues:** Open a GitHub issue
- **Discussions:** Use GitHub Discussions
- **Email:** Your repo maintainer

---

## ✅ Setup Complete!

Once you see deals loading with real prices, you're ready to deploy!

Next: Read [README.md](README.md#-deployment) for deployment instructions.

---

**Happy flying!** ✈️
