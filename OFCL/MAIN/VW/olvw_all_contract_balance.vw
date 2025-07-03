CREATE OR REPLACE FORCE VIEW olvw_all_contract_balance(CONTRACT_REF_NO,CURRENT_FACE_VALUE,PRINCIPAL_OUTSTANDING_BAL,RESERVE_AMT,TOTAL_PROJECTED_INTEREST) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_contract_balance.VW
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
             ,current_face_value
             ,principal_outstanding_bal
             ,reserve_amt
             ,total_projected_interest
       FROM   oltbs_contract_balance)
      UNION
      (SELECT contract_ref_no
             ,current_face_value
             ,principal_outstanding_bal
             ,reserve_amt
             ,total_projected_interest
       FROM   olars_contract_balance)
      UNION
      (SELECT contract_ref_no
             ,current_face_value
             ,principal_outstanding_bal
             ,reserve_amt
             ,total_projected_interest
       FROM   olpts_contract_balance)
      UNION
      (SELECT contract_ref_no
             ,current_face_value
             ,principal_outstanding_bal
             ,reserve_amt
             ,total_projected_interest
       FROM   olpps_contract_balance)
/
create or replace synonym olvws_all_contract_balance for olvw_all_contract_balance
/