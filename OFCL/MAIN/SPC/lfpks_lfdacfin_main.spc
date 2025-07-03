CREATE OR REPLACE PACKAGE  lfpks_lfdacfin_main AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lfpks_lfdacfin_main.spc
  **
  ** Module     : The ICCF
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
  
  
TYPE ty_tb__lftbs_contract_accr_fee IS TABLE OF lftb_contract_accr_fee%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_lftbs_contract_schedules IS TABLE OF lftb_contract_schedules%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_lftbs_accr_fee_detail IS TABLE OF lftb_accr_fee_detail%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_contract_accr_fee__ratio IS TABLE OF lftb_contract_accr_fee%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_lbtbs_part_event_ratio IS TABLE OF lbtb_part_event_ratio%ROWTYPE INDEX BY BINARY_INTEGER;

TYPE ty_lfdacfin IS RECORD (
     v_oltbs_contract     oltb_contract%ROWTYPE,
     v_lftbs_contract_accr_fee    ty_tb__lftbs_contract_accr_fee,
     v_oltbs_contract_event_log     oltb_contract_event_log%ROWTYPE,
     v_lftbs_contract_schedules    ty_tb_lftbs_contract_schedules,
     v_lftbs_accr_fee_detail    ty_tb_v_lftbs_accr_fee_detail,
     v_contract_event_advice     oltb_contract_event_advice%ROWTYPE,
     v_lfvws_contract_accr_fee     lfvw_contract_accr_fee%ROWTYPE,
     v_lftbs_accr_fee_subsys     lftb_accr_fee_subsys%ROWTYPE,
     v_oltbs_contract__ratio     oltb_contract%ROWTYPE,
     v_contract_accr_fee__ratio    ty_tb_contract_accr_fee__ratio,
     v_lbtbs_part_event_ratio    ty_tb_v_lbtbs_part_event_ratio,
                 ty_olcondet Olpks_Olcondet_Main.ty_olcondet,
                 ty_lfcacfcf Lfpks_Lfcacfcf_Main.ty_lfcacfcf,
                 ty_lbcprtax Lbpks_Lbcprtax_Main.ty_lbcprtax,
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
                        p_lfdacfin          IN OUT  lfpks_lfdacfin_Main.Ty_lfdacfin,
                        p_Status            IN OUT VARCHAR2 ,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Build_Ts_List (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern   IN  VARCHAR2,
p_lfdacfin          IN lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Resolve_Ref_Numbers (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lfdacfin     IN  OUT lfpks_lfdacfin_Main.ty_lfdacfin,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Product_Default         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lfdacfin     IN  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Wrk_lfdacfin      IN OUT  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Subsys_Pickup         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lfdacfin     IN  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Prev_lfdacfin IN OUT  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Wrk_lfdacfin      IN OUT  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Enrich         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lfdacfin     IN  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Prev_lfdacfin IN OUT  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Wrk_lfdacfin      IN OUT  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Check_Mandatory (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_lfdacfin IN OUT  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
  RETURN BOOLEAN;
FUNCTION Fn_Default_And_Validate        (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN  OUT   VARCHAR2,
p_lfdacfin     IN  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Prev_lfdacfin IN OUT  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Wrk_lfdacfin IN OUT  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Upload_Db         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lfdacfin     IN  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Prev_lfdacfin     IN  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Wrk_lfdacfin      IN OUT  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Process         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lfdacfin     IN  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Prev_lfdacfin     IN  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Wrk_lfdacfin      IN OUT  lfpks_lfdacfin_Main.Ty_lfdacfin,
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
p_lfdacfin         IN  lfpks_lfdacfin_Main.Ty_lfdacfin, 
p_Wrk_lfdacfin  IN   OUT  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_addl_info       IN Cspks_Req_Global.Ty_Addl_Info,
p_lfdacfin       IN   OUT lfpks_lfdacfin_Main.ty_lfdacfin,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_lfdacfin       IN   OUT lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lfdacfin          IN lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern IN       VARCHAR2,
p_lfdacfin          IN lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Check_Mandatory (p_Source    IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_lfdacfin IN  lfpks_lfdacfin_Main.ty_lfdacfin,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Basic_Vals        (p_Source    IN     VARCHAR2,
p_lfdacfin     IN  lfpks_lfdacfin_Main.ty_lfdacfin,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Merge_Amendables        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
p_lfdacfin     IN  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Prev_lfdacfin IN lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Wrk_lfdacfin IN OUT lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Check_Mandatory_Nodes  (p_Source    IN     VARCHAR2,
p_Wrk_lfdacfin IN  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Lov_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_lfdacfin     IN  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_lfdacfin     IN  OUT lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_and_Validate        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lfdacfin     IN  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Prev_lfdacfin IN OUT  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Wrk_lfdacfin IN OUT  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Upload_Db         (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lfdacfin     IN  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Prev_lfdacfin     IN  lfpks_lfdacfin_Main.Ty_lfdacfin,
p_Wrk_lfdacfin      IN OUT  lfpks_lfdacfin_Main.Ty_lfdacfin,
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
p_lfdacfin         IN  lfpks_lfdacfin_Main.ty_lfdacfin, 
p_Wrk_lfdacfin  IN   OUT lfpks_lfdacfin_Main.ty_lfdacfin,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Query_Desc_Fields  ( p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Wrk_lfdacfin  IN   OUT lfpks_lfdacfin_Main.ty_lfdacfin,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Get_Node_Data ( 
p_Node_Data         IN OUT Cspks_Req_Global.Ty_Tb_Chr_Node_Data,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
END lfpks_lfdacfin_main;
/
CREATE OR REPLACE SYNONYM lfpkss_lfdacfin_main FOR lfpks_lfdacfin_main
/