CREATE OR REPLACE FORCE VIEW olvw_generated_reports ( FUNCTION_ID, 
MSG_TYPE, REPORT_ID, SPOOL, GENERATED_DATE, 
BRANCH_ID, USER_ID, ONCE_PRINTED, FORM_ID, 
EOC_GROUP ) AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_generated_reports.VW
**
** Module       : CORE ENTITIES										**
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
SELECT
       R.FUNCTION_ID,
      R.MSG_TYPE,
      REPORT_ID,
      SPOOL,
      GENERATED_DATE,
      BRANCH_ID,
      USER_ID,
      ONCE_PRINTED,
      F.FORM_ID,
      R.EOC_GROUP FROM oltbs_report R, oltms_repo_form F
	  WHERE R.FUNCTION_ID = F.FUNCTION_ID

/
CREATE OR REPLACE SYNONYM olvws_generated_reports FOR olvw_generated_reports
/