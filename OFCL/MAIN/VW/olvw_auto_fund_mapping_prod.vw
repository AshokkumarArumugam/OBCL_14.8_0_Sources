CREATE OR REPLACE FORCE VIEW olvw_auto_fund_mapping_prod(product_code,product_description,product_type,branch_code)
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_auto_fund_mapping_prod.VW
**
** Module      : Loans and Deposits
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
SELECT 
	a.product_code,
	a.prod_desc,
	a.product_type,
	b.branch_code	
	--,c.department_code--Bug#28892046 Changes
	FROM	  
		--oltms_product a,--Commented For OBCL_14.2_CD Integration
		Oltbs_If_Product_Master	a,--OBCL_14.2_CD Integration Changes
		Oltms_Brn_Af_Prd_Master b,
		--oltms_dept_af_prd_master c--Bug#28892046 Changes
		Oltms_Brn_Af_Prd_Detail c--Bug#28892046 Changes
	WHERE  
		--a.MODULE='OL'--Commented For OBCL_14.2_CD Integration
		a.module_code = 'LD'--OBCL_14.2_CD Integration Changes
		--AND a.product_type IN ('L','D')--Commented For OBCL_14.2_CD Integration
		AND	  a.product_type = 'D'--OBCL_14.2_CD Integration Changes
		AND	  a.record_stat = 'O'
		--AND 	  a.auth_stat='A'
		--Bug#28892046 Changes Starts
		AND	  a.product_code = c.product_code
		AND	  b.branch_code  = c.branch_code
		AND   a.record_stat  = b.record_stat
		AND   b.auth_stat='A'
		--Bug#28892046 Changes Ends
	/*IN 
   (SELECT d.product_code 
	FROM   oltms_brn_af_prd_detail d,oltms_dept_af_prd_detail e
	WHERE  d.product_code=e.product_code
	AND    d.branch_code=b.branch_code
	AND    e.department_code=c.department_code
	AND	   b.record_stat='O'
	AND    b.auth_stat='A'
	AND    b.record_stat=c.record_stat
	AND    b.auth_stat=c.auth_stat
	)*/
/
create or replace synonym olvws_auto_fund_mapping_prod for olvw_auto_fund_mapping_prod
/