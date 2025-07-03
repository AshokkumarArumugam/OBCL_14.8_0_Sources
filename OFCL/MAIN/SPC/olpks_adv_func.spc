create or replace package olpks_adv_func is
/*---------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_adv_func.SPC
  ** Module     : LOANS and DEPOSITS
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
/* CHANGE HISTORY
-- FCC 4.1 OCT 2002 CITIPLC RETRO SFR NO. 1303 CHANGES STARTS
CHANGES FOR GENERATION OF CONFIRMATION TRACERS FOR UNCONFIRMED MM's
FCC 4.6.2 CITILS Changes for BILL NOTC for Fee Components
01-SEP-2005 FCC 4.6.2 CITILS COPY RIGHT year changes 
13-dec-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#01,CITIUS-LS#325,New advice for value dated amendment for LS module
09-APR-2008 FLEXCUBE V.CL Release 7.4 BAU, EMAIL FUNCTIONALITY
09-MAR-2009 FLEXCUBE V.CL Release 7.5 LOT1 FS Tag#09 Auto Rollover Advice Changes, 
                Added two new functions Fn_Gen_Brvn_Adv,Fn_Book_RateRevision
10-Apr-2009 FLEXCUBE V.CL Release 7.5 Lot2 FS TAG 19 Ability to generate 1098 statement added by sudhakar
19-MAY-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag05, Manual Bill Generation changes
25-MAY-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag 03 ,Billing Notice Generation Changes , added the new function fn_get_notc_date
26-MAY-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag05 Changes, Parameter names have been changed p_event_seq_no to p_billing_esn
27-may-2009 FLEXCUBE V.CL RELEASE 7.5 LOT2 FS Tag19 ,1098 ASCII FILE GENERATION, Added new procedure pr_1098_ascii_gen 
03-JUN-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#24 Changes, new function for NOTC deletion
18-MAY-2012 Flexcube V.CL Release 7.11 FS Tag 18 changes,Notice Templates and free format messaging.
19-AUG-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 RETRO CITIUS#19147 changes,to include interest details in payment notices and make interest tags generic.
01-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 RETRO CITIUS#19858 changes. Remarketing fees changes.

**Changed By         : Meha
**Date               : 7-Oct-2019
**Change Description : Floor and Ceiling Changes
**Search String      : OBCL_14.4_FLRCLG
  **Changed By         : Gomathi G
  **Date               : 24-OCT-2019
  **Change Description : HOOKS FOR OL ADVICES
  **Search String      : OBCL_14.3_BUG#29583867
*/
--OBCL_14.3_BUG#29583867 changes start
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
--OBCL_14.3_BUG#29583867 changes end

function fn_ldnotenv (
br_code   in   oltms_branch.branch_code%type,
mod_code in   oltbs_contract_master.module%type,   
pro_date in date,
prod_code  in  oltms_product_master_ld.product%type,
com_freq in number,
func in varchar2,
err_code  out   ertbs_msgs.err_code%type)
return boolean;

function fn_ldnotehoffin (
br_code   in   oltms_branch.branch_code%type,
mod_code in   oltbs_contract_master.module%type,   
pro_date in date,
prod_code  in  oltms_product_master_ld.product%type,
com_freq in number,
err out ertbs_msgs.err_code%type
) 
return boolean;

function fn_mmliqdho (
br_code   in   oltms_branch.branch_code%type,
mod_code in   oltbs_contract_master.module%type,
pro_date in date,
prod_code  in  oltms_product_master_ld.product%type,
com_freq in number,
err out ertbs_msgs.err_code%type
 )
return boolean;

function bilnotc (cur_rec oltbs_dly_msg_out%ROWTYPE)
return boolean;

function amndadv(cur_rec oltbs_dly_msg_out%rowtype)
return boolean;

function fn_taxchg (waiver varchar2, amttag varchar2,taxamt varchar2,
			taxccy varchar2,taxvldt varchar2,taxtyp varchar2,dcn oltbs_dly_msg_out.dcn%type)
return boolean;

procedure pr_ins;
 
/*
New Function for Settlement update during NOTC of MM Comtracts. This is required as 
Settlement msgs are generared spot days before maturity
USDFBME - TIL NO 17
*/

Function	fn_settlement_update
			(
			p_contract_ref_no		IN		oltbs_contract.contract_ref_no%type,
			p_current_event_seq_no	IN		oltbs_contract.latest_event_seq_no%type,
			p_due_date			IN		date,
			-- p_error_code		IN OUT	ertbs_msgs.err_code%type
			-- The above line was commented because one of the parameters passed to 
			-- fn_settlement_update, err, ( in funciton fn_mmliqdho ) is of type OUT.
			-- If not commented , this causes conflict with the declaration of
			-- fn_settlement_update where the parameter has been delcared as IN OUT
			p_error_code		OUT	ertbs_msgs.err_code%type
			)
		Return Boolean;


/* new function added for LS module */
FUNCTION fn_lsnotehoffin
				(
				cont_ref	In	oltbs_contract.CONTRACT_REF_NO%TYPE, --FCC 4.6.2 CITILS Changes for BILL NOTC for Fee Components vijeth addition
				br_code   	in   	oltms_branch.branch_code%type,
				mod_code 	in   	oltbs_contract_master.module%type,
				pro_date 	in 	date,
				prod_code  	in  	oltms_product_master_ld.product%type,
				com_freq 	in 	number,
				err 			out 	ertbs_msgs.err_code%type
				)
				RETURN boolean;

-- FCC 4.1 OCT 2002 CITIPLC RETRO SFR NO. 1303 CHANGES STARTS
Function fn_tracer_gen 
			(
			br_code   	in   	oltms_branch.branch_code%type,
			mod_code 	in   	oltbs_contract_master.module%type,   
			pro_date 	in 	date,
			prod_code  	in  	oltms_product_master_ld.product%type,
			com_freq 	in 	number,
			func 			in 	varchar2,
			err_code  	out  ertbs_msgs.err_code%type 
			) 
			return boolean;

FUNCTION fn_mmtracer_gen
				(
				p_contract_ref_no	IN	VARCHAR2,		--FCC4.5 Change by Sairam
				br_code   		IN   	oltms_branch.branch_code%TYPE,
				mod_code 		IN   	oltbs_contract_master.module%TYPE,
				pro_date 		IN 	DATE,
				prod_code  		IN  	oltms_product_master_ld.product%TYPE,
				com_freq 		IN 	NUMBER,
				err 			OUT 	ertbs_msgs.err_code%TYPE
				)
				RETURN BOOLEAN;
FUNCTION fn_process_mmtrc_exception			--FCC4.5 Change by Sairam
			(
			p_err_code	IN	OUT	VARCHAR2,
			p_err_param	IN	OUT	VARCHAR2
			)
RETURN BOOLEAN;
--13-dec-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#01,CITIUS-LS#325,New advice for value dated amendment for LS module Starts
FUNCTION lsamndadv
		(
		cur_rec IN oltbs_dly_msg_out%rowtype
		) 
RETURN BOOLEAN ;
--09-APR-2008 FLEXCUBE V.CL Release 7.4 BAU, EMAIL FUNCTIONALITY STARTS
FUNCTION fn_get_commitment_amount
	(p_commitment_ref_no 	IN VARCHAR2
	,p_exclude_payment	IN VARCHAR2 DEFAULT 'N'
	,p_loan_ref_no		IN VARCHAR2
	,p_payment_esn		IN NUMBER
	,p_old_commitment_amt	IN OUT NUMBER
	,p_new_commitment_amt	IN OUT NUMBER
	,p_err_code		IN OUT VARCHAR2
	,p_err_param		IN OUT VARCHAR2
	)
RETURN BOOLEAN;
--09-APR-2008 FLEXCUBE V.CL Release 7.4 BAU, EMAIL FUNCTIONALITY ENDS
--13-dec-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#01,CITIUS-LS#325,New advice for value dated amendment for LS module End
-- FCC 4.1 OCT 2002 CITIPLC RETRO SFR NO. 1303 CHANGES ENDS
--09-Mar-2009 FLEXCUBE V.CL Release 7.5 LOT1 FS Tag#09 Auto Rollover Advice Changes Starts
FUNCTION Fn_Gen_Brvn_Adv
                (
                P_CUR  oltbs_dly_msg_out%ROWTYPE
                )
RETURN BOOLEAN;
FUNCTION Fn_Book_RateRevision  (p_branch_code          IN oltbs_contract.Branch%TYPE
                               ,p_processing_date      IN DATE
                               ,p_Err_Code             IN OUT VARCHAR2
                               ,p_Err_Param            IN OUT VARCHAR2)
RETURN BOOLEAN;

--09-Mar-2009 FLEXCUBE V.CL Release 7.5 LOT1 FS Tag#09 Auto Rollover Advice Changes till here
--10-apr-2009 FLEXCUBE V.CL Release 7.5 LOT2 FS Tag#19 Ability to generate 1098 interest statement starts
FUNCTION  FN_1098_FORM_GEN
	(
		P_DCN  			IN oltbs_dly_msg_out.dcn%type,
		P_CONTRACT_REF_NO 	in oltbs_contract.contract_ref_no%type,
		P_CUST_NO 		in oltbs_contract.counterparty%type,
		P_BRANCH 		in oltbs_contract.branch%type,
		P_INTPAID 		in number,
		P_INTREFUND 		in number
	)
RETURN BOOLEAN ;
--10-apr-2009 FLEXCUBE V.CL Release 7.5 LOT2 FS Tag#19 Ability to generate 1098 interest statement ends

--19-MAY-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag05 change starts here
FUNCTION	fn_insert_event_log
			(
			p_contract_ref_no		IN		VARCHAR2
			--26-MAY-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag05 Change starts here
			--, p_event_seq_no		IN		NUMBER
			, p_billing_esn		IN		NUMBER
			--26-MAY-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag05 Change ends here
			, p_err_code		IN OUT	VARCHAR2
			, p_err_param		IN OUT	VARCHAR2
			)
RETURN 	BOOLEAN;

FUNCTION	fn_pop_notc_adv_hist
			(
			p_contract_ref_no		IN		VARCHAR2
			--26-MAY-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag05 Change starts here
			--, p_event_seq_no		IN		NUMBER
			, p_billing_esn		IN		NUMBER			
			--26-MAY-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag05 Change starts here
			, p_processing_date	IN		DATE
			, p_err_code		IN OUT	VARCHAR2
			, p_err_param		IN OUT	VARCHAR2
			)
RETURN	BOOLEAN;

FUNCTION	fn_gen_manual_bill
			(
			p_contract_ref_no		IN		VARCHAR2
			--26-MAY-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag05 Change starts here
			--, p_esn			IN		NUMBER
			, p_billing_esn		IN		NUMBER			
			--26-MAY-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag05 Change ends here
			, p_module			IN		VARCHAR2
			, p_processing_date	IN		DATE
			, p_err_code		IN OUT	VARCHAR2
			, p_err_param		IN OUT	VARCHAR2
			)
RETURN BOOLEAN;
--19-MAY-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag05 change ends here

--03-JUN-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#24 Changes start here
FUNCTION	fn_delete_manual_bill
			(
			p_contract_ref_no		IN		VARCHAR2
			, p_billing_esn		IN		NUMBER			
			, p_err_code		IN OUT	VARCHAR2
			, p_err_param		IN OUT	VARCHAR2
			)
RETURN BOOLEAN;
--03-JUN-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#24 Changes end here

--25-MAY-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag 03 ,Billing Notice Generation Changes - Start
FUNCTION fn_get_notc_date (p_contract_ref_no oltbs_contract.contract_ref_no%TYPE,
                           p_branch          oltms_branch.branch_code%TYPE,
                           p_component       oltbs_amount_due_cs.component%TYPE,
                           p_proc_date       DATE,
				   p_flag		   Varchar2 default 'N'
                           )
RETURN DATE;
--25-MAY-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag 03 ,Billing Notice Generation Changes - End
--27-may-2009 FLEXCUBE V.CL RELEASE 7.5 LOT2 FS Tag19 ,1098 ASCII FILE GENERATION starts
procedure pr_1098_ascii_gen(p_branch varchar2);
Function  fn_spool_advice (p_dcn IN varchar2, p_spool IN varchar2,p_count IN number) return boolean;
--27-may-2009 FLEXCUBE V.CL RELEASE 7.5 LOT2 FS Tag19 ,1098 ASCII FILE GENERATION ends

--18-MAY-2012 Flexcube V.CL Release 7.11 FS Tag 18 changes start
FUNCTION fn_gen_innc_adv
	(
	  p_msg_handoff		IN	oltbs_dly_msg_out%ROWTYPE
	, p_err_code		IN OUT	VARCHAR2
	, p_err_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
FUNCTION fn_gen_payment_notc
	(
	  p_msg_handoff		IN	oltbs_dly_msg_out%ROWTYPE
	, p_err_code		IN OUT	VARCHAR2
	, p_err_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
FUNCTION fn_pop_property_tags
	(
	  p_contract_ref_no	IN	oltms_property_master.contract_ref_no%TYPE
	, p_property_code	IN	oltms_property_master.property_code%TYPE
	, p_err_code		IN OUT	VARCHAR2
	, p_err_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;


FUNCTION fn_pop_payoff_notc
	(
	  p_msg_handoff 	IN 	oltbs_dly_msg_out%ROWTYPE
	, p_error_code		IN OUT	VARCHAR2
	, p_error_param		IN OUT	VARCHAR2
	)				
RETURN BOOLEAN;

FUNCTION fn_cust_populate
(
p_msg_handoff IN 	oltbs_dly_msg_out%ROWTYPE,
p_error_code  IN OUT	VARCHAR2,
p_error_param IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--18-MAY-2012 Flexcube V.CL Release 7.11 FS Tag 18 changes end

--15-JUL-2014 CITIUS#19147 changes starts
FUNCTION fn_pop_pmnt_interest (
							p_contract_ref_no  	IN VARCHAR2,
							p_stmt_date	    	IN DATE,
							p_tot_int_accr		OUT NUMBER
						)
RETURN BOOLEAN;
--15-JUL-2014 CITIUS#19147 changes ends.

--03-JUN-2015 CITIUS#19858 changes start
FUNCTION fn_remark_fees (cur_rec  IN oltbs_dly_msg_out%ROWTYPE) 
RETURN BOOLEAN;
--03-JUN-2015 CITIUS#19858 changes end

--OBCL_14.4_FLRCLG Changes Starts
Function Fn_Gen_Rtam_Adv (P_Cur  Oltbs_Dly_Msg_Out%Rowtype)
	Return Boolean;
--OBCL_14.4_FLRCLG Changes Ends

end olpks_adv_func;
/
create or replace synonym olpkss_adv_func for olpks_adv_func
/