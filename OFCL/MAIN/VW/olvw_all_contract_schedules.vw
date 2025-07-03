CREATE OR REPLACE FORCE VIEW olvw_all_contract_schedules(AMOUNT,BASE_INDEX_RATE,COMPONENT,CONTRACT_REF_NO,EVENT_SEQ_NO,FREQUENCY,FREQUENCY_UNIT,LCY_EQVT_FOR_INDEX_LOANS,NO_OF_SCHEDULES,RESET_TENOR,SCHEDULE_TYPE,START_DATE,VERSION_NO) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_contract_schedules.VW
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
             ,base_index_rate
             ,component
             ,contract_ref_no
             ,event_seq_no
             ,frequency
             ,frequency_unit
             ,lcy_eqvt_for_index_loans
             ,no_of_schedules
             ,reset_tenor
             ,schedule_type
             ,start_date
             ,version_no
       FROM   oltbs_contract_schedules)
      UNION
      (SELECT amount
             ,base_index_rate
             ,component
             ,contract_ref_no
             ,event_seq_no
             ,frequency
             ,frequency_unit
             ,lcy_eqvt_for_index_loans
             ,no_of_schedules
             ,reset_tenor
             ,schedule_type
             ,start_date
             ,version_no
       FROM   olars_contract_schedules)
      UNION
      (SELECT amount
             ,base_index_rate
             ,component
             ,contract_ref_no
             ,event_seq_no
             ,frequency
             ,frequency_unit
             ,lcy_eqvt_for_index_loans
             ,no_of_schedules
             ,reset_tenor
             ,schedule_type
             ,start_date
             ,version_no
       FROM   olpts_contract_schedules)
      UNION
      (SELECT amount
             ,base_index_rate
             ,component
             ,contract_ref_no
             ,event_seq_no
             ,frequency
             ,frequency_unit
             ,lcy_eqvt_for_index_loans
             ,no_of_schedules
             ,reset_tenor
             ,schedule_type
             ,start_date
             ,version_no
       FROM   olpps_contract_schedules)
/