CREATE OR REPLACE PACKAGE  lbpks_lbconccy_main AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbconccy_main.spc
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
  
  
TYPE ty_tb_v_lbtbs_borrower_ccy__a IS TABLE OF lbtb_borrower_ccy%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_btbs_borrower_exrate_ccy IS TABLE OF lbtb_borrower_exrate_ccy%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_borrower_intrate_ccy IS TABLE OF lbtb_borrower_intrate_ccy%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__lbtbs_borrower_notc_ccy IS TABLE OF lbtb_borrower_notc_ccy%ROWTYPE INDEX BY BINARY_INTEGER;

TYPE ty_lbconccy IS RECORD (
     v_lbtbs_borrower_ccy     lbtb_borrower_ccy%ROWTYPE,
     v_lbtbs_borrower_ccy__a    ty_tb_v_lbtbs_borrower_ccy__a,
     v_lbtbs_borrower_exrate_ccy    ty_tb_btbs_borrower_exrate_ccy,
     v_borrower_intrate_ccy    ty_tb_v_borrower_intrate_ccy,
     v_lbtbs_borrower_notc_ccy    ty_tb__lbtbs_borrower_notc_ccy,
                 Desc_Fields    Cspks_Req_Global.Ty_Tb_Xml_Data,
                 Addl_Info    Cspks_Req_Global.Ty_Addl_info );

PROCEDURE Pr_Set_Skip_Sys;
PROCEDURE Pr_Set_Activate_Sys;
FUNCTION  Fn_Skip_Sys RETURN BOOLEAN;
PROCEDURE Pr_Set_Skip_Kernel;
PROCEDURE Pr_Set_Activate_Kernel;
FUNCTION  Fn_Skip_Kernel RETURN BOOLEAN;
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
p_Main_Function    IN  VARCHAR2,
                        p_Multi_Trip_Id     IN  VARCHAR2,
                        p_Request_No        IN     VARCHAR2,
                        p_lbconccy          IN OUT  lbpks_lbconccy_Main.Ty_lbconccy,
                        p_Status            IN OUT VARCHAR2 ,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Build_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_Key_Tags_Vals   IN  VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_lbconccy       IN   OUT lbpks_lbconccy_Main.ty_lbconccy,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Build_Ts_List (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_lbconccy       IN    lbpks_lbconccy_Main.ty_lbconccy,
p_Level_Format   IN       VARCHAR2,
p_Level_counter   IN  OUT  NUMBER,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ; 
FUNCTION Fn_Check_Mandatory (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_lbconccy IN OUT  lbpks_lbconccy_Main.Ty_lbconccy,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
  RETURN BOOLEAN;
FUNCTION Fn_Default_And_Validate        (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN  OUT   VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_lbconccy     IN  lbpks_lbconccy_Main.Ty_lbconccy,
p_Prev_lbconccy IN OUT  lbpks_lbconccy_Main.Ty_lbconccy,
p_Wrk_lbconccy IN OUT  lbpks_lbconccy_Main.Ty_lbconccy,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Upload_Db         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lbconccy     IN  lbpks_lbconccy_Main.Ty_lbconccy,
p_Prev_lbconccy     IN  lbpks_lbconccy_Main.Ty_lbconccy,
p_Wrk_lbconccy      IN OUT  lbpks_lbconccy_Main.Ty_lbconccy,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Process         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lbconccy     IN  lbpks_lbconccy_Main.Ty_lbconccy,
p_Prev_lbconccy     IN  lbpks_lbconccy_Main.Ty_lbconccy,
p_Wrk_lbconccy      IN OUT  lbpks_lbconccy_Main.Ty_lbconccy,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Query  ( p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_Key_Tags_Vals   IN  VARCHAR2,
p_QryData_Reqd       IN  VARCHAR2,
p_lbconccy         IN  lbpks_lbconccy_Main.Ty_lbconccy, 
p_Wrk_lbconccy  IN   OUT  lbpks_lbconccy_Main.Ty_lbconccy,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_Key_Tags_Vals   IN  VARCHAR2,
p_addl_info       IN Cspks_Req_Global.Ty_Addl_Info,
p_lbconccy       IN   OUT lbpks_lbconccy_Main.ty_lbconccy,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_Key_Tags_Vals   IN  VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_lbconccy       IN   OUT lbpks_lbconccy_Main.Ty_lbconccy,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
                        p_Main_Function       IN     VARCHAR2,
p_lbconccy          IN lbpks_lbconccy_Main.Ty_lbconccy,
p_Level_Format   IN       VARCHAR2,
p_Level_counter   IN  OUT  NUMBER,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
                        p_Main_Function       IN     VARCHAR2,
p_lbconccy          IN lbpks_lbconccy_Main.Ty_lbconccy,
p_Level_Format   IN       VARCHAR2,
p_Level_counter   IN  OUT  NUMBER,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Check_Mandatory (p_Source    IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_lbconccy IN  lbpks_lbconccy_Main.ty_lbconccy,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Basic_Vals        (p_Source    IN     VARCHAR2,
p_lbconccy     IN  lbpks_lbconccy_Main.ty_lbconccy,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Merge_Amendables        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
p_lbconccy     IN  lbpks_lbconccy_Main.Ty_lbconccy,
p_Prev_lbconccy IN lbpks_lbconccy_Main.Ty_lbconccy,
p_Wrk_lbconccy IN OUT lbpks_lbconccy_Main.Ty_lbconccy,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Check_Mandatory_Nodes  (p_Source    IN     VARCHAR2,
p_Wrk_lbconccy IN  lbpks_lbconccy_Main.Ty_lbconccy,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Lov_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_lbconccy     IN  lbpks_lbconccy_Main.Ty_lbconccy,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_lbconccy     IN  OUT lbpks_lbconccy_Main.Ty_lbconccy,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_and_Validate        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbconccy     IN  lbpks_lbconccy_Main.Ty_lbconccy,
p_Prev_lbconccy IN OUT  lbpks_lbconccy_Main.Ty_lbconccy,
p_Wrk_lbconccy IN OUT  lbpks_lbconccy_Main.Ty_lbconccy,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Upload_Db         (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_lbconccy     IN  lbpks_lbconccy_Main.Ty_lbconccy,
p_Prev_lbconccy     IN  lbpks_lbconccy_Main.Ty_lbconccy,
p_Wrk_lbconccy      IN OUT  lbpks_lbconccy_Main.Ty_lbconccy,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Query  ( p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_Key_Tags_Vals   IN  VARCHAR2,
p_QryData_Reqd       IN  VARCHAR2,
p_lbconccy         IN  lbpks_lbconccy_Main.ty_lbconccy, 
p_Wrk_lbconccy  IN   OUT lbpks_lbconccy_Main.ty_lbconccy,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Query_Desc_Fields  ( p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Wrk_lbconccy  IN   OUT lbpks_lbconccy_Main.ty_lbconccy,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Populate_Keys  ( p_Source    IN     VARCHAR2,
p_Key_Tags_Vals   IN  VARCHAR2,
p_lbconccy  IN   OUT lbpks_lbconccy_Main.ty_lbconccy,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Get_Node_Data ( 
p_Node_Data         IN OUT Cspks_Req_Global.Ty_Tb_Chr_Node_Data,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
END lbpks_lbconccy_main;
/
CREATE OR REPLACE SYNONYM lbpkss_lbconccy_main FOR lbpks_lbconccy_main
/