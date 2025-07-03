CREATE OR REPLACE PACKAGE tlpks_fee_calc
IS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : tlpks_fee_calc.SPC
**
** Module       : Secondary Loan Trading
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*
---------------------------------CHANGE HISTORY-----------------------------------------------
28-APR-2008 FFLEXCUBE V.CL 7.4 RELEASE,NEW UNIT CREATED FOR  SLT FEE CALCULATIONS
17-Feb-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7021
28-AUG-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07, Trading Flat Changes, Two new functions added for DCF falt unrealized accrual and reclassification. 
03-NOV-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07 IUT#216 Changes,system was not considering the actual settlement date for realization
12-NOV-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07 IUT#287 changes,Added two new global parameters in order to consider the flat accrual durng Stop dcf accrual

OBCL_14.4_SLT_Amendment_Fee Changes, SLT Amendment Fee Changes
------------------------------END CHANGE HISTORY----------------------------------------------
*/
g_stop_accrual  	VARCHAR2(1) :='N';--12-NOV-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07 IUT#287 changes
g_accrual_again  	VARCHAR2(1) :='N';--12-NOV-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07 IUT#287 changes
g_simulate_calc          oltb_rfr_interest_master.simulate%type;--OBCL_14.5_SLT_DCF_FEE_SOFR
FUNCTION Fn_Calc
(
p_contract_ref_no       IN    tltbs_contract_fee_master.contract_ref_no%TYPE,
p_expt_settl_date       IN    TLTB_CONTRACT_MASTER.Expt_Settl_Date%TYPE,
p_actual_settl_date     IN    TLTB_CONTRACT_MASTER.Actual_Settl_Date%TYPE,
p_Trade_Date            IN    TLTB_CONTRACT_MASTER.Trade_Date%TYPE,
p_fee_type        	IN    tltbs_contract_fee_master.fee_type%TYPE,
P_component		IN    tltbs_contract_fee_master.component%TYPE,
p_error_code            IN OUT      VARCHAR2,
p_error_param           IN OUT      VARCHAR2
)
RETURN BOOLEAN;

--17-Feb-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7021 start
FUNCTION fn_update_fee_calc
(
p_contract_ref_no       IN    		tltbs_contract_fee_master.contract_ref_no%TYPE,
p_event_seq_no		IN    		tltbs_contract_fee_master.event_seq_no%TYPE,
p_expt_settle_date	IN		TLTB_CONTRACT_MASTER.Expt_Settl_Date%TYPE,
p_error_code            IN OUT		VARCHAR2,
p_error_param           IN OUT		VARCHAR2
)
RETURN BOOLEAN;
--17-Feb-2010 FLEXCUBE V.CL Release 7.6 CITIUS RETRO CITIUS-LS#7021 end

--28-AUG-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07 Changes starts
FUNCTION fn_dcf_flat_accrual (
							  p_Tranche_ref_no 		 IN  	tltbs_contract_fee_master.contract_ref_no%TYPE,
							  p_contract_ref_no      IN  	tltbs_contract_fee_master.contract_ref_no%TYPE,
							  p_dcf_category         IN  	tltbs_contract_fee_master.dcf_category%TYPE,
							  p_expt_settl_date      IN  	TLTB_CONTRACT_MASTER.Expt_Settl_Date%TYPE,
							  P_Actual_Settl_Date    IN    	TLTB_CONTRACT_MASTER.Actual_Settl_Date%TYPE,
							  p_component            IN  	tltbs_amount_due.component%TYPE,
							  p_Bal_Type             IN  	tltbs_agency_balance.balance_type%TYPE,
							  P_tfr_percentage       IN   	NUMBER,
							  p_error_code           IN 	OUT VARCHAR2,
							  p_error_param          IN 	OUT VARCHAR2
							 )
RETURN BOOLEAN;

FUNCTION fn_dcf_flat_reclassification (
								  p_contract_ref_no      IN  	tltbs_contract_fee_master.contract_ref_no%TYPE,
								  P_process_indicator    IN     VARCHAR2,
								  p_actual_settl_date	 IN		TLTB_CONTRACT_MASTER.Actual_Settl_Date%TYPE,--03-NOV-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07 IUT#216 Changes	
								  p_error_code           IN 	OUT VARCHAR2,
								  p_error_param          IN 	OUT VARCHAR2
								 )
RETURN BOOLEAN;
--28-AUG-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07 Changes ends
--04-NOV-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07 IUT#217 Changes start
FUNCTION	fn_get_dd_paid_date
								(
								p_contract_Ref_no		IN		oltbs_contract.contract_ref_no%TYPE
								,p_unrealized_fee		IN		VARCHAR2
								,p_expt_settl_date		IN 		tltbs_contract_master.EXPT_SETTL_DATE%TYPE
								,p_actual_settl_date	IN		tltbs_contract_master.actual_settl_date%TYPE
								)
RETURN	DATE;
--04-NOV-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07 IUT#217 Changes end
--------------------------------------------------------------------------------------------

-- OBCL_14.4_SLT_Amendment_Fee Changes starts
FUNCTION fn_recalc_trade_vdbal
(
p_trade_ref_no			IN	VARCHAR2,
p_actual_setl_date		IN	DATE,
p_expected_setl_date	IN	DATE,
p_trade_date			IN	DATE,
p_action_type			IN  VARCHAR2,
P_error_code            IN OUT	VARCHAR2,
P_error_param           IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--OBCL_14.4_SLT_Amendment_Fee Changes ends
--OBCL_14.5_SLT_DCF_FEE_SOFR start
FUNCTION Fn_update_rfr_fee_calc
(
	p_ref			IN	VARCHAR2
)
RETURN BOOLEAN;
--OBCL_14.5_SLT_DCF_FEE_SOFR end
END tlpks_fee_calc;
/
CREATE OR REPLACE SYNONYM tlpkss_fee_calc FOR tlpks_fee_calc
/