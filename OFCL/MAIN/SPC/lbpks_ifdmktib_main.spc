CREATE OR REPLACE PACKAGE  lbpks_ifdmktib_main AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_ifdmktib_main.spc
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
  
  
TYPE ty_tb_oltbs_ls_markit_int_rate IS TABLE OF oltb_ls_markit_int_rate%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__oltbs_ls_markit_ex_rate IS TABLE OF oltb_ls_markit_ex_rate%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_ltbs_ls_markit_exception IS TABLE OF oltb_ls_markit_exception%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_ls_markit_payment__int IS TABLE OF oltb_ls_markit_payment%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__ls_markit_payment__prin IS TABLE OF oltb_ls_markit_payment%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_ls_markit_fee_payment IS TABLE OF oltb_ls_markit_fee_payment%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_oltbs_ls_markit_fee IS TABLE OF oltb_ls_markit_fee%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_oltbs_ls_markit_margin IS TABLE OF oltb_ls_markit_margin%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_ls_markit_dd_renewal IS TABLE OF oltb_ls_markit_dd_renewal%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_ls_markit_drawdown__chld IS TABLE OF oltb_ls_markit_drawdown%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__ls_markit_int_rate__chd IS TABLE OF oltb_ls_markit_int_rate%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_ls_markit_ex_rate__chd IS TABLE OF oltb_ls_markit_ex_rate%ROWTYPE INDEX BY BINARY_INTEGER;

TYPE ty_ifdmktib IS RECORD (
     v_oltbs_ls_markit_master     oltb_ls_markit_master%ROWTYPE,
     v_oltbs_ls_markit_int_rate    ty_tb_oltbs_ls_markit_int_rate,
     v_oltbs_ls_markit_ex_rate    ty_tb__oltbs_ls_markit_ex_rate,
     v_oltbs_ls_markit_drawdown     oltb_ls_markit_drawdown%ROWTYPE,
     v_oltbs_ls_markit_exception    ty_tb_ltbs_ls_markit_exception,
     v_ls_markit_payment__int    ty_tb_v_ls_markit_payment__int,
     v_ls_markit_payment__prin    ty_tb__ls_markit_payment__prin,
     v_ls_markit_fee_payment    ty_tb_v_ls_markit_fee_payment,
     v_oltbs_ls_markit_fee    ty_tb_v_oltbs_ls_markit_fee,
     v_oltbs_ls_markit_margin    ty_tb_v_oltbs_ls_markit_margin,
     v_ls_markit_dd_renewal    ty_tb_v_ls_markit_dd_renewal,
     v_ls_markit_drawdown__chld    ty_tb_ls_markit_drawdown__chld,
     v_ls_markit_int_rate__chd    ty_tb__ls_markit_int_rate__chd,
     v_ls_markit_ex_rate__chd    ty_tb_v_ls_markit_ex_rate__chd,
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
                        p_ifdmktib          IN OUT  lbpks_ifdmktib_Main.Ty_ifdmktib,
                        p_Status            IN OUT VARCHAR2 ,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Build_Ts_List (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern   IN  VARCHAR2,
p_ifdmktib          IN lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Resolve_Ref_Numbers (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_ifdmktib     IN  OUT lbpks_ifdmktib_Main.ty_ifdmktib,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Product_Default         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_ifdmktib     IN  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Wrk_ifdmktib      IN OUT  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Subsys_Pickup         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_ifdmktib     IN  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Prev_ifdmktib IN OUT  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Wrk_ifdmktib      IN OUT  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Enrich         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_ifdmktib     IN  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Prev_ifdmktib IN OUT  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Wrk_ifdmktib      IN OUT  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Check_Mandatory (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_ifdmktib IN OUT  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
  RETURN BOOLEAN;
FUNCTION Fn_Default_And_Validate        (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN  OUT   VARCHAR2,
p_ifdmktib     IN  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Prev_ifdmktib IN OUT  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Wrk_ifdmktib IN OUT  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Upload_Db         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_ifdmktib     IN  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Prev_ifdmktib     IN  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Wrk_ifdmktib      IN OUT  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Process         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_ifdmktib     IN  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Prev_ifdmktib     IN  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Wrk_ifdmktib      IN OUT  lbpks_ifdmktib_Main.Ty_ifdmktib,
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
p_ifdmktib         IN  lbpks_ifdmktib_Main.Ty_ifdmktib, 
p_Wrk_ifdmktib  IN   OUT  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_addl_info       IN Cspks_Req_Global.Ty_Addl_Info,
p_ifdmktib       IN   OUT lbpks_ifdmktib_Main.ty_ifdmktib,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_ifdmktib       IN   OUT lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_ifdmktib          IN lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern IN       VARCHAR2,
p_ifdmktib          IN lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Check_Mandatory (p_Source    IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_ifdmktib IN  lbpks_ifdmktib_Main.ty_ifdmktib,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Basic_Vals        (p_Source    IN     VARCHAR2,
p_ifdmktib     IN  lbpks_ifdmktib_Main.ty_ifdmktib,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Merge_Amendables        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
p_ifdmktib     IN  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Prev_ifdmktib IN lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Wrk_ifdmktib IN OUT lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Check_Mandatory_Nodes  (p_Source    IN     VARCHAR2,
p_Wrk_ifdmktib IN  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Lov_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_ifdmktib     IN  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_ifdmktib     IN  OUT lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_and_Validate        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_ifdmktib     IN  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Prev_ifdmktib IN OUT  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Wrk_ifdmktib IN OUT  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Upload_Db         (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_ifdmktib     IN  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Prev_ifdmktib     IN  lbpks_ifdmktib_Main.Ty_ifdmktib,
p_Wrk_ifdmktib      IN OUT  lbpks_ifdmktib_Main.Ty_ifdmktib,
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
p_ifdmktib         IN  lbpks_ifdmktib_Main.ty_ifdmktib, 
p_Wrk_ifdmktib  IN   OUT lbpks_ifdmktib_Main.ty_ifdmktib,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Query_Desc_Fields  ( p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Wrk_ifdmktib  IN   OUT lbpks_ifdmktib_Main.ty_ifdmktib,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Get_Node_Data ( 
p_Node_Data         IN OUT Cspks_Req_Global.Ty_Tb_Chr_Node_Data,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
END lbpks_ifdmktib_main;
/
CREATE OR REPLACE SYNONYM lbpkss_ifdmktib_main FOR lbpks_ifdmktib_main
/