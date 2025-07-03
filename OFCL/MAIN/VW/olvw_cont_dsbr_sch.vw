CREATE OR REPLACE FORCE VIEW OLVW_CONT_DSBR_SCH AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: OLVW_CONT_DSBR_SCH.VW
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.

CHANGE HISTORY

 **Changed By         : Abhik Das
 **Date               : 23-NOV-2019
 **Change Description : Added code to populate split settlement records for VAMI event
 **Search String      : OBCL_14.4_Support_Bug#31685434_Changes
----------------------------------------------------------------------------------------------------
*/
SELECT 
CONTRACT_REF_NO,
VERSION_NO,
COMPONENT,
DISBURSEMENT_MODE,
DUE_DATE,
CONTRACT_CCY,
AMOUNT,
LCY_EQVT_AMT,
SCHEDULE_APPLIED,
APPLIED_ESN,
SCH_REVERSED,
DSBB_ESN
FROM OLTB_CONTRACT_DSBR_SCH
WHERE Disbursement_Mode IN ('A','M'
,'V'---OBCL_14.4_Support_Bug#31685434_Changes
)
/

CREATE OR REPLACE SYNONYM OLVWS_CONT_DSBR_SCH FOR OLVW_CONT_DSBR_SCH
/