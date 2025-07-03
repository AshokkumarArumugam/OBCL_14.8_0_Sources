CREATE OR REPLACE PACKAGE olpks_pmt_schedules AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_pmt_schedules.SPC
**
** Module		: LOANS and DEPOSITS
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
Chanage history

10/01/2002 FCC 3.9 LATAM Principal schedules for disc loans New parameter is added in fn_prepmt.

16-JUL-2003 FCC4.3 AUG2003 TIDE Related changes - New function fn_ppnlty_rate_change added.

*/

TYPE ty_iccf_calc IS Table of oltbs_contract_iccf_calc%ROWTYPE

INDEX By Binary_Integer;

FUNCTION fn_prepmt
         (
         p_contract_ref_no    IN         oltbs_contract.contract_ref_no%type,
         p_effective_date     IN         date,
         p_prepaid_princ      IN         Number,
	   -- 10/01/2002 FCC 3.9 LATAM Principal schedules for disc loans Starts
         p_adjustment_amt  	OUT        Number,
	   -- 10/01/2002 FCC 3.9 LATAM Principal schedules for disc loans ends
         p_error_code         IN   OUT   Varchar2
         )
Return Boolean;

FUNCTION fn_apply_prepmt
         (
         p_contract_ref_no    IN       oltbs_contract.contract_ref_no%type,
         p_component          IN       oltbs_contract_iccf_calc.component%type,
         p_effective_date     IN       date,
         p_prepaid_princ      IN       Number,
         p_error_code         IN OUT   Varchar2
         )
Return Boolean;

FUNCTION fn_recapitalize
         (
         pContractRefNo     IN     oltbs_contract.contract_ref_no%type,
         pEffectiveDate     IN     Date,
         pPrepaidPrinc      IN     Number,
         pMainIntComp       IN     lftbs_contract_interest.component%type,
         pErrorCode         IN OUT Varchar2
         )
Return Boolean;
FUNCTION fn_ppnlty
         (
         p_contract_ref_no IN       oltbs_contract.contract_ref_no%type,
         p_effective_date  IN       date,
         p_prepaid_princ   IN       Number,
         p_penalty_rate    IN       Number,
         p_adjustment_amt  OUT      Number,
         p_error_code      IN OUT   Varchar2
         )
Return Boolean;

FUNCTION fn_pdopmt
         (
         p_contract_ref_no IN      oltbs_contract.contract_ref_no%type,
         p_component_paid  IN      oltbs_amount_due_cs.component%type,
         p_effective_date  IN      date,
         p_schedule_date   IN      date,
         p_amount_paid      IN      Number,
         p_error_code      OUT   Varchar2
         )
Return   Boolean;

FUNCTION fn_insert_slab
(
pContractRefNo IN    oltbs_contract.contract_ref_no%type,
pTabIccf       IN    ty_iccf_calc,
pPenSeqnO   IN OUT   oltbs_contract_iccf_calc.prepayment_penalty_seq_no%type,
perrorCode  IN OUT   Varchar2
)
Return Boolean;

FUNCTION fn_capitalize_for_seq
   (
   pContractRefNo IN   oltbs_contract.contract_ref_no%type,
   pComponent     IN   oltbs_contract_iccf_calc.component%type,
   pPenaltySeqNo  IN   oltbs_contract_iccf_calc.prepayment_penalty_seq_no%type,
   pErrorCode     IN   OUT   Varchar2
   )
Return Boolean;

Function fn_compute_slabs
			(
			pContractRefNo		IN			oltbs_contract.contract_ref_no%type,
			pComponent			IN			oltbs_contract_iccf_calc.component%Type,
			pEffectiveDate		IN			Date,
			pErrorCode			IN	OUT		Varchar2
			) 
Return Boolean;

--16-JUL-2003 FCC4.3 AUG2003 TIDE Related changes Starts
FUNCTION fn_ppnlty_rate_change
         (		p_contract_ref_no 	IN		oltbs_contract.contract_ref_no%TYPE
		,	p_main_component		IN		oltbs_contract_iccf_calc.component%TYPE
         	,	p_effective_date  	IN		DATE
         	,	p_prepaid_princ   	IN		NUMBER
         	,	p_prepaid_rate    	IN		NUMBER
		,	p_penalty_rate		IN    	NUMBER
		,	p_out_amt_rate    	IN		NUMBER
		,	p_adjustment_amt  	OUT     	NUMBER
		,	p_prepaid_amt_interest  IN OUT	NUMBER
		,	p_error_code      	IN OUT	VARCHAR2
		,	p_error_param		IN OUT	VARCHAR2
         )
RETURN BOOLEAN ;
--16-JUL-2003 FCC4.3 AUG2003 TIDE Related changes Ends

End olpks_pmt_schedules;
/
create or replace synonym olpkss_pmt_schedules for olpks_pmt_schedules
/