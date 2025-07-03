CREATE OR REPLACE FORCE VIEW lbvw_stp_part_ld_contract_info
(
BORROWER_CONTRACT_REF_NO, VERSION_NO, BORROWER_TRANCHE_REF_NO, PARTICIPANT, PART_RATIO, PART_CONT_REF, OL_CONTRACT
)
AS
/*-----------------------------------------------------------------------------------
**
** File Name      : lbvw_stp_part_ld_contract_info.VW
** Module         :  CORE ENTITIES
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

  **Changed By         : Vineeth T M
  **Date			   : 21-Sep-2022	
  **Change Description : Corrected query for asset ratio
  **Search String      : OBCL_14.5_SUPP#34612677 Changes
--------------------------------------------------------------------------------------------------
*/
SELECT lcm.borrower_contract_ref_no,lcm.version_no, lcm.borrower_tranche_ref_no, lcm.counterparty participant, 
(SELECT lcp1.asset_ratio 
FROM lbtb_contract_participant lcp1
WHERE lcm.borrower_contract_ref_no = lcp1.contract_ref_no 
AND lcm.counterparty = lcp1.participant
--OBCL_14.5_SUPP#34612677 Changes start
--AND lcp1.version_no = (SELECT max(lcp101.version_no)
AND lcp1.EVENT_SEQ_NO = (SELECT max(lcp101.EVENT_SEQ_NO)
--OBCL_14.5_SUPP#34612677 Changes end
                        FROM lbtb_contract_participant lcp101
                        WHERE lcm.borrower_contract_ref_no = lcp101.contract_ref_no 
                        AND lcm.counterparty = lcp101.participant
                        AND lcp101.version_no <= lcm.version_no)) part_ratio 
,lcm.contract_ref_no part_cont_ref, osjb.ld_ref_no ol_contract
FROM lptb_contract_master lcm,
(SELECT osj.participant, osj.part_ref_no, osj.ld_ref_no, osj.borr_esn,osj.borr_ref_no
 FROM oltbs_stp_job_browser osj
 WHERE osj.borr_esn IN (SELECT MAX(osjb01.borr_esn)
                      FROM oltbs_stp_job_browser osjb01
                      WHERE osjb01.borr_ref_no = osj.borr_ref_no)) osjb
where lcm.contract_ref_no = osjb.part_ref_no(+)
/
CREATE OR REPLACE SYNONYM lbsvw_stp_part_ld_contract_info FOR lbvw_stp_part_ld_contract_info
/