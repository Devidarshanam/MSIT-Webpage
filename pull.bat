@echo off
cd /d "%~dp0"
echo ===================================================
echo Fetching and pulling all changes from remote repo...
echo ===================================================
echo.

git fetch --all --prune
git pull origin main

echo.
echo ===================================================
echo All remote changes successfully pulled!
echo ===================================================
pause
