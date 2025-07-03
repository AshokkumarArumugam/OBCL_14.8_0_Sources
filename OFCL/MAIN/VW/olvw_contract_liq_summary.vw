CREATE OR REPLACE VIEW olvw_contract_liq_summary AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle Banking Software Product.
** Copyright © 2012 - 2013  Oracle and/or its affiliates.  All rights reserved.
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
EVENT_CODE             EVNTCODE
,PAYMENT_REMARKS       PAYREMARK
,VALUE_DATE            VALUEDATE
,PAYMENT_STATUS        PAYSTATUS
,CONTRACT_REF_NO       FCCREF
,EVENT_SEQ_NO          ESN
,(SELECT '' FROM DUAL) EVNTDESC
FROM
oltbs_contract_liq_summary_ud
/
CREATE OR REPLACE SYNONYM olvws_contract_liq_summary FOR olvw_contract_liq_summary
/