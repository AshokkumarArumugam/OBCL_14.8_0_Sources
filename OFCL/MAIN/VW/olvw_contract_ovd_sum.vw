CREATE OR REPLACE VIEW OLVW_CONTRACT_OVD_SUM ("BRANCH", "MODULE", "NO_OF_CONTRACTS", "NO_OF_OVDS") AS 
  (
/*-----------------------------------------------------------------------------------------------
**
** File Name    : OLVW_CONTRACT_OVD.VW
**
** Module       : OL
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY

    Changed By         : Surya Prabha S
    Changed On         : 02-Jan-2020
    Search String      : OBCL_14.4_LS_Multi_Auth
    Change Reason      : Multi Authorization changes.

*/
Select a.branch,a.module,a.count1 no_of_contracts , b.count2 no_of_ovds
	from
		( select (SELECT sypks_utils.get_branch(CONTRACT_REF_NO) FROM DUAL) branch, module,count(distinct contract_ref_no) count1
			from oltb_contract_ovd e, ertbs_msgs f
			where
			e.err_code = f.err_code and
			f.type = 'D'
			AND f.Language = global.lang 
			AND NVL(e.ovd_status,'U') <> 'A' /*and -- OBCL_14.4_LS_Multi_Auth changes starts
			not exists ( select contract_ref_no from oltbs_contract
					 where contract_ref_no = e.contract_ref_no
						and auth_status = 'A') */  -- OBCL_14.4_LS_Multi_Auth changes ends                  	
			and exists (select v.contract_ref_no from Olvw_Contract_Ovd v
                  where v.contract_ref_no = e.contract_ref_no)      
			group by sypks_utils.get_branch(CONTRACT_REF_NO), module) a,
		( select (SELECT sypks_utils.get_branch(CONTRACT_REF_NO) FROM DUAL) branch,module, count(*) count2
			from oltb_contract_ovd c, ertbs_msgs d
			where
			c.err_code = d.err_code and
			d.type = 'D'
			AND d.Language = global.lang  
			and NVL(c.ovd_status,'U') <> 'A' /* and -- OBCL_14.4_LS_Multi_Auth changes starts
			not exists (select contract_ref_no from oltbs_contract
					where contract_ref_no = c.contract_ref_no
						and auth_status = 'A')  */   -- OBCL_14.4_LS_Multi_Auth changes ends    	
      and exists (select v.contract_ref_no from Olvw_Contract_Ovd v
                  where v.contract_ref_no = c.contract_ref_no)      
			group by sypks_utils.get_branch(CONTRACT_REF_NO), module ) b
	where
	a.branch = b.branch
	and a.module = b.module
)
/