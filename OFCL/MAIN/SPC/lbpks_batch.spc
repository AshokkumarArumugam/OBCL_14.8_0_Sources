CREATE OR REPLACE PACKAGE lbpks_batch AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_batch.SPC
  **
  ** Module   : Loan Syndication (LS)
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

  -- CHANGE HISTORY
  /*
  12-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#4,Retro Changes CITIUS-LS-801,To do the renewal process during batch in multiple background process because of the
              volume of renewals during quarter end
              Jun-2007, Rollover Job changes
              08-JUN-2007 RolloverJob new changes
  01-OCT-2008 FCC V.CL Release 7.4 RT Regression Testing-sep SFR#368 , procedure pr_ls_job_process was missing from the package though it was taken as part of retro in the package body..hence added that from US Site sources.
  03-OCT-2016 -- Search String : OFCL 12.3 changes 
  end_of_input column is fetched from sttms_core_branch_status instead of oltms_branch
  
   ** Modified By          : Baljinder Singh
   ** Modified On          : 11-AUG-2020
   ** Modified Reason      : Moving LB batch to JAVA for SOFR Changes
   ** Search String        : LB Batch moved to java SOFR
   
    Changed By         : Jayaram
    Changed On         : 29-Jul-2024
    Search String      : Bug#36892336
    Change Reason      : COMPOUNDING FREQUENCY NEEDED AT DD SCHEDULE LEVEL 
  */
  
  g_auto_compounding_process	VARCHAR2(1):= 'N'; --Bug#36892336:Added

  FUNCTION fn_process_for_a_day(p_module                    IN oltbs_contract.module_code%TYPE,
                                p_current_accrual_ref_no    IN OUT oltbs_auto_function_details.current_accrual_ref_no%TYPE,
                                p_parallelize_auto_function IN oltbs_auto_function_setup.parallelize_auto_function%TYPE,
                                p_processing_date           IN date,
                                p_error_code                IN OUT varchar2,
                                p_error_parameter           IN OUT varchar2)
    RETURN boolean;

  --FCC 4.5Lot1 London FX/MM FAST Changes start
  FUNCTION fn_parallel_fwd_init(pm_function_id IN VARCHAR2,
                                pm_module      IN oltbs_contract.module_code%TYPE,
                                pm_err_code    IN OUT VARCHAR2,
                                pm_params      IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_calculate_process_till_date(p_application_date  IN DATE,
                                          p_eoc_group         IN sttms_core_branch_status.end_of_input%TYPE, --OFCL 12.3 changes
                                          p_process_till_date OUT DATE,
                                          p_func_id           IN VARCHAR2,
                                          p_error_code        IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_previous_process_date(p_module          IN oltbs_contract.module_code%TYPE,
                                    p_prev_date       OUT DATE,
                                    p_error_code      IN OUT VARCHAR2,
                                    p_error_parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_parallel_liqd(pm_function_id IN VARCHAR2,
                            pm_module      IN oltbs_contract.module_code%TYPE,
                            pm_err_code    IN OUT VARCHAR2,
                            pm_params      IN OUT VARCHAR2) RETURN BOOLEAN;

  PROCEDURE pr_purge_job_state_tables;

  --FCC 4.5Lot1 London FX/MM FAST Changes end
  --12-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#4,Retro Changes CITIUS-LS-801 START
  FUNCTION Fn_Job_Submit(p_no_of_ls_jobs   IN NUMBER,
                         p_processing_date IN DATE,
                         p_module          IN VARCHAR2,
                         pErrorCode        IN OUT VARCHAR2) RETURN BOOLEAN;
  --12-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#4,Retro Changes CITIUS-LS-801 END

  --FCC V.CL Release 7.4 RT Regression Testing-sep SFR#368 starts--

  PROCEDURE pr_ls_job_process(p_seq_no           IN NUMBER,
                              p_processing_date  IN DATE,
                              p_branch           IN oltbs_contract.branch%TYPE,
                              p_module           IN VARCHAR2,
                              p_commit_frequency IN oltbs_automatic_process_master.bod_commit_count%TYPE);

  --FCC V.CL Release 7.4 RT Regression Testing-sep SFR#368 ends--

  --12-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#4,Retro Changes CITIUS-LS-801 START
  -- 08-JUN-2007 RolloverJob new changes starts
  PROCEDURE pr_ls_job_queue_update(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                                   p_process         IN lbtbs_job_queue.process%TYPE,
                                   p_processing_date IN DATE);
  -- 08-JUN-2007 RolloverJob new changes ends

--12-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#4,Retro Changes CITIUS-LS-801 END
--LB Batch moved to java SOFR starts
FUNCTION Fn_Process_Atomic_Task_Batch(p_Branch                 IN VARCHAR2,
                                        p_Userid                 IN VARCHAR2,
                                  p_Module                 IN Oltbs_Contract.Module_Code%TYPE,
                                  p_Current_Accrual_Ref_No IN OUT Oltbs_Auto_Function_Details.Current_Accrual_Ref_No%TYPE,
                                  p_Processing_Date        IN DATE,
                                  p_Process_Name           IN Oltbs_Automatic_Process_Master.Process_Name%TYPE,
                                  p_Product                IN Oltbs_Contract.Product_Code%TYPE,
                                  p_Commit_Frequency       IN Oltbs_Automatic_Process_Master.Bod_Commit_Count%TYPE,
                                  p_Task_Rowid             IN ROWID,
                                  p_Processor_Seq_No       IN INTEGER,
                                  p_Error_Code             IN OUT VARCHAR2,
                                  p_Error_Parameter        IN OUT VARCHAR2)
    RETURN VARCHAR2;
    --LB Batch moved to java SOFR ends
END lbpks_batch;
/
create or replace synonym lbpkss_batch for lbpks_batch
/