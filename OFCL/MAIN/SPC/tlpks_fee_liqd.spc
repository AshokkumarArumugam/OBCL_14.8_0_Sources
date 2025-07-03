CREATE OR REPLACE PACKAGE tlpks_fee_liqd
IS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : tlpks_fee_liqd.spc
**
** Module       : LT -Secondary Loan Trading
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
08-JUL-2008 FLEXCUBE V.CL 7.4 RELEASE,NEW UNIT CREATED FOR  SLT MANUAL FEE LIQUIDATION
08-JAN-2009 FLEXCUBE V.CL Release 7.4 MTR2 SFR#34 changes , Added a parameter in fn_build_fee_details
05-JAN-2012 Flexcube V.CL Release 7.10 FS Tag 10 Changes - Trade Amendment and Broker Fees
28-AUG-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07,Trading Flat Changes System will fire facr if stop dcf accrual has happend
05-NOV-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07 IUT#138 changes,Changes done to add agency ref number variable.
------------------------------END CHANGE HISTORY-------------------------------------------
*/
g_accr_from_dcf_liqd	VARCHAR2(1) := 'N'; --28-AUG-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07,Trading Flat Changes
pkg_agency_ref_no	OLTB_CONTRACT.contract_ref_no%TYPE; --05-NOV-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07 IUT#138 changes
FUNCTION fn_populate_for_fliq
(
p_contract_ref_no       IN	oltbs_contract.Contract_ref_no%TYPE,
p_event_code            IN      VARCHAR2,
p_error_code            IN OUT  Ertbs_msgs.Err_code%TYPE,
p_error_param           IN OUT  VARCHAR2
)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------
FUNCTION fn_delete
(
p_contract_ref_no       IN	oltbs_contract.Contract_ref_no%TYPE,
p_event_code            IN      VARCHAR2,
p_error_code            IN OUT  Ertbs_msgs.err_code%TYPE,
p_error_param           IN OUT  VARCHAR2
)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------
FUNCTION fn_auth_fliq
(
p_contract_ref_no       IN	oltbs_contract.Contract_ref_no%TYPE,
p_error_code            IN OUT	Ertbs_msgs.err_code%TYPE,
p_error_param           IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------
FUNCTION fn_fee_reverse
(
p_contract_ref_no       IN	oltbs_contract.Contract_ref_no%TYPE,
p_reversal_ESN		IN	oltbs_contract_event_log.event_seq_no%TYPE,
p_event_code            IN      VARCHAR2,
p_error_code            IN OUT  Ertbs_msgs.err_code%TYPE,
p_error_param           IN OUT  VARCHAR2
)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------
FUNCTION fn_fee_referral
(
p_contract_ref_no 	IN     	tltbs_contract_fee_master.contract_ref_no%TYPE,
p_event_seq_no    	IN     	tltbs_contract_fee_master.event_seq_no%TYPE,
P_component_list  	IN OUT 	VARCHAR2,
p_amount_tag_list 	IN OUT 	VARCHAR2,
p_ccy_list        	IN OUT 	VARCHAR2,
p_amount_list     	IN OUT 	VARCHAR2,
p_error_code      	IN OUT 	VARCHAR2,
p_error_param     	IN OUT 	VARCHAR2
)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------
FUNCTION fn_liquidate_for_an_event
(
p_contract_ref_no       IN    	tltbs_contract_fee_master.contract_ref_no%TYPE,
P_event_seq_no          IN    	tltbs_contract_fee_master.event_seq_no%TYPE,
P_event                 IN    	oltbs_contract_event_log.event_code%TYPE,
p_amt_tag_list          IN OUT	VARCHAR2,
p_ccy_list              IN OUT	VARCHAR2,
p_amt_list              IN OUT	VARCHAR2,
p_error_code            IN OUT	VARCHAR2,
p_error_param           IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--------------------------------------------------------------------------------------------
FUNCTION fn_pickup_brokerage
(
p_contract_ref_no       IN     	tltbs_contract_fee_master.contract_ref_no%TYPE,
p_event_seq_no		IN	oltbs_contract.latest_event_seq_no%TYPE,        
p_error_code            IN OUT 	VARCHAR2
)
RETURN BOOLEAN;
-------------------------------------------------------------------------------------------------------------------
FUNCTION Fn_update_liqd_details
(
p_contract_ref_no       IN     	tltbs_contract_fee_master.contract_ref_no%TYPE,                
P_event			IN	oltbs_contract.curr_event_code%TYPE,        
p_error_code            IN OUT 	VARCHAR2,
p_error_param           IN OUT 	VARCHAR2,
P_component_list	IN	VARCHAR2 DEFAULT NULL
)
RETURN BOOLEAN;
-------------------------------------------------------------------------------------------------------------------
FUNCTION Fn_reverse_settlement_fee
(
p_contract_ref_no       IN     	oltbs_contract.contract_ref_no%TYPE,                
P_event			IN	oltbs_contract.curr_event_code%TYPE,        
p_error_code            IN OUT 	VARCHAR2,
p_error_param           IN OUT 	VARCHAR2
)
RETURN BOOLEAN;
-------------------------------------------------------------------------------------------------------------------
--05-JAN-2012 Flexcube V.CL Release 7.10 FS Tag 10 Changes start here
/*
FUNCTION fn_liquidate_line_fee
(
p_contract_ref_no		IN		tltbs_contract_master.contract_ref_no%TYPE,
p_event_seq_no		IN		oltbs_contract.latest_event_seq_no%TYPE,
p_event_code		IN		VARCHAR2,
p_amt_tag_list		IN OUT	VARCHAR2,
p_amt_list			IN OUT	VARCHAR2,
p_ccy_list			IN OUT	VARCHAR2,		
p_error_code            IN OUT 	VARCHAR2,
p_error_param           IN OUT 	VARCHAR2
)
RETURN BOOLEAN;
-------------------------------------------------------------------------------------------------------------------
FUNCTION fn_reverse_line_fee
(
p_contract_ref_no		IN		tltbs_contract_master.contract_ref_no%TYPE,
p_error_code            IN OUT 	VARCHAR2,
p_error_param           IN OUT 	VARCHAR2
)
RETURN BOOLEAN;
*/
--05-JAN-2012 Flexcube V.CL Release 7.10 FS Tag 10 Changes end here
-------------------------------------------------------------------------------------------------------------------
FUNCTION fn_build_fee_details
(
	p_contract_ref_no	IN		tltbs_contract_fee_master.contract_ref_no%TYPE,
	P_event_seq_no		IN		tltbs_contract_fee_master.event_seq_no%TYPE,
	P_event			IN		oltbs_contract_event_log.event_code%TYPE,
	p_component_list	OUT		VARCHAR2,--08-JAN-2009 FLEXCUBE V.CL Release 7.4 MTR2 SFR#34 changes
	p_amt_tag_list		IN OUT		VARCHAR2,
	p_ccy_list		IN OUT		VARCHAR2,
	p_amt_list		IN OUT		VARCHAR2,	
	p_error_code		IN OUT		VARCHAR2,	
	p_error_param		IN OUT		VARCHAR2	
)
RETURN BOOLEAN;
-------------------------------------------------------------------------------------------------------------------
--05-JAN-2012 Flexcube V.CL Release 7.10 FS Tag 10 Changes start here
FUNCTION fn_liqd_fee_TBOK_TAMD
(
	p_contract_ref_no	IN		tltbs_contract_fee_master.contract_ref_no%TYPE
	, p_event_seq_no	IN		tltbs_contract_fee_master.event_seq_no%TYPE
	, p_event_code		IN		oltbs_contract_event_log.event_code%TYPE
	, p_amt_tag_list	IN OUT		VARCHAR2
	, p_amt_list		IN OUT		VARCHAR2
	, p_ccy_list		IN OUT		VARCHAR2	
	, p_error_code		IN OUT		VARCHAR2
	, p_error_param		IN OUT		VARCHAR2
)
RETURN BOOLEAN;
-------------------------------------------------------------------------------------------------------------------
FUNCTION fn_rev_fee_for_TREV
(
	p_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE
	, p_error_code		IN OUT 	VARCHAR2
	, p_error_param		IN OUT 	VARCHAR2
)
RETURN BOOLEAN;
-------------------------------------------------------------------------------------------------------------------
FUNCTION fn_rev_broker_fee_for_TAMD
(
	p_contract_ref_no	IN	tltbs_contract_master.contract_ref_no%TYPE
	, p_error_code		IN OUT 	VARCHAR2
	, p_error_param		IN OUT 	VARCHAR2
)
RETURN BOOLEAN;
--05-JAN-2012 Flexcube V.CL Release 7.10 FS Tag 10 Changes end here

--28-AUG-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07 changes start
FUNCTION fn_get_dcf_fee_component(
									p_product_code 		IN 			tltms_product_fee.product_code%TYPE		
									,p_dcf_category		IN			tltms_product_fee.dcf_category%TYPE		
								)
RETURN VARCHAR2;
FUNCTION fn_populate_dcf_amount_due
								(
									p_trade_ref_no		IN			oltbs_contract.contract_ref_no%TYPE
									,p_counterparty		IN			tltbs_upload_master.counterparty%TYPE
									,p_pop_or_delete	IN			VARCHAR2
									,p_error_code		IN OUT		VARCHAR2
									,p_error_param		IN OUT		VARCHAR2
								)
RETURN BOOLEAN;
FUNCTION fn_active_dcf_payment_exist
								(
								p_contract_ref_no				IN 	oltbs_contract.contract_ref_no%TYPE
								)
RETURN VARCHAR2;
FUNCTION fn_populate_dcf_amount_paid
									(
									    p_agency_ref_no     	IN          TLTB_DCF_LIQD_AGENCY_MASTER.agency_ref_no%TYPE
										,p_counterparty     	IN			TLTB_DCF_LIQD_AGENCY_MASTER.counterparty%TYPE
										,p_liquidation_ref_no 	IN			TLTB_DCF_LIQD_AGENCY_MASTER.liquidation_ref_no%TYPE
										,p_event_seq_no			IN			TLTB_DCF_LIQD_AGENCY_MASTER.event_seq_no%TYPE
										,p_trade_ref_no			IN			oltbs_contract.contract_ref_no%TYPE
										,p_due_date				IN			TLTB_DCF_LIQD_AGENCY_MASTER.payment_date%TYPE
										,p_payment_status		IN			VARCHAR2
										,p_pop_or_delete		IN			VARCHAR2
										,p_error_code			IN OUT		VARCHAR2
										,p_error_param			IN OUT		VARCHAR2
									)
RETURN BOOLEAN;
FUNCTION fn_update_dcf_amount_due
									(
									    p_agency_ref_no     	IN          TLTB_DCF_LIQD_AGENCY_MASTER.agency_ref_no%TYPE
										,p_liquidation_ref_no 	IN			TLTB_DCF_LIQD_AGENCY_MASTER.liquidation_ref_no%TYPE
										,p_trade_ref_no			IN			oltbs_contract.contract_ref_no%TYPE
										,p_counterparty     	IN			TLTB_DCF_LIQD_AGENCY_MASTER.counterparty%TYPE
										,p_event_seq_no			IN			TLTB_DCF_LIQD_AGENCY_MASTER.event_seq_no%TYPE
										,p_pop_or_delete		IN			VARCHAR2
										,p_error_code			IN OUT		VARCHAR2
										,p_error_param			IN OUT		VARCHAR2
									)
RETURN BOOLEAN;	
FUNCTION Fn_pop_dcf_contractis
	(
	P_liquidation_ref_no	IN	TLTB_DCF_LIQD_AGENCY_MASTER.liquidation_ref_no%TYPE,
	p_trade_ref_no			IN  TLTB_DCF_LIQD_TRADE_DETAIL.trade_ref_no%TYPE,	
	p_currency          IN	TLTB_DCF_LIQD_AGENCY_MASTER.currency%TYPE,
	p_ssi_mnemonic			IN	TLTB_DCF_LIQD_AGENCY_MASTER.currency%TYPE,
	p_event_seq_no			IN  TLTB_DCF_LIQD_AGENCY_MASTER.event_seq_no%TYPE,
	P_error_code			IN OUT	VARCHAR2,
	P_error_params			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;		
--28-AUG-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07 changes end
--28-AUG-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07,Trading Flat Changes start
FUNCTION fn_fee_accrual_on_stop_accrual 
								(
									p_liquidation_ref_no IN		TLTB_DCF_LIQD_AGENCY_MASTER.liquidation_ref_no%TYPE
									,p_agency_ref_no	IN		TLTB_DCF_LIQD_AGENCY_MASTER.agency_ref_no%TYPE
									,p_event_seq_no 	IN 		TLTB_DCF_LIQD_AGENCY_MASTER.event_seq_no%TYPE
									,p_counterparty 	IN 		TLTB_DCF_LIQD_AGENCY_MASTER.counterparty%TYPE
									,p_payment_date 	IN 		date
									,p_trade_ref_no 	IN 		TLTB_DCF_LIQD_TRADE_DETAIL.liquidation_ref_no%TYPE
									,p_dclq_or_rvdc		IN		VARCHAR2
									,p_error_code		IN OUT	VARCHAR2
									,p_error_param		IN OUT	VARCHAR2
									)
RETURN BOOLEAN;
--28-AUG-2015 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R717 FS Vol1 Tag07,Trading Flat Changes end
END tlpks_fee_liqd;
/
CREATE OR REPLACE SYNONYM tlpkss_fee_liqd FOR tlpks_fee_liqd
/