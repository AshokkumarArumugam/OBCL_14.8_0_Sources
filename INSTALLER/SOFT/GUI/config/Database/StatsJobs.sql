sqlplus -s /nolog <<EOF
conn / as sysdba
column FCUBS_USER new_value FCUBS_USER
select '&FCUBS_USER' FCUBS_USER from dual;
begin
	dbms_scheduler.set_attribute(name=>'MONDAY_WINDOW', attribute=>'repeat_interval', value=>'freq=daily;byday=MON;byhour=01;byminute=0;bysecond=0');
	dbms_scheduler.set_attribute(name=>'TUESDAY_WINDOW', attribute=>'repeat_interval', value=>'freq=daily;byday=TUE;byhour=04;byminute=0;bysecond=0');
	dbms_scheduler.set_attribute(name=>'WEDNESDAY_WINDOW', attribute=>'repeat_interval', value=>'freq=daily;byday=WED;byhour=04;byminute=0;bysecond=0');
	dbms_scheduler.set_attribute(name=>'THURSDAY_WINDOW', attribute=>'repeat_interval', value=>'freq=daily;byday=THU;byhour=04;byminute=0;bysecond=0');
	dbms_scheduler.set_attribute(name=>'FRIDAY_WINDOW', attribute=>'repeat_interval', value=>'freq=daily;byday=FRI;byhour=04;byminute=0;bysecond=0');
	dbms_scheduler.set_attribute(name=>'SATURDAY_WINDOW', attribute=>'repeat_interval', value=>'freq=daily;byday=SAT;byhour=04;byminute=0;bysecond=0');
	dbms_scheduler.set_attribute(name=>'SUNDAY_WINDOW', attribute=>'repeat_interval', value=>'freq=daily;byday=SUN;byhour=02;byminute=0;bysecond=0');

	dbms_scheduler.set_attribute(name=>'MONDAY_WINDOW', attribute=>'duration', value=> interval '6' hour);
	dbms_scheduler.set_attribute(name=>'TUESDAY_WINDOW', attribute=>'duration', value=> interval '3' hour);
	dbms_scheduler.set_attribute(name=>'WEDNESDAY_WINDOW', attribute=>'duration', value=> interval '3' hour);
	dbms_scheduler.set_attribute(name=>'THURSDAY_WINDOW', attribute=>'duration', value=> interval '3' hour);
	dbms_scheduler.set_attribute(name=>'FRIDAY_WINDOW', attribute=>'duration', value=> interval '3' hour);
	dbms_scheduler.set_attribute(name=>'SATURDAY_WINDOW', attribute=>'duration', value=> interval '3' hour);
	dbms_scheduler.set_attribute(name=>'SUNDAY_WINDOW', attribute=>'duration', value=> interval '6' hour);

	DBMS_STATS.SET_PARAM('CASCADE', 'TRUE');
	DBMS_STATS.SET_PARAM('DEGREE', '8');
	DBMS_STATS.SET_PARAM('METHOD_OPT', 'FOR ALL COLUMNS SIZE 1');
	DBMS_STATS.SET_PARAM('ESTIMATE_PERCENT', NULL);
	commit;
end;
/



-- This section needs to be executed once after configure(IMPORT) FCUBS Schema 
BEGIN
	DBMS_STATS.GATHER_SCHEMA_STATS (OWNNAME=>'&FCUBS_USER', ESTIMATE_PERCENT=>NULL, METHOD_OPT=>'FOR ALL COLUMNS SIZE 1', OPTIONS => 'GATHER', DEGREE=>8);
END;
/


/*
-- This section needs to be executed during ACTB_DAILY_LOG has max records (i.e. Prior to EOD/EOM). 
BEGIN
	DBMS_STATS.GATHER_TABLE_STATS (OWNNAME=> '&FCUBS_USER', TABNAME=>'ACTB_DAILY_LOG', ESTIMATE_PERCENT=>NULL, METHOD_OPT=>'FOR ALL COLUMNS SIZE 1', CASCADE=>TRUE);
	DBMS_STATS.LOCK_TABLE_STATS(OWNNAME=> '&FCUBS_USER', TABNAME=>'ACTB_DAILY_LOG');
END;
/
*/

EOF
