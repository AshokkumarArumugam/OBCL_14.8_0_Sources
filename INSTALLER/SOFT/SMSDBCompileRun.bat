@ECHO OFF

REM Changing the screen size to a chosen size

set JAVA_TOOL_OPTIONS=-Dfile.encoding=ISO-8859-1
set PATH=
set PATH=%SystemRoot%\system32;%PATH%
mode.com 80,50

ECHO.
ECHO Flex Cube UBS : Release 12.4.0.0.0 - Production on %TIME% %DATE%
ECHO.
ECHO Copyright (c) 2016, Oracle Financial Services Software Ltd. All rights reserved.
ECHO.

set InstallationShipment="SOFT"


ECHO Checking the write permissions.....
mkdir a
if errorlevel 1 (
	ECHO **WRITE permission on the current Folder is not Avaialable.
	ECHO.
	PAUSE
	EXIT
)
ECHO.

rmdir a 2>NUL
REM cd config\PropertyFiles
REM ATTRIB -R
REM cd..
REM cd..
ECHO checking whether Installer is running.....
IF EXIST SMSDBCompileChk.flg (
	ECHO Installer is already running.
	ECHO Please manually delete the SMSDBCompileChk.flg file in order to continue.
	ECHO.
	PAUSE
	EXIT
)

ECHO Creating a new flag file.....
REM. > SMSDBCompileChk.flg
ECHO sucessfully created the flag File.
ECHO.

GOTO :START

:START
set PATH=%SystemRoot%\system32;%PATH%
SET LOAD_ENV_VARIABLES=N
SET CURRDIR=%~dp0
SET USERDIR=%1

IF "%USERDIR%"=="" (
ECHO Defaulting env.properties Location
SET USERDIR=%CURRDIR%\logs\env.properties
)

if exist "%USERDIR%" (
GOTO :GETENV
) else (
GOTO :READJAVA
)

:GETENV
ECHO.
ECHO Copying env.properties to Local Directory
copy "%USERDIR%" "%CURRDIR:/=\%\logs\env.properties"
ECHO Loading Environment Variables....
ECHO.
REM Reading env.properties to fetch and set the previously set environment variables
for /f "tokens=1,2 delims==" %%G in (%CURRDIR%\logs\env.properties) do set %%G=%%H
echo this javahome %JAVA_HOME%
SET PATH=%JAVA_HOME%\\bin;%PATH%
echo this path  %PATH%
SET PATH=%APPSERVER_HOME%\bin;%PATH%
IF EXIST "%WEBLOGIC_HOME%\server\lib\weblogic.jar" (
SET APPSERVER_HOME=%WEBLOGIC_HOME%
SET PATH=%APPSERVER_HOME%\bin;%PATH%
)
SET ConfigPath=%ConfigPath%
setlocal enabledelayedexpansion
set max=0
cd /d %ORACLE_HOME%\jdbc\lib\
for /f "delims=ojdbc*." %%f in ('dir /b ^|findstr ojdbc[0-9]*.jar') do (
  if %%f GTR !max! (
  set max=%%f
)
 )
 REM bug#31876599
 if %max% GEQ 8 (
   SET ojdbc_file=ojdbc8.jar
 ) else (
   SET ojdbc_file=ojdbc%max%.jar
 )
 ECHO %ojdbc_file%
 cd /d %CURRDIR%
IF NOT EXIST "%ORACLE_HOME%\jdbc\lib\%ojdbc_file%" (
ECHO Invalid ORACLE Home.
	IF "%ORACLE_HOME%"=="" (
	ECHO @@@@@@ORACLE HOME NOT DEFINED@@@@@@
	)
	ECHO Database Installation will not be supported.
)


SET PATH=%ORACLE_HOME%\bin;%PATH%

SET LOAD_ENV_VARIABLES=Y
GOTO :CLEAR

:READJAVA

ECHO Initializing the errorLevel to 0
ECHO.
ver > nul

ECHO Checking Java Home..... 
REM javac -version 2>NUL
REM if errorlevel 1 (
REM 	ECHO Unable to Find Java Home.
REM 	ECHO Please input Java path [Example: D:\Program Files\Java\jdk1.6.0_17]	
REM 	GOTO :SETJAVA
REM )
REM 
REM if errorlevel 0 (
REM 	ECHO Java Home Path has been set sucessfully.
REM 	ECHO. 
REM 	set JAVA_HOME=%javahome%
REM 	set PATH=%JAVA_HOME%\bin;%PATH%;
REM 	GOTO :CLEAR
REM )
IF NOT EXIST "%JAVA_HOME%\bin\javac.exe" (
		ECHO Please input Java path [Example: D:\Program Files\Java\jdk1.6.0_17]	
		GOTO :SETJAVA
) else (
		ECHO Java Home Path has been set sucessfully.
		ECHO.
		GOTO :READORACLE
)	

:SETJAVA

REM IF "%JAVA_HOME%"=="" (
	ECHO @@@@@@JAVAHOME NOT DEFINED@@@@@@
	SET /p javahome=Enter JAVA HOME Directory:
	set JAVA_HOME=%javahome%
	set PATH=%JAVA_HOME%\bin;%PATH%;
REM ) else	(
	ECHO JAVA_HOME has been set	
REM )	
GOTO :READJAVA	

:READORACLE
setlocal enabledelayedexpansion
set max=0
cd /d %ORACLE_HOME%\jdbc\lib\
for /f "delims=ojdbc*." %%f in ('dir /b ^|findstr ojdbc[0-9]*.jar') do (
  if %%f GTR !max! (
  set max=%%f
)
 )
 REM bug#31876599
 if %max% GEQ 8 (
   SET ojdbc_file=ojdbc8.jar
 ) else (
   SET ojdbc_file=ojdbc%max%.jar
 )
 ECHO %ojdbc_file%
 cd /d %CURRDIR%
IF NOT EXIST "%ORACLE_HOME%\jdbc\lib\%ojdbc_file%" (
	GOTO :SETORACLE
) else (
	ECHO Oracle Home set succesfully
	GOTO :CLEAR
)

	
:SETORACLE
	ECHO @@@ORACLE HOME NOT DEFINED@@@
	set /p orahome=Enter Oracle Home Directory:
	set ORACLE_HOME=%orahome%
	SET PATH=%ORACLE_HOME%\bin;%PATH%;
	ECHO 
	ECHO Oracle Home set
	GOTO :READORACLE

:CLEAR
(
	SET CLASSPATH = %ORACLE_HOME%\jdbc\lib\%ojdbc_file%;%CLASSPATH%;
	GOTO :CHECK LOG FOLDER
)

:CHECK LOG FOLDER
(	
	ECHO Checking logs Folder.....
	IF NOT EXIST logs (
		ECHO logs Directory missing
		ECHO Creating logs folder
		ECHO.
		mkdir logs
	)

	ECHO --Current Folder--
	ECHO --avast--
	echo this InstallationShipment %InstallationShipment%

)

:CHK APPSERVER HOME
	ECHO Inside Checking APPSERVER HOME.....
	echo appserverhome %APPSERVER_HOME%
	SET CLASSPATH = %APPSERVER_HOME%\bin;%CLASSPATH%;
	IF NOT EXIST src\com\ofss\installer (
	IF NOT EXIST "%APPSERVER_HOME%\server\lib\weblogic.jar" (
	REM ECHO Deployment on WEBLOGIC Application Server will not be supported.
	GOTO :SET APPSERVER HOME
	)
	else
	GOTO :CHK WEBLOGIC HOME
  )
	
:SET APPSERVER HOME
	IF "%APPSERVER_HOME%"=="" (
	ECHO @@@@@@APPSERVER HOME NOT DEFINED@@@@@@
	SET /p APPSERVER_HOME=Enter APPSERVER HOME Directory:
	)	
	GOTO :CHK APPSERVER HOME


:CHK WEBLOGIC HOME
    IF %InstallationShipment%=="SOFT" (	
	ECHO Inside Checking WEBLOGIC HOME.....
	echo wlhome %WEBLOGIC_HOME%
	IF NOT EXIST "%WEBLOGIC_HOME%\server\lib\weblogic.jar" (
	GOTO :SET WEBLOGIC HOME
	)	
	echo wlhome %WEBLOGIC_HOME%
	REM set PATH=
	SET CLASSPATH=%WEBLOGIC_HOME%\server\lib\weblogic.jar;%JAVA_HOME%\lib\tools.jar;%CLASSPATH%;
	echo CLASSPATH is --------------------------
	echo %CLASSPATH%
	echo -------------------------------
	REM SET WL_HOME=%WL_HOME%
	REM set PATH=%SystemRoot%\system32;%PATH%;
	REM SET PATH=%JavaHome%\bin;%PATH%	
	SET PATH=%WEBLOGIC_HOME%\bin;%PATH%
	IF %InstallationShipment%=="SOFT" (	
	GOTO :CONFPath
	)
	)
	GOTO :CONFPath
	
:SET WEBLOGIC HOME
IF %InstallationShipment%=="SOFT" (	
	ECHO @@@@@@WEBLOGIC HOME NOT DEFINED@@@@@@
	SET /p WEBLOGIC_HOME=Enter WEBLOGIC HOME Directory:	
	GOTO :CHK WEBLOGIC HOME
)		

set ApplicationType="EU"


:CONFPath
(
	if NOT EXIST "%ConfigPath%" (
	SET /p ConfigPath=Enter Valid Path of Configuration file:
	GOTO :CONFPath
	)	
	GOTO :RUNINSTALLER

)


:RUNINSTALLER
(
	ECHO Running Installer.....
	set CLASSPATH=SMSExecDBCompile.jar;%CLASSPATH%
	
	
	ECHO %ORACLE_HOME%
	
	ECHO %InstallationShipment%

	ECHO Running in Silent Mode
	set JAVA_DEBUG=-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8123
	java %JAVA_DEBUG% com.ofss.genericsoftinstaller.sms.SMS_ExecDBCompile %InstallationShipment% %ApplicationType% "%ConfigPath%" "%JAVA_HOME%" "%APPSERVER_HOME%" "%ORACLE_HOME%" "%WEBLOGIC_HOME%" %LOAD_ENV_VARIABLES% 
	
	ECHO Deleting the Flag file SMSDBCompileChk.flg.
	DEL SMSDBCompileChk.flg
)

:EXITINSTALLER
	ECHO Deleting the Flag file SMSDBCompileChk.flg.
	DEL SMSDBCompileChk.flg
	REM Setting LOAD_ENV_VARIABLES to empty
	SET LOAD_ENV_VARIABLES=
	REM load property file
	REM Reading env.properties to fetch and set the previously set environment variables
	for /f "tokens=1,2 delims==" %%G in (%CURRDIR%\logs\env.properties) do set %%G=%%H
	SET VAREDITED=%varedited%
	IF "%VAREDITED%"=="Y" (
	ECHO @@@@@@ Restarting the INSTALLER @@@@@@@
	ECHO @@@@@@ Restarting the INSTALLER @@@@@@@
	cd %~dp0
	CALL SMSDBCompileRun.bat
)