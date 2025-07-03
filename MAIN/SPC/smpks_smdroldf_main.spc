CREATE OR REPLACE PACKAGE  smpks_smdroldf_main AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : smpks_smdroldf_main.spc
  **
  ** Module     : Security Management System
  ** 
  ** This source is part of the Oracle FLEXCUBE Software Product.
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
  
  
TYPE ty_tb_v_smtb_role_detail IS TABLE OF smtb_role_detail%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_smtb_role_detail__b IS TABLE OF smtb_role_detail%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_smtb_role_detail__c IS TABLE OF smtb_role_detail%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_smtb_role_detail__d IS TABLE OF smtb_role_detail%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_smtb_role_branches IS TABLE OF smtb_role_branches%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_smtb_role_accclass IS TABLE OF smtb_role_accclass%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_smtb_queue_rights IS TABLE OF smtb_queue_rights%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_smtb_role_detail__e IS TABLE OF smtb_role_detail%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_smtb_role_detail__f IS TABLE OF smtb_role_detail%ROWTYPE INDEX BY BINARY_INTEGER;

TYPE ty_smdroldf IS RECORD (
     v_smtb_role_master     smtb_role_master%ROWTYPE,
     v_smtb_role_detail    ty_tb_v_smtb_role_detail,
     v_smtb_role_detail__b    ty_tb_v_smtb_role_detail__b,
     v_smtb_role_detail__c    ty_tb_v_smtb_role_detail__c,
     v_smtb_role_detail__d    ty_tb_v_smtb_role_detail__d,
     v_smtb_role_branches    ty_tb_v_smtb_role_branches,
     v_smtb_role_accclass    ty_tb_v_smtb_role_accclass,
     v_smtb_msgs_rights     smtb_msgs_rights%ROWTYPE,
     v_smtb_queue_rights    ty_tb_v_smtb_queue_rights,
     v_smtb_role_detail__e    ty_tb_v_smtb_role_detail__e,
     v_smtb_role_detail__f    ty_tb_v_smtb_role_detail__f,
                 Udf_Details Copkss_Udf_Upload.ty_upl_func_udf,
                 Desc_Fields    Cspks_Req_Global.Ty_Tb_Xml_Data,
                 Addl_Info    Cspks_Req_Global.Ty_Addl_info );

FUNCTION  Fn_Get_Curr_Stage RETURN VARCHAR2 ;
FUNCTION  Fn_Get_Tanked_Stat RETURN VARCHAR2 ;
PROCEDURE Pr_Set_Skip_Sys;
PROCEDURE Pr_Set_Activate_Sys;
FUNCTION  Fn_Skip_Sys RETURN BOOLEAN;
PROCEDURE Pr_Set_Skip_Kernel;
PROCEDURE Pr_Set_Activate_Kernel;
FUNCTION  Fn_Skip_Kernel RETURN BOOLEAN;
FUNCTION Fn_Sys_Query_Desc_Fields  ( p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
                        p_Wrk_smdroldf  IN   OUT smpks_smdroldf_Main.ty_smdroldf,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Populate_Record_Master (p_Source            IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
                        p_smdroldf          IN  smpks_smdroldf_Main.Ty_smdroldf,
                        p_Record_Master     IN OUT Sttbs_Record_Master%ROWTYPE,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;

FUNCTION Fn_Get_Key_Information (p_Source    IN  VARCHAR2, 
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_smdroldf       IN  OUT smpks_smdroldf_Main.Ty_smdroldf,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Extract_Custom_Data (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
                        p_Addl_Info         IN OUT Cspks_Req_Global.Ty_Addl_Info,
                        p_Status            IN OUT VARCHAR2 ,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ; 
FUNCTION Fn_Rebuild_Ts_List (p_Source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
                        p_exchange_pattern  IN     VARCHAR2,
                        p_Status            IN OUT VARCHAR2 ,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Int_Main    (p_Source            IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
                        p_Multi_Trip_Id     IN     VARCHAR2,
                        p_Request_No        IN     VARCHAR2,
                        p_smdroldf          IN OUT  smpks_smdroldf_Main.ty_smdroldf,
                        p_Status            IN OUT VARCHAR2 ,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ; 

FUNCTION Fn_main       (p_source            IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
                        p_Multi_Trip_Id     IN     VARCHAR2,
                        p_Request_No        IN     VARCHAR2,
                        p_smdroldf          IN OUT  smpks_smdroldf_Main.ty_smdroldf,
                        p_Status            IN OUT VARCHAR2 ,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ; 


FUNCTION Fn_Process_Request (p_source    IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
                        p_Exchange_Pattern  IN     VARCHAR2,
                        p_Multi_Trip_Id     IN     VARCHAR2,
                        p_Request_No        IN     VARCHAR2,
                        p_Addl_Info         IN OUT Cspks_Req_Global.Ty_Addl_Info,
                        p_Status            IN OUT VARCHAR2 ,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION Fn_Get_Node_Data ( 
p_Node_Data         IN OUT Cspks_Req_Global.Ty_Tb_Chr_Node_Data,
p_Err_Code          IN OUT VARCHAR2,
p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
END smpks_smdroldf_main;
/
CREATE OR REPLACE SYNONYM smpkss_smdroldf_main FOR smpks_smdroldf_main
/