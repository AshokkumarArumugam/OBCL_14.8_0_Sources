SET ORACLE_SID=%1

echo The Oracle SID is %ORACLE_SID%
SET PATH=%3;%PATH%

cd %3

sqlplus -s / as sysdba @backup_script.sql %2

echo "Sorting Now......!!!!"
call sort_dup.bat "datafiles_out.bat"
type File_zip.bat >> datafiles_out.bat
echo cd %2 >> datafiles_out.bat
type File_tar.bat >> datafiles_out.bat
call datafiles_out.bat
cd %3
del File_tar.bat
del File_zip.bat
del datafiles_out.bat
cd %2
del *.dbf.zip

rman target / @%3/bkp.rcv

sqlplus -s / as sysdba @%3/Restore.sql

echo BACKUP COMPLETED SUCESSFULLY ENJOY THE FEATURES OF FLEXCUBE.......!!!!!!

e -lit
               
