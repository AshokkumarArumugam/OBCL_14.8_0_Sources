CREATE OR REPLACE PACKAGE lfpks_margin AS
/*-----------------------------------------------------------------------------------
**
** File Name	: lfpks_margin.SPC
**
** Module	: MARGIN AND INTEREST
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
-------------------------------------------------------------------------------------
*/
/*-----------------------------------CHANGE HISTORY----------------------------------
19-JAN-2006 FLEXCUBE V.CL Release 7.0 BY Nirupama Chadha New Package
04-Jul-2006 FCC V.CL Release 7.1 changes , changes for liqd 
01-aug-2006 FCC V.CL Release 7.1 Added a new procedure pr_pop_margin_for_amendment
16-AUG-2006 Flexcube V.CL Release 7.1, Changes, ARUN, Added new Function fn_pop_for_pricing_grid.
05-Jul-2007 FCC V.CL Release 7.3 rollover site retro changes
03-AUG-2007 FCC V.CL Release 7.3 SPLIT Re Price changes  INTRODUCED A NEW FUNCTION
18-sep-2007 FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-213
24-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#89
06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1208,STP Consolidation,By Swapnasish,The BF-BAU April Retro.
21-Feb-2008 CITIUS-LS#1124 changes. Overloaded the functions fn_margin_valueM_futuredate and fn_margin_interest_calc to do margin pickup for specific contracts from front end.
12-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag05 Different Margin for Participants changes, Introduced margin pick up logic for participant.
15-APR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag05 IUT# 110 Different Margin for Participants changes, Introduced fn_validate_borwr_part_margn to compare the borrower and participant margin
29-APR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag05 IUT#203 Different Margin for Participants changes, Introduced Temporary table for part margin detail and population of the same.
18-MAY-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag05 FT#1 Different Margin for Participants changes, system failing for future dated drawdown booking.Borr margin pick up happening for dd value date but part margin pick up happening for application date.
-------------------------------------------------------------------------------------

  Changed By         : Rahul Garg
  Changed On         : 28-Feb-2023
  Search String      : Bug#34990312
  Change Reason      : Changes Made to move the MRFX batch from DB to JAVA layer

  Changed By         : Palanisamy M
  Date               : 16-May-2023
  Change Description : Hook for Fn_Margin_Pickup_Wrapper
  Search String      : Bug#35386919 
  
    
  Changed By         : Jayaram
  Date               : 12-Feb-2025
  Change Description : APPLYING BACKDATED INTEREST MARGIN CHANGE FOR LIQUIDATED CONTRACT
  Search String      : Bug#37567307 
*/

--Bug#35386919 Changes starts
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
  FUNCTION Fn_Skip_Custom RETURN BOOLEAN;
--Bug#35386919 Changes ends

--function for batch processing

G_DD_REF_NO OLTB_CONTRACT.CONTRACT_REF_NO%TYPE; --NON CASCADE
-- changes start for Bug#34990312 
g_future_date_mrfx varchar2(1) :='N'; 
FUNCTION Fn_Margin_Valuem_Futuredate(p_Processing_Branch IN Oltbs_Contract.Branch%TYPE,
                                       p_Processing_Date   IN DATE,
                                       p_Contract_Ref_No   IN Oltbs_Contract.Contract_Ref_No%Type,
									   p_Error_Code        IN OUT VARCHAR2,
                                       p_Error_Params      IN OUT VARCHAR2
                                      ) 
	RETURN VARCHAR2;
FUNCTION Fn_Margin_Repickup_For_Os(p_Processing_Branch IN Oltbs_Contract.Branch%TYPE,
                                     p_Processing_Date   IN DATE,
                                     p_Product           IN Oltbs_Contract.Product_Code%TYPE,
									 p_Contract_Ref_No   IN oltbs_contract.Contract_Ref_No%Type,	
                                     p_Error_Code        IN OUT VARCHAR2,
                                     p_Error_Params      IN OUT VARCHAR2)
    RETURN VARCHAR2;	
	FUNCTION Fn_Margin_Interest_Calc(p_Processing_Branch IN Oltbs_Contract.Branch%TYPE,
                                   p_Module            IN Oltbs_Contract.Module_Code%TYPE,
                                   p_Processing_Date   IN DATE,
                                   p_Product           IN Oltbs_Contract.Product_Code%TYPE,
                                   p_Contract_Ref_No   IN Oltbs_Contract.Contract_Ref_No%type,
								   p_user_id           IN VARCHAR2,
								   p_Elcm_Msgid        OUT Sypks_Utils.g_Elcm_Msgid%TYPE,
								   p_rfr_Msgid         OUT Sypks_Utils.g_rfr_Msgid%TYPE,
                                   p_Error_Code        IN OUT VARCHAR2,
                                   p_Error_Params      IN OUT VARCHAR2
                                   ) 
	RETURN VARCHAR2;	
-- changes end for Bug#34990312 
function fn_margin_batch(
         p_processing_branch  	IN    	oltbs_contract.branch%TYPE,
         p_module       	IN    	oltbs_contract.module_code%TYPE,
         p_processing_date    	IN    	date,
	 p_product         	IN    	oltbs_contract.product_code%TYPE,
         p_commit_frequency   	IN    	oltbs_automatic_process_master.bod_commit_count%TYPE,
         p_error_code      	IN OUT  varchar2,
         p_error_params    	IN OUT  varchar2
         )
return boolean;
-- This function does the margin pickup for all margin components.
function fn_margin_pickup(
	p_dd_ref_no 		in 	oltbs_contract.contract_ref_no%type,
	p_esn 			in 	number,
	p_int_comp          	in	lftbs_contract_margin_master.component%type,
	p_margin_comp       	in 	lftbs_contract_margin_master.margin_component%type,
	p_from_date 		in 	date,
	p_to_date 		in 	date,
	p_error_code		in out	varchar2,
	p_error_params		in out	varchar2)
return boolean;
function fn_margin_pickup(
	p_dd_ref_no 		in 	oltbs_contract.contract_ref_no%type,
	p_esn 			in 	number,
	p_int_comp          	in	lftbs_contract_margin_master.component%type,
	p_margin_comp       	in 	lftbs_contract_margin_master.margin_component%type,
	p_from_date 		in 	date,
	p_to_date 			in 	date,
	p_dd_amount		in	varchar2,
   	p_dd_ccy		IN 	CYTMS_CCY_DEFN.ccy_code%TYPE,
	p_error_code		in out	varchar2,
	p_error_params		in out	varchar2,
	p_actual_temp        IN VARCHAR2 DEFAULT 'A' )--24-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#89
return boolean;
--FCC V.CL Release 7.3 rollover site retro changes
--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-213 st
FUNCTION Fn_margin_pickup_Rollover
		(
	   	p_dd_ref_no             	in       oltbs_contract.contract_ref_no%type,
	   	p_split_no               in       number,
	   	p_version_no             in       number,
	   	p_prm_tranch_ref_no      in       lftbs_contract_margin_master.margin_rule_ref_no%type,
	   	p_prm_split_prod         in       lbtbs_borrower_drawdown_margin.product_code%type,
	   	p_error_code      		in out   Varchar2,
	   	p_error_params    		in out   Varchar2
		)
RETURN BOOLEAN;
--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-213 ed
--FCC V.CL Release 7.3 rollover site retro changes
--function added by nirupama for margin start -- this function work only for value maintenance --margin
FUNCTION fn_mark_margin_repickup_valuem(p_tranche_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                                        p_margin_comp IN lftbs_contract_margin_master.margin_component%TYPE,
                                        p_cust IN lftbs_contract_margin_master.customer_no%TYPE,
                                        p_processing_date	DATE,
                                        p_error_code IN OUT ertbs_msgs.err_code%TYPE,
                                        p_error_params IN OUT VARCHAR2) RETURN BOOLEAN;
--functin added by nirupama for margin end

--function added by nirupama called from lbpks_vdbal , function update margin master
--after change in outstanding of tranche
function fn_margin_valueM_futuredate(
         p_processing_branch  	IN    	oltbs_contract.branch%TYPE,
         p_processing_date    	IN    	date,
         p_commit_frequency   	IN    	oltbs_automatic_process_master.bod_commit_count%TYPE,
         p_error_code      	IN OUT  varchar2,
         p_error_params    	IN OUT  varchar2
         )
return boolean;
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1208 Start By Swapnasish
--CITIUS-LS#1124 changes start--CITIUS-LS#1208.The BF-BAU April Retro.Starts
function fn_margin_valueM_futuredate(
         p_processing_branch  	IN    	oltbs_contract.branch%TYPE,
         p_processing_date    	IN    	date,
         p_commit_frequency   	IN    	oltbs_automatic_process_master.bod_commit_count%TYPE,
         p_error_code      	IN OUT  varchar2,
         p_error_params    	IN OUT  varchar2,
         p_contract_ref_no      IN	varchar2
         )
return boolean;
--CITIUS-LS#1124 changes end--CITIUS-LS#1208.The BF-BAU April Retro.Ends

--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1208 End By Swapnasish
Function fn_mark_margin_repickup
(
	p_tranche_ref_no in oltbs_contract.contract_ref_no%type,
	p_from_date       in date,
  	p_exclude_dd      in oltbs_contract.contract_ref_no%type default 'XXX',
 	p_error_code 	  in out ertbs_msgs.err_code%type,
 	p_error_params    in out varchar2,
  	P_margin_comp     in lftbs_contract_margin_master.margin_component%type DEFAULT NULL
 )
 return boolean;
 
-- This function will be called from the Margin Maintenance done from the application.
function fn_marg_pickup_for_maint(
	p_cont_ref_no 		in 	LFTB_CONTRACT_MARGIN_MASTER.contract_ref_no%type,
	p_marg_component 		in 	LFTB_CONTRACT_MARGIN_MASTER.margin_component%type,
	p_error_code		in out	varchar2,
	p_error_params		in out	varchar2)
return boolean;

--Function to picku margin whenever tranche OUTSTANDING balance changes
FUNCTION fn_margin_pickup_for_vdbal
		(
		p_tranche_ref_no	IN		lbtbs_tranche_vdbal_master.contract_ref_no%type,
		p_value_date	IN		lbtbs_tranche_vdbal_master.value_date%type,
		p_error_code	IN OUT	Varchar2,
		p_error_params	IN OUT	Varchar2
		)
return BOOLEAN;


-- This function will perform the margin pickup, interest calculation, and tax calculation
-- and this function will be called from Batch.
function fn_margin_interest_calc(
	p_processing_branch	in	oltbs_contract.branch%type,
	p_module		in	oltbs_contract.module_code%type,
	p_processing_date	in	date,
	p_product		in	oltbs_contract.product_code%type,
	p_commit_frequency	in	oltbs_automatic_process_master.bod_commit_count%type,
	p_error_code		in out	varchar2,
	p_error_params		in out	varchar2)
return boolean;
--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1208 Start By Swapnasish
--CITIUS-LS#1124 changes start--CITIUS-LS#1208.The BF-BAU April Retro.Starts
function fn_margin_interest_calc(
         p_processing_branch  IN    oltbs_contract.branch%TYPE,
         p_module       IN    oltbs_contract.module_code%TYPE,
         p_processing_date    IN    date,
         p_product         IN    oltbs_contract.product_code%TYPE,
         p_commit_frequency   IN    oltbs_automatic_process_master.bod_commit_count%TYPE,
         p_error_code      IN OUT   varchar2,
         p_error_params    IN OUT   varchar2,
         p_contract_ref_no 	IN	 varchar2	 
         )
return boolean;
--CITIUS-LS#1124 changes end--CITIUS-LS#1208.The BF-BAU April Retro.Ends

--06-NOV-2008 CITIUS-LS#SRT1451 CITIUS-LS#1208 End By Swapnasish
-- This function in turns calls the margin pickup function and it is called from Batch function.
function fn_margin_pickup_wrapper(
	p_dd_ref_no		in 	oltbs_contract.contract_ref_no%Type,
	p_error_code		in out	Varchar2,
	p_error_params	in out	Varchar2,
	p_event_reg_reqd		in		varchar2 default 'Y',
	p_esn				in		varchar2 default NULL)
return boolean;

-- This function will return the margin value for a contract ref,interest comp,margin comp
-- and effective date.
/*function fn_get_margin_value(
	p_contract_ref_no       in 		lftbs_contract_margin_detail.contract_ref_no%type,
	p_int_comp              in 		lftbs_contract_margin_detail.component%type,
	p_margin_comp           in 		lftbs_contract_margin_detail.margin_component%type,
	p_eff_date		in		date,
	p_margin_value		in out		lftbs_contract_margin_detail.margin_rate%type,
	p_margin_amount		in out		NUMBER ,--LFTM_MARGIN_RATE.margin_amt%type,
	p_error_code		in out		Varchar2,
	p_error_params		in out		Varchar2
)
return boolean;*/

-- This function picks up rate for a given drawdown reference number.
Function Fn_Pickup_Rate_for_DD
	(
	p_tranche_ref_no	IN		oltbs_contract.contract_ref_no%Type,
	p_drawdown_ref_no	IN		oltbs_contract.contract_ref_no%Type,
	p_margin_comp		IN		lftms_margin_component.component%Type,
	p_ccy			IN		lftms_margin_ccy.ccy%Type,
	p_effective_date	IN		Date,
	p_balance_type		IN		lbtbs_tranche_vdbal_detail.balance_type%Type,
	p_dd_amount 		IN		VARCHAR2,
	p_dd_ccy		IN 		CYTMS_CCY_DEFN.ccy_code%TYPE,
	lo_rate			OUT		LFTM_MARGIN_RATE.margin_rate%Type,
	lo_flat_amount		OUT		NUMBER,--LFTM_MARGIN_RATE.margin_amt%Type,
	p_error_code		IN OUT	Varchar2,
	p_error_params		IN OUT	Varchar2
	)
Return Boolean;

/*Function fn_propagate_for_participants
	(
      p_contract_ref_no		in		oltbs_contract.contract_ref_no%type,
	p_esn				in		oltbs_contract.latest_event_seq_no%type,
	p_error_code			in out  	varchar2,
	p_error_params		in out  	varchar2,
	p_event_reg_reqd		in		varchar2 default 'Y'
	)
return Boolean;*/

--04-Jul-2006 FCC V.CL Release 7.1 changes start 
Function fn_update_margin_master_dd
(
	p_dd_ref_no		in    oltbs_contract.contract_ref_no%type,
	p_value_date	in date,
 	p_error_code 	in out ertbs_msgs.err_code%type,
 	p_error_params  in out varchar2
 )return boolean;
--04-Jul-2006 FCC V.CL Release 7.1 changes end
--01-aug-2006 FCC V.CL Release 7.1 changes daya
PROCEDURE pr_pop_margin_for_amendment
(
	p_contract_ref_no 	IN oltbs_contract.contract_ref_no%TYPE,
	p_event_seq_no 		IN oltbs_contract.latest_event_seq_no%TYPE,
	p_event 			IN oltbs_event.event_code%TYPE,
	p_value_date 		IN OUT lftbs_contract_interest.value_date%TYPE
);
--01-aug-2006 FCC V.CL Release 7.1 changes daya
--Flexcube V.CL Release 7.1, Changes, ARUN, 16-AUG-2006, Starts
FUNCTION fn_pop_for_pricing_grid
(
	p_dd_ref_no		IN oltbs_contract.contract_ref_no%type,
	p_component		IN lftbs_contract_margin_detail.component%type,
	p_margin_component	IN lftbs_contract_margin_detail.margin_component%type, 
	p_esn			IN lftbs_contract_margin_detail.event_seq_no%type, 
	p_value_date		IN date,
	p_margin_rate		IN lftbs_contract_margin_detail.margin_rate%type
)RETURN Boolean;
--Flexcube V.CL Release 7.1, Changes, ARUN, 16-AUG-2006, Ends

--FCC V.CL Release 7.3 SPLIT Re Price changes STARTS
FUNCTION Fn_mrg_pickup_partial_Rollover
		(
	   	p_dd_ref_no              in       oltbs_contract.contract_ref_no%type,
	   	p_split_serial_no	 in	  number,
	   	p_serial_no              in       number,
	   	p_version_no             in       number,
	   	p_prm_tranch_ref_no      in       lftbs_contract_margin_master.margin_rule_ref_no%type,
	   	p_prm_split_prod         in       lbtbs_borrower_drawdown_margin.product_code%type,
	   	p_error_code      	 in out   Varchar2,
	   	p_error_params    	 in out   Varchar2
		)
RETURN BOOLEAN;
--FCC V.CL Release 7.3 SPLIT Re Price changes ENDS
--FLEXCUBE V.CL Release 7.3 Retro Changes CITIUS-LS-213 st

--24-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#89 STARTS
function fn_check_margin_rate_chg(
         p_contract_ref_no    in       oltbs_contract.contract_ref_no%type,
         p_int_comp           in       lftbs_contract_margin_master.component%type,
         p_margin_comp        in          lftbs_contract_margin_master.margin_component%type,
         p_flag			OUT     number,
         p_error_code      in out   ertbs_msgs.err_code%type,
         p_error_params    in out   varchar2
)
return boolean;
--24-DEC-2007 FLEXCUBE V.CL Release 7.3 ITR2 SFR#89 ENDS

--12-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag05 Different Margin for Participants changes start
FUNCTION Fn_Pickup_Part_Rate_for_DD
(
	p_tranche_ref_no     IN    oltbs_contract.contract_ref_no%Type,
	p_drawdown_ref_no  IN    oltbs_contract.contract_ref_no%Type,
	p_participant			IN		oltbs_contract.counterparty%TYPE,
	p_margin_comp     	IN    lftms_margin_component.component%Type,
	p_ccy          			IN    lftms_margin_ccy.ccy%Type,
	p_effective_date   IN    DATE,
	p_balance_type    	IN    lbtbs_tranche_vdbal_detail.balance_type%Type,
	p_dd_amount 		IN		NUMBER,
	p_dd_ccy				IN 	cytms_ccy_defn.ccy_code%TYPE,
	p_rate        			OUT     LFTM_MARGIN_RATE.margin_rate%Type,
	p_flat_amount   	OUT      NUMBER,
	p_error_code      	IN OUT   Varchar2,
	p_error_params    	IN OUT   Varchar2
)
RETURN BOOLEAN;

FUNCTION fn_part_margin_pickup
(
	p_borrower_ref_no	IN				oltbs_contract.contract_ref_no%TYPE,
	p_participant			IN				oltbs_contract.counterparty%TYPE,
	p_esn						IN				NUMBER,
	p_int_comp				IN				lftbs_contract_margin_master.component%TYPE,
	p_margin_comp			IN				lftbs_contract_margin_master.margin_component%TYPE,
	p_value_start_date	IN				DATE,
	p_value_end_date		IN				DATE,	--18-MAY-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag05 FT#1 Different Margin for Participants changes
	p_dd_amount			IN				NUMBER,
	p_dd_ccy					IN				cytms_ccy_defn.ccy_code%TYPE,
	p_actual_temp			IN				VARCHAR2,	--29-APR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag05 IUT#203 Different Margin for Participants changes
	p_error_code				IN OUT		VARCHAR2,
	p_error_params			IN OUT		VARCHAR2
)
RETURN BOOLEAN;
--12-MAR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag05 Different Margin for Participants changes end
--15-APR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag05 IUT# 110 changes start
FUNCTION fn_validate_borwr_part_margn
(
    p_contract_ref_no	IN			oltbs_contract.contract_ref_no%Type,
	p_value_dt			IN			DATE,
	p_error_code			IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--15-APR-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R716 FS Vol2 Tag05 IUT# 110 changes end

--Bug#37567307:Changes Starts here
FUNCTION Fn_Insert_Liqd_Contract_Dtls( p_Contract_Ref_No   IN Oltbs_Contract.Contract_Ref_No%type,
                                       P_Tranche_ref_No    IN Oltbs_Contract.Contract_Ref_No%type, 
                                       P_component         IN Lftbs_Contract_Margin_Master.component%type,
                                       p_margin_component  IN lftbs_contract_margin_master.MARGIN_COMPONENT%TYPE, 
                                       P_currency          IN lftms_margin_effdate.ccy%TYPE,
                                       P_effective_date    IN lftms_margin_effdate.EFFECTIVE_DATE%type,
                                       p_Processing_Date   IN DATE,                                      
                                       p_Error_Code        IN OUT VARCHAR2,
                                       p_Error_Params      IN OUT VARCHAR2 )
RETURN BOOLEAN;
--Bug#37567307:Changes Ends here


END lfpks_margin;
/
CREATE or replace SYNONYM lfpkss_margin FOR lfpks_margin
/