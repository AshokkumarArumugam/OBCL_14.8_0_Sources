CREATE OR REPLACE FORCE VIEW olvw_all_contract_amend_due(AMENDMENT_APPLIED,CONTRACT_REF_NO,DIFFERENTIAL_AMOUNT,EVENT_SEQ_NO,ICCF_CHANGED,NEW_CREDIT_LINE,NEW_MATURITY_DATE,NEW_REVOLVING_FLAG,TRANSACTION_DATE,VALUE_DATE,VAMI_ESN) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_contract_amend_due.VW
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(SELECT amendment_applied
             ,contract_ref_no
             ,differential_amount
             ,event_seq_no
             ,iccf_changed
             ,new_credit_line
             ,new_maturity_date
             ,new_revolving_flag
             ,transaction_date
             ,value_date
             ,vami_esn
       FROM   oltbs_contract_amend_due)
      UNION
      (SELECT amendment_applied
             ,contract_ref_no
             ,differential_amount
             ,event_seq_no
             ,iccf_changed
             ,new_credit_line
             ,new_maturity_date
             ,new_revolving_flag
             ,transaction_date
             ,value_date
             ,vami_esn
       FROM   olars_contract_amend_due)
      UNION
      (SELECT amendment_applied
             ,contract_ref_no
             ,differential_amount
             ,event_seq_no
             ,iccf_changed
             ,new_credit_line
             ,new_maturity_date
             ,new_revolving_flag
             ,transaction_date
             ,value_date
             ,vami_esn
       FROM   olpts_contract_amend_due)
      UNION
      (SELECT amendment_applied
             ,contract_ref_no
             ,differential_amount
             ,event_seq_no
             ,iccf_changed
             ,new_credit_line
             ,new_maturity_date
             ,new_revolving_flag
             ,transaction_date
             ,value_date
             ,vami_esn
       FROM   olpps_contract_amend_due)
/