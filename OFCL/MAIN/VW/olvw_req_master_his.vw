CREATE OR REPLACE VIEW OLVW_REQ_MASTER_HIS AS
/*
----------------------------------------------------------------------------------------------------
**
** File Name    : OLVW_REQ_MASTER_HIS.VW
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
       SRM.SEQ_NO,
       SRM.REFERENCE_NO,
       DECODE(SRM.PROCESS_STATUS,'A','Approved','R','Rejected','U','Unprocessed','P','Processed','W','In Progress') as PROCESS_STATUS,
       DECODE(SRM.NEW_PROCESS_STATUS,'A','Approved','R','Rejected','U','Unprocessed','P','Processed','W','In Progress') as NEW_PROCESS_STATUS,
       SRM.LOG_TIME,
       SRM.AUTH_STAT,
       SRM.MAKER_ID,
       SRM.MAKER_DT_STAMP,
       SRM.CHECKER_ID,
       SRM.CHECKER_DT_STAMP
  FROM OLTB_REQ_MASTER_HIST SRM
/
CREATE OR REPLACE SYNONYM OLVWS_REQ_MASTER_HIS FOR OLVW_REQ_MASTER_HIS
/