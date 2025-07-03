CREATE OR REPLACE PACKAGE lbpks_process_clmo AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_process_clmo.spc
  **
  ** Module     : Loans and Deposits
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Oracle Banking Corporate Lending  Software Product.   Copyright Ã‚Â© 2018.  All rights reserved
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

  FUNCTION Fn_process_clpm_handoff(p_module     IN Oltbs_Contract.Module_Code%Type,
                                 p_Branch     IN VARCHAR2,
                                 p_User_Id    IN VARCHAR2,
                                 p_processing_date    IN DATE,
                                 p_Err_Code   IN OUT VARCHAR2,
                                 p_Err_Params IN OUT VARCHAR2)
    RETURN VARCHAR2;
END lbpks_process_clmo;
/
CREATE OR REPLACE SYNONYM LBPKSS_PROCESS_CLMO FOR LBPKS_PROCESS_CLMO
/