@echo off
cd /d "%~dp0"
echo Copying new 25 Years of MSIT logo and Campus Life photo...
cmd /c copy /y "C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789718872785.png" "public\assets\msit-logo.png"
powershell -Command "Copy-Item -Path 'C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789718872785.png' -Destination 'public\assets\msit-logo.png' -Force"
cmd /c copy /y "C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789720603808.jpg" "public\assets\iiit-campus-life.jpg"
powershell -Command "Copy-Item -Path 'C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789720603808.jpg' -Destination 'public\assets\iiit-campus-life.jpg' -Force"
echo Adding files...
git add .
echo Committing...
git commit -m "feat: simplify campus life slide with official IIIT portal link and concise highlights"
echo Pushing to GitHub...
git push origin main
echo.
echo ===================================================
echo Successfully pushed to GitHub! Vercel is deploying.
echo ===================================================
pause

