CREATE OR REPLACE force VIEW olvw_temp_disallow_prod_brn ( PRODUCT_CODE, 
BRANCH_CODE ) AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_temp_disallow_prod_brn.VW
**
** Module       : CORE ENTITIES
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY
11-Apr-2004	FCC45 Lot2 Apr 2004 retro Trestel Tuning Changes
   Driving site hint added
*/
 SELECT	/*+ DRIVING_SITE (a), DRIVING_SITE (b)*/ 
		distinct a.product_code, b.branch_code
	FROM	oltms_product a
		, oltms_branch b
	WHERE	a.branches_list = 'A'
	MINUS
	SELECT	/*+ DRIVING_SITE (a), DRIVING_SITE (b)*/ 
		distinct a.product_code, b.branch_disallow
	FROM	oltms_product a
		, oltms_prod_brn_disallow b
	WHERE	a.branches_list = 'A'
	AND	a.product_code = b.product_code
	UNION
	SELECT	/*+ DRIVING_SITE (a), DRIVING_SITE (b)*/ 
		distinct a.product_code, b.branch_disallow
	FROM	oltms_product a
		, oltms_prod_brn_disallow b
	WHERE	a.branches_list = 'D'
	AND	a.product_code = b.product_code
/
create or replace synonym olvws_temp_disallow_prod_brn for olvw_temp_disallow_prod_brn 
/