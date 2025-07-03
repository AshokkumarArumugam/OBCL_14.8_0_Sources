export ORACLE_SID=$1
sqlplus fcj103/FCJ103 @$2
echo "Granting the required Privlege ...!!!"
sqlplus "/as sysdba" @$3/grant.sql
echo "Recompilation will start now...!!!"
sqlplus -s fcj103/FCJ103 @$3/recomp.sql
echo "Now check the Status....!!!"
sqlplus -s fcj103/FCJ103 @$3/FCUBS_Status.sql
exit
