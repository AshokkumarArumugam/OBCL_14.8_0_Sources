CREATE OR REPLACE FORCE VIEW
olvw_auto_deposit_hst(BRANCH,CONTRACT_REF_NO,USER_REF_NO,LATEST_EVENT_SEQ_NO,CUSTOM_REF_NO,COUNTERPARTY,CURRENCY,VALUE_DATE,MATURITY_DATE,PRODUCT,CLUSTER_ID,PRINCIPAL_OUTSTANDING_BAL,CUST_AC_BR,CUST_ACCOUNT,RATE_SPREAD) AS (select
a.branch,a.contract_ref_no,a.user_ref_no,a.latest_event_seq_no,a.custom_ref_no,
b.counterparty,b.currency,b.value_date,b.maturity_date,b.product,b.cluster_id,
c.principal_outstanding_bal,d.cust_ac_br,d.cust_account,
lfpkss_services.fn_interest_details(a.contract_ref_no,a.latest_event_seq_no)
from oltbs_contract a,oltbs_contract_master b,oltbs_contract_balance c,oltbs_auto_deposit d
where d.account_linked_deposit = 'Y'
and a.contract_ref_no = d.contract_ref_no
and b.contract_ref_no = a.contract_ref_no
and b.version_no = a.latest_version_no
and c.contract_ref_no = b.contract_ref_no
and a.contract_status = 'A'
and c.principal_outstanding_bal >0 )
UNION
(select
a.branch,a.contract_ref_no,a.user_ref_no,a.latest_event_seq_no,a.custom_ref_no,
b.counterparty,b.currency,b.value_date,b.maturity_date,b.product,b.cluster_id,
c.principal_outstanding_bal,d.cust_ac_br,d.cust_account,
lfpkss_services.fn_interest_details(a.contract_ref_no,a.latest_event_seq_no)
from olars_contract a,olars_contract_master b,olars_contract_balance c,olars_auto_deposit d
where d.account_linked_deposit = 'Y'
and a.contract_ref_no = d.contract_ref_no
and b.contract_ref_no = a.contract_ref_no
and b.version_no = a.latest_version_no
and c.contract_ref_no = b.contract_ref_no
and a.contract_status = 'A'
and c.principal_outstanding_bal >0 )
-- OFCL12.2 Not required
/*UNION
(select
a.branch,a.contract_ref_no,a.user_ref_no,a.latest_event_seq_no,a.custom_ref_no,
b.counterparty,b.currency,b.value_date,b.maturity_date,b.product,b.cluster_id,
c.principal_outstanding_bal,d.cust_ac_br,d.cust_account,
lfpkss_services.fn_interest_details(a.contract_ref_no,a.latest_event_seq_no)
from csptS_contract a,olpts_contract_master b,olpts_contract_balance c,olpts_auto_deposit d
where d.account_linked_deposit = 'Y'
and a.contract_ref_no = d.contract_ref_no
and b.contract_ref_no = a.contract_ref_no
and b.version_no = a.latest_version_no
and c.contract_ref_no = b.contract_ref_no
and a.contract_status = 'A'
and c.principal_outstanding_bal >0 )
UNION
(select
a.branch,a.contract_ref_no,a.user_ref_no,a.latest_event_seq_no,a.custom_ref_no,
b.counterparty,b.currency,b.value_date,b.maturity_date,b.product,b.cluster_id,
c.principal_outstanding_bal,d.cust_ac_br,d.cust_account,
lfpkss_services.fn_interest_details(a.contract_ref_no,a.latest_event_seq_no)
from csppS_contract a,olpps_contract_master b,olpps_contract_balance c,olpps_auto_deposit d
where d.account_linked_deposit = 'Y'
and a.contract_ref_no = d.contract_ref_no
and b.contract_ref_no = a.contract_ref_no
and b.version_no = a.latest_version_no
and c.contract_ref_no = b.contract_ref_no
and a.contract_status = 'A'
and c.principal_outstanding_bal >0 )*/
-- OFCL12.2 Not required
/