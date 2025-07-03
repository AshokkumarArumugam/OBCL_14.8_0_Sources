CREATE OR REPLACE FORCE VIEW lbvw_borr_sublimit
	(tranche_ref_no, 
	 borrower, 
	 limit_type,
	 product, 
	 ccy_code, 
	 limit_amt, 
	 --version_no, -- 11-APR-2008 FLEXCUBE V.CL Release 7.4 BAU-Lot1, Sublimits changes, commented
	 avail_amt)
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbvw_borr_sublimit.VW
**
** Module      : Syndication Loans and Commitments
**
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
**
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
Change History 
-- 28-APR-2006 FLEXCUBE V.CL Release 7.0, Created
-- 09-May-2006 FLEXCUBE V.CL Release 7.0, LOT2 ITR1 SFR#29, added version_no column to the view
-- 04-FEB-2008 FLEXCUBE V.CL Release 7.4 BAU-Lot1, Sublimits changes
-- 04-MAR-2008 FLEXCUBE V.CL Release 7.4 BAU-Lot1, Sublimits changes
	       Changes in decode
-- 11-APR-2008 FLEXCUBE V.CL Release 7.4 BAU-Lot1, Sublimits changes
	       Changes to remove version_no from this view.
		   
  Changed By         : Narendra Dhaker
  Changed On         : 14-Apr-2021
  Change Description : ALL CURRENCY TO *.* CHANGES
  Search String      : Bug#32700428
----------------------------------------------------------------------------------------------------
*/
-- 04-FEB-2008 FLEXCUBE V.CL Release 7.4 BAU-Lot1, Sublimits changes starts
-- 23-MAY-2008 FLEXCUBE V.CL Release 7.4 RT SFR#85 ,suresh changes , selecting max version no without ccy_code,product_code and limit_type
/* (SELECT B.TRANCHE_REF_NO, B.BORROWER, B.DRAWDOWN_PRODUCT, B.CCY_CODE, B.LIMIT_AMT, B.VERSION_NO, 
NVL((SELECT NVL(B.LIMIT_AMT - NVL(SUM(A.UTILIZED_AMT), 0), 0) FROM lbtbs_borr_prod_vdutil A
WHERE B.TRANCHE_REF_NO = A.TRANCHE_REF_NO
AND B.BORROWER = A.BORROWER
AND B.DRAWDOWN_PRODUCT = A.PRODUCT
AND B.CCY_CODE = A.CCY_CODE
GROUP BY  B.TRANCHE_REF_NO, B.BORROWER, B.DRAWDOWN_PRODUCT, B.CCY_CODE), B.LIMIT_AMT) AVAIL
FROM lbtbs_borr_prod_vdutil A, lbtbs_borr_prod_limit B
GROUP BY  B.TRANCHE_REF_NO, B.BORROWER, B.DRAWDOWN_PRODUCT, B.CCY_CODE, B.LIMIT_AMT, B.VERSION_NO)
*/
(
SELECT	B.TRANCHE_REF_NO, 
	B.BORROWER, 
	B.LIMIT_TYPE,
	B.DRAWDOWN_PRODUCT, 
	B.CCY_CODE, 
	B.LIMIT_AMT, 
	--B.VERSION_NO, -- 11-APR-2008 FLEXCUBE V.CL Release 7.4 BAU-Lot1, Sublimits changes, commented
	NVL((SELECT NVL(B.LIMIT_AMT - NVL(SUM(decode(B.CCY_CODE,'*.*',X.tranche_ccy_closing_bal,X.UTILIZED_AMT)), 0), 0)  --Bug#32700428
	       FROM lbvws_borr_prod_vdutil X
	      WHERE X.TRANCHE_REF_NO = B.TRANCHE_REF_NO
		AND X.BORROWER = B.BORROWER
		AND (X.LIMIT_TYPE = B.LIMIT_TYPE OR X.LIMIT_TYPE = decode(B.LIMIT_TYPE,'AL',X.LIMIT_TYPE))
		AND X.PRODUCT = decode(B.DRAWDOWN_PRODUCT,'ALL',X.PRODUCT,B.DRAWDOWN_PRODUCT) -- 04-MAR-2008
		AND X.CCY_CODE = decode(B.CCY_CODE,'*.*',X.CCY_CODE,B.CCY_CODE) -- 04-MAR-2008 --Bug#32700428
	      GROUP BY  B.TRANCHE_REF_NO, B.BORROWER, B.DRAWDOWN_PRODUCT, B.CCY_CODE
	    ), B.LIMIT_AMT) AVAIL
  FROM lbvws_borr_prod_vdutil A, 
       lbtbs_borr_prod_limit B
  -- 11-APR-2008 FLEXCUBE V.CL Release 7.4 BAU-Lot1, Sublimits changes, starts
  WHERE B.version_no = (SELECT max(version_no) 
                          FROM lbtbs_borr_prod_limit 
                         WHERE TRANCHE_REF_NO = B.TRANCHE_REF_NO
                           AND BORROWER = B.BORROWER
                           --23-MAY-2008 FLEXCUBE V.CL Release 7.4 RT SFR#85 changes starts
                           /*
                           AND DRAWDOWN_PRODUCT = B.DRAWDOWN_PRODUCT
                           AND LIMIT_TYPE = B.LIMIT_TYPE
                           AND CCY_CODE = B.CCY_CODE
                           */
                           --23-MAY-2008 FLEXCUBE V.CL Release 7.4 RT SFR#85 changes ends
                          )       
  -- 11-APR-2008 FLEXCUBE V.CL Release 7.4 BAU-Lot1, Sublimits changes, ends
 GROUP BY  B.TRANCHE_REF_NO, 
           B.BORROWER, 
           B.LIMIT_TYPE, 
           B.DRAWDOWN_PRODUCT, 
           B.CCY_CODE, 
           B.LIMIT_AMT 
           --,B.VERSION_NO -- 11-APR-2008 FLEXCUBE V.CL Release 7.4 BAU-Lot1, Sublimits changes, commented
           )
		   -- 04-FEB-2008 FLEXCUBE V.CL Release 7.4 BAU-Lot1, Sublimits changes ends
/
--PROMPT Creating synonym lbvws_borr_sublimit for View lbvw_borr_sublimit
create or replace synonym lbvws_borr_sublimit for lbvw_borr_sublimit
/