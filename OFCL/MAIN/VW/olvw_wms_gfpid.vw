CREATE OR REPLACE FORCE VIEW olvw_wms_gfpid (
				IDENTIFIER,
				OPERATION_CODE,	
				CUSTOMER_NO,
				SEQ_NO,
				TEXT_CATEGORY,
				TEXT_VALUE,
						--PLC46180001 CHANGES STARTS
				VERSION_NO,
				TEXT_DESC
						--PLC46180001 CHANGES ENDS
				)
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_wms_gfpid.VW
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
06-Feb-2004	SFR PLC44070029	New unit in 4.4 taken from 4.3 baseline
01-JUN-2005	PLC46180001 ADDED COLUMNS
*/
			SELECT
				'#GFPID#',
				' ',
				CUSTOMER_NO,
				SEQ_NO,
				TEXT_CATEGORY,
				TEXT_VALUE,
						--PLC46180001 CHANGES STARTS
				VERSION_NO,
				TEXT_DESC
						--PLC46180001 CHANGES ENDS
			FROM
				oltms_udef_text_values
			WHERE
				SEQ_NO=2
			AND	TEXT_CATEGORY='C'
/
CREATE OR REPLACE SYNONYM olvws_wms_gfpid FOR olvw_wms_gfpid
/