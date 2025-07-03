CREATE OR REPLACE TRIGGER "TRGTST_OLTB_RFR_INT_CALC_DTLS"
 AFTER insert OR update or delete on OLTB_RFR_INTEREST_CALC_DTLS for each row
	DECLARE

BEGIN

  IF INSERTING THEN

   Debug.Pr_Debug('OL','########### INSERT OLTB_RFR_INTEREST_CALC_DTLS ');

  ELSIF UPDATING THEN
   Debug.Pr_Debug('OL','########### UPDATE OLTB_RFR_INTEREST_CALC_DTLS ');

  ELSIF DELETING THEN
   Debug.Pr_Debug('OL','########### DELETE OLTB_RFR_INTEREST_CALC_DTLS ');

  END IF;
debug.pr_debug('OL','msgid			-->'||:OLD.msgid ||'~'||:New.msgid   );
debug.pr_debug('OL','contract_ref_no			-->'||:OLD.contract_ref_no ||'~'||:New.contract_ref_no    );
debug.pr_debug('OL','COMPONENT			-->'||:OLD.COMPONENT||'~'||:New.COMPONENT   );
debug.pr_debug('OL','START_DATE			-->'||:OLD.START_DATE||'~'||:New.START_DATE   );
debug.pr_debug('OL','END_DATE			-->'||:OLD.END_DATE||'~'||:New.END_DATE   );
debug.pr_debug('OL','BASIS_AMOUNT			-->'||:OLD.BASIS_AMOUNT||'~'||:New.BASIS_AMOUNT   );
debug.pr_debug('OL','SCHEDULE_DATE			-->'||:OLD.SCHEDULE_DATE||'~'||:New.SCHEDULE_DATE   );
debug.pr_debug('OL','PROCESS_SEQ_NO		-->'||:OLD.PROCESS_SEQ_NO||'~'||:New.PROCESS_SEQ_NO   );
debug.pr_debug('OL','prepaid_interest 		-->'||:OLD.prepaid_interest||'~'||:New.prepaid_interest   );
debug.pr_debug('OL','FORCED_BASE_RATE	-->'||:OLD.FORCED_BASE_RATE||'~'||:New.FORCED_BASE_RATE    );
debug.pr_debug('OL','SPREAD				-->'||:OLD.SPREAD||'~'||:New.SPREAD  );
debug.pr_debug('OL','SPREAD_ADJ			-->'||:OLD.SPREAD_ADJ||'~'||:New.SPREAD_ADJ  );
debug.pr_debug('OL','RECALC_COMP_AMOUNT	-->'||:OLD.RECALC_COMP_AMOUNT||'~'||:New.RECALC_COMP_AMOUNT  );


  debug.pr_debug('OL', 'trace' || DBMS_UTILITY.format_call_stack);
EXCEPTION
  WHEN others THEN
    raise_application_error(-20001, 'Error in logging' || sqlerrm);
END;
/