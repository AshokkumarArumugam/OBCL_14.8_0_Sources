CREATE OR REPLACE PACKAGE olpks_oldscsch_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lspks_lddscsch_utils.spc
  **
  ** Module     : Loans Syndication
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




FUNCTION Fn_Get_No_Schedules(p_Contract_Ref_No   oltbs_contract.Contract_Ref_No%TYPE
                            ,p_Start_Date        DATE
                            ,p_Frequency         VARCHAR2
                            ,p_Frequency_Unit    NUMBER
                            ,p_Prm_Maturity_Date oltbs_contract_master.Maturity_Date%TYPE
                            ,p_Err_Code         IN OUT VARCHAR2
                            ,p_Err_Params       IN OUT VARCHAR2)
RETURN NUMBER;
FUNCTION fn_basic_val(p_Source           IN VARCHAR2
                       ,p_Source_Operation IN VARCHAR2
                       ,p_Function_Id      IN VARCHAR2
                       ,p_Action_Code      IN VARCHAR2
                       ,p_oldscsch         IN olpks_oldscsch_main.ty_oldscsch
                       ,p_prev_oldscsch    IN olpks_oldscsch_main.ty_oldscsch
                       ,p_wrk_oldscsch     IN OUT olpks_oldscsch_main.ty_oldscsch
                       ,p_Err_Code         IN OUT VARCHAR2
                       ,p_Err_Params       IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION fn_validate_Disc_Master(p_Source           IN VARCHAR2
                       ,p_Source_Operation IN VARCHAR2
                       ,p_Function_Id      IN VARCHAR2
                       ,p_Action_Code      IN VARCHAR2
                       ,p_oldscsch         IN olpks_oldscsch_main.ty_oldscsch
                       ,p_prev_oldscsch    IN olpks_oldscsch_main.ty_oldscsch
                       ,p_wrk_oldscsch     IN OUT olpks_oldscsch_main.ty_oldscsch
                       ,p_Err_Code         IN OUT VARCHAR2
                       ,p_Err_Params       IN OUT VARCHAR2)
RETURN BOOLEAN; 

FUNCTION fn_validate_Disc_Schedule(p_Source           IN VARCHAR2
                       ,p_Source_Operation IN VARCHAR2
                       ,p_Function_Id      IN VARCHAR2
                       ,p_Action_Code      IN VARCHAR2
                       ,p_oldscsch         IN olpks_oldscsch_main.ty_oldscsch
                       ,p_prev_oldscsch    IN olpks_oldscsch_main.ty_oldscsch
                       ,p_wrk_oldscsch     IN OUT olpks_oldscsch_main.ty_oldscsch
                       ,p_Err_Code         IN OUT VARCHAR2
                       ,p_Err_Params       IN OUT VARCHAR2)
RETURN BOOLEAN; 
FUNCTION fn_validate_Disc_Notes(p_Source           IN VARCHAR2
                       ,p_Source_Operation IN VARCHAR2
                       ,p_Function_Id      IN VARCHAR2
                       ,p_Action_Code      IN VARCHAR2
                       ,p_oldscsch         IN olpks_oldscsch_main.ty_oldscsch
                       ,p_prev_oldscsch    IN olpks_oldscsch_main.ty_oldscsch
                       ,p_wrk_oldscsch     IN OUT olpks_oldscsch_main.ty_oldscsch
                       ,p_Err_Code         IN OUT VARCHAR2
                       ,p_Err_Params       IN OUT VARCHAR2)
RETURN BOOLEAN; 
FUNCTION fn_fetch(p_Source           IN VARCHAR2
                       ,p_Source_Operation IN VARCHAR2
                       ,p_Function_Id      IN VARCHAR2
                       ,p_Action_Code      IN VARCHAR2
                       ,p_oldscsch         IN olpks_oldscsch_main.ty_oldscsch
                       ,p_prev_oldscsch    IN olpks_oldscsch_main.ty_oldscsch
                       ,p_wrk_oldscsch     IN OUT olpks_oldscsch_main.ty_oldscsch
                       ,p_Err_Code         IN OUT VARCHAR2
                       ,p_Err_Params       IN OUT VARCHAR2)
RETURN BOOLEAN; 
FUNCTION Fn_Update_Footer(p_Source           IN VARCHAR2
                               ,p_Source_Operation IN VARCHAR2
                               ,p_Function_Id      IN VARCHAR2
                               ,p_Action_Code      IN VARCHAR2
                               ,p_oldscsch         IN olpks_oldscsch_main.ty_oldscsch
                               ,p_wrk_oldscsch     IN OUT olpks_oldscsch_main.ty_oldscsch
                               ,p_Err_Code         IN OUT VARCHAR2
                               ,p_Err_Params       IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION fn_explode_schedule (p_Source           IN VARCHAR2
                               ,p_Source_Operation IN VARCHAR2
                               ,p_Function_Id      IN VARCHAR2
                               ,p_Action_Code      IN VARCHAR2
                               ,p_oldscsch         IN olpks_oldscsch_main.ty_oldscsch
                               ,p_wrk_oldscsch     IN OUT olpks_oldscsch_main.ty_oldscsch
                               ,p_Err_Code         IN OUT VARCHAR2
                               ,p_Err_Params       IN OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION fn_propagate_sch_dates(p_Source           IN VARCHAR2
                               ,p_Source_Operation IN VARCHAR2
                               ,p_Function_Id      IN VARCHAR2
                               ,p_Action_Code      IN VARCHAR2
                               ,p_oldscsch         IN olpks_oldscsch_main.ty_oldscsch
                               ,p_wrk_oldscsch     IN OUT olpks_oldscsch_main.ty_oldscsch
                               ,p_Err_Code         IN OUT VARCHAR2
                               ,p_Err_Params       IN OUT VARCHAR2)
RETURN BOOLEAN;
END olpks_oldscsch_utils;
/