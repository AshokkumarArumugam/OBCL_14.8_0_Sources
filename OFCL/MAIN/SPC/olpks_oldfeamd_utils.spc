CREATE OR REPLACE PACKAGE olpks_oldfeamd_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldfeamd_utils.spc
  **
  ** Module     : The ICCF
  **
  ** This source is part of the Oracle FLEXCUBE Software Product.
  ** Copyright (R) 2008,2019 , Oracle and/or its affiliates.  All rights reserved
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

  g_prm_maturity_date         DATE;
  g_prm_value_Date            DATE;
  g_allow_fee_enddt_reduction CHAR(1);
  g_end_date_list             VARCHAR2(2000);
  g_component_list            VARCHAR2(2000);

  FUNCTION Fn_Subsys_Pickup(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_oldfeamd         IN olpks_oldfeamd_Main.Ty_oldfeamd,
                            p_prev_oldfeamd    IN olpks_oldfeamd_Main.Ty_oldfeamd,
                            p_wrk_oldfeamd     IN OUT olpks_oldfeamd_Main.Ty_oldfeamd,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Child_Function   IN VARCHAR2,
                       p_oldfeamd         IN olpks_oldfeamd_Main.Ty_oldfeamd,
                       p_Prev_oldfeamd    IN OUT olpks_oldfeamd_Main.Ty_oldfeamd,
                       p_wrk_oldfeamd     IN OUT olpks_oldfeamd_Main.Ty_oldfeamd,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Ol_Retain_Upd(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_oldfeamd         IN olpks_oldfeamd_Main.Ty_oldfeamd,
                            p_wrk_oldfeamd     IN OUT olpks_oldfeamd_Main.Ty_oldfeamd,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Fire_Fee_Events(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_wrk_oldfeamd     IN olpks_oldfeamd_Main.Ty_oldfeamd,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_auto_auth_validations(p_Source           IN VARCHAR2,
                                    p_Source_Operation IN VARCHAR2,
                                    p_Function_Id      IN VARCHAR2,
                                    p_Action_Code      IN VARCHAR2,
                                    p_wrk_oldfeamd     IN olpks_oldfeamd_Main.Ty_oldfeamd,
                                    p_Err_Code         IN OUT VARCHAR2,
                                    p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Delete(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Child_Function   IN VARCHAR2,
                     p_oldfeamd         IN olpks_oldfeamd_Main.Ty_oldfeamd,
                     p_wrk_oldfeamd     IN OUT olpks_oldfeamd_Main.Ty_oldfeamd,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

END olpks_oldfeamd_utils;
/
CREATE OR REPLACE SYNONYM olpkss_oldfeamd_utils FOR olpks_oldfeamd_utils
/