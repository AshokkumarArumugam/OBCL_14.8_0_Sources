CREATE OR REPLACE FORCE VIEW tlvw_psr_goc_s2 AS
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
--14-Dec-2011 Flexcube V.CL Release 7.10 FS Tag14,Adjustments - S2 to Flexcube Interface change : view created
--20-FEB-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag14 ITR1#130,Adjustments - S2 to Flexcube Interface change:commented the branch validation
(select  
  backup_utils.fn_get_proof(ltpc.position_identifier,ltpc.cusip_no,ltpc.expense_code) "PROOF",
  backup_utils.fn_get_contract_dtls(backup_utils.Fn_get_comm_ref(ltpc.position_identifier,ltpc.cusip_no,ltpc.expense_code),'C','FACILITY_NAME') "FACILITY_NAME",
  backup_utils.fn_get_contract_dtls(backup_utils.Fn_get_comm_ref(ltpc.position_identifier,ltpc.cusip_no,ltpc.expense_code),'C','GFCID') "GFCID",
  backup_utils.fn_get_contract_dtls(backup_utils.Fn_get_comm_ref(ltpc.position_identifier,ltpc.cusip_no,ltpc.expense_code),'C','GFRN') "GFRN",
  backup_utils.fn_get_contract_dtls(backup_utils.Fn_get_comm_ref(ltpc.position_identifier,ltpc.cusip_no,ltpc.expense_code),'C','MATURITY_DATE') "MATURITY_DATE",  
  (-1*backup_utils.fn_get_position_detail (ltpc.cusip_no,ltpc.position_identifier,ltpc.expense_code,'FENC_GL',null,null,'ORIG')) "FENC_AMT", 
  (-1* backup_utils.fn_get_position_detail (ltpc.cusip_no,ltpc.position_identifier,ltpc.expense_code,'IENC_GL',null,null,'ORIG')) "IENC_AMT",
  (select cust_mis_2 
  from oltms_customer_default 
  where customer = backup_utils.fn_get_contract_dtls(backup_utils.Fn_get_comm_ref(ltpc.position_identifier,ltpc.cusip_no,ltpc.expense_code),'C','COUNTERPARTY')
  ) "SIC_No",
  ( select country
    from oltms_customer
    where customer_no = backup_utils.fn_get_contract_dtls(backup_utils.Fn_get_comm_ref(ltpc.position_identifier,ltpc.cusip_no,ltpc.expense_code),'C','COUNTERPARTY')
  ) "COUNTRY",      
  backup_utils.fn_get_branch(ltpc.branch) "branch",  
  NVL(backup_utils.fn_get_exp_code(ltpc.cusip_no,ltpc.position_identifier),ltpc.expense_code) exp_code,
  ltpc.position_identifier,   
  backup_utils.fn_get_firmacc(ltpc.cusip_no,ltpc.position_identifier,ltpc.expense_code) "Firm Account",
  backup_utils.fn_get_condi(( ltpc.expense_code )) "Entity",
  ltcb.cusip_no,  
  backup_utils.Fn_get_comm_ref(ltpc.position_identifier,ltpc.cusip_no,ltpc.expense_code) "CONTRACT_REF_NO",
  backup_utils.fn_get_rating(ltpc.cusip_no,'M') "Moodys",
  backup_utils.fn_get_rating(ltpc.cusip_no,'S') "SandP",
  backup_utils.fn_get_orignominal_amt(( ltpc.position_identifier ),( ltpc.cusip_no ),( ltpc.expense_code )) "ORIGNAL_AMT",
  olpks_bo_conv.fn_convert(( ltpc.branch ), ( ltcb.trade_ccy), ( sb.branch_LCY ), ( backup_utils.fn_get_orignominal_amt(( ltpc.position_identifier ),( ltpc.cusip_no ),( ltpc.expense_code )) ), 'N') "ORIGNAL_AMT_LCY",
  ltcb.trade_ccy "currency",
  ltcb.wac,
  ltcb.settled_wac,
  backup_utils.fn_get_unsettled_trades(( ltpc.cusip_no ),( ltpc.position_identifier )) "Unsettled trades cnt",    
  backups_utils.fn_get_market_price(ltpc.cusip_no) "MTM Price in local currency",    
  fn_ol_get_transfer_avl(backup_utils.fn_get_tranche_ref_no(( ltpc.cusip_no ),( ltpc.position_identifier )),(select today from sttm_dates where branch_code =ltpc.branch )) "GLOBAL FACILITY SIZE",  
  (-1*  backup_utils.fn_get_position_detail (ltpc.cusip_no,ltpc.position_identifier,ltpc.expense_code,'FUND_GL',null,null,'ORIG',null,null)) "FUNDED AMT ORIGINAL",
  (-1* backup_utils.fn_get_position_detail (ltpc.cusip_no,ltpc.position_identifier,ltpc.expense_code,'UNFUND_GL',null,null,'ORIG',null,null)) "UNFUNDED AMT ORIGINAL",  
  0 "Setl Nom Trade Amt Orig",  --Handled in Report
  ltcb.closed_unsettled_position "Unsetl Nom Trade Amt Orig",   
  backup_utils.fn_get_disc_prem_bal( ltpc.position_identifier,ltpc.cusip_no,ltpc.expense_code) "disc/prm to par orig ccy",
  (-1* backup_utils.fn_get_position_detail (ltpc.cusip_no,ltpc.position_identifier,ltpc.expense_code,'UNREALIZED_MTM_BS',null,null,'ORIG',null,null)) "UNREAL MTM BAL ORIG CCY",
  (-1* backup_utils.fn_get_position_detail (ltpc.cusip_no,ltpc.position_identifier,ltpc.expense_code,'TRD_DT_RLZ',null,null,'ORIG',null,null)) "TRADE DT REALIZED BAL ORIG",
  0 "Market Value Orig", 
  ((backups_utils.fn_get_market_price(ltpc.cusip_no)/100) * (-1*  backup_utils.fn_get_position_detail (ltpc.cusip_no,ltpc.position_identifier,ltpc.expense_code,'FUND_GL',null,null,'ORIG',null,null))) "market val funded orig" , 
  ((ltcb.wac/100) *  backup_utils.fn_get_orignominal_amt(ltpc.position_identifier,ltpc.cusip_no,ltpc.expense_code )) "WAC USDE" ,
  backups_utils.fn_get_market_price(ltpc.cusip_no) "MTM Price",    
  (-1* backup_utils.fn_get_position_detail (ltpc.cusip_no,ltpc.position_identifier,ltpc.expense_code,'FUND_GL',null,null,'LCY',ltcb.trade_ccy,ltpc.branch)) "Funded Amt USDE", 
  (-1* backup_utils.fn_get_position_detail (ltpc.cusip_no,ltpc.position_identifier,ltpc.expense_code,'UNFUND_GL',null,null,'LCY',ltcb.trade_ccy,ltpc.branch) )"Unfunded Amt USDE",
  0 "Setld Nom trd amt USD",
  olpks_bo_conv.fn_convert(ltpc.branch,ltcb.Trade_ccy ,'USD',ltcb.closed_unsettled_position, 'N') "Unsetld Nom trd amt USD",  
  olpks_bo_conv.fn_convert(ltpc.branch,ltcb.trade_ccy ,'USD',backup_utils.fn_get_disc_prem_bal(ltpc.position_identifier,ltpc.cusip_no,ltpc.expense_code) ,'N') "disc/prem to par USDE",	  
  (-1* backup_utils.fn_get_position_detail (ltpc.cusip_no,ltpc.position_identifier,ltpc.expense_code,'UNREALIZED_MTM_BS',null,null,'LCY',ltcb.trade_ccy,ltpc.branch)) "unrealized mtm bal usde",
  (-1* backup_utils.fn_get_position_detail (ltpc.cusip_no,ltpc.position_identifier,ltpc.expense_code,'TRD_DT_RLZ',null,null,'LCY',ltcb.trade_ccy,ltpc.branch)) "trade date relz bal USDE",
  0 "Market Value USD", 
  ((backups_utils.fn_get_market_price(ltpc.cusip_no)/100) * (-1* backup_utils.fn_get_position_detail (ltpc.cusip_no,ltpc.position_identifier,ltpc.expense_code,'FUND_GL',null,null,'LCY',ltcb.trade_ccy,ltpc.branch))) "market value funded USDE" ,
  0 "USD Cost", 
  backup_utils.fn_get_portfolio_age(( ltpc.expense_code ),( ltpc.position_identifier ),( ltpc.cusip_no )) "Age_Of_Trade",
  olpks_bo_conv.fn_convert(( ltpc.branch ), ( ltcb.trade_ccy ), ( sb.branch_lcy ), ( backup_utils.fn_get_orignominal_amt(( ltpc.position_identifier ),( ltpc.cusip_no ),( ltpc.expense_code )) ), 'n') "TR_ORIG_AMT_LCY",
  backup_utils.fn_get_funding_amt (( ltpc.position_identifier ),( ltpc.cusip_no )) "FUNDED_AMT",
  olpks_bo_conv.fn_convert((SUBSTR(( ltpc.contract_ref_no ),1,3) ),( ltcb.Trade_ccy ),'USD',( (ltcb.WAC/100)*ltcb.closed_settled_position ), 'N') "closed_settled_position_lcy",
  olpks_bo_conv.fn_convert((SUBSTR(( ltpc.contract_ref_no ),1,3) ),( ltcb.Trade_ccy ),'USD',( (ltcb.WAC/100)*ltcb.closed_unsettled_position ), 'N') "closed_unsettled_position", 
  olpks_bo_conv.fn_convert((SUBSTR(( ltpc.contract_ref_no ),1,3) ),( ltcb.Trade_ccy ),'USD',( ltrd.unrealized_pnl_amount ), 'N') "unrealized_pnl_amount",
  backup_utils.fn_get_req_gl(ltpc.cusip_no , ltpc.position_identifier ,'FUND_GL') "FUND_GL",        
  backup_utils.fn_get_req_gl(ltpc.cusip_no , ltpc.position_identifier ,'UNFUND_GL') "UNFUND_GL",    
  backup_utils.fn_get_req_gl(ltpc.cusip_no , ltpc.position_identifier ,'DISC_PREM') "DISC_PREM",    
  backup_utils.fn_get_req_gl(ltpc.cusip_no , ltpc.position_identifier ,'TRD_DT_RLZ') "TRD_DT_RLZ",  
  backup_utils.fn_get_req_gl(ltpc.cusip_no , ltpc.position_identifier ,'IENC_GL') "IENC_GL",	  
  backup_utils.fn_get_req_gl(ltpc.cusip_no , ltpc.position_identifier ,'INT_DEP_GL') "INT_DEP_GL",    	  	  
  backup_utils.fn_get_req_gl(ltpc.cusip_no , ltpc.position_identifier ,'DCF_PAY_GL') "DCF_PAY_GL"  ,  
  backup_utils.fn_get_req_gl(ltpc.cusip_no , ltpc.position_identifier ,'DCF_REC_GL') "DCF_REC_GL",    
  backup_utils.fn_get_req_gl(ltpc.cusip_no , ltpc.position_identifier ,'FENC_GL') "FENC_GL",          
  backup_utils.fn_get_req_gl(ltpc.cusip_no , ltpc.position_identifier ,'MTM_BS_GL') "MTM_BS_GL",      	      
 (-1* backup_utils.fn_get_position_detail (ltpc.cusip_no,ltpc.position_identifier,ltpc.expense_code,'DCF_PAY_GL',null,null,'ORIG')) "DCF Payable amt",
 (-1* backup_utils.fn_get_position_detail (ltpc.cusip_no,ltpc.position_identifier,ltpc.expense_code,'DCF_REC_GL',null,null,'ORIG')) "DCF Receivable amt",
 (select facility_name from OLTB_FACILITY_DETAILS_LDR where cusip_no =ltcb.cusip_no) "Ldr Asset Name"
 ,backup_utils.fn_get_unsettled_wac(ltpc.position_identifier,ltpc.cusip_no,ltpc.expense_code) "Unsettled_wac"
 ,(select expense_code from oltbs_exp_code_goc_map where expense_code = ltpc.expense_code
 AND sr_ledger_type = 
					(
						SELECT field_val
						FROM cstm_udf_vals
						WHERE function_id = 'STDBRANC'
						AND rec_key = ltpc.branch||'~'
						AND field_name = 'GL-SYSTEM-IDENTIFIER'
				    ))  Expense_Code
,(select SR_GOC from oltbs_exp_code_goc_map where expense_code = ltpc.expense_code
AND sr_ledger_type = 
					(
						SELECT field_val
						FROM cstm_udf_vals
						WHERE function_id = 'STDBRANC'
						AND rec_key = ltpc.branch||'~'
						AND field_name = 'GL-SYSTEM-IDENTIFIER'
				    )) SR_GOC
,(select SR_MGD_SEG_L5_ID from oltbs_exp_code_goc_map where expense_code = ltpc.expense_code
AND sr_ledger_type = 
					(
						SELECT field_val
						FROM cstm_udf_vals
						WHERE function_id = 'STDBRANC'
						AND rec_key = ltpc.branch||'~'
						AND field_name = 'GL-SYSTEM-IDENTIFIER'
				    )) SR_MGD_SEG_L5_ID
,(select SR_MGD_SEG_L6_ID from oltbs_exp_code_goc_map where expense_code = ltpc.expense_code
AND sr_ledger_type = 
					(
						SELECT field_val
						FROM cstm_udf_vals
						WHERE function_id = 'STDBRANC'
						AND rec_key = ltpc.branch||'~'
						AND field_name = 'GL-SYSTEM-IDENTIFIER'
				    )) SR_MGD_SEG_L6_ID
,(select SR_MGD_SEG_L7_ID from oltbs_exp_code_goc_map where expense_code = ltpc.expense_code
AND sr_ledger_type = 
					(
						SELECT field_val
						FROM cstm_udf_vals
						WHERE function_id = 'STDBRANC'
						AND rec_key = ltpc.branch||'~'
						AND field_name = 'GL-SYSTEM-IDENTIFIER'
				    )) SR_MGD_SEG_L7_ID
,(select SR_MGD_SEG_L8_ID from oltbs_exp_code_goc_map where expense_code = ltpc.expense_code
AND sr_ledger_type = 
					(
						SELECT field_val
						FROM cstm_udf_vals
						WHERE function_id = 'STDBRANC'
						AND rec_key = ltpc.branch||'~'
						AND field_name = 'GL-SYSTEM-IDENTIFIER'
				    )) SR_MGD_SEG_L8_ID
,(select SR_MGD_SEG_L9_ID from oltbs_exp_code_goc_map where expense_code = ltpc.expense_code
AND sr_ledger_type = 
					(
						SELECT field_val
						FROM cstm_udf_vals
						WHERE function_id = 'STDBRANC'
						AND rec_key = ltpc.branch||'~'
						AND field_name = 'GL-SYSTEM-IDENTIFIER'
				    )) SR_MGD_SEG_L9_ID
,(select SR_MGD_SEG_L10_ID from oltbs_exp_code_goc_map where expense_code = ltpc.expense_code
AND sr_ledger_type = 
					(
						SELECT field_val
						FROM cstm_udf_vals
						WHERE function_id = 'STDBRANC'
						AND rec_key = ltpc.branch||'~'
						AND field_name = 'GL-SYSTEM-IDENTIFIER'
				    )) SR_MGD_SEG_L10_ID
,(select SR_MGD_SEG_L11_ID from oltbs_exp_code_goc_map where expense_code = ltpc.expense_code
AND sr_ledger_type = 
					(
						SELECT field_val
						FROM cstm_udf_vals
						WHERE function_id = 'STDBRANC'
						AND rec_key = ltpc.branch||'~'
						AND field_name = 'GL-SYSTEM-IDENTIFIER'
				    )) SR_MGD_SEG_L11_ID
,(select SR_FRS_BUS_UNIT from oltbs_exp_code_goc_map where expense_code = ltpc.expense_code
AND sr_ledger_type = 
					(
						SELECT field_val
						FROM cstm_udf_vals
						WHERE function_id = 'STDBRANC'
						AND rec_key = ltpc.branch||'~'
						AND field_name = 'GL-SYSTEM-IDENTIFIER'
				    )) SR_FRS_BUS_UNIT
,(SELECT firm_acct_mnemonic FROM tlvw_firmac_mcc WHERE expense_code = ltpc.expense_code AND position_identifier = ltpc.position_identifier) Firm_Acct_Mnemonic
,(SELECT mcc FROM tlvw_firmac_mcc WHERE expense_code = ltpc.expense_code AND position_identifier = ltpc.position_identifier) Mcc
from  
	oltms_branch  			sb,
	tltbs_position_contract  	ltpc,
	tltbs_current_dated_balance  	ltcb,
	tltbs_reval_master  		ltrm,
	tltbs_reval_detail  		ltrd 		
where 	sb.branch_code		=	ltpc.branch
and  	ltpc.position_identifier=	ltcb.position_identifier 
and	ltpc.cusip_no		=	ltcb.cusip_no
and  	ltpc.expense_code	=	ltcb.expense_code 
and     ltpc.event_seq_no	=	(
					select 	max(event_seq_no)
					from	tltbs_position_contract
					where	cusip_no 		= ltpc.cusip_no
					and	position_identifier 	= ltpc.position_identifier
					and     expense_code		= ltpc.expense_code
					)
and     ltcb.cusip_no		=	ltrm.cusip_no 
and  	ltpc.contract_ref_no	=	ltrm.contract_ref_no 
and   	ltrm.contract_ref_no	=	ltrd.contract_ref_no (+)
and  	ltrm.last_reval_event_seq_no	=ltrd.reval_event_seq_no(+)
--20-FEB-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag14 ITR1#130,Adjustments - S2 to Flexcube Interface change start
/*and 	(sb.branch_code		IN	(SELECT branch_code
					   FROM tltms_strategy_mapping
					  WHERE branch_code IS NOT NULL
					    AND record_stat = 'O'
					    AND auth_stat = 'A'
					)
	)*/
--20-FEB-2012 Flexcube V.CL Release 7.10 FS Vol1 Tag14 ITR1#130,Adjustments - S2 to Flexcube Interface change end
union all 
select  
  backup_utils.fn_get_proof(lnir.position_identifier,lnir.cusip,lnir.expense_code) "PROOF",
  backup_utils.fn_get_contract_dtls(backup_utils.Fn_get_comm_ref(lnir.position_identifier,lnir.cusip,lnir.expense_code),'C','FACILITY_NAME') "FACILITY_NAME",
  backup_utils.fn_get_contract_dtls(backup_utils.Fn_get_comm_ref(lnir.position_identifier,lnir.cusip,lnir.expense_code),'C','GFCID') "GFCID",
  backup_utils.fn_get_contract_dtls(backup_utils.Fn_get_comm_ref(lnir.position_identifier,lnir.cusip,lnir.expense_code),'C','GFRN') "GFRN",
  backup_utils.fn_get_contract_dtls(backup_utils.Fn_get_comm_ref(lnir.position_identifier,lnir.cusip,lnir.expense_code),'C','MATURITY_DATE') "MATURITY_DATE",
  (-1*backup_utils.fn_get_position_detail (lnir.cusip,lnir.position_identifier,lnir.expense_code,'FENC_GL',null,null,'ORIG')) "FENC_AMT", 
  (-1* backup_utils.fn_get_position_detail (lnir.cusip,lnir.position_identifier,lnir.expense_code,'IENC_GL',null,null,'ORIG')) "IENC_AMT",
  (select cust_mis_2 
  from oltms_customer_default 
  where customer = backup_utils.fn_get_contract_dtls(backup_utils.Fn_get_comm_ref(lnir.position_identifier,lnir.cusip,lnir.expense_code),'C','COUNTERPARTY')
  ) "SIC_No",
  ( select country
    from oltms_customer
    where customer_no = backup_utils.fn_get_contract_dtls(backup_utils.Fn_get_comm_ref(lnir.position_identifier,lnir.cusip,lnir.expense_code),'C','COUNTERPARTY')
  ) "COUNTRY",    
  backup_utils.fn_get_branch(lnir.branch_code),  
  lnir.expense_code,
  lnir.position_identifier,   
   backup_utils.fn_get_firmacc(lnir.cusip,lnir.position_identifier,lnir.expense_code) "Firm Account",
  backup_utils.fn_get_condi(( lnir.expense_code )),
  lnir.cusip,  
  backup_utils.Fn_get_comm_ref(lnir.position_identifier,lnir.cusip,lnir.expense_code) "CONTRACT_REF_NO",
  backup_utils.fn_get_rating(lnir.cusip,'M') "Moodys",
  backup_utils.fn_get_rating(lnir.cusip,'S') "SandP",     
  backup_utils.fn_get_orignominal_amt(( lnir.position_identifier ),( lnir.cusip ),( lnir.expense_code )),
  olpks_bo_conv.fn_convert(( lnir.branch_code ), ( lnir.ccy_code), ( sb.branch_LCY ), ( backup_utils.fn_get_orignominal_amt(( lnir.position_identifier ),( lnir.cusip ),( lnir.expense_code )) ), 'N'),  
  lnir.ccy_code "currency",
  0,
  0,
  backup_utils.fn_get_unsettled_trades(( lnir.cusip ),( lnir.position_identifier )) "Unsettled trades cnt",    
  backups_utils.fn_get_market_price(lnir.cusip) "MTM Price in local currency",   
  fn_ol_get_transfer_avl(backup_utils.fn_get_tranche_ref_no(( lnir.cusip ),( lnir.position_identifier )),(select today from sttm_dates where branch_code =lnir.branch_code )) "GLOBAL FACILITY SIZE",
  (-1*  backup_utils.fn_get_position_detail (lnir.cusip,lnir.position_identifier,lnir.expense_code,'FUND_GL',null,null,'ORIG',null,null)) "FUNDED AMT ORIGINAL",
  (-1* backup_utils.fn_get_position_detail (lnir.cusip,lnir.position_identifier,lnir.expense_code,'UNFUND_GL',null,null,'ORIG',null,null)) "UNFUNDED AMT ORIGINAL",  
  0 "Setl Nom Trade Amt Orig",  --Handled in Report
  0 "Unsetl Nom Trade Amt Orig",   
  backup_utils.fn_get_disc_prem_bal( lnir.position_identifier,lnir.cusip,lnir.expense_code) "disc/prm to par orig ccy",--piyush disc
  (-1* backup_utils.fn_get_position_detail (lnir.cusip,lnir.position_identifier,lnir.expense_code,'UNREALIZED_MTM_BS',null,null,'ORIG',null,null)) "UNREAL MTM BAL ORIG CCY",
  (-1* backup_utils.fn_get_position_detail (lnir.cusip,lnir.position_identifier,lnir.expense_code,'TRD_DT_RLZ',null,null,'ORIG',null,null)) "TRADE DT REALIZED BAL ORIG",
  0 "Market Value Orig",  --Handled in Report
  ((backups_utils.fn_get_market_price(lnir.cusip)/100) *  (-1*  backup_utils.fn_get_position_detail (lnir.cusip,lnir.position_identifier,lnir.expense_code,'FUND_GL',null,null,'ORIG',null,null))) "market val funded orig" , 
  0 "WAC USDE" ,
  backups_utils.fn_get_market_price(lnir.cusip) "MTM Price",  
  (-1* backup_utils.fn_get_position_detail (lnir.cusip,lnir.position_identifier,lnir.expense_code,'FUND_GL',null,null,'LCY',lnir.ccy_code,lnir.branch_code)) "Funded Amt USDE", 
  (-1* backup_utils.fn_get_position_detail (lnir.cusip,lnir.position_identifier,lnir.expense_code,'UNFUND_GL',null,null,'LCY',lnir.ccy_code,lnir.branch_code) )"Unfunded Amt USDE",
  0 "Setld Nom trd amt USD",
  0 "Unsetld Nom trd amt USD",  
  olpks_bo_conv.fn_convert(lnir.branch_code,lnir.ccy_code ,'USD',backup_utils.fn_get_disc_prem_bal(lnir.position_identifier,lnir.cusip,lnir.expense_code) ,'N') "disc/prem to par USDE",	  
  (-1* backup_utils.fn_get_position_detail (lnir.cusip,lnir.position_identifier,lnir.expense_code,'UNREALIZED_MTM_BS',null,null,'LCY',lnir.ccy_code,lnir.branch_code)) "unrealized mtm bal usde",
  (-1* backup_utils.fn_get_position_detail (lnir.cusip,lnir.position_identifier,lnir.expense_code,'TRD_DT_RLZ',null,null,'LCY',lnir.ccy_code,lnir.branch_code)) "trade date relz bal USDE",
  0 "Market Value USD",  --Handled in report
 ((backups_utils.fn_get_market_price(lnir.cusip)/100) *  (-1* backup_utils.fn_get_position_detail (lnir.cusip,lnir.position_identifier,lnir.expense_code,'FUND_GL',null,null,'LCY',lnir.ccy_code,lnir.branch_code))) "market value funded USDE" ,  
  0 "USD Cost",  --Handled in Report    
  backup_utils.fn_get_portfolio_age(( lnir.expense_code ),( lnir.position_identifier ),( lnir.cusip )) "Age_Of_Trade",
  olpks_bo_conv.fn_convert(( lnir.branch_code ), ( lnir.ccy_code ), ( sb.branch_lcy ), ( backup_utils.fn_get_orignominal_amt(( lnir.position_identifier ),( lnir.cusip ),( lnir.expense_code )) ), 'n'),
  backup_utils.fn_get_funding_amt (( lnir.position_identifier ),( lnir.cusip )),
0,   
0, 
0,
  backup_utils.fn_get_req_gl(lnir.cusip , lnir.position_identifier ,'FUND_GL') "FUND_GL",        
  backup_utils.fn_get_req_gl(lnir.cusip , lnir.position_identifier ,'UNFUND_GL') "UNFUND_GL",    
  backup_utils.fn_get_req_gl(lnir.cusip , lnir.position_identifier ,'DISC_PREM') "DISC_PREM",    
  backup_utils.fn_get_req_gl(lnir.cusip , lnir.position_identifier ,'TRD_DT_RLZ') "TRD_DT_RLZ",  
  backup_utils.fn_get_req_gl(lnir.cusip , lnir.position_identifier ,'IENC_GL') "IENC_GL",	  
  backup_utils.fn_get_req_gl(lnir.cusip , lnir.position_identifier ,'INT_DEP_GL') "INT_DEP_GL",    	  	  
  backup_utils.fn_get_req_gl(lnir.cusip , lnir.position_identifier ,'DCF_PAY_GL') "DCF_PAY_GL"  ,  
  backup_utils.fn_get_req_gl(lnir.cusip , lnir.position_identifier ,'DCF_REC_GL') "DCF_REC_GL",    
  backup_utils.fn_get_req_gl(lnir.cusip , lnir.position_identifier ,'FENC_GL') "FENC_GL",          
  backup_utils.fn_get_req_gl(lnir.cusip , lnir.position_identifier ,'MTM_BS_GL') "MTM_BS_GL",      	      
  (-1* backup_utils.fn_get_position_detail (lnir.cusip,lnir.position_identifier,lnir.expense_code,'DCF_PAY_GL',null,null,'ORIG')) "DCF Payable amt",
  (-1* backup_utils.fn_get_position_detail (lnir.cusip,lnir.position_identifier,lnir.expense_code,'DCF_REC_GL',null,null,'ORIG')) "DCF Receivable amt",
  (select facility_name from OLTB_FACILITY_DETAILS_LDR where cusip_no =lnir.cusip) "Ldr Asset Name"
  ,0 "Unsettled_wac"
  ,(select expense_code from oltbs_exp_code_goc_map where expense_code = lnir.expense_code
  AND sr_ledger_type = 
					(
						SELECT field_val
						FROM cstm_udf_vals
						WHERE function_id = 'STDBRANC'
						AND rec_key = ltpc.branch||'~'
						AND field_name = 'GL-SYSTEM-IDENTIFIER'
				    ))  Expense_Code
  ,(select SR_GOC from oltbs_exp_code_goc_map where expense_code = lnir.expense_code
  AND sr_ledger_type = 
					(
						SELECT field_val
						FROM cstm_udf_vals
						WHERE function_id = 'STDBRANC'
						AND rec_key = ltpc.branch||'~'
						AND field_name = 'GL-SYSTEM-IDENTIFIER'
				    )) SR_GOC
 ,(select SR_MGD_SEG_L5_ID from oltbs_exp_code_goc_map where expense_code = lnir.expense_code
 AND sr_ledger_type = 
					(
						SELECT field_val
						FROM cstm_udf_vals
						WHERE function_id = 'STDBRANC'
						AND rec_key = ltpc.branch||'~'
						AND field_name = 'GL-SYSTEM-IDENTIFIER'
				    )) SR_MGD_SEG_L5_ID
  ,(select SR_MGD_SEG_L6_ID from oltbs_exp_code_goc_map where expense_code = lnir.expense_code
  AND sr_ledger_type = 
					(
						SELECT field_val
						FROM cstm_udf_vals
						WHERE function_id = 'STDBRANC'
						AND rec_key = ltpc.branch||'~'
						AND field_name = 'GL-SYSTEM-IDENTIFIER'
				    )) SR_MGD_SEG_L6_ID
   ,(select SR_MGD_SEG_L7_ID from oltbs_exp_code_goc_map where expense_code = lnir.expense_code
   AND sr_ledger_type = 
					(
						SELECT field_val
						FROM cstm_udf_vals
						WHERE function_id = 'STDBRANC'
						AND rec_key = ltpc.branch||'~'
						AND field_name = 'GL-SYSTEM-IDENTIFIER'
				    )) SR_MGD_SEG_L7_ID
  ,(select SR_MGD_SEG_L8_ID from oltbs_exp_code_goc_map where expense_code = lnir.expense_code
  AND sr_ledger_type = 
					(
						SELECT field_val
						FROM cstm_udf_vals
						WHERE function_id = 'STDBRANC'
						AND rec_key = ltpc.branch||'~'
						AND field_name = 'GL-SYSTEM-IDENTIFIER'
				    )) SR_MGD_SEG_L8_ID
 ,(select SR_MGD_SEG_L9_ID from oltbs_exp_code_goc_map where expense_code = lnir.expense_code
 AND sr_ledger_type = 
					(
						SELECT field_val
						FROM cstm_udf_vals
						WHERE function_id = 'STDBRANC'
						AND rec_key = ltpc.branch||'~'
						AND field_name = 'GL-SYSTEM-IDENTIFIER'
				    )) SR_MGD_SEG_L9_ID
 ,(select SR_MGD_SEG_L10_ID from oltbs_exp_code_goc_map where expense_code = lnir.expense_code
 AND sr_ledger_type = 
					(
						SELECT field_val
						FROM cstm_udf_vals
						WHERE function_id = 'STDBRANC'
						AND rec_key = ltpc.branch||'~'
						AND field_name = 'GL-SYSTEM-IDENTIFIER'
				    )) SR_MGD_SEG_L10_ID
 ,(select SR_MGD_SEG_L11_ID from oltbs_exp_code_goc_map where expense_code = lnir.expense_code
 AND sr_ledger_type = 
					(
						SELECT field_val
						FROM cstm_udf_vals
						WHERE function_id = 'STDBRANC'
						AND rec_key = ltpc.branch||'~'
						AND field_name = 'GL-SYSTEM-IDENTIFIER'
				    )) SR_MGD_SEG_L11_ID
 ,(select SR_FRS_BUS_UNIT from oltbs_exp_code_goc_map where expense_code = lnir.expense_code
 AND sr_ledger_type = 
					(
						SELECT field_val
						FROM cstm_udf_vals
						WHERE function_id = 'STDBRANC'
						AND rec_key = ltpc.branch||'~'
						AND field_name = 'GL-SYSTEM-IDENTIFIER'
				    )) SR_FRS_BUS_UNIT
 ,(SELECT firm_acct_mnemonic FROM tlvw_firmac_mcc WHERE expense_code = ltpc.expense_code AND position_identifier = ltpc.position_identifier) Firm_Acct_Mnemonic
 ,(SELECT mcc FROM tlvw_firmac_mcc WHERE expense_code = ltpc.expense_code AND position_identifier = ltpc.position_identifier) Mcc
 from  
	oltms_branch  			sb,
	tltbs_position_contract  	ltpc,
	(select distinct cusip, position_identifier, expense_code,ccy_code,branch_code
	FROM 	TLTB_NET_INCOME_DETAIL)	 lnir
 where 	sb.branch_code = lnir.branch_code
 and 	not exists (select 1 from TLTB_CURRENT_DATED_BALANCE where cusip_no = lnir.cusip and  expense_code = lnir.expense_code)
 and sb.branch_code = ltpc.branch
 )
/
CREATE OR REPLACE SYNONYM tlvws_psr_goc_s2 FOR tlvw_psr_goc_s2
/