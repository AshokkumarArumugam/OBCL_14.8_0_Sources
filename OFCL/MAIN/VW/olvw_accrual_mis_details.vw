CREATE OR REPLACE FORCE VIEW olvw_accrual_mis_details AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_accrual_mis_details.VW
**
** Module       : LOANS and DEPOSITS										
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
SELECT  LDAH.branch			brn
		, LDAH.module			module
		, LDAH.product			prod
		, LDAH.product_accrual_ref_no	refno
		, LDAH.contract_ref_no		crn
		, LDAH.component_ccy		ccy
		, LDAH.net_accrual		amt
		, CSC.counterparty		relcust
		, NULL				relacc
		, LDAH.value_date			val_dt
	FROM
		oltbs_contract_accrual_history LDAH
		, oltbs_contract CSC
	WHERE LDAH.contract_ref_no = CSC.contract_ref_no
	AND	LDAH.branch = GLOBAL.current_branch
	and   LDAH.VALUE_DATE = GLOBAL.application_date

-- Branch condition added to use the Index on Branch in LDAH
/
DROP	SYNONYM olvws_accrual_mis_details	
/
CREATE OR REPLACE SYNONYM olvws_accrual_mis_details FOR olvw_accrual_mis_details
/