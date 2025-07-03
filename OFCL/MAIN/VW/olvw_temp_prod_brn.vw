CREATE OR REPLACE force VIEW olvw_temp_prod_brn ( BRANCH_CODE, 
PRODUCT_COMBN_CODE, PRODUCT_CODE )
AS 
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_temp_prod_brn.VW
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
11-APR-2004 FCC4.5 Lot2 Apr 2004 retro changes Driving site hint added to avoid fetching data over db link before performing 
a join locally. This hint causes the join to happen remotely, then fetch only the 
relevant data across
*/
	SELECT	/*+ DRIVING_SITE (a), DRIVING_SITE (b)*/ 
		b.branch_code, a.product_combn_code, a.product_code
	FROM	oltms_prd_combination_product a
		, oltms_branch b
	UNION
	SELECT	b.branch_code, a.product_code, a.product_code
	FROM	oltms_product a
		, oltms_branch b
	WHERE	NVL( no_of_legs, 1 ) = 1
	AND	a.auth_stat = 'A'
	AND	a.record_stat = 'O'
/
create or replace synonym olvws_temp_prod_brn for olvw_temp_prod_brn
/