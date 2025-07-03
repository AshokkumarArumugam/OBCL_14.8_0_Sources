@ECHO OFF

REM Changing the screen size to a chosen size
REM set PATH=%SystemRoot%\system32;%PATH%;
REM mode.com 80,50
ECHO.
ECHO Developer WorkBench For FLEXCUBE UBS : 12.5.0.0.0 
ECHO.
ECHO Copyright (c) 2014, Oracle Financial Services Software Ltd. All rights reserved.
if exist "%CD%\resource\SilentOdt.properties" (
set "propertyfile=%CD%\resource\SilentOdt.properties"
) else (
echo SilentOdt.properties doesnt exist
)
for /F "tokens=1,2 delims==" %%G in (%CD%\resource\SilentOdt.properties) do set %%G=%%H
set localjavahome=%JAVA_HOME%
set version=%odtVersion%
echo SilentODT version : %version%
REM if exist "%localjavahome%\lib\tools.jar" (
REM GOTO :SETJAR
REM ) else (
REM echo Unable to load tools.jar from the JAVA_HOME mentioned in SilentOdt.properties. Please specify proper JAVA_HOME ..
REM GOTO :END
REM )

:SETJAR

echo java home is %localjavahome%
set PATH=%localjavahome%\bin;%PATH%
set CLASSPATH=%localjavahome%\lib\jakarta.xml.bind-api.jar
 
   java.exe -cp "lib\*;%CLASSPATH%" com.ofss.tools.odt.silent.SilentOdt
   if errorlevel 1 (	
		ECHO.
		ECHO *****************************************************
		ECHO ****************OPERATION FAILED*******************
		ECHO *****************************************************
		ECHO ***********Please refer the log file ***************
	)

:END	
REM PAUSE.
ECHO.