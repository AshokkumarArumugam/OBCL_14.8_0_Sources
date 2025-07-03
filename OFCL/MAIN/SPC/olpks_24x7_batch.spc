create or replace PACKAGE olpks_24x7_batch AS
  /*---------------------------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_24x7_batch.spc
  **
  ** Module : OL
  **	
	This source is part of the Oracle Banking Corporate Lending  Software Product.
	Copyright © 2019 Oracle and/or its affiliates.  All rights reserved.
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

  ** Name			          : Olpks_24x7_Batch
  ** Author			        : Chandra Prasath.N
  ** Date               : 12-May-2021
  ** Description 				: Created for 24/7 batch operation

  ** Changed By         : 
  ** Changed On         : 
  ** Search String      : 
  ** Change Reason      : 
	
   ---------------------------------------------------------------------------------------------------------------------
   */
	 
  g_27_7_batch            VARCHAR2(1) := 'N'; --OBCL_14.5_24_7 changes
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
		
	FUNCTION fn_process_transaction	( p_Brn            IN VARCHAR2,
                                        p_msgID          IN VARCHAR2,
                                        p_procSeqNo      IN NUMBER,
																				p_ContractRefNo	 IN VARCHAR2,
																				p_Elcm_Msgid     OUT Sypks_Utils.g_Elcm_Msgid%TYPE,
																				p_rfr_Msgid      OUT Sypks_Utils.g_rfr_Msgid%TYPE,
                                        p_Err_Code       IN OUT VARCHAR2,
                                        p_Err_Params     IN OUT VARCHAR2) RETURN VARCHAR2;	

END olpks_24x7_batch;
/
CREATE OR REPLACE SYNONYM olpkss_24x7_batch for olpks_24x7_batch
/