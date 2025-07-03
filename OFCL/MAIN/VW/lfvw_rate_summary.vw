CREATE OR REPLACE force VIEW lfvw_rate_summary ( BRANCH_CODE, 
RATE_CODE, RATE_DESCR, CCY_CODE, EFFECTIVE_DATE, 
AMOUNT_SLAB, INT_RATE, RECORD_STAT, AUTH_STAT
 ) AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : lfvw_rate_summary.VW
**
** Module       : CORE ENTITIES
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY
*/
SELECT   A.BRANCH_CODE,A.RATE_CODE, A.RATE_DESCR,
B.CCY_CODE,C.EFFECTIVE_DATE,
     C.AMOUNT_SLAB,C.INT_RATE,A.RECORD_STAT,A.AUTH_STAT
    FROM
    CFTMS_RATE_CODE   A, CFTMS_RATE_CCY    B, CFTMS_FLOATING_RATE    C
    WHERE
     A.BRANCH_CODE=B.BRANCH_CODE AND
     B.BRANCH_CODE=C.BRANCH_CODE AND
     A.RATE_CODE=B.RATE_CODE AND
     B.RATE_CODE=C.RATE_CODE AND
     B.CCY_CODE=C.CCY_CODE
/
create or replace synonym lfvws_rate_summary for lfvw_rate_summary
/