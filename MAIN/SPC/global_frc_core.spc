CREATE OR REPLACE PACKAGE global_frc_core IS
 /*-------------------------------------------------------------------------------------------------------------------------------
   **
   ** File Name    : Global_FRC_CORE.SPC
   **
   ** Module       : AC
   **
   ** This source is part of the Oracle FLEXCUBE Software Product.
   ** Copyright (R) 2017 , Oracle and/or its affiliates.  All rights reserved
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
  ------------------------------------------------------------------------------------------------------------

  Modified By           : Venkatalakshmi B
  Modified On          : 29-Oct-2012
  Modified Reason   : Performance Tuning : Added new FRC functions and commented unwanted wrapper functions
  Search String       : 9NT1532 : 29/Oct/2012 - Performance Tuning With FRC

  Modified By           : Gouri
  Modified On          : 14-May-2015
  Modified Reason   : Performance Tuning : Added new FRC functions for iftb_jobs
  Search String       : 12.1 FRC-Performance Tuning

  Modified By           : Pankaj
  Modified On          : 14-May-2015
  Modified Reason   : Performance Tuning : Added new FRC functions for better performance
  Search String       : FCUBS12.1 Performance tuning using Result Cache
	**
	** Changed by 	 : Vinutha Kini 
	** Changed on 	 : 26-July-2016
	** Description	 : Core clean up for 12.3Payments
	** Search String : Standalone12.3 CleanUp
  **	
  Modified By           : Vinutha Kini
  Modified On          : 04-Oct-2016
  Modified Reason   : Modulewise gateway services processing
  Search String       : FCUBS_Standalone12.3_CleanUp_1
   **  
   ** Modified By      : Perumal
   ** Modified On      : 04-Aug-2017
   ** Modified Reason  : UTL_FILE changes to use Directory name instead of Directory path
   ** Search String    : FCUBS_12.5_12cR2_Conversion_Changes   
------------------------------------------------------------------------------------------------------------------------------- 
*/

g_Tbl_sttm_branch_rec sttm_core_branch%ROWTYPE ;
g_Tbl_sttm_dates_rec sttm_dates%ROWTYPE ;
g_Tbl_sttm_bank_rec  sttm_core_bank%ROWTYPE ;
g_Tbl_sttm_branch_node_rec sttm_branch_node%ROWTYPE ;
g_Tbl_gwtb_parameters_rec gwtb_parameters%ROWTYPE ;
g_Tbl_gwtb_poss_param_rec gwtb_Poss_param%ROWTYPE ;
g_Tbl_sttm_branch_status_rec sttm_core_branch_Status%ROWTYPE ;--Standalone12.3 Cleanup
g_Tbl_sttm_brn_swift_addr_rec Sttms_Core_Swift_Address%ROWTYPE;--Standalone12.3 Cleanup
g_Tbl_sttm_brn_pref_rec Sttms_Core_Branch_Pref%ROWTYPE;--Standalone12.3 Cleanup
--9NT1532 : 29/Oct/2012 - Performance Tuning With FRC starts
/*
TYPE g_Tbl_smtb_parameters IS TABLE OF smtb_parameters%ROWTYPE INDEX BY PLS_INTEGER ;
g_Tbl_smtb_parameters_rec g_Tbl_smtb_parameters ; */
--g_Tbl_smtb_parameters_rec smtb_parameters%ROWTYPE ; --SMSStandalone12.3 Changes
g_Tbl_cstb_param_rec cstb_param%ROWTYPE ; --SMSStandalone12.3 Changes
--9NT1532 : 29/Oct/2012 - Performance Tuning With FRC ends 
TYPE  g_Tbl_smtb_act_cntrl_defn IS TABLE OF smtb_action_controls%ROWTYPE INDEX BY PLS_INTEGER ;
g_Tbl_smtb_act_cntrl_defn_rec g_Tbl_smtb_act_cntrl_defn ;

g_Tbl_smtb_menu_defn_rec smtb_menu%ROWTYPE ;
g_Tbl_smtb_txn_sts_defn_rec smtb_txn_status%ROWTYPE;
g_Tbl_smtb_usr_fnc_defn_rec smtb_users_functions%ROWTYPE ;
--g_Tbl_detm_branch_cond_rec Detm_Branch_Cond%ROWTYPE ;--Standalone12.3 CleanUp
--g_Tbl_brn_refresh_defn_rec Fbtb_Branch_Refresh_Defn%ROWTYPE ;--Standalone12.3 CleanUp
g_Tbl_smtb_modules_rec Smtb_Modules%ROWTYPE ;
--g_Tbl_sttb_brn_rfrsh_func_rec Sttb_Brn_Refresh_Func%ROWTYPE ; --Standalone12.3 CleanUp
g_Tbl_smtb_language_rec Smtb_Language%ROWTYPE ;
--g_Tbl_cstb_features_rec cstbs_features%ROWTYPE ; --Standalone12.3 CleanUp
g_Tbl_cstb_dates_rec  cstb_dates%ROWTYPE ;
g_Tbl_gwtm_fcj_functions_rec  gwtm_fcj_functions%ROWTYPE ;
g_Tbl_Smtb_User_Rec Smtb_User%ROWTYPE ; --9NT1532 : 29/Oct/2012 - Performance Tuning With FRC
--FCUBS12.1 Performance tuning using Result Cache starts
g_Tbl_cytm_ccy_pair_def_rec cytm_ccy_pair_defn_master%ROWTYPE;
--g_Tbl_cstm_denm_master_rec cstm_denm_master%ROWTYPE; --Standalone12.3 CleanUp
g_Tbl_cstm_amtword_ccy_rec cstm_amtword_ccy%ROWTYPE;
g_Tbl_cytm_ccy_defn_rec cytm_ccy_defn_master%ROWTYPE;
g_Tbl_sttm_lcl_holiday_rec sttm_lcl_holiday%ROWTYPE;
g_Tbl_ertb_msgs_rec ertb_msgs%ROWTYPE;
--g_Tbl_iftb_jobs_Rec iftb_jobs%ROWTYPE; --Standalone12.3 CleanUp
--g_Tbl_sttm_cus_seg_maping_Rec sttm_cust_seg_mapping%ROWTYPE; --Standalone12.3 CleanUp
g_Tbl_cytm_rates_master_Rec cytm_rates_master%ROWTYPE;
--FCUBS_Standalone12.3_CleanUp_1
g_Tbl_smtb_modules_group_Rec smtb_modules_group%ROWTYPE;
--FCUBS_Standalone12.3_CleanUp_1
--FCUBS12.1 Performance tuning using Result Cache ends
-------------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_get_brn_rec_frc(p_brn IN VARCHAR2 )
RETURN sttms_core_branch%ROWTYPE RESULT_CACHE ;
-------------------------------------------------------------------------------------------------------------------------------
FUNCTION Fn_Get_Brn_Rec_Wrp(p_brn IN VARCHAR2,
                  p_err_code IN OUT VARCHAR2,
                 p_err_param IN OUT VARCHAR2 )
RETURN BOOLEAN ;
-------------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_Get_Brn_Date_FRC(p_Brn IN VARCHAR2 )
RETURN Sttm_Dates%ROWTYPE RESULT_CACHE ;
-------------------------------------------------------------------------------------------------------------------------------
FUNCTION  Fn_Get_Brn_Date_Wrp(p_brn IN VARCHAR2 ,
                  p_err_code IN OUT VARCHAR2,
                 p_err_param IN OUT VARCHAR2 )
RETURN BOOLEAN ;
-------------------------------------------------------------------------------------------------------------------------------
FUNCTION fn_get_cstb_dates_rec_frc(p_DateType IN VARCHAR2)
RETURN cstb_dates%ROWTYPE RESULT_CACHE ;
-------------------------------------------------------------------------------------------------------------------------------
FUNCTION Fn_Get_Cstb_Dates_Rec_Wrp(p_DateType IN VARCHAR2,
                          p_err_code IN OUT VARCHAR2,
                          p_err_param IN OUT VARCHAR2 )
RETURN BOOLEAN ;
-------------------------------------------------------------------------------------------------------------------------------
 FUNCTION fn_get_bank_rec_frc
RETURN sttm_core_bank%ROWTYPE RESULT_CACHE ;
-------------------------------------------------------------------------------------------------------------------------------

FUNCTION Fn_Get_Bank_Rec_Wrp(p_err_code IN OUT VARCHAR2,
                     p_err_param IN OUT VARCHAR2 )
RETURN BOOLEAN;
-------------------------------------------------------------------------------------------------------------------------------
FUNCTION Fn_Get_Brn_Node_Rec_Wrp(p_brn IN VARCHAR2,
                          p_err_code IN OUT VARCHAR2,
                          p_err_param IN OUT VARCHAR2 )
RETURN BOOLEAN ;
-------------------------------------------------------------------------------------------------------------------------------
FUNCTION Fn_Get_smtb_act_cntrl_Rec_Wrp(p_action IN VARCHAR2,
                          p_err_code IN OUT VARCHAR2,
                          p_err_param IN OUT VARCHAR2 )
RETURN BOOLEAN ;
-------------------------------------------------------------------------------------------------------------------------------
FUNCTION Fn_Get_smtb_menu_Rec_Wrp(p_function_id IN VARCHAR2,
                          p_err_code IN OUT VARCHAR2,
                          p_err_param IN OUT VARCHAR2 )
RETURN BOOLEAN ;
-------------------------------------------------------------------------------------------------------------------------------
FUNCTION Fn_Get_smtb_txn_status_Rec_Wrp(p_txn_status IN CHAR,
                                        p_auth_status IN CHAR,
                                        p_int_status  IN VARCHAR2,
                     p_err_code IN OUT VARCHAR2,
                     p_err_param IN OUT VARCHAR2 )
RETURN BOOLEAN ;
-------------------------------------------------------------------------------------------------------------------------------
--9NT1532 : 29/Oct/2012 - Performance Tuning With FRC starts
/*
FUNCTION fn_get_nls_paramters_rec_frc(p_param       IN VARCHAR2  )
RETURN VARCHAR2 RESULT_CACHE ;
-------------------------------------------------------------------------------------------------------------------------------
 FUNCTION Fn_Get_nls_paramters_Rec_Wrp(p_param       IN VARCHAR2,
                                      p_err_code IN OUT VARCHAR2,
                                      p_err_param IN OUT VARCHAR2 )
RETURN BOOLEAN ; */
--9NT1532 : 29/Oct/2012 - Performance Tuning With FRC ends
-------------------------------------------------------------------------------------------------------------------------------
FUNCTION Fn_Get_Gwtb_parameters_Rec_Wrp(p_param_name       IN VARCHAR2,
                                      p_err_code IN OUT VARCHAR2,
                    p_err_param IN OUT VARCHAR2
                                      )
RETURN BOOLEAN ;
-------------------------------------------------------------------------------------------------------------------------------
FUNCTION Fn_Get_Gwtb_poss_param_Rec_Wrp(p_paramname       IN VARCHAR2,
                                      p_err_code IN OUT VARCHAR2,
                    p_err_param IN OUT VARCHAR2
                                      )
RETURN BOOLEAN ;
-------------------------------------------------------------------------------------------------------------------------------
FUNCTION Fn_Get_Gwtb_parameters_Rec_Frc(p_param_name IN VARCHAR2)
RETURN gwtb_parameters%ROWTYPE RESULT_CACHE ;
-------------------------------------------------------------------------------------------------------------------------------
--SMSStandalone12.3 Changes starts
/*FUNCTION Fn_Get_Smtb_parameters_Rec_Frc
--9NT1532 : 29/Oct/2012 - Performance Tuning With FRC 
--RETURN g_Tbl_smtb_parameters RESULT_CACHE ;
RETURN smtb_parameters%ROWTYPE RESULT_CACHE ;*/
FUNCTION Fn_Get_Cstb_Param_Rec_Frc
--9NT1532 : 29/Oct/2012 - Performance Tuning With FRC
--RETURN g_Tbl_smtb_parameters RESULT_CACHE ;
RETURN cstb_param%ROWTYPE RESULT_CACHE ;
--SMSStandalone12.3 Changes ends
-------------------------------------------------------------------------------------------------------------------------------
--SMSStandalone12.3 Changes starts
/*FUNCTION Fn_Get_Smtb_parameters_Rec_Wrp(p_err_code IN OUT VARCHAR2,
                                                                                   p_err_param IN OUT VARCHAR2)
RETURN BOOLEAN ;*/
FUNCTION Fn_Get_cstb_param_Rec_Wrp(p_err_code IN OUT VARCHAR2,
                                                                                   p_err_param IN OUT VARCHAR2)
RETURN BOOLEAN ;
--SMSStandalone12.3 Changes ends
-------------------------------------------------------------------------------------------------------------------------------
--Standalone12.3 CleanUp Start
/*FUNCTION Fn_Get_Brn_cond_Rec_Wrp(p_brncode       IN VARCHAR2,
                                      p_err_code IN OUT VARCHAR2,
                                      p_err_param IN OUT VARCHAR2)
RETURN BOOLEAN ;
-------------------------------------------------------------------------------------------------------------------------------
FUNCTION Fn_Get_Brn_Rfrsh_Defn_Rec_Wrp(p_tablename       IN VARCHAR2,
                                                                            p_err_code IN OUT VARCHAR2,
                                                                            p_err_param IN OUT VARCHAR2)
RETURN BOOLEAN;*/
--Standalone12.3 CleanUp End
-------------------------------------------------------------------------------------------------------------------------------
FUNCTION Fn_Get_Smtb_Modules_Rec_Wrp(p_moduleid       IN VARCHAR2,
                                                                            p_err_code IN OUT VARCHAR2,
                                                                            p_err_param IN OUT VARCHAR2)
RETURN BOOLEAN ;
-------------------------------------------------------------------------------------------------------------------------------
--Standalone12.3 CleanUp Start
/*FUNCTION Fn_Get_Brn_Rfrsh_Func_Rec_Wrp(p_functionid   IN VARCHAR2,
                                                                            p_err_code IN OUT VARCHAR2,
                                                                            p_err_param IN OUT VARCHAR2)
RETURN BOOLEAN ;*/
--Standalone12.3 CleanUp End
-------------------------------------------------------------------------------------------------------------------------------
FUNCTION Fn_Get_Smtb_Language_Rec_Frc(p_langcd IN VARCHAR2)
RETURN Smtb_Language%ROWTYPE RESULT_CACHE  ;
-------------------------------------------------------------------------------------------------------------------------------
--9NT1532 : 29/Oct/2012 - Performance Tuning With FRC starts
/*FUNCTION Fn_Get_Smtb_Language_Rec_Wrp(p_langcd   IN VARCHAR2,
                                                                            p_err_code IN OUT VARCHAR2,
                                                                            p_err_param IN OUT VARCHAR2)
RETURN BOOLEAN ;*/
--9NT1532 : 29/Oct/2012 - Performance Tuning With FRC ends
-------------------------------------------------------------------------------------------------------------------------------
--Standalone12.3 CleanUp Start
/*FUNCTION Fn_Get_cstb_features_Rec_Wrp(p_featureid IN VARCHAR2 ,
                                  p_brncode  IN VARCHAR2,
                                  p_Err_code IN OUT VARCHAR2,
                                  p_Err_params IN OUT VARCHAR2 )
RETURN BOOLEAN ;*/
--Standalone12.3 CleanUp End
-------------------------------------------------------------------------------------------------------------------------------
FUNCTION Fn_Get_Gwtm_Fcj_Func_Wrp(p_function_id IN VARCHAR2 ,
                                  p_action  IN VARCHAR2,
                                  p_Err_code IN OUT VARCHAR2,
                                  p_Err_params IN OUT VARCHAR2 )
RETURN BOOLEAN ;
-------------------------------------------------------------------------------------------------------------------------------
--9NT1532 : 29/Oct/2012 - Performance Tuning With FRC starts
FUNCTION Fn_Get_nls_session_Param_frc(p_parameter IN VARCHAR2)
RETURN VARCHAR2 RESULT_CACHE ;
-------------------------------------------------------------------------------------------------------------------------------
FUNCTION Fn_Get_Smtb_user_frc(p_userid IN VARCHAR2)
RETURN Smtb_User%ROWTYPE RESULT_CACHE ;
--9NT1532 : 29/Oct/2012 - Performance Tuning With FRC ends
-------------------------------------------------------------------------------------------------------------------------------
--12.1 FRC-Performance Tuning start
--Standalone12.3 CleanUp Start
/*FUNCTION Fn_Get_iftb_jobs_frc(p_proc_code IN VARCHAR2,
                              p_brn_code IN VARCHAR2)
RETURN iftb_jobs%ROWTYPE RESULT_CACHE ;*/
--Standalone12.3 CleanUp End
--12.1 FRC-Performance Tuning end
-------------------------------------------------------------------------------------------------------------------------------
--FCUBS12.1 Performance tuning using Result Cache starts
FUNCTION Fn_Get_cstm_amtword_ccy_frc(p_lang IN VARCHAR2 ,
                                  p_ccy IN VARCHAR2)
RETURN cstm_amtword_ccy%ROWTYPE RESULT_CACHE ;
-------------------------------------------------------------------------------------------------------------------------------
FUNCTION Fn_Get_cytm_ccy_defn_frc(p_ccy_code IN VARCHAR2)
RETURN cytm_ccy_defn_master%ROWTYPE RESULT_CACHE;
-------------------------------------------------------------------------------------------------------------------------------
FUNCTION Fn_Get_ertb_msgs_frc(p_err_code IN VARCHAR2,
                              p_language IN VARCHAR2)
RETURN ertb_msgs%ROWTYPE RESULT_CACHE;
-------------------------------------------------------------------------------------------------------------------------------
--Standalone12.3 CleanUp Start
/*
FUNCTION Fn_Get_sttm_cus_seg_maping_frc(p_customer_no IN VARCHAR2)
RETURN sttm_cust_seg_mapping%ROWTYPE RESULT_CACHE;
*/
--Standalone12.3 CleanUp End
-------------------------------------------------------------------------------------------------------------------------------
FUNCTION Fn_Get_cytm_rates_master_frc(p_branch_code IN VARCHAR2,
                                      p_ccy1 IN VARCHAR2,
									  p_ccy2 IN VARCHAR2)
RETURN cytm_rates_master%ROWTYPE RESULT_CACHE;
-------------------------------------------------------------------------------------------------------------------------------
FUNCTION Fn_Get_cytm_ccy_pair_def_frc(p_ccy1 IN VARCHAR2,
									  p_ccy2 IN VARCHAR2)
RETURN cytm_ccy_pair_defn_master%ROWTYPE RESULT_CACHE;
-------------------------------------------------------------------------------------------------------------------------------
--Standalone12.3 CleanUp Start
/*FUNCTION Fn_Get_cstm_denm_master_frc(p_denm_ccy IN VARCHAR2)
RETURN cstm_denm_master%ROWTYPE RESULT_CACHE;*/
--Standalone12.3 CleanUp End
-------------------------------------------------------------------------------------------------------------------------------
--FCUBS12.1 Performance tuning using Result Cache ends

--Standalone12.3 CleanUp Start
FUNCTION Get_Sttm_Host_Code_Frc(p_Host_Code IN Sttm_Host_Code.Host_Code%TYPE)
RETURN Sttm_Host_Code%ROWTYPE RESULT_CACHE;

FUNCTION Get_Sttm_Host_Code(p_Host_Code      IN Sttm_Host_Code.Host_Code%TYPE,
                            p_Sttm_Host_Code OUT Sttm_Host_Code%ROWTYPE)
RETURN BOOLEAN;

FUNCTION fn_get_brn_status_rec_frc(p_brn IN VARCHAR2)
RETURN Sttms_core_Branch_Status%ROWTYPE RESULT_CACHE;

FUNCTION Fn_Get_Brn_Status_Rec_Wrp(p_brn IN VARCHAR2,
                  p_err_code IN OUT VARCHAR2,
                 p_err_param IN OUT VARCHAR2)
RETURN BOOLEAN;


FUNCTION fn_get_brn_swift_addr_rec_frc(p_brn IN VARCHAR2)
RETURN Sttms_Core_Swift_Address%ROWTYPE  RESULT_CACHE;

FUNCTION Fn_Get_Brn_Swift_Addr_Wrp(p_brn IN VARCHAR2,
                                  p_err_code IN OUT VARCHAR2,
                                  p_err_param IN OUT VARCHAR2 )
RETURN BOOLEAN;



FUNCTION fn_get_brn_pref_rec_frc(p_brn IN VARCHAR2)
RETURN Sttms_Core_Branch_Pref%ROWTYPE RESULT_CACHE;

FUNCTION Fn_Get_Brn_Pref_Wrp(p_brn IN VARCHAR2,
                                  p_err_code IN OUT VARCHAR2,
                                  p_err_param IN OUT VARCHAR2 )
RETURN BOOLEAN;

--Standalone12.3 CleanUp End

--FCUBS_Standalone12.3_CleanUp_1
FUNCTION fn_get_modules_group_rec_frc(p_module IN VARCHAR2)
RETURN Smtb_modules_group%ROWTYPE RESULT_CACHE;

FUNCTION Fn_Get_modules_group_Wrp(p_module IN VARCHAR2,
                                  p_err_code IN OUT VARCHAR2,
                                  p_err_param IN OUT VARCHAR2 )
RETURN BOOLEAN;

--FCUBS_Standalone12.3_CleanUp_1

--FCUBS_12.5_12cR2_Conversion_Changes starts
  FUNCTION Fn_Get_Directory_Name(p_file_path   IN VARCHAR2,
                                 p_dir_name    OUT VARCHAR2,
                                 p_err_code    IN OUT VARCHAR2,
                                 p_err_params  IN OUT VARCHAR2) RETURN BOOLEAN;
--FCUBS_12.5_12cR2_Conversion_Changes ends

END Global_FRC_CORE;
/
CREATE OR REPLACE SYNONYM GLOBALS_FRC_CORE FOR GLOBAL_FRC_CORE
/