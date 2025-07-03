CREATE OR REPLACE TRIGGER OLTR_OLTM_PRODUCT
BEFORE INSERT
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
 OBCL 14.0 ITR2SFR#27359688 changes. 
 Modified By          : Vigneshram S
 Modified On          : 18-JAN-2018
 Fix Description      : 27359688 duplicate products should restrict and throw an correct message in UI 

*/

DECLARE
  p_err_code  varchar2(100);
  p_err_param varchar2(100);
  l_Count NUMBER;
BEGIN


  IF INSERTING THEN
    SELECT count(*)
      INTO l_Count
      FROM OLTM_PRODUCT
     WHERE PRODUCT_CODE = :NEW.PRODUCT_CODE;
       
    IF l_Count > 0 THEN
      Debug.pr_debug('OL', 'Duplicate product on OLTM_PRODUCT table');
      Cspks_Req_Utils.Pr_Log_Error('','','ST-VALS-502','');
    
    END IF;
  END IF;

EXCEPTION
  WHEN OTHERS THEN
    Debug.pr_debug('OL','OL in when other of product inside OLTR_OLTM_PRODUCT ---->' || SQLERRM);
END;

/