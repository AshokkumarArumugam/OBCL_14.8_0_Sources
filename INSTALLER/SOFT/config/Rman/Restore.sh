export ORACLE_SID=$1
cd $2
tar xvf Install_dbf.tar 
for i in `ls -1 | grep dbf.zip$`; do unzip $i;done
rman target / @convertscript.rman
sqlplus "/as sysdba" @$3/Restore.sql
sqlplus "/as sysdba" @transportscript.sql
rm *.dbf.zip
rm *.dbf
exit
