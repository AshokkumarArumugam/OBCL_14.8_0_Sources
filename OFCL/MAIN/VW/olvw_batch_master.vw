CREATE OR REPLACE FORCE VIEW olvw_batch_master
AS
/*
----------------------------------------------------------------------------------------------------
**
** File Name    : olvw_batch_master.vw
** Module       : LD
**
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
**
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(select
BRANCH_CODE         BRANCH_CODE,
BATCH_NO            BATCH_NO,
DESCRIPTION         DESCRIPTION,
TYPE                TYPE,
LAST_OPER_ID        LAST_OPER_ID,
LAST_AUTH_ID        LAST_AUTH_ID,
LAST_OPER_DT_STAMP  LAST_OPER_DT_STAMP,
LAST_AUTH_DT_STAMP  LAST_AUTH_DT_STAMP,
LOCKED              LOCKED,
CURR_NO             CURR_NO,
DR_CHK_TOTAL        DR_CHK_TOTAL,
CR_CHK_TOTAL        CR_CHK_TOTAL,
DR_ENT_TOTAL        DR_ENT_TOTAL,
CR_ENT_TOTAL        CR_ENT_TOTAL,
AUTH_STAT           AUTH_STAT,
UPLOADED            UPLOADED,
BALANCING           BALANCING,
SYSTEM_BATCH        SYSTEM_BATCH,
--POSITION_REQD       POSITION_REQD,
DELETE_STAT        DELETE_STAT
from OLTB_BATCH_MASTER
)
/
CREATE OR REPLACE SYNONYM olvws_batch_master FOR olvw_batch_master
/