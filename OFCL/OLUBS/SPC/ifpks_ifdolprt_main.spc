CREATE OR REPLACE PACKAGE ifpks_ifdolprt_main AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : ifpks_ifdolprt_main.spc
  **
  ** Module     : Interfaces
  **
  ** This source is part of the Oracle FLEXCUBE Software Product.
  ** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
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


TYPE ty_iftb_olproduct_masterr IS RECORD(
  PRODUCT_CODE          VARCHAR2(4),
  PRODUCT_DESC          VARCHAR2(35),
  MODULE_CODE           VARCHAR2(2),
  PRODUCT_TYPE          CHAR(1),
  STD_TENOR             NUMBER(4),
  TENOR_UNIT            CHAR(1),
  NORMAL_RATE_VARIANCE  NUMBER,
  MAXIMUM_RATE_VARIANCE NUMBER,
  RATE_CODE_PREF        CHAR(1),
  RATE_TYPE             VARCHAR2(8),
  SOURCE                VARCHAR2(15),
  EXTERNAL_REF_NUM      VARCHAR2(16),
  RECORD_STAT           CHAR(1),
  AUTH_STAT             CHAR(1));

TYPE ty_iftb_olproduct_iccf IS RECORD(
  PRODUCT_CODE          VARCHAR2(4),
  COMPONENT             VARCHAR2(10),
  COMPONENT_DESCRIPTION VARCHAR2(35),
  RATE_TYPE             CHAR(1),
  RATE_CODE             VARCHAR2(10),
  FIXED_RATE_TYPE       VARCHAR2(1),
  FIXED_RATE_CODE       VARCHAR2(10),
  RATE_CODE_USAGE       CHAR(1),
  RATE_REVISION_METHOD  VARCHAR2(1),
  EXTERNAL_REF_NUM      VARCHAR2(16),
  SOURCE                VARCHAR2(15));
  
TYPE ty_tb_v_iftb_olproduct_iccf IS TABLE OF ty_iftb_olproduct_iccf;

TYPE ty_ifdolprt IS RECORD (
     v_iftb_olproduct_master     ty_iftb_olproduct_masterr,
	 v_iftb_olproduct_iccf    	 ty_tb_v_iftb_olproduct_iccf,
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
                        p_ifdolprt          IN OUT  ifpks_ifdolprt_Main.Ty_ifdolprt,
                        p_Status            IN OUT VARCHAR2 ,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Build_Ts_List (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern   IN  VARCHAR2,
p_ifdolprt          IN ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Resolve_Ref_Numbers (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_ifdolprt     IN  OUT ifpks_ifdolprt_Main.ty_ifdolprt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Product_Default         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_ifdolprt     IN  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Wrk_ifdolprt      IN OUT  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Subsys_Pickup         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_ifdolprt     IN  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Prev_ifdolprt IN OUT  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Wrk_ifdolprt      IN OUT  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Enrich         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_ifdolprt     IN  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Prev_ifdolprt IN OUT  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Wrk_ifdolprt      IN OUT  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Check_Mandatory (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_ifdolprt IN OUT  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
  RETURN BOOLEAN;
FUNCTION Fn_Default_And_Validate        (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN  OUT   VARCHAR2,
p_ifdolprt     IN  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Prev_ifdolprt IN OUT  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Wrk_ifdolprt IN OUT  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Upload_Db         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_ifdolprt     IN  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Prev_ifdolprt     IN  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Wrk_ifdolprt      IN OUT  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Process         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_ifdolprt     IN  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Prev_ifdolprt     IN  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Wrk_ifdolprt      IN OUT  ifpks_ifdolprt_Main.Ty_ifdolprt,
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
p_ifdolprt         IN  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Wrk_ifdolprt  IN   OUT  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_addl_info       IN Cspks_Req_Global.Ty_Addl_Info,
p_ifdolprt       IN   OUT ifpks_ifdolprt_Main.ty_ifdolprt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Type (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_ifdolprt       IN   OUT ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Build_Fc_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_ifdolprt          IN ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Build_Ws_Ts (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Exchange_Pattern IN       VARCHAR2,
p_ifdolprt          IN ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Err_Code        IN OUT VARCHAR2,
p_Err_Params      IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Check_Mandatory (p_Source    IN     VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_ifdolprt IN  ifpks_ifdolprt_Main.ty_ifdolprt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Basic_Vals        (p_Source    IN     VARCHAR2,
p_ifdolprt     IN  ifpks_ifdolprt_Main.ty_ifdolprt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Sys_Merge_Amendables        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
p_ifdolprt     IN  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Prev_ifdolprt IN ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Wrk_ifdolprt IN OUT ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Check_Mandatory_Nodes  (p_Source    IN     VARCHAR2,
p_Wrk_ifdolprt IN  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Lov_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_ifdolprt     IN  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_Vals        (p_Source    IN     VARCHAR2,
p_Wrk_ifdolprt     IN  OUT ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Default_and_Validate        (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_ifdolprt     IN  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Prev_ifdolprt IN OUT  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Wrk_ifdolprt IN OUT  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Upload_Db         (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_ifdolprt     IN  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Prev_ifdolprt     IN  ifpks_ifdolprt_Main.Ty_ifdolprt,
p_Wrk_ifdolprt      IN OUT  ifpks_ifdolprt_Main.Ty_ifdolprt,
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
p_ifdolprt         IN  ifpks_ifdolprt_Main.ty_ifdolprt,
p_Wrk_ifdolprt  IN   OUT ifpks_ifdolprt_Main.ty_ifdolprt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Sys_Query_Desc_Fields  ( p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Wrk_ifdolprt  IN   OUT ifpks_ifdolprt_Main.ty_ifdolprt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Get_Node_Data (
p_Node_Data         IN OUT Cspks_Req_Global.Ty_Tb_Chr_Node_Data,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
END ifpks_ifdolprt_main;
/