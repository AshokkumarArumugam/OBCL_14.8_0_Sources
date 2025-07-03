CREATE OR REPLACE PACKAGE olpks_interest_custom AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_interest_custom.SPC
**
** Module		: LOANS AND DEPOSITS
**
	This source is part of the Oracle Flexcube Corporate Lending  Software Product.   
	Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/

/*----------------------------------CHANGE HISTORY----------------------------------
**SFR Number         :
**Changed By         :
**Change Description :
**Search String      :

    **Changed By         : Gomathi G
    **Date               : 21-OCT-2019
    **Change Description : Resolved Rate Control
    **Search String      : OBCL_14.3_Bug#30310904


  **  Modified By     : Navoneel Nandan
  **  Modified On     : 02-Sep-2022
  **  Modified Reason : Hooks provided to modify the Derived Basis Amount
  **  Search String   : Bug#34555877
  
    **Changed By         : Palanisamy M
    **Date               : 07-FEB-2023
    **Change Description : Hook for FN_LOG_INTEREST_COMP
    **Search String      : Bug#35004644

  **  Modified By     : Navoneel Nandan
  **  Modified On     : 05-May-2023
  **  Modified Reason : Hooks provided to modify the reset flag
  **  Search String   : Bug#35322288
------------------------------------END CHANGE HISTORY-------------------------------------
*/
FUNCTION FN_PRE_MERGE_DATES
			(
			p_reference_no 		IN 	VARCHAR2,
			p_module  		 	IN 	oltbs_contract.module_code%type,
			p_component 		IN 	VARCHAR2,
			p_flat_component 		IN 	BOOLEAN,
			p_effective_date 		IN 	DATE,
			p_ty_comp_hoff 		IN OUT olpks_interest.ty_comp_hoff
			)
	RETURN BOOLEAN;
	
	FUNCTION FN_POST_MERGE_DATES
			(
			p_reference_no 		IN 	VARCHAR2,
			p_module  		 	IN 	oltbs_contract.module_code%type,
			p_component 		IN 	VARCHAR2,
			p_flat_component 		IN 	BOOLEAN,
			p_effective_date 		IN 	DATE,
			p_ty_comp_hoff 		IN OUT olpks_interest.ty_comp_hoff
			)
	RETURN BOOLEAN;
FUNCTION FN_NEW_REDEF
		(
		p_action 			IN 	VARCHAR2,
		p_reference_no 		IN 	VARCHAR2,
		p_module  		 	IN 	oltbs_contract.module_code%type,
		p_maturity_type 		IN 	VARCHAR2,
		p_payment_method 		IN 	oltbs_contract_master.payment_method%TYPE,
		p_component 		IN 	VARCHAR2,
		p_effective_date 		IN 	DATE,
		p_ty_comp_hoff 		IN 	olpks_interest.ty_comp_hoff,
		p_currency 			IN 	VARCHAR2,
		p_cur_principal 		IN 	NUMBER,
		p_old_schedule_date 	IN 	DATE,
		p_error_code 		OUT 	VARCHAR2,
		p_fn_call_id		IN NUMBER,
		p_tb_custom_data	IN OUT Global.ty_tb_custom_data
		)
	RETURN BOOLEAN;
	--OBCL_14.3_Bug#30310904 Starts
  FUNCTION fn_build_interest_detail(p_contract_ref_no in varchar2,
                                    p_module          in oltbs_contract.module_code%type,
                                    p_component       in varchar2,
                                    p_rate_handoff    in olpks_interest.ty_rate_handoff,
                                    p_spread_handoff  in olpks_interest.ty_spread_handoff,
                                    p_interest_hoff   in out olpks_interest.ty_interest_hoff,
                                    p_fn_call_id      IN NUMBER)
    RETURN BOOLEAN;
  --OBCL_14.3_Bug#30310904 Ends
   --Bug#34555877 starts
  FUNCTION fn_pre_get_derived_basis_amount(p_Contract_Ref_No  oltbs_contract.contract_ref_no%TYPE,
                                          p_component        lftbs_contract_interest.component%TYPE,
                                          p_exp_flag         IN lftb_contract_interest.exponential_flag%TYPE,
                                          p_inflation_adj_reqd IN VARCHAR2,
                                          p_schedule_date    lftbs_contract_interest.value_date%TYPE,
                                          p_basis_start_Date oltb_contract_iccf_calc.start_date%TYPE,
                                          p_start_date       oltb_contract_iccf_calc.start_date%TYPE,
                                          p_basis_amount     IN OUT oltb_contract_iccf_calc.BASIS_AMOUNT%TYPE) RETURN BOOLEAN;
  FUNCTION fn_post_get_derived_basis_amount(p_Contract_Ref_No  oltbs_contract.contract_ref_no%TYPE,
                                          p_component        lftbs_contract_interest.component%TYPE,
                                          p_exp_flag         IN lftb_contract_interest.exponential_flag%TYPE,
                                          p_inflation_adj_reqd IN VARCHAR2,
                                          p_schedule_date    lftbs_contract_interest.value_date%TYPE,
                                          p_basis_start_Date oltb_contract_iccf_calc.start_date%TYPE,
                                          p_start_date       oltb_contract_iccf_calc.start_date%TYPE,
                                          p_basis_amount     IN OUT oltb_contract_iccf_calc.BASIS_AMOUNT%TYPE) RETURN BOOLEAN;
  --Bug#34555877 ends
  --Bug#35004644 Starts
  FUNCTION Fn_Pre_log_interest_comp(p_ref                        IN VARCHAR2,
                              p_version                    IN oltbs_contract_master.version_no%TYPE,
                              p_esn                        IN oltbs_contract_master.event_seq_no%TYPE,
                              p_ccy                        IN oltbs_contract_master.currency%TYPE,
                              p_component                  IN lftbs_contract_interest.component%TYPE,
                              p_brn                        IN VARCHAR2,
                              p_ext_sys                    IN VARCHAR2,
                              p_msgid                      IN OUT VARCHAR2,
                              p_effective_date             IN DATE,
                              p_ty_int                     IN lfpkss_computation.ty_int,
                              p_lftb_contract_interest_rec IN lftbs_contract_interest%ROWTYPE,
                              p_process_prev_rate          IN oltb_rfr_interest_master.process_prev_rate%TYPE,
                              p_contract_liq               IN OLPKS_INTEREST.TY_TB_CONTRACT_LIQ,
                              p_contract_liq_summ          IN OLPKS_INTEREST.TY_TB_CONTRACT_LIQ_SUMM,
                p_amount_paid                IN OLPKS_INTEREST.TY_TB_amount_paid,
                p_contract_iccf_calc         IN OLPKS_INTEREST.TY_TB_contract_iccf_calc,
                p_contract_interest        IN OLPKS_INTEREST.TY_TB_contract_interest,
                              p_err_code                   IN OUT VARCHAR2,
                              p_err_params                 IN OUT VARCHAR2)
  RETURN BOOLEAN;
  
  FUNCTION Fn_Post_log_interest_comp(p_ref                        IN VARCHAR2,
                              p_version                    IN oltbs_contract_master.version_no%TYPE,
                              p_esn                        IN oltbs_contract_master.event_seq_no%TYPE,
                              p_ccy                        IN oltbs_contract_master.currency%TYPE,
                              p_component                  IN lftbs_contract_interest.component%TYPE,
                              p_brn                        IN VARCHAR2,
                              p_ext_sys                    IN VARCHAR2,
                              p_msgid                      IN OUT VARCHAR2,
                              p_effective_date             IN DATE,
                              p_ty_int                     IN lfpkss_computation.ty_int,
                              p_lftb_contract_interest_rec IN lftbs_contract_interest%ROWTYPE,
                              p_process_prev_rate          IN oltb_rfr_interest_master.process_prev_rate%TYPE,
                              p_contract_liq               IN OLPKS_INTEREST.TY_TB_CONTRACT_LIQ,
                              p_contract_liq_summ          IN OLPKS_INTEREST.TY_TB_CONTRACT_LIQ_SUMM,
                p_amount_paid                IN OLPKS_INTEREST.TY_TB_amount_paid,
                p_contract_iccf_calc         IN OLPKS_INTEREST.TY_TB_contract_iccf_calc,
                p_contract_interest        IN OLPKS_INTEREST.TY_TB_contract_interest,
                              p_err_code                   IN OUT VARCHAR2,
                              p_err_params                 IN OUT VARCHAR2)
  RETURN BOOLEAN;  
  --Bug#35004644 Ends
  --Bug#35322288 Starts
  FUNCTION fn_int_computation_exp(p_ty_int          IN lfpks_computation.ty_int,
                                  p_loop_counter    IN NUMBER,
		                          p_fn_call_id      IN NUMBER,
                                  p_tb_custom_data	IN OUT Global.ty_tb_custom_data)
     RETURN BOOLEAN;
  --Bug#35322288 Ends
END olpks_interest_custom;
/


CREATE or replace SYNONYM olpkss_interest_custom FOR olpks_interest_custom
/