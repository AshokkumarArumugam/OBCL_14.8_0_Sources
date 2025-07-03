CREATE OR REPLACE FORCE VIEW olvw_all_inst_schedules(BASIS_AMOUNT,CALCULATED_AMOUNT,CALC_METHOD,CCY,COMPONENT,CONTRACT_REF_NO,END_DATE,NO_OF_DAYS,PROCESS_STATUS,RATE,RATE_SIGN,SCHEDULE_LINKAGE,START_DATE) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_inst_schedules.VW
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(SELECT basis_amount
             ,calculated_amount
             ,calc_method
             ,ccy
             ,component
             ,contract_ref_no
             ,end_date
             ,no_of_days
             ,process_status
             ,rate
             ,rate_sign
             ,schedule_linkage
             ,start_date
       FROM   oltbs_inst_schedules)
      UNION
      (SELECT basis_amount
             ,calculated_amount
             ,calc_method
             ,ccy
             ,component
             ,contract_ref_no
             ,end_date
             ,no_of_days
             ,process_status
             ,rate
             ,rate_sign
             ,schedule_linkage
             ,start_date
       FROM   olars_inst_schedules)
      UNION
      (SELECT basis_amount
             ,calculated_amount
             ,calc_method
             ,ccy
             ,component
             ,contract_ref_no
             ,end_date
             ,no_of_days
             ,process_status
             ,rate
             ,rate_sign
             ,schedule_linkage
             ,start_date
       FROM   olpts_inst_schedules)
      UNION
      (SELECT basis_amount
             ,calculated_amount
             ,calc_method
             ,ccy
             ,component
             ,contract_ref_no
             ,end_date
             ,no_of_days
             ,process_status
             ,rate
             ,rate_sign
             ,schedule_linkage
             ,start_date
       FROM   olpps_inst_schedules)
/