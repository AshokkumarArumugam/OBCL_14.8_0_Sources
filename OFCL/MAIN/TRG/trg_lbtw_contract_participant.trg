CREATE OR REPLACE TRIGGER "TRG_LBTW_CONTRACT_PARTICIPANT"
/*----------------------------------------------------------------------------------------------------
**
** File Name   : trg_lbtw_contract_participant.trg
** Module      : 
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
------------------------------------------------------------------------------------------------------

    CHANGE HISTORY
    
    Created By           : 
    Created On           : 
    Purpose              : 

    Modified By          : 
    Modified On          : 
    Fix Description      : 
    Search String        : 
------------------------------------------------------------------------------------------------------
*/
BEFORE INSERT OR DELETE OR UPDATE ON lbtw_contract_participant
FOR EACH ROW
BEGIN
debug.pr_debug('OL','Inside the trigger on lbtw_contract_participant');
IF INSERTING
THEN
	debug.pr_debug('OL','**************LBTW_CONTRACT_PARTICIPANT************************* ');
	debug.pr_debug('OL','Inserting into lbtw_contract_participant ');
END IF;
IF DELETING
THEN
	debug.pr_debug('OL','******************LBTW_CONTRACT_PARTICIPANT********************* ');
	debug.pr_debug('OL','DELETING into lbtw_contract_participant');
END IF;
IF UPDATING
THEN
	debug.pr_debug('OL','**************LBTW_CONTRACT_PARTICIPANT************************* ');
	debug.pr_debug('OL','updating into lbtw_contract_participant ');
END IF;

debug.pr_debug('OL','CONTRACT_REF_NO      ='||:NEW.CONTRACT_REF_NO ||'~'||:OLD.CONTRACT_REF_NO);
debug.pr_debug('OL','ENTRY_SEQ_NO      ='||:NEW.ENTRY_SEQ_NO ||'~'||:OLD.ENTRY_SEQ_NO);
debug.pr_debug('OL','CONTRACT_TYPE      ='||:NEW.CONTRACT_TYPE ||'~'||:OLD.CONTRACT_TYPE);
debug.pr_debug('OL','DRAWDOWN_NO      ='||:NEW.DRAWDOWN_NO ||'~'||:OLD.DRAWDOWN_NO);
debug.pr_debug('OL','PARTICIPANT      ='||:NEW.PARTICIPANT ||'~'||:OLD.PARTICIPANT);
debug.pr_debug('OL','ASSET_RATIO      ='||:NEW.ASSET_RATIO ||'~'||:OLD.ASSET_RATIO);
debug.pr_debug('OL','VALUE_DATE      ='||:NEW.VALUE_DATE ||'~'||:OLD.VALUE_DATE);
debug.pr_debug('OL','SETTLEMENT_SEQ_NO      ='||:NEW.SETTLEMENT_SEQ_NO||'~'||:OLD.SETTLEMENT_SEQ_NO);
debug.pr_debug('OL','OPERATION      ='||:NEW.OPERATION||'~'||:OLD.OPERATION);
debug.pr_debug('OL','VERSION_NO      ='||:NEW.VERSION_NO||'~'||:OLD.VERSION_NO);
debug.pr_debug('OL','SSI_MNEMONIC      ='||:NEW.SSI_MNEMONIC||'~'||:OLD.SSI_MNEMONIC);
debug.pr_debug('OL','**************trg_lbtw_contract_participant TRIGGER END************************* ');
END;
/