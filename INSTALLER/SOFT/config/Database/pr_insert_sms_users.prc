CREATE OR REPLACE PROCEDURE pr_insert_sms_users(  p_user_id1  IN VARCHAR2
												 ,p_user_pwd1  IN VARCHAR2
												 ,p_random_salt1  IN VARCHAR2
												 ,p_ldap_user1  IN VARCHAR2
												 ,p_user_id2  IN VARCHAR2
												 ,p_user_pwd2  IN VARCHAR2
												 ,p_random_salt2  IN VARCHAR2
												 ,p_ldap_user2  IN VARCHAR2
												 ,p_cur_date  IN VARCHAR2
												 ,p_inp_date  IN VARCHAR2
                                                 ,p_err_code   OUT VARCHAR2
                                                 ,p_err_param  OUT VARCHAR2) IS
    l_sql VARCHAR2(32767);
	p_ho_branch VARCHAR2(10);
    l_cur_date  DATE;

	 PROCEDURE dbg(p_msg   IN VARCHAR2 ) IS
	    PRAGMA AUTONOMOUS_TRANSACTION;

  BEGIN

	--insert into INSTALLER_LOG (sl, msg) values ( seq_install.nextval ,  substr(p_msg, 1,4000));

    COMMIT;

  EXCEPTION
    WHEN OTHERS THEN
		NULL;

  END dbg;

BEGIN


	Begin
      Select ho_branch
        Into p_ho_branch
        From Sttm_Core_Bank;
    Exception
      When No_Data_Found Then
        Dbms_Output.Put_Line('Failed the Query on Sttm_Branch');
        p_Err_Code := p_Err_Code || '~' || 'ST-UC-01';
    End;

  SELECT TODAY INTO l_cur_date FROM STTM_DATES WHERE BRANCH_CODE = p_ho_branch;

	dbg ( 'l_cur_date:'||l_cur_date);

	dbg ( 'p_user_id1:'||p_user_id1);
	--dbg ( 'p_user_pwd1:'||p_user_pwd1);
	--dbg ( 'p_random_salt1:'||p_random_salt1);

	dbg ( 'p_user_id2:'||p_user_id2);
	--dbg ( 'p_user_pwd2:'||p_user_pwd2);
	--dbg ( 'p_random_salt2:'||p_random_salt2);

	dbg ( 'p_cur_date:'||p_cur_date);
	dbg ( 'p_inp_date:'||p_inp_date);



	l_sql := 'DELETE SMTB_USER WHERE USER_ID = ' || chr(39) || p_user_id1 || chr(39) || '';

  dbg ( '1:'||l_sql);

    BEGIN
        EXECUTE IMMEDIATE l_sql;
    EXCEPTION
        WHEN OTHERS THEN

            dbms_output.put_line('ISSUE IN DELETING THE USER RECORD FROM SMTB_USER ' || SQLERRM);
			p_err_code  := 'ISSUE IN DELETING THE USER RECORD FROM SMTB_USER';
			dbms_output.put_line('p_err_code  :='||p_err_code);
			p_err_param := substr(SQLERRM, 1, 255);
			dbms_output.put_line('p_err_param  :='||p_err_param);
			dbms_output.put_line('When Others Error : ' || SQLERRM);
			  dbg ( 'Error 1:'||SQLERRM);

			return;
    END;


	l_sql := 'DELETE SMTB_USER WHERE USER_ID = ' || chr(39) || p_user_id1 || chr(39) || '';
	  dbg ( '2:'||l_sql);

    BEGIN
        EXECUTE IMMEDIATE l_sql;
    EXCEPTION
        WHEN OTHERS THEN

            dbms_output.put_line('ISSUE IN DELETING THE USER RECORD FROM SMTB_USER ' || SQLERRM);
			p_err_code  := 'ISSUE IN DELETING THE USER RECORD FROM SMTB_USER';
			dbms_output.put_line('p_err_code  :='||p_err_code);
			p_err_param := substr(SQLERRM, 1, 255);
			dbms_output.put_line('p_err_param  :='||p_err_param);
			dbms_output.put_line('When Others Error : ' || SQLERRM);
			 dbg ( 'Error 2:'||SQLERRM);
			return;
    END;

	l_sql := 'DELETE SMTB_USER WHERE USER_ID = ' || chr(39) || p_user_id2 || chr(39) || '';
	  dbg ( '3:'||l_sql);

    BEGIN
        EXECUTE IMMEDIATE l_sql;
    EXCEPTION
        WHEN OTHERS THEN

            dbms_output.put_line('ISSUE IN DELETING THE USER RECORD FROM SMTB_USER ' || SQLERRM);
			p_err_code  := 'ISSUE IN DELETING THE USER RECORD FROM SMTB_USER';
			dbms_output.put_line('p_err_code  :='||p_err_code);
			p_err_param := substr(SQLERRM, 1, 255);
			dbms_output.put_line('p_err_param  :='||p_err_param);
			dbms_output.put_line('When Others Error : ' || SQLERRM);
			 dbg ( 'Error 3:'||SQLERRM);
			--return;
    END;

	l_sql := 'DELETE SMTB_USER_ROLE WHERE USER_ID = ' || chr(39) || p_user_id1 || chr(39) || '';

	  dbg ( '4:'||l_sql);

    BEGIN
        EXECUTE IMMEDIATE l_sql;
    EXCEPTION
        WHEN OTHERS THEN

            dbms_output.put_line('ISSUE IN DELETING THE USER RECORD FROM SMTB_USER_ROLE ' || SQLERRM);
			p_err_code  := 'ISSUE IN DELETING THE USER RECORD FROM SMTB_USER_ROLE';
			dbms_output.put_line('p_err_code  :='||p_err_code);
			p_err_param := substr(SQLERRM, 1, 255);
			dbms_output.put_line('p_err_param  :='||p_err_param);
			dbms_output.put_line('When Others Error : ' || SQLERRM);
			 dbg ( 'Error 4:'||SQLERRM);
			return;
    END;


	l_sql := 'DELETE SMTB_USER_ROLE WHERE USER_ID = ' || chr(39) || p_user_id2 || chr(39) || '';

	  dbg ( '5:'||l_sql);

    BEGIN
        EXECUTE IMMEDIATE l_sql;
    EXCEPTION
        WHEN OTHERS THEN

            dbms_output.put_line('ISSUE IN DELETING THE USER RECORD FROM SMTB_USER_ROLE ' || SQLERRM);
			p_err_code  := 'ISSUE IN DELETING THE USER RECORD FROM SMTB_USER_ROLE';
			dbms_output.put_line('p_err_code  :='||p_err_code);
			p_err_param := substr(SQLERRM, 1, 255);
			dbms_output.put_line('p_err_param  :='||p_err_param);
			dbms_output.put_line('When Others Error : ' || SQLERRM);
			 dbg ( 'Error 5:'||SQLERRM);
			--return;
    END;


--Changes done for 12.0.2: columns LAST_SIGNED_ON, NO_SUCCESSIVE_LOGINS, NO_CUMULATIVE_LOGINS removed from smtb_user table and inserted into newly created table SMTB_USERLOG_DETAILS: Changes start...

    l_sql := 'INSERT INTO SMTB_USER
            (exit_function, user_id,
             start_date,
             user_name, user_password, status_changed_on, till_allowed,
             acclass_allowed, products_allowed, branches_allowed,
             max_override_amt, time_level, user_category, user_status,
             end_date,
             pwd_changed_on,
             max_txn_amt, max_auth_amt, force_passwd_change, user_language,
             startup_function, home_branch, fwdrew_count, gl_allowed,
             auth_stat, checker_dt_stamp,
             checker_id,
             maker_dt_stamp,
             maker_id, mod_no, once_auth, record_stat, user_password_brn,
             user_id_brn, user_txn_limit, limits_ccy, auto_auth, customer_no, products_access_allowed, LDAP_USER, BRANCH_USRPWD, DFLT_MODULE, USER_EMAIL, TELEPHONE_NUMBER, USER_MANAGER, HOME_PHONE, USER_MOBILE, USER_FAX, USER_PAGER,SALT)
     VALUES (NULL, ' || chr(39) || p_user_id1 || chr(39) || ','||chr(39) ||
             l_cur_date || chr(39) ||',
             ' || chr(39) || 'Default Admin User1' || chr(39) || ', ' || chr(39) ||
             p_user_pwd1 || chr(39) || ', NULL, ' || chr(39) || 'A' || chr(39) || ',
             ' || chr(39) || 'D' || chr(39) || ', ' || chr(39) || 'D' || chr(39) || ', ' || chr(39) || 'D' ||
             chr(39) || ',
             NULL, 9, ' || chr(39) || 'S' || chr(39) || ', ' || chr(39) || 'E' || chr(39) || ',NULL,
             '||
             chr(39) || l_cur_date || chr(39) ||',NULL, NULL, 1, ' || chr(39) || 'ENG' || chr(39) || ', NULL,
             ' || chr(39) || p_ho_branch || chr(39) || ', NULL, ' || chr(39) || 'D' || chr(39) || ',
             ' || chr(39) || 'A' || chr(39) || ', TO_DATE (' || chr(39) || p_inp_date || chr(39) || ', ' ||
             chr(39) || 'DD-MM-RRRR HH24:MI:SS' || chr(39) || '),
             ' || chr(39) || 'SYSTEM' || chr(39) || ',
             TO_DATE (' || chr(39) || p_inp_date || chr(39) || ', ' || chr(39) || 'DD-MM-RRRR HH24:MI:SS' ||
             chr(39) || '),
             ' || chr(39) || 'SYSTEM' || chr(39) || ', 1, ' || chr(39) || 'Y' || chr(39) || ', ' || chr(39) || 'O' ||
             chr(39) || ', NULL,
             NULL, ' || chr(39) || 'N' || chr(39) || ', NULL, ' || chr(39) || 'N' || chr(39) || ',
             NULL, ' || chr(39) || 'D' || chr(39) || ', ' || chr(39) || p_ldap_user1 || chr(39) || ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,' || chr(39) || p_random_salt1 || chr(39) || ')';


			  dbg ( '6- user 1 create:'||l_sql);

    BEGIN
        EXECUTE IMMEDIATE l_sql;
    EXCEPTION
        WHEN OTHERS THEN

            dbms_output.put_line('ISSUE IN INSERTING SMTB_USER ' || SQLERRM);
			p_err_code  := 'ERROR IN INSERTING INTO SMTB_USER';
			dbms_output.put_line('p_err_code  :='||p_err_code);
			p_err_param := substr(SQLERRM, 1, 255);
			dbms_output.put_line('p_err_param  :='||p_err_param);
			dbms_output.put_line('When Others Error : ' || SQLERRM);
			 dbg ( 'Error 6 user 1 create:'||SQLERRM);
			return;
    END;

	l_sql := 'INSERT INTO SMTB_USERLOG_DETAILS
            (USER_ID, LAST_SIGNED_ON, NO_SUCCESSIVE_LOGINS, NO_CUMULATIVE_LOGINS)
     VALUES (' || chr(39) || p_user_id1 || chr(39) || ', NULL,  1, 1)';

    BEGIN
			  dbg ( '7- insertion in SMTB_USERLOG_DETAILS:'||l_sql);
        EXECUTE IMMEDIATE l_sql;
    EXCEPTION
        WHEN OTHERS THEN

            dbms_output.put_line('ISSUE IN INSERTING SMTB_USERLOG_DETAILS ' || SQLERRM);
			p_err_code  := 'ERROR IN INSERTING INTO SMTB_USERLOG_DETAILS';
			dbms_output.put_line('p_err_code  :='||p_err_code);
			p_err_param := substr(SQLERRM, 1, 255);
			dbms_output.put_line('p_err_param  :='||p_err_param);
			dbms_output.put_line('When Others Error : ' || SQLERRM);
			 dbg ( 'Error 7 while insertion in SMTB_USERLOG_DETAILS:'||SQLERRM);
			--return;
    END;

	l_sql := '   INSERT INTO SMTB_USER
            (exit_function, user_id,
             start_date,
             user_name, user_password, status_changed_on, till_allowed,
             acclass_allowed, products_allowed, branches_allowed,
             max_override_amt, time_level, user_category, user_status,
             end_date,
             pwd_changed_on,
             max_txn_amt, max_auth_amt, force_passwd_change, user_language,
             startup_function, home_branch, fwdrew_count, gl_allowed,
             auth_stat, checker_dt_stamp,
             checker_id,
             maker_dt_stamp,
             maker_id, mod_no, once_auth, record_stat, user_password_brn,
             user_id_brn, user_txn_limit, limits_ccy, auto_auth, customer_no, products_access_allowed, LDAP_USER, BRANCH_USRPWD, DFLT_MODULE, USER_EMAIL, TELEPHONE_NUMBER, USER_MANAGER, HOME_PHONE, USER_MOBILE, USER_FAX, USER_PAGER,SALT)
     VALUES(NULL, ' || chr(39) || p_user_id2 || chr(39) || ',
             '|| chr(39) || l_cur_date || chr(39) ||',
             ' || chr(39) || 'Default Admin User2' || chr(39) || ', ' || chr(39) || p_user_pwd2 ||
             chr(39) || ', NULL, ' || chr(39) || 'A' || chr(39) || ',
             ' || chr(39) || 'D' || chr(39) || ', ' || chr(39) || 'D' || chr(39) || ', ' || chr(39) || 'D' ||
             chr(39) || ', NULL, 9, ' || chr(39) || 'S' || chr(39) || ', ' || chr(39) || 'E' || chr(39) || ',NULL,
             '|| chr(39) || l_cur_date || chr(39) ||',NULL, NULL, 1, ' || chr(39) || 'ENG' || chr(39) || ', NULL,
			 ' || chr(39) || p_ho_branch || chr(39) || ', NULL, ' || chr(39) || 'D' || chr(39) || ',
             ' || chr(39) || 'A' || chr(39) || ', TO_DATE (' || chr(39) || p_inp_date || chr(39) || ', ' ||
             chr(39) || 'DD-MM-RRRR HH24:MI:SS' || chr(39) || '),
             ' || chr(39) || 'SYSTEM' || chr(39) || ', TO_DATE (' || chr(39) || p_inp_date || chr(39) || ', ' ||
             chr(39) || 'DD-MM-RRRR HH24:MI:SS' || chr(39) || '),
             ' || chr(39) || 'SYSTEM' || chr(39) || ', 1, ' || chr(39) || 'Y' || chr(39) || ', ' || chr(39) || 'O' ||
             chr(39) || ', NULL,
             NULL, ' || chr(39) || 'N' || chr(39) || ', NULL, ' || chr(39) || 'Y' || chr(39) || ',
             NULL, ' || chr(39) || 'D' || chr(39) || ', ' || chr(39) || p_ldap_user2 || chr(39) || ', null, null, null, null, null, null, null, null, null,' || chr(39) || p_random_salt2 || chr(39) || ')';

    BEGIN
			  dbg ( '8- user 2 create:'||l_sql);
        EXECUTE IMMEDIATE l_sql;
    EXCEPTION
        WHEN OTHERS THEN

            dbms_output.put_line('ISSUE IN INSERTING SMTB_USER ' || SQLERRM);
			p_err_code  := 'ERROR IN INSERTING INTO SMTB_USER';
			dbms_output.put_line('p_err_code  :='||p_err_code);
			p_err_param := substr(SQLERRM, 1, 255);
			dbms_output.put_line('p_err_param  :='||p_err_param);
			dbms_output.put_line('When Others Error : ' || SQLERRM);
			 dbg ( 'Error 8 user 2 create:'||SQLERRM);
			--return;
    END;

	l_sql := 'INSERT INTO SMTB_USERLOG_DETAILS
            (USER_ID, LAST_SIGNED_ON, NO_SUCCESSIVE_LOGINS, NO_CUMULATIVE_LOGINS)
     VALUES (' || chr(39) || p_user_id2 || chr(39) || ', NULL,  1, 1)';

    BEGIN
			  dbg ( '9- insertion in SMTB_USERLOG_DETAILS:'||l_sql);
        EXECUTE IMMEDIATE l_sql;
    EXCEPTION
        WHEN OTHERS THEN

            dbms_output.put_line('ISSUE IN INSERTING SMTB_USERLOG_DETAILS ' || SQLERRM);
			p_err_code  := 'ERROR IN INSERTING INTO SMTB_USERLOG_DETAILS';
			dbms_output.put_line('p_err_code  :='||p_err_code);
			p_err_param := substr(SQLERRM, 1, 255);
			dbms_output.put_line('p_err_param  :='||p_err_param);
			dbms_output.put_line('When Others Error : ' || SQLERRM);
			 dbg ( 'Error 9 while insertion in SMTB_USERLOG_DETAILS:'||SQLERRM);
			--return;
    END;

	--Changes done for 12.0.2: columns LAST_SIGNED_ON, NO_SUCCESSIVE_LOGINS, NO_CUMULATIVE_LOGINS removed from smtb_user table and inserted into newly created table SMTB_USERLOG_DETAILS: Changes end...

    l_sql := 'INSERT INTO SMTB_USER_ROLE
            (role_id, user_id, auth_stat, branch_code)
     	VALUES (' || chr(39) || 'SM-USER-ROLE' || chr(39) || ', ' || chr(39) || p_user_id1 || chr(39) || ', ' ||
             chr(39) || 'A' || chr(39) || ', ' || chr(39) || p_ho_branch || chr(39) || ')';

    BEGIN
		dbg ( '10- SMTB_USER_ROLE 1 create:'||l_sql);
        EXECUTE IMMEDIATE l_sql;
    EXCEPTION
        WHEN OTHERS THEN

            dbms_output.put_line('ISSUE IN INSERTING SMTB_USER_ROLE ' || SQLERRM);
			p_err_code  := 'ERROR IN INSERTING INTO SMTB_USER_ROLE';
			dbms_output.put_line('p_err_code  :='||p_err_code);
			p_err_param := substr(SQLERRM, 1, 255);
			dbms_output.put_line('p_err_param  :='||p_err_param);
			dbms_output.put_line('When Others Error : ' || SQLERRM);
			 dbg ( 'Error 10 :'||SQLERRM);
			return;
    END;


	l_sql := '   INSERT INTO SMTB_USER_ROLE
            (role_id, user_id, auth_stat, branch_code)
     	VALUES (' || chr(39) || 'SM-USER-ROLE' || chr(39) || ', ' || chr(39) || p_user_id2 || chr(39) || ', ' ||
             chr(39) || 'A' || chr(39) || ', ' || chr(39) || p_ho_branch || chr(39) || ')';

    BEGIN
		dbg ( '11- SMTB_USER_ROLE 2 create:'||l_sql);
        EXECUTE IMMEDIATE l_sql;
    EXCEPTION
        WHEN OTHERS THEN

            dbms_output.put_line('ISSUE IN INSERTING SMTB_USER_ROLE ' || SQLERRM);
			p_err_code  := 'ERROR IN INSERTING INTO SMTB_USER_ROLE';
			dbms_output.put_line('p_err_code  :='||p_err_code);
			p_err_param := substr(SQLERRM, 1, 255);
			dbms_output.put_line('p_err_param  :='||p_err_param);
			dbms_output.put_line('When Others Error : ' || SQLERRM);
			 dbg ( 'Error 11 :'||SQLERRM);
			--return;
    END;

    l_sql := 'DECLARE
				l_cont_string1 varchar2(16);
				cursor c1 is
				SELECT function_id FROM SMTB_FUNCTION_DESCRIPTION a
				WHERE a.FUNCTION_ID LIKE '|| chr(39) || 'SM%' || chr(39) ||'
				AND a.FUNCTION_ID IN (SELECT FCJ_FUNCTION_ID FROM SMTB_FCC_FCJ_MAPPING)
				and  not exists (select 1 from smtb_role_detail b
				where a.function_id = b.role_function
				AND B.ROLE_ID = ' || chr(39) || 'SM-USER-ROLE' || chr(39) || ');
			BEGIN
				FOR each_rec in c1
				LOOP
				BEGIN

					select control_string
					into l_cont_string1
					from smtb_menu
					where function_id = each_rec.function_id;
					INSERT INTO SMTB_ROLE_DETAIL
					(
					ROLE_ID,
					ROLE_FUNCTION,
					CONTROL_STRING,
					CONTROL_1,
					CONTROL_2,
					CONTROL_3,
					CONTROL_4,
					CONTROL_5,
					CONTROL_6,
					CONTROL_7,
					CONTROL_8,
					CONTROL_9,
					CONTROL_10,
					CONTROL_11,
					CONTROL_12,
					CONTROL_13,
					CONTROL_14,
					CONTROL_15,
					CONTROL_16,
					AUTH_STAT,
					BRANCH_CODE)
					VALUES
					(' || chr(39) || 'SM-USER-ROLE' || chr(39) || ',each_rec.function_id,l_cont_string1,
					substr(l_cont_string1,1,1),
					substr(l_cont_string1,2,1),
					substr(l_cont_string1,3,1),
					substr(l_cont_string1,4,1),
					substr(l_cont_string1,5,1),
					substr(l_cont_string1,6,1),
					substr(l_cont_string1,7,1),
					substr(l_cont_string1,8,1),
					substr(l_cont_string1,9,1),
					substr(l_cont_string1,10,1),
					substr(l_cont_string1,11,1),
					substr(l_cont_string1,12,1),
					substr(l_cont_string1,13,1),
					substr(l_cont_string1,14,1),
					substr(l_cont_string1,15,1),
					substr(l_cont_string1,16,1),
					' || chr(39) || 'A' || chr(39) || ',
					NULL);
				EXCEPTION
				WHEN OTHERS THEN

                     Dbms_output.Put_Line(sqlerrm);

				END;
		END LOOP;
	EXCEPTION
		WHEN OTHERS THEN
		DBMS_OUTPUT.PUT_LINE(SQLERRM);

	END;';
    BEGIN
		dbg ( '12- block:'||l_sql);
        EXECUTE IMMEDIATE l_sql;
    EXCEPTION
        WHEN OTHERS THEN
            dbms_output.put_line('ISSUE IN INSERTING SMTB_ROLE_DETAIL ' || SQLERRM);
			p_err_code  := 'ERROR IN INSERTING INTO SMTB_ROLE_DETAIL';
			dbms_output.put_line('p_err_code  :='||p_err_code);
			p_err_param := substr(SQLERRM, 1, 255);
			dbms_output.put_line('p_err_param  :='||p_err_param);
			dbms_output.put_line('When Others Error : ' || SQLERRM);
			dbg ('Error 12 :'||SQLERRM);
			return;
    END;
	p_err_code := 'SUCCESS';
	p_err_param := 'SUCCESS';

EXCEPTION
    WHEN OTHERS THEN
		dbg ( 'Error COMMON FOR ALL *** :'||SQLERRM);
        p_err_code  := 'IN-BST-001';
        p_err_param := substr(SQLERRM, 1, 255);
        dbms_output.put_line('When Others Error : ' || SQLERRM);

END pr_insert_sms_users;
/
