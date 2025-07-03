CREATE OR REPLACE PACKAGE Smpks IS
   /*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
**
**
** No part of this work may be reproduced, stored in a retrieval system, adopted
** or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise, translated in any
** language or computer language, without the prior written permission of
** Oracle and/or its affiliates.
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India
** India
------------------------------------------------------------------------------------------
*/
/*
   CHANGE_HISTORY
   
   08/08/2000 4.0 Added two functions. Fn_Signon_Vlidate and Fn_Check_User_login for performance tunining
   15/05/20001 4.2 Generic Interfaces needed adding fn_encrypt1 and fn_decrypt1 from 3.3.1 version of smpks
   02-06-2001  Function to copy the details of an existing role FCC 42
   20-06-2001  Two more parameters home_branch and current_branch passed to the procedure
       pr_update_user_signedon.
   20-06-2001  The new function fn_clear_users was added to the package.
   
   11APR2002   A new function fn_limits_validate was added to the package
   
   02-MAR-2003  FCC 5.2 - 9i changes  Both the spec and the body need to have the same default parameters in Oracle 9i
   
   28-APRIL-2003  FCC5.3 - Added One functions fn_check_auto_auth for auto authorize.
   
   09-JUNE-2006  FCC7.1.0.0.0.0.1 FJB Changes
   
   29-APRIL-2006 FC UBS V.UM 7.2.0.0.0.0.0-LOT1  Modified the function fn_get_controlstrings to get the branch as an IN parameter
                                     Modified the function fn_chk_userrights to get the action as an IN parameter
                                     and made the function as a public function.
                                     Search String for the changes "29-APRIL-2006 FC UBS V.UM 7.2.0.0.0.0.0-LOT1"
   
   13-NOV-2006 KERNEL73      Retro from FC UBS Kernel FJB 7.1.1
   11-DEC-2006 FCC73ITR1 SFR#69 Function fn_ldap_search is added for SSO
    04-DEC-2009 FC11.0 RETRO SFR-7 For Time Level Chnage(SMDCHGTL)
    
    Date: 19/05/2011
    Release: FCUBS11.3
    Changed By: Jayanth
    Bug Number: 12566330
    Description: Security Changes: Commented the specifications of Password Encrypt and Decrypt functions.
    Search Tag: FCUBS11.1INFRA Security Changes - 12566330

       Changed By           :  Surendra Gubba
       Changed On           :  19-Dec-2012
       Search String        :  Bug#16019960
       Change Description   :  Extensible Hook Request
 Modified By           : Pankaj
  Modified On          : 14-Apr-2014
  Modified Reason   : Performance Tuning : fn_get_controlstrings is set as result_cache function
  Search String       : 9NT1532 : 29/Oct/2012 - Performance Tuning With FRC 
  
  Updated By           : Harikrishna Jangili
  Release              : FCUBS 12.1
  Change Description   : FCUBS_12.1 Dev Override changes
  Search Tag           : FCUBS_12.1 Dev Override changes
	**
	** Changed by 	 : Vinutha Kini
	** Changed on 	 : 26-July-2016
	** Description	 : Core clean up for 12.3Payments
	** Search String : Standalone12.3 CleanUp  
	
	 Modified By           : Arun V
     Modified On           : 06-Mar-2018
     Modified Reason       : Included purging logic for DB debug changes
     Search String         : FCUBS DB Logging Debug Changes
	 
	 Modified By           : Arun V
     Modified On           : 23-Mar-2018
     Modified Reason       : Changed in out parameters
     Search String         : FCUBS DB Logging Debug Changes_2

  	Modified By           : Shen
	Modified On           : 27-Jan-2019
	Modified Reason       : Tables involving frequent DML or High Volume has been made as Normal Function instead of FRC.
							Because in these cases it is causing Contention/latch and Result cache is getting often invalidated and causing Performance
							overhead.
	Search String         : SFR#29225625
      */

   -- Package specification
--Bug#16019960 Starts
   g_tb_cluster_data Global.Ty_Tb_Cluster_Data ;
--Bug#16019960 Ends
   FUNCTION Fn_And_Controlstrings(Ctl_String1 VARCHAR2
                                 ,Ctl_String2 VARCHAR2) RETURN VARCHAR2;

   --FCC 5.2 - 9i changes
   --FUNCTION FN_GETPARAM ( TEXT varchar2 , POS number , SEP varchar2 ) RETURN
   FUNCTION Fn_Getparam(Text VARCHAR2
                       ,Pos  NUMBER
                       ,Sep  VARCHAR2 DEFAULT '~') RETURN VARCHAR2;

   --FCUBS11.1INFRA Security Changes - 12566330
   /*FUNCTION Fn_App_Scramble(Num   NUMBER
                           ,Useed NUMBER) RETURN CHAR;*/

   FUNCTION Fn_Check_New_Password(Userid VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Check_User_Logged_In(Userid VARCHAR2) RETURN BOOLEAN;

   --FCUBS11.1INFRA Security Changes - 12566330
   /*FUNCTION FN_DECRYPT_PASSWORD ( PWD varchar2 , USERID varchar2 ) RETURN
   VARCHAR2 ;*/

   --TRLRABO Fix added so that FN_DECRYPT_PASSWORD can be directly used in the selects
   -- 14-APR-98

   --PRAGMA RESTRICTION is commented as part of S390 Changes
   --PRAGMA RESTRICT_REFERENCES (FN_DECRYPT_PASSWORD ,WNDS,WNPS);

   --FCUBS11.1INFRA Security Changes - 12566330
   /*FUNCTION FN_DECR_GET_STRING ( VCHAR varchar2 , USERID varchar2 )RETURN
   VARCHAR2 ;*/

   --TRLRABO Fix added so that FN_DECRYPT_PASSWORD can be directly used in the selects
   -- 14-APR-98

   --PRAGMA RESTRICTION is commented as part of S390 Changes

   --PRAGMA RESTRICT_REFERENCES (FN_DECR_GET_STRING ,WNDS,WNPS);

   --FCUBS11.1INFRA Security Changes - 12566330
   /*FUNCTION FN_ENCRYPT_APP_PASSWORD ( PWDSTRING varchar2 , USERID varchar2 )
   RETURN VARCHAR2 ;*/

   --FCUBS11.1INFRA Security Changes - 12566330
   /*FUNCTION FN_ENCRYPT_PASSWORD ( PWDSTRING varchar2 , USERID varchar2 )
   RETURN VARCHAR2 ;*/

   FUNCTION Fn_Get_Number(Vchar CHAR) RETURN NUMBER;
   --TRLRABO Fix added so that FN_DECRYPT_PASSWORD can be directly used in the selects
   -- 14-APR-98
   PRAGMA RESTRICT_REFERENCES(Fn_Get_Number, WNDS, WNPS);

   FUNCTION Fn_Get_String(Num NUMBER) RETURN CHAR;

   --FCUBS11.1INFRA Security Changes - 12566330
   /*FUNCTION Fn_Scramble(Num NUMBER) RETURN CHAR;*/

   FUNCTION Fn_User_Chgbrn_Signoff(Userid VARCHAR2) RETURN BOOLEAN;

   --FCUBS11.1INFRA Security Changes - 12566330
   /*FUNCTION Fn_User_Seed(Userid VARCHAR2) RETURN NUMBER;*/
   --TRLRABO Fix added so that FN_DECRYPT_PASSWORD can be directly used in the selects
   -- 14-APR-98

   --PRAGMA RESTRICTION is commented as part of S390 Changes
   --PRAGMA RESTRICT_REFERENCES (FN_USER_SEED ,WNDS,WNPS);

   FUNCTION Fn_User_Signoff(Userid     VARCHAR2
                           ,Terminalid VARCHAR2) RETURN BOOLEAN;

   FUNCTION Y2k_To_Char(d DATE) RETURN VARCHAR2;
   PRAGMA RESTRICT_REFERENCES(Y2k_To_Char, WNDS, WNPS);

   FUNCTION Y2k_To_Char(c CHAR) RETURN VARCHAR2;
   PRAGMA RESTRICT_REFERENCES(Y2k_To_Char, WNDS, WNPS);

   PROCEDURE Pr_Commit_Form;

   PROCEDURE Pr_End_Sms_Log(Serial_No   NUMBER
                           ,p_Date      VARCHAR2
                           ,p_Module_Id VARCHAR2
                           ,p_Update    NUMBER
                           ,p_Error     NUMBER);

   PROCEDURE Pr_Start_Sms_Log(p_Seq_No      IN OUT NUMBER
                             ,p_Log_Type    CHAR
                             ,p_User_Id     VARCHAR2
                             ,p_Function_Id VARCHAR2
                             ,p_Date        VARCHAR2
                             ,p_Terminal    VARCHAR2
                             ,p_Description VARCHAR2
                             ,p_Moduleid    VARCHAR2
                             ,p_Update      NUMBER);

   --FC11.0 RETRO SFR-7 Starts
   PROCEDURE Pr_Update_Time_Level(Brcode VARCHAR2
                                 ,Timlvl NUMBER
                                 ,Modno  NUMBER);
   --FC11.0 RETRO SFR-7 Ends

   PROCEDURE Pr_Update_Time_Level(Brcode VARCHAR2
                                 ,Timlvl NUMBER);

   PROCEDURE Pr_Update_User_Func(Userid     VARCHAR2
                                ,Roleid     VARCHAR2
                                ,Homebranch VARCHAR2);

   PROCEDURE Pr_User_Role_Functions(Roleid   VARCHAR2
                                   ,Branchid VARCHAR2
                                   ,FUNCTION VARCHAR2);

   --FCUBS11.1INFRA Security Changes - 12566330
   /*PROCEDURE PR_DECRYPT_ACTIVATION_KEY (
   LICENCED_USERS                OUT NUMBER                     ,
   LICENCED_BRANCHES             OUT NUMBER                     ,
   SITE_CODE                     OUT VARCHAR2                  );*/

   --SMSStandalone12.3 changes
   /*PROCEDURE Pr_Update_Invalid_Logins(Userid VARCHAR2
                                     ,Tid    VARCHAR2);*/
   -- trlrabo added new parameter tid so that sms log can be updated on disabling of user
	--SMSStandalone12.3 changes
   /*PROCEDURE Pr_Update_User_Password(Userid          VARCHAR2
                                    ,Password        VARCHAR2
                                    ,Applicationdate VARCHAR2);*/

   ---- By BNMurthy to update history for control clerks
   --SMSStandalone12.3 changes
   /*PROCEDURE Pr_Update_Control_Password(Userid1   VARCHAR2
                                       ,Userid2   VARCHAR2
                                       ,Password1 VARCHAR2
                                       ,Password2 VARCHAR2);*/
   ----
   --SMSStandalone12.3 Changes
   /*PROCEDURE Pr_Update_User_Signedon(Terminalid       VARCHAR2
                                    ,Userid           VARCHAR2
                                    ,p_Date           VARCHAR2
                                    ,p_Home_Branch    VARCHAR2
                                    ,p_Current_Branch VARCHAR2);*/

   FUNCTION Fn_Check_User_Auth_Rights(Puserid     IN Smtbs_User.User_Id%TYPE
                                     ,Pfunctionid IN Smtbs_Menu.Function_Id%TYPE
                                     ,Pamount     IN Smtbs_User.Max_Override_Amt%TYPE
                                     ,Perrorcode  OUT Ertbs_Msgs.Err_Code%TYPE) RETURN BOOLEAN;

   FUNCTION Fn_Check_User_Auth_Rights(Puserid     IN Smtbs_User.User_Id%TYPE
                                     ,Pfunctionid IN Smtbs_Menu.Function_Id%TYPE) RETURN BOOLEAN;

   FUNCTION Fn_Check_User_Password(Puserid    IN Smtbs_User.User_Id%TYPE
                                  ,Ppassword  IN Smtbs_User.User_Password%TYPE
                                  ,Perrorcode OUT Ertbs_Msgs.Err_Code%TYPE) RETURN BOOLEAN;

   FUNCTION Fn_Get_Controlstrings(Userid        VARCHAR2
                                 ,Functionid    VARCHAR2
                                 ,p_Txn_Status  VARCHAR2
                                 ,p_Auth_Status VARCHAR2
                                 ,p_Int_Status  VARCHAR2) RETURN VARCHAR2;

   --29-APRIL-2006 FC UBS V.UM 7.2.0.0.0.0.0-LOT1 changes -> starts
   FUNCTION Fn_Get_Controlstrings(Userid        VARCHAR2
                                 ,Functionid    VARCHAR2
                                 ,p_Branch      VARCHAR2
                                 ,p_Txn_Status  VARCHAR2
                                 ,p_Auth_Status VARCHAR2
                                 ,p_Int_Status  VARCHAR2) 
								--SFR#29225625 Changes starts FRC Removed								 
								 RETURN VARCHAR2;
								-- RETURN VARCHAR2 RESULT_CACHE ; --9NT1532 : 29/Oct/2012 - Performance Tuning With FRC
							--SFR#29225625 Changes ends FRC Removed								 
   FUNCTION Fn_Chk_Userrights(p_User_Id     IN Smtbs_User.User_Id%TYPE
                             ,p_Function_Id IN Smtbs_Menu.Function_Id%TYPE
                             ,p_Branch      IN Sttms_Core_Branch.Branch_Code%TYPE
                             ,p_Action      IN Smtbs_Action_Controls.Action_Name%TYPE) RETURN BOOLEAN;
   --29-APRIL-2006 FC UBS V.UM 7.2.0.0.0.0.0-LOT1 -> ends

   PROCEDURE Pr_Populate_Temp(Userid VARCHAR2);

   PROCEDURE Pr_Delete_Temp(Userid VARCHAR2);

   PROCEDURE Pr_Delete_Temp_Guest;

   -- fn_signon_validate, newly added in release 4.0
   FUNCTION Fn_Signon_Validate(p_Sm_Terminal_Id      IN VARCHAR2
                              ,p_Version             OUT VARCHAR2
                              ,p_Cs_Site_Code        OUT VARCHAR2
                              ,p_Cs_Application_Date OUT VARCHAR2
                              ,p_X9$                 OUT VARCHAR2
                              ,p_Lov_Custname        OUT VARCHAR2
                              ,p_Lic_To              OUT VARCHAR2
                              ,p_Error               OUT VARCHAR2
                              ,p_Error_Param         OUT VARCHAR2) RETURN BOOLEAN;

   -- fn_check_user_login, newly added in release 4.0
   --SMSStandalone12.3 Changes
   /*FUNCTION Fn_Check_User_Login(p_Userpwd             IN VARCHAR2
                               ,p_Userid              IN VARCHAR2
                               ,p_Prm_Func_Id         IN VARCHAR2
                               ,p_Sm_Terminal_Id      IN VARCHAR2
                               ,p_Nls_Date_Format     IN VARCHAR2
                               ,p_Sm_Lang_Code        OUT VARCHAR2
                               ,p_Cs_Move_Count       OUT NUMBER
                               ,p_Sm_Input_Limit      OUT NUMBER
                               ,p_Sm_Auth_Limit       OUT NUMBER
                               ,p_Cs_Application_Date IN OUT DATE
                               ,p_Sm_Home_Branch      OUT VARCHAR2
                               ,p_Sm_Current_Branch   OUT VARCHAR2
                               ,p_Cs_Eur_Lcy          OUT VARCHAR2
                               ,p_Cs_Fund_Branch      OUT VARCHAR2
                               ,p_Cs_Bank_Code        OUT VARCHAR2
                               ,p_Sm_Ho_Branch        OUT VARCHAR2
                               ,p_Cs_Local_Ccy        OUT VARCHAR2
                               ,p_Branch_Stat         OUT VARCHAR2
                               ,p_Serial_No           OUT NUMBER
                               ,p_Cs_Ccy_Mask         OUT VARCHAR2
                               ,p_Cs_Min_Date         OUT VARCHAR2
                               ,p_Cs_Max_Date         OUT VARCHAR2
                               ,p_Error               OUT VARCHAR2
                               ,p_Error_Param         OUT VARCHAR2) RETURN BOOLEAN;*/

   --FCUBS11.1INFRA Security Changes - 12566330
   /*FUNCTION fn_encrypt1
   (
   p_pwd             IN       VARCHAR2,
   p_key             IN       VARCHAR2,
   p_encrypted_pwd   OUT   VARCHAR2
   )RETURN BOOLEAN;*/

   --FCUBS11.1INFRA Security Changes - 12566330
   /*FUNCTION fn_decrypt1
   (
   p_encrypted_pwd   IN       VARCHAR2,
   p_key             IN       VARCHAR2,
   p_pwd             OUT   VARCHAR2
   )RETURN BOOLEAN;*/

   --02-06-2001  Function to copy the details of an existing role FCC 42
	--SMSStandalone12.3 changes
   /*FUNCTION Fn_Role_Copy(p_Old_Role_Id IN VARCHAR2
                        ,p_New_Role_Id IN VARCHAR2) RETURN BOOLEAN;*/

   --FCC 4.3 new funtion added to logout users and kill the underlying FLEXCUBE oracle sessions
   FUNCTION Fn_Clear_Users(Puserlist IN VARCHAR2
                          ,Pcurruser IN VARCHAR2
                          ,Pbranch   IN VARCHAR2) RETURN BOOLEAN;

   -- FCC5.0 additions  new function fn_limits_validate

   FUNCTION Fn_Limits_Validate(p_Flag          IN CHAR
                              ,p_Ccy           IN CYTM_CCY_DEFN.CCY_CODE%TYPE --Standalone12.3 CleanUp
                              ,p_Amount        IN NUMBER -- Detbs_Jrnl_Log.Amount%TYPE --Standalone12.3 CleanUp
                              ,p_User_Id       IN Smtb_User_Role.User_Id%TYPE
                              ,p_Curr_Brn_Code IN Smtb_Role_Detail.Branch_Code%TYPE
                              ,p_Error_Code    OUT Ertbs_Msgs.Err_Code%TYPE
                              ,p_Error_Param   OUT VARCHAR2) RETURN BOOLEAN;

   --FCC 5.3 CHANGE STARTS

   FUNCTION Fn_Check_Auto_Auth(Puser_Id     IN Smtbs_User.User_Id%TYPE
                              ,Pfunction_Id IN Smtbs_Menu.Function_Id%TYPE
                              ,Pbranch_Code IN Sttms_Core_Branch.Branch_Code%TYPE) RETURN BOOLEAN;

   --FCC 5.3 CHANGE ENDS

   --13-NOV-2006 KERNEL73 starts
   --  FCC7.1.0.0.0.0.1 FJB Changes
   --FCUBS11.1INFRA Security Changes - 12566330
   /*function fn_encrypt_branchPassword (pwdString IN VARCHAR2) 
   return varchar2;*/

   --  FCC7.1.0.0.0.0.1 FJB Changes
   --13-NOV-2006 KERNEL73 ends
   -- FCC73ITR1 SFR#69 changes starts
   --SMSStandalone12.3 changes
   /*FUNCTION Fn_Ldap_Search(Cn_Id      IN VARCHAR2
                          ,Perrorcode OUT Ertbs_Msgs.Err_Code%TYPE) RETURN BOOLEAN;*/
   -- FCC73ITR1 SFR#69 changes ends
   --FCUBS_12.1 Dev Override changes starts
   FUNCTION fn_chk_multi_branch_rights(p_user_id     IN smtbs_user.user_id%TYPE,
                                      p_function_id IN smtbs_menu.function_id%TYPE,
                                      p_branch      IN Sttms_Core_Branch.branch_code%TYPE, -- 29-APRIL-2006 FC UBS V.UM 7.2.0.0.0.0.0-LOT1 -> added
                                      p_action      IN smtbs_action_controls.action_name%TYPE -- 29-APRIL-2006 FC UBS V.UM 7.2.0.0.0.0.0-LOT1 -> added
                                      ) RETURN BOOLEAN;
    --FCUBS_12.1 Dev Override changes end  

	--FCUBS DB Logging Debug Changes ADDED STS
   FUNCTION fn_purge_db_debug(pbranch      IN Sttms_Core_Branch.branch_code%TYPE,--sttms_branch.branch_code%TYPE,--FCUBS DB Logging Debug Changes_2 added
                              pprevious_dt IN DATE,
                              p_err_code   OUT VARCHAR2--ertbs_msgs.err_code%TYPE--FCUBS DB Logging Debug Changes_2 added
							  ) RETURN BOOLEAN;
   --FCUBS DB Logging Debug Changes ADDED ENDS	
END;
/
DROP SYNONYM SMPKSS
/
CREATE SYNONYM SMPKSS FOR SMPKS
/
