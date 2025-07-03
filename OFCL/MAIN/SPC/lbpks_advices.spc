CREATE OR REPLACE PACKAGE lbpks_advices

/*----------------------------------------------------------------------------------------------------
**
** File Name	: LSPKADV.SPC
**
** Module		: LS
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

/* Change history
	ALL NOTICE GENERATION ADVICES
29-Apr-2003 Added one more function fn_gen_payment_advice for SFR #3.
8/MAY/2003 FCC 4.3 Aug 2003 changes for internal SFR #253

02-SEP-2005 CITIPLC CITILS46110101 FC 4.6.2 AUG RETRO for the following items:

		22-AUG-2005 FCC 4.6.2 CITILS Field 72 changes FS#2.35
		28-AUG-2005 FCC 4.6.2 CITILS Changes Added pkg_borrgen VARIABLE for BILL NOTC for Fee Components-vijeth

09-JAN-2006 CITILS46110289  FLEXCUBE V.CL Release 7.1 FS TAG 2.14 - FFT changes by MIThilesh
					Added new functions FN_INST_ICCF_CALC_DET,FN_INST_PRINCIPAL_DET,FN_INST_FEE_CALC_DET,FN_INST_PI_DET,
					FN_INST_PIF_DET and FN_INST_SETTLEMENT_DET for billing notices.

25-apr-2006	CITILS46110398 retro of changes for CITIPLC#777 rollover free format message changes
02-MAY-2006	CITILS46110398 incluced FN_GEN_NOTC_SPLIT in spec to make it public function ends
17-APR-2006 Flexcube V.CL Release 7.0, MIThilesh Added function FN_GEN_ROLL_ADVICE
11-MAY-2006 FLEXCUBE V.CL Release 7.0 LOT2 ITR1 SFR#6, Added a function FN_GEN_PRAM_ADVICE
14-AUG-2006 FLEXCUBE V.CL Release 7.1 Changes for Rollover advices, by mgk
            Included functions FN_GEN_ROIX_ADVICE, FN_GEN_ROIX_NORMAL, FN_GEN_ROIX_SPLIT, FN_GEN_ROIX_CONSOL,
	                       FN_GEN_ROEX_ADVICE, FN_GEN_ROEX_NORMAL, FN_GEN_ROEX_SPLIT, FN_GEN_ROEX_CONSOL
17-AUG-2006 FCC V.CL Release 7.1 FS9.0 Assignment advice changes.
	    Rewriting of FN_GEN_PRAM_ADVICE for assignment advice generation. This will handle advices for both 
	    current dated and back valued assignments (PRAM)
17-AUG-2006 FCC V.CL Release 7.1 changes for BV Interest advices.
	    Added a new function FN_GEN_INT_REVN_ADV for generation of advices due to back valued interest changes.
12-DEC-2006.CITIUS-LS#220.New tags added for various type of messages.Changes related to free format.	    
02-JAN-2007 FCC7.1 CITIUS-LS by VB, Till#228: Compilation Errors Fixed
13-MAR-2007.CITIUS-LS#694 a) Changes for IRAM advice 
09-JUN-2007 CITIUS-LS#496 ARUN, CHANGES, Message Generation Offline Changes.(Retro from Blore)
18-JUN-2007 CITIUS-LS#845.Currently there is a flag at the payment screen which allow for a 
			full paydown of the contract (both for libor as well as prime). Requirement to add 
			the same flag at the fax screen so that full payment faxes can be send out.
11-JAN-2008 CITIUS-LS#1007 Rollover changes.			
11-JUN-2008 CITIUS-LS#1302,Changes.Retro of.
			08-Apr-2008 Flexcube V.CL Release 7.4 BAU, SLC Fee Related Changes
11-NOV-2008 CITIUS-LS#SRT1452 STP and Code Consolidation Site - Compilation Errors
			fn_repayment_borr_adv, fn_gen_lc_fee_adv, fn_gen_tansfer_fee_adv, fn_repayment_part_adv,fn_get_consol_ref,fn_payment_details,fn_repayment_borr_adv,fn_repayment_part_adv functions added. g_pamb_esn and g_pamb_vdt global variables added. pr_set_pamb_params procedure added.
02-APR-2009 CITIUS-LS#5588 Agency: Margin fax changes . 
06-APR-2009 CITIUS-LS#5589 Agency: Breakage fee fax changes.
04-JUN-2009 CITIUS-LS#SRT5764-FLEXCUBE V.CL Release 7.6 Sighting Fund Changes,Taken Unit from CITIUS
26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - copy right clause changed
17-FEB-2010 Flexcube V.CL 7.6, FpML changes
13-APR-2010 FLEXCUBE V.CL Release 7.6 ITR1 SFR#1 Retro#CITILS10G00439 changes - Population of following tags during dairy status message generation
							_FACILITY-NAME_
							_FACILITY-NAME1_
							_FACILITY-NAME2_
							_ADMIN-NAME_
							_ADMIN-PHONE-NO_
02-JUN-2010 Flexcube V.CL 7.7, FpML Phase-2 changes		
10-JUL-2010 FLEXCUBE V.CL Release 7.7 VOL2 FS Tag 08 Collateral Monitoring Changes
18-FEB-2011 Flexcube V.CL Release 7.8 Changes,Risk Email changes to generate advices during save of rollover and reprice
06-FEB-2012 Flexcube V.CL Release 7.10 - Retro
				A) 27-Dec-2011 CITIUS-LS#12208 US Enhancement Changes. New Function Fn_pop_Collateral_det added to calculate Collateral Percentage, Collateral Account and Net Share Amount.
03-MAY-2013 Oracle FCUBS 3.3.0.0.0$CITIBK_R713 FS Vol1 Tag04, Chinese Characters Changes, New function fn_generate_chinese_tag is added.				
20-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 FS Vol1 Tag07,FATCA Phase-2 Changes,Added a new function for Tax related messages
02-JUL-2013 Oracle FCUBS 3.3.0.0.0$CITIBK_R713 FS Vol1 Tag04, Chinese Characters Changes, two new parameters P_EER_CODE and P_ERR_PARAM are added to fn_generate_chinese_tag.
14-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#16936 changes, collateral changes have been revamped in function fn_pop_collateral_det and year in copyright clause has been changed
14-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS VOL01 Tag03 changes here, Tax Witholding
26-MAR-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO,CITIUS#16936 changes here start here -- UAT Retro
20-AUG-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag03 ,Paying Agent changes
*/
------------------------------------------------------------------------------------------------------

AS
--CITIUS-LS#1302,Changes.Starts
l_fee_component Varchar2(30); --08-Apr-2008	Flexcube V.CL Release 7.4 BAU, SLC Fee Related Changes
l_fee_id 	Varchar2(30); --08-Apr-2008	Flexcube V.CL Release 7.4 BAU, SLC Fee Related Changes
--CITIUS-LS#1302,Changes.Ends

--Bug#35273659 Changes starts
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
  FUNCTION Fn_Skip_Custom RETURN BOOLEAN;
--Bug#35273659 Changes ends
---------------------------------------------------------------------------------------------
FUNCTION FN_TRIGGER_EVENT
(
	p_module		IN 		oltbs_contract.module_code%TYPE,
	p_contract_ref_no IN 		oltbs_contract.contract_ref_no%TYPE,
	p_event_code	IN		oltbs_contract.curr_event_code%TYPE,
	p_error_code	IN OUT 	VARCHAR2,
	p_error_parameter	IN OUT 	VARCHAR2,
	p_latest_esn	IN OUT   	oltbs_contract.latest_event_seq_no%TYPE
) RETURN BOOLEAN;

FUNCTION FN_POPULATE_DNOT_ADVICES
(
	p_branch		IN	 oltms_branch.BRANCH_CODE%TYPE,
	p_value_date	IN	 lftbs_contract_adhoc_fee.value_date%TYPE,
	p_commit_freq	IN	 NUMBER,
	p_error_code	IN OUT VARCHAR2,
	p_error_parameter	IN OUT VARCHAR2
) RETURN BOOLEAN;

FUNCTION FN_POPULATE_ENOT_ADVICES
(
	p_branch		IN	 oltms_branch.BRANCH_CODE%TYPE,
	p_value_date	IN	 lftbs_contract_adhoc_fee.value_date%TYPE,
	p_commit_freq	IN	 NUMBER,
	p_error_code	IN OUT VARCHAR2,
	p_error_parameter	IN OUT VARCHAR2
) RETURN BOOLEAN;

FUNCTION FN_POPULATE_INOT_ADVICES
(
	p_branch		IN	 oltms_branch.BRANCH_CODE%TYPE,
	p_value_date	IN	 lftbs_contract_adhoc_fee.value_date%TYPE,
	p_commit_freq	IN	 NUMBER,
	p_error_code	IN OUT VARCHAR2,
	p_error_parameter	IN OUT VARCHAR2
) RETURN BOOLEAN;

FUNCTION FN_POPULATE_EXFX_ADVICES
(
	p_branch		IN	 oltms_branch.BRANCH_CODE%TYPE,
	p_value_date	IN	 lftbs_contract_adhoc_fee.value_date%TYPE,
	p_commit_freq	IN	 NUMBER,
	p_error_code	IN OUT VARCHAR2,
	p_error_parameter	IN OUT VARCHAR2
) RETURN BOOLEAN;

FUNCTION FN_POPULATE_IRFX_ADVICES
(
	p_branch		IN	 oltms_branch.BRANCH_CODE%TYPE,
	p_value_date	IN	 lftbs_contract_adhoc_fee.value_date%TYPE,
	p_commit_freq	IN	 NUMBER,
	p_error_code	IN OUT VARCHAR2,
	p_error_parameter	IN OUT VARCHAR2
) RETURN BOOLEAN;

FUNCTION FN_GEN_DNOT_FOR_BORROWER
(
	cur 		  IN OUT oltbs_dly_msg_out%ROWTYPE,
	p_drawdown_no IN 	 Number	default NULL			--CITIPLC#777 --CITILS46110398
) RETURN BOOLEAN;

FUNCTION FN_GEN_DNOT_FOR_PARTICIPANT
(
	cur 		  IN OUT oltbs_dly_msg_out%ROWTYPE,
	p_drawdown_no IN 	 Number	default NULL			--CITIPLC#777 --CITILS46110398
) RETURN BOOLEAN;

FUNCTION FN_GEN_EXFX_FOR_BORROWER
(
	cur IN OUT oltbs_dly_msg_out%ROWTYPE
) RETURN BOOLEAN;

FUNCTION FN_GEN_EXFX_FOR_PARTICIPANT
(
	cur IN OUT oltbs_dly_msg_out%ROWTYPE
) RETURN BOOLEAN;

FUNCTION FN_POPULATE_IDUE_ADVICES
(
	p_branch		IN	 oltms_branch.BRANCH_CODE%TYPE,
	p_value_date	IN	 lftbs_contract_adhoc_fee.value_date%TYPE,
	p_error_code	IN OUT VARCHAR2,
	p_error_parameter	IN OUT VARCHAR2
) RETURN BOOLEAN;

FUNCTION FN_GEN_INOT_FOR_BORROWER
(
	cur IN OUT oltbs_dly_msg_out%ROWTYPE
) RETURN BOOLEAN;

FUNCTION FN_GEN_INOT_FOR_PARTICIPANT
(
	cur IN OUT oltbs_dly_msg_out%ROWTYPE
) RETURN BOOLEAN;

FUNCTION FN_GEN_IDUE_FOR_BORROWER
(
	cur IN OUT oltbs_dly_msg_out%ROWTYPE
) RETURN BOOLEAN;

FUNCTION FN_GEN_INOT_NOTC
(
	cur 				IN oltbs_dly_msg_out%ROWTYPE,
	p_ADVICE_TYPE	   	IN VARCHAR2 := 'B'
) RETURN BOOLEAN ;

FUNCTION FN_GEN_ERAM_ADVICE
(
	cur 				IN oltbs_dly_msg_out%ROWTYPE
) RETURN BOOLEAN ;

FUNCTION FN_gen_MT644
(
	cur 				IN oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count       IN OUT NUMBER
) RETURN BOOLEAN;

FUNCTION FN_gen_MT643
(
	cur 				IN oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count       IN OUT NUMBER
) RETURN BOOLEAN;

------FCC 4.3 Aug 2003 changes for internal SFR #253
FUNCTION FN_gen_MT645
(
	cur 				IN oltbs_dly_msg_out%ROWTYPE,
	p_adv_loop_count       IN OUT NUMBER
) RETURN BOOLEAN;
------FCC 4.3 Aug 2003 changes for internal SFR #253

FUNCTION FN_GEN_SYNDNOTICES
(
	p_branch IN oltms_branch.branch_code%type,
	p_module IN smtb_modules.module_id%type,
	p_processing_date IN DATE,
	p_product IN oltms_product.product_code%type,
	p_commit_frequency IN  NUMBER,
	p_func IN	VARCHAR2,
	p_error_code IN OUT ertbs_msgs.err_code%TYPE,
	p_error_parameter IN OUT VARCHAR2
) RETURN BOOLEAN ;

FUNCTION FN_GEN_IRFX_FOR_PARTICIPANT
(
	cur IN OUT oltbs_dly_msg_out%ROWTYPE
) RETURN BOOLEAN;

FUNCTION FN_GEN_IRFX_FOR_BORROWER
(
	cur IN OUT oltbs_dly_msg_out%ROWTYPE
) RETURN BOOLEAN;

FUNCTION FN_ENTITY_DETAILS
(
	p_out_msg_record IN     oltbs_dly_msg_out%ROWTYPE,
	p_err_code	     IN OUT	ertbs_msgs.err_code%TYPE
) RETURN BOOLEAN;
--FCC 4.2 Apr 2003 ITR2 fixes for SFR #3
FUNCTION FN_GEN_PAYMENT_ADV
(
	cur IN OUT oltbs_dly_msg_out%ROWTYPE
) RETURN BOOLEAN;
------FCC 4.3 Aug 2003 changes for internal SFR #253
FUNCTION FN_GEN_LIQD_ADV
(
	cur IN OUT oltbs_dly_msg_out%ROWTYPE
) RETURN BOOLEAN;
------FCC 4.3 Aug 2003 changes for internal SFR #253
-------------------------------------------------------------------------------------------

-- 02-SEP-2005 CITIPLC CITILS46110101 FC 4.6.2 AUG RETRO begins

------------------------------------------------------------------------------------------------------------------
--FCC 4.6.2 CitiLS changes by Satya
--	This function is added for the purpose of giving special instructions to Swift messages
--of the Borrower/Participants. Here, the function returns the Customer name from the Facility ref no
--of the Borrower and the user ref no from the Borrower Tranche. THe parameters this function
--accepts are:
--		p_contract_ref_no(IN)	: The Borrower/Participant contract_ref_no, be it Facility/Tranche/Drawdown
--		p_fld72_line1(OUT)	: Returns the Borrower name as mentioned in the Borrower Facility
--		p_fld72_line2(OUT)	: Returns the USER_REF_NO of the Borrower Tranche
--		p_err_code(IN OUT)	: Returns the error code, if any occurs
--		p_err_params(IN OUT)	: This parameter must be sufficiently large(say 32767) to be able to take
--					  the parameters that the error may return
------------------------------------------------------------------------------------------------------------------
Function fn_insert_field72
(
	p_contract_ref_no	IN	varchar2,
	p_fld72_line1		OUT	varchar2,
	p_fld72_line2		OUT	varchar2,
	p_err_code		IN OUT	varchar2,
	p_err_params		IN OUT	varchar2
) return boolean;
-- CITILS46110169 -- FCC4.6.2 SEP release starts
--FLEXCUBE_V.CL_RELEASE_7.0 ITR1 SFR#110 by Satya
FUNCTION fn_MakerChecker_names
(
	p_contract_ref_no	IN oltbs_contract.contract_ref_no%type,
	p_esn			IN oltbs_contract.latest_event_seq_no%type,
	p_dcn 			IN oltbs_adv_input.dcn%type,
	p_loop_no		IN oltbs_adv_input.loop_no%type
) RETURN BOOLEAN;
--FLEXCUBE_V.CL_RELEASE_7.0 ITR1 SFR#110 by Satya
-- CITILS46110169 -- FCC4.6.2 SEP release ends

-- 02-SEP-2005 CITIPLC CITILS46110101 FC 4.6.2 AUG RETRO ends
-- CITILS46110289 Starts

--FLEXCUBE V.CL Release 7.1 FS TAG 2.14 - FFT changes by MIT on 090106 Start
FUNCTION FN_INST_ICCF_CALC_DET
(
	P_CUR oltbs_dly_msg_out%ROWTYPE,
	P_CONTRACT_REC lbtbs_drawdown_schedule%ROWTYPE,
	P_TOT_ICCF_AMNT OUT NUMBER
) RETURN BOOLEAN;

FUNCTION FN_INST_PRINCIPAL_DET
(
	P_CUR oltbs_dly_msg_out%ROWTYPE,
	P_CONTRACT_REC lbtbs_drawdown_schedule%ROWTYPE,
	P_TOT_PRINCIPAL_AMNT OUT NUMBER
) RETURN BOOLEAN;

FUNCTION FN_INST_FEE_CALC_DET
(
	P_CUR oltbs_dly_msg_out%ROWTYPE,
	P_CONTRACT_REC lbtbs_drawdown_schedule%ROWTYPE,
	P_TOT_FEE_AMNT OUT NUMBER
) RETURN BOOLEAN;

FUNCTION FN_INST_PI_DET
(
	P_CUR oltbs_dly_msg_out%ROWTYPE,
	P_CONTRACT_REC lbtbs_drawdown_schedule%ROWTYPE
) RETURN BOOLEAN;

FUNCTION FN_INST_PIF_DET
(
	p_cur 			oltbs_dly_msg_out%rowtype,
	p_contract_rec 	lbtbs_drawdown_schedule%rowtype,
	p_event			varchar2 default 'XX'	--CITIUS-LS#220
) RETURN BOOLEAN;
--CITILS46110398 starts
--CITIPLC#777		
FUNCTION Fn_pop_ccy_instr
	(p_dcn 	     		IN	    oltbs_dly_msg_out.dcn%TYPE,
	 p_ccy				IN 		Varchar2,
	 p_err_code	     	IN OUT	Varchar2
	)
RETURN BOOLEAN;

FUNCTION Fn_gen_notc_tranche(p_cur  oltbs_dly_msg_out%rowtype,
							 p_type Varchar2	 --B  Borrower -- P Participant
							 )
RETURN BOOLEAN;

--CITIPLC#777
--CITILS46110398 ends

FUNCTION FN_INST_SETTLEMENT_DET
(
	P_CUR 				oltbs_dly_msg_out%ROWTYPE,
	P_CONTRACT_REC			lbtbs_drawdown_schedule%ROWTYPE,
	P_IN_LOOP		IN OUT	NUMBER,
	P_COMPONENT				VARCHAR2
) RETURN BOOLEAN;

FUNCTION FN_GEN_IDUE_FOR_PARTICIPANT(CUR IN OUT oltbs_dly_msg_out%ROWTYPE)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.1 FS TAG 2.14 - FFT changes by MIT on 090106 End
-- CITILS46110289 Ends

--CITILS46110398 incluced FN_GEN_NOTC_SPLIT in spec to make it public function
FUNCTION FN_GEN_NOTC_SPLIT
(
	cur 			IN oltbs_dly_msg_out%ROWTYPE,
	p_CONTRACT_REC 		IN lbtbs_drawdown_schedule%ROWTYPE,
	p_ADVICE_TYPE	   	IN VARCHAR2 := 'B'
)
RETURN BOOLEAN;
--CITILS46110398 incluced FN_GEN_NOTC_SPLIT in spec to make it public function ends

--Flexcube V.CL Release 7.0, Add by MIT on 060417 Start

FUNCTION FN_GEN_ROLL_ADVICE
(

	P_CUR						oltbs_dly_msg_out%ROWTYPE

) RETURN BOOLEAN;

FUNCTION FN_INST_GEN_DET
(

	P_CUR				IN		oltbs_dly_msg_out%ROWTYPE,
	P_CONTRACT_REC		IN		lbtbs_drawdown_schedule%ROWTYPE,
	P_ADVICE_TYPE		IN		VARCHAR2 := 'B'

)RETURN BOOLEAN;

--Flexcube V.CL Release 7.0, Add by MIT on 060417 End
-- FLEXCUBE V.CL Release 7.1 Changes for Rollover advices, by mgk start
FUNCTION FN_GEN_ROIX_ADVICE
(
	P_CUR						oltbs_dly_msg_out%ROWTYPE
) RETURN BOOLEAN;

FUNCTION FN_GEN_ROEX_ADVICE
(
	P_CUR						oltbs_dly_msg_out%ROWTYPE
) RETURN BOOLEAN;

FUNCTION FN_GEN_RNOT_ADVICE
(
	P_CUR						oltbs_dly_msg_out%ROWTYPE
) RETURN BOOLEAN;

FUNCTION FN_GEN_ROIX_NORMAL
  (
  	P_CUR            IN oltbs_dly_msg_out%ROWTYPE,
  	P_CONTRACT_REC IN lbtbs_drawdown_schedule%ROWTYPE,
  	P_ADVICE_TYPE  IN VARCHAR2 := 'B'
  )
 RETURN BOOLEAN;

FUNCTION FN_GEN_ROIX_SPLIT
  (
  	P_CUR            IN oltbs_dly_msg_out%ROWTYPE,
  	P_CONTRACT_REC IN lbtbs_drawdown_schedule%ROWTYPE,
  	P_ADVICE_TYPE  IN VARCHAR2 := 'B'
  )
 RETURN BOOLEAN;

FUNCTION FN_GEN_ROIX_CONSOL
  (
  	P_CUR            IN oltbs_dly_msg_out%ROWTYPE,
  	P_CONTRACT_REC IN lbtbs_drawdown_schedule%ROWTYPE,
  	P_ADVICE_TYPE  IN VARCHAR2 := 'B'
  )
 RETURN BOOLEAN;

FUNCTION FN_GEN_ROEX_NORMAL
  (
  	P_CUR            IN oltbs_dly_msg_out%ROWTYPE,
  	P_CONTRACT_REC IN lbtbs_drawdown_schedule%ROWTYPE,
  	P_ADVICE_TYPE  IN VARCHAR2 := 'B'
  )
 RETURN BOOLEAN;

FUNCTION FN_GEN_ROEX_SPLIT
  (
  	P_CUR            IN oltbs_dly_msg_out%ROWTYPE,
  	P_CONTRACT_REC IN lbtbs_drawdown_schedule%ROWTYPE,
  	P_ADVICE_TYPE  IN VARCHAR2 := 'B'
  )
 RETURN BOOLEAN;

FUNCTION FN_GEN_ROEX_CONSOL
  (
  	P_CUR            IN oltbs_dly_msg_out%ROWTYPE,
  	P_CONTRACT_REC IN lbtbs_drawdown_schedule%ROWTYPE,
  	P_ADVICE_TYPE  IN VARCHAR2 := 'B'
  )
 RETURN BOOLEAN;

FUNCTION FN_GEN_RNOT_NORMAL
  (
  	P_CUR            IN oltbs_dly_msg_out%ROWTYPE,
  	P_CONTRACT_REC IN lbtbs_drawdown_schedule%ROWTYPE,
  	P_ADVICE_TYPE  IN VARCHAR2 := 'B'
  )
 RETURN BOOLEAN;

FUNCTION FN_GEN_RNOT_SPLIT
  (
  	P_CUR            IN oltbs_dly_msg_out%ROWTYPE,
  	P_CONTRACT_REC IN lbtbs_drawdown_schedule%ROWTYPE,
  	P_ADVICE_TYPE  IN VARCHAR2 := 'B',
	p_split_no     IN NUMBER := NULL --VB added for CITIUS-LS on 02-JAN-2007, Till#227
  )
 RETURN BOOLEAN;

FUNCTION FN_GEN_RNOT_CONSOL
  (
  	P_CUR            IN oltbs_dly_msg_out%ROWTYPE,
  	P_CONTRACT_REC IN lbtbs_drawdown_schedule%ROWTYPE,
  	P_ADVICE_TYPE  IN VARCHAR2 := 'B'
  )
 RETURN BOOLEAN; 
-- FLEXCUBE V.CL Release 7.1 Changes for Rollover advices, by mgk end

--FCC V.CL Release 7.1 FS9.0 Assignment advice changes start
FUNCTION FN_GEN_PRAM_ADVICE
(

	P_CUR	oltbs_dly_msg_out%ROWTYPE

)RETURN BOOLEAN;

--FCC V.CL Release 7.1 FS9.0 Assignment advice changes end

--FCC V.CL Release 7.1 changes for BV Interest advices start
FUNCTION FN_GEN_INT_REVN_ADV
(

	P_CUR	oltbs_dly_msg_out%ROWTYPE

)RETURN BOOLEAN;
--FCC V.CL Release 7.1 changes for BV Interest advices end

--CITIUS-LS#325 Starts
FUNCTION Fn_gen_notc_payrecv(p_cur  oltbs_dly_msg_out%rowtype)
RETURN BOOLEAN;
--CITIUS-LS#325 Ends

--CITIUS-LS#694 a) Changes Starts 
FUNCTION Fn_gen_iram_advice
(
cur IN oltbs_dly_msg_out%ROWTYPE
)RETURN BOOLEAN;
--CITIUS-LS#694 a) Changes Ends 

--CITIUS-LS#1007 Rollover changes Starts
--29-NOV-2007 FLEXCUBE V.CL Release 7.3 ITR1#117, Reprice Message Changes starts
FUNCTION fn_gen_mrgb_advice(p_cur IN oltbs_dly_msg_out%ROWTYPE)
RETURN BOOLEAN;
--CITIUS-LS#1007 Rollover changes Ends

--29-NOV-2007 FLEXCUBE V.CL Release 7.3 ITR1#117, Reprice Message Changes ends

pkg_borrgen 		Varchar2(1); --FCC 4.6.2 CITILS Changes Added for BILL NOTC for Fee Components
g_from_advice 		Varchar2(1);
g_full_payment_adv 	Varchar2(1); --CITIUS-LS#845..

--CITIUS-LS#496 ARUN 09-JUN-2007,  CHANGES, Message Generation Offline Changes.(Retro from Blore) Start
PROCEDURE pr_populate_gtemp(p_contract_ref_no IN oltbs_contract.contract_ref_no%Type,p_process IN varchar2); --08-JUN-2007  Message Generation Performance tuning changes
--CITIUS-LS#496 ARUN 09-JUN-2007,  CHANGES, Message Generation Offline Changes.(Retro from Blore) Ends
------------------------------------------------------------------------------
--CITIUS-LS#1302,Changes.Starts
--08-Apr-2008	Flexcube V.CL Release 7.4 BAU, SLC Fee Related Changes START
FUNCTION fn_set_fee_component
	                     (
			      P_FEE_component   IN VARCHAR2,
			      P_FEE_id   	IN VARCHAR2,
			      P_ERROR_CODE	IN OUT VARCHAR2,
			      P_ERROR_PARAMS	IN OUT VARCHAR2
		 	      )
RETURN BOOLEAN;
--08-Apr-2008	Flexcube V.CL Release 7.4 BAU, SLC Fee Related Changes END
--CITIUS-LS#1302,Changes.Ends

--CITIUS-LS#SRT1452 STP and Code Consolidation Site - Compilation Errors starts
FUNCTION fn_repayment_borr_adv
(
	p_cur IN OUT oltbs_dly_msg_out%ROWTYPE --16-OCT-2007 FCC V.CL Release 7.3 Term Revolver Changes, variable cur changed as p_cur
) 
RETURN BOOLEAN;

FUNCTION fn_repayment_part_adv
(
	p_cur IN OUT oltbs_dly_msg_out%ROWTYPE --16-OCT-2007 FCC V.CL Release 7.3 Term Revolver Changes, variable cur changed as p_cur
) 
RETURN BOOLEAN;
--07-JAN-2008 FLEXCUBE V.CL Release 7.4 RT #12 changes starts
FUNCTION fn_gen_lc_fee_adv
	(
	p_cur  oltbs_dly_msg_out%ROWTYPE,
	p_advice_type  IN 	VARCHAR2:= 'B'
	)
RETURN BOOLEAN;
--07-JAN-2008 FLEXCUBE V.CL Release 7.4 RT #12 changes ends
--CITILS46210341 starts
FUNCTION fn_gen_tansfer_fee_adv	(p_dly_out IN oltbs_dly_msg_out%ROWTYPE)
RETURN BOOLEAN;
g_pamb_esn number;
g_pamb_vdt date;
PROCEDURE pr_set_pamb_params(p_pamb_esn in number, p_pamb_vdt in date);
--CITILS46210341 ends
--09-APR-2008 FLEXCUBE V.CL Release 7.4 BAU, EMAIL FUNCTIONALITY STARTS
PROCEDURE LS_PR_INS
(	P_DCN   		IN oltbs_adv_input.DCN%TYPE,
	P_FIELD 		IN oltbs_adv_input.FIELD_TAG%TYPE,
	P_LOOP  		IN oltbs_adv_input.LOOP_NO%TYPE,
	P_VALUE 		IN oltbs_adv_input.VALUE%TYPE,
	P_JUST  		IN oltbs_adv_input.JUSTIFY%TYPE,
	P_PARENT_LOOP_NO	IN oltbs_adv_input.PARENT_LOOP_NO%TYPE DEFAULT 1 --02-JUN-2010 Flexcube V.CL 7.7, FpML Phase-2 changes
);
--09-APR-2008 FLEXCUBE V.CL Release 7.4 BAU, EMAIL FUNCTIONALITY ENDS
--11-JAN-2008 FLEXCUBE V.CL Release 7.4 RT #45,BFFT FOR CONSOL ROLLOVER RELATED CHANGES STARTS
FUNCTION FN_GET_CONSOL_REF
(
	P_CONSOL_REF_NO IN  oltbs_contract_master.CONTRACT_REF_NO%TYPE
)
RETURN BOOLEAN;
--11-JAN-2008 FLEXCUBE V.CL Release 7.4 RT #45,BFFT FOR CONSOL ROLLOVER RELATED CHANGES ENDS
--03-Sep-2007, FCC V.CL Release 7.3 Term Revolver Changes, starts
FUNCTION fn_payment_details(p_payment_rec IN oltbs_amount_paid_ld%ROWTYPE)
RETURN BOOLEAN;
--03-Sep-2007, FCC V.CL Release 7.3 Term Revolver Changes, ENDS
--CITIUS-LS#SRT1452 STP and Code Consolidation Site - Compilation Errors Ends

--02-APR-2009 CITIUS-LS#5588 changes STARTS
FUNCTION fn_generate_margin
(
	cur 		  IN OUT oltbs_dly_msg_out%ROWTYPE
)
RETURN BOOLEAN;
--02-APR-2009 CITIUS-LS#5588 changes ENDS

--06-APR-2009 CITIUS-LS#5589 change STARTS
FUNCTION fn_generate_brkg_fee
(
	cur 		  IN OUT oltbs_dly_msg_out%ROWTYPE
)
RETURN BOOLEAN;
--06-APR-2009 CITIUS-LS#5589 change ENDS
--04-JUN-2009 CITIUS-LS#SRT5764-FLEXCUBE V.CL Release 7.6 Sighting Fund Changes START
--07-May-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes by Maneeha starts
FUNCTION fn_pop_fund_notices
	(
	p_out_msg_record	IN	oltbs_dly_msg_out%ROWTYPE,
	p_error_code		IN OUT	ERTBS_MSGS.ERR_CODE%TYPE
	)
RETURN BOOLEAN;

FUNCTION fn_pop_recall_notc
	(
	p_out_msg_record	IN	oltbs_dly_msg_out%ROWTYPE,
	p_error_code		IN OUT	ERTBS_MSGS.ERR_CODE%TYPE
	)
RETURN BOOLEAN;

--07-May-2009 FLEXCUBE V.CL Release 7.6 Sighting Fund Changes by Maneeha ends

--04-JUN-2009 CITIUS-LS#SRT5764-FLEXCUBE V.CL Release 7.6 Sighting Fund Changes END 
--17-FEB-2010 Flexcube V.CL 7.6, FpML changes starts
FUNCTION fn_get_rate_fixing_detail
	(
	  p_cont_ref_no	IN	VARCHAR2
	, p_component	IN 	VARCHAR2
	, p_value_date	IN	DATE
	, p_start_date	IN OUT	DATE
	, p_end_date	IN OUT	DATE
	, p_rt_fix_date	IN OUT	DATE
	)
RETURN BOOLEAN;

FUNCTION fn_get_int_basis
	(
	  p_calc_method	IN	VARCHAR2
	, p_int_basis	IN OUT	VARCHAR2	
	)
RETURN BOOLEAN;

FUNCTION fn_get_interest_detail
	(
	  p_cont_ref_no	IN	VARCHAR2
	, p_component	IN 	VARCHAR2
	, p_value_date	IN	DATE
	, p_rate_index	IN OUT	VARCHAR2
	, p_base_rate	IN OUT	NUMBER
	, p_margin	IN OUT	NUMBER
	, p_all_in_rate	IN OUT	NUMBER
	)
RETURN BOOLEAN;

--02-JUN-2010 Flexcube V.CL 7.7, FpML Phase-2 changes starts
FUNCTION fn_rollover_rate_fixing_detail
		(
		p_cont_ref_no		IN	VARCHAR2
		, p_component		IN 	VARCHAR2
		, p_ccy			IN	VARCHAR2
		, p_value_date		IN	DATE
		, p_split_no		IN	NUMBER
		, p_roll_rate_index  	IN OUT 	VARCHAR2 
		, p_roll_start_date	IN OUT	DATE
		, p_roll_end_date	IN OUT	DATE
		, p_roll_rt_fix_date	IN OUT	DATE
		, p_roll_calc_method	IN OUT  VARCHAR2
		, p_roll_fixed_rate	IN OUT  VARCHAR2
		, p_roll_margin_rate	IN OUT	VARCHAR2
		, p_roll_all_in_rate	IN OUT	VARCHAR2
		)
RETURN BOOLEAN;		
--02-JUN-2010 Flexcube V.CL 7.7, FpML Phase-2 changes ends

FUNCTION fn_calc_part_share_amt
	(
	  p_ratio	IN	lbtbs_contract_participant.asset_ratio%TYPE
	, p_ccy		IN	oltbs_contract.contract_ccy%TYPE
	, p_bal		IN	lbtbs_tranche_vdbal_master.closing_balance%TYPE
	, p_amount	IN OUT	lbtbs_tranche_vdbal_master.closing_balance%TYPE
	)
RETURN BOOLEAN;
--17-FEB-2010 Flexcube V.CL 7.6, FpML changes ends
-- 13-APR-2010 FLEXCUBE V.CL Release 7.6 ITR1 SFR#1 Retro#CITILS10G00439 changes starts
FUNCTION fn_populate_admin_tags
	(p_ref_no IN VARCHAR2
	,p_dcn  IN oltbs_adv_input.dcn%TYPE
	,p_loop	IN oltbs_adv_input.loop_no%TYPE
	,p_err_code IN OUT VARCHAR2
	)
RETURN BOOLEAN;
-- 13-APR-2010 FLEXCUBE V.CL Release 7.6 ITR1 SFR#1 Retro#CITILS10G00439 changes ends
------------------------------------------------------------------------------
--10-JUL-2010 FLEXCUBE V.CL Release 7.7 VOL2 FS Tag 08 Collateral Monitoring Changes start here
FUNCTION fn_gen_collateral_adv
		(
		p_dly_msg_out	IN		oltbs_dly_msg_out%ROWTYPE
		, p_errcode	IN OUT	VARCHAR2	
		)
RETURN BOOLEAN;
--10-JUL-2010 FLEXCUBE V.CL Release 7.7 VOL2 FS Tag 08 Collateral Monitoring Changes end here
--18-FEB-2011 Flexcube V.CL Release 7.8 Changes,Risk Email changes to generate advices during save of rollover and reprice,start
FUNCTION fn_gen_riskemail_for_borr
		(
		p_dly_msg_out	IN		oltbs_dly_msg_out%ROWTYPE
		, p_errcode		IN OUT	VARCHAR2	
		)
RETURN BOOLEAN;
--18-FEB-2011 Flexcube V.CL Release 7.8 Changes,Risk Email changes to generate advices during save of rollover and reprice,end
--01-APR-2013 CITIUS#16936 changes start here 
/*
--- 27-Dec-2011 CITIUS-LS#12208 US Enhancement Changes Start
FUNCTION Fn_pop_Collateral_det
				(
				 P_cur 					oltbs_dly_msg_out%ROWTYPE
				 ,p_contract_ref_no     IN oltbs_contract.contract_ref_no%type
				 ,p_part_amt			oltbs_contract_master.AMOUNT%TYPE
				)
RETURN BOOLEAN;
---27-Dec-2011 CITIUS-LS#12208 US Enhancement Changes End
*/
FUNCTION fn_pop_collateral_det
		(
		 p_cur						IN 		oltbs_dly_msg_out%ROWTYPE
		 , p_tranche_ref_no			IN		oltbs_contract.contract_ref_no%TYPE
		 , p_part_amt				IN		oltbs_contract_master.amount%TYPE
		 , p_princ_incr_amount		IN		oltbs_contract_master.amount%TYPE
		 , p_princ_liqd_amount		IN		oltbs_contract_master.amount%TYPE
		 , p_loop_no				IN		oltbs_adv_input.loop_no%TYPE
		 , p_coll_part_share		IN OUT	oltbs_contract_master.amount%TYPE
		 , p_coll_incr_share		IN OUT	oltbs_contract_master.amount%TYPE
		 , p_coll_liqd_share		IN OUT	oltbs_contract_master.amount%TYPE
		 , p_err_code				IN OUT	VARCHAR2
		 , p_err_param				IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
--01-APR-2013 CITIUS#16936 changes end here
--03-MAY-2013 Oracle FCUBS 3.3.0.0.0$CITIBK_R713 FS Vol1 Tag04, Chinese Characters Changes, Starts
FUNCTION fn_generate_chinese_tag
	(
		p_dly_msg_out	IN	oltbs_dly_msg_out%ROWTYPE,
		p_loop_no	IN	oltbs_adv_input.loop_no%TYPE,
		p_lang_type	IN	VARCHAR2,
		p_err_code	IN OUT 	VARCHAR2,--02-JUL-2013 Oracle FCUBS 3.3.0.0.0$CITIBK_R713 FS Vol1 Tag04, Chinese Characters Changes
		p_err_param	IN OUT 	VARCHAR2--02-JUL-2013 Oracle FCUBS 3.3.0.0.0$CITIBK_R713 FS Vol1 Tag04, Chinese Characters Changes
	)
RETURN BOOLEAN;
--03-MAY-2013 Oracle FCUBS 3.3.0.0.0$CITIBK_R713 FS Vol1 Tag04, Chinese Characters Changes, Ends
--20-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 FS Vol1 Tag07,FATCA Phase-2 Changes start
FUNCTION fn_gen_cust_tax_adv
							(P_CUR IN OUT oltbs_dly_msg_out%ROWTYPE)
RETURN BOOLEAN;
--20-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 FS Vol1 Tag07,FATCA Phase-2 Changes end
--14-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS VOL01 Tag03 changes here start here ---same changes for CITIUS#16936
FUNCTION fn_gen_fee_liq_msg
			(P_CUR IN OUT oltbs_dly_msg_out%ROWTYPE)
RETURN BOOLEAN;
--14-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS VOL01 Tag03 changes here end here --same chages for CITIUS#16936
--20-AUG-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag03 changes start here
FUNCTION Fn_pop_setl_instr
	(p_dcn 	     			IN	    oltbs_dly_msg_out.dcn%TYPE,
	 p_reference_no			IN 		OLTB_CONTRACT.contract_ref_no%TYPE,
	 p_err_code				IN OUT	Varchar2,
	 p_err_param	     	IN OUT	Varchar2
	)
RETURN BOOLEAN;
--20-AUG-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag03 changes end here
END lbpks_advices;
/
CREATE or replace SYNONYM lbpkss_advices FOR lbpks_advices
/