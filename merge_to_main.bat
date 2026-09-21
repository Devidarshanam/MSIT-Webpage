@echo off
cd /d "%~dp0"
echo ===================================================
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
echo ===================================================
pause
