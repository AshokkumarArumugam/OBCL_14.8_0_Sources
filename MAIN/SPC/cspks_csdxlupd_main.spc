CREATE OR REPLACE PACKAGE  cspks_csdxlupd_main AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : cspks_csdxlupd_main.spc
  **
  ** Module     : Core
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
  
  
TYPE ty_tb_v_cstb_xlupld_details IS TABLE OF cstb_xlupld_details%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_stb_xlupld_block_details IS TABLE OF cstb_xlupld_block_details%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_cstb_xlupld_block_data IS TABLE OF cstb_xlupld_block_data%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_cstb_xlupld_errors IS TABLE OF cstb_xlupld_errors%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_xlupld_data_dictionary IS TABLE OF cstb_xlupld_data_dictionary%ROWTYPE INDEX BY BINARY_INTEGER;

TYPE ty_csdxlupd IS RECORD (
     v_cstb_xlupld_master     cstb_xlupld_master%ROWTYPE,
     v_cstb_xlupld_details    ty_tb_v_cstb_xlupld_details,
     v_cstb_xlupld_block_details    ty_tb_stb_xlupld_block_details,
     v_cstb_xlupld_block_data    ty_tb_v_cstb_xlupld_block_data,
     v_cstb_xlupld_errors    ty_tb_v_cstb_xlupld_errors,
     v_xlupld_data_dictionary    ty_tb_v_xlupld_data_dictionary,
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
                                     p_Wrk_csdxlupd  IN   OUT cspks_csdxlupd_Main.ty_csdxlupd,
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
                        p_csdxlupd          IN OUT  cspks_csdxlupd_Main.ty_csdxlupd,
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

END cspks_csdxlupd_main;
/
CREATE OR REPLACE SYNONYM cspkss_csdxlupd_main FOR cspks_csdxlupd_main
/