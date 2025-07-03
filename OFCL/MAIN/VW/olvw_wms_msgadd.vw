CREATE OR REPLACE FORCE VIEW olvw_wms_msgadd (
				IDENTIFIER,
				OPERATION_CODE,
				MSG_TYPE,
				MODULE,
				BRANCH,
				LOCATION,
				MEDIA,
				CUSTOMER_NO,
				NO_OF_COPIES,
				FORMAT,
				CUST_AC_NO,
				--PLC46180001 CHANGES STARTS
				PRIMARY_ADDRESS,
				VERSION_NO,
				ENTITY,
				CONF_MATCHING
				--PLC46180001 CHANGES  ENDS
				)
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_wms_msgadd.VW
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
01-JUN-2005	PLC46180001 ADDED COLUMNS
*/

			SELECT 
				'#MSGADD#',
				' ',
				MSG_TYPE,
				MODULE,
				BRANCH,
				LOCATION,
				MEDIA,
				CUSTOMER_NO,
				NO_OF_COPIES,
				FORMAT,
				CUST_AC_NO,
				--PLC46180001 CHANGES STARTS
				PRIMARY_ADDRESS,
				VERSION_NO,
				ENTITY,
				CONF_MATCHING
				--PLC46180001 CHANGES  ENDS
			FROM
				oltms_msg_address_ms
/
CREATE OR REPLACE SYNONYM olvws_wms_msgadd FOR olvw_wms_msgadd
/