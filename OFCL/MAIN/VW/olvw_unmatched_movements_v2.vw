CREATE OR REPLACE FORCE VIEW	olvw_unmatched_movements_v2
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_unmatched_movements_v2.VW
**
** Module      : Core Services
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/* ---------------------------------------- Change history ------------------------------------------
23-Jul-2003	SFR PLC40110128		Exclude the 9 subgl process codes..
30-Jul-2003	SFR PLC40110133		Subgl process codes to be included
06-Aug-2003	SFR PLC40110142		View should only exclude FX contingents and not all FX entries.
11-Aug-2003	SFR PLC40110146		To include PNL entries in the trestel POSVER handoff
05-JAN-2005	PLC46080023			Retro of PLC40506065 - Lcy had been hard-coded to GBP.  
						This has been replaced to global.lcy
---------------------------------------------------------------------------------------------------- 
*/
SELECT		module,
		trn_ref_no,
		ac_ccy,
		value_dt,
		ac_branch,
		decode(category,'1','Real','2','Real','5','Contingent','6','Contingent') real_or_contingent,
		sum(decode(drcr_ind,'D',1,0) * NVL(fcy_amount,0)) fcy_dr,
		sum(decode(drcr_ind,'D',1,0) * NVL(lcy_amount,0)) lcy_dr,
		sum(decode(drcr_ind,'C',1,0) * NVL(fcy_amount,0)) fcy_cr,
		sum(decode(drcr_ind,'C',1,0) * NVL(lcy_amount,0)) lcy_cr
FROM 		oltbs_daily_log_ac 
WHERE 		delete_stat 	<> 'D'
--AND		category	IN ('1','2','5','6')						-- SFR PLC40110142
--AND		module		<> 'FX'								-- SFR PLC40110142
AND		(category	IN ('1','2') or (category in ('5','6') and module <> 'FX'))	-- SFR PLC40110142
--AND	(SELECT sypks_utils.get_product(TRN_REF_NO) FROM DUAL) NOT IN ('ZSDJ','ZSDM','ZSDC','ZSRC','ZSRM','ZSRJ','ZSEA','ZSEM','ZSEJ')	-- SFR PLC40110128, SFR PLC40110133
GROUP BY        module,
		trn_ref_no,
		ac_ccy,
		value_dt,
		lcy_amount,
		fcy_amount,
		ac_branch,
		decode(category,'1','Real','2','Real','5','Contingent','6','Contingent')
HAVING		sum(decode(drcr_ind,'D',-1,1) * NVL(fcy_amount,0)) <> 0
OR		sum(decode(drcr_ind,'D',-1,1) * NVL(lcy_amount,0)) <> 0
-- SFR PLC40110146 starts
UNION
SELECT		module,
		trn_ref_no,
		global.lcy, --'GBP',--07-OCT-2004 PLC40506065 - Changed to Global.lcy
		value_dt,
		ac_branch,
		decode(category,'3','Real','4','Real') real_or_contingent,
		0 fcy_dr,
		sum(decode(drcr_ind,'D',1,0) * NVL(lcy_amount,0)) lcy_dr,
		0 fcy_cr,
		sum(decode(drcr_ind,'C',1,0) * NVL(lcy_amount,0)) lcy_cr
FROM 		oltbs_daily_log_ac 
WHERE 		delete_stat 	<> 'D'
AND		category	IN ('3','4')
GROUP BY        module,
		trn_ref_no,
		global.lcy, --'GBP',--07-OCT-2004 PLC40506065 - Changed to Global.lcy
		value_dt,
		lcy_amount,
		fcy_amount,
		ac_branch,
		decode(category,'3','Real','4','Real')
HAVING		sum(decode(drcr_ind,'D',-1,1) * lcy_amount) <> 0
-- SFR PLC40110146 ends
/
CREATE OR REPLACE SYNONYM olvws_unmatched_movements_v2 FOR olvw_unmatched_movements_v2
/