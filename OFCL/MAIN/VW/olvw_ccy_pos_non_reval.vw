CREATE OR REPLACE force VIEW olvw_ccy_pos_non_reval
	( branch_code, ccy, real_ccy_daily, real_lcy_daily, cont_ccy_daily, cont_lcy_daily )
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_ccy_pos_non_reval.VW
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
/*				C H A N G E  H I S T O R Y
PLC401000164	New Unit for currency position which excludes revaluation  
*/
SELECT
	a.ac_branch
,	a.ac_ccy
,	SUM	( DECODE( a.category,
				'5', 0,
				'6', 0,
				'3', 0,
				'4', 0,
				DECODE	( a.drcr_ind, 'D', 1, -1 )
			) * NVL ( a.fcy_amount, 0 )
		) real_ccy_daily
,	SUM	( DECODE( a.category,
				'5', 0,
				'6', 0,
				'3', 0,
				'4', 0,
				DECODE	( a.drcr_ind, 'D', 1, -1 )
			) * a.lcy_amount
		) real_lcy_daily
,	SUM	( DECODE( a.category,
				'1', 0,
				'2', 0,
				'3', 0,
				'4', 0,
				'7', 0,
				DECODE	( a.drcr_ind, 'D', 1, -1 )
			) * NVL ( a.fcy_amount, 0 )
		) cont_ccy_daily
, 	SUM 	( DECODE( a.category,
				'1', 0,
				'2', 0,
				'3', 0,
				'4', 0,
				'7', 0,
				DECODE	( a.drcr_ind, 'D', 1, -1 )
			) * a.lcy_amount
		) cont_lcy_daily
FROM
	oltbs_daily_log_ac a
,	oltms_branch b
WHERE
	a.ac_branch	= 	b.branch_code
AND 	a.delete_stat 	= 	CHR(32)
AND 	a.ac_ccy 	!= 	b.branch_lcy
AND	a.event		!=	'REVL'
GROUP BY a.ac_branch, a.ac_ccy
UNION ALL
SELECT
	a.ac_branch
,	b.branch_lcy
,	0 real_ccy_daily
,	SUM	( DECODE ( a.category,
				'5', 0,
				'6', 0,
				DECODE ( a.drcr_ind, 'D', 1, -1 )
			) * a.lcy_amount
		) real_lcy_daily
,	0 cont_ccy_daily
,	SUM	( DECODE ( a.category,
				'1', 0,
				'2', 0,
				'3', 0,
				'4', 0,
				'7', 0,
				DECODE ( a.drcr_ind, 'D', 1, -1 )
			) * a.lcy_amount
		) cont_lcy_daily
FROM
	oltbs_daily_log_ac a
,	oltms_branch b
WHERE
	a.ac_branch	=	b.branch_code
AND 	a.delete_stat	= 	CHR(32)
AND	a.event		!=	'REVL'
AND 	(
		a.ac_ccy	= 	b.branch_lcy
	OR 	a.category 	IN 	( '3', '4' )
	)
GROUP BY a.ac_branch, b.branch_lcy
/

CREATE or replace SYNONYM olvws_ccy_pos_non_reval FOR olvw_ccy_pos_non_reval
/