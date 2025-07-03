@echo on

@REM JAVA HOME 
set JAVA_HOME=%APP_SERVER_HOME%\jdk160_0

@REM J2EE HOME 
set J2EE_HOME=%APP_SERVER_HOME%\wlserver_10.3\server

@REM WL HOME 
set WL_HOME=%APP_SERVER_HOME%

@REM DOMAIN HOME 
set DOMAIN_HOME=%APP_SERVER_HOME%\user_projects\domains\%WL_DOMAIN%

@REM ANT HOME
set ANT_HOME=%APP_SERVER_HOME%\modules\org.apache.ant_1.6.5

set path=%path%;%JAVA_HOME%\bin;%ANT_HOME%\bin;

set classpath = %CLASSPATH%;

set ANT_OPTS=-Xmx512M

