CREATE OR REPLACE PACKAGE olpks_oldfeelq_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_oldfeelq_utils.spc
  **
  ** Module     : Syndication Loans and Commitments
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright (R) 2008,2019 , Oracle and/or its affiliates.  All rights reserved
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
  
    **Changed By         : Chandra Achuta
	**Date               : 09-AUG-2024
	**Change Description : Added code to populate the settlement account details according to page version.
	**Search String      : Bug#36865856  
  -------------------------------------------------------------------------------------------------------
  */
  g_prm_overpayment   CHAR(1);
  g_prm_date_changed  CHAR(1) := 'N';
  g_prm_future_dated  CHAR(1) := 'N';
  g_prm_paid_validate VARCHAR2(200) := 'FALSE';
  g_prm_fee_ratio     VARCHAR2(200);
  g_prm_allocate      VARCHAR2(10);
  g_page_version_esn_fliq        NUMBER;    --Bug#36865856   Code Added
  FUNCTION Fn_Log_Override(p_Source       IN VARCHAR2,
                           p_Function_Id  IN VARCHAR2,
                           p_Action_Code  IN VARCHAR2,
                           p_Wrk_oldfeelq IN OUT olpks_oldfeelq_main.Ty_oldfeelq,
                           p_Err_Code     IN OUT VARCHAR2,
                           p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Get_Versionno(p_Contract_Ref_No IN VARCHAR2,
                            p_Version_No      IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Get_Liqdorder(p_Contract_Ref_No IN VARCHAR2,
                            p_Order           OUT NUMBER,
                            p_Liqd_Order      IN OUT NUMBER) RETURN BOOLEAN;
  FUNCTION Fn_Schedule_Check(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_wrk_oldfeelq     IN olpks_oldfeelq_main.Ty_oldfeelq,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Check_Atleast_One_Fee_Paid(p_Source           IN VARCHAR2,
                                         p_Source_Operation IN VARCHAR2,
                                         p_Function_Id      IN VARCHAR2,
                                         p_Action_Code      IN VARCHAR2,
                                         p_Wrk_oldfeelq     IN olpks_oldfeelq_main.Ty_oldfeelq,
                                         p_Err_Code         IN OUT VARCHAR2,
                                         p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Validate_Paid(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Wrk_oldfeelq     IN olpks_oldfeelq_main.Ty_oldfeelq,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Validate_Future_Fliq(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Wrk_oldfeelq     IN olpks_oldfeelq_main.Ty_oldfeelq,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Populate_Liq_Summary(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Wrk_oldfeelq     IN OUT olpks_oldfeelq_main.Ty_oldfeelq,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Date_Validations(p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2,
                               p_Wrk_oldfeelq     IN olpks_oldfeelq_main.Ty_oldfeelq,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_Check_Fee_Bps_App(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Wrk_oldfeelq     IN olpks_oldfeelq_main.Ty_oldfeelq,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN VARCHAR2;
  FUNCTION Fn_Ins_Liq(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_Wrk_oldfeelq     IN olpks_oldfeelq_main.Ty_oldfeelq,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Update_Liq(p_Source           IN VARCHAR2,
                         p_Source_Operation IN VARCHAR2,
                         p_Function_Id      IN VARCHAR2,
                         p_Action_Code      IN VARCHAR2,
                         p_Wrk_oldfeelq     IN olpks_oldfeelq_main.Ty_oldfeelq,
                         p_Err_Code         IN OUT VARCHAR2,
                         p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Acc_entry(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Wrk_oldfeelq     IN olpks_oldfeelq_main.Ty_oldfeelq,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Validations(p_Source           IN VARCHAR2,
                          p_Source_Operation IN VARCHAR2,
                          p_Function_Id      IN VARCHAR2,
                          p_Action_Code      IN VARCHAR2,
                          p_Child_Function   IN VARCHAR2,
                          p_oldfeelq         IN olpks_oldfeelq_main.Ty_oldfeelq,
                          p_Prev_oldfeelq    IN OUT olpks_oldfeelq_main.Ty_oldfeelq,
                          p_Wrk_oldfeelq     IN OUT olpks_oldfeelq_main.Ty_oldfeelq,
                          p_Err_Code         IN OUT VARCHAR2,
                          p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Delete(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Child_Function   IN VARCHAR2,
                     p_oldfeelq         IN olpks_oldfeelq_main.Ty_oldfeelq,
                     p_Wrk_oldfeelq     IN OUT olpks_oldfeelq_main.Ty_oldfeelq,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Reverse(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_Child_Function   IN VARCHAR2,
                      p_oldfeelq         IN olpks_oldfeelq_main.Ty_oldfeelq,
                      p_Wrk_oldfeelq     IN OUT olpks_oldfeelq_main.Ty_oldfeelq,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION fn_subsys_pickup(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_oldfeelq         IN olpks_oldfeelq_main.Ty_oldfeelq,
                            p_Prev_oldfeelq    IN olpks_oldfeelq_main.Ty_oldfeelq,
                            p_Wrk_oldfeelq     IN OUT olpks_oldfeelq_main.Ty_oldfeelq,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_subsys_upload(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_oldfeelq         IN olpks_oldfeelq_main.Ty_oldfeelq,
                            p_Prev_oldfeelq    IN olpks_oldfeelq_main.Ty_oldfeelq,
                            p_Wrk_oldfeelq     IN OUT olpks_oldfeelq_main.Ty_oldfeelq,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
END olpks_oldfeelq_utils;
/
CREATE OR REPLACE SYNONYM olpkss_oldfeelq_utils FOR olpks_oldfeelq_utils
/