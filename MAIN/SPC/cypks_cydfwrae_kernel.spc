CREATE OR REPLACE PACKAGE  cypks_cydfwrae_kernel AS
  /*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2007 - 2013  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
-------------------------------
  CHANGE HISTORY
  
  SFR Number         :  
  Changed By         :  
  Change Description :  
  
  	 Changed By               : Girish M
     Changed on               : 29-Jan-2019
     Change Description 	  : Forward rates maintained in HO branch, propagated to other branches if the propagate forward exchange rate is 'Y'.
     Search String            : Bug#22311060
**
**  Changed By               : Sreekanth K
**  Changed on               : 01-Jul-2023
**  Change Description       : Moved from OBTR to 14.8 common core
**  Search String            : NA
  -------------------------------------------------------------------------------------------------------
  */
  
  
PROCEDURE Pr_Skip_Handler  (P_Stage  IN  VARCHAR2);
FUNCTION Fn_Post_Build_Type_Structure (p_Source            IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_cydfwrae     IN  OUT cypks_cydfwrae_Main.Ty_cydfwrae,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_cydfwrae IN  OUT  cypks_cydfwrae_Main.Ty_cydfwrae,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_cydfwrae IN   cypks_cydfwrae_Main.ty_cydfwrae,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Default_And_Validate (p_source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_cydfwrae IN   cypks_cydfwrae_Main.Ty_cydfwrae,
p_Prev_cydfwrae IN OUT cypks_cydfwrae_Main.Ty_cydfwrae,
p_Wrk_cydfwrae IN OUT  cypks_cydfwrae_Main.Ty_cydfwrae,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Default_And_Validate (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_cydfwrae IN   cypks_cydfwrae_Main.Ty_cydfwrae,
p_Prev_cydfwrae IN OUT cypks_cydfwrae_Main.Ty_cydfwrae,
p_Wrk_cydfwrae IN OUT  cypks_cydfwrae_Main.Ty_cydfwrae,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Upload_Db (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Post_Upl_Stat    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_cydfwrae IN cypks_cydfwrae_Main.ty_cydfwrae,
p_Prev_cydfwrae IN cypks_cydfwrae_Main.ty_cydfwrae,
p_Wrk_cydfwrae IN OUT  cypks_cydfwrae_Main.ty_cydfwrae,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Upload_Db (p_Source    IN  VARCHAR2,
                        p_source_operation  IN     VARCHAR2,
                        p_Function_id       IN     VARCHAR2,
                        p_action_code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Post_Upl_Stat    IN  VARCHAR2,
p_Multi_Trip_Id    IN  VARCHAR2,
p_cydfwrae IN cypks_cydfwrae_Main.ty_cydfwrae,
p_Prev_cydfwrae IN cypks_cydfwrae_Main.ty_cydfwrae,
p_Wrk_cydfwrae IN OUT  cypks_cydfwrae_Main.ty_cydfwrae,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Query  ( p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Full_Data     IN  VARCHAR2 DEFAULT 'Y',
p_With_Lock     IN  VARCHAR2 DEFAULT 'N',
p_QryData_Reqd IN  VARCHAR2 ,
p_cydfwrae IN   cypks_cydfwrae_Main.ty_cydfwrae,
p_Wrk_cydfwrae IN OUT   cypks_cydfwrae_Main.ty_cydfwrae,
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
p_cydfwrae IN   cypks_cydfwrae_Main.Ty_cydfwrae,
p_Wrk_cydfwrae IN OUT   cypks_cydfwrae_Main.Ty_cydfwrae,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

--Bug#22311060 Starts
FUNCTION fn_propogate_rates(
p_fwd_rate_master  in cytm_fwdrate_master%ROWTYPE,
p_fwd_rate_details in cypks_cydfwrae_main.ty_tb_v_cytms_fwdrate_details,
p_Err_Code         IN OUT VARCHAR2,
p_Err_Params       IN OUT VARCHAR2)
RETURN BOOLEAN ;
--Bug#22311060 Ends

END cypks_cydfwrae_kernel;
/
CREATE OR REPLACE SYNONYM cypkss_cydfwrae_kernel FOR cypks_cydfwrae_kernel
/
