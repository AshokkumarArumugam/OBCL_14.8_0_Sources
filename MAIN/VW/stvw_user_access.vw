CREATE OR REPLACE VIEW STVW_USER_ACCESS AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2017 - 2018  Oracle and/or its affiliates.  All rights reserved.
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
------------------------------------------------------------------------------------------*/
SELECT a.user_id
      , b.access_group
FROM   smtbs_user    a
      , sttm_access_group b
WHERE a.access_group_allowed = 'D' AND b.auth_stat = 'A'
and not exists (select 1 from smtbs_user_access_group c where a.user_id = c.user_id and c.access_group = b.access_group )
UNION ALL
SELECT a.user_id
      , c.access_group
FROM   smtbs_user          a
      , smtbs_user_access_group   b
      , sttm_access_group       c
WHERE a.access_group_allowed = 'A' AND b.user_id = a.user_id AND c.access_group = b.access_group AND c.auth_stat = 'A'
/
Create or replace synonym STVWS_USER_ACCESS for STVW_USER_ACCESS
/