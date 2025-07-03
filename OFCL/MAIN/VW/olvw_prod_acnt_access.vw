CREATE OR REPLACE VIEW olvw_prod_acnt_access
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_prod_acnt_access.vw
**
** Module       : OL
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2020  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
CHANGE HISTORY
    Changed By         : Navoneel Nandan
    Changed On         : 20-Jan-2020
    Search String      : OBCL_14.4_Account_Restriction
    Change Reason      : Populating the view for 'All' Account Code also

    Changed By         : Navoneel Nandan
    Changed On         : 07-Jun-2024
    Search String      : Bug#36663782
    Change Reason      : The system is validating all the accounts against the product account restriction, irrespective of the account type (Accounts or GL Accounts). 
                         Due to the high number of GL accounts, which is causing slowness in getting results.
                         Fix Description:Pay, Receive and Charge account related LOV's have been modified to consider the product restrictions for Nostro Accounts only for Customer Accounts.
-----------------------------------------------------------------------------------------------
*/
    SELECT 'ALL' product_code, a.ac_gl_no
	FROM oltbs_account a
	UNION ALL
	SELECT p.product_code, a.ac_gl_no
	FROM oltbs_account a, oltms_product p
	WHERE ac_or_gl = 'A' AND -- Bug#36663782 
    NOT EXISTS
	(
		SELECT 	1
        FROM 	oltms_prod_acnt_access_detail b, oltms_prod_acnt_access_master m
        WHERE 	b.product_code = m.product_code
        AND 	b.product_code = p.product_code
        AND 	m.is_allowed = 'N'
        AND 	b.ac_gl_no = a.ac_gl_no
	)
	AND 
	(
		CASE 
		WHEN (ac_or_gl != 'A' OR ac_class != '1' OR ac_gl_rec_status != 'O') 
		THEN
			1
        WHEN (
				EXISTS (
							SELECT 	1
							FROM 	oltms_prod_acnt_access_detail b, oltms_prod_acnt_access_master m
							WHERE 	b.product_code = m.product_code
							AND 	b.product_code = p.product_code
							AND 	m.is_allowed = 'Y'
							AND 	b.ac_gl_no = a.ac_gl_no
						) 
						OR
						(
							(
								SELECT 	COUNT(1)
								FROM 	oltms_prod_acnt_access_master m
								WHERE 	m.is_allowed = 'Y'
								AND 	m.product_code = p.product_code
							) = 0
						)
			) 
		THEN
			1
        ELSE
			0
		END
		) = 1
/
CREATE OR REPLACE SYNONYM olvws_prod_acnt_access FOR olvw_prod_acnt_access
/