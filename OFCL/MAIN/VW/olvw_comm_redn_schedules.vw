CREATE OR REPLACE FORCE VIEW olvw_comm_redn_schedules
(contract_ref_no, value_date, event_seq_no, reduction_amount)
AS
/*-------------------------------------------------------------------------------------- 
**  
**  File Name :olvw_comm_redn_schedules.VW 
**  
**  Module    :LD-Loans and Deposits
**  
**  This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
------------------------------------------CHANGE HISTORY----------------------------------
09-Jun-2009 FLEXCUBE V.CL Release 7.5 lot2 ITR1 SFR#86 , VDBAL changes for rollover by Saurabh
09-SEP-2009 FLEXCUBE V.CL Release 7.5 LOT3 FS Tag 03 Commitment Linkage Amendment changes,<<SQA sampling Fix>>
								     Vami (incr or decr) on value date of the conract 
								     (only for commitment) is not updating the vdbal properly
--22-FEB-2010 FLEXCUBE V.CL 7.6, PBG Site-Retro,CITIPBG TILL#282 CHANGES : Included the condition differential_amount <> 0 in the query .
                                       Vd bal calculation for available balance was getting doubled if maturity date change was done
                                       on the value date of the commitment.
                                       Also commented the max(version_no) select for picking the value date for tuning purpose.
----------------------------------------END CHANGE HISTORY --------------------------------
--09-SEP-2009 FLEXCUBE V.CL Release 7.5 LOT3 FS Tag 03 change starts here
*/
SELECT contract_ref_no
	, value_date
	, event_seq_no
	, SUM(differential_amount) differential_amount
FROM	oltbs_contract_amend_due
WHERE NVL(amend_inst_status,'A') <> 'V'
AND nvl(differential_amount,0) <> 0 --22-FEB-2010 FLEXCUBE V.CL 7.6, PBG Site-Retro,CITIPBG TILL#282 CHANGES 
GROUP BY contract_ref_no,value_date, event_seq_no
UNION
	SELECT l.contract_ref_no
         , l.value_date
         , l.event_seq_no
		     , l.amount
	FROM oltbs_contract_master l
	WHERE version_no = 1
	AND   module ='OL'
UNION
SELECT l.Linked_To_Ref,
       t.maturity_date,
       r.event_seq_no,
       -SUM(olpks_vdbal.fn_get_exchng_rate(l.Linked_To_Ref,
                                           r.contract_ref_no,
                                           (SELECT currency
                                              FROM oltbs_contract_master
                                             WHERE contract_reF_no =
                                                   l.Linked_To_Ref
                                               AND version_no = l.version_no),
                                           t.currency,
                                           r.interest_roll_amount,
                                           t.value_date))
  FROM OLTB_CONTRACT_ROLLOVER  r,
       oltbs_contract_master   t,
       oltbs_contract_linkages l
 WHERE r.contract_ref_no = t.contract_ref_no
   AND r.contract_ref_no = l.contract_ref_no
   AND r.version_no = t.version_no
   AND t.module	= 'OL'
   AND r.roll_inst_status = 'I'
   AND r.rollover_amount_type = 'I'
   AND t.contract_status NOT IN ('H', 'V')
   AND t.rollover_allowed ='Y'
   AND r.version_no =
       (SELECT MAX(version_no)
          FROM oltbs_contract_rollover
         WHERE contract_ref_no = r.contract_ref_no)
   AND l.version_no =
       (SELECT MAX(version_no)
          FROM oltbs_contract_linkages
         WHERE LINked_to_ref = l.Linked_To_Ref)
 GROUP BY l.Linked_To_Ref,
          t.maturity_date,
          r.event_seq_no
UNION
SELECT l.Linked_To_Ref,
       t.maturity_date,
       r.event_seq_no,
       -SUM(olpks_vdbal.fn_get_exchng_rate(l.Linked_To_Ref,
                                          r.contract_ref_no,
                                          (SELECT currency
                                             FROM oltbs_contract_master
                                            WHERE contract_reF_no = l.Linked_To_Ref
                                              AND version_no = 1
                                              ),
                                          t.currency,
                                          r.interest_roll_amount,
                                          t.value_date
                                          )
          )
  FROM OLTB_CONTRACT_SPLIT_ROLLOVER r,
       oltbs_contract_master        t,
       oltbs_contract_rollover      u,
       oltbs_contract_linkages      l
 WHERE r.contract_ref_no = t.contract_ref_no
 AND   t.contract_ref_no = l.contract_ref_no
   AND r.version_no = t.version_no
   AND r.contract_ref_no = u.contract_ref_no
   AND r.version_no = u.version_no
   AND t.module	= 'OL'
   AND u.roll_inst_status = 'I'
   AND r.amount_type = 'R'
   AND t.contract_status NOT IN ('H', 'V')
   AND t.rollover_allowed ='Y'
   AND u.version_no =
       (SELECT MAX(version_no)
          FROM oltbs_contract_rollover
         WHERE contract_ref_no = u.contract_ref_no
         )
   AND  l.version_no = (SELECT MAX(version_no)
                        FROM oltbs_contract_linkages
                       WHERE LINked_to_ref = l.Linked_To_Ref
                       )
 GROUP BY l.Linked_To_Ref, t.maturity_date, r.event_seq_no
--09-SEP-2009 FLEXCUBE V.CL Release 7.5 LOT3 FS Tag 03 change ends here
/
CREATE OR REPLACE SYNONYM olvws_comm_redn_schedules FOR olvw_comm_redn_schedules
/