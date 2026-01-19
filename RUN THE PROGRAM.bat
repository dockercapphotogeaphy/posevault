@echo off
cd /d "%~dp0"

echo Installing dependencies...
call npm install
IF %ERRORLEVEL% NEQ 0 (
  echo.
  echo npm install failed. Fix the errors above and try again.
  pause
  exit /b %ERRORLEVEL%
)

echo.
echo Starting development server...
call npm run dev
IF %ERRORLEVEL% NEQ 0 (
  echo.
  echo Development server failed to start or crashed.
  echo Check the error messages above.
  pause
  exit /b %ERRORLEVEL%
)

pause