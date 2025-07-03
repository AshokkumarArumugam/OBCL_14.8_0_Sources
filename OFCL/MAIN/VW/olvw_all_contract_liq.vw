CREATE OR REPLACE FORCE VIEW olvw_all_contract_liq(AMOUNT_DUE,AMOUNT_PAID,COMPONENT,CONTRACT_REF_NO,EVENT_SEQ_NO,MSG_GENERATED,OVERDUE_DAYS,TAX_PAID) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_contract_liq.VW
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(SELECT amount_due
             ,amount_paid
             ,component
             ,contract_ref_no
             ,event_seq_no
             ,msg_generated
             ,overdue_days
             ,tax_paid
       FROM   oltbs_contract_liq)
      UNION
      (SELECT amount_due
             ,amount_paid
             ,component
             ,contract_ref_no
             ,event_seq_no
             ,msg_generated
             ,overdue_days
             ,tax_paid
       FROM   olars_contract_liq)
      UNION
      (SELECT amount_due
             ,amount_paid
             ,component
             ,contract_ref_no
             ,event_seq_no
             ,msg_generated
             ,overdue_days
             ,tax_paid
       FROM   olpts_contract_liq)
      UNION
      (SELECT amount_due
             ,amount_paid
             ,component
             ,contract_ref_no
             ,event_seq_no
             ,msg_generated
             ,overdue_days
             ,tax_paid
       FROM   olpps_contract_liq)
/