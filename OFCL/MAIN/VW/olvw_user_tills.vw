CREATE OR REPLACE force VIEW olvw_user_tills ( BRANCH_CODE, 
USER_ID, TILL_ID, LOCK_STAT ) AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_user_tills.VW
**
** Module       : DE
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
*/
 (
SELECT BRANCH_CODE, USER_ID, TILL_ID ,LOCK_STAT FROM oltms_til_vlt_master
WHERE USER_ID IS NOT NULL
)
/
create or replace synonym olvws_user_tills  for olvw_user_tills
/