CREATE OR REPLACE VIEW givw_interface_pkey_master AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2004 - 2010  Oracle and/or its affiliates.  All rights reserved.
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
By         : S.ChandraMohan
** Change Description : 9NT1428: ITR1 - SFR#110
** Search String      : 9NT1428 - ITR1 - SFR#110


**  Modified By      : Srinivasan Perumal
**  Modified On      : 18-Jul-2019
**  Modified Reason  : Issue: When User upload multiple incoming file processing(Interface code:FP), 
				           Consider the scenario, When ever there is override exit further file processing based on GITM_INTERFACE_DEFINITION.ON_OVERRIDE='R',
					       where R-Reject further processing. Assuue there are 5 incoming files processing, out of 5, 3rd file get errored, 
					       so 4 and 5th file will not further process as per the maintenenace. so system have 3 entries in GITB_FILE_MASTER and have always single record from GITB_FILE_LOG.
					       GIDFILOG shows all the 3 record as error, where in only the 3 record is errored.  
**  Search String    : FCUBS14.2.->CNSL->LAND_BANK_OF_TAIWAN>BUG#29893354

**  Modified By      : Chaitanya Pundlik
**  Modified On      : 04-Sep-2024
**  Modified Reason  : Issue: records_processed/records_errored are shown from GITB_FILE_LOG 
                              in case of incoming interface.It should be shown from GITB_FILE_MASTER.  
**  Search String    : Bug_37028494 
----------------------------------------------------------------------------------------------------*/
SELECT
FL.BRANCH_CODE  ,
FL.INTERFACE_CODE	,
FL.EXTERNAL_SYSTEM,
--FL.STATUS, -- FCUBS14.2.->CNSL->LAND_BANK_OF_TAIWAN>BUG#29893354 commented
decode(NVL(FM.UPLOAD_STATUS,FL.STATUS),'P',NVL(FM.UPLOAD_STATUS,FL.STATUS),NVL(FL.STATUS,FM.UPLOAD_STATUS))	as Status,-- FCUBS14.2.->CNSL->LAND_BANK_OF_TAIWAN>BUG#29893354 added
FL.FILE_NAME	,
FL.USER_ID	,
FM.PROCESS_CODE	,
FM.PROCESS_REF_NO	,
FL.START_DATE_STAMP	,
FL.END_DATE_STAMP	,
FL.UPLOAD_DATE	,
--Bug_37028494 changes starts
--FL.RECORDS_PROCESSED	,
--FL.RECORDS_ERRORED	,
  FM.RECORDS_PROCESSED	,
  FM.RECORDS_ERRORED	,
--Bug_37028494 changes ends 
-- FCUBS14.2.->CNSL->LAND_BANK_OF_TAIWAN>BUG#29893354 start
--FL.ERROR_CODE	,
--FL.ERROR_PARAMS	,
decode(NVL(FM.UPLOAD_STATUS,FL.STATUS),'E',Nvl(FL.ERROR_CODE,FM.ERROR_CODE),Nvl(FM.ERROR_CODE,FL.ERROR_CODE)) as ERROR_CODE,
decode(NVL(FM.UPLOAD_STATUS,FL.STATUS),'E',Nvl(FL.ERROR_PARAMS,FM.ERROR_PARAMS),Nvl(FM.ERROR_PARAMS,FL.ERROR_PARAMS)) as ERROR_PARAMS,
-- FCUBS14.2.->CNSL->LAND_BANK_OF_TAIWAN>BUG#29893354 end
FL.CHECKER_DT_STAMP	,
FL.ONCE_AUTH	,
FL.MOD_NO	,
FL.RECORD_STAT	,
FL.AUTH_STAT	,
FM.PHY_FILE_NAME	,
FL.ERR_FILE_NAME	,
K.PKEY1	,
K.PKEY2	,
K.PKEY3	,
K.PKEY4	,
K.PKEY5
FROM GITB_FILE_LOG FL, GITM_INTERFACE_PKEY K, GITB_FILE_MASTER FM
WHERE FL.INTERFACE_CODE=K.INTERFACE_CODE AND FM.INTERFACE_CODE=FL.INTERFACE_CODE AND FL.PROCESS_REF_NO=FM.PROCESS_REF_NO AND FL.FILE_NAME = FM.FILE_NAME
AND FL.PROCESS_CODE = FM.PROCESS_CODE--9NT1428 - ITR2 - SFR#110
--#15901330
union
SELECT
FL.BRANCH_CODE  ,
FL.INTERFACE_CODE	,
FL.EXTERNAL_SYSTEM,
FL.STATUS	,
FL.FILE_NAME	,
FL.USER_ID	,
FL.PROCESS_CODE	,
FL.PROCESS_REF_NO	,
FL.START_DATE_STAMP	,
FL.END_DATE_STAMP	,
FL.UPLOAD_DATE	,
FL.RECORDS_PROCESSED	,
FL.RECORDS_ERRORED	,
FL.ERROR_CODE	,
FL.ERROR_PARAMS	,
FL.CHECKER_DT_STAMP	,
FL.ONCE_AUTH	,
FL.MOD_NO	,
FL.RECORD_STAT	,
FL.AUTH_STAT	,
FL.PHY_FILE_NAME	,
FL.ERR_FILE_NAME	,
'',
'',
'',
'',
''
FROM GITB_FILE_LOG FL, GITM_INTERFACE_DEFINITION K
WHERE FL.INTERFACE_CODE=K.INTERFACE_CODE AND K.INTERFACE_TYPE = 'O'
/

CREATE OR REPLACE SYNONYM givws_interface_pkey_master FOR givw_interface_pkey_master
/
