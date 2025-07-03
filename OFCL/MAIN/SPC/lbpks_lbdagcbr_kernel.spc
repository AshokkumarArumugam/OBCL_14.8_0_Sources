create or replace PACKAGE lbpks_lbdagcbr_kernel AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdagcbr_kernel.spc
  **
  ** Module     : Syndication Loans and Commitments
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright (R) 2008,2019 , Oracle and/or its affiliates.  All rights reserved
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
  Date               : 21-Jan-2020
  Change Description : SLT:Primary Delayed Compensation Changes
  Search String      : OBCL14.4:SFR#29959798:Primary_Delayed_Compensation

  -------------------------------------------------------------------------------------------------------
  */


PROCEDURE Pr_Skip_Handler  (P_Stage  IN  VARCHAR2);
FUNCTION Fn_Post_Build_Type_Structure (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_lbdagcbr     IN  OUT lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_pk_or_full     IN  VARCHAR2 DEFAULT 'FULL',
p_lbdagcbr IN  OUT  lbpks_lbdagcbr_Main.ty_lbdagcbr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_lbdagcbr IN   lbpks_lbdagcbr_Main.ty_lbdagcbr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Default_And_Validate (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_lbdagcbr IN   lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Prev_lbdagcbr IN OUT lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Wrk_lbdagcbr IN OUT  lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Default_And_Validate (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_lbdagcbr IN   lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Prev_lbdagcbr IN OUT lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_wrk_lbdagcbr IN OUT  lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Resolve_Ref_Numbers         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdagcbr     IN OUT lbpks_lbdagcbr_Main.ty_lbdagcbr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Post_Resolve_Ref_Numbers         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdagcbr     IN OUT lbpks_lbdagcbr_Main.ty_lbdagcbr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Pre_Product_Default (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdagcbr IN lbpks_lbdagcbr_Main.ty_lbdagcbr,
p_wrk_lbdagcbr IN OUT  lbpks_lbdagcbr_Main.ty_lbdagcbr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Product_Default (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdagcbr IN lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_wrk_lbdagcbr IN OUT  lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Unlock (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
p_Action_Code       IN  OUT  VARCHAR2,
p_lbdagcbr     IN  lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Post_Unlock (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
p_Action_Code       IN  OUT  VARCHAR2,
p_lbdagcbr     IN  lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Pre_Subsys_Pickup (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdagcbr IN lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Prev_lbdagcbr IN OUT  lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Wrk_lbdagcbr IN OUT  lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Subsys_Pickup (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_action_code       IN     VARCHAR2,
p_lbdagcbr IN lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Prev_lbdagcbr IN OUT  lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Wrk_lbdagcbr IN OUT  lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Enrich (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdagcbr IN lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Prev_lbdagcbr IN OUT  lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Wrk_lbdagcbr IN OUT  lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Err_Code       IN  OUT VARCHAR2,
p_err_params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Enrich (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdagcbr IN lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Prev_lbdagcbr IN OUT  lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Wrk_lbdagcbr IN OUT  lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Upload_Db (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lbdagcbr IN lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Prev_lbdagcbr IN lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Wrk_lbdagcbr IN OUT  lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Upload_Db (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lbdagcbr IN lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Prev_lbdagcbr IN lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Wrk_lbdagcbr IN OUT  lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Process (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lbdagcbr IN lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Prev_lbdagcbr IN lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Wrk_lbdagcbr IN OUT  lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Process (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_lbdagcbr IN lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Prev_lbdagcbr IN lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Wrk_lbdagcbr IN OUT  lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Query  ( p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Full_Data     IN  VARCHAR2 DEFAULT 'Y',
p_with_Lock     IN  VARCHAR2 DEFAULT 'N',
p_QryData_Reqd IN  VARCHAR2 ,
p_lbdagcbr IN   lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_wrk_lbdagcbr IN OUT   lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Query  ( p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Full_Data     IN  VARCHAR2 DEFAULT 'Y',
p_With_Lock     IN  VARCHAR2 DEFAULT 'N',
p_QryData_Reqd IN  VARCHAR2 ,
p_lbdagcbr IN   lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_wrk_lbdagcbr IN OUT   lbpks_lbdagcbr_Main.Ty_lbdagcbr,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

END lbpks_lbdagcbr_kernel;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdagcbr_kernel FOR lbpks_lbdagcbr_kernel
/