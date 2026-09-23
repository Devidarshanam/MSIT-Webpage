@echo off
cd /d "%~dp0"
echo ===================================================
echo Archiving all 7 slides to 'archive/all-7-slides'...
echo ===================================================
echo.

echo 1. Staging current state...
git add .
git commit -m "chore: preserve complete 7 slides before streamlining"

echo.
echo 2. Creating archive branch 'archive/all-7-slides'...
git branch -D archive/all-7-slides 2>nul
git checkout -b archive/all-7-slides

echo.
echo 3. Pushing 'archive/all-7-slides' to GitHub...
git push -u origin archive/all-7-slides --force

echo.
echo 4. Returning to main branch...
git checkout main

echo.
echo ===================================================
echo SUCCESS! All 7 slides safely archived on GitHub:
echo Branch: archive/all-7-slides (Never merged with main)
echo You are now back on: main
echo ===================================================
echo.
pause
