CREATE OR REPLACE package lfpks_services is
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lfpks_services.SPC
**
** Module       : INTEREST, COMMISSION, CHARGES, FEES (ICCF)
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
/* Change History
18 nov 2002   FCC 39 Function fn_new_copy_rate_code is added when copying the existing rate code and
	    the old function fn_copy_rate_code is commented.

FCC 4.0 enhancements	fn_populate_interest to take in rate and rate type. This will be used during
				Rollover of LD contracts where suer defined rates can be specified.

28-SEP-2002 FCC4.1 OCT 2002 changes for tenor based penalty interest calculation

20-DEC-2002 Fcc 4.2 April 2003 repair_chg changes.Overloaded the function for addition of p_sender as an agrument.

16-JUL-2003 FCC4.3 AUG2003 TIDE Related changes - New function fn_standard_rate added.
								  New function fn_tenor_rate added.
								  New function Fn_Amount_Rate added.
								  New function fn_rate_update added.
								  New function fn_fixed_standard_rate added.
								  New function fn_rate added.
07-AUG-2003 FCC4.3 AUG2003 ITR1 SFR2 - Added penalty rate code in fn_rate.

29-NOV-2003 FCC 4.4 Dec 2003 Negative Interest Rate changes Added rate_sign in fn_populate_interest.
02-Aug_2004 FCC 4.6 Sep2004 Retro(India) changes:enhancement to maintain interest component waiver details at customer level
								 ITR2 SFR NO 30.
16-SEP-2004 FCC4.6 Sep2004 ITR1 sfr 475 p_customer passed in fn_populate_interest

20-JUN-2005 FCC 4.6.2 CITI LS/FEE Changes Added functions fn_populate_fees,pr_fee_delete,fn_pickup_fee_details
15-DEC-2005 FLEXCUBE V.CL Release 7.0, Gowri, Added a function fn_update_dd_count
19-jan-2006 FLEXCUBE V.CL Release 7.0 Function added by nirupama ,fn_populate_rule_margin
06-JAN-2006 FLEXCUBE V.CL Release 7.0, Product Related Changes by Darshana Added new Function fn_copy_skim
19-JAN-2006 FLEXCUBE V.CL Release 7.0, Interest Changes 
19-JAN-2006 FLEXCUBE V.CL Release 7.0, Margin Changes
08-MAR-2006 FLEXCUBE V.CL Release 7.0, changes by Darshana
				1. Added a new function fn_cftms_rule which will be called 
                           for charge pickup.
                        2. Moved the chage history within create or replace package.
                        3. Added sho err at the end
14-may-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag 14 Retain Main Comp New function fn_copy_main_comp is added                                              
09-JUL-2009 FLEXCUBE V.CL Release 7.5 lot2 RT SFR#249, Added New overloaded function fn_pickup_details with 17 params
										     which will be called during copy of contract.
20-FEB-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag4 Changes, new funtion added to calculate fixed rate and tenor based spread.
22-FEB-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag6 Changes, new parameter p_spread added to the function fn_populate_interest
		this function is called during rollover user can specify the spread also.
26-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10272 CLP Participation changes	
**Changed By         : Priyadarshini K
  **Change Description : Rate Fixing cahnges for OBCL_12.5
  **Search String      : OBCL_12.5_Rate_Fixing
  
  **Changed By         : Priyadarshini K
  **Date               : 27-Aug-2017
  **Change Description : Added Rate Fixing days as last parameter to fn_populate_interest so that rollover with new version takes this instead of product.
  **Search String      : OBCL_12.5_26649019 
  
  **Changed By         : Chandra Achuta/Selvam Manickam
  **Change Description  : Cash_flow_rate_changes
  **Search String       : OBCL_14.4_Cash_Flow
  **Changed On          : 20-Jan-2020
  
  **Changed By         : Aishwarya
  **Date               : 13-Apr-2021
  **Change Description : Relationship Pricing - Integration with UBS to get the RP rate
  **Search String      : OBCL_14.5_RP_Integration_Changes
  **Changed By         : Mohan Pal/Navoneel Nandan
  **Date               : 18-Jul-2023
  **Change Description : FWDPORT of Bug#34818977 Changes done for Non STANDARD Currency Exchange Rates
  **Search String      : Bug#35572733
  
  **Changed By         : Baljinder
  **Date               : 19-Jan-2024
  **Change Description : Multi Threading changes for rate revn
  **Search String      : Multi Threading changes

*/
--new function created for margin
--26-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10272 changes starts here

--Bug#30040165   changes start
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
--Bug#30040165   changes end

FUNCTION fn_populate_margin(p_dd_ref_no 	IN 	oltbs_contract.contract_ref_no%TYPE,
                               p_tr_ref_no 	IN 	oltbs_contract.contract_ref_no%TYPE,
                               p_prod_code 	IN 	oltms_product.product_code%TYPE,
                               p_ccy 		IN 	cytms_ccy_defn.ccy_code%TYPE,
                               p_event_seq_no 	IN 	oltbs_event.event_code%TYPE,
                               p_value_date 	IN 	lftbs_contract_interest.value_date%TYPE,
                               p_error_code 	IN OUT 	ertbs_msgs.err_code%TYPE
                           ) 
RETURN BOOLEAN;
--26-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#10272 changes ends here
FUNCTION fn_delete_interest_margin 
(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE)
RETURN BOOLEAN;		

-- New Function Created for the Cross Validation of the Maintenance - Ticks
FUNCTION fn_check_maint_iccf ( prule		IN lftms_rule.rule%type
                        , pbranch         IN lftms_rule.branch%type
                        , pcust_group     IN lftms_rule.cust_group%type
                        , paccount_no     IN lftms_rule.account_no%type
                        , pacct_category  IN lftms_rule.acct_category%type
				, pcurrency		IN lftms_rule.currency%type
				, pcurrency2	IN lftms_rule.currency2%type
				, pcustomer		IN lftms_rule.customer%type
				)
				RETURN BOOLEAN;
FUNCTION fn_check_maint ( prule		IN lftms_rule.rule%type
				, pcurrency		IN lftms_rule.currency%type
				, pcurrency2	IN lftms_rule.currency2%type
				, pcustomer		IN lftms_rule.customer%type
				)
				RETURN BOOLEAN;


-- New Function Created for the Cross Validation of the Tenor Maintenance - Ticks
FUNCTION fn_check_tenor_maint_iccf ( prule			IN lftms_rule.rule%type
                              , pbranch               IN lftms_rule.branch%type
                              , pcust_group           IN lftms_rule.cust_group%type
                              , paccount_no           IN lftms_rule.account_no%type
                              , pacct_category        IN lftms_rule.acct_category%type
					, pcurrency			IN lftms_rule.currency%type
					, pcurrency2		IN lftms_rule.currency2%type
					, pcustomer			IN lftms_rule.customer%type
					, pbasis_amount_to	IN lftms_bracket.basis_amount_to%type
					)
					RETURN BOOLEAN;
FUNCTION fn_check_tenor_maint ( prule			IN lftms_rule.rule%type
					, pcurrency			IN lftms_rule.currency%type
					, pcurrency2		IN lftms_rule.currency2%type
					, pcustomer			IN lftms_rule.customer%type
					, pbasis_amount_to	IN lftms_bracket.basis_amount_to%type
					)
					RETURN BOOLEAN;
-- FLEXCUBE V.CL Release 7.0 Function added by nirupama for margin start
FUNCTION fn_populate_rule_margin(p_dd_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                                    p_value_date IN lftbs_contract_interest.value_date%TYPE,
                                    p_maturity_date IN DATE,
				    		p_dd_ccy IN CYTMS_CCY_DEFN.ccy_code%TYPE,
						p_dd_amount in varchar2,
                                    p_error_code IN OUT ertbs_msgs.err_code%TYPE,
                                    p_error_param IN OUT ertbs_msgs.message%TYPE) RETURN BOOLEAN;
 -- FLEXCUBE V.CL Release 7.0 Function added by nirupama for margin end                                   
                                    
-- New Function Created for the Validation of Gaps in the Tenor Maintenance - Ticks
FUNCTION fn_check_tenor_gap_iccf ( prule			      IN lftms_rule.rule%type
                              , pbranch               IN lftms_rule.branch%type
                              , pcust_group           IN lftms_rule.cust_group%type
                              , paccount_no           IN lftms_rule.account_no%type
                              , pacct_category        IN lftms_rule.acct_category%type
					, pcurrency			IN lftms_rule.currency%type
					, pcurrency2		IN lftms_rule.currency2%type
					, pcustomer			IN lftms_rule.customer%type
					, pbasis_amount_to	IN lftms_bracket.basis_amount_to%type
					)
					RETURN BOOLEAN;

FUNCTION fn_check_tenor_gap ( prule			      IN lftms_rule.rule%type
					, pcurrency			IN lftms_rule.currency%type
					, pcurrency2		IN lftms_rule.currency2%type
					, pcustomer			IN lftms_rule.customer%type
					, pbasis_amount_to	IN lftms_bracket.basis_amount_to%type
					)
					RETURN BOOLEAN;


-- Internal SFR 3610 Change retroed from FC2.2
FUNCTION fn_unmark_liqd ( pContractRefNo	IN	VARCHAR2
				, pESN		IN	NUMBER
				, pPickupESN	IN	NUMBER) RETURN BOOLEAN;
-- USDFBME 160998

-- FCC 39 Changes Starts - Jeggi

/* function fn_copy_rate_code (old_rate_code in varchar2, p_branch_code in varchar2,
new_rate_code varchar2) return boolean; */

function fn_new_copy_rate_code (old_rate_code in varchar2, p_branch_code in varchar2,
new_rate_code varchar2) return boolean;

-- FCC 39 Changes Ends - Jeggi

function fn_copy_rule_iccf(old_rowid in out varchar2,
l_rule lftms_rule.rule%type,
l_branch in lftms_rule.branch%type,
l_cust_group in lftms_rule.cust_group%type,
l_account_no in lftms_rule.account_no%type,
l_acct_category in lftms_rule.acct_category%type,
l_currency in cytms_ccy_defn.ccy_code%type,
l_currency2 in cytms_ccy_defn.ccy_code%type,
l_customer  oltms_customer.customer_no%type)
return boolean;


function fn_update_basis_amount_from_i(p_rule in lftms_rule.rule%type,
p_branch in lftms_rule.branch%type,
p_cust_group in lftms_rule.cust_group%type,
p_account_no in lftms_rule.account_no%type,
p_acct_category in lftms_rule.acct_category%type,
p_customer in lftms_rule.customer%type,
p_currency in lftms_rule.currency%type,
p_currency2 in lftms_rule.currency2%type)
return boolean;

function fn_copy_product(old_product_code in lftms_product_iccf.product%type,
new_product_code in lftms_product_iccf.product%type) return boolean;

function fn_delete_product(p_code in lftms_product_iccf.product%type) return boolean;

function fn_circularities(p_product_code in lftms_product_iccf.product%type) return
boolean;



function fn_pickup_details(p_contract_ref_no in oltbs_contract.contract_ref_no%type,
p_event_seq_no in oltbs_contract.latest_event_seq_no%type, p_customer
lftms_rule.customer%type,
p_contract_ccy in CYTMS_CCY_DEFN.ccy_code%type,
p_local_ccy in CYTMS_CCY_DEFN.ccy_code%type,
p_event in oltbs_event.event_code%type,
p_ts_amount_tag in varchar2,
p_ts_amount in varchar2,
p_ts_amount_ccy in varchar2,
p_ts_lcy_equiv in varchar2,
p_value_date in   lftbs_contract_interest.value_date%type,
p_transaction_date in  lftbs_contract_interest.transaction_date%type,
p_status in  lftbs_contract_interest.status%type,
p_error_code out  ertbs_msgs.err_code%type) return boolean;


--Fcc 4.2 April 2003 repair_chg changes starts
FUNCTION fn_pickup_details(
				p_contract_ref_no 	IN oltbs_contract.contract_ref_no%TYPE,
				p_event_seq_no 		IN oltbs_contract.latest_event_seq_no%TYPE,
				p_customer 			IN lftms_rule.customer%TYPE,
				p_sender			IN OLTBS_FTTB_CONTRACT_MASTER.SENDER%TYPE,
				p_contract_ccy 		IN CYTMS_CCY_DEFN.ccy_code%TYPE,
				p_local_ccy 		IN CYTMS_CCY_DEFN.ccy_code%TYPE,
				p_event 			IN oltbs_event.event_code%TYPE,
				p_ts_amount_tag 		IN VARCHAR2,
				p_ts_amount 		IN VARCHAR2,
				p_ts_amount_ccy 		IN VARCHAR2,
				p_ts_lcy_equiv 		IN VARCHAR2,
				p_value_date 		IN lftbs_contract_interest.value_date%TYPE,
				p_transaction_date 	IN lftbs_contract_interest.transaction_date%TYPE,
				p_status 			IN lftbs_contract_interest.status%TYPE,
				p_error_code   		out ertbs_msgs.err_code%TYPE)
RETURN BOOLEAN;
--Fcc 4.2 April 2003 repair_chg changes ends

FUNCTION fn_pickup_details(
	p_contract_ref_no       in oltbs_contract.contract_ref_no%type,
	p_event_seq_no          in oltbs_contract.latest_event_seq_no%type,
	p_PESN          IN      lftbs_contract_commission.pickup_event_sequence_no%type,
	p_customer              lftms_rule.customer%type,
	p_contract_ccy          in CYTMS_CCY_DEFN.ccy_code%type,
	p_local_ccy             in CYTMS_CCY_DEFN.ccy_code%type,
	p_event                 in oltbs_event.event_code%type,
	p_ts_amount_tag         in      varchar2,
	p_ts_amount             in      varchar2,
	p_ts_amount_ccy         in      varchar2,
	p_ts_lcy_equiv          in      varchar2,
	p_value_date            in      lftbs_contract_interest.value_date%type,
	p_transaction_date      in      lftbs_contract_interest.transaction_date%type,
	p_status                in      lftbs_contract_interest.status%type,
	p_calculation_method    in      lftbs_contract_commission.calculation_method%type,
	p_start_date            in      lftbs_contract_commission.start_date%TYPE,
	p_end_date              in      lftbs_contract_commission.start_date%TYPE,
	p_payment_type          in      lftbs_contract_commission.payment_type%type,
	p_party                 in      lftbs_contract_commission.party%type,
	p_error_code            out     ertbs_msgs.err_code%type)

RETURN boolean ;

FUNCTION fn_pickup_details(
	p_contract_ref_no		in	oltbs_contract.contract_ref_no%type,
	p_event_seq_no		in	oltbs_contract.latest_event_seq_no%type,
	p_PESN			IN	lftbs_contract_commission.pickup_event_sequence_no%type,
	p_customer				lftms_rule.customer%type,
	p_contract_ccy		in	CYTMS_CCY_DEFN.ccy_code%type,
	p_local_ccy			in	CYTMS_CCY_DEFN.ccy_code%type,
	p_event			in	oltbs_event.event_code%type,
	p_ts_amount_tag		in	varchar2,
	p_ts_amount			in	varchar2,
	p_ts_amount_ccy		in	varchar2,
	p_ts_lcy_equiv		in	varchar2,
	p_value_date		in	lftbs_contract_interest.value_date%type,
	p_transaction_date	in	lftbs_contract_interest.transaction_date%type,
	p_status			in	lftbs_contract_interest.status%type,
	p_calculation_method	in	lftbs_contract_commission.calculation_method%type,
	p_start_date		in	lftbs_contract_commission.start_date%TYPE,
	p_end_date			in	lftbs_contract_commission.start_date%TYPE,
	p_payment_type		in	lftbs_contract_commission.payment_type%type,
	p_party			in	lftbs_contract_commission.party%type,
	p_retro_flag		in	lftbs_contract_commission.retrospective_flag%type,
	p_error_code		out	ertbs_msgs.err_code%type)

RETURN boolean;

--09-JUL-2009 FLEXCUBE V.CL Release 7.5 lot2 RT SFR#249, Added Start
FUNCTION fn_pickup_details(
	p_contract_ref_no 	IN oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no 	IN oltbs_contract.latest_event_seq_no%TYPE,
	p_customer 		IN lftms_rule.customer%TYPE,
	p_sender			IN OLTBS_FTTB_CONTRACT_MASTER.SENDER%TYPE,
	p_contract_ccy 		IN CYTMS_CCY_DEFN.ccy_code%TYPE,
	p_local_ccy 		IN CYTMS_CCY_DEFN.ccy_code%TYPE,
	p_event 			IN oltbs_event.event_code%TYPE,
	p_ts_amount_tag 	IN VARCHAR2,
	p_ts_amount 		IN VARCHAR2,
	p_ts_amount_ccy 	IN VARCHAR2,
	p_ts_lcy_equiv 		IN VARCHAR2,
	p_value_date 		IN lftbs_contract_interest.value_date%TYPE,
	p_transaction_date 	IN lftbs_contract_interest.transaction_date%TYPE,
	p_status 			IN lftbs_contract_interest.status%TYPE,
	p_action_code		IN VARCHAR2,
	p_copy_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
	p_error_code   		out ertbs_msgs.err_code%TYPE)
RETURN BOOLEAN;
--09-JUL-2009 FLEXCUBE V.CL Release 7.5 lot2 RT SFR#249, Added End

function fn_delete_contract(p_contract_ref_no in oltbs_contract.contract_ref_no%type,
	p_event_seq_no oltbs_contract.latest_event_seq_no%type) return boolean;

function fn_update_status
	(
	p_contract_ref_no 			IN oltbs_contract.contract_ref_no%type,
	p_current_event_seq_no  	IN oltbs_contract.latest_event_seq_no%type,
	p_reversal_event_seq_no 	IN oltbs_contract.latest_event_seq_no%type,
	p_component 				IN
lftbs_contract_interest.component%type,
	p_status 					IN
lftbs_contract_interest.status%type
	)
RETURN boolean;

--Overloaded "fn_update_status" to parameterize replication ( by invoking
--"pr_populate_for_amendment") before status updation

function fn_update_status
	(
	p_contract_ref_no 			IN oltbs_contract.contract_ref_no%type,
	p_current_event_seq_no  	IN oltbs_contract.latest_event_seq_no%type,
	p_reversal_event_seq_no 	IN oltbs_contract.latest_event_seq_no%type,
	p_component 				IN
lftbs_contract_interest.component%type,
	p_status 					IN
lftbs_contract_interest.status%type,
	p_replicate_before_update 	IN boolean
	)
RETURN boolean;

function fn_copy_contract (p_contract_ref_no in oltbs_contract.contract_ref_no%type,
	p_original_event_seq_no in oltbs_contract.latest_event_seq_no%type,
	p_new_event_seq_no in oltbs_contract.latest_event_seq_no%type,
	p_value_date lftbs_contract_interest.value_date%type,
	p_transaction_date lftbs_contract_interest.transaction_date%type)
	return boolean;
-- Overloaded function
function fn_copy_contract (p_contract_ref_no in oltbs_contract.contract_ref_no%type,
	p_original_event_seq_no in oltbs_contract.latest_event_seq_no%type,
	p_new_event_seq_no in oltbs_contract.latest_event_seq_no%type,
	p_value_date lftbs_contract_interest.value_date%type,
	p_transaction_date lftbs_contract_interest.transaction_date%type,
	p_event	lftbs_contract_charges.event%type)
	return boolean ;
function fn_value_dated_referral (p_contract_ref_no in
	oltbs_contract.contract_ref_no%type,
	p_event_seq_no in lftbs_contract_interest.event_sequence_no%type,
	p_ts_component out varchar2,
	p_ts_component_type out varchar2,
	p_ts_rate out varchar2,
	p_ts_rate_code out varchar2,
	p_ts_spread out varchar2,
	p_ts_amount out varchar2,
	p_ts_currency out varchar2,
	p_ts_sett_currency out varchar2) return boolean;

FUNCTION	fn_del_tagroles (p_product IN oltms_product.product_code%TYPE,
				p_comp    IN lftms_product_iccf.component%TYPE,
				p_module  IN oltms_product.module%TYPE)
RETURN BOOLEAN;

--This function is invoked during rollover of LD/MM contracts with Interest
--Rollover Basis = 'P' wherein it is desired to re-pickup all interest type
--ICCF components linked to the event : "p_event"(BOOK).

FUNCTION fn_repickup_interest
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no		IN 	oltbs_contract.latest_event_seq_no%TYPE,
	p_customer 			IN	lftms_rule.customer%TYPE,
	p_contract_ccy 		IN 	cytms_ccy_defn.ccy_code%TYPE,
	p_local_ccy 		IN 	cytms_ccy_defn.ccy_code%TYPE,
	p_event 			IN 	oltbs_event.event_code%TYPE,
	p_value_date 		IN  lftbs_contract_interest.value_date%TYPE,
	p_transaction_date 	IN  lftbs_contract_interest.transaction_date%TYPE,
	p_ts_new_component	OUT	varchar2,
	p_error_code   		OUT ertbs_msgs.err_code%TYPE
	)
	RETURN boolean;

FUNCTION fn_repickup_interest
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no		IN 	oltbs_contract.latest_event_seq_no%TYPE,
	p_customer 			IN	lftms_rule.customer%TYPE,
	p_contract_ccy 		IN 	cytms_ccy_defn.ccy_code%TYPE,
	p_local_ccy 		IN 	cytms_ccy_defn.ccy_code%TYPE,
	p_event 			IN 	oltbs_event.event_code%TYPE,
	p_value_date 		IN  lftbs_contract_interest.value_date%TYPE,
	p_transaction_date 	IN  lftbs_contract_interest.transaction_date%TYPE,
	p_only_new_components	IN    char,
	p_ts_new_component	OUT	varchar2,
	p_error_code   		OUT ertbs_msgs.err_code%TYPE
	)
	RETURN boolean;




--This function is called while populating rates for interest components during
-- a LD rollover. The user can specify the rate.
--FCC 4.0 june 02 Rollover Changes
FUNCTION fn_populate_interest(
					p_product_code		IN oltms_product.product_code%TYPE
					, p_component		IN lftms_product_iccf.component%TYPE
					, p_currency		IN CYTMS_CCY_DEFN.ccy_code%TYPE
					, p_local_currency	IN CYTMS_CCY_DEFN.ccy_code%TYPE
					, p_event_seq_no 		IN oltbs_contract.latest_event_seq_no%TYPE
					, p_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE
					, p_event			IN oltbs_event.event_code%TYPE
					, p_value_date 		IN lftbs_contract_interest.value_date%TYPE
					, p_transaction_date	IN lftbs_contract_commission.transaction_date%TYPE
					, p_status 			IN OUT lftbs_contract_interest.status%TYPE
					, p_rate			IN lftbs_contract_interest.RATE%TYPE
					, p_rate_type		IN lftms_product_iccf.RATE_TYPE%TYPE
					, p_tenor			IN lftms_product_currency_limits.TENOR%TYPE -- FCC 4.1 OCT 2002 for tenor based interest
					, p_rate_sign		IN lftbs_contract_interest.rate_sign%TYPE -- Fcc 4.4 Dec 2003 Negative Rate Interest.
					, p_customer 		IN lftms_rule.customer%TYPE
					, p_spread			IN lftbs_contract_interest.SPREAD%TYPE Default NULL --22-FEB-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag6 Changes
					,p_rate_fixing_days IN lftbs_contract_interest.rate_fixing_days%type default NULL --OBCL_12.5_26649019
					)
RETURN BOOLEAN;
--FCC 4.0 june 02 Rollover Changes

function fn_populate_commission (
p_product_code          in oltbs_contract.product_code%type,
p_component             in lftms_product_iccf.component%type,
p_rule                  in lftms_rule.rule%type,
p_currency              in CYTMS_CCY_DEFN.ccy_code%type,
p_customer              in lftms_rule.customer%type,
p_contract_ref_no       in lftbs_contract_commission.contract_reference_no%type,
p_event                 in oltbs_event.event_code%type,
p_event_seq_no          in lftbs_contract_commission.event_seq_no%type,
p_PESN                  IN lftbs_contract_commission.pickup_event_sequence_no%type,
p_ts_amount_tag         in varchar2,
p_ts_amount             in varchar2,
p_ts_amount_ccy         in varchar2,
p_ts_lcy_equiv          in varchar2,
p_value_date            in lftbs_contract_commission.value_date%type,
p_transaction_date      in lftbs_contract_commission.transaction_date%type,
p_calculation_method    in lftbs_contract_commission.calculation_method%type,
p_start_date            in      lftbs_contract_commission.start_date%TYPE,
p_end_date              in      lftbs_contract_commission.start_date%TYPE,
p_status                in out  lftbs_contract_commission.status%type,
p_payment_type          in      lftbs_contract_commission.payment_type%type,
p_party                 in      lftbs_contract_commission.party%type)
RETURN BOOLEAN;

function fn_populate_commission (
p_product_code          in	oltbs_contract.product_code%type,
p_component             in	lftms_product_iccf.component%type,
p_rule                  in	lftms_rule.rule%type,
p_currency              in	CYTMS_CCY_DEFN.ccy_code%type,
p_customer              in	lftms_rule.customer%type,
p_contract_ref_no       in	lftbs_contract_commission.contract_reference_no%type,
p_event                 in	oltbs_event.event_code%type,
p_event_seq_no          in	lftbs_contract_commission.event_seq_no%type,
p_PESN          		IN	lftbs_contract_commission.pickup_event_sequence_no%type,
p_ts_amount_tag         in	varchar2,
p_ts_amount             in	varchar2,
p_ts_amount_ccy         in	varchar2,
p_ts_lcy_equiv          in	varchar2,
p_value_date            in	lftbs_contract_commission.value_date%type,
p_transaction_date      in	lftbs_contract_commission.transaction_date%type,
p_calculation_method    in	lftbs_contract_commission.calculation_method%type,
p_start_date            in	 lftbs_contract_commission.start_date%TYPE,
p_end_date              in	 lftbs_contract_commission.start_date%TYPE,
p_status                in out lftbs_contract_commission.status%type,
p_payment_type          in	 lftbs_contract_commission.payment_type%type,
p_party                 in	 lftbs_contract_commission.party%type,
p_retrospective_flag	in	 lftbs_contract_commission.retrospective_flag%type,
p_err_code			out	ERTBS_MSGS.err_code%TYPE)
RETURN boolean ;

function fn_populate_commission (                -- With replicate flag
p_product_code          in oltbs_contract.product_code%type,
p_component             in lftms_product_iccf.component%type,
p_rule                  in lftms_rule.rule%type,
p_currency              in CYTMS_CCY_DEFN.ccy_code%type,
p_customer              in lftms_rule.customer%type,
p_contract_ref_no       in lftbs_contract_commission.contract_reference_no%type,
p_event                 in oltbs_event.event_code%type,
p_event_seq_no          in lftbs_contract_commission.event_seq_no%type,
p_PESN          IN lftbs_contract_commission.pickup_event_sequence_no%type,
p_ts_amount_tag         in varchar2,
p_ts_amount             in varchar2,
p_ts_amount_ccy         in varchar2,
p_ts_lcy_equiv          in varchar2,
p_value_date            in lftbs_contract_commission.value_date%type,
p_transaction_date      in lftbs_contract_commission.transaction_date%type,
p_calculation_method    in lftbs_contract_commission.calculation_method%type,
p_start_date            in      lftbs_contract_commission.start_date%TYPE,
p_end_date              in      lftbs_contract_commission.start_date%TYPE,
p_status                in out  lftbs_contract_commission.status%type,
p_payment_type          in      lftbs_contract_commission.payment_type%type,
p_party                 in      lftbs_contract_commission.party%type,
p_replicate_flag		in	varchar2)
RETURN BOOLEAN;

FUNCTION fn_compute_charge_amount
	(
    p_Contract_Ref_No IN oltbs_contract.contract_ref_no%TYPE,--Bug#35572733
	p_rule_record		IN		lftms_rule%ROWTYPE,
	p_tag_ccy 			IN		lftbs_contract_charges.currency%TYPE,
	p_tag_amount 		IN		lftbs_contract_charges.amount%TYPE,
	p_charge_rate		IN OUT	lftbs_contract_charges.rate%TYPE,   --OBCL_14.5_RP_Integration_Changes
	p_charge_ccy	 	OUT		lftbs_contract_charges.currency%TYPE,
	p_charge_amount 	IN OUT	lftbs_contract_charges.amount%TYPE, --OBCL_14.5_RP_Integration_Changes
	p_error_code  		OUT		ertbs_msgs.err_code%TYPE
	)
	RETURN boolean;

--	3T Changes - Package var. to return the TS string
p_web_retval	varchar2(500);
--	End 3T changes

function fn_copy_rule(old_rowid in out varchar2,
l_rule lftms_rule.rule%type,
l_currency in cytms_ccy_defn.ccy_code%type,
l_currency2 in cytms_ccy_defn.ccy_code%type,
l_customer  oltms_customer.customer_no%type)
return boolean;

function fn_update_basis_amount_from(p_rule in lftms_rule.rule%type,
p_customer in lftms_rule.customer%type,
p_currency in lftms_rule.currency%type,
p_currency2 in lftms_rule.currency2%type)
return boolean;

FUNCTION fn_update_contract_charge
					(
					 --p_contract_ref_no 	IN 	  OLTBS_FTTB_UPLOAD_MASTER.FT_CONTRACT_REF%TYPE, --OFCL12.3 CHANGES START HERE
					 p_contract_ref_no 	IN 	  oltbs_contract.CONTRACT_REF_NO%TYPE, --OFCL12.3 CHANGES END HERE
					 p_error_code	 IN OUT varchar2,
					 p_error_param	 IN OUT varchar2
					)
RETURN BOOLEAN ;

--16-JUL-2003 FCC4.3 AUG2003 TIDE Related changes starts
FUNCTION fn_standard_rate
   (
   pbranch       		  IN       lftms_standard_rates_detail.branch_code%TYPE,
   prate_code    		  IN       lftms_standard_rates_detail.rate_code%TYPE,
   pccy          		  IN       lftms_standard_rates_detail.currency_code%TYPE,
   peff_date     		  IN       lftms_standard_rates_detail.effective_date%TYPE,
   ptype	     		  IN 	     lftms_standard_rates_detail.rate_type%TYPE,
   prate         		  OUT      lftms_standard_rates_detail.rate%TYPE,
   ptenor_inter_basis 	  OUT      lftms_standard_rates_master.tenor_interpolation_basis%TYPE,
   pcalc_method 		  OUT      lftms_standard_rates_master.calc_method%TYPE,
   perrorcode    		  IN OUT   VARCHAR2,
   perrorparam   		  IN OUT   VARCHAR2
   )
RETURN BOOLEAN;

FUNCTION fn_tenor_rate
   (
   pbranch       	   	  IN       lftms_tenor_rates_detail.branch_code%TYPE,
   prate_code    	   	  IN       lftms_tenor_rates_detail.rate_code%TYPE,
   pccy          	   	  IN       lftms_tenor_rates_detail.currency_code%TYPE,
   ptenor	     	   	  IN       lftms_tenor_rates_detail.tenor%TYPE,
   peff_date     	   	  IN       lftms_tenor_rates_detail.effective_date%TYPE,
   ptenor_interpolation   IN 	     lftms_standard_rates_master.TENOR_INTERPOLATION_BASIS%TYPE,
   pspread       		  OUT      lftms_tenor_rates_detail.spread%TYPE,
   pamtspread    		  OUT      lftms_tenor_rates_detail.max_spread%TYPE,
   perrorcode    		  IN OUT   VARCHAR2,
   perrorparam   		  IN OUT   VARCHAR2
   )
RETURN BOOLEAN ;

FUNCTION Fn_Amount_Rate
   (
   pbranch       IN       lftms_amt_rates_detail.branch_code%TYPE,
   prate_code    IN       lftms_amt_rates_detail.rate_code%TYPE,
   pamount       IN       lftms_amt_rates_detail.amount%TYPE,
   pccy          IN       lftms_amt_rates_detail.currency_code%TYPE,
   peff_date     IN       lftms_amt_rates_detail.effective_date%TYPE,
   pspread       OUT      lftms_amt_rates_detail.spread%TYPE,
   perrorcode    IN OUT   VARCHAR2,
   perrorparam   IN OUT   VARCHAR2
   )
RETURN BOOLEAN;

Function fn_rate_update
(
  p_ContractRefNo   	IN 	 oltbs_contract.contract_ref_no%TYPE,
  P_eventseqno		IN 	 oltbs_contract_event_log.event_seq_no%TYPE,
  p_Amount  		IN 	 NUMBER,
  p_Ccy 			IN 	 lftms_standard_rates_detail.currency_code%TYPE,
  p_eff_date     		IN     lftms_standard_rates_detail.effective_date%TYPE,
  p_Tenor 			IN 	 lftms_tenor_rates_detail.tenor%TYPE,
  p_pick_standard_rate 	IN 	 VARCHAR2,
  p_pick_tenor_spread 	IN 	 VARCHAR2,
  p_pick_amount_spread 	IN 	 VARCHAR2,
  p_update_all_comps	IN	 VARCHAR2,
  p_standard_rate		OUT	 lftms_amt_rates_detail.spread%TYPE,
  p_tenor_spread		OUT    lftms_amt_rates_detail.spread%TYPE,
  p_tenor_amt_spread    OUT	 lftms_tenor_rates_detail.max_spread%TYPE,
  p_amount_spread		OUT    lftms_amt_rates_detail.spread%TYPE,
  p_errcode 		IN OUT VARCHAR2,
  p_param 			IN OUT VARCHAR2
)
Return Boolean;

Function fn_fixed_standard_rate
(
  p_Amount  		IN     NUMBER,
  p_rate_code    	      IN     lftms_standard_rates_detail.rate_code%TYPE,
  p_Ccy 			IN 	 lftms_standard_rates_detail.currency_code%TYPE,
  p_eff_date     		IN     lftms_standard_rates_detail.effective_date%TYPE,
  p_Tenor 			IN 	 lftms_tenor_rates_detail.tenor%TYPE,
  p_standard_rate		OUT	 lftms_amt_rates_detail.spread%TYPE,
  p_tenor_spread		OUT    lftms_amt_rates_detail.spread%TYPE,
  p_tenor_amt_spread    OUT	 lftms_tenor_rates_detail.max_spread%TYPE,
  p_amount_spread		OUT    lftms_amt_rates_detail.spread%TYPE,
  p_errcode 		IN OUT VARCHAR2,
  p_param 			IN OUT VARCHAR2
)
Return Boolean;

FUNCTION FN_RATE
(
  p_ContractRefNo   	IN 	 lftbs_contract_interest.contract_reference_no%TYPE,
  P_eventseqno		IN 	 lftbs_contract_interest.event_sequence_no%TYPE,
  p_fixed_rate_code	OUT	 lftbs_contract_interest.fixed_rate_code%TYPE,
  p_standard_rate		OUT	 lftbs_contract_interest.rate%TYPE,
  p_tenor_spread		OUT    lftbs_contract_interest.tenorwise_spread%TYPE,
  p_amount_spread		OUT    lftbs_contract_interest.amountwise_spread%TYPE,
  p_prep_penalty		OUT	   lftbs_contract_interest.prepayment_penalty_rate_code%TYPE, --FCC 4.3 AUG 2003 ITR1 SFR2
  p_errcode 		IN OUT VARCHAR2,
  p_param 			IN OUT VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_interest_details (
   p_contractrefno   VARCHAR2,
   p_eventseqno      NUMBER
)
   RETURN VARCHAR2;

--16-JUL-2003 FCC4.3 AUG2003 TIDE Related changes ends
-- FCC 4.6 Sep2004 Retro(India) enhancement to maintain interest component waiver details at customer level start .
FUNCTION fn_check_waiver(p_customer_no	IN	oltms_customer.customer_no%type
			 , p_int_group	IN	oltms_cust_int_waiver_master.customer_int_grp%type
			 , p_product    IN      oltms_cust_int_waiver_detail.product%type --29-APR-2004 FCC 4.4.1 APR 2004 ITR2 SFR NO 30.Changed the declaration
			 , p_comp       IN 	oltms_cust_int_waiver_detail.component_code%type
			 , p_value_date	IN	DATE
			 , p_waiver	OUT	CHAR
			)
RETURN BOOLEAN ;

-- FCC 4.6 Sep2004 Retro(India) enhancement to maintain interest component waiver details at customer level end
----------------------------------------------------------------------------------------------------  
--08-MAR-2006 FLEXCUBE V.CL Release 7.0 changes by Darshana Starts
FUNCTION    fn_cftms_rule
            (
             p_rule           IN     lftms_rule.rule%TYPE,
             p_ccy            IN     lftms_rule.currency%TYPE,
             p_customer       IN     lftms_rule.customer%TYPE,
             p_cftms_rule     OUT    lftms_rule%ROWTYPE
            )
RETURN BOOLEAN;            
--08-MAR-2006 FLEXCUBE V.CL Release 7.0 changes by  Ends
----------------------------------------------------------------------------------------------------
--FCC 4.6.2 CITI FEE CHANGES START BY KISHORE 

procedure pr_fee_delete(p_contract_ref_no varchar2,
            p_event_seq_no    varchar2);

FUNCTION fn_populate_fees (
   p_product_code IN    varchar2,
   p_component    IN    varchar2,
   p_rule         IN    varchar2,
   p_currency     IN    varchar2,
   p_customer     IN    varchar2,
   p_contract_ref_no IN    varchar2,
   p_event           IN    varchar2,
   p_event_seq_no    IN    varchar2,
   p_ts_amount       IN    NUMBER,
   p_ts_amount_ccy   IN    VARCHAR2,
   p_value_date      IN    DATE,
   p_transaction_date   IN    DATE,
   p_calc_end_date 	IN    DATE,
   p_local_ccy    	IN    VARCHAR2,
   p_party        	IN    VARCHAR2,
   p_action_code     	IN  VARCHAR2,
   p_error_code      	OUT   ertbs_msgs.err_code%TYPE)
RETURN BOOLEAN;

FUNCTION fn_pickup_fee_details(
            p_contract_ref_no    	IN oltbs_contract.contract_ref_no%TYPE,
            p_event_seq_no       	IN oltbs_contract.latest_event_seq_no%TYPE,
            p_customer        	IN lftms_rule.customer%TYPE,
            p_contract_ccy       	IN CYTMS_CCY_DEFN.ccy_code%TYPE,
            p_local_ccy       	IN CYTMS_CCY_DEFN.ccy_code%TYPE,
            p_event        		IN oltbs_event.event_code%TYPE,
            p_expected_bal       	IN NUMBER,  -- Expected Balance
            p_outstanding_bal       IN NUMBER, -- Outstanding Balance
            p_ts_amount_ccy      	IN VARCHAR2,
            p_value_date      	IN oltbs_contract_master.value_date%TYPE,
            p_transaction_date   	IN oltbs_contract_master.booking_date%TYPE,
            p_calc_end_date         IN oltbs_contract_master.maturity_date%type,
            p_action_code           IN varchar2,
            p_error_code         	out ertbs_msgs.err_code%TYPE)
RETURN BOOLEAN;
--FCC 4.6.2 CITI FEE CHANGES END BY KISHORE 
--FLEXCUBE V.CL Release 7.0 Product Related Changes by Gowri Starts
FUNCTION fn_update_dd_count( pTrancheRefNo IN oltbs_contract.contract_ref_no%TYPE
                             ,pValueDate   IN DATE
                             ,pBasis       IN VARCHAR2  DEFAULT 'DDCOUNT'
                             ,pAction      IN VARCHAR2  DEFAULT 'I'  --'I' - Increment, 'D' - Decrement
                             ,pErrorCode   IN OUT VARCHAR2
                           ) 
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.0 Product Related Changes by Gowri Ends

--FLEXCUBE V.CL Release 7.0 Product Related Changes by Darshana Start
FUNCTION fn_copy_skim(p_source_product IN varchar2,
p_des_product IN varchar2,
p_source_module IN varchar2,
p_des_module IN varchar2,
p_action_code IN varchar2
)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.0 Product Related Changes by Darshana End



--FLEXCUBE V.CL Release 7.0 Interest Changes 19012006 START
Function fn_populate_interest_master
   (
   p_contract_ref_no    IN oltbs_contract.contract_ref_no%type,
   p_value_date         IN date,
   p_product            IN LFTM_PRODUCT_ICCF.PRODUCT%TYPE,
   p_component		IN lftbs_contract_interest_master.component%type,
   p_error_code     IN OUT ertbs_msgs.err_code%TYPE
   )
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.0 Interest Changes 19012006 END
--FLEXCUBE V.CL Release 7.5 lot2 FS Tag 14 Retain Main Comp Start                            
   function fn_copy_main_comp (p_contract_ref_no IN LFTB_CONTRACT_INTEREST.contract_reference_no%type,
                            p_event_seq_no    IN LFTB_CONTRACT_INTEREST.event_sequence_no%type
                            )
	return boolean;
--FLEXCUBE V.CL Release 7.5 lot2 FS Tag 14 Retain Main Comp End 
--20-FEB-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag4 Changes - Start
Function fn_rate_spread_update
	(
	p_ContractRefNo		IN		oltbs_contract.contract_ref_no%TYPE,
	P_eventseqno		IN		oltbs_contract_event_log.event_seq_no%TYPE,
	p_Amount			IN		NUMBER,
	p_Ccy				IN		lftms_spread_tenor_rate.currency%TYPE,
	p_eff_date			IN		lftms_spread_tenor_rate.effective_date%TYPE,
	p_Tenor			IN		lftms_tenor_rates_detail.tenor%TYPE,
	p_calculate_spread	IN		oltbs_contract_master.tenor_based_spread%TYPE,
	p_fixed_rate		OUT		lftbs_contract_interest.rate%TYPE,
	p_tenor_based_spread	OUT		lftbs_contract_interest.spread%TYPE,
	p_errcode			IN OUT	VARCHAR2,
	p_param			IN OUT	VARCHAR2
)
Return Boolean;
--20-FEB-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag4 Changes - End
--OBCL_12.5_Rate_Fixing starts
--16-JUN-2017 OFCL12.5 Rate Fixing days changes for OL
    /*FUNCTION fn_hol_trtmnt_rate_fixing_days(p_contract_ref_no IN oltbs_contract.contract_ref_no%type,
                                                 p_ccy             IN oltbs_contract.contract_ccy%type,
                                                 p_rate_fixing_date IN OUT DATE,
                                                 p_Err_Code         IN OUT VARCHAR2,
                                                 p_Err_Params       IN OUT VARCHAR2) RETURN DATE;  */
     FUNCTION fn_get_rate_fixing_date_used(p_branch                IN oltbs_contract.branch%type,
                                        p_rate_code             IN lftb_contract_interest.rate_code%type,
                                        p_ccy                   IN oltbs_contract.contract_ccy%type,
                                        p_rate_fixing_date      IN DATE,
                                        p_proceed_with_prev_rate_avl   IN VARCHAR2,
                                        p_rate_fixing_date_used IN OUT DATE,
                                        p_Err_Code              IN OUT VARCHAR2,
                                        p_Err_Params            IN OUT VARCHAR2)
    RETURN BOOLEAN;                                                  
     FUNCTION fn_log_rate_fixing_date_diff(p_contract_ref_no    IN oltbs_contract.branch%type,
                                        p_branch             IN lftb_contract_interest.rate_code%type,
                                        p_rate_fixing_date_used      IN DATE,
                                        p_rate_fixing_date_actual IN DATE,
                                        p_app_date              IN DATE,
                                        p_rate_fixing_days      IN NUMBER,
                                        p_esn                   IN NUMBER,
                                        p_rate_code             IN VARCHAR2,
                                        p_ccy                   IN oltbs_contract.contract_ccy%type,
                                        p_rate                  IN NUMBER,
                                        p_status                IN VARCHAR2,
                                        p_borrow_lend_ind       IN VARCHAR2,
                                        p_component             IN VARCHAR2,  --chandra added
                                        p_Err_Code              IN OUT VARCHAR2,
                                        p_Err_Params            IN OUT VARCHAR2)
     RETURN BOOLEAN;  
      FUNCTION fn_del_rate_fixing_date_diff(p_contract_ref_no    IN oltbs_contract.branch%type,
                                           p_esn                   IN NUMBER,
                                        p_Err_Code              IN OUT VARCHAR2,
                                        p_Err_Params            IN OUT VARCHAR2)
     RETURN BOOLEAN; 
     --OBCL_12.5_Rate_Fixing ends
	 
	  --OBCL_rate_fix_LS
 FUNCTION fn_insert_fixing_comps_ls(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                                       p_esn             IN lbtbs_rate_fixing_details.event_seq_no%type,
                                       p_value_date      IN DATE,
                                       p_maturity_date   IN DATE,
                                       p_fixing_date     IN DATE,
                                       p_rate_code       IN lbtbs_rate_fixing_details.rate_code%type,
                                       p_rate            IN lbtbs_rate_fixing_details.rate%type,
                                       p_notice_date     IN DATE,
                                       p_book_date       IN DATE,
                                       p_errcode         IN OUT VARCHAR2,
                                       p_errprm          IN OUT VARCHAR2,
                                       p_next_fixing_date   IN DATE DEFAULT NULL,
                                       p_next_notice_date   IN DATE DEFAULT NULL,
                                       p_next_eff_start_date   IN DATE DEFAULT NULL,
                                       p_remarks               IN VARCHAR2 DEFAULT NULL,
                                       p_tenor_type      IN lbtbs_rate_fixing_details.tenor_type%type DEFAULT 'N',
                                       p_tenor_value      IN lbtbs_rate_fixing_details.tenor_value%type DEFAULT NULL,
                                       p_tenor_unit      IN lbtbs_rate_fixing_details.tenor_unit%type DEFAULT NULL,
                                       p_inot_generated        IN lbtbs_rate_fixing_details.inot_generated%type Default NULL
                                      )
    RETURN BOOLEAN;
    
    FUNCTION fn_delete_fixing_comps_ls(p_contract_ref_no    IN oltbs_contract.branch%type,
                                        p_esn                   IN NUMBER,
                                        p_Err_Code              IN OUT VARCHAR2,
                                        p_Err_Params            IN OUT VARCHAR2)
     RETURN BOOLEAN;
    --OBCL_rate_fix_LS ends
	--Multi Threading Changes start
     FUNCTION Fn_Zero_Cash_Flow_Batch(PuserId IN SMTB_USER.USER_ID%TYPE,
                              PbranchCode IN STTM_CORE_BRANCH.BRANCH_CODE%TYPE,
                              Pcontractrefno IN Oltbs_Contract.Contract_Ref_No%TYPE,
                             p_Err_Code     IN OUT VARCHAR2,
                             p_Err_Params   IN OUT VARCHAR2) RETURN VARCHAR2;
     --Multi Threading Changes end
	 --OBCL_14.4_Cash_Flow start
  FUNCTION fn_zero_cash_flow(Pcontractrefno IN oltbs_contract.contract_ref_no%type,
                             p_Err_Code     IN OUT VARCHAR2,
                             p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
    --OBCL_14.4_Cash_Flow end

end lfpks_services;
/
create or replace synonym lfpkss_services for lfpks_services
/