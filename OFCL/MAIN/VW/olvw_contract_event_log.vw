CREATE OR REPLACE force VIEW olvw_contract_event_log AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_contract_event_log.vw
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
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
** Change Histroy:
** 31-AUG-2012 CITIUS#14745 changes: Added for Dealtrax Data ware housing changes 
17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812, removed spaces and included underscore in few lables
04-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS##15219 changes,Added product type column to contract event log
--------------------------------------------------------------------------------------------------
*/
SELECT 
PRN_BALANCE  "PRN_Balance",
LATE_CHRG_DATE "Late_Chrg_date",
FEE_COMPONENT  "Fee_component",
FEE_START_DATE "Fee_start_Date",
FEE_END_DATE  "Fee_End_Date",
FEE_PAID  "Fee_Paid",
TRN_EFF_DATE  "Trn_Eff_date",
ESC1_AMT  "ESC1_Amt",
ESC2_AMT  "ESC2_Amt",
ESC3_AMT "ESC3_Amt",
INT_ACCR  "Int_Accr",
--LAST_TRANS_DT  "Last _Trans_ Dt", --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
LAST_TRANS_DT  "Last_Trans_Dt",--17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
CONTRACT_REF_NO "Contract_Ref_no",
--TXN_MONTH_YEAR   "TXN_ MONTH_ YEAR", --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
TXN_MONTH_YEAR   "TXN_MONTH_YEAR", --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
INT_AMT  "INT_Amt",
PRN_AMT "PRN_Amt",
SERVICE_FEE_AMT "Service_Fee_Amt",
SUSP_ESC_AMT "Susp_Esc_Amt",
TRN_SEQ_NO "TRN_Seq_No",
TRANS_SUB_CODE "TRANS_SUB_CODE",
TRN_AMT "TRN_AMT",
TRN_CODE "TRN_CODE",
TRN_DATE "TRN_Date",
USER_ID "USER_ID",
--INT_FROM_DT "INT_ FROM_DT", --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
INT_FROM_DT "INT_FROM_DT", --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
INT_TO_DT "INT_TO_DT",
NEXT_PRIN_DUE_DT "Next_Prin_Due_Dt",
PAYMENT_DUE_DT "Payment_Due_Dt"
,PRODUCT_TYPE --04-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS##15219 changes
--,EXTERNAL_REF_NO "External Reference"  --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
FROM OLDW_CONTRACT_EVENT_LOG x
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
CREATE OR REPLACE SYNONYM olvws_contract_event_log
FOR olvw_contract_event_log
/