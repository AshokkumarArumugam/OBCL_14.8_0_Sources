CREATE OR REPLACE PACKAGE Tlpks_Tldsettl_Utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : tlpks_tldsettl_utils.sql
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
  /*g_Asgnfee_Pmnt_Attkt    Cstb_Param.Param_Val%TYPE;
  g_Original_Ref_No       Tltb_Settlement_Master.Contract_Ref_No%TYPE;
  g_Mnemonic_Mapping      CHAR(1);
  g_Ssi_Record_Exist      CHAR(1) := 'N';
  g_Agency_Ref_No         Tltbs_Contract_Master.Contract_Ref_No%TYPE;
  g_Cascade_Participation Oltbs_Contract_Master.Cascade_Participation%TYPE;
  g_Agency_Type           Oltbs_Contract_Master.Agency_Type%TYPE;
  g_Trade_Identifier      Tltbs_Contract_Master.Trade_Identifier%TYPE;
  g_Buy                   Tltbs_Contract_Master.Buy_Sell%TYPE;
  g_Setl_Amt_Due_Picked   CHAR(1) := 'N';*/
  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Child_Function   IN VARCHAR2,
                       p_Tldsettl         IN Tlpks_Tldsettl_Main.Ty_Tldsettl,
                       p_Prev_Tldsettl    IN OUT Tlpks_Tldsettl_Main.Ty_Tldsettl,
                       p_Wrk_Tldsettl     IN OUT Tlpks_Tldsettl_Main.Ty_Tldsettl,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Reverse(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_Child_Function   IN VARCHAR2,
                      p_Multi_Trip_Id    IN VARCHAR2,
                      p_Tldsettl         IN Tlpks_Tldsettl_Main.Ty_Tldsettl,
                      p_Prev_Tldsettl    IN Tlpks_Tldsettl_Main.Ty_Tldsettl,
                      p_Wrk_Tldsettl     IN OUT Tlpks_Tldsettl_Main.Ty_Tldsettl,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Delete(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Child_Function   IN VARCHAR2,
                     p_Multi_Trip_Id    IN VARCHAR2,
                     p_Tldsettl         IN Tlpks_Tldsettl_Main.Ty_Tldsettl,
                     p_Prev_Tldsettl    IN Tlpks_Tldsettl_Main.Ty_Tldsettl,
                     p_Wrk_Tldsettl     IN OUT Tlpks_Tldsettl_Main.Ty_Tldsettl,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Default(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_Child_Function   IN VARCHAR2,
                      p_Tldsettl         IN Tlpks_Tldsettl_Main.Ty_Tldsettl,
                      p_Wrk_Tldsettl     IN OUT Tlpks_Tldsettl_Main.Ty_Tldsettl,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Auto_Auth(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Tldsettl         IN Tlpks_Tldsettl_Main.Ty_Tldsettl,
                        p_Wrk_Tldsettl     IN OUT Tlpks_Tldsettl_Main.Ty_Tldsettl,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Modify(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Multi_Trip_Id    IN VARCHAR2,
                     p_Tldsettl         IN Tlpks_Tldsettl_Main.Ty_Tldsettl,
                     p_Prev_Tldsettl    IN Tlpks_Tldsettl_Main.Ty_Tldsettl,
                     p_Wrk_Tldsettl     IN OUT Tlpks_Tldsettl_Main.Ty_Tldsettl,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Pre_Unlock(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN VARCHAR2,
                         p_Tldsettl         IN Tlpks_Tldsettl_Main.Ty_Tldsettl,
                         p_Wrk_Tldsettl     IN OUT Tlpks_Tldsettl_Main.Ty_Tldsettl,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Query(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    p_Child_Function   IN VARCHAR2,
                    p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                    p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                    p_Qrydata_Reqd     IN VARCHAR2,
                    p_Tldsettl         IN Tlpks_Tldsettl_Main.Ty_Tldsettl,
                    p_Wrk_Tldsettl     IN OUT Tlpks_Tldsettl_Main.Ty_Tldsettl,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Validate_Auth(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Child_Function   IN VARCHAR2,
                            p_Tldsettl         IN Tlpks_Tldsettl_Main.Ty_Tldsettl,
                            p_Prev_Tldsettl    IN OUT Tlpks_Tldsettl_Main.Ty_Tldsettl,
                            p_Wrk_Tldsettl     IN OUT Tlpks_Tldsettl_Main.Ty_Tldsettl,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Validate_Input(p_Source       IN VARCHAR2,
                             p_Function_Id  IN VARCHAR2,
                             p_Wrk_Tldsettl IN OUT Tlpks_Tldsettl_Main.Ty_Tldsettl,
                             p_Err_Code     IN OUT VARCHAR2,
                             p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Log_Override(p_Source          IN VARCHAR2,
                           p_Function_Id     IN VARCHAR2,
                           p_Action_Code     IN VARCHAR2,
                           p_Contract_Ref_No IN VARCHAR2,
                           p_Event_Seq_No    IN VARCHAR2,
                           p_Err_Code        IN OUT VARCHAR2,
                           p_Err_Params      IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Set_Global(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN VARCHAR2,
                         p_Wrk_Tldsettl     IN OUT Tlpks_Tldsettl_Main.Ty_Tldsettl,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
END Tlpks_Tldsettl_Utils;
/
CREATE OR REPLACE SYNONYM Tlpkss_Tldsettl_Utils FOR tlpks_tldsettl_utils
/