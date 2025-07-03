CREATE OR REPLACE PACKAGE olpks_new 
AS
/*-------------------------------------------------------------------------------------------------------------------
**
** File Name	: olpks_new.SPC
**
** Module	: IS
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
------------------------------------------------------------------------------------------------------------------
*/

TYPE g_contractis_record_type IS RECORD
    (
	amount_tag			oltms_product_amounttag_type.amount_tag%TYPE,
	tag_type			VARCHAR2(2),
	tag_ccy			oltbs_account.ac_gl_ccy%TYPE,
	transfer_type		oltbs_contractis_cs.transfer_type%TYPE,
	settle_ccy			oltbs_account.ac_gl_ccy%TYPE,
	change_ac			VARCHAR2(1),
	ccy_restriction		oltbs_contractis_cs.pay_ccy_restriction%TYPE,
	acc_branch			oltms_branch.branch_code%TYPE,
	account			oltbs_account.ac_gl_no%TYPE,
	acc_ccy			oltbs_account.ac_gl_ccy%TYPE,
	ex_rate			NUMBER,
	cover_reqd			oltbs_contractis_cs.pay_cover_reqd%TYPE,
	gen_message			oltbs_contractis_cs.pay_gen_message%TYPE,
	gen_dd			oltbs_contractis_cs.gen_dd%TYPE,
	gen_recv_notc		oltbs_contractis_cs.gen_recv_notc%TYPE,
	agents_agent_acc		oltbs_contractis_cs.our_recv_agtagt_acc%TYPE,
	agents_agent1		oltbs_contractis_cs.our_recv_agtagt1%TYPE,		
	agents_agent2		oltbs_contractis_cs.our_recv_agtagt2%TYPE,
	agents_agent3		oltbs_contractis_cs.our_recv_agtagt3%TYPE,
	agents_agent4		oltbs_contractis_cs.our_recv_agtagt4%TYPE,
	their_recv_agt_acc	oltbs_contractis_cs.their_recv_agt_acc%TYPE,		
	their_recv_agt1		oltbs_contractis_cs.their_recv_agt1%TYPE,		
	their_recv_agt2		oltbs_contractis_cs.their_recv_agt2%TYPE,
	their_recv_agt3		oltbs_contractis_cs.their_recv_agt3%TYPE,
	their_recv_agt4		oltbs_contractis_cs.their_recv_agt4%TYPE,
	payment_details1		oltbs_contractis_cs.pay_payment_details1%TYPE,	
	payment_details2		oltbs_contractis_cs.pay_payment_details2%TYPE,
	payment_details3		oltbs_contractis_cs.pay_payment_details3%TYPE,
	payment_details4		oltbs_contractis_cs.pay_payment_details4%TYPE,
	sndr_to_rcvr_info1	oltbs_contractis_cs.pay_sndr_rcvr_info1%TYPE,
	sndr_to_rcvr_info2	oltbs_contractis_cs.pay_sndr_rcvr_info2%TYPE,
	sndr_to_rcvr_info3	oltbs_contractis_cs.pay_sndr_rcvr_info3%TYPE,
	sndr_to_rcvr_info4	oltbs_contractis_cs.pay_sndr_rcvr_info4%TYPE,
	sndr_to_rcvr_info5	oltbs_contractis_cs.pay_sndr_rcvr_info5%TYPE,
	sndr_to_rcvr_info6	oltbs_contractis_cs.pay_sndr_rcvr_info6%TYPE,
	ordering_party_acc	oltbs_contractis_cs.pay_ordering_party_acc%TYPE,
	ordering_party1		oltbs_contractis_cs.pay_ordering_party1%TYPE,
	ordering_party2		oltbs_contractis_cs.pay_ordering_party2%TYPE,
	ordering_party3		oltbs_contractis_cs.pay_ordering_party3%TYPE,
	ordering_party4		oltbs_contractis_cs.pay_ordering_party4%TYPE,
	beneficiary_party_acc	oltbs_contractis_cs.pay_ben_party_acc%TYPE ,
	beneficiary_party1	oltbs_contractis_cs.pay_beneficiary_party1%TYPE ,
	beneficiary_party2	oltbs_contractis_cs.pay_beneficiary_party2%TYPE ,
	beneficiary_party3	oltbs_contractis_cs.pay_beneficiary_party3%TYPE ,
	beneficiary_party4	oltbs_contractis_cs.pay_beneficiary_party4%TYPE ,
	their_pay_acc		oltbs_contractis_cs.their_pay_acc%TYPE,
	remitter1			oltbs_contractis_cs.remitter1%TYPE,	
	remitter2			oltbs_contractis_cs.remitter2%TYPE,	
	remitter3			oltbs_contractis_cs.remitter3%TYPE,	
	remitter4			oltbs_contractis_cs.remitter4%TYPE,	
	their_pay_agt1		oltbs_contractis_cs.their_pay_agt1%TYPE,
	our_recv_acc		oltbs_contractis_cs.our_recv_acc%TYPE,
	instruction_type		oltbs_contractis_cs.pay_instruction_type%TYPE,
	instruction_status	oltbs_contractis_cs.pay_instruction_stat%TYPE,
	acc_cif			oltbs_contractis_cs.pay_acc_cif%TYPE,
	field72_conf		oltbs_contractis_cs.field72_on_conf_msg%TYPE,
	rtgs_payment		oltbs_contractis_cs.rtgs_payment%TYPE,
	addl_rtgs_payment		oltbs_contractis_cs.addl_rtgs_payment%TYPE,
	usd_clg_network		oltbs_contractis_cs.pay_usd_clg_network%TYPE
    );

------------------------------------------------------------------------------------------------------------------


TYPE 	g_contractis_table_type IS TABLE OF	g_contractis_record_type
INDEX BY VARCHAR2(20);

------------------------------------------------------------------------------------------------------------------
/*
TYPE 	rec_msg_adv IS RECORD 
	(
	field_tag		VARCHAR2(50),
	field_value 	VARCHAR2(2000),
	option_value	VARCHAR2(2),
	mandatory_tag	VARCHAR2(1)
      );

------------------------------------------------------------------------------------------------------------------

TYPE	tbl_msg_adv_type IS TABLE OF rec_msg_adv 
INDEX BY BINARY_INTEGER;


tbl_msg_adv   tbl_msg_adv_type;
*/
------------------------------------------------------------------------------------------------------------------

FUNCTION fn_pickup_details
	(
	p_module			  	IN		oltbs_contract.module_code%TYPE,
	p_product_code		  	IN		oltbs_contract.product_code%TYPE,
	p_counterparty			IN		oltbs_contract.counterparty%TYPE,
	p_settlement_seq_no		IN		NUMBER,
	p_pickup_ssi		  	IN		VARCHAR2,
	p_save_without_settle_ac	IN		VARCHAR2,
	p_contractis_record	  	IN OUT	oltbs_contractis_cs%ROWTYPE,
	p_upload_settlements		IN		VARCHAR2,
	p_error_code		  	IN OUT	VARCHAR2,
	p_error_parameter		  	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

------------------------------------------------------------------------------------------------------------------

FUNCTION fn_upload_contractis
	(
	p_module				IN		VARCHAR2,
	p_cstbs_contractis_record	IN OUT	oltbs_contractis_cs%ROWTYPE,
	p_upl_contractis_record		IN OUT	oltbs_contractis_cs%ROWTYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

-------------------------------------------------------------------------------------------------------------------

FUNCTION fn_replicate_contractis
	(
	p_contract_ref_no			IN		VARCHAR2,
	p_module				IN		VARCHAR2,
	p_product_code			IN		VARCHAR2,
	p_old_version_no			IN		NUMBER,
	p_upl_contractis_record		IN OUT	oltbs_contractis_cs%ROWTYPE,
	p_counterparty			IN		VARCHAR2,
	p_save_without_settle_ac 	IN		VARCHAR2,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

-------------------------------------------------------------------------------------------------------------------


FUNCTION fn_tagtype_referral
	(
	p_contract_ref_no		IN		VARCHAR2,
	p_version_no		IN		NUMBER,
	p_module			IN		VARCHAR2,
	p_product			IN		VARCHAR2,	
	p_pickup_dflt_acc		IN		VARCHAR2,
	p_inherit			IN		VARCHAR2,
	p_settlement_event	IN		VARCHAR2,	
	p_contractis_table	IN OUT	g_contractis_table_type,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

-------------------------------------------------------------------------------------------------------------------

FUNCTION fn_amounttag_referral
	(
	p_contract_ref_no		IN		VARCHAR2	,
	p_version_no		IN		NUMBER	,
	p_module			IN		VARCHAR2	,
	p_product			IN		VARCHAR2	,
	p_pickup_dflt_acc		IN		VARCHAR2	,
	p_inherit			IN		VARCHAR2	,
	p_settlement_event	IN		VARCHAR2	,
	p_amount_tag   		IN       	VARCHAR2	,
	p_amount_list		IN 		VARCHAR2	,
	p_tag_ccy_list		IN		VARCHAR2	,
	p_contractis_table	IN OUT	g_contractis_table_type,
	p_error_code		IN OUT	VARCHAR2	,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

-------------------------------------------------------------------------------------------------------------------

FUNCTION fn_create_pay_record
		(
		p_tag_type 		     		IN		oltbs_msgho_cs.tag_type%TYPE	,
		p_is_cstbs_contractis_rec	IN  		oltbs_contractis_cs %ROWTYPE	,
		p_is_out_record     		OUT 		g_contractis_record_type	,	
		p_error_code			IN OUT	VARCHAR2				,
		p_error_parameter			IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

-------------------------------------------------------------------------------------------------------------------

FUNCTION fn_create_rcv_record
		(
		p_tag_type 		     		IN  		oltbs_msgho_cs.tag_type%TYPE	,
		p_is_cstbs_contractis_rec    	IN  		oltbs_contractis_cs%ROWTYPE	,
		p_is_out_record     		OUT 		g_contractis_record_type	,	
		p_error_code			IN OUT	VARCHAR2				,
		p_error_parameter			IN OUT 	VARCHAR2
		)
RETURN BOOLEAN;

-------------------------------------------------------------------------------------------------------------------

FUNCTION fn_delete
		(
		p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
		p_version_no	IN		NUMBER,
		p_error_code	IN OUT	VARCHAR2,
		p_error_parameter IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

-------------------------------------------------------------------------------------------------------------------

FUNCTION fn_validate_tag_type
		(	
		p_instruction_status		IN		VARCHAR2,	
		p_instruction_type		IN		VARCHAR2,	
		p_account_no			IN		VARCHAR2,	
		p_ac_branch				IN		VARCHAR2,	
		p_acc_ccy				IN OUT	VARCHAR2,	
		p_acc_cif				IN		VARCHAR2,	
		p_tag_ccy				IN		VARCHAR2,	
		p_ccy_restriction			IN		VARCHAR2,	
		p_counterparty			IN		VARCHAR2,	
		p_save_without_settle_ac	IN		VARCHAR2,	
		p_error_code			IN OUT 	VARCHAR2,	
		p_error_parameter			IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

-------------------------------------------------------------------------------------------------------------------

FUNCTION fn_validate
		(	
		p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE	,	
		p_counterparty			IN		oltbs_contract.counterparty%TYPE	,	
		p_module				IN		oltbs_contract.module_code%TYPE	,	
		p_product_code			IN		oltbs_contract.product_code%TYPE	,
		p_save_without_settle_ac	IN		VARCHAR2					,	
		p_cstbs_contractis_record	IN OUT	oltbs_contractis_cs%ROWTYPE		,	
		p_error_code			IN OUT	VARCHAR2					,	
		p_error_parameter			IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

--------------------------------------------------------------------------------------------------------------------

FUNCTION fn_validate_rtgs
		(	
		p_prod_rec		IN		oltms_product%ROWTYPE				,	
		p_ac_branch		IN		oltbs_contractis_cs.pay_acc_branch%TYPE	,	
		p_account		IN		oltbs_contractis_cs.pay_account%TYPE		,	
		p_acc_ccy		IN		oltbs_contractis_cs.pay_account%TYPE		,	
		p_acc_cif		IN		oltbs_contractis_cs.pay_acc_cif%TYPE		,	
		p_rtgs		IN OUT	oltbs_contractis_cs.rtgs_payment%TYPE		,	
		p_error_code	IN OUT	VARCHAR2						,	
		p_error_parameter	IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

--------------------------------------------------------------------------------------------------------------------
FUNCTION	fn_is_uploaded
		(	
		p_cstbs_contractis_record	IN	oltbs_contractis_cs%ROWTYPE
		)
RETURN BOOLEAN;

-------------------------------------------------------------------------------------------------------------------

FUNCTION fn_update_instr_status_new
			(
			p_contract_rec		IN			xxtbs_contract_master%ROWTYPE,
			p_error_code		IN OUT		VARCHAR2,
			p_error_parameter		IN OUT		VARCHAR2	
			)
RETURN BOOLEAN;

--------------------------------------------------------------------------------------------------------------------
FUNCTION fn_upload_ext_contractis
	(
	p_module				IN		VARCHAR2,
	p_upl_contractis_record		IN OUT	oltbs_upload_contractis_cs%ROWTYPE,
	p_cstbs_contractis_record	IN OUT	oltbs_contractis_cs%ROWTYPE,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Starts 
--FCC-7.3-RETRO-CITIUK-4.4-RETRO#175 UNCOMMENTED
--CITIPLC PLC44130049 Changes Start
FUNCTION	fn_populate_is_table
	(
	p_contract_record		IN		oltbs_contract%ROWTYPE,
	p_contractis_record	IN		oltbs_contractis_cs%ROWTYPE,
	p_contractis_table	OUT		g_contractis_table_type, --removed synonym name FCC V.CL 7.3 UK CONSOLIDATION RETRO
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--CITIPLC PLC44130049 Changes Start
--FCC-7.3-RETRO-CITIUK-4.4-RETRO#175 UNCOMMENTED
--FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Ends
END olpks_new;
/
CREATE or replace SYNONYM olpkss_new FOR olpks_new
/