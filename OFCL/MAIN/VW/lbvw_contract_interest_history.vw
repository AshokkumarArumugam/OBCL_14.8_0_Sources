CREATE OR REPLACE VIEW LBVW_CONTRACT_INTEREST_HISTORY AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : lbvw_contract_interest_history.vw
**
** Module       : LB
  This source is part of the Oracle Banking Corporate Lending  Software Product.
  Copyright © 2007 - 2020  Oracle and/or its affiliates.  All rights reserved.
  No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
**
  Oracle Financial Services Software Limited.
  Oracle Park, Off Western Express Highway,
  Goregaon (East),
  Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
CHANGE HISTORY
    Created By         :Arunadevi Rajendran
    Created On         :20-JULY-2022
-----------------------------------------------------------------------------------------------
*/
SELECT contract_ref_no,
       component,
       value_date,
       rate_type,
       fixed_rate_type,
       rate_code_usage,
       rate_code,
       borrow_lend_ind,
       base_rate,
       spread,
       margin,
       final_rate,
       adjustment_rate,
       rate_basis
    FROM (SELECT ICCF.*,
               LAG(ICCF_KEY) OVER(PARTITION BY CONTRACT_REF_NO, COMPONENT ORDER BY VALUE_DATE) PREV_ICCF_KEY
          FROM (
                  SELECT A.*,
                       CONTRACT_REF_NO || '~' || COMPONENT || '~' || RATE_TYPE || '~' ||
                       RATE_CODE_USAGE || '~' || RATE_CODE || '~' || BORROW_LEND_IND || '~' ||
                       BASE_RATE || '~' || SPREAD || '~' || FINAL_RATE ICCF_KEY
                  FROM (
SELECT contract_ref_no,
       component,
       value_date,
       rate_type,
       fixed_rate_type,
       rate_code_usage,
       rate_code,
       borrow_lend_ind,
       base_rate,
       spread,
       margin,
       final_rate,
       adjustment_rate,
       rate_basis
  FROM lftb_contract_interest_detail A
  ) A) ICCF)
 WHERE ICCF_KEY <> nvl(PREV_ICCF_KEY,
                       'X')
 ORDER BY 1, 2, 3, 4, 5
/
CREATE OR REPLACE SYNONYM lbvws_contract_interest_history FOR lbvw_contract_interest_history
/