create or replace FORCE view tlvw_airs_position_feed
as
/*
--------------------------------------------------------------------------------------------------------
**
** File Name  : tlvw_airs_position_feed.VW
**
** Module   : Interface
**
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
05-JUN-2014 CITIUS#19044 New Feed AIRS - Volcker Feed.
09-JUN-2014 CITIUS#19063 Additional changes for AIRS
				Logic for ex_rate.
				Firm Acct Mnemonic logic changed
				NVL of cusip_no added with contract_Ref_no.
11-JUN-2014 CITIUS#19065 changes. AIRS feed generation Changes and removing flexfin as for product restriction added.
30-JUL-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 RETRO CITIUS#19086 changes,Position details will be sent even when the net position is zero if 
			1.	There is a settled XXPOSITIONS
			2.	Or there is an active trade under the position
			3.	Or if there is any activity happened in that position
*/
select 	cusip,
		acct_mnem,
		trd_dt_posn_qty_ltd,
		fwd_lng_shrt_ind,
		ccy_cod,
		mkt_prc,
		usd_fx_rt,
		trd_dt_posn_qty_ltd orig_face_trd_dt_posn_qty_ltd,
		round(((trd_dt_posn_qty_ltd) * mkt_prc / 100),2) mv_ltd_tranal,
		acct_id,
		fii,
		prim_sndy_flag,
		urel_g_l_on_inv_ltd_tranal,
		--11-JUN-2014 CITIUS#19065 changes. start (removing flexfin)
		--(select legal_entity_code from flexfin.tltms_firmac_mcc_detail x where x.firm_acct_mnemonic = acct_mnem)cgm_lgl_enty_cod,
		(select legal_entity_code from tltms_firmac_mcc_detail x where x.firm_acct_mnemonic = acct_mnem)cgm_lgl_enty_cod,
		--11-JUN-2014 CITIUS#19065 changes. end
		stgy_cod,
		ims_acct_no,
		sd_qty,
		accrtn_inv_ltd_tranal,
		prin_inv_ltd_tranal,
		fit_cod		
from
(
	select  ltcb.cusip_no cusip,
			backup_utils.fn_get_firmacc(ltpc.cusip_no,ltpc.position_identifier,ltpc.expense_code) acct_mnem,
			nvl(ltcb.closed_settled_position,0) + nvl(ltcb.closed_unsettled_position,0)trd_dt_posn_qty_ltd,
			trade_ccy ccy_cod,
			backup_utils.fn_get_market_price(ltcb.cusip_no)mkt_prc,
			--olpks_bo_cypks.fn_get_rate_on_quotation(ltpc.branch,ltcb.trade_ccy,sb.branch_lcy) usd_fx_rt,--CITIUS#19063
			round(backup_utils.fn_get_exrate(ltpc.branch,ltcb.trade_ccy,sb.branch_lcy),9) usd_fx_rt,--CITIUS#19063
			'R' 	fwd_lng_shrt_ind,
			null 	acct_id,
			null 	fii,
			'S' 	prim_sndy_flag,
			null 	urel_g_l_on_inv_ltd_tranal,
			null 	stgy_cod,
			null	ims_acct_no,
			null 	sd_qty,
			null 	accrtn_inv_ltd_tranal,
			null 	prin_inv_ltd_tranal,
			null 	fit_cod
	from	oltms_branch					sb,
			tltbs_position_contract         ltpc,
			tltbs_current_dated_balance     ltcb,
			oltbs_contract					cst
	where   sb.branch_code                	=        ltpc.branch
	and     ltpc.position_identifier		=        ltcb.position_identifier 
	and		ltpc.contract_ref_no			=		 cst.contract_ref_no
	and		cst.contract_status				=		'A'
	and		nvl(cst.department_code,'ALL')	in		(
														select 	decode(mapping_value,'ALL',nvl(cst.department_code,'ALL'),mapping_value) 
														from 	OLTB_INTERFACE_PARAM_IF 
														where  	interface_code 	=	'AIRS' 
														and 	param_type		=	'PROOF' 
													)
	--11-JUN-2014 CITIUS#19065 changes. start
	and		cst.product_code	NOT IN		(
											select 	mapping_value
											from 	OLTB_INTERFACE_PARAM_IF 
											where  	interface_code 	=	'AIRS' 
											and 	param_type		=	'EXCLUDE-PRD-LT' 
											)	
	--11-JUN-2014 CITIUS#19065 changes. end
	and     ltpc.cusip_no                	=        ltcb.cusip_no
	and     ltpc.expense_code        		=        ltcb.expense_code 
	and		ltpc.cusip_no				not like 	'%#%'	--Change##
	and     ltpc.event_seq_no        		=        
													(
														select	max(event_seq_no)
														from	tltbs_position_contract
														where	cusip_no                 	= ltpc.cusip_no
														and		position_identifier         = ltpc.position_identifier
														and     expense_code                = ltpc.expense_code
													)
	--CITIUS#19086 Starts
	and     (
				(
					(nvl(ltcb.closed_settled_position,0) + nvl(ltcb.closed_unsettled_position,0)) <> 0
				) 
				or
			 	(
			 		nvl(ltcb.closed_settled_position,0) <> 0 
			 		or 
			 		nvl(ltcb.closed_unsettled_position,0) <> 0
			 	) 
				or
				exists 
				(
					select 	1 
					from 	TLTB_CONTRACT_MASTER a,
							oltbs_contract b 
					where 	a.contract_ref_no = b.contract_ref_no 
					and 	a.version_no 	  = b.latest_version_no
					and 	a.cusip_no 		  = ltcb.cusip_no 
					and 	a.portfolio 	  = ltcb.position_identifier 
					and 	a.expense_code    = ltcb.expense_code  
					and 	b.contract_status = 'A'
				) 
				or
				exists 
				(
					select 	1
					from   	TLTB_TXN_ACTIVITY_POSITION aa
					where  	activity_date	  = (	
													select 	today 
													from 	sttm_dates 
													where 	branch_code = ltpc.branch
												)
					and 	aa.cusip_no 	  = ltcb.cusip_no 
					and 	aa.position_identifier  = ltcb.position_identifier 
					and 	aa.expense_code   = ltcb.expense_code
				 )   
			 )	
	--CITIUS#19086 Ends
)
--where	nvl(trd_dt_posn_qty_ltd,0)			<>		0	--Change##	--CITIUS#19086
union all
select 
	cusip,
	acct_mnem,
	trd_dt_posn_qty_ltd,
	fwd_lng_shrt_ind,
	ccy_cod,
	mkt_prc,
	usd_fx_rt,
	trd_dt_posn_qty_ltd orig_face_trd_dt_posn_qty_ltd,
	trd_dt_posn_qty_ltd mv_ltd_tranal,
	acct_id,
	fii,
	prim_sndy_flag,
	urel_g_l_on_inv_ltd_tranal,
	cgm_lgl_enty_cod,
	stgy_cod,
	ims_acct_no,
	sd_qty,
	accrtn_inv_ltd_tranal,
	prin_inv_ltd_tranal,
	fit_cod		
from
(
	select  
		nvl(x.cusip_no,x.contract_ref_no) cusip,--CITIUS#19063 nvl added
		--CITIUS#19063 Started
		--backup_utils.fn_get_firmacc(null,null,txn_mis_1) acct_mnem,
		NVL(
			NVL(
				 (select external_value from oltms_translation where source_code = 'AIRS' and translation_type = 'FIRMACC' and internal_value = m.txn_mis_1 and internal_branch = x.branch)
				,(select external_value from oltms_translation where source_code = 'AIRS' and translation_type = 'FIRMACC' and internal_value = m.txn_mis_1 and internal_branch = 'ALL')
				)
			,x.contract_ref_no
			) acct_mnem,
		--CITIUS#19063 Ends
		nvl(z.principal_outstanding_bal,0)+nvl(fn_get_ld_balance(x.contract_ref_no,'NONLC'),0) +nvl(fn_get_ld_balance(x.contract_ref_no,'LC'),0) trd_dt_posn_qty_ltd,
		y.contract_ccy ccy_cod,
		(select to_number(mapping_value )from OLTB_INTERFACE_PARAM_IF where  interface_code ='AIRS' and param_type='ORIG_MARKET_PRICE' )	mkt_prc,
		--olpks_bo_cypks.fn_get_rate_on_quotation(x.branch,y.contract_ccy,sb.branch_lcy) usd_fx_rt,--CITIUS#19063 
		round(backup_utils.fn_get_exrate(x.branch,y.contract_ccy,sb.branch_lcy),9) usd_fx_rt,--CITIUS#19063
		null 	cgm_lgl_enty_cod,	--Change##
		'R' 	fwd_lng_shrt_ind,
		null 	acct_id,
		null 	fii,
		'S' 	prim_sndy_flag,
		null 	urel_g_l_on_inv_ltd_tranal,
		null 	stgy_cod,
		null	ims_acct_no,
		null 	sd_qty,
		null 	accrtn_inv_ltd_tranal,
		null 	prin_inv_ltd_tranal,
		null 	fit_cod,
		x.contract_ref_no
	from   	oltbs_contract_master x,
		   	oltbs_contract y,
		   	oltbs_contract_balance z,
		   	oltms_branch sb,
		   	oltbs_class_mapping m
	where  	x.contract_ref_no	=	y.contract_ref_no
	and		x.contract_ref_no	=	m.unit_ref_no
	and		x.contract_ref_no	=	z.contract_ref_no
	and		x.version_no		=	y.latest_version_no
	and		y.product_type		=	'C'
	--11-JUN-2014 CITIUS#19065 changes. start
	and		y.product_code	NOT IN		(
											select 	mapping_value
											from 	OLTB_INTERFACE_PARAM_IF 
											where  	interface_code 	=	'AIRS' 
											and 	param_type		=	'EXCLUDE-PRD-ORIG' 
										)	
	--11-JUN-2014 CITIUS#19065 changes. end	
	and		y.module_code		=	'OL'
	and		y.contract_status	=	'A'
	and		x.branch 			=	sb.branch_code
	and		m.txn_mis_1			in	(
										    select 	field_desc
										    from    OLTM_STATIC_FIELD_VALS
    										where   field_type	= 	'AIRS'
    										and		field_name	=	'EXPENSE_CODE'
									)
)
where	nvl(trd_dt_posn_qty_ltd,0)					<>	0
---or		fn_loan_outstanding_exists(contract_ref_no)	=	1	--Change##
/
create or replace synonym tlvws_airs_position_feed for tlvw_airs_position_feed
/