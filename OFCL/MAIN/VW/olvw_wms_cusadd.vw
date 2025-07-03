CREATE OR REPLACE FORCE VIEW olvw_wms_cusadd ( 
			IDENTIFIER,
			OPERATION_CODE,
			TOBE_EMAILED,
			CUSTOMER_NO,
			LOCATION,
			MEDIA,
			ADDRESS1,
			ADDRESS2,
			ADDRESS3,
			ADDRESS4,
			LANGUAGE,
			TEST_KEYWORD,
			COUNTRY,
			NAME,
			ANSWERBACK,
			TEST_REQUIRED,
			NAME2,
			ZIP_CODE,
			DELIVERY_BY,
					--PLC46180001 CHANGES START
			ENTITY,
			MOD_NO,
			VERSION_NO,
					--PLC46180001 CHANGES END
FAX_NO--27182343  					
			)
AS 
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_wms_cusadd.VW
**
** Module       : INTERFACES
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/*
CHANGE HISTORY
06-Feb-2004	SFR PLC44070020	New unit in 4.4 taken from 4.3 baseline
01-JUN-2005	PLC46180001 ADDED COLUMNS
	Changed By         :Anub Mathew 
     Change Description : Added code to handle  new field FAX_NO in oltw_cust_address and oltm_cust_address_ms 
	 Search String 		:27182343  
*/
		SELECT 
			'#CUSADD#',
			' ',
			TOBE_EMAILED,
			CUSTOMER_NO,
			LOCATION,
			MEDIA,
			ADDRESS1,
			ADDRESS2,
			ADDRESS3,
			ADDRESS4,
			LANGUAGE,
			TEST_KEYWORD,
			COUNTRY,
			NAME,
			ANSWERBACK,
			TEST_REQUIRED,
			NAME2,
			ZIP_CODE,
			DELIVERY_BY,
					--PLC46180001 CHANGES START
			ENTITY,
			MOD_NO,
			VERSION_NO,
					--PLC46180001 CHANGES END
FAX_NO--27182343 					
		FROM
			oltms_cust_address_ms
/
CREATE OR REPLACE SYNONYM olvws_wms_cusadd FOR olvw_wms_cusadd
/