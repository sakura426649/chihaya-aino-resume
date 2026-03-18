# Chihaya Aino Resume

A responsive, mobile-first resume webpage for Chihaya Aino, the guitarist from MyGo!!!!! (BanG Dream!).

## Features

- **Mobile-first responsive design**: Optimized for mobile devices with responsive breakpoints
- **Dark/Light theme toggle**: Switch between light and dark themes with persistent preference
- **Interactive elements**:
  - Animated skill bars that fill on scroll
  - Hover effects on cards and social links
  - Ripple effect on social media buttons
  - Animated avatar border
- **Modern CSS techniques**:
  - CSS Variables for theming
  - Flexbox and CSS Grid layouts
  - Gradient backgrounds and shadows
  - Smooth transitions and animations
- **Accessibility considerations**:
  - Semantic HTML structure
  - ARIA labels where appropriate
  - Keyboard navigation support

## Files

- `index.html` - Main HTML structure
- `style.css` - All styling with responsive design
- `script.js` - Interactive functionality
- `anon.png` - Character avatar image
- `README.md` - This file

## How to View

1. Open `index.html` directly in any modern web browser
2. For best experience, use Chrome, Firefox, Safari, or Edge
3. Test responsive design by resizing browser window or using device emulation in developer tools

## Technologies Used

- HTML5 (semantic markup)
- CSS3 (variables, flexbox, grid, animations)
- Vanilla JavaScript (ES6+)
- Font Awesome icons
- Google Fonts (Poppins, Roboto)

## Deploy to GitHub Pages

This project is ready to be deployed to GitHub Pages for mobile access via URL.

### Option 1: Manual Setup (Recommended)

1. **Create a new GitHub repository**:
   - Go to [GitHub](https://github.com/new)
   - Name your repository (e.g., `chihaya-aino-resume`)
   - Keep it public (required for GitHub Pages)
   - Do NOT initialize with README, .gitignore, or license

2. **Push to GitHub**:
   ```bash
   # Add remote (replace YOUR_USERNAME with your GitHub username)
   git remote add origin https://github.com/YOUR_USERNAME/chihaya-aino-resume.git

   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically deploy when you push to main

4. **Access your site**:
   - Your site will be available at: `https://YOUR_USERNAME.github.io/chihaya-aino-resume/`
   - This link works on mobile devices

### Option 2: Using GitHub CLI

If you have GitHub CLI installed:
```bash
# Create repository
gh repo create chihaya-aino-resume --public --source=. --remote=origin --push
```

The GitHub Actions workflow will automatically deploy your site to GitHub Pages.

## Browser Support

Supports all modern browsers (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+).

## Credits

- Character: Chihaya Aino from BanG Dream! MyGo!!!!!
- Icons: Font Awesome
- Fonts: Google Fonts
- Design & Development: Fan-made resume project

## License

This is a fan-made project for educational purposes. All BanG Dream! characters and properties belong to Bushiroad.