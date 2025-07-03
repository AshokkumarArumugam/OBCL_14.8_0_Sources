CREATE OR REPLACE TRIGGER oltr_upload_customer_entity
/*
----------------------------------------------------------------------------------------------------
**
  ** File Name    :oltr_upload_customer_entity.trg
  **
  ** Module       :OL
  **
  This source is part of the Oracle Flexcube Corporate Lending  Software Product.
Copyright © 2016 , Oracle and/or its affiliates.  All rights reserved.
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission
of Oracle and/or its affiliates.

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East),
Mumbai - 400 063, India.

----------------------------------------------------------------------------------------------------
*/
/* CHANGE HISTORY
*/

    AFTER INSERT ON OLTM_UPLOAD_CUSTOMER_ENTITY
  FOR EACH ROW

BEGIN
  INSERT INTO oltb_upload_master_st
    (maintenance_seq_no,
     branch_code,
     source_code,
     maintenance_type,
     upload_status,
     upload_initiation_date,
     source_seq_no)
  VALUES
    (:new.source_ref_no,
     global.current_branch,
     :new.source_code,
     'OLDCUENT',
     'U',
     trunc(fn_ol_sysdate),
     :new.source_seq_no);

EXCEPTION

  WHEN others THEN
    debug.pr_debug('OL', 'Oracle Error:' || sqlcode || ':' || sqlerrm);
    RAISE_APPLICATION_ERROR(-20001,
                            'Error while updating oltb_upload_master_st');
END oltr_upload_customer_entity;
/