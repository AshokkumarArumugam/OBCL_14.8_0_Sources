CREATE OR REPLACE FORCE VIEW olvw_user_branch_stat ( USER_ID, 
BRANCH_CODE, EOTI_DESC, TODAY ) AS 
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_user_branch_stat.VW
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
SELECT A.USER_ID,A.BRANCH_CODE,
  DECODE(B.END_OF_INPUT,'N','Transaction Input','T','End of Transaction Input','F','End Of Financial Input','E','End of Day','B','Beginning of Day') eoti_desc,
  D.TODAY
  FROM SMVWS_USER_BRANCHES A, oltms_branch B,
  STTMS_DATES D
  WHERE B.BRANCH_CODE=A.BRANCH_CODE
  AND D.BRANCH_CODE = A.BRANCH_CODE
/
Create OR REPLACE Synonym olvws_user_branch_stat for olvw_user_branch_stat
/