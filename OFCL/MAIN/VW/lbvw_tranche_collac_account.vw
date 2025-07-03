CREATE OR REPLACE FORCE VIEW lbvw_tranche_collac_account AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : lbvw_tranche_collac_account.vw
**
** Module       : LOANS and DEPOSITS										
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
-----------------------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY
*/
(SELECT
A.TRANCHE_REF_NO         ,        
A.EFFECTIVE_DATE         ,
A.COLLATERAL_CODE        ,
A.COLLATERAL_ACCOUNT     ,
A.INVESTMENT_TYPE        ,
A.BALANCE_DISP_DEADLINE  ,
A.OPENING_BALANCE        ,
A.AVAILABLE_BALANCE      ,
A.PENDING_TRANSFERS      ,
A.DIFFERENCE_AMOUNT      ,
B.RECORD_STAT,
B.AUTH_STAT
FROM lbtm_tranche_collac_account A, lbtm_tranche_collac_effdate B,
     lbtm_tranche_collac_coll C
WHERE A.TRANCHE_REF_NO = B.TRANCHE_REF_NO
AND A.EFFECTIVE_DATE = B.EFFECTIVE_DATE
AND A.TRANCHE_REF_NO = C.TRANCHE_REF_NO
AND A.EFFECTIVE_DATE = C.EFFECTIVE_DATE
AND A.COLLATERAL_CODE=C.COLLATERAL_CODE
)
/