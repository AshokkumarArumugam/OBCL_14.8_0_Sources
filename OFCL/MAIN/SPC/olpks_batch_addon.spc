CREATE OR REPLACE PACKAGE olpks_batch_addon AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_batch_addon.SPC
  **
  ** Module   : LOANS and DEPOSITS
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

  /* CHANGE HISTORY
  25-FEB-2003 FCC4.2 APR 2003 LS changes for Commitment Utilization Revaluation
           -- Default parameter has been added to fn_get_accrual_processing_date
              p_process_indicator - 'A' for Accrual, 'R' for Revaluation
  
  23-Apr-2003 ITR2#37 Fcc4.2 OPS related changes..Added new parameter in fn_get_accrual_processing_date..
  
  */

  FUNCTION fn_check_concurrency(p_processing_branch  IN oltbs_contract.branch%TYPE,
                                p_module             IN oltbs_contract.module_code%TYPE,
                                p_current_sms_seq_no IN number,
                                p_error_code         IN OUT varchar2)
    RETURN BOOLEAN;

  FUNCTION fn_setup_process_queue(p_module IN oltbs_contract.module_code%TYPE,
                                  --OFCL 12.3 changes starts
                                  p_eoc_group IN sttms_core_branch_status.end_of_input%TYPE,
                                  --OFCL 12.3 changes ends
                                  p_previous_process_till_date IN date,
                                  p_current_process_till_date  IN date,
                                  p_parallelize_auto_function  IN oltbs_auto_function_setup.parallelize_auto_function%TYPE,
                                  p_error_code                 IN OUT varchar2,
                                  p_error_parameter            IN OUT varchar2)
    RETURN boolean;

  --ITR2#37 Fcc4.2 OPS related changes starts..Added two new parameter p_contract_ref_no and p_component

  FUNCTION fn_get_accrual_processing_date(p_module IN oltbs_contract.module_code%TYPE,
                                          --OFCL 12.3 changes starts
                                          p_eoc_group IN sttms_core_branch_status.end_of_input%TYPE,
                                          --OFCL 12.3 changes ends
                                          p_previous_process_till_date IN date,
                                          p_current_process_till_date  IN date,
                                          p_product                    IN oltbs_contract.product_code%TYPE,
                                          p_accrual_processing_date    OUT date,
                                          p_error_code                 IN OUT varchar2,
                                          p_error_parameter            IN OUT varchar2,
                                          p_process_indicator          IN CHAR := 'A', -- 25-FEB-2003 LS change
                                          p_contract_ref_no            IN oltbs_contract.contract_ref_no%TYPE DEFAULT NULL,
                                          p_component                  IN lftbs_contract_accr_fee.Component%TYPE DEFAULT NULL)
    RETURN BOOLEAN;

  --ITR2#37 Fcc4.2 OPS related changes ends

  FUNCTION fn_flush_error_log(p_module          IN oltbs_contract.module_code%TYPE,
                              p_error_code      IN OUT varchar2,
                              p_error_parameter IN OUT varchar2)
    RETURN boolean;

  FUNCTION fn_repair_aborted_tasks(p_module          IN oltbs_contract.module_code%TYPE,
                                   p_error_code      IN OUT varchar2,
                                   p_error_parameter IN OUT varchar2)
    RETURN boolean;

  FUNCTION fn_unmark_eoti(p_processing_branch  IN oltbs_contract.branch%TYPE,
                          p_current_sms_seq_no IN number,
                          p_error_code         IN OUT varchar2)
    RETURN boolean;

END olpks_batch_addon;
/
Create or replace synonym olpkss_batch_addon for olpks_batch_addon
/