@echo off

@REM specify the service name as commnad line argument

set /p SERVICE_NAME=Enter SERVICE NAME :

IF %SERVICE_NAME%==. (
echo Error : Service name is not specified !!!
) 

cd %APP_SERVER_NAME%
