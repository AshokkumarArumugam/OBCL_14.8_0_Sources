CREATE OR REPLACE force VIEW olvw_static_maintenance 
						( 
						gaap_indicator, 
						description
						) 
AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_static_maintenance.VW
**
** Module      	: Core
**
	This source is part of the Oracle Flexcube Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
		SELECT	field_name	gaap_indicator,
				field_desc	description
		FROM		oltms_static_maintenance
		WHERE		maintenance_type	=	'GAAP'
		AND 		record_stat 	=	'O'
		AND 		auth_stat 		= 	'A'
		UNION
		SELECT	'AL',
				'All Books'
		FROM 		DUAL
/
CREATE OR REPLACE SYNONYM olvws_static_maintenance FOR olvw_static_maintenance
/