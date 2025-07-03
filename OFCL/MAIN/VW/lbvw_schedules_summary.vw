CREATE OR REPLACE FORCE VIEW lbvw_schedules_summary ( CONTRACT_REF_NO, 
COMPONENT, NOTICE_DATE ) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbvw_schedules_summary.VW
**
** Module      : Syndication Loans and Commitments
**
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/* Change History
27-OCT-2003 FCC 4.4 DEC 2003 CITIPLC SFR#PLC43020023 Addition of "/" at end for compilation.
*/
( SELECT D.CONTRACT_REF_NO, D.COMPONENT, D.EFFECTIVE_DATE NOTICE_DATE
 FROM   lftbs_contract_int_revision D, oltbs_contract M WHERE
   D.CONTRACT_REF_NO = M.CONTRACT_REF_NO AND
   M.BRANCH = GLOBAL.CURRENT_BRANCH AND
   NVL(PROCESS_STATUS,'N') = 'N' AND
   NVL(ADV_SENT,'N') = 'N'
 UNION
 SELECT D.CONTRACT_REF_NO, D.COMPONENT, D.REVISION_DATE NOTICE_DATE
 FROM   oltbs_contract_revision_sch D, oltbs_contract M WHERE
   D.CONTRACT_REF_NO = M.CONTRACT_REF_NO AND
   M.BRANCH = GLOBAL.CURRENT_BRANCH AND
   NVL(REVISION_APPLIED,'N') = 'N' AND
   NVL(NOTC_SENT,'N') = 'N'
 UNION
 SELECT D.CONTRACT_REF_NO, D.COMPONENT, D.SCH_DATE NOTICE_DATE
 FROM   lbtb_contract_margin_sch D, oltbs_contract M WHERE
   D.CONTRACT_REF_NO = M.CONTRACT_REF_NO AND
   M.BRANCH = GLOBAL.CURRENT_BRANCH AND
   NVL(PROCESSED,'N') = 'N' AND
   NVL(NOTC_SENT,'N') = 'N'
)
/