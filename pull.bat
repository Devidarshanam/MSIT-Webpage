@echo off
cd /d "%~dp0"
echo ===================================================
echo Completing merge and pulling latest remote changes...
echo ===================================================
echo.

git add .
git commit -m "merge: resolve merge conflicts with origin/main"
git pull origin main

echo.
echo ===================================================
echo All remote changes are successfully pulled and merged!
echo ===================================================
echo.
pause
