CREATE OR REPLACE PACKAGE lfpks_lfdfeelq_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lfpks_lfdfeelq_utils.spc
  **
  ** Module     : The ICCF
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

  g_prm_date_changed  CHAR(1) := 'N';
  g_prm_future_dated  CHAR(1) := 'N';
  g_prm_overpayment   CHAR(1);
  g_prm_advices       VARCHAR2(200) := 'FALSE';
  g_prm_paid_validate VARCHAR2(200) := 'FALSE';
  g_prm_fee_ratio     VARCHAR2(200);
  g_prm_allocate      VARCHAR2(10);

  FUNCTION Fn_Get_Versionno(p_Contract_Ref_No IN VARCHAR2,
                            p_Version_No      IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Get_Liqdorder(p_Contract_Ref_No IN VARCHAR2,
                            p_Order           OUT NUMBER,
                            p_Liqd_Order      IN OUT NUMBER) RETURN BOOLEAN;

  FUNCTION Fn_Date_Validations(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_Wrk_lfdfeelq     IN lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Populate_Liq_Summary(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Wrk_lfdfeelq     IN OUT lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Validate_Future_Fliq(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Wrk_lfdfeelq     IN lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Ins_Liq(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_Wrk_lfdfeelq     IN lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Validate_Paid(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Wrk_lfdfeelq     IN lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Schedule_Check(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_wrk_lfdfeelq     IN lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Check_Atleast_One_Fee_Paid(p_Source           IN VARCHAR2,
                                         p_Source_Operation IN VARCHAR2,
                                         p_Function_Id      IN VARCHAR2,
                                         p_Action_Code      IN VARCHAR2,
                                         p_Wrk_lfdfeelq     IN lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                                         p_Err_Code         IN OUT VARCHAR2,
                                         p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  /*  FUNCTION Fn_Repop_Liq(p_Source           IN VARCHAR2,
  p_Source_Operation IN VARCHAR2,
  p_Function_Id      IN VARCHAR2,
  p_Action_Code      IN VARCHAR2,
  p_Wrk_lfdfeelq     IN lfpks_lfdfeelq_Main.Ty_lfdfeelq,
  p_Err_Code         IN OUT VARCHAR2,
  p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;*/

  FUNCTION Fn_insert_part_ratio(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Wrk_lfdfeelq     IN OUT lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Pop_Fee_Bps(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Wrk_lfdfeelq     IN OUT lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Update_Liq(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN VARCHAR2,
                         p_Wrk_lfdfeelq     IN lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Check_Fee_Bps_App(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Wrk_lfdfeelq     IN lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN VARCHAR2;

  FUNCTION fn_get_transfer_avl_part(p_Source           IN VARCHAR2,
                                    p_Source_Operation IN VARCHAR2,
                                    p_Function_Id      IN VARCHAR2,
                                    p_Action_Code      IN VARCHAR2,
                                    p_Wrk_lfdfeelq     IN OUT lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                                    p_Err_Code         IN OUT VARCHAR2,
                                    p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Acc_entry(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Wrk_lfdfeelq     IN lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Validations(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Child_Function   IN VARCHAR2,
                          p_lfdfeelq         IN lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                          p_Prev_lfdfeelq    IN OUT lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                          p_Wrk_lfdfeelq     IN OUT lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Delete(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Child_Function   IN VARCHAR2,
                     p_lfdfeelq         IN lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                     p_Wrk_lfdfeelq     IN OUT lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Reverse(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_Child_Function   IN VARCHAR2,
                      p_lfdfeelq         IN lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                      p_Wrk_lfdfeelq     IN OUT lfpks_lfdfeelq_Main.Ty_lfdfeelq,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
END lfpks_lfdfeelq_utils;
/
CREATE OR REPLACE SYNONYM lfpkss_lfdfeelq_utils FOR lfpks_lfdfeelq_utils
/