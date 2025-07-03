create or replace package lbpks_lbdinstr_utils is

  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdinstr_utils.spc
  **
  ** Module     : Syndication Loans and Commitments
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
  FUNCTION Fn_Validate_Items(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_Child_Function   IN VARCHAR2,
                             p_lbdinstr         IN lbpks_lbdinstr_main.ty_lbdinstr,
                             p_prev_lbdinstr    IN OUT lbpks_lbdinstr_main.ty_lbdinstr,
                             p_wrk_lbdinstr     IN OUT lbpks_lbdinstr_main.ty_lbdinstr,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  PROCEDURE Pr_Generate_Seq_No(p_wrk_lbdinstr IN OUT lbpks_lbdinstr_main.ty_lbdinstr,
                               p_Err_Code     IN OUT VARCHAR2,
                               p_Err_Params   IN OUT VARCHAR2);

  FUNCTION Fn_Populate_Fields(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Child_Function   IN VARCHAR2,
                           p_lbdinstr         IN OUT lbpks_lbdinstr_main.ty_lbdinstr,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Update_Log(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN VARCHAR2,
                         p_Child_Function   IN VARCHAR2,
                         p_Post_Upl_Stat    IN VARCHAR2,
                         p_Multi_Trip_Id    IN VARCHAR2,
                         p_lbdinstr         IN lbpks_lbdinstr_main.ty_lbdinstr,
                         p_prev_lbdinstr    IN lbpks_lbdinstr_main.ty_lbdinstr,
                         p_wrk_lbdinstr     IN OUT lbpks_lbdinstr_main.ty_lbdinstr,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_chk_allowed_character(p_in_text     in varchar2,
                                    p_valid_chars in varchar2) RETURN boolean;
  FUNCTION FN_SSI_VALIDATIONS(PCODE IN VARCHAR2, PFEILD_DESC IN VARCHAR2)
    RETURN BOOLEAN;
  Function Fn_Bankname_Validation(PCODE       IN VARCHAR2,
                                  PFEILD_DESC IN VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Swift_Validations(PFEILD IN VARCHAR2) RETURN NUMBER;

END lbpks_lbdinstr_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdinstr_utils FOR lbpks_lbdinstr_utils
/