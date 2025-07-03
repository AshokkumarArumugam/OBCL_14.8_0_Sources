CREATE OR REPLACE FORCE VIEW olvw_all_computation_handoff(AMOUNT,COMPONENT,CONTRACT_REF_NO,EFFECTIVE_DATE,RATE,RATE_SIGN) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_computation_handoff.VW
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(SELECT amount
             ,component
             ,contract_ref_no
             ,effective_date
             ,rate
             ,rate_sign
       FROM   oltbs_computation_handoff)
      UNION
      (SELECT amount
             ,component
             ,contract_ref_no
             ,effective_date
             ,rate
             ,rate_sign
       FROM   olars_computation_handoff)
      UNION
      (SELECT amount
             ,component
             ,contract_ref_no
             ,effective_date
             ,rate
             ,rate_sign
       FROM   olpts_computation_handoff)
      UNION
      (SELECT amount
             ,component
             ,contract_ref_no
             ,effective_date
             ,rate
             ,rate_sign
       FROM   olpps_computation_handoff)
/