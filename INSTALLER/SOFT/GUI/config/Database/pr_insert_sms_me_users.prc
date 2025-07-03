CREATE OR REPLACE PROCEDURE pr_insert_sms_me_users(  p_user_id1  IN VARCHAR2
												 ,p_user_pwd1  IN VARCHAR2
												 ,p_random_salt1  IN VARCHAR2
												 ,p_ldap_user1  IN VARCHAR2
												 ,p_user_id2  IN VARCHAR2
												 ,p_user_pwd2  IN VARCHAR2
												 ,p_random_salt2  IN VARCHAR2
												 ,p_ldap_user2  IN VARCHAR2
												 ,p_cur_date  IN VARCHAR2
												 ,p_inp_date  IN VARCHAR2
												 ,entityId IN VARCHAR2
                                                 ,p_err_code   OUT VARCHAR2
                                                 ,p_err_param  OUT VARCHAR2
												 ) IS
	p_ho_branch VARCHAR2(10);
    l_cur_date  DATE;
	type userIDarray IS VARRAY(5) OF VARCHAR2(400); 
	type userPswdarray IS VARRAY(5) OF VARCHAR2(400);
	type randomSaltarray IS VARRAY(5) OF VARCHAR2(400);
	type ldapUserarray IS VARRAY(5) OF VARCHAR2(400);
	
	userID userIDarray;     
	userPswd  userPswdarray;  
	randomSalt randomSaltarray;
	ldapUser  ldapUserarray; 
	
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
	BEGIN
    EXECUTE IMMEDIATE  'DELETE SMTB_USER WHERE USER_ID IN ( ' || chr(39) || p_user_id1 || chr(39) || ','|| chr(39) || p_user_id2 || chr(39) ||')';
	EXECUTE IMMEDIATE  'DELETE COTM_USER_DETAILS WHERE USERID IN ( ' || chr(39) || p_user_id1 || chr(39) || ','|| chr(39) || p_user_id2 || chr(39) ||')';
    EXECUTE IMMEDIATE  'DELETE SMTB_USER_ROLE WHERE USER_ID IN ( ' || chr(39) || p_user_id1 || chr(39) || ','|| chr(39) || p_user_id2 || chr(39) ||')';
	EXECUTE IMMEDIATE  'DELETE cotm_role_details WHERE role_id='|| chr(39) || 'SM-USER-ROLE' || chr(39);
    EXCEPTION
        WHEN OTHERS THEN

            dbms_output.put_line('ISSUE IN DELETING THE USER RECORD FROM SMTB_USER' || SQLERRM);
			p_err_code  := 'ISSUE IN DELETING THE USER RECORD FROM SMTB_USER';
			dbms_output.put_line('p_err_code  :='||p_err_code);
			p_err_param := substr(SQLERRM, 1, 255);
			dbms_output.put_line('p_err_param  :='||p_err_param);
			dbms_output.put_line('When Others Error : ' || SQLERRM);
			 dbg ( 'Error 2:'||SQLERRM);
			return;
    END;
	BEGIN
	 userID := userIDarray(p_user_id1,p_user_id2);
	 userPswd := userPswdarray(p_user_pwd1,p_user_pwd2);
	 randomSalt := randomSaltarray(p_random_salt1,p_random_salt2);
	 ldapUser := ldapUserarray(p_ldap_user1,p_ldap_user2);
	  
	FOR x IN 1 .. 2 LOOP
	EXECUTE IMMEDIATE 'INSERT INTO SMTB_USER
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
             user_id_brn, user_txn_limit, limits_ccy, auto_auth, customer_no, products_access_allowed, LDAP_USER, BRANCH_USRPWD, DFLT_MODULE, USER_EMAIL, TELEPHONE_NUMBER, USER_MANAGER, HOME_PHONE, USER_MOBILE, USER_FAX, USER_PAGER,
     EXT_USER_REF, TAX_IDENTIFIER, STAFF_AC_RESTR, AMOUNT_FORMAT, DATE_FORMAT, DEPT_CODE,SALT
       ,EL_USER_ID, GROUP_CODE_ALLOWED, MULTIBRANCH_ACCESS, OTHER_RM_CUST_RESTRICT, DASHBOARD_REQD, ALERTS_ON_HOME, MFI_USER, NUMBER_FORMAT_MASK, REFERENCE_NO, DEBUG_WINDOW_ENABLED, SCREEN_SAVER_TIMEOUT, F10_REQD, F11_REQD, F12_REQD, MFA_ENBLD, MFA_ID, ACCESS_CONTROL, EXTERNAL_ALERTS)
     VALUES (NULL,
           ' || chr(39) || userID(x) || chr(39) || ',
       '||chr(39) ||l_cur_date || chr(39) ||',
             ' || chr(39) || 'Default Admin User'||x|| chr(39) || ',
     NULL, 
       NULL,
            NULL, ' || chr(39) || 'D' || chr(39) || ',
       ' || chr(39) || 'D' || chr(39) || ',
       ' || chr(39) || 'D' ||chr(39) || ',
             NULL,9,
       ' || chr(39) || 'S' || chr(39) || ',
       NULL, NULL,NULL,NULL,NULL, NULL,
       ' || chr(39) || 'ENG' || chr(39) || ', NULL,
             ' || chr(39) || p_ho_branch || chr(39) || ', NULL,
       ' || chr(39) || 'D' || chr(39) || ',
             ' || chr(39) || 'A' || chr(39) || ',
       TO_DATE (' || chr(39) || p_inp_date || chr(39) || ', ' ||chr(39) || 'DD-MM-RRRR HH24:MI:SS' || chr(39) || '),
             ' || chr(39) || 'SYSTEM' || chr(39) || ',
             TO_DATE (' || chr(39) || p_inp_date || chr(39) || ', ' || chr(39) || 'DD-MM-RRRR HH24:MI:SS' ||
             chr(39) || '),
             ' || chr(39) || 'SYSTEM' || chr(39) || ',3,
       ' || chr(39) || 'Y' || chr(39) || ',
       ' || chr(39) || 'O' ||chr(39) || ', NULL,
             NULL,
       ' || chr(39) || 'N' || chr(39) || ', NULL,
       ' || chr(39) || 'Y' || chr(39) || ',
            NULL,
      ' || chr(39) || 'D' || chr(39) || ',
      NULL,NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,
      ' || chr(39) || 'D' || chr(39) || ',
      ' || chr(39) || 'N' || chr(39) || ',
      ' || chr(39) || 'N' || chr(39) || ',
      ' || chr(39) || 'N' || chr(39) || ',
      ' || chr(39) || 'N' || chr(39) || ', NULL,
      ' || chr(39) || 'M' || chr(39) || ', NULL,
      ' || chr(39) || 'Y' || chr(39) || ',NULL,NULL,NULL,NULL,NULL,NULL,
      ' || chr(39) || 'B' || chr(39) || ',
      ' || chr(39) || 'N' || chr(39) ||
      ')';
         
      EXECUTE IMMEDIATE 'INSERT INTO COTM_USER_DETAILS (USERID, CHECKER_ID, USER_NAME, AUTH_STAT)VALUES ('|| chr(39) || userID(x) || chr(39) || ','|| chr(39) || 'SYSTEM' || chr(39)||',' || chr(39) || 'Default Admin User'||x || chr(39) || ','|| chr(39) || 'A' || chr(39)||')';
   
   EXECUTE IMMEDIATE 'INSERT INTO SMTB_USER_ROLE(role_id, user_id, auth_stat, branch_code)VALUES (' || chr(39) || 'SM-USER-ROLE' || chr(39) || ', ' || chr(39) || userID(x) || chr(39) || ', ' ||
             chr(39) || 'A' || chr(39) || ', ' || chr(39) || p_ho_branch || chr(39) || ')';
	END LOOP;
	END;
	    BEGIN
  EXECUTE IMMEDIATE 'DECLARE
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
   BEGIN
    EXECUTE IMMEDIATE 'INSERT INTO cotm_role_details(role_id,role_description,auth_stat) VALUES ('|| chr(39) ||'SM-USER-ROLE'|| chr(39) ||','|| chr(39) ||'all roles'|| chr(39) ||'  ,'|| chr(39) ||'A'|| chr(39) ||')';
  EXCEPTION
        WHEN OTHERS THEN
            dbms_output.put_line('ISSUE IN INSERTING cotm_role_details ' || SQLERRM);
      p_err_code  := 'ERROR IN INSERTING INTO cotm_role_details';
      dbms_output.put_line('p_err_code  :='||p_err_code);
      p_err_param := substr(SQLERRM, 1, 255);
      dbms_output.put_line('p_err_param  :='||p_err_param);
      dbms_output.put_line('When Others Error : ' || SQLERRM);
      dbg ('Error 12 :'||SQLERRM);
      return;
    END;
	p_err_code := 'SUCCESS';
	p_err_param := 'SUCCESS';
	END pr_insert_sms_me_users;
	/
