CREATE OR REPLACE FORCE VIEW CYVW_FWDRATE_FINAL_RATE AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2019 - 2020  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
** 
** 
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
changed by : shashanka k
Changed on :  05-sep-2013
Change tag   : 9NT1587#1202#ITR2#17414179
reason :  "--FCUBS 10.5 STR2 SFR-701 Ends " is causing an issue when hudson compiled this view.So moving it above the slash
**
**  Changed By           : Sreekanth K
**  Changed on           : 01-Jul-2023
**  Change Description   : Moved from OBTR to 14.8 common core
**  Search String        : NA
------------------------------------------------------------------------------------------*/
SELECT 
	DISTINCT 
	(MID_RATE + PREMIUM_DISCOUNT_POINTS) FIXED_RATE, 
	A.BRANCH, 
	B.CCY1, 
	B.CCY2,
	A.PERIOD_CODE 
	FROM   CYTMS_FWDRATE_DETAILS A, CYTMS_RATES B 
	WHERE  A.BRANCH = B.BRANCH_CODE
	AND B.CCY1 =  A.CURRENCY1
	AND B.CCY2 =  A.CURRENCY2
       and B.RATE_TYPE = 'STANDARD'
	ORDER BY PERIOD_CODE,BRANCH,CCY1,CCY2
/
CREATE OR REPLACE SYNONYM CYVWS_FWDRATE_FINAL_RATE FOR CYVW_FWDRATE_FINAL_RATE
/
