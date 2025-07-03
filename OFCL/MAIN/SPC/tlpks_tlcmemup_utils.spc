CREATE OR REPLACE PACKAGE Tlpks_Tlcmemup_Utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : tlpks_tlcmemup_util.sql
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
 
  PROCEDURE Pr_Sel_Loan_Param(p_Wrk_Tlcmemup IN OUT Tlpks_Tlcmemup_Main.Ty_Tlcmemup);
  PROCEDURE Pr_Get_Transferor(p_Wrk_Tlcmemup IN OUT Tlpks_Tlcmemup_Main.Ty_Tlcmemup);
  FUNCTION Fn_Pickup(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Main_Function    IN VARCHAR2,
                     --p_Child_Function   IN VARCHAR2,
                     p_Tlcmemup IN Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                     --p_Prev_Tlcmemup    IN OUT Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                     p_Wrk_Tlcmemup IN OUT Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                     p_Err_Code     IN OUT VARCHAR2,
                     p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Query(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    p_Main_Function    IN VARCHAR2,
                    --p_Child_Function   IN VARCHAR2,
                    p_Tlcmemup     IN Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                    p_Wrk_Tlcmemup IN OUT Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                    p_Err_Code     IN OUT VARCHAR2,
                    p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Main_Function    IN VARCHAR2,
                       --p_Child_Function   IN VARCHAR2,
                       p_Tlcmemup      IN Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                       p_Prev_Tlcmemup IN Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                       p_Wrk_Tlcmemup  IN OUT Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                       p_Err_Code      IN OUT VARCHAR2,
                       p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Upload(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Main_Function    IN VARCHAR2,
                     --p_Child_Function   IN VARCHAR2,
                     --p_Multi_Trip_Id    IN VARCHAR2,
                     p_Tlcmemup      IN Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                     p_Prev_Tlcmemup IN Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                     p_Wrk_Tlcmemup  IN OUT Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                     p_Err_Code      IN OUT VARCHAR2,
                     p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Sys_Upload_Db(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Main_Function    IN VARCHAR2,
                            p_Tlcmemup         IN Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                            p_Prev_Tlcmemup    IN Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                            p_Wrk_Tlcmemup     IN OUT Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  /*  FUNCTION Fn_Btn_Add(p_Source           IN VARCHAR2,
  p_Source_Operation IN VARCHAR2,
  p_Function_Id      IN VARCHAR2,
  p_Action_Code      IN VARCHAR2,
  p_Main_Function    IN VARCHAR2,
  p_Child_Function   IN VARCHAR2,
  p_Tlcmemup         IN Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
  p_Prev_Tlcmemup    IN OUT Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
  p_Wrk_Tlcmemup     IN OUT Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
  p_Err_Code         IN OUT VARCHAR2,
  p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;*/

  /*FUNCTION Fn_Btn_Ok(p_Source           IN VARCHAR2,
  p_Source_Operation IN VARCHAR2,
  p_Function_Id      IN VARCHAR2,
  p_Action_Code      IN VARCHAR2,
  p_Main_Function    IN VARCHAR2,
  p_Child_Function   IN VARCHAR2,
  p_Multi_Trip_Id    IN VARCHAR2,
  p_Tlcmemup         IN Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
  p_Prev_Tlcmemup    IN Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
  p_Wrk_Tlcmemup     IN OUT Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
  p_Err_Code         IN OUT VARCHAR2,
  p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;*/

   FUNCTION Fn_Populate_Funding_Detail(p_Source           IN VARCHAR2,
                                      p_Source_Operation IN VARCHAR2,
                                      p_Function_Id      IN VARCHAR2,
                                      p_Action_Code      IN VARCHAR2,
                                      p_Main_Function    IN VARCHAR2,
                                      --p_Child_Function   IN VARCHAR2,
                                      --p_Multi_Trip_Id    IN VARCHAR2,
                                      p_Tlcmemup      IN Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                                      p_Prev_Tlcmemup IN Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                                      p_Wrk_Tlcmemup  IN OUT Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                                      p_Err_Code      IN OUT VARCHAR2,
                                      p_Err_Params    IN OUT VARCHAR2)
    RETURN BOOLEAN;


  FUNCTION Fn_Get_Basis_Amt(p_Contract_Ref_No IN VARCHAR2,
                            p_Drawdown_Ref_No IN VARCHAR2)
    RETURN Ol_Lsty_Char_Tbl;

  FUNCTION Fn_Validate_Fmem_Upload(p_Err_Code     IN OUT VARCHAR2,
                                   p_Err_Param    IN OUT VARCHAR2,
                                   p_Wrk_Tlcmemup IN OUT Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                                   p_Source       IN VARCHAR2,
                                   p_Function_Id  IN VARCHAR2

                                   ) RETURN BOOLEAN;

  /*  FUNCTION Fn_Generate_Dd_Ref_No(p_Wrk_Tlcmemup IN OUT Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                                   p_Source       IN VARCHAR2,
                                   p_Function_Id  IN VARCHAR2,
                                   p_Action_Code  IN VARCHAR2) RETURN BOOLEAN;
  */
  FUNCTION Fn_Btn_Generate(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Tlcmemup         IN Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                           p_Wrk_Tlcmemup     IN OUT Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

/*
  FUNCTION Fn_Btn_Product(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Main_Function    IN VARCHAR2,
                          p_Child_Function   IN VARCHAR2,
                          p_Tlcmemup         IN Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                          p_Prev_Tlcmemup    IN OUT Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                          p_Wrk_Tlcmemup     IN OUT Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Btn_Add_Row(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Main_Function    IN VARCHAR2,
                          p_Child_Function   IN VARCHAR2,
                          p_Tlcmemup         IN Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                          p_Prev_Tlcmemup    IN OUT Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                          p_Wrk_Tlcmemup     IN OUT Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
 */

 
 PROCEDURE Pr_Default_Dd_Details(p_Wrk_Tlcmemup IN OUT Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                                  p_Source       IN VARCHAR2,
                                  p_Action_Code  IN VARCHAR2,
                                  
                                  p_Function_Id IN VARCHAR2);
 --SLT_SOFR_Change start
FUNCTION Fn_Populate_Components(p_Source      IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Tlcmemup         IN Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                           p_Wrk_Tlcmemup     IN OUT Tlpks_Tlcmemup_Main.Ty_Tlcmemup,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
 --OBCL_14.5_SLT_Auto_DD_SOFR start
 FUNCTION Fn_Log_pickup_rate(p_Ref               IN VARCHAR2,
                              p_Brn               IN VARCHAR2,
                              p_Ext_Sys           IN VARCHAR2,
                              to_date             IN Date,
                              from_date           IN Date,
                              p_amount            IN oltbs_contract_master.amount_financed%type,
                              p_contract_interest IN TLTBS_FMEM_UPLOAD_INT_DETAIL%ROWTYPE,
							  p_interest_basis    IN Lftms_Product_Iccf.interest_basis%type,
                              p_Err_Code          IN OUT VARCHAR2,
                              p_Err_Params        IN OUT VARCHAR2)RETURN BOOLEAN;
    --OBCL_14.5_SLT_Auto_DD_SOFR
 --SLT_SOFR_Change end
END Tlpks_Tlcmemup_Utils;
/