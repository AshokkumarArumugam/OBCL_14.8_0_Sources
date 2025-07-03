CREATE OR REPLACE force VIEW olvw_contract_master AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_contract_master.vw
**
** Module	: INTERFACE
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
18-OCT-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14972, DealTrax changes - New fields included, maturity date removed
18-OCT-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#15094, New fileds added - LEGAL_VEHICLE_CODE
16-NOV-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#15192, New fileds added - AGENCY_TYPE
26-Nov-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15314 changes,New fields added - FAS114_AMOUNT, MANUAL_CONTRA_AMT
--------------------------------------------------------------------------------------------------
*/
SELECT
MODULE_CODE  "Module",
DECODE(MODULE_CODE,'OL',PRODUCT_TYPE,'FC',DECODE(PRODUCT_TYPE,'F','FC'),'LB',DECODE(PRODUCT_TYPE,'L','DD','C','TR','F','FC'))  "Product_Type",
PRN_DUE,
CONTRACT_REF_NO "Contract_Ref_no",
LEGAL_VEHICLE_CODE, --18-OCT-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#15094
SERVICERS_CUR_PRIN_B,
CONTRA_MOVEMENT "Contra_Movement",
--17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes start here
/*
COMMITMENT_OS_BAL "Commitment_ OS_ Bal",
CURRENT_COMM_AMT "Current Comm_ Amt",
*/
COMMITMENT_OS_BAL "Commitment_OS_Bal",
CURRENT_COMM_AMT "Current_Comm_Amt",
--17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes end here
COMM_AVAIL_BAL "Comm_Avail_Bal",
--17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes start here
/*
WRITEOFF_AMT "Writeoff_ amt",
CURRENT_PRIN_BAL "Current Prin_Bal",
*/
WRITEOFF_AMT "Writeoff_amt",
CURRENT_PRIN_BAL "Current_Prin_Bal",
--17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes end here
MASTER_COMM_BAL "Master_comm_Bal",
RECOVERY_AMT "Recovery_Amt",
CURR_YEAR_REC_AMT "Curr_year_Rec_Amt",
INT_RATE_CEIL "INT_Rate_Ceil",
INT_RATE_FLOOR "INT_Rate_Floor",
--INT_BASIS_CODE "Int_ Basis_code", --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
INT_BASIS_CODE "Int_Basis_code", --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
INT_RATE "Int_Rate",
REAMORT_DT "Reamort_Dt",
VALUE_DT  "Value_Dt",
--COMM_REF "Comm_ Ref", --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
COMM_REF "Comm_Ref", --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
--MAT_DATE "Mat_Date",--18-OCT-2012 Flexcube V.CL Release 7.12, Retro,CITIUS#14972, commented
--ORIG_COMM_AMT "Orig_ comm_amt", --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
ORIG_COMM_AMT "Orig_comm_amt", --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
CONTRACT_STAT "Contract_Stat",
USER_DEF_STAT "User_Def_stat",
COUNTERPARTY "Counterparty",
RISK_CODE_1 "Risk_code_1",
RISK_CODE_2 "Risk_code_2",
MASTER_COMM_REF "Master_comm_Ref",
EXPENSE_CODE "Expense_Code",
ESC2_BAL "Esc2_Bal",
ESC3_BAL  "Esc3_Bal",
PRODUCT  "Product",
GRACE_DAYS_APPL "Grace_Days_Appl",
--18-OCT-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14972, starts
--MAT_DT "Mat_Dt",
contract_mat_date,
GFRN,
--18-OCT-2012 Flexcube V.CL Release 7.12, Retro,CITIUS#14972, ends
GRACE_DAYS  "Grace_Days",
ORIG_VAL_DATE "Orig_val_date",
ORIG_LOAN_AMT "Orig_Loan_amt", 
PAYOFF_DT "Payoff_Dt",
--SUSP_ESC_BAL "Susp_ Esc_ Bal", --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
SUSP_ESC_BAL "Susp_Esc_Bal", --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
ESC1_BAL "Esc1_Bal",
--17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes start here
/*
TAXING_AUTH "Taxing_ Auth",
BORR_TAX_ID  "Borr_TAX_ ID",
*/
TAXING_AUTH "Taxing_Auth",
BORR_TAX_ID  "Borr_TAX_ID",
--17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes end here
CAPITALIZED "Capitalized",
FACILITY_NAME "Facility_Name",
REVOL_COMM "Revol_Comm",
SERVICERS_ACCRUED_IN "SERVICERS_ACCRUED_IN",
--CASH_RECOV_LATE_CHAR "CASH_RECOV_LATE_ CHAR", --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
CASH_RECOV_LATE_CHAR "CASH_RECOV_LATE_CHAR",--17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
CASH_RECOV_MISC_FEE "CASH_RECOV_MISC_FEE",
CASH_RECOV_PAY_RATE "CASH_RECOV_PAY_RATE",
FAS114_AMOUNT, --26-Nov-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15314 changes
MANUAL_CONTRA_AMT, --26-Nov-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15314 changes
AMOR_AMT "Amor_Amt" , 
PRIN_FREQ "Prin_Freq",
BALLOON_LOAN "Balloon_Loan",
--LATE_CHARGE_METHOD "Late_Charge_ Method", --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
LATE_CHARGE_METHOD "Late_Charge_Method", --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
LATE_CHARGE "Late_Charge",
--17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes start here
/*
NEXT_PRIN_DUE_DT "Next_Prin_Due_ Dt", 
TOTAL_NO_OF_LATE_CHRG "Total_ no_ of_ Late_ chrg",
CURR_YEAR_LATE_CHRG "Curr_Year_ Late_ chrg",
*/
NEXT_PRIN_DUE_DT "Next_Prin_Due_Dt", 
TOTAL_NO_OF_LATE_CHRG "Total_no_of_Late_chrg",
CURR_YEAR_LATE_CHRG "Curr_Year_Late_chrg",
--17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes end here
LATE_CHRG_DUE  "LATE_CHRG_DUE",   
--17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes start here
/*
Agency_ref_no "Agency Ref",
EXTERNAL_REF_NO "External Reference"
*/
Agency_ref_no "Agency_Ref",
DECODE(Agency_type,'P','Participation','L','Lead',null) Agency_Type, --16-NOV-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#15192 changes
EXTERNAL_REF_NO "External_Reference"
--17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes end here
FROM OLDW_CONTRACT_MASTER x
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
CREATE OR REPLACE SYNONYM olvws_contract_master 
FOR olvw_contract_master
/