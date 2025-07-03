CREATE OR REPLACE FORCE VIEW olvw_user_products ( USER_ID, 
PRODUCT_CODE ) AS 
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_user_products.VW
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
*/
/*
CHANGE_HISTORY
28-SEP-2002	FCC 4.1 OCT 2002 CITIPLC SFR No 2002022102 	Should not check for auth and record stat - cannot view
										contracts for closed products in FT, also new unit for the view.
*/
/*
SELECT
       A.USER_ID
     , B.PRODUCT_CODE
 FROM  SMTBS_USER A,oltms_product B
  WHERE  A.PRODUCTS_ALLOWED = 'D'
 -- AND  B.AUTH_STAT = 'A' --FCC 4.1 OCT 2002 CITIPLC SFR No 2002022102 
 -- AND  B.RECORD_STAT = 'O'--FCC 4.1 OCT 2002 CITIPLC SFR No 2002022102 
  MINUS
  SELECT  A.USER_ID ,B.PRODUCT_CODE
  FROM  SMTBS_USER A,SMTBS_USER_PRODUCTS B
  WHERE  A.PRODUCTS_ALLOWED = 'D' AND B.USER_ID = A.USER_ID
  UNION
  SELECT  A.USER_ID,B.PRODUCT_CODE
  FROM  SMTBS_USER A,SMTBS_USER_PRODUCTS B, oltms_product c
  WHERE  A.PRODUCTS_ALLOWED = 'A' AND B.USER_ID = A.USER_ID
  AND	c.product_code = b.product_code
--  AND  c.AUTH_STAT = 'A'--FCC 4.1 OCT 2002 CITIPLC SFR No 2002022102 
--  AND  c.RECORD_STAT = 'O'--FCC 4.1 OCT 2002 CITIPLC SFR No 2002022102 
*/
SELECT USER_ID, PRODUCT_CODE FROM
(SELECT A.USER_ID, B.PRODUCT_CODE
  FROM  SMTBS_USER A,OLTMS_PRODUCT B, SMTB_USER_PRODUCTS C
  WHERE A.USER_ID = GLOBAL.USER_ID
  AND A.PRODUCTS_ALLOWED = 'A'
  AND  B.AUTH_STAT = 'A'
  AND  B.RECORD_STAT = 'O'
  AND  A.USER_ID = C.USER_ID
  AND EXISTS (SELECT 1
          FROM SMTB_USER_PRODUCTS C
         WHERE C.USER_ID = A.USER_ID
           AND C.PRODUCT_CODE = B.PRODUCT_CODE)
  UNION
  SELECT A.USER_ID, B.PRODUCT_CODE
  FROM  SMTBS_USER A,OLTMS_PRODUCT B
  WHERE A.USER_ID = GLOBAL.USER_ID
  AND A.PRODUCTS_ALLOWED = 'D'
  AND B.AUTH_STAT = 'A'
  AND B.RECORD_STAT = 'O'
  AND NOT EXISTS (SELECT 1
          FROM SMTB_USER_PRODUCTS C
          WHERE C.USER_ID = A.USER_ID
          AND C.PRODUCT_CODE = B.PRODUCT_CODE))
  UNION
  SELECT 'SYSTEM', A.PRODUCT_CODE
  FROM  OLTMS_PRODUCT A
  WHERE  A.AUTH_STAT = 'A'
  AND  A.RECORD_STAT = 'O'
  AND A.MODULE='LL'
INTERSECT
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
Create OR REPLACE Synonym olvws_user_products For olvw_user_products
/