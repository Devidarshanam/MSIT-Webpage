@echo off
cd /d "%~dp0"
echo ===================================================
echo Starting MSIT Local Development Server...
echo Opening: http://localhost:3000
echo ===================================================
echo.
start http://localhost:3000
npm run dev
pause
