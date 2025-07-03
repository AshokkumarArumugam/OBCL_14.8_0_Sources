CREATE OR REPLACE force VIEW olvw_batch_lcy_sums ( BRN, 
BATCH, DR_ENT_TOTAL, CR_ENT_TOTAL ) AS 
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_batch_lcy_sums.VW
**
** Module       : DE
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
SELECT BRANCH_CODE , BATCH_NO , SUM (DECODE (DR_CR , 'D' , 1 * LCY_AMOUNT ) ) ,
SUM (DECODE (DR_CR , 'C' , LCY_AMOUNT ) ) FROM
OLTB_JRNL_LOG_DE
GROUP BY   BATCH_NO , BRANCH_CODE  
/
create or replace synonym olvws_batch_lcy_sums for olvw_batch_lcy_sums
/