CREATE OR REPLACE FORCE VIEW olvw_wms_accudf (
				IDENTIFIER,
				BRANCH_CODE,
				CUST_AC_NO,
				UDF_FIELD_NAME,
				UDF_VALUE
				)
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_wms_accudf.VW
**
** Module       : INTERFACES
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY
06-Feb-2004	SFR PLC44070018	New unit in 4.4 taken from 4.3 baseline
*/
			SELECT 
				'#UDF#',
				cspkes_misc.fn_getparam(REC_KEY,1,'~'),
				cspkes_misc.fn_getparam(REC_KEY,2,'~'),
				FIELD_NAME,
				FIELD_VAL
			FROM
				oltms_udf_local_vals
			WHERE
				FUNCTION_ID='STDCUSAC'
			UNION
			SELECT 
				'#UDF#',
				cspkes_misc.fn_getparam(REC_KEY,1,'~'),
				cspkes_misc.fn_getparam(REC_KEY,2,'~'),
				FIELD_NAME,
				FIELD_VAL
			FROM
				CSTMS_UDF_VALS
			WHERE
				FUNCTION_ID='STDCUSAC'
/
CREATE OR REPLACE SYNONYM olvws_wms_accudf FOR olvw_wms_accudf
/