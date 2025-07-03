CREATE OR REPLACE PACKAGE Cspks_Req_Utils AS
  /*------------------------------------------------------------------------------------------
  ** This source is part of the Oracle FLEXCUBE Universal Banking Software Product
  ** Copyright © 2008 - 2015  Oracle and/or its affiliates.  All rights reserved.
  **                        
  ** No part of this work may be reproduced, stored in a retrieval system,
  ** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
  ** translated in any language or computer language,
  ** without the prior written permission of Oracle and/or its affiliates.
  **
  **
  ** Oracle Financial Services Software Limited.
  ** Oracle Park, Off Western Express Highway,
  ** Goregaon (East),
  ** Mumbai - 400 063, India.
  ------------------------------------------------------------------------------------------
  */
  /*
   -------------------------------------------------------------------------------------------------------
   CHANGE HISTORY
   SFR No                   :Revamped Version
   Changed By               :Radha
   Change Description       :Code Cleaned Up
   
      Changed By                 : Hemalatha/Sweta Panda
  Changed On                  : 20-Dec-2012
  Search String               : 9NT1525_12.0_RETRO_TFCBTWD_15963301
  Change Description          : Providing Hook for having Different TD masking(Extensibility changes).
  
    Changed By        : Sandeep Sang
    Changed On        : 14-Feb-2014
    Fix Description   : FCUBS_12.0.3_SEPA_Upgrade_V3.2_To_V7.0
    Search String     : 9NT1620-FCUBS_12.0.3_SEPA_Upgrade_V3.2_To_V7.0

  Changed By                  : Sarva Karunakaran
  Changed On                  : 31-July-2015
  Search String               : Amendable Change for Unified Payments
  Change Description          : Retro of Citi Changes - Added procedure for giving the Amend Array Fileds in Bit Format

  Changed By                  : Anil Subramanian
  Changed On                  : 12-Sep-2016
  Search String               : UDF package name changed from Uvpks to Copks
  Change Description          : Standalone12.3 Changes
  **
  Changed By         : Vinutha Kini
  Changed On		 : 27-Sep-2016
  Change Description : Retro from 12.2Supp to 12.3Core
  Search String		 : FCUBS_Retro_12.2Supp__12.3Core  
  
  Changed By         : Ravisankar P
  Changed On		 : 29-Oct-2020
  Change Description : Changes to modify error message during snapshot id validation
  Search String		 : OBTF14.5_Snapshot_ID_Validation
   -------------------------------------------------------------------------------------------------------
   */
  --FCUBS_Retro_12.2Supp__12.3Core starts --Declarations are moved from SQL to SPC
  g_Skip_Kernel BOOLEAN := FALSE;
  g_Skip_Cluster BOOLEAN := FALSE;
  g_Skip_Custom  BOOLEAN := FALSE;  
  
  PROCEDURE Pr_Skip_Handler(p_Stage IN VARCHAR2);
  --FCUBS_Retro_12.2Supp__12.3Core Ends

  FUNCTION Fn_Getparam(p_Text_Clob IN CLOB,
                       p_Pos       IN NUMBER,
                       p_Sep       IN VARCHAR2 DEFAULT '~') RETURN VARCHAR2;
  FUNCTION Fn_Gen_Error_Message(p_Code   IN VARCHAR2,
                                p_Params IN VARCHAR2,
                                p_Msg    OUT VARCHAR2) RETURN VARCHAR2;

  FUNCTION Fn_Exists(p_Tag  IN VARCHAR2,
                     p_List IN VARCHAR2,
                     p_Sep  IN VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Get_Item_Desc(p_Source      IN Cotms_Source.Source_Code%TYPE,
                            p_Function_Id IN Smtbs_Menu.Function_Id%TYPE,
                            p_Item        IN VARCHAR2) RETURN VARCHAR2;

  PROCEDURE Pr_Log_Error(p_Source      IN Cotms_Source.Source_Code%TYPE,
                         p_Function_Id IN Smtbs_Menu.Function_Id%TYPE,
                         p_Err_Code    IN VARCHAR2,
                         p_Err_Params  IN VARCHAR2);

  PROCEDURE Pr_Filter_Err_Type(p_Type IN Ertb_Msgs.TYPE%TYPE);
  FUNCTION Fn_Get_Table_Name(p_Table IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION Fn_Scan_Error_List RETURN VARCHAR2;
  PROCEDURE Pr_Get_Final_Err_Code(p_Function_Id   IN VARCHAR2,
                                  p_Action_Code   IN VARCHAR2,
                                  p_Post_Upl_Stat IN VARCHAR2,
                                  p_Err_Code      IN OUT VARCHAR2,
                                  p_Err_Params    IN OUT VARCHAR2);

  PROCEDURE Pr_Get_Maint_Err(p_Action_Code   IN VARCHAR2,
                             p_Post_Upl_Stat IN VARCHAR2,
                             p_Err_Code      IN OUT VARCHAR2,
                             p_Err_Params    IN OUT VARCHAR2);

  FUNCTION Fn_Get_Rec_Key(p_Function_Id  IN VARCHAR2,
                          p_Master_Node  IN VARCHAR2,
                          p_Pk_Cols      IN VARCHAR2,
                          p_Pk_Vals      IN VARCHAR2,
                          p_Rec_Key      IN OUT VARCHAR2,
                          p_Error_Code   IN OUT VARCHAR2,
                          p_Error_Params IN OUT VARCHAR2)
  
   RETURN BOOLEAN;
  FUNCTION Fn_Get_Resultant_Error_Type RETURN VARCHAR2;

  FUNCTION Fn_Get_Auto_Auth_Status(p_Source            IN Cotms_Source.Source_Code%TYPE,
                                   p_Module            IN Cotms_Source_Pref.Module_Code%TYPE,
                                   p_Function_Id       IN Smtbs_Menu.Function_Id%TYPE,
                                   p_Action_Code       IN VARCHAR2,
                                   p_Prev_Auth_Stat    IN VARCHAR2,
                                   p_Multi_Trip_Ref_No IN VARCHAR2,
                                   p_Request_No        IN NUMBER,
                                   p_Post_Upl_Stat     IN OUT VARCHAR2,
                                   p_Error_Code        IN OUT VARCHAR2,
                                   p_Error_Params      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Get_Upload_Status(p_Source            IN Cotms_Source.Source_Code%TYPE,
                                p_Module            IN Cotms_Source_Pref.Module_Code%TYPE,
                                p_Function_Id       IN Smtbs_Menu.Function_Id%TYPE,
                                p_Action_Code       IN VARCHAR2,
                                p_Multi_Trip_Ref_No IN VARCHAR2,
                                p_Request_No        IN NUMBER,
                                p_Post_Upl_Stat     IN OUT VARCHAR2,
                                p_Error_Code        IN OUT VARCHAR2,
                                p_Error_Params      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  --Amendable Change for Unified Payments starts
  /*Pr_Get_Amendable_Details: 
  This procedure will be called from INFRA.*/
  PROCEDURE Pr_Get_Amendable_Details(p_Origin_Source IN VARCHAR2,
                                     p_function_id   IN VARCHAR2,
                                     p_action_code   IN VARCHAR2,
                                     p_Amend_Details IN OUT VARCHAR2);
  FUNCTION Fn_Get_Amendable_Details(p_Source_Code      IN VARCHAR2,
                                    p_Source_Operation IN Gwtm_Amend_Detail.Source_Operation%TYPE,
                                    p_Origin_Source    IN VARCHAR2,
                                    p_Amendable_Nodes  IN OUT NOCOPY Cspks_Req_Global.Ty_Amend_Nodes,
                                    p_Amendable_Fields IN OUT NOCOPY Cspks_Req_Global.Ty_Amend_Fields,
                                    p_Err_Code         IN OUT VARCHAR2,
                                    p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --Amendable Change for Unified Payments ends

  FUNCTION Fn_Get_Amendable_Details(p_Source_Code      IN VARCHAR2,
                                    p_Source_Operation IN Gwtm_Amend_Detail.Source_Operation%TYPE,
                                    p_Amendable_Nodes  IN OUT NOCOPY Cspks_Req_Global.Ty_Amend_Nodes,
                                    p_Amendable_Fields IN OUT NOCOPY Cspks_Req_Global.Ty_Amend_Fields,
                                    p_Err_Code         IN OUT VARCHAR2,
                                    p_Err_Params       IN OUT VARCHAR2
                                    
                                    ) RETURN BOOLEAN;

  FUNCTION Fn_Validate_Restr_Text(p_Value IN VARCHAR2) RETURN VARCHAR2;
  FUNCTION Fn_Validate_Restr_Text(p_Value      IN VARCHAR2,
                                  p_Field_Name IN VARCHAR2,
                                  p_Err_Code   IN OUT VARCHAR2,
                                  p_Err_Params IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Maint_Basic_Validations(p_Source           IN VARCHAR2,
                                      p_Source_Operation IN VARCHAR2,
                                      p_Function_Id      IN VARCHAR2,
                                      p_Action_Code      IN VARCHAR2,
                                      p_Prev_Mod_No      IN NUMBER,
                                      p_Sent_Mod_No      IN NUMBER,
                                      p_Auth_Stat        IN VARCHAR2,
                                      p_Record_Stat      IN VARCHAR2,
                                      p_Once_Auth        IN VARCHAR2,
                                      p_Prev_Key_Tags    IN VARCHAR2,
                                      p_Prev_Key_Vals    IN VARCHAR2,
                                      p_Key_Id           IN VARCHAR2,
                                      p_Key              IN VARCHAR2,
                                      p_Err_Code         IN OUT VARCHAR2,
                                      p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Maint_Basic_Validations(p_Source           IN VARCHAR2,
                                      p_Source_Operation IN VARCHAR2,
                                      p_Function_Id      IN VARCHAR2,
                                      p_Action_Code      IN VARCHAR2,
                                      p_Prev_Mod_No      IN NUMBER,
                                      p_Sent_Mod_No      IN NUMBER,
                                      p_Auth_Stat        IN VARCHAR2,
                                      p_Record_Stat      IN VARCHAR2,
                                      p_Once_Auth        IN VARCHAR2,
                                      p_Key_Id           IN VARCHAR2,
                                      p_Key              IN VARCHAR2,
                                      p_Err_Code         IN OUT VARCHAR2,
                                      p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Maint_Operations(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_Master_Table     IN VARCHAR2,
                               p_Row_Id           IN ROWID,
                               p_Mod_No           IN NUMBER,
                               p_Maker_Stamp      IN DATE,
                               p_Checker_Stamp    IN DATE,
                               p_Key_Id           IN VARCHAR2,
                               p_Key              IN VARCHAR2,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Maint_Log(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Multi_Trip_Id    IN VARCHAR2,
                        p_Request_No       IN VARCHAR2,
                        p_Master_Node      IN VARCHAR2,
                        p_Key_Id           IN VARCHAR2,
                        p_Mod_No           IN NUMBER,
                        p_Post_Upl_Stat    IN VARCHAR2,
                        p_Tanking_Status   IN VARCHAR2,
                        p_Record_Master    IN Sttbs_Record_Master%ROWTYPE,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Param        IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Get_Key_Desc(p_Source      IN VARCHAR2,
                           p_Function_Id IN VARCHAR2,
                           p_Key_Def     IN VARCHAR2,
                           p_Key_Id      IN VARCHAR2)
  
   RETURN VARCHAR2;

  FUNCTION Fn_Get_Key_Id(p_Function_Id  IN VARCHAR2,
                         p_Master_Node  IN VARCHAR2,
                         p_Pk_Cols      IN VARCHAR2,
                         p_Pk_Vals      IN VARCHAR2,
                         p_Key_Id       IN OUT VARCHAR2,
                         p_Error_Code   IN OUT VARCHAR2,
                         p_Error_Params IN OUT VARCHAR2)
  
   RETURN BOOLEAN;

  FUNCTION Fn_Get_Func_Udf_Key(p_Function_Id  IN VARCHAR2,
                               p_Master_Node  IN VARCHAR2,
                               p_Pk_Cols      IN VARCHAR2,
                               p_Pk_Vals      IN VARCHAR2,
                               p_Rec_Key      IN OUT VARCHAR2,
                               p_Error_Code   IN OUT VARCHAR2,
                               p_Error_Params IN OUT VARCHAR2)
  
   RETURN BOOLEAN;
  FUNCTION Fn_Get_Txn_Udf_Key(p_Function_Id  IN VARCHAR2,
                              p_Master_Node  IN VARCHAR2,
                              p_Pk_Cols      IN VARCHAR2,
                              p_Pk_Vals      IN VARCHAR2,
                              p_Rec_Key      IN OUT VARCHAR2,
                              p_Error_Code   IN OUT VARCHAR2,
                              p_Error_Params IN OUT VARCHAR2)
  
   RETURN BOOLEAN;
  FUNCTION Fn_Get_Key_Information(p_Source           IN VARCHAR2,
                                  p_Source_Operation IN VARCHAR2,
                                  p_Function_Id      IN VARCHAR2,
                                  p_Action_Code      IN VARCHAR2,
                                  p_Function_Type    IN VARCHAR2,
                                  p_Master_Node      IN VARCHAR2,
                                  p_Master_Block     IN VARCHAR2,
                                  p_Master_Xsd_Node  IN VARCHAR2,
                                  p_Pk_Cols          IN VARCHAR2,
                                  p_Pk_Vals          IN VARCHAR2,
                                  p_Key_Info         IN OUT Cspks_Req_Global.Ty_Addl_Info,
                                  p_Error_Code       IN OUT VARCHAR2,
                                  p_Error_Params     IN OUT VARCHAR2)
  
   RETURN BOOLEAN;
  FUNCTION Fn_Field_Log_Reqd(p_Function_Id IN VARCHAR2,
                             p_Action_Code IN VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Log_Func_Udf_Changes(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Key_Id           IN VARCHAR2,
                                   p_Mod_No           IN NUMBER,
                                   p_Prev_Udf         IN Copkss_Udf_Upload.Ty_Upl_Func_Udf,--Standalone12.3 Changes
                                   p_Curr_Udf         IN Copkss_Udf_Upload.Ty_Upl_Func_Udf,--Standalone12.3 Changes
                                   p_Tb_Field_Log     IN OUT NOCOPY Cspks_Req_Global.Ty_Tb_Fld_Log,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Get_Func_Udf_Node_Data(p_Node_Data  IN OUT Cspks_Req_Global.Ty_Tb_Chr_Node_Data,
                                     p_Err_Code   IN OUT VARCHAR2,
                                     p_Err_Params IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Get_Txn_Udf_Node_Data(p_Node_Data  IN OUT Cspks_Req_Global.Ty_Tb_Chr_Node_Data,
                                    p_Err_Code   IN OUT VARCHAR2,
                                    p_Err_Params IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Get_Tanked_Data(p_Source                    IN VARCHAR2,
                              p_Source_Operation          IN VARCHAR2,
                              p_Function_Id               IN VARCHAR2,
                              p_Action_Code               IN VARCHAR2,
                              p_Key_Id                    IN VARCHAR2,
                              p_Mod_No                    IN NUMBER,
                              p_With_Lock                 IN VARCHAR2,
                              p_Tanked_Data_Found         IN OUT BOOLEAN,
                              p_Bld_Type_From_Tanked_Data IN OUT BOOLEAN,
                              p_Error_Code                IN OUT VARCHAR2,
                              p_Error_Params              IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Tank_Modification(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Error_Code       IN OUT VARCHAR2,
                                p_Error_Params     IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Process_Tanked_Entries(p_Source           IN VARCHAR2,
                                     p_Source_Operation IN VARCHAR2,
                                     p_Function_Id      IN VARCHAR2,
                                     p_Action_Code      IN VARCHAR2,
                                     p_Key_Id           IN VARCHAR2,
                                     p_Mod_No           IN NUMBER,
                                     p_New_Action       IN OUT VARCHAR2,
                                     p_Error_Code       IN OUT VARCHAR2,
                                     p_Error_Params     IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Complete_Pending_Tasks(p_Source           IN VARCHAR2,
                                     p_Source_Operation IN VARCHAR2,
                                     p_Function_Id      IN VARCHAR2,
                                     p_Action_Code      IN VARCHAR2,
                                     p_Error_Code       IN OUT VARCHAR2,
                                     p_Error_Params     IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Populate_Audit_Log(p_Action_Code IN VARCHAR2,
                                 p_Error_Code  IN OUT VARCHAR2,
                                 p_Error_Param IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Log_Overrides(p_Msg_Id      IN VARCHAR2,
                            p_Req_Seq_No  IN VARCHAR2,
                            p_Error_Code  IN OUT VARCHAR2,
                            p_Error_Param IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Update_Ovd_Remarks(p_Msg_Id      IN VARCHAR2,
                                 p_Req_Seq_No  IN VARCHAR2,
                                 p_Action_Code IN VARCHAR2,
                                 p_Error_Code  IN OUT VARCHAR2,
                                 p_Error_Param IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Is_Req_Fc_Format(p_Source      IN Cotms_Source.Source_Code%TYPE,
                               p_Function_Id IN VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Is_Res_Fc_Format(p_Source      IN Cotms_Source.Source_Code%TYPE,
                               p_Function_Id IN VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Get_Report_Params(p_Branch_Code   IN VARCHAR2,
                                p_User_Id       IN VARCHAR2,
                                p_Gen_Mode      IN VARCHAR2,
                                p_Main_Function IN VARCHAR2,
                                p_Function_Id   IN VARCHAR2,
                                p_Chr_Params    IN OUT Cspks_Req_Global.Ty_Tb_Chr_Func_Params,
                                p_Error_Code    IN OUT VARCHAR2,
                                p_Error_Params  IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_check_branch_rights(p_branch_code  IN VARCHAR2,
                                  p_user_id      IN VARCHAR2,
                                  p_function_id  IN VARCHAR2,
                                  p_error_code   IN OUT VARCHAR2,
                                  p_error_params IN OUT VARCHAR2)
    RETURN BOOLEAN;

  --9NT1525_12.0_RETRO_TFCBTWD_15963301 starts
  procedure pr_Reset_skip_var(p_skip_kernel      out boolean,
                              p_skip_precluster  out boolean,
                              p_skip_postcluster out boolean,
                              p_skip_custom      out boolean);
  --9NT1525_12.0_RETRO_TFCBTWD_15963301 ends  
  --9NT1620-FCUBS_12.0.3_SEPA_Upgrade_V3.2_To_V7.0 START
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  PROCEDURE Pr_Set_Skip_Custom;
  PROCEDURE Pr_Set_Activate_Custom;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
  FUNCTION Fn_Skip_Custom RETURN BOOLEAN;
  FUNCTION Fn_Skip_Cluster RETURN BOOLEAN;
  --9NT1620-FCUBS_12.0.3_SEPA_Upgrade_V3.2_To_V7.0 END

  PROCEDURE Pr_Set_Req_Source (p_req_source VARCHAR2);--Tanking Changes
  FUNCTION Fn_Insert_Snapshot(p_Key_id      IN  SMTB_KEY_SNAPSHOT_LOG.KEY_ID%TYPE
                              ,p_Function_Id IN OUT SMTB_KEY_SNAPSHOT_LOG.Function_Id%TYPE
                              ,p_Action      IN  SMTB_KEY_SNAPSHOT_LOG.Action%TYPE
                              ,p_User_Id     IN  SMTB_KEY_SNAPSHOT_LOG.User_Id%TYPE
                              ,p_snapshot_id OUT SMTB_KEY_SNAPSHOT_LOG.snapshot_id%TYPE) RETURN BOOLEAN;
  FUNCTION Fn_Check_Snapshot(p_Key_id      IN SMTB_KEY_SNAPSHOT_LOG.KEY_ID%TYPE
                             ,p_Function_Id IN OUT SMTB_KEY_SNAPSHOT_LOG.Function_Id%TYPE
                             ,p_Snapshot_Id IN SMTB_KEY_SNAPSHOT_LOG.snapshot_id%TYPE 
							 ,p_user_id     OUT SMTB_KEY_SNAPSHOT_LOG.user_id%TYPE --OBTF14.5_Snapshot_ID_Validation added
							 ,p_action      OUT SMTB_KEY_SNAPSHOT_LOG.action%TYPE  --OBTF14.5_Snapshot_ID_Validation added
							 ) RETURN BOOLEAN;
  FUNCTION Fn_Get_Snapshot(p_Key_id      IN  SMTB_KEY_SNAPSHOT_LOG.KEY_ID%TYPE
                           ,p_Function_Id IN OUT SMTB_KEY_SNAPSHOT_LOG.Function_Id%TYPE) RETURN VARCHAR2;  
END Cspks_Req_Utils;
/
Create or Replace Synonym Cspkss_Req_Utils for Cspks_Req_Utils
/