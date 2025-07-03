echo "Seting the Oracle Sid...!!!"
export ORACLE_SID=$1
echo "ORACLE_SID SET AS ...!!!"$ORACLE_SID
sqlplus "/as sysdba" @$2/Post_Clean.sql
sqlplus "/as sysdba" @$2/grant.sql
echo "Granting the required Privlege done...!!!"
echo "Recompilation will start now...!!!"
sqlplus -s fcj103/FCJ103 @$2/recomp.sql
echo "Now check the Status....!!!"
sqlplus -s fcj103/FCJ103 @$2/Module_Status.sql $2 $3
