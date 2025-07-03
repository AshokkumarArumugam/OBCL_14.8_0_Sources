create or replace force view olvw_cusip_entries
as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_cusip_entries.vw
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
----------------------------------------------------------------------------------------
*/
/*  
03-OCT-2012 CITIUS#15031 Changes related to CFPI
27-NOV-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO  15185,CFPI Genesis Interface changes
*/
select 	decode(module,'TL',(select cusip_no 
							from TLTB_CONTRACT_MASTER b 
							where a.trn_ref_no = b.contract_ref_no 
							and rownum=1) ,
						'LP',(select cusip_no
								from   OLTB_CONTRACT_MASTER b,
									   oltbs_contract c
								where  b.contract_ref_no = (select borrower_ref_no 
										  			   	   from    lbtbs_part_proc_stat
														   where   participant_ref_no =a.trn_ref_no
														   )	
								and    b.contract_ref_no = c.contract_ref_no
								and    b.version_no 	 = c.latest_version_no						 	  											
								and   c.contract_status <> 'V'
								and   c.product_type = 'C'
							) ,
							(select cusip_no 
							from 	OLTB_CONTRACT_MASTER b ,
									oltbs_contract c
							where a.trn_ref_no = c.contract_ref_no 
							and   b.contract_reF_no = c.contract_ref_no
							and   b.version_no 		= c.latest_version_no
							and   c.contract_status <> 'V'
							)
			) cusip_no ,module,
	trn_reF_no contract_reF_no,event_sr_no event_seq_no,event,ac_branch,
	ac_no,drcr_ind,amount_tag,ac_ccy,fcy_amount,lcy_amount,
	decode(ac_branch,'006',decode(accounting_role,'ASSETGL','STDT-FUND-CTL2',accounting_role),'06A',decode(accounting_role,'ASSETGL','STDT-FUND-CTL2',accounting_role),accounting_role) accounting_role
	,related_customer,trn_dt,value_dt,
 	(
 	select	txn_mis_1
 	from	oltbs_class_mapping
 	where	unit_ref_no = a.trn_ref_no
 	and		unit_type = 'R'
 	)expense_code
from   OLTB_DAILY_LOG_AC a
--27-NOV-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO  15185 starts
--where  delete_stat <> 'D'
where  NVL(delete_stat,'X') <> 'D'
--27-NOV-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO  15185
/