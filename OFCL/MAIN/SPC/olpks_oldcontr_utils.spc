create or replace package olpks_oldcontr_utils is
 /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldcontr_utils.spc
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

  SFR Number         : 25161667 
  Change String    :   OFCL_12.3.0.0.0_25161667
  Changed By         : K.PRIYADARSHINI
  Change Description : Changed the case sensitive UI field name in fn_populate_data to enable query successfully.
                       Added Code for Delete action. Also Assigned auth_status as 'U' in populate_event_log function

  -------------------------------------------------------------------------------------------------------
  */
  PROCEDURE Dbg(p_Msg VARCHAR2);

  Function Fn_Do_Setl_Pickup(pContractRefNo IN oltbs_contract.contract_ref_no%type,
                             pEsn           IN Number) Return Boolean;

  FUNCTION fn_Populate_Data(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_oldcontr         IN olpks_oldcontr_main.ty_oldcontr,
                            p_wrk_oldcontr     IN OUT olpks_oldcontr_main.ty_oldcontr,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    Return boolean;

  FUNCTION Fn_Populate_Event_Log(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN VARCHAR2,
                                 p_oldcontr         IN olpks_oldcontr_main.ty_oldcontr,
                                 p_prev_oldcontr    IN olpks_oldcontr_main.ty_oldcontr,
                                 p_wrk_oldcontr     IN OUT olpks_oldcontr_main.ty_oldcontr,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2)
    Return boolean;

  Function Fn_Change_Log(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN VARCHAR2,
                         p_oldcontr         IN olpks_oldcontr_main.ty_oldcontr,
                         p_prev_oldcontr    IN olpks_oldcontr_main.ty_oldcontr,
                         p_wrk_oldcontr     IN OUT olpks_oldcontr_main.ty_oldcontr,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) Return Boolean;
  --Priya
  Function Fn_change_log1(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN VARCHAR2,
                         p_oldcontr         IN olpks_oldcontr_main.ty_oldcontr,
                         p_prev_oldcontr    IN olpks_oldcontr_main.ty_oldcontr,
                         p_wrk_oldcontr     IN OUT olpks_oldcontr_main.ty_oldcontr,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2)
    Return Boolean;                       

  Function Fn_Valdiations(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_oldcontr         IN olpks_oldcontr_main.ty_oldcontr,
                          p_prev_oldcontr    IN olpks_oldcontr_main.ty_oldcontr,
                          p_wrk_oldcontr     IN OUT olpks_oldcontr_main.ty_oldcontr,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) Return Boolean;
         
  --Priya  
  --OFCL_12.3.0.0.0_25161667 changes               
   FUNCTION Fn_Undo_Event (p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_oldcontr         IN olpks_oldcontr_main.ty_oldcontr,
                          p_prev_oldcontr    IN olpks_oldcontr_main.ty_oldcontr,
                          p_wrk_oldcontr     IN OUT olpks_oldcontr_main.ty_oldcontr,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) Return Boolean; 
   --Priya                       
   FUNCTION fn_log_override(p_Source       IN VARCHAR2,
                           p_Function_Id  IN VARCHAR2,
                           p_Action_Code  IN VARCHAR2,
                           p_wrk_oldcontr     IN OUT olpks_oldcontr_main.ty_oldcontr,
                           p_Err_Code     IN OUT VARCHAR2,
                           p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
                                                                        
end olpks_oldcontr_utils;
/