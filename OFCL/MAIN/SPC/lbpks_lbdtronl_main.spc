CREATE OR REPLACE PACKAGE  lbpks_lbdtronl_main AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdtronl_main.spc
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
TYPE ty_tb_v_tranche_schedule_input IS TABLE OF lbtb_tranche_schedule_input%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__lbtbs_tranche_schedules IS TABLE OF lbtb_tranche_schedules%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_repayment_allocation IS TABLE OF lbtb_repayment_allocation%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_loan_commitment_link IS TABLE OF lbtb_loan_commitment_link%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_lbtbs_unsch_repayment IS TABLE OF lbtb_unsch_repayment%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_contract_global_amount IS TABLE OF lbtb_contract_global_amount%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_lbvw_trn_rsch IS TABLE OF lbvw_trn_rsch%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_tranche_redn_sch_paid IS TABLE OF lbtb_tranche_redn_sch_paid%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_olvws_schedule_summary IS TABLE OF olvw_schedule_summary%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_oltbs_amount_due IS TABLE OF oltb_amount_due%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_olvws_amount_settled IS TABLE OF olvw_amount_settled%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_oltbs_contract_amend_due IS TABLE OF oltb_contract_amend_due%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__tranche_schedules__hist IS TABLE OF lbtb_tranche_schedules%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_payment_allocation__hist IS TABLE OF lbtb_repayment_allocation%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__lbtbs_acc_coll_link_dtl IS TABLE OF lbtb_acc_coll_link_dtl%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_tract_fincentre_dtl__sch IS TABLE OF oltb_contract_fincentre_dtl%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_tract_fincentre_dtl__mat IS TABLE OF oltb_contract_fincentre_dtl%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_contract_schedules__paid IS TABLE OF oltb_contract_schedules%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_btbs_part_coll_link_dtls IS TABLE OF lbtb_part_coll_link_dtls%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_lbtbs_syn_wrapper_detail IS TABLE OF lbtb_syn_wrapper_detail%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_olvws_contract_iccf_calc IS TABLE OF olvw_contract_iccf_calc%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_oltbs_amount_due__comp IS TABLE OF oltb_amount_due%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_amount_due__compdtls IS TABLE OF oltb_amount_due%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_iccf_calc__compdtls IS TABLE OF olvw_contract_iccf_calc%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_amount_settled__compdtls IS TABLE OF olvw_amount_settled%ROWTYPE INDEX BY BINARY_INTEGER;

TYPE ty_lbdtronl IS RECORD (
      v_oltbs_contract     oltb_contract%ROWTYPE,
      v_oltbs_contract_master     oltb_contract_master%ROWTYPE,
      v_oltbs_contract_preference     oltb_contract_preference%ROWTYPE,
      v_oltbs_contract_event_log     oltb_contract_event_log%ROWTYPE,
      v_oltbs_contract_schedules    ty_tb_oltbs_contract_schedules,
      v_tranche_schedule_input    ty_tb_v_tranche_schedule_input,
      v_lbtbs_tranche_schedules    ty_tb__lbtbs_tranche_schedules,
      v_repayment_allocation    ty_tb_v_repayment_allocation,
      v_loan_commitment_link    ty_tb_v_loan_commitment_link,
      v_lbtbs_unsch_repayment    ty_tb_v_lbtbs_unsch_repayment,
      v_contract_global_amount    ty_tb_v_contract_global_amount,
      v_lbvw_trn_rsch    ty_tb_v_lbvw_trn_rsch,
      v_tranche_redn_sch_paid    ty_tb_v_tranche_redn_sch_paid,
      v_olvws_schedule_summary    ty_tb_v_olvws_schedule_summary,
      v_oltbs_amount_due    ty_tb_v_oltbs_amount_due,
      v_olvws_amount_settled    ty_tb_v_olvws_amount_settled,
      v_oltbs_contract_amend_due    ty_tb_oltbs_contract_amend_due,
      v_tranche_schedules__hist    ty_tb__tranche_schedules__hist,
      v_epayment_allocation__hist    ty_tb_payment_allocation__hist,
      v_lbtbs_acc_coll_link_dtl    ty_tb__lbtbs_acc_coll_link_dtl,
      v_ntract_fincentre_dtl__sch    ty_tb_tract_fincentre_dtl__sch,
      v_ntract_fincentre_dtl__mat    ty_tb_tract_fincentre_dtl__mat,
      v_contract_schedules__paid    ty_tb_contract_schedules__paid,
      v_lbtbs_part_coll_link_dtls    ty_tb_btbs_part_coll_link_dtls,
      v_lbtbs_syn_wrapper_detail    ty_tb_lbtbs_syn_wrapper_detail,
      v_olvws_contract_iccf_calc    ty_tb_olvws_contract_iccf_calc,
      v_oltbs_amount_due__comp    ty_tb_v_oltbs_amount_due__comp,
      v_amount_due__compdtls    ty_tb_v_amount_due__compdtls,
      v_iccf_calc__compdtls    ty_tb_v_iccf_calc__compdtls,
      v_amount_settled__compdtls    ty_tb_amount_settled__compdtls,
                  ty_olcondet Olpks_Olcondet_Main.ty_olcondet,
                  ty_lfctrchg Lfpks_Lfctrchg_Main.ty_lfctrchg,
                  ty_lfcfrmnt Lfpks_Lfcfrmnt_Main.ty_lfcfrmnt,
                  ty_olctrmis Olpks_Olctrmis_Main.ty_olctrmis,
                  ty_olctrudf Olpks_Olctrudf_Main.ty_olctrudf,
                  ty_lbcconbw Lbpks_Lbcconbw_Main.ty_lbcconbw,
                  ty_lbcparat Lbpks_Lbcparat_Main.ty_lbcparat,
                  ty_lfcfeecf Lfpks_Lfcfeecf_Main.ty_lfcfeecf,
                  ty_lbcprtax Lbpks_Lbcprtax_Main.ty_lbcprtax,
                  ty_lbcflrcl Lbpks_Lbcflrcl_Main.ty_lbcflrcl,
                  ty_lbconccy Lbpks_Lbconccy_Main.ty_lbconccy,
                  ty_lbcskmtr Lbpks_Lbcskmtr_Main.ty_lbcskmtr,
                  ty_lbclcisr Lbpks_Lbclcisr_Main.ty_lbclcisr,
                  ty_fccrcmnt Fcpks_Fccrcmnt_Main.ty_fccrcmnt,
                  ty_lbcadvic Lbpks_Lbcadvic_Main.ty_lbcadvic,
                  ty_lbcasgvl Lbpks_Lbcasgvl_Main.ty_lbcasgvl,
                  ty_lbccolet Lbpks_Lbccolet_Main.ty_lbccolet,
                  ty_lbconpty Lbpks_Lbconpty_Main.ty_lbconpty,
                  ty_lbcagcif Lbpks_Lbcagcif_Main.ty_lbcagcif,
                  ty_lbccondp Lbpks_Lbccondp_Main.ty_lbccondp,
                  ty_olcescam Olpks_Olcescam_Main.ty_olcescam,
                  ty_lbccyrst Lbpks_Lbccyrst_Main.ty_lbccyrst,
                  ty_lbccolpt Lbpks_Lbccolpt_Main.ty_lbccolpt,
                  ty_lbccolat Lbpks_Lbccolat_Main.ty_lbccolat,
                  ty_lbccolac Lbpks_Lbccolac_Main.ty_lbccolac,
                  ty_lbcagdet Lbpks_Lbcagdet_Main.ty_lbcagdet,
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
FUNCTION Fn_Get_Original_Action RETURN VARCHAR2;
g_autoauth VARCHAR2(1);

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
                        p_lbdtronl          IN OUT  lbpks_lbdtronl_Main.Ty_lbdtronl,
                        p_Status            IN OUT VARCHAR2 ,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Build_Ts_List (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern   IN  VARCHAR2,
p_lbdtronl          IN lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Resolve_Ref_Numbers (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdtronl     IN  OUT lbpks_lbdtronl_Main.ty_lbdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Product_Default         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdtronl     IN  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Wrk_lbdtronl      IN OUT  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Subsys_Pickup         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdtronl     IN  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Prev_lbdtronl IN OUT  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Wrk_lbdtronl      IN OUT  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Enrich         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdtronl     IN  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Prev_lbdtronl IN OUT  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Wrk_lbdtronl      IN OUT  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Check_Mandatory (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_lbdtronl IN OUT  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
  RETURN BOOLEAN;
FUNCTION Fn_Default_And_Validate        (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN  OUT   VARCHAR2,
p_lbdtronl     IN  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Prev_lbdtronl IN OUT  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Wrk_lbdtronl IN OUT  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Upload_Db         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lbdtronl     IN  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Prev_lbdtronl     IN  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Wrk_lbdtronl      IN OUT  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Process         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lbdtronl     IN  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Prev_lbdtronl     IN  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Wrk_lbdtronl      IN OUT  lbpks_lbdtronl_Main.Ty_lbdtronl,
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
p_lbdtronl         IN  lbpks_lbdtronl_Main.Ty_lbdtronl, 
p_Wrk_lbdtronl  IN   OUT  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_addl_info       IN Cspks_Req_Global.Ty_Addl_Info,
p_lbdtronl       IN   OUT lbpks_lbdtronl_Main.ty_lbdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_lbdtronl       IN   OUT lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdtronl          IN lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern IN       VARCHAR2,
p_lbdtronl          IN lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Check_Mandatory (p_Source    IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_lbdtronl IN  lbpks_lbdtronl_Main.ty_lbdtronl,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Basic_Vals        (p_Source    IN     VARCHAR2,
p_lbdtronl     IN  lbpks_lbdtronl_Main.ty_lbdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Merge_Amendables        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
p_lbdtronl     IN  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Prev_lbdtronl IN lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Wrk_lbdtronl IN OUT lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Check_Mandatory_Nodes  (p_Source    IN     VARCHAR2,
p_Wrk_lbdtronl IN  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Lov_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_lbdtronl     IN  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_lbdtronl     IN  OUT lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_and_Validate        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdtronl     IN  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Prev_lbdtronl IN OUT  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Wrk_lbdtronl IN OUT  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Upload_Db         (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdtronl     IN  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Prev_lbdtronl     IN  lbpks_lbdtronl_Main.Ty_lbdtronl,
p_Wrk_lbdtronl      IN OUT  lbpks_lbdtronl_Main.Ty_lbdtronl,
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
p_lbdtronl         IN  lbpks_lbdtronl_Main.ty_lbdtronl, 
p_Wrk_lbdtronl  IN   OUT lbpks_lbdtronl_Main.ty_lbdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Query_Desc_Fields  ( p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Wrk_lbdtronl  IN   OUT lbpks_lbdtronl_Main.ty_lbdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Get_Node_Data ( 
p_Node_Data         IN OUT Cspks_Req_Global.Ty_Tb_Chr_Node_Data,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
END lbpks_lbdtronl_main;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdtronl_main FOR lbpks_lbdtronl_main
/