CREATE OR REPLACE PACKAGE  aepks_aededmtr_main AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : aepks_aededmtr_main.spc
  **
  ** Module     : Auto End of Day
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
  
  
TYPE ty_tb_v_aetb_eoc_branches IS TABLE OF aetb_eoc_branches%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_aetbs_eoc_runchart IS TABLE OF aetb_eoc_runchart%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_aetb_eoc_programs IS TABLE OF aetb_eoc_programs%ROWTYPE INDEX BY BINARY_INTEGER;

TYPE ty_aededmtr IS RECORD (
     v_aevw_eoc_master     aevw_eoc_master%ROWTYPE,
     v_aetb_eoc_branches    ty_tb_v_aetb_eoc_branches,
     v_aetbs_eoc_runchart    ty_tb_v_aetbs_eoc_runchart,
     v_aetb_eoc_programs    ty_tb_v_aetb_eoc_programs,
                 Desc_Fields    Cspks_Req_Global.Ty_Tb_Xml_Data,
                 Addl_Info    Cspks_Req_Global.Ty_Addl_info );

PROCEDURE Pr_Set_Skip_Sys;
PROCEDURE Pr_Set_Activate_Sys;
FUNCTION  Fn_Skip_Sys RETURN BOOLEAN;
PROCEDURE Pr_Set_Skip_Kernel;
PROCEDURE Pr_Set_Activate_Kernel;
FUNCTION  Fn_Skip_Kernel RETURN BOOLEAN;
FUNCTION Fn_Sys_Query_Desc_Fields  ( p_Source            IN     VARCHAR2,
                                     p_Source_Operation  IN     VARCHAR2,
                                     p_Function_Id       IN     VARCHAR2,
                                     p_Action_Code       IN     VARCHAR2,
                                     p_Wrk_aededmtr  IN   OUT aepks_aededmtr_Main.ty_aededmtr,
                                     p_Err_Code          IN OUT VARCHAR2,
                                     p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Rebuild_Ts_List (p_source       IN     VARCHAR2,
                        p_source_operation  IN     VARCHAR2,
                        p_Function_id       IN     VARCHAR2,
                        p_action_code       IN     VARCHAR2,
                        p_exchange_pattern  IN     VARCHAR2,
                        p_status            IN OUT VARCHAR2 ,
                        p_err_code          IN OUT VARCHAR2,
                        p_err_params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Get_Node_Data ( 
p_node_data         IN OUT Cspks_Req_Global.Ty_Tb_Chr_Node_Data,
p_err_code          IN OUT VARCHAR2,
p_err_params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Main       (p_source            IN     VARCHAR2,
                        p_source_operation  IN     VARCHAR2,
                        p_Function_id       IN     VARCHAR2,
                        p_action_code       IN     VARCHAR2,
                        p_multi_trip_id     IN     VARCHAR2,
                        p_Request_No        IN     VARCHAR2,
                        p_aededmtr          IN OUT  aepks_aededmtr_Main.ty_aededmtr,
                        p_status            IN OUT VARCHAR2 ,
                        p_err_code          IN OUT VARCHAR2,
                        p_err_params        IN OUT VARCHAR2)
RETURN BOOLEAN ; 


FUNCTION Fn_Process_Request (p_source            IN     VARCHAR2,
                             p_source_operation  IN     VARCHAR2,
                             p_Function_id       IN     VARCHAR2,
                             p_action_code       IN     VARCHAR2,
                             p_exchange_pattern  IN     VARCHAR2,
                             p_multi_trip_id     IN     VARCHAR2,
                             p_Request_No        IN     VARCHAR2,
                             p_addl_info         IN OUT Cspks_Req_Global.Ty_Addl_Info,
                             p_status            IN OUT VARCHAR2 ,
                             p_err_code          IN OUT VARCHAR2,
                             p_err_params        IN OUT VARCHAR2)
RETURN BOOLEAN;

END aepks_aededmtr_main;
/
CREATE OR REPLACE SYNONYM aepkss_aededmtr_main FOR aepks_aededmtr_main
/