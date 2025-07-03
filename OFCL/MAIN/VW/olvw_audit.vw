CREATE OR REPLACE VIEW olvw_audit AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle Banking Software Product.
** Copyright ©  2012 - 2013  Oracle and/or its affiliates.  All rights reserved.
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
SELECT
 CONTRACT_REF_NO                 FCCREF
,EVENT_SEQ_NO                    ESN
,REVERSED_EVENT_SEQ_NO           REVESN
,EVENT_DATE                      EVNTDT
,EVENT_CODE                      EVNTCODE
,MAKER_DT_STAMP                  MAKERSTAMP
,MODULE                          MODULE
,CHECKER_DT_STAMP                CHECKERSTAMP
,NEW_VERSION_INDICATOR           NEWVERIND
,(SELECT '' FROM DUAL)           REVR_MAKERSTAMP
,(SELECT '' FROM DUAL)           REVR_MAKERID
,(SELECT '' FROM DUAL)           REVR_CHECKERID
,CHECKER_ID                      CHECKERID
,MAKER_ID                        MAKERID
,(SELECT '' FROM DUAL)           REVR_CHECKERSTAMP
,CONTRACT_STATUS                 CONTSTAT
,AUTH_STATUS                     AUTHSTAT
FROM
oltbs_contract_event_log
/
CREATE OR REPLACE SYNONYM olvws_audit FOR olvw_audit
/