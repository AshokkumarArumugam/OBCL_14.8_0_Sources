set ORACLE_SID=%1
Echo ORACLE SID IS %1...!!!
sqlplus fcj103/FCJ103 @%2
echo Granting the rights....!!!!
sqlplus "/as sysdba" @$3/grant.sql
echo Compilation the Invalids....!!!!
sqlplus -s fcj103/FCJ103 @$3/recomp.sql
echo Check the status below...!!!!
sqlplus -s fcj103/FCJ103 @$3/FCUBS_Status.sql
exit