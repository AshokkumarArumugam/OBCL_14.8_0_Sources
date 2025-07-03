echo Setting the Oracle Sid...!!!
SET ORACLE_SID=%1
echo ORACLE_SID SET AS ...!!! %ORACLE_SID%
echo Bouncing the DB...!!!
sqlplus "/as sysdba" @%2/Post_Clean.sql
echo Granting Rights...!!!
sqlplus "/as sysdba" @%2/grant.sql
echo Recompilation going on ...!!!
sqlplus -s fcj103/FCJ103 @%2/recomp.sql
echo Module_Status is genrating....!!!!
sqlplus -s fcj103/FCJ103 @%2/Module_Status.sql %2 %3