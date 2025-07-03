CREATE OR REPLACE PACKAGE olpks_eim_services_0
AS
/*------------------------------------------------------------------------------------------------------------------------
**
** File Name	: olpks_eim_services_0.SPC
**
** Module		: DISCOUNT ACCRUAL
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
------------------------------------------------------------------------------------------------------------------------
*/
/*-----------------------------------------------------------------------------------------------------------------------
CHANGE HISTORY

Date			Version		FCC Version		Site		Description
05-OCT-2003		1.0			4.4			BANGALORE	Initial Version for CEEMEA IAS39 CHanges
------------------------------------------------------------------------------------------------------------------------
*/
FUNCTION fn_calc_old_till_date_accrual
	(
	p_contract_ref_no		IN 		oltbs_contract.contract_ref_no%TYPE,
	p_contract_value_date	IN		DATE,
	p_component			IN 		oltbs_contract_iccf_details.component%TYPE,
	p_component_currency	IN		oltbs_contract_iccf_details.component_currency%TYPE,
	p_accrual_to_date		IN		DATE,
	p_till_date_accrual	OUT		oltbs_contract_iccf_details.till_date_accrual%TYPE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
------------------------------------------------------------------------------------------------------------------------*/
END olpks_eim_services_0;
/
CREATE or replace SYNONYM olpkss_eim_services_0 FOR olpks_eim_services_0
/