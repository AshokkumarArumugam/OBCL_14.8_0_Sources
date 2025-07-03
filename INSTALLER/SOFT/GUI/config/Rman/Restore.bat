oradim -NEW -SID %1
SET ORACLE_SID=%1
SET PATH=%3;%PATH%
cd %2
tar xvf Install_dbf.tar
unzip *.dbf.zip
rman target / @%2/convertscript.rman
sqlplus "/as sysdba" @%3/Restore.sql
sqlplus "/as sysdba" @%2/transportscript.sql
del *.dbf.zip
del *.dbf
exit

