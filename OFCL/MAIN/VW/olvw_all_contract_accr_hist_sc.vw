CREATE OR REPLACE FORCE VIEW olvw_all_contract_accr_hist_sc(ACCRUAL_REF_NO,ACCRUAL_TO_DATE,ACC_ENTRY_PASSED,BRANCH,COMPONENT,COMPONENT_CCY,CONTRACT_BOOKING_DATE,CONTRACT_REF_NO,EVENT_SEQ_NO,MODULE,NET_ACCRUAL,OUTSTANDING_ACCRUAL,PRODUCT,PRODUCT_ACCRUAL_REF_NO,SCHEDULE_DATE,TILL_DATE_ACCRUAL,TRANSACTION_DATE,TYPE_OF_ACCRUAL,USER_DEFINED_STATUS,VALUE_DATE) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_contract_accr_hist_sc.VW
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(SELECT accrual_ref_no
             ,accrual_to_date
             ,acc_entry_passed
             ,branch
             ,component
             ,component_ccy
             ,contract_booking_date
             ,contract_ref_no
             ,event_seq_no
             ,module
             ,net_accrual
             ,outstanding_accrual
             ,product
             ,product_accrual_ref_no
             ,schedule_date
             ,till_date_accrual
             ,transaction_date
             ,type_of_accrual
             ,user_defined_status
             ,value_date
       FROM   oltbs_contract_accr_hist_sch)
      UNION
      (SELECT accrual_ref_no
             ,accrual_to_date
             ,acc_entry_passed
             ,branch
             ,component
             ,component_ccy
             ,contract_booking_date
             ,contract_ref_no
             ,event_seq_no
             ,module
             ,net_accrual
             ,outstanding_accrual
             ,product
             ,product_accrual_ref_no
             ,schedule_date
             ,till_date_accrual
             ,transaction_date
             ,type_of_accrual
             ,user_defined_status
             ,value_date
       FROM   olars_contract_accr_hist_sch)
      UNION
      (SELECT accrual_ref_no
             ,accrual_to_date
             ,acc_entry_passed
             ,branch
             ,component
             ,component_ccy
             ,contract_booking_date
             ,contract_ref_no
             ,event_seq_no
             ,module
             ,net_accrual
             ,outstanding_accrual
             ,product
             ,product_accrual_ref_no
             ,schedule_date
             ,till_date_accrual
             ,transaction_date
             ,type_of_accrual
             ,user_defined_status
             ,value_date
       FROM   olpts_contract_accr_hist_sch)
      UNION
      (SELECT accrual_ref_no
             ,accrual_to_date
             ,acc_entry_passed
             ,branch
             ,component
             ,component_ccy
             ,contract_booking_date
             ,contract_ref_no
             ,event_seq_no
             ,module
             ,net_accrual
             ,outstanding_accrual
             ,product
             ,product_accrual_ref_no
             ,schedule_date
             ,till_date_accrual
             ,transaction_date
             ,type_of_accrual
             ,user_defined_status
             ,value_date
       FROM   olpps_contract_accr_hist_sch)
/