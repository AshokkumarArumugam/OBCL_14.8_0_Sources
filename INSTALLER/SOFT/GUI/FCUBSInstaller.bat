@ECHO OFF

REM Changing the screen size to a chosen size

set JAVA_TOOL_OPTIONS=-Dfile.encoding=ISO-8859-1
set PATH=
set PATH=%SystemRoot%\system32;%PATH%;
mode.com 80,50

ECHO.
ECHO Flex Cube UBS : Release 12.5.0.0.0 - Production on %TIME% %DATE%
ECHO.
ECHO Copyright (c) 2016, Oracle Financial Services Software Ltd. All rights reserved.
ECHO.
IF EXIST src\com\ofss\installer (
set InstallationShipment="SOFT"
)
IF NOT EXIST src\com\ofss\installer  (
set InstallationShipment="EXEC"
)

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
IF EXIST chk.flg (
	ECHO Installer is already running.
	ECHO Please manually delete the chk.flg file in order to continue.
	ECHO.
	PAUSE
	EXIT
)

ECHO Creating a new flag file.....
REM. > chk.flg
ECHO sucessfully created the flag File.
ECHO.

set PATH=
set JAVA_HOME=
set ORACLE_HOME=
SET APPSERVER_HOME=
GOTO :START

:START
set PATH=%SystemRoot%\system32;%PATH%;
SET LOAD_ENV_VARIABLES=N
SET CURRDIR=%~dp0

if exist "%CURRDIR%\logs\env.properties" (
GOTO :GETENV
) else (
GOTO :READJAVA
)

:GETENV
ECHO.
ECHO Loading Environment Variables....
ECHO.
REM Reading env.properties to fetch and set the previously set environment variables
for /f "tokens=1,2 delims==" %%G in (%CURRDIR%\logs\env.properties) do set %%G=%%H
echo this javahome %JAVA_HOME%
SET PATH=%JAVA_HOME%\bin;%PATH%;
echo this path  %PATH%
SET PATH=%APPSERVER_HOME%\bin;%PATH%;
IF EXIST "%WEBLOGIC_HOME%\server\lib\weblogic.jar" (
SET APPSERVER_HOME=%WEBLOGIC_HOME%
SET PATH=%APPSERVER_HOME%\bin;%PATH%;
)

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


SET PATH=%ORACLE_HOME%\bin;%PATH%;

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
	ECHO Oracle Home set
	GOTO :READORACLE

:CLEAR
(
	ECHO Clearing the compiled files.....

	ECHO Clearing the jar file.
	del /F FcubsInstaller.jar 2>NUL
	IF EXIST src\com\ofss\installer (
	ECHO Clearing the compiled classes files.
	RD /S /Q classes 2>NUL
	)
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
IF EXIST "%ORACLE_HOME%\jdbc\lib\%ojdbc_file%" (
	ECHO Jar to be copied from %ORACLE_HOME%\jdbc\lib\%ojdbc_file%
	ECHO Copying jars into the Library...
	copy "%ORACLE_HOME:/=\%\jdbc\lib\%ojdbc_file%" ".\Library\common\"
	copy "%ORACLE_HOME:/=\%\ucp\lib\ucp.jar" ".\Library\common\"
	copy "%ORACLE_HOME:/=\%\jlib\oraclepki.jar" ".\Library\common\"
	copy "%ORACLE_HOME:/=\%\jlib\osdt_cert.jar" ".\Library\common\"
	copy "%ORACLE_HOME:/=\%\jlib\osdt_core.jar" ".\Library\common\"
		)
	ECHO.
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
	ECHO.
	)
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
	GOTO :COMPILE
	)
	)
	GOTO :BUILD
	
:SET WEBLOGIC HOME
IF %InstallationShipment%=="SOFT" (	
	ECHO @@@@@@WEBLOGIC HOME NOT DEFINED@@@@@@
	SET /p WEBLOGIC_HOME=Enter WEBLOGIC HOME Directory:	
	GOTO :CHK WEBLOGIC HOME
)		

	
:COMPILE 
(
	ECHO Compiling the sources Start..... 
	
	ECHO Create classes folder.
	mkdir classes
	ECHO Setting class path to compile the sources.
	SET CLASSPATH=Library\common\commons-codec-1.17.1.jar;Library\common\%ojdbc_file%;Library\oracle\ucp.jar;Library\installer\ant-1.10.15\lib\ant-launcher.jar;Library\installer\ant-1.10.15\lib\ant.jar;Library\application\sshd-core-2.14.0.jar;Library\application\sshd-sftp-2.14.0.jar;Library\application\sshd-common-2.14.0.jar;Library\plugin-quartz\slf4j-api-2.0.16.jar;Library\common\log4j-1.2-api-2.24.1.jar;Library\common\log4j-api-2.24.1.jar;Library\common\log4j-core-2.24.1.jar;Library\common\commons-io-2.16.1.jar;Library\installer\compiler_unshaded_deploy.jar;%CLASSPATH%;
	ECHO Classpath Sucessfully set.

	REM javac -encoding ISO-8859-1 -d .\classes src\com\ofss\installer\*.java src\com\ofss\installer\common\build\*.java src\com\ofss\installer\common\compile\*.java src\com\ofss\installer\common\copy\*.java src\com\ofss\installer\common\propertyFile\*.java src\com\ofss\installer\common\deploy\*.java  src\com\ofss\installer\fcel\common\*.java src\com\ofss\installer\fcel\build\*.java src\com\ofss\installer\fcis\common\*.java src\com\ofss\installer\fcis\database\*.java src\com\ofss\installer\fcubs\common\*.java src\com\ofss\installer\fcubs\database\*.java src\com\ofss\installer\gateway\common\*.java  src\com\ofss\installer\odt\common\*.java src\com\ofss\installer\odt\build\*.java src\com\ofss\installer\odt\database\*.java src\com\ofss\installer\fcubs\switchIntegration\*.java src\com\ofss\installer\fcubs\switchIntegration\monitorSetup\*.java src\com\ofss\installer\utility\*.java src\com\ofss\installer\common\database\*.java src\com\ofss\installer\executility\common\*.java src\com\ofss\installer\reportsDSN\common\*.java src\com\ofss\installer\rmanBckup\common\*.java src\com\ofss\installer\userCreation\common\*.java src\com\ofss\installer\ENVProp\common\*.java src\com\ofss\installer\fisReports\common\*.java>> logs/build.log
	
	javac -encoding ISO-8859-1 -d .\classes src\com\ofss\installer\*.java src\com\ofss\installer\silent\*.java src\com\ofss\installer\common\build\*.java src\com\ofss\installer\common\compile\*.java src\com\ofss\installer\common\copy\*.java src\com\ofss\installer\common\propertyFile\*.java src\com\ofss\installer\common\deploy\*.java  src\com\ofss\installer\fcel\common\*.java src\com\ofss\installer\fcel\database\*.java src\com\ofss\installer\fcel\build\*.java src\com\ofss\installer\fcis\common\*.java src\com\ofss\installer\fcis\database\*.java src\com\ofss\installer\fcpm\database\*.java src\com\ofss\installer\fcubs\common\*.java src\com\ofss\installer\fcubs\database\*.java src\com\ofss\installer\gateway\common\*.java  src\com\ofss\installer\odt\common\*.java src\com\ofss\installer\odt\build\*.java src\com\ofss\installer\odt\database\*.java src\com\ofss\installer\fcubs\switchIntegration\*.java src\com\ofss\installer\fcubs\switchIntegration\monitorSetup\*.java src\com\ofss\installer\utility\*.java src\com\ofss\installer\common\database\*.java src\com\ofss\installer\executility\common\*.java src\com\ofss\installer\reportsDSN\common\*.java src\com\ofss\installer\rmanBckup\common\*.java src\com\ofss\installer\userCreation\common\*.java src\com\ofss\installer\ENVProp\common\*.java src\com\ofss\installer\scheduler\build\*.java src\com\ofss\installer\fisReports\common\*.java src\com\ofss\installer\ofsaaint\common\*.java  src\com\ofss\installer\fcm\build\*.java src\com\ofss\installer\EntityDetails\common\*.java src\com\ofss\installer\blockChain\build\*.java src\com\ofss\installer\paysch\build\*.java src\com\ofss\installer\depXML\common\*.java src\com\ofss\installer\oltp\build\*.java src\com\ofss\installer\reportsSMDSN\common\*.java>> logs/build.log
	if errorlevel 1 (	
		ECHO.
		ECHO *****************************************************
		ECHO ****************COMPILATION FAILED*******************
		ECHO *****************************************************
		ECHO **Please refer the log file located under logs\build.log
		ECHO **Possible reason may be that one of the bellow mentioned
		ECHO **library files are missing.
		REM ECHO ****Library\installer\swing-layout-1.0.4.jar
		REM ECHO ****Library\common\xml-apis-2.11.0.jar
		ECHO ****Library\common\commons-codec-1.17.1.jar
		ECHO ****Library\common\ojdbcX.jar where X refers to latest version of ojdbc
		REM ECHO ****Library\installer\swing-layout-1.0.4.jar
		ECHO ****Library\installer\ant-1.10.15\lib\ant-launcher.jar
		ECHO ****Library\installer\ant-1.10.15\lib\ant.jar
		ECHO ****Library\common\log4j-core-2.24.1.jar
		ECHO ****Library\common\commons-io-2.16.1.jar
		REM ECHO ****Library\common\xercesImpl-2.11.0.jar
		ECHO ****Library\installer\compiler_unshaded_deploy.jar
		ECHO *****************************************************
		ECHO.
		
		REM Start NOTEPAD logs/build.log
		ECHO Deleting the Flag file chk.flg.
		DEL chk.flg
		
		PAUSE
	)
	
	ECHO Compiled sources successfully.
	ECHO.
)


:BUILD  
(
IF %InstallationShipment%=="EXEC" (	
	SET CLASSPATH=Library\common\commons-codec-1.17.1.jar;Library\common\%ojdbc_file%;Library\common\ucp.jar;Library\common\oraclepki.jar;Library\common\osdt_cert.jar;Library\common\osdt_core.jar;Library\application\commons-dbcp2-2.1.jar;Library\application\commons-pool-2.2.jar;Library\application\commons-collections.jar;Library\application\sshd-core-2.14.0.jar;Library\application\sshd-sftp-2.14.0.jar;Library\application\sshd-common-2.14.0.jar;Library\installer\ant-1.10.15\lib\ant-launcher.jar;Library\installer\ant-1.10.15\lib\ant.jar;Library\common\log4j-core-2.24.1.jar;Library\common\log4j-api-2.24.1.jar;Library\common\commons-io-2.16.1.jar;Library\installer\compiler_unshaded_deploy.jar;%CLASSPATH%;
	)
	ECHO Building the jar file Starts....
	
	ECHO Copying the property files into Classes.
	XCOPY src\log4j2.properties 	classes	/Y /E /Q>NUL
	
	ECHO Creating Images directory under Classes.
	mkdir classes\Images 2>NUL
	
	ECHO Copying Images from src folder to classes\Images.
	XCOPY src\Images\*.* classes\Images	/Y /E /Q>NUL
	
	ECHO Creating META-INF directory under Classes.
	mkdir classes\META-INF 2>NUL
	
	ECHO Copying MANIFEST.MF into Classes\META-INF.
	COPY config\Jar_MANIFEST\MANIFEST.MF classes\META-INF /Y>NUL
	
	cd classes
	
	ECHO Building the jar file.
	jar -cMf ../FcubsInstaller.jar META-INF/MANIFEST.MF *
	cd..
	
	ECHO Removing the Classes folder.
	REM RD /S /Q classes	
	
	ECHO Building jar is done.
	ECHO.
	
)


	
:CHECKFORSILENT
(
if "%1%"=="/s" (
	ECHO Options /s AB/DB ConfigfilePath  %*
	set ApplicationType=%~2
	set ConfigPath=%~3
	GOTO :APPTYPE
	GOTO :CONFPath
	)
if not "%1%"=="/s" (
	ECHO Running Installer in UI Mode...
	ECHO For Running Installer in Silent Mode give /s commond line argument to Batch file
	GOTO :RUNINSTALLER
)
)	

:APPTYPE
(	
	if not "%ApplicationType%"=="AB" (
	if not "%ApplicationType%"=="DB" (
	if not "%ApplicationType%"=="UC" (
	if not "%ApplicationType%"=="EU" (
	if not "%ApplicationType%"=="RP" (	
	if not "%ApplicationType%"=="CS" (	
	if not "%ApplicationType%"=="FM" (	
	if not "%ApplicationType%"=="PS" (
	if not "%ApplicationType%"=="PG" (
	if not "%ApplicationType%"=="IH" (
	if not "%ApplicationType%"=="SC" (
	if not "%ApplicationType%"=="FCPM" (
	SET /p ApplicationType=Enter AB for Application Build or DB for DataBase Build or UC for User Creation or EU for Exec Utility or RP for DSN Entries or CS for CrossScript or FM for FCM Build or PS for Payment scheduler Build or PG for Payment Gateway Build or IH for Internal Handsoff Grants or SC for Scheduler Build or FCPM for FCPM database Installation:
	GOTO :APPTYPE
	)
	)
	)
	)
	)
	)
	)
	)	
	)
	)
	)
	)
	GOTO :CONFPath
)

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
	SET CLASSPATH=Library\common\commons-codec-1.17.1.jar;Library\common\%ojdbc_file%;Library\oracle\ucp.jar;Library\installer\ant-1.10.15\lib\ant-launcher.jar;Library\installer\ant-1.10.15\lib\ant.jar;Library\application\sshd-core-2.14.0.jar;Library\application\sshd-sftp-2.14.0.jar;Library\application\sshd-common-2.14.0.jar;Library\common\log4j-api-2.24.1.jar;Library\common\log4j-core-2.24.1.jar;Library\common\commons-io-2.16.1.jar;Library\installer\compiler_unshaded_deploy.jar;%CLASSPATH%;
	set CLASSPATH=FCUBSInstaller.jar;%CLASSPATH%
	
	ECHO %InstallationShipment%
	if "%1%"=="/s" (
	ECHO Running in Silent Mode
	java com.ofss.installer.FcubsInstaller %InstallationShipment% %ApplicationType% %ConfigPath% "%JAVA_HOME%" "%APPSERVER_HOME%" "%ORACLE_HOME%" "%WEBLOGIC_HOME%" %LOAD_ENV_VARIABLES% 
	)
	if not "%1%"=="/s" (
	ECHO Running in UI Mode
	REM start javaw -Dsun.java2d.d3d=false -Xmx1g -XX:MaxPermSize=256m -jar FCUBSInstaller.jar "%JAVA_HOME%" "%APPSERVER_HOME%" "%ORACLE_HOME%" "%WEBLOGIC_HOME%" %LOAD_ENV_VARIABLES%
	java com.ofss.installer.FcubsInstaller "%JAVA_HOME%" "%APPSERVER_HOME%" "%ORACLE_HOME%" "%WEBLOGIC_HOME%" "%LOAD_ENV_VARIABLES%" "ALL"
	)
	ECHO Deleting the Flag file chk.flg.
	DEL chk.flg
)

:EXITINSTALLER
	ECHO Deleting the Flag file chk.flg.
	DEL chk.flg
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
	CALL FCUBSInstaller.bat
	)


