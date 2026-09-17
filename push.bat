@echo off
cd /d "%~dp0"
echo Adding files...
git add .
echo Committing...
git commit -m "feat: single-screen zero-scroll mobile presentation and widescreen landscape slide support"
echo Pushing to GitHub...
git push origin main
echo.
echo ===================================================
echo Successfully pushed to GitHub! Vercel is deploying.
echo ===================================================
pause
