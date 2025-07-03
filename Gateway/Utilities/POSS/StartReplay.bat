@echo off

@REM JAVA HOME

set JAVA_HOME=C:\Program Files\Java\jdk1.6.0_16



SET PATH=%PATH%;%JAVA_HOME%\lib;

set classpath=%JAVA_HOME%\bin;%classpath%;ojdbc14.jar;


javac GWWriteHost.java

javac GWReadPoss.java

javac GWReplayRoutine.java



java GWReplayRoutine
