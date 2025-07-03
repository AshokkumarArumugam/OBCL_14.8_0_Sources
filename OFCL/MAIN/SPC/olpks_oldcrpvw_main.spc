CREATE OR REPLACE PACKAGE  olpks_oldcrpvw_main AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldcrpvw_main.spc
  **
  ** Module     : OL
  ** 
  ** This source is part of the Oracle Banking Software Product.
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
  
  
TYPE ty_tb_v_olvws_360_cont_det IS TABLE OF olvw_360_cont_det%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_olvws_360_comp_details IS TABLE OF olvw_360_comp_details%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_olvws_360_comp_sch_det IS TABLE OF olvw_360_comp_sch_det%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_lvws_360_cont_det__commt IS TABLE OF olvw_360_cont_det%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_lvws_360_cont_det__syndt IS TABLE OF olvw_360_cont_det%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_360_comp_details__com IS TABLE OF olvw_360_comp_details%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_360_comp_sch_det__com IS TABLE OF olvw_360_comp_sch_det%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_360_comp_details__synd IS TABLE OF olvw_360_comp_details%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_360_comp_sch_det__synd IS TABLE OF olvw_360_comp_sch_det%ROWTYPE INDEX BY BINARY_INTEGER;

TYPE ty_oldcrpvw IS RECORD (
     v_olvws_corp_view     olvw_corp_view%ROWTYPE,
     v_olvws_360_cont_det    ty_tb_v_olvws_360_cont_det,
     v_olvws_360_comp_details    ty_tb_v_olvws_360_comp_details,
     v_olvws_360_comp_sch_det    ty_tb_v_olvws_360_comp_sch_det,
     v_olvws_360_cont_det__commt    ty_tb_lvws_360_cont_det__commt,
     v_olvws_360_cont_det__syndt    ty_tb_lvws_360_cont_det__syndt,
     v_360_comp_details__com    ty_tb_v_360_comp_details__com,
     v_360_comp_sch_det__com    ty_tb_v_360_comp_sch_det__com,
     v_360_comp_details__synd    ty_tb_v_360_comp_details__synd,
     v_360_comp_sch_det__synd    ty_tb_v_360_comp_sch_det__synd,
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
                                     p_Wrk_oldcrpvw  IN   OUT olpks_oldcrpvw_Main.ty_oldcrpvw,
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
                        p_oldcrpvw          IN OUT  olpks_oldcrpvw_Main.ty_oldcrpvw,
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

END olpks_oldcrpvw_main;
/
CREATE OR REPLACE SYNONYM olpkss_oldcrpvw_main FOR olpks_oldcrpvw_main
/