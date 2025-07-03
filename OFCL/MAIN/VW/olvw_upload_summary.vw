CREATE OR REPLACE FORCE VIEW olvw_upload_summary AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_upload_summary.VW
**
** Module      : Interfaces
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
SELECT B.PROCESS_FLAG, A.BRANCH_CODE, A.CCY , A.POOL_CODE, A.EFF_DATE, A.CR_RATE, A.DR_RATE
FROM   OLTB_UPLD_POOL_DLY_RFRATE_DET A, 
	   OLTB_UPLOAD_POOL_DLY_REF_RATES B
WHERE  A.BRANCH_CODE = B.BRANCH_CODE
AND    A.POOL_CODE = B.POOL_CODE
AND    A.CCY       = B.CCY
ORDER BY A.BRANCH_CODE, A.POOL_CODE, A.CCY , A.EFF_DATE
/
CREATE OR REPLACE SYNONYM olvws_upload_summary FOR olvw_upload_summary
/