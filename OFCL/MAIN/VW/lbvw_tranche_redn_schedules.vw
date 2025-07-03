CREATE OR REPLACE FORCE VIEW lbvw_tranche_redn_schedules AS
/*-----------------------------------------------------------------------------------
**
** File Name      : lbvw_tranche_redn_schedules.vw
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
29-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#140, 29-DEC-2008
	    Revolving commitment condition commented. Version_no included in the where clause.
04-FEB-2009 FLEXCUBE V.CL Release 7.4 ITR2 SFR#14, 04-FEB-2009 Included contract status check	    
01-OCT-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 RETRO  CITIUS-LS#5857 Vami Changes for value date , ADDED CHECK1
30-SEP-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag08 Changes,Trading PIK Changes	    
*/
--Flexcube V.CL Release 7.4, 27-FEB-2008 ,P+I Rollover changes starts 
--28-OCT-2008 CITIUS-LS#SRT1451 STP and Code Consolidation Retro
SELECT c.contract_ref_no,c.rsch_paid_date value_date,(c.rsch_amount_paid + nvl(-D.differential_amount,0)) Reduction_amount , 1 check1
FROM
(SELECT contract_ref_no,rsch_paid_date,sum(rsch_amount_paid) rsch_amount_paid
FROM lbtbs_tranche_redn_sch_paid
group by contract_ref_no,rsch_paid_date) c,
(select contract_ref_no,value_date,sum(differential_amount) differential_amount
from OLTB_CONTRACT_AMEND_DUE
group by contract_ref_no,value_date) d
WHERE c.contract_ref_no = d.contract_ref_no(+)
AND C.rsch_paid_date = D.value_date(+)
UNION
SELECT E.CONTRACT_REF_NO,value_date,-sum(differential_amount) differential_amount , 1 check1
from OLTB_CONTRACT_AMEND_DUE e
WHERE
--11-Dec-2008 FLEXCUBE V.CL Release 7.4 SLT Changes  By Madhu
--differential_amount is not null and--SACHIN SPOTFIX 
NOT exists (SELECT 1 FROM lbtbs_tranche_redn_sch_paid
              where  contract_ref_no = e.contract_ref_no
              and e.value_date = rsch_paid_date)
--11-Dec-2008 FLEXCUBE V.CL Release 7.4 SLT Changes Starts By Madhu
and e.differential_amount is not null--incase of only maturity date change --sachin vami upload changes                            
--11-Dec-2008 FLEXCUBE V.CL Release 7.4 SLT Changes Ends By Madhu
group by E.CONTRACT_REF_NO,value_date
UNION
select l.contract_ref_no, 
	--l.value_date --Flexcube V.CL Release 7.4, Amendment of value date of future dated tranche,Maneeha starts
	(select value_date from oltbs_contract_master 
	 where contract_ref_no = l.contract_ref_no
	 and version_no = (SELECT MAX(version_no)
				FROM oltbs_contract_master
				WHERE contract_ref_no = l.contract_ref_no)
	) value_date   --Flexcube V.CL Release 7.4, Amendment of value date of future dated tranche,Maneeha ends
	,l.amount , 0 check1
from oltbs_contract_master l
where version_no = 1 
union--SACHIN CHANGES FOR CAPITALIZE ROLLOVER STARTS
select t.tranche_ref_no, t.maturity_date, -SUM(lbpks_vdbal.fn_get_exchg_rate(t.tranche_ref_no,r.contract_ref_no,(select currency from oltbs_contract_master where contract_reF_no = t.tranche_ref_no and version_no = s.version_no),t.currency,r.interest_roll_amount,t.value_date)) 
,1 check1 from
OLTB_CONTRACT_ROLLOVER r, oltbs_contract_preference s, oltbs_contract_master t
where r.contract_ref_no = t.contract_ref_no
and t.tranche_ref_no = s.contract_ref_no
and r.version_no = t.version_no
--and s.revolving_commitment = 'N' -- FLEXCUBE V.CL Release 7.4 MTR1 SFR#140, 29-DEC-2008, commented
and r.roll_inst_status = 'I'
and r.rollover_amount_type = 'I'
and t.contract_status not in ('H','V') --04-FEB-2009 FLEXCUBE V.CL Release 7.4 ITR2 SFR#14, 04-FEB-2009 Included contract status check
and r.version_no = (select max(version_no) from oltbs_contract_rollover where contract_ref_no = r.contract_ref_no) -- FLEXCUBE V.CL Release 7.4 MTR1 SFR#140, 29-DEC-2008
and s.version_no = (select max(version_no) from oltbs_contract_preference where contract_reF_no = t.tranche_ref_no)
GROUP BY t.tranche_ref_no, t.maturity_date
UNION
select  t.tranche_ref_no, t.maturity_date, -SUM(lbpks_vdbal.fn_get_exchg_rate(t.tranche_ref_no,r.contract_ref_no,(select currency from oltbs_contract_master where contract_reF_no = t.tranche_ref_no and version_no = s.version_no),t.currency,r.interest_roll_amount 
--Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag08 Changes Start
+ nvl(r.pik_roll_amount,0),t.value_date))
--Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag08 Changes end
, 1 check1 from
OLTB_CONTRACT_SPLIT_ROLLOVER r,oltbs_contract_preference s, oltbs_contract_master t, oltbs_contract_rollover u
where r.contract_ref_no= t.contract_ref_no
and t.tranche_ref_no = s.contract_ref_no
and r.version_no = t.version_no
and r.contract_ref_no = u.contract_ref_no
and r.version_no = u.version_no
--and s.revolving_commitment = 'N'--SACHIN SPOTFIX -- FLEXCUBE V.CL Release 7.4 MTR1 SFR#140, 29-DEC-2008, commented
and u.roll_inst_status = 'I'
and r.amount_type = 'I'
and t.contract_status not in ('H','V') --04-FEB-2009 FLEXCUBE V.CL Release 7.4 ITR2 SFR#14, 04-FEB-2009 Included contract status check
and u.version_no = (select max(version_no) from oltbs_contract_rollover where contract_ref_no = u.contract_ref_no) --CITIUS-LS Till#1358--CITIUS-LS#SRT1451
and s.version_no = (select max(version_no) from oltbs_contract_preference where contract_reF_no = t.tranche_ref_no)
GROUP BY t.tranche_ref_no, t.maturity_date
UNION--SACHIN SPOTFIX STARTS
select  j.tranche_ref_no, j.value_date,   -SUM(lbpks_vdbal.fn_get_exchg_rate(j.tranche_ref_no,r.contract_ref_no,(select currency from oltbs_contract_master where contract_reF_no = j.tranche_ref_no and version_no = s.version_no), j.contract_ccy ,r.interest_roll_amount
--Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag08 Changes Start
 + nvl(r.pik_roll_amount,0),j.value_date))
--Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag08 Changes End 
,1 check1 from lbtbs_contract_consol_detail r,oltbs_contract_preference s,lbtbs_contract_consol_master j
where j.tranche_ref_no= s.contract_ref_no
and s.version_no = (select max(version_no) from oltbs_contract_preference where contract_reF_no = j.tranche_ref_no)
and r.contract_reF_no = j.contract_ref_no
--and s.revolving_commitment = 'N' -- FLEXCUBE V.CL Release 7.4 MTR1 SFR#140, 29-DEC-2008, commented
and j.rollover_amount_type = 'I'
and j.rollover_status = 'I'
GROUP BY j.tranche_ref_no, j.value_date
--SACHIN SPOTFIX ENDS
--Flexcube V.CL Release 7.4, 27-FEB-2008 ,P+I Rollover changes ends
order by 1,2,4
/
CREATE OR REPLACE SYNONYM lbvws_tranche_redn_schedules FOR lbvw_tranche_redn_schedules
/