CREATE OR REPLACE PACKAGE  cfpks_cfdfltri_kernel AS
  /*------------------------------------------------------------------------------------------
   **
   ** This source is part of the Oracle FLEXCUBE Software Product.
   ** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
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
------------------------------------------------------------------------------------------
*/
/*
-------------------------------
  CHANGE HISTORY
  
  Modified By         : Anuja V.S
  Modified On         : 19-Sep-2013
  Fix Description     : Propagation for all branch would take place from head office even if their is no
                      : record in Cftm_float_rate_detail for other branches  
  Search String       :	9NT1606_12.0.2_RETRO_17480643
  Retro String        : 9NT1606_12.0.1_RETRO_17479622
  

   Changed By         : Anmol
   Changed On         :15-July-2014
   Change Reason : propogate the Rate codes into all other brances during Float rate s Upload.
   Search String: Bug#19217282 
   
  **  Modified By           : Chandra Prakash
  **  Modified On           : 31-May-2024
  **  Modified Reason       : Branch propagation is taking more than 180sec and GW request for Rate upload is failing with 	
							  timeout error. 
							  Fix: Propagation will be done by a Job by looping through each branch and populating the rate 
							  details instead of joining with sttm_core_branch and populating for all the branches together. 
							  In this way Index on rate_code and branch will be used effectively by the system.
  **  Search String         : SFR#36296551
  -------------------------------------------------------------------------------------------------------
  */
g_is_rate_prop varchar2(1) := 'N' ; --9NT1606_12.0.2_RETRO_17480643 Added   
  
PROCEDURE Pr_Skip_Handler  (P_Stage  IN  VARCHAR2);
FUNCTION Fn_Post_Build_Type_Structure (p_Source            IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_cfdfltri     IN  OUT cfpks_cfdfltri_Main.Ty_cfdfltri,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
--SFR#36296551 Starts
  PROCEDURE Pr_propagate_rate_code(old_rate_code IN varchar2,
                                  p_branch_code IN Varchar2,
                                  p_action_code IN Varchar2,
                                  p_Source IN Varchar2,
                                  p_function_id IN Varchar2);
--SFR#36296551 Ends
--Bug#19217282 changes starts
 FUNCTION fn_propagate_rate_code(old_rate_code in varchar2,
                                  p_branch_code in Varchar2,
                                  p_action_code IN Varchar,
                                  p_errcode     IN OUT Varchar2,
                                  p_errParams   IN OUT Varchar2)
   RETURN BOOLEAN;
--Bug#19217282 changes ends

FUNCTION Fn_Pre_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_cfdfltri IN  OUT  cfpks_cfdfltri_Main.Ty_cfdfltri,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_cfdfltri IN   cfpks_cfdfltri_Main.ty_cfdfltri,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Default_And_Validate (p_source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_cfdfltri IN   cfpks_cfdfltri_Main.Ty_cfdfltri,
p_Prev_cfdfltri IN OUT cfpks_cfdfltri_Main.Ty_cfdfltri,
p_Wrk_cfdfltri IN OUT  cfpks_cfdfltri_Main.Ty_cfdfltri,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Default_And_Validate (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_cfdfltri IN   cfpks_cfdfltri_Main.Ty_cfdfltri,
p_Prev_cfdfltri IN OUT cfpks_cfdfltri_Main.Ty_cfdfltri,
p_Wrk_cfdfltri IN OUT  cfpks_cfdfltri_Main.Ty_cfdfltri,
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
p_cfdfltri IN cfpks_cfdfltri_Main.ty_cfdfltri,
p_Prev_cfdfltri IN cfpks_cfdfltri_Main.ty_cfdfltri,
p_Wrk_cfdfltri IN OUT  cfpks_cfdfltri_Main.ty_cfdfltri,
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
p_cfdfltri IN cfpks_cfdfltri_Main.ty_cfdfltri,
p_Prev_cfdfltri IN cfpks_cfdfltri_Main.ty_cfdfltri,
p_Wrk_cfdfltri IN OUT  cfpks_cfdfltri_Main.ty_cfdfltri,
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
p_cfdfltri IN   cfpks_cfdfltri_Main.ty_cfdfltri,
p_Wrk_cfdfltri IN OUT   cfpks_cfdfltri_Main.ty_cfdfltri,
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
p_cfdfltri IN   cfpks_cfdfltri_Main.Ty_cfdfltri,
p_Wrk_cfdfltri IN OUT   cfpks_cfdfltri_Main.Ty_cfdfltri,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

END cfpks_cfdfltri_kernel;
/
CREATE OR REPLACE SYNONYM cfpkss_cfdfltri_kernel FOR cfpks_cfdfltri_kernel
/