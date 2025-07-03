CREATE OR REPLACE FORCE VIEW lbvw_trn_rsch AS
/*----------------------------------------------------------------------------------------------------
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
**Changed By         : Divya J
**Date               : 30-Dec-2022
**Change Description : The rsch_amount_paid is derived on event applied value date
**Search String      : Bug#34790755
*/
select l.contract_ref_no,value_date,reduction_amount,sum(m.rsch_amount_paid) Amount_applied  
from lbtb_tranche_redn_sch l,lbtb_tranche_redn_sch_paid m
where l.contract_ref_no = m.contract_ref_no(+)
and l.value_date = m.rsch_due_date(+)
--Bug#34790755 Starts
      and l.event_seq_no =
          (select max(event_seq_no)
             from lbtb_tranche_redn_sch
            where contract_ref_no = l.contract_ref_no)
      and l.reduction_amount > 0 --Bug#34790755 Commented  --Bug#35093964 Comment Reverted
   /*and l.event_seq_no = (select max(event_seq_no)
                           from lbtb_tranche_redn_sch
                          where contract_ref_no = l.contract_ref_no
                            and value_date = l.value_date
                            and reduction_amount > 0)*/ --Bug#35093964 Commented
--Bug#34790755 Ends
group by l.contract_ref_no,value_date,reduction_amount
order by 2
/
PROMPT CREATE SYNONYM  lbvws_trn_rsch FOR lbvw_trn_rsch
CREATE OR REPLACE SYNONYM lbvws_trn_rsch FOR lbvw_trn_rsch
/