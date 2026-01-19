@echo off
cd /d "%~dp0"

echo Installing dependencies...
npm install
IF %ERRORLEVEL% NEQ 0 (
  echo.
  echo npm install failed. Fix the errors above and try again.
  pause
  exit /b %ERRORLEVEL%
)

echo.
echo Starting development server...
npm run dev

pause