CREATE OR REPLACE VIEW smvw_brn_user_dept(USER_ID,DEPARTMENT_CODE,DEPARTMENT_DESCRIPTION,BRANCH_CODE)
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : smvw_brn_user_dept.VW
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
/*
CHANGE HISTORY
28-FEB-2003 Fcc4.2 April 2003 related changes..This view has been rewritten as the User department maintenance is now a 	    seperate table not master detail...
30-OCT-2004 FCC4.6.1 JAN 2005 Retro Changes for JPYCITI TIL# INT-183 - When Department restriction is maintained change department does not show any records - changed the oltms_branch_departments to Smvws_branch_department
19-JAN-2005 FCC 4.6.1 JAN 2005 ITR-1 SFR-196 For changing copyright clause / release name
*/
Select A.User_id,
       A.Department_code,
       A.Department_Description,
       B.Branch_code
From  Smvws_user_departments A	--FCC4.6.1 JAN 2005 Retro Changes for JPYCITI TIL# INT-183
      --,oltms_branch_departments B  --FCC4.6.1 JAN 2005 Retro Changes for JPYCITI TIL# INT-183
      ,Smvws_branch_departments B
      ,Smvws_user_branches C
Where A.Department_code = B.Department_code
And   B.Branch_code 	= C.Branch_code
And   A.User_id	  	= C.User_id
/
CREATE OR REPLACE SYNONYM SMVWS_BRN_USER_DEPT FOR smvw_brn_user_dept
/