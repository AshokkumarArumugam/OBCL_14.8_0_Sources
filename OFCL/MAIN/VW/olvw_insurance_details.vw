CREATE OR REPLACE FORCE VIEW olvw_insurance_details
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_insurance_details.vw
**
** Module	: INTERFACE
**
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
--------------------------------------------------------------------------------------------------
*/
/*-------------------------------------------------------------------------------------------------
** Change Histroy:
** 31-AUG-2012 CITIUS#14745 changes: Added for Dealtrax Data ware housing changes 
17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812, removed spaces and included underscore in few lables
26-FEB-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#16265, Insurance company in olvw_insurance_details to pick the EXTERNAL_REFERENCE_NUMBER UDF associated to the customer in Flexcube.
15-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16607, New Field Effective_Dt added. Value to be the Effective_date from OLTM_INSURANCE_MASTER.
03-JUN-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16410, New filtering Logic in case of Insurance records.
               (1) Include only polices with specific Insurance_Types listed.
               (2) Include if [Insurance_Type = 'FP' and the Insurance Expiration Date is in the future].
               (2) Include if [Insurance_Type = 'FP' and the Insurance Expiration Date is in the future].
15-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#17895- Following Retro was missing in Banglore unit.
							1) 25-MAR-2013 CITIUS#16901 changes,closed and cancelled policies should be excluded from dealtrax feed, copyright clause has been changed
--------------------------------------------------------------------------------------------------
*/
SELECT effective_date Effective_Dt, -- 15-MAY-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16607
        expiry_date    "Expy_Dt",
        seq_no         "Seq_No",
        policy_number  Policy_No,
        insurance_type "Ins_Type",
        property_code  "Property_code",
        -- 26-FEB-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#16265 changes starts
        --insurance_agent "Ins_company",
        olpks_userdef_flds.fn_get_udf_val('STDCIF',
                                          'EXTERNAL_REFERENCE_NUMBER',
                                          x.service_provider || '~') "Ins_company",
        -- 26-FEB-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#16265 changes ends
        x.contract_ref_no "Contract_Ref_no",
        --y.external_ref_no "External Reference" --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
        y.external_ref_no "External_Reference" --17-SEP-2012 Flexcube V.CL Release 7.12, Retro, CITIUS#14812 Changes here
   FROM oltms_insurance_master x, OLDW_CONTRACT_MASTER y
  WHERE x.contract_ref_no = y.contract_ref_no
   --15-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#17895 Changes starts
     	--25-MAR-2013 CITIUS#16901 changes start
       AND x.record_stat = 'O'
       AND NVL(policy_status, 'X') <> 'C'
     --25-MAR-2013 CITIUS#16901 changes end
   --15-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 RETRO CITIUS#17895 Changes ends
       -- 03-JUN-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16410, starts
          AND ((insurance_type = 'FP' AND expiry_date > (SELECT today from sttms_dates WHERE branch_code = y.branch_code))
                OR
               (insurance_type <> 'FP' AND instr((SELECT param_value
                                                    FROM oltbs_interface_param_if
                                                   WHERE branch_code = (SELECT ho_branch from oltm_bank)
                                                     AND external_system = 'DEALTRAX'
                                                     AND interface_code = 'DEALTRAX'
                                                     AND param_type = 'INSURANCE_TYPE'
                                                  )
                                                  ,insurance_type
                                                 ) > 0
               )
              )
   -- 03-JUN-2012 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#16410, ends
       and EXISTS 
(SELECT 1 
                FROM                   oltbs_interface_param_if z
                WHERE                 z.branch_code =  (SELECT ho_branch from oltm_bank)
                AND                      z.external_system = 'DEALTRAX'
                AND                       z.interface_code = 'DEALTRAX'
                AND                       z.param_type = 'CCC_PROOF_CODE'
                AND                       z.param_value = y.proof
)
with read only
/
CREATE OR REPLACE SYNONYM olvws_insurance_details
FOR olvw_insurance_details
/