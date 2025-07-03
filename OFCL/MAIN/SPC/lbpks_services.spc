create or replace package lbpks_services AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_services.SPC
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
CHANGE_HISTORY

14-MAY-2002 FCC4.0 JUNE 2002 PLNCITI TIL #3476  Added a new function fn_delete_beforeauth to take care of
			     deletion of a/c entries during save so that the sessions will notget locked..Bsk

11-Oct-2002 FCC 4.1 Oct-2002 STAT1 SFR 53   Loans Status Accounting Changes.
							  Copy of product does not copy status
27-APR-2003 FCC 4.2 OPS Changes ITR2 SFR 8 Added a function to fn_validate_sch_gap_days validate schedule gap days

14-May-2003 Fcc4.2 OPS related changes..The settlement message generation of forward dated payments is done through SGEN.
						    So when Fn_authorise is called from the forward dated payment batch then 								    Settlement messages has to be suppressed..

23-MAY-2003 FCC 4.2 OPS focus testing SFR 72 changes

21-DEC-2005	FLEXCUBE V.CL Release 7.0, MITHILESH
		Added function fn_get_part_Mnemonic AND fn_resolve_Mnemonic.

22-DEC-2005 FLEXCUBE V.CL Release 7.0, Gowri, - Merge the olpks_servicesy with lbpks_services
27-DEC-2005 FLEXCUBE V.CL Release 7.0, Ratish
		1. Added function to populate component ratio of all the participants attached with the borrower contract.
28-DEC-2005 Adding a new function for population of the participant job table.
05-JAN-2006	FLEXCUBE V.CL Release 7.0, Gowri, Added fn_copy_from_template, fn_check_back_period_posting

11-JAN-2006 Flexcube V.CL Release 7.0 Holiday Treatment Related Changes By Aji
            1) ADDED function fn_get_ccy_holiday_list to get the Holiday currency list for the given Contract.
		2) ADDED function fn_default_currencies to get the Currency list.

17-JAN-2006 Flexcube V.CL Release 7.0 FN_GET_MNEMONIC ADDED BY S. V. SHIRGUPPPE AND FN_RESOLVE_MNEMONIC COMMENTED AS NOT CALLED .
19-JAN-2006 Flexcube V.CL Release 7.0 Interest Changes 19012006

23-JAN-2006 Flexcube V.CL Release 7.0 FN_GET_MNEMONIC REMOVED AND FN_RESOLVE_MNEMONIC UNCOMMENTED BY S. V. SHIRGUPPPE.
26-JAN-2006 Flexcube V.CL Release 7.0, Gowri, Added a new function fn_irfx_exfx_chk
26-JAN-2006 Flexcube V.CL Release 7.0, Nirupama Chadha, Added a new function FN_EFFDATE
09-FEB-2006 Flexcube V.CL Release 7.0, Suraj, added skim component type into comp_rec_type.
28-APR-2006 Flexcube V.CL Release 7.0, Gowri, added new function fn_borr_sublmt_chk - related to Borrower Sumblimit.
09-May-2006 FLEXCUBE V.CL Release 7.0, LOT2 ITR1 SFR#29, Gowri, commented function fn_borr_sublmt_chk and
					added a new function fn_borr_sublmt_process - related to Borrower Sumblimit.
15-JUN-2006 FLEXCUBE V.CL Release 7.0 LOT2 FT SFR#34
	    Added a new function fn_get_liqd_pref to get the liquidation preference for the component type.
04-Jul-2006 FCC V.CL Release 7.1 changes -- added new parameter p_even_req in FN_CHECK_RECOMP_MASTER
02-AUG-2006 FLEXCUBE V.CL Release 7.1 FS 3.0 Part Ccy Rest Changes - Added fun fn_default_participant with new added parameter currency
02-AUG-2006 FLEXCUBE V.CL Release 7.1 FS 6.0 Swing Line Changes Aji -- Added new function
08-AUG-2006 Flexcube V.CL Release 7.1, Changes ARUN, Added function FN_POP_CUST_CONT_MARGIN_RATE
24-AUG-2006 Flexcube V.CL Release 7.1,BVPRAM changes,added a parameter value date in fn_get_component_ratio , piyush
29-AUG-2006 FLEXCUBE V.CL Release 7.1 FS 3.0 Part Ccy Rest Changes -- change in parameter of fn_default_participant
11-SEP-2006 FCC V.CL RELEASE 7.1 Prime loan changes - Added function fn_populate_history.
22-SEP-2006 FCC V.CL RELEASE 7.1 sfr#176 changes daya assigned the field width for basis_amt_type in comp_rec_type to varchar2(25)
								 --since the lftms_product_iccf.basis_amount_type%type width was varchar2(15), used to bomb when used for
								 --selecting the basis_amount_tag.
27-NOV-2006 FLEXCUBE V.CL RELEASE 7.2 changes for Prime loans
Added parameter event_code in fn_populate_history.
10-JAN-2007--FLEXCUBE V.CL Release 7.2 DD Reversal Changes. Add Function Fn_recalc_ratio_on_ddrevc
10-Jan-2007	FLEXCUBE V.CL Release 7.2 SSN Changes
		Included a new function fn_ratio_prop to propagate the ratios for all future CAMD dates.
11-Jan-2007 FLEXCUBE V.CL Release 7.2 Changes for Cascade Particpation from Y -> N
09-FEB-2007 FLEXCUBE V.CL Release 7.2 Changes related to event sequencing.
20-Feb-2007 FLEXCUBE V.CL Release 7.2 LC FEE issuer changes
06-JUN-2007 CITILS, LC Balance Movement
--perftuningchanges08MAY07 added new function Fn_Update_Component_Ratio
08-JUN-2007 perftuningchanges08Jun07 new functions created for the comp ratio.
--PerfTuningChanges "CITILS, LC Balance   Movement" IT-BugFix - 12-JUN-2007
28-JUN-2007 FCC V.CL Release 7.3 tuning changes By Sweta.
03-Sep-2007 FCC V.CL RELEASE 7.3 Ancillary and Swing Line Changes
		added one more argument p_ancillary in fn_cascade_conversion_reqd
27-SEP-2007 FCC V.CL Release 7.3 Fee Schedules - Additions and Revisions
	    Check component last liqd dt while validating start date.
	    New function fn_get_last_liqddt added.
FLEXCUBE V.CL Release 7.3 ITR1 SFR#975, Retro Changes CITIUS-LS-975, 07-dec-2007
	    09-NOV-2007.CITIUS-LS#975.Changes related to borrower side propagation.
10-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR1 Retro Till no#488 SFR No#107
	    04-JUN-2007 CITIUS-LS#488 ARUN,  CHANGES, Settlement Default Changes.
	    	    Added function fn_default_settlements
10-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR1 Retro Till no#808 SFR No#107
	15-JUN-2007 CITIUS-LS#808.Tuning changes in fee liquidation
17-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#1, CITILS-US#891 - Participants should have mnemonics for all the XXCURRENCIES.
25-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#83, Added parameter remarks
04-FEB-2008 FLEXCUBE V.CL Release 7.4 BAU-Lot1, Sublimits changes comment
				Commented the function fn_borr_sublmt_process.
31-Mar-2008 FLEXCUBE V.CL Release 7.4 Swing line limit changes, modified the function fn_default_participants to include swing line
26-MAY-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-349, By Manjula
	    07-MAR-2007 FCC7.2 CITIUS-LS by VB, Till#349: Logic for source ref number in Rollover has been changed. Otherwise it is
	    not possible to process mutiple branch rolllovers with same contract ref no except brach code different
27-MAY-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-300 sweta, New function to check unauthorised contracts during online auth/delete
28-MAY-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-<1002> by Ankit, Changes done for validating availble amount.
06-JUN-2008 FLEXCUBE V.CL Release 7.4 RT#19 changes sweta added new function fn_sgen_validation which is being called in redefine button of drawdown form and tranch form and also during saving a drawdown contract and during vami
05-SEP-2008 FLEXCUBE V.CL Release 7.4, Retro of CITIUS-LS Till#1338 PF related changes(PRAM),By Saurabh
06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS Till#807,STP Consolidation,By Swapnasish,Tuning Changes
06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1234,STP Consolidation,By Swapnasish,SSI Mnemonic Validations Starts
06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS Till#1336,STP Consolidation,By Swapnasish,Changes for Detailed PRAM Screen testing
11-NOV-2008 FCC V.CL Release 7.4 Pram Job changes magi
28-NOV-2008 FLEXCUBE V.CL Release 7.4, BAU-LOT4 Sighting Funds Changes, included function Fn_populate_fronting_detail
03-MAR-2009 FCC V.CL Release 7.5 EURCITIPLC RETRO CITILS10G00185 Changes
			Performance issues on larger tranches. The larger tranches are having performance issues around
			bringing up the participants in the Participants sub menu of the tranche contract and the drawdown contract
06-MAR-2009 FCC V.CL Release 7.5 EURCITIPLC RETRO CITILS10G00149 Changes Adhoc Fee Liquidation not picking participant ratio as on payment value date
28-APR-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes, Gowri
29-APR-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes Arthy
30-MAR-2009 FLEXCUBE V.CL release 7.6 sighting funds changes added new function fn_check_fronting_type.
28-MAY-2009 CITIUS-LS#SRT5764 Missing Retro from CITIUS to BLORE
                1]  06-MAY-2009 CITIUS-LS#5704, PRAM Performance tuning.SSI mnemonic branch and currency validations for PRAM should be based on work tables. so new function has been introduced fn_val_ssi_menonic_branch_pram.
26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - changed the copyright clause.
02-JUN-2010 FLEXCUBE V.CL Release 7.7 VOL2 FS Tag 04 changes, RAPID to Flexcube and related STP changes
				While booking the tranche contract if there are self-participants, 
				system should populate the participants into the table lbtbs_loan_commitment_link
09-JUN-2010 Flexcube V.CL 7.7 FS Tag 05 Third Party Assignment Changes,A new function fn_get_prev_esn_ratio is added,to get the previosu esn asset ratio of each participant.				
27-JUL-2010 FLEXCUBE V.CL Release 7.7 Vol2 FS Tag07 floor and ceiling changes
		Added new functions fn_get_floor_ceiling_rate, fn_prop_floor_ceiling_rate, fn_floor_ceiling_margin_update
10-JUL-2010 FLEXCUBE V.CL Release 7.7 VOL2 FS Tag 08 Collateral Monitoring Changes		
02-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR1 SFR#14, New function created to propagate the floor and ceiling
		values for drawdown, during BLIQ.
03-JAN-2011 Flexcube V.CL Release 7.8, SFR#14, CITIUS Retro Till#7427 - function fn_del_zero_investor added.
01-JUN-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag06,FPML Messaging for Markit Integration changes
07-JUN-2011 FLEXCUBE V.CL Release 7.9 VOL2 FS Tag 8 Collateral participation changes
09-JUN-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag06,FPML Messaging for Markit Integration changes, function name of fn_trache_mei_change changed to fn_tranche_mei_change												    
--09-JUN-2011 Flexcube V.CL Release 7.9, CITIUS Retro, TILL#7518, start catch up retro
28-SEP-2010 CITIUS-LS#7510 Changing the asset ratio in participant screen while copying a contract or revisiting the particiapant screen is not changing the ratio in participant ratio table. Becuase of this component ratio and asset ratio are different whcih is wrong.		
--09-JUN-2011 Flexcube V.CL Release 7.9, CITIUS Retro, TILL#7518, end catch up retro
15-JUN-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag06,FPML Messaging for Markit Integration changes, function fn_tranche_mei_change changed to procedure pr_pop_tranche_mei_change											    
23-JUN-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag06,FPML Messaging for Markit Integration changes, new function fn_check_cusip_mei_msgs added
30-JUN-2011 Flexcube V.CL Release 7.9 FS Vol2 Tag 06 ITR1#52, FPML Messaging for Markit Integration changes, procedure name pr_pop_tranche_mei_change to  pr_prop_tranche_mei_change
18-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#8328 Floor and Ceiling Fixes 
10-NOV-2011 Flexcube V.CL Release 7.10 FS Tag 05 Changes - Floors and Ceilings Phase 2
	1) g_prop_esn is used to store the VAMB esn during VAMB. The same will be replaced by VAMI esn during VAMI
	2) g_process_name is used to store the process name i.e. ONLINE, FWDINIT, FLRCLGPR
	3) g_prop_modeis used to store the propagation mode i.e. 'B' (for batch), 'O' (for online)
01-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#11, Intellect Interface - Schedules
24-JAN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#10 IUT#93 Changes - System used Latest SSI details for FLIQ. It should use old ssi details for FLIQ and then SSI details should propagate.
13-MAR-2014	Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18366 , LC SUBLIMIT VALIDATION CHANGES,Added function for updation of global LC, Participant LC and borrower LC Sublimits
06-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 RETRO CITIBLR#35373 changes, FS Vol1 Tag09 system does not delete record from auto rate browser if contract is reversed.
21-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag03 changes,new function fn_get_loan_param_value is added to get the value for loan parameter passed
01-APR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag03 changes, new functions added for CUSIP Swing enhancements.
01-APR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag04 changes,new function added for Combined Drawdown/Renewal FX advice
14-APR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag03 Changes
16-APR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag04 IUT#134 Changes,in fn_suppress_check.
26-MAY-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag03 ITR#13 Changes,Changes done in check position function.
28-AUG-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07, Trading Flat Changes, two new functions added to check if participant share capture is required and if any interest due exists on borrower.
28-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag04 IUT#05 Changes, Added new function, fn_allinrate_check.
05-NOV-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag04 IUT#198 Changes, Added new function, fn_negative_base_rate_check.
11-NOV-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol2 Tag07 IUT#243 Trading Flat changes, added a new function fn_get_DD_max_paid_dt.
13-AUG-2019 OBCL_14.4_SLT_Amendment_Fee Changes starts

  Changed By         : Baljinder Singh
  Date               : 25-JUL-2020
  Change Description : LS SOFR participant processing changes
  Search String      : LS SOFR changes
  
  Changed By         : Arunprasath
  Date               : 22-Mar-2021
  Change Description : LS SOFR participant processing changes
  Search String      : OBCL_14.3_SOFR_Participant_engine_call
  
  Changed By         : Ramya M
  Changed On         : 01-APR-2021
  Change Description : Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R726.2 Swingline Changes
  Search String      : OBCL_14.5_LS_Swingline_Enhancement_Changes

  Changed By         : Abhinav Bhasker
  Changed On         : 09-Jun-2022
  Change Description : Added Generic Function to identify if there is any Error captured
  Search String      : Bug#34250746
  
  Changed By         : Jayaram N
  Changed On         : 09-Aug-2022
  Change Description : TLDTDUPL/LBDDDONL - DIFFERENT SKIM , DIFFERENT AMOUNTS AND DIFFERENT COUNTERPARTY TRADES NOT REFLECTING AT WRAPPER DRAWDOWN
  Search String      : Bug#34403937
  
  Changed By         : Sowmya Bitra
  Changed On         : 31-Jan-2024
  Change Description : Performance Tuning Changes for Syndication Online Transactions with large number(300+) of participants 
  Search String      : Bug#36008580
  
     **Changed By         : Anusha K
  **Date               : 05-Mar-2024
  **Change Description : added function to calculate end date .
  **Search String      : OBCL_RABO_Bug#36292647
  
	**Changed By         : Chandra Achuta
	**Date               : 06-MAY-2024
	**Change Description : Added global to execute the one time this function on time Fn_Authorise_function_check
	**Search String      : Bug#36575322  
	
	**Changed By         : Arunprasath
	**Date               : 05-June-2024
	**Change Description : Added global variable g_process_tr_samd to identify the tranche level SAMD
	**Search String      : Bug#36689014
	
  **Changed By         : Anusha K
  **Date               : 17-May-2024
  **Change Description : added function to update drawdwon transfer amt .
  **Search String      : OBCL_RABO_Bug#36505530
  
  **Changed By         : Arunprasath
  **Date               : 03-Aug-2024
  **Change Description : Global variable g_npvami added for capturing NP VAMI case
  **Search String      : Bug#36846184  
  
  **Changed By         : Anusha k
  **Date               : 27-Aug-2024
  **Change Description : Global variable G_PREV_CASC added for getting original casc value
  **Search String      : Bug#36844703   

*/
--Bug#36575322   Changes Starts
g_Auth_Check		VARCHAR2(1) := 'N';   
--Bug#36575322   Changes Ends
--10-NOV-2011 Flexcube V.CL Release 7.10 FS Tag 05 Changes starts
g_prop_esn		oltbs_contract.latest_event_seq_no%TYPE;
g_process_name		VARCHAR2(10);
g_prop_mode			VARCHAR2(1);
g_process_tr_samd 	VARCHAR2(1); --Bug#36689014
g_npvami 			varchar2(1);--Bug#36846184
g_prev_casc 		varchar2(1);--Bug#36844703
--10-NOV-2011 Flexcube V.CL Release 7.10 FS Tag 05 Changes ends
--06-JUN-2007 CITILS, LC Balance Movement starts
TYPE				g_liq_record_type
IS RECORD			(
				contract_ref_no			oltbs_contract_liq.contract_ref_no%TYPE,
				event_seq_no			oltbs_contract_liq.event_seq_no%TYPE,
				component			oltbs_contract_liq.component%TYPE,
				amount_due			oltbs_contract_liq.amount_due%TYPE,
				amount_paid			oltbs_contract_liq.amount_paid%TYPE,
				overdue_days			oltbs_contract_liq.overdue_days%TYPE,
				tax_paid			oltbs_contract_liq.tax_paid%TYPE,
				inflow_outflow			NUMBER,
				overdue_amount			oltbs_amount_due.amount_due%TYPE,
				component_type			oltbs_amount_due.component_type%TYPE,
				component_ccy			oltbs_amount_due.currency_amt_due%TYPE,
				contract_ccy_amount_paid	oltbs_amount_due.amount_settled%TYPE
				);

TYPE				g_liq_table_type
IS TABLE OF			g_liq_record_type
INDEX BY			BINARY_INTEGER;
--06-JUN-2007 CITILS, LC Balance Movement ends

-- FCC 4.3 AUG 2003 MM Module changes..starts
--TYPE ty_tbl_brn_params IS TABLE OF oltms_branch_parameters%ROWTYPE INDEX BY VARCHAR2(5); --FCC 4.3 MM Module changes..
TYPE ty_tbl_brn_params IS TABLE OF oltms_branch_parameters%ROWTYPE INDEX BY VARCHAR2(8); --OBCL_14.8_CE_Length_Changes
--01-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#11, Intellect Interface - Schedules changes starts
--TYPE ty_tbl_intellect IS TABLE OF oltbs_contract_schedules.schedule_type%TYPE INDEX BY VARCHAR2(5);
TYPE				typ_rec_intellect_record
IS RECORD
	(
	component_type		oltbs_contract_schedules.schedule_type%TYPE
	);

TYPE				typ_tbl_intellect_table
IS TABLE OF			typ_rec_intellect_record
INDEX BY			VARCHAR2(14);

g_tbl_intellect_table		typ_tbl_intellect_table;
--01-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#11, Intellect Interface - Schedules changes ends
--START: added by Gowri
TYPE comp_rec_type IS RECORD
	(
	Product					oltms_product.product_code%TYPE,
	component				lftbs_contract_charges.component%TYPE,
	component_type			lbtbs_participant_ratio.COMPONENT_TYPE%type,	--FCC 4.6.2 CITI TESTING FIX
	propagation_reqd		lftms_product_iccf.propagation_reqd%TYPE,
	main_int_comp			lftms_product_iccf.SHOWN_IN_CONTRACT_MAIN_SCREEN%TYPE,
    basis_amt_category      lftms_product_iccf.basis_amount_category%TYPE,
--	basis_amt_type          lftms_product_iccf.basis_amount_type%type,
	basis_amt_type          varchar2(25),--22-SEP-2006 FCC V.CL RELEASE 7.1 sfr#176 changes daya
	skim_component			varchar2(1), -- Flexcube V.CL Release 7.0, Suraj, added.
	sub_component_type		varchar2(1)
	);
--END: added by Gowri
--sweta starts
type  g_participant IS RECORD
		(
		contract_ref_no  oltbs_contract.contract_ref_no%type
		);
	TYPE				p_participant
	IS TABLE OF			g_participant
	INDEX BY			BINARY_INTEGER;
--sweta ends
FUNCTION Fn_get_branch_params
		(
		p_branch_code 	IN 		VARCHAR2,
		p_module_code   IN              VARCHAR2,
		p_branch_param	OUT		oltms_branch_parameters%ROWTYPE,
		p_error_code 	IN OUT		VARCHAR2,
		p_error_param 	IN OUT 		VARCHAR2
		)
		RETURN BOOLEAN;
-- FCC 4.3 AUG 2003 MM Module changes..ends
--07-FEB-2006 Flexcube V.CL Release 7.0 added new function by nirupama start
FUNCTION FN_EFFDATE
		(
		  P_TRANCHE_REF_NO oltbs_contract.contract_ref_no%Type,
		  P_EFFECTIVE_DATE OUT DATE
		)
RETURN BOOLEAN;
--07-FEB-2006 Flexcube V.CL Release 7.0 added new function by nirupama end
function fn_copycluster (old_cluster IN varchar2,
			new_cluster IN varchar2) return Boolean;

function fn_copyproduct ( old_product_code in varchar2,
			new_product_code in varchar2 ) return Boolean ;

FUNCTION fn_delete
		(
		pContractRefNo			IN	OUT	oltbs_contract.contract_ref_no%type,
		pErrorCode				IN	OUT	Varchar2,
		pErrorParams			IN	OUT	Varchar2
		)
Return Boolean;

FUNCTION fn_AmendBeforeFirstAuth
			(
			pContractRefNo			IN	OUT	oltbs_contract.contract_ref_no%type,
			pErrorCode				IN	OUT	Varchar2,
			pErrorParams			IN	OUT	Varchar2
			)
Return Boolean;

Function fn_authorise
		(
		pContractRefNo	IN		oltbs_contract.contract_ref_no%type,
		pErrorCode		IN	OUT	Varchar2,
		pErrorParams	IN	OUT	Varchar2,
		p_gen_settlmsg	IN		Varchar2	DEFAULT 'Y'		--Fcc4.2 OPS related changes..
		)
Return Boolean;

function fn_Backup(pContractRefNo IN	OUT oltbs_contract.contract_ref_no%type)
return Boolean;

function fn_Restore(pContractRefNo IN	OUT oltbs_contract.contract_ref_no%type)
return Boolean;

function fn_delete_Backup(pContractRefNo IN oltbs_contract.contract_ref_no%type)
return Boolean;

function fn_create_new_version(p_reference_no IN Varchar2) return number;

--FCC4.0 JUNE 2002 PLNCITI TIL #3476  Added a new function fn_delete_beforeauth..Bsk
FUNCTION fn_delete_beforeauth
			 	(
				p_contract_ref_no  	  IN 	 oltbs_contract.contract_ref_no%TYPE,
				p_action_code		  IN	 VARCHAR2,
				p_error_code		  IN OUT ertbs_msgs.err_code%TYPE,
				p_error_parameter	  IN OUT varchar2
				)
RETURN BOOLEAN;

--FCC 4.1 Oct-2002 STAT1 SFR 53 Loans Status Accounting Changes start
Function fn_reversal_restore ( pContractRefNo IN Varchar2 )
Return BOOLEAN;

Function fn_reversal_backup ( pContractRefNo IN Varchar2 )
Return BOOLEAN;
--FCC 4.1 Oct-2002 STAT1 SFR 53 Loans Status Accounting Changes end --STAT1 SFR 53
---------------------------------------------------------------------------------------------------------------------------------
--
--FCC 4.2 OPS Changes ITR2 SFR 8 start
--
FUNCTION	 fn_validate_sch_gap_days
			(
			p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
			p_main_comp			IN      	oltbs_contract_master.main_comp%TYPE,
			p_maturity_date		IN      	oltbs_contract_master.maturity_date%TYPE,
			p_currency			IN      	oltbs_contract_master.currency%TYPE,
			p_amount			IN      	oltbs_contract_master.amount%TYPE,
			p_value_date		IN      	oltbs_contract_master.value_date%TYPE,
			p_treasury_source		IN		oltbs_contract.contract_ref_no%TYPE,
			p_error_codes		IN OUT  	VARCHAR2,
			p_error_parameter	  	IN OUT  	VARCHAR2
			)
RETURN BOOLEAN;
--
--FCC 4.2 OPS Changes ITR2 SFR 8 end
--

--
--FCC 4.2 OPS focus testing SFR 72 changes start
--
FUNCTION	fn_check_liqd_tenor
	(
	p_treasury_source		IN		oltbs_contract.treasury_source%TYPE,
	p_contract_master_rec	IN		oltbs_contract_master%ROWTYPE,
	p_from_save			IN		VARCHAR2,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--
--FCC 4.2 OPS focus testing SFR 72 changes end
--
FUNCTION	 fn_maintain_currency_limits
			(
			p_product	oltms_product.product_code%TYPE
			)
RETURN BOOLEAN;

--START: Added by Gowri

FUNCTION fn_contract_complete (
								 p_contract_ref_no 		in lftbs_contract_interest.contract_reference_no%type,
								 p_event_seq_no 			in lftbs_contract_interest.event_sequence_no%type,
--								 p_all_pickup 			in char,
								 p_ts_event    		 	out varchar2,
								 p_ts_component  			out varchar2,
								 p_ts_pickup_event_seq_no 	out varchar2,
								 p_ts_interest_basis    	out varchar2,
								 p_ts_rate  			out varchar2,
								 p_ts_rate_code  			out varchar2,
								 p_ts_spread  			out varchar2,
								 p_ts_currency 			out varchar2,
								 p_ts_change_during_amendment out varchar2,
								 p_ts_min_rate 			out varchar2,
								 p_ts_max_rate 			out varchar2,
								 p_ts_waiver   			out varchar2,
								 p_ts_reset_tenor   		out varchar2,
								 p_ts_borrow_lend_ind  		out varchar2,
								 p_ts_rate_calc_type  		out varchar2,
								 p_ts_cust_margin  		out varchar2,
								 p_ts_rate_type			out varchar2,
								 p_ts_status			out varchar2
					) RETURN BOOLEAN ;

--12-APR-2003 FCC4.2 APR 2003 LS changes start
/*
FUNCTION fn_participant_authorise(p_contract_ref_no IN CHAR,
					    p_err_codes IN OUT CHAR,
					    p_params IN OUT CHAR)
RETURN BOOLEAN;

FUNCTION fn_participant_delete(p_contract_ref_no IN OUT CHAR,
					 p_err_codes IN OUT CHAR,
					 p_params IN OUT CHAR)
RETURN BOOLEAN;

FUNCTION FN_GENERATE_DRAWDOWN(p_contract_ref_no IN  lbtbs_syndication_master.contract_ref_no%TYPE,
                              p_product_type    IN  oltbs_contract_master.product_type%TYPE,
                              p_number          OUT NUMBER
                                )
                 RETURN BOOLEAN;
RETURN BOOLEAN;
*/
--12-APR-2003 FCC4.2 APR 2003 LS changes end


--01-FEB-2003 FCC4.2 APR 2003 CITIPLC changes for LS start
FUNCTION fn_check_participant_ratio
			  (p_contract_ref_no  IN  lbtbs_contract_participant.contract_ref_no%TYPE,
			   p_event_seq_no     IN  lbtbs_contract_participant.event_seq_no%TYPE,
			   p_contract_type    IN  lbtbs_contract_participant.contract_type%TYPE,
			   p_drawdown_no      IN  lbtbs_contract_participant.drawdown_no%TYPE,
			   p_error_code       IN OUT VARCHAR2,
 			   p_error_param      IN OUT VARCHAR2
			  )
RETURN BOOLEAN;
--01-FEB-2003 FCC4.2 APR 2003 CITIPLC changes for LS end

--08-APR-2003 FCC4.2 APR 2003 LS changes start
FUNCTION fn_change_contract_status
			(
		  	 p_branch_code	  	  IN 		oltms_branch.branch_code%TYPE,
			 p_branch_date	  	  IN		sttms_dates.today%TYPE,
		  	 p_commit_frequency   IN 		NUMBER,
			 p_error_code	  	  IN OUT 	ertbs_msgs.err_code%TYPE,
		 	 p_error_parameter    IN OUT 	ertbs_msgs.message%TYPE
			)
RETURN BOOLEAN;
--08-APR-2003 FCC4.2 APR 2003 LS changes end

-- FCC 4.6.2 CITI FEE CHANGES START BY KISHORE
FUNCTION fn_get_component_type(P_Prod_Code	IN	oltms_product.product_code%TYPE,
			       P_Component	IN	lftms_product_charge.component%TYPE,
			       P_component_rec	OUT	lbpks_services.comp_rec_type,
			       p_ErrCode	IN OUT  Varchar2,
			       p_ErrParam	IN OUT  Varchar2)
RETURN BOOLEAN;

function fn_get_prod_counterparty_type(p_product IN varchar2) return varchar2;
-- FCC 4.6.2 CITI FEE CHANGES END BY KISHORE

--FCC 4.6.2 CITILS 04-AUG-2005 Netting changes
PROCEDURE dbg(pmsg IN varchar2);

FUNCTION fn_get_counterparty_type(p_contract_ref_no IN VARCHAR2) RETURN VARCHAR2;

FUNCTION fn_get_contract_type(p_contract_ref_no IN VARCHAR2) RETURN VARCHAR2;

FUNCTION fn_get_contract_type(p_contract_ref_no IN  VARCHAR2,
                              p_customer_type   OUT VARCHAR2,
                              p_contract_type   OUT VARCHAR2) RETURN BOOLEAN;
--FCC 4.6.2 CITILS 04-AUG-2005 Netting changes

--FCC 4.6.2 CITI LS CHANGES - PRAM Start
FUNCTION Fn_Get_Participant_OSAmount(p_contract_ref_no  IN OLTB_CONTRACT.contract_ref_no%TYPE,
						p_counterparty     IN lptb_contract_master.counterparty%TYPE,
						p_contract_type    IN VARCHAR2,
						p_value_date       IN DATE,
						p_os_amount        IN OUT NUMBER,
						p_available_amount IN OUT NUMBER,
						p_error_code       IN OUT VARCHAR2,
						p_error_param      IN OUT VARCHAR2)
RETURN BOOLEAN;

--FCC 4.6.2 CITI LS CHANGES - PRAM End

--FCC 4.6.2 CitiLS changes by satya
Function fn_insert_tr_ddno_linkage
(
	p_tranche_ref_no	IN	lbtbs_tranche_ddno_linkage.tranche_ref_no%type,
	p_drawdown_no		IN	lbtbs_tranche_ddno_linkage.drawdown_no%type,
	p_esn			IN	lbtbs_tranche_ddno_linkage.event_seq_no%type default 0
) return boolean;
--FCC 4.6.2 CitiLS changes by satya

--CitiLS changes - function added by Gowri
FUNCTION fn_process_event(
                           pContractrefno                  IN oltbs_contract.CONTRACT_REF_NO%TYPE
                          ,pEvent                          IN oltbs_contract.CURR_EVENT_CODE%TYPE
                          ,pDrawdownNo                     IN lbtbs_drawdown_schedule.DRAWDOWN_NO%TYPE
                          ,pErrorCode                      IN OUT VARCHAR2
                          ,pErrorParams                    IN OUT VARCHAR2
                         )
RETURN BOOLEAN;

FUNCTION fn_populate_exrate_details( pContractRefNo             IN oltbs_contract.CONTRACT_REF_NO%TYPE
                                    ,pEffectiveDate             IN DATE
                                    ,pEndDate                   IN DATE
                                    ,pContractCcy               IN VARCHAR2
                                    ,pTrancheCcy                IN VARCHAR2
				    ,pExfixingDate		IN DATE
			 	    ,pExRate			IN NUMBER
				    ,pExNotcDate		IN DATE
				    ,premarks                   IN VARCHAR2--FLEXCUBE V.CL Release 7.3 ITR2 SFR#83,25-DEC-2007
                                    )
RETURN BOOLEAN;

FUNCTION fn_process_event_nolog(
                           pContractrefno                  IN oltbs_contract.CONTRACT_REF_NO%TYPE
                          ,pEvent                          IN oltbs_contract.CURR_EVENT_CODE%TYPE
                          ,pEventSeqNo                     IN NUMBER
                          ,pDrawdownNo                     IN lbtbs_drawdown_schedule.DRAWDOWN_NO%TYPE
                          ,pErrorCode                      IN OUT VARCHAR2
                          ,pErrorParams                    IN OUT VARCHAR2
                         )
RETURN BOOLEAN;
FUNCTION fn_default_entities(
                                pTrancheRefNo              IN oltbs_contract.CONTRACT_REF_NO%TYPE
                               ,pContractRefNo             IN oltbs_contract.CONTRACT_REF_NO%TYPE
                               ,pCustomerNo                IN lbtbs_contract_borrowers.CUSTOMER_NO%TYPE
                               ,pVersionNo                 IN NUMBER
                               ,pDrawdownNo                IN NUMBER
                               ,pErrorCode                 IN OUT VARCHAR2
                               ,pErrorParam                IN OUT VARCHAR2
                              )
RETURN BOOLEAN;
FUNCTION fn_default_participants( pContractRefNo             IN oltbs_contract.CONTRACT_REF_NO%TYPE
                                 ,pTrancheRefNo              IN oltbs_contract.CONTRACT_REF_NO%TYPE
                                 ,pVersionNo                 IN NUMBER
                                 ,pEventSeqNo                IN NUMBER
                                 ,pDrawdownNo                IN NUMBER
                                 ,pErrorCode                 IN OUT VARCHAR2
                                 ,pErrorParam                IN OUT VARCHAR2
                                )
RETURN BOOLEAN;

--FLEXCUBE V.CL Release 7.1 FS 3.0 Part Ccy Rest Changes Start
FUNCTION fn_default_participants( pContractRefNo             IN oltbs_contract.CONTRACT_REF_NO%TYPE
                                 ,pTrancheRefNo              IN oltbs_contract.CONTRACT_REF_NO%TYPE
                                 ,pVersionNo                 IN NUMBER
                                 ,pEventSeqNo                IN NUMBER
                                 ,pDrawdownNo                IN NUMBER
                                 ,P_CCY                      IN VARCHAR2
                                 ,P_value_date               IN DATE   --FLEXCUBE V.CL Release 7.1 FS 3.0 Part Ccy Rest Changes
                                 ,pErrorCode                 IN OUT VARCHAR2
                                 ,pErrorParam                IN OUT VARCHAR2
                                 ,pswingline		     IN VARCHAR2 DEFAULT 'N' -- 31-Mar-2008 FLEXCUBE V.CL Release 7.4 Swing line limit changes
                                )
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.1 FS 3.0 Part Ccy Rest Changes End
FUNCTION fn_amend_drawdown(
                            pContractrefno             IN oltbs_contract.CONTRACT_REF_NO%TYPE
                            ,pVersionNo                IN oltbs_contract.LATEST_VERSION_NO%TYPE
                            ,pErrorCode              IN OUT VARCHAR2
			   )
RETURN BOOLEAN;
-- Added for population of the job table
FUNCTION fn_pop_participant_jobs(
				p_contract_ref_no oltbs_contract.contract_ref_no%TYPE,
				p_version_no	  IN oltbs_contract.latest_version_no%TYPE,
				pErrorCode	OUT VARCHAR2,
				pErrorParam	OUT VARCHAR2
				)
RETURN BOOLEAN ;


-- End of Added for population of the job table
--END: Added by Gowri
--START: Added by Gowri
FUNCTION fn_copy_from_template( pTemplate           IN oltbs_template.TEMPLATE_ID%TYPE
                               ,pFacilityRefNo      IN oltbs_contract.CONTRACT_REF_NO%TYPE
                               ,pTrancheRefNo       IN oltbs_contract.CONTRACT_REF_NO%TYPE
                               ,pBorrower           IN oltbs_contract.COUNTERPARTY%TYPE
                               ,pNewReferenceNo     IN OUT oltbs_contract.CONTRACT_REF_NO%TYPE
                               ,pErrorCode          IN OUT VARCHAR2
                               ,pErrorParam         IN OUT VARCHAR2
                              )
RETURN BOOLEAN ;

/*FUNCTION fn_check_back_period_posting(
					p_action_code	IN	VARCHAR2,
					p_value_Date	IN	DATE,
					p_err_code	IN OUT	ERTBS_MSGS.ERR_CODE%TYPE,
					p_err_params	IN OUT	ERTBS_MSGS.MESSAGE%TYPE
					)
RETURN BOOLEAN;*/ -- OFCL12.2 not reqd

--END: Added by Gowri

--Flexcube V.CL Release 7.0, Changes by MIT on 211205 Start

Function fn_get_part_Mnemonic
(
	p_contract_ref_no		IN	varchar2,
	p_counterparty			IN	varchar2,
	p_component			IN	varchar2 default NULL,
	p_amt_tag			IN	varchar2 default NULL, --24-JAN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#10 IUT#93 Changes
	p_SSI_seq_no			OUT	number
) return varchar2;

-- Flexcube V.CL Release 7.0 following function UNcommented by S. V. Shirguppe on 23-JAN-2006 .

FUNCTION fn_resolve_Mnemonic
(
	p_ContractRefNo		IN	oltbs_contract.contract_ref_no%Type,
	p_counterparty		IN	lptbs_contract_master.COUNTERPARTY%TYPE,
	p_sett_tags       	IN	VARCHAR2,
	p_tag_count       	IN	NUMBER,
	p_final_ssi_no    	OUT	VARCHAR2,
	p_final_ssi_mnemonic 	OUT 	VARCHAR2	-- FLEXCUBE V. CL. 7.0 ADDED BY SVS ON 24/01/2006 .
) RETURN BOOLEAN;

/*	Function taken from LTSB but not used at present, may be used in future
FUNCTION FN_TAG_SEQ_FORMATION
(
	p_ContractRefNo		IN oltbs_contract.contract_ref_no%Type,
	p_EventSeqNo		IN oltbs_contract.latest_event_seq_no%Type,
	p_Module			IN oltbs_contract.module_code%Type,
	p_counterparty		IN lptbs_contract_master.COUNTERPARTY%TYPE,
	p_borrower_no		IN lptbs_contract_master.BORROWER_CONTRACT_REF_NO%TYPE,
	p_tag_count			IN NUMBER,
	p_versionFlagList		IN VARCHAR2,
	p_ccyRestrictFlagList	IN VARCHAR2,
	p_sett_tags			IN Varchar2,
	p_sett_ccys			IN Varchar2,
	p_payrecvFlagList		IN VARCHAR2,
	p_xferTypeFlagList	IN VARCHAR2,
	p_acBrList			IN VARCHAR2,
	p_acList			IN VARCHAR2,
	p_sett_settl_ccys		IN Varchar2,
	p_payDetailsList		IN VARCHAR2,
	p_chargeDetailsList	IN VARCHAR2,
	p_ultBenList		IN VARCHAR2,
	p_byOrderList		IN VARCHAR2,
	p_payByList			IN VARCHAR2,
	p_instrTypeList		IN VARCHAR2,
	p_instrNoList		IN VARCHAR2,
	p_changeAcList		IN VARCHAR2,
	p_changeRateList		IN VARCHAR2,
	p_partyInfoList		IN VARCHAR2,
	p_coverReqdList		IN VARCHAR2,
	p_Err_Code			IN OUT VARCHAR2,
	p_Err_Param			IN OUT VARCHAR2,
	PickupHoff			OUT lbpkss_services.PickUp_Rec_Type
) RETURN BOOLEAN;
*/

--Flexcube V.CL Release 7.0, Changes by MIT on 211205 End

--Flexcube V.CL Release 7.0, Changes by RATISH on 271205 Start

/*VIEW AND LOAD COMPONENT RATIO OF THE PARTICIPANT

	/*Record type used to hold the information send from the form*/
	TYPE component_ratio_rec IS RECORD (
      			contract_ref_no   lbtms_contract_participants.contract_ref_no%TYPE,
      			event_seq_no      lbtms_contract_participants.event_seq_no%TYPE,
     			contract_type     lbtbs_participant_ratio.contract_type%TYPE,
      			drawdown_no       lbtbs_participant_ratio.drawdown_no%TYPE);


  TYPE tb_component_ratio IS TABLE OF lbtbs_participant_ratio%ROWTYPE
  INDEX BY BINARY_INTEGER;

  /*Function used to find out the component ratio of specific participant*/
  FUNCTION fn_get_component_ratio (
     	p_data              IN    component_ratio_rec,
	p_component_data    OUT   tb_component_ratio,
      	p_flush                   CHAR,
	p_value_date	IN	DATE DEFAULT NULL --Flexcube V.CL Release 7.1,BVPRAM changes on 24-AUG-2006, piyush
   )
  RETURN BOOLEAN;

 /*
  FUNCTION fn_upload_component_ratio(
  	  p_data              IN    component_ratio_rec,
	  p_component_data    in   tb_component_ratio)
  RETURN BOOLEAN;*/

--Flexcube V.CL Release 7.0, Changes by RATISH on 271205 Start

-- 11-JAN-2006 Flexcube V.CL Release 7.0 Holiday Treatment Related Changes By Aji Starts Here
FUNCTION fn_get_ccy_holiday_list(
					p_contract_ref_no	IN	VARCHAR2,
					p_module		IN  	VARCHAR2,
					p_version_no	IN  	NUMBER,
					P_validation_type	IN	CHAR,
					p_ccy_list		OUT	VARCHAR2,
					p_error_code	OUT	VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_default_currencies(
				p_facility_ref_no	IN oltbs_contract.CONTRACT_REF_NO%TYPE,
				p_tranche_ref_No	IN oltbs_contract.CONTRACT_REF_NO%TYPE,
				p_version_no		IN NUMBER,
				p_error_code		IN OUT VARCHAR2,
				p_error_param		IN OUT VARCHAR2)
RETURN BOOLEAN;
-- 11-JAN-2006 Flexcube V.CL Release 7.0 Holiday Treatment Related Changes By Aji Ends Here

--Flexcube V.CL Release 7.0 Interest Changes 19012006 ST
FUNCTION FN_CHECK_RECOMP_MASTER(
				p_ref_no     IN oltbs_contract.CONTRACT_REF_NO%type,
	 		    	p_err_code  OUT Varchar2,
				p_err_param OUT Varchar2,
				p_event_req in varchar2 default 'Y', --added new ----04-Jul-2006 FCC V.CL Release 7.1 changes
				p_online_force in varchar2 default 'N'
				)
RETURN BOOLEAN;

--Flexcube V.CL Release 7.0 Interest Changes 19012006 ED

--START: Added, Flexcube Release 7.0, 26-JAN-2006, Gowri
FUNCTION fn_irfx_exfx_chk
         (
         p_br_dd_ref_no		IN	oltbs_contract.contract_ref_no%TYPE,
	   p_product_type		IN	oltbs_contract.product_type%type
         )
RETURN BOOLEAN;
--END: Added, Flexcube Release 7.0, 26-JAN-2006, Gowri

FUNCTION fn_get_split_date
		(
		p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
		p_effective_date		OUT		DATE,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

--START: Gowri, 09-May-2006, FLEXCUBE V.CL Release 7.0, LOT2 ITR1 SFR#29
/*--START: Added, Flexcube Release 7.0, 27-APR-2006, Gowri
FUNCTION fn_borr_sublmt_chk
         (
	   p_tr_ref_no		IN	oltbs_contract.contract_ref_no%TYPE,
         p_dd_ref_no		IN	oltbs_contract.contract_ref_no%TYPE,
	   p_product_type		IN	oltbs_contract.product_type%type,
	   p_borr			IN 	lbtb_borr_prod_limit.borrower%type,
	   p_product		IN	lbtb_borr_prod_limit.drawdown_product%type,
	   p_ccy			IN	lbtb_borr_prod_limit.ccy_code%type,
	   p_amount			IN	lbtb_borr_prod_limit.limit_amt%type,
	   p_val_dt			IN	lbtb_borr_prod_vdutil.value_date%type,
	   p_action			IN 	VARCHAR2
         )
RETURN BOOLEAN;
--END: Added, Flexcube Release 7.0, 27-APR-2006, Gowri*/
-- 04-FEB-2008 FLEXCUBE V.CL Release 7.4 BAU-Lot1, Sublimits changes comment starts
/*
FUNCTION fn_borr_sublmt_process
         (
	   p_tr_ref_no		IN	oltbs_contract.contract_ref_no%TYPE,
         p_dd_ref_no		IN	oltbs_contract.contract_ref_no%TYPE,
	   p_event			IN	oltbs_contract.curr_event_code%TYPE,
	   p_action			IN 	VARCHAR2
         )
RETURN BOOLEAN;
*/
-- 04-FEB-2008 FLEXCUBE V.CL Release 7.4 BAU-Lot1, Sublimits changes comment ends
--END: Gowri, 09-May-2006, FLEXCUBE V.CL Release 7.0, LOT2 ITR1 SFR#29
--FLEXCUBE V.CL Release 7.0 LOT2 FT SFR#34 starts
FUNCTION  fn_get_comp_liqd_pref
		(p_contract_ref_no	IN	oltbs_contract.contract_Ref_no%type,
		 p_module		IN	oltbs_contract.module_code%type,
		 p_component		IN	oltbs_amount_due_cs.component%type,
		 p_comp_type		IN	oltbs_amount_due_cs.component_type%type,
		 p_liqd_pref		OUT	oltms_product_master_ld.liquidation_mode%type,
		 p_error_code		IN OUT	VARCHAR2,
		 p_error_parameter	IN OUT	VARCHAR2)
RETURN BOOLEAN;


FUNCTION is_propagation_comp
	(p_contract_ref_no	VARCHAR2,
	p_component		VARCHAR2
	)
RETURN VARCHAR2;
--FLEXCUBE V.CL Release 7.0 LOT2 FT SFR#34 ends

-- 02-Aug-2006 FLEXCUBE V.CL Release 7.1 FS 6.0 Swing Line Changes Starts by aji
FUNCTION fn_calculate_fee_isr(
					p_contract_ref_no		IN		oltbs_contract.contract_ref_no%Type,
					p_value_date		IN		oltbs_contract_master.value_date%Type,
					p_error_code		IN OUT	Varchar2,
					p_error_parameter	IN OUT	Varchar2
					)
Return Boolean;
-- 02-Aug-2006 FLEXCUBE V.CL Release 7.1 FS 6.0 Swing Line Changes Ends by aji

--08-AUG-2006 Flexcube V.CL Release 7.1, Changes ARUN, Added, Starts
FUNCTION FN_POP_CUST_CONT_MARGIN_RATE
(
	p_contract_ref_no	IN	lbtb_borr_cont_margin_rate.contract_ref_no%type,
	p_borrower		IN	lbtb_borr_cont_margin_rate.borrower%type,
	p_event_seq_no 		IN	lbtb_borr_cont_margin_rate.event_seq_no%type,
	p_interest_component	IN	lbtb_borr_cont_margin_rate.interest_component%type,
	p_margin_component	IN	lbtb_borr_cont_margin_rate.margin_component%type,
	p_value_date		IN	lbtb_borr_cont_margin_rate.value_date%type,
	p_contract_margin_rate	IN	lbtb_borr_cont_margin_rate.contract_margin_rate%type,
	p_customer_margin_rate	IN	lbtb_borr_cont_margin_rate.customer_margin_rate%type
)
RETURN BOOLEAN;
--08-AUG-2006 Flexcube V.CL Release 7.1, Changes ARUN, Added, Ends

--11-SEP-2006 FCC V.CL RELEASE 7.1 Prime loan changes starts
FUNCTION fn_populate_history
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_module		IN	oltbs_contract.module_code%TYPE,
	p_event_seq_no		IN	oltbs_contract.latest_event_seq_no%TYPE,
	p_event_code      	IN  	oltbs_contract.curr_event_code%TYPE, --27-NOV-2006 FLEXCUBE V.CL RELEASE 7.2 changes for Prime loans
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--11-SEP-2006 FCC V.CL RELEASE 7.1 Prime loan changes ends
--10-JAN-2007--FLEXCUBE V.CL Release 7.2 DD Reversal Changes--START
gprch_event varchar2(1) := 'N';
FUNCTION Fn_recalc_ratio_on_ddrevc(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
				 	p_value_date IN DATE,
					p_event_code IN oltbs_contract.curr_event_code%TYPE,
					p_error_code IN OUT ertbs_msgs.err_code%TYPE,
					p_error_parameter IN OUT varchar2) RETURN boolean;
PROCEDURE pr_set_prch(p_status IN VARCHAR2);
--10-JAN-2007--FLEXCUBE V.CL Release 7.2 DD Reversal Changes--END

--FLEXCUBE V.CL Release 7.2 SSN Changes start
FUNCTION fn_ratio_prop
			(
			p_contract_ref_no 	IN	VARCHAR2,
			p_event_seq_no		IN	NUMBER,
			p_value_date		IN	DATE,
			p_error_code		OUT	VARCHAR2,
			p_error_param		OUT	VARCHAR2
			)

RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.2 SSN Changes end

-- 26-MAY-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-349, starts
FUNCTION fn_get_rollover_sourceref_no
		(p_rollover_type	IN	VARCHAR2
		,p_split_no		IN	NUMBER
		,p_contract_ref_no	IN	VARCHAR2
		)
RETURN VARCHAR2;
-- 26-MAY-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-349, ends

-- 10-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR1 Retro Till no#488 SFR No#107, Settlement Default Changes. Starts
FUNCTION FN_DEFAULT_SETTLEMENTS
			     (p_dd_ref_no 	oltbs_contract.contract_ref_no%type,
			     p_tr_ref_no 	oltbs_contract.contract_ref_no%type,
			     p_con_ccy	 	varchar2,
			     p_drawdown_no	number,
			     p_dd_esn		oltbs_contract_event_log.event_seq_no%type
			     )
RETURN BOOLEAN;
-- 10-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR1 Retro Till no#488 SFR No#107, Settlement Default Changes. Ends


--FLEXCUBE V.CL Release 7.2 Changes for Cascade Particpation from Y -> N changes Start
FUNCTION  fn_cascade_conversion_reqd
		(p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
		p_value_date		IN	oltbs_contract_master.value_date%TYPE,
		p_swing_line		IN	oltbs_contract_master.swing_line%TYPE,
		p_ancillary		IN	oltbs_contract_master.ancillary%TYPE,  	-- 03-Sep-2007 FCC V.CL RELEASE 7.3 Ancillary and Swing Line Changes
		p_cascade_part		OUT	oltbs_contract_master.cascade_participation%TYPE,
		p_part_rebuild_req	OUT	VARCHAR2,
		p_ovd_code		OUT	VARCHAR2 )
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.2 Changes for Cascade Particpation from Y -> N Changes end

--FLEXCUBE V.CL Release 7.2 Changes related to event sequencing start

FUNCTION fn_pop_contract_log
				(
					p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
					p_value_date		IN	DATE,
					p_err_code		OUT	VARCHAR2,
					p_err_param		OUT	VARCHAR2
				)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.2 Changes related to event sequencing ends
--20-feb-2007 FLEXCUBE V.CL Release 7.2 LC FEE issuer changes Starts
FUNCTION fn_recalc_lcissuance_fee_ratio
			(
			p_contract_ref_no 	IN	VARCHAR2,
			p_error_code		OUT	VARCHAR2,
			p_error_param		OUT	VARCHAR2
			)

RETURN BOOLEAN;
--20-feb-2007 FLEXCUBE V.CL Release 7.2 LC FEE issuer changes Ends

--14-MAR-2007 FLEXCUBE V.CL Release 7.2 ITR1 SFR NO 86 , Amarnath changes starts-

 FUNCTION fn_get_maxliq_date
                      ( p_contractref      IN       oltbs_contract.contract_ref_no%Type,
                        p_component    	 IN       oltbs_amount_due_cs.component%Type,
                        p_liqdate     	 OUT      DATE,
                        pErrorCode  	 IN OUT   VARCHAR2,
			pErrorParams   IN OUT   VARCHAR2
                      )
RETURN BOOLEAN ;
--14-MAR-2007 FLEXCUBE V.CL Release 7.2 ITR1 SFR NO 86 , Amarnath changes Ends-

--06-JUN-2007 CITILS, LC Balance Movement starts
Function fn_Lc_Princhng_Processing
			(
			p_contract_ref_no	VARCHAR2 ,
			p_serial_no		NUMBER,
			p_error_code		IN OUT 	VARCHAR2,
			p_error_parameter	IN OUT 	VARCHAR2
			)
RETURN BOOLEAN;

Function fn_Lc_VAMI_Processing
			(p_princhg_detail_record	IN lbtbs_lcdd_princhg_detail%rowtype
			,p_error_code		IN OUT 	VARCHAR2
			,p_error_parameter	IN OUT 	VARCHAR2
			)
RETURN BOOLEAN;

Function fn_Lc_PMT_Processing
			(
			p_princhg_record	IN lbtbs_lcdd_princhg_detail%rowtype
			,p_error_code		IN OUT 	VARCHAR2
			,p_error_parameter	IN OUT 	VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_vamiupload_subsystem_pickup(p_contract_ref_no IN oltbs_contract.CONTRACT_REF_NO%TYPE,
						p_value_date	IN 	DATE,
						p_amount		IN	oltbs_contract_master.amount%type,
						p_vami_amount	IN	lbtbs_tranche_vdbal_detail.closing_balance%type,
						p_currency	IN	oltbs_contract_master.currency%type,
						p_vamb_esn		IN oltbs_contract_amend_due.event_seq_no%type,
						p_module_code		IN 	oltbs_contract_master.module%type,
						p_counterparty	IN 	oltbs_contract_master.counterparty%type,
                               			p_error_code      OUT VARCHAR2,
                               			p_error_params    OUT VARCHAR2)
RETURN BOOLEAN;

Function fn_validate_vdbal_master
			(P_contract_ref_no IN VARCHAR2,
			p_serial_no IN NUMBER,
			p_error_code  OUT VARCHAR2,
			p_error_param OUT VARCHAR2
			)
RETURN BOOLEAN;

-- 10-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR1 Retro Till no#808 SFR No#107 Starts
FUNCTION Fn_insert_part_ratio
				  (
			      p_contract_ref_no oltbs_contract.contract_ref_no%type,
			      p_component	  	lftbs_contract_fee.component%type,
			      p_module		  	varchar2,
			      p_product_type    varchar2,
			      p_latest_version 	number,
			      p_esn		  		number,
			      --06-MAR-2009 FCC V.CL Release 7.5 EURCITIPLC RETRO CITILS10G00149 Changes Starts
			      --p_limit_date	  	date
			      p_value_date	  		date
			      --06-MAR-2009 FCC V.CL Release 7.5 EURCITIPLC RETRO CITILS10G00149 Changes Ends
			      )
RETURN BOOLEAN;
-- 10-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR1 Retro Till no#808 SFR No#107 Ends

--PerfTuningChanges "CITILS, LC Balance   Movement" IT-BugFix - 12-JUN-2007
/*Function fn_alert_job(P_branch IN oltm_branch.branch_code%type)
RETURN BOOLEAN;*/
--PerfTuningChanges "CITILS, LC Balance   Movement" IT-BugFix - 12-JUN-2007
--06-JUN-2007 CITILS, LC Balance Movement ends

--perftuningchanges08Jun07 start

TYPE ty_part_comp_ratio IS TABLE OF lbtbs_participant_ratio.component_ratio%TYPE
INDEX BY VARCHAR2(40);

g_part_compratio ty_part_comp_ratio;

FUNCTION Fn_get_compratio_tuned
	(p_data              IN    component_ratio_rec,
	 p_value_date        IN    DATE DEFAULT NULL
	)
RETURN BOOLEAN;
FUNCTION Fn_get_indexvalue
	(p_index             IN   VARCHAR2,
	 p_value            OUT   lbtbs_participant_ratio.component_ratio%TYPE
	)
RETURN BOOLEAN;
--perftuningchanges08Jun07 end

--perftuningchanges08MAY07 start
Function Fn_Update_Component_Ratio
(
P_Borr_ref_no   in lbtbs_participant_ratio.contract_ref_no%type,
P_date  in lbtbs_participant_ratio.value_date%type,
P_Err_code in out Varchar2,
P_Err_param in out Varchar2
)
Return Boolean;
--perftuningchanges08MAY07 end
--27-JUN-2007 FCC V.CL Release 7.3 tuning changes Starts
FUNCTION fn_get_component_ratio_ssn (
	p_data              IN    component_ratio_rec,
	p_component_data    OUT   tb_component_ratio,
	p_flush                   CHAR,
	p_value_date	IN	DATE DEFAULT NULL
	)
      RETURN BOOLEAN;
--27-JUN-2007 FCC V.CL Release 7.3 tuning changes Ends
--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-584
FUNCTION fn_ratio_precision
	(	p_contract_ref_no	IN VARCHAR2
	,	p_ratio			IN NUMBER
	)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-584

--17-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#1, CITILS-US#891 - Participants should have mnemonics for all the XXCURRENCIES. Starts
FUNCTION Fn_chk_ccy_mnemonic
				  (
			      p_contract_ref_no   	oltbs_contract.contract_ref_no%type,
			      p_version_no			oltbs_contract.latest_version_no%type
			      )
RETURN BOOLEAN;
--17-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#1, CITILS-US#891 - Participants should have mnemonics for all the XXCURRENCIES. Ends


-- 27-SEP-2007 FCC V.CL Release 7.3 Fee Schedules - Additions and Revisions, starts
FUNCTION fn_get_last_liqddt
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_component			IN		oltbs_contract_schedules.component%TYPE,
	p_effective_date		OUT		DATE,
	p_error_code			IN OUT		VARCHAR2,
	p_error_parameter		IN OUT		VARCHAR2
	)
RETURN BOOLEAN;
-- 27-SEP-2007 FCC V.CL Release 7.3 Fee Schedules - Additions and Revisions, ends

--FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-300 sweta, New function to check unauthorised contracts during online auth/delete >>
FUNCTION fn_chk_contract_unauth
			(
			 p_contract_ref_no	IN	VARCHAR2,
			 p_contract_type	IN	VARCHAR2
			)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-300 sweta, New function to check unauthorised contracts during online auth/delete <<
--FLEXCUBE V.CL Release 7.3 ITR1 SFR#975, Retro Changes CITIUS-LS-975, 07-dec-2007 start
--CITIUS-LS#975 Starts
FUNCTION Fn_borr_ssi_pickup
				  (
			      	p_contract_ref_no   	oltbs_contract.contract_ref_no%type,
			      	p_version_no			oltbs_contract.latest_version_no%type,
			      	p_latest_esn			oltbs_contract.latest_event_seq_no%type,
			      	p_err_code 		IN OUT  varchar2,
					p_err_params	IN OUT  varchar2

			      )
RETURN BOOLEAN;
FUNCTION Fn_prop_borr_settle_DD
				  (
			      	p_contract_ref_no   	oltbs_contract.contract_ref_no%type,
			      	p_version_no			oltbs_contract.latest_version_no%type,
			      	p_err_code 		IN OUT  varchar2,
					p_err_params	IN OUT  varchar2
			      )
RETURN BOOLEAN;
--CITIUS-LS#975 Ends
--FLEXCUBE V.CL Release 7.3 ITR1 SFR#975, Retro Changes CITIUS-LS-975, 07-dec-2007 end
--03-MAR-2009 FCC V.CL Release 7.5 EURCITIPLC RETRO CITILS10G00185 Changes Starts
--CITILS10G00185 starts
type comp_ratio_rec IS RECORD
	(contract_ref_no	lbtbs_participant_ratio.contract_ref_no%type
	,event_seq_no		lbtbs_participant_ratio.event_seq_no%type
	,customer_no		lbtbs_participant_ratio.customer_no%type
	,component_type		lbtbs_participant_ratio.component_type%type
	,component		lbtbs_participant_ratio.component%type
	,component_ratio	lbtbs_participant_ratio.component_ratio%type
	);
TYPE comp_ratio_type IS TABLE OF comp_ratio_rec INDEX BY BINARY_INTEGER;
PROCEDURE pr_get_part_compratio
	(p_data			IN    component_ratio_rec
	,p_part_compratio	IN OUT comp_ratio_type
	,p_value_date		IN    DATE DEFAULT NULL
	,p_participant		IN VARCHAR2
	);
FUNCTION fn_update_participant_ssi
	(p_contract_ref_no	IN VARCHAR2
	,p_value_date		IN DATE
	,p_err_code 		IN OUT  VARCHAR2
	,p_err_params		IN OUT  VARCHAR2
	)
RETURN BOOLEAN;
--CITILS10G00185 ends
--03-MAR-2009 FCC V.CL Release 7.5 EURCITIPLC RETRO CITILS10G00185 Changes Ends
--FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-<1002> starts--
FUNCTION fn_get_available_bal
		( p_contract_ref_no  varchar2,
		  p_value_date   date
		)
RETURN NUMBER;
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS Till#807 Start By Swapnasish
--14-Jun-2007 Madhu CITIUS-LS Till#807, Tuning Changes >>
TYPE rec_contract IS TABLE OF OLTB_CONTRACT.contract_ref_no%TYPE INDEX BY OLTB_CONTRACT.contract_ref_no%type;
tbl_contract	rec_contract;
--Bug#36008580 Changes Start
tbl_contract_type rec_contract;  
TYPE rec_sighting_funds_appl IS TABLE OF BOOLEAN INDEX BY OLTB_CONTRACT.contract_ref_no%type; 
tbl_sighting_funds_appl	rec_sighting_funds_appl;
TYPE Tblprodcodeinfo IS TABLE OF oltms_product%ROWTYPE INDEX BY oltms_product.Product_Code%TYPE;
rec_prod_info  Tblprodcodeinfo;
TYPE Tbl_borr_part_prod IS TABLE OF Oltms_Product_Master_Ld.Product%TYPE INDEX BY Oltms_Product_Master_Ld.Participant_Product%TYPE;
rec_borr_part_prod  Tbl_borr_part_prod;
--Bug#36008580 Changes End
g_contract_ref_no	oltbs_contract.contract_ref_no%TYPE := NULL;
--14-Jun-2007 Madhu CITIUS-LS Till#807, Tuning Changes <<
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS Till#807 End By Swapnasish
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1234 Start By Swapnasish
--29-APR-2008 CITIUS-LS#1234, SSI Mnemonic Validations Starts
TYPE	t_wrong_mnemonic is record (
									customer_no		oltbs_contract.counterparty%type,
									ccy				lbtb_part_settle_curr_det.currency%type,
									ssi_mnemonic	lbtb_part_settle_curr_det.ssi_mnemonic%type,
									error_code		ertbs_msgs.err_code%type
								   );

TYPE	tb_wrong_mnemonic IS TABLE OF t_wrong_mnemonic INDEX BY BINARY_INTEGER;

FUNCTION fn_val_ssi_menonic_branch
(
	p_contract_ref_no	varchar2,
	p_val_for			char,
	p_wrong_mnemonic	out tb_wrong_mnemonic,
	val_pop				char default 'V'
)
RETURN BOOLEAN;
--29-APR-2008 CITIUS-LS#1234, SSI Mnemonic Validations Ends

--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1234 End By Swapnasish
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS Till#1336 Start By Swapnasish
--CITIUS-LS Till#1336 starts

FUNCTION fn_get_part_record
(
	p_contract_ref_no		IN	VARCHAR2,
	p_participant			IN	VARCHAR2,
	p_event_seq_no			IN 	NUMBER,
	p_value_date			IN 	DATE,
	p_old_new				IN	VARCHAR2,--'O'-> Old Ratio /'N' -> New Ratio
	p_part_row				OUT lbtbs_contract_participant%rowtype
)
RETURN BOOLEAN;

FUNCTION fn_dual_auth_pram
(
	p_contract_ref_no	IN		VARCHAR2,
	p_pram_flag			IN 		VARCHAR2,--Y-> Detailed,N-> Consolidated
	p_err_code			IN 	OUT	VARCHAR2,
	p_err_param			IN 	OUT	VARCHAR2
)
RETURN BOOLEAN;
--CITIUS-LS Till#1336 ends
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS Till#1336 End By Swapnasish
--FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-<1002> ends--
--FLEXCUBE V.CL Release 7.4 RT#19 changes starts
FUNCTION fn_sgen_validation
	(p_borr_ref_no		IN	oltbs_contract.contract_ref_no%type,
	p_action_code		IN	varchar2,
	p_roll_inst_status 	IN   	oltbs_contract_rollover.roll_inst_status%type,
	p_module		IN	oltbs_contract.module_code%type,
	p_date			IN OUT	oltbs_contract_master.maturity_date%type,
	p_principal_liqd 	IN	oltbs_contract_preference.principal_liquidation%type,
	p_err_code		IN OUT	varchar2,
	p_err_param		IN OUT	varchar2
	)

RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.4 RT#19 changes ends
--01-JUN-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag06,FPML Messaging for Markit Integration changes start here
--FUNCTION fn_trache_mei_change --09-JUN-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag06,FPML Messaging for Markit Integration changes commented
--FUNCTION fn_tranche_mei_change  --09-JUN-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag06,FPML Messaging for Markit Integration changes
--PROCEDURE pr_pop_tranche_mei_change --15-JUN-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag06,FPML Messaging for Markit Integration changes --30-JUN-2011 Flexcube V.CL Release 7.9 FS Vol2 Tag 06 ITR1#52 changes commented
PROCEDURE pr_prop_tranche_mei_change --30-JUN-2011 Flexcube V.CL Release 7.9 FS Vol2 Tag 06 ITR1#52, changes
		(
		p_branch_code		IN VARCHAR2
		);
--01-JUN-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag06,FPML Messaging for Markit Integration changes end here


-- 05-SEP-2008 FLEXCUBE V.CL Release 7.4, Retro of CITIUS-LS Till#1338 PF related changes(PRAM),By Saurabh START
PROCEDURE pr_log_time
	(
	  p_function_id 	IN VARCHAR2
	, p_reF_no		IN VARCHAR2
	, p_esn		IN NUMBER
	, p_mode		IN VARCHAR2 --Online/Batch
	, p_action		IN VARCHAR2 --SAVE/DELETE
	, p_status		IN VARCHAR2 --start/end
	, p_rowid		IN OUT rowid
	);

FUNCTION fn_get_pram_comp_ratio
	(
	p_data              IN    component_ratio_rec,
	p_component_data    OUT   tb_component_ratio,
	p_flush             CHAR,
	p_value_date        IN  DATE DEFAULT NULL,
	p_table_type	    IN	VARCHAR2 DEFAULT NULL --11-NOV-2008 FCC V.CL Release 7.4 Pram Job changes magi
	)
RETURN BOOLEAN;
-- 05-SEP-2008 FLEXCUBE V.CL Release 7.4, Retro of CITIUS-LS Till#1338 PF related changes(PRAM),By Saurabh END

--28-NOV-2008 FLEXCUBE V.CL Release 7.4, BAU-LOT4 Sighting Funds Changes, starts
--29-APR-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes Arthy starts
FUNCTION fn_populate_fronting_detail(p_contract_ref_no	IN oltbs_contract_master.contract_ref_no%TYPE,
				     p_event_code	IN oltbs_contract_event_log.event_code%TYPE,
				     p_esn		IN oltbs_contract_event_log.event_seq_no%TYPE,
				     p_err_code		OUT VARCHAR2,
				     p_parent_ref_no    IN oltbs_contract.contract_Ref_no%TYPE DEFAULT NULL --FLEXCUBE V.CL Release 7.6 Sighting Fund Changes by Peddi
				    )
RETURN BOOLEAN;
--29-APR-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes Arthy ends
--28-NOV-2008 FLEXCUBE V.CL Release 7.4, BAU-LOT4 Sighting Funds Changes, ends

--FLEXCUBE V.CL Release 7.6 Sighting Fund Changes, Gowri, 28-Apr-2009 starts
FUNCTION fn_sighting_funds_applicable
	(p_contract_ref_no	IN VARCHAR2)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.6 Sighting Fund Changes, Gowri, 28-Apr-2009 ends
--30-MAR-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes START, SHASHANK
FUNCTION fn_check_fronting_type(p_contract_ref_no IN oltbs_contract_master.contract_ref_no % TYPE)
RETURN BOOLEAN;
-- 30-MAR-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes end, shashank

--CITIUS-LS#SRT5764-CITIUS-LS#5704 Starts
FUNCTION fn_val_ssi_menonic_branch_pram
(
	p_contract_ref_no	varchar2,
	p_val_for			char,
	p_wrong_mnemonic	out tb_wrong_mnemonic,
	val_pop				char default 'V'
)
RETURN BOOLEAN;
--CITIUS-LS#SRT5764-CITIUS-LS#5704 Ends

--02-JUN-2010 FLEXCUBE V.CL Release 7.7 Changes, RAPID and STP Changes start here
FUNCTION fn_pop_self_part_comm_link
(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
	, p_err_code		IN OUT	VARCHAR2
	, p_err_param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--02-JUN-2010 FLEXCUBE V.CL Release 7.7 Changes, RAPID and STP Changes end here
--09-JUN-2010 Flexcube V.CL 7.7 FS Tag 05 Third Party Assignment Changes starts
FUNCTION fn_get_prev_esn_ratio
(
	 p_contract_ref_no	IN 		oltbs_contract.contract_ref_no%TYPE
	,p_transfer_from	IN 		lbtbs_participant_transfer.transfer_from%TYPE
	,p_value_date		IN 		DATE
	,p_event_seq_no	IN 		oltbs_contract_master.event_seq_no%TYPE
	,p_sell_asset_ratio	IN OUT	lbtbs_contract_participant.asset_ratio%TYPE
	,p_err_code		IN OUT	VARCHAR2
	,p_err_param		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--09-JUN-2010 Flexcube V.CL 7.7 FS Tag 05 Third Party Assignment Changes ends
--27-JUL-2010 FLEXCUBE V.CL Release 7.7 Vol2 FS Tag07 floor and ceiling changes - Start
FUNCTION fn_get_floor_ceiling_rate
	(
	p_branch_code		IN		oltbs_contract.branch%TYPE
	,p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE
	,p_product_code		IN		lbtms_tranche_flrclg_rate.product_code%TYPE
	,p_component		IN		lbtms_tranche_flrclg_rate.component%TYPE
	,p_ccy			IN		lbtms_tranche_flrclg_rate.ccy_code%TYPE
	,p_eff_date			IN		lbtms_tranche_flrclg_rate.eff_date%TYPE
	,p_rate_type		IN		VARCHAR2 --A - All in Rate,B - Base Rate,M - Margin rate
	,p_rate			IN OUT	lbtms_tranche_flrclg_rate.rate_floor%TYPE
	,p_error_code		IN OUT	VARCHAR2
	,p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
FUNCTION fn_prop_floor_ceiling_rate
	(
	p_processing_branch  	IN    	oltbs_contract.branch%TYPE, --18-AUG-2011 Flexcube V.CL Release 7.10, CITIUS Retro,TILL#8328 changes
	p_tranche_ref_no	IN	oltbs_contract.contract_ref_no%TYPE
	,p_process_date		IN	DATE
	,p_err_code		IN OUT	VARCHAR2
	,p_err_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
FUNCTION fn_floor_ceiling_margin_update
	(
	p_branch_code		IN		oltbs_contract.branch%TYPE
	,p_contract_ref_no	IN 		oltbs_contract.contract_ref_no%TYPE
	,p_error_code		IN OUT	VARCHAR2
	,p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--02-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR1 SFR#14 - Start
FUNCTION fn_check_flrclg_rate
	(
	p_dd_ref_no		IN		oltbs_contract_master.contract_ref_no%TYPE
	,p_err_code		IN OUT	VARCHAR2
	,p_err_param	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--02-SEP-2010 FLEXCUBE V.CL Release 7.7 ITR1 SFR#14 - End
--27-JUL-2010 FLEXCUBE V.CL Release 7.7 Vol2 FS Tag07 floor and ceiling changes - End

--10-JUL-2010 FLEXCUBE V.CL Release 7.7 VOL2 FS Tag 08 Collateral Monitoring Changes start here
FUNCTION fn_process_event
			(
			pContractrefno		IN		oltbs_contract.contract_ref_no%TYPE
			, pEsn			IN		oltbs_contract.latest_event_seq_no%TYPE
			, pEffdate		IN		oltbs_contract.book_date%TYPE
			, pEvent			IN		oltbs_contract.curr_event_code%TYPE
			, pErrorCode		IN OUT	VARCHAR2
			, pErrorParams		IN OUT	VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_auth_event
	(
	pContractrefno		IN		oltbs_contract.contract_ref_no%TYPE
	, pEsn			IN		oltbs_contract.latest_event_seq_no%TYPE
	, pEvent			IN		oltbs_contract.curr_event_code%TYPE
	, pErrorCode		IN OUT	VARCHAR2
	, pErrorParams		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--10-JUL-2010 FLEXCUBE V.CL Release 7.7 VOL2 FS Tag 08 Collateral Monitoring Changes end here

--03-JAN-2011 Flexcube V.CL Release 7.8, SFR#14, CITIUS Retro Till#7427 start
FUNCTION fn_del_zero_investor
(p_borr_ref_no IN VARCHAR2,
 p_esn         IN NUMBER,
 p_err_code   OUT VARCHAR2,
 p_err_param  OUT VARCHAR2
)RETURN BOOLEAN;
--03-JAN-2011 Flexcube V.CL Release 7.8, SFR#14, CITIUS Retro Till#7427 end
--09-JUN-2011 Flexcube V.CL Release 7.9, CITIUS Retro, TILL#7518, start
--CITIUS-LS#7510 Starts
FUNCTION fn_update_comp_ratio
(
	p_contract_ref_no	in	varchar2	
)
RETURN BOOLEAN;
--CITIUS-LS#7510 Ends
--09-JUN-2011 Flexcube V.CL Release 7.9, CITIUS Retro, TILL#7518, end
--07-JUN-2011 FLEXCUBE V.CL Release 7.9 VOL2 FS Tag 8 changes  starts
FUNCTION fn_get_coll_mnemonic
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
 	p_mnemonic_type		IN	VARCHAR2
	)
RETURN VARCHAR2;

FUNCTION fn_get_coll_contract
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
 	p_contract_type		IN	VARCHAR2 --S - Settlement/O - Online
	)
RETURN VARCHAR2;

FUNCTION fn_coll_delete
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_error_code      	IN OUT	VARCHAR2,
	p_error_parameter 	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_coll_authorise
	(
	pContractRefNo	IN		oltbs_contract.contract_ref_no%TYPE,
	p_error_code	IN	OUT	VARCHAR2,
	p_error_parameter	IN	OUT	VARCHAR2
	)
RETURN BOOLEAN;
--23-JUN-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag06,FPML Messaging for Markit Integration changes start here
FUNCTION fn_check_cusip_mei_msgs
		(
		p_borrower_ref_no	IN		oltbs_contract.contract_ref_no%TYPE
		,p_error_code		IN	OUT	VARCHAR2
		,p_error_param		IN	OUT	VARCHAR2
		)
RETURN BOOLEAN;
--23-JUN-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag06,FPML Messaging for Markit Integration changes ends here

FUNCTION fn_get_coll_amount
	(
	p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
	p_participant		IN		oltms_customer.customer_no%TYPE,
	p_value_date		IN		DATE
	)
RETURN NUMBER;
--07-JUN-2011 FLEXCUBE V.CL Release 7.9 VOL2 FS Tag 8 changes  ends
--10-NOV-2011 Flexcube V.CL Release 7.10 FS Tag 05 Changes starts
FUNCTION fn_get_flrcl_to_base_rate_flag
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
	, p_flrcl_to_base_rate		IN OUT		VARCHAR2
	, p_error_code			IN OUT		VARCHAR2
	, p_error_param			IN OUT		VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_prop_floor_ceiling_drawdown
	(
	p_tranche_ref_no	IN	lftbs_contract_interest_detail.contract_ref_no%TYPE
	,p_drawdown_ref_no	IN	lftbs_contract_interest_detail.contract_ref_no%TYPE
	,p_component		IN	lftbs_contract_interest_detail.component%TYPE
	,p_value_date		IN 	DATE
	,p_process_name		IN      VARCHAR2
	,p_err_code		IN OUT	VARCHAR2
	,p_err_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_del_VAMI_beforeFirstAuth
	(
	p_Contract_ref_no          	IN oltbs_contract.CONTRACT_REF_NO%TYPE
	,p_Version_No              	IN oltbs_contract.LATEST_VERSION_NO%TYPE
	,p_Event_Seq_No		IN oltbs_contract.LATEST_EVENT_SEQ_NO%TYPE
	,p_Error_Code              	IN OUT VARCHAR2
	)
RETURN BOOLEAN;
--10-NOV-2011 Flexcube V.CL Release 7.10 FS Tag 05 Changes ends
--01-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#11, Intellect Interface - Schedules starts
FUNCTION fn_get_comp_type
				(
				p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
				P_Component		IN	lftms_product_charge.component%TYPE
				)
RETURN VARCHAR2;
--01-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol#1 Tag#11, Intellect Interface - Schedules ends
--13-MAR-2014	Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18366 change start
FUNCTION fn_updatelc_sublimit(
				p_contract_ref_no	IN 	oltbs_contract_master.CONTRACT_REF_NO%TYPE,
				p_vami_value_dt		IN 	oltbs_contract_master.VALUE_DATE%TYPE,
				p_error_code		IN OUT	VARCHAR2,
				p_error_param		IN OUT	VARCHAR2
			     )
RETURN BOOLEAN;

--13-MAR-2014	Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18366 change end
--11-FEB-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag09 CITIBLR#35373 changes start
FUNCTION  fn_purge_auto_rate_his
                (
                  p_contract_ref_no IN    oltbs_contract.contract_ref_no%TYPE,
				  p_error_code		IN OUT	VARCHAR2,
				  p_error_param		IN OUT	VARCHAR2
                )
RETURN BOOLEAN;
--11-FEB-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag09 CITIBLR#35373 changes end
--21-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag03 changes starts
FUNCTION	fn_get_loan_param_value	(
					   p_param_name	IN oltbs_loan_param_detail.param_name%TYPE
					)
RETURN VARCHAR2;

--21-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag03 changes ends
--01-APR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag04 changes starts
FUNCTION fn_suppress_check(
			   p_eventcode	IN	oltms_product_event_advice.event_code%type,
			   p_pcode	IN 	oltms_product_event_advice.product_code%type,
		           p_mesg  	IN 	oltms_product_event_advice.msg_type%type,
		           p_cont_ref 	IN 	oltbs_gtemp_event_advice.contract_ref_no%TYPE--16-APR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag04 IUT#134 Changes
			  ) 
RETURN VARCHAR2;
--01-APR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag04 changes starts
--01-APR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag03 changes starts
FUNCTION fn_cusip_update
			(
			p_crn		IN	VARCHAR2,
			p_old_cusip	IN	VARCHAR2,
			p_new_cusip	IN	VARCHAR2,
			p_ext_value	IN	NUMBER,
			p_old_ext_cusip	IN	VARCHAR2,
			p_new_ext_cusip	IN	VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_upd_inactive_flag (
                     	        p_ref_no       	IN  oltbs_contract.contract_ref_no%TYPE                    							
	            	       ,p_error_code    IN  OUT VARCHAR2  
                               ,p_error_param   IN  OUT VARCHAR2
							  )
RETURN BOOLEAN;  

FUNCTION fn_check_position (
		            p_contract_refno	IN tltbs_contract_master.contract_ref_no%TYPE
			   ,p_cusip_no		IN tltbs_contract_master.cusip_no%TYPE
			   ,p_value_date 	IN Date
			   ,p_position_identifier IN lbtbs_contract_participant.participant%type --14-APR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag03 Changes
			   --26-MAY-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag03 ITR#13 Changes start
			   ,p_error_code IN OUT varchar2
			   ,p_error_param IN OUT VARCHAR2
			   --26-MAY-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag03 ITR#13 Changes end
							)
RETURN BOOLEAN;	

FUNCTION  fn_update_act_contract(
         			 p_ref_no  	 IN  oltbs_contract.contract_ref_no%TYPE
          			,p_module        IN  oltbs_contract.module_code%TYPE
          			,p_error_code    IN  OUT VARCHAR2  
          			,p_error_param   IN  OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_update_liq_contract(
         			p_ref_no   	IN  oltbs_contract.contract_ref_no%TYPE
          			,p_module   	IN  oltbs_contract.module_code%TYPE
          			,p_error_code   IN  OUT VARCHAR2  
          			,p_error_param  IN  OUT VARCHAR2)
RETURN BOOLEAN;
--01-APR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag03 changes ends

--28-AUG-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07 Changes starts
FUNCTION fn_participant_share_reqd  (
									  p_borrower_ref_no IN oltbs_contract.contract_ref_no%TYPE
									 )
RETURN VARCHAR2;

FUNCTION fn_interest_due_exists
							(
							p_contract_ref_no  oltbs_amount_due_cs.contract_ref_no%type
							)
RETURN VARCHAR2;
--28-AUG-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07 Changes ends
--28-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag04 IUT#05 changes start
FUNCTION fn_allinrate_check(
			  p_reference_no		IN	   VARCHAR2,
			  P_MODULE  			IN 	   oltbs_contract.MODULE_CODE%TYPE,
			  P_COMPONENT			IN	   VARCHAR2,
			  P_FROM_DATE			IN	   DATE,
			  P_TO_DATE			IN	   DATE,
			  P_RATE			IN	   VARCHAR2,
			  P_ERR_CODE			IN OUT	   VARCHAR2)
RETURN VARCHAR2;
--28-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag04 IUT#05 changes end
--05-NOV-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag04 IUT#198 changes start
FUNCTION fn_negative_base_rate_check(
				   p_tranche_ref_no 	IN 	lftms_participant_margin_rate.contract_ref_no%TYPE,
				   p_prod_code		IN	lftms_product_iccf_margin.product_code%TYPE,
				   p_component		IN	lftms_product_iccf_margin.component%TYPE
				   )
RETURN NUMBER;
--05-NOV-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag04 IUT#198 changes end
--11-NOV-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol2 Tag07 IUT#243 Trading Flat changes start
FUNCTION fn_get_DD_max_paid_dt(p_tranche_ref_no IN oltbs_contract.contract_ref_no%TYPE, 
								p_value_dt IN DATE,
								p_dd_ref_no OUT oltbs_contract.contract_ref_no%TYPE,
								p_max_paid_dt OUT DATE,
								p_err_code	IN OUT	VARCHAR2,
								p_err_params IN OUT	VARCHAR2
								)
RETURN BOOLEAN;
--11-NOV-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol2 Tag07 IUT#243 Trading Flat changes end
  -- LS SOFR changes starts
  FUNCTION fn_chk_rfr_contract( p_ref_no      IN  oltb_contract.Contract_Ref_No%Type, 
                p_component   IN  lftbs_contract_interest_master.component%TYPE DEFAULT NULL
              )
RETURN VARCHAR2 ;   
-- LS SOFR changes ends   
  --OBCL_14.4_SLT_Amendment_Fee Changes starts
FUNCTION fn_get_contract_auth_stat(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE)
    RETURN VARCHAR2;
  --OBCL_14.4_SLT_Amendment_Fee Changes ends
  
  --OBCL_14.5_LS_Swingline_Enhancement_Changes starts
FUNCTION fn_validate_swingline_limit
        (p_tranche_ref_no      IN varchar2,
         p_value_date        IN date,
         P_amount          IN NUMBER,
		 p_ccy					 IN VARCHAR2,--OBCL_14.5_LS_Swingline_Enhancement_Changes
	     p_dd_ref_no				 IN VARCHAR2,--OBCL_14.5_LS_Swingline_Enhancement_Changes 
         p_swingline         IN VARCHAR2,
         p_error_code        IN OUT varchar2,
         p_error_params       IN OUT varchar2
         )
RETURN BOOLEAN;
FUNCTION fn_validate_swingline_contract
        (p_contract_ref_no       IN varchar2,
         p_error_code        IN OUT varchar2,
         p_error_params       IN OUT varchar2
         )
RETURN BOOLEAN;
--OBCL_14.5_LS_Swingline_Enhancement_Changes ends

--OBCL_RABO_Bug#36292647 starts
  FUNCTION Fn_Calc_Enddt(p_Start_Dt        IN Oltbs_Contract_Schedules.Start_Date%TYPE,
                         p_No_Of_Schedules IN Oltbs_Contract_Schedules.No_Of_Schedules%TYPE,
                         p_Frequency_Unit  IN Oltbs_Contract_Schedules.Frequency_Unit%TYPE,
                         p_Frequency       IN Oltbs_Contract_Schedules.Frequency%TYPE)
    RETURN DATE ; 
--OBCL_RABO_Bug#36292647 ends

--14.5_NONCASCADE CHANGES
FUNCTION fn_get_cascade_value(p_contract_ref_no IN VARCHAR2) RETURN VARCHAR2;

FUNCTION fn_check_if_err_captured RETURN BOOLEAN; --Bug#34250746

FUNCTION Fn_Spo_Wrapper_Margin_Updation(p_Contract_Ref_No IN VARCHAR2) RETURN BOOLEAN;	--Bug#34403937:Added
--OBCL_RABO_Bug#36505530 starts
 FUNCTION Fn_UPDATE_TRANSFER_AMT(p_Contract_Ref_No IN VARCHAR2,
                                 p_value_date IN DATE)
 RETURN BOOLEAN;
--OBCL_RABO_Bug#36505530 ends
--OBCL_14.3_SOFR_Participant_engine_call start
TYPE  p1_temp_part_ref IS RECORD (contract_ref_no  oltbs_contract.contract_ref_no%TYPE);
TYPE p2_temp_part_ref IS TABLE OF p1_temp_part_ref INDEX BY BINARY_INTEGER;
g_temp_part_ref p2_temp_part_ref;
--OBCL_14.3_SOFR_Participant_engine_call end
  --Bug#36575322  Changes Starts
  FUNCTION Fn_Authorise_function_check(Pcontractrefno IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                      Perrorcode     IN OUT VARCHAR2,
                                      Perrorparams   IN OUT VARCHAR2
                                      )
    RETURN BOOLEAN;
  --Bug#36575322  Changes Ends	
end lbpks_services;
/
CREATE or replace SYNONYM lbpkss_services FOR lbpks_services
/