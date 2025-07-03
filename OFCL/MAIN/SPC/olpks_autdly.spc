CREATE OR REPLACE PACKAGE olpks_autdly AS
  /*---------------------------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_autdly.spc
  **
  ** Module   : LOANS AND DEPOSITS
  **
    This source is part of the Oracle Banking Corporate Lending  Software Product.
    Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
  **
  ---------------------------------------------------------------------------------------------------------------------
  */

  /*---------------------------------------------------------------------------------------------------------------------
   CHANGE HISTORY:
   Aspac     New program for LD Batch Run
   03-OCT-2016 -- Search String : OFCL 12.3 changes
   end_of_input column is fetched from sttms_core_branch_status instead of oltms_branch

   ** Modified By          : Neeraj.Krishna
   ** Modified On          : 30-MAR-2017
   ** Modified Reason      : Added module_code and batch as an in-paramter for fn_process_manager to customise the EOD for different module batches

   ** Modified By          : Baljinder Singh
   ** Modified On          : 11-AUG-2020
   ** Modified Reason      : Moving LB batch to JAVA for SOFR Changes
   ---------------------------------------------------------------------------------------------------------------------
   */
  -- LB Batch moved to java SOFR starts
  PROCEDURE Pr_Auto_Commit_Proc(p_Product          IN Oltbs_Contract.Product_Code%TYPE,
                                p_Process          IN VARCHAR2,
                                p_Processding_Date IN DATE,
                                p_Module           IN VARCHAR2,
                                p_Id               OUT NUMBER);
  -- LB Batch moved to java SOFR ends
    -- balli EOD Accounting check changes starts
    FUNCTION fn_processr_acc_check(p_module_code     IN VARCHAR2,
                              p_batch           IN VARCHAR2,
                              p_error_code      IN OUT VARCHAR2,
                              p_error_parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;
    -- balli EOD Accounting check changes ends
  FUNCTION fn_process_manager(p_module_code     IN VARCHAR2,
                              p_batch           IN VARCHAR2,
                              p_error_code      IN OUT VARCHAR2,
                              p_error_parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_process_manager_batch(p_module_code     IN VARCHAR2,
                                    p_batch           IN VARCHAR2,
                                    p_error_code      IN OUT VARCHAR2,
                                    p_error_parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_check_pgm_status(p_batch IN VARCHAR2,
                               --OFCL 12.3 changes starts
                               p_eoc_group OUT sttms_core_branch_status.end_of_input%TYPE,
                               --OFCL 12.3 changes ends
                               p_error_code IN OUT varchar2) RETURN BOOLEAN;

  FUNCTION fn_calculate_process_till_date(p_module_code      IN VARCHAR2,
                                          p_application_date IN date,
                                          --OFCL 12.3 changes starts
                                          p_eoc_group IN sttms_core_branch_status.end_of_input%TYPE,
                                          --OFCL 12.3 changes ends
                                          p_process_till_date OUT date,
                                          p_error_code        IN OUT varchar2)
    RETURN BOOLEAN;

  FUNCTION fn_get_period_end_date(p_application_date IN date,
                                  p_period_end_date  OUT date,
                                  p_error_code       IN OUT varchar2)
    RETURN BOOLEAN;

  FUNCTION fn_setup_process_queue(p_Branch                     IN VARCHAR2,
                                  p_module_code                IN VARCHAR2,
                                  p_userId                     IN VARCHAR2,
                                  l_eoc_group                  IN VARCHAR2,
                                  l_previous_process_till_date IN Date,
                                  l_current_process_till_date  IN Date,
                                  l_parallelize_auto_function  IN VARCHAR2,
                                  Perrorcode                   IN OUT VARCHAR2,
                                  Perrorparam                  IN OUT VARCHAR2)
    RETURN VARCHAR2;

END olpks_autdly;
/
create or replace synonym olpkss_autdly for olpks_autdly
/