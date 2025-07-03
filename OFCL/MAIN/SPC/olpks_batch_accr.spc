CREATE OR REPLACE PACKAGE olpks_batch_accr AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_accrual_batch.SPC
  **
  ** Module    : LOANS AND DEPOSITS
  **
    This source is part of the Oracle Banking Corporate Lending  Software Product.
    Copyright ? 2019 , Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------------------
  */

  /*----------------------------------CHANGE HISTORY----------------------------------
  
  Created By   : Krithika G
  Description  : OBCL_14.0_EOD_Changes
  
  ------------------------------------END CHANGE HISTORY-------------------------------------
    */

  TYPE iccf_struct IS RECORD(
    component                  oltbs_contract_iccf_details.component%TYPE,
    component_ccy              oltbs_contract_iccf_details.component_currency%TYPE,
    payment_method             oltbs_contract_iccf_details.payment_method%TYPE,
    previous_accrual_to_date   date,
    previous_till_date_accrual oltbs_contract_iccf_details.till_date_accrual%TYPE,
    total_amount_liquidated    oltbs_contract_iccf_details.total_amount_liquidated%TYPE,
    current_till_date_accrual  oltbs_contract_iccf_details.till_date_accrual%TYPE,
    current_net_accrual        oltbs_contract_iccf_details.current_net_accrual%TYPE,
    accrual_ref_no             oltbs_contract_iccf_details.previous_accrual_ref_no%TYPE);

  TYPE contract_struct IS RECORD(
    module              oltbs_contract.module_code%TYPE,
    product             oltbs_contract.product_code%TYPE,
    product_type        oltbs_contract.product_type%TYPE,
    latest_event_seq_no oltbs_contract.latest_event_seq_no%TYPE,
    latest_version_no   oltbs_contract.latest_version_no%TYPE,
    contract_status     oltbs_contract.contract_status%TYPE,
    user_defined_status oltbs_contract.user_defined_status%TYPE,
    customer            oltbs_contract.counterparty%TYPE,
    contract_ccy        oltbs_contract.contract_ccy%TYPE,
    book_date           date,
    value_date          date,
    maturity_type       oltbs_contract_master.maturity_type%TYPE,
    memo_accruals       oltms_product_status_master.memo_accruals%TYPE,
    limit_track_reqd    oltbs_contract_master.limit_track_reqd%TYPE);

  --Type for accrue for a product sch
  TYPE active_contract_record IS RECORD(
    user_defined_status oltbs_contract.USER_DEFINED_STATUS%TYPE,
    contract_ref_no     oltbs_contract.CONTRACT_REF_NO%TYPE,
    product_type        oltbs_contract.PRODUCT_TYPE%TYPE,
    latest_event_seq_no oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
    latest_version_no   oltbs_contract.LATEST_VERSION_NO%TYPE,
    counterparty        oltbs_contract.COUNTERPARTY%TYPE,
    contract_currency   oltbs_contract.CONTRACT_CCY%TYPE,
    contract_status     oltbs_contract.CONTRACT_STATUS%TYPE,
    contract_book_date  oltbs_contract_master.BOOKING_DATE%TYPE,
    contract_value_date oltbs_contract_master.VALUE_DATE%TYPE,
    Job_Picked_Up       CHAR(1),
    stop_accrual_flag   CHAR(1));

  TYPE REF_ACTIVE_CONTRACTS IS REF CURSOR RETURN active_contract_record;

  --Type for Accrue for a product
  TYPE Active_Contract_Record_Prod IS RECORD(
    user_defined_status oltbs_contract.USER_DEFINED_STATUS%TYPE,
    contract_ref_no     oltbs_contract.CONTRACT_REF_NO%TYPE,
    product_type        oltbs_contract.PRODUCT_TYPE%TYPE,
    latest_event_seq_no oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
    latest_version_no   oltbs_contract.LATEST_VERSION_NO%TYPE,
    counterparty        oltbs_contract.COUNTERPARTY%TYPE,
    contract_currency   oltbs_contract.CONTRACT_CCY%TYPE,
    contract_status     oltbs_contract.CONTRACT_STATUS%TYPE,
    contract_book_date  oltbs_contract_master.BOOKING_DATE%TYPE,
    contract_value_date oltbs_contract_master.VALUE_DATE%TYPE,
    Job_Picked_Up       CHAR(1),
    stop_accrual_flag   CHAR(1),
    memo_accrual_flag   CHAR(1),
    maturity_type       oltbs_contract_master.MATURITY_TYPE%TYPE,
    main_comp           oltbs_contract_master.main_comp%TYPE,
    limit_track_reqd    oltbs_contract_master.limit_track_reqd%TYPE);

  --Type for Accrue for product for Fee
  TYPE Active_Contracts IS RECORD(
    user_defined_status oltbs_contract.USER_DEFINED_STATUS%TYPE,
    module              oltbs_contract.module_Code%TYPE,
    contract_ref_no     oltbs_contract.contract_ref_no%TYPE,
    product_type        oltbs_contract.product_type%TYPE,
    latest_event_seq_no oltbs_contract.latest_event_seq_no%TYPE,
    latest_version_no   oltbs_contract.latest_version_no%TYPE,
    contract_status     oltbs_contract.contract_status%TYPE,
    stop_accruals       oltms_product_status_master.stop_accrual_fee%TYPE);

  TYPE REF_ACTIVE_CONTRACTS_PROD IS REF CURSOR RETURN Active_Contract_Record_Prod;

  FUNCTION fn_accrue_for_a_product_sch(p_accrual_level   IN oltms_branch_parameters.accrual_level%TYPE,
                                       p_processing_date IN date,
                                       p_accrual_to_date IN date,
                                       p_accrual_ref_no  IN oltbs_auto_function_details.current_accrual_ref_no%TYPE,
                                       p_contract_ref_no IN oltbs_contract.CONTRACT_REF_NO%TYPE,
                                       p_Ty_Cont         IN VARCHAR2,
                                       p_Branch          IN Oltbs_Contract.Branch%TYPE,
                                       p_User_Id         IN VARCHAR2,
                                       p_ELCM_MSGID      OUT VARCHAR2,
                                       p_error_code      IN OUT varchar2,
                                       p_error_parameter IN OUT varchar2)
    RETURN VARCHAR2;

  FUNCTION Fn_accrue_for_a_product(p_accrual_ref_no               IN oltbs_auto_function_details.current_accrual_ref_no%TYPE,
                                   p_processing_date              IN date,
                                   p_accrual_to_date              IN date,
                                   p_error_code                   IN OUT varchar2,
                                   p_error_parameter              IN OUT varchar2,
                                   p_contract_ref_no              IN oltbs_contract.CONTRACT_REF_NO%TYPE,
                                   p_Ty_Cont                      IN VARCHAR2,
                                   p_Branch                       IN Oltbs_Contract.Branch%TYPE,
                                   p_User_Id                      IN VARCHAR2,
                                   p_ELCM_MSGID                   OUT VARCHAR2/*,
                                   p_previous_user_defined_status IN OUT oltbs_contract.user_defined_status%TYPE*/)
    RETURN VARCHAR2;

  FUNCTION Fn_accrue_fee_for_a_product(p_product             IN oltbs_contract.product_code%TYPE,
                                       p_module              IN oltbs_contract.module_code%TYPE,
                                       p_processing_date     IN DATE,
                                       p_accrual_to_date     IN DATE,
                                       p_accrual_ref_no      IN oltbs_auto_function_details.current_accrual_ref_no%TYPE,
                                       p_memo_accrual        IN VARCHAR2,
                                       p_accrual_level       IN oltms_branch_parameters.accrual_level%TYPE,
                                       p_include_stop_status IN VARCHAr2,
                                       p_Ty_Cont             IN VARCHAR2,
                                       p_Branch              IN Oltbs_Contract.Branch%TYPE,
                                       p_User_Id             IN VARCHAR2,
                                       p_ELCM_MSGID          OUT VARCHAR2,
                                       p_error_code          IN OUT VARCHAR2,
                                       p_error_parameter     IN OUT VARCHAR2)
    RETURN VARCHAR2;


FUNCTION fn_pass_product_level_entries(p_module           IN oltbs_contract.module_code%TYPE,
                                         p_accrual_ref_no   IN oltbs_auto_function_details.current_accrual_ref_no%TYPE,
                                         p_processing_date  IN date,
                                         p_accrual_to_date  IN date,
                                         p_product          IN oltbs_contract.product_code%TYPE,
                                         p_commit_frequency IN oltbs_automatic_process_master.eod_commit_count%TYPE,
                                         p_error_code       IN OUT varchar2,
                                         p_error_parameter  IN OUT varchar2)
    RETURN VARCHAR2;
    
FUNCTION fn_pass_product_level_fee_entries(p_module           IN oltbs_contract.module_code%TYPE,
                                         p_accrual_ref_no   IN oltbs_auto_function_details.current_accrual_ref_no%TYPE,
                                         p_processing_date  IN DATE,
                                         p_accrual_to_date  IN DATE,
                                         p_product          IN oltbs_contract.product_code%TYPE,
                                         p_commit_frequency IN oltbs_automatic_process_master.eod_commit_count%TYPE,
                                         p_error_code       IN OUT VARCHAR2,
                                         p_error_parameter  IN OUT VARCHAR2)
    RETURN VARCHAR2;

END olpks_batch_accr;
/
CREATE OR REPLACE Synonym olpkss_batch_accr FOR olpks_batch_accr
/