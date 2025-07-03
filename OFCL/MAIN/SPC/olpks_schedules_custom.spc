create or replace package olpks_schedules_custom is
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_schedules_custom.spc
  **
  ** Module   : OL
  **
    This source is part of the Oracle Flexcube Corporate Lending  Software Product.
    Copyright Â© 2019 , Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
	
	created by : Gomathi G
	Date       : 23-Aug-2019
	created description : Resolved rate control
	Search String: OBCL_14.3_Bug#30003646
	
   **Created By         : Muthu malai.P
   **Created On         : 07-Jul-2020
   **Change Description : Hook added for the fn_populate_amount_due and fn_validate_schedules Function.
   **Search String      : OBCL-14.3_SUPPORT_BUG#31539681
   
   **Changed By         : Gomathi G
   **Date               : 29-SEP-2020
   **Change Description : Provided hooks to have holiday check with multi currency for a product/Contract.
   **Search String      : OBCL_14.3_SUPPORT_BUG#31941410
   
   **Changed By         : Akhila Samson
   **Date               : 13-Mar-2023
   **Change Description : Added hook for fn_payment_delay_days and fn_compute_schedule_dates
   **Search String      : OBCL_14.7_SUPP#35088099
   
   **Changed By         : Abhik Das
   **Date               : 07-Jul-2023
   **Change Description : Due to the hook change for fn_payment_delay_days, system was
                          always defaulting payment delay days as zero and system was
                          unable to compute pay_by_days correctly considering payment
                          delay days given by user.
                          Modified code for the hook change with IN OUT parameter to compute 
						  pay_by_days correctly considering payment delay days given by user.
   **Search String      : OBCL_14.7_Fujitsu_Bug#35552584_Changes
      
   **Changed By         : Akhila Samson
   **Date               : 03-Nov-2023
   **Change Description : Added hook for FN_FETCH_FLOATING_RATES_NEW function  
   **Search String      : Bug#35958182
  ----------------------------------------------------------------------------------------------------
  */

 -- OBCL_14.3_Bug#30003646 Starts
  FUNCTION fn_get_rates_FOR_period(p_branch          IN Varchar2,
                                   p_contract_ref_no IN oltbs_contract.contract_ref_no%type,
                                   p_component       IN oltbs_contract_iccf_calc.component%type,
                                   p_from_date       IN Date,
                                   p_to_date         IN Date,
                                   p_rates           IN OUT olpks_schedules.ty_rate,
                                   p_penalty_rate    IN NUMBER := 0,
                                   p_eff_rate        IN Boolean := TRUE,
	                                 p_fn_call_id      IN OUT NUMBER,
						                       p_Tb_Custom_data IN OUT GLOBAL.Ty_Tb_Custom_Data)
    RETURN BOOLEAN;
 --OBCL_14.3_Bug#30003646 Ends

--OBCL-14.3_SUPPORT_BUG#31539681 Starts
  FUNCTION fn_populate_amount_due(p_reference_no       IN VARCHAR2,
                                  p_version_no         IN NUMBER,
                                  p_contract_TYPE      IN VARCHAR2,
                                  p_maturity_TYPE      IN VARCHAR2,
                                  p_component          IN VARCHAR2,
                                  p_component_TYPE     IN VARCHAR2,
                                  p_effective_date     IN date,
                                  p_value_date         IN date,
                                  p_maturity_date      IN date,
                                  p_currency_amt_due   IN VARCHAR2,
                                  p_COUNTerparty       IN VARCHAR2,
                                  p_basis_amount_tag   IN VARCHAR2,
                                  p_holiday_ccy        IN VARCHAR2,
                                  p_ignore_holiday     IN VARCHAR2,
                                  p_FORward_backward   IN VARCHAR2,
                                  p_move_across_month  IN VARCHAR2,
                                  p_cascade_movement   IN VARCHAR2,
                                  p_amount_paid        IN OUT NUMBER,
                                  p_holiday_check      IN CHAR,
                                  p_holiday_chk_failed OUT BOOLEAN,
                                  p_error_code         OUT VARCHAR2,
                                  p_fn_call_id         IN OUT NUMBER,
                                  p_Tb_Custom_data     IN OUT GLOBAL.Ty_Tb_Custom_Data)
    RETURN BOOLEAN;

  FUNCTION fn_validate_schedules(p_reference_no       IN Varchar2,
                                 p_version_no         IN Number,
                                 p_event_seq_no       IN Number,
                                 p_contract_amount    IN Number,
                                 p_value_date         IN Date,
                                 p_maturity_date      IN Date,
                                 p_holiday_ccy        IN Varchar2,
                                 p_ignore_holiday     IN Varchar2,
                                 p_forward_backward   IN Varchar2,
                                 p_move_across_month  IN Varchar2,
                                 p_cascade_movement   IN Varchar2,
                                 p_holiday_chk_failed OUT Boolean,
                                 p_error_component    OUT Varchar2,
                                 p_error_code         OUT Varchar2,
                                 p_fn_call_id         IN OUT NUMBER,
                                 p_Tb_Custom_data     IN OUT GLOBAL.Ty_Tb_Custom_Data)
    RETURN BOOLEAN;
  --OBCL-14.3_SUPPORT_BUG#31539681 Ends
  --OBCL_14.3_SUPPORT_BUG#31941410 CHANGES STARTS
  FUNCTION fn_populate_revisions(p_reference_no      IN VARCHAR2,
                                 p_action            IN VARCHAR2,
                                 p_contract_TYPE     IN VARCHAR2,
                                 p_version_no        IN NUMBER,
                                 p_component         IN VARCHAR2,
                                 p_effective_date    IN Date,
                                 p_value_date        IN Date,
                                 p_maturity_date     IN date,
                                 p_holiday_ccy       IN VARCHAR2,
                                 p_ignore_holiday    IN VARCHAR2,
                                 p_FORward_backward  IN VARCHAR2,
                                 p_move_across_month IN VARCHAR2,
                                 p_cascade_movement  IN VARCHAR2,
                                 p_holiday_check     IN Char, --FCC 4.0 june 02 holiday check
                                 p_error_code        OUT VARCHAR2,
                                 p_fdate             IN DATE DEFAULT TO_DATE('31/12/2100',
                                                                             'DD/MM/YYYY'),
                                 p_mdate             IN DATE DEFAULT TO_DATE('31/12/2100',
                                                                             'DD/MM/YYYY'),
                                 p_fn_call_id        IN OUT NUMBER,
                                 p_Tb_Custom_Data    IN OUT GLOBAL.Ty_Tb_Custom_Data
                                 
                                 ) RETURN BOOLEAN;
  --OBCL_14.3_SUPPORT_BUG#31941410 CHANGES ENDS
  	--OBCL_14.7_SUPP#35088099 Start
	FUNCTION fn_Pre_compute_schedule_dates
				(p_start_date in date,
				p_value_date in date,
				p_maturity_date in date,
				p_holiday_ccy in Varchar2,
				p_frequency in Varchar2,
				p_month_end_ind IN VARCHAR2,
				p_frequency_units in number,
				p_no_of_schedules in number,
				p_ignore_holiday in Varchar2,
				p_forward_backward in Varchar2,
				p_move_across_month in Varchar2,
				p_cascade_movement in Varchar2,
				p_ty_schedule_date in out olpks_schedules.ty_schedule_date,
				p_holiday_check   in  char,
				p_holiday_chk_failed OUT boolean,
				p_error_code OUT Varchar2,
				p_facility_ccy   in Varchar2  := '',
				p_contract_ccy   in Varchar2  := '',
				p_local_ccy   in Varchar2  := '' ,
				p_intraday	in varchar2  :='N',
				p_val_dtd_pmnt  in     VARCHAR2  := 'N',
				p_Fc_List       IN VARCHAR2 DEFAULT NULL,
				p_Rvrsl_Penal_Comp  IN VARCHAR2 DEFAULT 'N',
				p_pay_by_days     IN NUMBER DEFAULT 0 
				) 
	RETURN BOOLEAN;
				
	FUNCTION fn_Post_compute_schedule_dates
				(p_start_date in date,
				p_value_date in date,
				p_maturity_date in date,
				p_holiday_ccy in Varchar2,
				p_frequency in Varchar2,
				p_month_end_ind IN VARCHAR2,
				p_frequency_units in number,
				p_no_of_schedules in number,
				p_ignore_holiday in Varchar2,
				p_forward_backward in Varchar2,
				p_move_across_month in Varchar2,
				p_cascade_movement in Varchar2,
				p_ty_schedule_date in out olpks_schedules.ty_schedule_date,
				p_holiday_check   in  char,
				p_holiday_chk_failed OUT boolean,
				p_error_code OUT Varchar2,
				p_facility_ccy   in Varchar2  := '',
				p_contract_ccy   in Varchar2  := '',
				p_local_ccy   in Varchar2  := '' ,
				p_intraday	in varchar2  :='N',
				p_val_dtd_pmnt  in     VARCHAR2  := 'N',
				p_Fc_List       IN VARCHAR2 DEFAULT NULL,
				p_Rvrsl_Penal_Comp  IN VARCHAR2 DEFAULT 'N',
				p_pay_by_days     IN NUMBER DEFAULT 0 
				) 
	RETURN BOOLEAN;
	
	---OBCL_14.7_Fujitsu_Bug#35552584_Changes Starts---
  --commented
  /*
	FUNCTION Fn_Pre_Payment_Delay_Days(p_Reference_No IN VARCHAR2,p_component IN VARCHAR2)
	RETURN NUMBER;
	
	FUNCTION Fn_Post_Payment_Delay_Days(p_Reference_No IN VARCHAR2,p_component IN VARCHAR2)
	RETURN NUMBER;
  */
  FUNCTION Fn_Pre_Payment_Delay_Days(p_Reference_No IN VARCHAR2,
                                   p_component IN VARCHAR2,
                                   p_Payment_Delay_Days IN OUT NUMBER)
  RETURN BOOLEAN;
  FUNCTION Fn_Post_Payment_Delay_Days(p_Reference_No IN VARCHAR2,
                                   p_component IN VARCHAR2,
                                   p_Payment_Delay_Days IN OUT NUMBER)
  RETURN BOOLEAN;
  ----OBCL_14.7_Fujitsu_Bug#35552584_Changes Ends----
	--OBCL_14.7_SUPP#35088099 End
  --Bug#35958182 start
  FUNCTION fn_Pre_fetch_floating_rates_new(
			p_branch IN Varchar2,
			p_from_date IN Date,
			p_to_date IN Date,
			p_currency IN Varchar2,
			p_rate_code IN Varchar2,
			p_basis_amount IN Number,
			p_borrow_lend_ind IN varchar2,
			p_tenor	IN	number,
			p_rate_calc_type	IN varchar2,
			p_ty_rate IN OUT olpks_schedules.ty_rate,
			p_rate_fixing_days IN NUMBER DEFAULT 0,
			p_fn_call_id	 IN NUMBER,
			p_tb_custom_data IN OUT Global.Ty_Tb_Custom_Data
			)
  RETURN BOOLEAN;
 
  FUNCTION fn_Post_fetch_floating_rates_new(
			p_branch IN Varchar2,
			p_from_date IN Date,
			p_to_date IN Date,
			p_currency IN Varchar2,
			p_rate_code IN Varchar2,
			p_basis_amount IN Number,
			p_borrow_lend_ind IN varchar2,
			p_tenor	IN	number,
			p_rate_calc_type	IN varchar2,
			p_ty_rate IN OUT olpks_schedules.ty_rate,
			p_rate_fixing_days IN NUMBER DEFAULT 0,
			p_fn_call_id	 IN NUMBER,
			p_tb_custom_data IN OUT Global.Ty_Tb_Custom_Data
			)
  RETURN BOOLEAN;
  --Bug#35958182 End
end olpks_schedules_custom;
/
CREATE or replace SYNONYM olpkss_schedules_custom FOR olpks_schedules_custom
/