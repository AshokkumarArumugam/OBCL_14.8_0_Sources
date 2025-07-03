CREATE OR REPLACE FORCE VIEW olvw_wms_msgtype(
				IDENTIFIER,
				OPERATION_CODE,
				CUSTOMER_NO,
				PRODUCT,        
				BRANCH_CODE,
				MODULE,         
				MSG_TYPE,       
				FIELD_NO,       
				CODE,           
				COVER,          
				VALUE,          
				NEW_LINE,       
				SEQUENCE_NO,
				NO_OF_LINES,
				LOCATION       
				)
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_wms_msgtype.VW
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
02-JUN-2005	SFR PLC46180002 NEW VIEW
*/
		SELECT 
				'#MSGTYPE#',
				' ',
				CUSTOMER_NO,
				PRODUCT,        
				BRANCH_CODE,
				MODULE,         
				MSG_TYPE,       
				FIELD_NO,       
				CODE,           
				COVER,          
				VALUE,          
				NEW_LINE,       
				SEQUENCE_NO,
				NO_OF_LINES,
				LOCATION
			FROM
				oltms_msgtyp_field_code_value
/
CREATE OR REPLACE SYNONYM olvws_wms_msgtype FOR olvw_wms_msgtype
/