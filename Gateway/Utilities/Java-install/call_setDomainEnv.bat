@echo off

IF %WL_DOMAIN%==. (
echo Error : Domain name is not specified !!!
) 
call %APP_SERVER_HOME%\user_projects\domains\%WL_DOMAIN%\bin\setDomainEnv.cmd

cd %KERNEL_INSTALL_DIR%\GW_WS\setup\%APP_SERVER_NAME%