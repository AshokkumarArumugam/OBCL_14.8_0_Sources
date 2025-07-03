CREATE OR REPLACE PACKAGE olpks_ln_synd_services AS
/*-----------------------------------------------------------------------------------
**
** File Name	: olpks_ln_synd_services.SPC
** Module	: LOAN SYNDICATION
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

15/02/2003 - FCC 4.2 April 2003 LS changes

  (1)  Added the following functions in the SPC - fn_participant_delete
                                                  fn_party_authorise
                                                  fn_reverse_party_contract
                                                  
15-APR-2003 FCC 4.2 APR 2003 ITR1 LS fixes for SFR # 426 : added new function fn_reverse_party_event
 									   to reverse events on participant side

28-APR-2003 FCC 4.2 APR 2003 ITR2 SFR 3 

(1) Added fn_party_amt_due_authorise to be called in batch to authorise amount due tables

05-AUG-2006 FCC V.CL Release 7.1 changes
	Added a new function fn_amtdue_sgen_det for SGEN date population for facility contracts.
05-Aug-2006	FLEXCUBE V.CL Release 7.1 FS 5.0 Nonprorata Changes
		Added a new function fn_nonprorata_processing for processing of nonprorata payments.
23-AUG-2006	FLEXCUBE V CL Release 7.1 BVPRAM Changes by Sangeetha
		Functions fn_participant_backup,fn_participant_delete,fn_participant_restore are added newly.
20-Sep-2006 FLEXCUBE V.CL Release 7.1 ITR1 SFR#139 Part Deletion Changes
		Removed the function fn_participant_delete. Modified the functions fn_participant_backup and 
		fn_participant_restore and added a new function fn_participant_delete_backup to handle event deletion by the 
		backup/restore mechanism.
21-SEP-2006	FLEXCUBE V.CL Release 7.1 ITR1 SFR - 82 Changes by Yogesh added procedure set_partmsggen_flg 
05-SEP-2007	FLEXCUBE V.CL Release 7.3 WATCHLIST ENHANCEMENT CHANGES.
		Added new function fn_watch_list_facility.
05-JUN-2009 CITIUS-LS#SRT5764 RETRO CHANGES FROM US TO BLR
	1).29-APR-2009 	FLEXCUBE V.CL Release 7.6 Sighting Funding Changes by Manas
26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro,changed the copyright clause.	
------------------------------------END CHANGE HISTORY-------------------------------------
*/

TYPE rec_Borrower_esn IS RECORD
(
Borrower_esn                  oltbs_contract.Latest_Event_seq_No%type,
Reversed_Borrower_esn         oltbs_contract.Latest_Event_seq_No%type,
Borrower_EVENT_CODE           OLTB_CONTRACT_EVENT_LOG.EVENT_CODE%Type
);

TYPE tbl_Borrower_esn IS TABLE OF rec_Borrower_esn INDEX BY BINARY_INTEGER;

----21-SEP-2006	FLEXCUBE V.CL Release 7.1 ITR1 SFR - 82 Changes by Yogesh 
PROCEDURE set_partmsggen_flg (p_gen_flg VARCHAR2 DEFAULT 'Y');
----21-SEP-2006	FLEXCUBE V.CL Release 7.1 ITR1 SFR - 82 Changes by Yogesh 


Function fn_copy_contract(p_new_reference_no IN Varchar2,
		p_old_reference_no IN Varchar2,
		p_error_code IN OUT Varchar2) return boolean;
Function fn_authorise
		(
		pContractRefNo	IN			oltbs_contract.contract_ref_no%type,
		pErrorCode		IN	OUT	Varchar2,
		pErrorParams	IN	OUT	Varchar2
		)
Return Boolean;

FUNCTION fn_AmendBeforeFirstAuthorize
			(
			pContractRefNo			IN	OUT	oltbs_contract.contract_ref_no%type,
			pErrorCode					IN	OUT	Varchar2,
			pErrorParams				IN	OUT	Varchar2
			)
Return Boolean;
FUNCTION fn_backup(			pContractRefNo			IN	OUT	oltbs_contract.contract_ref_no%type)
		 		 RETURN BOOLEAN;
Function fn_create_new_version(p_reference_no		IN varchar2,
							   p_update_cstb		IN varchar2 DEFAULT 'Y',
							   p_replicate_sch_defn	IN varchar2 DEFAULT 'Y',
							   p_new_event_seq_no	IN number )
return number;
FUNCTION fn_delete
			(
			pContractRefNo		IN	OUT	oltbs_contract.contract_ref_no%type,
			paction						IN OUT  BOOLEAN,
			pErrorCode				IN	OUT	Varchar2,
			pErrorParams			IN	OUT	Varchar2
			)
Return Boolean;
FUNCTION fn_get_tranche_details(pContractRefNo IN oltbs_contract.contract_ref_no%type,
																		pamount							IN OUT OLTB_CONTRACT_MASTER.amount%type,
																		pvalue_date		  		IN OUT OLTB_CONTRACT_MASTER.value_date%type,
																		pmaturity_date			IN OUT OLTB_CONTRACT_MASTER.maturity_date%type,
																		ptranche 						IN OUT lbtb_syndication_master.no_of_tranches_allowed%type,
																		pdrawdown						IN OUT lbtb_syndication_master.no_of_drawdowns_allowed%type)
		 			RETURN BOOLEAN;
FUNCTION fn_restore(		pContractRefNo			IN	OUT	oltbs_contract.contract_ref_no%type)
		 		 RETURN BOOLEAN;
FUNCTION fn_reverse_syncontract
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_current_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
	p_event_code		IN	oltbs_contract.curr_event_code%TYPE,
	p_handoff_action_code	IN	char,
	p_error_code		IN OUT	ertbs_msgs.err_code%TYPE,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;
FUNCTION fn_get_template (p_ref_no	IN		oltbs_contract.CONTRACT_REF_NO%TYPE
			,p_serial		IN	OUT	VARCHAR2 --NUMBER --Flexcube V CL Release 7.1, Changed the data type by MIT on 140206
			,p_new_ref_no	IN	OUT	oltbs_contract.CONTRACT_REF_NO%TYPE
			,p_err_code		IN	OUT	VARCHAR2)
RETURN BOOLEAN;
-------------------------------------------------------------------
--LS 4.2 changes April 2003 Changed on 13/02/2003
--------------------------------------------------------------------
/*FUNCTION fn_participant_delete
		(
		pBrFcContractRefNo	IN	oltbs_contract.contract_ref_no%TYPE,
		paction			IN   BOOLEAN,
		pErrorCode		IN	OUT	VARCHAR2,
		pErrorParams	IN	OUT	VARCHAR2
		)
RETURN BOOLEAN ;
*/

FUNCTION fn_participant_delete
		(
		pBrFcContractRefNo	IN	oltbs_contract.contract_ref_no%TYPE,
		p_tbl_Borrower_esn      IN      olpks_ln_synd_services.tbl_Borrower_esn,
		paction			IN      BOOLEAN,
		pErrorCode		IN	OUT	VARCHAR2,
		pErrorParams	IN	OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_party_authorise
		(
		pBrFcContractRefNo	IN	oltbs_contract.contract_ref_no%TYPE,
		pBr_ESN                 IN      NUMBER,
		pErrorCode		IN	OUT	VARCHAR2,
		pErrorParams	IN	OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_reverse_party_contract
	(pBrFcContractRefNo	IN	oltbs_contract.contract_ref_no%TYPE,
	 p_event_code		IN	oltbs_contract.curr_event_code%TYPE,
	 p_handoff_action_code	IN	CHAR,
	 P_ERROR_CODE		IN	OUT	VARCHAR2,
	 p_Error_Params	IN	OUT	VARCHAR2
		)
RETURN BOOLEAN ;
-- FCC 4.2 APR 2003 ITR1 LS fixes for SFR # 426 starts: added this new function to reverse events on participant side
FUNCTION fn_reverse_party_event
	(p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	 p_event_code           IN      OLTB_CONTRACT_EVENT_LOG.Event_code%TYPE,  --16/04/2003
	 p_event_seq_no         IN      oltbs_contract.Latest_Event_Seq_no%TYPE,
	 p_reversed_event_seq_no         IN      oltbs_contract.Latest_Event_Seq_no%TYPE,
	 P_ERROR_CODE		IN	OUT	VARCHAR2,
	 P_Error_Params	IN	OUT	VARCHAR2
		)
RETURN BOOLEAN ;
-- FCC 4.2 APR 2003 ITR1 LS fixes for SFR # 426 ends

--28/04/2003 Start
--------------------------------------------------------------------
FUNCTION fn_party_amt_due_authorise
		(
		pBr_ContractRefNo	IN	oltbs_contract.contract_ref_no%TYPE,
		pBr_ESN                 IN      NUMBER,
		pErrorCode		IN	OUT	VARCHAR2,
		pErrorParams	IN	OUT	VARCHAR2
		)
RETURN BOOLEAN;
--28/04/2003 End
--------------------------------------------------------------------------------------
--05-AUG-2006 FCC V.CL Release 7.1 changes start
function fn_amtdue_sgen_det
                        (pContractRefNo IN oltbs_contract.contract_ref_no%TYPE,
                         pEventSeqNo    IN oltbs_contract.latest_event_seq_no%TYPE,
                         pEffectiveDate IN Date,
                         pErrorCode     IN OUT  ertbs_msgs.err_code%TYPE )
RETURN BOOLEAN;
--05-AUG-2006 FCC V.CL Release 7.1 changes end
--------------------------------------------------------------------------------------
--CITIUS-LS#SRT5764 CHANGES STARTS
--29-APR-2009 	FLEXCUBE V.CL Release 7.6 Sighting Funding Changes by Manas starts
FUNCTION fn_reverse_ppmt_part(
				p_part_contract_ref_no 	IN lptbs_contract_master.contract_ref_no%TYPE,
				p_borr_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,	
				p_event_code		IN oltbs_contract_event_log.event_code%TYPE,
				p_reversed_event_seq_no IN VARCHAR2,
				p_err_code 		IN OUT VARCHAR2,
				p_err_param 		IN OUT VARCHAR2
			      )
RETURN BOOLEAN;
--29-APR-2009 	FLEXCUBE V.CL Release 7.6 Sighting Funding Changes by Manas ends
--CITIUS-LS#SRT5764 CHANGES ENDS

--FLEXCUBE V.CL Release 7.1 FS 5.0 Nonprorata Change starts
FUNCTION fn_nonprorata_processing
	(
	p_contract_ref_no		IN	VARCHAR2,
	p_event_seq_no			IN	NUMBER,
	p_reversed_event_seq_no		IN	NUMBER,
	P_value_date			IN	DATE,
	p_error_code			OUT	VARCHAR2,
	p_error_params			OUT	VARCHAR2
	)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.1 FS 5.0 Nonprorata Change ends

--FLEXCUBE V CL Release 7.1 BVPRAM Changes by Sangeetha starts
/*FUNCTION fn_participant_backup(			
			pContractRefNo		IN	oltbs_contract.contract_ref_no%TYPE,
			p_component_type	IN	oltbs_amount_due_cs.component_type%TYPE,
			p_error_code		IN OUT	Varchar2,
			p_error_parameter	IN OUT	Varchar2)
RETURN BOOLEAN;

FUNCTION fn_participant_delete(			
			pContractRefNo		IN	oltbs_contract.contract_ref_no%TYPE,
			p_component_type	IN	oltbs_amount_due_cs.component_type%TYPE,
			p_error_code		IN OUT	Varchar2,
			p_error_parameter	IN OUT	Varchar2)
RETURN BOOLEAN;

FUNCTION fn_participant_restore(			
			pContractRefNo		IN	oltbs_contract.contract_ref_no%TYPE,
			p_component_type	IN	oltbs_amount_due_cs.component_type%TYPE,
			p_error_code		IN OUT	Varchar2,
			p_error_parameter	IN OUT	Varchar2)
RETURN BOOLEAN;*/

--FLEXCUBE V.CL Release 7.1 ITR1 SFR#139 Part Deletion Changes start
FUNCTION fn_participant_backup
			(			
			pContractRefNo		IN		VARCHAR2,
			p_component_type		IN		VARCHAR2,
			p_backup_reqd		IN		VARCHAR2, --T for tranche,D for drawdown,B for both
			p_error_code		IN OUT	VARCHAR2,
			p_error_parameter		IN OUT	VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_participant_restore
			(			
			pContractRefNo		IN		VARCHAR2,
			p_component_type		IN		VARCHAR2,
			p_restore_reqd		IN		VARCHAR2, --T for tranche,D for drawdown,B for both
			p_error_code		IN OUT	VARCHAR2,
			p_error_parameter		IN OUT	VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_participant_delete_backup
			(			
			pContractRefNo		IN		VARCHAR2,
			p_delete_reqd		IN		VARCHAR2, --T for tranche,D for drawdown,B for both
			p_error_code		IN OUT	VARCHAR2,
			p_error_parameter		IN OUT	VARCHAR2
			)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.1 ITR1 SFR#139 Part Deletion Changes end
--FLEXCUBE V.CL Release 7.3 WATCHLIST ENHANCEMENT CHANGES FROM HERE
FUNCTION fn_watch_list_facility
(
pcontractrefno	IN		oltbs_contract.contract_ref_no%TYPE,
perrorcode	IN OUT		VARCHAR2,
perrorparam	IN OUT		VARCHAR2
)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.3 WATCHLIST ENHANCEMENT CHANGES TILL HERE
END olpks_ln_synd_services;
/
CREATE or replace SYNONYM olpkss_ln_synd_services FOR olpks_ln_synd_services
/