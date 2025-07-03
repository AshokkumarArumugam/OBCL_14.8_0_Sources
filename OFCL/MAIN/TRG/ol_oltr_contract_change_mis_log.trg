CREATE OR REPLACE TRIGGER "OL_OLTR_CONTRACT_CHANGE_MIS_LOG"
/*------------------------------------------------------------------------------------------
  **
  ** File Name  : ol_oltr_contract_change_mis_log.trg
  **
  ** Module  : OL
  **
  ** This source is part of the Oracle Banking Corporate Lending  Software Product.
  ** Copyright © 2007 - 2018  Oracle and/or its affiliates.  All rights reserved.
  ** No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted
  ** in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
  ** or otherwise, translated in any language or computer language, without the prior written permission
  ** of Oracle and/or its affiliates.
  **
  ** Oracle Financial Services Software Limited.
  ** Oracle Park, Off Western Express Highway,
  ** Goregaon (East),
  ** Mumbai - 400 063, India.
  **------------------------------------------------------------------------------------------
  */
  /*
  ** CHANGE HISTORY
  **
  **  SFR Number         :
  **  Changed By         :
  **  Change Description :
  **
  ** Changed By          : Abhinav Kumar
  ** Created On          : 30-Apr-2024
  ** Change Description  : Code added to insert into OLTB_CONTRACT_CHANGE_MIS_LOG for
                           any change in MIS screen while amendment.
  ** Search string       : Bug#36511597
  ----------------------------------------------------------------------------------------------------*/
  AFTER UPDATE ON "OLZB_CLASS_MAPPING"
  FOR EACH ROW
  when (((NVL(old.comp_mis_1, '?') <> NVL(new.comp_mis_1, '?')) OR
        (NVL(old.comp_mis_2, '?') <> NVL(new.comp_mis_2, '?')) OR
        (NVL(old.comp_mis_3, '?') <> NVL(new.comp_mis_3, '?')) OR
        (NVL(old.comp_mis_4, '?') <> NVL(new.comp_mis_4, '?')) OR
        (NVL(old.comp_mis_5, '?') <> NVL(new.comp_mis_5, '?')) OR
        (NVL(old.comp_mis_6, '?') <> NVL(new.comp_mis_6, '?')) OR
        (NVL(old.comp_mis_7, '?') <> NVL(new.comp_mis_7, '?')) OR
        (NVL(old.comp_mis_8, '?') <> NVL(new.comp_mis_8, '?')) OR
        (NVL(old.comp_mis_9, '?') <> NVL(new.comp_mis_9, '?')) OR
        (NVL(old.comp_mis_10, '?') <> NVL(new.comp_mis_10, '?')) OR
        (NVL(old.txn_mis_1, '?') <> NVL(new.txn_mis_1, '?')) OR
        (NVL(old.txn_mis_2, '?') <> NVL(new.txn_mis_2, '?')) OR
        (NVL(old.txn_mis_3, '?') <> NVL(new.txn_mis_3, '?')) OR
        (NVL(old.txn_mis_4, '?') <> NVL(new.txn_mis_4, '?')) OR
        (NVL(old.txn_mis_5, '?') <> NVL(new.txn_mis_5, '?')) OR
        (NVL(old.txn_mis_6, '?') <> NVL(new.txn_mis_6, '?')) OR
        (NVL(old.txn_mis_7, '?') <> NVL(new.txn_mis_7, '?')) OR
        (NVL(old.txn_mis_8, '?') <> NVL(new.txn_mis_8, '?')) OR
        (NVL(old.txn_mis_9, '?') <> NVL(new.txn_mis_9, '?')) OR
        (NVL(old.txn_mis_10, '?') <> NVL(new.txn_mis_10, '?')) OR
        (NVL(old.fund_mis_1, '?') <> NVL(new.fund_mis_1, '?')) OR
        (NVL(old.fund_mis_2, '?') <> NVL(new.fund_mis_2, '?')) OR
        (NVL(old.fund_mis_3, '?') <> NVL(new.fund_mis_3, '?')) OR
        (NVL(old.fund_mis_4, '?') <> NVL(new.fund_mis_4, '?')) OR
        (NVL(old.fund_mis_5, '?') <> NVL(new.fund_mis_5, '?')) OR
        (NVL(old.fund_mis_6, '?') <> NVL(new.fund_mis_6, '?')) OR
        (NVL(old.fund_mis_7, '?') <> NVL(new.fund_mis_7, '?')) OR
        (NVL(old.fund_mis_8, '?') <> NVL(new.fund_mis_8, '?')) OR
        (NVL(old.fund_mis_9, '?') <> NVL(new.fund_mis_9, '?')) OR
        (NVL(old.fund_mis_10, '?') <> NVL(new.fund_mis_10, '?'))))
DECLARE
  l_auth_status  VARCHAR2(1) := 'N';
  l_count        NUMBER := 0;
  l_mis_type     GLTMS_MIS_CLASS.MIS_TYPE%TYPE;
  l_class_num    GLTMS_MIS_CLASS.CLASS_NUM%TYPE;
  l_old_mis_code OLZB_CLASS_MAPPING.COMP_MIS_1%TYPE;
  l_new_mis_code OLZB_CLASS_MAPPING.COMP_MIS_1%TYPE;

  FUNCTION fn_update_change_log(p_mis_type     IN GLTMS_MIS_CLASS.MIS_TYPE%TYPE,
                                p_class_num    IN GLTMS_MIS_CLASS.CLASS_NUM%TYPE,
                                p_old_mis_code IN OLZB_CLASS_MAPPING.COMP_MIS_1%TYPE,
                                p_new_mis_code IN OLZB_CLASS_MAPPING.COMP_MIS_1%TYPE)
    RETURN BOOLEAN IS
    l_mis_class GLTMS_MIS_CLASS.MIS_CLASS%TYPE;
  BEGIN

    debug.pr_debug('OL',
                   'p_mis_type is :' || p_mis_type || ' p_class_num is :' ||
                   p_class_num || 'p_old_mis_code is :' || p_old_mis_code ||
                   ' p_new_mis_code is :' || p_new_mis_code);

        BEGIN
          l_mis_class := sypks_utils.Fn_Get_Mis_Class_FRC(p_mis_type, p_class_num).mis_class;
        EXCEPTION
          WHEN OTHERS THEN
            debug.pr_debug('OL', 'In Others of fn_update_change_log. p_mis_type is :' ||
                            p_mis_type || ' p_class_num is :' || p_class_num);
            debug.pr_debug('OL', 'Error while getting l_mis_class...' || SQLERRM);
        END;

       BEGIN
         INSERT INTO oltb_contract_change_mis_log
         VALUES
           (:old.branch_code,
            :old.unit_ref_no,
            l_mis_class,
            global.application_date,
            nvl(p_old_mis_code, 'UNDEFINED'),
            nvl(p_new_mis_code, 'UNDEFINED'));
       EXCEPTION
         WHEN dup_val_on_index THEN
           UPDATE oltb_contract_change_mis_log
              SET old_mis_code = p_old_mis_code,
                  new_mis_code = p_new_mis_code
            WHERE branch = :old.branch_code
              AND reference_no = :old.unit_ref_no
              AND mis_class = l_mis_class
              AND txn_date = global.application_date;
         WHEN OTHERS THEN
           debug.pr_debug('OL', 'UPDATE of MITB_CONTRACT_CHANGE_LOG FAILED IN LOGGING l_mis_class is :' ||
                           l_mis_class || ' reference num is :' || :old.unit_ref_no);
           RETURN false;
       END;

    RETURN TRUE;
  END fn_update_change_log;

BEGIN
  debug.pr_debug('OL',
                 'TRG_OL_CHANGE_MIS_LOG. ref_no: ' || :old.unit_ref_no ||
                 ' branch :' || :old.branch_code || 'unit type :' ||
                 :old.unit_type);
        
		BEGIN
			SELECT 1
			  INTO l_count
			  FROM oltbs_contract_event_log
			 WHERE contract_ref_no = :old.unit_ref_no
               AND auth_status = 'A'
			   AND ROWNUM = 1;
        EXCEPTION
			WHEN OTHERS
			THEN
				Debug.Pr_Debug('OL', 'In WOT of oltbs_contract_event_log: :'||SQLERRM);
				l_count := 0;
		END;
        debug.pr_debug('OL','comes here l_count is '||l_count);

        IF l_count > 0 THEN
          l_auth_status :='Y';
        END IF;

  debug.pr_debug('OL', 'l_auth_status is ' || l_auth_status);
  IF l_auth_status = 'Y' THEN

    IF (NVL(:old.comp_mis_1, '?') <> NVL(:new.comp_mis_1, '?')) THEN
      l_mis_type     := 'O';
      l_class_num    := 1;
      l_Old_mis_code := :old.comp_mis_1;
      l_new_mis_code := :new.comp_mis_1;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.comp_mis_2, '?') <> NVL(:new.comp_mis_2, '?')) THEN
      l_mis_type     := 'O';
      l_class_num    := 2;
      l_Old_mis_code := :old.comp_mis_2;
      l_new_mis_code := :new.comp_mis_2;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.comp_mis_3, '?') <> NVL(:new.comp_mis_3, '?')) THEN
      l_mis_type     := 'O';
      l_class_num    := 3;
      l_Old_mis_code := :old.comp_mis_3;
      l_new_mis_code := :new.comp_mis_3;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.comp_mis_4, '?') <> NVL(:new.comp_mis_4, '?')) THEN
      l_mis_type     := 'O';
      l_class_num    := 4;
      l_Old_mis_code := :old.comp_mis_4;
      l_new_mis_code := :new.comp_mis_4;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.comp_mis_5, '?') <> NVL(:new.comp_mis_5, '?')) THEN
      l_mis_type     := 'O';
      l_class_num    := 5;
      l_Old_mis_code := :old.comp_mis_5;
      l_new_mis_code := :new.comp_mis_5;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.comp_mis_6, '?') <> NVL(:new.comp_mis_6, '?')) THEN
      l_mis_type     := 'O';
      l_class_num    := 6;
      l_Old_mis_code := :old.comp_mis_6;
      l_new_mis_code := :new.comp_mis_6;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.comp_mis_7, '?') <> NVL(:new.comp_mis_7, '?')) THEN
      l_mis_type     := 'O';
      l_class_num    := 7;
      l_Old_mis_code := :old.comp_mis_7;
      l_new_mis_code := :new.comp_mis_7;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.comp_mis_8, '?') <> NVL(:new.comp_mis_8, '?')) THEN
      l_mis_type     := 'O';
      l_class_num    := 8;
      l_Old_mis_code := :old.comp_mis_8;
      l_new_mis_code := :new.comp_mis_8;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.comp_mis_9, '?') <> NVL(:new.comp_mis_9, '?')) THEN
      l_mis_type     := 'O';
      l_class_num    := 9;
      l_Old_mis_code := :old.comp_mis_9;
      l_new_mis_code := :new.comp_mis_9;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.comp_mis_10, '?') <> NVL(:new.comp_mis_10, '?')) THEN
      l_mis_type     := 'O';
      l_class_num    := 10;
      l_Old_mis_code := :old.comp_mis_10;
      l_new_mis_code := :new.comp_mis_10;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.txn_mis_1, '?') <> NVL(:new.txn_mis_1, '?')) THEN
      l_mis_type     := 'T';
      l_class_num    := 1;
      l_Old_mis_code := :old.txn_mis_1;
      l_new_mis_code := :new.txn_mis_1;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.txn_mis_2, '?') <> NVL(:new.txn_mis_2, '?')) THEN
      l_mis_type     := 'T';
      l_class_num    := 2;
      l_Old_mis_code := :old.txn_mis_2;
      l_new_mis_code := :new.txn_mis_2;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.txn_mis_3, '?') <> NVL(:new.txn_mis_3, '?')) THEN
      l_mis_type     := 'T';
      l_class_num    := 3;
      l_Old_mis_code := :old.txn_mis_3;
      l_new_mis_code := :new.txn_mis_3;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.txn_mis_4, '?') <> NVL(:new.txn_mis_4, '?')) THEN
      l_mis_type     := 'T';
      l_class_num    := 4;
      l_Old_mis_code := :old.txn_mis_4;
      l_new_mis_code := :new.txn_mis_4;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.txn_mis_5, '?') <> NVL(:new.txn_mis_5, '?')) THEN
      l_mis_type     := 'T';
      l_class_num    := 5;
      l_Old_mis_code := :old.txn_mis_5;
      l_new_mis_code := :new.txn_mis_5;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.txn_mis_6, '?') <> NVL(:new.txn_mis_6, '?')) THEN
      l_mis_type     := 'T';
      l_class_num    := 6;
      l_Old_mis_code := :old.txn_mis_6;
      l_new_mis_code := :new.txn_mis_6;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.txn_mis_7, '?') <> NVL(:new.txn_mis_7, '?')) THEN
      l_mis_type     := 'T';
      l_class_num    := 7;
      l_Old_mis_code := :old.txn_mis_7;
      l_new_mis_code := :new.txn_mis_7;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.txn_mis_8, '?') <> NVL(:new.txn_mis_8, '?')) THEN
      l_mis_type     := 'T';
      l_class_num    := 8;
      l_Old_mis_code := :old.txn_mis_8;
      l_new_mis_code := :new.txn_mis_8;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.txn_mis_9, '?') <> NVL(:new.txn_mis_9, '?')) THEN
      l_mis_type     := 'T';
      l_class_num    := 9;
      l_Old_mis_code := :old.txn_mis_9;
      l_new_mis_code := :new.txn_mis_9;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.txn_mis_10, '?') <> NVL(:new.txn_mis_10, '?')) THEN
      l_mis_type     := 'T';
      l_class_num    := 10;
      l_Old_mis_code := :old.txn_mis_10;
      l_new_mis_code := :new.txn_mis_10;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.fund_mis_1, '?') <> NVL(:new.fund_mis_1, '?')) THEN
      l_mis_type     := 'F';
      l_class_num    := 1;
      l_Old_mis_code := :old.fund_mis_1;
      l_new_mis_code := :new.fund_mis_1;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.fund_mis_2, '?') <> NVL(:new.fund_mis_2, '?')) THEN
      l_mis_type     := 'F';
      l_class_num    := 2;
      l_Old_mis_code := :old.fund_mis_2;
      l_new_mis_code := :new.fund_mis_2;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);

      END IF;
    END IF;

    IF (NVL(:old.fund_mis_3, '?') <> NVL(:new.fund_mis_3, '?')) THEN
      l_mis_type     := 'F';
      l_class_num    := 3;
      l_Old_mis_code := :old.fund_mis_3;
      l_new_mis_code := :new.fund_mis_3;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.fund_mis_4, '?') <> NVL(:new.fund_mis_4, '?')) THEN
      l_mis_type     := 'F';
      l_class_num    := 4;
      l_Old_mis_code := :old.fund_mis_4;
      l_new_mis_code := :new.fund_mis_4;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.fund_mis_5, '?') <> NVL(:new.fund_mis_5, '?')) THEN
      l_mis_type     := 'F';
      l_class_num    := 5;
      l_Old_mis_code := :old.fund_mis_5;
      l_new_mis_code := :new.fund_mis_5;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.fund_mis_6, '?') <> NVL(:new.fund_mis_6, '?')) THEN
      l_mis_type     := 'F';
      l_class_num    := 6;
      l_Old_mis_code := :old.fund_mis_6;
      l_new_mis_code := :new.fund_mis_6;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.fund_mis_7, '?') <> NVL(:new.fund_mis_7, '?')) THEN
      l_mis_type     := 'F';
      l_class_num    := 7;
      l_Old_mis_code := :old.fund_mis_7;
      l_new_mis_code := :new.fund_mis_7;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.fund_mis_8, '?') <> NVL(:new.fund_mis_8, '?')) THEN
      l_mis_type     := 'F';
      l_class_num    := 8;
      l_Old_mis_code := :old.fund_mis_8;
      l_new_mis_code := :new.fund_mis_8;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.fund_mis_9, '?') <> NVL(:new.fund_mis_9, '?')) THEN
      l_mis_type     := 'F';
      l_class_num    := 9;
      l_Old_mis_code := :old.fund_mis_9;
      l_new_mis_code := :new.fund_mis_9;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;

    END IF;

    IF (NVL(:old.fund_mis_10, '?') <> NVL(:new.fund_mis_10, '?')) THEN
      l_mis_type     := 'F';
      l_class_num    := 10;
      l_Old_mis_code := :old.fund_mis_10;
      l_new_mis_code := :new.fund_mis_10;

      IF NOT fn_update_change_log(l_mis_type,
                                  l_class_num,
                                  l_old_mis_code,
                                  l_new_mis_code) THEN
        debug.pr_debug('OL',
                       'Failed in fn_update_change_log.' ||
                       'l_mis_type is :' || l_mis_type ||
                       'l_class_num is :' || l_class_num);
      END IF;
    END IF;
  END IF;
END OL_OLTR_CONTRACT_CHANGE_MIS_LOG;
/
