CREATE OR REPLACE PACKAGE lbpks_rate_fixing AS
/*---------------------------------------------------------------------------------
**
** File Name   : lbpks_rate_fixing.SPC
**
** Module      : LOANS SYNDICATION
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.

-------------------------------------------------------------------------------------------
21-FEB-2006 FLEXCUBE V.CL Release 7.0 New Package BY Nirupama Chadha 
14-JUL-2009 CITIUS-LS#5969 BPNT is not fired when irfx/init is done and sfnt already captured.
10-NOV-2011 Flexcube V.CL Release 7.10 FS Tag 05 Changes - Floors and Ceilings Phase 2 - g_undo_irfx_prop is used to store 'Y' when 
	floor/ceiling propagation happened from interest rate fixing screen (before auth) needs to be undone.
27-MAY-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag09,Automatic Rate Setting, function added for auto rate fixing, rate rounding, populating rate bowser and rate change check
27-SEP-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag09 IUT#212 changes,added a global variable to indicate rate setting has happend thorugh auto rate set job
13-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag09 IUT#218 changes,System was not considering the split details for auto rate setting
17-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag09 ITR#61 changes, rounding rules will be populated as per the parent contract
07-JAN-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 RETRO CITIUS#19408 Changes system should pick the rate based on Rate fixing date .
09-JAN-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 RETRO CITIUS#19486 Auto rate set is not enforced for any Split repricing insturctions - Prime to Libor conversions.
29-JAN-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 RETRO CITIUS#19563 Changes are made to default the rate setting rules based on child product.
04-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 RETRO CITIBLR#35374 changes, system picking up wrong rate setting details for child contracts.
04-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 RETRO CITIBLR#35372 changes, Null values are coming in participant fax message.
11-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 RETRO CITIUS#19627 Two new function fn_populate_dd_tags and fn_get_allinrate added to populate the rate fixing event DD tags automatically.
20-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 RETRO CITIUS#19484 changes for stub processing.
20-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 RETRO CITIUS#19611 changes 
	Added new procedure to reassign the seq no based on participant count
20-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 RETRO CITIUS#19681 new function fn_get_tranche_ref_no is added to fetch the tranche ref no for drawdowns.
29-SEP-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 RETRO CITIUS#19914 branch needs to be passed for validate pmc rates.

------------------------------------------CHANGE HISTORY----------------------------------
*/
  g_undo_irfx_prop	VARCHAR2(1) 	:= 'N'; --10-NOV-2011 Flexcube V.CL Release 7.10 FS Tag 05 Changes
  g_called_from		VARCHAR2(10);--27-SEP-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag09 IUT#212 changes
  g_stub_processing			varchar2(1) := 'N';  --CITIUS#19484 changes  
--FUNCTION for exrate
  FUNCTION fn_process_exrate_fixing
      (p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE
      ,p_withlog IN BOOLEAN 
      ,p_eventseqno IN NUMBER 
      ,p_errcode IN OUT VARCHAR2
      ,p_errprm  IN OUT VARCHAR2)
  RETURN BOOLEAN;
  --function for exrate maintenance
  FUNCTION fn_process_exrate_fixing_mant
        (p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE
        ,p_event_code IN VARCHAR2 
        ,p_eventseqno IN NUMBER 
        ,p_errcode IN OUT VARCHAR2
        ,p_errprm  IN OUT VARCHAR2)
  RETURN BOOLEAN;

   FUNCTION fn_process_a_component
      (p_rate_fixing_rec IN lbtbs_rate_fixing_details%ROWTYPE
      ,p_event IN VARCHAR2
      ,p_errcode IN OUT VARCHAR2
      ,p_errprm  IN OUT VARCHAR2)
   RETURN BOOLEAN;
   FUNCTION fn_process_a_contract
      (p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE
      ,p_withlog IN BOOLEAN
      ,p_eventseqno IN NUMBER
      ,p_event	 oltbs_contract_event_log.event_code%TYPE 
      ,p_errcode IN OUT VARCHAR2
      ,p_errprm IN OUT VARCHAR2)
   RETURN BOOLEAN;
   FUNCTION fn_chk_tenor_values 
      (p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE
      ,p_component IN VARCHAR2
      ,p_rate_effective_date IN DATE
      ,p_rate_effective_end_date IN OUT DATE
      ,p_tenor_unit IN OUT VARCHAR2
      ,p_tenor_value IN OUT NUMBER
      ,p_tenor_type IN OUT VARCHAR2
      ,p_next_effective_date IN OUT DATE
      ,p_next_fixing_date IN OUT DATE
      ,p_errcode IN OUT VARCHAR2
      ,p_errprm IN OUT VARCHAR2)
   RETURN BOOLEAN;
   FUNCTION fn_insert_next_int_rec
      (p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE
      ,p_component IN VARCHAR2
      ,p_errcode IN OUT VARCHAR2
      ,p_errprm IN OUT VARCHAR2)
   RETURN BOOLEAN;
  FUNCTION fn_update_exfx_utilisation
      (p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE
      ,p_exchange_rate IN NUMBER
      ,p_exrate_effective_date IN DATE
      ,p_auth_stat IN VARCHAR2
      ,p_module   IN  VARCHAR2
      ,p_event_code IN VARCHAR2
      ,p_errcode IN OUT VARCHAR2
      ,p_errprm IN OUT VARCHAR2)
   RETURN BOOLEAN; 
   FUNCTION fn_push_intrate_for_sp
      (p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE 
      ,p_event_code IN VARCHAR2
      ,p_errcode IN OUT VARCHAR2
      ,p_errprm IN OUT VARCHAR2)
   RETURN BOOLEAN;
   FUNCTION fn_is_event_generated
      (p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE
      ,p_event_code IN VARCHAR2
      ,p_event_seq_no OUT NUMBER
      ,p_errcode IN OUT VARCHAR2
      ,p_errprm IN OUT VARCHAR2)
   RETURN BOOLEAN;
   FUNCTION fn_insert_next_exrate_rec
       (p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE
       ,p_next_effective_date IN DATE
       ,p_next_fixing_date IN DATE
       ,p_contract_ccy IN VARCHAR2
       ,p_tranche_ccy IN VARCHAR2
       ,p_errcode IN OUT VARCHAR2
       ,P_errprm IN OUT VARCHAR2)
   RETURN BOOLEAN;
   FUNCTION fn_pickup_fixing_reqd_comps
      (p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE
      ,p_book_date IN DATE
      ,p_value_date IN DATE
      ,p_fixing_date IN DATE
      ,p_notice_date IN DATE
      ,p_errcode IN OUT VARCHAR2
      ,p_errprm IN OUT VARCHAR2)
   RETURN BOOLEAN;
   
FUNCTION   fn_undo_irfx (p_contract_ref_no  VARCHAR2,
		p_error_code  IN OUT  VARCHAR2
	   ,p_error_params IN OUT  VARCHAR2) 
		RETURN  BOOLEAN;

FUNCTION fn_irfx_before_first_auth(p_contract_ref_no IN 	 varchar2,
		p_rate_eff_date   IN 	 date
		,p_errcode	     IN OUT Varchar2
		,p_errparam	     IN OUT Varchar2)
RETURN BOOLEAN;

--CITIUS-LS#5969 start

g_irfx_proc VARCHAR2(1) := 'N';--CITIUS-LS#5969

FUNCTION fn_fwd_init_wrap
	(p_ref_no		IN oltbs_contract.contract_ref_no%TYPE
	,p_module		IN oltbs_contract.module_code%TYPE
	,p_err_code		IN OUT VARCHAR2
	,p_err_param	IN OUT VARCHAR2
	)
RETURN BOOLEAN;
--CITIUS-LS#5969 end
--27-MAY-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag09,Automatic Rate Setting, changes start
FUNCTION fn_get_auto_rate(
						p_contract_ref_no 	IN lbtbs_auto_rate_browser.contract_ref_no%TYPE
						,p_component		IN VARCHAR2
						,p_split_serial_no 	IN NUMBER
						,p_split_number		IN NUMBER
						,p_rate_code		IN lbtbs_rate_fixing_details.rate_code%TYPE
						,p_rate_fixing_date  	IN  DATE --25-NOV-2014  CITIUS#19408 changes
						,p_rate  		IN OUT NUMBER
						,p_errcode  		IN OUT VARCHAR2
						,p_errparam    		IN OUT VARCHAR2
			      )              
RETURN BOOLEAN;
/*
FUNCTION fn_auto_rate_set_rounding(
               p_contract_ref_no 	IN lbtbs_auto_rate_browser.contract_ref_no%TYPE
               ,p_rounding_rule 	IN lbtb_rate_setting_rules.rounding_rule%TYPE               
               ,p_rate  		IN OUT NUMBER
               ,p_errcode  		IN OUT VARCHAR2
               ,p_errparam    		IN OUT VARCHAR2
              )              
RETURN BOOLEAN;
*/


FUNCTION fn_auto_rate_set(
						p_contract_ref_no	lbtbs_auto_rate_browser.contract_ref_no%TYPE
						,p_component		IN VARCHAR2
						,p_split_serial_no 	IN NUMBER
						,p_split_number		IN NUMBER
						,p_event_code		IN VARCHAR2
						,p_rate_code		IN lbtbs_rate_fixing_details.rate_code%TYPE
						,p_rate_fixing_date  	IN  DATE --25-NOV-2014  CITIUS#19408 changes 
						,p_errcode    		IN OUT Varchar2
						,p_errparam		IN OUT Varchar2
              )              
RETURN BOOLEAN;

PROCEDURE pr_auto_rate_set(  
		p_branch_no		IN 	VARCHAR2
		,p_seq_no		IN	NUMBER		
		);

PROCEDURE pr_rate_set_exp_log(
					p_contract_ref_no	lbtbs_auto_rate_browser.contract_ref_no%TYPE
			       ,p_component		IN VARCHAR2
			       ,p_split_serial_no 	IN NUMBER
			       ,p_split_number		IN NUMBER			      
			       ,p_errcode    		IN OUT VARCHAR2
              		       ,p_errparam		IN OUT VARCHAR2
			     );
FUNCTION fn_process_auto_rate_set(
				 p_contract_ref_no		IN 		lbtb_rate_fixing_details.contract_ref_no%TYPE
				,p_event_seq_no		IN		lbtb_rate_fixing_details.event_seq_no%TYPE
				,p_component		IN		lbtb_rate_fixing_details.component%TYPE
				,p_errcode     IN OUT Varchar2
               			,p_errparam    IN OUT Varchar2
              			)              
RETURN BOOLEAN ;

FUNCTION fn_pop_auto_rate_set_browser(
            p_contract_ref_no	IN lbtbs_auto_rate_browser.contract_ref_no%TYPE
       --  ,p_component		IN lbtbs_auto_rate_browser.component%TYPE
           ,p_split_serial_no 	IN lbtbs_auto_rate_browser.split_serial_no%TYPE
	       ,p_split_number		IN lbtbs_auto_rate_browser.split_number%TYPE
	       ,p_value_date		IN DATE
	       ,p_int_rate_fixing_date	IN DATE
	       ,p_event_code		IN lbtbs_auto_rate_browser.event_code%TYPE
	       --,p_rate_code		IN lbtbs_auto_rate_browser.rate_code%TYPE
	       ,p_product_code		IN VARCHAR2
           ,p_errcode    		IN OUT VARCHAR2
           ,p_errparam		IN OUT VARCHAR2
              )              
RETURN BOOLEAN;

Function fn_rate_fix_date_adj
	(
	p_ContractRefNo		IN		lbtb_rate_fixing_details.contract_ref_no%TYPE
	,P_eventseqno		IN		lbtb_rate_fixing_details.event_seq_no%TYPE
	,p_component		IN		lbtb_rate_fixing_details.component%TYPE
	,p_rate_start_date	IN		DATE
	,p_rate_end_date	IN		DATE	
	,p_errcode		IN OUT		VARCHAR2
	,p_param		IN OUT		VARCHAR2
)
Return Boolean;

FUNCTION fn_chk_comp_rate_set_reqd(			      
			       p_component		IN VARCHAR2		
			       ,p_product_code		IN VARCHAR2
			      )              
RETURN VARCHAR2;

Function fn_purge_auto_rateset_data
	(
	p_branch		IN		VARCHAR2
	,P_branch_date		IN		DATE
	,p_errcode		IN OUT		VARCHAR2
	,p_param		IN OUT		VARCHAR2	
)
RETURN BOOLEAN;

Function fn_rate_change_check
							(
							P_RATE_CODE	IN VARCHAR2, P_BUSINESS_DATE IN DATE, P_VALUE_DATE IN DATE, P_REUTERS_CODE IN VARCHAR2, P_CURRENCY IN VARCHAR2
							)
RETURN ol_lsty_char_tbl;

PROCEDURE pr_auto_rate_setting(  
		p_branch_no	IN 	VARCHAR2
		,p_seq_no	IN	NUMBER
		);

FUNCTION fn_pop_pmc_fcc_rate_master(
									p_rate_code     in lbtm_pmc_fcc_rate_master.rate_code%type ,
									p_currency      in lbtm_pmc_fcc_rate_master.currency%type ,
									p_business_date in lbtm_pmc_fcc_rate_master.business_date%type ,
									p_value_date    in lbtm_pmc_fcc_rate_master.value_date%type,
									p_branch_code   in sttb_record_log.branch_code%type,
									p_error_code	IN OUT VARCHAR2,
									p_error_param	IN OUT VARCHAR2
									)
RETURN BOOLEAN;
--27-SEP-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag09 IUT#212 changes start
FUNCTION	fn_check_auto_rate_set_cont
								(
									p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE
									,p_event_seq_no			IN		oltbs_contract.latest_event_seq_no%TYPE
									,p_event_code			IN		oltbs_contract.curr_event_code%TYPE
									,p_split_serial_no		IN		lbtbs_rate_setting_rules.split_serial_no%TYPE --13-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag09 IUT#218 changes
									,p_auto_rate_cont		OUT		VARCHAR2
									,p_error_code			IN OUT	VARCHAR2
									,p_error_param			IN OUT	VARCHAR
 									,p_product_code			IN	oltbs_contract.product_code%type DEFAULT NULL --CITIUS#19486 changes
								)
RETURN BOOLEAN;
--27-SEP-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag09 IUT#212 changes end
--13-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag09 IUT#218 changes start   
PROCEDURE	pr_set_called_from_flag(
									p_set_auto_rate_set	IN	VARCHAR
									);
--13-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag09 IUT#218 changes end
--17-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag09 ITR#61 changes start
FUNCTION FN_GET_DRIVER_DETAILS
							 ( 	 p_contract_ref_no        	IN oltbs_contract.contract_ref_no%TYPE
								,p_driver_contract_ref_no 	IN oltbs_contract.contract_ref_no%TYPE
								,p_prm_component          	IN VARCHAR2
								,p_function_id            	IN VARCHAR2
								,p_split_no					IN NUMBER
								,p_split_serial_no			IN NUMBER
								,p_event_seq_no				IN NUMBER
								,p_product_code				IN VARCHAR2  --10-JAN-2015 CITIUS#19563
								,p_rounding_unit		    OUT	NUMBER
								,p_rounding_rule		    OUT	VARCHAR2
								)

RETURN BOOLEAN;
--17-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag09 ITR#61 changes end
--27-MAY-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag09,Automatic Rate Setting, changes end 
--10-FEB-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag09 CITIBLR#35372 changes start
FUNCTION  fn_auto_rate_allowed
                (
                  p_contract_ref_no    IN    oltbs_contract.contract_ref_no%TYPE
                  ,p_event_seq_no      IN    oltbs_contract.latest_event_seq_no%TYPE
                  ,p_event_code        IN    oltbs_contract.curr_event_code%TYPE
                  ,p_split_serial_no   IN    lbtbs_rate_setting_rules.split_serial_no%TYPE
                  ,p_product_code      IN    oltbs_contract.product_code%type DEFAULT NULL
                                                                                                )
RETURN VARCHAR2;
--10-FEB-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag09 CITIBLR#35372 changes end
--CITIUS#19611 changes starts
PROCEDURE pr_update_seq_no
			(
			 p_errcode    		IN OUT Varchar2
			,p_errparam		IN OUT Varchar2
			);
FUNCTION fn_validate_pmc_rates
		(
		 p_branch		IN     Varchar2 --CITIUS#19914
		,p_errcode    		IN OUT Varchar2
		,p_errparam		IN OUT Varchar2
		)
RETURN	BOOLEAN;
FUNCTION fn_validate_auto_rate
		(
		 p_contract_ref_no	IN  VARCHAR2
		 ,p_rate_fixing_date	IN  DATE
		 ,p_rate_code		IN  VARCHAR2
		 ,p_errcode    		IN OUT VARCHAR2
		,p_errparam		IN OUT VARCHAR2
		)
RETURN VARCHAR2;

FUNCTION fn_check_branch_status
		(
		 p_errcode    		IN OUT Varchar2
		,p_errparam		IN OUT Varchar2
		)
RETURN BOOLEAN;
--CITIUS#19611 changes ends

--12-FEB-2015 CITIUS#19627 changes starts
FUNCTION fn_populate_dd_tags
	(p_contract_ref_no      IN oltbs_contract.contract_ref_no%TYPE
	,p_split_number		IN NUMBER
	,p_new_rate 		IN NUMBER
	,p_rate_code		IN lbtbs_rate_fixing_details.rate_code%TYPE
	,p_base_rate1 		IN NUMBER
	,p_margin_rate 		IN NUMBER
	,p_final_rate 		IN NUMBER
	,p_err_code		IN OUT VARCHAR2
	,p_err_param	        IN OUT VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_get_allinrate(p_ref_no 	IN VARCHAR2, 
			  p_renewal_no 	IN NUMBER, 
			  p_split_no 	IN NUMBER, 
			  p_mode 	IN VARCHAR2,
			  p_base_rate1  IN OUT NUMBER,
			  p_margin_rate IN OUT NUMBER,
			  p_final_rate  IN OUT NUMBER)
RETURN BOOLEAN;
--12-FEB-2015 CITIUS#19627 changes ends
--12-FEB-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag09 CITIBLR#35374 changes starts
FUNCTION  fn_pop_rate_setting_rules
                                  (
								  p_contract_ref_no IN    oltbs_contract.contract_ref_no%TYPE,
								  p_split_serial_no IN    lbtbs_rate_setting_rules.split_serial_no%type,
								  p_event_code      IN    oltbs_contract.curr_event_code%TYPE,
								  p_error_code	  	IN OUT	VARCHAR2,
								  p_error_param		 IN OUT	VARCHAR2
                                  )
RETURN BOOLEAN;
--12-FEB-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 FS Vol1 Tag09 CITIBLR#35374 changes ends
--CITIUS#19681 changes starts
FUNCTION fn_get_tranche_ref_no
		(
			p_contract_ref_no 	IN  VARCHAR2
		)
RETURN VARCHAR2;
-- OBCL_14.4_Rate_rounding changes STARTS
FUNCTION Fn_Auto_Rate_Set_Rounding(
                                     -- p_contract_ref_no  IN lbtbs_auto_rate_browser.contract_ref_no%TYPE
                                     p_Rounding_Rule IN Lbtb_Rate_Setting_Rules.Rounding_Rule%TYPE,
                                     p_Rounding_Unit IN Lbtb_Rate_Setting_Rules.Rounding_Unit%TYPE,
                                     p_rounding_position IN LFTB_CONTRACT_INTEREST.RATE_rounding_position%TYPE
                                     ,p_Rate          IN OUT NUMBER,
                                     p_Errcode       IN OUT VARCHAR2,
                                     p_Errparam      IN OUT VARCHAR2)
    RETURN BOOLEAN ;
-- OBCL_14.4_Rate_rounding changes ENDS
--CITIUS#19681 changes end
END lbpks_rate_fixing;
/
CREATE or replace SYNONYM lbpkss_rate_fixing FOR lbpks_rate_fixing
/