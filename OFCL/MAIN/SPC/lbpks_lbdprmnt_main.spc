CREATE OR REPLACE PACKAGE  lbpks_lbdprmnt_main AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdprmnt_main.spc
  **
  ** Module     : Syndication Loans and Commitments
  ** 
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright (R) 2008,2025 , Oracle and/or its affiliates.  All rights reserved
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
  
  
TYPE ty_tb_v_product_dflt_schedules IS TABLE OF oltm_product_dflt_schedules%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_product_penalty_comp IS TABLE OF oltm_product_penalty_comp%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb__oltms_product_liq_order IS TABLE OF oltm_product_liq_order%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_product_status_master IS TABLE OF oltm_product_status_master%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_lbtms_prod_disclosure IS TABLE OF lbtm_prod_disclosure%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_v_lbtms_product_ccy_days IS TABLE OF lbtm_product_ccy_days%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_lbtms_product_exrate_ccy IS TABLE OF lbtm_product_exrate_ccy%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_btms_product_intrate_ccy IS TABLE OF lbtm_product_intrate_ccy%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_lbtms_product_notice_ccy IS TABLE OF lbtm_product_notice_ccy%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_oduct_fincentre_dtl__sch IS TABLE OF oltm_product_fincentre_dtl%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE ty_tb_oduct_fincentre_dtl__mat IS TABLE OF oltm_product_fincentre_dtl%ROWTYPE INDEX BY BINARY_INTEGER;

TYPE ty_lbdprmnt IS RECORD (
     v_oltms_product     oltm_product%ROWTYPE,
     v_oltms_product_master_ld     oltm_product_master_ld%ROWTYPE,
     v_oltms_product_rollover     oltm_product_rollover%ROWTYPE,
     v_product_dflt_schedules    ty_tb_v_product_dflt_schedules,
     v_product_status_comps     oltm_product_status_comps%ROWTYPE,
     v_product_status_advices     oltm_product_status_advices%ROWTYPE,
     v_oltms_product_status_gl     oltm_product_status_gl%ROWTYPE,
     v_product_penalty_comp    ty_tb_v_product_penalty_comp,
     v_oltms_product_liq_order    ty_tb__oltms_product_liq_order,
     v_product_status_master    ty_tb_v_product_status_master,
     v_lbtms_prod_disclosure    ty_tb_v_lbtms_prod_disclosure,
     v_lbtms_product_ccy_days    ty_tb_v_lbtms_product_ccy_days,
     v_lbtms_product_exrate_ccy    ty_tb_lbtms_product_exrate_ccy,
     v_lbtms_product_intrate_ccy    ty_tb_btms_product_intrate_ccy,
     v_lbtms_product_notice_ccy    ty_tb_lbtms_product_notice_ccy,
     v_roduct_fincentre_dtl__sch    ty_tb_oduct_fincentre_dtl__sch,
     v_roduct_fincentre_dtl__mat    ty_tb_oduct_fincentre_dtl__mat,
                 ty_olcacrhm Olpks_Olcacrhm_Main.ty_olcacrhm,
                 ty_olcacadd Olpks_Olcacadd_Main.ty_olcacadd,
                 ty_lfcprchg Lfpks_Lfcprchg_Main.ty_lfcprchg,
                 ty_lfclsfee Lfpks_Lfclsfee_Main.ty_lfclsfee,
                 ty_olcacrcl Olpks_Olcacrcl_Main.ty_olcacrcl,
                 ty_olcpdfdm Olpks_Olcpdfdm_Main.ty_olcpdfdm,
                 ty_lfcprdia Lfpks_Lfcprdia_Main.ty_lfcprdia,
                 ty_lfcpracf Lfpks_Lfcpracf_Main.ty_lfcpracf,
                 ty_olcprmnt Olpks_Olcprmnt_Main.ty_olcprmnt,
                 ty_lfcprtax Lfpks_Lfcprtax_Main.ty_lfcprtax,
                 ty_lfcliccf Lfpks_Lfcliccf_Main.ty_lfcliccf,
                 ty_lfcropar Lfpks_Lfcropar_Main.ty_lfcropar,
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
                        p_Wrk_lbdprmnt  IN   OUT lbpks_lbdprmnt_Main.ty_lbdprmnt,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION Fn_Populate_Record_Master (p_Source            IN     VARCHAR2,
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_Id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
                        p_lbdprmnt          IN  lbpks_lbdprmnt_Main.Ty_lbdprmnt,
                        p_Record_Master     IN OUT Sttbs_Record_Master%ROWTYPE,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2)
RETURN BOOLEAN ;

FUNCTION Fn_Get_Key_Information (p_Source    IN  VARCHAR2, 
                        p_Source_Operation  IN     VARCHAR2,
                        p_Function_id       IN     VARCHAR2,
                        p_Action_Code       IN     VARCHAR2,
p_lbdprmnt       IN  OUT lbpks_lbdprmnt_Main.Ty_lbdprmnt,
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
                        p_lbdprmnt          IN OUT  lbpks_lbdprmnt_Main.ty_lbdprmnt,
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
                        p_lbdprmnt          IN OUT  lbpks_lbdprmnt_Main.ty_lbdprmnt,
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
END lbpks_lbdprmnt_main;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdprmnt_main FOR lbpks_lbdprmnt_main
/