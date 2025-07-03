CREATE OR REPLACE PACKAGE olpks_autoliq_custom AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_autoliq.spc
  **
  ** Module     : Loans and Deposits
  **
  ** This source is part of the Oracle FLEXCUBE Software Product.
  ** Copyright (R) 2008,2016 , Oracle and/or its affiliates.  All rights reserved
  **
  **
  ** No part of this work may be reproduced, stored in a retrieval system, adopted
  ** or transmitted in any form or by any means, electronic, mechanical,
  ** photographic, graphic, optic recording or otherwise, translated in any
  ** language or computer language, without the prior written permission of
  ** Oracle and/or its affiliates.
  **
  ** Oracle Financial Services Software Limited.
  ** Oracle Park, Off Western Express Highway,
  ** Goregaon (East),
  ** Mumbai - 400 063, India
  ** India
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY

  SFR Number         :
  Changed By         :
  Change Description :

  	**SFR Number         :30331212
    **Changed By         :Akhila Samson
    **Change Description :Inline Hooks Provided for fn_liquidate and fn_liquidate_sch
    **Search String      :Bug#30331212
    
	**created by          : Gomathi G
    **created on          : 24-oct-2019
    **created description : First Loss enhancement 
    **Search String       : OBCL_14.3_BUG#30331208

     Changed By         : Yuvaraj K
     Changed On         : 29-OCT-2020
     Change Description : Provided Pre and post hooks to During Autocap process, if the Limit of commitment breaches, system should proceed with VAMI
     Search String      : OBCL_14.3_SUPPORT_BUG#32078438 (Forward_port Bug#32018741)
  -------------------------------------------------------------------------------------------------------
  */
    FUNCTION Fn_Process_For_Contract(Pbranch         IN Oltbs_Contract.Branch%TYPE,
                                   Pprocessingdate IN DATE,
                                   Pproduct        IN Oltbs_Contract.Product_Code%TYPE,
                                   Pcommitfreq     IN Oltbs_Commitfreq.Bod_Commit_Count%TYPE,
                                   Pcontractrefno  IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                   Pjobseqno       IN lbtbs_job_queue.Seq_No%TYPE,
				   PauthStat       IN OUT Oltbs_Contract.Auth_Status%type ,
                                   Perrorcode      IN OUT VARCHAR2,
                                   Perrorparam     IN OUT VARCHAR2)
    RETURN BOOLEAN;
/*OBCL_14.3_SUPPORT_BUG#32078438 starts*/
FUNCTION fn_pre_process_cont_for_auto_cap(pbranch  IN oltb_contract.branch%TYPE,
		                                  pprocessingdate IN DATE,
		                                  pproduct        IN oltb_contract.product_code%TYPE,
		                                  pcommitfreq     IN oltbs_commitfreq.bod_commit_count%TYPE,
		                                  pcontractrefno  IN oltb_contract.contract_ref_no%TYPE,
		                                  pjobseqno       IN lbtbs_job_queue.seq_no%TYPE,
		                                  perrorcode      IN OUT VARCHAR2,
		                                  perrorparam     IN OUT VARCHAR2)

RETURN BOOLEAN;


FUNCTION fn_post_process_cont_for_auto_cap(pbranch  IN oltb_contract.branch%TYPE,
		                                  pprocessingdate IN DATE,
		                                  pproduct        IN oltb_contract.product_code%TYPE,
		                                  pcommitfreq     IN oltbs_commitfreq.bod_commit_count%TYPE,
		                                  pcontractrefno  IN oltb_contract.contract_ref_no%TYPE,
		                                  pjobseqno       IN lbtbs_job_queue.seq_no%TYPE,
		                                  perrorcode      IN OUT VARCHAR2,
		                                  perrorparam     IN OUT VARCHAR2)

RETURN BOOLEAN;

FUNCTION fn_pre_process_cont_for_auto_cap(pbranch IN oltb_contract.branch%TYPE,
		                                  pprocessingdate IN DATE,
		                                  pcontractrefno  IN oltb_contract.contract_ref_no%TYPE,
		                                  perrorcode      IN OUT VARCHAR2,
		                                  perrorparam     IN OUT VARCHAR2)

RETURN BOOLEAN;


FUNCTION fn_post_process_cont_for_auto_cap(pbranch IN oltb_contract.branch%TYPE,
		                                  pprocessingdate IN DATE,
		                                  pcontractrefno  IN oltb_contract.contract_ref_no%TYPE,
		                                  perrorcode      IN OUT VARCHAR2,
		                                  perrorparam     IN OUT VARCHAR2)

RETURN BOOLEAN;
/*OBCL_14.3_SUPPORT_BUG#32078438 ends*/
	FUNCTION fn_liquidate
	(
	pFuncId			   IN		smtbs_menu.function_id%type,
	pBranch            IN       oltbs_contract.branch%type,
	pContractRefNo     IN       oltbs_contract.contract_Ref_no%type,
	pModule     	   IN       oltbs_contract.Module_code%type,
	pLatestEsn         IN       oltbs_contract.latest_event_seq_no%type,
	pLatestVsn         IN       oltbs_contract.latest_version_no%type,
	pCounterparty      IN       oltbs_contract.counterparty%type,
	pCurrency          IN       oltbs_contract.contract_ccy%type,
	pMatDate           IN       date,
	pProdType          IN       oltbs_contract.product_type%type,
	pContractValueDate IN		oltbs_contract_master.Value_Date%type,
	pMaturityType	   IN		oltbs_contract_master.Maturity_Type%type,
	pVerifyFunds       IN       oltbs_contract_preference.verify_funds%type,
	pMinLiqAmt	       IN       oltms_product_master_ld.min_amt_partial_liq%type,
	pMinAmtCcy	       IN       oltms_product_master_ld.min_amt_ccy%type,
	pProduct           IN       oltbs_contract.product_code%type,
	pDeductTaxInd      IN       Char,
	pUserDefStatus     IN       oltbs_contract.user_defined_status%type,
	pCreditLine        IN       oltbs_contract_master.credit_line%type,
	pMainComp          IN       oltbs_contract_master.main_comp%type,
	pPmtMeth           IN       oltbs_contract_master.payment_method%type,
	pSchType           IN       Char,
	pTrackAccruedInt   IN       oltms_product_master_ld.track_accrued_interest%type,
	pProcessingDate    IN       date,
    p_skip_comp	       IN	    oltbs_contract_master.main_comp%type,
	p_Skip_Elcm_Call   IN       VARCHAR2,
	p_BALTAB           IN OUT   OLPKS_AUTOLIQ.TY_BAL_TAB, --Bug#30331212
	p_fn_call_id       IN       NUMBER,--OBCL_14.3_BUG#30331208
	p_Tb_custom_data  IN OUT   GLOBAL.Ty_Tb_custom_Data, --OBCL_14.3_BUG#30331208
	pErrorcode		   IN OUT 	VARCHAR2,
	pErrorParam		   IN OUT 	Varchar2)
     Return Boolean;




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
   pContractValueDate IN	  oltbs_contract_master.Value_Date%type,
   pMaturityType	  IN	  oltbs_contract_master.Maturity_Type%type,
   pVerifyFunds       IN      oltbs_contract_preference.verify_funds%type,
   pMinLiqAmt	      IN      oltms_product_master_ld.min_amt_partial_liq%type,
   pMinAmtCcy	      IN	  oltms_product_master_ld.min_amt_ccy%type,
   pProduct           IN      oltbs_contract.product_code%type,
   pDeductTaxInd      IN      Char,
   pUserDefStatus     IN      oltbs_contract.user_defined_status%type,
   pCreditLine        IN      oltbs_contract_master.credit_line%type,
   pMainComp          IN      oltbs_contract_master.main_comp%type,
   pPmtMeth           IN      oltbs_contract_master.payment_method%type,
   pSchType           IN      Char,
   pTrackAccruedInt   IN      oltms_product_master_ld.track_accrued_interest%type,
   pProcessingDate    IN      date,
   p_skip_comp	      IN	  oltbs_contract_master.main_comp%type,
   p_Tb_Custom_data   IN OUT  GLOBAL.Ty_Tb_Custom_Data, --Bug#30331212
   p_BALTAB           IN OUT  OLPKS_AUTOLIQ.TY_BAL_TAB, --Bug#30331212
   pErrorCode         IN OUT  VARCHAR2,
   pErrorParam        IN OUT  Varchar2)
   Return Boolean;

END olpks_autoliq_custom;
/
CREATE OR REPLACE SYNONYM OLPKSS_AUTOLIQ_CUSTOM FOR OLPKS_AUTOLIQ_CUSTOM
/