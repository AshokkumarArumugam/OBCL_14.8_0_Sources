CREATE OR REPLACE FORCE VIEW lfvw_rate_detail_summary
( BRANCH_CODE, RATE_CODE, RATE_DESCR, CCY_CODE, EFFECTIVE_DATE, 
AMOUNT_SLAB, INT_RATE, TENOR_TO, BORROW_LEND_IND, 
RECORD_STAT, AUTH_STAT )
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : lfvw_rate_detail_summary.VW
**
** Module       : CORE ENTITIES
**
**	This source is part of the Oracle Banking Corporate Lending  Software Product.   
**	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
**	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**	Oracle Financial Services Software Limited.
**	Oracle Park, Off Western Express Highway,
**	Goregaon (East), 
**	Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------*/  
SELECT 
A.BRANCH_CODE,A.RATE_CODE, A.RATE_DESCR,
       B.CCY_CODE,C.EFFECTIVE_DATE,C.AMOUNT_SLAB,C.INT_RATE,C.TENOR_TO,
       C.BORROW_LEND_IND,A.RECORD_STAT,A.AUTH_STAT
FROM   CFTMS_RATE_CODE   A, CFTMS_RATE_CCY    B, CFTMS_FLOAT_RATE_DETAIL   C
WHERE  A.BRANCH_CODE=B.BRANCH_CODE AND
	 B.BRANCH_CODE=C.BRANCH_CODE AND
       A.RATE_CODE=B.RATE_CODE AND
       B.RATE_CODE=C.RATE_CODE AND
	 B.CCY_CODE=C.CCY_CODE
/
CREATE or replace SYNONYM lfvws_rate_detail_summary FOR lfvw_rate_detail_summary
/