CREATE OR REPLACE force VIEW olvw_product_branches 
		AS
		/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_product_branches.VW
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
29-Jul-2004  FCC 4.6 Sep-04 Changes for 9iAS R2
*/
  --FCC 4.6 Sep-04 Changes for 9iAS R2 Starts
/*
CREATE OR REPLACE force VIEW olvw_product_branches ( PRODUCT_CODE, 
BRANCH_CODE ) AS SELECT	a.product_combn_code product_code, a.branch_code
	FROM		olvw_temp_prod_brn a
			, olvw_temp_disallow_prod_brn b
	WHERE		a.product_code = b.product_code(+)
	AND		a.branch_code = b.branch_code(+)
	GROUP BY	a.product_combn_code, a.branch_code
	HAVING		count(b.product_code) = 0
*/
 SELECT a.product_combn_code product_code, a.branch_code  
	FROM  olvw_temp_prod_brn a  WHERE  NOT EXISTS  (SELECT 1
	  	FROM olvw_temp_disallow_prod_brn b
  		WHERE a.product_code = b.product_code(+)  
  		AND  a.branch_code = b.branch_code(+))
  --FCC 4.6 Sep-04 Changes for 9iAS R2 Ends
  
/
create or replace synonym olvws_product_branches for olvw_product_branches
/