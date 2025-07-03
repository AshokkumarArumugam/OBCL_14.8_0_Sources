CREATE OR REPLACE force VIEW olvw_cust_group	(
					CUST_TAX_GROUP
					)
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_cust_group.VW
**
** Module       : INTERFACES
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/* Change History
10-JUN-2004 PLC46050002 Retro of FCC 4.0.5 SPAIN-PORTUGAL CITIPLC PLC40502008.
			New View to show all the valid Customer Tax Groups.
*/
SELECT  CUST_GROUP
      FROM  OLTM_CUST_GROUP
      WHERE  CUST_GROUP_TYPE  =  'T'
      AND  RECORD_STAT  =  'O'
      AND  AUTH_STAT	=	'A'
      UNION
      SELECT	'ALL'
      FROM	DUAL
/
CREATE OR REPLACE SYNONYM olvws_cust_group FOR olvw_cust_group
/