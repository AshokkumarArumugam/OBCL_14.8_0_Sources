create or replace FORCE view lbvw_tranche_redn_sch
(contract_ref_no, available_amount, reduction_amount, value_date,process_date, event_seq_no,basis_table,schedule_applied)
as 
/*-----------------------------------------------------------------------------------
**
** File Name      : lbvw_tranche_redn_sch.vw
** Module         : LOAN SYNDICATION
**
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
-------------------------------------------CHANGE HISTORY STARTS------------------------------------------
27-JUN-2006 added change history
			added a pseudo column to know from which table data is coming
			did a sum on differential amount for cases where 
06-Oct-2006 FCC V.CL 7.1 ITR2 sfr#26 changes added process_date column to restrict only reduction schedule till global.application_date
31-oct-2006 fcc v.cl release 7.2 changes daya added a column schedule_applied in view and where clause
*/
SELECT a.contract_ref_no, a.available_amount, a.reduction_amount, a.value_date,a.value_date ,a.event_seq_no, 'REDN_SCH' basis_table,schedule_applied --31-oct-2006 fcc v.cl release 7.2 changes daya
from lbtbs_tranche_redn_sch a
WHERE event_seq_no = (SELECT MAX(event_seq_no)
						FROM lbtbs_tranche_redn_sch
					   WHERE contract_ref_no = a.contract_ref_no)
UNION 
SELECT a.contract_ref_no,
	(a.available_amount+nvl(b.differential_amount,0)) available_amount, 
	  -nvl(b.differential_amount,0) reduction_amount
  ,b.value_date value_date,a.value_date process_date, a.event_seq_no, 'AMEND_DUE' basis_table,'Y' schedule_applied --31-oct-2006 fcc v.cl release 7.2 changes daya
FROM lbtbs_tranche_redn_sch a, 
	(SELECT sum(nvl(differential_amount,0)) differential_amount,value_date,contract_ref_no
	FROM oltbs_contract_amend_due
	GROUP BY value_date,contract_ref_no ) b
WHERE a.contract_ref_no = b.contract_ref_no 
AND (a.event_seq_no,a.value_date) = (SELECT MAX(event_seq_no),MAX(value_date) 
									FROM lbtbs_tranche_redn_sch
									WHERE contract_ref_no = a.contract_ref_no
									AND value_date <= b.value_date)
/
CREATE OR REPLACE SYNONYM lbvws_tranche_redn_sch FOR lbvw_tranche_redn_sch
/