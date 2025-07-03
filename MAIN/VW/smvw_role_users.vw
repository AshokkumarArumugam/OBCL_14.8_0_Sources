CREATE OR REPLACE FORCE VIEW SMVW_ROLE_USERS ( HOME_BRANCH, 
USER_ID, ROLE_ID,branch_code ) AS 
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
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
------------------------------------------------------------------------------------------
*/
SELECT
     smtbs_user.home_branch , SMVWS_CONSOLIDATED_USERROLE.user_id ,
     SMVWS_CONSOLIDATED_USERROLE.role_id,SMVWS_CONSOLIDATED_USERROLE.branch_code
FROM SMTBS_USER , SMVWS_CONSOLIDATED_USERROLE 
WHERE SMTBS_USER.USER_ID = SMVWS_CONSOLIDATED_USERROLE.USER_ID
/
CREATE OR REPLACE SYNONYM SMVWS_ROLE_USERS  FOR SMVW_ROLE_USERS
/