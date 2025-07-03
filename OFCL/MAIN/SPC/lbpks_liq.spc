Create Or Replace Package lbpks_liq
As
/*-----------------------------------------------------------------------------------
**
** File Name	: lbpks_liq.SQL
** Module	: LOAN SYNDICATION
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-------------------------------------------------------------------------------
*/

/*

21-NOV-2001	FCC 3.8  SFR NO 493  added column in ls_fn_liquidate

*/


Function Ls_Fn_Distribute_Amount_Paid
(
pContractRefNo  	IN OUT  	oltbs_contract.Contract_Ref_No%Type,
pComponent		IN OUT  	OLTB_CONTRACT_ICCF_DETAILS.Component%Type,
pAmountPaid				Number,
pTotalAmountDue			Number,
pEventSeqNo		IN OUT  	oltbs_contract_event_log.Event_Seq_No%Type,
pErrorCode 		OUT	  	Varchar2,
pParam		OUT	  	Varchar2
)
Return Boolean;

Function Ls_fn_compute_tax
	(
	pComp 		IN 		oltbs_contract_liq.component%type,
	pContractRefNo  	IN		oltbs_contract_master.contract_ref_no%Type,
	pAmtPaid 		IN 		Number,
	pErrorCode 		IN OUT 	Varchar2,
	pParam		IN OUT 	Varchar2,
	pEventSeqNo 	IN 		Number,
	pTax			IN OUT	Number
	) 
Return Boolean;

Function Ls_Fn_Authorise
(
pContractRefNo 	OLTB_CONTRACT.Contract_Ref_No%Type,
pErrorCode	   	Varchar2,
PErrorParams	Varchar2
)
Return Boolean;

Function Ls_Fn_Pmt_Reversal
(
pContractRefNo 			OLTB_CONTRACT.Contract_Ref_No%Type,
pFuncId		IN		Smtbs_Menu.Function_Id%Type,
pEventSeqNo	   	IN		oltbs_contract_event_log.Event_Seq_No%Type,
PErrorCode		IN OUT	Varchar2
)
Return Boolean;

Function Ls_Fn_Auto_Split_Liq
				  (
				   pContractRefNo 	IN	OLTB_CONTRACT.Contract_Ref_No%Type,
				   pBContractRefNo	IN	OLTB_CONTRACT.Contract_Ref_No%Type,
				   pAmountDue		IN	Number,
				   pAmtPaidCompCcy	OUT	Number,
				   pComponent		IN	Varchar2
				   )
Return Boolean;

Function Ls_Fn_Liquidate
				(
				pContractRefNo IN 	OLTB_CONTRACT.Contract_Ref_No%Type,
				pvaluedate     IN     DATE,
				pErrorCode 		OUT	  	Varchar2,
				pParam		OUT	  	Varchar2,
				pEventSeqno				Number
				)
Return Boolean;

Function Ls_Fn_Get_Pmt_Esn
			(
			pContract_Ref_No 	IN	OLTB_CONTRACT.Contract_Ref_No%Type,
			p_pmt_no 		IN 	Number, 
			p_pmt_esn 		OUT 	oltbs_contract_liq.event_seq_no%type,
			P_error_code 	OUT 	Varchar2
			)
Return Boolean;

End lbpks_liq;
/
Create or replace Synonym lbpkss_liq For lbpks_liq
/