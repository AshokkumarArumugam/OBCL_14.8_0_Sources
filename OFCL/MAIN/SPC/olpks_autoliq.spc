CREATE OR REPLACE PACKAGE olpks_autoliq
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_autoliq.SPC
**
** Module		: LOANS AND DEPOSITS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.
	Copyright ? 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East),
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*
8-APR-2003  FCC 4.2 OPS Changes   New function added to populate overdue amounts for principle and interest components at end of day.
29-MAR-2004 FCC4.5 LOT2 ONLINE QUEUE CHANGES
30-JUL-2004 FCC 4.6 Sep04 Retro (India)Tax Deduction on Over Night Deposits
18-SEP-2004 FCC4.6 Sep04 ITR1 sfr 540 err_code type changed from err_code%type to varchar2 in all palces
19-JAN-2006	FLEXCUBE V CL RELEASE 7.1 Schedules Related Changes by Yogesh --> added function fn_auto_expy
28-JUN-2007 FCC V.CL Release 7.3 rollover site retro changes
               (18-DEC-2006 CITIUS-LS#589 ARUN, CHANGES,
		FN_AUTO_LIQ_PROD is renamed by FN_PROCESS_FOR_CONTRACT, and new function created in same name FN_AUTO_LIQ_PROD and this funcition internally calls fn_process_for_contract, which does what previously FN_AUTO_LIQ_PROD doing.
		A New function is_this_an_err is created.
		A new Exception process_next_contract is created.
	       )
12-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#4,Retro Changes CITIUS-LS-801,RolloverJob new changes
15-MAR-2017 OFCL12.4 changes -- Created function fn_create_eca_request and pr_auto_liq
	**Changed By         : Meha
	**Date               : 18-JUL-2019
	**Change Description : Auto Capitalization Changes
	**Search String      : OBCL_14.4_Autocap

    **Changed By         :Akhila Samson
    **Date               :24-OCT-2019
    **Change Description :Added TYPE variable TY_BAL_REC
    **Search String      :Bug#30331212
	
	**Changed By         : Kavitha Asokan
	**Date               : 21-Aug-2020
	**Change Description : Ristourne Component changes
	**Search String      : OBCL14.4_Ristourne_component 

**  Modified By     : Narendra Dhaker
**  Modified On     : 17-FEB-2022
**  Modified Reason : Increasing the amount field decimals to maximum
**  Search String   : Bug#33809404_DecimalChange

    **Changed By         : Rahul Garg
    **Changed On         : 30-Jun-2023
    **Change Reason      : Added variable to update the participant vdbal balances post EXPY event.
    **Search String      : Bug#35422999 

  **Changed By         : Sowmya Bitra
  **Date               : 23-August-2024
  **Change Description : OBCL_14.8_Payment_Capitalize Changes 
                         Reverting VAMI approach changes and processing cap with LIQD itself
  **Search String      : Bug#36866128_1 
  
  
  	
   **Changed By         : Sudharshini Balaji
   **Date               : 13-Dec-2024
   **Change Description : Added new function which is to be called for RFR-ELCM-LBVS as Y for Principal LIQD on contract save.
   **Search String      : Bug#37380040 	
------------------------------------END CHANGE HISTORY------------------------------
*/
-- changes start for Bug#35422999 
g_expy_event        VARCHAR2(1) := 'N'; 
g_expy_date			DATE; 
-- changes end for Bug#35422999 
 --Bug#30331212 start
    TYPE Ty_Bal_Rec IS RECORD(
      p_Acc_Branch Oltbs_Account.Branch_Code%TYPE,
      p_Account    Oltbs_Account.Ac_Gl_No%TYPE,
      p_Ac_Or_Gl   Oltbs_Account.Ac_Or_Gl%TYPE,
      p_Acc_Ccy    Cytms_Ccy_Defn.Ccy_Code%TYPE,
      --p_Balance    NUMBER(22,3), --Bug#33809404_DecimalChange 
      p_Balance    NUMBER, --Bug#33809404_DecimalChange
      p_Exrate     NUMBER);

	TYPE Ty_Bal_Tab IS TABLE OF Ty_Bal_Rec INDEX BY BINARY_INTEGER;
--Bug#30331212 end

--OBCL_14.4_Autocap Changes Starts
Type  Contract_Liq_Record Is Record
	(
	Contract_Ref_No					Oltbs_Contract.Contract_Ref_No%Type,
	Latest_Version_No				Oltbs_Contract.Latest_Version_No%Type,
	Latest_Event_Seq_No				Oltbs_Contract.Latest_Event_Seq_No%Type,
	Status							Oltbs_Contract.User_Defined_Status%Type,
	Currency						Oltbs_Contract.Contract_Ccy%Type,
	Product_Code					Oltbs_Contract.Product_Code%Type,
	Module_Code						Oltbs_Contract.Module_Code%Type,
	Min_Amt_Partial_Liq				Oltms_Product_Master_Ld.Min_Amt_Partial_Liq%Type,
	Min_Amt_Ccy						Oltms_Product_Master_Ld.Min_Amt_Ccy%Type,
	Verify_Funds					Oltbs_Contract_Preference.Verify_Funds%Type,
	Deduct_Tax_On_Capitalisation	Oltbs_Contract_Preference.Deduct_Tax_On_Capitalisation%Type,
	Schedule_Type					Oltbs_Contract_Preference.contract_schedule_Type%Type,
	Value_Date						Oltbs_Contract_Master.Value_Date%Type,
	Maturity_Type					Oltbs_Contract_Master.Maturity_Type%Type,
	Rollover_Allowed				Oltbs_Contract_Master.Rollover_Allowed%Type,
	Maturity_Date					Oltbs_Contract_Master.Maturity_Date%Type,
	Product_Type					Oltbs_Contract.Product_Type%Type,
	Credit_Line						Oltbs_Contract_Master.Credit_Line%Type,
	Main_Comp						Oltbs_Contract_Master.Main_Comp%Type,
	Counterparty					Oltbs_Contract.Counterparty%Type,
	Payment_Method					Oltbs_Contract_Master.Payment_Method%Type,
	Rollover_Type					Oltbs_Contract_Rollover.Rollover_Type%Type,
	Track_Accrued_Interest			Oltms_Product_Master_Ld.Track_Accrued_Interest%Type,
	Rollover_Method				    Oltbs_Contract_Master.Rollover_Method%Type,
	Rollover_Mechanism     			Oltbs_Contract_Master.Rollover_Mechanism%Type,
	Rollover_Indicator				Oltbs_Contract_Master.Rollover_Indicator%Type,
	Parent_Contract_Ref_No			Oltbs_Contract_Master.Parent_Contract_Ref_No%Type,
	Roll_Inst_Status				Oltbs_Contract_Rollover.Roll_Inst_Status%Type,
	Tranche_Ref_No					Oltbs_Contract.Contract_Ref_No%Type,
	Prime_Loan					    Oltms_Product_Master_Ld.Prime_Loan%Type,
	Change_To_Manual				Oltbs_Contract_Rollover.Change_To_Manual%Type,
	Department_Code					Oltbs_Contract.Department_Code%Type,
	Agency_Contract					Oltbs_Contract_Master.Agency_Contract%Type
	--,Auto_Cap						Oltb_Contract_Schedules.Auto_Cap_Int_Allowed%Type
	);
Type Ref_Contracts_To_Be_Liq Is Ref Cursor Return Contract_Liq_Record;
g_auto_cap_process			VARCHAR2(1):= 'N';
--OBCL_14.4_Autocap Changes Ends



contract_liqd_reprocess		EXCEPTION; -- FCC 4.5Lot1
process_next_contract		EXCEPTION; -- 28-JUN-2007 FCC V.CL Release 7.3 rollover site retro changes


FUNCTION	fn_auto_liq
	(
	pBranch  			IN 		oltbs_contract.branch%type,
	pModule				IN			oltbs_contract.module_code%type,
	pProcessingDate   IN 		date,
	pProduct 			IN 		oltbs_contract.product_code%type,
	pCommitFreq		   IN  		OLTBS_COMMITFREQ.bod_commit_count%type,
	pJobSeqNo			IN lbtbs_job_queue.seq_no%TYPE, --12-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#4,Retro Changes CITIUS-LS-801
	pErrorcode			IN OUT 	VARCHAR2,
	pErrorParam			IN OUT 	Varchar2
	)
	Return Boolean;

FUNCTION	fn_auto_liq_prod
	(
	pBranch  			IN 		oltbs_contract.branch%type,
	pProcessingDate	IN 		date,
	pProduct 			IN 		oltbs_contract.product_code%type,
	pCommitFreq			IN  		OLTBS_COMMITFREQ.bod_commit_count%type,
	pJobSeqNo			IN		lbtbs_job_queue.seq_no%TYPE, --12-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#4,Retro Changes CITIUS-LS-801
	pErrorcode			IN OUT 	VARCHAR2,
	pErrorParam			IN OUT 	Varchar2
	)
	Return Boolean;
-- 28-JUN-2007 FCC V.CL Release 7.3 rollover site retro changes START, To reprocess AUTOLIQD process for the Failed contracts.
--						 fn_auto_liq_prod funcition internally calls fn_process_for_contract, which does what previously fn_auto_liq_prod doing.
FUNCTION	fn_process_for_contract
	(
	pBranch  			IN 		oltbs_contract.branch%type,
	pProcessingDate	IN 		date,
	pProduct 			IN 		oltbs_contract.product_code%type,
	pCommitFreq			IN  		OLTBS_COMMITFREQ.bod_commit_count%type,
	pContractRefNo			IN		oltbs_contract.CONTRACT_REF_NO%TYPE,--Markandain
	pJobSeqNo			IN	 	lbtbs_job_queue.seq_no%TYPE,  --12-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#4,Retro Changes CITIUS-LS-801
	pErrorcode			IN OUT 	VARCHAR2,
	pErrorParam			IN OUT 	Varchar2
	)
	Return Boolean;
-- 28-JUN-2007 FCC V.CL Release 7.3 rollover site retro changes END, To reprocess AUTOLIQD process for the Failed contracts.
--						 fn_auto_liq_prod funcition internally calls fn_process_for_contract, which does what previously fn_auto_liq_prod doing.
FUNCTION fn_liquidate
	(
	pFuncId				 IN		 smtbs_menu.function_id%type,
	pBranch            IN       oltbs_contract.branch%type,
	pContractRefNo     IN       oltbs_contract.contract_Ref_no%type,
	pModule     		 IN       oltbs_contract.Module_code%type,
	pLatestEsn         IN       oltbs_contract.latest_event_seq_no%type,
	pLatestVsn         IN       oltbs_contract.latest_version_no%type,
	pCounterparty      IN       oltbs_contract.counterparty%type,
	pCurrency          IN       oltbs_contract.contract_ccy%type,
	pMatDate           IN       date,
	pProdType          IN       oltbs_contract.product_type%type,
	pContractValueDate IN		 oltbs_contract_master.Value_Date%type,
	pMaturityType		 IN		 oltbs_contract_master.Maturity_Type%type,
	pVerifyFunds       IN       oltbs_contract_preference.verify_funds%type,
	pMinLiqAmt	    IN      oltms_product_master_ld.min_amt_partial_liq%type,--sitaram
	pMinAmtCcy	    IN      oltms_product_master_ld.min_amt_ccy%type,--sitaram
	pProduct           IN       oltbs_contract.product_code%type,
	pDeductTaxInd      IN       Char,
	pUserDefStatus     IN       oltbs_contract.user_defined_status%type,
	pCreditLine        IN       oltbs_contract_master.credit_line%type,
	pMainComp          IN       oltbs_contract_master.main_comp%type,
	pPmtMeth           IN       oltbs_contract_master.payment_method%type,
	pSchType           IN       Char,
	pTrackAccruedInt   IN       oltms_product_master_ld.track_accrued_interest%type,
	pProcessingDate    IN       date,
	--- TRLRABO - TIL NO. 367
	-- for linked deposits and commitments liquidation of interest etc should still
	-- happen even if they are linked. Only principal should not happen so parameter passed here
      p_skip_comp	    IN	oltbs_contract_master.main_comp%type,
	pErrorcode			 IN OUT 	VARCHAR2,
	pErrorParam			 IN OUT 	Varchar2
	)
	Return Boolean;

FUNCTION fn_liquidate
	(
	pFuncId				 IN		 smtbs_menu.function_id%type,
	pBranch            IN       oltbs_contract.branch%type,
	pContractRefNo     IN       oltbs_contract.contract_Ref_no%type,
	pModule     		 IN       oltbs_contract.Module_code%type,
	pLatestEsn         IN       oltbs_contract.latest_event_seq_no%type,
	pLatestVsn         IN       oltbs_contract.latest_version_no%type,
	pCounterparty      IN       oltbs_contract.counterparty%type,
	pCurrency          IN       oltbs_contract.contract_ccy%type,
	pMatDate           IN       date,
	pProdType          IN       oltbs_contract.product_type%type,
	pContractValueDate IN		 oltbs_contract_master.Value_Date%type,
	pMaturityType		 IN		 oltbs_contract_master.Maturity_Type%type,
	pVerifyFunds       IN       oltbs_contract_preference.verify_funds%type,
	pMinLiqAmt	    IN      oltms_product_master_ld.min_amt_partial_liq%type,--sitaram
	pMinAmtCcy	    IN      oltms_product_master_ld.min_amt_ccy%type,--sitaram
	pProduct           IN       oltbs_contract.product_code%type,
	pDeductTaxInd      IN       Char,
	pUserDefStatus     IN       oltbs_contract.user_defined_status%type,
	pCreditLine        IN       oltbs_contract_master.credit_line%type,
	pMainComp          IN       oltbs_contract_master.main_comp%type,
	pPmtMeth           IN       oltbs_contract_master.payment_method%type,
	pSchType           IN       Char,
	pTrackAccruedInt   IN       oltms_product_master_ld.track_accrued_interest%type,
	pProcessingDate    IN       date,
	--- TRLRABO - TIL NO. 367
	-- for linked deposits and commitments liquidation of interest etc should still
	-- happen even if they are linked. Only principal should not happen so parameter passed here
      p_skip_comp	    IN	oltbs_contract_master.main_comp%type,
      p_skip_elcm_call   IN VARCHAR2,    --- 27936380
	pErrorcode			 IN OUT 	VARCHAR2,
	pErrorParam			 IN OUT 	Varchar2
	)
	Return Boolean;

--31460205 SOFR Changes starts
    FUNCTION Fn_Liquidate(Pfuncid            IN Smtbs_Menu.Function_Id%TYPE,
                        Pbranch            IN Oltbs_Contract.Branch%TYPE,
                        Pcontractrefno     IN Oltbs_Contract.Contract_Ref_No%TYPE,
                        Pmodule            IN Oltbs_Contract.Module_Code%TYPE,
                        Platestesn         IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                        Platestvsn         IN Oltbs_Contract.Latest_Version_No%TYPE,
                        Pcounterparty      IN Oltbs_Contract.Counterparty%TYPE,
                        Pcurrency          IN Oltbs_Contract.Contract_Ccy%TYPE,
                        Pmatdate           IN DATE,
                        Pprodtype          IN Oltbs_Contract.Product_Type%TYPE,
                        Pcontractvaluedate IN Oltbs_Contract_Master.Value_Date%TYPE,
                        Pmaturitytype      IN Oltbs_Contract_Master.Maturity_Type%TYPE,
                        Pverifyfunds       IN Oltbs_Contract_Preference.Verify_Funds%TYPE,
                        Pminliqamt         IN Oltms_Product_Master_Ld.Min_Amt_Partial_Liq%TYPE, --sitaram
                        Pminamtccy         IN Oltms_Product_Master_Ld.Min_Amt_Ccy%TYPE, --sitaram
                        Pproduct           IN Oltbs_Contract.Product_Code%TYPE,
                        Pdeducttaxind      IN CHAR,
                        Puserdefstatus     IN Oltbs_Contract.User_Defined_Status%TYPE,
                        Pcreditline        IN Oltbs_Contract_Master.Credit_Line%TYPE,
                        Pmaincomp          IN Oltbs_Contract_Master.Main_Comp%TYPE,
                        Ppmtmeth           IN Oltbs_Contract_Master.Payment_Method%TYPE,
                        Pschtype           IN CHAR,
                        Ptrackaccruedint   IN Oltms_Product_Master_Ld.Track_Accrued_Interest%TYPE,
                        Pprocessingdate    IN DATE,
                        Pduedate           IN DATE,
                        p_Skip_Comp        IN Oltbs_Contract_Master.Main_Comp%TYPE,
                        p_Skip_Elcm_Call   IN VARCHAR2, --- 27936380
                        Perrorcode         IN OUT VARCHAR2,
                        Perrorparam        IN OUT VARCHAR2) RETURN BOOLEAN;
-- 31460205 SOFR Changes ends
FUNCTION fn_process_capitalisation
	(
	pFuncId				IN			smtbs_menu.function_id%type,
	pContractRefNo		IN 		oltbs_amount_due_cs.contract_ref_no%type,
	pEventSeqNo			IN			oltbs_contract.latest_event_seq_no%type,
	pCounterParty		IN			oltbs_contract_master.counterparty%type,
	pMainComp			IN			oltbs_contract_master.main_comp%type,
	pCapAmt				IN			oltbs_amount_due_cs.amount_due%type,
	pTaxOnCap			IN			Number,
	pDeductTaxInd		IN			Char,
	pCurrency			IN			oltbs_amount_due_cs.currency_amt_due%type,
	pCapDate				IN			date,
	pCreditLine			IN			oltbs_contract_master.credit_line%type,
	pProdType			IN			oltbs_contract.product_type%type,
	pMatDate				IN			date,
	pMatType				IN			oltbs_contract_master.Maturity_Type%type,
	pContractValDate	IN			oltbs_contract_master.Value_date%type,
	pErrorcode			IN OUT 	VARCHAR2,
	pErrorParam			IN OUT 	Varchar2
	)
	Return Boolean;

--13-FEB-2002 FCC3.9 LATAM
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
-- This Function is called for Schedule Level Processing
--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
FUNCTION fn_liquidate_sch
   (
   pFuncId            IN      smtbs_menu.function_id%type,
   pBranch            IN      oltbs_contract.branch%type,
   pContractRefNo     IN      oltbs_contract.contract_Ref_no%type,
   pModule            IN      oltbs_contract.module_code%type,
   pLatestEsn         IN      oltbs_contract.latest_event_seq_no%type,
   pLatestVsn         IN      oltbs_contract.latest_version_no%type,
   pCounterparty      IN      oltbs_contract.counterparty%type,
   pCurrency          IN      oltbs_contract.contract_ccy%type,
   pMatDate           IN      date,
   pProdType          IN      oltbs_contract.product_type%type,
   pContractValueDate IN	oltbs_contract_master.Value_Date%type,
   pMaturityType	    IN	oltbs_contract_master.Maturity_Type%type,
   pVerifyFunds       IN      oltbs_contract_preference.verify_funds%type,
   pMinLiqAmt	    IN      oltms_product_master_ld.min_amt_partial_liq%type,--sitaram
   pMinAmtCcy	    IN	oltms_product_master_ld.min_amt_ccy%type,--sitaram
   pProduct           IN      oltbs_contract.product_code%type,
   pDeductTaxInd      IN      Char,
   pUserDefStatus     IN      oltbs_contract.user_defined_status%type,
   pCreditLine        IN      oltbs_contract_master.credit_line%type,
   pMainComp          IN      oltbs_contract_master.main_comp%type,
   pPmtMeth           IN      oltbs_contract_master.payment_method%type,
   pSchType           IN      Char,
   pTrackAccruedInt   IN      oltms_product_master_ld.track_accrued_interest%type,
   pProcessingDate    IN      date,
   p_skip_comp	    IN	oltbs_contract_master.main_comp%type,
   pErrorCode         IN OUT  VARCHAR2,
   pErrorParam        IN OUT  Varchar2
   )
   Return Boolean;

-- FCC 4.2 OPS Changes Begin Here
FUNCTION fn_update_comp_balances
	(
	p_module			IN		oltbs_contract.module_code%TYPE,
	p_processing_date		IN		DATE,
	p_commit_frequency	IN		NUMBER,
	p_error_code		IN OUT	VARCHAR2,
	p_error_param		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
-- FCC 4.2 OPS Changes End Here

-- FCC 4.6 Sep04 Retro (India) Tax Deduction on Over Night Deposits
FUNCTION fn_pop_wht_and_tax_pia
			(
			  p_contract_ref_no	IN		oltbs_contract_master.contract_ref_no%TYPE
			, p_value_date		IN		oltbs_contract_master.value_date%TYPE
			, p_component		IN		oltbs_contract_iccf_calc.component%TYPE
			, p_processing_date	IN		DATE
			, p_schedule_date		IN		DATE
			, p_main_comp		IN		oltbs_contract_master.main_comp%TYPE
			, p_schedule_type		IN		oltbs_contract_preference.contract_schedule_type%TYPE
			, p_tax_amount		IN OUT	oltbs_contract_iccf_calc.tax_amount%TYPE
			, p_tax_pia			IN OUT	oltbs_tax_paid_in_advance.tax_paid_in_advance%TYPE
			, p_int_pia			IN OUT	oltbs_tax_paid_in_advance.interest_amount%TYPE
			, p_comp_list		IN OUT	VARCHAR2
			, p_tag_list		IN OUT	VARCHAR2
			, p_tag_reinv_ind_list	IN OUT	VARCHAR2
			, p_tag_amt_list		IN OUT	VARCHAR2
			, p_tag_ccy_list		IN OUT	VARCHAR2
			, p_val_dt_list		IN OUT	VARCHAR2
			, p_error_code		IN OUT	VARCHAR2
			)
RETURN BOOLEAN;

-- FCC 4.6 Sep04 Retro (India) Tax Deduction on Over Night Deposits ENDS


-- FCC 4.5 Lot1 FX/MM Fast changes start
FUNCTION fn_liqd_for_a_contract
	(
	pContract	    IN       oltbs_contract%ROWTYPE, -- FCC 4.5 LOT1 ITR2 SFR
	pBranch         IN       oltbs_contract.branch%TYPE,
	pProcessingDate IN       DATE,
	pErrorCode      IN OUT   VARCHAR2,
	pErrorParam     IN OUT   VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_populate_liqd_queue
	(
	pm_module			IN		oltbs_contract.module_code%TYPE,
	pm_eod_bod_pop		IN		VARCHAR2,
	pm_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
	pm_err_code			IN OUT	VARCHAR2,
	pm_params			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_insert_liqd_queue
	(
	pm_contract_ref_no		IN	oltbs_contract.contract_ref_no%TYPE,
	pm_function_id			IN	eitms_modules_installed.function_id%TYPE,
	pm_processing_date		IN 	DATE,
	pm_err_code				IN 	OUT	VARCHAR2,
	pm_params				IN 	OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_liqd_wrp
	(
	pm_tbl							IN		olpkss_parallel.contracts_table,
	pm_function_id					IN		VARCHAR2,
	pm_processingdate				IN		DATE,
	pm_mode							IN 		VARCHAR2,
	pm_err_code						IN OUT	VARCHAR2,
	pm_params						IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
-- FCC 4.5 Lot1 FX/MM Fast changes end

------10-JAN-2005----FLEXCUBE V CL RELEASE 7.1 Schedules Related Changes by Yogesh----START----------
FUNCTION FN_AUTO_EXPY
	(
	p_Branch  			IN 		oltbs_contract.branch%type,
	p_Processing_Date   	IN 		date,
	p_comt_freq		   	IN  		OLTBS_COMMITFREQ.bod_commit_count%type,
	p_err_code			IN OUT	ERTBS_MSGS.ERR_CODE%type,
	p_Params			IN OUT	Varchar2
	)
RETURN BOOLEAN;
------10-JAN-2005----FLEXCUBE V CL RELEASE 7.1 Schedules Related Changes by Yogesh----END-----------
-- 28-JUN-2007 FCC V.CL Release 7.3 rollover site retro changes START
Function is_this_an_err
		(
		perrcode   	IN 		VARCHAR2,
		pparam     	IN 		VARCHAR2
		)
RETURN BOOLEAN;
-- 28-JUN-2007 FCC V.CL Release 7.3 rollover site retro changes ENDS

--OFCL12.4 changes starts

FUNCTION	fn_create_eca_request
	(
	pBranch  			IN 		oltbs_contract.branch%type,
	pModule				IN			oltbs_contract.module_code%type,
	pProcessingDate   IN 		date,
	pProduct 			IN 		oltbs_contract.product_code%type,
	pCommitFreq		   IN  		OLTBS_COMMITFREQ.bod_commit_count%type,
	pJobSeqNo			IN lbtbs_job_queue.seq_no%TYPE, --12-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#4,Retro Changes CITIUS-LS-801,
	pErrorcode			IN OUT 	VARCHAR2,
	pErrorParam			IN OUT 	Varchar2
	)
	Return Boolean;

PROCEDURE pr_auto_liq(pBranch IN VARCHAR2);
--OFCL12.4 changes ends
--OBCL_14.4_Autocap Changes Starts
Function Fn_Auto_Cap_Batch_Process (p_Branch			In	Oltb_Contract.Branch%Type,
									p_Processing_Date	In	Date,
									p_Product			In	Oltb_Contract.Product_Code%Type,
									p_Commit_Frequency	In	Oltb_Automatic_Process_Master.Bod_Commit_Count%Type,
									p_Err_Code			In 	Out Varchar2,
									p_Err_Param			In 	Out Varchar2
								   )
Return Boolean;

Function Fn_Process_Cont_For_Auto_Cap(pBranch         In       Oltb_Contract.branch%Type,
									pProcessingDate   In       Date,
									pProduct          In       Oltb_Contract.Product_Code%Type,
									pCommitfreq       In       Oltbs_Commitfreq.bod_Commit_Count%Type,
									pContractRefNo    In   	   Oltb_Contract.Contract_Ref_No%Type,
									pJobSeqNo		  In	   Lbtbs_Job_Queue.Seq_No%Type,
									pErrorCode        In Out   Varchar2,
									pErrorParam       In Out   Varchar2)
Return Boolean;
Function Fn_Process_Cont_For_Auto_Cap(pBranch         In Oltb_Contract.branch%Type,
									pProcessingDate   In Date,
									pContractRefNo    In Oltb_Contract.Contract_Ref_No%Type,
									pErrorCode        In Out   Varchar2,
									pErrorParam       In Out   Varchar2)
Return Boolean;
--OBCL_14.4_Autocap Changes Ends

 --OBCL14.4_Ristourne_component changes starts
Function Fn_Auto_Ristourne_Batch_Process(p_Branch			In	Oltb_Contract.Branch%Type,
									p_Processing_Date	In	Date,
									p_Product			In	Oltb_Contract.Product_Code%Type,
									p_Commit_Frequency	In	Oltb_Automatic_Process_Master.Bod_Commit_Count%Type,
									p_Err_Code			In 	Out Varchar2,
									p_Err_Param			In 	Out Varchar2
								   )
Return Boolean; 
Function Fn_Process_Cont_For_Ristourne_Comp(pBranch         In       Oltb_Contract.branch%Type,
									pProcessingDate   In       Date,
									pProduct          In       Oltb_Contract.Product_Code%Type,
									pCommitfreq       In       Oltbs_Commitfreq.bod_Commit_Count%Type,
									pContractRefNo    In   	   Oltb_Contract.Contract_Ref_No%Type,
									pJobSeqNo		  In	   Lbtbs_Job_Queue.Seq_No%Type,
									pErrorCode        In Out   Varchar2,
									pErrorParam       In Out   Varchar2)
Return Boolean;
 --OBCL14.4_Ristourne_component changes ends

--Bug#36866128_1  Changes Start
FUNCTION Fn_Build_Multi_Link(Pcontractrefno IN Oltbs_Contract.Contract_Ref_No%TYPE,
                               Platestesn     IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                               Platestvsn     IN Oltbs_Contract.Latest_Version_No%TYPE,
                               p_Mode         IN VARCHAR2,
                               p_Retovr       IN VARCHAR2,
                               p_Event        IN VARCHAR2,
                               p_Princ_Amt    IN NUMBER,
                               p_Int_Amt      IN NUMBER, 
                               Perrorcode     IN OUT Ertbs_Msgs.Err_Code%TYPE)
  RETURN BOOLEAN;
--Bug#36866128_1  Changes End
 --$$ Bug#37380040 changes starts 
   FUNCTION Fn_Liquidate_ELCM(Pfuncid            IN Smtbs_Menu.Function_Id%TYPE,
                        Pbranch            IN Oltbs_Contract.Branch%TYPE,
                        Pcontractrefno     IN Oltbs_Contract.Contract_Ref_No%TYPE,
                        Pmodule            IN Oltbs_Contract.Module_Code%TYPE,
                        Platestesn         IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                        Platestvsn         IN Oltbs_Contract.Latest_Version_No%TYPE,
                        Pcounterparty      IN Oltbs_Contract.Counterparty%TYPE,
                        Pcurrency          IN Oltbs_Contract.Contract_Ccy%TYPE,
                        Pmatdate           IN DATE,
                        Pprodtype          IN Oltbs_Contract.Product_Type%TYPE,
                        Pcontractvaluedate IN Oltbs_Contract_Master.Value_Date%TYPE,
                        Pmaturitytype      IN Oltbs_Contract_Master.Maturity_Type%TYPE,
                        Pverifyfunds       IN Oltbs_Contract_Preference.Verify_Funds%TYPE,
                        Pminliqamt         IN Oltms_Product_Master_Ld.Min_Amt_Partial_Liq%TYPE, --sitaram
                        Pminamtccy         IN Oltms_Product_Master_Ld.Min_Amt_Ccy%TYPE, --sitaram
                        Pproduct           IN Oltbs_Contract.Product_Code%TYPE,
                        Pdeducttaxind      IN CHAR,
                        Puserdefstatus     IN Oltbs_Contract.User_Defined_Status%TYPE,
                        Pcreditline        IN Oltbs_Contract_Master.Credit_Line%TYPE,
                        Pmaincomp          IN Oltbs_Contract_Master.Main_Comp%TYPE,
                        Ppmtmeth           IN Oltbs_Contract_Master.Payment_Method%TYPE,
                        Pschtype           IN CHAR,
                        Ptrackaccruedint   IN Oltms_Product_Master_Ld.Track_Accrued_Interest%TYPE,
                        Pprocessingdate    IN DATE,
                        Pduedate           IN DATE,
                        p_Skip_Comp        IN Oltbs_Contract_Master.Main_Comp%TYPE,
                        p_Skip_Elcm_Call   IN VARCHAR2, --- 27936380
                        Perrorcode         IN OUT VARCHAR2,
                        Perrorparam        IN OUT VARCHAR2) RETURN BOOLEAN;
  --$$ Bug#37380040 changes ENDS           
END olpks_autoliq;
/
create or replace synonym olpkss_autoliq for olpks_autoliq
/