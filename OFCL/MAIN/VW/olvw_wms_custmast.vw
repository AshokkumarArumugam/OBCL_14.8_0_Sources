CREATE OR REPLACE FORCE VIEW olvw_wms_custmast(
				IDENTIFIER,
				OPERATION_CODE,
				CUSTOMER_NO,            
				LOCATION,               
				MEDIA,                  
				ENTITY,                 
				LATEST_VERSION_NO,
				MOD_NO
				)
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_wms_custmast.VW
**
** Module       : INTERFACES
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
     Change Description : Changed work tables to main tables
	 Search String 		:27900990 
*/
			SELECT 
				'#CUSTMAST#',
				' ',
				CUSTOMER_NO,            
				LOCATION,               
				MEDIA,                  
				ENTITY,                 
				LATEST_VERSION_NO,
				MOD_NO
			FROM
				oltm_cust_master_ms --27900990
/
CREATE OR REPLACE SYNONYM olvws_wms_custmast FOR olvw_wms_custmast
/