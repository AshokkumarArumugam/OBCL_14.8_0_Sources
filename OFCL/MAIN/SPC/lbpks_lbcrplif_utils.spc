CREATE OR REPLACE PACKAGE lbpks_lbcrplif_utils AS
/*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbcrplif_utils.spc
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

 FUNCTION fn_validate(p_Source    IN  VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_Main_Function    IN  VARCHAR2,
      p_Child_Function    IN  VARCHAR2,
      p_lbcrplif IN   lbpks_lbcrplif_Main.Ty_lbcrplif,
      p_Prev_lbcrplif IN OUT lbpks_lbcrplif_Main.Ty_lbcrplif,
      p_Wrk_lbcrplif IN OUT  lbpks_lbcrplif_Main.Ty_lbcrplif,
      p_Err_Code       IN  OUT VARCHAR2,
      p_Err_Params     IN  OUT VARCHAR2) RETURN BOOLEAN;
      
 FUNCTION fn_date_validation(p_effective_date IN DATE,
                             p_tenor_value    IN OUT NUMBER,
                             p_tenor_unit     IN OUT VARCHAR2,
                             p_eff_end_date   IN OUT DATE,
                             p_char_date      IN OUT VARCHAR2,
                             p_err_code       IN OUT VARCHAR2,
                             p_err_prms       IN OUT VARCHAR2,
                             l_contract   IN OUT VARCHAR2)RETURN BOOLEAN ;    
      
      
END lbpks_lbcrplif_utils;
/