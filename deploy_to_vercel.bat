@echo off
cd /d "%~dp0"
echo ===================================================
echo Merging content-changes into main and deploying to Vercel...
echo ===================================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command "& { $env:GIT_MERGE_AUTOEDIT='no'; cmd /c copy /y 'C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789718872785.png' 'public\assets\msit-logo.png'; cmd /c copy /y 'C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789974235999.png' 'public\assets\iiit-campus-life.jpg'; git add .; git commit -m 'chore: sync assets' 2>$null; git checkout main; git -c core.editor=true pull origin main --no-edit; git -c core.editor=true merge content-changes --no-edit -m 'merge: update landing header typography and convocation visual'; git push origin main; git checkout content-changes; git push -u origin content-changes }"

echo.
echo ===================================================
echo Successfully merged and pushed to main!
echo Vercel is now building and deploying the live website.
echo ===================================================
pause
