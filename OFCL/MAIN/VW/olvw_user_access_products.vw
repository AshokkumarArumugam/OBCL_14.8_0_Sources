CREATE OR REPLACE VIEW OLVW_USER_ACCESS_PRODUCTS AS 
/*
-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_user_access_products.vw
**
** Module       : SECURITY MAINTENANCE											
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
-----------------------------------------------------------------------------------------------
CHANGE_HISTORY
10-APR-2019	New view created to list the products that are accessable to the user
*/
SELECT USER_ID, PRODUCT_CODE
FROM
(
  SELECT A.USER_ID, B.PRODUCT_CODE
  FROM SMTBS_USER A, OLTMS_PRODUCT B, SMTB_USER_ACCESS_PRODUCTS C
 WHERE A.USER_ID = GLOBAL.USER_ID
   AND B.AUTH_STAT = 'A'
   AND B.RECORD_STAT = 'O'
   AND A.PRODUCTS_ACCESS_ALLOWED = 'A'
   AND A.USER_ID = C.USER_ID
   AND EXISTS (SELECT 1
          FROM SMTB_USER_ACCESS_PRODUCTS C
         WHERE C.USER_ID = A.USER_ID
           AND C.PRODUCT_CODE = B.PRODUCT_CODE)
UNION
  SELECT A.USER_ID USER_ID, B.PRODUCT_CODE PRODUCT_CODE
  FROM SMTBS_USER A, OLTMS_PRODUCT B
  WHERE A.USER_ID = GLOBAL.USER_ID
  AND B.AUTH_STAT = 'A'
  AND B.RECORD_STAT = 'O'
  AND A.PRODUCTS_ACCESS_ALLOWED = 'D'
  AND NOT EXISTS (SELECT 1
          FROM SMTB_USER_ACCESS_PRODUCTS C
         WHERE C.USER_ID = A.USER_ID
           AND C.PRODUCT_CODE = B.PRODUCT_CODE))
/
Create OR REPLACE Synonym olvws_user_access_products For olvw_user_access_products
/