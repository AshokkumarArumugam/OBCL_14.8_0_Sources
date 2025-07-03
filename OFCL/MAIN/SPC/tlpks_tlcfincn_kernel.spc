create or replace PACKAGE  tlpks_tlcfincn_kernel AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : tlpks_tlcfincn_kernel.spc
  **
  ** Module     : Secondary Loan Trading
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright (R) 2008,2020 , Oracle and/or its affiliates.  All rights reserved
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

      Changed By         : Jayaram N
	  Date               : 17-Apr-2020
	  Change Description : SLT:City calendar - Multiple holiday tracking
	  Search String      : OBCL_14.4_SLT_Financial_Centre_Holiday_Treatment

  -------------------------------------------------------------------------------------------------------
  */


PROCEDURE Pr_Skip_Handler  (P_Stage  IN  VARCHAR2);

FUNCTION Fn_Main       (p_Source            IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
                         p_Child_Function    IN  VARCHAR2,
                        p_Multi_Trip_Id     IN  VARCHAR2,
                        p_Request_No        IN     VARCHAR2,
p_tlcfincn IN OUT  tlpks_tlcfincn_Main.ty_tlcfincn,
                        p_Status            IN OUT VARCHAR2 ,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Build_Type_Structure (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Key_Tags_Vals   IN  VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_tlcfincn     IN  OUT tlpks_tlcfincn_Main.Ty_tlcfincn,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_pk_or_full     IN  VARCHAR2 DEFAULT 'FULL',
p_tlcfincn IN  OUT  tlpks_tlcfincn_Main.ty_tlcfincn,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_tlcfincn IN   tlpks_tlcfincn_Main.ty_tlcfincn,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Default_And_Validate (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_tlcfincn IN   tlpks_tlcfincn_Main.Ty_tlcfincn,
p_Prev_tlcfincn IN OUT tlpks_tlcfincn_Main.Ty_tlcfincn,
p_Wrk_tlcfincn IN OUT  tlpks_tlcfincn_Main.Ty_tlcfincn,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Default_And_Validate (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_tlcfincn IN   tlpks_tlcfincn_Main.Ty_tlcfincn,
p_Prev_tlcfincn IN OUT tlpks_tlcfincn_Main.Ty_tlcfincn,
p_wrk_tlcfincn IN OUT  tlpks_tlcfincn_Main.Ty_tlcfincn,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Upload_Db (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_tlcfincn IN tlpks_tlcfincn_Main.Ty_tlcfincn,
p_Prev_tlcfincn IN tlpks_tlcfincn_Main.Ty_tlcfincn,
p_Wrk_tlcfincn IN OUT  tlpks_tlcfincn_Main.Ty_tlcfincn,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Upload_Db (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_tlcfincn IN tlpks_tlcfincn_Main.Ty_tlcfincn,
p_Prev_tlcfincn IN tlpks_tlcfincn_Main.Ty_tlcfincn,
p_Wrk_tlcfincn IN OUT  tlpks_tlcfincn_Main.Ty_tlcfincn,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Process (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_tlcfincn IN tlpks_tlcfincn_Main.Ty_tlcfincn,
p_Prev_tlcfincn IN tlpks_tlcfincn_Main.Ty_tlcfincn,
p_Wrk_tlcfincn IN OUT  tlpks_tlcfincn_Main.Ty_tlcfincn,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Process (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_tlcfincn IN tlpks_tlcfincn_Main.Ty_tlcfincn,
p_Prev_tlcfincn IN tlpks_tlcfincn_Main.Ty_tlcfincn,
p_Wrk_tlcfincn IN OUT  tlpks_tlcfincn_Main.Ty_tlcfincn,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Query  ( p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Key_Tags_Vals   IN  OUT VARCHAR2,
p_QryData_Reqd IN  VARCHAR2 ,
p_tlcfincn IN   tlpks_tlcfincn_Main.Ty_tlcfincn,
p_wrk_tlcfincn IN OUT   tlpks_tlcfincn_Main.Ty_tlcfincn,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Query  ( p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Main_Function    IN  VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Key_Tags_Vals   IN  OUT VARCHAR2,
p_QryData_Reqd IN  VARCHAR2 ,
p_tlcfincn IN   tlpks_tlcfincn_Main.Ty_tlcfincn,
p_wrk_tlcfincn IN OUT   tlpks_tlcfincn_Main.Ty_tlcfincn,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

END tlpks_tlcfincn_kernel;
/
CREATE OR REPLACE SYNONYM tlpkss_tlcfincn_kernel FOR tlpks_tlcfincn_kernel
/