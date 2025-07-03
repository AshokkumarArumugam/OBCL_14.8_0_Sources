CREATE OR REPLACE PACKAGE txpks_new
IS
/*-------------------------------------------------------------------------------------------------------------------------
**
** File Name    : txpks_new.SPC
**
** Module       : TA
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.

-------------------------------------------------------------------------------------------------------------------------
*/
/* CHANGE HISTORY

13-03-2001				CEEMEA Changes FCC 3.3.3
					Overloaded Functions FN_COMPUTE_TAX and FN_COMPUTE_TAX_AMOUNTare added
					with 2 additional parameters -- P_customer and P_country
					In the case of LD Contracts, the contract is picked up based on
					the Rule + Effective date + Customer + Country Combination

27/01/2002	FCC 3.9 		LATAM TAX ON PRINCIPAL LIQUIDATION. Now tax is computed on principal during liquidation.
				  	Tax is computed not only on Principal liquidation but the interest earned till 
					payment value date.And this tax on principal multiplied by the 
					minimum of (no of days from contract value date,1).

20-JAN-2003 FCC 4.2 		LATAM TAX ON PRINCIPAL LIQUIDATION A third overloaded function FN_COMPUTE_TAX
				 	is created. This has an additional parameter that helps in deciding whether
				 	a given record in txtbs_txnrule_detail is to be updated/deleted

03-AUG-2003 AUG2003 TAX CHANGES moved the function definition fn_check_waiver from package body to spec.

08-APR-2004	FCC4.5	TAX Changes.Added the Nationality check while selecting from TXTM_RULE.
					Changes can be identified by "FCC4.5 TAX CHANGES"
10-AUG-2004 -- FCC 4.6 Sep04 Retro (India) Tax Deduction on Over Night Deposits - Made the below function public with additional param
				
10-MAR-2006 FLEXCUBE V.CL Release 7.0  FS#12 Added 5 functions for Tax Calculation By Sangeetha
                          1)fn_populate_tax_amt_part
                          2)fn_propagate_tax_sch_part_new
                          3)fn_process_tax
			  4)fn_update_tax_master
			  5)fn_pop_tax_liqd	
27-MAY-2006 FLEXCUBE V.CL Release 7.0 LOT2 ITR2 SFR#55 intoduced the function for batch
26-Jul-2006 FLEXCUBE V.CL Release 7.1 Sulav Changes for BV interest 
13-OCT-2006 FLEXCUBE V.CL RELEASE 7.1 Change for calculating tax for new participant 
18-Aug-2008  Fcc V.Cl Release 7.4  Stp  Participant Changes By SWAPNASISH
04-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 FS Vol1 Tag07,FATCA Phase-2 Changes
03-SEP-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 FS Vol1 Tag07 CITIBLR#35183 Changes,Tax reclac flag has to be updated to Y for all
customers for whom fatc ain effect or fatca compliance has been updated so that correct Payment messge goes through in batch
05-DEC-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIBLR#35200 Changes, System was considering the current tax group also for overlapping  rules validation
11-DEC-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18135 added new function fn_update_recalc_tax.
06-Jun-2016 OFCL standalone changes, commented not required code. Search string--- OFCL12.2 Not required

  SFR Number         : 27443170 
  Changed By         : Vigneshram S
  Change Description : Added new function for fn_tax_referral removing duplicate accounting entries for product RULE
  Search string      : OBCL_14.0_27443170
  Date               : 29-Jan-2018

  Changed By         : Vigneshram
  Changed On         : 05-Jan-2019
  Change Description : Add new function fn_compute_IOF_amount for IOF TAX changes
  Search String      : OBCL_14.3_IOF  

  Changed By         : Satheesh Viswanathan
  Changed On         : 27-Mar-2020
  Change Description : Add new function fn_compute_IOF_for_due_sch for IOF TAX changes
  Search String      : OBCL_14.4_IOF_Tax_Changes.
  
  Changed By         : Abhik Das
  Changed On         : 29-Sep-2021
  Change Description : To pickup contract_ref_no properly in fn_product_complete 
                       to prevent tax referral failed error for contract reversal
  Search String      : Bug#33135228
  
  **Changed By         : Abhik Das
  **Date               : 17-DEC-2021
  **Change Description : To restrict double entry posting for tax on interest
  **Search String      : OBCL_14.5_Support_Bug#33674116_Changes
  
  **Changed By         : Navoneel Nandan
  **Date               : 09-Jan-2023
  **Change Description : Made the set kernel functions public
  **Search String      : Bug#34959698
  
*/
---------------------------------------------------------------------------------------------------------------------------
--04-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 FS Vol1 Tag07,FATCA Phase-2 Changes starts
g_contract_ref_no         Txtbs_Txnrule.Contract_Ref_No%TYPE;--Bug#33135228
g_amount_tag              VARCHAR2(32767);--OBCL_14.5_Support_Bug#33674116_Changes

--Bug#34959698 starts
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
  FUNCTION Fn_Skip_Custom RETURN BOOLEAN;
--Bug#34959698 ends  

TYPE p_rec_tax_rule IS TABLE OF txtms_rule%ROWTYPE INDEX BY PLS_INTEGER;
pkg_rec_tax_rule p_rec_tax_rule;

TYPE p_rec_tax_slabs IS TABLE OF txtms_slab%ROWTYPE INDEX BY PLS_INTEGER;
pkg_rec_tax_slab p_rec_tax_slabs;

TYPE p_rec_rul_his IS TABLE OF txtms_rule_history%ROWTYPE INDEX BY PLS_INTEGER;
pkg_rule_history p_rec_rul_his;

TYPE p_rec_slab_his IS TABLE OF txtms_slab_temp%ROWTYPE INDEX BY PLS_INTEGER;
pkg_slab_history p_rec_slab_his;
	
TYPE p_rec_rules_4_grp_his IS TABLE OF txtms_rules_for_grp_his%ROWTYPE INDEX BY PLS_INTEGER;
pkg_rules_for_grp_his p_rec_rules_4_grp_his;
--04-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 FS Vol1 Tag07,FATCA Phase-2 Changes ends
FUNCTION	fn_populate_table
	(
	p_product			IN		oltms_product.product_code%TYPE,
	p_scheme 			IN 		txtms_scheme.scheme_code%TYPE
	)
RETURN BOOLEAN;

FUNCTION	fn_copy_product
	(
	p_old_product 		IN 		oltms_product.product_code%TYPE,
	p_new_product 		IN 		oltms_product.product_code%TYPE
	)
RETURN BOOLEAN;

FUNCTION	fn_delete_product
	(
	p_product 			IN 		oltms_product.product_code%TYPE
	) 
RETURN BOOLEAN;

FUNCTION	fn_pickup_details
	(
	p_contract_ref_no		IN 		txtbs_maintxn.contract_ref_no%TYPE,
	p_customer 			IN 		txtbs_maintxn.customer%TYPE,
	p_event_seq_no 		IN 		txtbs_txnrule_detail.event_seq_no%TYPE,
	p_delete 			IN 		CHAR	DEFAULT	'N'
	)
RETURN BOOLEAN;

FUNCTION	fn_compute_tax
	(
	p_contract_ref_no 	IN 		txtbs_maintxn.contract_ref_no%TYPE,
	p_event_seq_no 		IN		txtbs_txnrule_detail.event_seq_no%TYPE,
	p_event 			IN		txtbs_txnrule.computation_event%TYPE,
	p_transaction_date 	IN 		txtbs_txnrule_detail.computation_date%TYPE,
	p_local_ccy 		IN 		cytms_ccy_defn.ccy_code%TYPE,
	p_ts_value_date 		IN 		VARCHAR2,
	p_ts_basis_amount_tag 	IN 		VARCHAR2,
	p_ts_basis_amount 	IN 		VARCHAR2,
	p_ts_basis_amount_ccy 	IN 		VARCHAR2,
	p_ts_basis_amount_lcy 	IN 		VARCHAR2,
	p_ts_liquidation_amount IN 		VARCHAR2,
	p_ts_tax_amount_tag 	OUT 		VARCHAR2,
	p_ts_tax_amount 		OUT		VARCHAR2,
	p_ts_tax_amount_ccy 	OUT 		VARCHAR2,
	p_branch 			IN 		oltms_branch.branch_code%TYPE,
	p_ts_tax_type 		OUT 		VARCHAR2,
	p_ts_waiver 		OUT 		VARCHAR2,
	p_error_code 		OUT 		ertbs_msgs.err_code%TYPE
	)
RETURN BOOLEAN;

-- CEEMEA Changes Start
FUNCTION	fn_compute_tax
	(
	p_contract_ref_no 	IN 	txtbs_maintxn.contract_ref_no%TYPE,
	p_event_seq_no 		IN 	txtbs_txnrule_detail.event_seq_no%TYPE,
	p_event 			IN	txtbs_txnrule.computation_event%TYPE,
	p_transaction_date 	IN 	txtbs_txnrule_detail.computation_date%TYPE,
	p_local_ccy 		IN 	cytms_ccy_defn.ccy_code%TYPE,
	p_ts_value_date 		IN 	VARCHAR2,
	p_ts_basis_amount_tag 	IN 	VARCHAR2,
	p_ts_basis_amount 	IN 	VARCHAR2,
	p_ts_basis_amount_ccy 	IN 	VARCHAR2,
	p_ts_basis_amount_lcy 	IN 	VARCHAR2,
	p_ts_liquidation_amount IN 	VARCHAR2,
	p_ts_tax_amount_tag 	OUT 	VARCHAR2,
	p_ts_tax_amount 		OUT	VARCHAR2,
	p_ts_tax_amount_ccy 	OUT 	VARCHAR2,
	p_branch 			IN 	oltms_branch.branch_code%TYPE,
	p_ts_tax_type 		OUT 	VARCHAR2,
	p_ts_waiver 		OUT 	VARCHAR2,
	p_error_code 		OUT 	ertbs_msgs.err_code%TYPE,
	p_customer 			IN 	VARCHAR2,
	p_country 			IN	VARCHAR2,
	-- 27/01/2002  FCC3.9 LATAM Changes starts
	p_cont_val_dt 		IN 	DATE,
	-- 27/01/2002  FCC3.9 LATAM Changes ends
	--FCC 4.2 CEEMEA CHanges Start
	p_cust_tax_group		IN	oltms_cust_group.cust_group%TYPE,
	--FCC 4.2 CEEMEA Changes End
	p_cust_nationality	IN	oltms_customer.nationality%TYPE	--FCC4.5 TAX CHANGES
	)
RETURN BOOLEAN;
-- CEEMEA Changes End

-- 20-JAN-2003 FCC4.2 APR 2003 LATAM Changes Start
-- A third overloaded function FN_COMPUTE_TAX
FUNCTION	fn_compute_tax
	(
	p_contract_ref_no		IN	txtbs_maintxn.contract_ref_no%TYPE,
	p_event_seq_no 		IN 	txtbs_txnrule_detail.event_seq_no%TYPE,
	p_event 			IN	txtbs_txnrule.computation_event%TYPE,
	p_transaction_date 	IN 	txtbs_txnrule_detail.computation_date%TYPE,
	p_local_ccy 		IN 	cytms_ccy_defn.ccy_code%TYPE,
	p_ts_value_date 		IN 	VARCHAR2,
	p_ts_basis_amount_tag 	IN 	VARCHAR2,
	p_ts_basis_amount 	IN 	VARCHAR2,
	p_ts_basis_amount_ccy 	IN 	VARCHAR2,
	p_ts_basis_amount_lcy 	IN 	VARCHAR2,
	p_ts_liquidation_amount IN 	VARCHAR2,
	p_ts_tax_amount_tag 	OUT 	VARCHAR2,
	p_ts_tax_amount 		OUT 	VARCHAR2,
	p_ts_tax_amount_ccy 	OUT 	VARCHAR2,
	p_branch 			IN 	oltms_branch.branch_code%TYPE,
	p_ts_tax_type 		OUT 	VARCHAR2,
	p_ts_waiver 		OUT 	VARCHAR2,
	p_error_code 		OUT 	ertbs_msgs.err_code%TYPE,
	p_customer 			IN 	VARCHAR2,
	p_country 			IN 	VARCHAR2,
	-- 27/01/2002  FCC3.9 LATAM Changes starts
	p_cont_val_dt 		IN 	DATE,
	-- 27/01/2002  FCC3.9 LATAM Changes ends
	-- 20-JAN-2003 FCC4.2 APR 2003 LATAM Changes Begin
	p_upd_del			IN	VARCHAR2,
	-- 20-JAN-2003 FCC4.2 APR 2003 LATAM Changes End
	--FCC 4.2 CEEMEA Changes Start
	p_cust_tax_group		IN	oltms_cust_group.cust_group%TYPE,
	--FCC 4.2 CEEMEA Changes End
	p_cust_nationality	IN	oltms_customer.nationality%TYPE		--FCC4.5 TAX CHANGES
	)
RETURN BOOLEAN;
-- 20-JAN-2003 FCC4.2 APR 2003 LATAM Changes End


-- FCC 4.6 Sep04 Retro (India) Tax Deduction on Over Night Deposits - Made the below function public with additional param

FUNCTION fn_compute_amount
		(
		p_contract_ref_no		IN	txtbs_txnrule.contract_ref_no%TYPE
		,p_event_seq_no 			txtbs_txnrule_detail.event_seq_no%TYPE
		,p_rule 				txtbs_txnrule.rule%TYPE
		,p_value_date 			txtbs_txnrule_detail.value_date%TYPE
		,p_transaction_date 		txtbs_txnrule_detail.computation_date%TYPE
		,p_basis_amount 		IN 	txtbs_txnrule_detail.amount%TYPE
		,p_basis_amount_ccy 	IN 	cytms_ccy_defn.ccy_code%TYPE
		,p_basis_amount_lcy 	IN 	txtbs_txnrule_detail.amount%TYPE
		,p_liquidation_amount 	IN 	txtbs_txnrule_detail.amount%TYPE
		,p_local_ccy 		IN 	cytms_ccy_defn.ccy_code%TYPE
		,p_branch 			IN 	oltms_branch.branch_code%TYPE
		,p_tax_amount 		OUT 	txtbs_txnrule_detail.amount%TYPE
		,p_tax_amount_ccy 	OUT 	txtbs_txnrule_detail.currency%TYPE
		,p_customer 		IN 	oltms_customer.customer_no%TYPE
 		,p_tax_category 		IN 	txtms_product_tax.tax_category%TYPE
		,p_update_tax_info	IN	VARCHAR2
) RETURN BOOLEAN;

-- FCC 4.6 Sep04 Retro (India) Tax Deduction on Over Night Deposits - Ends



FUNCTION	fn_tax_referral
	(
	p_contract_ref_no 	IN	txtbs_maintxn.contract_ref_no%TYPE,
	p_event_seq_no 		IN	txtbs_txnrule_detail.event_seq_no%TYPE,
	p_ts_waiver 		OUT	VARCHAR2,
	p_ts_tax_amount_tag 	OUT	VARCHAR2,
	p_ts_tax_amount 		OUT	VARCHAR2,
	p_ts_tax_amount_ccy 	OUT	VARCHAR2,
	p_ts_value_date 		OUT	VARCHAR2,
	p_ts_tax_type 		OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION	fn_tax_referral
	(
	p_contract_ref_no 	IN 	txtbs_maintxn.contract_ref_no%TYPE,
	p_event_seq_no 		IN 	txtbs_txnrule_detail.event_seq_no%TYPE,
	p_ts_waiver 		OUT	VARCHAR2,
	p_ts_tax_amount_tag 	OUT	VARCHAR2,
	p_ts_tax_amount 		OUT	VARCHAR2,
	p_ts_tax_amount_ccy 	OUT	VARCHAR2,
	p_ts_tax_type 		OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION	fn_status_update
	(
	p_contract_ref_no		IN		txtbs_maintxn.contract_ref_no%TYPE,
	p_current_event_seq_no 	IN 		txtbs_txnrule_detail.event_seq_no%TYPE,
	p_reversal_event_seq_no IN		txtbs_txnrule_detail.event_seq_no%TYPE,
	p_transaction_date 	IN		txtbs_txnrule_detail.computation_date%TYPE,
	p_status 			IN 		txtbs_txnrule_detail.status%TYPE
	)
RETURN BOOLEAN;

FUNCTION	fn_product_complete
	(
	p_product 			IN 		txtms_product_tax.product%TYPE,
	p_scheme 			OUT 		txtms_product_tax.scheme%TYPE,
	p_ts_rule 			OUT 		VARCHAR2,
	p_ts_amount_tag 		OUT 		VARCHAR2,
	p_ts_basis_amount_tag 	OUT 		VARCHAR2,
	p_ts_computation_event 	OUT 		VARCHAR2,
	p_ts_type 			OUT 		VARCHAR2,
	p_ts_ref_ccy 		OUT 		VARCHAR2
	)
RETURN BOOLEAN;
-- p_ts_ref_ccy gives a tilde separated list of LCY or DCY (deal ccy)
-- info from the corresponding rule

FUNCTION	fn_lookup
	(
	p_contract_ref_no		IN		txtbs_txnrule.contract_ref_no%TYPE,
	p_computation_event	IN		txtbs_txnrule.computation_event%TYPE,
	p_basis_amount_tag	IN		txtbs_txnrule.basis_amount_tag%TYPE,
	p_ts_tax_amount_tag	OUT		VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION 	fn_compute_tax_amount
	(
	p_contract_ref_no       IN          txtbs_txnrule.contract_ref_no%type,
	p_event_seq_no          IN          txtbs_txnrule_detail.event_seq_no%type,
	p_rule_record		IN		txtms_rule%ROWTYPE,
	p_deal_ccy			IN		txtbs_txnrule_detail.currency%TYPE,
	p_tag_ccy			IN		txtbs_txnrule_detail.currency%TYPE,
	p_tag_amount 		IN		txtbs_txnrule_detail.amount%TYPE,
	p_liq_amount 		IN		txtbs_txnrule_detail.amount%TYPE,
	p_tax_rate			OUT		txtms_slab.rate%TYPE,
	p_tax_ccy	 		OUT		txtbs_txnrule_detail.currency%TYPE,
	p_tax_amount 		OUT		txtbs_txnrule_detail.amount%TYPE,
	p_error_code  		OUT		ertbs_msgs.err_code%TYPE
	)
RETURN BOOLEAN;

-- CEEMEA Changes Start
FUNCTION 	fn_compute_tax_amount
	(
	p_contract_ref_no       IN          txtbs_txnrule.contract_ref_no%type,
	p_event_seq_no          IN          txtbs_txnrule_detail.event_seq_no%type,
	p_rule_record		IN		txtms_rule%ROWTYPE,
	p_deal_ccy			IN		txtbs_txnrule_detail.currency%TYPE,
	p_tag_ccy			IN		txtbs_txnrule_detail.currency%TYPE,
	p_tag_amount 		IN		txtbs_txnrule_detail.amount%TYPE,
	p_liq_amount 		IN		txtbs_txnrule_detail.amount%TYPE,
	p_tax_rate			OUT		txtms_slab.rate%TYPE,
	p_tax_ccy	 		OUT		txtbs_txnrule_detail.currency%TYPE,
	p_tax_amount 		OUT		txtbs_txnrule_detail.amount%TYPE,
	p_error_code  		OUT		ertbs_msgs.err_code%TYPE,
	p_customer 			IN 		VARCHAR2,
	p_country 			IN 		VARCHAR2,
	p_cont_val_dt 		IN 		DATE,
	p_value_date 		IN 		DATE
	
	)
RETURN BOOLEAN;
-- CEEMEA Changes End
---------------------------------------------------------------------------------------------------------------------------
-- FCC4.2 enhancement to exempt ic based on customer level maintenace to wave ic by KSN on 25-MAR-2003
---- OFCL12.2 Not required
/*FUNCTION fn_check_ic_waiver( p_brn			IN    oltms_branch.branch_code%type
				   , p_account		IN	sttms_cust_account.cust_ac_no%type
			   	   , p_tax_category	IN	txtms_tax_category.tax_category%type
			  	   )
RETURN NUMBER;*/---- OFCL12.2 Not required
-- FCC4.2 enhancement to exempt ic based on customer level maintenace to wave ic by KSN on 25-MAR-2003

--03-AUG-2003 AUG2003 TAX CHANGES STARTS (moved this function definition from package body to spec)
FUNCTION fn_check_waiver( p_customer_no	IN	oltms_customer.customer_no%type
			 	, p_tax_category	IN	txtms_tax_category.tax_category%type
			 	, p_value_date	IN	DATE
			 	, p_waiver		OUT	CHAR
				, p_effectivedate OUT   DATE
			 	)
RETURN BOOLEAN;
--03-AUG-2003 AUG2003 TAX CHANGES ENDS
--03-AUG-2003 AUG2003 TAX CHANGES ENDS


--FLEXCUBE V.CL Release 7.0 TAX changes by Sangeetha on 10-MAR-2006 starts
FUNCTION fn_populate_tax_amt_part(
			   p_borrower_contract_ref_no     IN   oltbs_contract.CONTRACT_REF_NO%TYPE,                        
                        p_participant_contract_ref_no  IN   oltbs_contract.CONTRACT_REF_NO%TYPE,	
                        p_participant_name             IN   oltbs_contract.COUNTERPARTY%TYPE,                        
                        p_error_code                   IN OUT  VARCHAR2,
                        p_error_params                 IN OUT  VARCHAR2
                       )
RETURN BOOLEAN;

FUNCTION fn_propagate_tax_sch_part_new(
			   	p_borrower_contract_ref_no     IN   oltbs_contract.CONTRACT_REF_NO%TYPE,                        
                        p_participant_contract_ref_no  IN   oltbs_contract.CONTRACT_REF_NO%TYPE,	
                        p_participant_name             IN   oltbs_contract.COUNTERPARTY%TYPE,
                        p_application_date             IN   DATE,
			   	p_component				 IN lftms_product_iccf.COMPONENT%TYPE,
                        p_error_code                   IN OUT  VARCHAR2,
                        p_error_params                 IN OUT  VARCHAR2
                       )
RETURN BOOLEAN;

FUNCTION fn_process_tax(p_borrower_contract_ref_no     IN   oltbs_contract.CONTRACT_REF_NO%TYPE,                        
                        p_participant_contract_ref_no  IN   oltbs_contract.CONTRACT_REF_NO%TYPE,	
                        p_participant_name             IN   oltbs_contract.COUNTERPARTY%TYPE,
                        p_application_date             IN   DATE,
                        p_error_code                   IN OUT  VARCHAR2,
                        p_error_params                 IN OUT  VARCHAR2
                       )
RETURN BOOLEAN;
FUNCTION fn_update_tax_master(p_contract_ref_no IN oltbs_contract.CONTRACT_REF_NO%TYPE,
			      p_effective_date        IN DATE,
			      p_component             IN lftms_product_iccf.COMPONENT%TYPE,
			      p_error_code     		IN OUT VARCHAR2,
			      p_error_params		IN OUT VARCHAR2
			      )
RETURN BOOLEAN;
FUNCTION fn_pop_tax_liqd(pContract_ref_no IN oltbs_contract.CONTRACT_REF_NO%TYPE,
			 pEsn 		  IN oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE,
			 pDate		  IN DATE,
			 p_component	  IN lftms_product_iccf.COMPONENT%TYPE,
			 p_amount           IN txtbs_txnrule_detail.AMOUNT%TYPE,
			 p_due_date       	   IN DATE, 
			 p_tot_tax          OUT txtbs_txnrule_detail.AMOUNT%TYPE,
			 p_err_code 	  IN OUT VARCHAR2,
                   p_err_params       IN OUT VARCHAR2)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.0 TAX changes by Sangeetha on 10-MAR-2006 ends
--FLEXCUBE V.CL Release 7.0 LOT2 ITR2 SFR#55 fix by vijeth
Function fn_recalc_tax
	(
	p_module			IN		oltbs_contract.module_code%Type,
	p_branch			IN		oltms_branch.branch_code%Type,
	p_product			IN		oltbs_contract.product_code%Type,
	p_processing_date		IN		Date,
	p_commit_frequency		IN		oltbs_automatic_process_master.eod_commit_count%Type,
	p_error_code			IN OUT	Varchar2,
	p_error_parameter		IN OUT	Varchar2
	)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.0 LOT2 ITR2 SFR#55 fix by end
--FLEXCUBE V.CL Release 7.1 Sulav Changes on 26-Jul-2006  for BV interest starts
FUNCTION fn_calc_payrecv_tax
			(	p_contract_ref_no	IN  oltbs_contract.contract_ref_no%TYPE,
				p_esn			IN  oltbs_contract.latest_event_seq_no%TYPE,
				p_component		IN  oltbs_amount_due_cs.component%TYPE,
				p_amount		IN  oltbs_contract_master.amount%TYPE,
				p_eff_date		IN  DATE,
				p_rule			IN  txtbs_contract_tax_master.tax_rule%type,
				p_tax_amount		OUT NUMBER,
 				p_err_code 		IN  OUT VARCHAR2,
				p_err_params		IN  OUT VARCHAR2
			)
RETURN BOOLEAN;

-- Function added for calculation of adhoc tax for newly added participant
FUNCTION fn_process_pram_tax(p_borrower_contract_ref_no     IN   oltbs_contract.CONTRACT_REF_NO%TYPE,
                        p_participant_contract_ref_no  IN   oltbs_contract.CONTRACT_REF_NO%TYPE,
                        p_participant_name             IN   oltbs_contract.COUNTERPARTY%TYPE,
                        p_application_date             IN   DATE,
                        p_error_code                   IN OUT  VARCHAR2,
                        p_error_params                 IN OUT  VARCHAR2
                       )
RETURN BOOLEAN;


--FLEXCUBE V.CL Release 7.1 Sulav Changes on 26-Jul-2006  for BV interest ends
--18-Aug-2008  Fcc V.Cl Release 7.4  Stp  Participant Changes Start By SWAPNASISH
FUNCTION FN_GET_CUSTOMER(P_CUSTOMER IN OUT VARCHAR2) 
RETURN BOOLEAN;
--18-Aug-2008  Fcc V.Cl Release 7.4  Stp  Participant Changes End By SWAPNASISH

--04-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 FS Vol1 Tag07,FATCA Phase-2 Changes start here
FUNCTION fn_tax_rule_backup(
				p_rule_code  		IN txtms_rule.rule_code%TYPE
				,p_effective_date	IN txtms_rule.effective_date%TYPE
				,p_country 		IN txtms_rule.country%TYPE
				,p_customer		IN txtms_rule.customer%TYPE
				,p_cust_tax_group	IN txtms_rule.cust_tax_group%TYPE
				,p_currency		IN txtms_rule.currency%TYPE
				,p_nationality		IN txtms_rule.nationality%TYPE
				,p_version_no		IN txtms_rule_history.version_no%TYPE
				,p_error_code		IN OUT VARCHAR2
				,p_error_param		IN OUT VARCHAR2
			     )
RETURN BOOLEAN;

FUNCTION fn_tax_rule_history(
				p_rule_code  		IN txtms_rule.rule_code%TYPE
				,p_effective_date	IN txtms_rule.effective_date%TYPE
				,p_country 		IN txtms_rule.country%TYPE
				,p_customer		IN txtms_rule.customer%TYPE
				,p_cust_tax_group	IN txtms_rule.cust_tax_group%TYPE
				,p_currency		IN txtms_rule.currency%TYPE
				,p_nationality		IN txtms_rule.nationality%TYPE
				,p_version_no		IN txtms_rule_history.version_no%TYPE
				,p_error_code		IN OUT VARCHAR2
				,p_error_param		IN OUT VARCHAR2
			     )
RETURN BOOLEAN;
FUNCTION fn_cust_tax_sync
			(
				p_customer_no	oltms_customer.customer_no%TYPE
				,p_nationality	oltms_customer.nationality%TYPE
				,p_country	oltms_customer.country%TYPE
				,p_cust_tax_group	oltms_customer.cust_tax_group%TYPE
				,p_error_code   IN OUT VARCHAR2
				,p_error_param  IN OUT VARCHAR2
			)
RETURN BOOLEAN;
/*
FUNCTION  fn_slab_backup
	(
	p_rule_code  		IN txtms_rule.rule_code%TYPE
	,p_effective_date	IN txtms_rule.effective_date%TYPE
	,p_country 		IN txtms_rule.country%TYPE
	,p_customer		IN txtms_rule.customer%TYPE
	,p_cust_tax_group	IN txtms_rule.cust_tax_group%TYPE
	,p_currency		IN txtms_rule.currency%TYPE
	,p_nationality		IN txtms_rule.nationality%TYPE
	,p_error_code		IN OUT VARCHAR2
	,p_error_param		IN OUT VARCHAR2
	)
RETURN BOOLEAN;
TYPE tbl_tatms_slab is table of txtms_slab%ROWTYPE index by binary_integer;
l_tatms_slab tbl_tatms_slab;
*/
--04-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 FS Vol1 Tag07,FATCA Phase-2 Changes end here
--04-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 FS Vol1 Tag07,FATCA Phase-2 Changes starts
FUNCTION fn_tax_prop_grp_to_rule
			(
			p_group_rec  		IN txtms_rule%rowtype
			,p_error_code		IN OUT VARCHAR2
			,p_error_param		IN OUT VARCHAR2
			)
RETURN BOOLEAN;
FUNCTION fn_chk_chap3_fatca_at_trn
								(
									p_contract_ref_no		IN 	oltbs_contract.contract_ref_no%TYPE
								)
RETURN VARCHAR2;
FUNCTION fn_chk_tax_processing_req
							(
								p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
								,p_participant			IN		oltbs_contract.counterparty%type
								,p_fatca_rule_appl		OUT		VARCHAR2
								,p_chapter_rule_appl	OUT		VARCHAR2
								,p_Error_CODE			IN OUT 	VARCHAR2
								,p_Error_param			IN OUT 	VARCHAR2
							)
RETURN BOOLEAN;	
FUNCTION fn_get_latest_version
	(
	p_rule_code  		IN txtms_rule.rule_code%TYPE
	,p_effective_date	IN txtms_rule.effective_date%TYPE
	,p_country 		IN txtms_rule.country%TYPE
	,p_customer		IN txtms_rule.customer%TYPE
	,p_cust_tax_group	IN txtms_rule.cust_tax_group%TYPE
	,p_currency		IN txtms_rule.currency%TYPE
	,p_nationality		IN txtms_rule.nationality%TYPE
	,p_version_no		IN OUT txtms_rule_history.version_no%TYPE
	,p_error_code		IN OUT VARCHAR2
	,p_error_param		IN OUT VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_create_tax_rule
(
p_group_rec  		IN txtms_rule%ROWTYPE
,p_rule_code		IN txtms_rule.rule_code%TYPE
,p_new_nationality	IN txtms_rule.nationality%TYPE
,p_new_country		IN txtms_rule.country%TYPE
,p_new_cust_tax_group	IN txtms_rule.cust_tax_group%TYPE
,p_error_code		IN OUT VARCHAR2
,p_error_param		IN OUT VARCHAR2
)
RETURN BOOLEAN;
--04-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 FS Vol1 Tag07,FATCA Phase-2 end
--03-SEP-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 FS Vol1 Tag07 CITIBLR#35183 Changes starts
FUNCTION fn_cust_reclac_reset
(
	p_customer_id	IN OLTM_CUSTOMER_FATCA_MASTER.customer_id%TYPE
	,p_error_code	IN OUT VARCHAR2
	,p_error_param  IN OUT VARCHAR2
)
RETURN BOOLEAN;
--03-SEP-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 FS Vol1 Tag07 CITIBLR#35183 Changes ends
--05-DEC-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIBLR#35200 Changes start here
FUNCTION fn_overlapping_rule_check
			(
				p_rule_code		IN txtms_rule.rule_code%TYPE
				,p_effective_date	IN txtms_rule.effective_date%TYPE
				,p_eff_end_date		IN txtms_rule.eff_end_date%TYPE
				,p_country 		IN txtms_rule.country%TYPE
				,p_customer		IN txtms_rule.customer%TYPE
				,p_cust_tax_group	IN txtms_rule.cust_tax_group%TYPE
				,p_currency		IN txtms_rule.currency%TYPE
				,p_nationality		IN txtms_rule.nationality%TYPE
				,p_new_nationality	IN txtms_rule.nationality%TYPE
				,p_new_country		IN txtms_rule.country%TYPE
				,p_new_cust_tax_group	IN txtms_rule.cust_tax_group%TYPE
				,p_error_code		IN OUT VARCHAR2
				,p_error_param 		IN OUT VARCHAR2
			)
RETURN BOOLEAN;
--05-DEC-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIBLR#35200 Changes end here
--11-DEC-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18135 changes Starts
FUNCTION fn_update_recalc_tax
	(
	p_module				IN		oltbs_contract.module_code%type,
	p_branch				IN		oltms_branch.branch_code%type,
	p_product				IN		oltbs_contract.product_code%type,
	p_processing_date		IN		date,
	p_commit_frequency		IN		oltbs_automatic_process_master.eod_commit_count%type,
	p_error_code			IN OUT	varchar2,
	p_error_parameter		IN OUT	varchar2
	)
RETURN BOOLEAN;
--11-DEC-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18135 changes Ends
-- OBCL_14.0_27443170 changes start
FUNCTION	fn_tax_referral
	(
	p_contract_ref_no 	IN	txtbs_maintxn.contract_ref_no%TYPE,
	p_event_seq_no 		IN	txtbs_txnrule_detail.event_seq_no%TYPE,
	p_rule 		        IN	txtbs_txnrule.rule%TYPE,
	p_ts_waiver 		OUT	VARCHAR2,
	p_ts_tax_amount_tag 	OUT	VARCHAR2,
	p_ts_tax_amount 		OUT	VARCHAR2,
	p_ts_tax_amount_ccy 	OUT	VARCHAR2,
	p_ts_value_date 		OUT	VARCHAR2,
	p_ts_tax_type 		OUT	VARCHAR2
	)
RETURN BOOLEAN;
--OBCL_14.0_27443170 changes end

--OBCL_14.3_IOF starts

FUNCTION fn_compute_IOF_amount
	(
	p_contract_ref_no       IN          txtbs_txnrule.contract_ref_no%TYPE,
	p_event_seq_no          IN          txtbs_txnrule_detail.event_seq_no%TYPE,
	p_rule_record		IN		txtms_rule%ROWTYPE,
	p_deal_ccy			IN		txtbs_txnrule_detail.currency%TYPE,
	p_tag_ccy			IN		txtbs_txnrule_detail.currency%TYPE,
	p_tag_amount 		IN		txtbs_txnrule_detail.amount%TYPE,
	p_liq_amount 		IN		txtbs_txnrule_detail.amount%TYPE,
	p_tax_rate			OUT		txtms_slab.rate%TYPE,
	p_tax_ccy	 		OUT		txtbs_txnrule_detail.currency%TYPE,
	p_tax_amount 		OUT		txtbs_txnrule_detail.amount%TYPE,
	p_error_code  		OUT		ertbs_msgs.err_code%TYPE,
	p_customer 			in 		VARCHAR2,
	p_country 			in 		VARCHAR2
	,p_cont_val_dt 		in 		date
	,p_value_date 		in 		date
	)
	RETURN boolean;
	--OBCL_14.3_IOF ends

--OBCL_14.4_IOF_Tax_Changes - Start

FUNCTION fn_compute_IOF_for_due_sch(p_contract_ref_no IN  txtbs_txnrule.contract_ref_no%TYPE,
                                    p_event_seq_no    IN  txtbs_txnrule_detail.event_seq_no%TYPE,
                                    p_rule_record     IN  txtms_rule%ROWTYPE,
                                    p_product_record  IN  oltm_product_master_ld%ROWTYPE,
                                    p_interst_basis   IN  txtbs_txnrule.interest_basis%TYPE,
                                    p_curr_event_code IN  oltbs_contract.curr_event_code%TYPE,
                                    p_slab_record     IN  txtms_slab%ROWTYPE,
                                    p_iof_rate        IN  txtms_slab.rate%TYPE,
                                    p_iof_add_rate    IN  txtms_rule.iof_add_rate%TYPE,
                                    p_iof_max_rate    IN  txtms_rule.iof_max_rate%TYPE,
                                    p_value_date      IN  DATE,
                                    p_iof_daily_rate  OUT txtms_slab.rate%TYPE,
                                    p_new_iof_tax_amt OUT txtbs_txnrule_detail.amount%TYPE,
                                    p_error_code      OUT ertbs_msgs.err_code%TYPE)
RETURN BOOLEAN;

--OBCL_14.4_IOF_Tax_Changes - End

--OBCL_14.4_TAX_Changes :: Starts  
FUNCTION fn_facility_tax_pickup_details(p_contract_ref_no IN txtbs_maintxn.contract_ref_no%TYPE,
                                        p_customer        IN txtbs_maintxn.customer%TYPE,
                                        p_event_seq_no    IN txtbs_txnrule_detail.event_seq_no%TYPE,
                                        p_delete          IN CHAR DEFAULT 'N')
  RETURN BOOLEAN;
  
FUNCTION fn_facility_compute_tax(p_contract_ref_no       IN txtbs_maintxn.contract_ref_no%TYPE,
                                 p_event_seq_no          IN txtbs_txnrule_detail.event_seq_no%TYPE,
                                 p_event                 txtbs_txnrule.computation_event%TYPE,
                                 p_transaction_date      IN txtbs_txnrule_detail.computation_date%TYPE,
                                 p_local_ccy             IN cytms_ccy_defn.ccy_code%TYPE,
                                 p_ts_value_date         IN VARCHAR2,
                                 p_ts_basis_amount_tag   IN VARCHAR2,
                                 p_ts_basis_amount       IN VARCHAR2,
                                 p_ts_basis_amount_ccy   IN VARCHAR2,
                                 p_ts_basis_amount_lcy   IN VARCHAR2,
                                 p_ts_liquidation_amount IN VARCHAR2,
                                 p_ts_tax_amount_tag     OUT VARCHAR2,
                                 p_ts_tax_amount         OUT VARCHAR2,
                                 p_ts_tax_amount_ccy     OUT VARCHAR2,
                                 p_branch                IN oltms_branch.branch_code%TYPE,
                                 p_ts_tax_type           OUT VARCHAR2,
                                 p_ts_waiver             OUT VARCHAR2,
                                 p_error_code            OUT ertbs_msgs.err_code%TYPE --18
                                 ) RETURN BOOLEAN;  
								 
FUNCTION fn_contract_waiver_chk(p_contract_ref_no IN txtbs_txnrule.contract_ref_no%TYPE,
                                p_rule            IN txtbs_txnrule.rule%TYPE,
                                p_event_seq_no    IN txtbs_txnrule.event_seq_no%TYPE,
                                p_Waiver          IN OUT VARCHAR2)
  RETURN BOOLEAN;
  
FUNCTION fn_get_tax_rule(p_customer         IN VARCHAR2,
                         p_rule             IN txtms_rule.rule_code%TYPE,
                         p_value_date       IN txtbs_txnrule_detail.value_date%TYPE,
                         p_basis_amount     IN txtbs_txnrule_detail.amount%TYPE,
                         p_basis_amount_ccy IN cytms_ccy_defn.ccy_code%TYPE,
                         p_rule_record      OUT txtms_rule%ROWTYPE,
                         p_slab_rule_record OUT txtms_slab%ROWTYPE,
                         p_err_code         IN OUT VARCHAR2) RETURN BOOLEAN;                                                

FUNCTION fn_compute_tax_amount_part(p_contract_ref_no IN txtbs_txnrule.contract_ref_no%TYPE,
                                    p_event_seq_no    IN txtbs_txnrule_detail.event_seq_no%TYPE,
                                    p_rule_record     IN txtms_rule%ROWTYPE,
                                    p_deal_ccy        IN txtbs_txnrule_detail.currency%TYPE,
                                    p_tag_ccy         IN txtbs_txnrule_detail.currency%TYPE,
                                    p_tag_amount      IN txtbs_txnrule_detail.amount%TYPE,
                                    p_liq_amount      IN txtbs_txnrule_detail.amount%TYPE,
                                    p_tax_rate        OUT txtms_slab.rate%TYPE,
                                    p_tax_ccy         OUT txtbs_txnrule_detail.currency%TYPE,
                                    p_tax_amount      OUT txtbs_txnrule_detail.amount%TYPE,
                                    p_error_code      OUT ertbs_msgs.err_code%TYPE,
                                    p_customer        IN VARCHAR2,
                                    p_country         IN VARCHAR2,
                                    p_cont_val_dt     IN DATE,
                                    p_value_date      IN DATE)
  RETURN BOOLEAN;                                 
--OBCL_14.4_TAX_Changes :: Ends  

END	txpks_new;
/
CREATE or replace SYNONYM txpkss_new FOR txpks_new
/