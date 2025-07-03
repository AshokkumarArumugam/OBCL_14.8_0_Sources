CREATE OR REPLACE FORCE VIEW lbvw_mssfwdpr AS
/*----------------------------------------------------------------------------------------------------
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
SELECT contract_ref_no,user_ref_no,counterparty,event_code,currency,amount,value_date,process_status,pmnt_value_dt,confirm,hold_transaction,sanction_checked,sc_na,
maker_id,maker_dt_stamp,checker_id,checker_dt_stamp,mod_no,record_stat,auth_stat,once_auth,seq_no
FROM LBTB_CONTRACT_FWDEVENT A
WHERE value_date between --(sysdate - (select forward_process_archive_days from oltms_branch_parameters where branch_code=Global.current_branch)) -- 25974256  CHANGES
      (GLOBAL.application_date - (select forward_process_archive_days from oltms_branch_parameters where branch_code=Global.current_branch and module_code=(select module_code from oltbs_contract where contract_ref_no=A.contract_ref_no)))
                  --and (sysdate + (select forward_limit_days from oltms_branch_parameters where branch_code=Global.current_branch))  -- 25974256  CHANGES
                  and (GLOBAL.application_date + (select forward_limit_days from oltms_branch_parameters where branch_code=Global.current_branch and module_code=(select module_code from oltbs_contract where contract_ref_no=A.contract_ref_no)))
			and  contract_ref_no IN (select contract_ref_no from oltbs_contract where branch=Global.current_branch
									and module_code IN ('LB','LB','OL','TL') and contract_status!='V' and auth_status='A')
			--and process_status='A' -- 25974256  CHANGES
/
create OR REPLACE synonym LBVWS_MSSFWDPR for lbvw_mssfwdpr
/