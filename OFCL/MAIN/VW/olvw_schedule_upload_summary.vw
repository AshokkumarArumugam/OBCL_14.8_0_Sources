CREATE OR REPLACE FORCE VIEW OLVW_SCHEDULE_UPLOAD_SUMMARY (
  REFERENCE_NO,
  FILE_NAME,
  MAKER_ID,
  MAKER_DT_STAMP,
  CHECKER_ID,
  CHECKER_DT_STAMP,
  AUTH_STAT,
  RECORD_STAT,
  ONCE_AUTH,
  MOD_NO
) AS
/*
-----------------------------------------------------------------------------------------------
**
** File Name    : OLVW_SCHEDULE_UPLOAD_SUMMARY.VW
**
** Module       : OL									
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
-----------------------------------------------------------------------------------------------
*/
  SELECT REFERENCE_NO,
         FILE_NAME,
         MAKER_ID,
         MAKER_DT_STAMP,
         CHECKER_ID,
         CHECKER_DT_STAMP,
         AUTH_STAT,
         RECORD_STAT,
         ONCE_AUTH,
         MOD_NO
  FROM OLtb_schedule_upload_master
/
CREATE OR REPLACE SYNONYM OLVWS_SCHEDULE_UPLOAD_SUMMARY FOR OLVW_SCHEDULE_UPLOAD_SUMMARY
/