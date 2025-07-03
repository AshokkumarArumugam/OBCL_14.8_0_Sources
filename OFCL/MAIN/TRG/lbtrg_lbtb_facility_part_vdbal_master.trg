CREATE OR REPLACE TRIGGER lbtrg_lbtb_facility_part_vdbal_master 
  AFTER insert OR update or delete on LBTB_FACILITY_PART_VDBAL_MASTER
  for each row
DECLARE

BEGIN

  IF INSERTING THEN

    Debug.Pr_Debug('OL',
                   '########### INSERT LBTB_FACILITY_PART_VDBAL_MASTER CONTRACT_REF_NO-COUNTERPARTY-VALUE_DATE-BALANCE_TYPE-CONTRACT_CCY-OPENING_BAL-CLOSING_BAL-DR_TURNOVER-CR_TURNOVER: ' ||
                   :New.CONTRACT_REF_NO || '~' ||:New.COUNTERPARTY||'~'||
                   :New.VALUE_DATE || '~' || :New.BALANCE_TYPE || '~' ||
                   :New.CONTRACT_CCY|| '~' ||:New.OPENING_BAL|| '~' || :New.CLOSING_BAL||'~'||:New.DR_TURNOVER||'~'||:New.CR_TURNOVER);

  ELSIF UPDATING THEN
    Debug.Pr_Debug('OL',
                   '########### UPDATE LBTB_FACILITY_PART_VDBAL_MASTER CONTRACT_REF_NO-VALUE_DATE-BALANCE_TYPE-CONTRACT_CCY-OPENING_BAL-CLOSING_BAL-DR_TURNOVER-CR_TURNOVER: ' ||
                   :Old.CONTRACT_REF_NO || '~' ||:Old.COUNTERPARTY||'~'|| :New.COUNTERPARTY||'~'||
                   :OLD.VALUE_DATE || '~' || :New.VALUE_DATE || '~' ||
                   :OLD.BALANCE_TYPE || '~' || :New.BALANCE_TYPE || '~' ||
                   :Old.CONTRACT_CCY || '~' || :New.CONTRACT_CCY || '~' ||
				   :Old.OPENING_BAL|| '~' ||:New.OPENING_BAL|| '~' ||
                   :Old.CLOSING_BAL || '~' || :New.CLOSING_BAL||'~'||:Old.DR_TURNOVER||'~'||:New.DR_TURNOVER||'~'||:Old.CR_TURNOVER||'~'||:New.CR_TURNOVER||'~'||' <<OLD~NEW>>');

  ELSIF DELETING THEN
    Debug.Pr_Debug('OL',
                   '########### DELETE LBTB_FACILITY_PART_VDBAL_MASTER CONTRACT_REF_NO-VALUE_DATE-BALANCE_TYPE-CONTRACT_CCY-OPENING_BAL-CLOSING_BAL-DR_TURNOVER-CR_TURNOVER: ' ||
                   :Old.CONTRACT_REF_NO || '~' || :Old.COUNTERPARTY||'~'||
                   :Old.VALUE_DATE || '~' || :Old.BALANCE_TYPE || '~' ||
                   :Old.CONTRACT_CCY || '~' ||:Old.OPENING_BAL|| '~' || :Old.CLOSING_BAL||'~'||:Old.DR_TURNOVER||'~'||:Old.CR_TURNOVER);

  END IF;


  debug.pr_debug('OL', 'trace' || DBMS_UTILITY.format_call_stack);
EXCEPTION
  WHEN others THEN
    raise_application_error(-20001, 'Error in logging' || sqlerrm);
END;
/
	