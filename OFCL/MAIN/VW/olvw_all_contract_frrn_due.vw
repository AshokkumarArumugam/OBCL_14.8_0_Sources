CREATE OR REPLACE FORCE VIEW olvw_all_contract_frrn_due(BRANCH,COMPONENT,CONTRACT_REF_NO,CURRENCY,EFF_DATE,RATE_CODE) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_contract_frrn_due.VW
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(SELECT branch
             ,component
             ,contract_ref_no
             ,currency
             ,eff_date
             ,rate_code
       FROM   oltbs_contract_frrn_due)
      UNION
      (SELECT branch
             ,component
             ,contract_ref_no
             ,currency
             ,eff_date
             ,rate_code
       FROM   olars_contract_frrn_due)
      UNION
      (SELECT branch
             ,component
             ,contract_ref_no
             ,currency
             ,eff_date
             ,rate_code
       FROM   olpts_contract_frrn_due)
      UNION
      (SELECT branch
             ,component
             ,contract_ref_no
             ,currency
             ,eff_date
             ,rate_code
       FROM   olpps_contract_frrn_due)
/