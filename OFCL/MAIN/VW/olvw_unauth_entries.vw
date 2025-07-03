CREATE OR REPLACE force VIEW olvw_unauth_entries (	BRANCH_CODE
						,DEPT_CODE
						,MODULE
						,REFERENCE_NO
						,EVENT
						,USER_ID
						) AS 
/*----------------------------------------------------------------------------------------------------
File : olvw_unauth_entries.vw
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
SELECT	a.branch
	,a.department_code 
	,a.module_code
	,a.contract_ref_no
	,b.event_code
	,b.maker_id
FROM	oltbs_contract a,
	oltbs_contract_event_log b
WHERE	a.auth_status = 'U'
AND	a.contract_ref_no = b.contract_ref_no
AND	a.latest_version_no = b.event_seq_no
AND	a.contract_status <> 'H'
AND	a.module_code <> 'SI'
UNION
SELECT	c.branch_code
	,c.department_code
	,'OL'
	,to_char( c.batch_no)
	,'INIT'
	,c.last_oper_id
FROM 	oltbs_batch_master c
WHERE	c.auth_stat = 'U'
/
CREATE or replace SYNONYM olvws_unauth_entries FOR olvw_unauth_entries
/