CREATE OR REPLACE TRIGGER ol_trg_pop_old_charges
/*----------------------------------------------------------------------------------------------------

**
** File Name	: ol_trg_pop_old_charges.TRG
**
** Module	: CHARGES
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2018 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.  
----------------------------------------------------------------------------------------------------
*/

/*
CHANGE_HISTORY

21/03/2001 FCC4.2 added where clause for contract and component

**
**  Changed By         :Akhila Samson
**  Changed on         :27-Jun-2023
**  Change Description :Changing to editioning view name instead of synonym.
**  Search String      :Bug#35222052

*/


AFTER INSERT OR UPDATE ON --lftbs_charge_appln --Bug#35222052
lftb_charge_appln --Bug#35222052
FOR EACH ROW
DECLARE
l_status		varchar2(1);
l_cnt			integer;
BEGIN
	debug.pr_debug ('LF','Inside trigger ol_trg_pop_old_charges');
	SELECT	count(*)
	INTO		l_cnt
	FROM		lftbs_contract_charges
	WHERE		contract_reference_no = :NEW.contract_ref_no
	AND		component = :NEW.component||'_LIQD'
	AND		pickup_event_sequence_number = :NEW.association_event_seq_no
	AND		event_seq_no = :NEW.event_seq_no;
		
	debug.pr_debug ('LF','The count is : '||l_cnt);
	IF l_cnt > 0 then
		if :NEW.waiver = 'Y' then
			l_status := 'W';
		elsif :NEW.liquidation_indicator = 'Y' then
			l_status := 'L';
		elsif :NEW.liquidation_indicator = 'N' then
			l_status := 'P';
		else
			l_status := 'R';
		end if;
		debug.pr_debug ('LF','Need to update the LFTB_CONTRACT_CHARGES');
		UPDATE	lftbs_contract_charges
		SET		value_date = :NEW.value_date,
				transaction_date = :NEW.transaction_date,
				change_during_amendment = :NEW.allow_amount_amendment,
				currency = :NEW.charge_ccy,
				amount = :NEW.charge_amount,
				status = l_status,
				waiver = :NEW.waiver,
				rate = :NEW.charge_rate,
				rate_type = :NEW.rate_or_flat,
				event = :NEW.event,
				party = :NEW.counterparty
/*BEFADB Where clause added*/
		WHERE		contract_reference_no = :NEW.contract_ref_no
		AND		component = :NEW.component||'_LIQD'
		AND		pickup_event_sequence_number = :NEW.association_event_seq_no
		AND		event_seq_no = :NEW.event_seq_no;
		debug.pr_debug ('LF','After update of lftbs_contract_charges');
	ELSE
		if :NEW.waiver = 'Y' then
			l_status := 'W';
		elsif :NEW.liquidation_indicator = 'Y' then
			l_status := 'L';
		elsif :NEW.liquidation_indicator = 'N' then
			l_status := 'P';
		else
			l_status := 'R';
		end if;
		debug.pr_debug ('LF','Will now insert into lftbs_contract_charges ');
		INSERT INTO lftbs_contract_charges
			(CONTRACT_REFERENCE_NO,
			 COMPONENT,
			 PICKUP_EVENT_SEQUENCE_NUMBER,
			 VALUE_DATE,
			 TRANSACTION_DATE,
			 CHANGE_DURING_AMENDMENT,
			 CURRENCY,
			 AMOUNT,
			 STATUS,
			 WAIVER,
			 RATE,
			 RATE_TYPE,
			 EVENT_SEQ_NO,
			 EVENT,
			 PARTY
			)
		VALUES
			(:NEW.CONTRACT_REF_NO,
			 :NEW.COMPONENT||'_LIQD',
			 :NEW.ASSOCIATION_EVENT_SEQ_NO,
			 :NEW.VALUE_DATE,
			 :NEW.TRANSACTION_DATE,
			 :NEW.ALLOW_AMOUNT_AMENDMENT,
			 :NEW.CHARGE_CCY,
			 :NEW.CHARGE_AMOUNT,
			 l_status,
			 :NEW.WAIVER,
			 :NEW.CHARGE_RATE,
			 :NEW.RATE_OR_FLAT,
			 :NEW.EVENT_SEQ_NO,
			 :NEW.EVENT,
			 :NEW.COUNTERPARTY
			);
		debug.pr_debug ('LF','After insert into lftbs_contract_charges ');
	END IF;
EXCEPTION
	WHEN OTHERS THEN
		debug.pr_debug ('LF','Error in executing trigger ol_trg_pop_old_charges : '||SQLERRM);
		raise_application_error (-20000, 'Error in executing trigger ol_trg_pop_old_charges ');
END;
/