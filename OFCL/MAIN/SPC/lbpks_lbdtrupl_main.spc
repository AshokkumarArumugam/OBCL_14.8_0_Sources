CREATE OR REPLACE PACKAGE  lbpks_lbdtrupl_main AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdtrupl_main.spc
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
  
  
TYPE ty_tb_v_oltbs_upload_schedules IS TABLE OF oltb_upload_schedules%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_btbs_upload_borrower_ccy IS TABLE OF lbtb_upload_borrower_ccy%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_lbtbs_upload_hol_ccy IS TABLE OF lbtb_upload_hol_ccy%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_lbtbs_upload_borrowers IS TABLE OF lbtb_upload_borrowers%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_borr_settle_upload_det IS TABLE OF lbtb_borr_settle_upload_det%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_upload_borr_entities IS TABLE OF lbtb_upload_borr_entities%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_lbtbs_upload_participant IS TABLE OF lbtb_upload_participant%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_upload_participant_ratio IS TABLE OF lbtb_upload_participant_ratio%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_upload_part_curr_det IS TABLE OF lbtb_upload_part_curr_det%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_oltbs_upload_entity IS TABLE OF oltb_upload_entity%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_upload_tr_schedule_in IS TABLE OF lbtb_upload_tr_schedule_in%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_upload_tranche_schedules IS TABLE OF lbtb_upload_tranche_schedules%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_upload_party_details IS TABLE OF oltb_upload_party_details%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_lftbs_upload_fee IS TABLE OF lftb_upload_fee%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_upload_fee_schedules IS TABLE OF lftb_upload_fee_schedules%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_upload_drawdown_prod IS TABLE OF lbtb_upload_drawdown_prod%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_upload_drawdown_comp IS TABLE OF lbtb_upload_drawdown_comp%ROWTYPE INDEX BY BINARY_INTEGER;

TYPE ty_lbdtrupl IS RECORD (
     v_oltbs_upload_master     oltb_upload_master%ROWTYPE,
     v_oltbs_upload_schedules    ty_tb_v_oltbs_upload_schedules,
     v_lbtbs_upload_borrower_ccy    ty_tb_btbs_upload_borrower_ccy,
     v_lbtbs_upload_hol_ccy    ty_tb_v_lbtbs_upload_hol_ccy,
     v_lbtbs_upload_borrowers    ty_tb_v_lbtbs_upload_borrowers,
     v_borr_settle_upload_det    ty_tb_v_borr_settle_upload_det,
     v_upload_borr_entities    ty_tb_v_upload_borr_entities,
     v_lbtbs_upload_participant    ty_tb_lbtbs_upload_participant,
     v_upload_participant_ratio    ty_tb_upload_participant_ratio,
     v_upload_part_curr_det    ty_tb_v_upload_part_curr_det,
     v_oltbs_upload_entity    ty_tb_v_oltbs_upload_entity,
     v_upload_tr_schedule_in    ty_tb_v_upload_tr_schedule_in,
     v_upload_tranche_schedules    ty_tb_upload_tranche_schedules,
     v_upload_party_details    ty_tb_v_upload_party_details,
     v_lftbs_upload_fee    ty_tb_v_lftbs_upload_fee,
     v_upload_fee_schedules    ty_tb_v_upload_fee_schedules,
     v_oltbs_ext_contract_stat     oltb_ext_contract_stat%ROWTYPE,
     v_upload_drawdown_prod    ty_tb_v_upload_drawdown_prod,
     v_upload_drawdown_comp    ty_tb_v_upload_drawdown_comp,
     v_upload_borr_prod_limit     lbtb_upload_borr_prod_limit%ROWTYPE,
     v_lbtbs_upload_borr_dd_prod     lbtb_upload_borr_dd_prod%ROWTYPE,
     v_upload_drawdown_margin     lbtb_upload_drawdown_margin%ROWTYPE,
     v_upload_dd_part_ratio     lbtb_upload_dd_part_ratio%ROWTYPE,
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
                        p_lbdtrupl          IN OUT  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
                        p_Status            IN OUT VARCHAR2 ,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Build_Ts_List (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern   IN  VARCHAR2,
p_lbdtrupl          IN lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Resolve_Ref_Numbers (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdtrupl     IN  OUT lbpks_lbdtrupl_Main.ty_lbdtrupl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Product_Default         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdtrupl     IN  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Wrk_lbdtrupl      IN OUT  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Subsys_Pickup         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdtrupl     IN  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Prev_lbdtrupl IN OUT  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Wrk_lbdtrupl      IN OUT  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Enrich         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdtrupl     IN  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Prev_lbdtrupl IN OUT  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Wrk_lbdtrupl      IN OUT  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Check_Mandatory (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_lbdtrupl IN OUT  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
  RETURN BOOLEAN;
FUNCTION Fn_Default_And_Validate        (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN  OUT   VARCHAR2,
p_lbdtrupl     IN  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Prev_lbdtrupl IN OUT  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Wrk_lbdtrupl IN OUT  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Upload_Db         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lbdtrupl     IN  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Prev_lbdtrupl     IN  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Wrk_lbdtrupl      IN OUT  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Process         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lbdtrupl     IN  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Prev_lbdtrupl     IN  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Wrk_lbdtrupl      IN OUT  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
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
p_lbdtrupl         IN  lbpks_lbdtrupl_Main.Ty_lbdtrupl, 
p_Wrk_lbdtrupl  IN   OUT  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_addl_info       IN Cspks_Req_Global.Ty_Addl_Info,
p_lbdtrupl       IN   OUT lbpks_lbdtrupl_Main.ty_lbdtrupl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_lbdtrupl       IN   OUT lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdtrupl          IN lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern IN       VARCHAR2,
p_lbdtrupl          IN lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Check_Mandatory (p_Source    IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_lbdtrupl IN  lbpks_lbdtrupl_Main.ty_lbdtrupl,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Basic_Vals        (p_Source    IN     VARCHAR2,
p_lbdtrupl     IN  lbpks_lbdtrupl_Main.ty_lbdtrupl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Merge_Amendables        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
p_lbdtrupl     IN  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Prev_lbdtrupl IN lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Wrk_lbdtrupl IN OUT lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Check_Mandatory_Nodes  (p_Source    IN     VARCHAR2,
p_Wrk_lbdtrupl IN  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Lov_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_lbdtrupl     IN  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_lbdtrupl     IN  OUT lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_and_Validate        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdtrupl     IN  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Prev_lbdtrupl IN OUT  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Wrk_lbdtrupl IN OUT  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Upload_Db         (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdtrupl     IN  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Prev_lbdtrupl     IN  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
p_Wrk_lbdtrupl      IN OUT  lbpks_lbdtrupl_Main.Ty_lbdtrupl,
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
p_lbdtrupl         IN  lbpks_lbdtrupl_Main.ty_lbdtrupl, 
p_Wrk_lbdtrupl  IN   OUT lbpks_lbdtrupl_Main.ty_lbdtrupl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Query_Desc_Fields  ( p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Wrk_lbdtrupl  IN   OUT lbpks_lbdtrupl_Main.ty_lbdtrupl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Get_Node_Data ( 
p_Node_Data         IN OUT Cspks_Req_Global.Ty_Tb_Chr_Node_Data,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
END lbpks_lbdtrupl_main;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdtrupl_main FOR lbpks_lbdtrupl_main
/