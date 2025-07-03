CREATE OR REPLACE force	VIEW olvw_avl_all_prod_br_usr
(
		PRODUCT_CODE, 
		BRANCH_CODE,
		USER_ID
)	
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_avl_all_prod_br_usr.VW
**
** Module      : Core Services
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/* CHANGE - HISTORY 
13-Jul-2010 FLEXCUBE V.CL Release 7.7 CITIPBG Loan Vol1 Tag3 Changes,
		new view created to apply product level restriction on the LD product screen
*/
SELECT	A.PRODUCT_CODE ,B.BRANCH_CODE ,C.USER_ID
FROM		oltms_product		A,
		oltms_branch		B,
		SMTBS_USER			C
WHERE		(	(	A.BRANCHES_LIST	=	'A'
			AND	EXISTS
				(	SELECT	1
					FROM	oltms_prod_brn_disallow		D
					WHERE	D.PRODUCT_CODE		=		A.PRODUCT_CODE
					AND		D.BRANCH_DISALLOW	=		B.BRANCH_CODE
				)
			)
		OR	(	A.BRANCHES_LIST	=	'D'
			AND	NOT EXISTS
				(	SELECT	1
					FROM	oltms_prod_brn_disallow		E
					WHERE	E.PRODUCT_CODE		=		A.PRODUCT_CODE
					AND		E.BRANCH_DISALLOW	=		B.BRANCH_CODE
				)
			)
		)
AND		(	(	C.PRODUCTS_ALLOWED	=	'A'
		AND	EXISTS
				(	
			           	SELECT  1
					FROM  SMTBS_USER G,olvw_user_role_product H
					WHERE  H.PRODUCTS_ALLOWED = 'A' 
				 	AND H.USER_ID = G.USER_ID
					AND H.USER_ID = C.USER_ID 
					AND H.PRODUCT_CODE=A.PRODUCT_CODE
				)
			)
		OR	(	C.PRODUCTS_ALLOWED	=	'D'
			AND	NOT EXISTS
				(
					  SELECT  1
					  FROM  SMTBS_USER G,olvw_user_role_product H
					  WHERE  H.PRODUCTS_ALLOWED = 'D' 
					  AND H.USER_ID = G.USER_ID 
					  AND H.USER_ID = C.USER_ID
					  AND H.PRODUCT_CODE=A.PRODUCT_CODE
				)
			)
		)
/