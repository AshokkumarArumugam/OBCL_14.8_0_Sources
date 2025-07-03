CREATE OR REPLACE FORCE VIEW olvw_all_contract_receipt_liq(AMOUNT_ADJUSTED,AMOUNT_DUE,AMOUNT_RECEIVED,CONTRACT_REF_NO,DOCUMENT_TYPE,EVENT_SEQ_NO,EXCH_RATE,LCY_AMOUNT_RECEIVED,LIQ_EVENT_SEQ_NO,RECEIPT_PAYMENT_DATE,RECEIPT_REF_NO,RECEIPT_STATUS,SERIAL_NO,TAX_CCY,TAX_RULE,TXN_TYPE,USD_RATE) AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_contract_receipt_liq.VW
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
             ,amount_received
             ,contract_ref_no
             ,document_type
             ,event_seq_no
             ,exch_rate
             ,lcy_amount_received
             ,liq_event_seq_no
             ,receipt_payment_date
             ,receipt_ref_no
             ,receipt_status
             ,serial_no
             ,tax_ccy
             ,tax_rule
             ,txn_type
             ,usd_rate
       FROM   oltbs_contract_receipt_liq)
      UNION
      (SELECT amount_adjusted
             ,amount_due
             ,amount_received
             ,contract_ref_no
             ,document_type
             ,event_seq_no
             ,exch_rate
             ,lcy_amount_received
             ,liq_event_seq_no
             ,receipt_payment_date
             ,receipt_ref_no
             ,receipt_status
             ,serial_no
             ,tax_ccy
             ,tax_rule
             ,txn_type
             ,usd_rate
       FROM   olars_contract_receipt_liq)
      UNION
      (SELECT amount_adjusted
             ,amount_due
             ,amount_received
             ,contract_ref_no
             ,document_type
             ,event_seq_no
             ,exch_rate
             ,lcy_amount_received
             ,liq_event_seq_no
             ,receipt_payment_date
             ,receipt_ref_no
             ,receipt_status
             ,serial_no
             ,tax_ccy
             ,tax_rule
             ,txn_type
             ,usd_rate
       FROM   olpts_contract_receipt_liq)
      UNION
      (SELECT amount_adjusted
             ,amount_due
             ,amount_received
             ,contract_ref_no
             ,document_type
             ,event_seq_no
             ,exch_rate
             ,lcy_amount_received
             ,liq_event_seq_no
             ,receipt_payment_date
             ,receipt_ref_no
             ,receipt_status
             ,serial_no
             ,tax_ccy
             ,tax_rule
             ,txn_type
             ,usd_rate
       FROM   olpps_contract_receipt_liq)
/