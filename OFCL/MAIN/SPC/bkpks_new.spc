CREATE OR REPLACE PACKAGE bkpks_new AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : bkpks_new.SPC
**
** Module       : BROKERAGE
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
Change History
07-MAY-2002 RETRO FCC4.0 JUNE 2002 PLNCITI TILL#204 In MM upload, brokerage is not getting uploaded	
*/


----------------------------------------------------
FUNCTION FN_STATUS_UPDATE(
		p_contract_reference_no IN 								bktbs_txnbook.CONTRACT_REFERENCE_NO%type,
		p_event_seq_no IN 										bktbs_txnbook.EVENT_SEQ_NO%type,
		--p_status IN bktbs_txnbook.BOOKING_STATUS%type,
		p_status IN bktbs_txnbook.REVERSAL_STATUS%type,		-- FCC 4.4 DEC 2003 BROKERAGE changes
    		retmsgcode IN OUT VARCHAR2)
RETURN BOOLEAN; 
------------------------------------------------------------
-- To delete and undo brokerage details  

FUNCTION FN_BOOK_AMOUNT_REFERRAL (
		p_contract_reference_no IN 								bktbs_maintxn.CONTRACT_REFERENCE_NO%type,
		p_event IN oltbs_event.EVENT_CODE%type,
		p_amount OUT bktbs_maintxn.BROKERAGE_AMOUNT%type,
		p_ccy OUT bktbs_maintxn.BROKERAGE_CCY%type,
		p_booking_ccy OUT bktbs_txnbook.BOOKING_CCY%type,
    		retmsgcode IN OUT VARCHAR2)
RETURN BOOLEAN;
------------------------------------------------------------
-- referral to find the amount to be booked 

FUNCTION FN_BOOK_UPDATE_SERVICE (
		p_contract_reference_no IN 								bktbs_txnbook.CONTRACT_REFERENCE_NO%type,
		p_event_seq_no IN bktbs_txnbook.EVENT_SEQ_NO%type,
		p_booking_ccy IN bktbs_txnbook.BOOKING_CCY%type,
		p_booking_acbranch IN 									bktbs_txnbook.BOOKING_ACBRANCH%type,
		p_booking_lcy_eq IN 									bktbs_txnbook.BOOKING_LCY_EQ%type, 
		p_booking_amt IN bktbs_txnbook.BOOKING_AMT%type,
		p_booking_ex_rate IN 									bktbs_txnbook.BOOKING_EX_RATE%type, 
		p_value_date IN bktbs_txnbook.VALUE_DATE%type, 
		p_booking_account IN 									bktbs_txnbook.BOOKING_ACCOUNT%type, 
		p_broker IN bktbs_txnbook.BROKER%type, 
		p_reverse_previous IN varchar2,
    		retmsgcode IN OUT VARCHAR2)
RETURN BOOLEAN;
------------------------------------------------------------
-- To update the booked details

FUNCTION FN_BOOKED_DETAILS_REFERRAL(
		p_contract_reference_no IN 								bktbs_txnbook.CONTRACT_REFERENCE_NO%type,
		p_event_seq_no OUT 										bktbs_txnbook.EVENT_SEQ_NO%type,
		p_booking_ccy OUT bktbs_txnbook.BOOKING_CCY%type,
		p_booking_acbranch OUT 									bktbs_txnbook.BOOKING_ACBRANCH%type,
		p_booking_lcy_eq OUT 									bktbs_txnbook.BOOKING_LCY_EQ%type, 
		p_booking_method OUT 									bktbs_txnbook.BOOKING_METHOD%type,
		p_booking_amt OUT bktbs_txnbook.BOOKING_AMT%type,
		p_booking_ex_rate OUT 									bktbs_txnbook.BOOKING_EX_RATE%type, 
		p_value_date OUT bktbs_txnbook.VALUE_DATE%type, 
		p_booking_account OUT 									bktbs_txnbook.BOOKING_ACCOUNT%type, 
		p_broker OUT bktbs_txnbook.BROKER%type, 
		p_booking_status OUT 									bktbs_txnbook.BOOKING_STATUS%type, 
		p_liq_status OUT bktbs_txnbook.LIQ_STATUS%type,
		p_liq_reference_no  OUT 									bktbs_txnbook.LIQ_REFERENCE_NO%type,  
		p_purge_ready OUT bktbs_txnbook.PURGE_READY%type,  
		p_brokerage_amt OUT bktbs_maintxn.brokerage_amount%type,
		p_brokerage_ccy OUT bktbs_maintxn.brokerage_ccy%type,
    		retmsgcode IN OUT VARCHAR2)
RETURN BOOLEAN;
------------------------------------------------------------
-- referral to find the booked details

FUNCTION FN_DELETE(
		p_contract_reference_no IN 								bktbs_txnbook.CONTRACT_REFERENCE_NO%type,
		p_event_seq_no IN 										bktbs_txnbook.EVENT_SEQ_NO%type,
		p_reverse_previous IN varchar2,
    		retmsgcode IN OUT VARCHAR2)
RETURN BOOLEAN ;
------------------------------------------------------------
-- To delete and undo brokerage details 


FUNCTION FN_PICKUPDETAILS(
    	curr_branch IN VARCHAR2,
    	the_lcy IN VARCHAR2,
        ref_no IN VARCHAR2,
        event IN VARCHAR2,
        event_sqno IN NUMBER,
        p_broker IN VARCHAR2,
	ext_brok_ccy IN VARCHAR2,
	ext_brok_amt IN VARCHAR2,
        ccy_bought IN VARCHAR2,
        ccy_sold IN VARCHAR2,
        deal_ccy IN VARCHAR2,
    	deal_amt IN NUMBER,
    	lcy_eq IN NUMBER,
        value_dt_deal IN DATE,
        retmsgcode IN OUT VARCHAR2)
RETURN BOOLEAN; 
------------------------------

FUNCTION FN_PICKUPDETAILS(
    	curr_branch IN VARCHAR2,
    	the_lcy IN VARCHAR2,
        ref_no IN VARCHAR2,
        event IN VARCHAR2,
        event_sqno IN NUMBER,
        p_broker IN VARCHAR2,
        ccy_bought IN VARCHAR2,
        ccy_sold IN VARCHAR2,
        deal_ccy IN VARCHAR2,
    	deal_amt IN NUMBER,
    	lcy_eq IN NUMBER,
        value_dt_deal IN DATE,
        retmsgcode IN OUT VARCHAR2)
RETURN BOOLEAN; 
------------------------------

FUNCTION FN_PICKUPDETAILS(
		curr_branch IN VARCHAR2,
		the_lcy IN VARCHAR2,
        ref_no IN VARCHAR2,
        event IN VARCHAR2,
        event_sqno IN NUMBER,
        p_broker IN VARCHAR2,
	ext_brok_ccy IN VARCHAR2,
	ext_brok_amt IN NUMBER, --RETRO FCC4.0 JUNE 2002 PLNCITI TILL#204 CHANGE
	 deal_ccy IN VARCHAR2,
		deal_amt IN NUMBER,
		lcy_eq IN NUMBER,
        value_dt_deal IN DATE,
        retmsgcode IN OUT VARCHAR2)
RETURN BOOLEAN; 

FUNCTION FN_PICKUPDETAILS(
		curr_branch IN VARCHAR2,
		the_lcy IN VARCHAR2,
        ref_no IN VARCHAR2,
        event IN VARCHAR2,
        event_sqno IN NUMBER,
        p_broker IN VARCHAR2,
        deal_ccy IN VARCHAR2,
		deal_amt IN NUMBER,
		lcy_eq IN NUMBER,
        value_dt_deal IN DATE,
        retmsgcode IN OUT VARCHAR2)
RETURN BOOLEAN; 

-- FCC 4.4 DEC 2003 BROKERAGE changes start
FUNCTION FN_PICKUPDETAILS
	(
    	curr_branch 	IN 		VARCHAR2,
    	the_lcy 		IN 		VARCHAR2,
      ref_no 		IN 		VARCHAR2,
      event 		IN 		VARCHAR2,
      event_sqno 		IN 		NUMBER,
      p_broker 		IN 		VARCHAR2,
	ext_brok_ccy 	IN 		VARCHAR2,
	ext_brok_amt 	IN 		VARCHAR2,
      ccy_bought 		IN 		VARCHAR2,
      ccy_sold 		IN 		VARCHAR2,
      deal_ccy 		IN 		VARCHAR2,
    	deal_amt 		IN 		NUMBER,
    	lcy_eq 		IN 		NUMBER,
      value_dt_deal 	IN 		DATE,
      maturity_dt_deal	IN		DATE,
      contract_rate	IN		NUMBER,
      retmsgcode 		IN OUT 	VARCHAR2
      )
RETURN BOOLEAN;

FUNCTION fn_calc_rate_brkg
		(
		p_curr_branch	IN		oltms_branch.branch_code%TYPE,
		p_rule_ref_ccy	IN		bktms_rule.ref_ccy%TYPE,
		p_deal_ccy 		IN 		bktms_rule.deal_ccy%TYPE,
		p_deal_amt 		IN 		bktms_rule_slab.basis_slab_to%TYPE,
		p_deal_rate		IN		bktms_rule_slab.basis_slab_to%TYPE,
		p_rule_method 	IN 		bktms_rule.method%TYPE,
		p_flat_amt 		IN 		bktms_rule_slab.basis_slab_to%TYPE,
		p_floor_basis_amt IN 		bktms_rule_slab.basis_slab_to%TYPE,
		p_floor_amt 	IN 		bktms_rule_slab.basis_slab_to%TYPE,
		p_rate 		IN 		bktms_rule_slab.basis_slab_to%TYPE,
		p_min_rate 		IN 		bktms_rule_slab.min_rate%TYPE,
		p_min_amt 		IN 		bktms_rule_slab.basis_slab_to%TYPE,
		p_max_amt 		IN 		bktms_rule_slab.basis_slab_to%TYPE,
		p_tenor_based	IN		bktms_rule.tenor_based%TYPE,
		p_tenor_basis	IN		bktms_rule.tenor_basis%TYPE,
		p_value_dt		IN		DATE,
		p_maturity_dt	IN		DATE,
		p_brkg_ccy 		IN	OUT 	bktms_rule.deal_ccy%TYPE,
		p_brkg_amt 		IN 	OUT 	bktms_rule_slab.basis_slab_to%TYPE,
		p_error_code	IN 	OUT 	VARCHAR2
		)
RETURN BOOLEAN ;

FUNCTION fn_calc_tenor_discount
		(
		p_rule			IN		bktms_rule.rule%TYPE,
		p_tenor_based		IN		bktms_rule.tenor_based%TYPE, -- FCC 4.4 DEC 2003 ITR1 SFR 386
		p_tenor_basis		IN		bktms_rule.tenor_basis%TYPE,
		p_deal_amt			IN 		bktms_rule.threshold_amt%TYPE,
		p_brkg_ccy			IN		bktms_rule.deal_ccy%TYPE,    -- FCC 4.4 DEC 2003 ITR1 SFR 583
		p_brkg_amt			IN 		bktms_rule.threshold_amt%TYPE,
		p_threshold_amt		IN 		bktms_rule.threshold_amt%TYPE,
		p_value_dt			IN		DATE,
		p_maturity_dt		IN		DATE,
		p_final_brkg_amt		OUT	 	bktms_rule.threshold_amt%TYPE,
		p_error_code			IN 	OUT 	VARCHAR2
		)
RETURN BOOLEAN;

-- FCC 4.4 DEC 2003 BROKERAGE changes end


FUNCTION FN_CALC_BRKG (
		curr_branch IN VARCHAR2,
		the_lcy IN VARCHAR2,
		deal_amt IN NUMBER,
		deal_ccy IN VARCHAR2,
		lcy_eq IN NUMBER,
		rule_ref_ccy IN VARCHAR2,
		rule_method IN NUMBER,
		flat_amt IN NUMBER,
		floor_basis_amt IN NUMBER,
		floor_amt IN NUMBER,
		pctg IN NUMBER,
		min_amt IN NUMBER,
		max_amt IN NUMBER,
		brkg_ccy IN OUT VARCHAR2,
		brkg_amt IN OUT NUMBER,
		retmsgcode IN OUT VARCHAR2)
RETURN BOOLEAN; 

function fn_copy_rule( old_rowid in out varchar2, 
					l_rule bktms_rule.rule%type
					) return boolean ;
					
END bkpks_new;
/
CREATE or replace SYNONYM bkpkss_new FOR bkpks_new
/