CREATE OR REPLACE PACKAGE lbpks_lbdtronl_utils1 AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdtronl_utils.spc
  **
  ** Module     : LB
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
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
  
  Changed By          : Akhila Samson
  Date                : 10-DEC-2020
  Change Description  : System should not fire FLIQ along with CAMD event , if there is no changes in fee schedule and tranche valuesdate is same as application date.
  Search String       : Bug#32025434

  	Changed By         : Rashmi B V
    Date               : 21-FEB-2024
    Change Description : Explode schedule call restricted if 'redefine' button not clicked. 
    Search String      : Bug#36234922  
  -------------------------------------------------------------------------------------------------------
  */
  
  g_fliq_entry BOOLEAN := TRUE; --Bug#32025434
  g_Redefine_Required VARCHAR2(1) := 'N';--Bug#36234922 ADDED
  FUNCTION Fn_process_contract(p_Source                 IN VARCHAR2,
                               p_Source_Operation       IN VARCHAR2,
                               p_Function_Id            IN VARCHAR2,
                               p_Action_Code            IN VARCHAR2,
                               p_lbdtronl               IN lbpks_lbdtronl_Main.Ty_lbdtronl,
                               p_Prev_lbdtronl          IN lbpks_lbdtronl_Main.Ty_lbdtronl,
                               p_Wrk_lbdtronl           IN OUT lbpks_lbdtronl_Main.Ty_lbdtronl,
                               p_oltm_product_master_ld IN oltm_product_master_ld%ROWTYPE,
                               p_Err_Code               IN OUT VARCHAR2,
                               p_Err_Params             IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_set_auto_auth(p_Source       IN VARCHAR2,
                            p_Action_Code  IN VARCHAR2,
                            p_Function_Id  IN VARCHAR2,
                            p_wrk_lbdtronl IN OUT lbpks_lbdtronl_main.ty_lbdtronl,
                            p_Err_Code     IN OUT VARCHAR2,
                            p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION fn_redefine_sch(p_Source       IN VARCHAR2,
                           p_Function_Id  IN VARCHAR2,
                           p_Action_Code  IN VARCHAR2,
                           p_Wrk_lbdtronl IN OUT lbpks_lbdtronl_Main.Ty_lbdtronl,
                           p_Err_Code     IN OUT VARCHAR2,
                           p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_show_payment_det(p_Source                 IN VARCHAR2,
                               p_Source_Operation       IN VARCHAR2,
                               p_Function_Id            IN VARCHAR2,
                               p_Action_Code            IN VARCHAR2,
                               p_Prev_lbdtronl          IN lbpks_lbdtronl_Main.Ty_lbdtronl,
                               p_Wrk_lbdtronl           IN OUT lbpks_lbdtronl_Main.Ty_lbdtronl,
                               p_oltm_product_master_ld IN oltm_product_master_ld%ROWTYPE,
                               p_Err_Code               IN OUT VARCHAR2,
                               p_Err_Params             IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_show_cmtredn_det(p_Source                 IN VARCHAR2,
                               p_Source_Operation       IN VARCHAR2,
                               p_Function_Id            IN VARCHAR2,
                               p_Action_Code            IN VARCHAR2,
                               p_Prev_lbdtronl          IN lbpks_lbdtronl_Main.Ty_lbdtronl,
                               p_Wrk_lbdtronl           IN OUT lbpks_lbdtronl_Main.Ty_lbdtronl,
                               p_oltm_product_master_ld IN oltm_product_master_ld%ROWTYPE,
                               p_Err_Code               IN OUT VARCHAR2,
                               p_Err_Params             IN OUT VARCHAR2)
    RETURN BOOLEAN;
	  FUNCTION fn_show_tranche_sch_det(p_Source                 IN VARCHAR2,
                                   p_Source_Operation       IN VARCHAR2,
                                   p_Function_Id            IN VARCHAR2,
                                   p_Action_Code            IN VARCHAR2,
                                   p_Prev_lbdtronl          IN lbpks_lbdtronl_Main.Ty_lbdtronl,
                                   p_Wrk_lbdtronl           IN OUT lbpks_lbdtronl_Main.Ty_lbdtronl,
                                   p_Err_Code               IN OUT VARCHAR2,
                                   p_Err_Params             IN OUT VARCHAR2)
    RETURN BOOLEAN; 
  FUNCTION Fn_default_and_validate_sch(p_Source           IN VARCHAR2,
                                       p_Source_Operation IN VARCHAR2,
                                       p_Function_Id      IN VARCHAR2,
                                       p_Action_Code      IN VARCHAR2,
                                       p_Wrk_lbdtronl     IN OUT lbpks_lbdtronl_Main.Ty_lbdtronl,
                                       p_Err_Code         IN OUT VARCHAR2,
                                       p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_validate_schedule_dates(p_Source       IN VARCHAR2,
                                      p_Action_Code  IN VARCHAR2,
                                      p_Function_Id  IN VARCHAR2,
                                      p_wrk_lbdtronl IN OUT lbpks_lbdtronl_main.ty_lbdtronl,
                                      p_Err_Code     IN OUT VARCHAR2,
                                      p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN;
END lbpks_lbdtronl_utils1;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdtronl_utils1 FOR lbpks_lbdtronl_utils1
/