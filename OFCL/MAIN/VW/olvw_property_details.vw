CREATE OR REPLACE FORCE VIEW olvw_property_details
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_property_details.vw
**
** Module	: INTERFACE
**
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
--------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------
** Change Histroy:
** 31-AUG-2012 CITIUS#14745 changes: Added for Dealtrax Data ware housing changes
** 04-SEP-2012 CITIUS#14767 Changes: OLTB_CONTRACT_ESCROW_VDBAL table has been used instead of using OLTB_CONTRACT_ESCROW_LINKAGES
17-SEP-2012 Flexcube V.CL Release 7.12, Retro,CITIUS#14812 changes, removed spaces and included underscore in few lables
24-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO,CITIUS#15630 , Multiple records populated for a given Contract and Property code 
--------------------------------------------------------------------------------------------------
*/
 SELECT 
-- 24-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO,CITIUS#15630 starts
--decode(y.escrow_type,'ESC2','Y','N') Collect_Ins_Esc,
--decode(y.escrow_type,'ESC1','Y','N') Collect_Tax_Esc,
nvl((SELECT 'Y'
       FROM DUAl
      WHERE EXISTS (SELECT 1 FROM OLTB_CONTRACT_ESCROW_VDBAL WHERE contract_ref_no = z.contract_ref_no AND escrow_type = 'ESC2')
    )
   ,'N') Collect_Ins_Esc,
nvl((SELECT 'Y'
       FROM DUAl
      WHERE EXISTS (SELECT 1 FROM OLTB_CONTRACT_ESCROW_VDBAL WHERE contract_ref_no = z.contract_ref_no AND escrow_type = 'ESC1')
    )
   ,'N') Collect_Tax_Esc,
--24-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO,CITIUS#15630, ends
DATE_CONSTRUCTED "Const_Dt",
COUNTY "County",
STREET_NO_1 "Street1",
STREET_NO_2 "Street2",
 x.contract_ref_no "Contract_Ref_no",
PROP_MANAGER "Mgmt_Agent",
MGMT_CONTACT_ON_SITE "Mgmt_Contact",
NUMBER_OF_STORIES "No_ of_ Stories",
OVERALL_RATING "Overall_rating",
OWNER_OCC "Owner_occupied",
PROPERTY_CODE "Prop_code",
PROPERTY_NAME "Prop_Name",
PROPERTY_CODE  "Prop_ Sequence",
STATE "State",
STREET_NAME_1 "Street_Name1",
STREET_NAME_2  "Street_ Name2",
GROSS_SQ_FT "Gross_Area",
VILLAGE "Village",
ZIP "Zip_Code",
LEASEHOLD  "Lease_ Hold",
z.external_ref_no "External_Reference"
FROM OLTM_PROPERTY_MASTER x,
--OLTB_CONTRACT_ESCROW_VDBAL y,--24-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO,CITIUS#15630
OLDW_CONTRACT_MASTER z
  --24-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO,CITIUS#15630 starts
    --WHERE x.contract_ref_no=y.contract_ref_no
    --and y.contract_ref_no=z.contract_ref_no
    --and y.value_date=(select max(value_date) 
    --                  from OLTB_CONTRACT_ESCROW_VDBAL a
    --                  where a.contract_ref_no=y.contract_ref_no)
    WHERE x.contract_ref_no=z.contract_ref_no
-- 24-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO,CITIUS#15630 ends
  and EXISTS 
(SELECT 1 
                FROM                   oltbs_interface_param_if y
                WHERE                 y.branch_code =  (SELECT ho_branch from oltm_bank)
                AND                      y.external_system = 'DEALTRAX'
                AND                       y.interface_code = 'DEALTRAX'
                AND                       y.param_type = 'CCC_PROOF_CODE'
                AND                       y.param_value = z.proof
)
with read only
/
CREATE OR REPLACE SYNONYM olvws_property_details
FOR olvw_property_details
/