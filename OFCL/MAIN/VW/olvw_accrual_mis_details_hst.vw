CREATE OR REPLACE FORCE VIEW
olvw_accrual_mis_details_hst(BRN,MODULE,PROD,REFNO,CRN,CCY,AMT,RELCUST,RELACC,VAL_DT) AS (SELECT  LDAH.branch   brn
  , LDAH.module   module
  , LDAH.product   prod
  , LDAH.product_accrual_ref_no refno
  , LDAH.contract_ref_no  crn
  , LDAH.component_ccy  ccy
  , LDAH.net_accrual  amt
  , CSC.counterparty  relcust
  , NULL    relacc
  , LDAH.value_date   val_dt
 FROM
  oltbs_contract_accrual_history LDAH
  , oltbs_contract CSC
 WHERE LDAH.contract_ref_no = CSC.contract_ref_no
 AND LDAH.branch = GLOBAL.current_branch
 and   LDAH.VALUE_DATE = GLOBAL.application_date )
UNION
(
SELECT  LDAH.branch   brn
  , LDAH.module   module
  , LDAH.product   prod
  , LDAH.product_accrual_ref_no refno
  , LDAH.contract_ref_no  crn
  , LDAH.component_ccy  ccy
  , LDAH.net_accrual  amt
  , CSC.counterparty  relcust
  , NULL    relacc
  , LDAH.value_date   val_dt
 FROM
  olars_contract_accrual_history LDAH
  , olars_contract CSC
 WHERE LDAH.contract_ref_no = CSC.contract_ref_no
 AND LDAH.branch = GLOBAL.current_branch
 and   LDAH.VALUE_DATE = GLOBAL.application_date)
-- OFCL12.2 Not required 
/*UNION
(
SELECT  LDAH.branch   brn
  , LDAH.module   module
  , LDAH.product   prod
  , LDAH.product_accrual_ref_no refno
  , LDAH.contract_ref_no  crn
  , LDAH.component_ccy  ccy
  , LDAH.net_accrual  amt
  , CSC.counterparty  relcust
  , NULL    relacc
  , LDAH.value_date   val_dt
 FROM
  olpts_contract_accrual_history LDAH
  , CSPTS_contract CSC
 WHERE LDAH.contract_ref_no = CSC.contract_ref_no
 AND LDAH.branch = GLOBAL.current_branch
 and   LDAH.VALUE_DATE = GLOBAL.application_date )
UNION
(
SELECT  LDAH.branch   brn
  , LDAH.module   module
  , LDAH.product   prod
  , LDAH.product_accrual_ref_no refno
  , LDAH.contract_ref_no  crn
  , LDAH.component_ccy  ccy
  , LDAH.net_accrual  amt
  , CSC.counterparty  relcust
  , NULL    relacc
  , LDAH.value_date   val_dt
 FROM
  olpps_contract_accrual_history LDAH
  , CSPPS_contract CSC
 WHERE LDAH.contract_ref_no = CSC.contract_ref_no
 AND LDAH.branch = GLOBAL.current_branch
 and   LDAH.VALUE_DATE = GLOBAL.application_date)*/
 -- OFCL12.2 Not required
/