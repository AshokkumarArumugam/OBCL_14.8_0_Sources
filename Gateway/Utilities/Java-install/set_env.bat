@REM If IBM Websphere Application Server, specify APP_SERVER_NAME=WAS
@REM If Oracle 10g Application Server, specify APP_SERVER_NAME=OC4J
@REM If Oracle BEA Weblogic Application Server, specify APP_SERVER_NAME=WEBLOGIC

set APP_SERVER_NAME=WEBLOGIC
title KERNEL_%APP_SERVER_NAME%_SETUP

@REM Apllication Server Install directory.
set APP_SERVER_HOME=D:\bea

@REM If Application Server is Weblogic Provide Domain Name
set WL_DOMAIN=fcubs10.2

@REM Kernel Install directory.
set KERNEL_INSTALL_DIR=D:\Kernel10.2

@REM If ENTERPRISE QUEUE is IBM WebSphere MQ, specify IS_ENTERPRISE_QUEUE_WebSphereMQ=true
@REM If ENTERPRISE QUEUE is Oracle 10g Application Server Queue, specify IS_ENTERPRISE_QUEUE_WebSphereMQ=false
set IS_ENTERPRISE_QUEUE_WebSphereMQ=false

@REM Specify the following only if IS_ENTERPRISE_QUEUE_WebSphereMQ=true  
set IBM_WEBSPHERE_MQ_INSTALL_DIR=D:\Program Files\IBM\WebSphere MQ

@REM Set the User Home 
set USER_HOME=%USERPROFILE%

cd %APP_SERVER_NAME%
call set_path.bat
pause
cls
