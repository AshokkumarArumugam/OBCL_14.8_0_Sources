CREATE OR REPLACE VIEW covw_eca_queue AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle Banking Software Product.
** Copyright ©  2012 - 2013  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.

  Changed By         : Sowmya Bitra
  Changed On         : 26-April-2022
  Search String      : Bug#34094723_Changes
  Change Reason      : Changes to view processed ECA records also in PISECAQU screen
  
------------------------------------------------------------------------------------------
*/
SELECT
A.CONTRACT_REF_NO,
B.EVENT_CODE ,
A.PROCESS_REF_NO,
A.HOST_CODE,
A.BRANCH_CODE , 
B.BLOCK_NO ,
B.EXT_CUSTAC_NO,
B.CCY ,
B.AMOUNT_REQUESTED ,
A.MODULE,
A.CUSTOMER_NO ,
B.STATUS ,
A.REQ_DATE ,
B.REMARKS,
A.ECA_SYSTEM_CODE,
A.DESTINATION_SOURCE ,
A.SERVICE_CODE 
FROM OLTBS_ECA_REQ_MASTER A,OLTBS_ECA_REQ_DETAIL B
WHERE A.PROCESS_REF_NO = B.PROCESS_REF_NO
--Bug#34094723_Changes Start
UNION
SELECT
C.CONTRACT_REF_NO,
D.EVENT_CODE ,
C.PROCESS_REF_NO,
C.HOST_CODE,
C.BRANCH_CODE ,
D.BLOCK_NO ,
D.EXT_CUSTAC_NO,
D.CCY ,
D.AMOUNT_REQUESTED ,
C.MODULE,
C.CUSTOMER_NO ,
D.STATUS ,
C.REQ_DATE ,
D.REMARKS,
C.ECA_SYSTEM_CODE,
C.DESTINATION_SOURCE ,
C.SERVICE_CODE
FROM OLTBS_ECA_REQ_MASTER_HIST C,OLTBS_ECA_REQ_DETAIL_HIST D
WHERE C.PROCESS_REF_NO = D.PROCESS_REF_NO
--Bug#34094723_Changes End
/
CREATE OR REPLACE SYNONYM covws_eca_queue FOR covw_eca_queue
/