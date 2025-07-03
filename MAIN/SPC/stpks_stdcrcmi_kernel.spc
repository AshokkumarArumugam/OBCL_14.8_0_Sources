CREATE OR REPLACE PACKAGE  stpks_stdcrcmi_kernel AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : stpks_stdcrcmi_kernel.spc
  **
  ** Module     : Static Maintenance
  ** 
  ** This source is part of the Oracle FLEXCUBE Software Product.
  ** Copyright (R) 2022 , Oracle and/or its affiliates.  All rights reserved
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
  Changed By         :  Nisha B C
  Change Description :  MIS Replication from FCUBS to COMMON CORE.
  Modified on        :  28-July-2022
  Search string      :  FCUBS_14.6.0.0.0_INTERNAL_SFR#_34449853
  
  Modified By          :  Nisha B C
  Modified Description :  Reset the work variable to ensure that the 
                          MIS details are picked up without duplicating the rows.
  Modified on          :  10-Nov-2022
  Search string        :  FCUBS_14.6.0.0.0_INTERNAL_SFR#_34790805
  
  -------------------------------------------------------------------------------------------------------
  */
  
  
PROCEDURE Pr_Skip_Handler  (P_Stage  IN  VARCHAR2);
FUNCTION Fn_Post_Build_Type_Structure (p_Source            IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_stdcrcmi     IN  OUT stpks_stdcrcmi_Main.Ty_stdcrcmi,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_stdcrcmi IN  OUT  stpks_stdcrcmi_Main.Ty_stdcrcmi,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_stdcrcmi IN   stpks_stdcrcmi_Main.ty_stdcrcmi,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Default_And_Validate (p_source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_stdcrcmi IN   stpks_stdcrcmi_Main.Ty_stdcrcmi,
p_Prev_stdcrcmi IN OUT stpks_stdcrcmi_Main.Ty_stdcrcmi,
p_Wrk_stdcrcmi IN OUT  stpks_stdcrcmi_Main.Ty_stdcrcmi,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Default_And_Validate (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_stdcrcmi IN   stpks_stdcrcmi_Main.Ty_stdcrcmi,
p_Prev_stdcrcmi IN OUT stpks_stdcrcmi_Main.Ty_stdcrcmi,
p_Wrk_stdcrcmi IN OUT  stpks_stdcrcmi_Main.Ty_stdcrcmi,
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
p_stdcrcmi IN stpks_stdcrcmi_Main.ty_stdcrcmi,
p_Prev_stdcrcmi IN stpks_stdcrcmi_Main.ty_stdcrcmi,
p_Wrk_stdcrcmi IN OUT  stpks_stdcrcmi_Main.ty_stdcrcmi,
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
p_stdcrcmi IN stpks_stdcrcmi_Main.ty_stdcrcmi,
p_Prev_stdcrcmi IN stpks_stdcrcmi_Main.ty_stdcrcmi,
p_Wrk_stdcrcmi IN OUT  stpks_stdcrcmi_Main.ty_stdcrcmi,
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
p_stdcrcmi IN   stpks_stdcrcmi_Main.ty_stdcrcmi,
p_Wrk_stdcrcmi IN OUT   stpks_stdcrcmi_Main.ty_stdcrcmi,
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
p_stdcrcmi IN   stpks_stdcrcmi_Main.Ty_stdcrcmi,
p_Wrk_stdcrcmi IN OUT   stpks_stdcrcmi_Main.Ty_stdcrcmi,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
--FCUBS_14.6.0.0.0_INTERNAL_SFR#_34449853 starts
  FUNCTION Fn_Pickup(p_Function_Id  IN VARCHAR2,
                     p_Custno       IN mitms_core_customer_default.customer_no%Type,
                     p_Wrk_stdcrcmi IN OUT stpks_stdcrcmi_Main.ty_stdcrcmi,
                     p_Errs         In OUT Varchar2,
                     p_Prms         In OUT Varchar2) 
  RETURN BOOLEAN;
--FCUBS_14.6.0.0.0_INTERNAL_SFR#_34449853 ends
--FCUBS_14.6.0.0.0_INTERNAL_SFR#_34790805 starts
  FUNCTION Fn_Pickup_MIS(p_Function_Id  IN VARCHAR2,
                         p_Custno       IN mitms_core_customer_default.customer_no%Type,
                         p_wrk_stdcrcmi IN OUT stpks_stdcrcmi_Main.ty_stdcrcmi,
                         p_Errs         In OUT Varchar2,
                         p_Prms         In OUT Varchar2) RETURN BOOLEAN;
--FCUBS_14.6.0.0.0_INTERNAL_SFR#_34790805 ends
END stpks_stdcrcmi_kernel;
/
CREATE OR REPLACE SYNONYM stpkss_stdcrcmi_kernel FOR stpks_stdcrcmi_kernel
/