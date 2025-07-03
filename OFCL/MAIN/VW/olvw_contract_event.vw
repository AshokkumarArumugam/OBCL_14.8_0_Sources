CREATE OR REPLACE VIEW olvw_contract_event AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle Banking Software Product.
** Copyright © 2012 - 2013 Oracle and/or its affiliates.  All rights reserved.
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

**Changed By         : Narendra Dhaker
**Date               : 26-May-2021
**Change Description : Product Access restriction
**Search String      : Product Access restriction

**Changed By         : Kavitha Asokan
**Date               : 17-Feb-2023
**Change Description : To display only active and authorized contracts in summary contract ref no LOV. 
**Search String      : Bug#35086907
------------------------------------------------------------------------------------------
*/
	SELECT CONTRACT_REF_NO  FCCREF,
	(SELECT '' FROM DUAL)   CURRPMT,
	(SELECT '' FROM DUAL)   TOTALPMTS,
	MODULE_CODE             MODULECODE,
	COUNTERPARTY            COUNTERPARTY,
	CONTRACT_CCY            CONTCCY,
	USER_DEFINED_STATUS     USERDEFSTAT,
	LATEST_EVENT_SEQ_NO     LATEVNTSEQNO,
	CONTRACT_STATUS         CONTSTATUS,
	PRODUCT_TYPE            PRODTYPE,
	LATEST_VERSION_NO       LATVERNO,
	(SELECT '' FROM DUAL) DISCONTSTATUS,
	AUTH_STATUS AUTHSTAT,
	BRANCH      BRANCH,
	(SELECT '' FROM DUAL) SUBSYSTEMSTAT,
	(SELECT '' FROM DUAL) AMTCHECK
FROM oltbs_contract a
--Product Access restriction - Start
WHERE exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = a.product_code --OBCL_14.8_CE_Length_Changes
      AND USER_ID = global.user_id)
--Product Access restriction - End
--Bug#35086907 changes starts
	  AND CONTRACT_STATUS /*= */ IN ( 'A', 'L')  
      AND ((a.AUTH_STATUS = 'A') OR ( a.AUTH_STATUS <> 'A' 
      AND EXISTS (SELECT 1 FROM OLTBS_EVENT E WHERE E.EVENT_CODE = a.CURR_EVENT_CODE 
      AND E.MODULE = a.MODULE_CODE AND USER_DEFINED = 'Y'))) 
--Bug#35086907 changes ends
/
CREATE OR REPLACE SYNONYM olvws_contract_event FOR olvw_contract_event
/