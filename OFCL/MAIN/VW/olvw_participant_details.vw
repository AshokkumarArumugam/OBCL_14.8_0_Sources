CREATE OR REPLACE FORCE VIEW olvw_participant_details AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_participant_details.vw
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
--------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------
** Change Histroy:
** 31-AUG-2012 CITIUS#14745 changes: Added for Dealtrax Data ware housing changes
17-SEP-2012 Flexcube V.CL Release 7.12, Retro,CITIUS#14812 changes, removed spaces and included underscore in few lables 
18-OCT-2012 Flexcube V.CL Release 7.12, Retro CITIUS#15094, New fileds added - INVESTOR_NAME
--------------------------------------------------------------------------------------------------*/
SELECT SERVICE_FEE_RATE "SERVICE_FEE_RATE",
PARTICIPATION_RATIO "Participation_Ratio",
CONTRACT_REF_NO "Contract_Ref_no",
INVESTOR_NUMBER "Investor_Number",
INVESTOR_NAME, --18-OCT-2012 Flexcube V.CL Release 7.12, Retro CITIUS#15094
SELF_PARTICIPANT "Self_Participant",
EXTERNAL_REF_NO "External_Reference" 
FROM OLDW_PARTICIPANT_DETAILS x
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
CREATE OR REPLACE SYNONYM olvws_participant_details
FOR olvw_participant_details 
/