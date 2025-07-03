@echo off

@REM JAVA HOME 

set JAVA_HOME=C:\Program Files\Java\jdk1.6.0_16



SET PATH=%PATH%;%JAVA_HOME%\bin;

set classpath=%JAVA_HOME%\bin;%classpath%;xercesImpl.jar;


javac GWChngPOSSState.java



java GWChngPOSSState
