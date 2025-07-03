::==sortDup.bat
@echo off
setlocal
if {%1} EQU {} goto syntax
if not exist %1 goto syntax
set file=%1
set file="%file:"=%"
set work=%TEMP%\%~nx1
set work="%work:"=%"
set work=%work:\\=\%
sort %file% /O %work%
del /f /q %file%
for /f "Tokens=*" %%s in ('type %work%') do set record=%%s&call :output 
endlocal
goto :EOF
:syntax
@echo ***************************
@echo Syntax: SortDup Input_File 
@echo ***************************
endlocal
goto :EOF
:output
if not defined prev_rec goto write
if "%record%" EQU "%prev_rec%" goto :EOF
:write
@echo %record%>>%file%
set prev_rec=%record%

