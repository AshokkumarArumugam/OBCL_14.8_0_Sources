CREATE OR REPLACE PACKAGE olpks_oldrlink_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : tlpks_tldtdlnk_utils.spc
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
  FUNCTION fn_acquired_chk(p_ld_ref_no        IN oltbs_contract.contract_ref_no%TYPE,
                           p_part_ref_no      IN oltbs_contract.contract_ref_no%TYPE,
                           p_Borr_Ref_No      IN oltbs_contract.contract_ref_no%TYPE,
                           p_value_date       IN oltbs_amount_due_upload.due_date%TYPE,
                           p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Child_Function   IN VARCHAR2,
                           p_oldrlink         IN olpks_oldrlink_Main.Ty_oldrlink,
                           p_Prev_oldrlink    IN OUT olpks_oldrlink_Main.Ty_oldrlink,
                           p_Wrk_oldrlink     IN OUT olpks_oldrlink_Main.Ty_oldrlink,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2)

   RETURN BOOLEAN;
  FUNCTION FN_RELINK(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Child_Function   IN VARCHAR2,
                     p_oldrlink         IN olpks_oldrlink_Main.Ty_oldrlink,
                     p_Prev_oldrlink    IN OUT olpks_oldrlink_Main.Ty_oldrlink,
                     p_Wrk_oldrlink     IN OUT olpks_oldrlink_Main.Ty_oldrlink,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION FN_CREDIT_LINE(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Child_Function   IN VARCHAR2,
                          p_oldrlink         IN olpks_oldrlink_Main.Ty_oldrlink,
                          p_Prev_oldrlink    IN OUT olpks_oldrlink_Main.Ty_oldrlink,
                          p_Wrk_oldrlink     IN OUT olpks_oldrlink_Main.Ty_oldrlink,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION FN_ENAB_DISAB_FLAG(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_Child_Function   IN VARCHAR2,
                              p_oldrlink         IN olpks_oldrlink_Main.Ty_oldrlink,
                              p_Prev_oldrlink    IN OUT olpks_oldrlink_Main.Ty_oldrlink,
                              p_Wrk_oldrlink     IN OUT olpks_oldrlink_Main.Ty_oldrlink,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
END olpks_oldrlink_utils;
/