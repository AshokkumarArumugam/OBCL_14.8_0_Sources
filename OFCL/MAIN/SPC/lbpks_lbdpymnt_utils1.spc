CREATE OR REPLACE PACKAGE lbpks_lbdpymnt_utils1 AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdpymnt_utils1.spc
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

  SFR Number         :
  Changed By         :
  Change Description :

    Change Date        : 20-Apr-2019
    Search String      : 29659828
    Changed By         : Baljinder Singh
    Change Description : 29659828 - REVERSAL OF PREPAYMENT TRANSACTIONS PROPOGATION FAILURE. Prepayment case failure
	
	Changed By         : Surya Prabha S
    Changed On         : 14-Feb-2020
    Search String      : OBCL_14.4_LS_Multi_Auth
    Change Reason      : Multi Authorization changes.
    
  **Changed By         : Abhinav Kumar
  **Date               : 19-Jan-2023
  **Change Description : Added code for display proper settlement details in LBDPYMNT for page version.
  **Search String      : Bug#34977395
  
  **Changed By         : Arunprasath
  **Date               : 02-Apr-2024
  **Change Description : New function fn_get_roll_childcont_status added
  **Search String      : Bug#36438360
  
  -------------------------------------------------------------------------------------------------------
  */  
  g_delete_pmnt VARCHAR2(1) := 'N';
  g_discounted_pymt_rev VARCHAR2(1):='N';
  g_page_version_esn        NUMBER;    --Bug#34977395 Code Added
  g_roll_chld_cont_status VARCHAR2(1):= 'N'; --Bug#36438360  
  FUNCTION Fn_Save_Payment(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Function_Id      IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_Child_Function   IN VARCHAR2,
                                        p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Prev_lbdpymnt    IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

FUNCTION Fn_Save_Payment1(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Child_Function   IN VARCHAR2,
                           p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,/*
                           p_Prev_lbdpymnt    IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,*/
                           p_wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
						 
-- OBCL_14.4_LS_Multi_Auth changes starts
FUNCTION fn_auto_auth_validations(p_Source       IN VARCHAR2,
                                    p_Action_Code  IN VARCHAR2,
                                    p_Function_Id  IN VARCHAR2,
                                    p_wrk_lbdpymnt IN OUT lbpks_lbdpymnt_main.ty_lbdpymnt,
                                    p_Err_Code     IN OUT VARCHAR2,
                                    p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
-- OBCL_14.4_LS_Multi_Auth changes end

FUNCTION Fn_Unlock_Payment(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Child_Function   IN VARCHAR2,
                           p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Prev_lbdpymnt    IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;


FUNCTION Fn_Delete_Payment(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Child_Function   IN VARCHAR2,
                           p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Prev_lbdpymnt    IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION Fn_Reverse_Payment(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Child_Function   IN VARCHAR2,
                           p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Prev_lbdpymnt    IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION Fn_Contract_Reverse_Payment(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Child_Function   IN VARCHAR2,
                           p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Prev_lbdpymnt    IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION Fn_Authorise_Payment(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Child_Function   IN VARCHAR2,
                           p_lbdpymnt         IN lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Prev_lbdpymnt    IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_Main.Ty_lbdpymnt,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION Fn_Populate_Data(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_lbdpymnt         IN lbpks_lbdpymnt_main.ty_lbdpymnt,
                            p_wrk_lbdpymnt     IN OUT lbpks_lbdpymnt_main.ty_lbdpymnt,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    Return boolean;
  --Bug#36438360 Start
	FUNCTION fn_get_roll_childcont_status (p_contract_ref oltb_contract.contract_ref_no%Type,
                                           p_value_date oltb_contract_liq_summary.value_date%Type)
    RETURN BOOLEAN;
    --Bug#36438360 End
END lbpks_lbdpymnt_utils1;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdpymnt_utils1 FOR lbpks_lbdpymnt_utils1
/