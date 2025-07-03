CREATE OR REPLACE PACKAGE  olpks_oldmndsb_kernel AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldmndsb_kernel.spc
  **
  ** Module     : Oracle Lending
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
  
  SFR Number         :  
  Changed By         :  
  Change Description :  
  
  **Changed By          : Abhinav Bhasker
  **Changed On          : 29-Dec-2021
  **Change Description  : Bug#33168498
  **Search String       : Bug#33168498 
  
  **Changed By         : Palanisamy M
  **Date               : 31-JAN-2024
  **Change Description : Added code to insert VDBAL record during DSBR.
  **Search String      : Bug#36158500 Changes

  **Changed By         : Balaji Gopal
  **Changed On         : 22-Aug-2024
  **Change Description : Added the OLTB_CONTRACT_DSBR_SCH in the existing query of the cursor, which helps to pick the disbursed records. 
                         This fix is handled in the following cases: Auto-Disbursement (Batch), Auto-Disbursement(Online), and Manual Disbursement; 
                         hence, we commented out Bug#36158500, which was handled for Manual Disbursement & Auto- Disbursement(Batch).
  **Search String      : Bug#36846521
  -------------------------------------------------------------------------------------------------------
  */
  
g_dsbb_flag VARCHAR2(10 CHAR) := 'DUMMYVAL'; --Bug#33168498
-- g_dsbr_flag     VARCHAR2(1):= 'N'; --Bug#36158500 Changes -- Commented as part of this Bug#36846521
  
PROCEDURE Pr_Skip_Handler  (P_Stage  IN  VARCHAR2);
FUNCTION Fn_Post_Build_Type_Structure (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_oldmndsb     IN  OUT olpks_oldmndsb_Main.Ty_oldmndsb,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_pk_or_full     IN  VARCHAR2 DEFAULT 'FULL',
p_oldmndsb IN  OUT  olpks_oldmndsb_Main.ty_oldmndsb,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_oldmndsb IN   olpks_oldmndsb_Main.ty_oldmndsb,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Default_And_Validate (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_oldmndsb IN   olpks_oldmndsb_Main.Ty_oldmndsb,
p_Prev_oldmndsb IN OUT olpks_oldmndsb_Main.Ty_oldmndsb,
p_Wrk_oldmndsb IN OUT  olpks_oldmndsb_Main.Ty_oldmndsb,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Default_And_Validate (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_oldmndsb IN   olpks_oldmndsb_Main.Ty_oldmndsb,
p_Prev_oldmndsb IN OUT olpks_oldmndsb_Main.Ty_oldmndsb,
p_wrk_oldmndsb IN OUT  olpks_oldmndsb_Main.Ty_oldmndsb,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Resolve_Ref_Numbers         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldmndsb     IN OUT olpks_oldmndsb_Main.ty_oldmndsb,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Post_Resolve_Ref_Numbers         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldmndsb     IN OUT olpks_oldmndsb_Main.ty_oldmndsb,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Pre_Product_Default (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldmndsb IN olpks_oldmndsb_Main.ty_oldmndsb,
p_wrk_oldmndsb IN OUT  olpks_oldmndsb_Main.ty_oldmndsb,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Product_Default (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldmndsb IN olpks_oldmndsb_Main.Ty_oldmndsb,
p_wrk_oldmndsb IN OUT  olpks_oldmndsb_Main.Ty_oldmndsb,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Unlock (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
p_Action_Code       IN  OUT  VARCHAR2,
p_oldmndsb     IN  olpks_oldmndsb_Main.Ty_oldmndsb,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Post_Unlock (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
p_Action_Code       IN  OUT  VARCHAR2,
p_oldmndsb     IN  olpks_oldmndsb_Main.Ty_oldmndsb,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Pre_Subsys_Pickup (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldmndsb IN olpks_oldmndsb_Main.Ty_oldmndsb,
p_Prev_oldmndsb IN OUT  olpks_oldmndsb_Main.Ty_oldmndsb,
p_Wrk_oldmndsb IN OUT  olpks_oldmndsb_Main.Ty_oldmndsb,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Subsys_Pickup (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_action_code       IN     VARCHAR2,
p_oldmndsb IN olpks_oldmndsb_Main.Ty_oldmndsb,
p_Prev_oldmndsb IN OUT  olpks_oldmndsb_Main.Ty_oldmndsb,
p_Wrk_oldmndsb IN OUT  olpks_oldmndsb_Main.Ty_oldmndsb,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Enrich (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldmndsb IN olpks_oldmndsb_Main.Ty_oldmndsb,
p_Prev_oldmndsb IN OUT  olpks_oldmndsb_Main.Ty_oldmndsb,
p_Wrk_oldmndsb IN OUT  olpks_oldmndsb_Main.Ty_oldmndsb,
p_Err_Code       IN  OUT VARCHAR2,
p_err_params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Enrich (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldmndsb IN olpks_oldmndsb_Main.Ty_oldmndsb,
p_Prev_oldmndsb IN OUT  olpks_oldmndsb_Main.Ty_oldmndsb,
p_Wrk_oldmndsb IN OUT  olpks_oldmndsb_Main.Ty_oldmndsb,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Upload_Db (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_oldmndsb IN olpks_oldmndsb_Main.Ty_oldmndsb,
p_Prev_oldmndsb IN olpks_oldmndsb_Main.Ty_oldmndsb,
p_Wrk_oldmndsb IN OUT  olpks_oldmndsb_Main.Ty_oldmndsb,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Upload_Db (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_oldmndsb IN olpks_oldmndsb_Main.Ty_oldmndsb,
p_Prev_oldmndsb IN olpks_oldmndsb_Main.Ty_oldmndsb,
p_Wrk_oldmndsb IN OUT  olpks_oldmndsb_Main.Ty_oldmndsb,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Process (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_oldmndsb IN olpks_oldmndsb_Main.Ty_oldmndsb,
p_Prev_oldmndsb IN olpks_oldmndsb_Main.Ty_oldmndsb,
p_Wrk_oldmndsb IN OUT  olpks_oldmndsb_Main.Ty_oldmndsb,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Process (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_oldmndsb IN olpks_oldmndsb_Main.Ty_oldmndsb,
p_Prev_oldmndsb IN olpks_oldmndsb_Main.Ty_oldmndsb,
p_Wrk_oldmndsb IN OUT  olpks_oldmndsb_Main.Ty_oldmndsb,
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
p_oldmndsb IN   olpks_oldmndsb_Main.Ty_oldmndsb,
p_wrk_oldmndsb IN OUT   olpks_oldmndsb_Main.Ty_oldmndsb,
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
p_oldmndsb IN   olpks_oldmndsb_Main.Ty_oldmndsb,
p_wrk_oldmndsb IN OUT   olpks_oldmndsb_Main.Ty_oldmndsb,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

END olpks_oldmndsb_kernel;
/
CREATE OR REPLACE SYNONYM olpkss_oldmndsb_kernel FOR olpks_oldmndsb_Kernel
/