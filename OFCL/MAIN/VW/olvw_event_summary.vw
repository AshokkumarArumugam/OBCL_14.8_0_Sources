CREATE OR REPLACE VIEW olvw_event_summary AS
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
SELECT  a.CONTRACT_REF_NO                FCCREF
       ,b.EVENT_SEQ_NO                   LATEVNTSEQNO
       ,a.branch                         BRANCH
       ,a.product_code                   PRDCODE
       ,a.counterparty                   COUNTERPARTY
       ,a.contract_status                CONTSTATUS
       ,a.auth_status                    AUTHSTAT
       ,b.event_code                     EVNTCODE
       ,a.module_code                    MODULECODE
       ,b.value_date                     VALUEDATE
       ,b.payment_status                 PAYSTATUS
FROM OLTB_CONTRACT a, oltbs_contract_liq_summary_ud b
 WHERE a.contract_ref_no = b.contract_ref_no
	  AND b.event_seq_no = (SELECT MAX(event_seq_no) FROM oltbs_contract_liq_summary_ud 
				WHERE contract_ref_no =b.contract_ref_no)
/
CREATE OR REPLACE SYNONYM olvws_event_summary FOR olvw_event_summary
/