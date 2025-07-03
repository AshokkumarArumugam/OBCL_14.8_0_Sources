CREATE OR REPLACE FORCE VIEW olvw_all_contract_receipt_deta(AMOUNT_ADJUSTED,AMOUNT_DUE,AMOUNT_SETTLED,CONTRACT_REF_NO,DUE_DATE,INT_END_DATE,INT_START_DATE,LCY_AMOUNT_DUE,LIQ_EVENT_SEQ_NO,TAX_CCY,TAX_RULE) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_contract_receipt_deta.VW
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(SELECT amount_adjusted
             ,amount_due
             ,amount_settled
             ,contract_ref_no
             ,due_date
             ,int_end_date
             ,int_start_date
             ,lcy_amount_due
             ,liq_event_seq_no
             ,tax_ccy
             ,tax_rule
       FROM   oltbs_contract_receipt_detail)
      UNION
      (SELECT amount_adjusted
             ,amount_due
             ,amount_settled
             ,contract_ref_no
             ,due_date
             ,int_end_date
             ,int_start_date
             ,lcy_amount_due
             ,liq_event_seq_no
             ,tax_ccy
             ,tax_rule
       FROM   olars_contract_receipt_detail)
      UNION
      (SELECT amount_adjusted
             ,amount_due
             ,amount_settled
             ,contract_ref_no
             ,due_date
             ,int_end_date
             ,int_start_date
             ,lcy_amount_due
             ,liq_event_seq_no
             ,tax_ccy
             ,tax_rule
       FROM   olpts_contract_receipt_detail)
      UNION
      (SELECT amount_adjusted
             ,amount_due
             ,amount_settled
             ,contract_ref_no
             ,due_date
             ,int_end_date
             ,int_start_date
             ,lcy_amount_due
             ,liq_event_seq_no
             ,tax_ccy
             ,tax_rule
       FROM   olpps_contract_receipt_detail)
/