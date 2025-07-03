CREATE OR REPLACE PACKAGE olpks_call_notice
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_call_notice.SPC
**
** Module       : LOANS AND DEPOSITS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
FCC 4.6.2 LEO, ROLLING LOAN CHANGES
	
----------------------------------------------------------------------------------------------------
*/


FUNCTION fn_updation_of_amount_due
	( 
	p_module		IN	oltbs_contract.module_code%TYPE,
	p_processing_date	IN	date,
	p_product		IN	oltbs_contract.product_code%TYPE,
	p_commit_frequency	IN	oltbs_automatic_process_master.eod_commit_count%TYPE, 
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

FUNCTION fn_process_for_a_contract
	( 
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
	p_processing_date	IN	date,
	p_authorization_status	IN	oltbs_contract.auth_status%TYPE,
	p_handoff_action_code	IN	char,
	p_error_code		IN OUT	varchar2,
	p_error_parameter	IN OUT	varchar2
	)
	RETURN boolean;

--FCC 4.6.2, Leo Fed rate loan change starts
FUNCTION fn_redef_rolling_schedules
	(p_module           IN oltbs_contract.module_code%TYPE
	,p_processing_date  IN DATE
	,p_product          IN oltbs_contract.product_code%TYPE
	,p_commit_frequency IN oltbs_automatic_process_master.eod_commit_count%TYPE
	,p_error_code       IN OUT VARCHAR2
	,p_error_parameter  IN OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION fn_redef_for_a_contract
	(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE
	,p_processing_date IN DATE
	,p_error_code IN OUT VARCHAR2
	,p_error_parameter IN OUT VARCHAR2
	)
RETURN BOOLEAN;

--FCC 4.6.2, Leo Fed rate loan change ends

END olpks_call_notice;
/
CREATE or replace SYNONYM olpkss_call_notice FOR olpks_call_notice
/