create or replace package olpks_oldrtfix_utils is
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldrtfix_utils.spc
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
  
  Created by        : Neeraj.Krishna
  Created Date      : 01-SEPT-2016
  Description       : Development for OFCL-12.3
  
  -------------------------------------------------------------------------------------------------------
  */
  PROCEDURE PR_NEXT_RESET_DATE(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_Child_Function   IN VARCHAR2,
                               p_oldrtfix         IN olpks_oldrtfix_main.ty_oldrtfix,
                               p_prev_oldrtfix    IN OUT olpks_oldrtfix_main.ty_oldrtfix,
                               p_wrk_oldrtfix     IN OUT olpks_oldrtfix_main.ty_oldrtfix,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2,
                               g_prm_mat_date     IN DATE,
                               g_prm_old_esn      IN oltbs_contract_event_log.Event_Seq_No%type);

  PROCEDURE PR_RESET_VALUE_DATE(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Child_Function   IN VARCHAR2,
                                p_oldrtfix         IN olpks_oldrtfix_main.ty_oldrtfix,
                                p_prev_oldrtfix    IN OUT olpks_oldrtfix_main.ty_oldrtfix,
                                p_wrk_oldrtfix     IN OUT olpks_oldrtfix_main.ty_oldrtfix,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2,
                                g_prm_value_date   IN DATE,
                                g_prm_mat_date     IN DATE);

end olpks_oldrtfix_utils;
/