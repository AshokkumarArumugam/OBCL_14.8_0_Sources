CREATE OR REPLACE FORCE VIEW lbvw_mssfpmbr AS
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
SELECT HANDOFF_STATUS,REFERENCE_NO,MESSAGE,EVENT_VALUE_DATE,DCN,NOTC_NAME,BRANCH_DATE,ACK_STATUS,BRANCH_CODE,MSG_STATUS,EVENT_CODE,ESN,CAST(NULL AS VARCHAR2(1000)) DCN_LIST
FROM OLTBS_FPML_MSG_OUT
/
create OR REPLACE synonym lbvws_mssfpmbr for lbvw_mssfpmbr
/