CREATE OR REPLACE VIEW smvw_user_central_roles AS
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
---------------------------------------------------------------------------------------------
*/
select a.role_id, a.user_id, a.auth_stat,b.branch_code
from smtb_user_central_roles a, smvw_user_branches b
where a.user_id =b.user_id 
/
create or replace synonym smvws_user_central_roles for smvw_user_central_roles 
/