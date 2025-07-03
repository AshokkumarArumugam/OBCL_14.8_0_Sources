create or replace force view olvw_contract_interest AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_contract_interest.vw
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
04-JAN-2013 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15659 New field  Variable_Rate_code  will be added   and applicability as Loans and Drawdown Loan UDF Name VARIABLE-RATE-CODE.
--------------------------------------------------------------------------------------------------
*/
SELECT
INDEX_DESC "Index_Desc",
INT_RATE_MARGIN "INT_Rate_Margin",
RATE_REVIEW "Rate_Review",
NEW_INDEX "New_Index",
INT_RATE "Int_Rate",
ORIG_INDEX "Orig_Index",
ORIG_RATE "Orig_Rate",
PREV_INDEX "Prev_Index",
PREV_RATE "Prev_Rate",
RATE_CHANGE_DT "Rate_change_Dt",
Variable_Rate_code "Variable_Rate_Code", --04-JAN-2013 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15659 changes  Adding New Fields in view 
CONTRACT_REF_NO "Contract_Ref_no"
--,EXTERNAL_REF_NO "External Reference" --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
FROM OLDW_CONTRACT_INTEREST x
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
CREATE OR REPLACE SYNONYM olvws_contract_interest 
FOR olvw_contract_interest 
/