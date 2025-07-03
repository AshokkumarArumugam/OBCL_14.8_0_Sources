CREATE OR REPLACE FORCE VIEW lbvw_prjobrn AS
/*----------------------------------------------------------------------------------------------------
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
SELECT PROCESS_DESCRIPTION,BRANCH,MODULE,PROCESS_SEQ,PROCESS_FREQ,JOB_NO,JOB,STATUS,PROCESS,CAST(NULL AS VARCHAR2(1000)) BRN_LST,CAST(NULL AS VARCHAR2(1000)) SEQ_LST,
CAST(NULL AS VARCHAR2(1000)) PR_LST
FROM OLTBS_OPS_PROCESS_STATUS
/
create OR REPLACE synonym LBVWS_PRJOBRN for lbvw_prjobrn
/