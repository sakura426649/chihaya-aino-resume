#!/bin/bash

# Deployment script for Chihaya Aino Resume to GitHub Pages
# This script helps you deploy the website to GitHub Pages

echo "🚀 Chihaya Aino Resume Deployment Script"
echo "========================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first."
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not in a git repository. Initializing git..."
    git init
    git add .
    git commit -m "Initial commit: Chihaya Aino resume website"
fi

echo "📦 Git repository ready"
echo ""

# Ask for GitHub username
read -p "Enter your GitHub username: " github_username
read -p "Enter your repository name (default: chihaya-aino-resume): " repo_name
repo_name=${repo_name:-chihaya-aino-resume}

echo ""
echo "📝 Summary:"
echo "  Username: $github_username"
echo "  Repository: $repo_name"
echo "  URL: https://github.com/$github_username/$repo_name"
echo ""

# Ask for confirmation
read -p "Continue? (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deployment cancelled."
    exit 0
fi

echo ""
echo "📤 Setting up remote repository..."
echo ""

# Check if remote already exists
if git remote | grep -q "origin"; then
    echo "⚠️  Remote 'origin' already exists. Updating..."
    git remote remove origin
fi

# Add remote
git remote add origin "https://github.com/$github_username/$repo_name.git"

echo "✅ Remote added: https://github.com/$github_username/$repo_name.git"
echo ""

# Push to GitHub
echo "📤 Pushing to GitHub..."
git branch -M main
if git push -u origin main; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🎉 Next steps:"
    echo "   1. Go to https://github.com/$github_username/$repo_name"
    echo "   2. Click 'Settings' → 'Pages'"
    echo "   3. Under 'Source', select 'GitHub Actions'"
    echo "   4. Wait for deployment to complete (about 1-2 minutes)"
    echo "   5. Your site will be available at:"
    echo "      🔗 https://$github_username.github.io/$repo_name/"
    echo ""
    echo "📱 Mobile users can access the site via the above link!"
else
    echo ""
    echo "❌ Failed to push to GitHub."
    echo ""
    echo "ℹ️  Possible reasons:"
    echo "   - Repository doesn't exist yet. Create it first at:"
    echo "     https://github.com/new"
    echo "   - Make sure the repository name is correct"
    echo "   - Check your internet connection"
    echo ""
    echo "📋 Manual steps:"
    echo "   1. Create repository: https://github.com/new"
    echo "   2. Name it: $repo_name"
    echo "   3. Keep it public"
    echo "   4. DON'T initialize with README, .gitignore, or license"
    echo "   5. Run this script again"
fi