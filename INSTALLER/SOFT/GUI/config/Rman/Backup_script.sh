export ORACLE_SID=$1

echo "The Oracle SID is "$ORACLE_SID

chkup=`(ps -eaf |grep pmon |grep $ORACLE_SID |wc -l)`

echo $chkup

if [ $chkup -eq 1 ]
then
	echo "Database is up and running....!!!!"
sqlplus -s / as sysdba <<EOF
!echo "Shutting down the DB...!!!!"
shutdown immediate
!echo "Starting up the DB in mount stage....!!!!"
startup mount
!echo "Opening the DB in READ ONLY Mode....!!!!"
alter database open read only;
!echo "Now DB is in READ ONLY Mode.....!!!"
EOF
else
sqlplus -s / as sysdba <<EOF
!echo "Starting up the DB in mount stage....!!!!"
startup mount
!echo "Opening the DB in READ ONLY Mode....!!!!"
alter database open read only;
!echo "Now DB is in READ ONLY Mode.....!!!!"
EOF

fi

if [ -f $2/Install_dbf.tar ]
then
	echo "File Tar Already Exists Deleting now ...!!!!"
	rm Install_dbf.tar
fi

if [ -f $2/Install_dbf.tar.gz ]
then
	echo "File GZ Already Exists deleting now....!!!!"
	rm Install_dbf.tar.gz
fi

sqlplus -s / as sysdba <<EOF
SET ECHO OFF
SET TRIMOUT OFF
SET TRIMSPOOL ON
SET HEADING OFF
SET FEEDBACK OFF
SET PAGESIZE 0
SET LINESIZE 320
SET VERIFY OFF
SET TERMOUT OFF
spool $3/datafiles_out.txt
select 'cd '||substr(file_name,1,(instr(file_name,'/',-1)-1)) from dba_data_files;
spool off;
spool $3/File_zip.sh
select 'zip $2/'||substr(file_name,(instr(file_name,'/',-1))+1)||'.zip '||substr(file_name,(instr(file_name,'/',-1))+1) from dba_data_files;
spool off;
spool $3/File_tar.sh
select 'touch Install_dbf.tar' from dual;
select 'tar rvf Install_dbf.tar '||substr(file_name,(instr(file_name,'/',-1))+1)||'.zip ' from dba_data_files;
spool off;
!echo 'Selection of Datafiles Completed....'
EOF
chmod 777 $3/File_Tar.sh
echo "Sorting Now......!!!!"
sort -u $3/datafiles_out.txt > $3/unpath.sh
chmod 777 $3/unpath.sh
cat $3/File_zip.sh >> $3/unpath.sh
echo cd $2 >> $3/unpath.sh
cat $3/File_tar.sh >> $3/unpath.sh
$3/unpath.sh
#rm $3/File_tar.sh
#rm $3/File_zip.sh
#rm $2/*.dbf.zip
#rm $3/datafiles_out.txt

rman target / @$3/bkp.rcv

echo "BACKUP COMPLETED SUCESSFULLY ENJOY THE FEATURES OF FLEXCUBE.......!!!!!!"

sqlplus -s / as sysdba @$3/Restore.sql

exit
