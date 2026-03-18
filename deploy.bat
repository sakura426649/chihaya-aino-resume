@echo off
echo 🚀 Chihaya Aino Resume Deployment Script
echo ========================================
echo.

REM Check if git is installed
where git >nul 2>nul
if errorlevel 1 (
    echo ❌ Git is not installed. Please install git first.
    echo Download from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo ✅ Git is installed
echo.

REM Check if we're in a git repository
if not exist ".git" (
    echo ❌ Not in a git repository. Initializing git...
    git init
    git add .
    git commit -m "Initial commit: Chihaya Aino resume website"
)

echo 📦 Git repository ready
echo.

set /p github_username="Enter your GitHub username: "
set /p repo_name="Enter your repository name (default: chihaya-aino-resume): "
if "%repo_name%"=="" set repo_name=chihaya-aino-resume

echo.
echo 📝 Summary:
echo   Username: %github_username%
echo   Repository: %repo_name%
echo   URL: https://github.com/%github_username%/%repo_name%
echo.

set /p confirm="Continue? (y/n): "
if /i not "%confirm%"=="y" (
    echo ❌ Deployment cancelled.
    pause
    exit /b 0
)

echo.
echo 📤 Setting up remote repository...
echo.

REM Check if remote already exists
git remote | findstr "origin" >nul
if not errorlevel 1 (
    echo ⚠️  Remote 'origin' already exists. Updating...
    git remote remove origin
)

REM Add remote
git remote add origin https://github.com/%github_username%/%repo_name%.git

echo ✅ Remote added: https://github.com/%github_username%/%repo_name%.git
echo.

echo 📤 Pushing to GitHub...
git branch -M main
git push -u origin main
if errorlevel 1 (
    echo.
    echo ❌ Failed to push to GitHub.
    echo.
    echo ℹ️  Possible reasons:
    echo    - Repository doesn't exist yet. Create it first at:
    echo      https://github.com/new
    echo    - Make sure the repository name is correct
    echo    - Check your internet connection
    echo.
    echo 📋 Manual steps:
    echo    1. Create repository: https://github.com/new
    echo    2. Name it: %repo_name%
    echo    3. Keep it public
    echo    4. DON'T initialize with README, .gitignore, or license
    echo    5. Run this script again
    pause
    exit /b 1
)

echo.
echo ✅ Successfully pushed to GitHub!
echo.
echo 🎉 Next steps:
echo    1. Go to https://github.com/%github_username%/%repo_name%
echo    2. Click 'Settings' → 'Pages'
echo    3. Under 'Source', select 'GitHub Actions'
echo    4. Wait for deployment to complete (about 1-2 minutes)
echo    5. Your site will be available at:
echo       🔗 https://%github_username%.github.io/%repo_name%/
echo.
echo 📱 Mobile users can access the site via the above link!
pause