CREATE OR REPLACE FORCE VIEW lbvw_borrower_ds_summary ( TRANCHE_REF_NO, 
FACILITY_REF_NO, PRODUCT, --AUTH_STATUS, RECORD_STAT, --Flexcube V CL Release 7.1, Suraj, commented since col is dropped
COUNTERPARTY, DRAWDOWN_AMOUNT_DR_CCY, DR_CCY, DRAWDOWN_AMOUNT_TR_CCY, 
TR_CCY, DRAWDOWN_NO, MODULE_CODE, BRANCH,SHORT_NAME,tranche_user_ref_no,facility_user_ref_no
--FCC V.CL 7.3 UK CONSOLIDATION RETRO START
-- FCC 7.3 RETRO of CITILS46110378 Changes START
, DRAWDOWN_DATE
, MATURITY_DATE
-- FCC 7.3 RETRO of CITILS46110378 Changes END
--FCC V.CL 7.3 UK CONSOLIDATION RETRO END
--FCC V.CL 7.3 UK CONSOLIDATION RETRO START
-- FCC 7.3 RETRO of CITILS46110380 Changes START
,DRAWDOWN_TYPE
,RENEWAL_TYPE
-- FCC 7.3 RETRO of CITILS46110380 Changes END
--FCC V.CL 7.3 UK CONSOLIDATION RETRO END
) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbvw_borrower_ds_summary.VW
**
** Module      : Syndication Loans and Commitments
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
----------------------------------------------------------------------------------------------------
*/
/* 
CHANGE HISTORY
22-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO START
			21-SEP-2007 FCC 7.3 RETRO of CITILS46110378 CHANGES START	
					 CITILS46110378 Currently Flexcube functionality is that the interest periods do not appear on the contract summary screens. This makes it extremely difficult to recognise individual contracts whilst searching.
								 On Drawdown Schedule and Branch\Tranche summary screens, interest period columns are required. Column required are: Start Date and Maturity Date columns. -- Enhancement.
								 Added 2 columns drawdown date and maturity date in drawdown schedule summary screen.
			21-SEP-2007 FCC 7.3 RETRO of CITILS46110378 CHANGES END
			21-SEP-2007 FCC 7.3 RETRO of CITILS46110380  CHANGES START
					CITILS46110380 Currently Flexcube all contracts, whether they are Drawdowns or Rolled contracts,Appear as Drawdowns.
							  We required that the Drawdown Summary screen and the Branch\Tranche summary screen marks the Rolled 
							  contracts as ‘Renewal’ instead of Drawdown. This will enable the user to distinguish between Drawdowns and Rollovers. -- Enhancement
							  Added 2 columns (drawdown_type and renewal type) in LSVW_BORROWER_DS_ SUMMARY and LSSBWRDS.FMB.
			21-SEP-2007 FCC 7.3 RETRO of CITILS46110380  CHANGES END
22-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO END
*/
(
SELECT A.TRANCHE_REF_NO,
       A.FACILITY_REF_NO,
       (SELECT sypks_utils.get_product(A.FACILITY_REF_NO) FROM DUAL) PRODUCT,
       --A.AUTH_STAT, --Flexcube V CL Release 7.1, Suraj, commented since col is dropped
       --A.RECORD_STAT, --Flexcube V CL Release 7.1, Suraj, commented since col is dropped
       A.BORROWER,
       A.DRAWDOWN_CCY_AMOUNT,
       A.DRAWDOWN_CCY,
       A.TRANCHE_CCY_AMOUNT ,
       B.CURRENCY,               --Tranche Currency
       A.DRAWDOWN_NO,
       'LB', 
       B.BRANCH,
       C.SHORT_NAME,  			-- FLEXCUBE V.CL Release 7.0 ITR1 SFR 10 short_name added
       d.user_ref_no  tranche_user_ref_no,
       e.user_ref_no  facility_user_ref_no
	  --FCC V.CL 7.3 UK CONSOLIDATION RETRO START
       -- FCC 7.3 RETRO of CITILS46110378 Changes START
       ,A.DRAWDOWN_DATE
       ,A.MATURITY_DATE
       -- FCC 7.3 RETRO of CITILS46110378 Changes END
	  --FCC V.CL 7.3 UK CONSOLIDATION RETRO END
	  --FCC V.CL 7.3 UK CONSOLIDATION RETRO START
       -- FCC 7.3 RETRO of CITILS46110380 Changes START
       ,DECODE(A.DRAWDOWN_TYPE,'N','New','R','Renewal')
       ,DECODE(A.DRAWDOWN_TYPE,'N',NULL,'R',DECODE(A.RENEWAL_TYPE,'C','Consolidated','N','Normal','S','Split'))	
	-- FCC 7.3 RETRO of CITILS46110380 Changes END
	--FCC V.CL 7.3 UK CONSOLIDATION RETRO END
FROM   lbtbs_drawdown_schedule A,
	oltbs_contract_master B,
	oltms_customer C ,		-- FLEXCUBE V.CL Release 7.0 ITR1 SFR 10 short_name added
  oltbs_contract D,     	-- FLEXCUBE V.CL Release 7.0 ITR1 SFR 10 short_name added
  oltbs_contract e          	-- FLEXCUBE V.CL Release 7.0 ITR1 SFR 10 short_name added 
WHERE  B.CONTRACT_REF_NO = A.TRANCHE_REF_NO
  AND  B.VERSION_NO = (select max(Version_No) from  oltbs_contract_master
                       where  Contract_Ref_No = A.TRANCHE_REF_NO)
  AND  B.MODULE ='LB'
  AND  B.COUNTERPARTY = C.CUSTOMER_NO	 -- FLEXCUBE V.CL Release 7.0 ITR1 SFR 10 short_name added
  and d.CONTRACT_REF_NO = b.CONTRACT_REF_NO 
  and d.LATEST_VERSION_NO = b.VERSION_NO 
  and a.facility_ref_no = e.CONTRACT_REF_NO 
 )
/
CREATE OR REPLACE SYNONYM lbvws_borrower_ds_summary FOR lbvw_borrower_ds_summary 
/