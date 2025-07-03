CREATE OR REPLACE FORCE VIEW olvw_wms_refrate(
				IDENTIFIER,
				OPERATION_CODE,
				BRANCH_CODE,
				UNIT_REF_NO,
				CCY,
				EFF_DATE,
				BOOK_DATE,
				REF_RATE_TYPE,
				REF_RATE,
				REF_RATE_CODE,
				REF_SPREAD,
				CR_REF_RATE,
				CR_REF_RATE_CODE,
				CR_REF_SPREAD,
				DR_REF_RATE,
				DR_REF_RATE_CODE,
				DR_REF_SPREAD,
				CR_REF_RATE_TYPE,
				DR_REF_RATE_TYPE,
				--PLC46180001 CHANGES STARTS
				REF_RATE_SIGN,
				CR_REF_RATE_SIGN,
				DR_REF_RATE_SIGN,
				PROCESS_STATUS,
				FIELD_CHANGED,
				RESET_TENOR
				--PLC46180001 CHANGES ENDS
				)
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_wms_refrate.VW
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
				'#REFRATE#',
				' ',
				BRANCH_CODE,
				UNIT_REF_NO,
				CCY,
				EFF_DATE,
				BOOK_DATE,
				REF_RATE_TYPE,
				REF_RATE,
				REF_RATE_CODE,
				REF_SPREAD,
				CR_REF_RATE,
				CR_REF_RATE_CODE,
				CR_REF_SPREAD,
				DR_REF_RATE,
				DR_REF_RATE_CODE,
				DR_REF_SPREAD,
				CR_REF_RATE_TYPE,
				DR_REF_RATE_TYPE,
				--PLC46180001 CHANGES STARTS
				REF_RATE_SIGN,
				CR_REF_RATE_SIGN,
				DR_REF_RATE_SIGN,
				PROCESS_STATUS,
				FIELD_CHANGED,
				RESET_TENOR
				--PLC46180001 CHANGES ENDS
			FROM 
				oltbs_dly_refinance_rates
/
CREATE OR REPLACE SYNONYM olvws_wms_refrate FOR olvw_wms_refrate
/