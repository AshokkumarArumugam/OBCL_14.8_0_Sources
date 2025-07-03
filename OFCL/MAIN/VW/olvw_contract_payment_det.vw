CREATE OR REPLACE force VIEW olvw_contract_payment_det AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_contract_payment_det.vw
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
SELECT
PI_PAY_DUE "PI_Pay_due",
NEW_PI_PAY "New_PI_Pay",
PREV_NET_YIELD "PREV_NET_YIELD",
COMPONENT "Component",
DUE_DATE "Due_Date",
VALUE_DATE "Value_Date",
AMOUNT_DUE "Amount_Due",
AMOUNT_PAID "Amount_Paid",
CUR_NET_YLD_EFF_DATE "CUR_NET_YLD_EFF_DATE",
CONTRACT_REF_NO "Contract_Ref_no"
--,EXTERNAL_REF_NO "External Reference" --17-SEP-2012 Flexcube V.CL Release 7.12, Retro,CITIUS#14812 changes commented
FROM OLDW_CONTRACT_PAYMENT_DETAILS x
WHERE EXISTS 
(SELECT 1 
                FROM                   oltbs_interface_param_if y
                WHERE                 y.branch_code =  (SELECT ho_branch from oltm_bank)
                AND                      y.external_system = 'DEALTRAX'
                AND                       y.interface_code = 'DEALTRAX'
                AND                       y.param_type = 'CCC_PROOF_CODE'
                AND                       y.param_value = x.proof
)
WITH READ ONLY
/
CREATE OR REPLACE SYNONYM olvws_contract_payment_det
FOR olvw_contract_payment_det 
/