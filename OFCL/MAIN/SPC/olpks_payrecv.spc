create or replace package olpks_payrecv is
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_payrecv.SPC
**
** Module		: LOANS AND DEPOSITS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
**
----------------------------------------------------------------------------------------------------
*/


/*------------------------------------------CHANGE HISTORY----------------------------------
22-SEP-2008  FLEXCUBE V.CL Release 7.4 - STP LD VAMI CHANGES ; Pay-recv activities

*/

	FUNCTION fn_payrecv_delete
		(
			p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
			p_esn			IN	oltbs_contract.latest_event_seq_no%TYPE,
			p_lvn			IN  oltbs_contract.latest_version_no%TYPE,
			p_error_code	IN OUT	VARCHAR2,
			p_error_param	IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_payrecv_reverse
		(
			p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
			p_esn			IN	oltbs_contract.latest_event_seq_no%TYPE,
			p_lvn			IN  oltbs_contract.latest_version_no%TYPE,
			p_error_code	IN OUT	VARCHAR2,
			p_error_param	IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;


	FUNCTION fn_payrecv_liqd
		(
			p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
			p_esn			IN	oltbs_contract.latest_event_seq_no%TYPE,
			p_lvn			IN  oltbs_contract.latest_version_no%TYPE,
			p_value_date	IN	DATE,
			p_error_code	IN OUT	VARCHAR2,
			p_error_param	IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_payrecv_liqd_auth
		(
			p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
			p_esn			IN	oltbs_contract.latest_event_seq_no%TYPE,
			p_error_code	IN OUT	VARCHAR2,
			p_error_param	IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_populate_paid
		(
			p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
			p_esn			IN	oltbs_contract.latest_event_seq_no%TYPE,
			p_value_date	IN	oltbs_payrecv_paid.paid_date%Type,
			p_error_code	IN OUT	VARCHAR2,
			p_error_param	IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;


	FUNCTION fn_update_contract_details
		(
			p_contract_ref_no	IN 	oltbs_contract.contract_ref_no%TYPE,
			p_esn			IN	oltbs_contract.latest_event_seq_no%TYPE,
			p_lvn			IN 	oltbs_contract.latest_version_no%TYPE,
			p_error_code	IN OUT	VARCHAR2,
			p_error_param	IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_delete_contract_details
		(
			p_contract_ref_no IN 	oltbs_contract.contract_ref_no%TYPE,
			p_esn			IN 	oltbs_contract.latest_event_seq_no%TYPE,
			p_lvn			IN 	oltbs_contract.latest_version_no%TYPE,
			p_error_code	IN OUT	VARCHAR2,
			p_error_param	IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;

	FUNCTION fn_reverse_contract_details
		(
			p_contract_ref_no IN	oltbs_contract.contract_ref_no%TYPE,
			p_esn			IN	oltbs_contract.latest_event_seq_no%TYPE,
			p_esn_rev		IN	oltbs_contract_event_log.reversed_event_seq_no%type,
			p_lvn 		IN	oltbs_contract.latest_version_no%TYPE,
			p_error_code	IN OUT	VARCHAR2,
			p_error_param	IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;
	
	FUNCTION fn_payrecv_reverse_delete
		(
			p_contract_ref_no	IN	oltbs_contract.contract_ref_no%TYPE,
			p_esn			IN	oltbs_contract.latest_event_seq_no%TYPE,
			p_lvn			IN	oltbs_contract.latest_version_no%TYPE,
			p_error_code	IN OUT	VARCHAR2,
			p_error_param	IN OUT	VARCHAR2
		)
	RETURN BOOLEAN;

-- 28312398  changes  start
  FUNCTION fn_pop_payrecv_due(p_contract_ref_no IN oltbs_contract.contract_ref_no%TYPE,
                              p_event_seq_no    IN oltbs_contract_master.event_seq_no%TYPE,
                              p_event_code      IN oltbs_contract_event_log.event_code%TYPE,
                              p_component       IN lftbs_contract_interest.component%TYPE,
                              p_currency        IN oltbs_contract_master.currency%TYPE,
                              p_event_date      IN oltbs_contract_event_log.event_date%TYPE,
                              p_diff_amount     IN OUT oltbs_contract_master.amount%TYPE,
                              p_error_code      IN OUT VARCHAR2,
                              p_error_param     IN OUT VARCHAR2)
    RETURN BOOLEAN; 	
-- 28312398  changes  end

END olpks_payrecv;
/
CREATE or replace SYNONYM	olpkss_payrecv for olpks_payrecv
/