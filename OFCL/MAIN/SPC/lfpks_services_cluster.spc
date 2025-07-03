CREATE OR REPLACE package lfpks_services_cluster is
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lfpks_services_cluster.SPC
**
** Module       : INTEREST, COMMISSION, CHARGES, FEES (ICCF)
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2018  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.


  --CREATED BY              : GOMATHI G
  --CREATED ON              : 19-SEP-2019
  --CREATED DESCRIPTION     : HOOKS PROVIDED FOR CUSTOM CHANGE OF RATES
  --SEARCH STRING           : OBCL_14.3_BUG#30003644
  
  CREATED BY              : Vineeth T M
  CREATED ON              : 17-JUL-2023
  CREATED DESCRIPTION     : Hooks provided to set margin details
  SEARCH STRING           : OBCL_14.7_SUPP#35604597 Changes
----------------------------------------------------------------------------------------------------
*/--OBCL_14.3_BUG#30003644 STARTS
FUNCTION fn_pre_pickup_details(
				p_contract_ref_no 	IN oltbs_contract.contract_ref_no%TYPE,
				p_event_seq_no 	IN oltbs_contract.latest_event_seq_no%TYPE,
				p_customer 		IN lftms_rule.customer%TYPE,
				p_sender			IN OLTBS_FTTB_CONTRACT_MASTER.SENDER%TYPE, 
				p_contract_ccy 		IN CYTMS_CCY_DEFN.ccy_code%TYPE,
				p_local_ccy 		IN CYTMS_CCY_DEFN.ccy_code%TYPE,
				p_event 			IN oltbs_event.event_code%TYPE,
				p_ts_amount_tag 	IN VARCHAR2,
				p_ts_amount 		IN VARCHAR2,
				p_ts_amount_ccy 	IN VARCHAR2,
				p_ts_lcy_equiv 		IN VARCHAR2,
				p_value_date 		IN lftbs_contract_interest.value_date%TYPE,
				p_transaction_date 	IN lftbs_contract_interest.transaction_date%TYPE,
				p_status 			IN lftbs_contract_interest.status%TYPE,
				p_action_code		IN VARCHAR2,
				p_copy_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
				p_error_code   		out ertbs_msgs.err_code%TYPE)
RETURN BOOLEAN;
FUNCTION fn_post_pickup_details(
				p_contract_ref_no 	IN oltbs_contract.contract_ref_no%TYPE,
				p_event_seq_no 	IN oltbs_contract.latest_event_seq_no%TYPE,
				p_customer 		IN lftms_rule.customer%TYPE,
				p_sender			IN OLTBS_FTTB_CONTRACT_MASTER.SENDER%TYPE, 
				p_contract_ccy 		IN CYTMS_CCY_DEFN.ccy_code%TYPE,
				p_local_ccy 		IN CYTMS_CCY_DEFN.ccy_code%TYPE,
				p_event 			IN oltbs_event.event_code%TYPE,
				p_ts_amount_tag 	IN VARCHAR2,
				p_ts_amount 		IN VARCHAR2,
				p_ts_amount_ccy 	IN VARCHAR2,
				p_ts_lcy_equiv 		IN VARCHAR2,
				p_value_date 		IN lftbs_contract_interest.value_date%TYPE,
				p_transaction_date 	IN lftbs_contract_interest.transaction_date%TYPE,
				p_status 			IN lftbs_contract_interest.status%TYPE,
				p_action_code		IN VARCHAR2,
				p_copy_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
				p_error_code   		out ertbs_msgs.err_code%TYPE)
RETURN BOOLEAN;
--OBCL_14.3_BUG#30003644 ENDS

FUNCTION fn_pre_compute_charge_amount
	(
	p_rule_record		IN		lftms_rule%ROWTYPE,
	p_tag_ccy 			IN		lftbs_contract_charges.currency%TYPE,
	p_tag_amount 		IN		lftbs_contract_charges.amount%TYPE,
	p_charge_rate		IN OUT		lftbs_contract_charges.rate%TYPE,
	p_charge_ccy	 	IN OUT		lftbs_contract_charges.currency%TYPE,
	p_charge_amount 	IN OUT		lftbs_contract_charges.amount%TYPE,
	p_error_code  		IN OUT		ertbs_msgs.err_code%TYPE
	)
	RETURN boolean;
	
	FUNCTION fn_post_compute_charge_amount
	(
	p_rule_record		IN		lftms_rule%ROWTYPE,
	p_tag_ccy 			IN		lftbs_contract_charges.currency%TYPE,
	p_tag_amount 		IN		lftbs_contract_charges.amount%TYPE,
	p_charge_rate		IN OUT		lftbs_contract_charges.rate%TYPE,
	p_charge_ccy	 	IN OUT		lftbs_contract_charges.currency%TYPE,
	p_charge_amount 	IN OUT		lftbs_contract_charges.amount%TYPE,
	p_error_code  		IN OUT		ertbs_msgs.err_code%TYPE
	)
	RETURN boolean;
  
  --OBCL_14.7_SUPP#35604597 Changes start
  FUNCTION Fn_Pre_Populate_Margin(p_Dd_Ref_No    IN Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_Tr_Ref_No    IN Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_Prod_Code    IN Oltms_Product.Product_Code%TYPE,
                              p_Ccy          IN Cytms_Ccy_Defn.Ccy_Code%TYPE,
                              p_Event_Seq_No IN Oltbs_Event.Event_Code%TYPE,
                              p_Value_Date   IN Lftbs_Contract_Interest.Value_Date%TYPE,
                              p_Error_Code   IN OUT Ertbs_Msgs.Err_Code%TYPE)
  RETURN BOOLEAN;
  
  FUNCTION Fn_Post_Populate_Margin(p_Dd_Ref_No    IN Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_Tr_Ref_No    IN Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_Prod_Code    IN Oltms_Product.Product_Code%TYPE,
                              p_Ccy          IN Cytms_Ccy_Defn.Ccy_Code%TYPE,
                              p_Event_Seq_No IN Oltbs_Event.Event_Code%TYPE,
                              p_Value_Date   IN Lftbs_Contract_Interest.Value_Date%TYPE,
                              p_Error_Code   IN OUT Ertbs_Msgs.Err_Code%TYPE)
  RETURN BOOLEAN;
  --OBCL_14.7_SUPP#35604597 Changes end
  
end lfpks_services_cluster;
/
create or replace synonym lfpkss_services_cluster for lfpks_services_cluster
/