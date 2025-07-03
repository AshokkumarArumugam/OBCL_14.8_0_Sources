CREATE OR REPLACE TRIGGER OLTR_FLOAT_RATE_MASTER_CHG
/*------------------------------------------------------------------------------------------
  ** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
  ** Copyright © 1997 - 2021  Oracle and/or its affiliates.  All rights reserved.
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
  **************************************************************************************************
  **  Created by        : Abhinav Kumar
  **  Date of creation  : 02-Dec-2024
  **  Description       : OLTR_FLOAT_RATE_MASTER_CHG.TRG on Table CFZM_FLOAT_RATE_MASTER
  **
  **
  **  Modified By          : 
  **  Modified On          : 
  **  Modified Description : 
  **  Search String        : 
  **************************************************************************************************/

  AFTER INSERT OR UPDATE OR DELETE ON CFZM_FLOAT_RATE_MASTER
  FOR EACH ROW

DECLARE
  l_count NUMBER := 0;
BEGIN
  IF INSERTING THEN
    INSERT INTO OLZM_FLOAT_RATE_MASTER
      (RATE_CODE,
       CCY_CODE,
       AMOUNT_SLAB,
       EFFECTIVE_DATE,
       RATE_RECORD_STATUS,
       PREV_AMOUNT_SLAB,
       NEXT_EFFECTIVE_DATE,
       BRANCH_CODE,
       BORROW_LEND_IND)
    VALUES
      (:NEW.RATE_CODE,
       :NEW.CCY_CODE,
       :NEW.AMOUNT_SLAB,
       :NEW.EFFECTIVE_DATE,
       NVL(:NEW.RATE_RECORD_STATUS, 'C'),
       :NEW.PREV_AMOUNT_SLAB,
       :NEW.NEXT_EFFECTIVE_DATE,
       :NEW.BRANCH_CODE,
       :NEW.BORROW_LEND_IND);
  
  ELSIF UPDATING THEN
  
    IF NOT (:OLD.RATE_RECORD_STATUS = 'C' AND :NEW.RATE_RECORD_STATUS = 'A') THEN
      l_count := 0;
      BEGIN
        SELECT count(1)
          INTO l_count
          FROM OLZM_FLOAT_RATE_MASTER
         WHERE RATE_CODE = :OLD.RATE_CODE
           AND CCY_CODE = :OLD.CCY_CODE
           AND AMOUNT_SLAB = :OLD.AMOUNT_SLAB
           AND EFFECTIVE_DATE = :OLD.EFFECTIVE_DATE
           AND BRANCH_CODE = :OLD.BRANCH_CODE
           AND BORROW_LEND_IND = :OLD.BORROW_LEND_IND;
      EXCEPTION
        WHEN OTHERS THEN
          l_count := 0;
      END;
      IF l_count <> 0 THEN
        UPDATE OLZM_FLOAT_RATE_MASTER
           SET RATE_CODE      = :NEW.RATE_CODE,
               CCY_CODE       = :NEW.CCY_CODE,
               AMOUNT_SLAB    = :NEW.AMOUNT_SLAB,
               EFFECTIVE_DATE = :NEW.EFFECTIVE_DATE,
               --RATE_RECORD_STATUS  = :NEW.RATE_RECORD_STATUS, --Not Required
               PREV_AMOUNT_SLAB    = :NEW.PREV_AMOUNT_SLAB,
               NEXT_EFFECTIVE_DATE = :NEW.NEXT_EFFECTIVE_DATE,
               BRANCH_CODE         = :NEW.BRANCH_CODE,
               BORROW_LEND_IND     = :NEW.BORROW_LEND_IND
         WHERE RATE_CODE = :OLD.RATE_CODE
           AND CCY_CODE = :OLD.CCY_CODE
           AND AMOUNT_SLAB = :OLD.AMOUNT_SLAB
           AND EFFECTIVE_DATE = :OLD.EFFECTIVE_DATE
           AND BRANCH_CODE = :OLD.BRANCH_CODE
           AND BORROW_LEND_IND = :OLD.BORROW_LEND_IND;
      ELSE
        INSERT INTO OLZM_FLOAT_RATE_MASTER
          (RATE_CODE,
           CCY_CODE,
           AMOUNT_SLAB,
           EFFECTIVE_DATE,
           RATE_RECORD_STATUS,
           PREV_AMOUNT_SLAB,
           NEXT_EFFECTIVE_DATE,
           BRANCH_CODE,
           BORROW_LEND_IND)
        VALUES
          (:NEW.RATE_CODE,
           :NEW.CCY_CODE,
           :NEW.AMOUNT_SLAB,
           :NEW.EFFECTIVE_DATE,
           NVL(:NEW.RATE_RECORD_STATUS, 'C'),
           :NEW.PREV_AMOUNT_SLAB,
           :NEW.NEXT_EFFECTIVE_DATE,
           :NEW.BRANCH_CODE,
           :NEW.BORROW_LEND_IND);
      END IF;
    END IF;
  
  ELSIF DELETING THEN
    DELETE FROM OLZM_FLOAT_RATE_MASTER
     WHERE RATE_CODE = :OLD.RATE_CODE
       AND CCY_CODE = :OLD.CCY_CODE
       AND AMOUNT_SLAB = :OLD.AMOUNT_SLAB
       AND EFFECTIVE_DATE = :OLD.EFFECTIVE_DATE
       AND BRANCH_CODE = :OLD.BRANCH_CODE
       AND BORROW_LEND_IND = :OLD.BORROW_LEND_IND;
    Debug.Pr_Debug('OL', '#delete l_Count ..' || Sql%rowcount);
  END IF;

END;
/
