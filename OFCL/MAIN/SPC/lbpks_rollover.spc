CREATE OR REPLACE PACKAGE lbpks_rollover
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_rollover.SPC
**
** Module	: LD/LS
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
/* CHANGE_HISTORY
   27-FEB-2003 FCC 4.2 APR 2003 RELEASE LS CHANGES FOR LOAN SYNDICATION
 					  ADDED THIS NEW SPC FOR CONSOLIDATED ROLLOVER
   17-APR-2006  FLEXCUBE V.CL Release 7.0 Rollover Changes by Sambhaji
                New Functions specifications added
                fn_roll_a_contract_over, fn_undo_rollover,
   27-APR-2006  FLEXCUBE V.CL Release 7.0 Rollover Changes by Sambhaji
                Procedure pr_update_exceptions added.
   14-AUG-2006  FLEXCUBE V.CL Release 7.1 Changes for Rollover advices, by mgk
                Included function fn_fire_roll_events, fn_participant_propagation, fn_reverse_roll_instructions, fn_gen_roll_msgs, Fn_suppress_roll_adv
                ,fn_authorise_roll_instructions.
   28-JUN-2007 FCC V.CL Release 7.3 rollover site retro changes (18-DEC-2006 CITIUS-LS#589 ARUN, CHANGES, Created pr_pop_rollover_log procedure and Fn_process_failed_contracts function)
   04-JUL-2007 FCC V.CL Release 7.3 rollover site retro changes (08-SEP-2006.CITIUS-LS#77 Rollover related changes
   								 02-JAN-2007 FCC7.1 CITIUS-LS by VB, Till#228: Compilation Errors Fixed
   								)
   18-JUL-2007 FCC V.CL Release 7.3 rollover capture changes by Vijay Sivasubramanian.
   18-JUL-2007 FCC V.CL Release 7.3 ROLLOVER changes , Maneeha added an overload function fn_rollover_batch.

   04-JUL-2007	--FCC V.CL Release 7.3 Rollover changes
			Added a new function specification for Function fn_roll_a_contract_over_wrap to do the rollover processing online as well as in batch.
			declared the global variable gonline_roll_processing, whose value is used to do the processing only for CHILD or PARENT or BOTH.
28-SEP-2007	FCC V.CL Release 7.3 Rollover Changes September '07
21-OCT-2007 FLEXCUBE V.CL Release 7.3 ITR1 SFR#14, 21-OCT-2007
12-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#4,Retro Changes CITIUS-LS-801,Passed p_seq_no in fn_rollover_batch.
sachin changes for link-dlnk enhancement
14-MAR-2008 FCC V.CL Release 7.4 BAU Thirdparty Fax changes SFR#100 , added new parameter in fn_roll_part_processing
28-APR-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-<1038>, Rollover Log and Reprocessing
30-APR-2008 Flexcube V.CL Release 7.4 Payrecv changes for rollover/reprice
	    New global variable introduced to identify if the process in progress is rollover/reprice.
11-JUN-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-<1043> by Ankit, Investor-Borrower Mismatch, new form and rollover propagation
06-NOV-2008 CITIUS-LS#SRT1451 CITIUS#801,STP Consolidation,By Swapnasish,To do the renewal process during batch in multiple background process because of the
		                  volume of renewals during quarter end
		                  Jun-2007, Rollover Job changes
31-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#<140>, rollover linkage BAU changes,
		In STP, This requirement is to populate the LS and their corresponding LD references for the repriced
		(split/merge) or rolled over (normal/split/consol) DD contracts.

12-MAR-2009 FCC V.CL Release 7.5  CITIUS RETRO CITIUS-LS#5390 CHANGES, Resend third party faxes related changes.
20-MAR-2009 FLEXCUBE V.CL Release 7.5 lot1 ITR1 SFR#11 RETRO#5363,Created new function FN_RESET_GLOBAL_USERID in lbpks_rollover to reset the user id.
11-NOV-2009 FLEXCUBE V.CL Release 7.5 LOT1.2 FS Tag 9.0 changes Sighting Funds changes for Rollover with Increase
15-Mar-2010 FLEXCUBE V.CL Release 7.6 FS Tag04 Participant Netting Changes
15-JUN-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag06,FPML Messaging for Markit Integration changes,Added a gloab variable in order to differentiate whether its a child contract or parent for generating the FPML message
18-APR-2018 LS14.1 ECA changes --Logged records into ECA table for DDA processing

  **Changed By         : Ranjan Kumar
  **Change Description : amount calc for limit taracking for child contract 
  **Search String      : 14.1_SUP_EL_BLOCK_REF_CHANGES
  
  Changed By         : Sowmya Bitra
  Changed On         : 07-June-2021
  Search String      : Bug#32949409 changes
  Change Reason      : Changes made to consider Account level ECA flag also for ECA status check during authorization of consol rollover
  
  Changed By         : Arunprasath
  Changed On         : 20-Jul-2021
  Search String      : OBCL_14.5_Consol_Roll
  Change Reason      : Added g_Roll_Contract_rfr flag for SOFR RFR change
  
  **  Changed By         : Abhik Das
  **  Changed On         : 10-May-2022
  **  Change Description : Changing auto rollover process to java
  **  Search String      : OBCL_14.5_Support_Bug#34068364_Changes

  **  Changed By         : Abhinav Bhasker
  **  Changed On         : 14-Sep-2022
  **  Change Description : To enable Async job for Fwd dated Split Roll
  **  Search String      : Bug#34569479
  
  **  Changed By         : Abhik Das
  **  Changed On         : 27-Oct-2022
  **  Change Description : To process process_ref_no for ECA from java to update 
                           liquidation status in oltb_eca_req_master table to 
                           prevent error during auto rollover due to failure during ECA check
  **  Search String      : OBCL_14.6_Support_Bug#34723675_Changes
  
  **  Changed By         : Vineeth T M
  **  Changed On         : 31-Jul-2023
  **  Change Description : enabling eca for all components - charge related changes for rollover/reprice
  **  Search String      : OBCL_14.8_ECA_1_Changes

*/

g_ls_elcm_blockref_skip_flag  VARCHAR2(1):='N'; --14.1_SUP_EL_BLOCK_REF_CHANGES
g_rollover_case  VARCHAR2(1):='N'; -- facility borrower limit changes
g_roll_eca_auth_check VARCHAR2(1) := 'N';   --Bug#32949409 changes
g_roll_eca_auth_reqd VARCHAR2(1) := 'N';   --Bug#32949409 changes
g_rfr_roll_async_reqd VARCHAR2(1) := 'N'; --Bug#34569479
FUNCTION fn_create_new_version(p_contract_ref_no varchar2)
RETURN BOOLEAN;

FUNCTION fn_delete(p_contract_ref_no    	 IN     OLTB_CONTRACT.contract_ref_no%TYPE,
			 p_action			 IN     VARCHAR2,
			 p_counterparty       	 IN     VARCHAR2,
			 p_latest_event_seq_no	 IN     NUMBER,
			 p_err_code    		 IN OUT VARCHAR2,
			 p_err_params      	 IN OUT VARCHAR2 )
RETURN BOOLEAN;
-- 12-MAR-2009 FCC V.CL Release 7.5  CITIUS RETRO CITIUS-LS#5390 CHANGES, BEGIN (Moved Fn_insert_msg_hoff and Fn_adv_gen from lspkroll.sql)
-- 04-JUL-2007 FCC V.CL Release 7.3 rollover site retro changes (CITIUS-LS#364) Starts
FUNCTION Fn_insert_msg_hoff
	  (
      pcontractrefno          IN       oltbs_contract.contract_ref_no%TYPE,
      peventseqno             IN       oltbs_contract_event_advice.event_seq_no%TYPE,
      peventcode              IN       oltms_product_event_advice.event_code%TYPE,
      paction                 IN       CHAR,  -- (I)nput, (A)uthorize, (B)atch
      pprocessingdate         IN       DATE,
      pborrrefno			  IN       oltbs_contract.contract_ref_no%TYPE,
      p_split_no			  IN       NUMBER,
      p_borr_esn			  IN	   NUMBER,
      perrorcode              OUT      ertbs_msgs.err_code%TYPE
	  )
RETURN BOOLEAN;

FUNCTION Fn_adv_gen(  p_contract_ref_no IN 		varchar2,
                      p_esn             IN 		number,
                      p_module			IN      varchar2,	--CITIUS-LS#496--CITIUS-LS#SRT1451
                      P_borr_ref_no		IN      varchar2,	--CITIUS-LS#496--CITIUS-LS#SRT1451
                      p_process			IN      varchar2,	--CITIUS-LS#496--CITIUS-LS#SRT1451
                      p_err_code        IN OUT 	varchar2,
                      p_err_params      IN OUT 	varchar2
                      )
RETURN BOOLEAN;
-- 04-JUL-2007 FCC V.CL Release 7.3 rollover site retro changes (CITIUS-LS#364) Ends
-- 12-MAR-2009 FCC V.CL Release 7.5  CITIUS RETRO CITIUS-LS#5390 CHANGES, END
--FCC V.CL Release 7.3 Rollover changes starts
Function fn_insert_upld_amend_due
				(
				p_contract_ref_no	IN	varchar2,
				p_dd_ref_no	IN	varchar2,--FLEXCUBE V.CL Release 7.3 ITR1 SFR#14, 21-OCT-2007
				P_differential_amt	IN	oltbs_contract_split_rollover.max_roll_amount%type,
				p_error_code		IN OUT	VARCHAR2,--FLEXCUBE V.CL Release 7.1 sachin_bkn changes
				p_error_parameter	IN OUT	VARCHAR2--FLEXCUBE V.CL Release 7.1 sachin_bkn changes
				)
Return BOOLEAN;

Function Fn_Fire_VAMI_for_split
				(
				p_contract_ref_no	IN	varchar2,
				p_error_code		IN OUT	VARCHAR2,
				p_error_parameter	IN OUT	VARCHAR2
				)
Return BOOLEAN;

Function Fn_Fire_VAMB_for_split
				(
				p_contract_ref_no	IN	varchar2,
				P_differential_amt	IN	oltbs_contract_split_rollover.max_roll_amount%type,  --not required
				p_error_code		IN OUT	VARCHAR2,
				p_error_parameter	IN OUT	VARCHAR2
				)
Return BOOLEAN;



FUNCTION fn_fwd_init_for_rollcontracts
(
	P_CONTRACT_REF_NO		IN	oltbs_contract.contract_ref_no%TYPE,
  p_module		IN	oltbs_contract.module_code%TYPE,
	p_err_code		IN OUT	VARCHAR2,
	p_params		IN OUT	VARCHAR2
	)RETURN BOOLEAN;


Function fn_roll_a_contract_over_wrap
         (p_contract_ref_no	IN 	oltbs_contract.contract_ref_no%TYPE,
          p_processing_date	IN	date,
          p_auth_status		IN	oltbs_contract.auth_status%TYPE, --'A'
	  p_roll_flag		IN	VARCHAR2,	--'CHILD','PARENT','BOTH'
          p_error_code	IN OUT	VARCHAR2,
          p_error_param	IN OUT	VARCHAR2)
RETURN BOOLEAN;
--FCC V.CL Release 7.3 Rollover changes ends


FUNCTION fn_roll_a_contract_over
	(
 	p_contract_ref_no	IN 	oltbs_contract.contract_ref_no%TYPE,
	p_processing_date	IN	date,
	p_authorization_status	IN	oltbs_contract.auth_status%TYPE,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

-------------------------------------------------------------------------------
-- Start, FLEXCUBE V.CL Release 7.0 Rollover Changes by Manjula on 23-MAR-2006
FUNCTION fn_undo_rollover
	(
 	p_contract_ref_no	IN 	oltbs_contract.contract_ref_no%TYPE,
	p_version_no	IN	oltbs_contract_master.version_no%TYPE
	)
	RETURN boolean;
-------------------------------------------------------------------------------
-- End, FLEXCUBE V.CL Release 7.0 Rollover Changes by Manjula on 23-MAR-2006
/* -- comment starts, FLEXCUBE V.CL Release 7.0 Rollover Changes by Manjula on 11-APR-2006
TYPE contract_struct IS  RECORD
	(
	module					oltbs_contract.module_code%TYPE,
	product					oltbs_contract.product_code%TYPE,
	product_type			oltbs_contract.product_type%TYPE,
	latest_event_seq_no		oltbs_contract.latest_event_seq_no%TYPE,
	latest_version_no		oltbs_contract.latest_version_no%TYPE,
	contract_status			oltbs_contract.contract_status%TYPE,
	user_defined_status		oltbs_contract.user_defined_status%TYPE,
	customer				oltbs_contract.counterparty%TYPE,
	contract_ccy			oltbs_contract.contract_ccy%TYPE,
	contract_amount			oltbs_contract_master.amount%TYPE,
	cluster_size			oltbs_contract_master.cluster_size%TYPE,
	value_date				oltbs_contract_master.value_date%TYPE,
	maturity_type			oltbs_contract_master.maturity_type%TYPE,
	maturity_date			oltbs_contract_master.maturity_date%TYPE,
	credit_line				oltbs_contract_master.credit_line%TYPE,
	payment_method			oltbs_contract_master.payment_method%TYPE,
	rollover_allowed		oltbs_contract_master.rollover_allowed%TYPE,
	default_sett_ac_br		oltbs_contract_master.dflt_settle_ac_branch%TYPE,
	default_sett_ac_no		oltbs_contract_master.dflt_settle_ac%TYPE,
	--
	--FCC 4.2 OPS focus testing SFR 157 changes start
	--
	lcy_amount				oltbs_contract_master.lcy_amount%TYPE,
	booking_date			oltbs_contract_master.booking_date%TYPE,
	--
	--FCC 4.2 OPS focus testing SFR 157 changes end
	--
	primary_iccf			oltbs_contract_master.main_comp%TYPE,
	primary_iccf_ccy		oltbs_contract_iccf_details.component_currency%TYPE,
	schedule_type			oltbs_contract_preference.contract_schedule_type%TYPE,
	amortization_type		oltbs_contract_preference.amortisation_type%TYPE,
	withhold_tax_on_capit	oltbs_contract_preference.deduct_tax_on_capitalisation%TYPE,
	verify_funds			oltbs_contract_preference.verify_funds%TYPE,
	mode_of_rollover		oltbs_contract_rollover.rollover_type%TYPE,
	roll_overdue_schedules	char(1),
	--max_principal_roll_amt	oltbs_contract_rollover.rollover_amt%TYPE,
	special_amount			oltbs_contract_rollover.rollover_amt%TYPE,--FCC 4.0 june 02 Rollover Changes
	roll_amount_type		oltbs_contract_rollover.rollover_amount_type%TYPE,
	roll_maturity_type		oltbs_contract_rollover.maturity_type%TYPE,
	roll_maturity_date		oltbs_contract_rollover.maturity_date%TYPE,
	roll_notice_days		oltbs_contract_rollover.notice_days%TYPE,
	charge_on_roll_amt		oltbs_contract_rollover.apply_charge%TYPE,
	tax_on_roll_amt			oltbs_contract_rollover.apply_tax%TYPE,
	limit_roll_basis		char(3),
	interest_roll_basis		oltbs_contract_rollover.rollover_iccf_from%TYPE,
	schedule_roll_basis		oltbs_contract_rollover.schedule_definition_basis%TYPE,
	treat_spl_amt_as		oltbs_contract_rollover.treat_spl_amt_as%TYPE,--FCC 4.0 june 02 Rollover Changes
	new_components_allowed	oltbs_contract_rollover.new_components_allowed%TYPE,--FCC 4.0 june 02 Rollover Changes
	new_refinancing_rate	oltbs_class_mapping.ref_rate%TYPE, --FCC 4.0 june 02 Rollover Changes
	installment_loan		oltbs_contract_preference.installment_loan%TYPE,  ---FCC 4.0 June 2002 changes
	roll_by					oltbs_contract_rollover.schedule_definition_basis%TYPE, -- FCC4.3 Feb 2003 ASPAC TIL #2015 Roll_by added.
	maturity_days		 	oltbs_contract_rollover.maturity_days%TYPE, 	--FCC4.2 APR 2003 CITIPLC change for Rollover
	roll_mechanism			oltbs_contract_master.rollover_mechanism%TYPE,  --FCC4.2 APR 2003 CITIPLC change for Rollover
	roll_method				oltbs_contract_master.rollover_method%TYPE,   	--FCC4.2 APR 2003 CITIPLC change for Rollover
	limit_track_reqd	 	oltbs_contract_master.limit_track_reqd%type,	--FCC 4.3 AUG 2003 MM Module changes..
	cluster_id				oltbs_contract_master.cluster_id%TYPE		--FCC 4.3 Added for rollover related changes
	,principal_outstanding_bal	oltbs_contract_balance.principal_outstanding_bal%TYPE --FCC 4.4 DEC 2003 RETRO CITIPLC SFR#PLC43050031
	);

TYPE product_struct IS  RECORD
	(
	product_end_date		oltms_product.product_end_date%TYPE,
	track_accrued_interest	oltms_product_master_ld.track_accrued_interest%TYPE,
	tax_computation_basis	oltms_branch_parameters.tax_computation_basis%TYPE
	, tax_applicable	oltms_product_master_ld.tax_applicable%TYPE		-- FCC 4.6 Sep04 Retro (India) Tax Deduction on Over Night Deposits
	, tax_type		oltms_product_master_ld.tax_type%TYPE			-- FCC 4.6 Sep04 Retro (India) Tax Deduction on Over Night Deposits
	, allow_withholding_tax	oltms_branch_parameters.allow_withholding_tax%TYPE	-- FCC 4.6 Sep04 Retro (India) Tax Deduction on Over Night Deposits - ITR1 SFR 154
	);

TYPE amount_struct IS RECORD
	(
	principal_roll_amt		oltbs_amount_due_cs.amount_due%TYPE,
	principal_liqd_amt		oltbs_amount_due_cs.amount_due%TYPE,
	interest_roll_amt		oltbs_amount_due_cs.amount_due%TYPE,
	interest_liqd_amt		oltbs_amount_due_cs.amount_due%TYPE,
	withholding_tax			oltbs_amount_due_cs.amount_due%TYPE,
	rollover_amount			oltbs_amount_due_cs.amount_due%TYPE,
	additional_principal_amt oltbs_amount_due_cs.amount_due%TYPE,	--FCC 4.0 june 02 Rollover changes
	----FCC 4.6 Sep04 Retro (India) Tide changes start
	tax_roll_amt		oltbs_amount_due_cs.amount_due%TYPE,
	tax_liqd_amt		oltbs_amount_due_cs.amount_due%TYPE
	--FCC 4.6 Sep04 Retro (India) Tide changes end
	);
*/ -- Comment ends, FLEXCUBE V.CL Release 7.0 Rollover Changes by Manjula on 11-APR-2006

TYPE verify_funds_struct IS RECORD
	(
	acc_br					oltbs_handoff.ac_branch%TYPE,
	acc_no					oltbs_handoff.ac_no%TYPE,
	acc_ccy					oltbs_handoff.ac_ccy%TYPE,
	total_net_debit			oltbs_handoff.fcy_amount%TYPE
	);

TYPE verify_funds_table IS TABLE OF verify_funds_struct
						INDEX BY BINARY_INTEGER;

--31-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#<140>, rollover linkage BAU changes start here

TYPE			ty_roll_link
IS TABLE OF		lbtbs_contract_roll_linkages%ROWTYPE
INDEX BY		BINARY_INTEGER;

--31-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#<140>, rollover linkage BAU changes end here


-------------------------------------------------------------------------------

	g_halt_on_error			EXCEPTION;

	g_halt_error_code		VARCHAR2(1000) := NULL;
	g_halt_error_parameter		VARCHAR2(1000) := NULL;
gonline_roll_processing CHAR(6) ; --FCC V.CL Release 7.3 Rollover changes
gdlnk_indicator CHAR(1) ; --sachin changes for link-dlnk enhancement

	g_renewal_process		VARCHAR2(1); --Flexcube V.CL Release 7.4 Payrecv changes for rollover/reprice
	g_roll_repr_contract		VARCHAR2(1) := 'N';--15-JUN-2011 Flexcube V.CL Release 7.9,FS Volume02 Tag06,FPML Messaging for Markit Integration changes
-------------------------------------------------------------------------------

--FLEXCUBE V.CL Release 7.0 Rollover Changes by Sambhaji start
PROCEDURE pr_update_exceptions
   (
      pexceplist        IN   VARCHAR2,
      pexcepparamlist   IN   VARCHAR2,
      pcontractrefno    oltbs_contract.contract_ref_no%type
   );

--FLEXCUBE V.CL Release 7.0 Rollover Changes by Sambhaji end
-- FLEXCUBE V.CL Release 7.1 Changes for Rollover advices, by mgk start
FUNCTION fn_fire_roll_events
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_borrow_ref_no		IN	oltbs_contract.contract_ref_no%TYPE,
	p_participant_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_module		IN	oltbs_contract.module_code%TYPE,
	p_counterparty		IN	oltbs_contract_master.counterparty%TYPE,
	p_maturity_date		IN	DATE,
	p_roll_method   IN oltbs_contract_master.rollover_method%type,
	p_ccy_code		IN	oltbs_contract.contract_ccy%TYPE,
	p_split_no		IN	oltbs_contract_split_rollover.split_no%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_participant_propagation
	(
	pContractRefNo		IN	oltbs_contract.contract_ref_no%TYPE,
	p_version_no		IN	oltbs_contract.latest_version_no%TYPE,
	p_counterparty		IN	oltbs_contract_master.counterparty%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_reverse_roll_instructions
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_gen_roll_msgs
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_authorise_roll_instructions
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_suppress_roll_adv
     (
       p_temp_child_ref_no  IN oltbs_contract_rollover.contract_ref_no%type,
       p_cube_ref_no IN oltbs_contract.contract_ref_no%type,
       p_borr_or_part IN varchar2
     )
RETURN BOOLEAN;

-- 04-JUL-2007 FCC V.CL Release 7.3 rollover site retro changes (CITIUS-LS#77) Starts
FUNCTION Fn_roll_part_processing(p_contract_ref_no 	  oltbs_contract.contract_ref_no%TYPE,
				 p_latest_esn	   	  oltbs_contract.Latest_event_seq_no%TYPE,	--CAMD event sequence no
				 p_renewal_type		  lbtbs_drawdown_schedule.renewal_type%TYPE,  --FCC V.CL Release 7.4 BAU Thirdparty Fax changes SFR#100
				 p_err_code	   IN OUT Varchar2,
				 p_err_param   IN OUT Varchar2
				 )
RETURN BOOLEAN;

FUNCTION Fn_roll_borr_processing(p_contract_ref_no 	  oltbs_contract.contract_ref_no%TYPE,
				 p_latest_esn	   	  oltbs_contract.Latest_event_seq_no%TYPE,
				 p_version_no		  oltbs_contract.Latest_version_no%TYPE,
				 p_err_code	   IN OUT Varchar2,
				 p_err_param   IN OUT Varchar2
				 )
RETURN BOOLEAN;

FUNCTION Fn_update_roll_esn	( p_contract_ref_no 	   oltbs_contract.contract_ref_no%TYPE,
				  p_event_seq_no		   Number,
				  p_version_no			   Number,
				  p_err_code	   	IN OUT Varchar2,
				  p_err_param   	IN OUT Varchar2
				  )
RETURN BOOLEAN;
-- 04-JUL-2007 FCC V.CL Release 7.3 rollover site retro changes (CITIUS-LS#77) Ends

-- FLEXCUBE V.CL Release 7.1 Changes for Rollover advices, by mgk end

-- 28-JUN-2007 FCC V.CL Release 7.3 rollover site retro changes Starts, To Populate lbtb_rollover_log, when Rollover Failed as part of Batch
--To reprocess ATUTLIQD process for rollover Failed contracts.
PROCEDURE pr_pop_rollover_log
        (
                pContractRefNo          oltbs_contract.CONTRACT_REF_NO%TYPE,
                pRollovertype		VARCHAR2 DEFAULT 'ROLLOVER',	--FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-<1038>, Rollover Log and Reprocessing
		pSplitno		NUMBER 	 DEFAULT 0,		--FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-<1038>, Rollover Log and Reprocessing
                pOperation              VARCHAR2,
                PProcessingDate         DATE,
                pProcessStatus          lbtbs_rollover_log.PROCESS_STATUS%TYPE
        );
-- 28-JUN-2007 FCC V.CL Release 7.3 rollover site retro changes Ends, To Populate lbtb_rollover_log, when Rollover Failed as part of Batch
--To reprocess ATUTLIQD process for rollover Failed contracts.

-- 18-JUL-2007 FCC V.CL Release 7.3 rollover capture changes Starts, by Vijay
FUNCTION Fn_Popup_Partial_Rollover(
                                   p_parent_ref_no IN oltbs_contract.CONTRACT_REF_NO%TYPE,
                                   p_dummy_ref_no IN oltbs_contract.CONTRACT_REF_NO%TYPE,
                                   p_err_code     IN OUT Varchar2,
                                   p_err_param    IN OUT Varchar2
                                   )
RETURN BOOLEAN;
-- 18-JUL-2007 FCC V.CL Release 7.3 rollover capture changes Ends, by Vijay

--18-JUL-2007, FCC V.CL Release 7.3 ROLLOVER changes, Maneeha starts
FUNCTION fn_rollover_batch
		   (p_Contract_Ref_No IN OLTB_CONTRACT.contract_ref_no%TYPE,--OBCL_14.5_Support_Bug#34068364_Changes
		   p_seq_no	          IN NUMBER,--12-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#4,Retro Changes CITIUS-LS-801
		   p_branch		  IN oltms_branch.branch_code%Type,
		    p_processing_date	  IN DATE,
                    p_product		  IN oltbs_contract.product_code%TYPE,
			---OBCL_14.6_Support_Bug#34723675_Changes Starts---
            p_Eca_Check_Required IN VARCHAR2,
            p_Eca_Ref_No         IN VARCHAR2,
            ----OBCL_14.6_Support_Bug#34723675_Changes Ends----
		    p_commit_frequency	  IN oltbs_automatic_process_master.bod_commit_count%TYPE,
		    p_error_code 	  IN OUT NOCOPY VARCHAR2,
                    p_error_parameter 	  IN OUT NOCOPY VARCHAR2
            ---OBCL_14.5_Support_Bug#34068364_Changes Starts---
			,p_user_id          IN VARCHAR2
			,p_Elcm_Msgid      OUT Sypks_Utils.g_Elcm_Msgid%TYPE
			,p_rfr_Msgid       OUT Sypks_Utils.g_rfr_Msgid%TYPE
			----OBCL_14.5_Support_Bug#34068364_Changes Ends----
				   )
---OBCL_14.5_Support_Bug#34068364_Changes Starts---
--RETURN BOOLEAN;--commented
RETURN VARCHAR2;
----OBCL_14.5_Support_Bug#34068364_Changes Ends----
--18-JUL-2007, FCC V.CL Release 7.3 ROLLOVER changes, Maneeha ends

-- 28-JUN-2007 FCC V.CL Release 7.3 rollover site retro changes Starts, To reprocess ATUTLIQD process for rollover Failed contracts.
FUNCTION Fn_process_failed_contracts(
          p_record_selection     IN     VARCHAR2,
          p_contract_ref_no      IN     oltbs_contract.contract_ref_no%TYPE,
          p_split_no		 IN	NUMBER 	 DEFAULT 0,		--FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-<1038>, Rollover Log and Reprocessing
	  p_rollover_type	 IN	VARCHAR2 DEFAULT 'ROLLOVER',	--FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-<1038>, Rollover Log and Reprocessing
          p_user_id              IN     VARCHAR2 DEFAULT 'SYSTEM', --VB added for CITIUS-LS on 02-JAN-2007, Till#228
          --p_processing_date      IN     DATE,
                                  p_err_code                   IN OUT Varchar2,
                                  p_err_param                  IN OUT Varchar2
                                  )
RETURN BOOLEAN;
-- 28-JUN-2007 FCC V.CL Release 7.3 rollover site retro changes Ends, To reprocess ATUTLIQD process for rollover Failed contracts.
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS#801 Start By Swapnasish
-- CITIUS#801 BEGIN
-- Jun-2007, Rollover Job changes starts
FUNCTION Fn_job_rollover_wrp(p_seq_no		IN oltbs_contract.contract_ref_no%type,
			     p_processing_date	IN DATE,
			     pErrorCode		IN OUT VARCHAR2,
			     pErrorParam	IN OUT VARCHAR2)
RETURN BOOLEAN;
-- Jun-2007, Rollover Job changes ends
-- CITIUS#801 END
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS#801 End By Swapnasish
--24-SEP-2007 FCC V.CL Release 7.3 Rollover Changes September '07 starts
Function fn_delete_roll_upload_tables
			(p_CONTRACT_REF_NO	in		oltbs_upload_master.ext_contract_ref_no%type,
                               p_BRANCH			in		oltbs_upload_master.branch%type,
                               p_SOURCE_CODE		in		oltbs_upload_master.source_code%type,
                               p_error_code			IN	OUT	Varchar2,
                               p_error_parameter		IN	OUT	Varchar2)
RETURN BOOLEAN ;
--24-SEP-2007 FCC V.CL Release 7.3 Rollover Changes September '07 ends

--sachin changes for link-dlnk enhancement starts
	Function fn_dlnk_during_roll
			(p_contract_ref_no		IN	oltbs_contract.contract_ref_no%TYPE,
			P_SERIAL_NO		IN	NUMBER DEFAULT 1,
			p_processing_date		IN	DATE,
			p_process_code		IN	VARCHAR2,
			p_error_code			IN	OUT	VARCHAR2,
			p_error_parameter		IN	OUT	VARCHAR2
			)
	RETURN BOOLEAN;
--sachin changes for link-dlnk enhancement ends

--FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-<1043> Starts--
PROCEDURE pr_prop_tolerance_amt
			(	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE
			,	p_ref_contract		IN	oltbs_contract.contract_ref_no%TYPE
			);
--FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-<1043> ends--

--31-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#<140>, rollover linkage BAU changes start here
FUNCTION fn_pop_roll_linkages
			(
			  p_tb_roll_link	IN	ty_roll_link
			, p_err_code		IN OUT	VARCHAR2
			, p_err_param		IN OUT	VARCHAR2
			)
RETURN	BOOLEAN;
--31-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#<140>, rollover linkage BAU changes end here
--20-MAR-2009 FLEXCUBE V.CL Release 7.5 lot1 ITR1 SFR#11 RETRO#5363 START
  Function FN_RESET_GLOBAL_USERID
  			(
  			P_BRANCH 	IN 	oltms_branch.BRANCH_CODE%TYPE,
  			P_USERID 	IN OUT 	VARCHAR2
  			)
  RETURN BOOLEAN;
--20-MAR-2009 FLEXCUBE V.CL Release 7.5 lot1 ITR1 SFR#11 RETRO#5363 END

--11-NOV-2009 FLEXCUBE V.CL Release 7.5 LOT1.2 FS Tag 9.0 changes starts
FUNCTION fn_populate_new_split_comps
	(
		 p_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE
		,p_version_no		IN oltbs_contract_roll_int_rates.version_no%TYPE
		,p_old_split_no		IN oltbs_contract_roll_int_rates.split_no%TYPE
		,p_new_split_no		IN oltbs_contract_roll_int_rates.split_no%TYPE
		,p_err_code		IN OUT VARCHAR2
		,p_err_param		IN OUT VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_get_default_fronting
	(
		p_parent_ref_no		IN oltbs_contract.contract_ref_no%TYPE
		,p_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE
		,p_default_fronting	OUT VARCHAR2
		,p_err_code		IN OUT VARCHAR2
		,p_err_param		IN OUT VARCHAR2
	)
RETURN BOOLEAN;
--11-NOV-2009 FLEXCUBE V.CL Release 7.5 LOT1.2 FS Tag 9.0 changes ends

-- 15-Mar-2010 FLEXCUBE V.CL Release 7.6 FS Tag04 Participant Netting Changes Starts
FUNCTION fn_process_rnet(
			    p_contract_ref_no IN oltbs_contract.contract_ref_no%type,
			    p_processing_date IN DATE,
			    p_sgen_amount     IN oltbs_contract_master.amount%TYPE,
			    p_error_code IN OUT VARCHAR2,
			    p_error_parameter IN OUT VARCHAR2
			   )
RETURN BOOLEAN;
-- 15-Mar-2010 FLEXCUBE V.CL Release 7.6 FS Tag04 Participant Netting Changes ends

--27-MAY-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag09,Automatic Rate Setting changes start
FUNCTION fn_populate_roll_events
	(
	p_branch_code		IN	oltbs_contract.branch%TYPE,
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_BorrRefno			IN  oltbs_contract.contract_ref_no%TYPE,
	p_counterparty		IN	oltbs_contract_master.counterparty%TYPE,
	p_event_code		IN	oltbs_contract.curr_event_code%TYPE,
	p_module			IN	oltbs_contract.module_code%TYPE,
	p_ccy_code			IN	oltbs_contract.contract_ccy%TYPE,
	p_maturity_date		IN	DATE,
	p_roll_method		IN oltbs_contract_master.rollover_method%type,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
  return boolean;
--27-MAY-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag09,Automatic Rate Setting changes end

---OBCL_14.5_Support_Bug#34068364_Changes Starts---
FUNCTION Fn_Compute_Eca_For_Rollover_Wrapper
  (
    p_contract_ref_no       IN    oltbs_contract.contract_ref_no%TYPE,
    p_processing_date       IN    DATE,
    p_authorization_status  IN    oltbs_contract.auth_status%TYPE,
    p_Eca_Ref_No            OUT VARCHAR2,
    p_error_code            IN OUT    VARCHAR2,
    p_error_parameter       IN OUT    VARCHAR2
  )
RETURN VARCHAR2;
----OBCL_14.5_Support_Bug#34068364_Changes Ends----

--LS14.1 Changes starts
FUNCTION Fn_Compute_Eca_For_Rollover
	(
		p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
		p_processing_date	IN		DATE,
		p_authorization_status	IN		oltbs_contract.auth_status%TYPE,
    p_Eca_Ref_No           OUT VARCHAR2,
		p_error_code		IN OUT		VARCHAR2,
		p_error_parameter	IN OUT		VARCHAR2,
    p_consol_roll_sim      boolean DEFAULT false --OBCL_14.8_ECA_1_Changes
	)
	RETURN BOOLEAN;
--LS14.1 Chnages ends
--14.1_SUP_EL_BLOCK_REF_CHANGES start
FUNCTION fn_update_limit_utilization
	(
	p_contract_ref_no	IN 	oltbs_contract.contract_ref_no%TYPE,
	p_processing_date	IN	DATE,
	p_authorization_status	IN	oltbs_contract.auth_status%TYPE,
	cs			IN	olpkss_rollover.contract_struct,
	p_current_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE,
	p_new_maturity_date	IN	DATE,
	amt					in		olpkss_rollover.amount_struct,
   p_component 		in VARCHAR2,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter	IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;
--14.1_SUP_EL_BLOCK_REF_CHANGES end
  g_Roll_Contract_rfr VARCHAR2(1); --OBCL_14.5_Consol_Roll
END lbpks_rollover;
/
CREATE or replace SYNONYM lbpkss_rollover FOR lbpks_rollover
/