CREATE OR REPLACE PACKAGE olpks_upload_amendment_1 AS

/*----------------------------------------------------------------------------------------------------
  **
  ** File Name    : olpks_upload_amendment_1.SPC
  **
  ** Module       : LOAN SYNDICATION
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
03-JUN-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR11,Handled code for maturity type vami validation at the time of upload
15-JUN-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#173 Changes- Changes done to handle VAMI upload for Maturity type change and Interest Rate type changes.
09-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION, 21-SEP-2009 CITIUS-LS#6373 Fix for CITIUS-LS Till#150080-1018 Future dated Vami Fixes
03-MAY-2010 FLEXCUBE V.CL Release 7.6 ITR1 SFR#1 Changes done for VAMI upload for tenor_based_spread.
*/


TYPE				g_change_log_record_type	
IS RECORD
				(
				field_changed		oltbs_contract_change_log.field_changed%TYPE,
				old_value			oltbs_contract_change_log.old_value%TYPE,
				new_value			oltbs_contract_change_log.new_value%TYPE
				);

TYPE				g_change_log_table_type	
IS TABLE OF			g_change_log_record_type
INDEX BY			BINARY_INTEGER;


FUNCTION fn_upload_for_a_contract
	(
		p_contract_ref_no		IN		lbtbs_contract_amend_due.contract_ref_no%TYPE
	,	p_event_seq_no		IN		lbtbs_contract_amend_due.event_seq_no%TYPE
	,	p_on_error			IN		cotms_source_pref.on_error%TYPE
	,	p_on_override		IN		cotms_source_pref.on_override%TYPE
	,	p_error_code		IN OUT	VARCHAR2
	,	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_process_for_a_contract
	(
		p_branch_code			IN		lbtbs_contract_amend_due.branch_code%TYPE
	,	p_contract_ref_no			IN		lbtbs_contract_amend_due.contract_ref_no%TYPE
	,	p_event_seq_no		IN		lbtbs_contract_amend_due.event_seq_no%TYPE
	,	p_value_date             	IN		DATE
	,	p_differential_amount    	IN 		lbtbs_contract_amend_due.differential_amount%TYPE
	,	p_lcy_differential_amount	IN		lbtbs_contract_amend_due.lcy_differential_amount%TYPE
	,	p_new_credit_line        	IN		lbtbs_contract_amend_due.new_credit_line%TYPE
	,	p_new_maturity_date      	IN		DATE
	,	p_new_revolving_flag     	IN		lbtbs_contract_amend_due.new_revolving_flag%TYPE
	,	p_amendment_rowid			IN		ROWID
	,	p_on_error				IN		cotms_source_pref.on_error%TYPE
	,	p_on_override			IN		cotms_source_pref.on_override%TYPE
	,	p_error_code			IN OUT	VARCHAR2
	,	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

--ifcae overloaded process_for_a_contract
FUNCTION fn_process_for_a_contract
	(
		p_upload_id				IN		oltbs_upload_log_cs.upload_id%TYPE
	,	p_source_code			IN		oltbs_upload_amend_due.source_code%TYPE
	,	p_branch_code			IN		oltbs_upload_amend_due.branch_code%TYPE
	,	p_user_ref_no           	IN	 	oltbs_upload_amend_due.user_ref_no%TYPE
	,	p_amendment_seq_no		IN		oltbs_upload_amend_due.amendment_seq_no%TYPE
	,	p_value_date             	IN		DATE
	,	p_differential_amount    	IN 		oltbs_upload_amend_due.differential_amount%TYPE
	,	p_lcy_differential_amount	IN		oltbs_upload_amend_due.lcy_differential_amount%TYPE
	,	p_new_credit_line        	IN		oltbs_upload_amend_due.new_credit_line%TYPE
	,	p_new_maturity_date      	IN		DATE
	,	p_new_revolving_flag     	IN		oltbs_upload_amend_due.new_revolving_flag%TYPE
	,	p_maturity_type				IN	oltbs_upload_amend_due.new_maturity_type%TYPE --15-JUN-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#173 Changes
	,	p_tenor_based_spread  		IN  		oltbs_upload_amend_due.new_tenor_based_spread%TYPE --03-MAY-2010 FLEXCUBE V.CL Release 7.6 ITR1 SFR#1
	,	p_amendment_rowid			IN		ROWID
	,	p_uploaded_status			IN		cotms_source_pref.uploaded_status%TYPE
	,	p_on_error				IN		cotms_source_pref.on_error%TYPE
	,	p_on_override			IN		cotms_source_pref.on_override%TYPE	
	,	p_uploaded_auth			IN OUT	oltbs_upload_log_cs.uploaded_auth%TYPE
	,	p_uploaded_unauth			IN OUT	oltbs_upload_log_cs.uploaded_unauth%TYPE
	,	p_uploaded_hold			IN OUT	oltbs_upload_log_cs.uploaded_hold%TYPE
	,	p_rejected				IN OUT	oltbs_upload_log_cs.rejected%TYPE
	,	p_error_code			IN OUT	VARCHAR2
	,	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--end iface

--------------------------------------------------------------------------------------------------------------------

--iface changes
FUNCTION fn_upload_for_a_branch
	(
		p_source_code		IN		oltbs_upload_amend_due.source_code%TYPE
	,	p_branch_code		IN		oltms_branch.branch_code%TYPE
	,	p_uploaded_status		IN		cotms_source_pref.uploaded_status%TYPE
	,	p_on_error			IN		cotms_source_pref.on_error%TYPE
	,	p_on_override		IN		cotms_source_pref.on_override%TYPE
	,	p_upload_id			OUT		oltbs_upload_log_cs.upload_id%TYPE
	,	p_error_code		IN OUT	VARCHAR2
	,	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--end iface

-- fcc 4.3.1 changes begin
FUNCTION fn_upload_for_a_branch
	(
		p_source_code		   	IN		oltbs_upload_amend_due.source_code%TYPE
	,	p_branch_code		   	IN		oltms_branch.branch_code%TYPE
	,	p_uploaded_status	   	IN		cotms_source_pref.uploaded_status%TYPE
	,	p_on_error			   	IN		cotms_source_pref.on_error%TYPE
	,	p_on_override		   	IN		cotms_source_pref.on_override%TYPE
	,	p_ldtb_upload_amend_due	IN		OLTB_UPLOAD_AMEND_DUE%ROWTYPE
	,	p_linkages				IN OUT	olpkss_upload_ld.tbl_upl_linkages
	,	p_upload_id				OUT		oltbs_upload_log_cs.upload_id%TYPE
	,	p_error_code			IN OUT	VARCHAR2
	,	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_process_for_a_contract
	(
		p_upload_id				   IN		oltbs_upload_log_cs.upload_id%TYPE
	,	p_source_code			   IN		oltbs_upload_amend_due.source_code%TYPE
	,	p_branch_code			   IN		oltbs_upload_amend_due.branch_code%TYPE
	,	p_user_ref_no              IN	 	oltbs_upload_amend_due.user_ref_no%TYPE
	,	p_amendment_seq_no		   IN		oltbs_upload_amend_due.amendment_seq_no%TYPE
	,	p_value_date               IN		DATE
	,	p_differential_amount      IN 		oltbs_upload_amend_due.differential_amount%TYPE
	,	p_lcy_differential_amount  IN		oltbs_upload_amend_due.lcy_differential_amount%TYPE
	,	p_new_credit_line          IN		oltbs_upload_amend_due.new_credit_line%TYPE
	,	p_new_maturity_date        IN		DATE
	,	p_new_revolving_flag       IN		oltbs_upload_amend_due.new_revolving_flag%TYPE
	,	p_linkages				   IN OUT	oltbs_upload_linkages%ROWTYPE  
	,	p_contract_ref_no		   IN		oltbs_upload_amend_due.contract_ref_no%TYPE
	,	p_amendment_rowid		   IN		ROWID
	,	p_uploaded_status		   IN		cotms_source_pref.uploaded_status%TYPE
	,	p_on_error				   IN		cotms_source_pref.on_error%TYPE
	,	p_on_override			   IN		cotms_source_pref.on_override%TYPE
	,	p_uploaded_auth			   IN OUT	oltbs_upload_log_cs.uploaded_auth%TYPE
	,	p_uploaded_unauth		   IN OUT	oltbs_upload_log_cs.uploaded_unauth%TYPE
	,	p_maturity_type			   IN		CHAR---SFR11
	, 	p_tenor_based_spread        IN 		VARCHAR2 --03-MAY-2010 FLEXCUBE V.CL Release 7.6 ITR1 SFR#1
	,	p_uploaded_hold			   IN OUT	oltbs_upload_log_cs.uploaded_hold%TYPE
	,	p_rejected				   IN OUT	oltbs_upload_log_cs.rejected%TYPE
	,	p_error_code			   IN OUT	VARCHAR2
	,	p_error_parameter		   IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
	
-- fcc 4.3.1 changes end

--Till#234. Retro as part of Flexcube V CL Release 7.1 on 070306
--VB adition start for CITIUS on 08-JUL-2005, Till#234.
FUNCTION fn_upload_an_amendment
	(	p_loan_amnd_rec	IN		oltbs_upload_amend_due%ROWTYPE
	,	p_uploaded_status	IN		cotms_source_pref.uploaded_status%TYPE
	,	p_on_error		IN		cotms_source_pref.on_error%TYPE
	,	p_on_override	IN		cotms_source_pref.on_override%TYPE
	,	p_error_code	IN OUT	VARCHAR2
	,	p_error_parameter	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--VB adition end for CITIUS on 08-JUL-2005, Till#234.
--Till#234. Retro as part of Flexcube V CL Release 7.1 on 070306

--09-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION, 21-SEP-2009 CITIUS-LS#6373 Fix for CITIUS-LS Till#150080-1018 Future dated Vami Fixes
FUNCTION fn_rebuild_interest
	(
		p_Contract_Ref_no			IN		lftbs_contract_interest_master.Contract_ref_no%Type
	,	p_Latest_Version_no		IN 		oltbs_contract.Latest_Version_no%Type
	,	p_value_date			IN		oltbs_contract_amend_due.Value_date%Type
	,	p_error_code			IN OUT	VARCHAR2
	,	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--09-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION, 21-SEP-2009 CITIUS-LS#6373 Fix for CITIUS-LS Till#150080-1018 Future dated Vami Fixes

END olpks_upload_amendment_1;
/
CREATE or REPLACE SYNONYM olpkss_upload_amendment_1 FOR olpks_upload_amendment_1
/