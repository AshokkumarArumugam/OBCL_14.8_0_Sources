CREATE OR REPLACE PACKAGE olpks_net_new
AS
/*-------------------------------------------------------------------------------------------------------------------
**
** File Name	: olpks_net_new
**
** Module		: 
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
/*
CHANGE HISTORY
19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Starts 
	29-aug-2007 FCC-7.3-RETRO-CITIUK-4.4-RETRO#175 start
			PLC44130049		Additional Validation of Message fields during deal upload.
						Made fn_resolve_msgtype Public
	FCC-7.3-RETRO-CITIUK-4.4-RETRO#175 end
--FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Ends
*/

TYPE g_cstbs_msgho_table_type IS TABLE OF oltbs_msgho_cs%ROWTYPE
INDEX BY BINARY_INTEGER;

--------------------------------------------------------------------------------------------------------------------

FUNCTION fn_net
	(
	p_contract_record		IN		oltbs_contract%ROWTYPE			,
	p_autoauth_flag		IN		VARCHAR2					,
	p_settlement_info_table	IN 		olpkss_sgen_new.tb_settlement_info	,	
	p_contractis_table	IN 		olpkss_new.g_contractis_table_type	,
	p_event_code		IN		oltbs_contract.curr_event_code%TYPE ,
	p_error_code		IN OUT	VARCHAR2					,	
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

------------------------------------------------------------------------------------------------------------------

FUNCTION fn_net
	(
	p_contract_record		IN		oltbs_contract%ROWTYPE			,
	p_autoauth_flag		IN		VARCHAR2					,
	p_settlement_info_table	IN OUT	olpkss_sgen_new.tb_settlement_info	,	
	p_event_code		IN		oltbs_contract.curr_event_code%TYPE ,
	p_list_amount_tag		IN		VARCHAR2					,
	p_list_amount		IN		VARCHAR2					,
	p_list_tag_ccy		IN		VARCHAR2					,
	p_error_code		IN OUT	VARCHAR2					,	
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

------------------------------------------------------------------------------------------------------------------

FUNCTION fn_ins_mstb_dly_msg_out
	(
	p_contract_record		IN		oltbs_contract%ROWTYPE	,
	p_esn				IN		NUMBER			,
	p_autoauth_flag		IN 		VARCHAR2			,
	p_cstb_msgho_table	IN 		g_cstbs_msgho_table_type,
	p_error_code		IN OUT 	VARCHAR2			,
	p_error_parameter		IN OUT 	VARCHAR2
	)
RETURN BOOLEAN;

------------------------------------------------------------------------------------------------------------------

FUNCTION fn_compare_pay
	(
	 p_contractis_rec_pay		IN 		olpks_new.g_contractis_record_type,
	 p_contractis_rec_payaddl	IN 		olpks_new.g_contractis_record_type,
	 p_compare_flag			OUT		VARCHAR2,
	 p_error_code			IN OUT 	VARCHAR2,
	 p_error_parameter		IN OUT 	VARCHAR2
	)
RETURN BOOLEAN;

--------------------------------------------------------------------------------------------------------------------

FUNCTION fn_compare_recv
	(
	 p_contractis_rec_recv		IN 		olpks_new.g_contractis_record_type,
	 p_contractis_rec_recvaddl	IN 		olpks_new.g_contractis_record_type,
	 p_compare_flag			OUT 		VARCHAR2,
	 p_error_code			IN OUT 	VARCHAR2,
	 p_error_parameter		IN OUT 	VARCHAR2
	)
RETURN BOOLEAN;

--------------------------------------------------------------------------------------------------------------------
FUNCTION fn_resolve_receiver
	(
	p_contractis_table	IN		olpkss_new.g_contractis_table_type	,
	p_cstb_msgho		IN		oltbs_msgho_cs%ROWTYPE			,
	p_customer_no		IN OUT	VARCHAR2					,
	p_bic_code			IN OUT	VARCHAR2					,
	p_error_code		IN OUT	VARCHAR2					,
	p_error_parameter		IN OUT 	VARCHAR2
	)
RETURN BOOLEAN;

--------------------------------------------------------------------------------------------------------------------

FUNCTION	fn_resolve_party_type
		(		
		p_account_line	IN		VARCHAR2	,		
		p_party_line	IN		VARCHAR2	,		
		p_rtgs_payment	IN		VARCHAR2	,		
		p_customer_no	IN OUT	oltms_customer.customer_no%TYPE	,		
		p_bic_code		IN OUT	oltms_customer.primary_bic%TYPE
		)
RETURN BOOLEAN; 

--------------------------------------------------------------------------------------------------------------------

FUNCTION fn_delete
		(
		p_contract_ref_no		IN 		oltbs_msgho_cs.contract_ref_no%TYPE	,
		p_esn				IN 		oltbs_msgho_cs.event_seq_no%TYPE		,
		p_error_code		IN OUT	VARCHAR2					,
		p_error_parameter		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;

--------------------------------------------------------------------------------------------------------------------

FUNCTION fn_populate_receiver
		(
		p_msg_handoff		IN 		oltbs_msg_handoff%ROWTYPE,
		p_customer_no		IN OUT	oltms_customer.customer_no%TYPE,
		p_bic_code			IN OUT	oltms_branch_bic.bic_code%TYPE,
		p_error_code		IN OUT	VARCHAR2,
		p_error_parameter		IN OUT 	VARCHAR2
		)
RETURN BOOLEAN;

--------------------------------------------------------------------------------------------------------------------
--FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Starts 
--FCC-7.3-RETRO-CITIUK-4.4-RETRO#175 start
--CITIPLC PLC44130049 Changes Start
FUNCTION fn_resolve_msgtype
	(	
	p_index			IN		NUMBER					,	
	p_contractis_table	IN 		olpkss_new.g_contractis_table_type	,	
	p_cstbs_contract_rec	IN		oltbs_contract%ROWTYPE			,
	p_cstb_msgho		IN OUT	g_cstbs_msgho_table_type		,	
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--CITIPLC PLC44130049 Changes End
--FCC-7.3-RETRO-CITIUK-4.4-RETRO#175 end
--FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Ends
--------------------------------------------------------------------------------------------------------------------
--FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Starts 
--FCC-7.3-RETRO-CITIUK-4.4-RETRO#250(PLC442060014) Changes Start
FUNCTION fn_strip
		(
		p_cif_value			IN 	VARCHAR2
		)
RETURN VARCHAR2;
--FCC-7.3-RETRO-CITIUK-4.4-RETRO#250(PLC442060014) Changes End
--FCC V.CL 7.3 UK CONSOLIDATION RETRO Changes Ends
--------------------------------------------------------------------------------------------------------------------

END olpks_net_new;
/
CREATE or replace SYNONYM olpkss_net_new FOR olpks_net_new
/