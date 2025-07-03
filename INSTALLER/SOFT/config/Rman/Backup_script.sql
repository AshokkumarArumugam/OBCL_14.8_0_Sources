SET ECHO OFF
SET TRIMOUT OFF
SET TRIMSPOOL ON
SET HEADING OFF
SET FEEDBACK OFF
SET PAGESIZE 0
SET LINESIZE 320
SET VERIFY OFF
SET TERMOUT OFF
def PARAM1=&1
spool datafiles_out.bat
select 'cd '||substr(file_name,1,(instr(file_name,'\',-1)-1)) from dba_data_files;
spool off;
spool File_zip.bat
select 'zip &PARAM1\'||substr(file_name,(instr(file_name,'\',-1))+1)||'.zip '||substr(file_name,(instr(file_name,'\',-1))+1) from dba_data_files;
spool off;
spool File_tar.bat
select 'tar rvf &PARAM1\Install_dbf.tar '||substr(file_name,(instr(file_name,'\',-1))+1)||'.zip ' from dba_data_files;
spool off;
shutdown immediate;
startup mount;
alter database open READ ONLY;
exit

