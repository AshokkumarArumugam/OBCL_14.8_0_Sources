CREATE OR REPLACE PACKAGE olpks_uid_services_0
AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_uid_services_0.SPC
**
** Module	: LD
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



----------------------------------------------------------------------------------------------------

FUNCTION fn_uid_booking
	(
	p_contract_ref_no          IN		oltbs_contract.contract_ref_no%TYPE,
	p_version_no			   IN		NUMBER,
	p_event_seq_no             IN       OLTB_CONTRACT.latest_event_seq_no%TYPE,
	p_component                IN		oltbs_inst_schedules.component%TYPE,
	p_processing_date          IN       DATE,
	p_value_date               IN	    DATE,
	p_maturity_date			   IN 		DATE,
	p_currency				   IN		oltbs_inst_schedules.ccy%TYPE,
	p_principal_amount		   IN		oltbs_inst_schedules.basis_amount%TYPE,
	p_handoff_actn_code        IN       oltbs_contract_event_log.auth_status%TYPE,
	p_error_code               IN OUT   VARCHAR2,
	p_error_parameter          IN OUT   VARCHAR2
	)    
	RETURN BOOLEAN;

FUNCTION fn_build_tags_for_uid	
	(
	p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE,
	p_component                 IN		oltbs_inst_schedules.component%TYPE,
	p_currency					IN		oltbs_inst_schedules.ccy%TYPE,
	p_amount                    IN      oltbs_inst_schedules.calculated_amount%TYPE,
	p_list_of_amount_tags		OUT		VARCHAR2,
	p_list_of_amount_ccys		OUT		VARCHAR2,
	p_list_of_amounts			OUT		VARCHAR2,
	p_error_code				IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_register_a_event
	(
	p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE,
	p_event_code				IN		oltbs_contract.curr_event_code%TYPE,
	p_new_version_indicator		IN		oltbs_contract_event_log.new_version_indicator%TYPE,
	p_value_date				IN		DATE,
	p_contract_status			IN		oltbs_contract.contract_status%TYPE,
	p_auth_status				IN		VARCHAR2,
	p_latest_esn				OUT		oltbs_contract.latest_event_seq_no%TYPE,
	p_latest_version_no			OUT		oltbs_contract.latest_version_no%TYPE,
	p_error_code				IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;
	
FUNCTION fn_populate_values	
	(
	p_contract_ref_no			IN		oltbs_contract.contract_ref_no%TYPE,											 
	p_component					IN		oltbs_contract.contract_ref_no%TYPE,
	p_start_date				IN		DATE,
	p_end_date					IN		DATE,
	p_no_of_days				IN		oltbs_inst_schedules.no_of_days%TYPE,
	p_interestamt				IN		NUMBER,
	p_currency				   	IN		oltbs_inst_schedules.ccy%TYPE,
	p_error_code				IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_refresh_schedules
	(
	p_contract_ref_no	 		IN		oltbs_contract.contract_ref_no%TYPE,
	p_version_no				IN		NUMBER,
	p_component					IN		oltbs_inst_schedules.component%TYPE,
	p_value_date				IN	    DATE,
	p_processing_date			IN		DATE,
	p_maturity_date				IN		DATE,
	p_principal_amount			IN		oltbs_inst_schedules.basis_amount%TYPE,
	p_error_code				IN OUT   VARCHAR2,
	p_error_parameter			IN OUT   VARCHAR2
	)
	RETURN	BOOLEAN;

FUNCTION fn_reverse_uid
	(
	p_contract_ref_no			IN		oltbs_contract_master.contract_ref_no%TYPE,
	p_component					IN		oltbs_contract_master.main_comp%TYPE,
	p_schedule_date				IN		DATE,
	p_value_date				IN		DATE,
	p_error_code				IN OUT	VARCHAR2,
	p_error_parameter			IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;
	
----------------------------------------------------------------------------------------------------

END olpks_uid_services_0;
/
CREATE or replace SYNONYM olpkss_uid_services_0 FOR olpks_uid_services_0
/