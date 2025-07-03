CREATE OR REPLACE FORCE VIEW olvw_loan_roll_instruction
AS
/*-------------------------------------------------------------------------------------- 
**  
**  File Name :olvw_loan_roll_instruction.VW 
**  
**  Module    :LD-Loans and Deposits
**  
**  This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
------------------------------------------CHANGE HISTORY----------------------------------
09-Jun-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#86 , VDBAL changes for rollover by Saurabh
11-Jun-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#134 , Rollover build if  rollover allowed is yes
26-Jun-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR2 SFR#5 , For New Version Rollover rollover date has been picked up by Saurabh
20-Mar-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag4 Changes for populating VDBAL for deposits.
----------------------------------------END CHANGE HISTORY --------------------------------
*/
SELECT	B.CONTRACT_REF_NO,
	A.ROLLOVER_METHOD,
	(
	CASE
		WHEN NVL(A.ROLLOVER_METHOD,'N') = 'N' 
		THEN
			NVL(DECODE(C.rollover_amount_type,'P',NVL(C.ROLLOVER_AMT,0),NVL(C.ROLLOVER_AMT,0) + NVL(C.INTEREST_ROLL_AMOUNT,0)),0)
		WHEN A.ROLLOVER_METHOD = 'S' 
		THEN
			(
			SELECT NVL(SUM(decode(c.rollover_amount_type,'P',NVL(D.PRINCIPAL_ROLL_AMOUNT,0),NVL(D.MAX_ROLL_AMOUNT,0))),0)
			FROM   oltbs_contract_split_rollover D
			WHERE  D.CONTRACT_REF_NO = B.CONTRACT_REF_NO
			AND D.VERSION_NO = B.LATEST_VERSION_NO
			)
	END
	) ROLLOVER_AMOUNT,
	(CASE
		WHEN A.ROLLOVER_METHOD IN ('N','S') 
		THEN 
			C.LIQUIDATE_PRINCIPAL
	END
	) LIQUIDATE_PRINCIPAL,
	A.CURRENCY,
	DECODE(A.ROLLOVER_MECHANISM ,'V',a.value_date,a.maturity_date) rollover_date, --26-Jun-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR2 SFR#5 , For New Version Rollover rollover date has been picked up by Saurabh
      	A.MATURITY_DATE VALUE_DATE
  FROM   oltbs_contract_master A,
         oltbs_contract B,
         oltbs_contract_rollover C
  WHERE  A.CONTRACT_REF_NO = B.CONTRACT_REF_NO
  AND A.VERSION_NO = b.latest_version_no
  AND C.CONTRACT_REF_NO = B.CONTRACT_REF_NO
  AND B.MODULE_CODE = 'OL'
  AND B.CONTRACT_STATUS IN ('A','Y') --active or uninitiated contracts
  --AND A.PRODUCT_TYPE = 'L'--20-Mar-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag4 Changes
  AND A.PRODUCT_TYPE IN ('L','D')--20-Mar-2010 FLEXCUBE V.CL Release 7.6 CITIPBG TD FS tag4 Changes
  AND C.ROLL_INST_STATUS IN ('I','F')
  AND A.rollover_allowed ='Y'--11-Jun-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#134 , Rollover build if  rollover allowed is yes
/
CREATE OR REPLACE SYNONYM olvws_loan_roll_instruction FOR olvw_loan_roll_instruction
/