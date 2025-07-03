CREATE OR REPLACE FORCE VIEW olvw_all_contract_linkages(AMOUNT_BLOCK_NUMBER,CONTRACT_REF_NO,CONVERTED_LINKED_AMOUNT,CONVERTED_PAID_AMOUNT,EVENT_SEQ_NO,EXCHANGE_RATE,LINKAGE_SEQ_NO,LINKAGE_TYPE,LINKAGE_VALID,LINKED_AMOUNT,LINKED_TO_BRANCH,LINKED_TO_CURRENCY,LINKED_TO_REF,LOAN_CURRENCY,VERSION_NO) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_contract_linkages.VW
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(SELECT amount_block_number
             ,contract_ref_no
             ,converted_linked_amount
             ,converted_paid_amount
             ,event_seq_no
             ,exchange_rate
             ,linkage_seq_no
             ,linkage_type
             ,linkage_valid
             ,linked_amount
             ,linked_to_branch
             ,linked_to_currency
             ,linked_to_ref
             ,loan_currency
             ,version_no
       FROM   oltbs_contract_linkages)
      UNION
      (SELECT amount_block_number
             ,contract_ref_no
             ,converted_linked_amount
             ,converted_paid_amount
             ,event_seq_no
             ,exchange_rate
             ,linkage_seq_no
             ,linkage_type
             ,linkage_valid
             ,linked_amount
             ,linked_to_branch
             ,linked_to_currency
             ,linked_to_ref
             ,loan_currency
             ,version_no
       FROM   olars_contract_linkages)
      UNION
      (SELECT amount_block_number
             ,contract_ref_no
             ,converted_linked_amount
             ,converted_paid_amount
             ,event_seq_no
             ,exchange_rate
             ,linkage_seq_no
             ,linkage_type
             ,linkage_valid
             ,linked_amount
             ,linked_to_branch
             ,linked_to_currency
             ,linked_to_ref
             ,loan_currency
             ,version_no
       FROM   olpts_contract_linkages)
      UNION
      (SELECT amount_block_number
             ,contract_ref_no
             ,converted_linked_amount
             ,converted_paid_amount
             ,event_seq_no
             ,exchange_rate
             ,linkage_seq_no
             ,linkage_type
             ,linkage_valid
             ,linked_amount
             ,linked_to_branch
             ,linked_to_currency
             ,linked_to_ref
             ,loan_currency
             ,version_no
       FROM   olpps_contract_linkages)
/