CREATE OR REPLACE FORCE VIEW olvw_ucc_details AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_ucc_details.vw
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
06-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO ,CITIUS#15353 changes New view for DealTrax UCC data
--------------------------------------------------------------------------------------------------
*/
SELECT
CONTRACT_REF_NO
,EXTERNAL_REF_NO
,UCC_CODE	
,UCC_FILING_DATE
,UCC_REFILING_DATE
,UCC_TYPE	
,UCC_FILING_STATE
,UCC_FILING_COUNTY
,UCC_CUSTOMER_NAME
FROM OLDW_UCC_DETAILS x
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
CREATE OR REPLACE SYNONYM olvws_ucc_details 
FOR olvw_ucc_details
/