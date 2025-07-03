CREATE OR REPLACE PACKAGE  olpks_olcflrcl_main AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_olcflrcl_main.spc
  **
  ** Module     : Loans and Deposits
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
  
  
TYPE ty_tb_ltms_contract_flrclg_ccy IS TABLE OF oltm_contract_flrclg_ccy%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__contract_flrclg_effdate IS TABLE OF oltm_contract_flrclg_effdate%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_contract_flrclg_rate IS TABLE OF oltm_contract_flrclg_rate%ROWTYPE INDEX BY BINARY_INTEGER;

TYPE ty_olcflrcl IS RECORD (
     v_contract_flrclg_master     oltm_contract_flrclg_master%ROWTYPE,
     v_oltms_contract_flrclg_ccy    ty_tb_ltms_contract_flrclg_ccy,
     v_contract_flrclg_effdate    ty_tb__contract_flrclg_effdate,
     v_contract_flrclg_rate    ty_tb_v_contract_flrclg_rate,
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
                        p_olcflrcl          IN OUT  olpks_olcflrcl_Main.Ty_olcflrcl,
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
p_olcflrcl       IN   OUT olpks_olcflrcl_Main.ty_olcflrcl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Build_Ts_List (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_olcflrcl       IN    olpks_olcflrcl_Main.ty_olcflrcl,
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
p_olcflrcl IN OUT  olpks_olcflrcl_Main.Ty_olcflrcl,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
  RETURN BOOLEAN;
FUNCTION Fn_Default_And_Validate        (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN  OUT   VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_olcflrcl     IN  olpks_olcflrcl_Main.Ty_olcflrcl,
p_Prev_olcflrcl IN OUT  olpks_olcflrcl_Main.Ty_olcflrcl,
p_Wrk_olcflrcl IN OUT  olpks_olcflrcl_Main.Ty_olcflrcl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Upload_Db         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_olcflrcl     IN  olpks_olcflrcl_Main.Ty_olcflrcl,
p_Prev_olcflrcl     IN  olpks_olcflrcl_Main.Ty_olcflrcl,
p_Wrk_olcflrcl      IN OUT  olpks_olcflrcl_Main.Ty_olcflrcl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Process         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_olcflrcl     IN  olpks_olcflrcl_Main.Ty_olcflrcl,
p_Prev_olcflrcl     IN  olpks_olcflrcl_Main.Ty_olcflrcl,
p_Wrk_olcflrcl      IN OUT  olpks_olcflrcl_Main.Ty_olcflrcl,
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
p_olcflrcl         IN  olpks_olcflrcl_Main.Ty_olcflrcl, 
p_Wrk_olcflrcl  IN   OUT  olpks_olcflrcl_Main.Ty_olcflrcl,
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
p_olcflrcl       IN   OUT olpks_olcflrcl_Main.ty_olcflrcl,
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
p_olcflrcl       IN   OUT olpks_olcflrcl_Main.Ty_olcflrcl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
                        p_Main_Function       IN     VARCHAR2,
p_olcflrcl          IN olpks_olcflrcl_Main.Ty_olcflrcl,
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
p_olcflrcl          IN olpks_olcflrcl_Main.Ty_olcflrcl,
p_Level_Format   IN       VARCHAR2,
p_Level_counter   IN  OUT  NUMBER,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Check_Mandatory (p_Source    IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_olcflrcl IN  olpks_olcflrcl_Main.ty_olcflrcl,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Basic_Vals        (p_Source    IN     VARCHAR2,
p_olcflrcl     IN  olpks_olcflrcl_Main.ty_olcflrcl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Merge_Amendables        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
p_olcflrcl     IN  olpks_olcflrcl_Main.Ty_olcflrcl,
p_Prev_olcflrcl IN olpks_olcflrcl_Main.Ty_olcflrcl,
p_Wrk_olcflrcl IN OUT olpks_olcflrcl_Main.Ty_olcflrcl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Check_Mandatory_Nodes  (p_Source    IN     VARCHAR2,
p_Wrk_olcflrcl IN  olpks_olcflrcl_Main.Ty_olcflrcl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Lov_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_olcflrcl     IN  olpks_olcflrcl_Main.Ty_olcflrcl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_olcflrcl     IN  OUT olpks_olcflrcl_Main.Ty_olcflrcl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_and_Validate        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_olcflrcl     IN  olpks_olcflrcl_Main.Ty_olcflrcl,
p_Prev_olcflrcl IN OUT  olpks_olcflrcl_Main.Ty_olcflrcl,
p_Wrk_olcflrcl IN OUT  olpks_olcflrcl_Main.Ty_olcflrcl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Upload_Db         (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_olcflrcl     IN  olpks_olcflrcl_Main.Ty_olcflrcl,
p_Prev_olcflrcl     IN  olpks_olcflrcl_Main.Ty_olcflrcl,
p_Wrk_olcflrcl      IN OUT  olpks_olcflrcl_Main.Ty_olcflrcl,
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
p_olcflrcl         IN  olpks_olcflrcl_Main.ty_olcflrcl, 
p_Wrk_olcflrcl  IN   OUT olpks_olcflrcl_Main.ty_olcflrcl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Query_Desc_Fields  ( p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Wrk_olcflrcl  IN   OUT olpks_olcflrcl_Main.ty_olcflrcl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Populate_Keys  ( p_Source    IN     VARCHAR2,
p_Key_Tags_Vals   IN  VARCHAR2,
p_olcflrcl  IN   OUT olpks_olcflrcl_Main.ty_olcflrcl,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Get_Node_Data ( 
p_Node_Data         IN OUT Cspks_Req_Global.Ty_Tb_Chr_Node_Data,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
END olpks_olcflrcl_main;
/
CREATE OR REPLACE SYNONYM olpkss_olcflrcl_main FOR olpks_olcflrcl_main
/