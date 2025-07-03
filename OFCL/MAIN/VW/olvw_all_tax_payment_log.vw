CREATE OR REPLACE FORCE VIEW olvw_all_tax_payment_log(BASIS_AMOUNT,COMPONENT,CONTRACT_REF_NO,CURRENCY,EVENT,EVENT_SEQ_NO,KURS_RATE,OS_PRINCIPAL,PAID_DATE,RECORD_STAT,RECORD_TYPE,SCHEDULE_DATE,SETTLED_DATE,SETTLED_ESN,TAX_OFFICE_RATE,TAX_PAID,TAX_PAID_LCY,TAX_RULE,TAX_RULE_RATE,TAX_SETTLED,VALUE_DATE) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_tax_payment_log.VW
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
             ,component
             ,contract_ref_no
             ,currency
             ,event
             ,event_seq_no
             ,kurs_rate
             ,os_principal
             ,paid_date
             ,record_stat
             ,record_type
             ,schedule_date
             ,settled_date
             ,settled_esn
             ,tax_office_rate
             ,tax_paid
             ,tax_paid_lcy
             ,tax_rule
             ,tax_rule_rate
             ,tax_settled
             ,value_date
       FROM   oltbs_tax_payment_log)
      UNION
      (SELECT basis_amount
             ,component
             ,contract_ref_no
             ,currency
             ,event
             ,event_seq_no
             ,kurs_rate
             ,os_principal
             ,paid_date
             ,record_stat
             ,record_type
             ,schedule_date
             ,settled_date
             ,settled_esn
             ,tax_office_rate
             ,tax_paid
             ,tax_paid_lcy
             ,tax_rule
             ,tax_rule_rate
             ,tax_settled
             ,value_date
       FROM   olars_tax_payment_log)
      UNION
      (SELECT basis_amount
             ,component
             ,contract_ref_no
             ,currency
             ,event
             ,event_seq_no
             ,kurs_rate
             ,os_principal
             ,paid_date
             ,record_stat
             ,record_type
             ,schedule_date
             ,settled_date
             ,settled_esn
             ,tax_office_rate
             ,tax_paid
             ,tax_paid_lcy
             ,tax_rule
             ,tax_rule_rate
             ,tax_settled
             ,value_date
       FROM   olpts_tax_payment_log)
      UNION
      (SELECT basis_amount
             ,component
             ,contract_ref_no
             ,currency
             ,event
             ,event_seq_no
             ,kurs_rate
             ,os_principal
             ,paid_date
             ,record_stat
             ,record_type
             ,schedule_date
             ,settled_date
             ,settled_esn
             ,tax_office_rate
             ,tax_paid
             ,tax_paid_lcy
             ,tax_rule
             ,tax_rule_rate
             ,tax_settled
             ,value_date
       FROM   olpps_tax_payment_log)
/