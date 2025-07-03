CREATE OR REPLACE FORCE VIEW olvw_all_contract_drawdown(CONTRACT_REF_NO,CURRENT_INTEREST_VALUE,ORIGNAL_INTEREST_VALUE) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_contract_drawdown.VW
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
             ,current_interest_value
             ,orignal_interest_value
       FROM   oltbs_contract_drawdown)
      UNION
      (SELECT contract_ref_no
             ,current_interest_value
             ,orignal_interest_value
       FROM   olars_contract_drawdown)
      UNION
      (SELECT contract_ref_no
             ,current_interest_value
             ,orignal_interest_value
       FROM   olpts_contract_drawdown)
      UNION
      (SELECT contract_ref_no
             ,current_interest_value
             ,orignal_interest_value
       FROM   olpps_contract_drawdown)
/