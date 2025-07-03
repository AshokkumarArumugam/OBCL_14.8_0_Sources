CREATE OR REPLACE force VIEW olvw_product_currencies ( PRODUCT_CODE, 
CCY_CODE ) AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_product_currencies.VW
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
  **Changed By         : Gomathi G
  **Date               : 21-MAY-2020
  **Change Description : Subquery used in the IN Clause might return NULL if there are no disallowed products. 
						 Replaced with NOT EXISTS clause as it would handle NULL condition and also to adhere to better coding standards practice.
  **Search String      : OBCL_14.3_SUPPORT_Bug#31381563 CHANGES
*/
 (( SELECT PR.product_code
 	, CCY.ccy_code
 FROM oltms_product PR
 	, cytms_ccy_defn CCY
 	, oltms_product_ccy_disallow PRCCY
 WHERE PR.currencies_list = 'D'
 AND	 PRCCY.product_code = PR.product_code
 AND	 PR.auth_stat = 'A'
 AND	 PR.record_stat = 'O'
 AND	 CCY.auth_stat = 'A'
 AND	 CCY.record_stat = 'O'
 MINUS
 SELECT PR.product_code
 	, PRCCY.bought_deal_ccy
 FROM oltms_product PR
 	, oltms_product_ccy_disallow PRCCY
 WHERE PR.currencies_list = 'D'
 AND	 PRCCY.product_code = PR.product_code
 )
 UNION
 SELECT PR.product_code
 	, PRCCY.bought_deal_ccy
 FROM oltms_product PR
 	, oltms_product_ccy_disallow PRCCY
 WHERE PR.currencies_list = 'A'
 AND	 PRCCY.product_code = PR.product_code
 )
 UNION
 SELECT PR.product_code
 	, CCY.ccy_code
 FROM oltms_product PR
 	, cytms_ccy_defn CCY
 WHERE 
--OBCL_14.3_SUPPORT_BUG#31381563 CHANGES STARTS
 /*PR.product_code NOT IN
 		(SELECT product_code from oltms_product_ccy_disallow)*/
 NOT EXISTS(
             SELECT 1 from oltms_product_ccy_disallow pd
			 where pd.product_code = PR.product_code
			 )
--OBCL_14.3_SUPPORT_BUG#31381563 CHANGES ENDS
 AND PR.currencies_list = 'D'
 AND CCY.auth_stat = 'A'
 AND CCY.record_stat = 'O'
 AND PR.auth_stat = 'A'
 AND PR.record_stat = 'O'
/
create or replace synonym olvws_product_currencies for olvw_product_currencies
/