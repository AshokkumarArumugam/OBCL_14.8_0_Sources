accept User Prompt 'Enter user name : '
grant create session to &User;
set verify off
@dbmspool

grant select on dba_jobs to &user;
grant select on dba_jobs_running to &user;
grant select on v_$database to &user;
grant select on v_$nls_parameters to &user;
grant select on v_$parameter to &user;
grant select on v_$process to &user;
grant select on v_$session to &user;
grant select on v_$instance to &user;
grant create library to  &user;
grant create materialized view to &user;
grant create procedure to &user;
grant create sequence to &user;
grant create session to &user;
grant create synonym to &user;
grant create table to &user;
grant create trigger to &user;
grant create type to &user;
grant create view to &user;
grant execute on dbms_application_info to &user;
grant execute on dbms_aq to &user;
grant execute on dbms_aqadm to &user;
grant execute on dbms_defer_query to  &user;
grant execute on dbms_defer_sys to  &user;
grant execute on dbms_job to  &user;
grant execute on dbms_lock to  &user;
grant execute on dbms_refresh to  &user;
grant execute on dbms_sql to  &user;
grant execute on utl_file to  &user;
grant JAVAUSERPRIV to &user;
grant execute on dbms_scheduler to  &user;


set verify on
