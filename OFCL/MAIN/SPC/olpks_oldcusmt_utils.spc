CREATE OR REPLACE PACKAGE olpks_oldcusmt_utils IS

  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldcusmt_utils.spc
  **
  ** Module     : Loans and Deposits
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

  FUNCTION Fn_Validate_Fields(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_Child_Function   IN VARCHAR2,
                              p_oldcusmt         IN olpks_oldcusmt_main.ty_oldcusmt,
                              p_prev_oldcusmt    IN OUT olpks_oldcusmt_main.ty_oldcusmt,
                              p_wrk_oldcusmt     IN OUT olpks_oldcusmt_main.ty_oldcusmt,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

END olpks_oldcusmt_utils;
/
CREATE OR REPLACE SYNONYM olpkss_oldcusmt_utils FOR olpks_oldcusmt_utils
/