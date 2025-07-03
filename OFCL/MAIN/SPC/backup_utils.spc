CREATE OR REPLACE PACKAGE backup_utils AS
/*----------------------------------------------------------------------------------------
**
** File Name	: backup_utils.SPC
**
** Module	: BUSINESS OBJECTS
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------
*/
/*
-- change history
-- 12-feb-2003 fcc4.2 apr 2003 retro citiplc PLC4006001 new package for bo reports

--31-Aug-2009 SLT BO Report related changes
--1. New function call fn_get_facility_name has been added
--25-Jan-2010 PBG CONSOLIDATION,SLT BO Reports Related Changes.added fn_get_counterparty,
		fn_get_trade_ccy,fn_get_firmacc,fn_get_orignominal_amt,fn_get_condi,fn_get_commitment_ref,
		fn_get_exrate,fn_get_portfolio_age
---01-FEB-2010 PBG CONSOLIDATION,SLT BO Reports Related Changes,Existing function was modified,and new function fn_get_tranche_ref_no and Fn_get_funding_amt were added
----08-FEB-2010 PBG CONSOLIDATION,SLT BO Reports Related Changes,Existing function was modified,and new function were added
---11-FEB-2010 PBG CONSOLIDATION,SLT BO Reports Related Changes,new function added
--15-FEB-2010 PBG CONSOLIDATION,SLT BO Reports Related Changes,new functions added
-----16-FEB-2010 PBG CONSOLIDATION,SLT BO Reports Related Changes,new function added
18-FEB-2010 PBG CONSOLIDATION,SLT BO Reports Related Changes,fn_ol_get_part_amt modified,new function added
19-FEB-2010 PBG CONSOLIDATION,SLT BO Reports Related Changes,new function added
24-Feb-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7138 ,SLT BO  Reports Tuning  changes
25-FEB-2010 PBG CONSOLIDATION,SLT BO Reports Related Changes,new function added
02-MAR-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7171 SLT BO report related changes
15-MAR-2010 PBG CONSOLIDATION,SLT BO Reports(Net income report) related changes
17-MAR-2010 CITIUS-LS#7191 ,BO report related changes
16-AUG-2010 FLEXCUBE V.CL Release 7.7 Retro, CITIUS Till#7223 SLT BO Report related changes - LQT PNL upload changes for SLT PNL report and DCF Pay recv changes for position summary report
16-AUG-2010 FLEXCUBE V.CL Release 7.7 Retro, CITIUS Till#7223 SLT BO Report related changes  
	New functions fn_get_GFRN added,fn_get_part_nominal_amt,fn_get_disc_prem_bal,Fn_get_comm_ref and Fn_get_contract_dtls added
16-AUG-2010 FLEXCUBE V.CL Release 7.7 Retro, CITIUS Till#7266 Participation Report changes
16-AUG-2010 FLEXCUBE V.CL Release 7.7 Retro, CITIUS Till#7171 SLT BO report related changes
16-AUG-2010 FLEXCUBE V.CL Release 7.7 Retro, CITIUS Till#7272 SLT BO fixes for FINCON reported issues
16-Aug-2010 FLEXCUBE V.CL Release 7.7 Retro CITIUS Till#7342, Added column position , rapid id , commitment ref no in unconfirmed trade report
16-Aug-2010 FLEXCUBE V.CL Release 7.7 Retro CITIUS Till#7356, changes in report SLT Contingent Liability Report
16-Aug-2010 FLEXCUBE V.CL Release 7.7 Retro CITIUS Till#7431, Position summary report related changes
30-Aug-2010 FLEXCUBE V.CL Release 7.7 Retro CITIUS Till#7434, SLT-Ops-Contingent_Liability_Report_-_Ad_Hoc Changes
24-SEP-2010 CITIUS-LS#7506 additional information flow from Flexcube to Recon --CITIUS-LS#7518 catch up retro
10-DEC-2010 FLEXCUBE V.CL Release 7.8 Retro, 
	21-OCT-2010 CITIUS-LS#7431, Flexcube Breakdown report  related changes
	10-NOV-2010 CITIUS-LS#7431, Flexcube Breakdown report  related changes
07-JUN-2011 FLEXCUBE V.CL Release 7.9 Retro CITIUS-LS#8391 For Flexcube Interest-Fee Calculation Details Report.rep, agency fee details are required and the details are pulled accordingly.
14-JUN-2011 Flexcube V.CL Release 7.9, CITIUS Retro, TILL#7765, production retro
	09-DEC-2010 CITIUS-LS#7586,Request for calculation of the Weighted Average Price of Unsettled inventory. This would then be populated in the Flexcube Position Summary report and, eventually, to Optima. Bryan will provide the document with the calculation to Dhinker. 
	22-DEC-2010 CITIUS-LS#7634 The function backup_utils.FN_SUM_LOAN_OUTSTND currently giving the balances excluding the LC contracts as the default parameter is being passed as null, because of which the loans outstanding amount in SLT-Ops-Contingent Liability Report - Ad Hoc being shown wrongly
15-JUN-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07, CFPI Migration Changes	
15-JUN-2011 FLEXCUBE V.CL Release 7.9 CITIUS COC Retro, Till#9555 COC Report Changes
06-JUL-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07, ITR1 SFR#107 Changes
18-DEC-2011 CITIUS-LS#12155
					LC fronting bo report changes.
29-DEC-2011 EURCITIPLC-GENERIC#12224 Changes - New function fn_insert_LOAN_COMMT_REP added
14-NOV-2011 Flexcube V.CL Release 7.10 FS Tag12,Automation of Portfolio ID from E-Sales Changes:added new funcion to get the expense code sent form E-sales.
18-SEP-2012 CITIUS#14888, CCC Interface changes - Legal Maturity date changes in feeds
24-SEP-2012 CITIUS#14958, CCC Interface changes - Value date (Original Start date) changes in feeds
26-NOV-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15285 Changes, Operations Contact report for a contract with lender share details
04-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15370 Changes ,commented the changes done as part of CITIUS#15285 and added new logic for generating Operations Contact report for a contract with lender share details
18-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO,CITIUS#15535 Chnages: The amounts being sent to the operations Contract report are rounded appropriately.
26-FEB-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#16312 changes,(JIRA-150080-7465) monthly Net regulatory report changes
27-FEB-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#16359 changes, Operation contract report changes, i.e. wash account payment should be excluded from the report
04-Mar-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#16360 changes, Net Regulatory changes
15-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16458 changes,Added functions fn_previous_rate_date ,fn_dis_rev_bal ,fn_comm_mat_date ,fn_borr_type added to compute previous interest rate change date and discount revenue balance.
15-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16619 changes, a) Rate type logic changes, b) past due days logic changed
14-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16935 changes,Logic to handle new fields in Point in Time report.functions added.
24-AUG-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 FS Vol1 Tag07 ITR1#47 changes,Added a new function for getting the branch currency.
13-SEP-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO  CITIUS#17927 CBNA conversion changes 
14-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#16619 changes, a) Rate type logic changes, b) past due days logic changed
03-DEC-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 RETRO CITIUS#20840 Changes to populate HFS Originated Fee Mark,Transfer Mark,LOCOM Mark,HFS Origination Fee Mark,Trade Mark,
								Cost Basis,Fair Value Price,Transfer Price,LOCOM Price,Trade Price,Trade Date,Settlement Date,Transfer Date,Percentage Sold 
								in Amortized Fee Report,customer Balance report, facility detail Report,Loan origniation Report
03-DEC-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 RETRO CITIUS#20860 Changes to take the sum of pnl amount from TLTB_PNL_DETAILS for trade_marks.								
*/



/*FUNCTION  fn_get_incremental_pnl (
 p_branch  IN oltms_branch.branch_code%TYPE ,
 p_mis_code  IN GLTMS_MIS_CODE.mis_code%TYPE ,
 p_gl_code  IN   oltb_account.ac_gl_no%type ,
 p_ccy  IN cytms_ccy_defn.ccy_code%TYPE,
 p_current_period IN VARCHAR2,
 p_current_cycle  IN VARCHAR2

   )
RETURN NUMBER;*/ -- OFCL12.2 Not reqd

FUNCTION fn_get_address (  p_customer  IN  oltms_customer.customer_no%TYPE )
RETURN varchar2 ;

--31-Aug-2009 SLT BO Report related changes started

FUNCTION fn_get_facility_name (
                               pv_cusip               IN varchar2,
                               pv_position_identifier IN varchar2
                              )
return varchar2;

--31-Aug-2009 SLT BO Report related changes ended
FUNCTION fn_get_portfolio_age --25-Jan-2010 PBG CONSOLIDATION sweta,SLT BO Reports Related Changes. starts
         (
          p_expense_code               IN varchar2,
          p_position_identifier        IN varchar2,
          p_cusip_no                   IN varchar2
         )
return Number;

FUNCTION fn_get_exrate
	(
	pBranch		IN	oltms_branch.BRANCH_CODE%TYPE,
	pCcy1		IN 	CYTMS_CCY_DEFN.CCY_CODE%TYPE,
	pCcy2		IN 	CYTMS_CCY_DEFN.CCY_CODE%TYPE
	)
return Number;
Function fn_get_commitment_ref
	(
	p_position_identifier	IN	TLTB_CONTRACT_MASTER.position_identifier%type,
	p_cusip_no		IN	TLTB_CONTRACT_MASTER.cusip_no%type,
	p_expense_code		IN	tltbs_contract_master.expense_code%type default null --30-Aug-2010 FLEXCUBE V.CL Release 7.7 Retro CITIUS Till#7434 changes
	)
return varchar2;
Function fn_get_condi
	(
	p_exp_code	IN	tltbs_contract_master.expense_code%type
	)
return varchar2;
FUNCTION fn_get_orignominal_amt
	(
	p_position_identifier	IN	TLTB_CONTRACT_MASTER.position_identifier%type,
	p_cusip_no		IN	TLTB_CONTRACT_MASTER.cusip_no%type,
	p_exp_Code		IN	TLTB_CONTRACT_MASTER.expense_code%type
	)
RETURN	NUMBER;
FUNCTION fn_get_firmacc
	(
	p_cusip_no				IN	tltbs_contract_master.cusip_no%type,--16-AUG-2010 FLEXCUBE V.CL Release 7.7 Retro, CITIUS Till#7171
	p_position_identifier			IN	tltbs_contract_master.position_identifier%type,
	p_exp_code				IN	tltbs_contract_master.expense_code%type,
	p_trade_ref_no				IN	tltbs_contract_master.contract_ref_no%type default NULL  --16-AUG-2010 FLEXCUBE V.CL Release 7.7 Retro, CITIUS Till#7171
	)
return varchar2;
FUNCTION fn_get_trade_ccy
	(
	p_position_identifier	IN	TLTB_CONTRACT_MASTER.position_identifier%type,
	p_cusip_no		IN	TLTB_CONTRACT_MASTER.cusip_no%type,
	p_exp_Code		IN	TLTB_CONTRACT_MASTER.expense_code%type
	)
RETURN	varchar2;
FUNCTION fn_get_counterparty
	(
	p_commitment_ref_no	IN	oltbs_contract_master.contract_Ref_no%type
	)
RETURN	varchar2;
----------01-FEB-2010 PBG CONSOLIDATION starts
FUNCTION Fn_get_funding_amt
	(
	p_position_identifier	IN TLTM_POSITION_IDENTIFIER.position_identifier%type,
	p_cusip_no		IN TLTB_POSITION_CONTRACT.cusip_no%type
	)
RETURN number;
FUNCTION fn_get_tranche_ref_no
	(
	p_cusip_no              IN varchar2,
	p_position_identifier   IN varchar2
	,p_branch		IN varchar2 DEFAULT NULL, --24-Feb-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7138 ,SLT BO  Reports Tuning  changes
	p_product		IN varchar2 DEFAULT NULL, --24-Feb-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7138 ,SLT BO  Reports Tuning  changes
	p_module		IN varchar2 DEFAULT NULL  --24-Feb-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7138 ,SLT BO  Reports Tuning  changes
        )
RETURN VARCHAR2;
--------01-FEB-2010 PBG CONSOLIDATION  ends
---08-FEB-2010 PBG CONSOLIDATION,SLT BO Reports Related Changes STARTS
FUNCTION fn_ol_get_part_amt
(
p_cusip_no	IN varchar2,
p_position_identifier	IN VARCHAR2,
p_amt_type	IN	CHAR
)
RETURN NUMBER;
FUNCTION fn_get_unsettled_trades
(
p_cusip_no	IN varchar2,
p_position_identifier	IN VARCHAR2
)
RETURN NUMBER;
FUNCTION fn_get_tot_pnl
(
p_cusip_no	IN varchar2,
p_position_identifier	IN VARCHAR2
)
RETURN NUMBER;
Function fn_get_loan_ref
(
p_position_identifier	IN	TLTB_CONTRACT_MASTER.position_identifier%type,
p_cusip_no		IN	TLTB_CONTRACT_MASTER.cusip_no%type
,p_commitment_ref_no		IN	lptbs_contract_master.contract_ref_no%type default null --02-MAR-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7171
)
RETURN VARCHAR2;

FUNCTION FN_GET_REQ_GL
(p_cusip		IN	varchar2,
p_pos_id	IN 	VARCHAR2,
p_gl_type	IN 	VARCHAR2,
p_product_code IN  VARCHAR2 DEFAULT NULL  ---13-SEP-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO  CITIUS#17927 Changes
)
RETURN VARCHAR2;

FUNCTION fn_get_rating
(	p_cusip		IN	VARCHAR2,
	p_rating	IN 	VARCHAR2
)
RETURN VARCHAR2;
--08-FEB-2010 PBG CONSOLIDATION,SLT BO Reports Related Changes ENDS
--25-Jan-2010 PBG CONSOLIDATION,SLT BO Reports Related Changes sweta. ends
--CITIUS-LS#7191 site Retro changes start
---11-FEB-2010 PBG CONSOLIDATION,SLT BO Reports Related Changes STARTS
FUNCTION fn_get_int_fee_amt
(	p_cusip		IN	VARCHAR2,
	p_pos_id	IN 	VARCHAR2,
	p_fee_comp	IN	VARCHAR2,
	p_month_ind	IN	NUMBER DEFAULT 0
)
RETURN NUMBER;
----11-FEB-2010 PBG CONSOLIDATION,SLT BO Reports Related Changes ENDS
-----15-FEB-2010 PBG CONSOLIDATION,SLT BO Reports Related Changes STARTS
FUNCTION fn_get_counterparty_mnemonic
		(p_ext_ref_no	IN	VARCHAR2,
		 p_source_code	IN	VARCHAR2
		)
RETURN VARCHAR2;

FUNCTION fn_get_trade_age(p_trade_date	IN	DATE,
			  p_branch	IN 	VARCHAR2)
RETURN NUMBER;

FUNCTION fn_get_market_price(p_cusip_no IN VARCHAR2)
RETURN NUMBER;

-----15-FEB-2010 PBG CONSOLIDATION,SLT BO Reports Related Changes ENDS
-----16-FEB-2010 PBG CONSOLIDATION,SLT BO Reports Related Changes STARTS
FUNCTION fn_get_interest_details(p_ld_ref_no	IN	VARCHAR2,
			    	 p_int_rate	IN	VARCHAR2,
			    	 p_cont_type	IN	VARCHAR2 DEFAULT NULL---25-FEB-2010 PBG CONSOLIDATION ADDED
				)
RETURN NUMBER;
FUNCTION fn_get_accrual_days	(p_ld_ref_no	IN	VARCHAR2)
RETURN NUMBER;
FUNCTION fn_get_expense_code(p_cusip	IN	VARCHAR2,
				p_pos_id	IN 	VARCHAR2
				)
RETURN VARCHAR2;
---18-FEB-2010 PBG CONSOLIDATION STARTS
FUNCTION fn_get_event_date(p_contract_ref_no	IN varchar2,
				p_event		IN VARCHAR2
			)
RETURN DATE;
---18-FEB-2010 PBG CONSOLIDATION ENDS
-----16-FEB-2010 PBG CONSOLIDATION,SLT BO Reports Related Changes ENDS
------18-FEB-2010 PBG CONSOLIDATION STARTS
FUNCTION fn_get_commitment_type(p_pos_id	IN	VARCHAR2,
				p_cusip		IN	VARCHAR2
				)
RETURN	VARCHAR2;
------18-FEB-2010 PBG CONSOLIDATION ENDS
------19-FEB-2010 PBG CONSOLIDATION STARTS
FUNCTION fn_get_proof(p_pos_id	IN	VARCHAR2,
			p_cusip		IN	VARCHAR2
			,p_exp_code	IN	VARCHAR2 DEFAULT NULL--FLEXCUBE V.CL Release 7.7 Retro, CITIUS Till#7272
		)
RETURN	VARCHAR2;
--------19-FEB-2010 PBG CONSOLIDATION ENDS
---25-FEB-2010 PBG CONSOLIDATION STARTS
FUNCTION fn_get_amount(p_contract_ref_no	IN	VARCHAR2,
			p_comp			IN	VARCHAR2,
			p_amt_type		IN	VARCHAR2
			)
RETURN	NUMBER;
---25-FEB-2010 PBG CONSOLIDATION ENDS
--02-MAR-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7171 changes start
Function fn_get_sic_code
(
p_position_identifier		IN	TLTB_CONTRACT_MASTER.position_identifier%TYPE,
p_cusip_no					IN	TLTB_CONTRACT_MASTER.cusip_no%TYPE,
p_commitment_ref_no			IN	oltbs_contract.contract_ref_no%TYPE,
p_counterparty				IN	OLTB_CONTRACT_MASTER.counterparty%TYPE
)
RETURN VARCHAR2;
FUNCTION fn_check_line_synd(P_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE) RETURN VARCHAR2;
--02-MAR-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7171 changes end
----15-MAR-2010 PBG CONSOLIDATION,SLT BO Reports(Net income report) related changes STARTS
FUNCTION  fn_get_lcy_amount
		(
		 P_contract_ref_no	IN	VARCHAR2,
		 P_rounding		IN	CHAR
		 )
RETURN NUMBER;
FUNCTION  fn_get_currency(P_CONTRACT_REF_NO	IN	VARCHAR2)
RETURN VARCHAR2;
----15-MAR-2010 PBG CONSOLIDATION,SLT BO Reports(Net income report) related changes ENDS

--16-AUG-2010 FLEXCUBE V.CL Release 7.7 Retro, CITIUS Till#7223 CHANGES START
FUNCTION fn_get_GFRN
	(
	p_position_identifier	IN	tltbs_contract_master.position_identifier%type,
	p_cusip_no				IN	tltbs_contract_master.cusip_no%type,	
	p_commitment_ref_no		IN	VARCHAR2
	)
RETURN	VARCHAR2;
FUNCTION fn_get_part_nominal_amt
	(
	p_position_identifier	IN	tltbs_contract_master.position_identifier%type,
	p_cusip_no				IN	tltbs_contract_master.cusip_no%type,
	p_exp_Code				IN	tltbs_contract_master.expense_code%type,
	p_amt_type				IN	VARCHAR2,
	p_amount				IN  NUMBER DEFAULT NULL, --Markandain
	p_type					IN	VARCHAR2 DEFAULT NULL  --CITIUS-LS#7431,21-oct
	)
RETURN	NUMBER;
FUNCTION fn_get_disc_prem_bal
	(	
	p_position_identifier	IN	tltbs_contract_master.position_identifier%type,
	p_cusip_no				IN	tltbs_contract_master.cusip_no%type,
	p_exp_Code				IN	tltbs_contract_master.expense_code%type
	)
RETURN NUMBER;

FUNCTION Fn_get_contract_dtls
(
p_contract_ref_no	IN varchar2,
p_contract_type		IN VARCHAR2,
p_field_name		IN VARCHAR2
)
RETURN VARCHAR2;
FUNCTION Fn_get_comm_ref
	(
	p_position_identifier	IN	TLTB_CONTRACT_MASTER.position_identifier%type,
	p_cusip_no				IN	TLTB_CONTRACT_MASTER.cusip_no%type,
	p_expense_code			IN  TLTB_CONTRACT_MASTER.expense_code%type
	)
RETURN VARCHAR2 ;
--16-AUG-2010 FLEXCUBE V.CL Release 7.7 Retro, CITIUS Till#7223 changes end

--16-AUG-2010 FLEXCUBE V.CL Release 7.7 Retro, CITIUS Till#7266 Starts
FUNCTION fn_get_participated_tranche
	(
		p_cusip_no               IN varchar2,
		p_position_identifier    IN varchar2	
    )
RETURN VARCHAR2;
--16-AUG-2010 FLEXCUBE V.CL Release 7.7 Retro, CITIUS Till#7266 Ends



-- 17-MAR-2010 CITIUS-LS#7191 ,BO report related changes start
FUNCTION fn_get_DCF_pay_recv
         (
          p_cusip_no                   IN VARCHAR2,
          p_expense_code               IN VARCHAR2,
          p_position_identifier        IN VARCHAR2,          
          p_DCF_amt_type			   IN VARCHAR2
         )
RETURN NUMBER;
-- 17-MAR-2010 CITIUS-LS#7191 ,BO report related changes ends
--16-Aug-2010 FLEXCUBE V.CL Release 7.7 Retro CITIUS Till#7342 start
Function Fn_commitment_transferavl
(
p_ext_contract_ref_no IN VARCHAR2
)
RETURN NUMBER;

Function Fn_Get_Rapid_id
(
p_contract_ref_no IN VARCHAR2
)
RETURN NUMBER;
--16-Aug-2010 FLEXCUBE V.CL Release 7.7 Retro CITIUS Till#7342 end
--14-JUN-2011 Flexcube V.CL Release 7.9, CITIUS Retro, TILL#7765, Missing retro
--CITIUS-LS#7634 Changes start
FUNCTION fn_sum_loan_outstnd
		(
		p_comm_ref IN oltbs_contract.contract_ref_no%TYPE
		)
RETURN NUMBER;
--CITIUS-LS#7634 Changes Ends
--14-JUN-2011 Flexcube V.CL Release 7.9, CITIUS Retro, TILL#7765,Missing retro
--16-Aug-2010 FLEXCUBE V.CL Release 7.7 Retro CITIUS Till#7356 start
FUNCTION FN_SUM_LOAN_OUTSTND(
				p_comm_ref IN oltbs_contract.contract_ref_no%TYPE
				--14-JUN-2011 Flexcube V.CL Release 7.9, CITIUS Retro, TILL#7765, Starts
				--, p_contract_type	IN	VARCHAR2 DEFAULT NULL --CITIUS-LS#7431
				,p_contract_type	IN	VARCHAR2 --CITIUS-LS#7431 not able to compile as two declarations of fn_sum_loan_outstnd removed default word.
				--14-JUN-2011 Flexcube V.CL Release 7.9, CITIUS Retro, TILL#7765, Ends
				)
RETURN NUMBER;
--16-Aug-2010 FLEXCUBE V.CL Release 7.7 Retro CITIUS Till#7356 end

--16-Aug-2010 FLEXCUBE V.CL Release 7.7 Retro CITIUS Till#7431 position summary changes,Starts
FUNCTION fn_get_position_detail (
									p_cusip_no 				IN	TLTB_POSITION_CONTRACT.cusip_no%TYPE ,
									p_position_identifier 	IN	TLTB_POSITION_CONTRACT.position_identifier%TYPE ,
									p_expense_code 			IN  TLTB_POSITION_CONTRACT.expense_code%TYPE ,
									p_balance_type			IN	VARCHAR2 ,
									p_from_date 			IN	DATE DEFAULT NULL,
									p_to_date  				IN	DATE DEFAULT NULL,
									p_type					IN	VARCHAR2, --originalccy/usdequal
									p_ccy					IN	tltbs_current_dated_balance.trade_ccy%TYPE DEFAULT NULL,
									p_branch				IN	tltbs_position_contract.branch%TYPE DEFAULT NULL
			)
RETURN NUMBER;

FUNCTION fn_get_unsettle_value
(
	p_position_identifier	IN	tltbs_contract_master.position_identifier%type,
	p_cusip_no				IN	tltbs_contract_master.cusip_no%type,
	p_exp_Code				IN	tltbs_contract_master.expense_code%type
)
RETURN NUMBER;

FUNCTION fn_get_settle_value
(
	p_position_identifier	IN	tltbs_contract_master.position_identifier%type,
	p_cusip_no				IN	tltbs_contract_master.cusip_no%type,
	p_exp_Code				IN	tltbs_contract_master.expense_code%type
)
RETURN NUMBER;

---CITIUS-LS#7431 position summary changes,Ends
--******
--CITIUS-LS#7518 start
--CITIUS-LS#7506 additional information flow from Flexcube to Recon,Starts
function fn_get_maker_id
(
	p_module			varchar2,
	p_contract_ref_no	varchar2,
	p_event_seq_no		number,
	p_type				varchar2
)
return varchar2;

function fn_get_trade_details
(
	p_module			varchar2,
	p_contract_ref_no	varchar2,
	p_event_seq_no		number,
	p_type				varchar2 --'TICKET_ID','TRADE'
)
return varchar2;
--CITIUS-LS#7506 additional information flow from Flexcube to Recon,Ends
--CITIUS-LS#7518 end
--******
--10-NOV-2010 CITIUS-LS#7431
FUNCTION Fn_get_orig_details
	(
	p_cusip_no				IN	TLTB_CONTRACT_MASTER.cusip_no%type,
	p_expense_code 			IN  TLTB_POSITION_CONTRACT.expense_code%TYPE ,
	p_balance_type			IN	VARCHAR2 --COMMITMENT_AVAILABLE,LOAN_OUTSTANDING,COMMITMENT_TRANSFERAVL
	)
RETURN NUMBER;

FUNCTION fn_get_agency_ref_no
	(
	p_cusip_no		IN varchar2,
	p_position_identifier	IN varchar2
	)
RETURN VARCHAR2;
--10-NOV-2010 CITIUS-LS#7431
--14-JUN-2011 Flexcube V.CL Release 7.9, CITIUS Retro, TILL#7765, retro CITIUS-LS#7586
FUNCTION fn_get_unsettled_wac
(
	p_position_identifier	IN	tltbs_contract_master.position_identifier%type,
	p_cusip_no				IN	tltbs_contract_master.cusip_no%type,
	p_exp_Code				IN	tltbs_contract_master.expense_code%type
)
RETURN NUMBER;
--14-JUN-2011 Flexcube V.CL Release 7.9, CITIUS Retro, TILL#7765, retro CITIUS-LS#7586
--16-Aug-2010 FLEXCUBE V.CL Release 7.7 Retro CITIUS Till#7431 position summary changes,Ends

--FLEXCUBE V.CL Release 7.9 Retro CITIUS-LS#8391 For Flexcube Interest-Fee Calculation Details Report.rep, agency fee details are required and the details are pulled accordingly,Starts
FUNCTION fn_get_agy_fee_details
(	
	p_contract_ref_no	VARCHAR2,
	p_ld_ref_no			VARCHAR2,
	p_component			VARCHAR2,
	p_schedule_date		DATE,
	p_start_date		DATE,
	p_end_date			DATE,
	p_pick_esn			NUMBER,
	p_type				VARCHAR2 default 'RATE'
)
RETURN NUMBER;
--FLEXCUBE V.CL Release 7.9 Retro CITIUS-LS#8391 For Flexcube Interest-Fee Calculation Details Report.rep, agency fee details are required and the details are pulled accordingly,Ends
--15-JUN-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07, CFPI Migration Changes starts
FUNCTION fn_get_branch
	(p_branch_code 	IN 	oltms_branch.branch_code%TYPE
	,p_region	IN	tltms_strategy_mapping.region_code%TYPE DEFAULT NULL)--06-JUL-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07, ITR1 SFR#107 Changes, starts)
RETURN VARCHAR2;
--15-JUN-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07, CFPI Migration Changes ends
--15-JUN-2011 FLEXCUBE V.CL Release 7.9 CITIUS COC Retro, Till#9555,Starts
FUNCTION fn_get_coc_details
(
	p_contract_ref_no	varchar2,
	p_type				varchar2,
	p_effective_date	date default '01-JAN-1900'
)
RETURN VARCHAR2;
--15-JUN-2011 FLEXCUBE V.CL Release 7.9 CITIUS COC Retro, Till#9555,Ends

--CITIUS-LS#12155 start
FUNCTION fn_get_lc_issuer
(	
	p_ref_no	VARCHAR2
)
RETURN varchar2;
--CITIUS-LS#12155 end

--EURCITIPLC-GENERIC#12224 Start
FUNCTION fn_insert_LOAN_COMMT_REP
(

	p_in_maturity_date IN date
)
RETURN NUMBER;
--EURCITIPLC-GENERIC#12224 End

--14-NOV-2011 Flexcube V.CL Release 7.10 FS Tag12,Automation of Portfolio ID from E-Sales Changes
FUNCTION fn_get_exp_code
	(p_cusip_no	IN	tltbs_current_dated_balance.cusip_no%type,
	 p_pos_id	IN 	tltbs_current_dated_balance.position_identifier%type
	)
RETURN VARCHAR2;
--14-NOV-2011 Flexcube V.CL Release 7.10 FS Tag12,Automation of Portfolio ID from E-Sales Changes

-- 18-SEP-2012 CITIUS#14888, starts
FUNCTION fn_get_legal_maturity_date
	(p_ref_no	IN	oltbs_contract.contract_ref_no%TYPE --contract_ref_no/external_ref_no/custom_ref_no
	)
RETURN DATE;
-- 18-SEP-2012 CITIUS#14888, ends


-- 24-SEP-2012 CITIUS#14958, starts
FUNCTION fn_get_orig_start_date
	(p_ref_no	IN	oltbs_contract.contract_ref_no%TYPE --contract_ref_no/external_ref_no/custom_ref_no
	)
RETURN DATE;
-- 24-SEP-2012 CITIUS#14958, ends
--04-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15370 Changes start
/*
--26-NOV-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15285 Changes start here


FUNCTION fn_get_interest_paid(p_contract_ref_no VARCHAR2,
                              p_from_date       DATE,
                              p_to_date         DATE)
RETURN NUMBER;

FUNCTION fn_get_principal_paid(p_contract_ref_no VARCHAR2,
                               p_from_date       DATE,
                               p_to_date         DATE)
RETURN NUMBER;
  
FUNCTION fn_get_tot_fee_paid(p_contract_ref_no VARCHAR2,
                             p_from_date       DATE,
                             p_to_date         DATE)
RETURN NUMBER;

FUNCTION fn_get_fee_accr(p_contract_ref_no VARCHAR2,
                        p_from_date       DATE,
                        p_to_date         DATE)
RETURN NUMBER;

FUNCTION fn_get_interest_accr(p_contract_ref_no VARCHAR2,
                              p_from_date       DATE,
                              p_to_date         DATE)
RETURN NUMBER;

FUNCTION fn_get_fee_past_due(p_contract_ref_no VARCHAR2,
                                                      p_from_date       DATE,
                                                      p_to_date         DATE)
RETURN NUMBER;

FUNCTION fn_get_interest_past_due(p_contract_ref_no VARCHAR2,
                                                      p_from_date       DATE,
                                                      p_to_date         DATE)
RETURN NUMBER;
--26-NOV-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15285 Changes end here
*/

FUNCTION Fn_get_fee_past_due( p_contract_ref_no VARCHAR2,
							p_currency 	VARCHAR2,--18-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO,CITIUS#15535 Chnages.
 p_participant VARCHAR2,
							p_from_date       DATE,
							p_to_date         DATE,
							p_fee_component VARCHAR2)
RETURN NUMBER;

FUNCTION Fn_get_int_past_due(p_contract_ref_no VARCHAR2,
							p_currency 	VARCHAR2,--18-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO,CITIUS#15535 Chnages.
 p_participant VARCHAR2,
							p_from_date       DATE,
							p_to_date         DATE)
RETURN NUMBER;

FUNCTION Fn_get_part_fee_accr(p_contract_ref_no VARCHAR2,
							p_currency 	VARCHAR2,--18-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO,CITIUS#15535 Chnages.
 p_participant VARCHAR2,
							p_from_date       DATE,
							p_to_date         DATE,
							p_fee_component   varchar2)
RETURN NUMBER;

FUNCTION Fn_get_part_fee_paid(p_contact_ref_no VARCHAR2,
							p_currency 	VARCHAR2,--18-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO,CITIUS#15535 Chnages.
 p_participant VARCHAR2,
							p_from_date      DATE,
							p_to_date        DATE,
							p_fee_component  VARCHAR2
							) 
RETURN NUMBER;

FUNCTION Fn_get_part_int_accr(p_contract_ref_no VARCHAR2,
							p_currency 	VARCHAR2,--18-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO,CITIUS#15535 Chnages.
 p_participant VARCHAR2,
							p_from_date       DATE,
							p_to_date         DATE
							)
RETURN NUMBER;

FUNCTION Fn_get_part_int_paid(p_contract_ref_no VARCHAR2,
							p_currency 	VARCHAR2,--18-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO,CITIUS#15535 Chnages.
 p_participant VARCHAR2,
							p_from_date       DATE,
							p_to_date         DATE
							) 
RETURN NUMBER;

FUNCTION Fn_get_part_princ_paid(p_contract_ref_no VARCHAR2,
							  p_currency 	VARCHAR2,--18-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO,CITIUS#15535 Chnages.
 p_participant VARCHAR2,
							  p_from_date       DATE,
							  p_to_date         DATE)
RETURN NUMBER;
--04-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15370 Changes end

--26-FEB-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#16312 changes start here
FUNCTION fn_get_outstanding_avl(
			    p_contract_ref_no IN	oltbs_contract.contract_ref_no%TYPE,
			    p_module_code     IN	oltbs_contract.module_code%TYPE,
			    p_product_type    IN	oltbs_contract_master.product_type%TYPE,
			    p_bal_type	      IN	lbtbs_tranche_vdbal_master.balance_type%TYPE
			    )
RETURN NUMBER;

FUNCTION fn_get_accr_int
(
 p_contract_refno IN  oltbs_contract_master.contract_ref_no%TYPE,
 p_module	  IN  oltbs_contract.module_code%TYPE,
 p_to_date	  IN   DATE,
 p_product_type	  IN  oltbs_contract_master.product_type%TYPE	
)
RETURN NUMBER;

FUNCTION fn_next_reset_date
(
 p_contract_refno IN oltbs_contract.contract_Ref_no%TYPE,
 p_component	  IN oltbs_contract_master.main_comp%TYPE,		 
 p_product	  IN oltbs_contract.product_code%TYPE,
 p_module	  IN oltbs_contract.module_code%TYPE
)
RETURN DATE;

FUNCTION fn_previous_rate
(
 p_contract_refno IN oltbs_contract.contract_ref_no%TYPE,
 p_component	  IN oltbs_contract_master.main_comp%TYPE
)
RETURN NUMBER;

FUNCTION fn_split_reprice_parent_rate
(
p_contract_ref_no  IN	oltbs_contract.contract_ref_no%TYPE
)
RETURN VARCHAR2;

FUNCTION fn_get_orig_amount
(
 p_contract_refno IN oltbs_contract.contract_ref_no%TYPE
)
RETURN NUMBER;

FUNCTION fn_ol_get_asset_ratio
(
 p_contract_refno  IN oltbs_contract.contract_ref_no%TYPE
)
RETURN NUMBER;

FUNCTION fn_past_due_days
(
 p_contract_refno  IN oltbs_contract.contract_ref_no%TYPE
  , p_version_no	  IN oltbs_contract.latest_version_no%TYPE --15-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16619 changes here
)
RETURN NUMBER;

FUNCTION fn_get_comm_matdt
(
p_contract_refno  IN	oltbs_contract.contract_ref_no%TYPE,
p_module	  IN	oltbs_contract.module_code%TYPE,
p_prod_type  	  IN	oltbs_contract_master.product_type%TYPE
)
RETURN DATE;

FUNCTION fn_get_days_basis
(
p_contract_refno  IN	oltbs_contract.contract_ref_no%TYPE,
p_component	  IN	oltbs_contract_master.main_comp%TYPE
)
RETURN VARCHAR2;
--26-FEB-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#16312 changes end here

--27-FEB-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#16359 changes start here
FUNCTION fn_get_part_ppmt_esn	(
								p_part_cont_ref_no		IN	VARCHAR2
								, p_component			IN	VARCHAR2
								, p_event_seq_no		IN	NUMBER
								, p_sight_fund_enabled	IN	VARCHAR2
								)
RETURN NUMBER;
--27-FEB-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#16359 changes end here

--15-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16458 changes start
FUNCTION fn_dis_rev_bal
(
 p_contract_refno  IN	oltbs_contract.contract_ref_no%TYPE 
)
RETURN NUMBER;

FUNCTION fn_previous_rate_date
(
 p_contract_refno IN oltbs_contract.contract_ref_no%TYPE,
 p_component	  IN oltbs_contract_master.main_comp%TYPE
)
RETURN DATE;

FUNCTION fn_borr_type
(
 p_contract_refno IN oltbs_contract.contract_ref_no%TYPE,
 p_product_type	  IN oltbs_contract.product_type%TYPE,
 p_version_no	  IN oltbs_contract.latest_version_no%TYPE
)
RETURN VARCHAR2;

FUNCTION fn_comm_mat_date
(
 p_contract_refno IN oltbs_contract.contract_ref_no%TYPE,
 p_module_code	  IN oltbs_contract.module_code%TYPE,
 p_product_type	  IN oltbs_contract.product_type%TYPE,
 p_version_no	  IN oltbs_contract.latest_version_no%TYPE
)
RETURN DATE;
--15-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16458 changes end

--14-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#16619 changes start here
FUNCTION fn_get_rate_type
	(
	p_contract_refno	IN	oltbs_contract.contract_ref_no%TYPE
	, p_component		IN	oltbs_contract_master.main_comp%TYPE
	, p_product_type		IN	oltbs_contract.product_type%TYPE
	, p_version_no		IN	oltbs_contract.latest_version_no%TYPE
	)
RETURN VARCHAR2;
--14-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#16619 changes end here

--04-Mar-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#16360 changes start here
FUNCTION fn_get_loan_indicator
	(
	p_contract_refno  IN	oltbs_contract.contract_ref_no%TYPE
	)
RETURN VARCHAR2;
--04-Mar-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#16360 changes end here

--14-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16935 changes start
function fn_get_investor_detail
(
 p_loan_ref_no  IN     oltbs_contract.contract_ref_no%TYPE
)
RETURN VARCHAR2;

FUNCTION fn_get_floor_ceiling
(
 p_loan_ref_no        IN     oltbs_contract.contract_ref_no%TYPE
,p_module             IN     oltbs_contract.module_code%TYPE 
,p_product			  IN	 oltms_product.product_code%TYPE
,p_rate_slab		  IN	 VARCHAR2
)
RETURN NUMBER;
--14-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16935 changes end
--24-AUG-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 FS Vol1 Tag07 ITR1#47 changes start
FUNCTION Fn_get_branch_ccy
(
 p_branch IN oltms_branch.branch_code%TYPE
)
RETURN VARCHAR2;
--24-AUG-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 FS Vol1 Tag07 ITR1#47 changes end
--CITIUS#20840 Changes start
FUNCTION fn_get_pos_exp_cus
(
	P_contract_ref_no 	IN 	oltbs_contract.contract_ref_no%TYPE,
	P_pos_identifier	OUT	tltbs_position_contract.position_identifier%type,
	P_exp_code		OUT	tltbs_position_contract.expense_code%type,
	P_cusip_no		OUT 	tltbs_position_contract.cusip_no%type
)
RETURN BOOLEAN;
FUNCTION fn_get_originated_marks
(
	p_contract_ref_no	varchar2
)
RETURN NUMBER;
FUNCTION fn_get_transfer_marks
(
	p_contract_ref_no	varchar2 
)
RETURN NUMBER;
FUNCTION fn_get_locom_marks
(
	p_contract_ref_no	varchar2
)
RETURN NUMBER;
FUNCTION fn_get_trade_marks
(
	p_contract_ref_no	varchar2
)
RETURN NUMBER ;
--CITIUS#20860 Changes start
FUNCTION fn_get_trade_marks_old
(
	p_contract_ref_no	varchar2
)
RETURN NUMBER ;
--CITIUS#20860 Changes end
FUNCTION fn_get_fair_value_price
(
	p_contract_ref_no	varchar2 
)
RETURN NUMBER;
FUNCTION fn_get_transfer_det
(
	p_contract_ref_no	VARCHAR2 ,
	p_identifier		VARCHAR2
)
RETURN VARCHAR2;
FUNCTION fn_get_locom_price
(
	p_contract_ref_no	varchar2
)
RETURN NUMBER;
FUNCTION fn_get_trade_Details
(
	p_contract_ref_no	varchar2,
	p_identifier		varchar2
)
RETURN VARCHAR2;
Function fn_Resolve_desk_type
(
	P_contract_ref_no 	IN	oltbs_contract.contract_ref_no%TYPE
)
RETURN VARCHAR2;
FUNCTION fn_decide_action
(
	p_contract_ref_no 	IN 	oltbs_contract.contract_ref_no%TYPE,
	p_int_code		IN	oltbs_interface_param_if.interface_code%TYPE,
	p_param_type		IN	oltbs_interface_param_if.param_type%TYPE
)
RETURN BOOLEAN;
FUNCTION fn_get_trfr_ratio
(
	p_contract_ref_no	VARCHAR2
)
RETURN NUMBER;
--CITIUS#20840 Changes end
END backup_utils ;
/
CREATE or replace SYNONYM backups_utils FOR backup_utils
/