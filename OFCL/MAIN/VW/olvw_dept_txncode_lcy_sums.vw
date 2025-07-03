CREATE OR REPLACE force VIEW olvw_dept_txncode_lcy_sums
			      ( BRANCH,
				BATCH, 
				DEPARTMENT, 
				TXN_CODE, 
				DR_ENT_TOTAL, 
				CR_ENT_TOTAL
			       ) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_dept_txncode_lcy_sums.VW
**
** Module      : Core Services
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
SELECT  BRANCH_CODE,
        BATCH_NO ,
	DEPARTMENT_CODE ,
        TXN_CODE ,
        SUM (DECODE (DR_CR , 'D' , 1 * LCY_AMOUNT ) ) ,
        SUM (DECODE (DR_CR , 'C' , LCY_AMOUNT ) ) 
FROM	OLTB_JRNL_LOG_DE
WHERE	CONTRACT_STATUS = 'A'
GROUP BY   BRANCH_CODE , BATCH_NO ,DEPARTMENT_CODE ,TXN_CODE
/