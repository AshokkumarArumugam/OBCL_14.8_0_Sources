CREATE OR REPLACE FORCE VIEW olvw_all_contract_receipt_mast(BRANCH_CODE,CONTRACT_REF_NO,DEPARTMENT_CODE,LIQ_EVENT_SEQ_NO,PAYMENT_DATE,RECEIPT_STATUS) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_contract_receipt_mast.VW
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(SELECT branch_code
             ,contract_ref_no
             ,department_code
             ,liq_event_seq_no
             ,payment_date
             ,receipt_status
       FROM   oltbs_contract_receipt_master)
      UNION
      (SELECT branch_code
             ,contract_ref_no
             ,department_code
             ,liq_event_seq_no
             ,payment_date
             ,receipt_status
       FROM   olars_contract_receipt_master)
      UNION
      (SELECT branch_code
             ,contract_ref_no
             ,department_code
             ,liq_event_seq_no
             ,payment_date
             ,receipt_status
       FROM   olpts_contract_receipt_master)
      UNION
      (SELECT branch_code
             ,contract_ref_no
             ,department_code
             ,liq_event_seq_no
             ,payment_date
             ,receipt_status
       FROM   olpps_contract_receipt_master)
/