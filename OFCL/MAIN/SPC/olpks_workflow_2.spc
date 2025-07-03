CREATE OR REPLACE PACKAGE olpks_workflow_2
AS

/*-----------------------------------------------------------------------------------------
**
** File Name	: olpks_workflow_2.SPC
**
** Module	: LOANS and DEPOSITS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
---------------------------------------------------------------------------------------------------------------------------------
CHANGE HISTORY

15-MAY-2003	FCC 4.2 OPS focus testing changes
17-JUNE-2008 FLEXCUBE V.CL RELEASE 7.4 RETRO CHANGES CITIUS-LD-Till#443,Treasury rates changes.
-------------------------------------------------------------------------------------
*/



FUNCTION fn_fetch_floating_rates_auto
	(
	p_treasury_source		IN		oltms_treasury_source.treasury_source%TYPE,
	p_from_date			IN		lftms_treasury_rate_detail.effective_date%TYPE,
	p_to_date			IN		lftms_treasury_rate_detail.effective_date%TYPE,
	p_currency			IN		lftms_treasury_rate_detail.ccy_code%TYPE,
	p_rate_code			IN		lftms_treasury_rate_detail.rate_code%TYPE,
	p_tenor			IN		lftms_treasury_rate_detail.tenor_unit%TYPE,
	p_ty_rate			OUT		olpkss_schedules.ty_rate,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION	fn_get_floating_rates_periodic
	(
	p_treasury_source		IN		oltms_treasury_source.treasury_source%TYPE,
	p_rate_code			IN		lftms_treasury_rate_code.rate_code%TYPE,
	p_ccy_code			IN		cytms_ccy_defn.ccy_code%TYPE,
	p_deal_date			IN		lftms_treasury_rate_master.effective_date%TYPE,
	p_value_date		IN		lftms_treasury_rate_master.effective_date%TYPE,
	p_tenor			IN		lftms_treasury_rate_detail.spot_no_of_days%TYPE,
	p_rate			OUT		lftms_treasury_rate_detail.spot_rate%TYPE,
	p_pickup_tenor		OUT		lftms_treasury_rate_detail.spot_no_of_days%TYPE,
	p_rate_type			OUT		VARCHAR2,
	p_rate_pickedup		OUT		VARCHAR2,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION	fn_get_ccy_int_spot_date
	(
	p_ccy_code			IN		cytms_ccy_defn.ccy_code%TYPE,
	p_int_spot_days		OUT		oltms_brn_ccy_msg_days.int_spot_days%TYPE,
	p_int_spot_date		OUT		DATE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION	fn_get_rates_for_period
	(
	p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
	p_component			IN		oltbs_contract_iccf_calc.component%TYPE,
	p_from_date			IN		DATE,
	p_to_date			IN		DATE,
	p_rates			OUT		olpkss_schedules.ty_rate,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION	fn_get_funding_period
			(
			p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
			p_start_date	OUT		DATE,
			p_end_date		OUT		DATE,
			p_error_code	IN OUT	VARCHAR2,
			p_error_parameter	IN OUT	VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION	fn_track_funding
			(
			p_contract_ref_no		IN		oltbs_contract.contract_ref_no%TYPE,
			p_main_component		IN		oltbs_contract_master.main_comp%TYPE,
			p_event_seq_no		IN		oltbs_contract.latest_event_seq_no%TYPE,
			p_curr_funding_amount	IN		oltbs_contract_funding.curr_funding_amount%TYPE,
			p_prev_funding_amount	IN		oltbs_contract_funding.prev_funding_amount%TYPE,
			p_effective_date		IN		oltbs_contract_funding.effective_date%TYPE,
			p_error_code		IN OUT	VARCHAR2,
			p_error_parameter		IN OUT	VARCHAR2
			)
RETURN BOOLEAN;
--
--FCC 4.2 OPS focus testing changes start
--
FUNCTION	fn_update_deal_date_reqd
			(
			p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
			p_comp_exists	IN OUT	VARCHAR2,
			p_error_code	IN OUT	VARCHAR2,
			p_error_parameter	IN OUT	VARCHAR2
			)
RETURN BOOLEAN;

FUNCTION	fn_update_cont_int
			(
			p_contract_ref_no	IN		oltbs_contract.contract_ref_no%TYPE,
			p_error_code	IN OUT	VARCHAR2,
			p_error_parameter	IN OUT	VARCHAR2
			)
RETURN BOOLEAN;

--
--FCC 4.2 OPS focus testing changes end
--
--17-JUNE-2008 FLEXCUBE V.CL RELEASE 7.4 RETRO CHANGES CITIUS-LD-Till#443 START
--06-Apr-2006 Madhu CITIUS Till#443, Treasury rates changes >>
FUNCTION Fn_get_treasury_rates
	(
	p_treasury_source		IN		oltms_treasury_source.treasury_source%TYPE,
	p_rate_code				IN		lftms_treasury_rate_code.rate_code%TYPE,
	p_ccy_code				IN		cytms_ccy_defn.ccy_code%TYPE,
	p_deal_date				IN		lftms_treas_rate_master.effective_date%TYPE,
	p_value_date			IN		lftms_treas_rate_master.effective_date%TYPE,
	p_maturity_date			IN		lftms_treas_rate_master.effective_date%TYPE,
	p_rate					OUT		lftms_treas_rate_detail.rate%TYPE,
	p_pickup_tenor			OUT		NUMBER,
	p_rate_pickedup			OUT		VARCHAR2,
	p_error_code			IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--06-Apr-2006 Madhu CITIUS Till#443, Treasury rates changes <<
--17-JUNE-2008 FLEXCUBE V.CL RELEASE 7.4 RETRO CHANGES CITIUS-LD-Till#443 END
--------------------------------------------------------------------------------------------------------------------------
END olpks_workflow_2;
/
CREATE or replace SYNONYM olpkss_workflow_2 FOR olpks_workflow_2
/