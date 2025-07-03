CREATE OR REPLACE FORCE VIEW olvw_all_contract_init_due(CONTRACT_REF_NO,VALUE_DATE) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_contract_init_due.VW
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(SELECT contract_ref_no
             ,value_date
       FROM   oltbs_contract_init_due)
      UNION
      (SELECT contract_ref_no
             ,value_date
       FROM   olars_contract_init_due)
      UNION
      (SELECT contract_ref_no
             ,value_date
       FROM   olpts_contract_init_due)
      UNION
      (SELECT contract_ref_no
             ,value_date
       FROM   olpps_contract_init_due)
/