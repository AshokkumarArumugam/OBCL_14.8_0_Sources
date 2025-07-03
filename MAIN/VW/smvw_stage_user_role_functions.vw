CREATE OR REPLACE FORCE VIEW SMVW_STAGE_USER_ROLE_FUNCTIONS AS
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
/*
History
**
**Modified By       : Radha R
**Modified On       : 09-09-2011
**Modified Reason   : 9NT1466 FCUBS 11.3.1 Additonal item - Centralisation Role Change(SMVWS_CONSOLIDATED_USERROLE instead of smtb_user_role)
----------------------------------------------------------------------------------------------------
*/
SELECT A.USER_ID
     , A.FUNCTION_ID
     , B.USER_LANGUAGE
     , A.BRANCH_CODE
 FROM smtb_user_stage_functions A , SMTBS_USER  B
  WHERE   A.USER_ID = B.USER_ID
  AND A.AUTH_STAT = 'A'
  UNION
  SELECT  /*DISTINCT*/ A.USER_ID , B.ROLE_FUNCTION , C.USER_LANGUAGE , A.BRANCH_CODE
  FROM /*SMTBS_USER_ROLE */SMVWS_CONSOLIDATED_USERROLE A , Smtb_Role_Stage_Details B , SMTBS_USER C
  WHERE   A.ROLE_ID = B.ROLE_ID
  AND A.USER_ID = C.USER_ID
  AND B.AUTH_STAT = 'A' AND A.AUTH_STAT='A'
  and not exists ( select '1' from smtbs_user_func_disallow d where
  d.user_id=a.user_id and d.function_id=b.role_function)
/
Create or replace Synonym SMVWS_STAGE_USER_ROLE_FUNCTIONS  for SMVW_STAGE_USER_ROLE_FUNCTIONS 
/