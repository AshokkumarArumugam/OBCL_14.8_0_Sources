@REM set the classpath
set classpath=..\classes;%classpath%

@REM clear the screen
cls

@REM Call Password Encrypter
java com.iflex.fcubs.gwutil.GWPwdEnc
pause
cls
