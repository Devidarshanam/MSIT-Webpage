@echo off
cd /d "%~dp0"
echo ===================================================
echo Syncing assets and pushing to GitHub (main)...
echo ===================================================
echo.

echo Copying assets...
cmd /c copy /y "C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789718872785.png" "public\assets\msit-logo.png"
powershell -Command "Copy-Item -Path 'C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789718872785.png' -Destination 'public\assets\msit-logo.png' -Force"

cmd /c copy /y "C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789720603808.jpg" "public\assets\iiit-campus-life.jpg"
powershell -Command "Copy-Item -Path 'C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789720603808.jpg' -Destination 'public\assets\iiit-campus-life.jpg' -Force"

cmd /c copy /y "C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789974235999.png" "public\assets\msit-convocation.jpg"
powershell -Command "Copy-Item -Path 'C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789974235999.png' -Destination 'public\assets\msit-convocation.jpg' -Force"

echo.
echo Staging files...
git add .

echo.
echo Committing changes...
git commit -m "fix: font color and visibility in post-login application status sections"

echo.
echo Pushing directly to origin main...
git push origin main

echo.
echo ===================================================
echo PUSH COMPLETE!
echo Vercel is now deploying your website to production.
echo ===================================================
pause
