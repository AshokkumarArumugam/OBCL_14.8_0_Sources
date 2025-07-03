CREATE OR REPLACE FORCE VIEW lbvw_dd_version_roll
(roll_amount,  currency,  value_date, contract_ref_no, tranche_ref_no, prin_outstanding, prin_liqd, component_name)
AS 
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
CHANGE HISTORY
    Changed By         : Satheesh Seshan
    Changed On         : 02-Dec-2024
	Change Description : Included component name and commented the PRINCIPAL condition. 
							to fetch int row for VDBAL insertion, if no PRINCIPAL available.
    Search String      : Bug#37305030
-----------------------------------------------------------------------------------------------
*/
SELECT r.Amount,
       p.currency,
       m.roll_value_date,
       m.contract_ref_no,
       p.tranche_ref_no,
       C.AMOUNT_OUTSTANDING,
       NVL(C.AMOUNT_TO_LIQUIDATE, 0) + NVL(C.AMOUNT_TO_WAIVE, 0)
       ,c.component_name --Bug#37305030 added
  FROM oltb_contract_version_roll m,
       oltb_contract_roll_comp    c,
       oltbs_contract             a,
       oltbs_contract_master      p,--contract_master of the dd
       oltbs_contract_master      r --contract_master of roll ref no
 WHERE c.ROLL_SRC_REF_NO = m.ROLL_SRC_REF_NO
   AND c.VERSION_NO = m.VERSION_NO
   AND a.CONTRACT_REF_NO = m.CONTRACT_REF_NO 
   AND p.CONTRACT_REF_NO = m.CONTRACT_REF_NO
   AND p.VERSION_NO = a.latest_VERSION_NO
   AND r.CONTRACT_REF_NO = m.ROLL_SRC_REF_NO
   AND r.VERSION_NO = m.VERSION_NO
   AND m.ROLL_STATUS in ('I','C')
   AND a.module_code = 'LB'
   --and c.COMPONENT_NAME = 'PRINCIPAL' --Bug#37305030 commented
/
CREATE OR REPLACE SYNONYM lbvws_dd_version_roll FOR lbvw_dd_version_roll
/