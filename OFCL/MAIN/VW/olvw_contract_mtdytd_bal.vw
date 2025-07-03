CREATE OR REPLACE force VIEW olvw_contract_mtdytd_bal AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_contract_mtdytd_bal.vw
**
** Module	: INTERFACE
**
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
--------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------
** Change Histroy:
** 31-AUG-2012 CITIUS#14745 changes: Added for Dealtrax Data ware housing changes 
17-SEP-2012 Flexcube V.CL Release 7.12, Retro,CITIUS#14812 changes, removed spaces and included underscore in few lables
--------------------------------------------------------------------------------------------------
*/
SELECT YTD_INT "YTD_Int",
LAST_ACCR_DT "Last_Accr_Dt",
YTD_FEE "YTD_Fee",
MTD_FEE "MTD_Fee",
MTD_INT "MTD_Int",
ACCR_INT_LAST_BIL "ACCR_INT_LAST_BIL",
PERC_PER_DIEM "PERC_PER_DIEM",
CURRENT_NET_YIELD "CURRENT_NET_YIELD",
CONTRACT_REF_NO "Contract_Ref_no"
--,EXTERNAL_REF_NO "External Reference" --17-SEP-2012 Flexcube V.CL Release 7.12, Retro,CITIUS#14812 changes
FROM OLDW_CONTRACT_MTDYTD_BAL x
WHERE EXISTS 
(SELECT 1 
                FROM                   oltbs_interface_param_if y
                WHERE                 y.branch_code =  (SELECT ho_branch from oltm_bank)
                AND                      y.external_system = 'DEALTRAX'
                AND                       y.interface_code = 'DEALTRAX'
                AND                       y.param_type = 'CCC_PROOF_CODE'
                AND                       y.param_value = x.proof
)
with read only
/
CREATE OR REPLACE SYNONYM olvws_contract_mtdytd_bal
FOR olvw_contract_mtdytd_bal
/