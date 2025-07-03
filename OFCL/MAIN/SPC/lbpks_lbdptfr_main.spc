CREATE OR REPLACE PACKAGE  lbpks_lbdptfr_main AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdptfr_main.spc
  **
  ** Module     : LB
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
  
  
TYPE ty_tb_v_part_transfer_master IS TABLE OF lbtw_part_transfer_master%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_participant_transfer IS TABLE OF lbtw_participant_transfer%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_lbtws_consol_transfer IS TABLE OF lbtw_consol_transfer%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_oltws_contract_entity IS TABLE OF oltw_contract_entity%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_part_settle_curr_det IS TABLE OF lbtw_part_settle_curr_det%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_lbtws_pram_fee_temp IS TABLE OF lbtw_pram_fee_temp%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__lbtws_participant_ratio IS TABLE OF lbtw_participant_ratio%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_contract_participant IS TABLE OF lbtw_contract_participant%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_part_transfer_lor_dtls IS TABLE OF lbtb_part_transfer_lor_dtls%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_transfer_coll_lnk_mst IS TABLE OF lbtw_transfer_coll_lnk_mst%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__transfer_coll_link_dtls IS TABLE OF lbtw_transfer_coll_link_dtls%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_lbtbs_syn_wrapper_detail IS TABLE OF lbtb_syn_wrapper_detail%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_lbtws_relcon_noncasc IS TABLE OF lbtw_relcon_noncasc%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_btws_noncasc_participant IS TABLE OF lbtw_noncasc_participant%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_lbtws_noncasc_settle_det IS TABLE OF lbtw_noncasc_settle_det%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_oltws_noncasc_entity IS TABLE OF oltw_noncasc_entity%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_noncasc_transfer_dtl IS TABLE OF lbtw_noncasc_transfer_dtl%ROWTYPE INDEX BY BINARY_INTEGER;

TYPE ty_lbdptfr IS RECORD (
     v_oltbs_contract     oltb_contract%ROWTYPE,
     v_lbvws_borrower_details     lbvw_borrower_details%ROWTYPE,
     v_lbvws_transfer_master     lbvw_transfer_master%ROWTYPE,
     v_lbtws_transfer_master     lbtw_transfer_master%ROWTYPE,
     v_part_transfer_master    ty_tb_v_part_transfer_master,
     v_participant_transfer    ty_tb_v_participant_transfer,
     v_lbtws_consol_transfer    ty_tb_v_lbtws_consol_transfer,
     v_oltws_contract_entity    ty_tb_v_oltws_contract_entity,
     v_part_settle_curr_det    ty_tb_v_part_settle_curr_det,
     v_oltbs_contract_event_log     oltb_contract_event_log%ROWTYPE,
     v_lbtws_pram_fee_temp    ty_tb_v_lbtws_pram_fee_temp,
     v_lbtws_participant_ratio    ty_tb__lbtws_participant_ratio,
     v_contract_participant    ty_tb_v_contract_participant,
     v_part_transfer_lor_dtls    ty_tb_v_part_transfer_lor_dtls,
     v_transfer_coll_lnk_mst    ty_tb_v_transfer_coll_lnk_mst,
     v_transfer_coll_link_dtls    ty_tb__transfer_coll_link_dtls,
     v_lbtbs_syn_wrapper_detail    ty_tb_lbtbs_syn_wrapper_detail,
     v_lbtws_relcon_noncasc    ty_tb_v_lbtws_relcon_noncasc,
     v_lbtws_noncasc_participant    ty_tb_btws_noncasc_participant,
     v_lbtws_noncasc_settle_det    ty_tb_lbtws_noncasc_settle_det,
     v_oltws_noncasc_entity    ty_tb_v_oltws_noncasc_entity,
     v_noncasc_transfer_dtl    ty_tb_v_noncasc_transfer_dtl,
                 ty_olctrudf Olpks_Olctrudf_Main.ty_olctrudf,
                 ty_lbcparat Lbpks_Lbcparat_Main.ty_lbcparat,
                 ty_lbcpcdtr Lbpks_Lbcpcdtr_Main.ty_lbcpcdtr,
                 ty_lbcprctr Lbpks_Lbcprctr_Main.ty_lbcprctr,
                 ty_lpcrcmtt Lppks_Lpcrcmtt_Main.ty_lpcrcmtt,
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
                        p_lbdptfr          IN OUT  lbpks_lbdptfr_Main.Ty_lbdptfr,
                        p_Status            IN OUT VARCHAR2 ,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Build_Ts_List (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern   IN  VARCHAR2,
p_lbdptfr          IN lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Resolve_Ref_Numbers (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdptfr     IN  OUT lbpks_lbdptfr_Main.ty_lbdptfr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Product_Default         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdptfr     IN  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Wrk_lbdptfr      IN OUT  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Subsys_Pickup         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdptfr     IN  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Prev_lbdptfr IN OUT  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Wrk_lbdptfr      IN OUT  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Enrich         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdptfr     IN  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Prev_lbdptfr IN OUT  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Wrk_lbdptfr      IN OUT  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Check_Mandatory (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_lbdptfr IN OUT  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
  RETURN BOOLEAN;
FUNCTION Fn_Default_And_Validate        (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN  OUT   VARCHAR2,
p_lbdptfr     IN  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Prev_lbdptfr IN OUT  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Wrk_lbdptfr IN OUT  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Upload_Db         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lbdptfr     IN  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Prev_lbdptfr     IN  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Wrk_lbdptfr      IN OUT  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Process         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lbdptfr     IN  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Prev_lbdptfr     IN  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Wrk_lbdptfr      IN OUT  lbpks_lbdptfr_Main.Ty_lbdptfr,
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
p_lbdptfr         IN  lbpks_lbdptfr_Main.Ty_lbdptfr, 
p_Wrk_lbdptfr  IN   OUT  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_addl_info       IN Cspks_Req_Global.Ty_Addl_Info,
p_lbdptfr       IN   OUT lbpks_lbdptfr_Main.ty_lbdptfr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_lbdptfr       IN   OUT lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdptfr          IN lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern IN       VARCHAR2,
p_lbdptfr          IN lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Check_Mandatory (p_Source    IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_lbdptfr IN  lbpks_lbdptfr_Main.ty_lbdptfr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Basic_Vals        (p_Source    IN     VARCHAR2,
p_lbdptfr     IN  lbpks_lbdptfr_Main.ty_lbdptfr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Merge_Amendables        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
p_lbdptfr     IN  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Prev_lbdptfr IN lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Wrk_lbdptfr IN OUT lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Check_Mandatory_Nodes  (p_Source    IN     VARCHAR2,
p_Wrk_lbdptfr IN  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Lov_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_lbdptfr     IN  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_lbdptfr     IN  OUT lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_and_Validate        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdptfr     IN  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Prev_lbdptfr IN OUT  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Wrk_lbdptfr IN OUT  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Upload_Db         (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdptfr     IN  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Prev_lbdptfr     IN  lbpks_lbdptfr_Main.Ty_lbdptfr,
p_Wrk_lbdptfr      IN OUT  lbpks_lbdptfr_Main.Ty_lbdptfr,
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
p_lbdptfr         IN  lbpks_lbdptfr_Main.ty_lbdptfr, 
p_Wrk_lbdptfr  IN   OUT lbpks_lbdptfr_Main.ty_lbdptfr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Query_Desc_Fields  ( p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Wrk_lbdptfr  IN   OUT lbpks_lbdptfr_Main.ty_lbdptfr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Get_Node_Data ( 
p_Node_Data         IN OUT Cspks_Req_Global.Ty_Tb_Chr_Node_Data,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
END lbpks_lbdptfr_main;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdptfr_main FOR lbpks_lbdptfr_main
/