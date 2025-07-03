CREATE OR REPLACE VIEW SMVW_USER_BRANCHES  AS 
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
**
**
** No part of this work may be reproduced, stored in a retrieval system, adopted
** or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise, translated in any
** language or computer language, without the prior written permission of
** Oracle and/or its affiliates.
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India
** India
------------------------------------------------------------------------------------------
**Modified By                       : Pankaj
**Modified On                      : 15-Apr-2015
**Modified Reason             : Performance Tuning : Introduced the function with 'Result Cache'  in order to **reduce **the number of executions
**Search String                      : FCUBS12.1 Performance tuning using Result Cache
**
**
**Modified By                       : Ajai
**Modified On                       : 25-Aug-2015
**Modified Reason                   : to restrict closed records in view
**Search String                     : Bug#21681145
-----------------------------------------------------------------------------------------*/
SELECT A.USER_ID, B.BRANCH BRANCH_CODE --Thilagam Changed alias to compile objects
  FROM SMTB_USER A, SMTB_USER_BRANCHES B
 WHERE A.BRANCHES_ALLOWED = 'A'
   AND B.USER_ID = A.USER_ID
       --Bug#21681145 starts
   AND A.RECORD_STAT='O'
   AND A.ONCE_AUTH='Y'
     --Bug#21681145 ends
-- FCUBS12.1 Performance tuning using Result Cache starts
--UNION
UNION ALL
-- FCUBS12.1 Performance tuning using Result Cache ends
SELECT A.USER_ID, B.BRANCH_CODE
  FROM SMTB_USER A, STTM_CORE_BRANCH B
 WHERE A.BRANCHES_ALLOWED = 'D'
   AND B.RECORD_STAT = 'O'
   AND B.ONCE_AUTH = 'Y'
       --Bug#21681145 starts
   AND A.RECORD_STAT='O'
   AND A.ONCE_AUTH='Y'
     --Bug#21681145 ends
   AND NOT EXISTS (SELECT 1
          FROM SMTB_USER_BRANCHES C
         WHERE C.USER_ID = A.USER_ID
           AND C.BRANCH = B.BRANCH_CODE)
/
CREATE OR REPLACE SYNONYM SMVWS_USER_BRANCHES  FOR SMVW_USER_BRANCHES 
/