CREATE OR REPLACE FORCE VIEW olvw_all_roll_contract_details(CONTRACT_REF_NO,INTEREST_LIQD_AMT,INTEREST_ROLL_AMT,PRINCIPAL_ADDL_AMT,PRINCIPAL_LIQD_AMT,PRINCIPAL_ROLL_AMT,ROLLOVER_AMOUNT,ROLLOVER_REF_NO,ROLL_ESN,SOURCE_CODE) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_roll_contract_details.VW
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
             ,interest_liqd_amt
             ,interest_roll_amt
             ,principal_addl_amt
             ,principal_liqd_amt
             ,principal_roll_amt
             ,rollover_amount
             ,rollover_ref_no
             ,roll_esn
             ,source_code
       FROM   oltbs_roll_contract_details)
      UNION
      (SELECT contract_ref_no
             ,interest_liqd_amt
             ,interest_roll_amt
             ,principal_addl_amt
             ,principal_liqd_amt
             ,principal_roll_amt
             ,rollover_amount
             ,rollover_ref_no
             ,roll_esn
             ,source_code
       FROM   olars_roll_contract_details)
      UNION
      (SELECT contract_ref_no
             ,interest_liqd_amt
             ,interest_roll_amt
             ,principal_addl_amt
             ,principal_liqd_amt
             ,principal_roll_amt
             ,rollover_amount
             ,rollover_ref_no
             ,roll_esn
             ,source_code
       FROM   olpts_roll_contract_details)
      UNION
      (SELECT contract_ref_no
             ,interest_liqd_amt
             ,interest_roll_amt
             ,principal_addl_amt
             ,principal_liqd_amt
             ,principal_roll_amt
             ,rollover_amount
             ,rollover_ref_no
             ,roll_esn
             ,source_code
       FROM   olpps_roll_contract_details)
/