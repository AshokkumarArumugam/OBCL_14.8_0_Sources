CREATE OR REPLACE force	VIEW olvw_avl_prod_br_usr
(
		PRODUCT_CODE, 
		BRANCH_CODE,
		USER_ID
)	
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_avl_prod_br_usr.VW
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
26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro
				1.FLEXCUBE V.CL Release 7.5 Lot1.1 ITR1 SFR#7 User role changes
7-jUNE-2018 Added code to fetch allowed products based on user. Forward port 28125274 Search string : 28378379

Changes By 	       : Satheesh Seshan
Date               : 23-NOV-2021
Change Description : Commented the existing condition and added views for user level restrictions.
Search String	   : BUG#33591509
--------------------------------------------------------------------------------------------------------------------------------------
*/
SELECT	A.PRODUCT_CODE ,B.BRANCH_CODE ,C.USER_ID
FROM		oltms_product		A,
		oltms_branch		B,
		SMTBS_USER			C
WHERE		A.ONCE_AUTH		=		'Y'
AND		A.RECORD_STAT		=		'O'
AND		(	(	A.BRANCHES_LIST	=	'A'
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
		) --28378379  starts
--BUG#33591509 start added below
AND EXISTS (
			SELECT 1 
			  FROM olvw_user_products D
			 WHERE D.USER_ID = C.USER_ID
			   AND D.PRODUCT_CODE = A.PRODUCT_CODE)
AND EXISTS (
			SELECT 1 
			  FROM olvw_user_access_products E
			 WHERE E.USER_ID = C.USER_ID
			   AND E.PRODUCT_CODE = A.PRODUCT_CODE
			)
--BUG#33591509 Commented below
/*
(	--BUG#33591509 -- AND condition is required
	/*(	C.PRODUCTS_ALLOWED	=	'A'
		AND	EXISTS
				(*/	 --28378379  ends
				/* --24-JUL-2009 FLEXCUBE V.CL Release 7.5 Lot1.1 ITR1 SFR#7 User role changes
					SELECT		1 
					FROM		SMTBS_USER_PRODUCTS		F
					WHERE		F.USER_ID		=		C.USER_ID
					AND			F.PRODUCT_CODE	=		A.PRODUCT_CODE
				*/--24-JUL-2009 FLEXCUBE V.CL Release 7.5 Lot1.1 ITR1 SFR#7 User role changes	
			         --24-JUL-2009 FLEXCUBE V.CL Release 7.5 Lot1.1 ITR1 SFR#7 User role changes start --28378379 starts
			           	/*SELECT  1
					FROM  SMTBS_USER G,olvw_user_role_product H
					WHERE  H.PRODUCTS_ALLOWED = 'A' 
				 	AND H.USER_ID = G.USER_ID
					AND H.USER_ID = C.USER_ID 
					AND H.PRODUCT_CODE=A.PRODUCT_CODE
                                 --24-JUL-2009 FLEXCUBE V.CL Release 7.5 Lot1.1 ITR1 SFR#7 User role changes - Ed
				)
			)*/--28378379  ends
	/*
		OR	(	C.PRODUCTS_ALLOWED	=	'D'
			AND	NOT EXISTS
				(	/*SELECT		1
					FROM		SMTBS_USER_PRODUCTS		F
					WHERE		F.USER_ID		=		C.USER_ID
					AND			F.PRODUCT_CODE	=		A.PRODUCT_CODE*/
					--24-JUL-2009 FLEXCUBE V.CL Release 7.5 Lot1.1 ITR1 SFR#7 User role changes - St
					/*  SELECT  1
					  FROM  SMTBS_USER G,olvw_user_role_product H
					  WHERE  H.PRODUCTS_ALLOWED = 'D' 
					  AND H.USER_ID = G.USER_ID 
					  AND H.USER_ID = C.USER_ID
					  AND H.PRODUCT_CODE=A.PRODUCT_CODE
                                          --24-JUL-2009 FLEXCUBE V.CL Release 7.5 Lot1.1 ITR1 SFR#7 User role changes - Ed
				)
			)
		--)	   --28378379 
*/
--BUG#33591509 END
/
create or replace synonym olvws_avl_prod_br_usr for olvw_avl_prod_br_usr
/