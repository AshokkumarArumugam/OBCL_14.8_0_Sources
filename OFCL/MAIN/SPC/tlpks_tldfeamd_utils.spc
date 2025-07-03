CREATE OR REPLACE PACKAGE tlpks_tldfeamd_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : tlpks_tldfeamd_utils.spc
  **
  ** Module     : Secondary Loan Trading
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
  
  -------------------------------------------------------------------------------------------------------
  */
  g_prm_settlement_pickup  CHAR(1) := 'N';
  g_prm_assign_fee         VARCHAR2(100);
  g_prm_asgnfee_pmnt_attkt VARCHAR2(100);

  FUNCTION Fn_Delete(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Child_Function   IN VARCHAR2,
                     p_tldfeamd         IN tlpks_tldfeamd_Main.Ty_tldfeamd,
                     p_Prev_tldfeamd    IN OUT tlpks_tldfeamd_Main.Ty_tldfeamd,
                     p_Wrk_tldfeamd     IN OUT tlpks_tldfeamd_Main.Ty_tldfeamd,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Child_Function   IN VARCHAR2,
                       p_tldfeamd         IN tlpks_tldfeamd_Main.Ty_tldfeamd,
                       p_Prev_tldfeamd    IN OUT tlpks_tldfeamd_Main.Ty_tldfeamd,
                       p_Wrk_tldfeamd     IN OUT tlpks_tldfeamd_Main.Ty_tldfeamd,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Subsys_Pickup(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_tldfeamd         IN tlpks_tldfeamd_Main.Ty_tldfeamd,
                            p_Prev_tldfeamd    IN tlpks_tldfeamd_Main.Ty_tldfeamd,
                            p_Wrk_tldfeamd     IN OUT tlpks_tldfeamd_Main.Ty_tldfeamd,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

END tlpks_tldfeamd_utils;
/
CREATE OR REPLACE SYNONYM tlpkss_tldfeamd_utils FOR tlpks_tldfeamd_utils
/