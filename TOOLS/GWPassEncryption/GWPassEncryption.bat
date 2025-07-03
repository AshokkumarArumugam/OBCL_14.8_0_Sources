@echo off
Echo Enter Password: 
set /p password=
Echo Enter Message Id: 
set /p messageId=

Echo Encrypted Password::::
java -jar GWPassEncryption.jar %password% %messageId% 


pause 