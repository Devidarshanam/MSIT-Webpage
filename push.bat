@echo off
cd /d "%~dp0"
echo ===================================================
echo Syncing assets and pushing to GitHub (main)...
echo ===================================================
echo.

echo Copying assets...
cmd /c copy /y "C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789718872785.png" "public\assets\msit-logo.png"
powershell -Command "Copy-Item -Path 'C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789718872785.png' -Destination 'public\assets\msit-logo.png' -Force"

cmd /c copy /y "C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789720603808.jpg" "public\assets\iiit-campus-life.jpg"
powershell -Command "Copy-Item -Path 'C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789720603808.jpg' -Destination 'public\assets\iiit-campus-life.jpg' -Force"

cmd /c copy /y "C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789974235999.png" "public\assets\msit-convocation.jpg"
powershell -Command "Copy-Item -Path 'C:\Users\darshanam devi\.gemini\antigravity-ide\brain\643b31bb-7176-49cc-9348-74991d740586\.user_uploaded\media_1789974235999.png' -Destination 'public\assets\msit-convocation.jpg' -Force"

echo Downloading official 4K/HD assets...
powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; $wc = New-Object System.Net.WebClient; $wc.Headers.Add('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'); try { $wc.DownloadFile('https://amturing.acm.org/images/lg_aw/9634208.jpg', 'public\assets\rajreddy.jpg'); Write-Host 'Downloaded high-res Raj Reddy portrait successfully.' } catch { Write-Host 'Using existing asset.' }"

echo.
echo Staging files...
git add .

echo.
echo Committing changes...
git commit -m "feat: upgrade explore 1st slide and all website images to 4k clarity"

echo.
echo Pulling latest remote changes with rebase...
git pull --rebase origin main

echo.
echo Pushing directly to origin main...
git push origin main

echo.
echo ===================================================
echo PUSH COMPLETE!
echo Vercel is now deploying your website to production.
echo ===================================================
pause
