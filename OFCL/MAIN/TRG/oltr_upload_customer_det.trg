create or replace trigger oltr_upload_customer_det
/*
----------------------------------------------------------------------------------------------------
**
** File Name    :oltr_upload_customer_det.trg
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

  after update on STTM_CORE_CUSTOMER
  for each ROW
DECLARE
  l_cust_rec  oltm_upload_customer_entity%ROWTYPE;
  l_serial_no varchar2(10) := '0';
  l_ref_no    varchar2(20);
  l_err_code  VARCHAR2(20);
  l_add_rep  VARCHAR2(1);
BEGIN
  debug.pr_debug('OL', 'Inside Trigger oltr_upload_customer_det');
 
  BEGIN
	  SELECT CUST_ADDR_REPL
	  INTO l_add_rep
	  FROM sytm_bank_params;
  EXCEPTION
  WHEN OTHERS THEN
  l_add_rep  := 'Y';
  END;
  
  debug.pr_debug('OL','l_add_rep' || l_add_rep);
  debug.pr_debug('OL', ':new.auth_stat' || :new.auth_stat);
  debug.pr_debug('OL', ':new.once_auth' || :new.once_auth);
  
 if :new.auth_stat = 'A' and :new.once_auth = 'Y'  AND NVL(l_add_rep,'Y') ='Y' then
  
    BEGIN
    
      debug.pr_debug('OL',
                     'Calling olpkss_trpks.fn_get_process_refno----->');
    
      IF NOT olpkss_trpks.fn_get_process_refno(global.current_branch,
                                               'CENT',
                                               global.application_date,
                                               l_serial_no,
                                               l_ref_no,
                                               l_err_code) THEN
        debug.pr_debug('OL',
                       'Failed in olpkss_trpks.fn_get_process_refno ' ||
                       SQLERRM);
        Cspks_Req_Utils.Pr_Log_Error(:new.source_system,
                                     'OLDCUENT',
                                     'OL-UP-032',
                                     '');
      RETURN;
      END IF;
    
      debug.pr_debug('OL', 'l_serial_no = ' || l_serial_no);
      debug.pr_debug('OL', 'l_ref_no = ' || l_ref_no);
    
    END;
  
    l_cust_rec.customer_no        := :new.customer_no;
    l_cust_rec.entity             := 'CIF';
    l_cust_rec.entity_name        := 'Default Entity';
    l_cust_rec.entity_type        := 'STATIC';
    l_cust_rec.phone_no           := '';
    l_cust_rec.fax_no             := '';
    l_cust_rec.send_byfax         := 'N';
    l_cust_rec.email              := '';
    l_cust_rec.send_byemail       := 'Y';
    l_cust_rec.send_fpml          := 'N';
    l_cust_rec.title              := '';
    l_cust_rec.phone_no_country   := :new.country;
    l_cust_rec.affiliation        := '';
    l_cust_rec.cust_level_msg_gen := '';
    l_cust_rec.upload_status      := 'U';
    l_cust_rec.source_ref_no      := l_ref_no;
    l_cust_rec.source_seq_no      := 1;
    l_cust_rec.source_code        := :new.source_system;
  
    insert into oltm_upload_customer_entity
      (CUSTOMER_NO,
       ENTITY,
       ENTITY_NAME,
       ENTITY_TYPE,
       PHONE_NO,
       FAX_NO,
       SEND_BYFAX,
       EMAIL,
       SEND_BYEMAIL,
       SEND_FPML,
       TITLE,
       PHONE_NO_COUNTRY,
       AFFILIATION,
       CUST_LEVEL_MSG_GEN,
       UPLOAD_STATUS,
       SOURCE_REF_NO,
       SOURCE_SEQ_NO,
       SOURCE_CODE)
    values
      (l_cust_rec.customer_no,
       l_cust_rec.entity,
       l_cust_rec.entity_name,
       l_cust_rec.entity_type,
       l_cust_rec.phone_no,
       l_cust_rec.fax_no,
       l_cust_rec.send_byfax,
       l_cust_rec.email,
       l_cust_rec.send_byemail,
       l_cust_rec.send_fpml,
       l_cust_rec.title,
       l_cust_rec.phone_no_country,
       l_cust_rec.affiliation,
       l_cust_rec.cust_level_msg_gen,
       l_cust_rec.upload_status,
       l_cust_rec.source_ref_no,
       l_cust_rec.source_seq_no,
       l_cust_rec.source_code);
  END IF;
EXCEPTION

  WHEN others THEN
    debug.pr_debug('OL', 'Oracle Error:' || sqlcode || ':' || sqlerrm);
    Cspks_Req_Utils.Pr_Log_Error(:new.source_system,
                                 'OLDCUENT',
                                 'OL-UP-032',
                                 '');
END oltr_upload_customer_det;
/