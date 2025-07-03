CREATE OR REPLACE PACKAGE  smpks_smdusrdf_main AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : smpks_smdusrdf_main.spc
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
  
  
TYPE ty_tb_v_smtb_queue_rights IS TABLE OF smtb_queue_rights%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_smtb_user_accclass IS TABLE OF smtb_user_accclass%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_smtb_user_branches IS TABLE OF smtb_user_branches%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_smtb_user_products IS TABLE OF smtb_user_products%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_mtb_user_access_products IS TABLE OF smtb_user_access_products%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__smtb_user_func_disallow IS TABLE OF smtb_user_func_disallow%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_smtb_user_role IS TABLE OF smtb_user_role%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_smtb_users_functions IS TABLE OF smtb_users_functions%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_smtbs_user_central_roles IS TABLE OF smtb_user_central_roles%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_smvws_dash_details IS TABLE OF smvw_dash_details%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__smtbs_user_access_group IS TABLE OF smtb_user_access_group%ROWTYPE INDEX BY BINARY_INTEGER;

TYPE ty_smdusrdf IS RECORD (
     v_smtb_user     smtb_user%ROWTYPE,
     v_smtb_msgs_rights     smtb_msgs_rights%ROWTYPE,
     v_smtb_queue_rights    ty_tb_v_smtb_queue_rights,
     v_smtb_user_accclass    ty_tb_v_smtb_user_accclass,
     v_smtb_user_branches    ty_tb_v_smtb_user_branches,
     v_smtb_user_products    ty_tb_v_smtb_user_products,
     v_smtb_user_access_products    ty_tb_mtb_user_access_products,
     v_smtb_user_func_disallow    ty_tb__smtb_user_func_disallow,
     v_smtb_user_role    ty_tb_v_smtb_user_role,
     v_smtb_users_functions    ty_tb_v_smtb_users_functions,
     v_smtbs_user_central_roles    ty_tb_smtbs_user_central_roles,
     v_smtb_dashboard_master     smtb_dashboard_master%ROWTYPE,
     v_dsvw_function_fields     dsvw_function_fields%ROWTYPE,
     v_smvws_dash_details    ty_tb_v_smvws_dash_details,
     v_smtbs_user_access_group    ty_tb__smtbs_user_access_group,
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
                        p_Wrk_smdusrdf  IN   OUT smpks_smdusrdf_Main.ty_smdusrdf,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Populate_Record_Master (p_Source            IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
                        p_smdusrdf          IN  smpks_smdusrdf_Main.Ty_smdusrdf,
                        p_Record_Master     IN OUT Sttbs_Record_Master%ROWTYPE,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;

FUNCTION Fn_Get_Key_Information (p_Source    IN  VARCHAR2, 
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_smdusrdf       IN  OUT smpks_smdusrdf_Main.Ty_smdusrdf,
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
                        p_smdusrdf          IN OUT  smpks_smdusrdf_Main.ty_smdusrdf,
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
                        p_smdusrdf          IN OUT  smpks_smdusrdf_Main.ty_smdusrdf,
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
END smpks_smdusrdf_main;
/
CREATE OR REPLACE SYNONYM smpkss_smdusrdf_main FOR smpks_smdusrdf_main
/