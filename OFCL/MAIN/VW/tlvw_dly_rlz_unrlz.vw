CREATE OR REPLACE FORCE VIEW tlvw_dly_rlz_unrlz AS
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
/*
Change History
---------------
14-Dec-2011 Flexcube V.CL Release 7.10 FS Tag14,Adjustments - S2 to Flexcube Interface change : view created
09-FEB-2012 Flexcube V.CL Release 7.10 FS Tag14 ITR1#29,Adjustments - S2 to Flexcube Interface change:included TO_DATE.
20-FEB-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag14 ITR1#130,Adjustments - S2 to Flexcube Interface change:commented the branch condition
---------------
*/
(SELECT
  backup_utils.fn_get_proof(pnl.position_identifier , pnl.cusip_no) Proof,
  backup_utils.fn_get_facility_name(( pnl.cusip_no ), ( pnl.position_identifier )) facility_name,
  pnl.position_identifier,
  pnl.cusip_no,
  pnl.expense_code expense_code_pnl,  
  pnl.realized_pnl_amount,
  pnl.unrealized_pnl_amount,
  pnl.mtd_realized_pnl_amount,
  pnl.mtd_unrealized_pnl_amount,
  pnl.ytd_realized_pnl_amount,
  pnl.ytd_unrealized_pnl_amount,
  olpks_bo_conv.fn_convert(( ltpc.branch ), ( backup_utils.fn_get_trade_ccy(( pnl.position_identifier ),( pnl.cusip_no ),( pnl.expense_code )) ), ( sb.branch_lcy ), (pnl.realized_pnl_amount), 'N') realized_pnl_amount_usde,
  olpks_bo_conv.fn_convert(( ltpc.branch ), ( backup_utils.fn_get_trade_ccy(( pnl.position_identifier ),( pnl.cusip_no ),( pnl.expense_code )) ), ( sb.branch_lcy ), (pnl.unrealized_pnl_amount), 'N') unrealized_pnl_amount_usde,
  olpks_bo_conv.fn_convert(( ltpc.branch ), ( backup_utils.fn_get_trade_ccy(( pnl.position_identifier ),( pnl.cusip_no ),( pnl.expense_code )) ), ( sb.branch_lcy ), (pnl.mtd_realized_pnl_amount), 'N') mtd_realized_pnl_amount_usde,
  olpks_bo_conv.fn_convert(( ltpc.branch ), ( backup_utils.fn_get_trade_ccy(( pnl.position_identifier ),( pnl.cusip_no ),( pnl.expense_code )) ), ( sb.branch_lcy ), (pnl.mtd_unrealized_pnl_amount), 'N') mtd_unrealized_pnl_amount_usde,
  olpks_bo_conv.fn_convert(( ltpc.branch ), ( backup_utils.fn_get_trade_ccy(( pnl.position_identifier ),( pnl.cusip_no ),( pnl.expense_code )) ), ( sb.branch_lcy ), (pnl.ytd_realized_pnl_amount), 'N') ytd_realized_pnl_amount_usde,
  olpks_bo_conv.fn_convert(( ltpc.branch ), ( backup_utils.fn_get_trade_ccy(( pnl.position_identifier ),( pnl.cusip_no ),( pnl.expense_code )) ), ( sb.branch_lcy ), (pnl.ytd_unrealized_pnl_amount), 'N') ytd_unrealized_pnl_amount_usde,  
  backup_utils.fn_get_counterparty(( backup_utils.fn_get_commitment_ref(( pnl.position_identifier ),( pnl.cusip_no )) )) gfcid,
  backup_utils.fn_get_commitment_ref(pnl.position_identifier , pnl.cusip_no) com_ref_no,
  backup_utils.fn_get_condi(( ltpc.expense_code )) entity,
  backup_utils.fn_get_firmacc(ltpc.cusip_no,ltpc.position_identifier,ltpc.expense_code) Firm_Account,   
  backup_utils.fn_get_branch(ltpc.branch) branch,  
  ltpc.expense_code,
  backup_utils.fn_get_trade_ccy(( pnl.position_identifier ),( pnl.cusip_no ),( pnl.expense_code )) trade_ccy,
  backup_utils.fn_get_orignominal_amt(( pnl.position_identifier ),( pnl.cusip_no ),( pnl.expense_code )) orignominal_amt,
  olpks_bo_conv.fn_convert(( ltpc.branch ), ( backup_utils.fn_get_trade_ccy(( pnl.position_identifier ),( pnl.cusip_no ),( pnl.expense_code )) ), ( sb.branch_lcy ), ( backup_utils.fn_get_orignominal_amt(( pnl.position_identifier ),( pnl.cusip_no ),( pnl.expense_code )) ), 'N') converted_amt,
  backup_utils.fn_get_sic_code(pnl.position_identifier , pnl.cusip_no,'','') SIC_No,  
  backup_utils.fn_get_GFRN(pnl.position_identifier , pnl.cusip_no,'') GFRN
   ,(select trade_price from tltms_price_detail where price_master_code = 'MPRICE' and cusip_no =pnl.cusip_no ) current_Day_Closing_Mark
   ,(select trade_price from tltms_price_history a where price_master_code = 'MPRICE' and cusip_no =pnl.cusip_no
     and version_no = (select max(version_no) from tltms_price_history b where b.price_master_code = a.price_master_code and b.cusip_no =a.cusip_no)
    ) prior_Day_Closing_Mark,   
    lcdb.wac  ,
    (select counterparty from oltbs_contract where contract_ref_no = backup_utils.fn_get_commitment_ref(pnl.position_identifier , pnl.cusip_no)) "Counterparty",
    --09-FEB-2012 Flexcube V.CL Release 7.10 FS Tag14 ITR1#29,Adjustments - S2 to Flexcube Interface change start
    /*    
    ( 
	SELECT  to_char(olpks_date.fn_getwbop('LCL',sb.branch_code,(SELECT TRUNC(sd.today,'YEAR') FROM Dual),'DAY'),'mm/dd/yyyy') FROM DUAL
    ) from_date,*/
    ( 
    	SELECT to_date(to_char(olpks_date.fn_getwbop('LCL',sb.branch_code,(SELECT TRUNC(sd.today,'YEAR') FROM Dual),'DAY'),'mm/dd/yyyy'),'mm/dd/yyyy') FROM DUAL
    ) from_date,
    --09-FEB-2012 Flexcube V.CL Release 7.10 FS Tag14 ITR1#29,Adjustments - S2 to Flexcube Interface change end
    sd.today today_1    
  ,(SELECT firm_acct_mnemonic FROM tlvw_firmac_mcc WHERE expense_code = pnl.expense_code AND position_identifier = pnl.position_identifier) Firm_Acct_Mnemonic
  ,(SELECT mcc FROM tlvw_firmac_mcc WHERE expense_code = pnl.expense_code AND position_identifier = pnl.position_identifier) Mcc  
from
  tltbs_book_dated_pnl pnl,
  tltbs_position_contract  ltpc,
  oltms_branch  sb,
  sttms_dates	sd,
  tltbs_current_dated_balance lcdb 
where	pnl.position_identifier		=	ltpc.position_identifier 
and     lcdb.position_identifier	=	ltpc.position_identifier 
and   	lcdb.cusip_no			=	ltpc.cusip_no 
and	lcdb.expense_code		=	ltpc.expense_code  
and	pnl.cusip_no			=	ltpc.cusip_no 
and 	pnl.expense_code		=	ltpc.expense_code 
and 	ltpc.branch			=	sb.branch_code 
and	sb.branch_code 			=	sd.branch_code 
and	pnl.activity_date 			= 
					(
						select 	max(activity_date)
						from	tltbs_book_dated_pnl			
						where 	position_identifier = pnl.position_identifier
						and	cusip_no	    = pnl.cusip_no
						and	expense_code	    = pnl.expense_code
					)
--20-FEB-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag14 ITR1#130,Adjustments - S2 to Flexcube Interface change end
/*and 	(sb.branch_code		IN	(SELECT branch_code
					   FROM tltms_strategy_mapping
					  WHERE branch_code IS NOT NULL
					    AND record_stat = 'O'
					    AND auth_stat = 'A'
					)
	)*/
--20-FEB-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag14 ITR1#130,Adjustments - S2 to Flexcube Interface change end
and backup_utils.fn_get_proof(pnl.position_identifier , pnl.cusip_no) <>'702'
)
/
CREATE OR REPLACE SYNONYM tlvws_dly_rlz_unrlz FOR tlvw_dly_rlz_unrlz
/