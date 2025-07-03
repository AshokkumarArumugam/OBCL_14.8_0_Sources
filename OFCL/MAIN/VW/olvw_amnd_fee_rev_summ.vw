CREATE OR REPLACE VIEW OLVW_AMND_FEE_REV_SUMM AS
/*----------------------------------------------------------------------------------------------------
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
----------------------------------------------------------------------------------------------------
 */
(
  SELECT  distinct(a.contract_ref_no),

    b.auth_status,
    b.CONTRACT_STATUS,
    b.branch,
    b.module_code as module
  FROM
        LFTWS_CONTRACT_FEE a,
        oltbs_contract b

        WHERE  a.contract_ref_no=b.contract_ref_no
        AND b.module_code IN('OL','LB','FC')
        AND b.branch=global.current_branch
)
/
CREATE OR REPLACE SYNONYM OLVWS_AMND_FEE_REV_SUMM FOR OLVW_AMND_FEE_REV_SUMM
/