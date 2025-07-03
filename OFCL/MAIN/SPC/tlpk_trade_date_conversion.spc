CREATE OR REPLACE PACKAGE tlpk_trade_date_conversion IS

  /*-------------------------------------------------------------------------------------------------------------------------
  **
  ** File Name : tlpk_trade_date_conversion.spc
  **
  ** Module  : LOANS AND TRADING (LT)
  **
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
   
  --------------------------------------------------------------------------------------------------------------------------
  */
  
 /*
 Change history
 29-AUG-2013  CITIUS#17927  Introduced new package as part of CBNA trade date conversion
 09-SEP-2013 CITIUS#17984 CBNA trade date conversion  changes.
 */

g_trdt_conversion_flag  VARCHAR2(1)	:=	 'N' ;
g_perform_validation_flag  	VARCHAR2(1)	:=	 'N' ; --09-SEP-2013 CITIUS#17984 Changes

PROCEDURE pr_log_conv_status(
			   p_contract_ref_no IN VARCHAR2,
			   p_table_name		IN  VARCHAR2,
			   p_status				IN  VARCHAR2,
			   p_error_code  IN  VARCHAR2,
			   p_error_param IN  VARCHAR2
			   );
FUNCTION fn_unsettle_trd_dt_conv	
		(
		p_position_contract IN TLTB_POSITION_CONTRACT.contract_Ref_no%TYPE,
		p_contract_Ref_no  	IN OLTB_CONTRACT.contract_Ref_no%TYPE,
		p_errcode  				IN OUT VARCHAR2,
		p_errparam 			IN OUT VARCHAR2		
		) 
RETURN BOOLEAN;

FUNCTION fn_pop_unsettled_trades
				(
				p_contract_Ref_no		TLTB_CONTRACT_MASTER.contract_ref_no%TYPE
				)	
RETURN BOOLEAN;

FUNCTION fn_pop_settled_positions
				(
				p_position_contract			TLTB_CONTRACT_MASTER.contract_ref_no%TYPE,
				p_cusip_no						TLTB_CONTRACT_MASTER.cusip_no%TYPE,
				p_expense_Code				TLTB_CONTRACT_MASTER.expense_Code%TYPE,
				p_position_identifier			TLTB_CONTRACT_MASTER.position_identifier%TYPE				
				)	
RETURN BOOLEAN;

FUNCTION fn_enrich_slt_positions
RETURN BOOLEAN;

FUNCTION  fn_pop_ld_details
				(
					p_position_contract			TLTB_CONTRACT_MASTER.contract_ref_no%TYPE
				)
RETURN  BOOLEAN;

FUNCTION fn_post_acct_entry
			(
			pkghoff					IN OUT  olpkss_accounting.tbl_AcHoff,
			p_error_code			OUT VARCHAR2,
			p_error_param			OUT VARCHAR2
			)			
RETURN BOOLEAN;

FUNCTION fn_reclassify_ld_balance
			(
				p_position_contract  IN OLTB_CONTRACT.contract_Ref_no%TYPE,
				p_error_code			OUT VARCHAR2,
				p_error_param			OUT VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_build_trdt_settled_position
			(
				p_position_contract  IN OLTB_CONTRACT.contract_Ref_no%TYPE,
				p_error_code		OUT VARCHAR2,
				p_error_param		OUT VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_build_par_loan
			(
				p_rec_settled_positions		TLTB_TRDT_CONV_SETTLED_POSN%ROWTYPE,
				p_latest_esn					OLTB_CONTRACT.latest_event_seq_no%TYPE,
				p_related_customer			OLTB_CONTRACT.counterparty%TYPE,
				p_module_code				OLTB_CONTRACT.module_code%TYPE,		
				p_error_code					OUT VARCHAR2,
				p_error_param					OUT VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION fn_build_control_acct_3_4
			(
				p_rec_settled_positions		TLTB_TRDT_CONV_SETTLED_POSN%ROWTYPE,
				p_latest_esn					OLTB_CONTRACT.latest_event_seq_no%TYPE,
				p_related_customer			OLTB_CONTRACT.counterparty%TYPE,
				p_module_code				OLTB_CONTRACT.module_code%TYPE,		
				p_error_code					OUT VARCHAR2,
				p_error_param					OUT VARCHAR2
			)
RETURN BOOLEAN;			

FUNCTION fn_build_ac_hoff
			(
			p_rec_daily_log		OLTB_DAILY_LOG_AC%ROWTYPE,
			p_amount				NUMBER,	
			pkghoff					IN OUT olpkss_accounting.tbl_AcHoff,
			pidx						NUMBER,
			p_error_code			OUT VARCHAR2,
			p_error_param			OUT VARCHAR2
			)			
RETURN BOOLEAN;

FUNCTION fn_pop_slt_positions
				(
				p_position_contract			TLTB_CONTRACT_MASTER.contract_ref_no%TYPE,
				p_cusip_no						TLTB_CONTRACT_MASTER.cusip_no%TYPE,
				p_expense_Code				TLTB_CONTRACT_MASTER.expense_Code%TYPE,
				p_position_identifier			TLTB_CONTRACT_MASTER.position_identifier%TYPE				
				)	
RETURN BOOLEAN;

FUNCTION fn_slt_position_conversion
				(
				p_position_contract			TLTB_CONTRACT_MASTER.contract_ref_no%TYPE,
				p_cusip_no						TLTB_CONTRACT_MASTER.cusip_no%TYPE,
				p_expense_Code				TLTB_CONTRACT_MASTER.expense_Code%TYPE,
				p_position_identifier			TLTB_CONTRACT_MASTER.position_identifier%TYPE,
				p_error_code					OUT VARCHAR2,
				p_error_param					OUT VARCHAR2				
				)	
RETURN BOOLEAN;

PROCEDURE Pr_net_projection_pop_conv
							(
							p_position_contract		TLTB_POSITION_CONTRACT.contract_ref_no%TYPE
							);
							
FUNCTION Fn_conv_pop_net_income_detail
  			(
  			p_branch		IN	VARCHAR2,
  			--p_commit_frequency	IN	NUMBER,
  			p_cusip_no					IN  TLTB_NET_INCOME_DETAIL.cusip%TYPE,
  			p_expense_code			IN  TLTB_NET_INCOME_DETAIL.expense_code%TYPE,
  			p_position_identifier    	IN  TLTB_NET_INCOME_DETAIL.position_identifier%TYPE,
  			p_error_code				IN OUT	VARCHAR2,
 			p_error_parameter		IN OUT	VARCHAR2
 			)
  RETURN BOOLEAN;							
  
  FUNCTION Fn_trdt_bal_chng_conv
  		(
  		p_branch					IN	VARCHAR2,
  		p_processing_date		IN	DATE,
  		p_position_contract		IN	VARCHAR2,
  		p_err_code					IN OUT	VARCHAR2,
  		p_err_params				IN OUT	VARCHAR2
  		)
RETURN BOOLEAN;

FUNCTION fn_get_true_prem_disc
(
	p_position_identifier	IN	tltbs_contract_master.position_identifier%type,
	p_cusip_no				IN	tltbs_contract_master.cusip_no%type,
	p_exp_Code			IN	tltbs_contract_master.expense_code%type,
	p_method				IN	VARCHAR2
)
RETURN NUMBER;

END tlpk_trade_date_conversion;
/
CREATE OR REPLACE SYNONYM tlpkss_trade_date_conversion FOR tlpk_trade_date_conversion
/
CREATE OR REPLACE SYNONYM tlpks_trade_date_conversion FOR tlpk_trade_date_conversion
/