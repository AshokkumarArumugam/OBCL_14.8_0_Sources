CREATE OR REPLACE FORCE VIEW olvw_users_timelevel ( HOME_BRANCH, 
USER_ID, TERMINAL, TIME_LEVEL ) AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_users_timelevel.VW
**
** Module       : SECURITY MAINTENANCE											
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
-----------------------------------------------------------------------------------------------
*/
 SELECT
       SMTBS_USER.HOME_BRANCH
     , SMTBS_CURRENT_USERS.USER_ID
     , SMTBS_CURRENT_USERS.TERMINAL
     , SMTBS_USER.TIME_LEVEL
 FROM  SMTBS_CURRENT_USERS , SMTBS_USER
  WHERE  SMTBS_CURRENT_USERS.USER_ID = SMTBS_USER.USER_ID
/
Create OR REPLACE Synonym olvws_users_timelevel For olvw_users_timelevel
/