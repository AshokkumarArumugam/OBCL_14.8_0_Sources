CREATE OR REPLACE PACKAGE olpks_swift_gen_fields
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_swift_gen_fields.SPC
**
** Module		: MESSAGING SUBSYSTEM
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
/* Change History
05-JUL-2003 Created a new package for generating components of SWIFT message
17-MAY-2004	FCC 4.5 LOT2 ITR2 SFR 6 .. updation of swift ref no
30-Jul-2204 FCC4.6 Sep04 Retro(India) changes: FN FORMAT CHANGES 
                                               Function to generate Header in Swift format added.
                                                Common Ref no to be generated in standard swift format,seperate format for IFN not required
11-SEP-2006 FLEXCUBE V.CL RELEASE 7.1 CHANGES
            fn_derive_72_data_tags MODIFIED                                                  

22-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes
	30-AUG-2007 FCC-7.3-RETRO-CITIUK-4.4-RETRO#248 Changes 
		15-FEB-2005 PLC442060011	Changes to strip the first 4 characters from the Customer No. for all branches except GB3.
							This will be done in the WNDF part of the select.  That is first do the select as it
							is, if no record is found and if non-GB3, then try the select for the last 6 characters.
							
 07-OCT-2016 Search string : OFCL12.3 Changes, commented xxtbs_contract_master as the tables are dropped from corp lending schema

*/

TYPE contract_struct_record_type
IS	RECORD
	(
		contract_ref_no		oltbs_contract.contract_ref_no%TYPE,
		user_ref_no			oltbs_contract.user_ref_no%TYPE,
		custom_ref_no		oltbs_contract.custom_ref_no%TYPE,
		external_ref_no		oltbs_contract.external_ref_no%TYPE,
		module				oltbs_contract.module_code%TYPE,
		latest_event_seq_no	oltbs_contract.latest_event_seq_no%TYPE,
		curr_event_code		oltbs_contract.curr_event_code%TYPE,
		customer_no			oltbs_contract.counterparty%TYPE,
		product_code		oltbs_contract.product_code%TYPE
	);

FUNCTION fn_generate_swift_fields
	(
		p_contract_struct_record	IN		contract_struct_record_type,
		p_mstb_dly_msg_out_record	IN		oltbs_dly_msg_out%ROWTYPE,
		p_swift_msg_type			IN		NUMBER,
		p_swift_field				IN		NUMBER,
		p_cover_reqd				IN		VARCHAR2,
		p_message					IN OUT	VARCHAR2,
		p_option					IN OUT	VARCHAR2,
		p_error_code				IN OUT	VARCHAR2,
		p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_get_senders_reference
	(
		p_mstb_dly_msg_out_record	IN		oltbs_dly_msg_out%ROWTYPE,
		p_message					IN OUT	VARCHAR2,
		p_error_code				IN OUT	VARCHAR2,
		p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_get_message_event_code
	(
		p_modproc_rec				IN 		oltbs_dly_msg_out%ROWTYPE,
		p_module					IN		oltbs_contract.module_code%TYPE,
		p_message_event_code		IN OUT	VARCHAR2,
		p_error_code				IN OUT	VARCHAR2,
		p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_generate_17U
	(
		p_contract_struct_record	IN		contract_struct_record_type,
		p_message					IN OUT	VARCHAR2,
		p_error_code				IN OUT	VARCHAR2,
		p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_generate_20
	(
		p_custom_ref_no				IN		oltbs_contract.custom_ref_no%TYPE,
		p_message					IN OUT	VARCHAR2,
		p_error_code				IN OUT	VARCHAR2,
		p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

-- Fcc 4.4 FXMM Change  field refno_suffix_field20 removed 

-- FCC 4.5 LOT2 ITR2 SFR 6

FUNCTION fn_generate_20_esn_suffix
		(
		p_branch_code			IN		oltms_branch.branch_code%TYPE,
		p_module				IN		oltbs_contract.module_code%TYPE,
		p_message_event_code		IN		oltms_field20_suffix.event_code%TYPE,
		p_esn					IN		oltbs_dly_msg_out.esn%TYPE,
		p_contract_rec			IN		oltbs_contract%ROWTYPE,
		p_payment_with_cover		IN		VARCHAR2,
		p_msg_type				IN		oltbs_dly_msg_out.msg_type%TYPE,
		p_message				IN OUT	VARCHAR2,
		p_error_code			IN OUT	VARCHAR2,
		p_error_parameter			IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

-- FCC 4.5 LOT2 ITR2 SFR 6

-- Fcc 4.4 FXMM Change  field refno_suffix_field20 removed 

FUNCTION fn_generate_21
	(
		p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE,
		p_common_or_ref_no			IN		VARCHAR2,
		p_message					IN OUT	VARCHAR2,
		p_error_code				IN OUT	VARCHAR2,
		p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

/*FUNCTION fn_generate_21_common_ref
		(
			p_mstbs_dly_msg_out		IN		oltbs_dly_msg_out%ROWTYPE,
			p_rate					IN		NUMBER,
			p_message				IN OUT	VARCHAR2,
			p_error_code			IN OUT	VARCHAR2,
			p_error_parameter		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
*/

FUNCTION fn_generate_21_common_ref
		(
			P_counterparty			IN		VARCHAR2,
			p_branch				IN		VARCHAR2,
			p_rate					IN		NUMBER,
			p_message				IN OUT	VARCHAR2,
			--FCC 4.3 AUG 2003 CHANGES
			p_message_type			IN   VARCHAR2, --swift_msg_type SHOULD BE PASSED
			p_reference_no 			IN	 VARCHAR2,  --CONTRACT_REF_NO SHOULD BE PASSED
			--FCC 4.3 AUG 2003 CHANGES
			p_error_code			IN OUT	VARCHAR2,
			p_error_parameter		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_generate_22
		(
			p_mstbs_dly_msg_out		IN		oltbs_dly_msg_out%ROWTYPE,
			p_rate					IN		NUMBER,
			p_message				IN OUT	VARCHAR2,
			p_error_code			IN OUT	VARCHAR2,
			p_error_parameter		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

FUNCTION fn_generate_72
	(
		p_contract_struct_record	IN		contract_struct_record_type,
		p_mstb_dly_msg_out_record	IN		oltbs_dly_msg_out%ROWTYPE,
		p_swift_field				IN		NUMBER,
		p_swift_msg_type			IN		NUMBER,
		p_cover_reqd				IN		VARCHAR2,
		p_SenderToRecv_				IN		VARCHAR2,
		p_BrokerInfo_				IN		VARCHAR2,
		p_BNFAccNo_					IN		VARCHAR2,
		p_BNFInfo_					IN		VARCHAR2,
		p_message					IN OUT	VARCHAR2,
		p_option					IN OUT	VARCHAR2,
		p_error_code				IN OUT	VARCHAR2,
		p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_generate_82
	(
		p_branch					IN		VARCHAR2,
		p_swift_msg_type			IN 		NUMBER,
		p_cover_reqd				IN		VARCHAR2,
		p_option					IN OUT	VARCHAR2,
		p_message					IN OUT	VARCHAR2,
		p_error_code				IN OUT	VARCHAR2,
		p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_remove_invalid_swift_chars
	(
		p_special					IN		VARCHAR2,
		p_message					IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_get_cif_confirm
	(	p_customer_no				IN		oltms_customer.customer_no%TYPE,
		p_module					IN		smtbs_modules.module_id%TYPE,
		p_cif_confirm_param			OUT		oltms_cif_confirm_param%ROWTYPE,
		p_no_data					OUT		BOOLEAN,
		p_error_code				IN OUT	ertbs_msgs.err_code%TYPE,
		p_error_parameter			IN OUT	ertbs_msgs.message%TYPE
	)
RETURN BOOLEAN;

FUNCTION fn_chk_mandatory_fields
	(
		p_swift_msg_type			IN		NUMBER,
		p_field_no					IN		NUMBER,
		p_value						IN		VARCHAR2,
		p_error_code				IN OUT	VARCHAR2,
		p_error_parameter			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_enrich_settle_parties
	(
	p_field1   		 IN  		VARCHAR2,
	p_field2   		 IN  		VARCHAR2,
	p_field3   		 IN  		VARCHAR2,
	p_field4   		 IN  		VARCHAR2,
	p_field5		 IN			VARCHAR2,
	p_customer		 OUT		oltms_customer.customer_no%TYPE,
	p_option   		 OUT 		VARCHAR2,
	p_value    		 OUT 		VARCHAR2,
	p_bic_code		 OUT		oltms_branch_bic.bic_code%TYPE,
	p_err_code 		 IN OUT		VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_get_rcvr_corresp_bic
	(
	p_field1   		 IN  		VARCHAR2,
	p_field2   		 IN  		VARCHAR2,
	p_field3   		 IN  		VARCHAR2,
	p_field4   		 IN  		VARCHAR2,
	p_field5		 IN		VARCHAR2,
	p_customer		 OUT		oltms_customer.customer_no%TYPE,
	p_option   		 OUT 		VARCHAR2,
	p_value    		 OUT 		VARCHAR2,
	p_err_code 		 IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_citiny_customer
	(
	p_customer			IN 	oltms_customer.customer_no%TYPE,
	p_citiny_shortname_list	IN 	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_usd_clg_network
	(
	p_usd_clg_network 	IN		oltbs_settlements.usd_clg_network%TYPE,
	p_customer			IN 		oltms_customer.customer_no%TYPE,
	p_option			IN 		VARCHAR2,
	p_value			IN OUT	VARCHAR2,
	p_err_code			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_frame_message
	(
	p_option		IN 		VARCHAR2,
	p_value		IN OUT	VARCHAR2,
	p_err_code		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION acnoline
	(
		inpval IN VARCHAR2
	)
RETURN BOOLEAN;


FUNCTION fn_derive_72_data_tags
	(
		p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
		p_module				IN		smtbs_modules.module_id%TYPE,
		p_transfer_type_list	IN		VARCHAR2,
		p_benef_inst_list		IN		VARCHAR2,
		p_ult_benef_list		IN		VARCHAR2,
		p_field72_conf_list		IN		VARCHAR2,
		p_amount_tag_list		IN		VARCHAR2,
		p_amount_tag			IN		VARCHAR2,
		p_SenderToRecv_			IN	OUT	VARCHAR2,
		p_BrokerInfo_			OUT		VARCHAR2,
		p_BNFAccNo_				OUT		VARCHAR2,
		p_BNFInfo_				OUT		VARCHAR2,
		p_error_code			OUT		VARCHAR2,
		p_error_parameter		OUT		VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION  fn_compare_acc_with_instn
		(
		p_list1					IN 			VARCHAR2,
		p_list2					IN 			VARCHAR2,
		p_err_code				IN	OUT 	VARCHAR2,
		p_err_parameter			IN 	OUT		VARCHAR2
		)
RETURN BOOLEAN;

----------------------------------------------------------------------------------------------------

FUNCTION fn_derive_72_data_tags
	(
		p_contractis_record     IN  		olpkss_new.g_contractis_record_type, --FLEXCUBE V.CL RELEASE 7.1 CHANGES synonym used
		p_contract_ref_no		IN		VARCHAR2,
		p_module			IN		VARCHAR2,
		p_msg_type			IN		VARCHAR2,
		p_SenderToRecv_		IN OUT	VARCHAR2,
		p_BNFAccNo_			OUT		VARCHAR2,
		p_BNFInfo_			OUT		VARCHAR2,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
----------------------------------------------------------------------------------------------------
FUNCTION fn_resolve_recv_parties
	(
		p_option		IN OUT 	VARCHAR2,
		p_accountline	IN OUT 	VARCHAR2,
		p_field1		IN OUT 	VARCHAR2,
		p_field2		IN OUT 	VARCHAR2,
		p_field3		IN OUT 	VARCHAR2,
		p_field4		IN OUT 	VARCHAR2,
		p_customer		IN OUT 	VARCHAR2,		
		p_concat_value	IN OUT 	VARCHAR2,		
		p_error_code	IN OUT	VARCHAR2,
		p_error_parameter	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

---FCC 4.6 Sep04 Retro(India)  IFN FORMAT CHANGES START
FUNCTION fn_generate_common_ifn_ref_no
	(
		p_sender_swift_address		IN		sttms_core_swift_address.swift_address%TYPE,
		p_recvr_swift_address		IN		sttms_core_swift_address.swift_address%TYPE,
		--p_rate                 	IN xxtbs_contract_master.ex_rate%TYPE, --ofcl12.3 change starts here
		p_rate                 		IN OLTB_CONTRACT_LINKAGES.exchange_rate%TYPE ,--ofcl12.3 changes ends here
		p_common_ref_no				IN OUT	VARCHAR2
	)
RETURN BOOLEAN ;
--FCC 4.6 Sep04 Retro(India) IFN FORMAT CHANGES END 
--FCC 4.6 Sep04 Retro(India) changes START
FUNCTION fn_generate_common_ref_no
	(
		p_sender_swift_address		IN		sttms_core_swift_address.swift_address%TYPE,
		p_recvr_swift_address		IN		sttms_core_swift_address.swift_address%TYPE,
		--p_rate				IN		xxtbs_contract_master.ex_rate%TYPE,  --OFCL12.3 changes start here
		p_rate					IN		OLTB_CONTRACT_LINKAGES.exchange_rate%TYPE ,--OFCL12.3 changes end here
		p_common_ref_no			IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--FCC 4.6 Sep04 Retro(India) changes END

--FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Starts 
--FCC-7.3-RETRO-CITIUK-4.4-RETRO#248 Changes Start
FUNCTION fn_strip
		(
		p_cif_value			IN 	VARCHAR2
		)
RETURN VARCHAR2;
--FCC-7.3-RETRO-CITIUK-4.4-RETRO#248 Changes End
--FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Ends

END olpks_swift_gen_fields;
/
CREATE OR REPLACE SYNONYM olpkss_swift_gen_fields FOR olpks_swift_gen_fields
/