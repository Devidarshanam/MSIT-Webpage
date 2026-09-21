@echo off
cd /d "%~dp0"
echo ===================================================
echo Pulling latest changes from remote repository...
echo ===================================================
echo.

echo Staging local updates...
git add .
git -c core.editor=true rebase --continue 2>nul
git commit -m "chore: save local updates before pull" 2>nul
echo.
echo Pulling latest remote changes from GitHub...
git pull --rebase origin main

echo.
echo ===================================================
echo All remote changes successfully pulled and synced!
echo ===================================================
echo.
pause
