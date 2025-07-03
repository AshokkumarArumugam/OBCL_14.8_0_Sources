create or replace package tlpks_tldrtmch_utils is
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : tlpks_tldrtmch_utils.spc
  **
  ** Module     : Secondary Loan Trading
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Oracle Banking Corporate Lending  Software Product.   Copyright © 2018.  All rights reserved
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
   FUNCTION Fn_Validate_Data (p_Source    IN  VARCHAR2,
                              p_Source_Operation  IN     VARCHAR2,
                              p_Function_Id       IN     VARCHAR2,
                              p_Action_Code       IN     VARCHAR2,
      p_Child_Function    IN  VARCHAR2,
      p_tldrtmch IN   tlpks_tldrtmch_Main.Ty_tldrtmch,
      p_Prev_tldrtmch IN OUT tlpks_tldrtmch_Main.Ty_tldrtmch,
      p_Wrk_tldrtmch IN OUT  tlpks_tldrtmch_Main.Ty_tldrtmch,
      p_Err_Code       IN  OUT VARCHAR2,
      p_Err_Params     IN  OUT VARCHAR2)
   RETURN BOOLEAN;  

end tlpks_tldrtmch_utils;
/
CREATE OR REPLACE SYNONYM tlpkss_tldrtmch_utils FOR tlpks_tldrtmch_utils
/