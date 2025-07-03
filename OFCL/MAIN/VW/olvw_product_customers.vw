CREATE OR REPLACE force VIEW olvw_product_customers ( PRODUCT_CODE, 
CUSTOMER_NO ) AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_product_customers.VW
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
 SELECT PRCAT.product_code
 	, CUST.customer_no
 FROM olvws_product_categories PRCAT
 	, oltms_customer CUST
 WHERE PRCAT.cust_cat = CUST.customer_category
 AND	CUST.auth_stat = 'A'
 AND	CUST.record_stat = 'O'
 MINUS
 SELECT product_code
 	, customer_id
 FROM oltms_product_customer_access
 WHERE allowed = 'N'
                               UNION
 SELECT product_code
 	, customer_id
 FROM oltms_product_customer_access
 WHERE allowed = 'Y'
/
create or replace synonym olvws_product_customers  for olvw_product_customers
/