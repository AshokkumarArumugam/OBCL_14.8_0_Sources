CREATE OR REPLACE FORCE VIEW olvw_all_contract_reserve(CONTRACT_CCY,CONTRACT_REF_NO,EVENT_SEQ_NO,PREPAYMENT_PENALTY_AMOUNT,RESERVE_STATUS,RESERVE_TXN_AMT,VALUE_DATE) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_contract_reserve.VW
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(SELECT contract_ccy
             ,contract_ref_no
             ,event_seq_no
             ,prepayment_penalty_amount
             ,reserve_status
             ,reserve_txn_amt
             ,value_date
       FROM   oltbs_contract_reserve)
      UNION
      (SELECT contract_ccy
             ,contract_ref_no
             ,event_seq_no
             ,prepayment_penalty_amount
             ,reserve_status
             ,reserve_txn_amt
             ,value_date
       FROM   olars_contract_reserve)
      UNION
      (SELECT contract_ccy
             ,contract_ref_no
             ,event_seq_no
             ,prepayment_penalty_amount
             ,reserve_status
             ,reserve_txn_amt
             ,value_date
       FROM   olpts_contract_reserve)
      UNION
      (SELECT contract_ccy
             ,contract_ref_no
             ,event_seq_no
             ,prepayment_penalty_amount
             ,reserve_status
             ,reserve_txn_amt
             ,value_date
       FROM   olpps_contract_reserve)
/