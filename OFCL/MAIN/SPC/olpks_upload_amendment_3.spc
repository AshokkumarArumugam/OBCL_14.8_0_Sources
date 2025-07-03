CREATE OR REPLACE PACKAGE olpks_upload_amendment_3 AS

  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_upload_amendment_3.spc
  **
  ** Module   : UPLOAD
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
  Change History starts
  
  06-FEB-2009 FLEXCUBE V.CL RELEASE 7.4 ITR2 SFR#11, as part of this sfr added the synonym for this unit and changed the change hsitory copyright clause
  18-MAY-2010 FLEXCUBE V.CL Release 7.7 CITIPBG TD Vol1 FS tag#6 changes, CAMD changes. added fn_upload_camd.
  22-OCT-2010 FLEXCUBE V.CL Release 7.8 VOL1 FS TAG04 Rate Fixing Upload Changes, added fn_upload_rate_fixing
  Date               : 05-Feb-2024
  Changed By         : Balaji Gopal
  Change Description : Pr_Skip_Handler,Pr_Set_Skip_Kernel,Pr_Set_Activate_Kernel,Pr_Set_Skip_Cluster & Pr_Set_Activate_Cluster hook functions are created which will be used in the custom layer
  Search String      : Bug#36238944
  Change History ends
  -------------------------------------------------------------------------------------------------------------
  */
  
  TYPE tbl_settle_type IS TABLE OF oltbs_upload_settlements%ROWTYPE INDEX BY BINARY_INTEGER;

  TYPE tbl_func_udf_type IS TABLE OF cstms_udf_vals%ROWTYPE INDEX BY BINARY_INTEGER;

  TYPE typ_tbl_udf_user_fields IS TABLE OF oltms_user_fields%ROWTYPE INDEX BY VARCHAR2(50);

  TYPE g_change_log_record_type IS RECORD(
    field_changed oltbs_contract_change_log.field_changed%TYPE,
    old_value     oltbs_contract_change_log.old_value%TYPE,
    new_value     oltbs_contract_change_log.new_value%TYPE);

  TYPE g_change_log_table_type IS TABLE OF g_change_log_record_type INDEX BY BINARY_INTEGER;

  -- Bug#36238944 Starts Here
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
  -- Bug#36238944 Ends Here

  FUNCTION fn_custchg_updatestatus(p_crn             IN oltbs_contract.contract_ref_no%TYPE,
                                   p_counterparty    IN oltbs_contract.counterparty%TYPE,
                                   p_event_seq_no    IN NUMBER,
                                   p_credit_line     IN OLTB_AMEND_PROPAGATION_MASTER.credit_line%TYPE,
                                   p_error_code      IN OUT VARCHAR2,
                                   p_error_parameter IN OUT VARCHAR2)
  RETURN BOOLEAN;

  FUNCTION fn_update_change_log(l_ldtbs_upload_master_rec IN oltbs_upload_master%ROWTYPE,
                                p_version_no              IN oltbs_contract.latest_version_no%TYPE,
                                p_contract_ref_no         IN oltbs_contract.contract_ref_no%TYPE,
                                p_event_seq_no            IN oltbs_contract.latest_event_seq_no%TYPE,
                                p_error_code              IN OUT VARCHAR2,
                                p_error_parameter         IN OUT VARCHAR2)
  RETURN BOOLEAN;

  FUNCTION fn_restore_mis(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                          p_counterparty    IN VARCHAR2,
                          p_error_code      IN OUT VARCHAR2,
                          p_error_parameter IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_compmis_default(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                              p_counterparty    IN VARCHAR2,
                              p_error_code      IN OUT VARCHAR2,
                              p_error_parameter IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_custchg_schd(p_crn             IN oltbs_contract.contract_ref_no%TYPE,
                           p_version         IN NUMBER,
                           p_once_split      IN VARCHAR2,
                           p_error_code      IN OUT VARCHAR2,
                           p_error_parameter IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_custchange_reversal(p_crn          IN VARCHAR2,
                                  p_event_no     IN NUMBER,
                                  p_new_customer IN VARCHAR2,
                                  p_oldmis_rec   IN oltbs_class_mapping%ROWTYPE,
                                  p_err_code     IN OUT VARCHAR2,
                                  p_err_param    IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_ldupload_amend(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                             p_counterparty    IN oltbs_contract.counterparty%TYPE,
                             p_credit_line     IN oltbs_contract_master.credit_line%TYPE,
                             p_autoauth        IN VARCHAR2,
                             p_error_code      IN OUT VARCHAR2,
                             p_error_parameter IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION fn_ldupload_wrap(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                            p_counterparty    IN oltbs_contract.counterparty%TYPE,
                            p_event_seq_no    IN NUMBER,
                            p_credit_line     IN oltbs_contract_master.credit_line%TYPE,
                            p_autoauth        IN VARCHAR2,
                            p_error_code      IN OUT VARCHAR2,
                            p_error_parameter IN OUT VARCHAR2) RETURN BOOLEAN;

  PROCEDURE pr_process_job;

  PROCEDURE pr_upload_log_error(p_crn             IN OLTB_AMEND_PROPAGATION_MASTER.contract_ref_no%TYPE,
                                p_event_seq_no    IN OLTB_AMEND_PROPAGATION_MASTER.event_seq_no%TYPE,
                                p_link_ref_no     IN oltbs_contract.contract_ref_no%TYPE,
                                p_error_code      IN VARCHAR2,
                                p_error_parameter IN VARCHAR2);
 --18-MAY-2010 FLEXCUBE V.CL Release 7.7 CITIPBG TD Vol1 FS tag#6 changes starts here
  FUNCTION fn_upload_camd 
         (p_source_code        IN        oltbs_upload_rollover_amend.SOURCE_CODE%TYPE,
          p_branch             IN        VARCHAR2,
          p_user_ref_no        IN        oltbs_upload_rollover_amend.USER_REF_NO%TYPE,
          p_amendment_seq      IN        oltbs_contract.latest_event_seq_no%TYPE,    
          tb_settle            IN      	 olpkss_upload.tbl_settle_type,
          p_auto_auth          IN        VARCHAR2, 
          p_error_code         IN OUT    VARCHAR2,
  	  p_error_parameter    IN OUT    VARCHAR2
         ) return  BOOLEAN;                                                                 
 --18-MAY-2010 FLEXCUBE V.CL Release 7.7 CITIPBG TD Vol1 FS tag#6 changes ends here
--22-OCT-2010 FLEXCUBE V.CL Release 7.8 VOL1 FS TAG04 Rate Fixing Upload Changes - Start
FUNCTION fn_upload_rate_fixing
	(
	p_upload_rec	IN		oltbs_upload_manual_rate_fix%ROWTYPE
	,p_error_code	IN OUT	VARCHAR2
	,p_error_param	IN OUT	VARCHAR2
	)
RETURN BOOLEAN ;
--22-OCT-2010 FLEXCUBE V.CL Release 7.8 VOL1 FS TAG04 Rate Fixing Upload Changes - End
END olpks_upload_amendment_3;
/
create or replace synonym olpkss_upload_amendment_3 for olpks_upload_amendment_3
/