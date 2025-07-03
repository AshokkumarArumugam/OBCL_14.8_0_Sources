CREATE OR REPLACE PACKAGE lbpks_lbdfeelq_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdfeelq_utils.spc
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

  SFR Number         : 29588590
  Changed By         : Srinivasulu Ch
  Change Description : Added changes for settlement pickup global declarartions
  Search string      : Bug#29588590

  -------------------------------------------------------------------------------------------------------
  */

  g_prm_date_changed  CHAR(1) := 'N';
  g_prm_future_dated  CHAR(1) := 'N';
  g_prm_overpayment   CHAR(1);
  g_prm_advices       VARCHAR2(200) := 'FALSE';
  g_prm_paid_validate VARCHAR2(200) := 'FALSE';
  g_prm_fee_ratio     VARCHAR2(200);
  g_prm_allocate      VARCHAR2(10);
  g_settlement_processed CHAR(1) := 'N'; --- Added Bug#29588590
  
  FUNCTION Fn_Get_Versionno(p_Contract_Ref_No IN VARCHAR2,
                            p_Version_No      IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Get_Liqdorder(p_Contract_Ref_No IN VARCHAR2,
                            p_Order           OUT NUMBER,
                            p_Liqd_Order      IN OUT NUMBER) RETURN BOOLEAN;

  FUNCTION Fn_Date_Validations(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_Wrk_lbdfeelq     IN lbpks_lbdfeelq_main.Ty_lbdfeelq,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Populate_Liq_Summary(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Wrk_lbdfeelq     IN OUT lbpks_lbdfeelq_main.Ty_lbdfeelq,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Validate_Future_Fliq(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Wrk_lbdfeelq     IN lbpks_lbdfeelq_main.Ty_lbdfeelq,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Ins_Liq(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_Wrk_lbdfeelq     IN lbpks_lbdfeelq_main.Ty_lbdfeelq,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Validate_Paid(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Wrk_lbdfeelq     IN lbpks_lbdfeelq_main.Ty_lbdfeelq,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Schedule_Check(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_wrk_lbdfeelq     IN lbpks_lbdfeelq_main.Ty_lbdfeelq,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Check_Atleast_One_Fee_Paid(p_Source           IN VARCHAR2,
                                         p_Source_Operation IN VARCHAR2,
                                         p_Function_Id      IN VARCHAR2,
                                         p_Action_Code      IN VARCHAR2,
                                         p_Wrk_lbdfeelq     IN lbpks_lbdfeelq_main.Ty_lbdfeelq,
                                         p_Err_Code         IN OUT VARCHAR2,
                                         p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  /*  FUNCTION Fn_Repop_Liq(p_Source           IN VARCHAR2,
  p_Source_Operation IN VARCHAR2,
  p_Function_Id      IN VARCHAR2,
  p_Action_Code      IN VARCHAR2,
  p_Wrk_lbdfeelq     IN lbpks_lbdfeelq_main.Ty_lbdfeelq,
  p_Err_Code         IN OUT VARCHAR2,
  p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;*/

  FUNCTION Fn_insert_part_ratio(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Wrk_lbdfeelq     IN OUT lbpks_lbdfeelq_main.Ty_lbdfeelq,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pop_Fee_Bps(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Wrk_lbdfeelq     IN OUT lbpks_lbdfeelq_main.Ty_lbdfeelq,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Update_Liq(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN VARCHAR2,
                         p_Wrk_lbdfeelq     IN lbpks_lbdfeelq_main.Ty_lbdfeelq,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Check_Fee_Bps_App(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Wrk_lbdfeelq     IN lbpks_lbdfeelq_main.Ty_lbdfeelq,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN VARCHAR2;

  FUNCTION Fn_Get_Transfer_Avl_Part(p_Source           IN VARCHAR2,
                                    p_Source_Operation IN VARCHAR2,
                                    p_Function_Id      IN VARCHAR2,
                                    p_Action_Code      IN VARCHAR2,
                                    p_Wrk_lbdfeelq     IN OUT lbpks_lbdfeelq_main.Ty_lbdfeelq,
                                    p_Err_Code         IN OUT VARCHAR2,
                                    p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Acc_entry(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Wrk_lbdfeelq     IN lbpks_lbdfeelq_main.Ty_lbdfeelq,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Validations(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Child_Function   IN VARCHAR2,
                          p_lbdfeelq         IN lbpks_lbdfeelq_main.Ty_lbdfeelq,
                          p_Prev_lbdfeelq    IN OUT lbpks_lbdfeelq_main.Ty_lbdfeelq,
                          p_Wrk_lbdfeelq     IN OUT lbpks_lbdfeelq_main.Ty_lbdfeelq,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Delete(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Child_Function   IN VARCHAR2,
                     p_lbdfeelq         IN lbpks_lbdfeelq_main.Ty_lbdfeelq,
                     p_Wrk_lbdfeelq     IN OUT lbpks_lbdfeelq_main.Ty_lbdfeelq,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Reverse(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_Child_Function   IN VARCHAR2,
                      p_lbdfeelq         IN lbpks_lbdfeelq_main.Ty_lbdfeelq,
                      p_Wrk_lbdfeelq     IN OUT lbpks_lbdfeelq_main.Ty_lbdfeelq,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
	g_sbf_feeacr_manual_fliq VARCHAR2(1) := 'N';
END lbpks_lbdfeelq_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdfeelq_utils FOR lbpks_lbdfeelq_utils
/