CREATE OR REPLACE FORCE VIEW olvw_all_accrual_for_limits(CONTRACT_REF_NO,EVENT_SEQ_NO,TOTAL_CURRENT_NET_ACCRUAL) AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_accrual_for_limits.VW
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
             ,event_seq_no
             ,total_current_net_accrual
       FROM   oltbs_accrual_for_limits)
      UNION
      (SELECT contract_ref_no
             ,event_seq_no
             ,total_current_net_accrual
       FROM   olars_accrual_for_limits)
      UNION
      (SELECT contract_ref_no
             ,event_seq_no
             ,total_current_net_accrual
       FROM   olpts_accrual_for_limits)
      UNION
      (SELECT contract_ref_no
             ,event_seq_no
             ,total_current_net_accrual
       FROM   olpps_accrual_for_limits)
/