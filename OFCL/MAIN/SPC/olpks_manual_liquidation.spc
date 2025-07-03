CREATE OR REPLACE PACKAGE olpks_manual_liquidation AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_manual_liquidation.SPC
**
** Module		: LOANS and DEPOSITS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.
	Copyright Â© 2019 , Oracle and/or its affiliates.  All rights reserved.
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East),
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*--------------------------CHANGE HISTORY-----------------------------------------------------------
03-FEB-2002 FCC3.9 LATAM	The Status movement is done schedule wise,affecting only the components relating to that
					schedule.The status movement moves only the outstanding relating to that component to a
					new accounting head /GL.This status Change happens only if the parameter Schedule Level
					Status change, which is in the preferences of the Loan Product Definition, is set
					to 'Y' i.e., Checked.
					Whenever  a change of Status happens (Schedule Level /Contract Level) ,the accruals for the
					current month,current year and previous year is recalculated and passed against the GL's
					maintained for current year and previous year in Chart Of ACCOUNTS of General Ledger.
					This tracking of accruals happens only if the parameter Track PNL Hist. , maintained at
					the bank parameters,is set  to 'Y' i.e., Checked.

14-May-2003 Fcc4.2 OPS related changes..Added new functions Fn_fwd_dated_liqd which will be called while saving the
						    forward dated payment and Fn_batch_fwd_dated_liqd which will do the actual 							    liquidation process as part of batch for forward dated payments..

23-May-2003 Fcc4.2 OPS related changes..Added new function fn_process_rrpl

22-Jul-2005 FCC 4.6.2 CITI Contra Changes by Aarthi
			Added new functions fn_get_cashbasis_amt and fn_contra_accounting.
08-MAR-2006 Retro as part of Flex cube V CL Release 7.1 by Bincy CITIUS Till#30 LD Enquiry Changes.
06-OCT-2008 FCC V.CL Release 7.4,FS LOT 6,Auto funding Changes
08-Apr-2009 FLEXCUBE V.CL Release 7.5 lot1 ITR2 SFR#17 changes, during full payment of loan If the contract is going to be marked
		as liquidated,then Informational message stating Unamortized St.Line Fees will be Amortized as part of
		this Liquidation,If the contract is going to be kept active then an Override message stating do you want to
		amortize st.line fee amount that is unamortized.Click of Yes to Trigger FACR Event click of No to accrue the
		Unamortized st.line fee amount till the maturity date of the Loan
14-May-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag#12 << Overpayment and refund of Interest and fees >>
		Added new function fn_Liquidate_refund,to refund the interest and fees.
15-JUN-2009 FLEXCUBE V.CL RELEASE 7.5 LOT2 ITR1 SFR#167 ADDED TWO NEW FUNCTION FOR refund functionality
14-AUG-2009 FLEXCUBE V.CL Release 7.5 LOT3 FS Tag 6 Function fn_get_amt_for_refund is modified to get total amt paid,totoal over paid amt only
05-OCT-2009 FLEXCUBE V.CL Release 7.5 lot3 ITR2 SFR#8 New function to Update Billing History in case of manaul liquidation and Deletion of manaul payment b4 auth
	    and reversal of payment
09-May-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes, Contra Increase based on Net Carry Value and COC flag changes
17-AUG-2011 Flexcube V.CL Release 7.10,CITIUS Retro,CITIUS-LS#9295 changes,Added paramter in Fn_batch_fwd_dated_liqd
05-Jan-2012 Flexcube V.CL Release 7.9,EURCITIPLC-LD#12265 changes, included new procedure pr_contra_flag and global variable to set flag for contra adjustments.
14-NOV-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag03,Cost of Credit - Reversal for Cost of Credit valuation actions changes,modified the code in fn_contra_accounting for reversal cases.
14-Apr-2017 OFCL12.4 changes.Added procedure pr_auto_auth_payment to authorise manual payment.Search String:OFCL12.4 changes
4-Mar-2019 OBCL_14.3_Moratorium changes.Global variable declaration for moratorium till date interest computation.Search String:OBCL_14.3_Moratorium

	**Changed By         : Chandra Achuta
    **Changed On         : 04-NOV-2019
    **Change Description : Added global variable for knowing the current event
    **Search String      : Bug#30489117
	
	**Changed By         : Jayaram N
    **DATE               : 21-Jan-2020
    **Change Description : SLT:Added changes for Primary Delayed Compensation
    **Search String      : OBCL14.4:SFR#29959798:Primary_Delayed_Compensation
    
    **Changed By         : Kavitha Asokan
    **Date               : 28-Aug-2020
    **Change Description : Removed new function - liquidate the credit component
    **Search String      : OBCL14.4_Ristourne_component changes
	
	**Changed By         : Chandra Achuta
	**Date               : 09-AUG-2020
	**Change Description : Added code for Addition_Interest_Schedule_Partial_Prepayment
	**Search String      : OBCL_14.4_payment_schedule_addition_SOFR
	
	**Changed By         : Arunprasath
	**Date               : 23-May-2022
	**Change Description : Added g_processing_event global variable for RFR manual liquidation action
	**Search String      : SOFR_Bug#34173705
    
	**  Changed By         : Abhik Das
    **  Changed On         : 17-Oct-2023
    **  Change Description : TFB need to waive liquidation amount. So, they want hook to update few 
                             local variables as part of custom code.
                             Hooks provided to modify the local variables as part of their customisation.
                             Added function Fn_allow_waive_liquidation_amount for providing pre and post hook.
                             Ref No- TPBKTW_14.7_19_SEP_2023_01_0000
						           - TPBKTW_14.7_19_SEP_2023_01_0001
    **  Search String      : OBCL_14.7_TFB_Hook_Bug#35910475_Changes
	
  **Changed By         : Sowmya Bitra
  **Date               : 15-July-2024
  **Change Description : OBCL_14.8_Payment_Capitalize Changes 
  **Search String      : Bug#36830170
  
   **Changed By         : Vineeth T M
**Date               : 30-Jul-2024
**Change Description : OBCL_14.8_VER_ROL Changes
**Search String      : OBCL_14.8_VER_ROL Changes   

  **Changed By         : Sowmya Bitra
  **Date               : 23-August-2024
  **Change Description : OBCL_14.8_Payment_Capitalize Changes 
                         Reverting VAMI approach changes and processing cap with LIQD itself
  **Search String      : Bug#36866128_1 

  **Changed By         : Sowmya Bitra
  **Date               : 25-Sept-2024
  **Change Description : OBCL_14.8_Payment_Capitalize Changes For Amort loans
  **Search String      : Bug#36866128_2 Changes
  
      **Changed By         : Revathi Dharmalingam
	**Date               : 11-OCT-2024
	**Change Description : Added code to apply sch cutoff logic only prepayment done during manual payment
	**Search String      : OBCL_14.7_Support_Bugs_37148467_Changes
	
  **Changed By         : Sowmya Bitra
  **Date               : 03-Jan-2025
  **Change Description : Fix for updating penalty basis amount and accrue increased penalty during backdated capitalization 
  **Search String      : Bug#37174578 Changes
  
---------------------------------------------------------------------------------------------------
*/



--Fcc4.2 OPS related changes starts..

g_contra_adj_flag	VARCHAR2(2); --05-Jan-2012 Flexcube V.CL Release 7.9,EURCITIPLC-LD#12265 changes
g_moratill_Date Oltb_Amount_Due.Due_Date%Type;--OBCL_14.3_Moratorium Changes
g_previous_event       BOOLEAN := FALSE;     --Bug#30489117  code added
g_amount_sett_upd varchar2(1):='N';   --OBCL_14.4_payment_schedule_addition_SOFR  Code Added
g_processing_event varchar2(4); --SOFR_Bug#34173705
--g_pymnt_cap_process VARCHAR2(1) := 'N'; --Bug#36830170 Changes --Bug#36866128_1  Commented 
g_pymnt_cap_amort  VARCHAR2(1) := 'N'; --Bug#36866128_2 Changes
g_prepmt_done VARCHAR2(1) :='N'; --OBCL_14.7_Support_Bugs_37148467_Changes
g_pmt_cap VARCHAR2(1) := 'N'; --Bug#37174578 Changes
FUNCTION Fn_fwd_dated_liqd
		(
		 p_contract_ref_no		IN		oltbs_contract.Contract_ref_no%TYPE,
		 p_event_seq_no			IN		oltbs_contract.latest_event_seq_no%TYPE,
		 p_transaction_date		IN		oltbs_contract_liq_summary.Value_date%TYPE,
		 p_err_code				IN	OUT	Varchar2,
		 p_err_param			IN	OUT	Varchar2
		 )
RETURN BOOLEAN;

FUNCTION Fn_batch_fwd_dated_liqd
		 (
		  p_processing_date			   Date,
		  p_commit_freq				   Number,
		  p_err_code			IN OUT Varchar2,
		  p_err_param			IN OUT Varchar2
		  ,p_contract_ref_no     IN Varchar2  DEFAULT NULL --17-AUG-2011 Flexcube V.CL Release 7.10,CITIUS Retro,CITIUS-LS#9295 changes
		  )
RETURN BOOLEAN;

--Fcc4.2 OPS related changes ends..

FUNCTION fn_contract_liquidation
      (
      pContractRefNo  IN OUT   oltbs_contract.contract_ref_no%type,
      pEventSeqNo     IN OUT   oltbs_contract_event_log.event_seq_no%type,
      pFuncId         IN       smtbs_menu.function_id%type,
      pValueDate      IN OUT   date,
      pErrorCode      IN OUT   Varchar2,
	  pParam		  IN OUT	 Varchar2
      )
Return Boolean;

--FCC4.2 OPS Changes Start
FUNCTION	fn_contract_liquidation
	(
	pContractRefNo  		IN OUT   	oltbs_contract.contract_ref_no%TYPE,
	pEventSeqNo     		IN OUT   	oltbs_contract_event_log.event_seq_no%TYPE,
	pFuncId         		IN       	smtbs_menu.function_id%TYPE,
	p_event_code		IN 		oltbs_contract.curr_event_code%TYPE,
	pValueDate      		IN OUT   	DATE,
	pErrorCode      		IN OUT   	VARCHAR2,
	pParam	    		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--FCC4.2 OPS CHanges End
---OBCL_14.7_TFB_Hook_Bug#35910475_Changes Starts---
FUNCTION  fn_allow_waive_liquidation_amount
  (
  pContractRefNo        IN oltbs_contract.contract_ref_no%TYPE,
  pEventSeqNo           IN oltbs_contract_event_log.event_seq_no%TYPE,
  pFuncId               IN smtbs_menu.function_id%TYPE,
  p_event_code          IN oltbs_contract.curr_event_code%TYPE,
  pValueDate            IN OUT DATE,
  p_component           IN OUT Oltbs_amount_due.Component%TYPE,
  p_complist            IN OUT VARCHAR2,
  p_taglist             IN OUT VARCHAR2,
  p_tagccylist          IN OUT VARCHAR2,
  p_tagreinvindlist     IN OUT VARCHAR2,
  p_tagamtlist          IN OUT VARCHAR2,
  p_valdtlist           IN OUT VARCHAR2,
  p_taginstrlist        IN OUT VARCHAR2,
  p_penalty_tags        IN OUT VARCHAR2,
  p_penalty_amts        IN OUT VARCHAR2,
  p_dtag_ccy            IN OUT VARCHAR2,
  p_subp_amount         IN OUT Oltbs_amount_due.Amount_due%TYPE,
  p_Instrument_No_List  IN OUT VARCHAR2,
  pErrorCode            IN OUT VARCHAR2,
  pParam                IN OUT VARCHAR2
  )
RETURN BOOLEAN;
----OBCL_14.7_TFB_Hook_Bug#35910475_Changes Ends----

FUNCTION fn_get_amt_due_for_liq
		(
		p_contract_ref_no IN  	 oltbs_contract.contract_ref_no%type,
		p_event_seq_no		IN		oltbs_contract.latest_event_seq_no%Type,
		p_value_date      IN  	 date,
		p_limit_date      IN  	 date,
		p_limit_amt       IN  	 Number,
		p_client_server   IN  	 CHAR,
		p_comp            OUT	 Varchar2,
		p_od_days         OUT	 Varchar2,
		p_amt_due         OUT	 Varchar2,
		p_error_code      IN	OUT Varchar2,
		p_param				IN	OUT Varchar2
		)
Return Boolean;

--03-FEB-2002 FCC3.9 LATAM starts
FUNCTION fn_contract_liquidation_sch
      (
      pContractRefNo  IN OUT   oltbs_contract.contract_ref_no%type,
      pEventSeqNo     IN OUT   oltbs_contract_event_log.event_seq_no%type,
      pFuncId         IN       smtbs_menu.function_id%type,
      pValueDate      IN OUT   date,
      pErrorCode      IN OUT   Varchar2,
	pParam	    IN OUT	 Varchar2
      )
Return Boolean;
--03-FEB-2002 FCC3.9 LATAM ends

--FCC4.2 OPS Changes Start
FUNCTION fn_contract_liquidation_sch
      (
      pContractRefNo  		IN OUT   	oltbs_contract.contract_ref_no%TYPE,
      pEventSeqNo     		IN OUT   	oltbs_contract_event_log.event_seq_no%TYPE,
      pFuncId         		IN       	smtbs_menu.function_id%TYPE,
      p_event_code		IN		oltbs_contract.curr_event_code%TYPE,
      pValueDate      		IN OUT   	DATE,
      pErrorCode      		IN OUT   	VARCHAR2,
	pParam	    		IN OUT	VARCHAR2
      )
RETURN BOOLEAN;
--FCC4.2 OPS Changes End

--
-- FCC 42 OPS Focus Testing 304 Changes Starts
--
FUNCTION fn_adjust_pycycm_liqd
	(
	p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE,
	p_user_defined_status		IN		oltbs_contract.user_defined_status%TYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_param			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--
--FCC 42 OPS Focus Testing 304 Changes Ends
--

--FCC 4.6.2 CITI Contra Changes by Aarthi start
FUNCTION fn_get_cashbasis_amt
			(p_contract_ref_no   		IN  VARCHAR2,
			 p_event_seq_no 			IN  VARCHAR2,
			 p_reserve_amt			IN NUMBER,
			 p_contra_amt			IN NUMBER,
			 p_outstanding_bal		IN NUMBER,
			 p_resr_amt				OUT NUMBER,
			 p_cicr_amt				OUT NUMBER,
			 p_cdcr_amt				OUT NUMBER,
			 p_cashbasis_amt			OUT NUMBER,
			 p_frsv_amt					OUT	NUMBER, --09-May-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes here
			 p_error_code 			OUT  VARCHAR2,
			 p_error_param 			OUT  VARCHAR2
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
			,p_rvcr_amt				IN NUMBER DEFAULT 0 --14-NOV-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 FS Vol1 Tag03 changes
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
--08-MAR-2006 Retro as part of Flex cube V CL Release 7.1 by BincyCITIUS Till#30 LD Enquiry Changes >>
--06-OCT-2008  FCC V.CL Release 7.4,FS LOT 6,Auto funding Changes Starts
FUNCTION Fn_Liquidate_Deposit
		(	p_Contract_Ref_no		IN	oltbs_contract.Contract_Ref_no%Type
		 ,	p_Liqd_esn			IN	oltbs_contract.Latest_Event_Seq_No%type
		 ,	p_Error_Code		OUT	Varchar2
		 ,	p_Error_Param		OUT	Varchar2
		 ,	p_Prepayment	IN	VARCHAR2 DEFAULT 'N' --OBCL14.4:SFR#29959798:Primary_Delayed_Compensation - Changes
		)
RETURN   BOOLEAN;
--06-OCT-2008  FCC V.CL Release 7.4,FS LOT 6,Auto funding Changes ends
--08-Apr-2009 FLEXCUBE V.CL Release 7.5 lot1 ITR2 SFR#17 Start
procedure pr_set_unamort_flag(pm_flag Varchar2);
function fn_get_umamort_flag Return Varchar2;
--08-Apr-2009 FLEXCUBE V.CL Release 7.5 lot1 ITR2 SFR#17 End
--14-May-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag#12 << Overpayment and refund of Interest and fees >> Starts
function fn_Liquidate_refund
(
 p_module IN VARCHAR2,
 p_contract_ref_no IN	oltbs_contract.Contract_Ref_no%Type,
 p_current_event_seq_no IN	oltbs_contract.Latest_Event_Seq_No%type,
 p_value_date IN DATE,
 p_user_defined_status VARCHAR2,
 p_error_code OUT VARCHAR2,
 p_error_parameter OUT VARCHAR2
 )
RETURN BOOLEAN;
--14-May-2009 FLEXCUBE V.CL Release 7.5 lot2 FS Tag#12 << Overpayment and refund of Interest and fees >> Ends

-- 15-JUN-2009 FLEXCUBE V.CL RELEASE 7.5 ITR1 SFR#167 added by sudhakar for refund functionality starts
Function fn_get_amt_for_refund
		(
		p_contract_ref_no	IN  oltbs_contract.contract_ref_no%type,
		p_comp			OUT Varchar2,
		/* --FLEXCUBE V.CL Release 7.5 LOT3 FS Tag 6 START
		p_liqd_esn		OUT Varchar2,
		p_value_date		OUT Varchar2,
		p_due_date		OUT Varchar2,
		p_amount_due		OUT Varchar2,
		*/
		p_amount_overpaid OUT Varchar2,
    		--FLEXCUBE V.CL Release 7.5 LOT3 FS Tag 6 End
		p_amount_paid		OUT Varchar2,
		--p_refund_amt		OUT Varchar2, --FLEXCUBE V.CL Release 7.5 LOT3 FS Tag 6
		p_error_code		IN OUT varchar2,
		p_error_param		IN OUT varchar2
		)
RETURN BOOLEAN;

Function fn_get_refund_for_component
		(
		p_contract_ref_no	IN  oltbs_contract.contract_ref_no%type,
		p_component		IN  oltbs_amount_due_cs.component%type,
		p_component_type	IN  oltbs_amount_due_cs.component_type%type,
		p_refund_rec		OUT oltbs_contract_refund%rowtype,
		p_error_code		IN OUT varchar2,
		p_error_param		IN OUT varchar2
		)
RETURN BOOLEAN;
-- 15-JUN-2009 FLEXCUBE V.CL RELEASE 7.5 ITR1 SFR#167 added by sudhakar for refund functionality ends
--FLEXCUBE V.CL Release 7.5 lot3 ITR2 SFR#8 Start
FUNCTION FN_UPDATE_BILL_HISTORY
(
p_contract_ref_no  IN  oltbs_contract.contract_ref_no%TYPE,
p_component        IN  oltbs_amount_due.component%TYPE,
p_amount           IN  oltbs_amount_due.amount_settled%TYPE,
p_esn		   IN  oltbs_contract.latest_event_seq_no%TYPE,
p_error_code	   IN OUT varchar2
)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.5 lot3 ITR2 SFR#8 End

--09-May-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes start here
FUNCTION fn_reserve_liquidation
	(
	p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
	p_reserve_to_liqd	IN		oltbs_contract_balance.reserve_amt%TYPE,
	p_event_code		IN		oltbs_contract.curr_event_code%TYPE,
	p_value_date		IN		DATE,
	p_liqd_event_seq_no	IN		NUMBER,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--09-May-2011 Flexcube V.CL Release 7.9, Cost of Credit Changes end here


--OBCL14.4:SFR#29959798:Primary_Delayed_Compensation - Changes start
FUNCTION Fn_fwd_liqd_for_deposit
	(
		p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
		p_esn				IN		NUMBER,
		p_ref_no			IN		oltbs_contract.contract_ref_no%TYPE,
		p_error_code		IN OUT	VARCHAR2,
		p_error_msg			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--OBCL14.4:SFR#29959798:Primary_Delayed_Compensation - Changes Ends


PROCEDURE pr_contra_flag (p_val Varchar2); --05-Jan-2012 Flexcube V.CL Release 7.9,EURCITIPLC-LD#12265 changes

--OFCL12.4 changes starts

PROCEDURE pr_auto_auth_payment;
--OFCL12.4 changes ends
--OBCL_14.8_VER_ROL Changes start
Function Fn_Calc_Accr(p_Contract_Ref_No In  Oltbs_Contract.Contract_Ref_No%TYPE,
            p_Component  In Oltb_Amount_Due.Component%TYPE,
            p_Value_Date   In  DATE,
            p_Limit_Date   In  DATE,
            Perrorcode     In OUT VARCHAR2,
            Pparam         In OUT VARCHAR2
            )
Return Boolean;
--OBCL_14.8_VER_ROL Changes end
End olpks_manual_liquidation;
/
CREATE OR REPLACE SYNONYM olpkss_manual_liquidation FOR olpks_manual_liquidation
/