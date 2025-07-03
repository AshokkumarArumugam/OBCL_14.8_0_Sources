CREATE OR REPLACE PACKAGE olpks_reverse_pmt AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_reverse_pmt.SPC
**
** Module	: LOANS AND DEPOSITS
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
	CHANGE HISTORY

01-JULY-2003 FCC 4.3 AUG 2003 Development Requirements.
	Requirement:
			While doing LD Reversal, a new field Transaction Type has to be specified at the Contract/Payment/Fee
			screen. This will be passed to the respective subsystems.
	Changes Done:
			fn_pmt_reversal overloaded spec has been added
15-DEC-2009 FLEXCUBE V.CL Release 7.6 Schedule redefinition Changes -A new parameter has been added in fn_reverse_prepmt to know whether the prepayment reversal is prceeded by an CAMD operation

**Changed By         : Sudharshini Balaji
**Changed On         : 03-Feb-2021
**Change Description : Forward port of 32354933
**Search String      : SOFR_Bug#32430020

 
  **Changed By         : Mohan Pal
  **Date               : 15-Jul-2022
  **Change Description : Making End date as Null during payment reversal
  **Search String      : Bug#34384340

  **Changed By          : Navoneel Nandan
  **Changed On          : 05-Nov-2024
  **Change Description  : Recalculating from the payment date during Reversal of Payment of an already partially paid schedule if the INCR_PENAL_CALC is set to Y.
  **Search String       : Bug#37184355
*/
g_paymnt_reverse varchar2(1) :='N'; --SOFR_Bug#32430020 changes
g_penal_pmt_rev  varchar2(1) :='N';----Bug#34384340
g_revese_esn     oltbs_contract_event_log.event_seq_no%TYPE;--Bug#37184355
FUNCTION fn_pmt_reversal
	 (			
	 pContractRefNo	IN	OUT	oltbs_contract.contract_ref_no%type,
	 pFuncId				IN			smtbs_menu.function_id%type,
	 pEventSeqNo		IN			oltbs_contract_event_log.event_seq_no%type,
	 pErrorCode			IN	OUT	Varchar2
	 )
Return Boolean; 

-- 01-JULY-2003 FCC 4.3 AUG 2003 Development Requirements Start . 
FUNCTION fn_pmt_reversal
	 (			
	 pContractRefNo	IN OUT	oltbs_contract.contract_ref_no%type,
	 pFuncId		IN		smtbs_menu.function_id%type,
	 pEventSeqNo	IN		oltbs_contract_event_log.event_seq_no%type,
	 pTranType 		IN		oltms_trn_type.trn_type%TYPE,
	 pErrorCode		IN OUT	Varchar2
	 )
Return Boolean;
-- 01-JULY-2003 FCC 4.3 AUG 2003 Development Requirements End.

FUNCTION fn_reverse_prepmt
	 (
	 pContractRefNo	IN			oltbs_contract.contract_ref_no%type,
	 pEventSeqNo		IN			oltbs_contract_event_log.event_seq_no%type,
	 pValueDtofPmt		IN	OUT	date,
	 pSchDtOfPmt		IN	OUT	date,
	 pPrincAmt			IN	OUT	Number,
	 pPenaltyFlag		IN			Varchar2,
	 pMainIntComp		IN	OUT	lftbs_contract_interest.component%type,	
	 pContractType		IN	oltbs_contract_preference.contract_schedule_type%type,
	 pRecomputeFlag	IN	oltms_product_master_ld.Recompute_schedules%Type
	 ,p_CAMD_exists			OUT	PLS_INTEGER --15-DEC-2009 FLEXCUBE V.CL Release 7.6 Schedule redefinition Changes
	 )
Return Boolean;

FUNCTION fn_recompute_for_rev
	(
	pContractRefNo		IN	oltbs_contract.contract_ref_no%type,
	pEventSeqNo			IN	oltbs_contract_event_log.event_seq_no%type,
	pEffectivedate		IN	date,
	pContractValDate	IN	OUT	date,
	pSchDtOfPmt			IN	date,
	pPrepaidPrinc		IN	Number,
	pcomponent 			IN	oltbs_contract_iccf_calc.component%type, 
	pPenaltyFlag		IN	Char
	)
Return Boolean;

FUNCTION fn_recapitalize
	 (
	 pContractRefNo	IN	oltbs_contract.contract_ref_no%type,
	 pEffectiveDate	IN	Date,
	 pPrincReversed	IN	Number,
	 pSchDate			IN	Date,
	 pMainIntComp		IN	lftbs_contract_interest.component%type
	 ) 
	 Return Boolean; 

End olpks_reverse_pmt;
/
create or replace synonym olpkss_reverse_pmt for olpks_reverse_pmt
/