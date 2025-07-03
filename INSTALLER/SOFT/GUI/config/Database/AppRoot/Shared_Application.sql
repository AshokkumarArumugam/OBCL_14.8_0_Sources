/*  Script for Shared Application */
SET VERIFY ON
SET HEAD ON
SET FEEDBACK 1
SET ARRAY 1
SET LINESIZE 10000
SET PAGESIZE 50000
SET LONG 10000
SET ECHO ON
SET TRIMSPOOL ON
SET COLSEP ';'
SET SERVEROUT OFF
clear screen
SPOOL ON
SET SQLBLANKLINES ON
SET SERVEROUTPUT ON
SET ERRORLOGGING ON
SET ECHO ON
SPOOL "&SPOOL_PATH"

alter pluggable database application &P_APPLICATION_NAME begin upgrade '1.0' to '1.1';          
BEGIN
    FOR I IN (SELECT 'BEGIN ' || chr(10) ||
                       'DBMS_PDB.SET_METADATA_LINKED(''&P_APPROOT_USER''' || ',''' ||
                       Object_Name || ''',' || Namespace || '); ' || chr(10) ||
                       'EXCEPTION ' || chr(10) || 'WHEN OTHERS then ' || chr(10) ||
                       'DBMS_OUTPUT.PUT_LINE(''ERROR ->''|| SQLERRM); ' ||
                       chr(10) || 'END;' sqlobject
                  FROM user_objects
                 WHERE sharing = 'NONE'
                   AND object_type NOT IN ('INDEX', 'LOB', 'TABLE PARTITION','SEQUENCE','JOB','MATERIALIZED VIEW','MATERIALIZED VIEW LOG')
                   AND (object_name,object_type) NOT IN (SELECT object_name,object_type
                                                         FROM   cstm_approot_objects 
                                                         WHERE  function_id  = 'DYNAMIC'    
                                                         AND    sharing      = 'NONE'														 
                                                        )                                                   
             ) LOOP
        dbms_output.put_line(chr(10));
        EXECUTE IMMEDIATE I.sqlobject;
        dbms_output.put_line(I.sqlobject);
    END LOOP;
EXCEPTION 
WHEN OTHERS THEN
  dbms_output.put_line('Error --->'||SQLERRM);
END;
/
alter pluggable database application &P_APPLICATION_NAME end upgrade;

SET ERRORLOGGING OFF
SPOOL OFF