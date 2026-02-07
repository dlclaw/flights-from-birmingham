#!/bin/bash

# Deployment script for Flights from Birmingham website
# This script creates the GitHub repository and pushes the code

set -e  # Exit on any error

echo "🚀 Flights from Birmingham - Deployment Script"
echo "================================================"
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Must run from project root directory"
    echo "   cd /data/.openclaw/workspace/flights-from-birmingham"
    exit 1
fi

# Check if git is configured
if ! git config user.name > /dev/null 2>&1; then
    echo "❌ Error: Git not configured"
    exit 1
fi

echo "✅ Prerequisites checked"
echo ""

# Check if GitHub CLI is available
if command -v gh &> /dev/null; then
    echo "📦 GitHub CLI detected - using automated setup"
    echo ""
    
    # Check if already logged in
    if ! gh auth status &> /dev/null; then
        echo "Please login to GitHub:"
        gh auth login
    fi
    
    echo "Creating repository..."
    gh repo create flights-from-birmingham \
        --public \
        --description "Flight comparison and booking site for Birmingham Airport (BHX)" \
        --homepage "https://flightsfrombirmingham.co.uk" \
        --source=. \
        || echo "Repository may already exist, continuing..."
    
    echo ""
    echo "Pushing code to GitHub..."
    git push -u origin main || git push
    
    echo ""
    echo "✅ Code pushed successfully!"
    echo ""
    echo "Now enabling GitHub Pages..."
    
    # Enable GitHub Pages
    gh api -X POST repos/dlclaw/flights-from-birmingham/pages \
        -f source[branch]=main \
        -f source[path]=/ \
        2>/dev/null || echo "Pages may already be enabled"
    
    echo ""
    echo "🎉 DEPLOYMENT COMPLETE!"
    echo ""
    echo "Your site will be live in 2-3 minutes at:"
    echo "https://dlclaw.github.io/flights-from-birmingham/"
    echo ""
    
else
    echo "📝 Manual Setup Required"
    echo ""
    echo "GitHub CLI not found. Please follow these steps:"
    echo ""
    echo "1. Create repository on GitHub:"
    echo "   → Go to: https://github.com/new"
    echo "   → Name: flights-from-birmingham"
    echo "   → Visibility: Public"
    echo "   → DO NOT initialize with README"
    echo "   → Click 'Create repository'"
    echo ""
    echo "2. Then run:"
    echo "   git push -u origin main"
    echo ""
    echo "3. Enable GitHub Pages:"
    echo "   → Go to: https://github.com/dlclaw/flights-from-birmingham/settings/pages"
    echo "   → Source: main branch, / (root)"
    echo "   → Click Save"
    echo ""
    echo "See DEPLOY.md for detailed instructions"
    echo ""
fi

echo "📊 Next Steps:"
echo ""
echo "1. Configure Travelpayouts API (see README.md)"
echo "2. Test the live site"
echo "3. Submit to Google Search Console"
echo "4. Set up Google Analytics"
echo "5. Create more route pages"
echo ""
echo "Target: £700-1,200/month revenue"
echo ""
