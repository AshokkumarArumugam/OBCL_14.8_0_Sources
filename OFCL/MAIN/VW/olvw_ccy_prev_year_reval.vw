CREATE OR REPLACE force VIEW olvw_ccy_prev_year_reval ( BRANCH_CODE, 
CCY, REAL_CCY_DAILY, REAL_LCY_DAILY, CONT_CCY_DAILY, 
CONT_LCY_DAILY ) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name		: olvw_ccy_prev_year_reval.VW
**
** Module		: RE
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
SELECT
  a.ac_branch
, a.ac_ccy
, SUM ( DECODE( a.category,
    '5', 0,
    '6', 0,
    '7', 0,
    '1', 0,
    '2', 0,
    DECODE ( a.drcr_ind, 'D', 1, -1 )
   ) * NVL ( a.fcy_amount, 0 )
  ) real_ccy_daily
, SUM ( DECODE( a.category,
    '5', 0,
    '6', 0,
    '7', 0,
    '1', 0,
    '2', 0,
    DECODE ( a.drcr_ind, 'D', 1, -1 )
   ) * a.lcy_amount
  ) real_lcy_daily
,
 0
,
 0
FROM
 oltbs_history a
, oltms_branch b
WHERE
 a.ac_branch =  b.branch_code
AND  a.ac_ccy  !=  b.branch_lcy
AND a.event  = 'REVL'
AND a.financial_cycle != b.current_cycle
GROUP BY a.ac_branch, a.ac_ccy
UNION ALL
--- For Selecting REVL Entries passed thru DE
SELECT
 a.ac_branch
, a.ac_ccy
, SUM ( DECODE( a.category,
    '5', 0,
    '6', 0,
    '7', 0,
    '3', 0,
    '4', 0,
    DECODE ( a.drcr_ind, 'D', -1, 1 )
   ) * NVL ( a.fcy_amount, 0 )
  ) real_ccy_daily
, SUM ( DECODE( a.category,
    '5', 0,
    '6', 0,
    '7', 0,
    '3', 0,
    '4', 0,
    DECODE ( a.drcr_ind, 'D', -1, 1 )
   ) * a.lcy_amount
  ) real_lcy_daily
,
 0
,
 0
FROM
 oltbs_history a
, oltms_branch b
WHERE
 a.ac_branch =  b.branch_code
AND  a.ac_ccy  !=  b.branch_lcy
AND a.event  = 'REVL'
AND a.financial_cycle != b.current_cycle
AND a.module = 'OL'
AND a.category in ('1','2')
GROUP BY a.ac_branch, a.ac_ccy
/
CREATE or replace SYNONYM olvws_ccy_prev_year_reval FOR olvw_ccy_prev_year_reval
/