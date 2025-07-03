CREATE OR REPLACE VIEW olvw_cont_man_bill_gen_summary AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_olduplod_utils.sql
  **
  ** Module     : Oracle Lending
  **
  ** This source is part of the Oracle FLEXCUBE Software Product.
  ** Copyright (R) 2023 , Oracle and/or its affiliates.  All rights reserved
  **
  **
  ** No part of this work may be reproduced, stored in a retrieval system, adopted
  ** or transmitted in any form or by any means, electronic, mechanical,
  ** photographic, graphic, optic recording or otherwise, translated in any
  ** language or computer language, without the prior written permission of
  ** Oracle and/or its affiliates.
  **
  ** Oracle Financial Services Software Limited.
  ** Oracle Park, Off Western Express Highway,
  ** Goregaon (East),
  ** Mumbai - 400 063, India
  ** India
  -------------------------------------------------------------------------------------------------------
  */
SELECT w1.contract_ref_no,
       w1.billing_esn,
       l.event_code,
       l.auth_status,
       l.contract_status
  FROM oltbs_manual_billing_master w1, oltbs_contract_event_log l
 WHERE w1.contract_ref_no = l.contract_ref_no
   AND w1.billing_esn = l.event_seq_no
   AND w1.billing_esn = (SELECT MAX(w2.billing_esn)
                           FROM oltbs_manual_billing_master w2
                          WHERE w2.contract_ref_no = w1.contract_ref_no                         
                         )
 ORDER BY contract_ref_no, billing_esn
/
CREATE OR REPLACE SYNONYM olvws_cont_man_bill_gen_summary FOR olvw_cont_man_bill_gen_summary
/