CREATE OR REPLACE PACKAGE olpks_upd_common AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_upd_common.SPC
**
** Module		: LOANS and DEPOSITS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
28-OCT-2014 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R715 RETRO EURCITIPLC#19292 changes new function added for exception logging.
----------------------------------------------------------------------------------------------------
*/


FUNCTION FN_INS_CSTBS_EVENT_LOG
						(
						p_cs_event_log IN oltbs_contract_event_log%ROWTYPE,
						pActionCode		IN	Char,
						pErrorCode OUT Varchar2
						) Return Boolean ;

PROCEDURE pr_upd_excep
	(
	pm_reference		IN		oltbs_contract.contract_ref_no%TYPE,
	pm_esn				IN		oltbs_contract.latest_event_seq_no%TYPE,
	pm_event				IN		oltbs_contract.curr_event_code%TYPE,
	pm_counterparty	IN		oltbs_contract.counterparty%TYPE,
	pm_module			IN		oltbs_contract.module_code%TYPE,
	pm_err_code_list	IN		VARCHAR2,
	pm_params_list		IN		VARCHAR2
	) ;

PROCEDURE pr_ins_excep
	(
	pm_reference		IN	oltbs_contract_master.contract_ref_no%TYPE,
	pm_esn				IN	oltbs_contract_exception.event_seq_no%TYPE,
	pm_event				IN	oltbs_contract_exception.event_code%TYPE,
	pm_counter_party 	IN	oltbs_contract_exception.counterparty%TYPE,
	pm_error_code		IN	oltbs_contract_exception.error_code%TYPE,
	pm_module			IN	oltbs_contract_exception.module%TYPE,
	pm_params			IN	oltbs_contract_exception.parameters%TYPE
	);

--24-SEP-2014 EURCITIPLC#19292 changes starts
procedure pr_log_exception
(
p_contract_ref_no IN oltbs_contract_exception.contract_ref_no%TYPE,
p_event_seq_no    IN oltbs_contract_exception.event_seq_no%TYPE,
p_event_code 	   IN oltbs_contract_exception.event_code%TYPE,
p_cpty 		   IN oltbs_contract_exception.counterparty%TYPE,
p_err_code	   IN oltbs_contract_exception.error_code%TYPE,
p_module	        IN oltbs_contract_exception.module%TYPE,
p_err_params	   IN oltbs_contract_exception.parameters%TYPE,
p_branch	        IN oltbs_contract_exception.branch%TYPE,
p_branch_date	   IN oltbs_contract_exception.branch_date%TYPE,
p_source	        IN oltbs_contract_exception.source%TYPE
);
--24-SEP-2014 EURCITIPLC#19292 changes ends

End olpks_upd_common;
/
Create or replace  synonym olpkss_upd_common for olpks_upd_common
/