CREATE OR REPLACE FORCE VIEW olvw_customer_address
(
 	CUSTOMER_NO, 
 	LOCATION, 
 	MEDIA, 
 	LANGUAGE, 
 	COUNTRY, 
 	RECORD_STAT, 
 	AUTH_STAT, 
 	LOCAL_BRANCH, 
 	ENTITY, 
 	NAME,
	NAME2,
	ADDRESS1,
	ADDRESS2,
	ADDRESS3,
	ADDRESS4,
	FAX_NO,--27182343  
	ZIP_CODE,
	DELIVERY_BY,
 	MAKER_ID, 
 	MAKER_DT_STAMP, 
 	CHECKER_ID, 
 	CHECKER_DT_STAMP
 )
AS 
/*----------------------------------------------------------------------------------------------------
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
	Changed By         :Anub Mathew 
     Change Description : Added code to handle  new field FAX_NO in oltw_cust_address and oltw_cust_address
	 Search String 		:27182343  
	 Changed By         :Anub Mathew 
     Change Description : Changed work tables to main tables
	 Search String 		:27900990 
*/
(SELECT 	A.CUSTOMER_NO,
		A.LOCATION,
		A.MEDIA,
		A.LANGUAGE,
		A.COUNTRY,
		A.RECORD_STAT,
		A.AUTH_STAT,
		B.LOCAL_BRANCH,
		A.ENTITY	,
		A.NAME,
		A.NAME2,
		A.ADDRESS1,
		A.ADDRESS2,
		A.ADDRESS3,
		A.ADDRESS4,
		A.FAX_NO,--27182343  
		A.ZIP_CODE,
		A.DELIVERY_BY,
		A.MAKER_ID ,     
		A.MAKER_DT_STAMP         ,
		A.CHECKER_ID             ,
		A.CHECKER_DT_STAMP
FROM 		oltms_cust_address_ms A,  --27900990
		oltms_cust_master_ms C, --27900990
		oltms_customer B
WHERE 	A.CUSTOMER_NO = B.CUSTOMER_NO
AND 		A.CUSTOMER_NO = C.CUSTOMER_NO 
AND 		A.LOCATION=C.LOCATION 
AND 		A.MEDIA=C.MEDIA 
AND 		A.ENTITY = C.ENTITY
AND 		A.VERSION_NO =C.LATEST_VERSION_NO) 
/
CREATE OR REPLACE SYNONYM olvws_customer_address FOR olvw_customer_address
/