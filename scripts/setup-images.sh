#!/bin/bash

# NextJS Validation Tailwind - Image Setup Script
# This script helps you set up images for your GitHub repository and npm package

echo "🎨 NextJS Validation Tailwind - Image Setup"
echo "=========================================="

# Create images directory if it doesn't exist
mkdir -p docs/images

echo "📁 Created docs/images directory"

# Check if SVG files exist
if [ -f "docs/images/logo.svg" ]; then
    echo "✅ Logo SVG found"
else
    echo "❌ Logo SVG not found. Please create docs/images/logo.svg"
fi

if [ -f "docs/images/banner.svg" ]; then
    echo "✅ Banner SVG found"
else
    echo "❌ Banner SVG not found. Please create docs/images/banner.svg"
fi

echo ""
echo "🔄 Next Steps:"
echo "1. Convert SVG files to PNG using online tools:"
echo "   - docs/images/logo.svg → docs/images/logo.png (512x512)"
echo "   - docs/images/banner.svg → docs/images/banner.png (1280x320)"
echo ""
echo "2. Take a screenshot of your demo page:"
echo "   - Run: npm run dev"
echo "   - Open: http://localhost:3001"
echo "   - Take screenshot and save as: docs/images/screenshot.png"
echo ""
echo "3. Upload images to GitHub:"
echo "   - Go to your repository"
echo "   - Navigate to docs/images/"
echo "   - Upload: logo.png, banner.png, screenshot.png"
echo ""
echo "4. Set repository banner:"
echo "   - Go to repository Settings → Social preview"
echo "   - Upload banner.png"
echo ""
echo "5. Update npm package:"
echo "   - npm version patch"
echo "   - npm publish"
echo ""
echo "📖 For detailed instructions, see: docs/GITHUB_NPM_GUIDE.md" 