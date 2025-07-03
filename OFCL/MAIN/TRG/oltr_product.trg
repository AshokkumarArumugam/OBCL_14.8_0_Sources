CREATE OR REPLACE TRIGGER oltr_product
AFTER UPDATE OR INSERT
ON OLTM_PRODUCT
FOR EACH ROW
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle Banking Software Product.
** Copyright ? 2011,2015  Oracle and/or its affiliates.  All rights reserved.
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
28-NOV-2016   OFCL12.2 ITR2SFR#25154503 changes. Changed elpks_static_service to copks_static_service
 Modified By          : Shishirkumar Aithal
 Modified On          : 17-Nov-2017
 Fix Description      : 26597276 duplicate products should not be allowed from multiple product processors
 Search String        : --26597276 CHANGES
 
 **  Modified By     : Sowmya Bitra
 **  Modified On     : 21-July-2023
 **  Modified Reason : Changes to replicate data to OBCLPM tables
 **  Search String   : Bug#35610618

*/

DECLARE
  --stat        elpkss_static_service.ty_static_type; --OFCL12.2 ITR2SFR#25154503 changes.
    stat        copkss_static_service.ty_static_type; --OFCL12.2 ITR2SFR#25154503 changes.
  p_err_code  varchar2(100);
  p_err_param varchar2(100);
  l_Count NUMBER; --26597276 CHANGES
BEGIN

--26597276 CHANGES START
  IF INSERTING THEN
    SELECT count(*)
      INTO l_Count
      FROM sttm_static_type
     WHERE TYPE = 'PROD'
       and TYPE_NAME = :NEW.PRODUCT_CODE;
    IF l_Count > 0 THEN
      Debug.pr_debug('OL', 'duplicate product');
      Cspks_Req_Utils.Pr_Log_Error('','','ST-VALS-502','');
      raise_application_error(-20001, 'duplicate product');
    END IF;
  END IF;
--26597276 CHANGES END

  IF :NEW.Auth_Stat = 'A' THEN
  
    stat.st_type          := 'PROD';
    stat.type_name        := :NEW.PRODUCT_CODE;
    stat.type_value       := :NEW.PRODUCT_DESCRIPTION;
    stat.RECORD_STAT      := :NEW.RECORD_STAT;
    stat.AUTH_STAT        := :NEW.AUTH_STAT;
    stat.MOD_NO           := :NEW.MOD_NO;
    stat.MAKER_ID         := :NEW.MAKER_ID;
    stat.MAKER_DT_STAMP   := :NEW.MAKER_DT_STAMP;
    stat.CHECKER_ID       := :NEW.CHECKER_ID;
    stat.CHECKER_DT_STAMP := :NEW.CHECKER_DT_STAMP;
    stat.ONCE_AUTH        := :NEW.ONCE_AUTH;
    stat.ADD_FLD_2        := :NEW.MODULE;
    IF copkss_static_service.fn_update_product(stat,
                                               p_err_code,
                                               p_err_param) THEN
      debug.pr_debug('OL','OL product trigger done...');
    ELSE
      debug.pr_debug('OL','OL product trigger failed...');
    END IF;
	
	--Bug#35610618 Changes Start
	IF olpkss_mo_replication_service.fn_populate_product(:NEW.PRODUCT_CODE,
                                              :NEW.product_description,
                                              :NEW.product_start_date,
                                              :NEW.product_end_date ,
                                              :NEW.product_group ,
                                              :NEW.module,
                                              :NEW.record_stat,
                                              :NEW.product_type,
                                              :NEW.mod_no,
                                               p_err_code,
                                               p_err_param) THEN
      debug.pr_debug('OL','OL product trigger done...');
    ELSE
      debug.pr_debug('OL','OL product trigger failed...');
    END IF;
	--Bug#35610618 Changes End
  
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    debug.pr_debug('OL','OL in whenother of product inside ---->' || SQLERRM);
END;
/