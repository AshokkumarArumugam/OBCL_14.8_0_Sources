create or replace view oltm_bank as
Select
  NVL(sy.INTERFACE_ID,'FCCPLN') interface_id,
  co.BANK_CODE,
  co.BANK_NAME,
  co.HO_BRANCH,
  co.RECORD_STAT,
  co.AUTH_STAT,
  co.MOD_NO,
  co.MAKER_ID,
  co.MAKER_DT_STAMP,
  co.CHECKER_ID,
  co.CHECKER_DT_STAMP,
  co.ONCE_AUTH
From  STTMS_CORE_BANK co, sytms_bank_params SY
WHERE co.bank_code = sy.bank_code(+)
/
create or replace synonym oltms_bank for oltm_bank
/