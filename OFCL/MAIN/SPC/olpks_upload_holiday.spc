CREATE OR REPLACE PACKAGE olpks_upload_holiday IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_upload_holiday.SPC
** Package Name	: LDBHOLUP.SPC
** Module		: LD
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

*/



FUNCTION fn_upload_for_a_branch
	(
	p_branch_code		IN		oltms_branch.branch_code%TYPE,
	p_module_code		IN		oltbs_contract.module_code%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_get_working_date
	(
	p_change_date			IN	oltbs_upload_holiday_master.change_date%TYPE,
	p_schedule_movement		IN	oltbs_contract_preference.schedule_movement%TYPE,	--('P' OR 'N')
	p_pmt_rvn_indicator		IN	VARCHAR2,								--('RVN' OR 'PMT')
	p_holiday_chk			IN	oltms_product_master_ld.holiday_check%TYPE,			--('L','C','B')
	p_apply_pmt_hol_treatment	IN	oltbs_contract_preference.apply_pmt_hol_treatment%TYPE,
	p_holiday_ccy			IN	oltbs_contract_preference.holiday_ccy%TYPE,
	p_rvn_holiday_ccy			IN 	oltbs_contract_preference.rvn_holiday_ccy	%TYPE,
	p_chk_rate_code_ccy		IN	oltbs_contract_preference.chk_rate_code_ccy%TYPE,
	p_rvn_chk_rate_code_ccy		IN	oltbs_contract_preference.rvn_chk_rate_code_ccy%TYPE,
	p_revision_ccy			IN	oltbs_contract_preference.revision_ccy%TYPE
	)
RETURN DATE;

END olpks_upload_holiday;
/
CREATE or replace SYNONYM olpkss_upload_holiday FOR olpks_upload_holiday
/