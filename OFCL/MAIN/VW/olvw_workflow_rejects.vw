CREATE OR REPLACE force VIEW olvw_workflow_rejects ( MODULE_CODE, 
BRANCH_CODE, REFERENCE_NO, EVENT_SEQ_NO, EVENT_CODE, 
WORKFLOW_STATUS, AUTH_STATUS ) AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_workflow_rejects.VW
**
** Module		: CS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
** 
----------------------------------------------------------------------------------------------------
*/
 (
SELECT  Module_code,
                Branch branch_code,
                Contract_ref_no,
                Latest_event_seq_no,
                Curr_event_code,
                Workflow_status,
                Auth_status
FROM    oltbs_contract
WHERE   Module_code     = 'OL'
AND     Workflow_status = 'JS'
UNION
SELECT 'OL' Module_code,
                Branch_code,
                Reference_no,
                1,
                'INIT' event_code,
                Workflow_status,
                Auth_stat
FROM    oltbs_jrnl_log_de
WHERE   Workflow_status = 'JS'
)
ORDER BY Module_code,Branch_code
/

CREATE or replace SYNONYM olvws_workflow_rejects FOR olvw_workflow_rejects
/