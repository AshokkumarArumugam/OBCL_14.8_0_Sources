create or replace PACKAGE lbpks_lbdtrupl_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdtrupl_utils.spc
  **
  ** Module     : LB
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright Â© 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
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

 FUNCTION Fn_product_Default(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_lbdtrupl         IN lbpks_lbdtrupl_Main.Ty_lbdtrupl,
                              p_Wrk_lbdtrupl     IN OUT lbpks_lbdtrupl_Main.Ty_lbdtrupl,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

FUNCTION Fn_Default_and_validate(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_lbdtrupl         IN lbpks_lbdtrupl_Main.Ty_lbdtrupl,                                   
                                   p_Wrk_lbdtrupl     IN OUT lbpks_lbdtrupl_Main.Ty_lbdtrupl,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

FUNCTION Fn_Query(p_Source       IN VARCHAR2,
                    p_Function_Id  IN VARCHAR2,
                    p_Action_Code  IN VARCHAR2,
                    p_wrk_lbdtrupl IN OUT lbpks_lbdtrupl_Main.Ty_lbdtrupl,
                    p_Err_Code     IN OUT VARCHAR2,
                    p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN; 
                    
FUNCTION Fn_validate_repay_schedule(p_Source       IN VARCHAR2,
                    p_Function_Id  IN VARCHAR2,
                    p_Action_Code  IN VARCHAR2,
                    p_wrk_lbdtrupl IN OUT lbpks_lbdtrupl_Main.Ty_lbdtrupl,
                    p_Err_Code     IN OUT VARCHAR2,
                    p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN; 

FUNCTION Fn_schedule_validations (p_Source       IN VARCHAR2,
                    p_Function_Id  IN VARCHAR2,
                    p_Action_Code  IN VARCHAR2,
                    p_wrk_lbdtrupl IN OUT lbpks_lbdtrupl_Main.Ty_lbdtrupl,
                    p_Err_Code     IN OUT VARCHAR2,
                    p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN; 

FUNCTION Fn_upld_drft_tranche (p_Source       IN VARCHAR2,
                    p_Function_Id  IN VARCHAR2,
                    p_Action_Code  IN VARCHAR2,
                    p_wrk_lbdtrupl IN OUT lbpks_lbdtrupl_Main.Ty_lbdtrupl,
                    p_Err_Code     IN OUT VARCHAR2,
                    p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION Fn_drawdown_comp(p_Source       IN VARCHAR2,
                    p_Function_Id  IN VARCHAR2,
                    p_Action_Code  IN VARCHAR2,                   
                    p_Wrk_lbdtrupl IN OUT lbpks_lbdtrupl_Main.Ty_lbdtrupl,
                    p_Err_Code     IN OUT VARCHAR2,
                    p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION Fn_default_fee(p_Source       IN VARCHAR2,
                    p_Function_Id  IN VARCHAR2,
                    p_Action_Code  IN VARCHAR2,                   
                    p_Wrk_lbdtrupl IN OUT lbpks_lbdtrupl_Main.Ty_lbdtrupl,
                    p_Err_Code     IN OUT VARCHAR2,
                    p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

END lbpks_lbdtrupl_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdtrupl_utils FOR lbpks_lbdtrupl_utils
/