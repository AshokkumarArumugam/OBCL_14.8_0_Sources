create or replace view oltm_trn_code as
Select
co.TRN_CODE,
co.TRN_DESC,
CO.auth_stat,
co.record_stat,
co.once_auth
From sttms_core_TRN_CODE co
/
create or replace synonym oltms_trn_code for oltm_trn_code
/