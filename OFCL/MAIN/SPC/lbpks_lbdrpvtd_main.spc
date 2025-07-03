CREATE OR REPLACE PACKAGE  lbpks_lbdrpvtd_main AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdrpvtd_main.spc
  **
  ** Module     : Syndication Loans and Commitments
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
  
  
TYPE ty_tb_v_acc_coll_link_dtl__tr IS TABLE OF lbtb_acc_coll_link_dtl%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_contract_schedules__tr IS TABLE OF oltb_contract_schedules%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_anche_schedule_input__tr IS TABLE OF lbtb_tranche_schedule_input%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_tranche_schedules__tr IS TABLE OF lbtb_tranche_schedules%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_repayment_allocation__tr IS TABLE OF lbtb_repayment_allocation%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_loan_commitment_link__tr IS TABLE OF lbtb_loan_commitment_link%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_lbvw_trn_rsch__tr IS TABLE OF lbvw_trn_rsch%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_ranche_redn_sch_paid__tr IS TABLE OF lbtb_tranche_redn_sch_paid%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_schedule_summary__tr IS TABLE OF olvw_schedule_summary%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_oltbs_amount_due__tr IS TABLE OF oltb_amount_due%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_olvws_amount_settled__tr IS TABLE OF olvw_amount_settled%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_btbs_unsch_repayment__tr IS TABLE OF lbtb_unsch_repayment%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_contract_amend_due__tr IS TABLE OF oltb_contract_amend_due%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_ntract_global_amount__tr IS TABLE OF lbtb_contract_global_amount%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_ranche_schedules__histtr IS TABLE OF lbtb_tranche_schedules%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_yment_allocation__histtr IS TABLE OF lbtb_repayment_allocation%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_fincentre_dtl__schtr IS TABLE OF oltb_contract_fincentre_dtl%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_fincentre_dtl__mattr IS TABLE OF oltb_contract_fincentre_dtl%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_acc_coll_link_dtl__dd IS TABLE OF lbtb_acc_coll_link_dtl%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_participant__parattr IS TABLE OF lbtb_contract_participant%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_settle_curr_det__parattr IS TABLE OF lbtb_part_settle_curr_det%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_contract_entity__parattr IS TABLE OF oltb_contract_entity%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_participant__paratdd IS TABLE OF lbtb_contract_participant%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_settle_curr_det__paratdd IS TABLE OF lbtb_part_settle_curr_det%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_contract_entity__paratdd IS TABLE OF oltb_contract_entity%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_settle_det__assetdettr IS TABLE OF lbtb_contract_settle_det%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_settle_det__assetdetdd IS TABLE OF lbtb_contract_settle_det%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_party_details__asptytr IS TABLE OF oltb_contract_party_details%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_party_details__asptydd IS TABLE OF oltb_contract_party_details%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_scrow_linkages__escrowtr IS TABLE OF oltb_contract_escrow_linkages%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_scrow_linkages__escrowdd IS TABLE OF oltb_contract_escrow_linkages%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_ltbs_contract_ovd__pymnt IS TABLE OF oltb_contract_ovd%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_oltbs_contract_ovd__vami IS TABLE OF oltb_contract_ovd%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_oltbs_contract_ovd__tr IS TABLE OF oltb_contract_ovd%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_oltbs_contract_ovd__dd IS TABLE OF oltb_contract_ovd%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_transfer_master__pram IS TABLE OF lbtw_part_transfer_master%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_rticipant_transfer__pram IS TABLE OF lbtw_participant_transfer%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_consol_transfer__pram IS TABLE OF lbtw_consol_transfer%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_ntract_participant__pram IS TABLE OF lbtw_contract_participant%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__participant_ratio__pram IS TABLE OF lbtw_participant_ratio%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_contract_entity__pram IS TABLE OF oltw_contract_entity%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_settle_curr_det__pram IS TABLE OF lbtw_part_settle_curr_det%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_btws_pram_fee_temp__pram IS TABLE OF lbtw_pram_fee_temp%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_oltbs_contract_ovd__pram IS TABLE OF oltb_contract_ovd%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_ltbs_contract_liq__pymnt IS TABLE OF oltb_contract_liq%ROWTYPE INDEX BY BINARY_INTEGER;

TYPE ty_lbdrpvtd IS RECORD (
      v_oltb_restructure_contract     oltb_restructure_contract%ROWTYPE,
      v_oltbs_contract__pymnt     oltb_contract%ROWTYPE,
      v_ntract_liq_summary__pymnt     oltb_contract_liq_summary%ROWTYPE,
      v_contract_master__vami     oltb_contract_master%ROWTYPE,
      v_oltbs_contract__vami     oltb_contract%ROWTYPE,
      v_contract_amend_due__vami     oltb_contract_amend_due%ROWTYPE,
      v_oltbs_contract__tr     oltb_contract%ROWTYPE,
      v_oltbs_contract_master__tr     oltb_contract_master%ROWTYPE,
      v_acc_coll_link_dtl__tr    ty_tb_v_acc_coll_link_dtl__tr,
      v_contract_preference__tr     oltb_contract_preference%ROWTYPE,
      v_contract_event_log__tr     oltb_contract_event_log%ROWTYPE,
      v_contract_schedules__tr    ty_tb_v_contract_schedules__tr,
      v_ranche_schedule_input__tr    ty_tb_anche_schedule_input__tr,
      v_tranche_schedules__tr    ty_tb_v_tranche_schedules__tr,
      v_repayment_allocation__tr    ty_tb_repayment_allocation__tr,
      v_loan_commitment_link__tr    ty_tb_loan_commitment_link__tr,
      v_lbvw_trn_rsch__tr    ty_tb_v_lbvw_trn_rsch__tr,
      v_tranche_redn_sch_paid__tr    ty_tb_ranche_redn_sch_paid__tr,
      v_schedule_summary__tr    ty_tb_v_schedule_summary__tr,
      v_oltbs_amount_due__tr    ty_tb_v_oltbs_amount_due__tr,
      v_olvws_amount_settled__tr    ty_tb_olvws_amount_settled__tr,
      v_lbtbs_unsch_repayment__tr    ty_tb_btbs_unsch_repayment__tr,
      v_contract_amend_due__tr    ty_tb_v_contract_amend_due__tr,
      v_ontract_global_amount__tr    ty_tb_ntract_global_amount__tr,
      v_tranche_schedules__histtr    ty_tb_ranche_schedules__histtr,
      v_ayment_allocation__histtr    ty_tb_yment_allocation__histtr,
      v_fincentre_dtl__schtr    ty_tb_v_fincentre_dtl__schtr,
      v_fincentre_dtl__mattr    ty_tb_v_fincentre_dtl__mattr,
      v_oltbs_contract__dd     oltb_contract%ROWTYPE,
      v_oltbs_contract_master__dd     oltb_contract_master%ROWTYPE,
      v_drawdown_schedule__dd     lbtb_drawdown_schedule%ROWTYPE,
      v_contract_preference__dd     oltb_contract_preference%ROWTYPE,
      v_contract_reval_pref__dd     lbtb_contract_reval_pref%ROWTYPE,
      v_acc_coll_link_dtl__dd    ty_tb_v_acc_coll_link_dtl__dd,
      v_roll_exrate_fixing__dd     lbtb_roll_exrate_fixing%ROWTYPE,
      v_roll_intrate_fixing__dd     lbtb_roll_intrate_fixing%ROWTYPE,
      v_oltbs_contract__parattr     oltb_contract%ROWTYPE,
      v_contract_master__parattr     oltb_contract_master%ROWTYPE,
      v_participant__parattr    ty_tb_v_participant__parattr,
      v_settle_curr_det__parattr    ty_tb_settle_curr_det__parattr,
      v_contract_entity__parattr    ty_tb_contract_entity__parattr,
      v_oltbs_contract__paratdd     oltb_contract%ROWTYPE,
      v_contract_master__paratdd     oltb_contract_master%ROWTYPE,
      v_participant__paratdd    ty_tb_v_participant__paratdd,
      v_settle_curr_det__paratdd    ty_tb_settle_curr_det__paratdd,
      v_contract_entity__paratdd    ty_tb_contract_entity__paratdd,
      v_settle_det__setdettr     lbtb_contract_settle_det%ROWTYPE,
      v_settle_det__assetdettr    ty_tb_v_settle_det__assetdettr,
      v_settle_det__setdetdd     lbtb_contract_settle_det%ROWTYPE,
      v_settle_det__assetdetdd    ty_tb_v_settle_det__assetdetdd,
      v_party_details__ptytr     oltb_contract_party_details%ROWTYPE,
      v_party_details__asptytr    ty_tb_v_party_details__asptytr,
      v_party_details__ptydd     oltb_contract_party_details%ROWTYPE,
      v_party_details__asptydd    ty_tb_v_party_details__asptydd,
      v_oltbs_contract__escrowtr     oltb_contract%ROWTYPE,
      v_escrow_linkages__escrowtr    ty_tb_scrow_linkages__escrowtr,
      v_oltbs_contract__escrowdd     oltb_contract%ROWTYPE,
      v_escrow_linkages__escrowdd    ty_tb_scrow_linkages__escrowdd,
      v_oltbs_contract_ovd__pymnt    ty_tb_ltbs_contract_ovd__pymnt,
      v_oltbs_contract_ovd__vami    ty_tb_oltbs_contract_ovd__vami,
      v_oltbs_contract_ovd__tr    ty_tb_v_oltbs_contract_ovd__tr,
      v_oltbs_contract_ovd__dd    ty_tb_v_oltbs_contract_ovd__dd,
      v_oltbs_contract__pram     oltb_contract%ROWTYPE,
      v_borrower_details__pram     lbvw_borrower_details%ROWTYPE,
      v_transfer_master__pram    ty_tb_v_transfer_master__pram,
      v_articipant_transfer__pram    ty_tb_rticipant_transfer__pram,
      v_consol_transfer__pram    ty_tb_v_consol_transfer__pram,
      v_ontract_participant__pram    ty_tb_ntract_participant__pram,
      v_participant_ratio__pram    ty_tb__participant_ratio__pram,
      v_contract_entity__pram    ty_tb_v_contract_entity__pram,
      v_settle_curr_det__pram    ty_tb_v_settle_curr_det__pram,
      v_contract_event_log__pram     oltb_contract_event_log%ROWTYPE,
      v_lbtws_pram_fee_temp__pram    ty_tb_btws_pram_fee_temp__pram,
      v_oltbs_contract_ovd__pram    ty_tb_oltbs_contract_ovd__pram,
      v_transfer_master__vpram     lbvw_transfer_master%ROWTYPE,
      v_transfer_master__tpram     lbtw_transfer_master%ROWTYPE,
      v_oltbs_contract_liq__pymnt    ty_tb_ltbs_contract_liq__pymnt,
                  ty_lbcconbw Lbpks_Lbcconbw_Main.ty_lbcconbw,
                  ty_lbccondp Lbpks_Lbccondp_Main.ty_lbccondp,
                  ty_lbcagdet Lbpks_Lbcagdet_Main.ty_lbcagdet,
                  ty_lbcflrcl Lbpks_Lbcflrcl_Main.ty_lbcflrcl,
                  ty_lbcentty Lbpks_Lbcentty_Main.ty_lbcentty,
                  ty_lbcintrs Lbpks_Lbcintrs_Main.ty_lbcintrs,
                  ty_lbcskmdr Lbpks_Lbcskmdr_Main.ty_lbcskmdr,
                  ty_olcondet Olpks_Olcondet_Main.ty_olcondet,
                  ty_fccrcmnt Fcpks_Fccrcmnt_Main.ty_fccrcmnt,
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
                        p_lbdrpvtd          IN OUT  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
                        p_Status            IN OUT VARCHAR2 ,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Build_Ts_List (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern   IN  VARCHAR2,
p_lbdrpvtd          IN lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Resolve_Ref_Numbers (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdrpvtd     IN  OUT lbpks_lbdrpvtd_Main.ty_lbdrpvtd,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Product_Default         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdrpvtd     IN  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Wrk_lbdrpvtd      IN OUT  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Subsys_Pickup         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdrpvtd     IN  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Prev_lbdrpvtd IN OUT  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Wrk_lbdrpvtd      IN OUT  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Enrich         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdrpvtd     IN  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Prev_lbdrpvtd IN OUT  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Wrk_lbdrpvtd      IN OUT  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Check_Mandatory (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_lbdrpvtd IN OUT  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
  RETURN BOOLEAN;
FUNCTION Fn_Default_And_Validate        (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN  OUT   VARCHAR2,
p_lbdrpvtd     IN  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Prev_lbdrpvtd IN OUT  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Wrk_lbdrpvtd IN OUT  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Upload_Db         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lbdrpvtd     IN  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Prev_lbdrpvtd     IN  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Wrk_lbdrpvtd      IN OUT  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Process         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lbdrpvtd     IN  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Prev_lbdrpvtd     IN  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Wrk_lbdrpvtd      IN OUT  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
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
p_lbdrpvtd         IN  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd, 
p_Wrk_lbdrpvtd  IN   OUT  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_addl_info       IN Cspks_Req_Global.Ty_Addl_Info,
p_lbdrpvtd       IN   OUT lbpks_lbdrpvtd_Main.ty_lbdrpvtd,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_lbdrpvtd       IN   OUT lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdrpvtd          IN lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern IN       VARCHAR2,
p_lbdrpvtd          IN lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Check_Mandatory (p_Source    IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_lbdrpvtd IN  lbpks_lbdrpvtd_Main.ty_lbdrpvtd,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Basic_Vals        (p_Source    IN     VARCHAR2,
p_lbdrpvtd     IN  lbpks_lbdrpvtd_Main.ty_lbdrpvtd,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Merge_Amendables        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
p_lbdrpvtd     IN  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Prev_lbdrpvtd IN lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Wrk_lbdrpvtd IN OUT lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Check_Mandatory_Nodes  (p_Source    IN     VARCHAR2,
p_Wrk_lbdrpvtd IN  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Lov_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_lbdrpvtd     IN  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_lbdrpvtd     IN  OUT lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_and_Validate        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdrpvtd     IN  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Prev_lbdrpvtd IN OUT  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Wrk_lbdrpvtd IN OUT  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Upload_Db         (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdrpvtd     IN  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Prev_lbdrpvtd     IN  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
p_Wrk_lbdrpvtd      IN OUT  lbpks_lbdrpvtd_Main.Ty_lbdrpvtd,
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
p_lbdrpvtd         IN  lbpks_lbdrpvtd_Main.ty_lbdrpvtd, 
p_Wrk_lbdrpvtd  IN   OUT lbpks_lbdrpvtd_Main.ty_lbdrpvtd,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Query_Desc_Fields  ( p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Wrk_lbdrpvtd  IN   OUT lbpks_lbdrpvtd_Main.ty_lbdrpvtd,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Get_Node_Data ( 
p_Node_Data         IN OUT Cspks_Req_Global.Ty_Tb_Chr_Node_Data,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
END lbpks_lbdrpvtd_main;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdrpvtd_main FOR lbpks_lbdrpvtd_main
/