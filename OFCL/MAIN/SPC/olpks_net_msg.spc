CREATE OR REPLACE PACKAGE olpks_net_msg  AS

/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_net_msg.SPC
**
** Module       : SETTLEMENT INSTRUCTIONS
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
Change History

10-FEB-2004 FCC 4.5 Apr 2004 Retro Changes # HUFCITI 1038 DE UDF fields also should be populated in acct stmt
25-MAR-2004 FCC 4.5 APR 2004 CHANGES FOR RNTC	-- ITR1 SFR 11.
30-DEC-2004 JAN 2005 FCC4.6.1 OFAC changes isfn_net function overloaded
						parameter p_msg_type added as defautl 'N' in Procedure ispr_ins
29-Aug-2016 -- OFCL12.2 Not Required
*/

TYPE is_handoff IS TABLE OF oltbs_settlements%ROWTYPE INDEX BY BINARY_INTEGER;

/****************************************************************************
*/
-- FUNCTION to be called by modules to net / generate settlement messages.
-- Parameters to be passed are
-- 							REFERENCE NUMBER
--							EVENT SEQUENCE NUMBER
--							AMOUNT TAG LIST (tilda separated)
--							RETURNS TRUE OR FALSE (IF error)
/****************************************************************************
*/

FUNCTION isfn_net
	(
	 p_ref_no 		IN VARCHAR2
	,p_event_no 	IN NUMBER
	,p_event_code 	IN oltbs_contract.curr_event_code%TYPE
	,p_tag_list 	IN VARCHAR2
	)
RETURN BOOLEAN;

------------------------------------------------------------------------------
--fcc 4.5 apr 2004 changes start
/*FUNCTION isfn_net
		(
		p_ref_no		IN		VARCHAR2,
		p_esn_no		IN		NUMBER,
		p_event_no		IN		NUMBER,
		p_event_code		IN		oltbs_contract.curr_event_code%TYPE,
		p_tag_list		IN		VARCHAR2,
		p_sgen_event		IN 		oltbs_contract.curr_event_code%TYPE,
		p_rmsg_flag		IN OUT		VARCHAR2,
		p_pmsg_flag		IN OUT		VARCHAR2,
		p_rntc_flag		IN OUT		VARCHAR2
		)
RETURN BOOLEAN;
*/
--fcc 4.5 apr 2004 changes end
-----------------------------------------------------------------------------

/*****************************************************************************/
-- FUNCTION to be called by ft to get account with institution FOR messages.
-- Parameters to be passed are
-- 							REFERENCE NUMBER
--							EVENT SEQUENCE NUMBER
--							SERIAL NUMBER FROM MESSAGING
--							RETURNS 4 ACC WITH INSTN
--							RETURNS TRUE OR FALSE (IF error)
/*****************************************************************************/
FUNCTION isfn_ref
	(
	 p_contract_ref_no 	IN VARCHAR2
	,p_event_seq_no 	 	IN NUMBER
	,p_serial_no 	 	IN oltbs_contract.curr_event_code%TYPE
	,p_acc_with_instn1 	OUT VARCHAR2
	,p_acc_with_instn2 	OUT VARCHAR2
	,p_acc_with_instn3 	OUT VARCHAR2
	,p_acc_with_instn4 	OUT VARCHAR2
	,p_acc_with_instn5 	OUT VARCHAR2
	)
RETURN BOOLEAN;

/*****************************************************************************/
-- Internal PROCEDURE used by the packages to CREATE PL/SQL TABLE OF
-- relevant records FROM oltbs_settlements based on ref, esn AND amount tags
/*****************************************************************************/

-- FCC 4.5 Apr 2004 Retro Changes HUFCITI # 1038 Start
/* -- OFCL12.2 Not Required
FUNCTION fn_resolve_pc_udf_map
		(
		p_module				IN		VARCHAR2,
		p_product_code			IN		VARCHAR2,
		p_is_udf_map_record		OUT		pctms_is_udf_map%ROWTYPE,
		p_found_flag			OUT		BOOLEAN,
		p_error_code			IN OUT	VARCHAR2,
		p_error_param			IN OUT	VARCHAR2
		)
		RETURN BOOLEAN;
*/ -- OFCL12.2 Not Required
-- FCC 4.5 Apr 2004 Retro Changes HUFCITI # 1038 End

--FCC4.6.1 OFAC changes starts function overloaded
FUNCTION isfn_net
		(
		p_ref_no		IN		VARCHAR2,
		p_event_no		IN		NUMBER,
		p_event_code	IN		oltbs_contract.curr_event_code%TYPE,
		p_tag_list		IN		VARCHAR2,
		p_memo_type		IN		VARCHAR2
		)
RETURN BOOLEAN;
--FCC4.6.1 OFAC changes ends

PROCEDURE ispr_crtbl
	(
	 p_refno 		IN  oltbs_contract.contract_ref_no%TYPE
	 ,p_esn_no	IN NUMBER
	,p_event_no 	IN NUMBER
	,p_tag_list 	IN VARCHAR2
	,p_sgen_event	IN VARCHAR2
	,istb_lookup	OUT olpks_net_msg.is_handoff
	);


/*****************************************************************************/
-- Internal PROCEDURE used by the PACKAGE to match records FOR netting
-- AND net them INTO a PL/SQL TABLE
/*****************************************************************************/
PROCEDURE ispr_match
	(
	 pIsHoff 	IN  		olpks_net_msg.is_handoff
	,p_msg_is 	IN OUT 	olpks_net_msg.is_handoff
	,pindex 	IN  		NUMBER
	);


/*****************************************************************************/
-- Internal PROCEDURE used by the PACKAGE to INSERT INTO the two tables
-- oltbs_msgho AND oltbs_msg_handoff
/*****************************************************************************/
PROCEDURE ispr_ins
	(
	 pmsgins	 	IN	olpks_net_msg.is_handoff
	,tindex 		IN	NUMBER
	,p_message	 	IN	VARCHAR2
	,p_memo_type	IN	VARCHAR2	DEFAULT	'N'		--FCC4.6.1 OFAC changes
	);

END olpks_net_msg ;

/
create or replace synonym olpkss_net_msg for olpks_net_msg
/