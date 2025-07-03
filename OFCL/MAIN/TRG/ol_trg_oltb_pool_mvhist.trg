Create or Replace Trigger ol_trg_oltb_pool_mvhist
/*----------------------------------------------------------------------------------------------------
**
** File Name	: ol_trg_oltb_pool_mvhist.trg
**
** Module		: MI
**
**	This source is part of the Oracle Banking Corporate Lending  Software Product.   
**	Copyright © 2007 - 2018  Oracle and/or its affiliates.  All rights reserved.   
**	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form 
**  or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated
**  in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
**	Oracle Financial Services Software Limited.
**	Oracle Park, Off Western Express Highway,
**	Goregaon (East), 
**	Mumbai - 400 063, India.

----------------------------------------------------------------------------------------------------
*/
After Delete on OLTB_POOL
For Each Row
declare
  l_fin_year                   varchar2(9);
  l_period_code                varchar2(3);

Begin

	Begin
		Select current_cycle, current_period into l_fin_year, l_period_code
		From oltms_branch
		Where branch_code = :old.branch_code;
	Exception
		When others Then
			raise_application_error(-20001 , 'Select from oltms_branch failed in ol_trg_oltb_pool_mvhist');
			raise_application_error(-20001 , 'Trigger trg_mitb_pool_mvhistFailed');
	End;


	Insert into OLTB_POOL_HISTORY
		(branch_code,
		ac_no,
		ac_type,
		prod_code,
		ccy_code,
		cif,
		pool_code,
		calc_method,
		dr_avg_bal_mtd_fcy,
		dr_avg_bal_mtd_lcy,
		cr_avg_bal_mtd_fcy,
		cr_avg_bal_mtd_lcy,
		dr_pool_daily_fcy,
		dr_pool_daily_lcy,
		cr_pool_daily_fcy,
		cr_pool_daily_lcy,
		dr_pool_pmadj_dly_fcy,
		dr_pool_pmadj_dly_lcy,
		cr_pool_pmadj_dly_fcy,
		cr_pool_pmadj_dly_lcy,
		dr_pool_pyadj_dly_fcy,
		dr_pool_pyadj_dly_lcy,
		cr_pool_pyadj_dly_fcy,
		cr_pool_pyadj_dly_lcy,
		dr_pool_reval_dly_fcy,
		dr_pool_reval_dly_lcy,
		cr_pool_reval_dly_fcy,
		cr_pool_reval_dly_lcy,
		dr_pool_mtd_fcy,
		dr_pool_mtd_lcy,
		cr_pool_mtd_fcy,
		cr_pool_mtd_lcy,
		dr_pool_reval_mtd_fcy,
		dr_pool_reval_mtd_lcy,
		cr_pool_reval_mtd_fcy,
		cr_pool_reval_mtd_lcy,
	--
	-- fcc4.0 june2002 starts
	--
		DR_POOL_PMADJ_MTD_FCY,
		CR_POOL_PMADJ_MTD_FCY,
		DR_POOL_PMADJ_MTD_LCY,
		CR_POOL_PMADJ_MTD_LCY,
		DR_POOL_PYADJ_MTD_FCY,
		CR_POOL_PYADJ_MTD_FCY,
		DR_POOL_PYADJ_MTD_LCY,
		CR_POOL_PYADJ_MTD_LCY,
		RAC_FCY,                
		RAC_LCY ,               
	--
	-- fcc4.0 june2002 starts
	--
		eff_date,
		period_code,
		fin_year)
	VALUES
		(:old.branch_code,
		:old.ac_no,
		:old.ac_type,
		:old.prod_code,
		:old.ccy_code,
		:old.cif,
		:old.pool_code,
		:old.calc_method,
		:old.dr_avg_bal_mtd_fcy,
		:old.dr_avg_bal_mtd_lcy,
		:old.cr_avg_bal_mtd_fcy,
		:old.cr_avg_bal_mtd_lcy,
		:old.dr_pool_daily_fcy,
		:old.dr_pool_daily_lcy,
		:old.cr_pool_daily_fcy,
		:old.cr_pool_daily_lcy,
		:old.dr_pool_pmadj_dly_fcy,
		:old.dr_pool_pmadj_dly_lcy,
		:old.cr_pool_pmadj_dly_fcy,
		:old.cr_pool_pmadj_dly_lcy,
		:old.dr_pool_pyadj_dly_fcy,
		:old.dr_pool_pyadj_dly_lcy,
		:old.cr_pool_pyadj_dly_fcy,
		:old.cr_pool_pyadj_dly_lcy,
		:old.dr_pool_reval_dly_fcy,
		:old.dr_pool_reval_dly_lcy,
		:old.cr_pool_reval_dly_fcy,
		:old.cr_pool_reval_dly_lcy,
		:old.dr_pool_mtd_fcy,
		:old.dr_pool_mtd_lcy,
		:old.cr_pool_mtd_fcy,
		:old.cr_pool_mtd_lcy,
		:old.dr_pool_reval_mtd_fcy,
		:old.dr_pool_reval_mtd_lcy,
		:old.cr_pool_reval_mtd_fcy,
		:old.cr_pool_reval_mtd_lcy,
	--
	-- fcc4.0 june2002 starts
	--
		:old.DR_POOL_PMADJ_MTD_FCY,
		:old.CR_POOL_PMADJ_MTD_FCY,
		:old.DR_POOL_PMADJ_MTD_LCY,
		:old.CR_POOL_PMADJ_MTD_LCY,
		:old.DR_POOL_PYADJ_MTD_FCY,
		:old.CR_POOL_PYADJ_MTD_FCY,
		:old.DR_POOL_PYADJ_MTD_LCY,
		:old.CR_POOL_PYADJ_MTD_LCY,
		:old.RAC_FCY,                
		:old.RAC_LCY ,               
	--
	-- fcc4.0 june2002 starts
	--		
		:old.eff_date,
		l_period_code,
		l_fin_year);
Exception
    When Others Then
		raise_application_error(-20001 , 'Trigger ol_trg_oltb_pool_mvhist Failed');
End;
/