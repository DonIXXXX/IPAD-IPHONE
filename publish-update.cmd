@echo off
cd /d "%~dp0"
set "PATH=C:\Program Files\Git\cmd;%PATH%"
set /p MSG="Describe this update (e.g. Added Bluetooth guide): "
call npx eas-cli@latest update --branch main --message "%MSG%" --environment production --platform ios
pause
