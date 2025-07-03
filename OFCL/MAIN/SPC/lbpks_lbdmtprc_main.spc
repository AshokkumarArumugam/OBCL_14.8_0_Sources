CREATE OR REPLACE PACKAGE  lbpks_lbdmtprc_main AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdmtprc_main.spc
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
  
  
TYPE ty_tb_v_borrower_fronting__a IS TABLE OF lbtb_borrower_fronting%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_participant_fronting IS TABLE OF lbtb_participant_fronting%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_lbtbs_unfund_detail IS TABLE OF lbtb_unfund_detail%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_part_funding_details IS TABLE OF lbtb_part_funding_details%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_lbvw_borrower_history IS TABLE OF lbvw_borrower_history%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_borrower_payment_history IS TABLE OF lbtb_borrower_payment_history%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_part_funding_history IS TABLE OF lbtb_part_funding_history%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__lbvws_part_orr_mismatch IS TABLE OF lbvw_part_orr_mismatch%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__lbvws_borr_orr_mismatch IS TABLE OF lbvw_borr_orr_mismatch%ROWTYPE INDEX BY BINARY_INTEGER;

TYPE ty_lbdmtprc IS RECORD (
     v_lbtbs_borrower_fronting     lbtb_borrower_fronting%ROWTYPE,
     v_borrower_fronting__a    ty_tb_v_borrower_fronting__a,
     v_participant_fronting    ty_tb_v_participant_fronting,
     v_lbtbs_unfund_detail    ty_tb_v_lbtbs_unfund_detail,
     v_part_funding_details    ty_tb_v_part_funding_details,
     v_lbvw_borrower_history    ty_tb_v_lbvw_borrower_history,
     v_borrower_payment_history    ty_tb_borrower_payment_history,
     v_part_funding_history    ty_tb_v_part_funding_history,
     v_oltbs_contract     oltb_contract%ROWTYPE,
     v_oltbs_contract_event_log     oltb_contract_event_log%ROWTYPE,
     v_lbvws_part_orr_mismatch    ty_tb__lbvws_part_orr_mismatch,
     v_lbvws_borr_orr_mismatch    ty_tb__lbvws_borr_orr_mismatch,
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
                        p_lbdmtprc          IN OUT  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
                        p_Status            IN OUT VARCHAR2 ,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Build_Ts_List (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern   IN  VARCHAR2,
p_lbdmtprc          IN lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Resolve_Ref_Numbers (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdmtprc     IN  OUT lbpks_lbdmtprc_Main.ty_lbdmtprc,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Product_Default         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdmtprc     IN  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Wrk_lbdmtprc      IN OUT  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Subsys_Pickup         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdmtprc     IN  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Prev_lbdmtprc IN OUT  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Wrk_lbdmtprc      IN OUT  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Enrich         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdmtprc     IN  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Prev_lbdmtprc IN OUT  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Wrk_lbdmtprc      IN OUT  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Check_Mandatory (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_lbdmtprc IN OUT  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
  RETURN BOOLEAN;
FUNCTION Fn_Default_And_Validate        (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN  OUT   VARCHAR2,
p_lbdmtprc     IN  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Prev_lbdmtprc IN OUT  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Wrk_lbdmtprc IN OUT  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Upload_Db         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lbdmtprc     IN  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Prev_lbdmtprc     IN  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Wrk_lbdmtprc      IN OUT  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Process         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lbdmtprc     IN  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Prev_lbdmtprc     IN  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Wrk_lbdmtprc      IN OUT  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
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
p_lbdmtprc         IN  lbpks_lbdmtprc_Main.Ty_lbdmtprc, 
p_Wrk_lbdmtprc  IN   OUT  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_addl_info       IN Cspks_Req_Global.Ty_Addl_Info,
p_lbdmtprc       IN   OUT lbpks_lbdmtprc_Main.ty_lbdmtprc,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_lbdmtprc       IN   OUT lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdmtprc          IN lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern IN       VARCHAR2,
p_lbdmtprc          IN lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Check_Mandatory (p_Source    IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_lbdmtprc IN  lbpks_lbdmtprc_Main.ty_lbdmtprc,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Basic_Vals        (p_Source    IN     VARCHAR2,
p_lbdmtprc     IN  lbpks_lbdmtprc_Main.ty_lbdmtprc,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Merge_Amendables        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
p_lbdmtprc     IN  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Prev_lbdmtprc IN lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Wrk_lbdmtprc IN OUT lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Check_Mandatory_Nodes  (p_Source    IN     VARCHAR2,
p_Wrk_lbdmtprc IN  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Lov_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_lbdmtprc     IN  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_lbdmtprc     IN  OUT lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_and_Validate        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdmtprc     IN  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Prev_lbdmtprc IN OUT  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Wrk_lbdmtprc IN OUT  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Upload_Db         (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdmtprc     IN  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Prev_lbdmtprc     IN  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
p_Wrk_lbdmtprc      IN OUT  lbpks_lbdmtprc_Main.Ty_lbdmtprc,
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
p_lbdmtprc         IN  lbpks_lbdmtprc_Main.ty_lbdmtprc, 
p_Wrk_lbdmtprc  IN   OUT lbpks_lbdmtprc_Main.ty_lbdmtprc,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Query_Desc_Fields  ( p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Wrk_lbdmtprc  IN   OUT lbpks_lbdmtprc_Main.ty_lbdmtprc,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Get_Node_Data ( 
p_Node_Data         IN OUT Cspks_Req_Global.Ty_Tb_Chr_Node_Data,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
END lbpks_lbdmtprc_main;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdmtprc_main FOR lbpks_lbdmtprc_main
/