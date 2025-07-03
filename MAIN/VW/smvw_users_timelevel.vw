CREATE OR REPLACE FORCE VIEW SMVW_USERS_TIMELEVEL ( HOME_BRANCH, 
USER_ID, TERMINAL, TIME_LEVEL, MAKER_ID, MAKER_DT_STAMP, CHECKER_ID, CHECKER_DT_STAMP, MOD_NO, ONCE_AUTH, AUTH_STAT, RECORD_STAT ) AS 
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product
** Copyright © null Oracle and/or its affiliates.  All rights reserved.
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
------------------------------------------------------------------------------------------
*/
/*
-----------------------------------------------------------------------------------------*/
SELECT
       SMTBS_USER.HOME_BRANCH
     , SMTBS_CURRENT_USERS.USER_ID
     , SMTBS_CURRENT_USERS.TERMINAL
     , SMTBS_USER.TIME_LEVEL
     , SMTBS_USER.MAKER_ID
     , SMTBS_USER.MAKER_DT_STAMP
     , SMTBS_USER.CHECKER_ID
     , SMTBS_USER.CHECKER_DT_STAMP
     , SMTBS_USER.MOD_NO
     , SMTBS_USER.ONCE_AUTH
     , SMTBS_USER.AUTH_STAT
     , SMTBS_USER.RECORD_STAT
 FROM  SMTBS_CURRENT_USERS , SMTBS_USER
  WHERE  SMTBS_CURRENT_USERS.USER_ID = SMTBS_USER.USER_ID
/

DROP SYNONYM SMVWS_USERS_TIMELEVEL 
/
CREATE SYNONYM SMVWS_USERS_TIMELEVEL  FOR SMVW_USERS_TIMELEVEL 
/
