CREATE OR REPLACE FORCE VIEW olvw_pending_items_mi ( BR, 
MD, RN, MT, EV, 
ID ) AS 
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_pending_items_mi.VW
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
(
SELECT distinct
branch_code br,
'OL' md,
adj_ref_no1 rn,
'' mt,
'' ev,
maker_id id
FROM oltbs_adj
WHERE auth_stat='U' )
/
CREATE OR REPLACE SYNONYM olvws_pending_items_mi FOR olvw_pending_items_mi
/