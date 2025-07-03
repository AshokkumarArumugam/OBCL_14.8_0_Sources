CREATE OR REPLACE PACKAGE  lppks_lpdcomnt_main AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lppks_lpdcomnt_main.spc
  **
  ** Module     : Participant Tranches and Drawdowns
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
  
  
TYPE ty_tb_v_lpvw_schedule_summary IS TABLE OF lpvw_schedule_summary%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_oltbs_amount_due IS TABLE OF oltb_amount_due%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_olvws_amount_settled IS TABLE OF olvw_amount_settled%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__lbtbs_contract_tax_pref IS TABLE OF lbtb_contract_tax_pref%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_contract_tax_details IS TABLE OF txtb_contract_tax_details%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_participant_entities IS TABLE OF lptm_participant_entities%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_xtbs_contract_tax_master IS TABLE OF txtb_contract_tax_master%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_paybydt_schedule_summary IS TABLE OF lpvw_paybydt_schedule_summary%ROWTYPE INDEX BY BINARY_INTEGER;

TYPE ty_lpdcomnt IS RECORD (
     v_oltbs_contract     oltb_contract%ROWTYPE,
     v_lptbs_contract_master     lptb_contract_master%ROWTYPE,
     v_oltbs_contract_event_log     oltb_contract_event_log%ROWTYPE,
     v_lpvw_schedule_summary    ty_tb_v_lpvw_schedule_summary,
     v_oltbs_amount_due    ty_tb_v_oltbs_amount_due,
     v_olvws_amount_settled    ty_tb_v_olvws_amount_settled,
     v_lbtbs_contract_tax_pref    ty_tb__lbtbs_contract_tax_pref,
     v_contract_tax_details    ty_tb_v_contract_tax_details,
     v_lbvws_party_summary     lbvw_party_summary%ROWTYPE,
     v_participant_entities    ty_tb_v_participant_entities,
     v_txtbs_contract_tax_master    ty_tb_xtbs_contract_tax_master,
     v_paybydt_schedule_summary    ty_tb_paybydt_schedule_summary,
                 ty_olcondet Olpks_Olcondet_Main.ty_olcondet,
                 ty_olctrmis Olpks_Olctrmis_Main.ty_olctrmis,
                 ty_olctrudf Olpks_Olctrudf_Main.ty_olctrudf,
                 ty_lbcentty Lbpks_Lbcentty_Main.ty_lbcentty,
                 ty_lbcondet Lbpks_Lbcondet_Main.ty_lbcondet,
                 ty_lpcprhis Lppks_Lpcprhis_Main.ty_lpcprhis,
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
                        p_lpdcomnt          IN OUT  lppks_lpdcomnt_Main.Ty_lpdcomnt,
                        p_Status            IN OUT VARCHAR2 ,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Build_Ts_List (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern   IN  VARCHAR2,
p_lpdcomnt          IN lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Resolve_Ref_Numbers (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lpdcomnt     IN  OUT lppks_lpdcomnt_Main.ty_lpdcomnt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Product_Default         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lpdcomnt     IN  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Wrk_lpdcomnt      IN OUT  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Subsys_Pickup         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lpdcomnt     IN  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Prev_lpdcomnt IN OUT  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Wrk_lpdcomnt      IN OUT  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Enrich         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lpdcomnt     IN  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Prev_lpdcomnt IN OUT  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Wrk_lpdcomnt      IN OUT  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Check_Mandatory (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_lpdcomnt IN OUT  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
  RETURN BOOLEAN;
FUNCTION Fn_Default_And_Validate        (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN  OUT   VARCHAR2,
p_lpdcomnt     IN  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Prev_lpdcomnt IN OUT  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Wrk_lpdcomnt IN OUT  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Upload_Db         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lpdcomnt     IN  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Prev_lpdcomnt     IN  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Wrk_lpdcomnt      IN OUT  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Process         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lpdcomnt     IN  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Prev_lpdcomnt     IN  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Wrk_lpdcomnt      IN OUT  lppks_lpdcomnt_Main.Ty_lpdcomnt,
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
p_lpdcomnt         IN  lppks_lpdcomnt_Main.Ty_lpdcomnt, 
p_Wrk_lpdcomnt  IN   OUT  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_addl_info       IN Cspks_Req_Global.Ty_Addl_Info,
p_lpdcomnt       IN   OUT lppks_lpdcomnt_Main.ty_lpdcomnt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_lpdcomnt       IN   OUT lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lpdcomnt          IN lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern IN       VARCHAR2,
p_lpdcomnt          IN lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Check_Mandatory (p_Source    IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_lpdcomnt IN  lppks_lpdcomnt_Main.ty_lpdcomnt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Basic_Vals        (p_Source    IN     VARCHAR2,
p_lpdcomnt     IN  lppks_lpdcomnt_Main.ty_lpdcomnt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Merge_Amendables        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
p_lpdcomnt     IN  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Prev_lpdcomnt IN lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Wrk_lpdcomnt IN OUT lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Check_Mandatory_Nodes  (p_Source    IN     VARCHAR2,
p_Wrk_lpdcomnt IN  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Lov_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_lpdcomnt     IN  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_lpdcomnt     IN  OUT lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_and_Validate        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lpdcomnt     IN  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Prev_lpdcomnt IN OUT  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Wrk_lpdcomnt IN OUT  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Upload_Db         (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lpdcomnt     IN  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Prev_lpdcomnt     IN  lppks_lpdcomnt_Main.Ty_lpdcomnt,
p_Wrk_lpdcomnt      IN OUT  lppks_lpdcomnt_Main.Ty_lpdcomnt,
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
p_lpdcomnt         IN  lppks_lpdcomnt_Main.ty_lpdcomnt, 
p_Wrk_lpdcomnt  IN   OUT lppks_lpdcomnt_Main.ty_lpdcomnt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Query_Desc_Fields  ( p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Wrk_lpdcomnt  IN   OUT lppks_lpdcomnt_Main.ty_lpdcomnt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Get_Node_Data ( 
p_Node_Data         IN OUT Cspks_Req_Global.Ty_Tb_Chr_Node_Data,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
END lppks_lpdcomnt_main;
/
CREATE OR REPLACE SYNONYM lppkss_lpdcomnt_main FOR lppks_lpdcomnt_main
/