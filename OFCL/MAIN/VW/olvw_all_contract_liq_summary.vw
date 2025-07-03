CREATE OR REPLACE FORCE VIEW olvw_all_contract_liq_summary(CONTRACT_REF_NO,DISCOUNT_RATE,EVENT_SEQ_NO,INT_ON_OUTSTANDING_PRINCIPAL,INT_ON_PREPAID_PRINCIPAL,LIMIT_AMOUNT,LIMIT_DATE,LIQD_INT_ON_PREPAID_PRINCIPAL,LIQUIDATED_FACE_VALUE,PAYMENT_REMARKS,PAYMENT_STATUS,PMT_ADJ_AMT1,PMT_ADJ_AMT2,PREPAYMENT_PENALTY_AMOUNT,PREPAYMENT_PENALTY_RATE,REAPPLY_INT_ON_OUTSTAND_AMT,REAPPLY_INT_ON_PREPAID_AMT,SOURCE_CODE,TOTAL_PAID,VALUE_DATE) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_contract_liq_summary.VW
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
             ,discount_rate
             ,event_seq_no
             ,int_on_outstanding_principal
             ,int_on_prepaid_principal
             ,limit_amount
             ,limit_date
             ,liqd_int_on_prepaid_principal
             ,liquidated_face_value
             ,payment_remarks
             ,payment_status
             ,pmt_adj_amt1
             ,pmt_adj_amt2
             ,prepayment_penalty_amount
             ,prepayment_penalty_rate
             ,reapply_int_on_outstand_amt
             ,reapply_int_on_prepaid_amt
             ,source_code
             ,total_paid
             ,value_date
       FROM   oltbs_contract_liq_summary)
      UNION
      (SELECT contract_ref_no
             ,discount_rate
             ,event_seq_no
             ,int_on_outstanding_principal
             ,int_on_prepaid_principal
             ,limit_amount
             ,limit_date
             ,liqd_int_on_prepaid_principal
             ,liquidated_face_value
             ,payment_remarks
             ,payment_status
             ,pmt_adj_amt1
             ,pmt_adj_amt2
             ,prepayment_penalty_amount
             ,prepayment_penalty_rate
             ,reapply_int_on_outstand_amt
             ,reapply_int_on_prepaid_amt
             ,source_code
             ,total_paid
             ,value_date
       FROM   olars_contract_liq_summary)
      UNION
      (SELECT contract_ref_no
             ,discount_rate
             ,event_seq_no
             ,int_on_outstanding_principal
             ,int_on_prepaid_principal
             ,limit_amount
             ,limit_date
             ,liqd_int_on_prepaid_principal
             ,liquidated_face_value
             ,payment_remarks
             ,payment_status
             ,pmt_adj_amt1
             ,pmt_adj_amt2
             ,prepayment_penalty_amount
             ,prepayment_penalty_rate
             ,reapply_int_on_outstand_amt
             ,reapply_int_on_prepaid_amt
             ,source_code
             ,total_paid
             ,value_date
       FROM   olpts_contract_liq_summary)
      UNION
      (SELECT contract_ref_no
             ,discount_rate
             ,event_seq_no
             ,int_on_outstanding_principal
             ,int_on_prepaid_principal
             ,limit_amount
             ,limit_date
             ,liqd_int_on_prepaid_principal
             ,liquidated_face_value
             ,payment_remarks
             ,payment_status
             ,pmt_adj_amt1
             ,pmt_adj_amt2
             ,prepayment_penalty_amount
             ,prepayment_penalty_rate
             ,reapply_int_on_outstand_amt
             ,reapply_int_on_prepaid_amt
             ,source_code
             ,total_paid
             ,value_date
       FROM   olpps_contract_liq_summary)
/