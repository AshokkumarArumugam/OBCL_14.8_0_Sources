CREATE OR REPLACE force VIEW olvw_cusip
AS
/*
------------------------------------------------------------------------------------------------------------------------
**
** File Name : olvw_cusip.VW
**
** Module  : ALL
**  This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or 
	transmitted in any form or by any means, electronic, mechanical, photographic, graphic,
	optic recording or otherwise, translated in any language or computer language, 
	without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
Change History
26-NOV-2015 CITIUS#21237 Internal change - Subledger Activity by CUSIP.
*/
SELECT /*+ parallel */ * from 
(
	(	SELECT  contract_ref_no , 'TL' module_code, cusip_no  
		FROM    tltbs_position_contract n 
	)
UNION
	(	
		SELECT DISTINCT lcm.contract_ref_no, 'OL' module_code, lcm.cusip_no
		FROM 	OLTB_CONTRACT_MASTER lcm, OLTB_CONTRACT cs 
		WHERE 	lcm.contract_ref_no=cs.contract_ref_no
		AND 	lcm.version_no=cs.latest_version_no
		AND		cs.module_code = 'OL'
		AND		cs.product_type = 'C' 
	)
UNION	
	(
		SELECT 	DISTINCT lcm.contract_ref_no, 'TL' module_code, lcm.cusip_no
		FROM 	TLTB_CONTRACT_MASTER lcm, OLTB_CONTRACT cs
		WHERE	lcm.contract_ref_no=cs.contract_ref_no
		AND 	lcm.version_no=cs.latest_version_no
	)
UNION
	(	SELECT  DISTINCT o.contract_ref_no,'LP' module_code,o.cusip_no
		FROM    OLTB_CONTRACT_MASTER 	o
			 ,	oltbs_contract 			p
		WHERE    o.contract_ref_no   =   p.contract_ref_no
		AND      o.version_no      =  p.latest_version_no
		AND   	 o.contract_ref_no   =
					(
					  SELECT   borrower_ref_no
					  FROM   	lbtbs_part_proc_stat
					  WHERE   participant_ref_no =  p.contract_ref_no
					) 
	)
UNION
 	(
 		SELECT  trn_ref_no as contract_ref_no  ,module module_code, cusip_no
 		FROM 	oltbs_long_term_alloc   
 	)
UNION
	(
 		SELECT  trn_ref_no as contract_ref_no  ,module  module_code, cusip_no
 		FROM 	oltbs_long_term_alloc_hist  
 	)
UNION
	(	
		SELECT  trn_ref_no as contract_ref_no  ,module  module_code, cusip_no
		FROM	oltbs_dly_log_exp_reclass  
	)
UNION
	(	
		SELECT  trn_ref_no as contract_ref_no  ,module  module_code, cusip_no
		FROM	oltbs_dly_log_exp_reclass_hist  
	)
UNION
	(	SELECT  old_reclass_ref_no as contract_ref_no   ,module  module_code, current_cusip_no  
		FROM   	OLTB_CUSIP_RECLASS_BAL_DET 
	)
UNION
	(
		SELECT  new_reclass_ref_no as contract_ref_no    ,module  module_code, new_cusip_no   
		FROM   	OLTB_CUSIP_RECLASS_BAL_DET 
	)
)
/
CREATE or replace SYNONYM olvws_cusip FOR olvw_cusip
/