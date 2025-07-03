CREATE OR REPLACE PACKAGE olpks_fpml
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_fpml.SPC
**
** Module	: LOANS SYNDICATION
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
---------------------------------------- CHANGE HISTORY STARTS ---------------------------------------
10-JUN-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag06,FPML Messaging for Markit Integration changes
27-JUL-2011 Flexcube V.CL Release 7.9 FS Vol2 Tag 06 ITR2#2, FpML Messaging for Markit Integration changes, New function fn_get_message_part added
25-AUG-2011 Flexcube V.CL Release 7.9 FS Vol2 Tag06, ITR2#37,FPML Messaging for Markit Integration changes 1)Added changes since in the message(OngoingFee and OneOffee) few tags like feeaccrualschedule,feepayment,LoanContractSummary,lcSummary occurances was more than 1.
														The max occurance of those tag should be 1.
													   2)To generate the ongoingfee and oneoffee message for each fee component.
11-NOV-2011 Flexcube V.CL Release 7.10 BLR-UAT-FIXES#08 Changes, Message Id should be displayed in the below format
																	1) Message main header CITI-FCI-RRRR-MM-DD-DCN
																	2) MessageId for borrower/participant in bulk - CITI-FCI-RRRR-MM-DD-DCN-<<COUNTERPARTY>>-<<CONTRACT_TYPE>>
15-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 08,Markit Trade Settlement Changes Added new function fn_gen_markit_fpml_msg_out in order to generate position update message for PRAM.
16-FEB-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag 07 ITR1#69 changes,New function fn_check_impacted_events added to check for impacted events due to the backdated transaction.
28-FEB-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag 08 ITR2#06,Markit Trade Settlement,changes done to generate the position update with multple facilityportfolio position tag
07-MAR-2012 Flexcube V.CL Release 7.10 Lot2, FS Vol1 Tag04 Changes, Markit Messaging - Same MEI Code Participants Consolidation changes
20-MAR-2012 Flexcube V.CL Release 7.10 Lot2, FS Vol1 Tag04 Changes, participant details are incorrect in interestpayment notice.
15-Jun-2012 Flexcube V.CL Release 7.11, Retro, CITIBLR#35065 Changes, markit trade id and source code added to pl/sql table.
23-AUG-2012 Flexcube V.CL Release 7.11.1 FS Tag 03 Change:Added agency_type to p_borr_rec.
29-AUG-2012 Flexcube V.CL Release 7.11.1 FS Tag 03 Change:Added p_index to fn_add_attribute.
------------------------------------------ CHANGE HISTORY ENDS ----------------------------------------
*/

-----------------------------Package Variable Declartion Starts --------------------------------------------

--Header Rec Declaration

TYPE	p_fpml_header_rec 
IS 	RECORD
( borrower_ref_no		oltbs_contract.contract_ref_no%TYPE
--11-NOV-2011 Flexcube V.CL Release 7.10 BLR-UAT-FIXES#08 Changes start here
--, messageId			oltbs_contract.contract_ref_no%TYPE
, messageId			VARCHAR2(50)
--11-NOV-2011 Flexcube V.CL Release 7.10 BLR-UAT-FIXES#08 Changes end here
, notice_type			VARCHAR2(50)
, conversationId		oltbs_contract.contract_ref_no%TYPE
, sentBy			VARCHAR2(50)
, sendTo			VARCHAR2(50)
, copyTo			VARCHAR2(50)
, creationTimestamp		VARCHAR2(50)
, expiryTimestamp		VARCHAR2(50)
, partyMessageInfo		VARCHAR2(200)
, branch_date			DATE
--29-AUG-2012 Flexcube V.CL Release 7.11.1 FS Tag 03 Changes starts
, event_code			oltbs_contract.curr_event_code%TYPE
, version_no			oltbs_contract.latest_version_no%TYPE
--29-AUG-2012 Flexcube V.CL Release 7.11.1 FS Tag 03 Changes ends
);

TYPE	tbl_fpml_header_rec 
IS TABLE OF p_fpml_header_rec 
INDEX 	BY BINARY_INTEGER;

g_tbl_fpml_hdr_rec		tbl_fpml_header_rec;

--Borrower Record Type Declaration

TYPE p_borr_rec
IS 	RECORD
( borrower_ref_no		oltbs_contract.contract_ref_no%TYPE
, event_seq_no			oltbs_contract.latest_event_seq_no%TYPE
, start_date			oltbs_contract_master.value_date%TYPE
, maturity_date			oltbs_contract_master.maturity_date%TYPE
, booking_date			oltbs_contract_master.booking_date%TYPE
, orig_start_date		oltbs_contract_master.original_start_date%TYPE
, last_available_date		oltbs_contract_master.last_available_date%TYPE
, event_value_date		oltbs_contract_master.value_date%TYPE
, counterparty			oltbs_contract_master.counterparty%TYPE
, counterparty_name sttm_core_customer.customer_name1%TYPE --oltms_customer.customer_name1%TYPE
, dtcc_borrower_id		VARCHAR2(50)
, product_type			oltbs_contract_master.product_type%TYPE
, external_cusip_no		oltbs_contract_master.external_cusip_no%TYPE
, internal_cusip_no		oltbs_contract_master.cusip_no%TYPE
, facility_name			oltbs_contract_master.facility_name%TYPE
, remarks			oltbs_contract_master.remarks%TYPE
, cascade_participation 	oltbs_contract_master.cascade_participation%TYPE
, module_code			oltbs_contract_master.module%TYPE
, event_code			oltbs_contract.curr_event_code%TYPE
, version_no			oltbs_contract_master.version_no%TYPE
, syndication_ref_no		oltbs_contract_master.syndication_ref_no%TYPE
, synd_start_date		oltbs_contract_master.value_date%TYPE
, synd_remarks			lbtbs_syndication_master.remarks%TYPE
, synd_cusip_no			lbtbs_syndication_master.cusip_no%TYPE
, synd_ccy			lbtbs_syndication_master.currency%TYPE
, tranche_ref_no		oltbs_contract_master.tranche_ref_no%TYPE
, tr_ccy			oltbs_contract_master.currency%TYPE
, tr_amount			oltbs_contract_master.amount%TYPE
, dd_ccy			oltbs_contract_master.currency%TYPE
, dd_amount			oltbs_contract_master.amount%TYPE
, main_comp			oltbs_contract_master.main_comp%TYPE
, lc_drawdown			oltbs_contract_master.lc_drawdown%TYPE
, lc_sublimit_amount		oltbs_contract_master.lc_sublimit_amt%TYPE
, no_of_lenders			NUMBER
, commitment_type		oltbs_contract_preference.revolving_commitment%TYPE
, industry_code			oltbs_contract_preference.industry_code%TYPE
, contract_type			VARCHAR2(5)
, rollover_type			VARCHAR2(20)
, is_driver_contract		VARCHAR2(1)
, roll_temp_cont_ref_no		VARCHAR2(16)
, tr_transfer_avl			oltbs_contract_master.amount%TYPE
, tr_outstanding			oltbs_contract_master.amount%TYPE
--15-Jun-2012 Flexcube V.CL Release 7.11, Retro, CITIBLR#35065 Changes start here
, markit_trade_id     		lbtbs_agency_confirm_browser.ext_agency_ref%TYPE
, source_code         		lbtbs_agency_confirm_browser.trade_source%TYPE
--15-Jun-2012 Flexcube V.CL Release 7.11, Retro, CITIBLR#35065 Changes Changes end here
--23-AUG-2012 Flexcube V.CL Release 7.11.1 FS Tag 03 Change start
,agency_type			VARCHAR2(1)
,validate_assignment		VARCHAR2(1)
,global_amount			NUMBER
--23-AUG-2012 Flexcube V.CL Release 7.11.1 FS Tag 03 Change end
);


TYPE	tbl_borr_rec 
IS TABLE OF p_borr_rec 
INDEX 	BY BINARY_INTEGER;

g_tbl_borr_rec			tbl_borr_rec;

--Participant Record Type Declaration

TYPE p_part_rec
IS 	RECORD
( borrower_ref_no		oltbs_contract.contract_ref_no%TYPE
, participant_ref_no		oltbs_contract.contract_ref_no%TYPE
, participant			oltbs_contract.counterparty%TYPE
, participant_name sttm_core_customer.customer_name1%TYPE --oltms_customer.customer_name1%TYPE
, event_seq_no			oltbs_contract.latest_event_seq_no%TYPE --20-MAR-2012 Flexcube V.CL Release 7.10 Lot2, FS Vol1 Tag04 Changes here
, value_date			oltbs_contract_master.value_date%TYPE
, maturity_date			oltbs_contract_master.maturity_date%TYPE
, booking_date			oltbs_contract_master.booking_date%TYPE
, tr_asset_ratio		lbtbs_contract_participant.asset_ratio%TYPE
, dd_asset_ratio		lbtbs_contract_participant.asset_ratio%TYPE
--, dtcc_lender_id		VARCHAR2(50) --07-MAR-2012 Flexcube V.CL Release 7.10 Lot2, FS Vol1 Tag04 Changes
, part_role			VARCHAR2(1)
, buyer				oltbs_contract.counterparty%TYPE
, seller			oltbs_contract.counterparty%TYPE
, agent				oltbs_contract.counterparty%TYPE
, transfer_amount		oltbs_contract_master.amount%TYPE
, mei_code_chng_mode		VARCHAR2(1)	--N -> New ,M -> Modify
--07-MAR-2012 Flexcube V.CL Release 7.10 Lot2, FS Vol1 Tag04 Changes start here
, mei_code			cstms_udf_vals.field_val%TYPE 
, consolidated			VARCHAR2(1) DEFAULT 'N' -- Y -> Yes, N -> No
, buyer_mei_code		cstms_udf_vals.field_val%TYPE
, buyer_part_name sttm_core_customer.customer_name1%TYPE
, seller_mei_code		cstms_udf_vals.field_val%TYPE
, seller_part_name sttm_core_customer.customer_name1%TYPE
, self_part			lbtbs_contract_participant.self_participation%TYPE
--07-MAR-2012 Flexcube V.CL Release 7.10 Lot2, FS Vol1 Tag04 Changes end here
);

TYPE	tbl_part_rec 
IS TABLE OF p_part_rec 
INDEX BY BINARY_INTEGER;
--INDEX BY oltbs_contract.counterparty%TYPE;

g_tbl_part_rec			tbl_part_rec;

--28-FEB-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag 08 ITR2#06,Markit Trade Settlement changes start
TYPE tbl_index
IS TABLE OF NUMBER
INDEX BY VARCHAR2(35);
g_borr_index tbl_index;
g_part_index tbl_index;

g_bulk_tbl_part_rec			tbl_part_rec;
g_bulk_tbl_borr_rec			tbl_borr_rec;
--28-FEB-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag 08 ITR2#06,Markit Trade Settlement changes end


--Global Variables as Rec

TYPE	p_global_rec
IS 	RECORD
(
notc_name			oltbs_fpml_notc_mapping.notc_name%TYPE
, sub_notc_type			oltbs_fpml_notc_mapping.notc_name%TYPE
, curr_part_id			NUMBER
, borr_or_part			VARCHAR2(1) DEFAULT 'P'
, part_mei			VARCHAR2(3)
);


TYPE	tbl_global_rec 
IS TABLE OF p_global_rec 
INDEX BY BINARY_INTEGER;

g_tbl_global_rec		tbl_global_rec;
--15-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 08,Markit Trade Settlement Changes start
g_no_of_tranches		NUMBER;
g_dcn				oltbs_fpml_msg_out.dcn%TYPE;
--15-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 08,Markit Trade Settlement Changes end
-----------------------------Package Function and Procedure Declartion Starts ------------------------------
--27-JUL-2011 Flexcube V.CL Release 7.9 FS Vol2 Tag 06 ITR2#2, changes starts here
FUNCTION fn_get_message_part
		(
		p_dcn			IN	VARCHAR2
		, p_page		IN OUT	NUMBER
		, p_message		OUT	CLOB
		, p_type		IN	VARCHAR2 DEFAULT 'PART'
		)
RETURN BOOLEAN;
--27-JUL-2011 Flexcube V.CL Release 7.9 FS Vol2 Tag 06 ITR2#2, changes ends here
PROCEDURE pr_gen_fpml_message
		(
		p_branch_code		IN	VARCHAR2
		, p_process_seq_no	IN	NUMBER
		);

FUNCTION fn_pop_fpml_msg_out
		(
		p_borrower_ref_no	IN	VARCHAR2
		, p_event_seq_no	IN	NUMBER
		, p_event_code		IN	VARCHAR2		
		, p_process_date	IN	DATE
		, p_notc_name		IN	VARCHAR2
		, p_dcn_to_cancel	IN	VARCHAR2
		, p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

--25-AUG-2011 Flexcube V.CL Release 7.9 FS Vol2 Tag06, ITR2#37,FPML Messaging for Markit Integration changes start
FUNCTION fn_pop_fpml_msg_out
		(
		p_borrower_ref_no	IN	VARCHAR2
		, p_event_seq_no	IN	NUMBER
		, p_event_code		IN	VARCHAR2
		, p_process_date	IN	DATE
		, p_notc_name		IN	VARCHAR2
		, p_dcn_to_cancel	IN	VARCHAR2
		, p_component		IN	VARCHAR2
		, p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
--25-AUG-2011 Flexcube V.CL Release 7.9 FS Vol2 Tag06, ITR2#37,FPML Messaging for Markit Integration changes end
FUNCTION fn_gen_fpml_msg_out
		(
		p_dcn			IN	VARCHAR2
		, p_borrower_ref_no	IN	VARCHAR2
		, p_event_seq_no	IN	NUMBER
		, p_event_code		IN	VARCHAR2
		, p_notc_name		IN	VARCHAR2
		, p_value_date		IN	DATE
		, p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_get_borr_info
		(
		p_borrower_ref_no	IN	VARCHAR2
		, p_event_seq_no	IN	NUMBER
		, p_event_code		IN	VARCHAR2		
		, p_process_date	IN	DATE		
		, p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_get_part_info
		(
		p_borrower_ref_no	IN	VARCHAR2
		, p_event_seq_no	IN	NUMBER
		, p_event_code		IN	VARCHAR2
		, p_process_date	IN	DATE		
		, p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_populate_fpml_header
		(
		p_borrower_ref_no	IN	VARCHAR2
		, p_notc_name		IN	VARCHAR2
		, p_process_date	IN	DATE
		, p_dcn			IN	VARCHAR2
		, p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_populate_fpml_body
		(
		p_borrower_ref_no	IN	VARCHAR2
		, p_event_seq_no	IN	NUMBER
		, p_process_date	IN	DATE		  
		, p_notc_name		IN	VARCHAR2
		, p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_pop_child_tags
		(
		p_notc_name		IN	VARCHAR2
		, p_tag_name		IN	VARCHAR2
		, p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_append_tags
		(
		p_notc_level		IN	NUMBER
		, p_tag_name		IN	VARCHAR2		
		, p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_add_attribute
		(
		p_tag_name		IN	VARCHAR2
		, p_notc_level		IN	NUMBER
		, p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		, p_index		IN VARCHAR2 DEFAULT NULL --29-AUG-2012 Flexcube V.CL Release 7.11.1 FS Tag 03 Change
		)
RETURN BOOLEAN;

FUNCTION fn_get_timestamp
		(
		p_process_date		IN	DATE
		, p_timestamp		IN OUT	VARCHAR2
		, p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_get_fpml_dt_format
		(
		p_in_date		IN	DATE
		)
RETURN VARCHAR2;

FUNCTION fn_gen_takeOnDealDefn_notc
		(
		p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)	
RETURN BOOLEAN;

FUNCTION fn_gen_takeOnFacility_notc
		(
		p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)	
RETURN BOOLEAN;

FUNCTION fn_gen_cancel_notc
		(
		p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)	
RETURN BOOLEAN;

FUNCTION fn_gen_PositionUpdate_notc
		(
		p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)	
RETURN BOOLEAN;

FUNCTION fn_gen_drawdown_notc
		(
		p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)	
RETURN BOOLEAN;

FUNCTION fn_gen_amendContract_notc
		(
		p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)	
RETURN BOOLEAN;

FUNCTION fn_gen_commitAdjustment_notc
		(
		p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)	
RETURN BOOLEAN;

FUNCTION fn_gen_DealDefinition_notc
		(
		p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)	
RETURN BOOLEAN;

FUNCTION fn_gen_repayment_notc
		(
		p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)	
RETURN BOOLEAN;

FUNCTION fn_gen_interestPayment_notc
		(
		p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)	
RETURN BOOLEAN;

FUNCTION fn_gen_lcIssuance_notc
		(
		p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)	
RETURN BOOLEAN;

FUNCTION fn_gen_lcTermination_notc
		(
		p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)	
RETURN BOOLEAN;

FUNCTION fn_gen_onGoingFee_notc
		(
		p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)	
RETURN BOOLEAN;

FUNCTION fn_gen_oneOffFee_notc
		(
		p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)	
RETURN BOOLEAN;

FUNCTION fn_gen_rollover_notc
		(
		p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)	
RETURN BOOLEAN;

FUNCTION fn_fpml_borr_validation
		(
		p_borrower_ref_no	IN	VARCHAR2
		, p_notc_name		IN	VARCHAR2
		, p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)	
RETURN BOOLEAN;

FUNCTION fn_fpml_part_validation
		(
		p_borrower_ref_no	IN	VARCHAR2
		, p_participant		IN	VARCHAR2
		, p_mei_code		IN OUT	VARCHAR2 --07-MAR-2012 Flexcube V.CL Release 7.10 Lot2, FS Vol1 Tag04 Changes here
		, p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)	
RETURN BOOLEAN;

FUNCTION fn_fpml_validate_msg_gen
		(
		p_borrower_ref_no	IN	VARCHAR2
		, p_event_code		IN	VARCHAR2		
		, p_notc_name		IN	VARCHAR2		
		, p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)	
RETURN BOOLEAN;

FUNCTION fn_release_fpml_msg
		(
		p_borrower_ref_no	IN 	oltbs_fpml_msg_out.dcn%TYPE
		, p_event_seq_no	IN 	oltbs_fpml_msg_out.esn%TYPE
		, p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_fpml_handoff
		(
		p_dcn 			IN 	oltbs_dly_msg_out.dcn%TYPE
		, p_out_dir		IN	VARCHAR2
		, p_fpml_file		IN	VARCHAR2
		)
RETURN BOOLEAN;

PROCEDURE pr_gen_fpml_offline_msg
		( 
		p_branch_code		IN	VARCHAR2
		, p_process_seq_no	IN	NUMBER
		);
		
FUNCTION fn_pop_offline_msg_for_cancel
		(
		p_borrower_ref_no	IN	VARCHAR2
		, p_event_seq_no	IN	NUMBER
		, p_event_code		IN	VARCHAR2
		, p_process_date	IN	DATE
		, p_esn_to_cancel	IN 	NUMBER
		, p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_pop_offline_msg
		(
		p_borrower_ref_no	IN	VARCHAR2
		, p_event_seq_no	IN	NUMBER
		, p_event_code		IN	VARCHAR2
		, p_notc_name		IN 	VARCHAR2
		, p_process_date	IN	DATE
		, p_dcn_to_cancel	IN 	VARCHAR2
		, p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_pop_offline_for_cusip_chng
		(
		p_borrower_ref_no	IN	VARCHAR2
		, p_event_seq_no	IN	NUMBER
		, p_event_code		IN	VARCHAR2
		, p_process_date	IN	DATE
		, p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)	
RETURN BOOLEAN;

FUNCTION fn_pop_oldmsg_for_cusip_chng
		(
		p_borrower_ref_no	IN	VARCHAR2
		, p_event_seq_no	IN	NUMBER
		, p_event_code		IN	VARCHAR2
		, p_process_date	IN	DATE
		, p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)	
RETURN BOOLEAN;

FUNCTION fn_update_fpml_msg_out
		( 
		p_dcn			IN	VARCHAR2
		, p_message		IN	CLOB
		, p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_gen_msg_for_cusipAmend
		(
		p_dcn			IN	VARCHAR2
		, p_fpml_msg		OUT	CLOB
		, p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_get_process_sequence
		(
		p_branch_code		IN	VARCHAR2
		, p_process_code	IN	VARCHAR2
		, p_process_seq_no	OUT	NUMBER
		, p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

--15-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 08,Markit Trade Settlement Changes start
FUNCTION fn_gen_markit_fpml_msg_out
(
	p_markit_id	IN 	lbtbs_agency_confirm_browser.ext_trade_id%TYPE,
	p_notc_name	IN 	oltbs_fpml_notc_mapping.notc_name%TYPE,
	p_source_code	IN	lbtbs_trade_processing_queue.source_code%TYPE,
	p_value_date	IN	DATE,
	p_dcn		IN	oltbs_fpml_msg_out.dcn%TYPE,	
	p_error_code	IN OUT	VARCHAR2,
	p_error_param	IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--15-NOV-2011 Flexcube V.CL Release 7.10, FS Vol 1 Tag 08,Markit Trade Settlement Changes end

--16-FEB-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag 07 ITR1#69 changes start
FUNCTION fn_check_impacted_events 
(
 p_contract_no	IN	oltbs_contract.contract_ref_no%TYPE,
 p_value_dt	IN	DATE, 
 p_err_code	IN OUT	VARCHAR2,
 p_err_param	IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--16-FEB-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag 07 ITR1#69 changes end

--29-AUG-2012 Flexcube V.CL Release 7.11.1 FS Tag 03 Changes starts
FUNCTION fn_fpml_validate_msg_gen_fac
		(
		p_borrower_ref_no	IN	VARCHAR2
		, p_event_code		IN	VARCHAR2
		, p_notc_name		IN	VARCHAR2
		, p_error_code		IN OUT	VARCHAR2
		, p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
--29-AUG-2012 Flexcube V.CL Release 7.11.1 FS Tag 03 Changes ends

END olpks_fpml;
/
CREATE or replace SYNONYM olpkss_fpml FOR olpks_fpml
/