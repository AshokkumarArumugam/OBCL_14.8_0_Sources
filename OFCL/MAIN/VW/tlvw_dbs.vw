CREATE OR REPLACE FORCE VIEW tlvw_dbs AS
/*
----------------------------------------------------------------------------------------------------
**
** File Name	: tlvw_dbs.VW
**
** Module	: INTERFACES
**
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
-------------------------------------- Change history ---------------------------------------------
Change History
01-JUN-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07, CFPI Migration, New view created.
05-JUL-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07, ITR1 SFR#107 Changes
31-Jan-2012 Flexcube V.CL Release 7.10 - Retro
            06-JAN-2012 CITIUS-LS#12266 View has been changed to include only CFPI records under CFPI portfolio based on branch code translation.
19-NOV-2012 CITIUS#15411 Jira 150080-7237 DBS feed enhancement changes            
05-DEC-2012 CITIUS#15622,Genesis Changes for posting accounting entries when there is MCC mapping change to firm account Mnemonics.	
*/
SELECT b.contract_ref_no,
       b.cusip_no, 
       b.firm_acct_mnemonic,
       b.branch,
       b.expense_code, 
		--19-NOV-2012 CITIUS#15411 Changes starts
		--a.ac_no,
		--DECODE(a.cust_gl,'G',a.ac_no,(SELECT cr_gl FROM Sttm_cust_account m  where  m.cust_ac_no =a.ac_no and m.branch_code = a.ac_branch)) ac_no,-- OFCL12.2 Not required
		a.cust_gl,
		--19-NOV-2012 CITIUS#15411 Changes ends
       a.ac_ccy, 
       nvl(a.fcy_amount,a.lcy_amount) amt, 
       a.drcr_ind, 
       a.value_dt, 
       a.trn_dt,
		--19-NOV-2012 CITIUS#15411 Changes starts
		a.event_sr_no,
		a.event,
		a.ac_entry_sr_no,
		a.amount_Tag,
		a.accounting_role
		--19-NOV-2012 CITIUS#15411 Changes ends       
  FROM oltbs_history a, --olvws_all_ac_entries a, --05-JUL-2011 Flexcube V.CL Release 7.9, FS Volume02 Tag07, ITR1 SFR#107 Changes
       tltbs_contract_master b,
       oltbs_contract c,
       tltms_portfolio d,
       OLTB_CLASS_MAPPING e	--CITIUS-LS#12266
 WHERE a.trn_ref_no = c.contract_ref_no
   AND b.contract_ref_no = c.contract_ref_no
   AND a.trn_ref_no 	= 	e.unit_ref_no	--CITIUS-LS#12266
   AND b.version_no = c.latest_version_no
   AND b.portfolio = d.portfolio
   AND b.firm_acct_mnemonic = d.firm_acct_mnemonic
   AND d.firm_acct_mnemonic IS NOT NULL
   AND a.category NOT IN ('3','4')
--19-NOV-2012 CITIUS#15411 Changes starts
--AND		a.cust_gl		=  	'G'
AND		 ( 
			a.cust_gl		=  	'G'
			OR
			(
				a.cust_gl		=  	'A'
				AND
				ac_ccy	 <> global.lcy
			)
			)
--19-NOV-2012 CITIUS#15411 Changes starts
   --CITIUS-LS#12266 Starts
   AND	exists
		(
			SELECT	1
			FROM	tltms_firmac_mcc_detail x,
					tltms_strategy_mapping y
			WHERE   x.mcc 			= 	y.mcc
			AND		e.txn_mis_1		=	x.firm_acct_mnemonic
			AND		nvl(cfpi,'N')	=	'Y'
		)
   AND	exists (select 1 from OLTM_TRANSLATION where source_code = 'CFPI' and translation_type ='CFPI_BRANCH' and external_value = c.branch) --OBCL_14.8_CE_Length_Changes
   --CITIUS-LS#12266 Ends   
--05-DEC-2012 CITIUS#15622 changes start,commented below
/*
--19-NOV-2012 CITIUS#15411 Changes starts
	AND NOT EXISTS	
				(
					SELECT  1
					FROM		OLTB_CONTRACT_ADJ_DETAIL z 
					WHERE 	z.contract_Ref_no			=	a.trn_Ref_no
					AND		z.event_seq_no				=	a.event_sr_no
					AND		NVL(z.s2_Adjustment,'N')		=	'Y'				
				)	
--19-NOV-2012 CITIUS#15411 Changes ends
*/
--05-DEC-2012 CITIUS#15622 changes end
/
CREATE OR REPLACE SYNONYM tlvws_dbs FOR tlvw_dbs
/