CREATE OR REPLACE FORCE VIEW olvw_role_products AS
/*----------------------------------------------------------------------------------------------------
** This source is part of the Oracle Banking Corporate Lending  Software Product. 
** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
** No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
** in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
** or otherwise, translated in any language or computer language, without the prior written permission 
** of Oracle and/or its affiliates. 
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East), 
** Mumbai - 400 063, India.
--------------------------------------------------------------------------------------------------*/
SELECT a.role_id , b.product_code
--,a.products_allowed  --OFC12.3 changes commented
,'D' products_allowed  --OFC12.3 changes added
FROM   smtbs_role_master a, smtbs_role_products b
WHERE  a.role_id = b.role_id
/
CREATE OR REPLACE SYNONYM olvws_role_products FOR olvw_role_products 
/