CREATE OR REPLACE PACKAGE tlpks_tldtdupl_utils AS
  /*-----------------------------------------------------------------------------------------------------
    **
    ** File Name  : tlpks_tldtdupl_utils.spc
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
  tlpks_tldtdupl_utils
  
    Changed By         : Jayaram N
    Changed On         : 12-May-2022
    Search String      : Bug#34158992
    Change Reason      : TLDTDUPL- EXPECTED TRADE SETTLEMENTS PROVIDED BY THE USERS ARE GETTING OVERWRITTEN WITH THE DEFAULT DAYS ISSUE
    -------------------------------------------------------------------------------------------------------
    */

  g_Prm_Trd_Amnt_Change_Allowd  VARCHAR2(40);
  g_Prm_Curr_Cusip              VARCHAR2(40) := NULL;
  g_Prm_Flat_Dcf_Coc            VARCHAR2(40) := 'N';
  g_Prm_Rowid                   VARCHAR2(40);
  g_Prm_Application_Date        DATE;
  g_Prm_Non_Lead_Tr             VARCHAR2(40);
  g_Prm_Orig_Amt_Defaulted      VARCHAR2(40) := 'Y';
 g_prm_fac_name_defaulted sttm_core_customer.customer_name1%TYPE := 'Y';
  g_Prm_Agency_Defaulted        VARCHAR2(40) := 'Y';
  --g_Prm_Expt_Stl_Date_Defaulted VARCHAR2(40) := 'Y'; --Bug#34158992:Commented
  g_Prm_Expt_Stl_Date_Defaulted VARCHAR2(40) := 'N';  --Bug#34158992:Added
  g_Prm_Vld_Cusip_Qry           VARCHAR2(40);
  g_Firm_Acct_Mnemonic          Oltms_Firmac_Mapping.Firm_Acct_Mnemonic%TYPE;
  g_Enrich                      VARCHAR2(1) := 'N';

  FUNCTION Fn_Default_And_Validate(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_Child_Function   IN VARCHAR2,
                                   p_Tldtdupl         IN Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                                   p_Prev_Tldtdupl    IN OUT Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                                   p_Wrk_Tldtdupl     IN OUT Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  ---SAVE
  FUNCTION Fn_Save(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Child_Function   IN VARCHAR2,
                   p_Tldtdupl         IN Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                   p_Prev_Tldtdupl    IN Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                   p_Wrk_Tldtdupl     IN OUT Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  --SAVE

  ---DELETE
  FUNCTION Fn_Delete(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Child_Function   IN VARCHAR2,
                     p_Tldtdupl         IN Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                     p_Prev_Tldtdupl    IN Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                     p_Wrk_Tldtdupl     IN OUT Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  --DELETE

  ---UNLOCK
  FUNCTION Fn_Unlock(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Tldtdupl         IN Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                     p_Prev_Tldtdupl    IN OUT Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                     p_Wrk_Tldtdupl     IN OUT Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  --UNLOCK
  FUNCTION Fn_Amend(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    p_Tldtdupl         IN Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                    p_Prev_Tldtdupl    IN OUT Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                    p_Wrk_Tldtdupl     IN OUT Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  ---Fn_Product_Default
  FUNCTION Fn_Product_Default(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_Tldtdupl         IN Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                              p_Wrk_Tldtdupl     IN OUT Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --Fn_Product_Default
  FUNCTION Fn_Auto_Auth(p_Source           IN VARCHAR2,
                        p_Source_Operation IN VARCHAR2,
                        p_Function_Id      IN VARCHAR2,
                        p_Action_Code      IN VARCHAR2,
                        p_Tldtdupl         IN Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                        p_Wrk_Tldtdupl     IN OUT Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                        p_Err_Code         IN OUT VARCHAR2,
                        p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Enrich(p_Source           IN VARCHAR2,
                     p_Source_Operation IN VARCHAR2,
                     p_Function_Id      IN VARCHAR2,
                     p_Action_Code      IN VARCHAR2,
                     p_Tldtdupl         IN Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                     p_Prev_Tldtdupl    IN Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                     p_Wrk_Tldtdupl     IN OUT Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                     p_Err_Code         IN OUT VARCHAR2,
                     p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Copy(p_Source           IN VARCHAR2,
                   p_Source_Operation IN VARCHAR2,
                   p_Function_Id      IN VARCHAR2,
                   p_Action_Code      IN VARCHAR2,
                   p_Tldtdupl         IN Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                   p_Prev_Tldtdupl    IN Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                   p_Wrk_Tldtdupl     IN OUT Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                   p_Err_Code         IN OUT VARCHAR2,
                   p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_Query(p_Source           IN VARCHAR2,
                    p_Source_Operation IN VARCHAR2,
                    p_Function_Id      IN VARCHAR2,
                    p_Action_Code      IN VARCHAR2,
                    p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                    p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                    p_Qrydata_Reqd     IN VARCHAR2,
                    p_Tldtdupl         IN Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                    p_Wrk_Tldtdupl     IN OUT Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                    p_Err_Code         IN OUT VARCHAR2,
                    p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
					
 --BUG#30003669  starts
  FUNCTION fn_populate_exceptions(p_Source           IN VARCHAR2,
                                  p_Source_Operation IN VARCHAR2,
                                  p_Function_Id      IN VARCHAR2,
                                  p_Action_Code      IN VARCHAR2,
                                  p_Tldtdupl         IN Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                                  p_Prev_Tldtdupl    IN Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                                  p_Wrk_Tldtdupl     IN OUT Tlpks_Tldtdupl_Main.Ty_Tldtdupl,
                                  p_Err_Code         IN OUT VARCHAR2,
                                  p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
	--BUG#30003669 ends 
END tlpks_tldtdupl_utils;
/
CREATE OR REPLACE SYNONYM tlpkss_tldtdupl_utils FOR tlpks_tldtdupl_utils
/