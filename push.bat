@echo off
cd /d "%~dp0"
echo Adding files...
git add .
echo Committing...
git commit -m "feat: add desktop view suggestion pill on mobile slides and gateway"
echo Pushing to GitHub...
git push origin main
echo.
echo ===================================================
echo Successfully pushed to GitHub! Vercel is deploying.
echo ===================================================
pause
