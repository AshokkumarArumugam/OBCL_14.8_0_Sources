CREATE OR REPLACE VIEW lfvw_fee_type (Component, Description, Rule)AS
/*
------------------------------------------------------------------------------------------
**
** This source is part of the Oracle Banking Software Product.
** Copyright (R) 2019 , Oracle and/or its affiliates.  All rights reserved
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
**    Changed By       : Divya J
**    Changed On       : 05-Nov-2018
**    Changed Reason   : Bug#28864512 - Modified the Datasource lftms_rule with new rule availability table
------------------------------------------------------------------------------------------------------------
*/
SELECT a.*,'M' as RULE  FROM (select fee_component as "Component",description
from lftms_fee_definition
where auth_stat = 'A'
and record_stat ='O') a
UNION ALL
SELECT b.*, 'F' as RULE FROM
(select rule_id as "COMPONENT",description
from LFTB_ICCF_RLAVL
where
rule_type = 'H') b
/
create or replace synonym lfvws_fee_type for lfvw_fee_type
/