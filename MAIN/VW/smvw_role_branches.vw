CREATE OR REPLACE FORCE VIEW SMVW_ROLE_BRANCHES ( ROLE_ID, 
BRANCH ) AS 
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
select a.role_id , b.branch  from
smtbs_role_master a, smtbs_role_branches b
where a.role_id = b.role_id
and a.branches_allowed = 'D'
minus
select a.role_id ,b.branch from
smtbs_role_master a, smtbs_role_branches b
where a.branches_allowed = 'D' and a.role_id = b.role_id
union
select a.role_id ,b.branch from
smtbs_role_master a, smtbs_role_branches b
where a.branches_allowed = 'A' and a.role_id = b.role_id
union
select a.role_id , b.branch_code from
smtbs_role_master a , sttms_core_branch b
where a.role_id not in (select role_id from smtbs_role_branches )
/
CREATE OR REPLACE SYNONYM SMVWS_ROLE_BRANCHES FOR SMVW_ROLE_BRANCHES 
/
