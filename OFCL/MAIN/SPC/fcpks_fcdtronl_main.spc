CREATE OR REPLACE PACKAGE  fcpks_fcdtronl_main AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : fcpks_fcdtronl_main.spc
  **
  ** Module     : FC
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
  
  
TYPE ty_tb_v_lbtbs_facility_ccy IS TABLE OF lbtb_facility_ccy%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_assignment_fee_details IS TABLE OF lbtb_assignment_fee_details%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_con_fincentre_dtl__sch IS TABLE OF lbtb_synd_con_fincentre_dtl%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_con_fincentre_dtl__mat IS TABLE OF lbtb_synd_con_fincentre_dtl%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_oltbs_contract_schedules IS TABLE OF oltb_contract_schedules%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_paybydt_schedule_summary IS TABLE OF lbvw_paybydt_schedule_summary%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_oltbs_amount_due IS TABLE OF oltb_amount_due%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_olvws_amount_settled IS TABLE OF olvw_amount_settled%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_contract_schedules__paid IS TABLE OF oltb_contract_schedules%ROWTYPE INDEX BY BINARY_INTEGER;

TYPE ty_fcdtronl IS RECORD (
     v_oltbs_contract     oltb_contract%ROWTYPE,
     v_lbtbs_syndication_master     lbtb_syndication_master%ROWTYPE,
     v_syndication_preference     lbtb_syndication_preference%ROWTYPE,
     v_oltbs_contract_event_log     oltb_contract_event_log%ROWTYPE,
     v_lbtbs_facility_ccy    ty_tb_v_lbtbs_facility_ccy,
     v_assignment_fee_details    ty_tb_v_assignment_fee_details,
     v_con_fincentre_dtl__sch    ty_tb_v_con_fincentre_dtl__sch,
     v_con_fincentre_dtl__mat    ty_tb_v_con_fincentre_dtl__mat,
     v_oltbs_contract_schedules    ty_tb_oltbs_contract_schedules,
     v_paybydt_schedule_summary    ty_tb_paybydt_schedule_summary,
     v_oltbs_amount_due    ty_tb_v_oltbs_amount_due,
     v_olvws_amount_settled    ty_tb_v_olvws_amount_settled,
     v_contract_schedules__paid    ty_tb_contract_schedules__paid,
                 ty_lbcconbw Lbpks_Lbcconbw_Main.ty_lbcconbw,
                 ty_lbcparat Lbpks_Lbcparat_Main.ty_lbcparat,
                 ty_lfcfeecf Lfpks_Lfcfeecf_Main.ty_lfcfeecf,
                 ty_olcondet Olpks_Olcondet_Main.ty_olcondet,
                 ty_olctrmis Olpks_Olctrmis_Main.ty_olctrmis,
                 ty_olctrudf Olpks_Olctrudf_Main.ty_olctrudf,
                 ty_lbconpty Lbpks_Lbconpty_Main.ty_lbconpty,
                 ty_lbcprtax Lbpks_Lbcprtax_Main.ty_lbcprtax,
                 ty_lbcagdet Lbpks_Lbcagdet_Main.ty_lbcagdet,
                 ty_txctrtax Txpks_Txctrtax_Main.ty_txctrtax,
                 ty_lfcfrmnt Lfpks_Lfcfrmnt_Main.ty_lfcfrmnt,
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
                        p_fcdtronl          IN OUT  fcpks_fcdtronl_Main.Ty_fcdtronl,
                        p_Status            IN OUT VARCHAR2 ,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Build_Ts_List (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern   IN  VARCHAR2,
p_fcdtronl          IN fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Resolve_Ref_Numbers (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_fcdtronl     IN  OUT fcpks_fcdtronl_Main.ty_fcdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Product_Default         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_fcdtronl     IN  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Wrk_fcdtronl      IN OUT  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Subsys_Pickup         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_fcdtronl     IN  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Prev_fcdtronl IN OUT  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Wrk_fcdtronl      IN OUT  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Enrich         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_fcdtronl     IN  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Prev_fcdtronl IN OUT  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Wrk_fcdtronl      IN OUT  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Check_Mandatory (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_fcdtronl IN OUT  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
  RETURN BOOLEAN;
FUNCTION Fn_Default_And_Validate        (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN  OUT   VARCHAR2,
p_fcdtronl     IN  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Prev_fcdtronl IN OUT  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Wrk_fcdtronl IN OUT  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Upload_Db         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_fcdtronl     IN  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Prev_fcdtronl     IN  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Wrk_fcdtronl      IN OUT  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Process         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_fcdtronl     IN  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Prev_fcdtronl     IN  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Wrk_fcdtronl      IN OUT  fcpks_fcdtronl_Main.Ty_fcdtronl,
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
p_fcdtronl         IN  fcpks_fcdtronl_Main.Ty_fcdtronl, 
p_Wrk_fcdtronl  IN   OUT  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_addl_info       IN Cspks_Req_Global.Ty_Addl_Info,
p_fcdtronl       IN   OUT fcpks_fcdtronl_Main.ty_fcdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_fcdtronl       IN   OUT fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_fcdtronl          IN fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern IN       VARCHAR2,
p_fcdtronl          IN fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Check_Mandatory (p_Source    IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_fcdtronl IN  fcpks_fcdtronl_Main.ty_fcdtronl,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Basic_Vals        (p_Source    IN     VARCHAR2,
p_fcdtronl     IN  fcpks_fcdtronl_Main.ty_fcdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Merge_Amendables        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
p_fcdtronl     IN  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Prev_fcdtronl IN fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Wrk_fcdtronl IN OUT fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Check_Mandatory_Nodes  (p_Source    IN     VARCHAR2,
p_Wrk_fcdtronl IN  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Lov_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_fcdtronl     IN  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_fcdtronl     IN  OUT fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_and_Validate        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_fcdtronl     IN  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Prev_fcdtronl IN OUT  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Wrk_fcdtronl IN OUT  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Upload_Db         (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_fcdtronl     IN  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Prev_fcdtronl     IN  fcpks_fcdtronl_Main.Ty_fcdtronl,
p_Wrk_fcdtronl      IN OUT  fcpks_fcdtronl_Main.Ty_fcdtronl,
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
p_fcdtronl         IN  fcpks_fcdtronl_Main.ty_fcdtronl, 
p_Wrk_fcdtronl  IN   OUT fcpks_fcdtronl_Main.ty_fcdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Query_Desc_Fields  ( p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Wrk_fcdtronl  IN   OUT fcpks_fcdtronl_Main.ty_fcdtronl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Get_Node_Data ( 
p_Node_Data         IN OUT Cspks_Req_Global.Ty_Tb_Chr_Node_Data,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
END fcpks_fcdtronl_main;
/
CREATE OR REPLACE SYNONYM fcpkss_fcdtronl_main FOR fcpks_fcdtronl_main
/