CREATE OR REPLACE VIEW syvw_upload_master AS
/*-------------------------------------------------------------------------------------------------
**
** File Name	: syvw_upload_master.vw
**
** Module	: LOANS SYNDICATION
**
**This source is part of the Oracle Flexcube Corporate Lending  Software Product. 
**Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
**No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
**in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
**or otherwise, translated in any language or computer language, without the prior written permission 
**of Oracle and/or its affiliates. 
**Oracle Financial Services Software Limited.
**Oracle Park, Off Western Express Highway,
**Goregaon (East), 
**Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
SELECT
SOURCE_CODE            SOURCE_CODE,
UPLOAD_ID              UPLOAD_ID,
BRANCH                 BRANCH,
FUNCTION_ID            FUNCTION_ID,
ACTION_CODE            ACTION_CODE,
USER_ID                USER_ID,
UPLOAD_DATE            UPLOAD_DATE,
TO_BE_UPLOADED         TO_BE_UPLOADED,
UPLOADED               UPLOADED,
STATUS                 STATUS,
ERROR_CODE             ERROR_CODE,
''                     UPLOAD_STATUS
FROM
sytb_upload_master
/
create or replace synonym syvws_upload_master for syvw_upload_master
/