create or replace package olpks_oldllrsv_utils is

  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldllrsv_utils.spc
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


  PROCEDURE PR_ASSIGN(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_Child_Function   IN VARCHAR2,
                      p_oldllrsv         IN olpks_oldllrsv_main.ty_oldllrsv,
                      p_wrk_oldllrsv     IN OUT olpks_oldllrsv_main.ty_oldllrsv,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2,
                      g_esn              IN oltbs_contract.latest_event_seq_no%type);

  FUNCTION Fn_populate_event_log(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN VARCHAR2,
                                 p_oldllrsv         IN olpks_oldllrsv_main.ty_oldllrsv,
                                 p_wrk_oldllrsv     IN OUT olpks_oldllrsv_main.ty_oldllrsv,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2)
    Return boolean;

  FUNCTION Fn_Populate_Data(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_oldllrsv         IN olpks_oldllrsv_main.ty_oldllrsv,
                            p_wrk_oldllrsv     IN OUT olpks_oldllrsv_main.ty_oldllrsv,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    Return boolean;

  Function Fn_change_log1(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_oldllrsv         IN olpks_oldllrsv_main.ty_oldllrsv,
                          p_prev_oldllrsv    IN olpks_oldllrsv_main.ty_oldllrsv,
                          p_wrk_oldllrsv     IN OUT olpks_oldllrsv_main.ty_oldllrsv,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2,
                          g_esn              IN oltbs_contract.latest_event_seq_no%type)
    Return Boolean;

end olpks_oldllrsv_utils;
/