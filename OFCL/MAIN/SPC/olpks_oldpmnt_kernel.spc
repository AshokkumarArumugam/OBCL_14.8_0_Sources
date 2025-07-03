CREATE OR REPLACE PACKAGE olpks_oldpmnt_kernel AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldpmnt_kernel.spc
  **
  ** Module     : Loans and Deposits
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Oracle Banking Corporate Lending  Software Product.   Copyright © 2018.  All rights reserved
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
  
  Changed By         : Kaushik A S/Ramya M
  Changed On         : 25-Aug-2020
  Search String      : OBCL_14.5_LS_OL_DISCOUNTED_SCHEDULE
  Change Reason      : OBCL_14.5_Discounted_Schedule_Changes  for Configurable refund

	**  Changed By         : Chandra Prasath N
	**  Date               : 12-May-2021
	**  Change Description : Added code for 24/7 operation.                                                                   
	**  Search String      : OBCL_14.5_24_7 Changes
	
** 	Changed On   		: 28-Dec-2021
** 	Changed By         	: Divya J
** 	Change Description 	: Enabled Split settlement for OLDPMNT
** 	Search String      	: OBCL_14.5_Bug#33677962

  **Changed By         : Chandra Achuta
  **Date               : 01-FEB-2024
  **Change Description : Added code to support the accrual method as Yield for ad-hoc fee component.
  **Search String      : Bug#36203018
  
  **Changed By         : Revathi Dharmalingam
  **Date               : 18-Jun-2024
  **Change Description : Added the code to recalculate the special penalty sch overdue components
                         when user does the back dated on due date partial payment for interest components.
  **Search String      : OBCL_14.7_Support_Bug#36704201_Changes
  
  **Changed By         : Sowmya Bitra
  **Date               : 15-July-2024
  **Change Description : OBCL_14.8_Payment_Capitalize Changes 
  **Search String      : Bug#36830170

  **Changed By         : Sowmya Bitra
  **Date               : 23-August-2024
  **Change Description : OBCL_14.8_Payment_Capitalize Changes 
                         Reverting VAMI approach changes and processing cap with LIQD itself
  **Search String      : Bug#36866128_1 
  -------------------------------------------------------------------------------------------------------
  */

  g_liqd_flag         VARCHAR2(10 CHAR) := 'DUMMYVAL'; --OBCL_14.5_Bug#33677962 added OLDPMNT to enable settlement amendment
  g_stl_subsys_pickup CHAR(1) := 'Y'; --OBCL_14.5_Bug#33677962 added OLDPMNT to enable settlement amendment
  --g_pmnt_cap_reverse VARCHAR2(1) := 'N'; --Bug#36830170 Changes --Bug#36866128_1  Commented 

g_interest_refund_required oltbs_contract_liq_summary.interest_refund_required%TYPE; --OBCL_14.5_LS_OL_DISCOUNTED_SCHEDULE

  g_27_7_processing            VARCHAR2(1) := 'N'; --OBCL_14.5_24_7 Changes
  g_yield_accr_adhfee          VARCHAR2(1) := 'N';   --Bug#36203018  Code Added
  g_special_penalty_recalc     VARCHAR2(1) :='N';--OBCL_14.7_Support_Bug#36704201_Changes
PROCEDURE Pr_Skip_Handler  (P_Stage  IN  VARCHAR2);
FUNCTION Fn_Post_Build_Type_Structure (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_oldpmnt     IN  OUT olpks_oldpmnt_main.ty_oldpmnt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_pk_or_full     IN  VARCHAR2 DEFAULT 'FULL',
p_oldpmnt IN  OUT  olpks_oldpmnt_main.ty_oldpmnt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_oldpmnt IN   olpks_oldpmnt_main.ty_oldpmnt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Default_And_Validate (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_oldpmnt IN   olpks_oldpmnt_main.ty_oldpmnt,
p_prev_oldpmnt IN OUT olpks_oldpmnt_main.ty_oldpmnt,
p_wrk_oldpmnt IN OUT  olpks_oldpmnt_main.ty_oldpmnt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Default_And_Validate (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_oldpmnt IN   olpks_oldpmnt_main.ty_oldpmnt,
p_prev_oldpmnt IN OUT olpks_oldpmnt_main.ty_oldpmnt,
p_wrk_oldpmnt IN OUT  olpks_oldpmnt_main.ty_oldpmnt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Resolve_Ref_Numbers         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldpmnt     IN OUT olpks_oldpmnt_main.ty_oldpmnt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Post_Resolve_Ref_Numbers         (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldpmnt     IN OUT olpks_oldpmnt_main.ty_oldpmnt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Pre_Product_Default (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldpmnt IN olpks_oldpmnt_main.ty_oldpmnt,
p_wrk_oldpmnt IN OUT  olpks_oldpmnt_main.ty_oldpmnt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Product_Default (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldpmnt IN olpks_oldpmnt_main.ty_oldpmnt,
p_wrk_oldpmnt IN OUT  olpks_oldpmnt_main.ty_oldpmnt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Unlock (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
p_Action_Code       IN  OUT  VARCHAR2,
p_oldpmnt     IN  olpks_oldpmnt_main.ty_oldpmnt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Post_Unlock (p_Source            IN VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
p_Action_Code       IN  OUT  VARCHAR2,
p_oldpmnt     IN  olpks_oldpmnt_main.ty_oldpmnt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;
FUNCTION Fn_Pre_Subsys_Pickup (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldpmnt IN olpks_oldpmnt_main.ty_oldpmnt,
p_prev_oldpmnt IN OUT  olpks_oldpmnt_main.ty_oldpmnt,
p_wrk_oldpmnt IN OUT  olpks_oldpmnt_main.ty_oldpmnt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Subsys_Pickup (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_action_code       IN     VARCHAR2,
p_oldpmnt IN olpks_oldpmnt_main.ty_oldpmnt,
p_prev_oldpmnt IN OUT  olpks_oldpmnt_main.ty_oldpmnt,
p_wrk_oldpmnt IN OUT  olpks_oldpmnt_main.ty_oldpmnt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Enrich (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldpmnt IN olpks_oldpmnt_main.ty_oldpmnt,
p_prev_oldpmnt IN OUT  olpks_oldpmnt_main.ty_oldpmnt,
p_wrk_oldpmnt IN OUT  olpks_oldpmnt_main.ty_oldpmnt,
p_Err_Code       IN  OUT VARCHAR2,
p_err_params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Enrich (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_oldpmnt IN olpks_oldpmnt_main.ty_oldpmnt,
p_prev_oldpmnt IN OUT  olpks_oldpmnt_main.ty_oldpmnt,
p_wrk_oldpmnt IN OUT  olpks_oldpmnt_main.ty_oldpmnt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Upload_Db (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_oldpmnt IN olpks_oldpmnt_main.ty_oldpmnt,
p_prev_oldpmnt IN olpks_oldpmnt_main.ty_oldpmnt,
p_wrk_oldpmnt IN OUT  olpks_oldpmnt_main.ty_oldpmnt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Upload_Db (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_oldpmnt IN olpks_oldpmnt_main.ty_oldpmnt,
p_prev_oldpmnt IN olpks_oldpmnt_main.ty_oldpmnt,
p_wrk_oldpmnt IN OUT  olpks_oldpmnt_main.ty_oldpmnt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Process (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_oldpmnt IN olpks_oldpmnt_main.ty_oldpmnt,
p_prev_oldpmnt IN olpks_oldpmnt_main.ty_oldpmnt,
p_wrk_oldpmnt IN OUT  olpks_oldpmnt_main.ty_oldpmnt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Process (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_oldpmnt IN olpks_oldpmnt_main.ty_oldpmnt,
p_prev_oldpmnt IN olpks_oldpmnt_main.ty_oldpmnt,
p_wrk_oldpmnt IN OUT  olpks_oldpmnt_main.ty_oldpmnt,
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
p_oldpmnt IN   olpks_oldpmnt_main.ty_oldpmnt,
p_wrk_oldpmnt IN OUT   olpks_oldpmnt_main.ty_oldpmnt,
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
p_oldpmnt IN   olpks_oldpmnt_main.ty_oldpmnt,
p_wrk_oldpmnt IN OUT   olpks_oldpmnt_main.ty_oldpmnt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

END olpks_oldpmnt_kernel;
/