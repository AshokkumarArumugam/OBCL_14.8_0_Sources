CREATE OR REPLACE PACKAGE  olpks_oldvamsi_main AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldvamsi_main.spc
  **
  ** Module     : Loans and Deposits
  ** 
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright (R) 2008,2024 , Oracle and/or its affiliates.  All rights reserved
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
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  SFR Number         :  
  Changed By         :  
  Change Description :  
  
  -------------------------------------------------------------------------------------------------------
  */
  
  
TYPE ty_tb_oltbs_contract_schedules IS TABLE OF oltb_contract_schedules%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_oltbs_amount_due IS TABLE OF oltb_amount_due%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_contract_revision_sch IS TABLE OF oltb_contract_revision_sch%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__oltbs_contract_linkages IS TABLE OF oltb_contract_linkages%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_oltbs_drawdown_schedules IS TABLE OF oltb_drawdown_schedules%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_oltbs_inst_schedules IS TABLE OF oltb_inst_schedules%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_ontract_schedules___paid IS TABLE OF oltb_contract_schedules%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_olvws_schedule_summary IS TABLE OF olvw_schedule_summary%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_olvws_amount_settled IS TABLE OF olvw_amount_settled%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_oltbs_contract_iccf_calc IS TABLE OF oltb_contract_iccf_calc%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_olvws_contract_iccf_calc IS TABLE OF olvw_contract_iccf_calc%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_oltbs_amount_due__comp IS TABLE OF oltb_amount_due%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_amount_due__compdtls IS TABLE OF oltb_amount_due%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_iccf_calc__compdtls IS TABLE OF olvw_contract_iccf_calc%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_amount_settled__compdtls IS TABLE OF olvw_amount_settled%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_oltbs_dly_msg_out__msgvw IS TABLE OF oltb_dly_msg_out%ROWTYPE INDEX BY BINARY_INTEGER;

TYPE ty_oldvamsi IS RECORD (
     v_oltbs_contract_master     oltb_contract_master%ROWTYPE,
     v_oltbs_contract     oltb_contract%ROWTYPE,
     v_oltbs_contract_event_log     oltb_contract_event_log%ROWTYPE,
     v_oltbs_contract_schedules    ty_tb_oltbs_contract_schedules,
     v_oltbs_amount_due    ty_tb_v_oltbs_amount_due,
     v_contract_revision_sch    ty_tb_v_contract_revision_sch,
     v_oltbs_contract_preference     oltb_contract_preference%ROWTYPE,
     v_oltbs_contract_linkages    ty_tb__oltbs_contract_linkages,
     v_oltbs_drawdown_schedules    ty_tb_oltbs_drawdown_schedules,
     v_oltbs_contract_change_log     oltb_contract_change_log%ROWTYPE,
     v_oltbs_inst_schedules    ty_tb_v_oltbs_inst_schedules,
     v_oltbs_contract_amend_due     oltb_contract_amend_due%ROWTYPE,
     v_oltbs_contract_control     oltb_contract_control%ROWTYPE,
     v_contract_schedules___paid    ty_tb_ontract_schedules___paid,
     v_olvws_schedule_summary    ty_tb_v_olvws_schedule_summary,
     v_olvws_amount_settled    ty_tb_v_olvws_amount_settled,
     v_oltbs_contract_iccf_calc    ty_tb_oltbs_contract_iccf_calc,
     v_olvws_contract_iccf_calc    ty_tb_olvws_contract_iccf_calc,
     v_oltbs_amount_due__comp    ty_tb_v_oltbs_amount_due__comp,
     v_amount_due__compdtls    ty_tb_v_amount_due__compdtls,
     v_iccf_calc__compdtls    ty_tb_v_iccf_calc__compdtls,
     v_amount_settled__compdtls    ty_tb_amount_settled__compdtls,
     v_oltbs_dly_msg_out__msgvw    ty_tb_oltbs_dly_msg_out__msgvw,
                 ty_lfctrchg Lfpks_Lfctrchg_Main.ty_lfctrchg,
                 ty_lfcintch Lfpks_Lfcintch_Main.ty_lfcintch,
                 ty_olcondet Olpks_Olcondet_Main.ty_olcondet,
                 ty_txctrtax Txpks_Txctrtax_Main.ty_txctrtax,
                 ty_olcstinf Olpks_Olcstinf_Main.ty_olcstinf,
                 ty_olctrmis Olpks_Olctrmis_Main.ty_olctrmis,
                 ty_olctrudf Olpks_Olctrudf_Main.ty_olctrudf,
                 ty_olctradv Lfpks_Olctradv_Main.ty_olctradv,
                 Desc_Fields    Cspks_Req_Global.Ty_Tb_Xml_Data,
                 Addl_Info    Cspks_Req_Global.Ty_Addl_info );

PROCEDURE Pr_Set_Skip_Sys;
PROCEDURE Pr_Set_Activate_Sys;
FUNCTION  Fn_Skip_Sys RETURN BOOLEAN;
PROCEDURE Pr_Set_Skip_Kernel;
PROCEDURE Pr_Set_Activate_Kernel;
FUNCTION  Fn_Skip_Kernel RETURN BOOLEAN;
PROCEDURE Pr_Set_Skip_Master;
PROCEDURE Pr_Set_Activate_Master;
FUNCTION  Fn_Skip_Master RETURN BOOLEAN;
PROCEDURE Pr_Set_Skip_Child;
PROCEDURE Pr_Set_Activate_Child;
FUNCTION  Fn_Skip_Child RETURN BOOLEAN;
FUNCTION Fn_Get_Original_Action RETURN VARCHAR2;
g_autoauth VARCHAR2(1);
PROCEDURE Pr_Convert_Child_To_Master   (
p_Child_oldvamsi     IN  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Master_OLDVAMND     IN OUT  Olpks_Oldvamnd_Main.Ty_OLDVAMND);
PROCEDURE Pr_Convert_Master_To_Child (
p_Master_OLDVAMND     IN  Olpks_Oldvamnd_Main.Ty_OLDVAMND,
p_Child_oldvamsi     IN  OUT olpks_oldvamsi_Main.Ty_oldvamsi);

FUNCTION Fn_Process_Request(p_Source            IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
                        p_Exchange_Pattern  IN     VARCHAR2,
                        p_Multi_Trip_Id     IN  VARCHAR2,
                        p_Request_No        IN     VARCHAR2,
                        p_Addl_Info      IN OUT Cspks_Req_Global.Ty_Addl_Info,
                        p_Status            IN OUT VARCHAR2 ,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Rebuild_Ts_List (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
                        p_Exchange_Pattern  IN     VARCHAR2,
                        p_Status            IN OUT VARCHAR2 ,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Main       (p_Source            IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
                        p_Multi_Trip_Id     IN  VARCHAR2,
                        p_Request_No        IN     VARCHAR2,
                        p_oldvamsi          IN OUT  olpks_oldvamsi_Main.Ty_oldvamsi,
                        p_Status            IN OUT VARCHAR2 ,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Build_Ts_List (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern   IN  VARCHAR2,
p_oldvamsi          IN olpks_oldvamsi_Main.Ty_oldvamsi,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Resolve_Ref_Numbers (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldvamsi     IN  OUT olpks_oldvamsi_Main.ty_oldvamsi,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Product_Default         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldvamsi     IN  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Wrk_oldvamsi      IN OUT  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Subsys_Pickup         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldvamsi     IN  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Prev_oldvamsi IN OUT  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Wrk_oldvamsi      IN OUT  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Enrich         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldvamsi     IN  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Prev_oldvamsi IN OUT  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Wrk_oldvamsi      IN OUT  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Check_Mandatory (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_oldvamsi IN OUT  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
  RETURN BOOLEAN;
FUNCTION Fn_Default_And_Validate        (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN  OUT   VARCHAR2,
p_oldvamsi     IN  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Prev_oldvamsi IN OUT  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Wrk_oldvamsi IN OUT  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Upload_Db         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_oldvamsi     IN  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Prev_oldvamsi     IN  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Wrk_oldvamsi      IN OUT  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Process         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_oldvamsi     IN  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Prev_oldvamsi     IN  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Wrk_oldvamsi      IN OUT  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Query  ( p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Full_Data     IN  VARCHAR2 DEFAULT 'Y',
p_with_lock     IN  VARCHAR2 DEFAULT 'N',
p_QryData_Reqd       IN  VARCHAR2,
p_oldvamsi         IN  olpks_oldvamsi_Main.Ty_oldvamsi, 
p_Wrk_oldvamsi  IN   OUT  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_addl_info       IN Cspks_Req_Global.Ty_Addl_Info,
p_oldvamsi       IN   OUT olpks_oldvamsi_Main.ty_oldvamsi,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_oldvamsi       IN   OUT olpks_oldvamsi_Main.Ty_oldvamsi,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldvamsi          IN olpks_oldvamsi_Main.Ty_oldvamsi,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern IN       VARCHAR2,
p_oldvamsi          IN olpks_oldvamsi_Main.Ty_oldvamsi,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Check_Mandatory (p_Source    IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_oldvamsi IN  olpks_oldvamsi_Main.ty_oldvamsi,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Basic_Vals        (p_Source    IN     VARCHAR2,
p_oldvamsi     IN  olpks_oldvamsi_Main.ty_oldvamsi,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Merge_Amendables        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
p_oldvamsi     IN  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Prev_oldvamsi IN olpks_oldvamsi_Main.Ty_oldvamsi,
p_Wrk_oldvamsi IN OUT olpks_oldvamsi_Main.Ty_oldvamsi,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Check_Mandatory_Nodes  (p_Source    IN     VARCHAR2,
p_Wrk_oldvamsi IN  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Lov_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_oldvamsi     IN  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_oldvamsi     IN  OUT olpks_oldvamsi_Main.Ty_oldvamsi,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_and_Validate        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldvamsi     IN  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Prev_oldvamsi IN OUT  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Wrk_oldvamsi IN OUT  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Upload_Db         (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldvamsi     IN  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Prev_oldvamsi     IN  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Wrk_oldvamsi      IN OUT  olpks_oldvamsi_Main.Ty_oldvamsi,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Query  ( p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Full_Data     IN  VARCHAR2 DEFAULT 'Y',
p_With_Lock     IN  VARCHAR2 DEFAULT 'N',
p_QryData_Reqd       IN  VARCHAR2,
p_oldvamsi         IN  olpks_oldvamsi_Main.ty_oldvamsi, 
p_Wrk_oldvamsi  IN   OUT olpks_oldvamsi_Main.ty_oldvamsi,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Query_Desc_Fields  ( p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Wrk_oldvamsi  IN   OUT olpks_oldvamsi_Main.ty_oldvamsi,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Get_Node_Data ( 
p_Node_Data         IN OUT Cspks_Req_Global.Ty_Tb_Chr_Node_Data,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
END olpks_oldvamsi_main;
/
CREATE OR REPLACE SYNONYM olpkss_oldvamsi_main FOR olpks_oldvamsi_main
/