CREATE OR REPLACE FORCE VIEW olvw_all_reversal_iccf_details(ACCRUAL_REQUIRED,COMPONENT,COMPONENT_CURRENCY,CONTRACT_REF_NO,CURRENT_MEMO_ACCRUAL,CURRENT_NET_ACCRUAL,CURR_MONTH_ACCR,CURR_MONTH_LIQD,CURR_YEAR_ACCR,CURR_YEAR_LIQD,LAST_LIQUIDATION_DATE,LATEST_LIQUIDATED_SCHEDULE,PAYMENT_METHOD,PREVIOUS_ACCRUAL_REF_NO,PREVIOUS_ACCRUAL_TO_DATE,PREV_YEAR_ACCR,PREV_YEAR_LIQD,TILL_DATE_ACCRUAL,TOTAL_AMOUNT_LIQUIDATED,TOT_CONT_INT,UID_AMOUNT) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_reversal_iccf_details.VW
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(SELECT accrual_required
             ,component
             ,component_currency
             ,contract_ref_no
             ,current_memo_accrual
             ,current_net_accrual
             ,curr_month_accr
             ,curr_month_liqd
             ,curr_year_accr
             ,curr_year_liqd
             ,last_liquidation_date
             ,latest_liquidated_schedule
             ,payment_method
             ,previous_accrual_ref_no
             ,previous_accrual_to_date
             ,prev_year_accr
             ,prev_year_liqd
             ,till_date_accrual
             ,total_amount_liquidated
             ,tot_cont_int
             ,uid_amount
       FROM   oltbs_reversal_iccf_details)
      UNION
      (SELECT accrual_required
             ,component
             ,component_currency
             ,contract_ref_no
             ,current_memo_accrual
             ,current_net_accrual
             ,curr_month_accr
             ,curr_month_liqd
             ,curr_year_accr
             ,curr_year_liqd
             ,last_liquidation_date
             ,latest_liquidated_schedule
             ,payment_method
             ,previous_accrual_ref_no
             ,previous_accrual_to_date
             ,prev_year_accr
             ,prev_year_liqd
             ,till_date_accrual
             ,total_amount_liquidated
             ,tot_cont_int
             ,uid_amount
       FROM   olars_reversal_iccf_details)
      UNION
      (SELECT accrual_required
             ,component
             ,component_currency
             ,contract_ref_no
             ,current_memo_accrual
             ,current_net_accrual
             ,curr_month_accr
             ,curr_month_liqd
             ,curr_year_accr
             ,curr_year_liqd
             ,last_liquidation_date
             ,latest_liquidated_schedule
             ,payment_method
             ,previous_accrual_ref_no
             ,previous_accrual_to_date
             ,prev_year_accr
             ,prev_year_liqd
             ,till_date_accrual
             ,total_amount_liquidated
             ,tot_cont_int
             ,uid_amount
       FROM   olpts_reversal_iccf_details)
      UNION
      (SELECT accrual_required
             ,component
             ,component_currency
             ,contract_ref_no
             ,current_memo_accrual
             ,current_net_accrual
             ,curr_month_accr
             ,curr_month_liqd
             ,curr_year_accr
             ,curr_year_liqd
             ,last_liquidation_date
             ,latest_liquidated_schedule
             ,payment_method
             ,previous_accrual_ref_no
             ,previous_accrual_to_date
             ,prev_year_accr
             ,prev_year_liqd
             ,till_date_accrual
             ,total_amount_liquidated
             ,tot_cont_int
             ,uid_amount
       FROM   olpps_reversal_iccf_details)
/