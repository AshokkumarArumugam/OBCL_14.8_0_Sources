CREATE OR REPLACE VIEW lfvw_charge_class ( MODULE, 
CLASS_CODE, CLASS_DESCRIPTION, RECORD_STAT, AUTH_STAT, 
ONCE_AUTH, MAKER_ID, MAKER_DT_STAMP, CHECKER_ID, 
CHECKER_DT_STAMP, MOD_NO, CHARGE_TYPE, THIRD_PARTY_TYPE, 
DEBIT_OR_CREDIT_TYPE ) AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lfvw_charge_class.VW
**
** Module      : Accounting
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
SELECT
			a.module,
			a.class_code,
			a.class_description,
			a.record_stat,
			a.auth_stat,
			a.once_auth,
			a.maker_id,
			a.maker_dt_stamp,
			a.checker_id,
			a.checker_dt_stamp,
			a.mod_no,
			b.charge_type,
			b.third_party_type,
			b.debit_or_credit_type
	FROM		lftms_charge_class b,
			oltms_class a
	WHERE		a.class_type 	= 'CH'
	AND		b.module 		= a.module
	AND		b.class_code 	= a.class_code
/
create or replace synonym lfvws_charge_class for lfvw_charge_class
/