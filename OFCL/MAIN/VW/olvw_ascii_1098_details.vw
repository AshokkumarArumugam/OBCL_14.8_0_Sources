create or replace force view olvw_ascii_1098_details
(counterparty, branch, customer_name, ssn, interest_paid, refund_amount)
as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_ascii_1098_details.VW
**
** Module	: LD
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
select a.counterparty,a.branch,b.customer_name1,b.ssn,
decode(g.counterparty,a.counterparty,(decode(g.tax_year,f.tax_year,g.interest_paid,0)),
sum(nvl(d.amount_settled,0))) - sum(nvl(k.interest_waiver_amt,0)) + 
sum(decode(to_char(i.value_date,'YYYY'),f.tax_year,nvl(i.refund_amt,0),0))int_paid
,sum(decode(to_char(i.value_date,'YYYY'),f.tax_year,nvl(i.refund_amt,0),0)) refund_amt
from oltbs_contract_master a,oltms_customer b ,oltbs_contract c,oltbs_amount_paid d,
oltms_branch e,oltms_1098_param f ,oltbs_ovd_interest g,oltms_product_master_ld h, OLTB_CONTRACT_REFUND i
,oltbs_contract_liq j,oltbs_contract_liq_summary k
where a.contract_ref_no = c.contract_ref_no
and c.module_code = 'OL'
and c.product_type='L'
and c.contract_status in ('A','L')
and a.version_no = c.latest_version_no
and b.customer_no = a.counterparty
and d.contract_ref_no = a.contract_ref_no
and d.component = a.main_comp
and d.payment_status <> 'V'
and e.branch_code = a.branch
and to_char(d.paid_date,'YYYY') = f.tax_year --substr(e.current_cycle,4,4)-1
and j.contract_ref_no = d.contract_ref_no
and j.component = d.component
and j.event_seq_no = d.event_seq_no
and k.contract_ref_no = d.contract_ref_no
and k.value_date = d.paid_date
and k.event_seq_no = d.event_seq_no
and f.branch_code = e.branch_code
--and f.tax_year = substr(e.current_cycle,4,4)-1
and g.branch_code (+)= c.branch
and g.contract_ref_no (+) = c.contract_ref_no
and h.product = c.product_code
and nvl(h.allow_1098_stmt,'N') = 'Y'
and i.contract_ref_no (+) = d.contract_ref_no
and i.component (+) = d.component
and i.value_date (+) = d.due_date
Group by a.counterparty,a.branch,b.customer_name1,b.ssn,f.threshold_limit_amt,
g.counterparty,g.interest_paid,g.tax_year,f.tax_year
Having decode(g.counterparty,a.counterparty,(decode(g.tax_year,f.tax_year,g.interest_paid,0)),
sum(nvl(d.amount_settled,0))) - sum(nvl(k.interest_waiver_amt,0)) 
+ sum((decode(to_char(i.value_date,'YYYY'),f.tax_year,nvl(i.refund_amt,0),0))) >= f.threshold_limit_amt
/
CREATE OR REPLACE SYNONYM olvws_ascii_1098_details FOR olvw_ascii_1098_details 
/