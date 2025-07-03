CREATE OR REPLACE FORCE VIEW lbvw_borrower_summary ( CONTRACT_REF_NO,
BRANCH, MODULE_CODE, PRODUCT, AUTH_STATUS,
CONTRACT_STATUS, COUNTERPARTY,CUST_NAME --Bug#34014963
,AMOUNT, CURRENCY,
USER_REF_NO, FACILITY_REF_NO, TRANCHE_REF_NO, DRAWDOWN_NO,
PRODUCT_TYPE,CUSIP_NO
,EXTERNAL_CUSIP_NO --28-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION changes CITIUS-LS#6993
,FACILITY_NAME,SHORT_NAME,
VALUE_DATE,MATURITY_DATE,DEPARTMENT_CODE,TREASURY_SOURCE,EXTERNAL_REF_NO,BOOK_DATE,DRAWDOWN_TYPE) AS
/*----------------------------------------------------------------------------------------
  **
  ** File Name    : lbvw_borrower_summary.VW
  **
  ** Module       : Syndication Loans and Commitments
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

	Changed By         : Narendra Dhaker
	Date               : 11-April-2022
	Change Description : SUMMARY SCREENS LOV MISSING CUSTOMER NAMES
	Search String      : Bug#34014963

	Changed By          : Jeevitha K A
    Changed On          : 05-November-2024
    Change Description  : Fix provided to restrict version roll ref number from loan/drawdown summary screen
    Search String       : Bug#37168959
  ----------------------------------------------------------------------------------------
  */
  /*
Change History
	--01-mar-2006 Retro as part of FLEXCUBE V.CL Release 7.0 sfr-CITILS46110170
	--09-MAR-2006CITIUS OPS,Retro as part of FLEXCUBE V.CL Release 7.0 Changes
	25-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#4, Retro Changes CITIUS-LS-613,25-dec-2007
	--20-JAN-2007 CITIUS-LS#613 ARUN, CHANGES, External Ref No added in TR and DD summary Screen
         13-jun-2008 CITIUPG73100216 (issue PARC00009699 ),selection of BOOK_DATE added
         05-MAR-2009 FCC V.CL Release 7.5 EURCITIPLC RETRO CITILS10G00089 PARC00013297 Drawdown Definition not defined on Drawdown Summary screen.
28-DEC-2009 FLEXCUBE V.CL Release 7.6 PBG CONSOLIDATION changes 10-DEC-2009 CITIUS-LS#6993 external cusip added.
05-SEP-2011 FLEXCUBE V.CL Release 7.7.1 EURCITIPLC-LS#11286 changes, added facility name field.
09-DEC-2011 CITIUS-LS#12057 Changes: Value of facility name of the tranche was not getting displayed properly in the summary screen.
19-AUG-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 RETRO CITIUS#19946,  changes - Tuning to Select statement.
	Changed By         : Narendra Dhaker
	Date               : 20-May-2021
	Change Description : Product Access restriction
	Search String      : Product Access restriction
----------------------------------------------------------------------------------------------------
*/
 ( 				--CITILS46110170 Changes  --05-MAR-2009 FCC V.CL Release 7.5 EURCITIPLC RETRO CITILS10G00089
SELECT /*+ PARALLEL(1000) */ A.CONTRACT_REF_NO, --CITIUS#19946 changes added
--SELECT A.CONTRACT_REF_NO, --CITIUS#19946 changes commented.
       A.BRANCH,
       A.MODULE_CODE,
       A.PRODUCT_code,
       A.AUTH_STATUS,
       A.CONTRACT_STATUS,
       B.COUNTERPARTY,
	   c.customer_name1 cust_name,  --Bug#34014963
       B.AMOUNT,
       B.CURRENCY,
       A.USER_REF_NO,
       B.SYNDICATION_REF_NO,
       B.TRANCHE_REF_NO,
       B.DRAWDOWN_NO,
       B.PRODUCT_TYPE,
	 B.CUSIP_NO,	
	 b.external_cusip_no, 
	b.FACILITY_NAME
   /*DECODE(global.x9$,'CITIUS',B.FACILITY_NAME, -- 09-DEC-2011 CITIUS-LS#12057 Change
	(SELECT UPPER(Purpose_of_syndication)|| DECODE(Purpose_of_syndication1,NULL,NULL,' '||UPPER(Purpose_of_syndication1))
	|| DECODE(Purpose_of_syndication2,NULL,NULL,' '||UPPER(Purpose_of_syndication2))
	 FROM lbtb_syndication_master
	 WHERE contract_ref_no = b.syndication_ref_no
         AND version_no = (
	                      SELECT max(version_no)
	                      FROM   lbtb_syndication_master
	                      WHERE  contract_ref_no = b.syndication_ref_no
	                 )
   	)
   	)-- 09-DEC-2011 CITIUS-LS#12057 Change*/
   	FACILITY_NAME,
       c.SHORT_NAME ,		-- FLEXCUBE V.CL Release 7.0, short_name added       
	B.VALUE_DATE  , 	-- CITILS46110170 Changes
       B.MATURITY_DATE , 	-- CITILS46110170 Changes
	A.DEPARTMENT_CODE,	--CITIUS OPS,Retro as part of FLEXCUBE V.CL Release 7.0 Changes, PIYUSH, 09-MAR-2006, DEPARTMENT_CODE ADDED
	A.TREASURY_SOURCE,  --CITIUS OPS,Retro as part of FLEXCUBE V.CL Release 7.0 Changes , PIYUSH, 09-MAR-2006, DEPARTMENT_CODE ADDED
	A.EXTERNAL_REF_NO,	----25-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#4, Retro Changes CITIUS-LS-623,25-dec-2007CHANGES, External Ref No added in TR and DD summary Screen
        TRUNC(A.BOOK_DATE),           --CITIUPG73100216
        NVL((SELECT DRAWDOWN_TYPE FROM lbtbs_drawdown_schedule WHERE DRAWDOWN_rEF_NO=A.CONTRACT_REF_NO AND VERSION_NO=B.VERSION_NO),'X')DRAWDOWN_TYPE --05-MAR-2009 FCC V.CL Release 7.5 EURCITIPLC RETRO CITILS10G00089 Changes
FROM   oltbs_contract A,
       oltbs_contract_master B,
	oltms_customer C 	-- FLEXCUBE V.CL Release 7.0 ITR1, short_name added
WHERE  A.CONTRACT_REF_NO = B.CONTRACT_REF_NO AND
       A.LATEST_VERSION_NO = B.VERSION_NO AND
       A.MODULE_CODE ='LB' AND
       B.COUNTERPARTY = C.CUSTOMER_NO	-- FLEXCUBE V.CL Release 7.0 ITR1, short_name added
----Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = A.PRODUCT_code --OBCL_14.8_CE_Length_Changes
   AND USER_ID = global.user_id)
and not exists (Select 1 From oltb_contract_version_roll  Where Roll_Src_Ref_No= a.contract_ref_no)--Bug#37168959 changes
--Product Access restriction - End
)
/
CREATE OR REPLACE SYNONYM lbvws_borrower_summary FOR lbvw_borrower_summary
/