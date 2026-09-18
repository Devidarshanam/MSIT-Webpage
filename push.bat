@echo off
cd /d "%~dp0"
echo Copying new 25 Years of MSIT logo...
copy /y "C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789718872785.png" "public\assets\msit-logo.png"
echo Adding files...
git add .
echo Committing...
git commit -m "feat: replace MSIT logo with official 25 Years of MSIT emblem"
echo Pushing to GitHub...
git push origin main
echo.
echo ===================================================
echo Successfully pushed to GitHub! Vercel is deploying.
echo ===================================================
pause

