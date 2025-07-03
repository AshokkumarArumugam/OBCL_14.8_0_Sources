CREATE OR REPLACE PACKAGE  tlpks_tldtkstl_main AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : tlpks_tldtkstl_main.spc
  **
  ** Module     : Secondary Loan Trading
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
  
  
TYPE ty_tb_v_tltbs_ticket_fee IS TABLE OF tltb_ticket_fee%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_tltbs_ticket_detail IS TABLE OF tltb_ticket_detail%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_ticket_assignment_fee IS TABLE OF tltb_ticket_assignment_fee%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_tltbs_subticket_detail IS TABLE OF tltb_subticket_detail%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_olvws_all_msg_out IS TABLE OF olvw_all_msg_out%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_tltbs_fmem_exception IS TABLE OF tltb_fmem_exception%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_tlvw_ticket_customers IS TABLE OF tlvw_ticket_customers%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__tltbs_contract_curr_det IS TABLE OF tltb_contract_curr_det%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_olcetmvw IS TABLE OF Olpks_Olcetmvw_Main.ty_olcetmvw INDEX BY PLS_INTEGER;
TYPE ty_tb_tlcfmemo IS TABLE OF Tlpks_Tlcfmemo_Main.ty_tlcfmemo INDEX BY PLS_INTEGER;
TYPE ty_tb_tlcmemup IS TABLE OF Tlpks_Tlcmemup_Main.ty_tlcmemup INDEX BY PLS_INTEGER;

TYPE ty_tldtkstl IS RECORD (
     v_tltbs_ticket_master     tltb_ticket_master%ROWTYPE,
     v_tltbs_ticket_fee    ty_tb_v_tltbs_ticket_fee,
     v_tltbs_ticket_detail    ty_tb_v_tltbs_ticket_detail,
     v_ticket_assignment_fee    ty_tb_v_ticket_assignment_fee,
     v_tltbs_subticket_detail    ty_tb_v_tltbs_subticket_detail,
     v_tckt_fmem_ccy_details     tlvw_tckt_fmem_ccy_details%ROWTYPE,
     v_olvws_all_msg_out    ty_tb_v_olvws_all_msg_out,
     v_tltbs_fmem_exception    ty_tb_v_tltbs_fmem_exception,
     v_tlvw_ticket_customers    ty_tb_v_tlvw_ticket_customers,
     v_tltbs_ticket_master__ssi     tltb_ticket_master%ROWTYPE,
     v_tltbs_contract_curr_det    ty_tb__tltbs_contract_curr_det,
                 ty_olcetmvw ty_tb_olcetmvw,
                 ty_tlcexssi Tlpks_Tlcexssi_Main.ty_tlcexssi,
                 ty_tlcfmemo ty_tb_tlcfmemo,
                 ty_tlcmemup ty_tb_tlcmemup,
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
                        p_tldtkstl          IN OUT  tlpks_tldtkstl_Main.Ty_tldtkstl,
                        p_Status            IN OUT VARCHAR2 ,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Build_Ts_List (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern   IN  VARCHAR2,
p_tldtkstl          IN tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Resolve_Ref_Numbers (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_tldtkstl     IN  OUT tlpks_tldtkstl_Main.ty_tldtkstl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Product_Default         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_tldtkstl     IN  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Wrk_tldtkstl      IN OUT  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Subsys_Pickup         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_tldtkstl     IN  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Prev_tldtkstl IN OUT  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Wrk_tldtkstl      IN OUT  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Enrich         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_tldtkstl     IN  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Prev_tldtkstl IN OUT  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Wrk_tldtkstl      IN OUT  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Check_Mandatory (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_tldtkstl IN OUT  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
  RETURN BOOLEAN;
FUNCTION Fn_Default_And_Validate        (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN  OUT   VARCHAR2,
p_tldtkstl     IN  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Prev_tldtkstl IN OUT  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Wrk_tldtkstl IN OUT  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Upload_Db         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_tldtkstl     IN  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Prev_tldtkstl     IN  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Wrk_tldtkstl      IN OUT  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Process         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_tldtkstl     IN  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Prev_tldtkstl     IN  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Wrk_tldtkstl      IN OUT  tlpks_tldtkstl_Main.Ty_tldtkstl,
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
p_tldtkstl         IN  tlpks_tldtkstl_Main.Ty_tldtkstl, 
p_Wrk_tldtkstl  IN   OUT  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_addl_info       IN Cspks_Req_Global.Ty_Addl_Info,
p_tldtkstl       IN   OUT tlpks_tldtkstl_Main.ty_tldtkstl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_tldtkstl       IN   OUT tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_tldtkstl          IN tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern IN       VARCHAR2,
p_tldtkstl          IN tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Check_Mandatory (p_Source    IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_tldtkstl IN  tlpks_tldtkstl_Main.ty_tldtkstl,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Basic_Vals        (p_Source    IN     VARCHAR2,
p_tldtkstl     IN  tlpks_tldtkstl_Main.ty_tldtkstl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Merge_Amendables        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
p_tldtkstl     IN  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Prev_tldtkstl IN tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Wrk_tldtkstl IN OUT tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Check_Mandatory_Nodes  (p_Source    IN     VARCHAR2,
p_Wrk_tldtkstl IN  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Lov_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_tldtkstl     IN  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_tldtkstl     IN  OUT tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_and_Validate        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_tldtkstl     IN  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Prev_tldtkstl IN OUT  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Wrk_tldtkstl IN OUT  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Upload_Db         (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_tldtkstl     IN  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Prev_tldtkstl     IN  tlpks_tldtkstl_Main.Ty_tldtkstl,
p_Wrk_tldtkstl      IN OUT  tlpks_tldtkstl_Main.Ty_tldtkstl,
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
p_tldtkstl         IN  tlpks_tldtkstl_Main.ty_tldtkstl, 
p_Wrk_tldtkstl  IN   OUT tlpks_tldtkstl_Main.ty_tldtkstl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Query_Desc_Fields  ( p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Wrk_tldtkstl  IN   OUT tlpks_tldtkstl_Main.ty_tldtkstl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Get_Node_Data ( 
p_Node_Data         IN OUT Cspks_Req_Global.Ty_Tb_Chr_Node_Data,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
END tlpks_tldtkstl_main;
/
CREATE OR REPLACE SYNONYM tlpkss_tldtkstl_main FOR tlpks_tldtkstl_main
/