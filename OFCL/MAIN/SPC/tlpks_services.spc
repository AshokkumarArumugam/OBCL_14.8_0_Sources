CREATE OR REPLACE PACKAGE tlpks_services
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: tlpks_services.SPC
**
** Module	: LT - SECONDARY LOAN TRADING
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
**
----------------------------------------------------------------------------------------------------
*/

/*---------------------------------CHANGE HISTORY-----------------------------------------------
10-JUL-2008 FLEXCUBE V.CL 7.4 RELEASE ,NEW UNIT CREATED
24-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#49 Changes by Madhu
	    Added a new function fn_create_new_ver_onrev

08-JAN-2009 FLEXCUBE V.CL Release 7.4 MTR2 SFR#15 Changes,added a new function
08-JAN-2009 FLEXCUBE V.CL Release 7.4 MTR2 SFR#20, 08-JAN-2009, Added TRS Accounting Related Changes
03-FEB-2009 FLEXCUBE V.CL RELEASE 7.4 ITR2 SFR#4 , Ticket settlement/payment msgs related changes
03-FEB-2009 FLEXCUBE V.CL RELEASE 7.4 ITR2 SFR#4 ,(Dev Changes)New function Fn_pmsg_for_ticket has been added.
24-JUL-2009 CITIUS-LS#6036.The trade percent should be computed based on the participation value of the self participant for which the trade is performed.
26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro Multiple Expense Code Changes
							 changed the copyright clause.
14-SEP-2009 FLEXCUBE V.CL Release 7.5 lot1.2 CITIUS-LS Till#6338 , Reverting the changes to calculate the trade percentage with initial logic.
09-SEP-2009 CITIUS-LS#6329 FCC V.CL Release 7.5 Lot1.2 RT SFR#12 , Blocking Clearpar Routine based on param value
22-SEP-2009 FLEXCUBE V.CL Release 7.5 lot1.2 CITIUS-LS Till#6378,Handoff to ls was blocked for
		OL and PL trades,Function was added to get the origination desk
02-OCT-2009 CITIUS-LS#6718 Enhancement for CLP Trades - LQT will send CLP Trades where multiple cusips can be possible under the same ticket id
10-OCT-2009 CITIUS-LS#6751 New package variables g_dbg_user and g_stub_processing for the new SLT utility screen
19-OCT-2009 CITIUS-LS#6779 Transfer Percentage for DCF computation should be taken based on the value date which is the date used to pick up the Basis amount for DCF compuration
28-OCT-2009 CITIUS-LS#6805 Reverting the changes of arriving Trade percentage for DCF computation
15-MAR-2010 PBG CONSOLIDATION,SLT BO Reports(Net income report) Related Changes
29-Mar-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7048,For Sale Trade, Trade amount cannot be more then the availability of the Tranche amount
24-May-2010 FLEXCUBE V.CL Release 7.7 SLT Handling Exceptional Cases for Subticket
		13-May-2010 FLEXCUBE V.CL Release 7.6 RT1 SFR#9 , Handling Exceptional Cases
25-Jun-2010 FLEXCUBE V.CL Release 7.7 FS Tag 3.3.3 Display of ticket id changes
04-AUG-2010 FLEXCUBE V.CL Release 7.7 VOL4 FS Tag 03 CHANGE, New Function fn_get_silent_participant is added to get silent participant
							     New Function fn_get_clp_external_party is added
07-AUG-2010 FLEXCUBE V.CL Release 7.7 VOL3 FS Tag 03 Changes,Function added to get the assignment fee currency
18-AUG-2010 FLEXCUBE V.CL Release 7.7 Retro, CITIUS-LS#7327 in LT-LS handoff position locking is being skipped
29-SEP-2010 FLEXCUBE V.CL Release 7.7 RT1 SFR#5, CITIUS Retro, #7442 The validation to stop the settlement incases where agency has the drawdowns which are past maturity and outstanding balance is present at the ticket/trade settlement screen
25-NOV-2010 FLEXCUBE V.CL Release 7.8 VOL2 FS Tag6 DCF on 1st time buys changes,also moved CREATE PACKAGE to top.
08-DEC-2010 FLEXCUBE V.CL Release 7.8 Retro,
					26-SEP-2010 CITIUS-LS#7509--CITIUS-LS#7518 catch up retro
07-JAN-2011 Flexcube V.CL Release 7.8, SFR#14, CITIUS Retro #7471 Fn_get_posid function added.
28-FEB-2011 Flexcube V.CL Release 7.9,CITIUS Retro,#7496 fn_lock_trade_queue function added.
14-JUN-2011 Flexcube V.CL Release 7.9, CITIUS Retro, <CITIUS-LS#9517> : Added new function Fn_check_bv_termination
18-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,9805 moved declration from sql to spc pr_log_orig_buy_fee
06-JAN-2012 Flexcube V.CL Release 7.10 Lot2, FS Vol1 Tag05, Trade Level Settlement Changes- Change Done to
									a) Add a global variable"g_ticket_settlement" to dynamically assign whether the
										transaction is ticket level or Trade level
									b) A new function Fn_tickt_trade_stlmnt_allowed is added to derive the
									  tickt_trade_stlmnt_allowed Flag value.
									c)A new procedure pr_set_ticket_set_allowed is added to set the "g_ticket_settlement"
									 value.
27-APR-2012 Flexcube V.CL Release 7.11 FS Tag 05 Trade Date accounting entries Change:declaration of Fn_get_agency_dtls.
16-JUL-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 RETRO CITIUS#19084 7.14.2 compare Retro,change history was missing for the below mentioned tag.
					26-Sep-2013 CITIUS#18060 Changes System is allowing the userr to settle the trade or ticket even their related Drawdown/Tranche is an Unauth state.
19-AUG-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 RETRO CITIUS#19106 changes: As part of internal trade booking as part of tranche creation system is populating the internal deal for Orig desk with proof 234 instead of 702. Fix made to check only 702 should be populated.
09-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag05 IUT#147 changes,system was not calculating the DCF fee during settlement
21-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 changes,below new functions are added,
            fn_check_hfs_portfolio,fn_check_open_trade,fn_hfs_portfolio_validation
06-APR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 RETRO CITIUS#19697 Changes new function for getting counterparty/CUSIP.
13-APR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag03 changes Cusip Swing,added new function
09-MAY-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag03 changes, new function added to get cusip-tranche linkage end date
18-MAY-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 IUT#305 Changes modified the function fn_check_open_settled_trade to check whether balance matching
01-JUN-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 IUT#308 change, system performing wrong position validation.
15-JUN-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag07 ITR#43 changes, commented the restoration function
13-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag06 Netting and Combined Settlement Trading changes
------------------------------END CHANGE HISTORY----------------------------------------------
*/
--CREATE OR REPLACE PACKAGE tlpks_services
--AS

g_func_id	VARCHAR2(4);
--CITIUS-LS#6751
g_dbg_user 			smtbs_user.user_id%TYPE;
g_stub_processing	VARCHAR2(1) DEFAULT 'N';

g_ticket_settlement	VARCHAR2(1):='N';  --06-JAN-2012 Flexcube V.CL Release 7.10 Lot2, FS Vol1 Tag05, Trade Level Settlement Changes

PROCEDURE pr_set_stub_proc
(
	p_stub_proc 		IN VARCHAR2,
	p_dbg_user			IN VARCHAR2
);
--CITIUS-LS#6751
--18-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,9805 start
PROCEDURE pr_log_orig_buy_fee
(
p_contract_ref_no IN tltbs_orig_buy_fee_log.contract_ref_no%TYPE,
p_event_seq_no    IN tltbs_orig_buy_fee_log.event_seq_no%TYPE,
p_event_code      IN tltbs_orig_buy_fee_log.event_code%TYPE,
p_comm_ref_no     IN tltbs_orig_buy_fee_log.comm_ref_no%TYPE,
p_comm_fee_esn	  IN tltbs_orig_buy_fee_log.comm_fee_esn%TYPE,
p_fee_comp        IN tltbs_orig_buy_fee_log.fee_comp%TYPE,
p_fee_ccy         IN tltbs_orig_buy_fee_log.fee_ccy%TYPE,
p_fee_amount      IN tltbs_orig_buy_fee_log.fee_amount%TYPE,
p_process_stat    IN tltbs_orig_buy_fee_log.process_stat%TYPE,
p_error_code      IN tltbs_orig_buy_fee_log.error_code%TYPE,
p_error_param     IN tltbs_orig_buy_fee_log.error_param%TYPE
);
--18-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,9805 end

FUNCTION fn_get_ref_no
(
p_branch			IN 				oltbs_contract.branch%TYPE
,p_product			IN 				oltbs_contract.product_code%TYPE
,p_book_date		IN 				oltbs_contract.book_date%TYPE
,p_serial			IN OUT	NOCOPY	VARCHAR2
,p_ref_no			IN OUT	NOCOPY	oltbs_contract.contract_ref_no%TYPE
,p_err_code			IN OUT	NOCOPY	ertbs_msgs.err_code%TYPE
,p_err_params		IN OUT	NOCOPY	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_get_date_time
(
pm_appldate		IN	DATE
)
RETURN DATE;

FUNCTION fn_register_an_event
(
p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
p_processing_date	IN	date,
p_event_code		IN	oltbs_contract.curr_event_code%TYPE,
p_event_value_date	IN	date,
p_contract_status	IN	oltbs_contract_event_log.contract_status%TYPE,
p_authorization_status	IN	oltbs_contract.auth_status%TYPE,
p_new_version_ind	IN	oltbs_contract_event_log.new_version_indicator%TYPE,
p_reversed_esn		IN	oltbs_contract.latest_event_seq_no%TYPE,
p_err_code		IN OUT	ertbs_msgs.err_code%TYPE,
p_err_param		IN OUT	Varchar2
)
RETURN BOOLEAN ;

FUNCTION fn_create_new_version
(
p_contract_ref_no	IN 		oltbs_contract.contract_ref_no%TYPE,
p_version_no		IN OUT	oltbs_contract.latest_version_no%TYPE,
p_err_code			IN OUT	VARCHAR2,
p_err_params		IN OUT	VARCHAR2
)
RETURN BOOLEAN;

PROCEDURE pr_pop_position_lock
(
p_position_id		IN	VARCHAR2,
p_cusip_no			IN	VARCHAR2,
P_expense_code		IN	VARCHAR2 --26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro Multiple Expense Code Changes
);

FUNCTION fn_authorize_contract
(
p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
p_err_code			IN 	OUT	ertbs_msgs.err_code%TYPE,
p_err_param			IN 	OUT	Varchar2,
p_auth_flag			IN		VARCHAR2 DEFAULT 'N'
)
RETURN BOOLEAN;

FUNCTION fn_reverse_contract
(
  p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
  p_ext_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
  p_source_code			IN		VARCHAR2,
  p_branch				IN 		VARCHAR2,
  p_contract_stat		IN 		VARCHAR2,
  p_version_no			IN 		NUMBER,
  p_handoff_action_code IN    	CHAR,
  p_TranType            IN    	oltms_trn_type.trn_type%TYPE,
  p_err_code           	IN OUT 	ertbs_msgs.err_code%TYPE,
  p_err_params      	IN OUT 	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION Fn_get_agency_ref_no
(
P_Trade_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
)
RETURN VARCHAR2;

FUNCTION fn_obtain_contract_lock
(
p_ext_contract_ref_no	IN	 	TLTB_UPLOAD_MASTER.Ext_Contract_Ref_no%TYPE,
p_err_code				IN OUT	ERTBS_MSGS.Err_Code%Type,
p_err_param				IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_obtain_trade_lock
(
p_Trade_ref_no		IN	OLTB_CONTRACT.Contract_Ref_No%TYPE,
p_err_code		IN OUT 	ERTBS_MSGS.Err_Code%Type,
p_err_param		IN OUT 	VARCHAR2,
p_lock_required		IN	VARCHAR2 DEFAULT 'Y' --CITIUS-LS#7327
)
RETURN BOOLEAN;

FUNCTION fn_get_position_identifier
(
p_branch			IN	tltms_portfolio.branch%Type,
p_product			IN	oltms_product.product_code%Type,
p_book_date			IN	Date,
p_portfolio			IN	tltms_portfolio.portfolio%Type,
p_qualifier			IN	tltms_position_identifier.position_qualifier%Type,
p_identifier_type	IN	tltms_position_identifier.identifier_type%type,
p_identifier		OUT	tltms_position_identifier.position_identifier%Type,
p_err_code			OUT	Varchar2,
p_err_param			OUT	Varchar2
)
Return boolean;
--created by sweta to generate the positon identifier and populate it in the front end.
FUNCTION Fn_gen_position_identifier
(
P_portfolio				IN	tltms_portfolio.portfolio%TYPE,
P_branch				IN	tltms_portfolio.branch%TYPE,
P_date					IN	DATE,
P_Position_identifier	OUT	tltms_position_identifier.position_identifier%TYPE,
P_error_code			OUT	ertbs_msgs.err_code%TYPE,
P_error_param			OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_Restore
(
p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE
)
RETURN Boolean;

FUNCTION fn_delete_backup
(
 p_contract_ref_no	IN	tltbs_contract_fee.contract_ref_no%type
)
RETURN Boolean;

FUNCTION fn_BackUp
(
 p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE
)
RETURN Boolean;

FUNCTION fn_Backup_accr
(
p_contract_ref_no IN    oltbs_contract.contract_ref_no%TYPE
)
RETURN Boolean;

FUNCTION fn_Restore_accr
(
p_contract_ref_no IN    oltbs_contract.contract_ref_no%TYPE
)
RETURN Boolean;

FUNCTION Fn_copy_product
(
 p_old_product		IN	oltms_product.product_code%TYPE,
 p_new_product		IN	oltms_product.product_code%TYPE
)
RETURN BOOLEAN;

FUNCTION fn_link_trade
(
p_ext_contract_ref_no   IN      tltbs_upload_master.Ext_Contract_Ref_no%TYPE,
p_err_code              IN OUT  ertbs_msgs.Err_Code%Type,
p_err_param             IN OUT  VARCHAR2
)
RETURN BOOLEAN;

FUNCTION Fn_ticket_setl_required
(
P_branch		IN 	VARCHAR2
)
RETURN VARCHAR2;

FUNCTION Fn_get_ticket_records
(
P_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE,
P_ticket_master_rec	OUT	tltbs_ticket_master%ROWTYPE,
P_ticket_detail_rec	OUT	tltbs_ticket_detail%ROWTYPE,
P_Error_code		IN OUT	VARCHAR2,
P_Error_params		IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION Fn_validate_ticket_stat
(
P_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE,
P_action			IN	VARCHAR2,
P_validate_for		IN	VARCHAR2, --T-Trade/S-Settlemement
P_Error_code		IN OUT	VARCHAR2,
P_Error_params		IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_get_funded_amt
(
p_agency_ref_no         IN  TLTB_UPLOAD_MASTER.ext_contract_ref_no%TYPE,
p_trade_amt		IN  TLTB_UPLOAD_MASTER.trade_amount%TYPE,
p_funded_amt		OUT TLTB_UPLOAD_MASTER.trade_amount%TYPE,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_delete_product
(
P_Product_Code		IN	oltms_product.Product_Code%TYPE,
P_Error_code		IN OUT	VARCHAR2,
P_Error_params		IN OUT	VARCHAR2
)
RETURN BOOLEAN;

--maneeha added, starts, moved the call from settlement to services.
FUNCTION Fn_delete
(
P_contract_Ref_No	IN	tltbs_contract_master.Contract_Ref_No%TYPE,
P_Error_Code		IN OUT	VARCHAR2,
P_Error_Params		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--maneeha added, ends
FUNCTION Fn_get_trade_record
(
P_contract_ref_no 	IN 	tltbs_contract_master.contract_ref_no%TYPE,
P_contmaster_rec	OUT	tltbs_contract_master%ROWTYPE,
P_error_code		IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION Fn_get_setl_record
(
P_contract_ref_no 	IN 	tltbs_contract_master.contract_ref_no%TYPE,
P_contmaster_rec	OUT	tltbs_settlement_master%ROWTYPE,
P_error_code		IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_get_stp_Ref_No
(
p_trade_ref_no		IN	oltbs_contract.contract_ref_no%TYPE
)
RETURN VARCHAR2;

FUNCTION fn_set_func_id
(
p_func_id		IN	VARCHAR2,
p_error_code		IN OUT	VARCHAR2,
p_error_params		IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION Fn_multiccy_tag
(
p_amount_tag		IN oltbs_amount_tag.amount_tag%TYPE
)
RETURN VARCHAR2;

FUNCTION Fn_msg_gen_chk
(
p_contract_ref_no		tltbs_amount_due.contract_ref_no%type,
p_component			tltbs_amount_due.component%type
)
RETURN CHAR;

FUNCTION Fn_get_Trade_Identifier
(
p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE
)
RETURN VARCHAR2;

FUNCTION fn_authorize_draft_trade
(
p_ext_contract_ref_no	IN	tltbs_upload_master.ext_contract_ref_no%TYPE
,p_err_code		IN OUT	VARCHAR2
,p_err_param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION Fn_delete_swap_recs
(
p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
p_event_code		IN	oltbs_contract_event_log.event_code%TYPE,
p_esn			IN	NUMBER,
p_error_code		IN OUT	VARCHAR2,
p_error_params		IN OUT	VARCHAR2
)
RETURN BOOLEAN;

FUNCTION Fn_authorize_swap_recs
(
p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
p_error_code		IN OUT	VARCHAR2,
p_error_params		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_get_latest_esn
(
p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
p_event_code		IN		oltbs_contract_event_log.event_code%TYPE
)
RETURN NUMBER;
FUNCTION fn_create_new_ver_onrev
(
p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
p_version_no	 	IN OUT	oltbs_contract.latest_version_no%TYPE,
p_err_code	 	IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
---FLEXCUBE V.CL Release 7.4 MTR2 SFR#15 Changes starts
FUNCTION Fn_get_swap_id
(
p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE
)
RETURN CHAR;
---FLEXCUBE V.CL Release 7.4 MTR2 SFR#15 Changes ends

--FLEXCUBE V.CL Release 7.4 MTR2 SFR#20, 08-JAN-2009, Added TRS Accounting Related Changes START
FUNCTION fn_trs_accounting_type
(
p_contract_ref_no		IN   oltbs_contract.contract_ref_no%TYPE
)
RETURN CHAR;
--FLEXCUBE V.CL Release 7.4 MTR2 SFR#20, 08-JAN-2009, Added TRS Accounting Related Changes END
FUNCTION fn_get_confirmation_status
(
p_ticket_id		IN	TLTB_TICKET_MASTER.ticket_id%TYPE,
p_process_ref_no	IN	oltbs_contract.contract_ref_no%type,
p_confirmation_status	OUT	CHAR,
p_err_code		IN OUT	VARCHAR2,
p_err_param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
FUNCTION Fn_get_Trade_Percentage
(
p_contract_ref_no       IN          tltbs_contract_fee_master.contract_ref_no%TYPE,
p_Transfer_Percent      OUT         NUMBER,
p_error_code            IN OUT      VARCHAR2,
p_error_param           IN OUT      VARCHAR2
)
RETURN BOOLEAN;
--03-FEB-2009 FLEXCUBE V.CL RELEASE 7.4 ITR2 SFR#4 Starts
FUNCTION fn_is_ticket_settlement
(
p_contract_ref_no	IN	tltbs_ticket_master.ticket_ref_no%TYPE,
p_ticket_id		IN	tltbs_ticket_master.ticket_id%TYPE
)
RETURN CHAR;
--03-FEB-2009 FLEXCUBE V.CL RELEASE 7.4 ITR2 SFR#4 Ends
--03-FEB-2009 FLEXCUBE V.CL RELEASE 7.4 ITR2 SFR#4 ,(Dev Changes)New function Fn_pmsg_for_ticket has been added.Start
FUNCTION Fn_pmsg_for_ticket
(
P_contract_ref_no	IN tltbs_contract_master.contract_ref_no%TYPE,
P_pmsg_for_ticket	IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--03-FEB-2009 FLEXCUBE V.CL RELEASE 7.4 ITR2 SFR#4 ,(Dev Changes)New function Fn_pmsg_for_ticket has been added.End
--CITIUS-LS#6036 CHANGES START
-----------------------------------------------------------------------------------------------
FUNCTION Fn_get_total_portfolio
(
P_contract_ref_no	IN 		tltbs_contract_master.contract_ref_no%TYPE,
P_amount			OUT		NUMBER,
p_error_code		IN OUT	VARCHAR2,
p_error_param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;

--FLEXCUBE V.CL Release 7.5 lot1.2 CITIUS-LS Till#6378 STARTS
FUNCTION fn_get_orig_pos_identifier
	(p_contract_master		IN	TLTB_CONTRACT_MASTER%rowtype,
	 p_orig_pos_identifier	OUT	VARCHAR2,
	 p_err_code				OUT	VARCHAR2,
	 p_err_param			OUT	VARCHAR2
	 )
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.5 lot1.2 CITIUS-LS Till#6378 ENDS

-----------------------------------------------------------------------------------------------
--14-SEP-2009 FLEXCUBE V.CL Release 7.5 lot1.2 CITIUS-LS Till#6338 Comments Starts
/*
FUNCTION Fn_get_agency_part_ratio
(
P_contract_ref_no	IN 		tltbs_contract_master.contract_ref_no%TYPE,
P_agency_ref_no		IN		tltbs_contract_master.contract_ref_no%TYPE,
P_portfolio		IN		tltbs_contract_master.portfolio%TYPE,
P_part_ratio		OUT		lbtbs_contract_participant.asset_ratio%TYPE,
p_error_code            IN OUT      	VARCHAR2,
p_error_param           IN OUT     	VARCHAR2
)
RETURN BOOLEAN;
*/
--14-SEP-2009 FLEXCUBE V.CL Release 7.5 lot1.2 CITIUS-LS Till#6338 Comments Ends
-----------------------------------------------------------------------------------------------
--CITIUS-LS#6036 CHANGES END
--CITIUS-LS#6329--09-SEP-2009 FCC V.CL Release 7.5 Lot1.2 RT SFR#12 , Blocking Clearpar Routine based on param value START
FUNCTION fn_get_agency_conf_type
RETURN VARCHAR2;
--CITIUS-LS#6329--09-SEP-2009 FCC V.CL Release 7.5 Lot1.2 RT SFR#12 , Blocking Clearpar Routine based on param value END
--CITIUS-LS#6718 changes start
FUNCTION fn_get_desk_code
(
	p_firm_acct_mnemonic 	IN 		oltbs_lt_trade.firm_acct_mnemonic%TYPE,
	p_desk_code				OUT		lbtms_desk.desk_code%TYPE,
	p_cusip_no				IN      TLTB_UPLOAD_MASTER.cusip_no%type,   --21-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 changes
	p_error_code			IN 	OUT	VARCHAR2,
	p_error_param			IN	OUT	VARCHAR2
)
RETURN BOOLEAN;

PROCEDURE pr_replace_ticket
(
	p_ticket_id		IN OUT tltbs_upload_master.ticket_id%TYPE
);


--CITIUS-LS#6718 changes end
--28-OCT-2009 CITIUS-LS#6805 changes start
/*
--19-OCT-2009 CITIUS-LS#6779 changes start
FUNCTION Fn_get_Trade_Percentage_dcf
(
p_contract_ref_no       IN          tltbs_contract_fee_master.contract_ref_no%TYPE,
p_value_date			IN			tltbs_agency_balance.value_date%TYPE
)
RETURN NUMBER;
*/
--19-OCT-2009 CITIUS-LS#6779 changes end
--28-OCT-2009 CITIUS-LS#6805 changes end
---15-MAR-2010 PBG CONSOLIDATION,SLT BO Reports(Net income report) Related ChangesSTARTS
FUNCTION Fn_get_posid_details
			(
			p_contract_ref_no	IN	VARCHAR2,
			p_exp_code		IN	VARCHAR2,
			p_pos_id		OUT	VARCHAR2,
			p_tr_ccy		OUT	VARCHAR2,
			p_desk			OUT	VARCHAR2,
			p_error_code		IN OUT	VARCHAR2,
			p_error_param		IN OUT	VARCHAR2
			)
RETURN BOOLEAN ;
---15-MAR-2010 PBG CONSOLIDATION,SLT BO Reports(Net income report) Related ChangesENDS

-- 29-Mar-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7048,For Sale Trade, Trade amount cannot be more then the availability of the Tranche amount stat
FUNCTION fn_check_availability
	(
	p_ticket_id		IN	tltbs_contract_master.ticket_id%TYPE,
	p_actual_setl_date	IN	DATE,
	p_process_trades	OUT	VARCHAR2,
	p_agency_ref_no		OUT	VARCHAR2,
	p_err_code		IN OUT	VARCHAR2,
	p_err_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
-- 29-Mar-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7048,For Sale Trade, Trade amount cannot be more then the availability of the Tranche amount end

--29-SEP-2010 FLEXCUBE V.CL Release 7.7 RT1 SFR#5, CITIUS Retro, #7442 changes starts
FUNCTION Fn_check_dd_past_maturity
	(
	p_ticket_id		IN tltbs_contract_master.ticket_id%type,
	p_actual_settl_date	IN date,
	p_dd_past_matdt_exists	IN OUT VARCHAR2,
	p_agency_ref_no		OUT oltbs_contract.contract_ref_no%type,
	p_err_code		IN OUT	VARCHAR2,
	p_err_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--29-SEP-2010 FLEXCUBE V.CL Release 7.7 RT1 SFR#5, CITIUS Retro, #7442 changes ends


--24-May-2010 FLEXCUBE V.CL Release 7.7 SLT Handling Exceptional Cases for Subticket start
FUNCTION fn_is_subticket_repop_reqd
	(
	p_trade_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE
	)
RETURN VARCHAR2;
--24-May-2010 FLEXCUBE V.CL Release 7.7 SLT Handling Exceptional Cases for Subticket end
--25-Jun-2010 FLEXCUBE V.CL Release 7.7 FS Tag 3.3.3 Display of ticket id changes starts
FUNCTION fn_get_ticket_id
	(p_contract_ref_no IN      oltbs_contract_master.contract_ref_no%TYPE,
	 p_version_no      IN      oltbs_contract_master.version_no%TYPE,
	 p_event_seq_no    IN      oltbs_contract_master.event_seq_no%TYPE,
	 p_ticket_id       OUT     tltbs_contract_master.ticket_id%TYPE,
	 p_err_code        IN OUT  VARCHAR2,
	 p_err_params      IN OUT  VARCHAR2
	)
RETURN BOOLEAN;
--25-Jun-2010 FLEXCUBE V.CL Release 7.7 FS Tag 3.3.3 Display of ticket id changes ends
--04-AUG-2010 FLEXCUBE V.CL Release 7.7 VOL4 FS Tag 03 CHANGE Start
FUNCTION fn_get_silent_participant
RETURN VARCHAR2;
FUNCTION fn_get_clp_external_party
	(
	p_contract_ref_no	IN	VARCHAR2,
	p_external_party	OUT	VARCHAR2,
	p_err_code		OUT	VARCHAR2
	)
RETURN BOOLEAN;
--04-AUG-2010 FLEXCUBE V.CL Release 7.7 VOL4 FS Tag 03 CHANGE End
--FLEXCUBE V.CL Release 7.7 VOL3 FS Tag 03 starts
FUNCTION Fn_get_assign_fee_ccy
		(
		p_cont_ref_no		IN	VARCHAR2,
		p_ext_ref_no		IN	VARCHAR2,
		p_trd_ccy		IN	VARCHAR2
		)
RETURN VARCHAR2;
--FLEXCUBE V.CL Release 7.7 VOL3 FS Tag 03 ends
--25-NOV-2010 FLEXCUBE V.CL Release 7.8 VOL2 FS Tag6 DCF on 1st time buys changes start
FUNCTION fn_get_first_buy_participant
RETURN VARCHAR2;
--25-NOV-2010 FLEXCUBE V.CL Release 7.8 VOL2 FS Tag6 DCF on 1st time buys changes end
--CITIUS-LS#7518 start
--CITIUS-LS#7509 Changes starts
FUNCTION fn_validate_portfolio_position
		(
		p_ticket_id		IN		tltbs_contract_master.ticket_id%TYPE,
		p_actual_setl_date	IN		DATE,
		p_process_trades	OUT		VARCHAR2,
		p_portfolio		OUT		VARCHAR2,
		p_agency_ref_no		OUT		VARCHAR2,
		p_err_code		IN OUT	VARCHAR2,
		p_err_params		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
--CITIUS-LS#7509 Changes ends
--CITIUS-LS#7518 end
--07-JAN-2011 Flexcube V.CL Release 7.8, SFR#14, CITIUS Retro #7471 start
FUNCTION Fn_get_posid
			(
			p_contract_ref_no	IN	VARCHAR2,
			p_exp_code			IN	VARCHAR2
			)
RETURN VARCHAR2;
--07-JAN-2011 Flexcube V.CL Release 7.8, SFR#14, CITIUS Retro #7471 end
--28-FEB-2011 Flexcube V.CL Release 7.9,CITIUS Retro,#7496 changes start
FUNCTION fn_lock_trade_queue
(p_contract_ref_no	IN  oltbs_contract.contract_ref_no%type,
 p_err_code			OUT ertbs_msgs.err_code%type
)
RETURN BOOLEAN;
--28-FEB-2011 Flexcube V.CL Release 7.9,CITIUS Retro,#7496 changes end
--14-JUN-2011 Flexcube V.CL Release 7.9, CITIUS Retro, <CITIUS-LS#9517> Changes Starts
--CITIUS-LS#9517 Changes starts
FUNCTION Fn_check_bv_termination
(
p_borr_ref_no	oltbs_contract.contract_ref_no%type
)
RETURN VARCHAR2;
--CITIUS-LS#9517 Changes Ends
--14-JUN-2011 Flexcube V.CL Release 7.9, CITIUS Retro, <CITIUS-LS#9517> Changes Ends
--06-JAN-2012 Flexcube V.CL Release 7.10 Lot2, FS Vol1 Tag05, Trade Level Settlement Changes STARTS
FUNCTION Fn_tickt_trade_stlmnt_allowed
	(
	P_branch		IN 	VARCHAR2
	)
RETURN VARCHAR2;
PROCEDURE pr_set_ticket_set_allowed(p_ticket_set_allowed  IN VARCHAR2);
--06-JAN-2012 Flexcube V.CL Release 7.10 Lot2, FS Vol1 Tag05, Trade Level Settlement Changes ENDS
--27-APR-2012 Flexcube V.CL Release 7.11 FS Tag 05 Trade Date accounting entries Change start
FUNCTION Fn_get_agency_dtls
	(
	p_cusip_no				IN	tltbs_contract_master.cusip_no%type,
	p_fnd_percent				IN OUT	NUMBER,
	p_unfnd_percent				IN OUT 	NUMBER,
	p_processing_date			IN	DATE,
	p_err_code				IN OUT	VARCHAR2,
	p_err_param				IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--27-APR-2012 Flexcube V.CL Release 7.11 FS Tag 05 Trade Date accounting entries Change end
--29-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18060 Changes Start Here
FUNCTION fn_chk_auth_stat
	 (
	  p_contract_ref_no	IN	tltbs_ticket_detail.trade_ref_no%TYPE ,
	  p_error_code		IN OUT	ertbs_msgs.err_code%TYPE
	 )
RETURN BOOLEAN;
--29-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18060 Changes End Here
--19-JUN-2014 CITIUS#19106 changes starts
FUNCTION fn_chk_clp_dept
	 (
	  p_ext_contract_ref_no   IN	tltbs_upload_master.ext_contract_ref_no%TYPE
	, p_err_code	        IN OUT	VARCHAR2
	, p_err_params	        IN OUT	VARCHAR2
	 )
RETURN BOOLEAN;
--19-JUN-2014 CITIUS#19106 changes ends
--09-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag05 IUT#147 changes start
FUNCTION fn_check_buy_back_case
			(
				p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
				,p_agency_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
				,p_buy_back_case		OUT		VARCHAR2
				,p_error_code			IN	OUT	VARCHAR2
				,p_error_param			IN	OUT	VARCHAR2
			)
RETURN BOOLEAN;
--09-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag05 IUT#147 changes end
--21-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 changes Start
FUNCTION fn_check_hfs_portfolio	(
				p_participant		IN	lbtbs_participant_transfer.hfs_transfer%TYPE
				)
RETURN 	VARCHAR2;
FUNCTION fn_check_open_settled_trade (
		 		p_module_id  IN VARCHAR2,
		         	p_portfolio  IN tltbs_upload_master.portfolio%TYPE,
		        	p_cusip_no   IN tltbs_upload_master.cusip_no%TYPE
					,p_contract_ref_no	 IN oltbs_contract.contract_ref_no%TYPE--18-MAY-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 IUT#305 Changes
	    		     )
RETURN VARCHAR2;
FUNCTION fn_hfs_portfolio_validation  (	p_cusip_no IN tltbs_upload_master.cusip_no%TYPE,
										p_expense_code IN varchar2,
										p_trade_amt IN number,
										p_portfolio IN OUT tltbs_upload_master.portfolio%TYPE,
										--01-JUN-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 IUT#308 change starts
										p_trans_id	IN OLTB_LT_TRADE.trans_id%type,
										p_source_code IN OLTB_LT_TRADE.source_code%type,
										--01-JUN-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 IUT#308 change end
										p_error_code IN OUT varchar2,
										p_error_param IN OUT VARCHAR2
										)
RETURN BOOLEAN;
--21-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 changes End
--04-MAR-2015 CITIUS#19697 changes start
FUNCTION fn_get_agency_details(
				 p_search_type IN VARCHAR2
				,p_cusip_no    IN oltbs_contract_master.cusip_no%TYPE
			       )
RETURN VARCHAR2;				
--04-MAR-2015 CITIUS#19697 changes end
--14-APR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag07 changes start
--15-JUN-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag07 ITR#43 changes start
/*
FUNCTION fn_restore_ext_part_ssi(
				p_cusip_no      in  tltbs_contract_master.cusip_no%type
				,p_counterparty in  tltbs_contract_master.counterparty%type
				)
RETURN BOOLEAN;
*/
--15-JUN-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag07 ITR#43 changes end
--14-APR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag07 changes end
--13-APR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag03 changes start
FUNCTION fn_check_cusip_tranche_linkage
														(
															p_cusip_no				IN		oltbs_contract_master.cusip_no%TYPE
															,p_expt_settle_date		IN		DATE
														)
RETURN VARCHAR2;
FUNCTION fn_get_transfer_percentage
									(
										p_contract_ref_no		IN 		oltbs_contract.contract_ref_no%TYPE
										,p_agency_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
										,p_end_date				IN		DATE
										,p_trfr_percentage		OUT		NUMBER
										,p_error_code			IN OUT 	VARCHAR2
										,p_error_param			IN OUT	VARCHAR2
									)
RETURN BOOLEAN;
--13-APR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag03 changes end
--09-MAY-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag03 changes starts
FUNCTION fn_get_link_tranche_ref_no
			(
				p_cusip_no			IN 		oltbs_contract_master.cusip_no%TYPE
				,p_expec_sett_dt		IN		DATE
				,p_agency_ref_no		OUT		oltbs_contract.contract_ref_no%TYPE
				,p_error_code			IN OUT 	VARCHAR2
				,p_error_param			IN OUT	VARCHAR2
			)
RETURN DATE;
--09-MAY-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag03 changes ends
--13-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag06 Netting and Combined Settlement Trading changes start
FUNCTION fn_check_consol_availability
(
	p_consol_ticket_ref_no		IN			tltbs_consol_ticket_master.consol_ticket_ref_no%TYPE,
	p_actual_setl_date			IN			DATE,
	p_process_trades				OUT		VARCHAR2,
	p_agency_ref_no				OUT		VARCHAR2,
	p_err_code						IN OUT	VARCHAR2,
	p_err_params					IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--13-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag06 Netting and Combined Settlement Trading changes end

END tlpks_services;
/
CREATE OR REPLACE SYNONYM tlpkss_services FOR tlpks_services
/