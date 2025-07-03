CREATE OR REPLACE TRIGGER oltr_trg_billcont
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle Banking Software Product.
** Copyright ? 2002 - 2017  Oracle and/or its affiliates.  All rights reserved.
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
  AFTER UPDATE ON oltb_bill_details
  FOR EACH ROW

DECLARE
  l_mod_exist    	NUMBER := 0;
BEGIN

  Debug.Pr_Debug('OL', 'Inside the trigger oltr_trg_billcont');
  
  BEGIN
		SELECT COUNT(1) INTO l_mod_exist FROM SMTB_MODULES_GROUP WHERE MODULE_GROUP_ID = 'FCROFC';
  EXCEPTION
	WHEN NO_DATA_FOUND THEN
		l_mod_exist := 0;
  END;
  debug.pr_debug('OL','l_mod_exist : ' || l_mod_exist);

  IF l_mod_exist > 0 THEN
	  IF NOT :OLD.BILL_DUE_AMOUNT = :NEW.BILL_DUE_AMOUNT THEN
		UPDATE oltb_contract_master
		   SET BILL_DUE_AMT = :NEW.BILL_DUE_AMOUNT
		 WHERE BILL_REF_NO = :NEW.BCREFNO;
	  END IF;
  END IF;

  Debug.Pr_Debug('OL', 'End of the trigger oltr_trg_billcont');

EXCEPTION
  WHEN OTHERS THEN
    Debug.Pr_Debug('OL', 'Failed in oltr_trg_oltmprd. Error = ' || SQLERRM);
END oltr_trg_oltmprd;
/