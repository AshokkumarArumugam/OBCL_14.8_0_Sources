CREATE OR REPLACE PACKAGE olpks_upload_amendment_2
AS
/*-----------------------------------------------------------------------------------
  **
  ** File Name    : olpks_upload_amendment_2.SPC
  **
  ** Module       : UPLOAD
  **
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-------------------------------------------------------------------------------------
*/

/*----------------------------------CHANGE HISTORY----------------------------------

08-MAR-2006 Retro as part of Flex cube V CL Release 7.1 by Bincy
		1. VB added a flag in fn_validate_amend_due record to take Tilda seperated list of components for which interest rate/basis
   		   is being changed for CITIUS,Till#235 on 08-SEP-2005
03-jun-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR11,Handled code for maturity type vami validation at the time of upload
15-JUN-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#173 Changes- Changes done to handle VAMI upload for Maturity type change and Interest Rate type changes.
03-MAY-2010 FLEXCUBE V.CL Release 7.6 ITR1 SFR#1 Changes done for VAMI upload for tenor_based_spread.
18-MAY-2010 FLEXCUBE V.CL Release 7.7 CITIPBG TD Vol1 FS tag#6 changes, CAMD changes, overloaded fn_validate_contract with event_code
16-AUG-2010 FLEXCUBE V.CL Release 7.7 Retro, CITIUS Till#7377 changes, rate changes before the vami event are not getting propagated to origination side.
20-SEP-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715  FS Vol1 Tag 10 IUT#196 changes, declare g_source_code variable to access the source of upload

**SFR Number         : 30995083    
**Changed By         : Arvind Baskar
**Change Description : Hooks provided for fn_fwd_init 
**Search String      : Bug#30995083  

------------------------------------END CHANGE HISTORY-------------------------------------
*/

----------------------------------------------------------------------------------------------------------
--20-SEP-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715  FS Vol1 Tag 10 IUT#196 changes starts
g_source_code oltbs_upload_amend_due.source_code%TYPE;
--20-SEP-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715  FS Vol1 Tag 10 IUT#196 changes ends
--Bug#30995083    changes start
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
--Bug#30995083    changes end
FUNCTION fn_validate_contract	
	(
		p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
	,	p_contract_record		OUT		oltbs_contract%ROWTYPE
	,	p_contract_master_record	OUT		oltbs_contract_master%ROWTYPE
	,	p_error_code			IN OUT		VARCHAR2
	,	p_error_parameter		IN OUT		VARCHAR2
	)
RETURN BOOLEAN ;

--iface changes
FUNCTION fn_validate_contract	
	(
		p_user_ref_no			IN		oltbs_contract.user_ref_no%TYPE
	,	p_uploaded_status		IN		oltbs_contract.auth_status%TYPE
	,	p_contract_record		OUT		oltbs_contract%ROWTYPE
	,	p_contract_master_record	OUT		oltbs_contract_master%ROWTYPE
	,	p_error_code			IN OUT		VARCHAR2
	,	p_error_parameter		IN OUT		VARCHAR2
	)
RETURN BOOLEAN;
--end iface changes
--18-MAY-2010 FLEXCUBE V.CL Release 7.7 CITIPBG TD Vol1 FS tag#6 changes starts here
FUNCTION fn_validate_contract
	(
		p_user_ref_no			IN	oltbs_contract.user_ref_no%TYPE
	,	p_uploaded_status		IN	oltbs_contract.auth_status%TYPE
  	, 	p_event_code          		IN    	OLTM_PRODUCT_EVENT.event_code%TYPE --harsh changes here
	,	p_contract_record		OUT	oltbs_contract%ROWTYPE
	,	p_contract_master_record	OUT	oltbs_contract_master%ROWTYPE
	,	p_error_code			IN OUT	VARCHAR2
	,	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--18-MAY-2010 FLEXCUBE V.CL Release 7.7 CITIPBG TD Vol1 FS tag#6 changes ends here
FUNCTION fn_validate_amend_due 
	(
		p_contract_record		IN		oltbs_contract%ROWTYPE
	,	p_contract_master_record	IN		oltbs_contract_master%ROWTYPE
	,	p_value_date			IN		DATE
	,	p_differential_amount		IN		lbtbs_contract_amend_due.differential_amount%TYPE
	,	p_lcy_differential_amount	IN		lbtbs_contract_amend_due.lcy_differential_amount%TYPE
	,	p_new_credit_line		IN		lbtbs_contract_amend_due.new_credit_line%TYPE
	,	p_new_maturity_date		IN		DATE
	,	p_new_revolving_flag		IN		lbtbs_contract_amend_due.new_revolving_flag%TYPE
	,	p_maturity_type			IN		CHAR---FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR11
	, 	p_tenor_based_spread 		IN 		VARCHAR2 --03-MAY-2010 FLEXCUBE V.CL Release 7.6 ITR1 SFR#1
	,	p_int_components		IN		VARCHAR2 --08-MAR-2006 Retro as part of Flex cube V CL Release 7.1 by Bincy,Till#235
	,	p_principal_changed		OUT		BOOLEAN
	,	p_maturity_changed		OUT		BOOLEAN
	,	p_amend_due_record		OUT		oltbs_contract_amend_due%ROWTYPE
	,	p_error_code			IN OUT		VARCHAR2
	,	p_error_parameter		IN OUT		VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_default_iccf
	(
		p_contract_record		IN		oltbs_contract%ROWTYPE
	,	p_contract_master_record	IN		oltbs_contract_master%ROWTYPE
	,	p_differential_amount		IN		NUMBER
	,	p_value_date			IN		DATE
	,	p_error_code			IN OUT		VARCHAR2
	,	p_error_parameter		IN OUT		VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_validate_interest
	(	
		p_branch_code			IN		oltbs_amend_interest.branch_code%TYPE
	,	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
	,	p_event_seq_no			IN		oltbs_contract.latest_event_seq_no%TYPE
	,	p_product_code			IN		oltbs_contract.product_code%TYPE
	,	p_change_log_table		IN OUT		olpks_upload_amendment_1.g_change_log_table_type
	,	p_iccf_changed			IN OUT		BOOLEAN
	,	p_error_code			IN OUT		VARCHAR2
	,	p_error_parameter		IN OUT		VARCHAR2
	)
RETURN BOOLEAN;

--iface changes
FUNCTION fn_validate_interest
	(	
		p_source_code			IN		oltbs_upload_amend_interest.source_code%TYPE
	,	p_branch_code			IN		oltbs_upload_amend_interest.branch_code%TYPE
	,	p_user_ref_no			IN		oltbs_upload_amend_interest.user_ref_no%TYPE
	,	p_amendment_seq_no		IN		oltbs_upload_amend_interest.amendment_seq_no%TYPE
	,	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
	,	p_event_seq_no			IN		oltbs_contract.latest_event_seq_no%TYPE
	,	p_product_code			IN		oltbs_contract.product_code%TYPE
	,	p_amend_value_date			IN		oltbs_upload_amend_due.value_date%TYPE  --15-JUN-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#173 Changes
	,	p_change_log_table		IN OUT		olpkss_upload_amendment_1.g_change_log_table_type
	,	p_iccf_changed			IN OUT		BOOLEAN
	,	p_error_code			IN OUT		VARCHAR2
	,	p_error_parameter		IN OUT		VARCHAR2
	)
RETURN BOOLEAN;
--11-SEP-2009 FLEXCUBE V.CL Release 7.5 LOT3 FS TAG #4 Changes START
FUNCTION fn_validate_interest
	(
		p_source_code			IN		oltbs_upload_amend_interest.source_code%TYPE
	,	p_branch_code			IN		oltbs_upload_amend_interest.branch_code%TYPE
	,	p_user_ref_no			IN		oltbs_upload_amend_interest.user_ref_no%TYPE
	,	p_amendment_seq_no		IN		oltbs_upload_amend_interest.amendment_seq_no%TYPE
	,	p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE
	,	p_event_seq_no			IN		oltbs_contract.latest_event_seq_no%TYPE
	,	p_product_code			IN		oltbs_contract.product_code%TYPE
	,	p_amend_value_date			IN		oltbs_upload_amend_due.value_date%TYPE  --15-JUN-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#173 Changes
	,	p_change_log_table		IN OUT	olpkss_upload_amendment_1.g_change_log_table_type
	,	p_iccf_changed			IN OUT	BOOLEAN
	,	p_rate_type_change		OUT	VARCHAR2  
	,	p_error_code			IN OUT	VARCHAR2
	,	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--11-SEP-2009 FLEXCUBE V.CL Release 7.5 LOT3 FS TAG #4 Changes END
--end iface changes

FUNCTION fn_populate_contract_details
	(	
		p_contract_record		IN		oltbs_contract%ROWTYPE
	,	p_error_code			IN OUT		VARCHAR2
	,	p_error_parameter		IN OUT		VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_validate_dates
	(
		p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
	,	p_version_no			IN		oltbs_contract.latest_version_no%TYPE
	,	p_maturity_type			IN		oltbs_contract_master.maturity_type%TYPE
	,	p_old_maturity_date		IN		DATE
	,	p_notice_days			IN		oltbs_contract_master.notice_days%TYPE
	,	p_value_date			IN		DATE
	,	p_new_maturity_date		IN		DATE
	,	p_error_code			IN OUT		VARCHAR2
	,	p_error_parameter		IN OUT		VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_populate_amend_due
	(
		p_amend_due_record		IN		oltbs_contract_amend_due%ROWTYPE
	,	p_error_code			IN OUT		VARCHAR2
	,	p_error_parameter		IN OUT		VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_create_new_version
	(
		p_contract_record		IN 		oltbs_contract%ROWTYPE
	,	p_error_code			IN OUT		VARCHAR2
	,	p_error_parameter		IN OUT		VARCHAR2
	)
RETURN BOOLEAN;
--CITIUS-LS#SRT1452 STP and Code Consolidation Site - Compilation Errors
FUNCTION fn_Populate_Agency_Rate
	(
		p_Contract_Ref_no			IN		lftbs_contract_interest.Contract_reference_no%Type
	,	p_investor_ref_no           IN      oltbs_contract.contract_ref_no%TYPE --16-AUG-2010 FLEXCUBE V.CL Release 7.7 Retro, CITIUS Till#7377 changes here
	,	p_event_seq_no			IN 		lftbs_contract_interest.Event_sequence_no%Type
	,	p_error_code			IN OUT	VARCHAR2
	,	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--CITIUS-LS#SRT1452 STP and Code Consolidation Site - Compilation Errors
--11-SEP-2009 FLEXCUBE V.CL Release 7.5 LOT3 FS TAG #4 Changes start
FUNCTION fn_amendment_beyond_revision(
	p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE
	,p_amendment_date IN DATE
	)
RETURN BOOLEAN;

FUNCTION fn_amendment_beyond_amendment(
	p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE
	,p_amendment_date IN date
	,p_event_seq_no	IN oltbs_contract.latest_event_seq_no%TYPE
	)
RETURN BOOLEAN;


--11-SEP-2009 FLEXCUBE V.CL Release 7.5 LOT3 FS TAG #4 Changes end
-----------------------------------------------------------------------------------------------------------

END olpks_upload_amendment_2;
/
CREATE or replace SYNONYM	olpkss_upload_amendment_2 
FOR			olpks_upload_amendment_2
/