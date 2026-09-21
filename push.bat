@echo off
cd /d "%~dp0"
echo ===================================================
<<<<<<< HEAD
echo Bundling assets and syncing MSIT updates to GitHub...
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
echo Staging and committing all updates...
git add .
git commit -m "feat: use original campus life photo for slides and new convocation image for explore box" 2>nul

echo.
echo Syncing with remote main...
git pull origin main --no-edit 2>nul
git push origin main

echo.
echo Updating content-changes branch...
git push origin HEAD:content-changes

echo.
echo ===================================================
echo SUCCESS! Pushed to both main and content-changes.
echo Vercel is deploying your live website.
=======
echo Merging content-changes into main and pushing to Vercel...
echo ===================================================
echo.

git add .
git commit -m "chore: save pending files on main"
git merge content-changes -m "merge: incorporate landing header and convocation updates"
git push origin main

echo.
echo ===================================================
echo PUSH TO MAIN COMPLETE!
echo Vercel Production deployment is now building.
>>>>>>> 12c4fdf69e14330322e62488eaaa970635049369
echo ===================================================
pause
