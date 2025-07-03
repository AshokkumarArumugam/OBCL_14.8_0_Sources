CREATE OR REPLACE VIEW STVW_CORE_RETRY_REQ_DTL AS
/*------------------------------------------------------------------------------------------
     **
     ** File Name  : STVW_CORE_RETRY_REQ_DTL.vw
     **
     ** Module     : ST
     **
     ** This source is part of the Oracle FLEXCUBE Software Product.
     ** Copyright (R) 2021 , Oracle and/or its affiliates.  All rights reserved
     **
     **
     ** No part of this work may be reproduced, stored in a retrieval system, adopted
     ** or transmitted in any form or by any means, electronic, mechanical,
     ** photographic, graphic, optic recording or otherwise, translated in any
     ** language or computer language, without the prior written permission of
     ** Oracle and/or its affiliates.
     **
     ** Oracle Financial Services Software Limited.
     ** Oracle Park, Off Western Express Highway,
     ** Goregaon (East),
     ** Mumbai - 400 063, India
     ** India
----------------------------------------------------------------------------------------------------
*/
SELECT ERQ.MSGID,
       ERQ.PROCESS_SEQ_NO,
       ERQ.DESTINATION_SYSTEM,
       ERQ.SERVICE_CODE,
       REPLACE(reverse(SUBSTR(REVERSE(ERQ.KEYID),1,INSTR(REVERSE(ERQ.KEYID),'~',2)-1)),'~','')KEYID,
       DECODE(ERQ.COMM_MODE,'A','Asynchronous','S','Synchronous')as COMM_MODE,
       ERQ.REQ_TYPE,
       ERQ.BRANCH_CODE,
       nvl(ERQ.FORCEPROCESS,'N') as FORCEPROCESS,
       DECODE(ERQ.PROCESS_STATUS,'A','Approved','R','Rejected','U','Unprocessed','P','Processed','W','In Progress') as PROCESS_STATUS,
       ERQ.LOG_TIME,
       ERQ.AUTH_STAT,
       ERQ.MAKER_ID,
       ERQ.MAKER_DT_STAMP,
       ERQ.CHECKER_ID,
       ERQ.CHECKER_DT_STAMP,
       ERQ.FUNCTION_ID,
       DECODE(ERQ.EXT_STATUS,'T','TimedOut','E',DECODE(ERQ.PROCESS_STATUS,'R','Reject','Failed'),'U','Unprocessed','P','Processed','R','Reject','D','Deferred') as EXT_STATUS,
       ERQ.SOURCE_SEQ_NO,
	   cast('' as VARCHAR2(4000)) REQ_LIST
  FROM STTB_CORE_REQ_MASTER ERQ
  WHERE EXT_STATUS NOT IN ('P','X')
  AND DESTINATION_SYSTEM = 'PLATOCORE'
/
CREATE OR REPLACE SYNONYM STVWS_CORE_RETRY_REQ_DTL FOR STVW_CORE_RETRY_REQ_DTL
/

