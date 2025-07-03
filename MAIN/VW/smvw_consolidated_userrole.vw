CREATE OR REPLACE FORCE VIEW SMVW_CONSOLIDATED_USERROLE AS
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
**
**Modified By                       : Ajai
**Modified On                       : 25-Aug-2015
**Modified Reason                   : to restrict closed records in view
**Search String                     : Bug#21681145
---------------------------------------------------------------------------------------------*/
SELECT A.ROLE_ID, A.USER_ID, BRANCH_CODE, A.AUTH_STAT
  FROM SMTBS_USER_ROLE A
   --19125049 start..
  , SMTBS_ROLE_MASTER B
   , SMTB_USER       M --Bug#21681145 added smtb_user
       WHERE A.ROLE_ID = B.ROLE_ID 
       AND B.AUTH_STAT ='A'
         --Bug#21681145 starts
       AND M.USER_ID = A.USER_ID
       AND M.RECORD_STAT = 'O'
       AND M.ONCE_AUTH = 'Y'
       AND B.RECORD_STAT = 'O'
       AND B.ONCE_AUTH = 'Y'
        --Bug#21681145 ends
  --19125049 end.
UNION
SELECT ROLE_ID, USER_ID, BRANCH_CODE, AUTH_STAT
  FROM SMVWS_USER_CENTRAL_ROLES
/
create or replace synonym SMVWS_CONSOLIDATED_USERROLE for SMVW_CONSOLIDATED_USERROLE 
/