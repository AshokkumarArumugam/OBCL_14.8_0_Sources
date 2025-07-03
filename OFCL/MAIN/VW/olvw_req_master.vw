CREATE OR REPLACE VIEW OLVW_REQ_MASTER AS
/*
----------------------------------------------------------------------------------------------------
**
** File Name    : OLVW_REQ_MASTER.VW
** Module       : OL
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
Created by : Krithika G
Created Date : 5-NOV-2017
*/
SELECT SRM.MSGID,
       SRM.PROCESS_SEQ_NO,
       SRM.DESTINATION_SOURCE,
       SRM.SERVICE_CODE,
       --SRM.KEYID,
     replace(SRM.KEYID,'~',';') KEYID,
       DECODE(SRM.COMM_MODE,'A','Asynchronous','S','Synchronous')as COMM_MODE,
       SRM.REQ_TYPE,
       SRM.USER_REF_NO,
       SRM.TRN_BRN,
       nvl(SRM.FORCEPROCESS,'N') as FORCEPROCESS,
       SRM.SIMULATION,
       DECODE(SRM.PROCESS_STATUS,'A','Approved','R','Rejected','U','Unprocessed','P','Processed','W','In Progress') as PROCESS_STATUS,
       L.LOG_TIME,
       SRM.AUTH_STAT,
       SRM.MAKER_ID,
       SRM.MAKER_DT_STAMP,
       SRM.CHECKER_ID,
       SRM.CHECKER_DT_STAMP,
     --  SRM.FUNCTION_ID,
      DECODE(L.EXT_STATUS,'T','TimedOut','E','Failed','U','Unprocessed','P','Processed','D','Deferred') as EXT_STATUS,
     --  SRM.CUSTOMER_NO,
     cast('' as VARCHAR2(4000)) REQ_LIST
  FROM OLTB_REQ_MASTER SRM,OLTB_SERVICE_LOG L
  WHERE SRM.MSGID=L.MSGID
  AND SRM.PROCESS_SEQ_NO=L.SEQ_NO
/
CREATE OR REPLACE SYNONYM OLVWS_REQ_MASTER FOR OLVW_REQ_MASTER
/