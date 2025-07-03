CREATE OR REPLACE FORCE VIEW olvw_role_users ( HOME_BRANCH, 
USER_ID, ROLE_ID,branch_code ) AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_role_users.VW
**
** Module       : SECURITY MAINTENANCE											
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
-- CITIPLC Added branch code to this view
 SELECT
     smtbs_user.home_branch , smtbs_user_role.user_id ,
     smtbs_user_role.role_id,smtbs_user_role.branch_code
FROM SMTBS_USER , SMTBS_USER_ROLE
WHERE SMTBS_USER.USER_ID = SMTBS_USER_ROLE.USER_ID
/
Create OR REPLACE Synonym olvws_role_users for olvw_role_users
/