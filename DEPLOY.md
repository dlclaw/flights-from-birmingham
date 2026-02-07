# 🚀 Deployment Instructions

Your website is built and ready! Follow these simple steps to deploy it to GitHub Pages.

## ✅ Status

- [x] Website fully built
- [x] All files committed to git
- [x] Git configured with your email (dlhx261@gmail.com)
- [x] SSH access to GitHub verified
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled

## 📋 Step-by-Step Deployment

### Step 1: Create GitHub Repository

**Option A: Via GitHub Website (Easiest)**

1. Go to: https://github.com/new
2. Fill in:
   - **Repository name:** `flights-from-birmingham`
   - **Description:** Flight comparison site for Birmingham Airport
   - **Visibility:** Public (required for free GitHub Pages)
   - **DO NOT** check "Initialize with README" (we already have one)
3. Click **Create repository**

**Option B: Via Command Line (if you have GitHub CLI)**

```bash
gh repo create flights-from-birmingham --public --source=. --remote=origin --push
```

### Step 2: Push Your Code

Once the repository is created on GitHub, run:

```bash
cd /data/.openclaw/workspace/flights-from-birmingham
git push -u origin main
```

You should see output like:
```
Enumerating objects: 15, done.
Counting objects: 100% (15/15), done.
...
To github.com:dlclaw/flights-from-birmingham.git
 * [new branch]      main -> main
```

### Step 3: Enable GitHub Pages

1. Go to your repository: https://github.com/dlclaw/flights-from-birmingham
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 2-3 minutes

### Step 4: Visit Your Live Site! 🎉

Your site will be live at:
```
https://dlclaw.github.io/flights-from-birmingham/
```

## 🔧 Configure API (Optional but Recommended)

To get live flight data and earn commissions:

1. **Sign up for Travelpayouts:**
   - Go to: https://www.travelpayouts.com/
   - Create account with dlhx261@gmail.com
   - Complete profile
   - Wait for approval (24-48 hours)

2. **Get your credentials:**
   - Login to Travelpayouts
   - Go to Tools → API
   - Copy your **API Token**
   - Go to Programs → Get your **Marker ID**

3. **Update config file:**
   Edit `js/config.js` and replace:
   ```javascript
   travelpayouts: {
       token: 'YOUR_API_TOKEN_HERE',    // Paste your token
       marker: 'YOUR_MARKER_HERE',       // Paste your marker
       host: 'api.travelpayouts.com'
   }
   ```

4. **Push update:**
   ```bash
   git add js/config.js
   git commit -m "Configure Travelpayouts API"
   git push
   ```

## 🌐 Custom Domain (Optional)

To use `flightsfrombirmingham.co.uk`:

1. **In GitHub Pages settings:**
   - Go to Settings → Pages
   - Enter custom domain: `flightsfrombirmingham.co.uk`
   - Save

2. **In your domain registrar (where you bought the domain):**
   
   Add these DNS records:
   
   **For www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: dlclaw.github.io
   TTL: 3600
   ```
   
   **For root domain:**
   ```
   Type: A
   Name: @ (or leave blank)
   Values (add all 4):
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
   TTL: 3600
   ```

3. **Wait for DNS propagation** (can take up to 24 hours)

4. **Enable HTTPS:**
   - Return to GitHub Pages settings
   - Check "Enforce HTTPS" (appears after DNS works)

## 📊 Next Steps After Launch

1. **Submit to Google Search Console**
   - Verify ownership
   - Submit sitemap
   - Monitor indexing

2. **Set up Google Analytics**
   - Create property
   - Add tracking code to all pages
   - Monitor traffic

3. **Create more route pages**
   - Copy template from `routes/amsterdam.html`
   - Target top destinations from Birmingham
   - Aim for 20-30 pages total

4. **Social Media**
   - Create Twitter account
   - Share deals and tips
   - Build following

5. **Monitor Performance**
   - Check Travelpayouts dashboard weekly
   - Track conversions
   - Optimize underperforming pages

## 🐛 Troubleshooting

### "Repository not found" when pushing

**Solution:** The GitHub repository hasn't been created yet. Complete Step 1 above.

### GitHub Pages shows 404

**Solutions:**
- Wait 5 minutes and refresh
- Check that `index.html` exists in root directory
- Verify GitHub Pages is enabled in settings
- Clear browser cache

### API not working

**Solutions:**
- Check that you've replaced placeholder values in `js/config.js`
- Verify Travelpayouts account is approved
- Check browser console for errors
- Site works in demo mode until API is configured

## 📞 Quick Reference

**Repository URL:** `https://github.com/dlclaw/flights-from-birmingham`  
**Live Site URL:** `https://dlclaw.github.io/flights-from-birmingham/`  
**Your Email:** dlhx261@gmail.com  
**GitHub Username:** dlclaw  

**Current Status:** ✅ Code ready, 🔄 Waiting for GitHub repo creation

---

## 🚀 Quick Start (Copy-Paste Commands)

After creating the GitHub repository:

```bash
cd /data/.openclaw/workspace/flights-from-birmingham
git push -u origin main
```

Then enable GitHub Pages in repository settings.

**That's it! Your site will be live in 2-3 minutes! 🎉**

---

**Need help?** Check the main README.md or GitHub docs.
