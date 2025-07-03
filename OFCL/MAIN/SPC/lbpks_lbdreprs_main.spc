CREATE OR REPLACE PACKAGE  lbpks_lbdreprs_main AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdreprs_main.spc
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
  
  
TYPE ty_tb_v_contract_split_detail IS TABLE OF lbtb_contract_split_detail%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_split_product_intcomps IS TABLE OF lbtb_split_product_intcomps%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_split_product_mrgcomps IS TABLE OF lbtb_split_product_mrgcomps%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_partial_roll_intrate_fix IS TABLE OF lbtb_partial_roll_intrate_fix%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__partial_roll_exrate_fix IS TABLE OF lbtb_partial_roll_exrate_fix%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_lbtbs_rate_setting_rules IS TABLE OF lbtb_rate_setting_rules%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_ltbs_contract_ba_details IS TABLE OF oltb_contract_ba_details%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_lftb_cont_addl_int_dtl IS TABLE OF lftb_cont_addl_int_dtl%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_contract_part_ba_dtls IS TABLE OF lbtb_contract_part_ba_dtls%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_lbtbs_reprs_addl_ba_dtls IS TABLE OF lbtb_reprs_addl_ba_dtls%ROWTYPE INDEX BY BINARY_INTEGER;

TYPE ty_lbdreprs IS RECORD (
     v_oltbs_contract     oltb_contract%ROWTYPE,
     v_contract_split_master     lbtb_contract_split_master%ROWTYPE,
     v_contract_split_detail    ty_tb_v_contract_split_detail,
     v_split_product_intcomps    ty_tb_v_split_product_intcomps,
     v_split_product_mrgcomps    ty_tb_v_split_product_mrgcomps,
     v_oltbs_contract_event_log     oltb_contract_event_log%ROWTYPE,
     v_lbvw_cont_split_det_sum     lbvw_cont_split_det_sum%ROWTYPE,
     v_partial_roll_intrate_fix    ty_tb_partial_roll_intrate_fix,
     v_partial_roll_exrate_fix    ty_tb__partial_roll_exrate_fix,
     v_lbtbs_rate_setting_rules    ty_tb_lbtbs_rate_setting_rules,
     v_oltbs_contract_ba_details    ty_tb_ltbs_contract_ba_details,
     v_lftb_cont_addl_int_dtl    ty_tb_v_lftb_cont_addl_int_dtl,
     v_contract_part_ba_dtls    ty_tb_v_contract_part_ba_dtls,
     v_lbtbs_reprs_addl_ba_dtls    ty_tb_lbtbs_reprs_addl_ba_dtls,
                 ty_lbcadvic Lbpks_Lbcadvic_Main.ty_lbcadvic,
                 ty_lbcfpmls Lbpks_Lbcfpmls_Main.ty_lbcfpmls,
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
                        p_lbdreprs          IN OUT  lbpks_lbdreprs_Main.Ty_lbdreprs,
                        p_Status            IN OUT VARCHAR2 ,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Build_Ts_List (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern   IN  VARCHAR2,
p_lbdreprs          IN lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Resolve_Ref_Numbers (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdreprs     IN  OUT lbpks_lbdreprs_Main.ty_lbdreprs,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Product_Default         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdreprs     IN  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Wrk_lbdreprs      IN OUT  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Subsys_Pickup         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdreprs     IN  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Prev_lbdreprs IN OUT  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Wrk_lbdreprs      IN OUT  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Enrich         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdreprs     IN  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Prev_lbdreprs IN OUT  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Wrk_lbdreprs      IN OUT  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Check_Mandatory (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_lbdreprs IN OUT  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
  RETURN BOOLEAN;
FUNCTION Fn_Default_And_Validate        (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN  OUT   VARCHAR2,
p_lbdreprs     IN  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Prev_lbdreprs IN OUT  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Wrk_lbdreprs IN OUT  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Upload_Db         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lbdreprs     IN  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Prev_lbdreprs     IN  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Wrk_lbdreprs      IN OUT  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Process         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lbdreprs     IN  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Prev_lbdreprs     IN  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Wrk_lbdreprs      IN OUT  lbpks_lbdreprs_Main.Ty_lbdreprs,
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
p_lbdreprs         IN  lbpks_lbdreprs_Main.Ty_lbdreprs, 
p_Wrk_lbdreprs  IN   OUT  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_addl_info       IN Cspks_Req_Global.Ty_Addl_Info,
p_lbdreprs       IN   OUT lbpks_lbdreprs_Main.ty_lbdreprs,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_lbdreprs       IN   OUT lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdreprs          IN lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern IN       VARCHAR2,
p_lbdreprs          IN lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Check_Mandatory (p_Source    IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_lbdreprs IN  lbpks_lbdreprs_Main.ty_lbdreprs,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Basic_Vals        (p_Source    IN     VARCHAR2,
p_lbdreprs     IN  lbpks_lbdreprs_Main.ty_lbdreprs,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Merge_Amendables        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
p_lbdreprs     IN  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Prev_lbdreprs IN lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Wrk_lbdreprs IN OUT lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Check_Mandatory_Nodes  (p_Source    IN     VARCHAR2,
p_Wrk_lbdreprs IN  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Lov_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_lbdreprs     IN  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_lbdreprs     IN  OUT lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_and_Validate        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdreprs     IN  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Prev_lbdreprs IN OUT  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Wrk_lbdreprs IN OUT  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Upload_Db         (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdreprs     IN  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Prev_lbdreprs     IN  lbpks_lbdreprs_Main.Ty_lbdreprs,
p_Wrk_lbdreprs      IN OUT  lbpks_lbdreprs_Main.Ty_lbdreprs,
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
p_lbdreprs         IN  lbpks_lbdreprs_Main.ty_lbdreprs, 
p_Wrk_lbdreprs  IN   OUT lbpks_lbdreprs_Main.ty_lbdreprs,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Query_Desc_Fields  ( p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Wrk_lbdreprs  IN   OUT lbpks_lbdreprs_Main.ty_lbdreprs,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Get_Node_Data ( 
p_Node_Data         IN OUT Cspks_Req_Global.Ty_Tb_Chr_Node_Data,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
END lbpks_lbdreprs_main;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdreprs_main FOR lbpks_lbdreprs_main
/