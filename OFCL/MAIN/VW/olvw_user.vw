CREATE OR REPLACE FORCE VIEW olvw_user AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle Banking Software Product.
** Copyright © 2017  Oracle and/or its affiliates.  All rights reserved.
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
SELECT
         S1.USER_ID  as USERID,
         S1.USER_PASSWORD  as USERPWD,
         S1.HOME_BRANCH as HOMEBRN,
	 S1.MAKER_ID	as MAKRID,
         S2.DCN as DCN ,
         S1.HOME_BRANCH  as OTRBN
    FROM
         SMTB_USER S1,
         OLTB_DLY_MSG_IN S2
/
create or replace synonym OLVWS_USER FOR olvw_user
/