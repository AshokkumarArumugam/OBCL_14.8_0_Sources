CREATE OR REPLACE VIEW OLVW_LOAN_DETAILS  
 ( CONTRACT_REF_NO ,BRANCH ,COUNTERPARTY,PRODUCT_CODE,BOOK_DATE,VALUE_DATE,MATURITY_DATE,CONTRACT_STATUS,                       
USER_DEFINED_STATUS,CONTRACT_CCY,AMOUNT,PRODUCT_TYPE,PRODUCT_DESC,MODULE_CODE,PACKING_CREDIT,LATEST_ESN,VERSION_NO,                  
SCODE,XREF,TRADE_REF_NO
)
AS
 (
 select a.contract_ref_no,
       a.branch,
       a.counterparty,
       a.product_code,
       a.book_date,
       b.Value_Date,
       b.Maturity_Date,
       b.contract_status,
       b.User_Defined_Status,
       a.contract_ccy,
       b.AMOUNT,
       a.PRODUCT_TYPE,
       c.product_description  PRODUCT_DESC,
       a.MODULE_CODE,
       b.Packing_Credit,
       a.latest_event_seq_no LATEST_ESN,
       a.latest_version_no   VERSION_NO,
       b.SOURCE_CODE         SCODE,
       a.external_ref_no     XREF,
       b.bill_ref_no         TRADE_REF_NO
  from oltbs_contract a, oltbs_contract_master b, oltm_product c
 where a.contract_ref_no = b.contract_ref_no
   and a.latest_version_no = b.version_no
   and a.product_code = c.product_code
   and A.module_code in ('OL','LB')
   and a.contract_status = 'A' 
   )
union
(
select a.contract_ref_no,
       a.branch,
       a.counterparty,
       a.product_code,
       a.book_date,
       b.facility_start_date  Value_Date,
       b.facility_end_date    Maturity_Date,
       a.contract_status,
       b.User_Defined_Status,
       a.contract_ccy,
       b.AMOUNT,
       a.PRODUCT_TYPE,
       c.product_description,
       a.MODULE_CODE,
       cast('' as char(1)) Packing_Credit,
       a.latest_event_seq_no    LATEST_ESN,
       a.latest_version_no      VERSION_NO,
       cast('' as VARCHAR2(15)) SCODE,
       a.external_ref_no        XREF,
       cast('' as VARCHAR2(16)) TRADE_REF_NO
 from oltbs_contract a, lbtbs_syndication_master b, oltm_product c
 where a.contract_ref_no = b.contract_ref_no
   and a.latest_version_no = b.version_no
   and a.product_code = c.product_code
   and A.module_code in ('FC')
   and a.contract_status = 'A'
   ) 
   
/
create or replace synonym OLVWS_LOAN_DETAILS for OLVW_LOAN_DETAILS
/