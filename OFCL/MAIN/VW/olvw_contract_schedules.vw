CREATE OR REPLACE force VIEW olvw_contract_schedules AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_contract_schedules.vw
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
17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812, removed spaces and included underscore in few lables
--------------------------------------------------------------------------------------------------
*/
SELECT
--17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes start here
/*
PRN_BALANCE "PRN_ Balance",
CONTRACT_REF_NO "Contract_Ref_no",
BILLING_DATE "Billing_ Date",
LATE_CHARGE_APPL "Late_ Charge_ Appl",
COMPONENT "Component",
SCHEDULE_DATE "Schedule_ Date",
SCHEDULE_END_DATE "Schedule_ end_Date",
SCHEDULE_AMT "Schedule_ Amt",
AMOUNT_PAID "Amount_paid",
PAYMENT_DATE "Payment_date",
SCH_AMORT_DT "Sch_ Amort_Dt",
LATE_CHRG_EFF_DT "Late_ Chrg_ Eff_ Dt",
LATE_CHRG_WAIVED "Late_Chrg_Waived",
EXTERNAL_REF_NO "External Reference"
*/
PRN_BALANCE "PRN_Balance",
CONTRACT_REF_NO "Contract_Ref_no",
BILLING_DATE "Billing_Date",
LATE_CHARGE_APPL "Late_Charge_Appl",
COMPONENT "Component",
SCHEDULE_DATE "Schedule_Date",
SCHEDULE_END_DATE "Schedule_end_Date",
SCHEDULE_AMT "Schedule_Amt",
AMOUNT_PAID "Amount_paid",
PAYMENT_DATE "Payment_date",
SCH_AMORT_DT "Sch_Amort_Dt",
LATE_CHRG_EFF_DT "Late_Chrg_Eff_Dt",
LATE_CHRG_WAIVED "Late_Chrg_Waived"
--17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes end here
FROM OLDW_CONTRACT_SCHEDULES x
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
CREATE OR REPLACE SYNONYM olvws_contract_schedules
FOR olvw_contract_schedules 
/