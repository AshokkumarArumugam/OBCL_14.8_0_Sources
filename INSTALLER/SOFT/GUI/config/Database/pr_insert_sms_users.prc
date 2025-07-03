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
   
  BEGIN
    EXECUTE IMMEDIATE  'DELETE SSTB_USER WHERE USER_ID IN ( ' || chr(39) || p_user_id1 || chr(39) || ','|| chr(39) || p_user_id2 || chr(39) ||')';    
    EXECUTE IMMEDIATE  'DELETE SMTB_USERLOG_DETAILS WHERE USER_ID IN ( ' || chr(39) || p_user_id1 || chr(39) || ','|| chr(39) || p_user_id2 || chr(39) ||')';    
    EXCEPTION
        WHEN OTHERS THEN

            dbms_output.put_line('ISSUE IN DELETING THE USER RECORD FROM SMTB_USER/SSTB_USER/COTM_USER_DETAILS ' || SQLERRM);
      p_err_code  := 'ISSUE IN DELETING THE USER RECORD FROM SMTB_USER/SSTB_USER/COTM_USER_DETAILS';
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
      EXECUTE IMMEDIATE 'INSERT INTO SSTB_USER
           ( USER_ID ,USER_NAME,USER_PASSWORD,SALT,LDAP_USER,RECORD_STAT,HOME_ENTITY,PWD_CHANGED_ON,ONCE_AUTH,AUTH_STAT,FORCE_PASSWD_CHANGE,USER_STATUS,USER_EMAIL,MFA_ID,CHECKER_DT_STAMP,MAKER_DT_STAMP,CHECKER_ID,MAKER_ID,MOD_NO,MFA_ENBLD,SCREEN_SAVER_TIMEOUT,BRANCH_USRPWD,STATUS_CHANGED_ON,REFERENCE_NO, END_DATE, START_DATE)
     VALUES(' || chr(39) || userID(x) || chr(39) || ',
            ' || chr(39) || 'Default Admin User2' || chr(39) || ',
      ' || chr(39) || userPswd(x) || chr(39) || ',
      ' || chr(39) || randomSalt(x) || chr(39) || ',
      NULL,
      ' || chr(39) || 'O' ||chr(39) || ',
      ' || chr(39) || entityId ||chr(39) || ',
      TO_DATE (' || chr(39) || p_cur_date || chr(39) || ', ' ||chr(39) || 'DD-MM-RRRR HH24:MI:SS' || chr(39) || '),
      ' || chr(39) || 'Y' || chr(39) || ',
      ' || chr(39) || 'A' || chr(39) || ',
      ' || chr(39) || '0' || chr(39) || ',
      ' || chr(39) || 'E' || chr(39) || ',NULL,NULL,
      TO_DATE (' || chr(39) || p_inp_date || chr(39) || ', ' ||chr(39) || 'DD-MM-RRRR HH24:MI:SS' || chr(39) || '),
      TO_DATE (' || chr(39) || p_inp_date || chr(39) || ', ' ||chr(39) || 'DD-MM-RRRR HH24:MI:SS' || chr(39) || '),
      ' || chr(39) || 'SYSTEM' || chr(39) || ',
      ' || chr(39) || 'SYSTEM' || chr(39) || ',1,
      ' || chr(39) || 'N' ||chr(39)||',
      NULL,NULL,TO_DATE (' || chr(39) || p_inp_date || chr(39) || ', ' ||chr(39) || 'DD-MM-RRRR HH24:MI:SS' || chr(39) || '),NULL,NULL,TO_DATE (' || chr(39) || p_cur_date || chr(39) || ', ' ||chr(39) || 'DD-MM-RRRR HH24:MI:SS' || chr(39) || '))';
      
      EXECUTE IMMEDIATE 'INSERT INTO SMTB_USERLOG_DETAILS
            (USER_ID, LAST_SIGNED_ON, NO_SUCCESSIVE_LOGINS, NO_CUMULATIVE_LOGINS)
     VALUES (' || chr(39) || userID(x) || chr(39) || ', NULL,  1, 1)';
         
  END LOOP;
  EXCEPTION
        WHEN OTHERS THEN
            dbms_output.put_line('ISSUE IN INSERTING SSTB_USER/SMTB_USERLOG_DETAILS ' || SQLERRM);
      p_err_code  := 'ERROR IN INSERTING INTO SSTB_USER/SMTB_USERLOG_DETAILS';
      dbms_output.put_line('p_err_code  :='||p_err_code);
      p_err_param := substr(SQLERRM, 1, 255);
      dbms_output.put_line('p_err_param  :='||p_err_param);
      dbms_output.put_line('When Others Error : ' || SQLERRM);
       dbg ( 'Error 6 user 1 create:'||SQLERRM);
      return;
  END;       
  p_err_code := 'SUCCESS';
  p_err_param := 'SUCCESS';
  END pr_insert_sms_users;
  /