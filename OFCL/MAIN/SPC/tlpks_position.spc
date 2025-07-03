CREATE OR REPLACE PACKAGE tlpks_position
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: tlpks_position.SPC
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
----------------------------------------------------------------------------------------------------
*/
/*---------------------------------CHANGE HISTORY-----------------------------------------------
10-SEP-2008 FLEXCUBE V.CL 7.4 RELEASE ,NEW UNIT CREATED 
06-JAN-2009 FLEXCUBE V.CL Release 7.4 MTR2 SFR#6, 06-JAN-2009, movement from tltbs_current_dated_balance table to tltbs_book_dated_balance table will be for current branch
27-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#145, 27-JAN-2009, Included function fn_reverse_PNL for reversing PNL accentries for Orig Line trades.
26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - Multiple Expense Code Changes
26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - ITR2 Sfr#34 added a new function  fn_populate_book_dated_pnl	
							also changed the copyright clause
27-AUG-2009 CITIUS-LS#6256 	Retro - Invalid corrections.
10-OCT-2009 CITIUS-LS#6713 	changes Compute the PNL based on the original trade amount
20-OCT-2009 CITIUS-LS#6783 SLT Long Term Funding changes. Placement contract should be booked after applying WAC on the O/S bal
22-DEC-2009 FLEXCUBE V.CL Release 7.5 lot1.2 ITR2 SFR#6 Changes - Handling 
	PIK and Commitment reduction/Increases while applying cancellation and rebook/amendments.
25-NOV-2010 FLEXCUBE V.CL Release 7.8 VOL3 FS Tag3 Loan Pricing changes	
18-JAN-2011 FLEXCUBE V.CL Release 7.8 ITR2#13,System will not allow the user to confirm the Sell trade in Origination Queue, if it is resulting in the Short Sell.
03-OCT-2012 CITIUS#15031 Changes related to CFPI Conversion
26-NOV-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14830 fn_check_short_sell is validating the position wrongly in amendments and cancellations
13-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16911 Tuning releted changes for PNL bal population

  Changed By         : Jayaram N
  Date               : 18-Sep-2019
  Change Description : Added 2 new function's
  Search String      : SFR#29959798 OBCL_14.4_SLT_Accounting_Changes
  
------------------------------END CHANGE HISTORY----------------------------------------------
*/

TYPE TXN_position_rec IS RECORD
	(
	position_identifier	tltbs_txn_activity_position.position_identifier%TYPE,
	cusip_no		tltbs_txn_activity_position.cusip_no%TYPE,
	activity_date		tltbs_txn_activity_position.activity_date%TYPE,
	activity_seq_no		tltbs_txn_activity_position.activity_seq_no%TYPE,
	contract_ref_no		tltbs_txn_activity_position.contract_ref_no%TYPE,
	event_code		tltbs_txn_activity_position.event_code%TYPE,
	event_seq_no		tltbs_txn_activity_position.event_seq_no%TYPE,
	buy_sell		tltbs_txn_activity_position.buy_sell%TYPE,
	trade_price		tltbs_txn_activity_position.trade_price%TYPE,
	position_amount		tltbs_txn_activity_position.position_amount%TYPE,
	trade_ccy		tltbs_txn_activity_position.trade_ccy%TYPE,
	portfolio		tltms_portfolio.portfolio%TYPE,
	branch			tltms_portfolio.branch%TYPE,
	expense_code		tltbs_contract_master.expense_code%TYPE,--26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - Multiple Expense Code Changes
	desk_code		tltms_portfolio.desk_code%TYPE,
	--expense_code		tltms_portfolio.expense_code%TYPE,--CITIUS-LS#6256
	swap_counterparty	tltbs_txn_activity_position.swap_counterparty%TYPE,
	swap_id			tltbs_current_dated_balance.swap_id%TYPE,
	original_trade_amount tltbs_contract_master.original_trade_amount%TYPE --CITIUS-LS#6713 Changes
	);

TYPE tbl_txn_position_rec is table of txn_position_rec index by binary_integer;--FLEXCUBE V.CL Release 7.5 lot1.2 ITR2 SFR#6 Changes

FUNCTION fn_create_position_contract
	(p_position_identifier	IN	tltbs_contract_master.position_identifier%TYPE,
	 p_cusip_no		IN	tltbs_contract_master.cusip_no%TYPE,
	 p_portfolio		IN	tltbs_contract_master.portfolio%TYPE,
	 p_branch		IN	tltbs_contract_master.branch%TYPE,
	 p_expense_code		IN	tltbs_contract_master.expense_code%TYPE,
	 p_activity_date	IN	tltbs_contract_master.booking_date%TYPE,
	 p_swap_counterparty	IN	tltbs_contract_master.swap_counterparty%TYPE,
	 p_currency		IN	tltbs_contract_master.currency%TYPE,
	 p_error_code		IN OUT	VARCHAR2,
	 p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_track_position
	(p_events_control_rec	IN	tltbs_upload_events_control%ROWTYPE,
	 p_error_code		IN OUT	VARCHAR2,
	 p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_position_referral
	(
	p_contract_ref_no 	IN	oltbs_contract.Contract_ref_no%Type,
	p_event_code		IN	oltbs_contract_event_log.event_code%TYPE,
	p_event_seq_no		IN	oltbs_contract.latest_event_seq_no%TYPE,
	p_currency		IN	VARCHAR2,
	p_amt_tag_list		IN OUT	VARCHAR2,
	p_amt_list		IN OUT	VARCHAR2,
	p_ccy_list		IN OUT	VARCHAR2,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_update_position
	(
	p_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE,
	p_event_code		IN	oltbs_contract_event_log.event_code%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_authorize_position_contract
	(
	p_position_identifier	IN      tltbs_contract_master.position_identifier%TYPE,
	p_cusip_no		IN	tltbs_contract_master.cusip_no%TYPE,
	p_expense_code		IN	tltbs_contract_master.expense_code%TYPE,--26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - Multiple Expense Code Changes
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_populate_book_dated_balance
	(
	p_branch		IN	oltbs_contract.branch%type, -- FLEXCUBE V.CL Release 7.4 MTR2 SFR#6, 06-JAN-2009
	p_activity_date		IN	tltbs_book_dated_balance.activity_date%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

--26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - ITR2 Sfr#34 added a new function  fn_populate_book_dated_pnl	starts
FUNCTION fn_populate_book_dated_pnl
	(
	p_branch		IN	oltbs_contract.branch%type,
	p_processing_date	IN	TLTB_BOOK_DATED_PNL.activity_date%type,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - ITR2 Sfr#34 added a new function  fn_populate_book_dated_pnl	ends 

FUNCTION fn_check_stl_position
	(
	p_position_identifier	IN	tltbs_contract_master.position_identifier%TYPE,
	p_cusip_no		IN	tltbs_contract_master.cusip_no%TYPE,
	p_expense_code		IN	tltbs_contract_master.expense_code%TYPE,--26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - Multiple Expense Code Changes
	p_buy_sell		IN	tltbs_contract_master.buy_sell%TYPE,
	p_trade_amount		IN	tltbs_contract_master.trade_amount%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

-- FLEXCUBE V.CL Release 7.4 MTR2 SFR#6, 06-JAN-2009, starts
FUNCTION fn_rebuild_position
	(
	p_position_identifier	IN	tltbs_contract_master.position_identifier%TYPE,
	p_cusip_no		IN	tltbs_contract_master.cusip_no%TYPE,
	p_expense_code		IN	tltbs_contract_master.expense_code%TYPE,--26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - Multiple Expense Code Changes
	p_branch		IN	oltbs_contract.branch%TYPE,
	p_activity_date		IN	DATE DEFAULT NULL,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
-- FLEXCUBE V.CL Release 7.4 MTR2 SFR#6, 06-JAN-2009, ends

-- FLEXCUBE V.CL Release 7.4 ITR1 SFR#145, 27-JAN-2009, starts
FUNCTION fn_reverse_PNL
	(
	p_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE,
	p_error_code            IN OUT 	VARCHAR2,
	p_error_param           IN OUT 	VARCHAR2
	)
RETURN BOOLEAN;
-- FLEXCUBE V.CL Release 7.4 ITR1 SFR#145, 27-JAN-2009, ends
--CITIUS-LS#6783 changes start
FUNCTION fn_get_wac_for_funding
(
p_branch		IN	oltbs_contract.branch%TYPE,
p_portfolio		IN	tltbs_contract_master.portfolio%TYPE,
p_cusip_no		IN	tltbs_contract_master.cusip_no%TYPE,
p_expense_code		IN	tltbs_contract_master.expense_code%TYPE
)
RETURN NUMBER;
--CITIUS-LS#6783 changes end	

--25-NOV-2010 FLEXCUBE V.CL Release 7.8 VOL3 FS Tag3 Loan Pricing changes start
FUNCTION fn_populate_reval
	(p_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE,
	 p_position_identifier	IN	tltbs_position_contract.position_identifier%TYPE,
	 p_cusip_no		IN	tltbs_position_contract.cusip_no%TYPE,
	 p_expense_code		IN	tltbs_position_contract.expense_code%TYPE,
	 p_portfolio		IN	tltbs_contract_master.portfolio%TYPE,
	 p_error_code		IN OUT	VARCHAR2,
	 p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--25-NOV-2010 FLEXCUBE V.CL Release 7.8 VOL3 FS Tag3 Loan Pricing changes end

--18-JAN-2011 FLEXCUBE V.CL Release 7.8 ITR2#13 changes starts
--26-NOV-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14830 changes starts
/*
FUNCTION fn_check_short_sell
	(
	p_position_identifier	IN	tltbs_contract_master.position_identifier%TYPE,
	p_cusip_no		IN	tltbs_contract_master.cusip_no%TYPE,
	p_expense_Code	        IN      tltbs_contract_master.expense_Code%TYPE,
	p_buy_sell		IN	tltbs_contract_master.buy_sell%TYPE,
	p_trade_amount		IN	tltbs_contract_master.trade_amount%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
  */

FUNCTION fn_check_short_sell
	(
	p_ext_contract_ref_no	IN	tltbs_upload_master.ext_contract_ref_no%TYPE,
	p_version_no		IN	tltbs_contract_master.cusip_no%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

--26-NOV-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14830 changes ends
--18-JAN-2011 FLEXCUBE V.CL Release 7.8 ITR2#13 changes ends

--03-OCT-2012 CITIUS#15031 Changes starts
FUNCTION Fn_check_cfpi_trade
			(
				p_position_identifier		tltbs_position_contract.position_identifier%TYPE,
				p_cusip_no					tltbs_position_contract.cusip_no%TYPE,
				p_expense_code			 tltbs_position_contract.expense_code%TYPE
			)
RETURN BOOLEAN;			
--03-OCT-2012 CITIUS#15031 Changes ends

--13-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16911 Changes starts
FUNCTION fn_get_portfolio_branch (p_identifier VARCHAR2)
RETURN  VARCHAR2;

TYPE  tbl_portfolio_branch IS TABLE OF TLTM_PORTFOLIO.branch%TYPE
INDEX BY VARCHAR2(20);

g_tbl_portfolio_branch		tbl_portfolio_branch;

FUNCTION fn_get_position_contract
					(
					p_position_identifier		tltbs_position_contract.position_identifier%TYPE,
					p_cusip_no					tltbs_position_contract.cusip_no%TYPE,
					p_expense_code			 tltbs_position_contract.expense_code%TYPE
					)	
RETURN  VARCHAR2;
--21-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 changes start
FUNCTION  fn_update_hfs_cost_basis
                            (
                              p_cost_basis          IN        tltbs_current_dated_balance.hfs_cost_basis%TYPE,
			      p_TXN_position_rec      IN 	tlpkss_position.TXN_position_rec,
			      p_error_code            IN OUT   	VARCHAR2,
                              p_error_param           IN OUT    VARCHAR2
                            )
RETURN BOOLEAN;

FUNCTION  fn_get_hfs_cost_basis
                            (
                              p_trade_ref_no          IN        tltbs_contract_master.contract_ref_no%TYPE,
			      p_TXN_position_rec      IN 	tlpkss_position.TXN_position_rec,
			      p_cost_basis            OUT       tltbs_current_dated_balance.hfs_cost_basis%TYPE,
			      p_error_code            IN OUT   	VARCHAR2,
                              p_error_param           IN OUT    VARCHAR2
                            )
RETURN BOOLEAN;
--21-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol1 Tag03 changes end
TYPE  tbl_position_contract  IS TABLE OF tltbs_position_contract.CONTRACT_REF_NO%TYPE
INDEX BY VARCHAR2(100);

g_tbl_position_contract 		tbl_position_contract;

--13-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16911 Changes ends

--Bug#29959798:SLT Accounting Changes - Start
FUNCTION fn_position_reclass
		(
		p_branch			IN	VARCHAR2,
		p_processing_date	IN	DATE,
		p_commit_frequency	IN 	oltb_Automatic_Process_Master.eod_commit_counT%TYPE,
		p_err_code			IN OUT	VARCHAR2,
		p_err_params		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_reversal_of_pos_reclass
		(
		p_branch			IN	VARCHAR2,
		p_processing_date	IN	DATE,
		p_commit_frequency	IN 	oltb_automatic_process_master.eod_commit_counT%TYPE,
		p_error_code		IN OUT	VARCHAR2,
		p_error_param		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
--Bug#29959798:SLT Accounting Changes - End


END tlpks_position;
/
CREATE or replace SYNONYM tlpkss_position FOR tlpks_position
/