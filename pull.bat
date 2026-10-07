@echo off
cd /d "%~dp0"
echo ===================================================
echo Fetching and pulling all changes from remote repo...
echo ===================================================
echo.

git fetch --all --prune --tags
git stash -u
git pull --rebase origin main
git stash pop

echo.
echo ===================================================
echo All remote changes successfully pulled!
echo ===================================================
pause
