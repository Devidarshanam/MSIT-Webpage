@echo off
cd /d "%~dp0"
echo Adding files...
git add .
echo Committing...
git commit -m "fix: make slides fully responsive on mobile and add touch swipe gestures"
echo Pushing to GitHub...
git push origin main
echo.
echo ===================================================
echo Successfully pushed to GitHub! Vercel is deploying.
echo ===================================================
pause
