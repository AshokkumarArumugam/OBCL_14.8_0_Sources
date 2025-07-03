CREATE OR REPLACE PACKAGE  olpks_oldrlovr_main AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldrlovr_main.spc
  **
  ** Module     : Oracle Lending
  ** 
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright (R) 2008,2025 , Oracle and/or its affiliates.  All rights reserved
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
TYPE ty_tb__oltbs_contract_linkages IS TABLE OF oltb_contract_linkages%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_contract_inf_linkages IS TABLE OF oltb_contract_inf_linkages%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_contract_revision_sch IS TABLE OF oltb_contract_revision_sch%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__contract_roll_int_rates IS TABLE OF oltb_contract_roll_int_rates%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_contract_cmtredn_due IS TABLE OF oltb_contract_cmtredn_due%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_contract_comp_aliq_redfn IS TABLE OF oltb_contract_comp_aliq_redfn%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_oltb_inst_schedules IS TABLE OF oltb_inst_schedules%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_contract_penalty_comp IS TABLE OF oltb_contract_penalty_comp%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_oltb_contract_liq IS TABLE OF oltb_contract_liq%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_olvws_schedule_summary IS TABLE OF olvw_schedule_summary%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_oltbs_amount_due IS TABLE OF oltb_amount_due%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_olvws_amount_settled IS TABLE OF olvw_amount_settled%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_oltbs_acc_coll_link_dtls IS TABLE OF oltb_acc_coll_link_dtls%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_contract_schedules__paid IS TABLE OF oltb_contract_schedules%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__oltbs_contract_man_roll IS TABLE OF oltb_contract_man_roll%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_contract_fincentre_dtl IS TABLE OF oltb_contract_fincentre_dtl%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_tract_fincentre_dtl__rvn IS TABLE OF oltb_contract_fincentre_dtl%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_tract_fincentre_dtl__mat IS TABLE OF oltb_contract_fincentre_dtl%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_tract_fincentre_dtl__prn IS TABLE OF oltb_contract_fincentre_dtl%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_oltbs_contract_iccf_calc IS TABLE OF oltb_contract_iccf_calc%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_olvws_contract_iccf_calc IS TABLE OF olvw_contract_iccf_calc%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_olvws_cont_dsbr_sch IS TABLE OF olvw_cont_dsbr_sch%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_olvws_cont_dsbr_spl_dtls IS TABLE OF olvw_cont_dsbr_spl_dtls%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__lftbs_cont_addl_int_dtl IS TABLE OF lftb_cont_addl_int_dtl%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_oltbs_amount_due__comp IS TABLE OF oltb_amount_due%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_amount_due__compdtls IS TABLE OF oltb_amount_due%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_iccf_calc__compdtls IS TABLE OF olvw_contract_iccf_calc%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_amount_settled__compdtls IS TABLE OF olvw_amount_settled%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_oltbs_contract_roll_comp IS TABLE OF oltb_contract_roll_comp%ROWTYPE INDEX BY BINARY_INTEGER;

TYPE ty_oldrlovr IS RECORD (
      v_oltbs_contract     oltb_contract%ROWTYPE,
      v_oltbs_contract_master     oltb_contract_master%ROWTYPE,
      v_oltbs_contract_preference     oltb_contract_preference%ROWTYPE,
      v_oltbs_contract_schedules    ty_tb_oltbs_contract_schedules,
      v_oltbs_contract_linkages    ty_tb__oltbs_contract_linkages,
      v_contract_inf_linkages    ty_tb_v_contract_inf_linkages,
      v_contract_revision_sch    ty_tb_v_contract_revision_sch,
      v_oltbs_contract_rollover     oltb_contract_rollover%ROWTYPE,
      v_contract_roll_int_rates    ty_tb__contract_roll_int_rates,
      v_oltbs_contract_event_log     oltb_contract_event_log%ROWTYPE,
      v_contract_cmtredn_due    ty_tb_v_contract_cmtredn_due,
      v_contract_comp_aliq_redfn    ty_tb_contract_comp_aliq_redfn,
      v_oltb_inst_schedules    ty_tb_v_oltb_inst_schedules,
      v_contract_penalty_comp    ty_tb_v_contract_penalty_comp,
      v_oltb_contract_liq    ty_tb_v_oltb_contract_liq,
      v_oltbs_contract_balance     oltb_contract_balance%ROWTYPE,
      v_olvws_schedule_summary    ty_tb_v_olvws_schedule_summary,
      v_oltbs_amount_due    ty_tb_v_oltbs_amount_due,
      v_olvws_amount_settled    ty_tb_v_olvws_amount_settled,
      v_oltbs_acc_coll_link_dtls    ty_tb_oltbs_acc_coll_link_dtls,
      v_contract_schedules__paid    ty_tb_contract_schedules__paid,
      v_oltbs_contract_man_roll    ty_tb__oltbs_contract_man_roll,
      v_oltbs_contract_control     oltb_contract_control%ROWTYPE,
      v_cstb_ui_columns     cstb_ui_columns%ROWTYPE,
      v_contract_fincentre_dtl    ty_tb_v_contract_fincentre_dtl,
      v_ntract_fincentre_dtl__rvn    ty_tb_tract_fincentre_dtl__rvn,
      v_ntract_fincentre_dtl__mat    ty_tb_tract_fincentre_dtl__mat,
      v_ntract_fincentre_dtl__prn    ty_tb_tract_fincentre_dtl__prn,
      v_oltbs_contract_iccf_calc    ty_tb_oltbs_contract_iccf_calc,
      v_olvws_contract_iccf_calc    ty_tb_olvws_contract_iccf_calc,
      v_olvws_cont_dsbr_sch    ty_tb_v_olvws_cont_dsbr_sch,
      v_olvws_cont_dsbr_spl_dtls    ty_tb_olvws_cont_dsbr_spl_dtls,
      v_lftbs_cont_addl_int_dtl    ty_tb__lftbs_cont_addl_int_dtl,
      v_oltbs_amount_due__comp    ty_tb_v_oltbs_amount_due__comp,
      v_amount_due__compdtls    ty_tb_v_amount_due__compdtls,
      v_iccf_calc__compdtls    ty_tb_v_iccf_calc__compdtls,
      v_amount_settled__compdtls    ty_tb_amount_settled__compdtls,
      v_contract_version_roll     oltb_contract_version_roll%ROWTYPE,
      v_oltbs_contract_roll_comp    ty_tb_oltbs_contract_roll_comp,
                  ty_lfcintch Lfpks_Lfcintch_Main.ty_lfcintch,
                  ty_lfctrchg Lfpks_Lfctrchg_Main.ty_lfctrchg,
                  ty_txctrtax Txpks_Txctrtax_Main.ty_txctrtax,
                  ty_olcondet Olpks_Olcondet_Main.ty_olcondet,
                  ty_lfcfeecf Lfpks_Lfcfeecf_Main.ty_lfcfeecf,
                  ty_lfcfrmnt Lfpks_Lfcfrmnt_Main.ty_lfcfrmnt,
                  ty_olctrmis Olpks_Olctrmis_Main.ty_olctrmis,
                  ty_olctrudf Olpks_Olctrudf_Main.ty_olctrudf,
                  ty_olctradv Lfpks_Olctradv_Main.ty_olctradv,
                  ty_olctrent Olpks_Olctrent_Main.ty_olctrent,
                  ty_olcintrt Olpks_Olcintrt_Main.ty_olcintrt,
                  ty_olcflrcl Olpks_Olcflrcl_Main.ty_olcflrcl,
                  ty_olcconrl Olpks_Olcconrl_Main.ty_olcconrl,
                  ty_olconbrw Olpks_Olconbrw_Main.ty_olconbrw,
                  ty_olcsprol Olpks_Olcsprol_Main.ty_olcsprol,
                  ty_lbcbadtl Lbpks_Lbcbadtl_Main.ty_lbcbadtl,
                  ty_olcrores Olpks_Olcrores_Main.ty_olcrores,
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
p_Child_oldrlovr     IN  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Master_OLDTRONL     IN OUT  Olpks_Oldtronl_Main.Ty_OLDTRONL);
PROCEDURE Pr_Convert_Master_To_Child (
p_Master_OLDTRONL     IN  Olpks_Oldtronl_Main.Ty_OLDTRONL,
p_Child_oldrlovr     IN  OUT olpks_oldrlovr_Main.Ty_oldrlovr);

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
                        p_oldrlovr          IN OUT  olpks_oldrlovr_Main.Ty_oldrlovr,
                        p_Status            IN OUT VARCHAR2 ,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Build_Ts_List (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern   IN  VARCHAR2,
p_oldrlovr          IN olpks_oldrlovr_Main.Ty_oldrlovr,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Resolve_Ref_Numbers (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldrlovr     IN  OUT olpks_oldrlovr_Main.ty_oldrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Product_Default         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldrlovr     IN  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Wrk_oldrlovr      IN OUT  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Subsys_Pickup         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldrlovr     IN  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Prev_oldrlovr IN OUT  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Wrk_oldrlovr      IN OUT  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Enrich         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldrlovr     IN  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Prev_oldrlovr IN OUT  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Wrk_oldrlovr      IN OUT  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Check_Mandatory (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_oldrlovr IN OUT  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
  RETURN BOOLEAN;
FUNCTION Fn_Default_And_Validate        (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN  OUT   VARCHAR2,
p_oldrlovr     IN  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Prev_oldrlovr IN OUT  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Wrk_oldrlovr IN OUT  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Upload_Db         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_oldrlovr     IN  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Prev_oldrlovr     IN  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Wrk_oldrlovr      IN OUT  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Process         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_oldrlovr     IN  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Prev_oldrlovr     IN  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Wrk_oldrlovr      IN OUT  olpks_oldrlovr_Main.Ty_oldrlovr,
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
p_oldrlovr         IN  olpks_oldrlovr_Main.Ty_oldrlovr, 
p_Wrk_oldrlovr  IN   OUT  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_addl_info       IN Cspks_Req_Global.Ty_Addl_Info,
p_oldrlovr       IN   OUT olpks_oldrlovr_Main.ty_oldrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_oldrlovr       IN   OUT olpks_oldrlovr_Main.Ty_oldrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldrlovr          IN olpks_oldrlovr_Main.Ty_oldrlovr,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern IN       VARCHAR2,
p_oldrlovr          IN olpks_oldrlovr_Main.Ty_oldrlovr,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Check_Mandatory (p_Source    IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_oldrlovr IN  olpks_oldrlovr_Main.ty_oldrlovr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Basic_Vals        (p_Source    IN     VARCHAR2,
p_oldrlovr     IN  olpks_oldrlovr_Main.ty_oldrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Merge_Amendables        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
p_oldrlovr     IN  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Prev_oldrlovr IN olpks_oldrlovr_Main.Ty_oldrlovr,
p_Wrk_oldrlovr IN OUT olpks_oldrlovr_Main.Ty_oldrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Check_Mandatory_Nodes  (p_Source    IN     VARCHAR2,
p_Wrk_oldrlovr IN  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Lov_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_oldrlovr     IN  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_oldrlovr     IN  OUT olpks_oldrlovr_Main.Ty_oldrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_and_Validate        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldrlovr     IN  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Prev_oldrlovr IN OUT  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Wrk_oldrlovr IN OUT  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Upload_Db         (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldrlovr     IN  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Prev_oldrlovr     IN  olpks_oldrlovr_Main.Ty_oldrlovr,
p_Wrk_oldrlovr      IN OUT  olpks_oldrlovr_Main.Ty_oldrlovr,
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
p_oldrlovr         IN  olpks_oldrlovr_Main.ty_oldrlovr, 
p_Wrk_oldrlovr  IN   OUT olpks_oldrlovr_Main.ty_oldrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Query_Desc_Fields  ( p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Wrk_oldrlovr  IN   OUT olpks_oldrlovr_Main.ty_oldrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Get_Node_Data ( 
p_Node_Data         IN OUT Cspks_Req_Global.Ty_Tb_Chr_Node_Data,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
END olpks_oldrlovr_main;
/
CREATE OR REPLACE SYNONYM olpkss_oldrlovr_main FOR olpks_oldrlovr_main
/