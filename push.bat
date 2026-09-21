@echo off
cd /d "%~dp0"
echo Copying new 25 Years of MSIT logo and Campus Life photo...
cmd /c copy /y "C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789718872785.png" "public\assets\msit-logo.png"
powershell -Command "Copy-Item -Path 'C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789718872785.png' -Destination 'public\assets\msit-logo.png' -Force"
cmd /c copy /y "C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789974235999.png" "public\assets\iiit-campus-life.jpg"
powershell -Command "Copy-Item -Path 'C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789974235999.png' -Destination 'public\assets\iiit-campus-life.jpg' -Force"
cmd /c copy /y "C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789724010232.jpg" "public\assets\iiit-campus.jpg"
powershell -Command "Copy-Item -Path 'C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789724010232.jpg' -Destination 'public\assets\iiit-campus.jpg' -Force"
cmd /c copy /y "C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789724010232.jpg" "public\assets\iiit-academic-campus.jpg"
powershell -Command "Copy-Item -Path 'C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789724010232.jpg' -Destination 'public\assets\iiit-academic-campus.jpg' -Force"
echo Adding files...
git add .
git -c core.editor=true rebase --continue
git commit -m "feat: update landing header typography, convocation visual, and resolve merge conflicts" 2>nul
echo Pushing to GitHub content-changes branch...
git push -u origin content-changes

echo.
echo Syncing changes to main branch for Vercel production deployment...
git checkout main
git pull origin main
git merge content-changes -m "merge: update landing header typography and convocation visual"
git push origin main

echo.
echo Returning to content-changes branch...
git checkout content-changes

echo.
echo ===================================================
echo Successfully pushed to main! Vercel is deploying to production.
echo ===================================================
pause

