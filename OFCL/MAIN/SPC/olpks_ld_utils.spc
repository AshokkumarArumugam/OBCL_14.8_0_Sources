CREATE OR REPLACE PACKAGE olpks_ld_utils AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_ld_utils.SPC
  **
  ** Module   : LOANS AND DEPOSITS
  **
  **
    This source is part of the Oracle Banking Corporate Lending  Software Product.
    Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------------------
  */

  /*
  change history
  
  07/02/2002  FCC 3.9 LATAM LD ENQUIRY FUNCTION.
                Function added to create the new advice LD_ENQUIRY, this will have interest accruals,
           tax, penalty calculated till on the projection date.
  
  25-FEB-2003 FCC4.2 APR 2003 LS changes for Commitment Utilization Revaluation
           -- Default parameter added to fn_get_prod_next_accr_dt
            p_process_indicator - 'A' for Accrual , 'R' for Revaluation
  
  23-Apr-2003 ITR2#37 Fcc4.2 OPS related changes..
             For accrual fee input the next accrual date calculation will be determined by the parameters specified
             at the contract level not based on the accrual parameters at the LD product level..
  25-OCT-2003  Fcc4.4 Dec 2003 FXMM Core Changes
  
  08-JUN-2005  Leo, CITILS addition fn_tranche_authstat
  04-AUG-2005 FCC 4.6.2 CITILS 04-AUG-2005 - Netting Changes
    -- Added new functions fn_get_tax_components, fn_get_int_component, PR_HANDLE_CONTRACT_EXCEPTION
  01-MAR-2006  PLC401000167 Flexcube V CL Release 7.1,
    1.FN_CHK_UNLOCK_LINKAGES  :- Problem :  Loan L1 and Loan L2 are linked to Commitment C1.
              Any change on L1 will possibly hit Commitment C1 and before authorizing L1,
              If L2 is changed and authorized so as to effect C1 then there will be two unauthorized events hitting C1.
              Now if L1 event is deleted then effect of L2 wont take effect.
              Not to allow any change on C1 or any linked Loan Like L2 if L1 is unauthorized.
  
    2.FN_CHK_OUTSTANDING_PRINC
  25-APR-2012 Flexcube V.CL Release 7.11,FS Volume-01 Tag14 Pool Funds Functionality Changes - Added new function fn_chk_unlock_pool.
  31-SEP-2016 OFCL 12.2 -- Negative Interest Rate changes
  
  **Changed By         : Gomathi G
  **Date               : 24-OCT-2019
  **Change Description : HOOKS FOR OL ADVICES
  **Search String      : OBCL_14.3_BUG#29583867
  
  **Changed By         : Navoneel Nandan
  **Date               : 24-Jan-2022
  **Change Description : Allowing Negative Interest for Secondary and Penalty Interest Components
  **Search String      : Bug#33766795
  
     ------------------------------------------------------------------------------------------------------------------------------
 
  */

  g_Tbl_Cftm_Product_Iccf LFTM_PRODUCT_ICCF%ROWTYPE ;--OFCL 12.2 changes
  --OBCL_14.3_BUG#29583867 STARTS
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
   --OBCL_14.3_BUG#29583867 ENDS
  Function fn_add_months(p_date_in IN Date, p_months_shift IN Number) Return Date;

  FUNCTION fn_get_prod_next_accr_dt(p_product_code      IN oltms_product.product_code%type,
                                    p_current_date      IN Date,
                                    p_next_accr_dt      IN OUT Date,
                                    p_process_indicator IN CHAR := 'A' -- 25-FEB-2003 LS Change
                                    ) Return Boolean;

  --ITR2#37 Fcc4.2 OPS related changes starts

  FUNCTION Fn_get_contract_next_accr_dt(p_contract_ref_no IN oltbs_contract.contract_ref_no%Type,
                                        p_component       IN lftbs_contract_accr_fee.component%Type,
                                        p_current_date    IN Date,
                                        p_next_accr_dt    IN OUT Date,
                                        p_err_code        IN OUT Varchar2,
                                        p_err_param       IN OUT Varchar2) RETURN BOOLEAN;

  --ITR2#37 Fcc4.2 OPS related changes ends..

  FUNCTION fn_get_next_accr_dt(p_current_date    IN DATE,
                               p_acc_frequency   IN VARCHAR2,
                               p_acc_start_date  IN VARCHAR2,
                               p_acc_start_month IN VARCHAR2,
                               p_next_accr_dt    IN OUT DATE) Return Boolean;

  FUNCTION fn_get_date_time(pm_ApplDate IN date) RETURN date;

  FUNCTION fn_obtain_contract_lock(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                                   p_contract        IN OUT oltbs_contract%ROWTYPE,
                                   p_err_code        IN OUT ertbs_msgs.err_code%TYPE) RETURN BOOLEAN;

  FUNCTION fn_tenor_factor(p_start_date IN Date, p_end_date IN Date, p_calc_method IN Char) Return Number;

  --07/02/2002  FCC 3.9 LATAM LD ENQUIRY FUNCTION. starts here
  FUNCTION fn_enquiry_main(p_ts_ref_no  IN VARCHAR2,
                           p_value_date IN DATE,
                           p_dcn        OUT VARCHAR2,
                           p_errcodes   IN OUT VARCHAR2,
                           p_errparams  IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_enquiry_advice(p_out_dlymsg_record IN oltbs_dly_msg_out%ROWTYPE,
                             p_prop_date         IN DATE,
                             p_comps             IN VARCHAR2,
                             p_amount_due        IN VARCHAR2,
                             p_tda_comps         IN VARCHAR2,
                             p_tda_amount_due    IN VARCHAR2,
                             p_errcodes          IN OUT VARCHAR2) RETURN BOOLEAN;
  --07/02/2002  FCC 3.9 LATAM LD ENQUIRY FUNCTION. ends here

  --  25-OCT-2003  Fcc4.4 Dec 2003 FXMM Core Changes Start
  FUNCTION fn_obtain_contract_lock_custom(p_custom_ref_no IN oltbs_contract.custom_ref_no%TYPE,
                                          p_contract      IN OUT oltbs_contract%ROWTYPE,
                                          p_err_code      IN OUT ertbs_msgs.err_code%TYPE) RETURN boolean;
  --  25-OCT-2003  Fcc4.4 Dec 2003 FXMM Core Changes End

  --Leo, CITILS addition
  FUNCTION fn_tranche_authstat(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                               p_error_code      OUT ertbs_msgs.err_code%TYPE,
                               p_error_param     OUT VARCHAR2) RETURN BOOLEAN;
  --Leo, CITILS addition till here

  -- 04-AUG-2005 FCC 4.6.2 CITILS 04-AUG-2005 - Netting Changes Start
  PROCEDURE PR_HANDLE_CONTRACT_EXCEPTION(p_contract_ref_no IN oltbs_contract.contract_ref_no%type,
                                         p_event_seq_no    IN oltbs_contract.latest_event_seq_no%type,
                                         p_event_code      IN oltbs_contract_event_log.event_code%type,
                                         p_counterparty    IN oltbs_contract.counterparty%type,
                                         p_err_code        IN ertbs_msgs.err_code%type,
                                         p_module          IN oltbs_contract.module_code%type,
                                         p_err_params      IN VARCHAR2,
                                         p_source          IN VARCHAR2,
                                         p_ora_error       IN VARCHAR2,
                                         p_ora_msg         IN VARCHAR2);

  Function fn_get_tax_components(p_contract_ref_no    IN varchar2,
                                 p_value_date         IN date,
                                 p_interest_component IN varchar2,
                                 p_tax_components     OUT varchar2) return boolean;

  Function fn_get_int_component(p_contract_ref_no IN varchar2, p_component IN varchar2) return varchar2;
  -- 04-AUG-2005 FCC 4.6.2 CITILS 04-AUG-2005 - Netting Changes End
  --PLC401000167 Flexcube V CL Release 7.1, starts
  FUNCTION FN_CHK_UNLOCK_LINKAGES(p_contract_ref_no   IN oltbs_contract.contract_ref_no%TYPE,
                                  p_latest_version_no IN oltbs_contract.latest_version_no%TYPE,
                                  p_product_type      IN oltbs_contract.product_type%TYPE,
                                  p_event             IN oltbs_contract.curr_event_code%TYPE,
                                  p_error_code        IN OUT VARCHAR2,
                                  p_error_parameter   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION FN_CHK_OUTSTANDING_PRINC(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                                    p_product_type    IN oltbs_contract.product_type%TYPE,
                                    p_error_code      IN OUT VARCHAR2,
                                    p_error_parameter IN OUT VARCHAR2) RETURN BOOLEAN;
  --PLC401000167 Flexcube V CL Release 7.1, ends

  --25-APR-2012 Flexcube V.CL Release 7.11,FS Volume-01 Tag14 Pool Funds Functionality Changes Ends
  FUNCTION fn_chk_unlock_pool(p_funding_ref_no  IN oltms_pool_funding_master.funding_ref_no%TYPE,
                              p_error_code      IN OUT VARCHAR2,
                              p_error_parameter IN OUT VARCHAR2) RETURN BOOLEAN;
  --25-APR-2012 Flexcube V.CL Release 7.11,FS Volume-01 Tag14 Pool Funds Functionality Changes Ends

  FUNCTION fn_rate_format_validation(i_field_value VARCHAR2) RETURN BOOLEAN;

  --Function to check any spl char input in the text field
  FUNCTION fn_chk_spl_chars(p_field_value IN VARCHAR2, p_Err_Code IN OUT VARCHAR2) RETURN BOOLEAN;

  --Function to get the event description from oltbs_event
  Function fn_get_event_desc(p_event_code IN oltbs_event.event_code%type, p_module IN oltbs_event.module%type) RETURN VARCHAR2;
--OFCL 12.2 changes start  
FUNCTION Fn_Get_Cftm_Prod_Iccf_Rec_Frc(p_Product_Code IN VARCHAR2) RETURN LFTM_PRODUCT_ICCF%ROWTYPE Result_Cache;
FUNCTION Fn_Get_Cftm_Prod_Iccf_Rec_Wrp(p_Product_Code IN VARCHAR2,
                                     p_err_code IN OUT VARCHAR2,
                                     p_err_param IN OUT VARCHAR2) RETURN BOOLEAN;
--OFCL 12.2 changes end  
--Bug#33766795 starts
FUNCTION fn_is_neg_comp(p_Product_Code IN VARCHAR2, 
                        p_component_list IN VARCHAR2 DEFAULT '***',
                        p_comp_type IN VARCHAR2 DEFAULT 'N'--P-Positive N-Negative
                        )
  RETURN BOOLEAN ;
--Bug#33766795 ends
End olpks_ld_utils;
/
CREATE  or replace SYNONYM olpkss_ld_utils FOR olpks_ld_utils
/