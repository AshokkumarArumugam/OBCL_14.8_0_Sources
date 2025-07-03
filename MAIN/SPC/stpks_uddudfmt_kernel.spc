CREATE OR REPLACE PACKAGE  stpks_uddudfmt_kernel AS
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
  
  SFR Number         :  
  Changed By         :  
  Change Description :  
  
**  Modified By   :  VANDIT
**   Modified on   : 16-Oct-2018
**   Description   : New function added and exposed for handling the dynamic package creation in PDB
                     and DML execution in PDB which has to happen as part of approot functions for UDF fields.
**   Search String : FCUBS_14.2_18C_Changes_uddudfmt
  
  -------------------------------------------------------------------------------------------------------
  */
  
  
PROCEDURE Pr_Skip_Handler  (P_Stage  IN  VARCHAR2);
FUNCTION Fn_Post_Build_Type_Structure (p_Source            IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Addl_Info       IN Cspks_Req_Global.Ty_Addl_Info,
p_uddudfmt     IN  OUT stpks_uddudfmt_Main.Ty_uddudfmt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_uddudfmt IN  OUT  stpks_uddudfmt_Main.Ty_uddudfmt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Check_Mandatory(p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_Pk_Or_Full     IN  VARCHAR2 DEFAULT 'FULL',
p_uddudfmt IN   stpks_uddudfmt_Main.ty_uddudfmt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Pre_Default_And_Validate (p_source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_uddudfmt IN   stpks_uddudfmt_Main.Ty_uddudfmt,
p_Prev_uddudfmt IN OUT stpks_uddudfmt_Main.Ty_uddudfmt,
p_Wrk_uddudfmt IN OUT  stpks_uddudfmt_Main.Ty_uddudfmt,
p_Err_Code       IN  OUT VARCHAR2,
p_Err_Params     IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Post_Default_And_Validate (p_Source    IN  VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_Child_Function    IN  VARCHAR2,
p_uddudfmt IN   stpks_uddudfmt_Main.Ty_uddudfmt,
p_Prev_uddudfmt IN OUT stpks_uddudfmt_Main.Ty_uddudfmt,
p_Wrk_uddudfmt IN OUT  stpks_uddudfmt_Main.Ty_uddudfmt,
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
p_uddudfmt IN stpks_uddudfmt_Main.ty_uddudfmt,
p_Prev_uddudfmt IN stpks_uddudfmt_Main.ty_uddudfmt,
p_Wrk_uddudfmt IN OUT  stpks_uddudfmt_Main.ty_uddudfmt,
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
p_uddudfmt IN stpks_uddudfmt_Main.ty_uddudfmt,
p_Prev_uddudfmt IN stpks_uddudfmt_Main.ty_uddudfmt,
p_Wrk_uddudfmt IN OUT  stpks_uddudfmt_Main.ty_uddudfmt,
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
p_uddudfmt IN   stpks_uddudfmt_Main.ty_uddudfmt,
p_Wrk_uddudfmt IN OUT   stpks_uddudfmt_Main.ty_uddudfmt,
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
p_uddudfmt IN   stpks_uddudfmt_Main.Ty_uddudfmt,
p_Wrk_uddudfmt IN OUT   stpks_uddudfmt_Main.Ty_uddudfmt,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

--FCUBS_14.2_18C_Changes_uddudfmt starts
FUNCTION Fn_Create_Package(p_Source     IN Cotms_Source.Source_Code%TYPE,
                           p_uddudfmt   IN OUT Stpks_uddudfmt_Main.Ty_uddudfmt,
                           p_Err_Code   IN OUT VARCHAR2,
                           p_Err_Params IN OUT VARCHAR2) 
RETURN BOOLEAN;
--FCUBS_14.2_18C_Changes_uddudfmt ends

END stpks_uddudfmt_kernel;
/
CREATE OR REPLACE SYNONYM stpkss_uddudfmt_kernel FOR stpks_uddudfmt_kernel
/