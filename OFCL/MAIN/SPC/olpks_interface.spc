CREATE OR REPLACE PACKAGE olpks_interface AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_interface.SPC
**
** Module	: INTERFACE
**
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
21-DEC-2009 CITIUS-LS#7016, New package created for Interface related changes.
09-FEB-2010 CITIUS-LS#7130, While calculating the funding ratio, for FCY loans, system is not computing the utilization 
		in the commitment currency, due to this, funded ratio calculation is wrong.
16-JUN-2010 CITIUS-LS#7355 fn_gen_rapid_file function added.
21-JUL-2010, CITIUS-LS#7412, Canada GL Retro Changes.
14-Dec-2010. CITIUS-LS#7591, Missing retro
	02-NOV-2010, CITIUS-LS#7575, ifpr_000_smart_smartmdw procedure introduced.
03-MAY-2011 CITIUS-LS#9008 Changes for 7.7 Production Retroe
             1)14-FEB-2011 CITIUS-LS#7764, For past maturity commitment system is picking the component as shown in main interest comp as N which will not be correct for commitments as it create breaks between QMEMO and STAR		
             2)01-APR-2011 CITIUS-LS#8349, With contract ending as S1 added condition of hfs amount

04-OCT-2011 CITIUS-LS#11366 Added Retros from bangalore and UK 7.7.2
			1) 22-FEB-2011 Flexcube V.CL Release 7.9 LDR-LDRFAC feed changes
			2) 19-SEP-2011 --EURCITIPLC-LS#11369 Changes Introducing SMART MDW changes into this pacakge			
			3) 18-JUL-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07, ITR1 SFR#188 Changes - Declaring package level variable pkg_interface_region to hold the region (ASPAC/NAM)
25-OCT-2011 CITIUS-LS#11627 7.8 Changes related to generated adjustments feeds based on Fincon calender maintenance. 
28-OCT-2011 CITIUS-LS#11639 Changes related to generat adjustments feeds based on Fincon calender maintenance
07-NOV-2011 CITIUS-LS#11657 Expense code translation changes for CFPI contracts. This translation is required when we send the feed to any downstreams and in BO reports. If the contract belongs to CFPI then translate the contract level expense code with expense code from E-SALES for corresponding FIRMACCT(Which is internally contract level expense code).  Because of FIRMACCT is getting used as EXPENSE_CODE in flexcube, where as while generating the feeds and reports it should be translated to E-SALES expense code.
11-NOV-2011 CITIUS-LS#11733 Changes Fincon adjustment  calander changes
15-NOV-2011 CITIUS-LS#11754 Production Retroe Changes
	1)22-SEP-2011 CITIUS-LS#11426  Changes Introducing SMART MDW changes into this pacakge      
			19-SEP-2011 EURCITIPLC-LS#11369 Introducing SMART MDW changes which inherits the following as well
			17-AUG-2011 EURCITIPLC-LS#11186 MDW new changes and Changes to existing fields 
			12-SEP-2011 EURCITIPLC-LS#11323 Fixes for issues raised by MDW team
21 NOV 2011 CITIUS-LS#11797 Added missing UK changes
06-DEC-2011 Flexcube V.CL Release 7.10,FS Volume02 Tag16, Insurance and Tax Maintenance : Added function fn_pop_insurance_history and fn_pop_tax_history for maintaing history details.
07-MAR-2012 Flexcube V.CL Release 7.10, CITIUS Retro, TILL#12598 Changes - Added new procedure to identify batch box from where call is getting invoked.
03-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag12, Below Changes related to Recon Append Enhancement
			1. Added account number parameter to fn_get_recon_text
			2. Added two new function fn_get_instrument_code and fn_get_instrument_code.
18-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15477 Private Label - Interface related changes.
			As part of incoming CITI TGL, while populating gltb_citi_mismatch and gltb_citi_mismatch_month from gltb_citi_misbal, Flexcube to populate 001 instead of 01P branch.			
20-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15411 Jira 150080-7237 DBS feed enhancement changes.
15-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16560 (JIRA-150080-7648) -Recon Plus feed changes discrepancy with regards to Private label and Aspac branches.			
08-JUL-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16915 changes - following Fee component?, system is not sending either of the MDGL_BAL_CODE / MDGL_INC_CODE.
				?UPFRONTFE
				?LCSTDBYFE
				?ARANGEFEE
13-MAR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18536 1. BD3 is on holiday and fincon calendar is maintained. After entering the adjustments while doing soft close user is getting the balance mismatch error.				
25-MAR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18605 changes - pull back of CITIUS#18536
28-MAR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO EURCITIPLC#18660 CHANGES - put back of CITIUS#18536
27-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 RETRO CITIUS#19276 : Added new function fn_get_corp_code for corpcode translation in TGL feed and legal vehicle id translation in Genesis feed
*/

--15-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16560  Changes starts
TYPE tbl_udf_Vals IS TABLE OF VARCHAR2(2000)
INDEX BY VARCHAR2(30);

g_cache_tbl_udf_Vals		  tbl_udf_Vals;

FUNCTION fn_get_region_branch_list
(
p_region		VARCHAR2
)
RETURN VARCHAR2;
--15-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16560  Changes ends

FUNCTION fn_get_recon_text
	(
		p_ref		IN	oltbs_contract.contract_ref_no%TYPE,
		p_module	IN	oltbs_contract.module_code%TYPE,
		p_rel_cust	IN	oltbs_contract.counterparty%TYPE,
		p_adv_bat_trk	IN	VARCHAR2,
		p_amount_tag	IN	VARCHAR2,
		p_event_code	IN	VARCHAR2,
		p_user_temp	IN	VARCHAR2,
		p_event_sr_no	IN	VARCHAR2
		,p_ac_no	IN	VARCHAR2--Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag12
	)
RETURN VARCHAR2;

--Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag12 Starts
FUNCTION fn_get_instrument_code
	(
		p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	 	p_event_seq_no		IN 	oltbs_contract.latest_event_seq_no%TYPE,
	 	p_ac_no			IN	olvw_all_ac_entries.ac_no%TYPE
	)				
RETURN VARCHAR2;
FUNCTION fn_get_comm_loan_ref_no
(
	p_contract_ref_no	IN	VARCHAR2,
	p_module		IN	VARCHAR2,
	p_type			IN	VARCHAR2
)
RETURN VARCHAR2;
--Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag12 Ends
-- CITIUS-LS#7130 BEGIN
FUNCTION fn_get_funding_amount
	(
		p_ref		IN	oltbs_contract.contract_ref_no%TYPE
	)
RETURN NUMBER;
-- CITIUS-LS#7130 END
--CITIUS-LS#7355 start
FUNCTION fn_gen_rapid_file
	(p_event_date IN DATE --added date as input
	)
RETURN BOOLEAN;
--CITIUS-LS#7355 end
--CITIUS-LS#7412 START
function Fn_Facility_RAPID_ID
	(p_ref_no varchar2 , 
 p_branch varchar2 , 
	 p_prod_type varchar2 , 
 p_cust_no varchar2) 
RETURN varchar;
--CITIUS-LS#7412 END;


--04-OCT-2011 CITIUS-LS#11366 Changes starts
--22-FEB-2011 Flexcube V.CL Release 7.9 LDR-LDRFAC feed changes starts
FUNCTION  fn_cal_loan_os
(
 rec_ref 			IN 	oltbs_contract.contract_ref_no%TYPE,
 l_tot_loan_outstanding 	OUT	oltbs_contract_balance.principal_outstanding_bal%TYPE,
 l_commitment_availability	OUT	oltbs_contract_balance.principal_outstanding_bal%TYPE
 )
 RETURN BOOLEAN ;
 
FUNCTION fn_cal_lc_os
(	rec_ref 		IN	oltbs_contract.contract_ref_no%TYPE,
 	l_lc_outstd_fin		OUT	NUMBER,
	l_lc_outstd_perf	OUT	NUMBER,
	l_lc_outstd_stdby	OUT	NUMBER,
	l_lc_outstd_cmmr	OUT	NUMBER,
	l_lc_outstd_tot		OUT	NUMBER
)
RETURN BOOLEAN ;
--22-FEB-2011 Flexcube V.CL Release 7.9 LDR-LDRFAC feed changes ends
--04-OCT-2011 CITIUS-LS#11366 Changes ends

--14-DEC-2010 CITIUS-LS#7591 Changes
--CITIUS-LS#7575 start
PROCEDURE ifpr_000_smart_smartmdw
	(
		p_filename IN OUT VARCHAR2,
		p_errors 	IN OUT VARCHAR2,
		p_params 	IN OUT VARCHAR2,
		p_return 	   OUT INTEGER
	);
--CITIUS-LS#7575 end
--14-DEC-2010 CITIUS-LS#7591 Changes
--03-MAY-2011 CITIUS-LS#9008 Starts
--CITIUS-LS#7764 Starts
FUNCTION fn_get_interest_rate
(
	p_loan_no 	IN	VARCHAR2,
	p_product	IN	VARCHAR2,
	p_matdt		IN	DATE
)
RETURN NUMBER;
--CITIUS-LS#7764 Ends
--CITIUS-LS#8349 Start
FUNCTION fn_get_hfs_amount
(
	p_loan_no 	IN	VARCHAR2
)
RETURN NUMBER ;
--CITIUS-LS#8349 Ends
--03-MAY-2011 CITIUS-LS#9008 Ends

-- 15-NOV-2011 CITIUS-LS#11754 Production Retroe Change starts(CITIUS-LS#11426)
--EURCITIPLC-LS#11369 Changes start
PROCEDURE pr_smart_smartmdw(p_brn IN VARCHAR2,
				p_filename IN OUT VARCHAR2,
				p_errors   IN OUT VARCHAR2,
				p_params   IN OUT VARCHAR2,
				p_return   OUT INTEGER
				--21 NOV 2011 CITIUS-LS#11797 Changes starts
				,p_func_id  IN VARCHAR2 DEFAULT 'X'  --vijeth uk
				--21 NOV 2011 CITIUS-LS#11797 Changes ends
				);


--EURCITIPLC-LS#11369 Changes Ends
-- 15-NOV-2011 CITIUS-LS#11754 Production Retroe Change Ends(CITIUS-LS#11426)

--18-JUL-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07, ITR1 SFR#188 Changes, starts
pkg_interface_region	VARCHAR2(6);
FUNCTION fn_set_interface_region
(
	p_region 	IN	VARCHAR2
)
RETURN BOOLEAN ;
--18-JUL-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07, ITR1 SFR#188 Changes, ends
--26-JUL-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07, ITR2 SFR#4 Changes starts
FUNCTION fn_get_branch
	(p_branch_code 	IN 	oltms_branch.branch_code%TYPE)
RETURN VARCHAR2;
--26-JUL-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07, ITR2 SFR#4 Changes ends
--04-OCT-2011 CITIUS-LS#11366 Changes ends

--25-OCT-2011 CITIUS-LS#11627 Changes starts
FUNCTION fn_adj_hoff_precheck
										(
										p_branch_code				IN 	oltms_branch.branch_code%TYPE,
										p_user_id						IN		VARCHAR2,
										p_run_interface_flag			IN   NUMBER DEFAULT 0,
										p_result							IN OUT	VARCHAR2,									
										p_error_code					OUT VARCHAR2,
										p_error_param					OUT VARCHAR2,
										P_working_day				IN OUT VARCHAR2 --11-NOV-2011 CITIUS-LS#11733 Changes										
										)	
RETURN BOOLEAN;

PROCEDURE pr_reverse_manual_Adj (
												p_branch_code		IN		VARCHAR2,
												p_user_id				IN		VARCHAR2,
												p_result					IN OUT	VARCHAR2,
												p_error_code			IN OUT	VARCHAR2,
												p_error_parameter	IN OUT	VARCHAR2
										);
--25-OCT-2011 CITIUS-LS#11627 Changes ends

--28-OCT-2011 CITIUS-LS#11639 Chanegs starts
FUNCTION fn_get_interface_region
RETURN VARCHAR2 ;
--28-OCT-2011 CITIUS-LS#11639 Chanegs ends
--CITIUS-LS#11657 Starts
FUNCTION fn_get_exp_code
(
	p_exp_code	IN	VARCHAR2
)
RETURN VARCHAR2;
--CITIUS-LS#11657 Ends

--06-DEC-2011 Flexcube V.CL Release 7.10,FS Volume02 Tag16 changes starts
type ty_tb_ins_notes is table of oltms_ins_notes_master%rowtype index by binary_integer;
type ty_tb_ins_coverage is table of oltms_ins_coverage_master%rowtype index by binary_integer;

FUNCTION fn_pop_insurance_history
	(p_rec_ins_master	IN	oltms_insurance_master%ROWTYPE,
	 p_err_code		IN OUT  VARCHAR2)
RETURN BOOLEAN; 

FUNCTION fn_pop_tax_history 
	(p_rec_tax_master	IN	oltms_tax_master%ROWTYPE,
	 p_err_code		IN OUT	VARCHAR2)				
RETURN BOOLEAN;
--06-DEC-2011 Flexcube V.CL Release 7.10,FS Volume02 Tag16 changes ends

--07-MAR-2012 Flexcube V.CL Release 7.10, CITIUS Retro, TILL#12598 Changes starts
PROCEDURE pr_set_batch_box_indicator (p_batch_box_indicator	IN VARCHAR2);

FUNCTION fn_get_batch_box_indicator  RETURN VARCHAR2;
--07-MAR-2012 Flexcube V.CL Release 7.10, CITIUS Retro, TILL#12598 Changes ends
--20-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15411 Change start
FUNCTION fn_identify_fincon_adjust
(
	p_trn_ref_no			OLTB_DAILY_LOG_AC.trn_Ref_no%TYPE,
	p_event_sr_no		OLTB_DAILY_LOG_AC.event_sr_no%TYPE,
	p_event					OLTB_DAILY_LOG_AC.event%TYPE,
	p_trn_dt					OLTB_DAILY_LOG_AC.trn_Dt%TYPE,
	p_value_Dt				OLTB_DAILY_LOG_AC.value_dt%TYPE
)
RETURN VARCHAR2;
FUNCTION fn_get_max_fincon_Date (
												p_branch_code		oltm_branch.branch_code%TYPE	
												)	
RETURN DATE;

FUNCTION fn_get_sys_Date (
												p_branch_code		oltm_branch.branch_code%TYPE	
									   )	
RETURN DATE;
--20-DEC-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15411 Change end

--18-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15477 changes Starts
FUNCTION fn_private_label_brn_translate (p_branch_code VARCHAR2)
RETURN VARCHAR2;
--18-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15477 changes Ends
--08-JUL-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16915 changes starts
FUNCTION fn_get_mdgl_inc_cd
(
	p_branch		oltms_branch.branch_code%TYPE,
	p_ext_sys		oltbs_interface_param_if.external_system%TYPE,
	p_intf_code		oltbs_interface_param_if.interface_code%TYPE,
	p_param_type		oltbs_interface_param_if.param_type%TYPE,
	p_param_val		oltbs_interface_param_if.param_value%TYPE,
	p_rec_status		OLTB_CONTRACT.user_defined_status%TYPE,
	p_product_code		OLTB_CONTRACT.product_code%TYPE
)
RETURN VARCHAR2;
-- 08-JUL-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16915 changes ends
--13-MAR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18536 start
--25-MAR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18605 changes starts
--28-MAR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO EURCITIPLC#18660 start uncommented below function
 FUNCTION fn_adj_bal_upd
 (
 	p_error_code	OUT 		VARCHAR2,
 	p_error_param	OUT 		VARCHAR2
 )
 RETURN BOOLEAN;
--28-MAR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO EURCITIPLC#18660 Ends
--25-MAR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18605 changes ends
--13-MAR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#18536 end
--19-SEP-2014 CITIUS#19276, starts
FUNCTION fn_get_corp_code
(
        p_in_corp_code  IN      VARCHAR2
        
)
RETURN VARCHAR2;
--19-SEP-2014 CITIUS#19276, ends
END olpks_interface;
/