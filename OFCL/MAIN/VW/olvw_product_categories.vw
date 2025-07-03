CREATE OR REPLACE force VIEW olvw_product_categories ( PRODUCT_CODE, 
CUST_CAT )
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_product_categories.VW
**
** Module       : CORE ENTITIES
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2020  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/*
  CHANGE HISTORY
  **Changed By         : Guru
  **Date               : 21-Feb-2020
  **Change Description : Subquery used in the IN Clause might return NULL if there are no disallowed products. 
						 Replaced with NOT EXISTS clause as it would handle NULL condition and also to adhere to better coding standards practice.
  **Search String      : OBCL_14.3_SUPPORT_Bug#30961788 Forward ported from OBCL_14.1_SUPPORT_Bug#30861687
  
  **Changed By         : Abhinav Kumar
  **Date               : 30-Sep-2022
  **Change Description : Handled Customer Category as UNDEFINED in backend, if user not maintained the same in OLDCUSMT for all existing 
                         Customer and doesnot have Customer Category Maintained as UNDEFINED in OLDCSCAG Screen.
                         Also added validation in OLDCUSMT Screen to check Customer Category is not blank while save.
  **Search String      : Bug#34623203  
  
  **Changed By         : Revathi Dharmalingam
  **Date               : 10-Jan-2023
  **Change Description : Added UNION clause to select the customer category from STTMS_CUSTOMER_CAT tables(STDCSCAG).
  **Search String      : OBCL_14.6_SUPPORT_Bug#34954473 Changes
  
  
-----------------------------------------------------------------------------------------------
*/
 (( SELECT PR.product_code
 	, CATG.cust_cat
 FROM oltms_product PR
 --Bug#34623203 Changes starts
 --, oltms_customer_cat CATG
 ,(SELECT cust_cat FROM oltms_customer_cat
    WHERE auth_stat = 'A'
      AND record_stat = 'O'
	 -- OBCL_14.6_SUPPORT_Bug#34954473 Changes Starts
	UNION
    SELECT Cust_Cat 
      FROM Sttms_Customer_Cat
     WHERE Record_Stat ='O' 
       AND Auth_Stat   ='A' 
       AND Once_Auth   ='Y'
	-- OBCL_14.6_SUPPORT_Bug#34954473 Changes Ends
   UNION
   SELECT 'UNDEFINED' FROM dual) CATG
 --Bug#34623203 Changes ends
 	, oltms_prd_cat_disallow PRCATG
 WHERE PR.categories_list = 'D'
 AND	 PRCATG.product_code = PR.product_code
 AND	 PR.auth_stat = 'A'
 AND	 PR.record_stat = 'O'
 --Bug#34623203 Changes starts
 /*AND	 CATG.auth_stat = 'A'
 AND	 CATG.record_stat = 'O'*/
 --Bug#34623203 Changes Ends
 MINUS
 SELECT PR.product_code
 	, PRCATG.category_disallow
 FROM oltms_product PR
 	, oltms_prd_cat_disallow PRCATG
 WHERE PR.categories_list = 'D'
 AND	 PRCATG.product_code = PR.product_code
 )
 UNION
 SELECT PR.product_code
 	, PRCATG.category_disallow
 FROM oltms_product PR
 	, oltms_prd_cat_disallow PRCATG
 WHERE PR.categories_list = 'A'
 AND	 PRCATG.product_code = PR.product_code
 )
 UNION
 SELECT PR.product_code
 	, CATG.cust_cat
 FROM oltms_product PR
 --Bug#34623203 Changes starts
 -- , oltms_customer_cat CATG
 ,(SELECT cust_cat FROM oltms_customer_cat
    WHERE auth_stat = 'A'
      AND record_stat = 'O'
   	 -- OBCL_14.6_SUPPORT_Bug#34954473 Changes Starts
	UNION
    SELECT Cust_Cat 
      FROM Sttms_Customer_Cat
     WHERE Record_Stat ='O' 
       AND Auth_Stat   ='A' 
       AND Once_Auth   ='Y'
	-- OBCL_14.6_SUPPORT_Bug#34954473 Changes Ends
   UNION
   SELECT 'UNDEFINED' FROM dual) CATG
 --Bug#34623203 Changes Ends
 WHERE 
 --OBCL_14.1_SUPPORT_Bug#30961788 Starts
 /*PR.product_code NOT IN
 		(SELECT product_code from oltms_prd_cat_disallow)*/
 NOT EXISTS 
 (
	SELECT 1 FROM oltms_prd_cat_disallow pd
	WHERE pd.product_code = pr.product_code
 )
 --OBCL_14.1_SUPPORT_Bug#30961788 Ends
 AND PR.categories_list = 'D'
 --Bug#34623203 Changes Starts
 /*AND CATG.auth_stat = 'A'
 AND CATG.record_stat = 'O'*/
 --Bug#34623203 Changes Ends
 AND PR.auth_stat = 'A'
 AND PR.record_stat = 'O'
/
create or replace synonym olvws_product_categories for olvw_product_categories
/