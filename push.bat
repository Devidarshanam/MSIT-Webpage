@echo off
cd /d "%~dp0"
echo Adding files...
git add .
echo Committing...
git commit -m "style: declutter mobile slides and enhance visual breathing room"
echo Pushing to GitHub...
git push origin main
echo.
echo ===================================================
echo Successfully pushed to GitHub! Vercel is deploying.
echo ===================================================
pause
