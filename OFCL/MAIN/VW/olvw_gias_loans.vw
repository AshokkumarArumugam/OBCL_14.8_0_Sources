CREATE OR REPLACE force VIEW olvw_gias_loans
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olvw_gias_loans.VW
**
** Module       : IF - SECONDARY LOAN TRADING
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
---------------------------------------------------------------------------------------------------
---------------------------------CHANGE HISTORY-----------------------------------------------
23-Feb-2012 CITIUS-LS#12791 Flexcube to GIAS Feed Changes. New Feed Flexcube to GIAS has been added.
	03-Jan-2012 Flexcube V.CL Release 7.10, Flexcube to GIAS Interface Feed
11-Apr-2012 CITIUS#13458 changes. Show Err is added	
12-OCT-2012 CITIUS#15091 Gias feed changes
*/
SELECT
	x.txn_mis_1 txn_mis_1
	,x.ccy ccy
	,x.cusip_no cusip_no
	,x.tot_out_balance  tot_out_balance
	--12-OCT-2012 CITIUS#15091 hanges starts Changes starts
	--,z.trade_price trade_price
	,(SELECT trade_price FROM TLTM_PRICE_DETAIL  z WHERE z.cusip_no	= 	x.cusip_no) trade_price
	--12-OCT-2012 CITIUS#15091 hanges starts Changes ends
	,y.ims_account ims_account
	,(SELECT sypks_utils.get_branch(Y.STRATEGY_CODE) FROM DUAL) strategy_code
	,SUBSTR(y.strategy_desc,1,30) strategy_desc
	,SUBSTR(y.sub_strategy_code,1,4) sub_strategy_code
	,SUBSTR(y.mcc,(LENGTH(y.mcc)-3),4) mcc
	,y.hyperion_code hyperion_code
	,SUBSTR(y.expense_code,1,6) expense_code
FROM
	(
		SELECT 	c.txn_mis_1 txn_mis_1
				,b.contract_ccy ccy
				,SUBSTR(d.cusip_no,1,12) cusip_no
				,SUM(principal_outstanding_bal) tot_out_balance
		FROM	oltbs_contract_balance a
				,oltbs_contract b
				,OLTB_CLASS_MAPPING c
				,oltbs_contract_master d
		WHERE	a.contract_ref_no	= 	b.contract_ref_no
		AND		a.contract_ref_no	= 	c.unit_ref_no
		AND		b.contract_ref_no	= 	c.unit_ref_no
		AND		d.contract_ref_no	= 	b.contract_ref_no
		AND		d.version_no 		= 	b.latest_version_no
		AND		b.module_code	 	= 	'OL'
		AND		b.product_type 		= 	'L'
		AND		b.contract_status	=	'A'
		AND		b.auth_status		=	'A'
		AND		c.txn_mis_1 		IS NOT NULL
		AND		d.cusip_no 			IS NOT NULL
		AND		NVL(d.lc_drawdown,'N') <> 'Y'
		--12-OCT-2012 CITIUS#15091 changes starts
		AND		EXISTS
					(
					SELECT 		1
					FROM			OLTB_INTERFACE_PARAM_IF
					WHERE		branch_Code		=	(SELECT ho_branch FROM oltm_bank)
					AND			external_system	=	'CFPI'
					AND			interface_code	=	'CFPI'
					AND			param_type     	=	'CFPI_BRANCHES'
					AND			param_Value		=	b.branch
					)
		--12-OCT-2012 CITIUS#15091 changes ends
		GROUP BY c.txn_mis_1,b.contract_ccy,SUBSTR(d.cusip_no,1,12)
	) x
	,TLTM_FIRMAC_MCC_DETAIL y
--	,TLTM_PRICE_DETAIL z --12-OCT-2012 CITIUS#15091 Changes
WHERE	x.txn_mis_1	= 	y.firm_acct_mnemonic(+)
--12-OCT-2012 CITIUS#15091 Changes starts
--AND		x.cusip_no	= 	z.cusip_no(+)
--12-OCT-2012 CITIUS#15091 Changes ends
/
--11-Apr-2012 CITIUS#13458 changes
--11-Apr-2012 CITIUS#13458 changes
CREATE OR REPLACE SYNONYM olvws_gias_loans FOR olvw_gias_loans
/