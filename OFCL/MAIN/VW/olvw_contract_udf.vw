CREATE OR REPLACE force VIEW olvw_contract_udf AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_contract_udf.vw
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
01-OCT-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14867, included To_date for few fields
04-OCT-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14954, DTAX,Dealtrax,CFPI  and Genesis  related issue changes
18-OCT-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#15094, DealTrax changes
	(1) New fields included: ORG_FUND_AMT
	(2) Fields removed: Comm_Misc, CONTRACT_TYPE, TDR_Flag
19-OCT-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14972 Changes - DealTrax changes, New fields includedChanges related to CFPI Conversion		
04-JAN-2013 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15674, DW table created for UDF as well - to accommodate new fields fetching values from other tables (like org_fund_amt from cstm_udf_vals)
20-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16658 changes, new columns added LOAN_SUB_PURPOSE and BASERTFUND
12-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#17033 changes, added new column INTEREST_RESERVE.
--------------------------------------------------------------------------------------------------
*/
--04-JAN-2013 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15674 changes Starts
/*
select
min(decode((x.field_name),'Facility_Risk',x.field_value)) "Facility_Risk" 
,min(decode((x.field_name),'Obligor_Risk',x.field_value)) "Obligor_Risk"
--,min(decode((x.field_name),'ADJ_ LOAN_ DESC',x.field_value)) "ADJ_ LOAN_ DESC" --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 changes here
,min(decode((x.field_name),'ADJ_ LOAN_ DESC',x.field_value)) "ADJ_LOAN_DESC"  --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 changes here
,min(decode((x.field_name),'Loan_Method',x.field_value)) "Loan_Method"
--17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 changes start here
--,min(decode((x.field_name),'New_Rate_ Cap',x.field_value)) "New_Rate_ Cap"
--,min(decode((x.field_name),'Periodic_ Rate_ Cap',x.field_value)) "Periodic_ Rate_ Cap"
,min(decode((x.field_name),'New_Rate_ Cap',x.field_value)) "New_Rate_Cap"
,min(decode((x.field_name),'Periodic_ Rate_ Cap',x.field_value)) "Periodic_Rate_Cap"
--17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 changes end here
--,min(decode((x.field_name),'Review_Date',x.field_value)) "Review_Date"--01-OCT-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14867 Changes
,to_date(min(decode((x.field_name),'Review_Date',x.field_value)),'YYYYMMDD') "Review_Date" --01-OCT-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14867 Changes
--17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 changes start here
--,min(decode((x.field_name),'Rate_ Cap_ Decrease',x.field_value)) "Rate_ Cap_ Decrease"
--,min(decode((x.field_name),'Rate_ Cap_ Increase',x.field_value)) "Rate_ Cap_ Increase"
--,min(decode((x.field_name),'Rate_ Cap_ Exp_ Dt',x.field_value)) "Rate_ Cap_ Exp_ Dt"
--,min(decode((x.field_name),'Rate_ Cap_ Dec_PCT',x.field_value)) "Rate_ Cap_ Dec_PCT"
--,min(decode((x.field_name),'Rate _Cap_ Inc_ PCT',x.field_value)) "Rate _Cap_ Inc_ PCT"
--,min(decode((x.field_name),'Reamort_ Change_Dt',x.field_value)) "Reamort_ Change_Dt"
,min(decode((x.field_name),'Rate_ Cap_ Decrease',x.field_value)) "Rate_Cap_Decrease"
,min(decode((x.field_name),'Rate_ Cap_ Increase',x.field_value)) "Rate_Cap_Increase"
--,min(decode((x.field_name),'Rate_ Cap_ Exp_ Dt',x.field_value)) "Rate_Cap_Exp_Dt"--01-OCT-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14867 Changes
,to_date(min(decode((x.field_name),'Rate_Cap_Exp_Dt',x.field_value)),'YYYYMMDD') "Rate_Cap_Exp_Dt" -- 17-SEP-2012 CITIUS#14867--01-OCT-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14867 Changes
,min(decode((x.field_name),'Rate_ Cap_ Dec_PCT',x.field_value)) "Rate_Cap_Dec_PCT"
,min(decode((x.field_name),'Rate _Cap_ Inc_ PCT',x.field_value)) "Rate_Cap_Inc_PCT"
--,min(decode((x.field_name),'Reamort_ Change_Dt',x.field_value)) "Reamort_Change_Dt"--01-OCT-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14867 Changes
,to_date(min(decode((x.field_name),'Reamort_Change_Dt',x.field_value)),'YYYYMMDD') "Reamort_Change_Dt" --01-OCT-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14867 Changes
--17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 changes end here
,min(decode((x.field_name),'User_Defined',x.field_value)) "User_Defined"
,min(decode((x.field_name),'Borr_Type',x.field_value)) "Borr_Type"
--,min(decode((x.field_name),'Class_ Code',x.field_value)) "Class_ Code" --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 changes here
,min(decode((x.field_name),'Class_ Code',x.field_value)) "Class_Code" --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 changes here
--,min(decode((x.field_name),'Comm_Misc',x.field_value)) "Comm_Misc"--18-OCT-2012 Flexcube V.CL Release 7.12, Retro CITIUS#15094 (2), commented
--,min(decode((x.field_name),'Admin_ Code',x.field_value)) "Admin_ Code" --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 changes here
,min(decode((x.field_name),'Admin_Code',x.field_value)) "Admin_Code" --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 changes here
--25-SEP-2012  CITIUS#14954  Changes starts
--,min(decode((x.field_name),'GL_matrix',x.field_value)) "GL_matrix"
,min(decode((x.field_name),'GL_Matrix',x.field_value)) "GL_matrix"
--25-SEP-2012  CITIUS#14954  Changes ends
,min(decode((x.field_name),'NT',x.field_value)) NT
,min(decode((x.field_name),'Officer_Code',x.field_value)) "Officer_Code"
,min(decode((x.field_name),'PT',x.field_value)) PT
--,min(decode((x.field_name),'CONTRACT_TYPE',x.field_value)) "CONTRACT_TYPE"--18-OCT-2012 Flexcube V.CL Release 7.12, Retro CITIUS#15094 (2), commented
,min(decode((x.field_name),'GL_COMP_CODE',x.field_value)) "GL_COMP_CODE"
,min(decode((x.field_name),'Loan_Purpose',x.field_value)) "Loan_Purpose"
,min(decode((x.field_name),'Note_Type',x.field_value)) "Note_Type"
,min(decode((x.field_name),'Prop_Type',x.field_value)) "Prop_Type"
--,min(decode((x.field_name),'FULL_DESC',x.field_value)) "FULL_ DESC" --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 changes here
,min(decode((x.field_name),'FULL_DESC',x.field_value)) "FULL_DESC" --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 changes here
,min(decode((x.field_name),'BANKRUPTCY',x.field_value)) "BANKRUPTCY"
,min(decode((x.field_name),'LOCKBOX_LOCATION',x.field_value)) LOCKBOX_LOCATION
,min(decode((x.field_name),'DT_Deal',x.field_value)) "DT_Deal"
,min(decode((x.field_name),'DT_Facility_ID',x.field_value)) "DT_Facility_ID"
--17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 changes start here
--,min(decode((x.field_name),'Tax Exempt Status - 1098',x.field_value)) "Tax Exempt Status"
--,min(decode((x.field_name),'Lien Indicator',x.field_value)) "Lien Indicator"
--,min(decode((x.field_name),'TDR Flag',x.field_value)) "TDR Flag"
,min(decode((x.field_name),'Tax Exempt Status - 1098',x.field_value)) "Tax_Exempt_Status"
,min(decode((x.field_name),'Lien Indicator',x.field_value)) "Lien_Indicator"
--,min(decode((x.field_name),'TDR Flag',x.field_value)) "TDR_Flag"--18-OCT-2012 Flexcube V.CL Release 7.12, Retro CITIUS#15094 (2), commented
--17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 changes end here
--19-OCT-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14972 Changes, starts
,min(decode((x.field_name),'RISK_SHARE_TYPE',x.field_value)) RISK_SHARE_TYPE
,min(decode((x.field_name),'INVESTOR_WHT',x.field_value)) INVESTOR_WHT
,min(decode((x.field_name),'CAP_CEILING',x.field_value)) CAP_CEILING
,min(decode((x.field_name),'Legal_Maturity_date',x.field_value)) Legal_Maturity_date
,min(decode((x.field_name),'Servicer_Code',x.field_value)) Servicer_Code
,min(decode((x.field_name),'Construction_Loan_Swap',x.field_value)) Construction_Loan_Swap
,min(decode((x.field_name),'Construction_Loan_Ref',x.field_value)) Construction_Loan_Ref
,min(decode((x.field_name),'Property_Type',x.field_value)) Property_Type
--19-OCT-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14972 Changes, ends
,min(decode((x.field_name),'ORG_FUND_AMT',x.field_value)) ORG_FUND_AMOUNT --18-OCT-2012 Flexcube V.CL Release 7.12, Retro CITIUS#15094 (1)
,x.contract_ref_no  "Contract_Ref_no"
--,b.external_Ref_no  "External Reference" --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 changes here
,b.external_Ref_no  "External_Reference" --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 changes here
from oltms_contract_userdef_fields x,OLDW_CONTRACT_MASTER b
WHERE x.contract_ref_no=b.contract_ref_no
and EXISTS 
(SELECT 1 
                FROM                   oltbs_interface_param_if y
                WHERE                 y.branch_code =  (SELECT ho_branch from oltm_bank)
                AND                      y.external_system = 'DEALTRAX'
                AND                       y.interface_code = 'DEALTRAX'
                AND                       y.param_type = 'CCC_PROOF_CODE'
                AND                       y.param_value = b.proof
)
and x.version_no=(select max(version_no) from oltms_contract_userdef_fields where contract_ref_no=x.contract_ref_no)
group by x.contract_ref_no,b.external_ref_no,b.module_code,b.branch_code,b.proof,b.contract_type with read only
*/
SELECT FACILITY_RISK
      ,OBLIGOR_RISK
      ,ADJ_LOAN_DESC
      ,LOAN_METHOD
      ,NEW_RATE_CAP
      ,PERIODIC_RATE_CAP
      ,REVIEW_DATE
      ,RATE_CAP_DECREASE
      ,RATE_CAP_INCREASE
      ,RATE_CAP_EXP_DT
      ,RATE_CAP_DEC_PCT
      ,RATE_CAP_INC_PCT
      ,REAMORT_CHANGE_DT
      ,USER_DEFINED
      ,BORR_TYPE
      ,CLASS_CODE
      ,ADMIN_CODE
      ,GL_MATRIX
      ,NT
      ,OFFICER_CODE
      ,PT
      ,GL_COMP_CODE
      ,LOAN_PURPOSE
      ,NOTE_TYPE
      ,PROP_TYPE
      ,FULL_DESC
      ,BANKRUPTCY
      ,LOCKBOX_LOCATION
      ,DT_DEAL
      ,DT_FACILITY_ID
      ,TAX_EXEMPT_STATUS
      ,LIEN_INDICATOR
      ,RISK_SHARE_TYPE
      ,INVESTOR_WHT
      ,CAP_CEILING
      ,LEGAL_MATURITY_DATE
      ,SERVICER_CODE
      ,CONSTRUCTION_LOAN_SWAP
      ,CONSTRUCTION_LOAN_REF
      ,PROPERTY_TYPE
      ,ORG_FUND_AMOUNT
      ,LOAN_SUB_PURPOSE		--20-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16658 changes here
      ,BASERTFUND			--20-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16658 changes here	  
      ,INTEREST_RESERVE--12-JUN-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#17033 changes
      ,CONTRACT_REF_NO
      ,EXTERNAL_REF_NO		EXTERNAL_REFERENCE
  FROM OLDW_CONTRACT_UDF b
 WHERE EXISTS (SELECT 1
                 FROM oltbs_interface_param_if y
                WHERE y.branch_code =  (SELECT ho_branch from oltm_bank)
                  AND y.external_system = 'DEALTRAX'
                  AND y.interface_code = 'DEALTRAX'
                  AND y.param_type = 'CCC_PROOF_CODE'
                  AND y.param_value = b.proof
              )
WITH READ ONLY
--04-JAN-2013 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15674 changes Ends
/
CREATE OR REPLACE SYNONYM olvws_contract_udf
FOR olvw_contract_udf
/