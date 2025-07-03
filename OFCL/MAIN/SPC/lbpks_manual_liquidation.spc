CREATE OR REPLACE PACKAGE lbpks_manual_liquidation AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbpks_manual_liquidation.SPC
**
** Module		: LOANS SYNDICATION
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
/*--------------------------CHANGE HISTORY-----------------------------------------------------------
--14-AUG-2006 FCC V.CL RELEASE 7.1 Prime loan changes -
Added overloaded function fn_get_amt_due_for_liq.
17-Aug-2006 FLEXCUBE V.CL Release 7.1 FS 5.0 Nonprorata Changes
		Added a parameter p_complete_liqd in the overloaded function fn_get_amt_due_for_liq.
--05-MAR-2007 FLEXCUBE V.CL Release 7.2 prime loan changes -- FCCV.CL7.2 IUT SCF-93 new procedure is added which will asign value to package level variable
which will be called from lspmnt..
06-JUNE-2007 perftuningchanges05JUNE07 - Performance tuning changes.
08-JUNE-2007 perftuningchanges08JUNE07 - Performance tuning changes.
12-JUN-2007 PerfTuningChanges "CITILS, LC Balance   Movement" IT-BugFix
27-JUL-2007 FLEXCUBE V.CL Release 7.3 FDLIQD CHANGES, In fn_reverse_fwdliqd, p_contract_ref_no parameter is made IN OUT
8-oct-2007  FCC V.CL Release 7.3 CITIUS-LS Till#625,messaging related changes,
12-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#4,The requirement is that users should be able to input future valued Drawdown payments and on
				payment value date during the batch this payment will be processed.
				06-JUNE-2007 perftuningchanges05JUNE07 - Performance tuning changes.
				08-JUNE-2007 perftuningchanges08JUNE07 - Performance tuning changes.
23-APR-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-1140. To reprocess the failed future dated failed payments.
09-SEP-2009 FLEXCUBE V.CL Release 7.5 lot1.1 Sighting Funds RT Fixes added a new function fn_fft_part_check declaration.
02-NOV-2009 CITIUS-LS TILL#6524 (JIRA#1476) If the liqd got fired corresponding to the BLIQ event during LS batch then it should not populate the browser table
27-OCT-2010 Flexcube V.CL Release 7.8 FS VOL2 Tag 07 Global Amount for Non-Lead changes,Added two new function fn_global_amount_calc to calculate the global amount during Payment and fn_update_cont_tables to update the contract tables.
16-MAR-2012 Flexcube V.CL Release 7.10,CITIUS Retro, CITIUS-LS#12513 fn_update_cont_tables - new columns added.
11-May-2018 LS14.1 ECA changes --Logged records into ECA table for DDA processing

  Changed By         : Surya Prabha S
  Changed On         : 14-Feb-2020
  Search String      : OBCL_14.4_LS_Multi_Auth
  Change Reason      : Multi Authorization changes.
  
  Changed By         : Sowmya Bitra
  Changed On         : 07-June-2021
  Search String      : Bug#32949409 changes
  Change Reason      : Changes made to consider Account level ECA flag also for ECA status check during authorization of consol reprice
  
  **Changed By         : Arunprasath
  **Date               : 23-May-2022
  **Change Description : Added g_processing_event global variable for RFR manual liquidation action
  **Search String      : SOFR_Bug#34173705

  **Changed By         : Divya J
  **Date               : 17-Oct-2022
  **Change Description : LBDPYMNT: FUTURE DATED LIQUIDATION IS NOT INITIATED
  **Search String      : Bug#34623132  

  **Changed By         : Sowmya Bitra
  **Date               : 25-July-2024
  **Change Description : OBCL_14.8_Payment_Capitalize Changes 
  **Search String      : Bug#36866128

  **Changed By         : Sowmya Bitra
  **Date               : 23-August-2024
  **Change Description : OBCL_14.8_Payment_Capitalize Changes 
                         Reverting VAMI approach changes
  **Search String      : Bug#36866128_1 
  
  **Changed By         : Sowmya Bitra
  **Date               : 25-Sept-2024
  **Change Description : OBCL_14.8_Payment_Capitalize Changes For Amort loans
  **Search String      : Bug#36866128_2 Changes
---------------------------------------------------------------------------------------------------*/



--05-MAR-2007 FLEXCUBE V.CL Release 7.2 prime loan changes starts -- FCCV.CL7.2 IUT SCF-93
 g_contract_status Char(1) ;
 PROCEDURE Pr_Set_contract_status(P_Default Char Default 'N' );
--05-MAR-2007 FLEXCUBE V.CL Release 7.2 prime loan changes end -- FCCV.CL7.2 IUT SCF-93
g_commit_or_not varchar2(1);--OBCL_14.4_FP_Browser_Changes
--Fcc4.2 OPS related changes starts..
g_auto_auth_status varchar2(1) := 'N'; -- OBCL_14.4_LS_Multi_Auth changes
g_repc_eca_auth_check VARCHAR2(1) := 'N';   --Bug#32949409 changes
g_repc_eca_auth_reqd VARCHAR2(1) := 'N';   --Bug#32949409 changes
g_processing_event varchar2(4); --SOFR_Bug#34173705
g_Batch_Processing VARCHAR2(1) := 'N'; --Bug#34623132 Added
--g_pymnt_cap_process VARCHAR2(1) := 'N'; --Bug#36866128 Changes --Bug#36866128_1  Commented 
g_pymnt_cap_amort  VARCHAR2(1) := 'N'; --Bug#36866128_2 Changes
FUNCTION Fn_fwd_dated_liqd
		(
		 p_contract_ref_no		IN		oltbs_contract.Contract_ref_no%TYPE,
		 p_event_seq_no			IN		oltbs_contract.latest_event_seq_no%TYPE,
		 p_transaction_date		IN		oltbs_contract_liq_summary.Value_date%TYPE,
		 p_err_code			IN	OUT	Varchar2,
		 p_err_param			IN	OUT	Varchar2
		 )
RETURN BOOLEAN;
FUNCTION Fn_batch_fwd_dated_liqd
		 (
		  p_seq_no			IN	Number,	--12-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#4,Retro Changes CITIUS-LS-801
		  p_processing_date			Date,
		  p_commit_freq				Number,
		  p_err_code			IN OUT Varchar2,
		  p_err_param			IN OUT Varchar2
		  )
RETURN BOOLEAN;

--23-APR-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-1140 starts..Overloaded the batch function to pass the contract reference number
FUNCTION Fn_batch_fwd_dated_liqd
		 (
		  p_seq_no			Number,
		  p_processing_date		Date,
		  p_commit_freq			Number,
		  p_contract_ref_no        	varchar2,
		  p_err_code	 	IN OUT Varchar2,
		  p_err_param	 	IN OUT Varchar2
		  )
RETURN BOOLEAN;

--Bug#34623132 Starts
FUNCTION Fn_batch_fwd_dated_liqd
     (
      p_seq_no      Number,
      p_processing_date   Date,
      p_commit_freq     Number,
      p_contract_ref_no         varchar2,
      p_Elcm_Msgid       OUT Sypks_Utils.g_Elcm_Msgid%TYPE,
      p_Eca_Ref_No       OUT VARCHAR2,
      p_rfr_Msgid        OUT Sypks_Utils.g_rfr_Msgid%TYPE,
      p_err_code    IN OUT Varchar2,
      p_err_param   IN OUT Varchar2
      )
RETURN VARCHAR2;

FUNCTION Fn_batch_fwd_dated_liqd_Auth(p_Contract_Ref_No IN Oltbs_Contract_Payment_Due.Contract_Ref_No%TYPE,
                                  p_Event_Seq_No    IN Oltbs_Contract_Payment_Due.Event_Seq_No%TYPE,
                                  p_Branch          IN Oltbs_Contract.Branch%TYPE,
                                  p_User_Id         IN VARCHAR2,
                                  p_Eca_Ref         IN VARCHAR2,
                                  Perrorcode        IN OUT VARCHAR2,
                                  Perrorparam       IN OUT VARCHAR2)
RETURN VARCHAR2;
--Bug#34623132 Ends

--23-APR-2008 FLEXCUBE V.CL Release 7.4 Retro Changes CITIUS-LS-1140 Ends

--Fcc4.2 OPS related changes ends..

FUNCTION fn_contract_liquidation
      (
	pContractRefNo  IN OUT   oltbs_contract.contract_ref_no%type,
	pEventSeqNo     IN OUT   oltbs_contract_event_log.event_seq_no%type,
	pFuncId         IN       smtbs_menu.function_id%type,
	pValueDate      IN OUT   date,
	pErrorCode      IN OUT   Varchar2,
	pParam		IN OUT	 Varchar2
      )
Return Boolean;

--FCC4.2 OPS Changes Start
FUNCTION	fn_contract_liquidation
	(
	pContractRefNo  	IN OUT   	oltbs_contract.contract_ref_no%TYPE,
	pEventSeqNo     	IN OUT   	oltbs_contract_event_log.event_seq_no%TYPE,
	pFuncId         	IN       	smtbs_menu.function_id%TYPE,
	p_event_code		IN 		oltbs_contract.curr_event_code%TYPE,
	pValueDate      	IN OUT   	DATE,
	pErrorCode      	IN OUT   	VARCHAR2,
	pParam	    		IN OUT		VARCHAR2
	)
RETURN BOOLEAN;
--FCC4.2 OPS CHanges End

FUNCTION fn_get_amt_due_for_liq
		(
		p_contract_ref_no IN  	 oltbs_contract.contract_ref_no%type,
		p_event_seq_no	  IN	 oltbs_contract.latest_event_seq_no%Type,
		p_value_date      IN  	 date,
		p_limit_date      IN  	 date,
		p_limit_amt       IN  	 Number,
		p_client_server   IN  	 CHAR,
		p_comp            OUT	 Varchar2,
		p_od_days         OUT	 Varchar2,
		p_amt_due         OUT	 Varchar2,
		p_error_code      IN	OUT Varchar2,
		p_param		  IN	OUT Varchar2
		)
Return Boolean;
--14-AUG-2006 FCC V.CL RELEASE 7.1 Prime loan changes starts
FUNCTION fn_get_amt_due_for_liq
		(
		p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
		p_event_seq_no	  	IN		oltbs_contract.latest_event_seq_no%TYPE,
		p_value_date      	IN  	 	DATE,
		p_limit_date      	IN  	 	DATE,
		p_limit_amt       	IN  	 	NUMBER,
		p_client_server   	IN  	 	CHAR,
		p_components	  	IN 	 	VARCHAR2,
		p_princ_amount	  	IN	 	NUMBER,
		p_complete_liqd		IN		VARCHAR2, --FLEXCUBE V.CL Release 7.1 FS 5.0 Nonprorata Change
		p_comp            	OUT	 	VARCHAR2,
		p_od_days         	OUT	 	VARCHAR2,
		p_amt_due         	OUT	 	VARCHAR2,
		p_error_code      	IN   OUT 	VARCHAR2,
		p_param			IN   OUT 	VARCHAR2
		)
Return Boolean;
--14-AUG-2006 FCC V.CL RELEASE 7.1 Prime loan changes ends

--03-FEB-2002 FCC3.9 LATAM starts
FUNCTION fn_contract_liquidation_sch
      (
	pContractRefNo  IN OUT   oltbs_contract.contract_ref_no%type,
	pEventSeqNo     IN OUT   oltbs_contract_event_log.event_seq_no%type,
	pFuncId         IN       smtbs_menu.function_id%type,
	pValueDate      IN OUT   date,
	pErrorCode      IN OUT   Varchar2,
	pParam	    	IN OUT	 Varchar2
      )
Return Boolean;
--03-FEB-2002 FCC3.9 LATAM ends

--FCC4.2 OPS Changes Start
FUNCTION fn_contract_liquidation_sch
      (
      pContractRefNo  		IN OUT   oltbs_contract.contract_ref_no%TYPE,
      pEventSeqNo     		IN OUT   oltbs_contract_event_log.event_seq_no%TYPE,
      pFuncId         		IN       smtbs_menu.function_id%TYPE,
      p_event_code		IN	 oltbs_contract.curr_event_code%TYPE,
      pValueDate      		IN OUT   DATE,
      pErrorCode      		IN OUT   VARCHAR2,
	pParam	    		IN OUT	VARCHAR2
      )
RETURN BOOLEAN;
--FCC4.2 OPS Changes End

--
-- FCC 42 OPS Focus Testing 304 Changes Starts
--
FUNCTION fn_adjust_pycycm_liqd
	(
	p_contract_ref_no		IN	oltbs_contract.contract_ref_no%TYPE,
	p_user_defined_status		IN	oltbs_contract.user_defined_status%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_param			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--
--FCC 42 OPS Focus Testing 304 Changes Ends
--

--FCC 4.6.2 CITI Contra Changes by Aarthi start
FUNCTION fn_get_cashbasis_amt
			(p_contract_ref_no   		IN  	VARCHAR2,
			 p_event_seq_no 		IN  	VARCHAR2,
			 p_reserve_amt			IN 	NUMBER,
			 p_contra_amt			IN 	NUMBER,
			 p_outstanding_bal		IN 	NUMBER,
			 p_resr_amt			OUT 	NUMBER,
			 p_cicr_amt			OUT 	NUMBER,
			 p_cdcr_amt			OUT 	NUMBER,
			 p_cashbasis_amt		OUT 	NUMBER,
			 p_error_code 			OUT 	VARCHAR2,
			 p_error_param 			OUT 	VARCHAR2
			 )
RETURN BOOLEAN;

FUNCTION fn_contra_accounting
			(p_contract_ref_no   		IN  VARCHAR2,
			 p_authorization_status 	IN  VARCHAR2,
			 p_event_seq_no 			IN  VARCHAR2,
			 p_value_date  			IN DATE,
			 p_cicr_amt				IN NUMBER,
			 p_cdcr_amt				IN NUMBER,
			 p_error_code 			OUT  VARCHAR2,
			 p_error_param 			OUT  VARCHAR2
			 )
RETURN BOOLEAN;
--FCC 4.6.2 CITI Contra Changes by Aarthi end
--08-MAR-2006 Retro as part of Flex cube V CL Release 7.1 by Bincy CITIUS Till#30 LD Enquiry Changes >>
FUNCTION fn_get_amt_due_for_liq_qry
         (
         p_contract_ref_no      IN              oltbs_contract.contract_ref_no%TYPE,
         p_event_seq_no         IN              oltbs_contract.latest_event_seq_no%TYPE,
         p_value_date           IN      OUT     DATE,
         p_limit_date           IN      OUT     DATE,
         p_limit_amt            IN              NUMBER,
         p_client_server        IN              CHAR,
         pIntTillDate         	IN              VARCHAR2,
         p_comp                 OUT             VARCHAR2,
         p_due_dates          	OUT             VARCHAR2,
         p_amt_due              OUT             VARCHAR2,
         p_error_code           IN      OUT     VARCHAR2,
         p_param                IN      OUT     VARCHAR2
         )
RETURN   BOOLEAN;
--FCC V.CL Release 7.3 CITIUS-LS Till#625,messaging related changes,
FUNCTION fn_fft_check
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%Type,
	p_sch_date		IN	oltbs_contract_master.value_date%Type,
	p_esn			IN	oltbs_contract.LATEST_EVENT_SEQ_NO%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_param		IN OUT	Varchar2
	)
RETURN  BOOLEAN;
--FCC V.CL Release 7.3 CITIUS-LS Till#625,messaging related changes,
--09-SEP-2009 FLEXCUBE V.CL Release 7.5 lot1.1 Sighting Funds RT Fixes starts
FUNCTION fn_fft_part_check
	(
	p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
	p_sch_date		IN		oltbs_contract_master.value_date%TYPE,
	p_esn			IN		oltbs_contract.latest_event_seq_no%TYPE,
	p_error_code		IN OUT	Varchar2,
	p_error_param		IN OUT	Varchar2
	)
RETURN  BOOLEAN;
--09-SEP-2009 FLEXCUBE V.CL Release 7.5 lot1.1 Sighting Funds RT Fixes ends
--08-MAR-2006 Retro as part of Flex cube V CL Release 7.1 by Bincy CITIUS Till#30 LD Enquiry Changes >>
--perftuningchanges05JUNE07 start
FUNCTION fn_reverse_fwdliqd
	(
	--p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_contract_ref_no	IN OUT	oltbs_contract.contract_ref_no%TYPE,	--FLEXCUBE V.CL Release 7.3 FDLIQD CHANGES
	p_current_esn		IN	oltbs_contract_event_log.event_seq_no%TYPE,
	p_new_esn		IN	oltbs_contract_event_log.event_seq_no%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--perftuningchanges05JUNE07 end
--perftuningchanges08JUNE07 start
--12-JUN-2007 PerfTuningChanges "CITILS, LC Balance   Movement" IT-BugFix t start
/*
 FUNCTION fn_post_payment_processing
						(p_contract_ref_no	IN OUT VARCHAR2,
						 p_value_date		IN OUT DATE ,
						 p_event_seq_no		IN OUT NUMBER,
						 p_err_code		OUT		VARCHAR2 ,
						 p_err_param		OUT		VARCHAR2
						 )
RETURN BOOLEAN;
*/

 FUNCTION fn_post_payment_processing
						(p_contract_ref_no	IN  VARCHAR2,
						 p_value_date		IN  DATE ,
						 p_event_seq_no		IN  NUMBER,
						 p_err_code		OUT VARCHAR2 ,
						 p_err_param		OUT VARCHAR2
						 )
RETURN BOOLEAN;
--12-JUN-2007 PerfTuningChanges "CITILS, LC Balance   Movement" IT-BugFix t end
--perftuningchanges08JUNE07 end
g_future_dated_liqd varchar2(1);--02-NOV-2009 CITIUS-LS TILL#6524 (JIRA#1476)
--27-OCT-2010 Flexcube V.CL Release 7.8 FS VOL2 Tag 07 Global Amount for Non-Lead changes starts
FUNCTION fn_global_amount_calc
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE
	, p_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE
	, p_effective_date	IN	oltbs_contract.latest_event_date%TYPE
	, p_pmnt_amount		IN	oltbs_contract_master.amount%TYPE
	, p_err_code		IN OUT	VARCHAR2
	, p_err_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_update_cont_tables
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE
	, p_event_seq_no	IN	oltbs_contract.latest_event_seq_no%TYPE
	, p_effective_date	IN	oltbs_contract.latest_event_date%TYPE
	, p_new_global_amount	IN	oltbs_contract_master.global_amount%TYPE
	, p_old_global_amount	IN   	oltbs_contract_master.global_amount%TYPE
	, p_global_share		IN	lbtbs_contract_global_amount.global_share%TYPE --16-MAR-2012 Flexcube V.CL Release 7.10,CITIUS Retro, CITIUS-LS#12513 start
	, p_dd_ref_no			IN	lbtbs_contract_global_amount.dd_ref_no%TYPE
	, p_dd_esn				IN	lbtbs_contract_global_amount.dd_esn%TYPE --16-MAR-2012 Flexcube V.CL Release 7.10,CITIUS Retro, CITIUS-LS#12513 end
	, p_err_code		IN OUT	VARCHAR2
	, p_err_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--27-OCT-2010 Flexcube V.CL Release 7.8 FS VOL2 Tag 07 Global Amount for Non-Lead changes ends

--LS14.1 ECA changes Starts
FUNCTION	fn_process_eca_for_contract
	(
	pContractRefNo  		IN OUT   	oltbs_contract.contract_ref_no%TYPE,
	pEventSeqNo     		IN OUT   	oltbs_contract_event_log.event_seq_no%TYPE,
    p_split_serial_no IN LBTB_contract_split_master.SPLIT_SERIAL_NO%TYPE,
	pFuncId         		IN       	smtbs_menu.function_id%TYPE,
	p_event_code			IN 		oltbs_contract.curr_event_code%TYPE,
    p_Eca_Ref_No           OUT VARCHAR2,
	pValueDate      		IN OUT   	DATE,
	pErrorCode      		IN OUT   	VARCHAR2,
	pParam	    			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--LS14.1 ECA changes ends
--OBCL_14.4_FP_Browser_Changes :: Starts
FUNCTION Fn_Process_Liqd_On_Unhold(p_contract_ref_no IN oltbs_Contract.contract_ref_no%TYPE,
                                   p_Error_Code      IN OUT VARCHAR2,
                                   p_Error_Parameter IN OUT VARCHAR2)
  RETURN BOOLEAN;
--OBCL_14.4_FP_Browser_Changes :: Ends
End lbpks_manual_liquidation;
/
CREATE or replace SYNONYM lbpkss_manual_liquidation FOR lbpks_manual_liquidation
/