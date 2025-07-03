CREATE OR REPLACE PACKAGE  lbpks_lbdrlovr_main AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdrlovr_main.spc
  **
  ** Module     : Syndication Loans and Commitments
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
TYPE ty_tb_v_oltb_contract_linkages IS TABLE OF oltb_contract_linkages%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__contract_roll_int_rates IS TABLE OF oltb_contract_roll_int_rates%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_btbs_roll_margin_details IS TABLE OF lbtb_roll_margin_details%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_contract_penalty_comp IS TABLE OF oltb_contract_penalty_comp%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_lbvws_exfx_reval IS TABLE OF lbvw_exfx_reval%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_olvws_schedule_summary IS TABLE OF olvw_schedule_summary%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_oltbs_amount_due IS TABLE OF oltb_amount_due%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_olvws_amount_settled IS TABLE OF olvw_amount_settled%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_process_exception_cs IS TABLE OF oltb_process_exception_cs%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_contract_revision_sch IS TABLE OF oltb_contract_revision_sch%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__lbtbs_acc_coll_link_dtl IS TABLE OF lbtb_acc_coll_link_dtl%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_tract_fincentre_dtl__sch IS TABLE OF oltb_contract_fincentre_dtl%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_tract_fincentre_dtl__mat IS TABLE OF oltb_contract_fincentre_dtl%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_contract_schedules__paid IS TABLE OF oltb_contract_schedules%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_oltbs_contract_iccf_calc IS TABLE OF oltb_contract_iccf_calc%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_btbs_part_coll_link_dtls IS TABLE OF lbtb_part_coll_link_dtls%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_lbtbs_syn_wrapper_detail IS TABLE OF lbtb_syn_wrapper_detail%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_olvws_contract_iccf_calc IS TABLE OF olvw_contract_iccf_calc%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_oltbs_amount_due__comp IS TABLE OF oltb_amount_due%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_amount_due__compdtls IS TABLE OF oltb_amount_due%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_iccf_calc__compdtls IS TABLE OF olvw_contract_iccf_calc%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_amount_settled__compdtls IS TABLE OF olvw_amount_settled%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_oltbs_contract_roll_comp IS TABLE OF oltb_contract_roll_comp%ROWTYPE INDEX BY BINARY_INTEGER;

TYPE ty_lbdrlovr IS RECORD (
      v_oltbs_contract     oltb_contract%ROWTYPE,
      v_lbtbs_drawdown_schedule     lbtb_drawdown_schedule%ROWTYPE,
      v_oltbs_contract_master     oltb_contract_master%ROWTYPE,
      v_oltbs_contract_preference     oltb_contract_preference%ROWTYPE,
      v_oltbs_contract_event_log     oltb_contract_event_log%ROWTYPE,
      v_oltbs_contract_schedules    ty_tb_oltbs_contract_schedules,
      v_lbtbs_contract_reval_pref     lbtb_contract_reval_pref%ROWTYPE,
      v_oltb_contract_linkages    ty_tb_v_oltb_contract_linkages,
      v_oltbs_contract_rollover     oltb_contract_rollover%ROWTYPE,
      v_contract_roll_int_rates    ty_tb__contract_roll_int_rates,
      v_lbtbs_roll_margin_details    ty_tb_btbs_roll_margin_details,
      v_contract_penalty_comp    ty_tb_v_contract_penalty_comp,
      v_lbvws_exfx_reval    ty_tb_v_lbvws_exfx_reval,
      v_olvws_schedule_summary    ty_tb_v_olvws_schedule_summary,
      v_oltbs_amount_due    ty_tb_v_oltbs_amount_due,
      v_olvws_amount_settled    ty_tb_v_olvws_amount_settled,
      v_process_exception_cs    ty_tb_v_process_exception_cs,
      v_contract_revision_sch    ty_tb_v_contract_revision_sch,
      v_exrate_fixing__lbdrexfx     lbtb_roll_exrate_fixing%ROWTYPE,
      v_udf_field_vals__lbcukudf     lbtb_udf_field_vals%ROWTYPE,
      v_intrate_fixing__lbroirfx     lbtb_roll_intrate_fixing%ROWTYPE,
      v_lbtbs_acc_coll_link_dtl    ty_tb__lbtbs_acc_coll_link_dtl,
      v_ntract_fincentre_dtl__sch    ty_tb_tract_fincentre_dtl__sch,
      v_ntract_fincentre_dtl__mat    ty_tb_tract_fincentre_dtl__mat,
      v_contract_schedules__paid    ty_tb_contract_schedules__paid,
      v_oltbs_contract_iccf_calc    ty_tb_oltbs_contract_iccf_calc,
      v_lbtbs_part_coll_link_dtls    ty_tb_btbs_part_coll_link_dtls,
      v_lbtbs_syn_wrapper_detail    ty_tb_lbtbs_syn_wrapper_detail,
      v_olvws_contract_iccf_calc    ty_tb_olvws_contract_iccf_calc,
      v_oltbs_amount_due__comp    ty_tb_v_oltbs_amount_due__comp,
      v_amount_due__compdtls    ty_tb_v_amount_due__compdtls,
      v_iccf_calc__compdtls    ty_tb_v_iccf_calc__compdtls,
      v_amount_settled__compdtls    ty_tb_amount_settled__compdtls,
      v_contract_version_roll     oltb_contract_version_roll%ROWTYPE,
      v_oltbs_contract_roll_comp    ty_tb_oltbs_contract_roll_comp,
                  ty_olcondet Olpks_Olcondet_Main.ty_olcondet,
                  ty_lfctrchg Lfpks_Lfctrchg_Main.ty_lfctrchg,
                  ty_olctrmis Olpks_Olctrmis_Main.ty_olctrmis,
                  ty_olctrudf Olpks_Olctrudf_Main.ty_olctrudf,
                  ty_lbcparat Lbpks_Lbcparat_Main.ty_lbcparat,
                  ty_lfcfeecf Lfpks_Lfcfeecf_Main.ty_lfcfeecf,
                  ty_lbcprtax Lbpks_Lbcprtax_Main.ty_lbcprtax,
                  ty_lbcadvic Lbpks_Lbcadvic_Main.ty_lbcadvic,
                  ty_lbconpty Lbpks_Lbconpty_Main.ty_lbconpty,
                  ty_lbcentty Lbpks_Lbcentty_Main.ty_lbcentty,
                  ty_lbcexrfx Lbpks_Lbcexrfx_Main.ty_lbcexrfx,
                  ty_lbcskmdr Lbpks_Lbcskmdr_Main.ty_lbcskmdr,
                  ty_lbcukudf Lbpks_Lbcukudf_Main.ty_lbcukudf,
                  ty_olcescam Olpks_Olcescam_Main.ty_olcescam,
                  ty_lbcintrs Lbpks_Lbcintrs_Main.ty_lbcintrs,
                  ty_lbcfpmls Lbpks_Lbcfpmls_Main.ty_lbcfpmls,
                  ty_lpcprate Lppks_Lpcprate_Main.ty_lpcprate,
                  ty_olcintrt Olpks_Olcintrt_Main.ty_olcintrt,
                  ty_lbcrthis Lbpks_Lbcrthis_Main.ty_lbcrthis,
                  ty_lbcsprol Lbpks_Lbcsprol_Main.ty_lbcsprol,
                  ty_lbcbadtl Lbpks_Lbcbadtl_Main.ty_lbcbadtl,
                  ty_lfcfrmnt Lfpks_Lfcfrmnt_Main.ty_lfcfrmnt,
                  ty_olcffmbr Olpks_Olcffmbr_Main.ty_olcffmbr,
                  ty_olcffmsg Olpks_Olcffmsg_Main.ty_olcffmsg,
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
p_Child_lbdrlovr     IN  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Master_LBDDDONL     IN OUT  Lbpks_Lbdddonl_Main.Ty_LBDDDONL);
PROCEDURE Pr_Convert_Master_To_Child (
p_Master_LBDDDONL     IN  Lbpks_Lbdddonl_Main.Ty_LBDDDONL,
p_Child_lbdrlovr     IN  OUT lbpks_lbdrlovr_Main.Ty_lbdrlovr);

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
                        p_lbdrlovr          IN OUT  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
                        p_Status            IN OUT VARCHAR2 ,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Build_Ts_List (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern   IN  VARCHAR2,
p_lbdrlovr          IN lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Resolve_Ref_Numbers (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdrlovr     IN  OUT lbpks_lbdrlovr_Main.ty_lbdrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Product_Default         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdrlovr     IN  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Wrk_lbdrlovr      IN OUT  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Subsys_Pickup         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdrlovr     IN  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Prev_lbdrlovr IN OUT  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Wrk_lbdrlovr      IN OUT  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Enrich         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdrlovr     IN  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Prev_lbdrlovr IN OUT  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Wrk_lbdrlovr      IN OUT  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Check_Mandatory (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_lbdrlovr IN OUT  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
  RETURN BOOLEAN;
FUNCTION Fn_Default_And_Validate        (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN  OUT   VARCHAR2,
p_lbdrlovr     IN  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Prev_lbdrlovr IN OUT  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Wrk_lbdrlovr IN OUT  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Upload_Db         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lbdrlovr     IN  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Prev_lbdrlovr     IN  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Wrk_lbdrlovr      IN OUT  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Process         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lbdrlovr     IN  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Prev_lbdrlovr     IN  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Wrk_lbdrlovr      IN OUT  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
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
p_lbdrlovr         IN  lbpks_lbdrlovr_Main.Ty_lbdrlovr, 
p_Wrk_lbdrlovr  IN   OUT  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_addl_info       IN Cspks_Req_Global.Ty_Addl_Info,
p_lbdrlovr       IN   OUT lbpks_lbdrlovr_Main.ty_lbdrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_lbdrlovr       IN   OUT lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdrlovr          IN lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern IN       VARCHAR2,
p_lbdrlovr          IN lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Check_Mandatory (p_Source    IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_lbdrlovr IN  lbpks_lbdrlovr_Main.ty_lbdrlovr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Basic_Vals        (p_Source    IN     VARCHAR2,
p_lbdrlovr     IN  lbpks_lbdrlovr_Main.ty_lbdrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Merge_Amendables        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
p_lbdrlovr     IN  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Prev_lbdrlovr IN lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Wrk_lbdrlovr IN OUT lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Check_Mandatory_Nodes  (p_Source    IN     VARCHAR2,
p_Wrk_lbdrlovr IN  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Lov_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_lbdrlovr     IN  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_lbdrlovr     IN  OUT lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_and_Validate        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdrlovr     IN  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Prev_lbdrlovr IN OUT  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Wrk_lbdrlovr IN OUT  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Upload_Db         (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdrlovr     IN  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Prev_lbdrlovr     IN  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
p_Wrk_lbdrlovr      IN OUT  lbpks_lbdrlovr_Main.Ty_lbdrlovr,
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
p_lbdrlovr         IN  lbpks_lbdrlovr_Main.ty_lbdrlovr, 
p_Wrk_lbdrlovr  IN   OUT lbpks_lbdrlovr_Main.ty_lbdrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Query_Desc_Fields  ( p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Wrk_lbdrlovr  IN   OUT lbpks_lbdrlovr_Main.ty_lbdrlovr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Get_Node_Data ( 
p_Node_Data         IN OUT Cspks_Req_Global.Ty_Tb_Chr_Node_Data,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
END lbpks_lbdrlovr_main;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdrlovr_main FOR lbpks_lbdrlovr_main
/