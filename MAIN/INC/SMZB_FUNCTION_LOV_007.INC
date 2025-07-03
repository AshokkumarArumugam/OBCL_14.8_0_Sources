PROMPT PROCESSING FOR SMZB_FUNCTION_LOV_007

BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECTOR_CODE_DR',
'CLDCROLL',
'select sector_code from detms_clg_brn_code where bank_code= ? and branch_code = ?',
50,'SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECTYCD',
'SEDDLONL',
'SELECT v.internal_sec_id,v.security_description,v.security_ccy,' || chr(10) || 'v.PAYCCY FROM sevws_deal_security v WHERE v.product_code in (select distinct preferred_leg	from setms_combination_product where combination_product = ?) AND NVL(TO_DATE(v.REDEMPTION_OR_EXPIRY_DATE,''DD-MON-RRRR''),GLOBAL.APPLICATION_DATE) >= TO_DATE(GLOBAL.APPLICATION_DATE,''DD-MON-RRRR'')',
100,'INTERNAL_SEC_ID!TEXT!INTERNAL_SEC_ID~SECURITY_DESCRIPTION!TEXT!SECURITY_DESCRIPTION~SECURITY_CCY!TEXT!SECURITY_CCY~PAYCCY!TEXT!PAYCCY',
'STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECTYCD1',
'SEDDLONL',
'SELECT v.internal_sec_id,v.security_description,v.security_ccy,v.PAYCCY FROM sevws_deal_security v WHERE v.product_code = ?  AND NVL(TO_DATE(v.REDEMPTION_OR_EXPIRY_DATE,''DD-MON-RRRR''),GLOBAL.APPLICATION_DATE) >= TO_DATE(GLOBAL.APPLICATION_DATE,''DD-MON-RRRR'')',
100,'INTERNAL_SEC_ID!TEXT!INTERNAL_SEC_ID~SECURITY_DESCRIPTION!TEXT!SECURITY_DESCRIPTION~SECURITY_CCY!TEXT!SECURITY_CCY~PAYCCY!TEXT!PAYCCY',
'STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECTYCD_RI',
'SEDDLONL',
'select a.security_id, a.sk_location_id , a.sk_location_account, c.sk_location_desc, b.security_description from setbs_pfolio_skacbalances a , setms_security_master b, setms_sk_location c where a.portfolio_id = ? and a.security_id = b.internal_sec_id and a.sk_location_id = c.sk_location_id and a.security_id = b.internal_sec_id and b.security_type in(''R'',''W'')',
100,'SECURITY_ID!TEXT!SECURITY_ID~SK_LOCATION_ID!TEXT!SK_LOCATION_ID~SK_LOCATION_ACCOUNT!TEXT!SK_LOCATION_ACCOUNT~SK_LOCATION_DESC!TEXT!SK_LOCATION_DESC~SECURITY_DESCRIPTION!TEXT!SECURITY_DESCRIPTION',
'STRING~STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECURITY',
'SEDPFPRD',
'SELECT INTERNAL_SEC_ID, PRODUCT, SECURITY_DESCRIPTION' || chr(10) || 'FROM SETMS_SECURITY_MASTER' || chr(10) || 'WHERE INTERNAL_SEC_ID NOT IN (SELECT SECURITY_ID' || chr(10) || 'FROM SETM_PFOLIO_PROD_SECACCESS' || chr(10) || 'WHERE PORTFOLIO_PRODUCT_CODE = ? ) AND AUTH_STAT =''A''' || chr(10) || 'ORDER BY INTERNAL_SEC_ID',
200,'INTERNAL_SEC_ID!TEXT!INTERNAL_SEC_ID~PRODUCT!TEXT!PRODUCT~SECURITY_DESCRIPTION!TEXT!SECURITY_DESCRIPTION',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECURITY_CCY',
'SEDSEONL',
'SELECT DISTINCT VW.CCY_CODE,CCY.CCY_NAME FROM CSVWS_PRODUCT_CURRENCIES VW,CYTMS_CCY_DEFN CCY WHERE VW.CCY_CODE=CCY.CCY_CODE AND VW.PRODUCT_CODE=? ORDER BY VW.CCY_CODE',
100,'CCY_CODE!TEXT!VW.CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECURITY_CODE',
'SEDMKRAT',
'select internal_sec_id, security_description , nvl(index_flag,''N'') index_flag, security_ccy from setms_security_master where once_auth = ''Y'' and record_stat = ''O'' order by internal_sec_id',
100,'INTERNAL_SEC_ID!TEXT!INTERNAL_SEC_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECURITY_CODE',
'SRCRVRPO',
'select distinct b.security_id from setms_security_master a, setbs_pfolio_skacbalances b where a.auth_stat = ''A'' and a.record_stat =''O'' and a.internal_sec_id = b.security_id',
100,'SECURITY_ID!TEXT!SECURITY_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECURITY_HOL_CCY',
'SEDSEONL',
'SELECT CCY_CODE,CCY_NAME FROM CYTMS_CCY_DEFN WHERE AUTH_STAT=''A'' AND RECORD_STAT=''O'' AND CCY_CODE NOT IN(SELECT HOL_CCY FROM SETMS_SECURITY_HOL_CCY WHERE SECURITY_ID=?) ORDER BY CCY_CODE',
100,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECURITY_ID',
'LMDCOL01',
'SELECT SECURITY_ID, CURRENCY, COLLATERAL_TYPE FROM (SELECT DISTINCT A.SECURITY_ID , A.CURRENCY , A.COLLATERAL_TYPE FROM LMTMS_SECURITY_MASTER A ,LMTMS_SECURITY_PRICE B WHERE A.SECURITY_ID = B.SECURITY_ID AND A.RECORD_STAT = ''O'' AND A.ONCE_AUTH = ''Y'') WHERE 1=1 ORDER BY 1',
100,'SECURITY_ID!TEXT!SECURITY_ID~CURRENCY!TEXT!COLLATERAL_CURRENCY~COLLATERAL_TYPE!TEXT!COLLATERAL_TYPE',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECURITY_ID',
'LMDCOLLT',
'SELECT SECURITY_ID, CURRENCY, COLLATERAL_TYPE FROM (SELECT DISTINCT A.SECURITY_ID , A.CURRENCY , A.COLLATERAL_TYPE FROM LMTMS_SECURITY_MASTER A ,LMTMS_SECURITY_PRICE B WHERE A.SECURITY_ID = B.SECURITY_ID AND A.RECORD_STAT = ''O'' AND A.ONCE_AUTH = ''Y'') WHERE 1=1 ORDER BY 1',
100,'SECURITY_ID!TEXT!SECURITY_ID~CURRENCY!TEXT!CURRENCY~COLLATERAL_TYPE!TEXT!COLLATERAL_TYPE',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECURITY_ID',
'SEDCDVDF',
'select internal_sec_id,security_description,a.security_ccy from setms_security_master a, cytms_ccy_defn b where decode(nvl(a.index_flag,''N''),''N'',a.security_ccy,''USD'') = b.ccy_code and security_type=''E'' and a.auth_stat=''A'' and a.record_stat=''O'' order by internal_sec_id',
100,'INTERNAL_SEC_ID!TEXT!INTERNAL_SEC_ID~SECURITY_DESCRIPTION!TEXT!SECURITY_DESCRIPTION~SECURITY_CCY!TEXT!SECURITY_CCY',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECURITY_ID',
'SEDREDDF',
'select internal_sec_id,security_description, security_ccy,b.ccy_name,redemption_quotation from setms_security_master a,cytms_ccy_defn b where a.security_type in (''B'',''Z'') and a.auth_stat =''A'' and a.call_option =''Y'' and a.record_stat =''O'' and decode(nvl(a.index_flag,''N''),''N'',a.security_ccy,''USD'') = b.ccy_code  order by internal_sec_id',
100,'INTERNAL_SEC_ID!TEXT!INTERNAL_SEC_ID~SECURITY_DESCRIPTION!TEXT!SECURITY_DESCRIPTION~SECURITY_CCY!TEXT!SECURITY_CCY~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECURITY_ID',
'SRCRPBLK',
'select distinct b.security_id from setms_security_master a, setbs_pfolio_skacbalances b where a.auth_stat = ''A'' and a.record_stat =''O'' and a.internal_sec_id = b.security_id and b.portfolio_id =?',
100,'SECURITY_ID!TEXT!B.SECURITY_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECURITY_RES',
'SEDPFPRD',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O'' AND PRODUCT_CODE IN (SELECT PRODUCT FROM SETMS_SECURITY_PRODUCT) AND PRODUCT_CODE NOT IN (SELECT SESECURITY_PRODUCT_CODE FROM SETMS_PFOLIOPROD_RESTRICTIONS WHERE SEPORTFOLIO_PRODUCT_CODE = ?)ORDER BY PRODUCT_CODE',
'','PRODUCT_CODE!TEXT!~PRODUCT_DESCRIPTION!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEC_ACCESS',
'SEDDLPRD',
'SELECT INTERNAL_SEC_ID, PRODUCT, SECURITY_DESCRIPTION FROM SETMS_SECURITY_MASTER WHERE INTERNAL_SEC_ID NOT IN (SELECT SECURITY_ID FROM SETMS_DEALPROD_SECURITY_ACCESS WHERE SEDEAL_PRODUCT_CODE = ?)  AND ONCE_AUTH = ''Y'' ORDER BY INTERNAL_SEC_ID',
'','','','','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEC_ACCESS',
'SEDPFONL',
'SELECT INTERNAL_SEC_ID, PRODUCT, SECURITY_DESCRIPTION FROM(SELECT A.INTERNAL_SEC_ID, A.PRODUCT, A.SECURITY_DESCRIPTION  FROM SETMS_SECURITY_MASTER A WHERE INTERNAL_SEC_ID NOT IN       (SELECT SECURITY_ID          FROM SETM_PFOLIO_SECURITIES_ACCESS         WHERE PORTFOLIO_ID = ?) AND A.AUTH_STAT = ''A'' AND ONCE_AUTH = ''Y'')         WHERE 1=1 ORDER BY INTERNAL_SEC_ID',
100,'INTERNAL_SEC_ID!TEXT!INTERNAL_SEC_ID~PRODUCT!TEXT!PRODUCT~SECURITY_DESCRIPTION!TEXT!SECURITY_DESCRIPTION',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEC_ADMIN',
'LNDCONON',
'SELECT ADMIN_ID, ADMIN_NAME FROM CSTMS_ADMINISTRATOR WHERE ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O'' ORDER BY 1',
50,'ADMIN_ID!TEXT!ADMIN_ID~ADMIN_NAME!TEXT!ADMIN_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEC_PRICE',
'SEDPFONL',
'SELECT PRICE_CODE,PRICE_CODE_DESC FROM SETMS_PRICE_CODE WHERE AUTH_STAT = ''A'' AND ONCE_AUTH=''Y'' AND RECORD_STAT = ''O'' ORDER BY PRICE_CODE',
100,'PRICE_CODE!TEXT!PRICE_CODE~PRICE_CODE_DESC!TEXT!PRICE_CODE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEC_PROD',
'SEDPFONL',
'SELECT PRODUCT_CODE, PRODUCT_DESCRIPTION  FROM CSTMS_PRODUCT WHERE MODULE =''SS'' AND AUTH_STAT = ''A'' AND ONCE_AUTH =''Y'' AND RECORD_STAT =''O'' AND PRODUCT_CODE NOT IN (SELECT SECURITY_PRODUCT FROM SETMS_ROLE_TO_HEAD_2 WHERE PORTFOLIO_ID =?) ORDER BY PRODUCT_CODE',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_1',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_10',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_11',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_12',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_13',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_14',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_15',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_16',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_17',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_18',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_19',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_2',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_20',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_21',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_22',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_23',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_24',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_25',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_26',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_27',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_28',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_29',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_3',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_30',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_4',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_5',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_6',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_7',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_8',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SEGMENT_9',
'EGDCIDPR',
'select field_name from EGTB_ORACLE_CCID_ATTRIBUTES where field_name not in(nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0''),nvl(?,''0'')) order by field_name',
300,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SELF_PARTICIPANT',
'LSDPCMAP',
'SELECT SELF_PARTICIPANT,BRANCH,BRANCH CL_BRN,DESK,EXP_CODE,CUSTOMER_NAME1 FROM LSTM_SELF_PARTICIPANT A,STTM_CUSTOMER B WHERE A.SELF_PARTICIPANT=B.CUSTOMER_NO AND A.AUTH_STAT=''A'' AND A.RECORD_STAT=''O'' ORDER BY 1',
50,'SELF_PARTICIPANT!TEXT!SELF_PARTICIPANT~BRANCH!TEXT!BRANCH~CL_BRN!TEXT!CL_BRN~CUSTOMER_NAME1!TEXT!CUSTOMER_NAME1',
'STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SELL',
'SEDCOMBP',
'select product_code , product_description , product_type from cstms_product where module = ''SD'' and auth_stat = ''A'' and record_stat = ''O'' and product_code <> nvl(?,''----'') and product_type in (''CS'',''BS'') order by product_code',
100,'COMBINATION_PRODUCT!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SERIES',
'EDDLSONL',
'SELECT SERIES_ID,SERIES_DESCRIPTION,TO_CHAR(EXPIRY_DATE,''RRRR-MM-DD''),STRIKE_PRICE FROM EDTM_INSTRUMENT_SERIES WHERE INSTRUMENT_ID = ? AND AUTH_STAT = ''A'' AND GLOBAL.APPLICATION_DATE BETWEEN START_OF_TRADING_DATE AND EXPIRY_DATE ORDER BY 1',
200,'SERIES_ID!TEXT!SERIES_ID~SERIES_DESCRIPTION!TEXT!SERIES_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SERIES',
'SEDBLONL',
'select series , internal_sec_id from setms_security_series where internal_sec_id = ?',
100,'SERIES!TEXT!SERIES',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SERIES',
'SEDDLONL',
'select series,internal_sec_id from setms_security_series where internal_sec_id=? ORDER BY internal_sec_id',
100,'SERIES!TEXT!SERIES~INTERNAL_SEC_ID!TEXT!INTERNAL_SEC_ID',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SERIES',
'SEDREDDF',
'select series from setms_security_series a where a.internal_sec_id = ? and series not in (select series from setms_redemption where internal_sec_id = ? and record_stat = ''O'') order by series',
100,'SERIES!TEXT!SERIES',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SERIES',
'SEDSEONL',
'select series from setms_security_series where internal_sec_id = ? minus select series from setms_redemption where internal_sec_id = ? order by series',
100,'SERIES!TEXT!SERIES',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SERIES',
'SEDSKONL',
'select series,internal_sec_id from setms_security_series order by series',
100,'SERIES!TEXT!SERIES~INTERNAL_SEC_ID!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SERIES',
'SRCRPBLK',
'select series from setms_security_series where internal_sec_id = ?',
100,'SERIES!TEXT!SERIES',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SERIES_ID',
'EDDBSBAL',
'SELECT DISTINCT A.SERIES_ID,B.SERIES_DESCRIPTION FROM EDTMS_INSTRUMENT_SERIES B, EDTB_BASKET_REFERENCE A WHERE A.SERIES_ID=B.SERIES_ID AND A.BRANCH = GLOBAL.CURRENT_BRANCH ORDER BY A.SERIES_ID',
100,'SERIES_ID!TEXT!SERIES_ID~SERIES_DESCRIPTION!TEXT!SERIES_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SERIES_ID',
'EDDINRAT',
'SELECT SERIES_ID, SERIES_DESCRIPTION FROM EDTMS_INSTRUMENT_SERIES  WHERE INSTRUMENT_ID = ? AND AUTH_STAT = ''A'' ORDER BY 1',
'','SERIES_ID!TEXT!SERIES_ID~SERIES_DESCRIPTION!TEXT!SERIES_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SERIES_ID',
'EDDLQONL',
'SELECT SERIES_ID,SERIES_DESCRIPTION,STRIKE_PRICE,TO_CHAR(EXPIRY_DATE,''RRRR-MM-DD'') FROM EDTMS_INSTRUMENT_SERIES WHERE INSTRUMENT_ID = ? AND EXPIRY_DATE >= GLOBAL.APPLICATION_DATE AND START_OF_TRADING_DATE <= GLOBAL.APPLICATION_DATE AND AUTH_STAT =''A'' ORDER BY SERIES_ID',
100,'SERIES_ID!TEXT!SERIES_ID~SERIES_DESCRIPTION!TEXT!SERIES_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SERIES_ID',
'EDDQBSWA',
'SELECT DISTINCT SERIES_ID, SERIES_DESCRIPTION FROM (SELECT DISTINCT A.SERIES_ID, C.SERIES_DESCRIPTION FROM EDTBS_BASKET_REFERENCE  A, EDTMS_PORTFOLIO B, EDTMS_INSTRUMENT_SERIES C WHERE A.SERIES_ID = C.SERIES_ID AND A.PORTFOLIO_ID = B.PORTFOLIO_ID AND A.OWN_CUSTOMER = ''O'' AND ((A.OPTION_FUTURE = ''F'') OR (A.OPTION_FUTURE = ''O'' AND A.PREMIUM_STYLE = ''F'') OR (B.OPTION_COSTING_METHOD = ''W'')) AND A.BRANCH = GLOBAL.CURRENT_BRANCH) WHERE 1 = 1 ORDER BY 1',
100,'SERIES_ID!TEXT!SERIES_ID~SERIES_DESCRIPTION!TEXT!SERIES_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SERIES_ID_SUMM',
'EDDLQONL',
'SELECT DISTINCT(SERIESID) FROM EDVWS_LIQUIDATION_DEAL_SUMMARY WHERE 1=1 ORDER BY 1',
100,'SERIESID!TEXT!SERIESID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SERIES_ID_SUMMARY',
'EDDLSONL',
'SELECT DISTINCT(SERIESID) FROM EDVW_LS_DEAL_SUMMARY WHERE 1=1 ORDER BY 1',
200,'SERIESID!TEXT!SERIESID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SERVICE',
'STDAMDMT',
'SELECT service_name from (SELECT DISTINCT(SERVICE_NAME) FROM gwtb_amend_nodes union SELECT DISTINCT(SERVICE_NAME) FROM gwtb_amend_fields) WHERE 1=1 ORDER BY SERVICE_NAME',
500,'SERVICE_NAME!TEXT!SERVICE_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SER_ACC',
'CIDACCDT',
'select account_no from STVWS_ACCOUNT WHERE ac_or_gl =''G''',
50,'ACCOUNT_NO!TEXT!ACCOUNT_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SER_ACC',
'CLDACCDT',
'select account_no from STVWS_ACCOUNT WHERE ac_or_gl =''G''',
50,'ACCOUNT_NO!TEXT!ACCOUNT_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SER_ACC',
'CLDCROLL',
'select ACCOUNT_NO,AC_DESC,ALT_AC_NO,BRANCH_CODE,CUSTOMER_NO,CURRENCY,AC_CLASS from STVWS_ACCOUNT',
100,'ACCOUNT_NO!TEXT!ACCOUNT_NO~BRANCH_CODE!TEXT!BRANCH_CODE~CURRENCY!TEXT!CURRENCY',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SER_ACC',
'CLDLOTEM',
'select account_no from STVWS_ACCOUNT WHERE ac_or_gl =''G''',
50,'ACCOUNT_NO!TEXT!ACCOUNT_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SER_ACC',
'LEDACCDT',
'select account_no from STVWS_ACCOUNT WHERE ac_or_gl =''G''',
50,'ACCOUNT_NO!TEXT!ACCOUNT_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SER_ACC',
'LSDTRONL',
'select account_no from STVWS_ACCOUNT WHERE ac_or_gl =''G''',
50,'ACCOUNT_NO!TEXT!ACCOUNT_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SER_ACC',
'MODACCDT',
'',50,'ACCOUNT_NO!TEXT!ACCOUNT_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SER_CHG_ACC',
'CIDACCDT',
'select account_no from STVWS_ACCOUNT WHERE ac_or_gl =''G''',
50,'ACCOUNT_NO!TEXT!ACCOUNT_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SER_CHG_ACC',
'CLDACCDT',
'select account_no from STVWS_ACCOUNT WHERE ac_or_gl =''G''',
50,'ACCOUNT_NO!TEXT!ACCOUNT_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SER_CHG_ACC',
'CLDLOTEM',
'select account_no from STVWS_ACCOUNT WHERE ac_or_gl =''G''',
50,'ACCOUNT_NO!TEXT!ACCOUNT_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SER_CHG_ACC',
'LEDACCDT',
'select account_no from STVWS_ACCOUNT WHERE ac_or_gl =''G''',
50,'ACCOUNT_NO!TEXT!ACCOUNT_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SER_CHG_ACC',
'LSDTRONL',
'select account_no from STVWS_ACCOUNT WHERE ac_or_gl =''G''',
50,'ACCOUNT_NO!TEXT!ACCOUNT_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SER_CHG_ACC',
'MODACCDT',
'',50,'ACCOUNT_NO!TEXT!ACCOUNT_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETL_BRN',
'IADSLONL',
'SELECT BRANCH_CODE, BRANCH_NAME FROM STTMS_BRANCH WHERE RECORD_STAT = ''O'' AND AUTH_STAT = ''A'' ORDER BY BRANCH_CODE',
50,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETL_LINE',
'FXDLMNET',
'SELECT l.line_cd || l.line_serial FROM ELVW_LIMITS_INT l,sttms_customer c WHERE l.liab_id = c.liability_no and c.customer_no = ? and l.record_stat = ''O'' and l.auth_stat = ''A'' and l.availability_flag = ''Y'' and l.ccy_restriction = ''N'' and ( EXISTS ( SELECT * FROM ELVW_LIMITS_CUST_REST_INT cr where cr.liab_id = c.liability_no and cr.line_cd = l.line_cd and cr.line_serial = l.line_serial and cr.customer_no = ? ) OR NOT EXISTS ( SELECT * FROM ELVW_LIMITS_CUST_REST_INT cr WHERE cr.liab_id = c.liability_no AND cr.line_cd = l.line_cd  AND cr.line_serial = l.line_serial ) ) AND ( EXISTS ( SELECT * FROM ELVW_LIMITS_BR_REST_INT b WHERE b.liab_id  = c.liability_no  AND  b.line_cd  = l.line_cd  AND   b.line_serial = l.line_serial  AND   b.branch_code =global.current_branch ) OR NOT EXISTS ( SELECT * FROM ELVW_LIMITS_BR_REST_INT b1 WHERE b1.liab_id  = c.liability_no AND  b1.line_cd  = l.line_cd AND  b1.line_serial = l.line_serial ) )',
100,'L.LINE_CD||L.LINE_SERIAL!TEXT!L.LINE_CD||L.LINE_SERIAL',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTELEMENT_MEMBER',
'FXDBRMNT',
'select bic_code, bank_name from (select a.bic_code, b.bank_name from fstm_bic_directory a, istms_bic_directory b where a.participant_type =''S'' and a.record_stat=''O'' and a.once_auth=''Y'' and a.bic_code = b.bic_code) where 1=1 order by bic_code',
500,'BIC_CODE!TEXT!BIC_CODE~BANK_NAME!TEXT!BANK_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTELMENT_CCY',
'SIDPRMNT',
'select ccy_code, ccy_name from cytms_ccy_defn where record_stat = ''O'' and auth_stat = ''A'' and ccy_code not in (select currency from cftms_product_currency_limits where product = ? and component = ?)',
500,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLEACC',
'MGDSCHEM',
'SELECT AC_GL_NO,AC_GL_DESC,nvl(Branch_code,GLOBAL.current_BRANCH) BRANCH_CODE FROM sttbs_account a WHERE gl_aclass_type IN (1,2,6) AND ac_gl_rec_status =''O'' AND nvl(ONCE_AUTH,''N'')=''Y'' AND nvl(ac_gl_ccy,?) = ? and exists(select 1 from sttm_branch  where   record_stat = ''O'' and nvl(ONCE_AUTH,''N'')=''Y'' and branch_code=nvl(a.branch_code,GLOBAL.current_branch))order by branch_code',
100,'AC_GL_NO!TEXT!AC_GL_NO~AC_GL_DESC!TEXT!AC_GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLEMENT_CCY',
'BCDPRMNT',
'select ccy_code, ccy_name from cytms_ccy_defn where record_stat =' || chr(10) || '               ''O'' and ONCE_AUTH = ''Y'' and ccy_code not in (select currency from' || chr(10) || '               cftms_product_currency_limits where product = ?and component = ?)' || chr(10) || '               order by ccy_code',
100,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLEMENT_CCY',
'CFCPRCHG',
'select ccy_code, ccy_name from cytms_ccy_defn where auth_stat = ''A'' and record_stat = ''O'' order by ccy_code',
100,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLEMENT_CCY',
'CFDINCLS',
'select ccy_code, ccy_name from cytms_ccy_defn where record_stat = ''O'' and auth_stat = ''A'' order by ccy_code',
100,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLEMENT_CCY',
'FXDPRMNT',
'select ccy_code, ccy_name from cytms_ccy_defn where record_stat = ''O'' and auth_stat = ''A'' and ccy_code not in (select currency from cftms_product_currency_limits where product = ? and component = ?) order by ccy_code',
500,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLEMENT_CCY',
'LCDPRMNT',
'SELECT CCY_CODE,CCY_NAME FROM CYTMS_CCY_DEFN WHERE RECORD_STAT=''O'' AND AUTH_STAT=''A'' ORDER BY CCY_CODE',
100,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLEMENT_MEMBERS',
'FSDBICDI',
'SELECT bic_code, bank_name FROM (SELECT a.bic_code, b.bank_name FROM   fstms_bic_directory a, istms_bic_directory b WHERE  a.bic_code = b.bic_code AND a.participant_type = ''S'' AND a.record_stat = ''O'' AND a.once_auth = ''Y'') WHERE  1 = 1 ORDER BY bic_code',
'','BIC_CODE!TEXT!BIC_CODE~BANK_NAME!TEXT!BANK_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLEMENT_SEQ_NUM',
'CLDACCDT',
'SELECT *  FROM (SELECT SETTL_SEQ_NO SETTLEMENT_SEQ_NUM,                PAY_ACCOUNT,                RECV_ACCOUNT,                PAY_AC_BRANCH,                RECV_AC_BRANCH           FROM CLTB_ACCOUNT_SETTL_SEQ          WHERE ACCOUNT_NUMBER = ?            AND BRANCH_CODE = ? UNION        SELECT NULL, NULL, NULL, NULL, NULL FROM DUAL) WHERE 1 = 1',
'','SETTL_SEQ_NO!TEXT!SETTLEMENT_SEQ_NUM~PAY_ACCOUNT!TEXT!PAY_ACCOUNT~RECV_ACCOUNT!TEXT!RECV_ACCOUNT~PAY_AC_BRANCH!TEXT!PAY_AC_BRANCH~RECV_AC_BRANCH!TEXT!RECV_AC_BRANCH',
'STRING~STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLEMENT_SEQ_NUM',
'CLDMDSBR',
'SELECT SETTL_SEQ_NO, PAY_ACCOUNT,RECV_ACCOUNT FROM CLTB_ACCOUNT_SETTL_SEQ WHERE ACCOUNT_NUMBER = ? AND BRANCH_CODE =?',
'','SETTL_SEQ_NO!TEXT!SETTL_SEQ_NO~PAY_ACCOUNT!TEXT!PAY_ACCOUNT~RECV_ACCOUNT!TEXT!RECV_ACCOUNT',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLEMENT_SEQ_NUM_CREDIT',
'CLDACCDT',
'SELECT * FROM (SELECT SETTL_SEQ_NO SETTLEMENT_SEQ_NUM_1, PAY_ACCOUNT,RECV_ACCOUNT,PAY_AC_BRANCH,RECV_AC_BRANCH  FROM CLTB_ACCOUNT_SETTL_SEQ WHERE ACCOUNT_NUMBER = ? AND BRANCH_CODE =? UNION  SELECT NULL, NULL, NULL,NULL,NULL FROM DUAL) WHERE 1 = 1',
'','SETTL_SEQ_NO!TEXT!SETTLEMENT_SEQ_NUM_1~PAY_ACCOUNT!TEXT!PAY_ACCOUNT~RECV_ACCOUNT!TEXT!RECV_ACCOUNT~PAY_AC_BRANCH!TEXT!PAY_AC_BRANCH~RECV_AC_BRANCH!TEXT!RECV_AC_BRANCH',
'STRING~STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLEMENT_SK',
'SEDBLKDL',
'select sk_location_id , sk_location_desc from setms_sk_location where record_stat=''O'' and auth_stat=''A''',
100,'SK_LOCATION_ID!TEXT!SK_LOCATION_ID~SK_LOCATION_DESC!TEXT!SK_LOCATION_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLEMENT_SK',
'SEDDLONL',
'select sk_location_id , sk_location_desc from setms_sk_location where record_stat=''O'' and auth_stat=''A''order by sk_location_id',
100,'SK_LOCATION_ID!TEXT!SK_LOCATION_ID~SK_LOCATION_DESC!TEXT!SK_LOCATION_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLEPROD',
'CLDMSTCH',
'select product_code,product_Description from cstms_product where module =''RT'' and product_type in (''OT'',''AT'')',
'','PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLEPROD',
'LEDMSTCH',
'select product_code,product_Description from cstms_product where module =''RT'' and product_type in (''OT'',''AT'')',
'','PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLEPROD',
'MODMSTCH',
'select product_code,product_Description from cstms_product where module =''RT'' and product_type in (''OT'',''AT'')',
'','PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLE_ACC',
'OTDCNONL',
'SELECT CUST_AC_NO,AC_DESC FROM STTMS_CUST_ACCOUNT WHERE BRANCH_CODE=? AND AUTH_STAT=''A'' AND RECORD_STAT=''O'' ORDER BY CUST_AC_NO',
100,'CUST_AC_NO!TEXT!CUST_AC_NO~AC_DESC!TEXT!AC_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLE_ACCOUNT',
'LDDCONON',
'SELECT AC_GL_NO, AC_GL_CCY, AC_GL_DESC, CUST_NO, BRANCH_CODE  FROM (SELECT AC_GL_NO, AC_GL_CCY, AC_GL_DESC, CUST_NO, BRANCH_CODE          FROM (SELECT AC_GL_NO, AC_GL_CCY, AC_GL_DESC, CUST_NO, BRANCH_CODE                  FROM STTBS_ACCOUNT A                 WHERE A.AC_OR_GL = ''G''                   AND A.GL_ACLASS_TYPE <> 5                   AND A.AC_GL_REC_STATUS = ''O''                   AND A.AUTH_STAT = ''A''                   AND NVL(A.BRANCH_CODE, ?) = ?                UNION             SELECT AC_GL_NO, AC_GL_CCY, AC_GL_DESC, CUST_NO, BRANCH_CODE                  FROM STTBS_ACCOUNT A, STTMS_ACCOUNT_CLASS B                 WHERE A.AC_OR_GL = ''A''                   AND A.AC_GL_REC_STATUS = ''O''                   AND A.AUTH_STAT = ''A''                   AND B.AC_CLASS_TYPE NOT IN ''Y''                   AND A.AC_CLASS = B.ACCOUNT_CLASS                   AND NVL(A.BRANCH_CODE, ?) = ?)) WHERE 1 = 1 ORDER BY DECODE(NVL(AC_GL_CCY, ''*''), ?, 1, 2),          DECODE(NVL(CUST_NO, ''*''), ?, 1, 2),          AC_GL_NO,          BRANCH_CODE',
200,'AC_GL_NO!TEXT!AC_GL_NO~AC_GL_CCY!TEXT!AC_GL_CCY~AC_GL_DESC!TEXT!AC_GL_DESC~CUST_NO!TEXT!CUST_NO~BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING~STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLE_ACCOUNT',
'MCDCONON',
'select ac_gl_no, ac_gl_ccy, ac_gl_desc from sttbs_account where (branch_code is not null or ac_or_gl = ''G'') and gl_aclass_type <> 5 and ac_gl_rec_status = ''O'' and auth_stat = ''A'' and NVL(branch_code,?) = ? order by decode(nvl(ac_gl_ccy,''*''),?,1,2), decode(nvl(cust_no,''*''),?,1,2), ac_gl_no,branch_code',
100,'AC_GL_NO!TEXT!AC_GL_NO~AC_GL_CCY!TEXT!AC_GL_CCY~AC_GL_DESC!TEXT!AC_GL_DESC',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLE_ACCOUNT',
'SRDCONON',
'select ac_gl_no, ac_gl_ccy, ac_gl_desc from sttbs_account where (branch_code is not null or ac_or_gl = ''G'') and gl_aclass_type <> 5 and ac_gl_rec_status = ''O'' and auth_stat = ''A'' and NVL(branch_code,?) = ? order by decode(nvl(ac_gl_ccy,''*''),?,1,2), decode(nvl(cust_no,''*''),?,1,2), ac_gl_no,branch_code',
100,'AC_GL_NO!TEXT!AC_GL_NO~AC_GL_CCY!TEXT!AC_GL_CCY~AC_GL_DESC!TEXT!AC_GL_DESC',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLE_ACCOUNT_BR',
'LDDCONON',
'select branch_code, branch_name from sttms_branch where record_stat = ''O'' and once_auth = ''Y'' order by 1',
300,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLE_ACCOUNT_BR',
'MCDCONON',
'select branch_code, branch_name from sttms_branch where record_stat = ''O'' and auth_stat = ''A''',
100,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLE_ACCOUNT_BR',
'SRDCONON',
'select branch_code, branch_name from sttms_branch where record_stat = ''O'' and auth_stat = ''A''',
100,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLE_ACC_BRANCH',
'OTDCNONL',
'SELECT BRANCH_CODE,BRANCH_NAME FROM(SELECT A.BRANCH_CODE,A.BRANCH_NAME FROM STTMS_BRANCH A WHERE A.AUTH_STAT=''A'' AND A.RECORD_STAT=''O'' AND EXISTS(SELECT 1 FROM CSVWS_PRODUCT_BRANCHES B WHERE B.PRODUCT_CODE=? AND B.BRANCH_CODE=A.BRANCH_CODE)) WHERE 1=1 ORDER BY BRANCH_CODE',
100,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLE_CCY',
'CLDISTCH',
'select ccy_code, ccy_name from CYTMS_CCY_DEFN where auth_stat = ''A'' AND record_stat = ''O''',
'','CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLE_MODE',
'CLDISTCH',
'SELECT SETTLEMENT_MODE, DESCRIPTION FROM ISTBS_MULTIMODE_LIST WHERE MODULE = ''CL''',
'','SETTLEMENT_MODE!TEXT!SETTLEMENT_MODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTLE_SEQ_NUM',
'CLDPMNT',
'(SELECT SETTL_SEQ_NO, RECV_ACCOUNT, BRANCH_CODE FROM CLTB_ACCOUNT_SETTL_SEQ WHERE ACCOUNT_NUMBER = ? AND BRANCH_CODE =?)UNION ( SELECT NULL, NULL, NULL FROM DUAL)',
'','SETTL_SEQ_NO!TEXT!SETTL_SEQ_NO~RECV_ACCOUNT!TEXT!RECV_ACCOUNT~BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTL_ACC',
'MGDSETLM',
'SELECT AC_GL_NO, AC_GL_CCY, AC_GL_DESC,NVL(BRANCH_CODE,GLOBAL.CURRENT_BRANCH) BRANCH_CODE FROM STTBS_ACCOUNT A WHERE GL_ACLASS_TYPE <> ''5'' AND AC_GL_REC_STATUS = ''O'' AND AUTH_STAT = ''A'' AND NVL(AC_GL_CCY,?)=? AND NVL(GL_STAT_DE_POST,''Y'') = ''Y'' AND EXISTS(SELECT 1 FROM STTM_BRANCH WHERE   RECORD_STAT = ''O'' AND AUTH_STAT = ''A'' AND BRANCH_CODE=NVL(A.BRANCH_CODE,GLOBAL.CURRENT_BRANCH)) ORDER BY AC_GL_NO, BRANCH_CODE',
200,'AC_GL_NO!TEXT!AC_GL_NO~BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTL_BRN',
'UDDCLEVT',
'select a.branch_code, a.branch_name from sttms_branch a where record_stat = ''O'' and auth_stat = ''A'' order by branch_code',
100,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTL_SEQ_NUM',
'CLDACCDT',
'SELECT *  FROM (SELECT SETTL_SEQ_NO SETTLEMENT_SEQ_NUM1,                PAY_ACCOUNT,                RECV_ACCOUNT,                PAY_AC_BRANCH,                RECV_AC_BRANCH           FROM CLTB_ACCOUNT_SETTL_SEQ          WHERE ACCOUNT_NUMBER = ?            AND BRANCH_CODE = ? UNION        SELECT NULL, NULL, NULL, NULL, NULL FROM DUAL) WHERE 1 = 1',
'','SETTL_SEQ_NO!TEXT!SETTLEMENT_SEQ_NUM1~PAY_ACCOUNT!TEXT!PAY_ACCOUNT~RECV_ACCOUNT!TEXT!RECV_ACCOUNT~PAY_AC_BRANCH!TEXT!PAY_AC_BRANCH~RECV_AC_BRANCH!TEXT!RECV_AC_BRANCH',
'STRING~STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETTL_SEQ_NUM',
'CLDCROLL',
'SELECT * FROM ((SELECT SETTL_SEQ_NO, PAY_ACCOUNT,RECV_ACCOUNT,PAY_AC_BRANCH,RECV_AC_BRANCH  FROM CLTB_ACCOUNT_SETTL_SEQ WHERE ACCOUNT_NUMBER = ? AND BRANCH_CODE =?)UNION ( SELECT NULL, NULL, NULL, NULL, NULL FROM DUAL)) WHERE 1=1',
'','SETTL_SEQ_NO!TEXT!SETTL_SEQ_NO~PAY_ACCOUNT!TEXT!PAY_ACCOUNT~RECV_ACCOUNT!TEXT!RECV_ACCOUNT',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETT_ACC',
'CLDPMNT',
'SELECT account_no, branch_code, ac_desc FROM stvws_account WHERE record_stat=''O'' AND ((Branch_code IS NOT NULL AND Branch_code = ? AND currency = ? AND ac_or_gl IN (''A'',''G'')) OR (ac_or_gl=''G'' AND branch_code IS NULL))',
'','ACCOUNT_NO!TEXT!ACCOUNT_NO~BRANCH_CODE!TEXT!BRANCH_CODE~AC_DESC!TEXT!AC_DESC',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETT_ACC',
'LEDPMNT',
' SELECT account_no, branch_code FROM stvws_account WHERE record_stat=''O'' AND ((Branch_code IS NOT NULL AND Branch_code = ? AND currency = ? AND ac_or_gl IN (''A'',''G'')) OR (ac_or_gl=''G'' AND branch_code IS NULL))',
'','ACCOUNT_NO!TEXT!ACCOUNT_NO~BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETT_ACC',
'LMDLIMIT',
'SELECT a.account_no, a.branch_code FROM stvws_account a WHERE a.record_stat = ''O'' AND ((a.Branch_code = DECODE(?,'''',a.Branch_code,?) AND a.ac_or_gl IN (''A'', ''G'')) OR (a.ac_or_gl = ''G'' AND a.branch_code IS NULL))',
150,'ACCOUNT_NO!TEXT!ACCOUNT_NO~BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETT_ACC',
'MODPMNT',
'','','ACCOUNT_NO!TEXT!ACCOUNT_NO~BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETT_ACC',
'UDDCLEVT',
'SELECT account_no, branch_code , ac_desc FROM stvws_account WHERE record_stat=''O'' AND ((Branch_code IS NOT NULL AND Branch_code = ? AND ac_or_gl IN (''A'',''G'')) OR (ac_or_gl=''G'' AND branch_code IS NULL)) ORDER BY account_no',
100,'ACCOUNT_NO!TEXT!ACCOUNT_NO~BRANCH_CODE!TEXT!BRANCH_CODE~AC_DESC!TEXT!AC_DESC',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETT_BRN',
'LMDLIMIT',
'select branch_code, branch_name from sttms_branch where auth_stat = ''A'' AND record_stat = ''O''',
150,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETT_CCY',
'CIDACCDT',
'select ccy_code, ccy_name from CYTMS_CCY_DEFN where auth_stat = ''A'' AND record_stat = ''O''',
50,'CCY_CODE!TEXT!CCY_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETT_CCY',
'CLDACCDT',
'select ccy_code, ccy_name from CYTMS_CCY_DEFN where auth_stat = ''A'' AND record_stat = ''O''',
50,'CCY_CODE!TEXT!CCY_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETT_CCY',
'CLDINADT',
'select ccy_code, ccy_name from CYTMS_CCY_DEFN where auth_stat = ''A'' AND record_stat = ''O''',
50,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETT_CCY',
'CLDLOTEM',
'select ccy_code, ccy_name from CYTMS_CCY_DEFN where auth_stat = ''A'' AND record_stat = ''O''',
50,'CCY_CODE!TEXT!CCY_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETT_CCY',
'LEDACCDT',
'select ccy_code, ccy_name from CYTMS_CCY_DEFN where auth_stat = ''A'' AND record_stat = ''O''',
50,'CCY_CODE!TEXT!CCY_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETT_CCY',
'LSDTRONL',
'select ccy_code, ccy_name from CYTMS_CCY_DEFN where auth_stat = ''A'' AND record_stat = ''O''',
50,'CCY_CODE!TEXT!CCY_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SETT_CCY',
'MODACCDT',
'',50,'CCY_CODE!TEXT!CCY_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SET_ACC',
'STCCUSBL',
'select branch_code,cust_ac_no,ac_desc,ccy from sttms_cust_account where (record_stat=''O'' and auth_stat=''A'') or (cust_ac_no = ? and branch_code= GLOBAL.CURRENT_BRANCH)',
40,'BRANCH_CODE!TEXT!BRANCH_CODE~CUST_AC_NO!TEXT!CUST_AC_NO~CCY!TEXT!CCY',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SHAREHOLDER',
'STDCCIF',
'Select customer_no,customer_name1 from sttms_customer where auth_stat = ''A'' and record_stat = ''O'' and customer_type=''I'' and customer_no not in ( select shareholder_id from STTMS_CUST_SHAREHOLDER where customer_no = ? ) order by customer_no',
100,'CUSTOMER_NO!TEXT!CUSTOMER_NO~CUSTOMER_NAME1!TEXT!CUSTOMER_NAME1',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SHAREHOLDER',
'STDCIF',
'Select customer_no,customer_name1 from sttms_customer where auth_stat = ''A'' and record_stat = ''O'' and customer_type=''I'' and customer_no not in ( select shareholder_id from STTMS_CUST_SHAREHOLDER where customer_no = ? ) order by customer_no',
100,'CUSTOMER_NO!TEXT!CUSTOMER_NO~CUSTOMER_NAME1!TEXT!CUSTOMER_NAME1',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SHAREHOLDER',
'STDCOCIF',
'Select customer_no,customer_name1 from sttms_customer where auth_stat = ''A'' and record_stat = ''O'' and customer_type=''I'' and customer_no not in ( select shareholder_id from STTMS_CUST_SHAREHOLDER where customer_no = ? ) order by customer_no',
100,'CUSTOMER_NO!TEXT!CUSTOMER_NO~CUSTOMER_NAME1!TEXT!CUSTOMER_NAME1',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SHORT_OVG_GL',
'DEDTVSET',
'select gl_code, gl_desc from gltms_glmaster where type=''5'' and auth_stat=''A'' and record_stat = ''O'' and leaf = ''Y'' order by gl_code',
100,'GL_CODE!TEXT!gl_code~GL_DESC!TEXT!gl_desc',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SIGID',
'SVCACSIG',
'SELECT CIF_SIG_ID, CIF_SIG_NAME  FROM svtms_cif_sig_master WHERE CIF_ID = ?',
'','CIF_SIG_ID!TEXT!~CIF_SIG_NAME!TEXT!',
'VARCHAR~VARCHAR',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SIGTYPE',
'SVCACSIG',
'select value from lmtms_type_values where type = ''ACC_SIG_TYPE''',
'','VALUE!TEXT!',
'VARCHAR',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SIG_ID',
'SVCACSIG',
'SELECT CIF_SIG_ID,CIF_SIG_NAME FROM SVVWS_CIF_SIG_MASTER WHERE  CIF_ID=? AND CIF_SIG_ID NOT IN (SELECT CIF_SIG_ID FROM SVVWS_ACC_SIG_DET WHERE ACC_NO=? AND nvl(RECORD_STAT,''0'')<>''D'') AND nvl(RECORD_STAT,''0'')<>''D''',
100,'CIF_SIG_ID!TEXT!CIF_SIG_ID~CIF_SIG_NAME!TEXT!CIF_SIG_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SIG_ID',
'SVCJRSIG',
'SELECT CIF_SIG_ID,CIF_SIG_NAME FROM SVTMS_ACC_SIG_DET WHERE' || chr(10) || '               BRANCH = ? AND ACC_NO = ? AND RECORD_STAT <> ''D''',
100,'CIF_SIG_ID!TEXT!CIF_SIG_ID~CIF_SIG_NAME!TEXT!CIF_SIG_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SIG_TYPE',
'SVCACSIG',
'select value from lmtms_type_values where type = ''ACC_SIG_TYPE''',
100,'VALUE!TEXT!VALUE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SIG_TYPE',
'SVCJRSIG',
'select value from lmtms_type_values where type = ''ACC_SIG_TYPE''',
100,'VALUE!TEXT!VALUE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SKACC',
'SEDBLONL',
'select sk_account from (select sk_location_account sk_account from setbs_pfolio_skacbalances where sk_location_id = ? and portfolio_id = ? and security_id = ? and branch_code =  global.current_branch and security_form_code = ?)where 1=1 order by sk_account',
25,'SK_ACCOUNT!TEXT!SK_ACCOUNT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SKACC',
'SRCRPBLK',
'select distinct b.sk_location_account from setms_sk_account a,setbs_pfolio_skacbalances b where a.sk_location_id = ? and a.sk_account = b.sk_location_account and b.portfolio_id =? and b.security_id = ? and b.sk_location_id = ?',
100,'SK_LOCATION_ACCOUNT!TEXT!SK_LOCATION_ACCOUNT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SKACCOUNT',
'SEDPFONL',
'SELECT SK_LOCATION_ID, SK_ACCOUNT FROM SETMS_SK_ACCOUNT WHERE SK_LOCATION_ID = ? AND SK_ACCOUNT NOT IN(SELECT NVL(SK_ACCOUNT, ''#$'') FROM SETBS_PORTFOLIO_SK_MAPPING WHERE PORTFOLIO_ID = ? AND SK_LOCATION_ID = ? )ORDER BY SK_ACCOUNT',
100,'SK_LOCATION_ID!TEXT!SK_LOCATION_ID~SK_ACCOUNT!TEXT!SK_ACCOUNT',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SKACCOUNT_FROM',
'SEDDLONL',
'select sk_account from setbs_portfolio_sk_mapping where portfolio_id = ? and sk_location_id = ?  order by sk_account',
100,'SK_ACCOUNT!TEXT!SK_ACCOUNT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SKACCOUNT_TO',
'SEDDLONL',
'select sk_account from setbs_portfolio_sk_mapping where portfolio_id = ? and sk_location_id = ?  order by sk_account',
100,'SK_ACCOUNT!TEXT!SK_ACCOUNT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SKL',
'SEDPFONL',
'SELECT SK_LOCATION_ID,SK_LOCATION_DESC,BANKERS_ACCEPTANCE FROM SETMS_SK_LOCATION A WHERE NVL(A.BANKERS_ACCEPTANCE,''N'') = ? AND A.AUTH_STAT =''A'' AND A.RECORD_STAT =''O'' AND ONCE_AUTH=''Y'' AND EXISTS (SELECT 1 FROM SETMS_SK_ACCOUNT B WHERE B.SK_LOCATION_ID = A.SK_LOCATION_ID AND B.SK_ACCOUNT NOT IN (SELECT SK_ACCOUNT FROM SETBS_PORTFOLIO_SK_MAPPING C WHERE C.PORTFOLIO_ID = ? AND C.SK_LOCATION_ID = A.SK_LOCATION_ID)) ORDER BY 1',
100,'SK_LOCATION_ID!TEXT!SK_LOCATION_ID~SK_LOCATION_DESC!TEXT!SK_LOCATION_DESC~BANKERS_ACCEPTANCE!TEXT!BANKERS_ACCEPTANCE',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SKLOC',
'SEDMKTCD',
'SELECT SK_LOCATION_ID,SK_LOCATION_DESC FROM SETMS_SK_LOCATION where record_stat = ''O'' and once_auth=''Y'' ORDER BY SK_LOCATION_ID',
100,'SK_LOCATION_ID!TEXT!SK_LOCATION_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SKLOCATION',
'SEDBLONL',
'select distinct sk_location_id, sk_location_desc from (select distinct a.sk_location_id, a.sk_location_desc from setms_sk_location a, setbs_pfolio_skacbalances b where a.sk_location_id = b.sk_location_id and b.portfolio_id = ? and b.security_id = ? and b.branch_code = global.current_branch and b.security_form_code = ? and a.record_stat=''O'' and a.auth_stat=''A'')where 1=1 order by sk_location_id',
25,'SK_LOCATION_ID!TEXT!SK_LOCATION_ID~SK_LOCATION_DESC!TEXT!SK_LOCATION_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SKLOCATION_FROM',
'SEDDLONL',
'SELECT sk_location_id , sk_location_desc from ( select distinct (a.sk_location_id), b.sk_location_desc from setbs_portfolio_sk_mapping a, setms_sk_location b where a.portfolio_id =? and a.sk_location_id = b.sk_location_id and b.record_stat=''O'' and b.auth_stat=''A'') where 1 = 1',
100,'SK_LOCATION_ID!TEXT!SK_LOCATION_ID~SK_LOCATION_DESC!TEXT!SK_LOCATION_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SKLOCATION_TO',
'SEDDLONL',
'select sk_location_id , sk_location_desc from ( select distinct(a.sk_location_id), b.sk_location_desc from setbs_portfolio_sk_mapping a, setms_sk_location b where a.portfolio_id = ? and a.sk_location_id = b.sk_location_id and b.record_stat=''O'' and b.auth_stat=''A'' ) where 1 = 1',
100,'SK_LOCATION_ID!TEXT!SK_LOCATION_ID~SK_LOCATION_DESC!TEXT!SK_LOCATION_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SKLOCFRM',
'SEDSKONL',
'select a.sk_location_id,a.sk_location_desc from setms_sk_location a where a.record_stat=''O'' and a.auth_stat=''A'' and a.sk_location_id in (select b.sk_location_id from setbs_pfolio_skacbalances b where b.branch_code = global.current_branch and a.sk_location_id = b.sk_location_id and (nvl(b.current_position,0) - ( nvl(b.current_balance_blocked, 0) + nvl (b.unauth_released_block, 0) + nvl (b.unauth_buy_position, 0) + nvl (b.unauth_lodge_position, 0))) > 0)',
100,'SK_LOCATION_ID!TEXT!SK_LOCATION_ID~SK_LOCATION_DESC!TEXT!SK_LOCATION_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SKLOCID',
'SRCRPBLK',
'select distinct b.sk_location_id from setms_sk_location a ,setbs_pfolio_skacbalances b where a.record_stat =''O'' and a.auth_stat = ''A'' and a.sk_location_id =b.sk_location_id and b.portfolio_id = ?and b.security_id = ?',
100,'SK_LOCATION_ID!TEXT!SK_LOCATION_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SK_ACCOUNT',
'SEDDLPRD',
'SELECT SK_ACCOUNT FROM SETBS_PORTFOLIO_SK_MAPPING WHERE PORTFOLIO_ID = ? AND SK_LOCATION_ID = ?',
'','SK_ACCOUNT!TEXT!',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SK_ACCOUNT_FROM',
'SEDDLPRD',
'SELECT SK_ACCOUNT FROM SETBS_PORTFOLIO_SK_MAPPING WHERE PORTFOLIO_ID = ? AND SK_LOCATION_ID = ?',
'','SK_ACCOUNT!TEXT!',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SK_ACCOUNT_FROM_MULTIPLE',
'SEDBLKDL',
'select sk_account from setbs_portfolio_sk_mapping where portfolio_id = ? and sk_location_id = ?',
100,'SK_ACCOUNT!TEXT!SK_ACCOUNT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SK_ACCOUNT_FROM_SINGLE',
'SEDBLKDL',
'select sk_account from setbs_portfolio_sk_mapping where portfolio_id = ? and sk_location_id = ?',
100,'SK_ACCOUNT!TEXT!SK_ACCOUNT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SK_ACCOUNT_TO',
'SEDDLPRD',
'SELECT SK_ACCOUNT FROM SETBS_PORTFOLIO_SK_MAPPING WHERE PORTFOLIO_ID = ? AND SK_LOCATION_ID = ?',
'','SK_ACCOUNT!TEXT!',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SK_FROM_LOCATION_MULTIPLE',
'SEDBLKDL',
'select distinct (a.sk_location_id), b.sk_location_desc from setbs_portfolio_sk_mapping a, setms_sk_location b where a.portfolio_id = ? and a.sk_location_id = b.sk_location_id and b.record_stat=''O'' and b.auth_stat=''A''',
100,'SK_LOCATION_ID!TEXT!SK_LOCATION_ID~SK_LOCATION_DESC!TEXT!SK_LOCATION_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SK_FROM_LOCATION_SINGLE',
'SEDBLKDL',
'select distinct (a.sk_location_id), b.sk_location_desc from setbs_portfolio_sk_mapping a, setms_sk_location b where a.portfolio_id = ? and a.sk_location_id = b.sk_location_id and b.record_stat=''O'' and b.auth_stat=''A''',
100,'SK_LOCATION_ID!TEXT!SK_LOCATION_ID~SK_LOCATION_DESC!TEXT!SK_LOCATION_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SK_LOCATION',
'SEDDLPRD',
'SELECT DISTINCT (A.SK_LOCATION_ID), B.SK_LOCATION_DESC FROM SETBS_PORTFOLIO_SK_MAPPING A, SETMS_SK_LOCATION B WHERE A.PORTFOLIO_ID = ? AND A.SK_LOCATION_ID = B.SK_LOCATION_ID AND B.RECORD_STAT = ''O'' AND B.ONCE_AUTH = ''Y''',
'','SK_LOCATION_ID!TEXT!~SK_LOCATION_DESC!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SK_LOCATION_FROM',
'SEDDLPRD',
'SELECT DISTINCT (A.SK_LOCATION_ID), B.SK_LOCATION_DESC FROM SETBS_PORTFOLIO_SK_MAPPING A, SETMS_SK_LOCATION B WHERE A.PORTFOLIO_ID = ? AND A.SK_LOCATION_ID = B.SK_LOCATION_ID AND B.RECORD_STAT = ''O'' AND B.ONCE_AUTH = ''Y''',
'','SK_LOCATION_ID!TEXT!~SK_LOCATION_DESC!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SK_LOCATION_TO',
'SEDDLPRD',
'SELECT DISTINCT (A.SK_LOCATION_ID), B.SK_LOCATION_DESC FROM SETBS_PORTFOLIO_SK_MAPPING A,SETMS_SK_LOCATION B WHERE A.PORTFOLIO_ID = ? AND A.SK_LOCATION_ID = B.SK_LOCATION_ID AND B.RECORD_STAT = ''O'' AND B.ONCE_AUTH = ''Y''',
'','SK_LOCATION_ID!TEXT!~SK_LOCATION_DESC!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SK_LOCTO',
'SEDSKONL',
'select sk_location_id,sk_location_desc from setms_sk_location where record_stat=''O'' and auth_stat=''A'' order by sk_location_id',
100,'SK_LOCATION_ID!TEXT!SK_LOCATION_ID~SK_LOCATION_DESC!TEXT!SK_LOCATION_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR1',
'CLDACCDT',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR1',
'CLDCROLL',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR1',
'CLDLOTEM',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR1',
'CLDMDSBR',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR1',
'CLDPMNT',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR1',
'CLDSWMSG',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR1',
'ISCONDET',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR1',
'LEDACCDT',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR1',
'MODACCDT',
'',100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR2',
'CLDACCDT',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR2',
'CLDCROLL',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR2',
'CLDLOTEM',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR2',
'CLDMDSBR',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR2',
'CLDPMNT',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR2',
'CLDSWMSG',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR2',
'ISCONDET',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR2',
'LEDACCDT',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR2',
'MODACCDT',
'',100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR3',
'CLDACCDT',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR3',
'CLDCROLL',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR3',
'CLDLOTEM',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR3',
'CLDMDSBR',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR3',
'CLDPMNT',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR3',
'CLDSWMSG',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR3',
'ISCONDET',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR3',
'LEDACCDT',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR3',
'MODACCDT',
'',100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR4',
'CLDACCDT',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR4',
'CLDCROLL',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR4',
'CLDLOTEM',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR4',
'CLDMDSBR',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR4',
'CLDPMNT',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR4',
'CLDSWMSG',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR4',
'ISCONDET',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR4',
'LEDACCDT',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR4',
'MODACCDT',
'',100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR5',
'CLDACCDT',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR5',
'CLDCROLL',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR5',
'CLDLOTEM',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR5',
'CLDMDSBR',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR5',
'CLDPMNT',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR5',
'CLDSWMSG',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR5',
'ISCONDET',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR5',
'LEDACCDT',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR5',
'MODACCDT',
'',100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR6',
'CLDACCDT',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR6',
'CLDCROLL',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR6',
'CLDLOTEM',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR6',
'CLDMDSBR',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR6',
'CLDPMNT',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR6',
'CLDSWMSG',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR6',
'ISCONDET',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR6',
'LEDACCDT',
'select tag_name,tag_description from istbs_sndr_rcvr_tags where transfer_type = ?',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SNDR_RCVR6',
'MODACCDT',
'',100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE',
'CNDCOLIN',
'SELECT  SOURCE_CODE  FROM COTM_SOURCE WHERE once_auth=''Y'' and record_stat=''O''',
'','SOURCE_CODE!TEXT!',
'VARCHAR2',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE',
'EDDLQONL',
'SELECT SOURCE_CODE,SOURCE_DESC FROM COTMS_SOURCE ORDER BY SOURCE_CODE',
100,'SOURCE_CODE!TEXT!SOURCE_CODE~SOURCE_DESC!TEXT!SOURCE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE',
'EDDLSONL',
'SELECT SOURCE_CODE,SOURCE_DESC FROM COTMS_SOURCE ORDER BY 1',
200,'SOURCE_CODE!TEXT!SOURCE_CODE~SOURCE_DESC!TEXT!SOURCE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE',
'IDDACSAL',
'select source_code, source_desc  from cotms_source where auth_stat = ''A'' and record_stat =''O'' order by source_code',
100,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE',
'ISDSRCMD',
'SELECT SOURCE_CODE,SOURCE_DESC FROM(SELECT ''FLEXCUBE'' SOURCE_CODE,''FLEXCUBE'' SOURCE_DESC FROM COTMS_SOURCE UNION SELECT SOURCE_CODE, SOURCE_DESC FROM COTMS_SOURCE WHERE  ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O'') WHERE 1=1 ORDER BY 1',
200,'SOURCE_CODE!TEXT!SOURCE_CODE~SOURCE_DESC!TEXT!SOURCE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE',
'LDDCONON',
'Select source_code from cotms_source_pref where module_code = ''LD'' and once_auth = ''Y'' and record_stat = ''O'' order by 1',
200,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE',
'MCDCONON',
'Select source_code from cotms_source_pref where module_code = ''MC'' and auth_stat = ''A'' and record_stat = ''O''',
100,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE',
'OTDCNONL',
'SELECT SOURCE_CODE,SOURCE_DESC FROM COTMS_SOURCE WHERE AUTH_STAT=''A'' AND RECORD_STAT=''O'' ORDER BY SOURCE_CODE',
100,'SOURCE_CODE!TEXT!SOURCE_CODE~SOURCE_DESC!TEXT!SOURCE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE',
'PCDCUSST',
'SELECT SOURCE_CODE,SOURCE_DESC FROM PCTMS_UPLOAD_SOURCE  WHERE RECORD_STAT=''O'' AND ONCE_AUTH=''Y'' ORDER BY SOURCE_CODE',
100,'SOURCE_CODE!TEXT!SOURCE_CODE~SOURCE_DESC!TEXT!SOURCE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE',
'PCDUPLDT',
'SELECT * FROM (SELECT ''ALL'' SOURCE_CODE , ''ALL'' SOURCE_DESC FROM DUAL UNION SELECT SOURCE_CODE, SOURCE_DESC FROM PCTMS_UPLOAD_SOURCE WHERE ONCE_AUTH =''Y'' AND RECORD_STAT=''O'')WHERE 1=1 ORDER BY 1',
100,'SOURCE_CODE!TEXT!SOURCE_CODE~SOURCE_DESC!TEXT!SOURCE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE',
'SEDDLONL',
'select source_code, source_desc  from cotms_source where auth_stat = ''A'' and record_stat =''O'' order by source_code',
100,'SOURCE_CODE!TEXT!SOURCE_CODE~SOURCE_DESC!TEXT!SOURCE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE',
'SRDCONON',
'Select source_code from cotms_source_pref where module_code = ''SR'' and auth_stat = ''A'' and record_stat = ''O''',
100,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE_CODE',
'CODCURVT',
'select source_code,source_desc from( select source_code,source_desc from cotm_source where record_stat=''O'' and once_auth=''Y'' union select ''FLEXCUBE''AS source_code ,''FLEXCUBE'' AS source_desc from dual) WHERE 1=1 order by source_code',
100,'SOURCE_CODE!TEXT!SOURCE_CODE~SOURCE_DESC!TEXT!SOURCE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE_CODE',
'CODUPLDM',
'select source_code, source_desc from cotms_source where ONCE_AUTH  = ''Y'' and record_stat =''O'' order by source_code',
100,'SOURCE_CODE!TEXT!SOURCE_CODE~SOURCE_DESC!TEXT!SOURCE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE_CODE',
'CVDUPLOD',
'SELECT SOURCE_CODE FROM COTM_SOURCE WHERE RECORD_STAT = ''O'' AND AUTH_STAT = ''A''',
100,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE_CODE',
'DEDBTRES',
'select distinct source_code, source_desc from cotms_source where record_stat=''O'' and once_auth=''Y'' order by source_code',
500,'SOURCE_CODE!TEXT!SOURCE_CODE~SOURCE_DESC!TEXT!SOURCE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE_CODE',
'DEDUPLOD',
'select source_code ,batch_no from detbs_upload_master where branch_code = global.current_branch and record_stat=''O'' and once_auth=''Y''',
100,'SOURCE_CODE!TEXT!SOURCE_CODE~BATCH_NO!TEXT!BATCH_NO',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE_CODE',
'DEDUPLPR',
'select source_code,source_desc from cotm_source where record_stat = ''O'' and once_auth = ''Y'' order by source_code',
100,'SOURCE_CODE!TEXT!SOURCE_CODE~SOURCE_DESC!TEXT!SOURCE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE_CODE',
'FSDBICUP',
'select source_code from cotms_source_pref where module_code = ''FX'' and record_stat = ''O'' and auth_stat=''A''',
10,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE_CODE',
'FTDCONON',
'select source_code,source_desc from cotms_source where once_auth = ''Y'' order by source_code',
100,'SOURCE_CODE!TEXT!SOURCE_CODE~SOURCE_DESC!TEXT!SOURCE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE_CODE',
'PCDINSTR',
'SELECT DISTINCT SOURCE_CODE FROM (SELECT SOURCE_CODE  FROM PCTMS_UPLOAD_SOURCE_DETAIL A WHERE A.PROD_CATEGORY = ? AND NOT EXISTS (SELECT 1 FROM PCTMS_UPLOAD_SOURCE_DETAIL B WHERE A.PROD_CATEGORY = B.PROD_CATEGORY AND B.SOURCE_CODE = ''ALL'' ) UNION ALL SELECT A.SOURCE_CODE FROM PCTMS_UPLOAD_SOURCE A,PCTMS_UPLOAD_SOURCE_DETAIL B WHERE B.PROD_CATEGORY = ? AND EXISTS (SELECT 1 FROM  PCTMS_UPLOAD_SOURCE_DETAIL C WHERE  B.PROD_CATEGORY = C.PROD_CATEGORY AND C.SOURCE_CODE = ''ALL'' )) WHERE 1 = 1 ORDER BY SOURCE_CODE',
100,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE_CODE',
'PCDISMAP',
'SELECT a.source_code,b.source_desc FROM   pctmS_upload_source_detail a,       pctmS_upload_source b WHERE  a.prod_category = ? AND    a.source_code = b.source_code AND    a.record_stat = ''O''  AND    a.ONCE_AUTH =''Y'' ORDER BY 1',
100,'SOURCE_CODE!TEXT!SOURCE_CODE~SOURCE_DESC!TEXT!SOURCE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE_CODE',
'PCDMSGMT',
'select source_code from pctms_upload_source_detail where prod_category = ? order by source_code',
100,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE_OPERATION',
'STDAMDMT',
'SELECT DISTINCT (SOURCE_OPERATION) FROM GWTB_AMEND_NODES  ORDER BY SOURCE_OPERATION',
500,'SOURCE_OPERATION!TEXT!SOURCE_OPERATION',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SOURCE_REF',
'FTDCAUTH',
'SELECT SOURCE_REF_NO FROM FTTB_CONTRACT_MASTER WHERE CONTRACT_REF_NO IN (SELECT CONTRACT_REF_NO FROM CSTB_CONTRACT WHERE BRANCH = GLOBAL.CURRENT_BRANCH) AND SOURCE_REF_NO != '' '' ORDER BY SOURCE_REF_NO',
100,'SOURCE_REF_NO!TEXT!SOURCE_REF_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SP',
'SEDPFONL',
'select * from(SELECT INTERNAL_SEC_ID, SECURITY_DESCRIPTION  FROM SETMS_SECURITY_MASTER A WHERE A.AUTH_STAT = ''A'' AND A.RECORD_STAT = ''O'' AND A.ONCE_AUTH = ''Y'' AND A.INTERNAL_SEC_ID NOT IN (SELECT SP_SECURITY_ID FROM SETBS_PF_SEC_PRICE_MAPPING C WHERE C.PORTFOLIO_ID = ?) ORDER BY A.INTERNAL_SEC_ID) where rownum <=100',
100,'INTERNAL_SEC_ID!TEXT!INTERNAL_SEC_ID~SECURITY_DESCRIPTION!TEXT!SECURITY_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SPLACC',
'LEDACCDT',
'select ACCOUNT_NO,BRANCH_CODE,AC_DESC,CUSTOMER_NO,CURRENCY,AC_CLASS  from STVWS_ACCOUNT where BRANCH_CODE is not null and BRANCH_CODE = nvl(?,BRANCH_CODE) and CURRENCY = ? and RECORD_STAT=''O''',
50,'ACCOUNT_NO!TEXT!ACCOUNT_NO~BRANCH_CODE!TEXT!BRANCH_CODE~AC_DESC!TEXT!AC_DESC~CUSTOMER_NO!TEXT!CUSTOMER_NO~CURRENCY!TEXT!CURRENCY',
'STRING~STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SPLBRN',
'LEDACCDT',
'select branch_code, branch_name from sttms_branch where auth_stat = ''A'' AND record_stat = ''O'' ORDER BY BRANCH_CODE',
50,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SPLIT_ACC_CUST',
'PCCACENT',
'select     AC_GL_NO,    DECODE(BRANCH_CODE,'''',GLOBAL.CURRENT_BRANCH,BRANCH_CODE),    DECODE(AC_GL_CCY,'''',GLOBAL.LCY,AC_GL_CCY),(select b.clearing_ac_no from sttms_clg_ac_no b where b.gl_ac_no = ac_gl_no),(select b.IBAN_ac_no from sttms_clg_ac_no b where b.gl_ac_no =AC_GL_NO)    from STTBS_ACCOUNT where nvl(BRANCH_CODE,GLOBAL.CURRENT_BRANCH) IN (Select a.branch_code from sttms_branch a, sttms_branch b where  b.branch_code = GLOBAL.CURRENT_BRANCH and a.country_code = b.country_code  and a.branch_lcy = b.branch_lcy) and ac_or_gl = ''G'' and AC_GL_REC_STATUS=''O'' and ac_gl_no not in (select ac_no from  pctbs_contract_split_details) and gl_category IN (''1'',''2'',''3'',''4'') and gl_aclass_type <> ''5'' and Nvl(gl_stat_de_post,''N'') = ''Y''  order by AC_GL_NO',
100,'AC_GL_NO!TEXT!AC_GL_NO~DECODE(BRANCH_CODE,,GLOBAL.CURRENT_BRANCH,BRANCH_CODE)!TEXT!DECODE(BRANCH_CODE,,GLOBAL.CURRENT_BRANCH,BRANCH_CODE)~DECODE(AC_GL_CCY,,GLOBAL.LCY,AC_GL_CCY)!TEXT!DECODE(AC_GL_CCY,,GLOBAL.LCY,AC_GL_CCY)~(SELECTB.CLEARING_AC_NOFROMSTTMS_CLG_AC_NOBWHEREB.GL_AC_NO=AC_GL_NO)!TEXT!(SELECTB.CLEARING_AC_NOFROMSTTMS_CLG_AC_NOBWHEREB.GL_AC_NO=AC_GL_NO)~(SELECTB.IBAN_AC_NOFROMSTTMS_CLG_AC_NOBWHEREB.GL_AC_NO=AC_GL_NO)!TEXT!(SELECTB.IBAN_AC_NOFROMSTTMS_CLG_AC_NOBWHEREB.GL_AC_NO=AC_GL_NO)',
'STRING~STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SPLIT_ACC_CUST',
'PCCEVNTS',
'select     AC_GL_NO,    DECODE(BRANCH_CODE,'''',GLOBAL.CURRENT_BRANCH,BRANCH_CODE),    DECODE(AC_GL_CCY,'''',GLOBAL.LCY,AC_GL_CCY),(select b.clearing_ac_no from sttms_clg_ac_no b where b.gl_ac_no = ac_gl_no),(select b.IBAN_ac_no from sttms_clg_ac_no b where b.gl_ac_no =AC_GL_NO)    from STTBS_ACCOUNT where nvl(BRANCH_CODE,GLOBAL.CURRENT_BRANCH) IN (Select a.branch_code from sttms_branch a, sttms_branch b where  b.branch_code = GLOBAL.CURRENT_BRANCH and a.country_code = b.country_code  and a.branch_lcy = b.branch_lcy) and ac_or_gl = ''G'' and AC_GL_REC_STATUS=''O'' and ac_gl_no not in (select ac_no from  pctbs_contract_split_details) and gl_category IN (''1'',''2'',''3'',''4'') and gl_aclass_type <> ''5'' and Nvl(gl_stat_de_post,''N'') = ''Y''  order by AC_GL_NO',
100,'AC_GL_NO!TEXT!AC_GL_NO~DECODE(BRANCH_CODE,,GLOBAL.CURRENT_BRANCH,BRANCH_CODE)!TEXT!DECODE(BRANCH_CODE,,GLOBAL.CURRENT_BRANCH,BRANCH_CODE)~DECODE(AC_GL_CCY,,GLOBAL.LCY,AC_GL_CCY)!TEXT!DECODE(AC_GL_CCY,,GLOBAL.LCY,AC_GL_CCY)~(SELECTB.CLEARING_AC_NOFROMSTTMS_CLG_AC_NOBWHEREB.GL_AC_NO=AC_GL_NO)!TEXT!(SELECTB.CLEARING_AC_NOFROMSTTMS_CLG_AC_NOBWHEREB.GL_AC_NO=AC_GL_NO)~(SELECTB.IBAN_AC_NOFROMSTTMS_CLG_AC_NOBWHEREB.GL_AC_NO=AC_GL_NO)!TEXT!(SELECTB.IBAN_AC_NOFROMSTTMS_CLG_AC_NOBWHEREB.GL_AC_NO=AC_GL_NO)',
'STRING~STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SPLIT_ACC_CUST',
'PCDFTONL',
'select     AC_GL_NO,    DECODE(BRANCH_CODE,'''',GLOBAL.CURRENT_BRANCH,BRANCH_CODE),    DECODE(AC_GL_CCY,'''',GLOBAL.LCY,AC_GL_CCY),(select b.clearing_ac_no from sttms_clg_ac_no b where b.gl_ac_no = ac_gl_no),(select b.IBAN_ac_no from sttms_clg_ac_no b where b.gl_ac_no =AC_GL_NO)    from STTBS_ACCOUNT where nvl(BRANCH_CODE,GLOBAL.CURRENT_BRANCH) IN (Select a.branch_code from sttms_branch a, sttms_branch b where  b.branch_code = GLOBAL.CURRENT_BRANCH and a.country_code = b.country_code  and a.branch_lcy = b.branch_lcy) and ac_or_gl = ''G'' and AC_GL_REC_STATUS=''O'' and ac_gl_no not in (select ac_no from  pctbs_contract_split_details) and gl_category IN (''1'',''2'',''3'',''4'') and gl_aclass_type <> ''5'' and Nvl(gl_stat_de_post,''N'') = ''Y''  order by AC_GL_NO',
100,'AC_GL_NO!TEXT!AC_GL_NO~DECODE(BRANCH_CODE,,GLOBAL.CURRENT_BRANCH,BRANCH_CODE)!TEXT!DECODE(BRANCH_CODE,,GLOBAL.CURRENT_BRANCH,BRANCH_CODE)~DECODE(AC_GL_CCY,,GLOBAL.LCY,AC_GL_CCY)!TEXT!DECODE(AC_GL_CCY,,GLOBAL.LCY,AC_GL_CCY)',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SPLIT_ACC_CUST',
'PCDONONL',
'select     AC_GL_NO,    DECODE(BRANCH_CODE,'''',GLOBAL.CURRENT_BRANCH,BRANCH_CODE),    DECODE(AC_GL_CCY,'''',GLOBAL.LCY,AC_GL_CCY),(select b.clearing_ac_no from sttms_clg_ac_no b where b.gl_ac_no = ac_gl_no),(select b.IBAN_ac_no from sttms_clg_ac_no b where b.gl_ac_no =AC_GL_NO)    from STTBS_ACCOUNT where nvl(BRANCH_CODE,GLOBAL.CURRENT_BRANCH) IN (Select a.branch_code from sttms_branch a, sttms_branch b where  b.branch_code = GLOBAL.CURRENT_BRANCH and a.country_code = b.country_code  and a.branch_lcy = b.branch_lcy) and ac_or_gl = ''G'' and AC_GL_REC_STATUS=''O'' and ac_gl_no not in (select ac_no from  pctbs_contract_split_details) and gl_category IN (''1'',''2'',''3'',''4'') and gl_aclass_type <> ''5'' and Nvl(gl_stat_de_post,''N'') = ''Y''  order by AC_GL_NO',
100,'AC_GL_NO!TEXT!AC_GL_NO~DECODE(BRANCH_CODE,,GLOBAL.CURRENT_BRANCH,BRANCH_CODE)!TEXT!DECODE(BRANCH_CODE,,GLOBAL.CURRENT_BRANCH,BRANCH_CODE)~DECODE(AC_GL_CCY,,GLOBAL.LCY,AC_GL_CCY)!TEXT!DECODE(AC_GL_CCY,,GLOBAL.LCY,AC_GL_CCY)',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SPL_ISTR',
'SIDDIARY',
'SELECT INSTRUCTION_TYPE FROM SITM_INSTR_TYPE WHERE RECORD_STAT=''O'' AND AUTH_STAT=''A''',
100,'INSTRUCTION_TYPE!TEXT!INSTRUCTION_TYPE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SR_CLASS',
'SEDDLPRD',
'SELECT CLASS_CODE, CLASS_DESCRIPTION FROM CSTMS_CLASS WHERE CLASS_TYPE = ''SR'' AND RECORD_STAT = ''O'' AND ONCE_AUTH =''Y'' AND MODULE = ''SD'' ORDER BY CLASS_CODE',
'','CLASS_CODE!TEXT!~CLASS_DESCRIPTION!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_START_GL',
'GLRPBAL',
'select gl_code, gl_desc from gltms_glmaster where record_stat = ''O'' and ONCE_AUTH = ''Y''   order by 1',
100,'GL_CODE!TEXT!GL_CODE~GL_DESC!TEXT!GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_START_LOCATION',
'OTDCNONL',
'SELECT CLEARING_HOUSE,CLEARING_HOUSE_DESCRIPTION FROM STTMS_CLG_DEFN WHERE AUTH_STAT=''A'' AND RECORD_STAT=''O'' ORDER BY CLEARING_HOUSE',
100,'CLEARING_HOUSE!TEXT!CLEARING_HOUSE~CLEARING_HOUSE_DESCRIPTION!TEXT!CLEARING_HOUSE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STAT',
'LDDPRVMN',
'select distinct status_code, descr,STATUS_TYPE' || chr(10) || '  from (select distinct status_code, descr,STATUS_TYPE' || chr(10) || '          from STVW_CONTRACT_STATUSES' || chr(10) || '         where status_type in (''C'', ''A'',''B'')' || chr(10) || '           and once_auth = ''Y''' || chr(10) || '           and record_stat = ''O'')' || chr(10) || ' where 1 = 1' || chr(10) || ' order by status_code',
100,'STATUS_CODE!TEXT!STATUS_CODE~DESCR!TEXT!DESCR~STATUS_TYPE!TEXT!STATUS_TYPE',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATEMENT_ACCOUNT',
'STDCUSAC',
'SELECT CUST_AC_NO FROM STTMS_CUST_ACCOUNT WHERE BRANCH_CODE = GLOBAL.CURRENT_BRANCH  AND STATEMENT_ACCOUNT IS NULL AND CUST_AC_NO NOT IN (?)',
100,'CUST_AC_NO!TEXT!CUST_AC_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATION_ID',
'PCDISMAP',
'SELECT station_id, station_desc FROM pctmS_cust_station WHERE source_code = ? AND record_stat = ''O'' AND ONCE_AUTH= ''Y'' ORDER BY 1',
100,'STATION_ID!TEXT!STATION_ID~STATION_DESC!TEXT!STATION_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATION_ID',
'PCDMSGMT',
'select station_id,station_desc from pctms_cust_station where source_code =? and auth_stat = ''A'' and record_stat = ''O'' order by station_id',
100,'STATION_ID!TEXT!STATION_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS',
'BCDPRMNT',
'select status_code, description,status_seq from    sttms_contract_statuses where status_type in (''B'',''C'') and    record_stat = ''O'' and ONCE_AUTH= ''Y'' ',
'','','','','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS',
'CLDISTCH',
'SELECT DISTINCT(P.STATUS_CODE) NEW_STATUS FROM CLTM_PRODUCT_INSTALL_STATUS P,CLTB_ACCOUNT_MASTER A WHERE A.PRODUCT_CODE=P.PRODUCT_CODE AND P.STATUS_CODE<>? AND P.COMPONENT_NAME=? AND A.ACCOUNT_NUMBER=?',
'','NEW_STATUS!TEXT!STATUS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS',
'CLDPRMNT',
'SELECT status_code,description	FROM sttm_contract_statuses WHERE status_type IN (''A'',''B'') AND record_stat = ''O'' AND auth_stat   = ''A''',
100,'STATUS_CODE!TEXT!STATUS_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS',
'GIRFILOG',
'SELECT DISTINCT STATUS FROM GIVW_INTERFACE_PKEY_MASTER WHERE INTERFACE_CODE = ?',
100,'STATUS!TEXT!STATUS',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS',
'ICDPRMNT',
'SELECT STATUS_CODE, DESCRIPTION FROM STTM_CONTRACT_STATUSES WHERE STATUS_CODE != ''NORM'' AND STATUS_TYPE IN (''A'',''B'') AND ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O''',
100,'STATUS_CODE!TEXT!STATUS_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS',
'LDDCONON',
'select status, description from(select a.status, b.description from cstms_product_status_master a , sttms_contract_statuses b where a.product = ?  and a.status = b.status_code and b.status_type in (''C'',''B'')and b.once_auth = ''Y'' and b.record_stat = ''O'')where 1=1 order by status',
100,'STATUS!TEXT!STATUS~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS',
'MCDCONON',
'select status, description from(select a.status, b.description from cstms_product_status_master a , sttms_contract_statuses b where a.product = ?  and a.status = b.status_code and b.status_type in (''C'',''B'')and b.auth_stat = ''A'' and b.record_stat = ''O'')where 1=1 order by status',
100,'STATUS!TEXT!STATUS~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS',
'MCDPRMNT',
'select status_code, description,status_seq from sttms_contract_statuses where STATUS_TYPE in (''B'',''C'') AND record_stat = ''O'' and auth_stat = ''A'' and status_code <> ''NORM'' and status_code not in (select status from cstms_product_status_master where product = ?) Order By status_code',
100,'STATUS_CODE!TEXT!STATUS_CODE~DESCRIPTION!TEXT!DESCRIPTION~STATUS_SEQ!TEXT!STATUS_SEQ',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS',
'MMDPRMNT',
'select status_code, description,status_seq from sttms_contract_statuses where STATUS_TYPE in (''B'',''C'') AND record_stat = ''O'' and auth_stat = ''A'' and status_code <> ''NORM'' and status_code not in (select status from cstms_product_status_master where product = ?)',
100,'STATUS_CODE!TEXT!STATUS_CODE~DESCRIPTION!TEXT!DESCRIPTION~STATUS_SEQ!TEXT!STATUS_SEQ',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS',
'SRDCONON',
'select status, description from(select a.status, b.description from cstms_product_status_master a , sttms_contract_statuses b where a.product = ?  and a.status = b.status_code and b.status_type in (''C'',''B'')and b.auth_stat = ''A'' and b.record_stat = ''O'')where 1=1 order by status',
100,'STATUS!TEXT!STATUS~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS',
'SRDPRMNT',
'select status_code, description,status_seq from sttms_contract_statuses where STATUS_TYPE in (''B'',''C'') AND record_stat = ''O'' and auth_stat = ''A'' and status_code <> ''NORM'' and status_code not in (select status from cstms_product_status_master where product = ?)',
100,'STATUS_CODE!TEXT!STATUS_CODE~DESCRIPTION!TEXT!DESCRIPTION~STATUS_SEQ!TEXT!STATUS_SEQ',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS',
'STDACCLS',
'Select status_code, description from STTM_CONTRACT_STATUSES WHERE STATUS_TYPE IN (''A'', ''B'') AND record_stat =''O'' AND auth_stat = ''A'' and instr(?,''@'' || status_code || ''@'') = 0 order by status_code',
100,'STATUS_CODE!TEXT!STATUS_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS',
'STDCUSAC',
'Select status_code, description from STTM_CONTRACT_STATUSES WHERE STATUS_TYPE IN (''A'',''B'') AND status_code NOT IN(Select STATUS	from  sttm_accstat_replines_detail 		where branch_code = ? and cust_ac_no = ?) AND record_stat = ''O'' AND auth_stat   = ''A''',
100,'STATUS_CODE!TEXT!STATUS_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS1',
'STDACCLS',
'SELECT status_code, status_seq FROM sttms_contract_statuses  WHERE status_type IN (''B'',''A'') and record_stat = ''O'' AND       auth_stat = ''A'' order by status_code',
100,'STATUS_CODE!TEXT!STATUS_CODE~STATUS_SEQ!TEXT!STATUS_SEQ',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS2',
'STDACCLS',
'SELECT b.status_code,b.status_seq FROM sttms_contract_statuses b WHERE b.status_type IN (''B'',''A'') and b.record_stat = ''O'' AND b.auth_stat = ''A'' And instr(?,''!''||b.status_code||''!'') > 0 and instr(?,''!''||b.status_code||''!'') = 0 order by b.status_code',
100,'STATUS_CODE!TEXT!STATUS_CODE~STATUS_SEQ!TEXT!STATUS_SEQ',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_ACCHEAD',
'MCDPRMNT',
'select gl_code,gl_desc from gltms_glmaster a where a.leaf = ''Y'' and a.customer=''I'' order by category, gl_desc',
100,'GL_CODE!TEXT!GL_CODE~GL_DESC!TEXT!GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_ACCHEAD',
'MMDPRMNT',
'select gl_code,gl_desc from gltms_glmaster a where a.leaf = ''Y'' and a.customer=''I'' order by category, gl_desc',
100,'GL_CODE!TEXT!GL_CODE~GL_DESC!TEXT!GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_ACCHEAD',
'SRDPRMNT',
'select gl_code,gl_desc from gltms_glmaster a where a.leaf = ''Y'' and a.customer=''I'' order by category, gl_desc',
100,'GL_CODE!TEXT!GL_CODE~GL_DESC!TEXT!GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_ACCHEAD',
'STDACCLS',
'select gl_code,gl_desc from gltms_glmaster a where a.leaf = ''Y'' and a.customer=''I'' AND record_stat = ''O'' AND auth_stat   = ''A'' order by category, gl_desc',
100,'GL_CODE!TEXT!GL_CODE~GL_DESC!TEXT!GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_ACCROLE',
'BCDPRMNT',
'SELECT * FROM (SELECT role_code, ROLE_CODE AS R1,' || chr(10) || '               role_description, role_type, ''NORM'' status, ? FROM cstbs_accrole' || chr(10) || '               WHERE module = ''BC'' AND role_type <> ''X'' AND role_code NOT' || chr(10) || '               IN (SELECT accounting_role FROM cstms_product_accrole WHERE' || chr(10) || '               product_code = ? AND status = ''NORM'') UNION SELECT role_code,' || chr(10) || '               ROLE_CODE AS R1, role_description, role_type, ''NORM'' status, ?' || chr(10) || '               FROM cstbs_accrole WHERE module = decode(?, ''F'', ''LN'', ''T'', ''LS'',' || chr(10) || '               ''D'', ''LS'', ''@'') AND role_type <> ''X'' AND role_code NOT IN' || chr(10) || '               (SELECT accounting_role FROM cstms_product_accrole WHERE' || chr(10) || '               product_code = ? AND status = ''NORM'')) WHERE 1 = 1 ORDER BY' || chr(10) || '               role_code',
100,'ROLE_CODE!TEXT!ROLE_CODE~ROLE_DESCRIPTION!TEXT!ROLE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_ACCROLE',
'MCDPRMNT',
'select role_code, role_description from cstbs_accrole a, cstms_product_accrole b where a.role_code = b.accounting_role and b.product_code = ? and b.status = ''NORM'' and a.allow_transfer_gl = ''Y'' and a.module = ? and role_code not in (select account_role from cstms_product_status_gl where product = ? and status = ? )',
100,'ROLE_CODE!TEXT!ROLE_CODE~ROLE_DESCRIPTION!TEXT!ROLE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_ACCROLE',
'MMDPRMNT',
'select role_code, role_description from cstbs_accrole a, cstms_product_accrole b where a.role_code = b.accounting_role and b.product_code = ? and b.status = ''NORM'' and a.allow_transfer_gl = ''Y'' and a.module = ? and role_code not in (select account_role from cstms_product_status_gl where product = ? and status = ? )',
100,'ROLE_CODE!TEXT!ROLE_CODE~ROLE_DESCRIPTION!TEXT!ROLE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_ACCROLE',
'SRDPRMNT',
'select role_code, role_description from cstbs_accrole a, cstms_product_accrole b where a.role_code = b.accounting_role and b.product_code = ? and b.status = ''NORM'' and a.allow_transfer_gl = ''Y'' and a.module = ? and role_code not in (select account_role from cstms_product_status_gl where product = ? and status = ? )',
100,'ROLE_CODE!TEXT!ROLE_CODE~ROLE_DESCRIPTION!TEXT!ROLE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_ACCROLE',
'STDACCLS',
'select distinct a.account_role_code,b.role_description,b.role_type from cstm_event_acct_entry_class a,cstb_accrole b  where a.module = ''ST'' and a.class_code =? and a.account_role_code = b.role_code and a.account_role_code not in (select account_role from CSTMS_ACCPROD_STATUS_GL where ACCLS_OR_PROD =? and status =?) order by a.account_role_code',
100,'ACCOUNT_ROLE_CODE!TEXT!ACCOUNT_ROLE_CODE~ROLE_DESCRIPTION!TEXT!ROLE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_ACCROLE1',
'MCDPRMNT',
'select role_code,role_description,role_type from cstb_accrole where module = ''MC'' and role_code not in (select account_role from cstm_accprod_status_gl where accls_or_prod = ? and status = ?)',
100,'ROLE_CODE!TEXT!ROLE_CODE~ROLE_DESCRIPTION!TEXT!ROLE_DESCRIPTION~ROLE_TYPE!TEXT!ROLE_TYPE',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_ACCROLE1',
'MMDPRMNT',
'select role_code,role_description,role_type from cstb_accrole where module = ''MM'' and role_code not in (select account_role from cstm_accprod_status_gl where accls_or_prod = ? and status = ?)',
100,'ROLE_CODE!TEXT!ROLE_CODE~ROLE_DESCRIPTION!TEXT!ROLE_DESCRIPTION~ROLE_TYPE!TEXT!ROLE_TYPE',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_ACCROLE1',
'SRDPRMNT',
'select role_code,role_description,role_type from cstb_accrole where module = ''SR'' and role_code not in (select account_role from cstm_accprod_status_gl where accls_or_prod = ? and status = ?)',
100,'ROLE_CODE!TEXT!ROLE_CODE~ROLE_DESCRIPTION!TEXT!ROLE_DESCRIPTION~ROLE_TYPE!TEXT!ROLE_TYPE',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_ACC_HEAD',
'MCDPRMNT',
'select gl_code,gl_desc from gltms_glmaster a where a.leaf = ''Y'' and a.customer=''I'' order by category, gl_desc',
100,'GL_CODE!TEXT!GL_CODE~GL_DESC!TEXT!GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_ACC_HEAD',
'MMDPRMNT',
'select gl_code,gl_desc from gltms_glmaster a where a.leaf = ''Y'' and a.customer=''I'' order by category, gl_desc',
100,'GL_CODE!TEXT!GL_CODE~GL_DESC!TEXT!GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_ACC_HEAD',
'SRDPRMNT',
'select gl_code,gl_desc from gltms_glmaster a where a.leaf = ''Y'' and a.customer=''I'' order by category, gl_desc',
100,'GL_CODE!TEXT!GL_CODE~GL_DESC!TEXT!GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_ADVICE',
'BCDPRMNT',
'select msg_type, description from (select a.msg_type,' || chr(10) || '               b.description from cstms_product_event_advice a, mstms_msg_type b' || chr(10) || '               where a.product_code = ? and a.event_code = ''STCH'' and a.msg_type' || chr(10) || '               = b.msg_type and a.msg_type not in (select message_code from' || chr(10) || '               cstms_product_status_advices where product = ? and status =' || chr(10) || '               ?))where 1=1 order by msg_type',
100,'MSG_TYPE!TEXT!MSG_TYPE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_ADVICE',
'MCDPRMNT',
'select a.msg_type, b.description from cstm_product_event_advice a, mstms_msg_type b where a.product_code = ? and a.msg_type = b.msg_type and a.msg_type not in (select message_code from cstms_product_status_advices where product = ? and status = ?) union select msg_type, description from mstms_msg_type c where module = ''MC'' and msg_type not in (select message_code from cstms_product_status_advices where product = ? and status = ?)',
100,'MSG_TYPE!TEXT!MSG_TYPE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_ADVICE',
'MMDPRMNT',
'select a.msg_type, b.description from cstm_product_event_advice a, mstms_msg_type b where a.product_code = ? and a.msg_type = b.msg_type and a.msg_type not in (select message_code from cstms_product_status_advices where product = ? and status = ?) union select msg_type, description from mstms_msg_type c where module = ''MM'' and msg_type not in (select message_code from cstms_product_status_advices where product = ? and status = ?)',
100,'MSG_TYPE!TEXT!MSG_TYPE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_ADVICE',
'SRDPRMNT',
'select a.msg_type, b.description from cstm_product_event_advice a, mstms_msg_type b where a.product_code = ? and a.msg_type = b.msg_type and a.msg_type not in (select message_code from cstms_product_status_advices where product = ? and status = ?) union select msg_type, description from mstms_msg_type c where module = ''SR'' and msg_type not in (select message_code from cstms_product_status_advices where product = ? and status = ?)',
100,'MSG_TYPE!TEXT!MSG_TYPE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_CD',
'CLDPRMNT',
'SELECT status_code FROM sttm_contract_statuses WHERE status_type IN (''A'',''B'') AND record_stat = ''O'' AND auth_stat   = ''A''',
100,'STATUS_CODE!TEXT!STATUS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_CODE',
'CLDACCDT',
'SELECT STATUS_CODE,STAT_DESCRIPTION FROM CLTMS_PRODUCT_STATUS_LEVEL WHERE PRODUCT_CODE =?' || chr(10) || '',
50,'STATUS_CODE!TEXT!STATUS_CODE~STAT_DESCRIPTION!TEXT!STAT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_CODE',
'CLDPRMNT',
'SELECT status_code,description FROM sttm_contract_statuses WHERE status_type IN (''A'',''B'') AND record_stat = ''O'' AND auth_stat   = ''A''',
100,'STATUS_CODE!TEXT!STATUS_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_CODE',
'LEDACCDT',
'SELECT STATUS_CODE,STAT_DESCRIPTION FROM CLTMS_PRODUCT_STATUS_LEVEL WHERE PRODUCT_CODE =?' || chr(10) || '',
50,'STATUS_CODE!TEXT!STATUS_CODE~STAT_DESCRIPTION!TEXT!STAT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_CODE',
'STDCUSAC',
'SELECT STATUS_CODE,DESCRIPTION FROM STTM_CONTRACT_STATUSES WHERE STATUS_TYPE IN (''B'',''A'') AND       RECORD_STAT = ''O'' AND       AUTH_STAT = ''A'' AND       STATUS_CODE NOT IN (SELECT STATUS                           FROM STTM_ACCOUNT_PROV_PERCENT                           WHERE CUST_AC_NO = ? )',
100,'STATUS_CODE!TEXT!STATUS_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_PROV_PERCENT',
'LDDCONON',
'select a.status,b.description from  cstms_product_status_master a,sttms_contract_statuses b where a.product = substr(?,4,4) and a.status = b.status_code and b.status_type in (''C'',''B'') and b.auth_stat = ''A'' and b.record_stat = ''O'' order by a.status_sequence',
300,'STATUS!TEXT!STATUS~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_TRN',
'BCDPRMNT',
'select trn_code, trn_desc from sttms_trn_code where record_stat =' || chr(10) || '               ''O'' and ONCE_AUTH=''Y'' order by trn_code',
100,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_TRN',
'MCDPRMNT',
'select trn_code, trn_desc from sttms_trn_code where record_stat = ''O'' and auth_stat=''A'' Order By  trn_code',
100,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_TRN',
'MMDPRMNT',
'select trn_code, trn_desc from sttms_trn_code where record_stat = ''O'' and auth_stat=''A''',
100,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STATUS_TRN',
'SRDPRMNT',
'select trn_code, trn_desc from sttms_trn_code where record_stat = ''O'' and auth_stat=''A''',
100,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STCH_POLICY',
'CLDPRMNT',
'select POLICY_CODE,POLICY_DESC from cltm_policy where auth_stat = ''A'' AND RECORD_STAT = ''O''AND POLICY_CATEGORY =''S''',
100,'POLICY_CODE!TEXT!POLICY_CODE~POLICY_DESC!TEXT!POLICY_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STNID',
'PCDINSTR',
'select station_id from pctms_cust_station where source_code =? and record_stat = ''O''  and once_auth = ''Y''',
100,'STATION_ID!TEXT!STATION_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STSH_DELINQUENCY_PRODUCT',
'CLDPRMNT',
'select * from clvws_delinq_product',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STSH_GAAP_INDICATOR',
'CLDPRMNT',
'SELECT * FROM CSVW_STATIC_MAINTENANCE',
100,'GAAP_INDICATOR!TEXT!GAAP_INDICATOR~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STSH_LOSS_GL',
'CLDPRMNT',
'SELECT GL_CODE,GL_DESC FROM GLTMS_GLMASTER WHERE LEAF=''Y'' AND CATEGORY IN (3,4) AND RECORD_STAT=''O'' AND AUTH_STAT=''A''ORDER BY CATEGORY,GL_CODE',
1000,'GL_CODE!TEXT!GL_CODE~GL_DESC!TEXT!GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STSH_MIS_HEAD',
'CLDPRMNT',
'SELECT MIS_HEAD, HEAD_DESC FROM MITMS_MIS_HEAD',
1000,'MIS_HEAD!TEXT!MIS_HEAD~HEAD_DESC!TEXT!HEAD_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STSH_POLICY',
'CLDPRMNT',
'select POLICY_CODE,POLICY_DESC from cltm_policy where auth_stat = ''A'' AND RECORD_STAT = ''O''AND POLICY_CATEGORY =''S''',
100,'POLICY_CODE!TEXT!POLICY_CODE~POLICY_DESC!TEXT!POLICY_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STSH_PROFIT_GL',
'CLDPRMNT',
'SELECT GL_CODE,GL_DESC FROM GLTMS_GLMASTER WHERE LEAF=''Y'' AND CATEGORY IN (3,4) AND RECORD_STAT=''O'' AND AUTH_STAT=''A''ORDER BY CATEGORY,GL_CODE',
1000,'GL_CODE!TEXT!GL_CODE~GL_DESC!TEXT!GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STSH_REVAL_RATE',
'CLDPRMNT',
'SELECT CCY_RATE_TYPE, CCY_RATE_TYPE_DESC FROM CYTMS_RATE_TYPE WHERE RECORD_STAT=''O'' AND AUTH_STAT =''A''',
1000,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STSH_REVAL_TXN',
'CLDPRMNT',
'SELECT TRN_CODE,TRN_DESC FROM STTMS_TRN_CODE WHERE RECORD_STAT = ''O'' AND AUTH_STAT = ''A'' ORDER BY TRN_CODE',
100,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STSH_TXN_CODE',
'CLDPRMNT',
'SELECT TRN_CODE,TRN_DESC FROM STTMS_TRN_CODE WHERE RECORD_STAT = ''O'' AND AUTH_STAT = ''A'' ORDER BY TRN_CODE',
100,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STTLCCY',
'CLDMDSBR',
'select ccy_code, ccy_name from CYTMS_CCY_DEFN where auth_stat = ''A'' AND record_stat = ''O'' order by ccy_code',
100,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STTL_PRD_CHRG',
'CLDMDSBR',
'select product_code,product_Description from cstms_product where  module =''RT'' and product_type in (''OT'',''AT'')',
'','PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STTMS_BRANCH__BRANCH',
'AEDEODMR',
'select branch_code,branch_name from sttm_branch order by bank_code',
1000,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_STTMS_COUNTRY',
'TADRTCD',
'SELECT COUNTRY_CODE,DESCRIPTION FROM STTMS_COUNTRY WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY COUNTRY_CODE',
100,'COUNTRY_CODE!TEXT!COUNTRY_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SUBSCUSTID',
'CLDACCDT',
'select customer_no,customer_name1 from sttm_customer WHERE CUSTOMER_NO != ?',
100,'CUSTOMER_NO!TEXT!CUSTOMER_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SUBSCUSTID',
'CLDLOTEM',
'select customer_no,customer_name1 from sttm_customer WHERE CUSTOMER_NO != ?',
100,'CUSTOMER_NO!TEXT!CUSTOMER_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SUBSCUSTID',
'MODACCDT',
'',100,'CUSTOMER_NO!TEXT!CUSTOMER_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SUBSIDYID',
'LEDACCDT',
'select customer_no,customer_name1 from sttm_customer',
100,'CUSTOMER_NO!TEXT!CUSTOMER_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SUBSIDY_CUSTOMER',
'LDDBRMNT',
'SELECT customer_no, customer_name1 FROM sttms_customer WHERE nvl(local_branch, ''***'') = nvl(?,''***'')AND once_auth = ''Y'' AND record_stat = ''O''order by customer_no',
200,'CUSTOMER_NO!TEXT!CUSTOMER_NO~CUSTOMER_NAME1!TEXT!CUSTOMER_NAME1',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SUBTYPE_CODE',
'ISDBICDI',
'select sub_type_code, sub_type_desc,be_indicator from istm_subtype_code',
100,'SUB_TYPE_CODE!TEXT!SUB_TYPE_CODE~SUB_TYPE_DESC!TEXT!SUB_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SUMMARY_COUNTERPARTY',
'SIDCONON',
'SELECT DISTINCT COUNTERPARTY FROM SITB_INSTRUCTION WHERE COUNTERPARTY != '' '' ORDER BY COUNTERPARTY',
100,'COUNTERPARTY!TEXT!COUNTERPARTY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SUMMARY_FCCREF',
'FTDCONON',
'SELECT A.CONTRACT_REF_NO FROM FTTB_CONTRACT_MASTER A,CSTB_CONTRACT B WHERE A.CONTRACT_REF_NO = B.CONTRACT_REF_NO AND B.BRANCH = GLOBAL.CURRENT_BRANCH ORDER BY A.CONTRACT_REF_NO',
100,'CONTRACT_REF_NO!TEXT!CONTRACT_REF_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SUMMARY_INSTRNO',
'SIDCONON',
'SELECT INSTRUCTION_NO FROM SITB_INSTRUCTION WHERE INST_VERSION_NO =  LATEST_VERSION_NO AND BRANCH = GLOBAL.CURRENT_BRANCH ORDER BY INSTRUCTION_NO',
100,'INSTRUCTION_NO!TEXT!INSTRUCTION_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SUMMARY_SOURCEREF',
'FTDCONON',
'SELECT SOURCE_REF_NO FROM FTTB_CONTRACT_MASTER WHERE CONTRACT_REF_NO IN (SELECT CONTRACT_REF_NO FROM CSTB_CONTRACT WHERE BRANCH = GLOBAL.CURRENT_BRANCH) AND SOURCE_REF_NO != '' '' ORDER BY SOURCE_REF_NO',
100,'SOURCE_REF_NO!TEXT!SOURCE_REF_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SUMMARY_SOURCE_CODE',
'SIDCONON',
'SELECT SOURCE_CODE,SOURCE_DESC FROM COTMS_SOURCE WHERE ONCE_AUTH = ''Y'' AND SOURCE_CODE IN (SELECT DISTINCT SOURCE_CODE FROM SITB_INSTRUCTION) ORDER BY SOURCE_CODE',
100,'SOURCE_CODE!TEXT!SOURCE_CODE~SOURCE_DESC!TEXT!SOURCE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SUMMARY_USERINSTNO',
'SIDCONON',
'SELECT USER_INST_NO FROM SITB_INSTRUCTION WHERE INST_VERSION_NO =  LATEST_VERSION_NO AND BRANCH = GLOBAL.CURRENT_BRANCH ORDER BY USER_INST_NO',
100,'USER_INST_NO!TEXT!USER_INST_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SUMMARY_XREF',
'SIDCONON',
'SELECT SOURCE_INST_NO FROM SITB_INSTRUCTION WHERE INST_VERSION_NO =  LATEST_VERSION_NO AND BRANCH = GLOBAL.current_branch AND SOURCE_INST_NO != '' '' ORDER BY USER_INST_NO',
100,'SOURCE_INST_NO!TEXT!SOURCE_INST_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SUPPLIERID',
'LEDACCDT',
'SELECT SUPPLIER_ID,SUPPLIER_NAME FROM (select customer_no SUPPLIER_ID,CUSTOMER_NAME1 SUPPLIER_NAME  from sttm_customer union select vendor_code SUPPLIER_ID, vend_shrt_desc SUPPLIER_NAME from XPTMS_VND_MST) WHERE 1 = 1' || chr(10) || '',
50,'SUPPLIER_ID!TEXT!SUPPLIER_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SUSPENSE_ACC',
'STDNTMNT',
'SELECT S.ac_gl_no, S.ac_gl_desc FROM sttbs_account S WHERE S.ac_or_gl = ''G'' AND  S.gl_aclass_type not in (''2'',''3'', ''5'')  AND S.once_auth = ''Y'' AND S.ac_gl_rec_status = ''O'' AND gl_stat_blocked = ''N'' AND gl_ccy_res = ''A'' AND gl_branch_res = ''A''',
100,'AC_GL_NO!TEXT!S.AC_GL_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SUSPENSE_GL',
'BCDPRMNT',
'select gl_code, gl_desc from gltms_glmaster where record_stat =' || chr(10) || '               ''O'' and ONCE_AUTH = ''Y'' and leaf = ''Y'' and ccy_res = ''A'' and' || chr(10) || '               (category = ''1'' or category = ''2'') order by gl_code',
100,'GL_CODE!TEXT!GL_CODE~GL_DESC!TEXT!GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SUSPENSE_GL',
'DEDBRCON',
'SELECT GL_CODE,GL_DESC  FROM GLTM_GLMASTER WHERE CUSTOMER=''I'' AND LEAF=''Y'' AND ONCE_AUTH=''Y'' AND RECORD_STAT=''O'' ORDER BY GL_CODE',
100,'GL_CODE!TEXT!GL_CODE~GL_DESC!TEXT!GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SUSPGL',
'EGDGLPRM',
'SELECT EXT_GL FROM EGTM_EX_GL_MASTER WHERE ONCE_AUTH=''Y'' AND RECORD_STAT=''O'' ORDER BY EXT_GL',
300,'EXT_GL!TEXT!EXT_GL',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SUS_GL',
'VPDLIQON',
'SELECT DISTINCT AC_GL_NO FROM STTB_ACCOUNT WHERE AC_GL_REC_STATUS=''O'' AND AC_OR_GL=''G'' AND ONCE_AUTH = ''Y''  AND AC_GL_NO NOT IN (SELECT GL_CODE FROM GLTM_GLMASTER WHERE POSTING_RES = ''N'')  ORDER BY  AC_GL_NO',
100,'AC_GL_NO!TEXT!AC_GL_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SVC_BRN',
'CIDACCDT',
'select branch_code, branch_name from sttms_branch where auth_stat = ''A'' AND record_stat = ''O''',
50,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SVC_BRN',
'CLDACCDT',
'select branch_code, branch_name from sttms_branch where auth_stat = ''A'' AND record_stat = ''O''',
50,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SVC_BRN',
'CLDINADT',
'select branch_code, branch_name from sttms_branch where auth_stat = ''A'' AND record_stat = ''O''',
50,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SVC_BRN',
'CLDLOTEM',
'select branch_code, branch_name from sttms_branch where auth_stat = ''A'' AND record_stat = ''O''',
50,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SVC_BRN',
'LEDACCDT',
'select branch_code, branch_name from sttms_branch where auth_stat = ''A'' AND record_stat = ''O''',
50,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SVC_BRN',
'LSDTRONL',
'select branch_code, branch_name from sttms_branch where auth_stat = ''A'' AND record_stat = ''O''',
50,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SVC_BRN',
'MODACCDT',
'',50,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SWAP_PRODUCT',
'OTDPRMNT',
'select product_code, product_description from (select a.product_code, a.product_description from cstms_product a, csvws_available_prodbr b where a.product_code = b.product_code and a.module = ''DV'' and a.record_stat = ''O'' and a.once_auth = ''Y'' and b.branch_code =  global.current_branch and b.user_id = global.user_id )where 1=1',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SWEEP_ACCOUNT',
'ICCINSTR',
'SELECT CUST_AC_NO, AC_DESC FROM STTM_CUST_ACCOUNT WHERE AUTH_STAT = ''A'' AND  RECORD_STAT = ''O'' AND   NVL(BRANCH_CODE,?) =? AND  NVL(AC_DESC,''X'') <> ''AUTO DEPOSIT''AND  CUST_AC_NO <> ? AND ACCOUNT_CLASS IN(SELECT ACCOUNT_CLASS FROM STTMS_ACCOUNT_CLASS WHERE RECORD_STAT = ''O''  AND AUTH_STAT = ''A'' AND AC_CLASS_TYPE <> ''Y'')',
100,'CUST_AC_NO!TEXT!CUST_AC_NO~AC_DESC!TEXT!AC_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SWEEP_BRANCH',
'ICCINSTR',
'SELECT BRANCH_CODE, BRANCH_NAME FROM STTMS_BRANCH WHERE RECORD_STAT = ''O'' AND AUTH_STAT = ''A''',
100,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SWIFT',
'STDTRCOD',
'SELECT CODE, DESCRIPTION FROM (SELECT ''BOE'' CODE,''Bill Of Exchange'' DESCRIPTION FROM DUAL UNION SELECT ''BRF'',''Brokerage Fee'' FROM DUAL UNION  SELECT ''CHG'',''Charges and Other Expenses'' FROM DUAL UNION  SELECT ''CHK'',''Cheques'' FROM DUAL UNION  SELECT ''CLR'',''Cash Letter / Cheques Remittance'' FROM DUAL UNION  SELECT ''COL'',''Collections (Principal Amt.)'' FROM DUAL UNION SELECT ''COM'',''Commission'' FROM DUAL UNION SELECT ''DCR'',''Documentary Credit (Principal Amt.)'' FROM DUAL UNION  SELECT ''DIV'',''Dividents - Warrants'' FROM DUAL UNION  SELECT ''EQA'',''Equivalent Amount'' FROM DUAL UNION  SELECT ''ECK'',''Eurocheques'' FROM DUAL UNION  SELECT ''FEX'',''Foreign Exchange'' FROM DUAL UNION SELECT ''INT'',''Interest'' FROM DUAL UNION SELECT ''LBX'',''Lock Box'' FROM DUAL UNION SELECT ''LDP'',''Loans - Deposits'' FROM DUAL UNION  SELECT ''MSC'',''Miscellaneous'' FROM DUAL UNION SELECT ''RTI'',''Returned Item'' FROM DUAL UNION SELECT ''SEC'',''Securities (Principal Amt.)'' FROM DUAL UNION SELECT ''STO'',''Standing Order'' FROM DUAL UNION SELECT ''TCK'',''Travellers Cheques'' FROM DUAL UNION SELECT ''TRF'',''Transfer'' FROM DUAL UNION SELECT ''VDA'',''Value Date Adjustment'' FROM DUAL) WHERE 1=1',
200,'CODE!TEXT!CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SWIFTADDR',
'PCDBNKMT',
'SELECT BIC_CODE,BANK_NAME FROM ISTMS_BIC_DIRECTORY WHERE ONCE_AUTH=''Y'' AND RECORD_STAT=''O'' order by bic_code',
100,'BIC_CODE!TEXT!BIC_CODE~BANK_NAME!TEXT!BIC_BANK_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SWIFT_ADDR',
'SMDBRANH',
'select a.bic_code,a.bank_name from istm_bic_directory a order by a.bic_code',
100,'BIC_CODE!TEXT!BIC_CODE~BANK_NAME!TEXT!BANK_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SWIFT_ADDR',
'STDBRANC',
'select a.bic_code,a.bank_name from istm_bic_directory a order by a.bic_code',
100,'BIC_CODE!TEXT!BIC_CODE~BANK_NAME!TEXT!BANK_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SWIFT_ADDRESS',
'STDBRANC',
'select a.bic_code,a.bank_name from istms_bic_directory a order by a.bic_code',
100,'BIC_CODE!TEXT!BIC_CODE~BANK_NAME!TEXT!BANK_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SWIFT_MESSAGE',
'MSDOUBRS',
'SELECT MSG_TYPE,DESCRIPTION FROM MSTM_MSG_TYPE order by MSG_TYPE',
100,'MSG_TYPE!TEXT!MSG_TYPE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SWIFT_MESSAGES',
'MSDCOMMS',
'SELECT * FROM (SELECT msg_type, msg_type_desc,decode(substr(msg_type,2),''90'',''I'',''91'',''I'',''O'') INOUT,decode(substr(msg_type,2),''90'',''C'',''91'',''B'') tag32,decode(substr(msg_type,2),''92'',''S'',''95'',''R'',''96'',''R'') tag11 FROM  mstbs_commsg_types  WHERE  lang_code = GLOBAL.LANG) WHERE 1=1 ORDER BY msg_type',
200,'MSG_TYPE!TEXT!MSG_TYPE~MSG_TYPE_DESC!TEXT!MSG_TYPE_DESC~INOUT!TEXT!INOUT~TAG32!TEXT!TAG32~TAG11!TEXT!TAG11',
'STRING~STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SWIFT_MSG_TYPE',
'MSDINBRS',
'SELECT SWIFT_MSG_TYPE FROM MSTM_MSG_TYPE WHERE AUTH_STAT = ''A'' and RECORD_STAT= ''O'' AND SWIFT_MSG_TYPE IS NOT NULL ORDER BY SWIFT_MSG_TYPE',
500,'SWIFT_MSG_TYPE!TEXT!SWIFT_MSG_TYPE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_S_ADVICES',
'CLDPRMNT',
'select DISTINCT(msg_type),description from mstms_msg_type WHERE MODULE = ''CL''',
100,'MSG_TYPE!TEXT!MSG_TYPE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_S_ADV_FORMAT',
'CLDPRMNT',
'select format from mstms_adv_format where form_id = ''ADV'' and record_stat = ''O'' and auth_stat = ''A'' order by format',
100,'FORMAT!TEXT!FORMAT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_S_FORMAT',
'CLDPRMNT',
'select DISTINCT(FORMAT) from MSTM_MSG_FORMAT WHERE MODULE IN (''CL'',''LS'')AND (MSG_TYPE = decode(?,''LS'',clpks_prd_text.LS_LOAN_STMT1,clpks_prd_text.CL_LOAN_STMT1) AND ? = decode(?,''LS'',''LS_LOAN_STMT'',''CL_LOAN_STMT'')) OR (MSG_TYPE = decode(?,''LS'',clpks_prd_text.LS_LOAN_STMT1,clpks_prd_text.CL_LOAN_STMT1) AND ? = decode(?,''LS'',''LS_INT_STMT'',''CL_INT_STMT''))',
100,'FORMAT!TEXT!FORMAT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TABLE_NAME',
'GEDCACHE',
'SELECT TABLE_NAME FROM GEMS_FUNCTION_TABLE_MAP order by table_name',
200,'TABLE_NAME!TEXT!TABLE_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAG',
'ACDSTFMT',
'select tagname,tagdesc from actm_stmt_tags where tagloc= ?Order by tagname',
100,'TAGNAME!TEXT!TAGNAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAG',
'PCDMSGMT',
'SELECT FIELD_NAME, DESCRIPTION FROM (SELECT FIELD_NAME, DESCR DESCRIPTION FROM (SELECT ''UDF_''||FLD_NAME1 FIELD_NAME,'''' DESCR, MSG_TYPE FROM MSTBS_MT_UDF WHERE FLD_NAME1 IS NOT NULL UNION SELECT ''UDF_''||FLD_NAME2 FIELD_NAME,'''' DESCR, MSG_TYPE FROM MSTBS_MT_UDF WHERE FLD_NAME2 IS NOT NULL UNION SELECT ''UDF_''||FLD_NAME3 FIELD_NAME,'''' DESCR, MSG_TYPE FROM MSTBS_MT_UDF WHERE FLD_NAME3 IS NOT NULL UNION SELECT ''UDF_''||FLD_NAME4 FIELD_NAME,'''' DESCR, MSG_TYPE FROM MSTBS_MT_UDF WHERE FLD_NAME4 IS NOT NULL UNION SELECT ''UDF_''||FLD_NAME5 FIELD_NAME,'''' DESCR, MSG_TYPE FROM MSTBS_MT_UDF WHERE FLD_NAME5 IS NOT NULL UNION SELECT ''UDF_''||FLD_NAME6 FIELD_NAME,'''' DESCR, MSG_TYPE FROM MSTBS_MT_UDF WHERE FLD_NAME6 IS NOT NULL UNION SELECT ''UDF_''||FLD_NAME7 FIELD_NAME,'''' DESCR, MSG_TYPE FROM MSTBS_MT_UDF WHERE FLD_NAME7 IS NOT NULL UNION SELECT ''UDF_''||FLD_NAME8 FIELD_NAME,'''' DESCR, MSG_TYPE FROM MSTBS_MT_UDF WHERE FLD_NAME8 IS NOT NULL UNION SELECT ''UDF_''||FLD_NAME9 FIELD_NAME,'''' DESCR, MSG_TYPE FROM MSTBS_MT_UDF WHERE FLD_NAME9 IS NOT NULL UNION SELECT ''UDF_''||FLD_NAME10 FIELD_NAME,'''' DESCR, MSG_TYPE FROM MSTBS_MT_UDF WHERE FLD_NAME10 IS NOT NULL UNION SELECT ''UDF_''||FLD_NAME11 FIELD_NAME,'''' DESCR, MSG_TYPE FROM MSTBS_MT_UDF WHERE FLD_NAME11 IS NOT NULL UNION SELECT ''UDF_''||FLD_NAME12 FIELD_NAME,'''' DESCR, MSG_TYPE FROM MSTBS_MT_UDF WHERE FLD_NAME12 IS NOT NULL UNION SELECT ''UDF_''||FLD_NAME13 FIELD_NAME,'''' DESCR, MSG_TYPE FROM MSTBS_MT_UDF WHERE FLD_NAME13 IS NOT NULL UNION SELECT ''UDF_''||FLD_NAME14 FIELD_NAME,'''' DESCR, MSG_TYPE FROM MSTBS_MT_UDF WHERE FLD_NAME14 IS NOT NULL UNION SELECT ''UDF_''||FLD_NAME15 FIELD_NAME,'''' DESCR, MSG_TYPE FROM MSTBS_MT_UDF WHERE FLD_NAME15 IS NOT NULL UNION SELECT ''UDF_''||FLD_NAME16 FIELD_NAME,'''' DESCR, MSG_TYPE FROM MSTBS_MT_UDF WHERE FLD_NAME16 IS NOT NULL UNION SELECT ''UDF_''||FLD_NAME17 FIELD_NAME,'''' DESCR, MSG_TYPE FROM MSTBS_MT_UDF WHERE FLD_NAME17 IS NOT NULL UNION SELECT ''UDF_''||'||
'FLD_NAME18 FIELD_NAME,'''' DESCR, MSG_TYPE FROM MSTBS_MT_UDF WHERE FLD_NAME18 IS NOT NULL UNION SELECT ''UDF_''||FLD_NAME19 FIELD_NAME,'''' DESCR, MSG_TYPE FROM MSTBS_MT_UDF WHERE FLD_NAME19 IS NOT NULL UNION SELECT ''UDF_''||FLD_NAME20 FIELD_NAME,'''' DESCR, MSG_TYPE FROM MSTBS_MT_UDF WHERE FLD_NAME20 IS NOT NULL) A WHERE A.MSG_TYPE = ? UNION SELECT FIELD_NAME,DESCRIPTION FROM MSTBS_COM_PAY_FIELDS WHERE TABLE_NAME=''MSTMS_COM_PMT_IN'' AND EXISTS (SELECT 1 FROM MSTMS_COM_PAY_TYPES WHERE MSG_TYPE= ? ) UNION SELECT A.TAG_VALUE FIELD_NAME, A.DESCRIPTION FROM MSTM_SWIFT_TAGS A WHERE A.MSG_TYPE = ? AND NOT EXISTS (SELECT 1 FROM MSTM_SPLIT_FIELD_DETAILS B WHERE  B.FIELD = A.TAG_VALUE) UNION SELECT A.FIELD FIELD_NAME, A.DESCR DESCRIPTION FROM MSTM_SPLIT_FIELD_DETAILS A) WHERE 1=1',
100,'FIELD_NAME!TEXT!FIELD_NAME~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAGHEAD',
'ACDSTFMT',
'select distinct(tagloc) from actm_stmt_tags order by tagloc',
100,'TAGLOC!TEXT!TAGLOC',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAGS',
'MSDFFT',
'select tag_name from mstb_module_fft_tags where module = ''AL''  union select tag_name from mstb_module_fft_tags where  module = ? and tag_origin = FN_GET_SWIFT_FFT_TAGS(?,?,3)union select tag_name from mstb_module_fft_tags where  module = ? and tag_origin = FN_GET_SWIFT_FFT_TAGS(?,?,4) union select ''_US$''||field_name||''UE$_'' from cstm_product_userdef_fields where product_code = substr(FN_GET_SWIFT_FFT_TAGS(?,?,9),4,4) union select ''_PUS$''||field_name||''PUE$_'' from cstm_product_userdef_fields where product_code = substr(FN_GET_SWIFT_FFT_TAGS(?,?,1),4,4) union select ''_UDF$''||field_name||''UDF$_'' from cstm_user_fields where function_id = FN_GET_SWIFT_FFT_TAGS(?,?,5) union select ''_TUDF$''||field_name||''TUDF$_'' from cstm_user_fields where function_id =  FN_GET_SWIFT_FFT_TAGS(?,?,6)union select ''_FUDF$''||field_name||''FUDF$_'' from cstm_user_fields where function_id = FN_GET_SWIFT_FFT_TAGS(?,?,7) union select ''_UDFDESC$''||field_name||''UDFDESC$_'' from cstm_user_fields where function_id = FN_GET_SWIFT_FFT_TAGS(?,?,5)union select ''_PUDFDESC$''||field_name||''PUDFDESC$_'' from cstm_user_fields where function_id =  FN_GET_SWIFT_FFT_TAGS(?,?,8)union select ''_FUDFDESC$''||field_name||''FUDFDESC$_'' from cstm_user_fields where function_id = FN_GET_SWIFT_FFT_TAGS(?,?,7)union select ''_TUDFDESC$''||field_name||''TUDFDESC$_'' from cstm_user_fields where function_id = FN_GET_SWIFT_FFT_TAGS(?,?,6)',
100,'TAG_NAME!TEXT!TAG_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAXCCY',
'STDCULMT',
'select ccy_code,ccy_name from cytms_ccy_defn where record_stat=''O'' and once_auth = ''Y'' ORDER BY ccy_code',
100,'CCY_CODE!TEXT!CCY_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAXEXEMPT_REASON',
'TADACMNT',
'SELECT tax_exempt_reason FROM tatms_tax_exempt_reasons ORDER BY tax_exempt_reason',
100,'TAX_EXEMPT_REASON!TEXT!TAX_EXEMPT_REASON',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAXGROUP',
'STDCULMT',
'SELECT group_code, description from (select distinct group_code, description from sttm_group_code where group_type=''T'' and record_stat=''O'' and once_auth = ''Y'') where 1 = 1 order by group_code',
100,'GROUP_CODE!TEXT!GROUP_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_AMOUNT_TAG',
'BCDPRMNT',
'select distinct amount_tag, description, amount_tag_type from' || chr(10) || '               cstbs_amount_tag where (tax_allowed = ''Y'' and language_code =' || chr(10) || '               GLOBAL.LANG and module = ''BC'' and amount_tag_type is null) or' || chr(10) || '               (module = ''BC'' and amount_tag_type is not null and tax_allowed =' || chr(10) || '               ''Y'' and ((substr(amount_tag,1,instr(amount_tag,''_'',-1)-1) in' || chr(10) || '               (select component from cftms_product_iccf where product = ? union' || chr(10) || '               select component from cftms_product_charge where product = ? ) or' || chr(10) || '               (amount_tag in (select component from cftms_product_iccf where' || chr(10) || '               product= ? union select component from cftms_product_charge where' || chr(10) || '               product = ? )) or (amount_tag in (select amount_tag from' || chr(10) || '               tatms_product_tax where product = ? ))))) order by amount_tag',
100,'AMOUNT_TAG!TEXT!AMOUNT_TAG~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_AMOUNT_TAG',
'FTDPRMNT',
'select distinct amount_tag, description from cstbs_amount_tag where  tax_allowed = ''Y'' and language_code = GLOBAL.LANG and module = ''FT'' ORDER BY amount_tag',
100,'AMOUNT_TAG!TEXT!AMOUNT_TAG~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_AMOUNT_TAG',
'FXDPRMNT',
'select amount_tag, description, amount_tag_type from (select distinct amount_tag, description, amount_tag_type from cstbs_amount_tag where (tax_allowed = ''Y'' and language_code = ''ENG'' and module = ''FX'' and amount_tag_type is null) or (module = ''FX'' and amount_tag_type is not null and tax_allowed = ''Y'' )) where 1 = 1 order by amount_tag',
500,'AMOUNT_TAG!TEXT!AMOUNT_TAG~DESCRIPTION!TEXT!DESCRIPTION~AMOUNT_TAG_TYPE!TEXT!AMOUNT_TAG_TYPE',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_AMOUNT_TAG',
'LCDPRMNT',
'SELECT DISTINCT AMOUNT_TAG, DESCRIPTION, AMOUNT_TAG_TYPE FROM 	CSTBS_AMOUNT_TAG WHERE TAX_ALLOWED=''Y'' AND LANGUAGE_CODE=GLOBAL.LANG 	AND MODULE= ? ORDER BY AMOUNT_TAG',
100,'AMOUNT_TAG!TEXT!AMOUNT_TAG~DESCRIPTION!TEXT!DESCRIPTION~AMOUNT_TAG_TYPE!TEXT!AMOUNT_TAG_TYPE',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_AMOUNT_TAG',
'MCDPRMNT',
'select distinct amount_tag, description, amount_tag_type from cstbs_amount_tag where (tax_allowed = ''Y'' and language_code =? and module =? and amount_tag_type is null) or (module =? and amount_tag_type is not null and tax_allowed = ''Y'' and ((substr(amount_tag,1,instr(amount_tag,''_'',-1)-1) in (select component from cftms_product_iccf where product =? union select component from cftms_product_charge where product =?) or (amount_tag in (select component from cftms_product_iccf where product=? union select component from cftms_product_charge where product =?)) or (amount_tag in (select amount_tag from tatms_product_tax where product =? )AND amount_tag <> ?)))) Order By amount_tag',
100,'AMOUNT_TAG!TEXT!AMOUNT_TAG',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_AMOUNT_TAG',
'MMDPRMNT',
'Select Distinct Amount_Tag               ,Description               ,Amount_Tag_Type From   Cstbs_Amount_Tag Where  (Tax_Allowed = ''Y'' And Language_Code = Global.Lang And Module = ''MM'' And Amount_Tag_Type Is Null) Or       (Module = ''MM'' And Amount_Tag_Type Is Not Null And Tax_Allowed = ''Y'' And       ((Substr(Amount_Tag, 1, Instr(Amount_Tag, ''_'', -1) - 1) In       (Select Component           From   Cftms_Product_Iccf           Where  Product = ?           Union           Select Component From   Cftms_Product_Charge           Where  Product = ?) Or (Amount_Tag In (Select Component                                                     From   Cftms_Product_Iccf                                                     Where  Product = ?                                                     Union                                                     Select Component                                                     From   Cftms_Product_Charge                                                   Where  Product = ?)) Or       (Amount_Tag In (Select Amount_Tag                          From   Tatms_Product_Tax                          Where  Product = ?) And Amount_Tag <> ?))))',
100,'AMOUNT_TAG!TEXT!AMOUNT_TAG',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_AMOUNT_TAG',
'SRDPRMNT',
'select distinct amount_tag, description, amount_tag_type from cstbs_amount_tag where (tax_allowed = ''Y'' and language_code =? and module =? and amount_tag_type is null) or (module =? and amount_tag_type is not null and tax_allowed = ''Y'' and ((substr(amount_tag,1,instr(amount_tag,''_'',-1)-1) in (select component from cftms_product_iccf where product =? union select component from cftms_product_charge where product =?) or (amount_tag in (select component from cftms_product_iccf where product=? union select component from cftms_product_charge where product =?)) or (amount_tag in (select amount_tag from tatms_product_tax where product =? )AND amount_tag <> ?))))',
100,'AMOUNT_TAG!TEXT!AMOUNT_TAG',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_AMOUNT_TAG1',
'FXDPRMNT',
'select distinct amount_tag, description, amount_tag_type from cstbs_amount_tag where ((tax_allowed = ''Y'' and language_code = global.lang and module =? and amount_tag_type is null) 	or (module =? and amount_tag_type is not null and tax_allowed = ''Y'' 		and ((substr(amount_tag,1,instr(amount_tag,''_'',-1)-1) 				in (select component from cftms_product_iccf where product =? 				union select component from cftms_product_charge where product =?) or (amount_tag in (select component from cftms_product_iccf where product=? union select component from cftms_product_charge where product =?)) or (amount_tag in (select amount_tag from tatms_product_tax where product =?)))))) order by distinct amount_tag',
100,'AMOUNT_TAG!TEXT!AMOUNT_TAG~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_CAT',
'STDACLMT',
'select tax_category,description from tatm_tax_category where tax_category in (select distinct(tax_category) from sttm_cust_tax_limit a,sttm_cust_account b where a.record_stat=''O'' and a.auth_stat=''A'' and a.cust_no=b.cust_no and b.cust_ac_no=?) UNION SELECT tax_category ,description FROM   tatm_tax_category WHERE  tax_category IN (SELECT DISTINCT (tax_category) FROM   sttm_cust_tax_limit a ,sttm_cust_account   b WHERE  a.record_stat = ''O'' AND    a.auth_stat = ''A'' AND    a.cust_no = ''ALL'' ) order by tax_category',
1000,'TAX_CATEGORY!TEXT!TAX_CATEGORY~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_CATEGORY',
'IPDRLMNT',
'select tax_category, description from tatms_tax_category',
100,'TAX_CATEGORY!TEXT!TAX_CATEGORY~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_CATEGORY',
'STDCULMT',
'SELECT tax_category,description from (select tax_category,description from tatm_tax_category where record_stat=''O'' and once_auth = ''Y'') where 1 = 1 ORDER BY tax_category',
100,'TAX_CATEGORY!TEXT!TAX_CATEGORY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_CATEGORY',
'STDTAXWV',
'select tax_category, description from tatms_tax_category where record_stat =''O'' and auth_stat = ''A'' order by tax_category',
100,'TAX_CATEGORY!TEXT!TAX_CATEGORY~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_CATEGORY',
'TADRULE',
'select TAX_CATEGORY,DESCRIPTION from TATMS_TAX_CATEGORY where once_auth=''Y'' and record_stat = ''O'' ORDER BY TAX_CATEGORY',
100,'TAX_CATEGORY!TEXT!TAX_CATEGORY~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_CCY',
'SECCORAT',
'select ccy_code tax_ccy from cytms_ccy_defn where record_stat = ''O'' and auth_stat = ''A'' and ccy_code in (select distinct(tax_ccy) from tatms_issr_tax_rate where rate_code in (select tax_rate_code from setbs_tax_component where internal_sec_id = ? and tax_component = ?)) and ccy_code not in (select tax_ccy from setms_caevent_tax_xrate where internal_action_id = ? and tax_component = ?)',
100,'TAX_CCY!TEXT!TAX_CCY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_CCY',
'STDTAXWV',
'SELECT CCY_CODE, CCY_NAME FROM ( SELECT CCY_CODE, CCY_NAME FROM CYTM_CCY_DEFN WHERE RECORD_STAT = ''O'' AND AUTH_STAT = ''A'' union select ''ALL'', ''All Currencies'' from dual ) WHERE 1 = 1 order by ccy_code',
100,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_CCY',
'TADRATE',
'SELECT CCY_CODE,CCY_NAME FROM CYTMS_CCY_DEFN WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY CCY_CODE',
100,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_COMPOPNENT',
'SECCORAT',
'select a.tax_component from setbs_tax_component a where a.basis_amount_tag in (select b.interest_component from setbs_int_component b where a.internal_sec_id = b.internal_sec_id)',
300,'TAX_COMPONENT!TEXT!TAX_COMPONENT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_EVENT',
'BCDPRMNT',
'select event_code, event_descr from cstbs_event where module =' || chr(10) || '               ''BC'' and interest_allowed = ''Y'' order by event_code',
100,'EVENT_CODE!TEXT!EVENT_CODE~EVENT_DESCR!TEXT!EVENT_DESCR',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_EVENT',
'FTDPRMNT',
'select event_code, event_descr from cstbs_event where module = ''FT'' and tax_allowed = ''Y'' ORDER BY EVENT_CODE',
100,'EVENT_CODE!TEXT!EVENT_CODE~EVENT_DESCR!TEXT!EVENT_DESCR',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_EVENT',
'FXDPRMNT',
'select event_code, event_descr from cstbs_event where tax_allowed = ''Y'' and module = ''FX''',
100,'EVENT_CODE!TEXT!EVENT_CODE~EVENT_DESCR!TEXT!EVENT_DESCR',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_EVENT',
'LCDPRMNT',
'SELECT EVENT_CODE,EVENT_DESCR FROM CSTBS_EVENT WHERE TAX_ALLOWED=''Y'' AND MODULE=? ORDER BY EVENT_CODE',
100,'EVENT_CODE!TEXT!EVENT_CODE~EVENT_DESCR!TEXT!EVENT_DESCR',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_EVENT',
'MCDPRMNT',
'select event_code, event_descr from cstbs_event where tax_allowed = ''Y'' and module = ? and event_code in (select event_code from cstms_product_event where product_code = ?) Order By event_code',
100,'EVENT_CODE!TEXT!EVENT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_EVENT',
'MMDPRMNT',
'Select Event_Code ,Event_Descr From   Cstbs_Event Where  Tax_Allowed = ''Y'' And Module = ''MM'' And Event_Code NOT In (Select Event_Code From Cstms_Product_Event Where  Product_Code = ?)',
100,'EVENT_CODE!TEXT!EVENT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_EVENT',
'SRDPRMNT',
'select event_code, event_descr from cstbs_event where tax_allowed = ''Y'' and module = ? and event_code in (select event_code from cstms_product_event where product_code = ?)',
100,'EVENT_CODE!TEXT!EVENT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_EXEMPT_REASON',
'TADXCOMN',
'select TAX_EXEMPT_REASON from TATMS_TAX_EXEMPT_REASONS',
10,'TAX_EXEMPT_REASON!TEXT!TAX_EXEMPT_REASON',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_EXP_ACCT',
'BRDMAST',
'select gl_code, gl_desc from gltms_glmaster where leaf=''Y'' and category in (''3'',''4'') and once_auth=''Y'' and record_stat=''O'' order by gl_code',
100,'GL_CODE!TEXT!GL_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_EXP_TXNCODE',
'BRDMAST',
'select trn_code , trn_desc from sttms_trn_code where record_stat=''O'' and once_auth=''Y'' order by trn_code',
100,'TRN_CODE!TEXT!TRN_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_GROUP',
'STDCCIF',
'select group_code,DESCRIPTION  from STTMS_GROUP_CODE where group_type = ''T'' and  RECORD_STAT = ''O'' and AUTH_STAT = ''A''',
100,'GROUP_CODE!TEXT!GROUP_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_GROUP',
'STDCIF',
'select group_code,DESCRIPTION  from STTMS_GROUP_CODE where group_type = ''T'' and  RECORD_STAT = ''O'' and AUTH_STAT = ''A''',
100,'GROUP_CODE!TEXT!GROUP_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_GROUP',
'STDCOCIF',
'select group_code,DESCRIPTION  from STTMS_GROUP_CODE where group_type = ''T'' and  RECORD_STAT = ''O'' and AUTH_STAT = ''A''',
100,'GROUP_CODE!TEXT!GROUP_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_PAYABLE_ACCT',
'BRDMAST',
'select gl_code, gl_desc from gltms_glmaster where leaf=''Y'' and category in (''1'',''2'') and record_stat=''O'' and once_auth=''Y'' order by gl_code',
100,'GL_CODE!TEXT!GL_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_PAYABLE_TXNCODE',
'BRDMAST',
'select trn_code, trn_desc from sttms_trn_code where record_stat=''O'' and once_auth=''Y'' order by trn_code',
100,'TRN_CODE!TEXT!TRN_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_SCHEME',
'BCDPRMNT',
'select scheme_code, description from tatms_scheme where' || chr(10) || '               record_stat = ''O'' and auth_stat = ''A'' order by scheme_code',
100,'SCHEME_CODE!TEXT!SCHEME_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_SCHEME',
'BRDMAST',
'select scheme_code from tatms_scheme where record_stat = ''O'' and once_auth=''Y'' order by scheme_code',
100,'SCHEME_CODE!TEXT!SCHEME_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_SCHEME',
'FTDPRMNT',
'select scheme_code, description from tatms_scheme where record_stat = ''O'' and once_auth=''Y'' ORDER BY scheme_code',
100,'SCHEME_CODE!TEXT!SCHEME_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_SCHEME',
'LCDPRMNT',
'SELECT SCHEME_CODE,DESCRIPTION FROM TATMS_SCHEME WHERE RECORD_STAT=''O'' AND AUTH_STAT=''A'' ORDER BY SCHEME_CODE',
100,'SCHEME_CODE!TEXT!SCHEME_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_SCHEME',
'MCDPRMNT',
'select scheme_code, description from tatms_scheme where record_stat = ''O'' and auth_stat = ''A'' Order By scheme_code',
100,'SCHEME_CODE!TEXT!SCHEME_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_SCHEME',
'MMDPRMNT',
'select scheme_code, description from tatms_scheme where record_stat = ''O'' and auth_stat = ''A''',
100,'SCHEME_CODE!TEXT!SCHEME_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_SCHEME',
'SIDPRMNT',
'select scheme_code, description from tatms_scheme where record_stat = ''O'' and auth_stat = ''A''',
500,'SCHEME_CODE!TEXT!SCHEME_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TAX_SCHEME',
'SRDPRMNT',
'select scheme_code, description from tatms_scheme where record_stat = ''O'' and auth_stat = ''A''',
100,'SCHEME_CODE!TEXT!SCHEME_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TD_RATE_CODE',
'ICDUDVAL',
'SELECT DISTINCT a.rate_code FROM cftm_rate_code a, cftm_rate_ccy b WHERE b.ccy_code = ? AND a.rate_code = b.rate_code   AND a.auth_stat=''A''   AND a.record_stat=''O'' AND a.branch_code=GLOBAL.current_branch order by a.rate_code',
1500,'RATE_CODE!TEXT!RATE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TD_RATE_CODE',
'IPDUDVAL',
'SELECT DISTINCT a.rate_code  FROM   cftm_rate_code a,         cftm_rate_ccy  b  WHERE  b.ccy_code = ?  AND    a.rate_code = b.rate_code',
10,'RATE_CODE!TEXT!RATE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TEMPLATE',
'CSDDRYET',
'select template_id from cstbs_template_diary  where branch =global.current_branch',
'','TEMPLATE_ID!TEXT!TEMPLATE_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TEMPLATE',
'IDDACSAL',
'select a.template_id, a.description from cstbs_template a where a.branch = global.current_branch and a.module = ''ID'' and exists ( select 1 from csvws_available_prodbr b where b.user_id = global.user_id and b.branch_code = global.current_branch and b.product_code = substr(a.contract_ref_no,4,4)) order by a.template_id',
100,'TEMPLATE_ID!TEXT!TEMPLATE_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TEMPLATE',
'SEDBLONL',
'select template_id,description from cstbs_template where branch = global.current_branch and module = ''SD'' and contract_ref_no in (select contract_ref_no from cstbs_contract where module=''SD'' and product_type=''BL'')',
10,'TEMPLATE_ID!TEXT!TEMPLATE_ID~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TEMPLATE',
'SEDSKONL',
'select template_id,description from cstbs_template where branch = global.current_branch and module = ''SD'' and contract_ref_no in (select contract_ref_no from cstbs_contract where module=''SD'' and product_type=''BL'') order by template_id',
100,'TEMPLATE_ID!TEXT!TEMPLATE_ID~DESCRIPTION!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TEMPLATE',
'XPDCONON',
'select template_id, description from cstbs_template where branch = global.current_branch and module = ''XP''',
100,'TEMPLATE_ID!TEXT!TEMPLATE_ID~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TEMPLATES_ALLOWED',
'SEDPFONL',
'SELECT TEMPLATE_ID, DESCRIPTION FROM CSTBS_TEMPLATE WHERE BRANCH = GLOBAL.CURRENT_BRANCH AND MODULE = ''SP'' AND CONTRACT_REF_NO IN (SELECT PORTFOLIO_REF_NO FROM SETMS_PORTFOLIO_MASTER WHERE PORTFOLIO_PRODUCT_CODE NOT IN (SELECT PRODUCT_CODE FROM CSTMS_PRODUCT WHERE RECORD_STAT = ''C'')) ORDER BY TEMPLATE_ID',
100,'TEMPLATE_ID!TEXT!TEMPLATE_ID~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TEMPLATE_ID',
'MSDCOMMS',
'select template_id from mstm_fft_template where record_stat=''O'' and auth_stat=''A''',
100,'TEMPLATE_ID!TEXT!TEMPLATE_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TEMPLATE_ID',
'MSDFFT',
'select template_id from mstm_fft_template where record_stat=''O'' and auth_stat=''A''',
100,'TEMPLATE_ID!TEXT!TEMPLATE_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TENOR',
'IADIFONL',
'SELECT TENOR FROM AMTM_ACC_CLASS_DETAIL WHERE FUND_ID = ? ORDER BY TENOR',
100,'TENOR!TEXT!TENOR',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TENOR',
'IADMLONL',
'select tenor from amtm_acc_class_detail where fund_id = ?',
100,'TENOR!TEXT!TENOR',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TENOR',
'IADSLONL',
'SELECT DISTINCT TENOR FROM AMTM_ACC_CLASS_DETAIL WHERE FUND_ID = ? ORDER BY TENOR',
50,'TENOR!TEXT!TENOR',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TENOR_CODE',
'CFCONINT',
'SELECT TENOR_CODE,TENOR_CODE_DESCRIPTION FROM CFTMS_TENOR_CODE_DEFN WHERE RATE_CODE=? ORDER BY TENOR_CODE',
100,'TENOR_CODE!TEXT!TENOR_CODE~TENOR_CODE_DESCRIPTION!TEXT!TENOR_CODE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TENOR_CODE',
'CFDFLRAT',
'select a. tenor_code,a.tenor_code_description from cftms_tenor_code_defn a, cftms_rate_code_defn b where a.rate_code = ? and a.rate_code = b.rate_code and b.once_auth = ''Y'' and b.record_stat = ''O'' order by a.tenor_code',
100,'TENOR_CODE!TEXT!TENOR_CODE~TENOR_CODE_DESCRIPTION!TEXT!TENOR_CODE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TENOR_CODE',
'CFDINTCL',
'SELECT TENOR_CODE,TENOR_CODE_DESCRIPTION FROM CFTMS_TENOR_CODE_DEFN WHERE RATE_CODE = ? ORDER BY TENOR_CODE',
100,'TENOR_CODE!TEXT!TENOR_CODE~TENOR_CODE_DESCRIPTION!TEXT!TENOR_CODE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TENOR_CODE',
'OTDCNONL',
'SELECT TENOR_CODE,TENOR_CODE_DESCRIPTION FROM CFTMS_TENOR_CODE_DEFN WHERE RATE_CODE=? ORDER BY TENOR_CODE',
100,'TENOR_CODE!TEXT!TENOR_CODE~TENOR_CODE_DESCRIPTION!TEXT!TENOR_CODE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TERM_DEP_AC_NO',
'IADREDMN',
'SELECT  distinct a.CUST_AC_NO,a.ac_desc,a.CUST_NO,a.ccy,A.ACY_CURR_BALANCE FROM STTM_CUST_ACCOUNT a,ictm_acc_pr b WHERE a.account_class in (select distinct account_class from STTM_ACCOUNT_CLASS where ac_class_type=''Y'' and ONCE_AUTH = ''Y'' and record_stat <> ''C'' and mudarabah_acc_class=''Y'')and a.ONCE_AUTH = ''Y'' and a.record_stat=''O''AND a.BRANCH_CODE = ? and a.BRANCH_CODE = b.BRN and a.CUST_AC_NO = b.ACC and b.waive=''N'' and  b.prod in (select d.PRODUCT_CODE from ictms_product_definition d ,ICTMs_PR_INT e where                      nvl(d.tax,''N'')=''N''and d.product_code = e.product_code and e.payment_method = ''B'' )  ORDER BY CUST_AC_NO',
100,'CUST_AC_NO!TEXT!CUST_AC_NO~AC_DESC!TEXT!AC_DESC~CUST_NO!TEXT!CUST_NO~CCY!TEXT!CCY',
'STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TERM_DEP_AC_NO',
'ICDREDMN',
'SELECT distinct a.CUST_AC_NO,a.ac_desc,a.CUST_NO,a.ccy,A.ACY_CURR_BALANCE FROM STTM_CUST_ACCOUNT a, ictm_acc_pr b WHERE a.account_class in (select distinct account_class from STTM_ACCOUNT_CLASS where ac_class_type = ''Y'' and ONCE_AUTH = ''Y'' and record_stat <> ''C'') AND a.CUST_NO IN (select c.customer_no from sttm_customer c where (c.group_code is not null and exists(select 1 from stvws_user_group g where g.user_id = GLOBAL.user_id and g.group_code = c.group_code)) OR c.group_code is null) and a.ONCE_AUTH = ''Y'' and a.record_stat = ''O'' AND a.BRANCH_CODE = ? and a.BRANCH_CODE = b.BRN and a.CUST_AC_NO = b.ACC and b.waive = ''N'' and b.prod in(select d.PRODUCT_CODE from ictms_product_definition d, ICTMs_PR_INT e where nvl(d.tax, ''N'') = ''N'' and d.product_code = e.product_code and NVL(MUDARABAH_PRODUCT, ''N'') = ''N'')ORDER BY CUST_AC_NO',
100,'CUST_AC_NO!TEXT!CUST_AC_NO~AC_DESC!TEXT!AC_DESC~CUST_NO!TEXT!CUST_NO~CCY!TEXT!CCY',
'STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TER_CCY',
'IDDACSAL',
'select a.ccy_code, a.ccy_name from cytms_ccy_defn a  where a.auth_stat = ''A'' and a.record_stat = ''O'' and exists ( select 1 from csvws_product_currencies b where b.product_code = ? and b.ccy_code = a.ccy_code) order by a.ccy_code',
100,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TER_COUNTERPRTY',
'IDDACSAL',
'select customer_no , short_name from sttms_customer where customer_no <> ? and auth_stat = ''A'' and record_stat = ''O'' order by customer_no',
100,'CUSTOMER_NO!TEXT!CUSTOMER_NO~SHORT_NAME!TEXT!SHORT_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_THEIR_CHARGE',
'BCDPRMNT',
'select component,event_for_liquidation from cftms_product_charge' || chr(10) || '               where product = ? and default_rule in (select rule from' || chr(10) || '               cftms_rule where type = ''H'')and component not in (select' || chr(10) || '               component from bctms_product_their_charges where prod_code = ?)' || chr(10) || '               order by component',
100,'COMPONENT!TEXT!COMPONENT~EVENT_FOR_LIQUIDATION!TEXT!EVENT_FOR_LIQUIDATION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_THRESHOLD_CCY',
'CLDPRMNT',
'SELECT CCY_CODE,CCY_NAME FROM CYTMS_CCY_DEFN WHERE RECORD_STAT = ''O'' AND AUTH_STAT = ''A'' ORDER BY CCY_CODE',
100,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_THROUGH_CCY',
'CYDCPAIR',
'select ccy_code, ccy_name from cytms_ccy_defn  where record_stat = ''O'' and once_auth = ''Y'' and  ccy_code in  (select ccy1  from cytbs_ccy_pair  where ccy2 = ?  intersect  select ccy1 from cytbs_ccy_pair where ccy2 = ?) order by ccy_code',
50,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_THRU_BRANCH',
'STDBRANC',
'SELECT BRANCH_CODE, BRANCH_NAME  FROM ( SELECT BRANCH_CODE,BRANCH_NAME FROM STTMS_BRANCH WHERE AUTH_STAT=''A'' AND RECORD_STAT=''O'' UNION SELECT   ?,	? FROM     dual ) WHERE 1=1 ORDER BY BRANCH_CODE',
100,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TILL',
'DEDTILBL',
'select DISTINCT b.till_id, b.user_id  from smvws_user_tills a, devws_user_tills b, detms_til_vlt_master c  where b.till_id = a.till_id  and b.branch_code = a.branch_code',
100,'TILL_ID!TEXT!TILL_ID~USER_ID!TEXT!USER_ID',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TILLS',
'SMDUSRDF',
'SELECT TILL_ID,BRANCH_CODE, TV_NAME FROM DETM_TIL_VLT_MASTER WHERE RECORD_STAT = ''O'' AND ONCE_AUTH=''Y'' ORDER BY BRANCH_CODE,TILL_ID',
500,'TILL_ID!TEXT!TILL_ID~BRANCH_CODE!TEXT!BRANCH_CODE~TV_NAME!TEXT!TV_NAME',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TITLE',
'STDCCIF',
'SELECT A.PREFIX1  FROM STTMS_CUST_PREFIX_DETAILS A,STTMS_CUST_PREFIX_MASTER B WHERE A.BRANCH_CODE= ? AND B.RECORD_STAT=''O'' AND B.AUTH_STAT=''A'' AND A.PREFIX1 IS NOT NULL AND A.BRANCH_CODE=B.BRANCH_CODE',
100,'PREFIX1!TEXT!PREFIX1',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TITLE',
'STDCIF',
'SELECT A.PREFIX1  FROM STTMS_CUST_PREFIX_DETAILS A,STTMS_CUST_PREFIX_MASTER B WHERE A.BRANCH_CODE= ? AND B.RECORD_STAT=''O'' AND B.AUTH_STAT=''A'' AND A.PREFIX1 IS NOT NULL AND A.BRANCH_CODE=B.BRANCH_CODE',
100,'PREFIX1!TEXT!PREFIX1',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TITLE',
'STDCOCIF',
'SELECT A.PREFIX1  FROM STTMS_CUST_PREFIX_DETAILS A,STTMS_CUST_PREFIX_MASTER B WHERE A.BRANCH_CODE= ? AND B.RECORD_STAT=''O'' AND B.AUTH_STAT=''A'' AND A.PREFIX1 IS NOT NULL AND A.BRANCH_CODE=B.BRANCH_CODE',
100,'PREFIX1!TEXT!PREFIX1',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO',
'BRRASSOC',
'select broker,product,ccy1,ccy2 from brtms_assoc order by broker,product,ccy1,ccy2',
200,'BROKER!TEXT!BROKER~PRODUCT!TEXT!PRODUCT~CCY1!TEXT!CCY1~CCY2!TEXT!CCY2',
'STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO',
'CYRFWRAT',
'SELECT CURRENCY1,CURRENCY2 FROM CYTMS_FWDRATE_MASTER ORDER BY CURRENCY1,CURRENCY2',
500,'CURRENCY1!TEXT!CURRENCY1~CURRENCY2!TEXT!CURRENCY2',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO',
'FXRNETMA',
'select customer_no from fxtms_netting_agmt order by customer_no',
500,'CUSTOMER_NO!TEXT!CUSTOMER_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO',
'GLRPCFLO',
'select product_code, product_description from cstms_product where record_stat = ''O'' and once_auth = ''Y'' order by product_code',
200,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO',
'ICRISFM',
'select a.rule_id,a.frm_no from ictm_is_fmt a,ictm_rule b where a.rule_id = b.rule_id and b.moduleid = ''IC'' order by rule_id,frm_no',
200,'RULE_ID!TEXT!RULE_ID~FRM_NO!TEXT!FRM_NO',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TOLMT_CODE',
'STDACCLS',
'SELECT LIMIT_CODE FROM STTM_TURNOVER_LIMIT WHERE AUTH_STAT=''A'' AND RECORD_STAT=''O''',
100,'LIMIT_CODE!TEXT!LIMIT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TOTAL_LINE',
'SEDDLONL',
'SELECT liab_id, line_cd||line_serial, main_line, ccy_restriction, line_currency, revolving_line,line_start_date, line_expiry_date, last_new_util_date, availability_flag, liab_br, record_stat, auth_stat FROM ELVW_LIMITS_INT l WHERE   l.liab_id = (SELECT c.liability_no        FROM sttms_customer c        WHERE c.customer_no = ?        )AND     nvl(l.last_new_util_date,to_date(''99991231'',''YYYYMMDD'')) >= ( SELECT d.today         FROM sttms_dates d        WHERE d.branch_code = GLOBAL.CURRENT_BRANCH ) AND     l.record_stat = ''O''AND     l.auth_stat = ''A''and     l.availability_flag = ''Y''      AND     (l.line_currency = (SELECT   SCY  FROM  setbs_deal_master  WHERE  deal_reference  =     (select deal_reference_no from setb_deal_detail where leg_reference_no = ?    AND  version   = 1    )  AND  version   = 1    )        OR l.ccy_restriction = ''N'')AND     (EXISTS           (SELECT * FROM ELVW_LIMITS_CUST_REST_INT cr            WHERE cr.liab_id     = l.liab_id             AND   cr.line_cd = l.line_cd            AND   cr.line_serial = l.line_serial            AND   cr.customer_no = ?           )         OR NOT EXISTS           (SELECT * FROM ELVW_LIMITS_CUST_REST_INT cr            WHERE cr.liab_id     = l.liab_id             AND   cr.line_cd     = l.line_cd            AND   cr.line_serial = l.line_serial           )        )AND     (EXISTS           (SELECT * FROM ELVW_LIMITS_PROD_REST_INT pr            WHERE pr.liab_id      = l.liab_id             AND   pr.line_cd      = l.line_cd AND   pr.line_serial  = l.line_serial            AND   pr.product_code = substr('''' , 4,4)            )         OR NOT EXISTS           (SELECT * FROM ELVW_LIMITS_PROD_REST_INT pr1            WHERE pr1.liab_id     = l.liab_id             AND   pr1.line_cd     = l.line_cd            AND   pr1.line_serial = l.line_serial           )        )AND     (EXISTS           (SELECT * FROM ELVW_LIMITS_BR_REST_INT b            WHERE b.liab_id     = l.liab_id             AND   b.line_cd     = l.line_c'||
'd     AND   b.line_serial = l.line_serial            AND   b.branch_code = GLOBAL.CURRENT_BRANCH           )         OR NOT EXISTS           (SELECT * FROM ELVW_LIMITS_BR_REST_INT b1            WHERE b1.liab_id     = l.liab_id             AND   b1.line_cd     = l.line_cd            AND   b1.line_serial = l.line_serial           )        )AND     (EXISTS           (SELECT * FROM ELVW_LIMITS_CCY_REST_INT cy            WHERE cy.liab_id     = l.liab_id             AND   cy.line_cd     = l.line_cd         AND   cy.line_serial = l.line_serial            AND   cy.ccy_code = (SELECT   SCY  FROM  setbs_deal_master  WHERE  deal_reference  =     (select deal_reference_no from setb_deal_detail where leg_reference_no = ?    AND  version   = 1    )  AND  version   = 1    )           )            )         OR NOT EXISTS           (SELECT * FROM ELVW_LIMITS_CCY_REST_INT cy1            WHERE cy1.liab_id     = l.liab_id             AND   cy1.line_cd     = l.line_cd            AND   cy1.line_serial = l.line_serial )        AND ( SELECT  to_number( dstl_date - trade_date )   FROM  setbs_deal_master  WHERE  deal_reference  =     (select deal_reference_no from setb_deal_detail where leg_reference_no = ?    AND  version   = 1    )  AND  version   = 1)        = 0    OR EXISTS (SELECT * FROM ELVW_LIMITS_TENOR_REST t                WHERE t.liab_id   = l.liab_id                 AND t.line_cd     = l.line_cd                AND t.line_serial = l.line_serial                AND t.tenor      >= ( SELECT  to_number( dstl_date - trade_date )   FROM  setbs_deal_master  WHERE  deal_reference  =     (select deal_reference_no from setb_deal_detail where leg_reference_no = ?    AND  version   = 1    )  AND  version   = 1    )    AND t.tenor < 99999)',
100,'LIAB_ID!TEXT!LIAB_ID~LINE_CD||LINE_SERIAL!TEXT!LINE_CD||LINE_SERIAL~MAIN_LINE!TEXT!MAIN_LINE~CCY_RESTRICTION!TEXT!CCY_RESTRICTION~LINE_CURRENCY!TEXT!LINE_CURRENCY~REVOLVING_LINE!TEXT!REVOLVING_LINE~LINE_START_DATE!TEXT!LINE_START_DATE~LINE_EXPIRY_DATE!TEXT!LINE_EXPIRY_DATE~LAST_NEW_UTIL_DATE!TEXT!LAST_NEW_UTIL_DATE~AVAILABILITY_FLAG!TEXT!AVAILABILITY_FLAG~LIAB_BR!TEXT!LIAB_BR~RECORD_STAT!TEXT!RECORD_STAT~AUTH_STAT!TEXT!AUTH_STAT',
'STRING~STRING~STRING~STRING~STRING~STRING~DATE~DATE~DATE~STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_ACC',
'CIRPCALC',
'select account_number from cltb_account_master where branch_code = global.current_branch AND module_code = ''CI'' order by account_number' || chr(10) || '',
'','ACCOUNT_NUMBER!TEXT!ACCOUNT_NUMBER',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_ACC',
'CIRPEVNT',
'select account_number from cltb_account_master where branch_code = global.current_branch AND module_code=''CI'' order by account_number',
'','ACCOUNT_NUMBER!TEXT!ACCOUNT_NUMBER',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_ACC',
'CIRPLICU',
'select account_number from cltb_account_master where auth_stat=''A''  and branch_code = Global.current_Branch and module_code = ''CI''' || chr(10) || '',
'','ACCOUNT_NUMBER!TEXT!ACCOUNT_NUMBER',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_ACC',
'CLRPCALC',
'select account_number from cltb_account_master where branch_code = global.current_branch order by account_number',
'','ACCOUNT_NUMBER!TEXT!ACCOUNT_NUMBER',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_ACC',
'CLRPEVNT',
'select account_number from cltb_account_master where branch_code = global.current_branch and module_code <> ''CI'' order by account_number' || chr(10) || '',
'','ACCOUNT_NUMBER!TEXT!ACCOUNT_NUMBER',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_ACC',
'CLRPLICU',
'select account_number from cltb_account_master where auth_stat=''A''  and branch_code = Global.current_Branch',
'','ACCOUNT_NUMBER!TEXT!ACCOUNT_NUMBER',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_ACCNO',
'ACDOPTN',
'select ac_gl_no, ac_gl_desc from (select ac_gl_no, ac_gl_desc from sttbs_account where nvl(branch_code, global.current_branch) =global.current_branch and ac_or_gl = ''A'' and ac_gl_no IN (SELECT cust_ac_no from sttm_cust_account a, STTMS_CUSTOMER b where a.cust_no = b.customer_no and((b.group_code is not null and EXISTS (select 1 from STVWS_USER_GROUP c where c.user_id = global.user_id and c.group_code = b.group_code)) OR b.group_code is null) and account_class in(select account_class  from SMVW_USER_ACCCLASS where user_id = global.user_id)) UNION select ac_gl_no, ac_gl_desc   from sttbs_account  where nvl(branch_code, global.current_branch) = global.current_branch and ac_or_gl = ''G'')  where 1 = 1  order by ac_gl_no',
1000,'AC_GL_NO!TEXT!AC_GL_NO~AC_GL_DESC!TEXT!AC_GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_ACNO',
'PCDACRED',
'SELECT branch_code, cust_ac_no, ccy, customer_name1  FROM (SELECT a.branch_code, a.cust_ac_no, a.ccy, b.customer_name1          FROM sttms_cust_account a, sttms_customer b         WHERE a.once_auth = ''Y'' AND a.record_stat=''O'' AND a.record_stat = ''O'' AND a.cust_no = b.customer_no        MINUS        SELECT a.cust_ac_brn, a.cust_ac_no, a.cust_ac_ccy, b.customer_name1          FROM pctms_acc_redirect a, sttms_customer b, sttmS_cust_account c         WHERE a.once_auth = ''Y'' AND a.record_stat = ''O'' AND a.cust_ac_no = c.cust_ac_no AND a.cust_ac_brn = c.branch_code AND               b.customer_no = c.cust_no)WHERE 1=1  ORDER BY 1',
500,'BRANCH_CODE!TEXT!BRANCH_CODE~CUST_AC_NO!TEXT!CUST_AC_NO~CCY!TEXT!CCY~CUSTOMER_NAME1!TEXT!REDIRECT_CUST_NAME',
'STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_BANK',
'PCDBKRED',
'select a.bank_code,a.bank_name from pctms_bank_param a where' || chr(10) || '               a.once_auth = ''Y'' and a.record_stat = ''O'' and not exists(select 1' || chr(10) || '               from pctms_bank_redirect b where b.bankcode = a.bank_code and' || chr(10) || '               b.once_auth = ''Y'' and b.record_stat = ''O'') order by 1',
100,'BANK_CODE!TEXT!BANK_CODE~BANK_NAME!TEXT!BANK_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_BATCH',
'ACRDLTXN',
'select batch_no , description from detbs_batch_master where branch_code = global.current_branch order by batch_no',
200,'BATCH_NO!TEXT!BATCH_NO~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_BATCH',
'ACRJRNAL',
'select batch_no , description from detbs_batch_master where branch_code = GLOBAL.CURRENT_BRANCH order by batch_no',
200,'BATCH_NO!TEXT!BATCH_NO~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_BRANCH',
'DERBATOT',
'select batch_no,description from detbs_batch_master where branch_code = global.current_branch',
200,'BATCH_NO!TEXT!BATCH_NO~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_BROKER_MULTIPLE',
'SEDBLKDL',
'select broker,name from brtm_brmaster where record_stat = ''O'' and auth_stat = ''A'' order by broker',
100,'BROKER!TEXT!BROKER~NAME!TEXT!NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_BROKER_SINGLE',
'SEDBLKDL',
'select BROKER,NAME from brtm_brmaster where record_stat = ''O'' and auth_stat = ''A'' order by broker',
100,'BROKER!TEXT!BROKER~NAME!TEXT!NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_CCY',
'ACDOPTN',
'select ccy_code from cytms_ccy_defn order by ccy_code',
100,'CCY_CODE!TEXT!CCY_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_COUNTERPARTY',
'SERCUCDL',
'select distinct b.counterparty from setb_deal_detail b, setb_deal_master a where a.deal_reference = b.deal_reference_no and a.contract_status = ''A'' and a.dstl_completed = ''N'' order by counterparty',
200,'COUNTERPARTY!TEXT!COUNTERPARTY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_CUSTOMER',
'MSDMAILR',
'select customer_no from sttm_customer where local_branch = ? and once_auth = ''Y'' AND record_stat = ''O'' order by customer_no',
100,'CUSTOMER_NO!TEXT!CUSTOMER_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_DATE',
'CLDCPNBK',
'SELECT DISTINCT TO_CHAR(SCHEDULE_DUE_DATE,''RRRR-MM-DD'') SCHEDULE_DUE_DATE FROM  CLTBS_ACCOUNT_SCHEDULES WHERE AMOUNT_DUE <> nvl(AMOUNT_SETTLED,0)AND BRANCH_CODE=? AND ACCOUNT_NUMBER=?and to_date(schedule_due_date,''DD-MON-RRRR'') >= to_date(?,''DD-MON-RRRR'')',
'','SCHEDULE_DUE_DATE!TEXT!SCHEDULE_DUE_DATE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_LIAB',
'LMDTRANS',
'SELECT liab_id,SHORT_NAME  FROM lmtms_liab a , STTMS_CUSTOMER b WHERE liab_id = customer_no and a.RECORD_STAT=''O'' AND a.AUTH_STAT=''A'' AND LOCAL_BRANCH=GLOBAL.CURRENT_BRANCH order by a.liab_id',
100,'LIAB_ID!TEXT!LIAB_ID~SHORT_NAME!TEXT!SHORT_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_LINE',
'LMDTRANS',
'SELECT LINE_CD||line_serial,LINE_CURRENCY LINE_CUR,LINE_CURRENCY TR_CUR,TO_CHAR(LINE_START_DATE,''YYYY-MM-DD''),TO_CHAR(LINE_EXPIRY_DATE,''YYYY-MM-DD''),LIMIT_AMOUNT,AVAILABLE_AMOUNT FROM LMTM_LIMITS WHERE LIAB_ID = ? AND LIAB_BR = GLOBAL.CURRENT_BRANCH AND RECORD_STAT=''O'' AND ONCE_AUTH=''Y'' AND AVAILABILITY_FLAG=''Y'' ORDER BY 1',
100,'LINE_CD||LINE_SERIAL!TEXT!LINE_CD||LINE_SERIAL',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_PERIOD_CODE',
'ICDPRCBT',
'SELECT PERIOD_CODE FROM STTM_PERIOD_CODES WHERE FIN_CYCLE = ? AND PERIOD_CODE <> ''FIN''',
500,'PERIOD_CODE!TEXT!PERIOD_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_PORTFOLIO',
'SERCUCDL',
'select distinct b.portfolio_id from setb_deal_master a, setb_deal_detail b where a.deal_reference = b.deal_reference_no and a.contract_status = ''A'' and a.dstl_completed = ''N'' order by portfolio_id',
200,'PORTFOLIO_ID!TEXT!PORTFOLIO_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_PORTFOLIO_MULTIPLE',
'SEDBLKDL',
'select a.portfolio_id , a.portfolio_description , a.portfolio_customer_id,a.portfolio_costing_method,a.portfolio_ref_no from setms_portfolio_master a where ( a.portfolio_type = decode( ? , ''BB'' , ''B'' , ''C'') or a.portfolio_type = decode( ? , ''BB'' , ''I'' , ''C'') ) and a.portfolio_local_branch = global.current_branch and a.contract_status = ''A'' and a.record_stat = ''O'' and a.auth_stat = ''A'' and exists ( select 1 from setm_dealprod_pfolios_access where sedeal_product_code = ? and portfolio_id = a.portfolio_id and access_allowed_flag = ''Y'' ) and not exists (select 1 from setms_sec_prod_disallow where portfolio_id = a.portfolio_id and security_prod_disallow = (select product from setms_security_master where internal_sec_id = ?)) union select a.portfolio_id , a.portfolio_description , a.portfolio_customer_id,a.portfolio_costing_method, a.portfolio_ref_no from setms_portfolio_master a where ( a.portfolio_type = decode( ? , ''BB'' , ''B'' , ''C'') or a.portfolio_type = decode( ? , ''BB'' , ''I'' , ''C'') ) and a.portfolio_local_branch = global.current_branch and a.contract_status = ''A'' and a.record_stat = ''O'' and a.auth_stat = ''A'' and not exists ( select 1 from setm_dealprod_pfolios_access where sedeal_product_code = ? and portfolio_id = a.portfolio_id ) and (exists ( select 1 from setms_dealproduct_restrictions c , setms_deal_product d where c.sedeal_product_code = ? and c.sedeal_product_code = d.product_code and c.seproduct_code = a.portfolio_product_code and c.seproduct_type = ''PF'' and d.pf_restriction_type = ''A'' ) or (exists ( select 1 from cstms_product where product_code = a.portfolio_product_code and auth_stat = ''A'' and record_stat = ''O'' ) and not exists ( select 1 from setms_dealproduct_restrictions where sedeal_product_code = ? and seproduct_code = a.portfolio_product_code and seproduct_type = ''PF'' ) and exists ( select 1 from setms_deal_product where product_code = ? and pf_restriction_type = ''D'') ) ) and not exists (select 1 from'||
' setms_sec_prod_disallow where portfolio_id = a.portfolio_id and security_prod_disallow = (select product from setms_security_master where internal_sec_id = ?))',
100,'PORTFOLIO_ID!TEXT!PORTFOLIO_ID~PORTFOLIO_DESCRIPTION!TEXT!PORTFOLIO_DESCRIPTION~PORTFOLIO_CUSTOMER_ID!TEXT!PORTFOLIO_CUSTOMER_ID~PORTFOLIO_COSTING_METHOD!TEXT!PORTFOLIO_COSTING_METHOD~PORTFOLIO_REF_NO!TEXT!PORTFOLIO_REF_NO',
'STRING~STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_PORTFOLIO_SINGLE',
'SEDBLKDL',
'select a.portfolio_id , portfolio_description , a.portfolio_customer_id, a.portfolio_costing_method,a.portfolio_ref_no from setms_portfolio_master a where ( a.portfolio_type = decode( ? , ''BB'' , ''B'' , ''C'') or a.portfolio_type = decode( ? , ''BB'' , ''I'' , ''C'') ) and a.portfolio_local_branch = global.current_branch and a.contract_status = ''A'' and a.record_stat = ''O'' and a.auth_stat = ''A'' and exists ( select 1 from setm_dealprod_pfolios_access where sedeal_product_code = ? and portfolio_id = a.portfolio_id and access_allowed_flag = ''Y'' ) and not exists (select 1 from setms_sec_prod_disallow where portfolio_id = a.portfolio_id and security_prod_disallow = (select product from setms_security_master where internal_sec_id = ?)) union select a.portfolio_id , a.portfolio_description , a.portfolio_customer_id, a.portfolio_costing_method,a.portfolio_ref_no from setms_portfolio_master a where ( a.portfolio_type = decode( ? , ''BB'' , ''B'' , ''C'') or a.portfolio_type = decode( ? , ''BB'' , ''I'' , ''C'') ) and a.portfolio_local_branch = global.current_branch and a.contract_status = ''A'' and a.record_stat = ''O'' and a.auth_stat = ''A'' and not exists ( select 1 from setm_dealprod_pfolios_access where sedeal_product_code = ?and portfolio_id = a.portfolio_id ) and (exists ( select 1 from setms_dealproduct_restrictions c , setms_deal_product d where c.sedeal_product_code = ? and c.sedeal_product_code = d.product_code and c.seproduct_code = a.portfolio_product_code and c.seproduct_type = ''PF'' and d.pf_restriction_type = ''A'' ) or (exists ( select 1 from cstms_product where product_code = a.portfolio_product_code and auth_stat = ''A'' and record_stat = ''O'' ) and not exists ( select 1 from setms_dealproduct_restrictions where sedeal_product_code = ? and seproduct_code = a.portfolio_product_code and seproduct_type = ''PF'' ) and exists ( select 1 from setms_deal_product where product_code = ? and pf_restriction_type = ''D'') ) ) and not exists (select 1 from s'||
'etms_sec_prod_disallow where portfolio_id = a.portfolio_id and security_prod_disallow = (select product from setms_security_master where internal_sec_id = ?))',
100,'PORTFOLIO_ID!TEXT!PORTFOLIO_ID~PORTFOLIO_DESCRIPTION!TEXT!PORTFOLIO_DESCRIPTION~PORTFOLIO_CUSTOMER_ID!TEXT!PORTFOLIO_CUSTOMER_ID~PORTFOLIO_COSTING_METHOD!TEXT!PORTFOLIO_COSTING_METHOD~PORTFOLIO_REF_NO!TEXT!PORTFOLIO_REF_NO',
'STRING~STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_PRD',
'IADPROJP',
'SELECT PERIOD_CODE, FIN_CYCLE FROM STTM_PERIOD_CODES  WHERE FIN_CYCLE = ? ORDER BY FIN_CYCLE,PERIOD_CODE',
100,'PERIOD_CODE!TEXT!PERIOD_CODE~FIN_CYCLE!TEXT!FIN_CYCLE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_SECURITY',
'SERSHSEC',
'select distinct a.security_id,b.security_description from setb_pfolio_skacbalances a, setm_security_master b where a.current_holding < 0 and a.security_id = b.internal_sec_id order by a.security_id',
500,'SECURITY_ID!TEXT!SECURITY_ID~SECURITY_DESCRIPTION!TEXT!SECURITY_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_UDF',
'PCDPDCTG',
'SELECT field_no,field_desc  FROM pctms_ud_maint ORDER BY FIELD_NO',
100,'FIELD_NO!TEXT!FIELD_NO~FIELD_DESC!TEXT!FIELD_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_UDF_A',
'PCDPDCTG',
'SELECT field_no,field_desc  FROM pctms_ud_maint ORDER BY FIELD_NO',
100,'FIELD_NO!TEXT!FIELD_NO~FIELD_DESC!TEXT!FIELD_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_UDF_RC',
'PCDPDCTG',
'SELECT field_no,field_desc  FROM pctms_ud_maint ORDER BY FIELD_NO',
100,'FIELD_NO!TEXT!FIELD_NO~FIELD_DESC!TEXT!FIELD_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_UDF_RED',
'PCDPDCTG',
'SELECT field_no,field_desc  FROM pctms_ud_maint ORDER BY FIELD_NO',
100,'FIELD_NO!TEXT!FIELD_NO~FIELD_DESC!TEXT!FIELD_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_UDF_REV',
'PCDPDCTG',
'SELECT field_no,field_desc  FROM pctms_ud_maint ORDER BY FIELD_NO',
100,'FIELD_NO!TEXT!FIELD_NO~FIELD_DESC!TEXT!FIELD_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TO_UDF_RJ',
'PCDPDCTG',
'SELECT field_no,field_desc  FROM pctms_ud_maint ORDER BY FIELD_NO',
100,'FIELD_NO!TEXT!FIELD_NO~FIELD_DESC!TEXT!FIELD_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRACER_CODE',
'LCDPRMNT',
'SELECT MSG_TYPE,DESCRIPTION FROM MSTMS_MSG_TYPE WHERE MODULE=''LC'' AND TRACER=''Y'' ORDER BY MSG_TYPE',
100,'MSG_TYPE!TEXT!MSG_TYPE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRADING_LOST',
'RVDSETUP',
'SELECT GL_CODE,GL_DESC FROM GLTMS_GLMASTER G WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' AND CATEGORY IN (''3'',''4'' , ''5'' , ''6'' ) AND HO_RES = ''A'' AND LEAF = ''Y'' ORDER BY 1',
500,'GL_CODE!TEXT!GL_CODE~GL_DESC!TEXT!GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRADING_PROFIT',
'RVDSETUP',
'SELECT GL_CODE,GL_DESC FROM GLTMS_GLMASTER G WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' AND CATEGORY IN (''3'',''4'' , ''5'' , ''6'' ) AND HO_RES = ''A'' AND LEAF = ''Y'' ORDER BY 1',
500,'GL_CODE!TEXT!GL_CODE~GL_DESC!TEXT!GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRANCHE',
'LNDPRMNT',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION,PARTICIPANT_PRODUCT,PARTICIPANT_PRODUCT_DESC FROM (SELECT A.PRODUCT_CODE,A.PRODUCT_DESCRIPTION,A.PARTICIPANT_PRODUCT,A.PARTICIPANT_PRODUCT_DESC FROM LSVWS_TRDD_PART_PROD_DESC A,CLTM_PRODUCT B WHERE A.PRODUCT_TYPE = ''C'' AND A.AUTH_STAT = ''A'' AND A.RECORD_STAT = ''O'' AND A.MODULE = ''LS'' AND A.PRODUCT_CODE = B.PRODUCT_CODE AND NVL(B.PRODUCT_END_DATE, GLOBAL.APPLICATION_DATE) >= GLOBAL.APPLICATION_DATE ORDER BY A.PRODUCT_CODE) WHERE 1=1',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRANCHE_REF_NO',
'LSRPPTCO',
'select ''ALL'' contract_ref_no,''ALL'' syndication_ref_no from dual union SELECT   a.account_number,c.facility_ref_no FROM    cltb_account_master a, cstb_contract b , LSTB_ACCOUNT_MASTER c WHERE   a.account_number = b.contract_ref_no AND   a.ACCOUNT_NUMBER=c.account_number and   a.version_no = b.latest_version_no AND    a.branch_code = global.current_branch   AND       a.module_code = ''LS'' AND  a.LOAN_TYPE= ''C'' AND         b.contract_status = ''A''',
100,'CONTRACT_REF_NO!TEXT!CONTRACT_REF_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRANCHE_REF_NO',
'LSRPTDDT',
'select ''ALL'' contract_ref_no, ''ALL'' syndication_ref_no  from dual union SELECT a.account_number, c.facility_ref_no  FROM cltb_Account_master a,cstb_contract b,lstb_account_master c WHERE a.account_number = b.contract_ref_no AND       a.version_no = b.latest_version_no AND       a.account_number=c.account_number AND       a.branch_code =global.current_branch AND a.module_code = ''LS'' AND       a.loan_type = ''C'' AND b.contract_status = ''A'' AND       b.auth_status = ''A''',
'','CONTRACT_REF_NO!TEXT!CONTRACT_REF_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRANCHE_REF_NO',
'LSRTBDET',
'select  a.ACCOUNT_NUMBER Tranche_Ref_No from cltb_account_master a, lstb_account_master b where a.account_number = b.account_number AND a.branch_code = b.branch_code AND a.module_code = ''LS'' and a.loan_type = ''C'' and a.AUTH_STAT = ''A'' and a.account_status IN (''Y'',''A'') ',
'','TRANCHE_REF_NO!TEXT!TRANCHE_REF_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRANSACTION',
'IFDATMMN',
'SELECT TRN_CODE,TRN_DESC FROM sttms_trn_code WHERE AUTH_STAT=''A'' AND RECORD_STAT=''O'' ORDER BY TRN_CODE',
100,'TRN_CODE!TEXT!TRN_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRANSFER_CODE',
'LMDTRANS',
'SELECT FIELD_NAME,FIELD_DESC,TO_CHAR(GLOBAL.APPLICATION_DATE,''YYYY-MM-DD'') BR_DATE FROM  LMTM_TRANSFER_CODE ORDER BY FIELD_NAME',
100,'FIELD_NAME!TEXT!FIELD_NAME~FIELD_DESC!TEXT!FIELD_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRANSFER_GL',
'BCDPRMNT',
'select gl_code ,gl_desc from gltms_glmaster a where a.leaf = ''Y''' || chr(10) || '               order by category, gl_desc',
100,'GL_CODE!TEXT!GL_CODE~GL_DESC!TEXT!GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRANSFER_NAME',
'GIDFTPTF',
'SELECT FTP_NAME,DESCRIPTION,EXTERNAL_SYSTEM,FILE_NAME,LOCAL_PATH,REMOTE_PATH,PROTOCOL FROM STTM_FTP_DETAILS WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y''',
100,'FTP_NAME!TEXT!FTP_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRANSFER_TO',
'LSDPATFR',
'SELECT PARTICIPANT, CUSTOMER_NAME1 FROM (SELECT CUSTOMER_NO PARTICIPANT, CUSTOMER_NAME1 FROM STTMS_CUSTOMER A WHERE RECORD_STAT = ''O''AND AUTH_STAT = ''A'')  WHERE 1 = 1  ORDER BY 1',
200,'PARTICIPANT!TEXT!PARTICIPANT~CUSTOMER_NAME1!TEXT!CUSTOMER_NAME1',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRANSLATION_REQD',
'GIDIFTDF',
'SELECT TNAME FROM GITM_TRANSLATE_MASTER WHERE RECORD_STAT=''O'' AND ONCE_AUTH=''Y''',
100,'TNAME!TEXT!TNAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRANSLATION_TYPE',
'ADDOGLTR',
'SELECT null  AS SEG_NO,  ''SET_OF_BOOKS_ID''  AS segment FROM DUAL UNION SELECT NVL2(segment_1 ,1,NULL)  AS SEG_NO,  segment_1  AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_2 ,2,NULL)  AS SEG_NO,  segment_2  AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_3 ,3,NULL)  AS SEG_NO,  segment_3  AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_4 ,4,NULL)  AS SEG_NO,  segment_4  AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_5 ,5,NULL)  AS SEG_NO,  segment_5  AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_6 ,6,NULL)  AS SEG_NO,  segment_6  AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_7 ,7,NULL)  AS SEG_NO,  segment_7  AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_8 ,8,NULL)  AS SEG_NO,  segment_8  AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_9 ,9,NULL)  AS SEG_NO,  segment_9  AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_10,10,NULL) AS SEG_NO,  segment_10 AS segment FROM egtm_ccid_mapping_param UNION SELECT NVL2(segment_11,11,NULL) AS SEG_NO,  segment_11 AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_12,12,NULL) AS SEG_NO,  segment_12 AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_13,13,NULL) AS SEG_NO,  segment_13 AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_14,14,NULL) AS SEG_NO,  segment_14 AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_15,15,NULL) AS SEG_NO,  segment_15 AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_16,16,NULL) AS SEG_NO,  segment_16 AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_17,17,NULL) AS SEG_NO,  segment_17 AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_18,18,NULL) AS SEG_NO,  segment_18 AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_19,19,NULL) AS SEG_NO,  segment_19 AS segment FROM egtm_ccid_mapping_par'||
'am UNION SELECT  NVL2(segment_20,20,NULL) AS SEG_NO,  segment_20 AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_21,21,NULL) AS SEG_NO,  segment_21 AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_22,22,NULL) AS SEG_NO,  segment_22 AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_23,23,NULL) AS SEG_NO,  segment_23 AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_24,24,NULL) AS SEG_NO,  segment_24 AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_25,25,NULL) AS SEG_NO,  segment_25 AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_26,26,NULL) AS SEG_NO,  segment_26 AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_27,27,NULL) AS SEG_NO,  segment_27 AS segment FROM egtm_ccid_mapping_param UNION SELECT NVL2(segment_28,28,NULL) AS SEG_NO,  segment_28 AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_29,29,NULL) AS SEG_NO,  segment_29 AS segment FROM egtm_ccid_mapping_param UNION SELECT  NVL2(segment_30,30,NULL) AS SEG_NO,  segment_30 AS segment FROM egtm_ccid_mapping_param order by SEG_NO',
100,'SEG_NO!TEXT!SEG_NO~SEGMENT!TEXT!SEGMENT',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TREF',
'DEDQUERY',
'SELECT trn_ref_no FROM detbs_rtl_teller WHERE substr(trn_ref_no,1,3) = global.current_branch         ORDER BY trn_ref_no',
1800,'TRN_REF_NO!TEXT!TRN_REF_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRNCD',
'EGDGLPRM',
'SELECT TRN_CODE, TRN_DESC from STTM_TRN_CODE WHERE ONCE_AUTH=''Y'' AND RECORD_STAT=''O'' ORDER BY TRN_CODE',
300,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRNCODE',
'STDBANKP',
'select trn_code from sttms_trn_code where auth_stat = ''A'' and record_stat = ''O''  ORDER BY trn_code',
500,'TRN_CODE!TEXT!TRN_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRN_CODE',
'BRDDISCO',
'select trn_code, trn_desc from sttms_trn_code where record_stat=''O'' and once_auth=''Y'' order by trn_code',
100,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRN_CODE',
'CSCACADD',
'select trn_code, trn_desc from sttms_trn_code where record_stat = ''O'' and ONCE_AUTH=''Y'' order by trn_code',
100,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRN_CODE',
'ICDPRMNT',
'SELECT TRN_CODE, TRN_DESC FROM STTMS_TRN_CODE WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY TRN_CODE',
100,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRN_CODE',
'LQDDLIQ',
'SELECT TRN_CODE, TRN_DESC FROM STTMS_TRN_CODE WHERE RECORD_STAT = ''O'' AND AUTH_STAT = ''A'' AND CHEQUE_MANDATORY = ''N'' order by TRN_CODE',
100,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRN_CODE',
'RVDSETUP',
'SELECT TRN_CODE,TRN_DESC FROM STTMS_TRN_CODE WHERE RECORD_STAT=''O'' AND ONCE_AUTH=''Y''ORDER BY 1',
500,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRN_CODE',
'VPDLIQON',
'SELECT DISTINCT TRN_CODE FROM STTMS_TRN_CODE WHERE ONCE_AUTH=''Y'' AND RECORD_STAT=''O'' ORDER BY TRN_CODE',
100,'TRN_CODE!TEXT!TRN_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRN_CODE_MAIN',
'STDBRANC',
'select trn_code, trn_desc from sttms_trn_code where record_stat = ''O'' and auth_stat = ''A'' and avl_info = ''I'' order by trn_code',
'','TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRS_PC_PROD_CATEGORY',
'STDBANKP',
'select prod_category from pctms_product_category where product_type = ''OC'' and collection_type in (''DD'',''RFD'') ORDER BY prod_category',
500,'PROD_CATEGORY!TEXT!PROD_CATEGORY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRS_SORT_CODE',
'STDBANKP',
'select bankcode from pctms_product_banks ORDER BY bankcode',
500,'BANKCODE!TEXT!BANKCODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TRS_SUSPENCE_ACC',
'STDBANKP',
'SELECT ac_gl_no FROM (select A.ac_gl_no from sttb_account A ,gltm_glmaster B where B.gl_code=A.ac_gl_no and B.leaf=''Y'' order by B.category) WHERE 1=1',
500,'AC_GL_NO!TEXT!AC_GL_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXNCODE_DIS_TIL',
'DEDBRCON',
'SELECT TRN_CODE, TRN_DESC FROM STTM_TRN_CODE WHERE ONCE_AUTH=''Y'' AND RECORD_STAT=''O'' AND CHEQUE_MANDATORY=''N'' ORDER BY TRN_CODE',
100,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXNCODE_DIS_VLT',
'DEDBRCON',
'SELECT TRN_CODE, TRN_DESC FROM STTM_TRN_CODE WHERE ONCE_AUTH=''Y'' AND RECORD_STAT=''O'' AND CHEQUE_MANDATORY=''N'' ORDER BY TRN_CODE',
100,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXNCODE_TIL_DIS',
'DEDBRCON',
'SELECT TRN_CODE, TRN_DESC FROM STTM_TRN_CODE WHERE ONCE_AUTH=''Y'' AND RECORD_STAT=''O'' AND CHEQUE_MANDATORY=''N'' ORDER BY TRN_CODE',
100,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXNCODE_TIL_TIL',
'DEDBRCON',
'SELECT TRN_CODE, TRN_DESC FROM STTM_TRN_CODE WHERE ONCE_AUTH=''Y'' AND RECORD_STAT=''O'' AND CHEQUE_MANDATORY=''N'' ORDER BY TRN_CODE',
100,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXNCODE_TIL_VLT',
'DEDBRCON',
'SELECT TRN_CODE, TRN_DESC FROM STTM_TRN_CODE WHERE ONCE_AUTH=''Y'' AND RECORD_STAT=''O'' AND CHEQUE_MANDATORY=''N'' ORDER BY TRN_CODE',
100,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXNCODE_VLT_DIS',
'DEDBRCON',
'SELECT TRN_CODE, TRN_DESC FROM STTM_TRN_CODE WHERE ONCE_AUTH=''Y'' AND RECORD_STAT=''O'' AND CHEQUE_MANDATORY=''N'' ORDER BY TRN_CODE',
100,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXNCODE_VLT_TIL',
'DEDBRCON',
'SELECT TRN_CODE, TRN_DESC FROM STTM_TRN_CODE WHERE ONCE_AUTH=''Y'' AND RECORD_STAT=''O'' AND CHEQUE_MANDATORY=''N'' ORDER BY TRN_CODE',
100,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXNCODE_VLT_VLT',
'DEDBRCON',
'SELECT TRN_CODE, TRN_DESC FROM STTM_TRN_CODE WHERE ONCE_AUTH=''Y'' AND RECORD_STAT=''O'' AND CHEQUE_MANDATORY=''N'' ORDER BY TRN_CODE',
100,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_1',
'ISCTXMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class =' || chr(10) || '               ?) and (active=''A'') order by mis_code',
100,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_1',
'MICACCTM',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'')',
20,'MIS_CODE!TEXT!MIS_CODE~CODE_DESC!TEXT!CODE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_1',
'MICJRMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'') order by mis_code',
500,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_1',
'MICMOMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?)' || chr(10) || '             and (active=''A'') order by mis_code',
10,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_1',
'MICTXMIS',
'SELECT /*+ DYNAMIC_SAMPLING(M, 4)*/ MIS_CODE,MIS_CLASS,CODE_DESC FROM TABLE(FN_GET_MIS_CODES(?,''T'',1,?)) M',
10,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_10',
'ISCTXMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class =' || chr(10) || '               ?) and (active=''A'') order by mis_code',
100,'MIS_CODE!TEXT!MIS_CODE~CODE_DESC!TEXT!CODE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_10',
'MICACCTM',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'')',
20,'MIS_CODE!TEXT!MIS_CODE~CODE_DESC!TEXT!CODE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_10',
'MICJRMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'') order by mis_code',
500,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_10',
'MICMOMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?)' || chr(10) || '             and (active=''A'') order by mis_code',
10,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_10',
'MICTXMIS',
'SELECT /*+ DYNAMIC_SAMPLING(M, 4)*/ MIS_CODE,MIS_CLASS,CODE_DESC FROM TABLE(FN_GET_MIS_CODES(?,''T'',10,?)) M',
10,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_2',
'ISCTXMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class =' || chr(10) || '               ?) and (active=''A'') order by mis_code',
100,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_2',
'MICACCTM',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'')',
20,'MIS_CODE!TEXT!MIS_CODE~CODE_DESC!TEXT!CODE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_2',
'MICJRMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'') order by mis_code',
500,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_2',
'MICMOMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?)' || chr(10) || '             and (active=''A'') order by mis_code',
10,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_2',
'MICTXMIS',
'SELECT /*+ DYNAMIC_SAMPLING(M, 4)*/ MIS_CODE,MIS_CLASS,CODE_DESC FROM TABLE(FN_GET_MIS_CODES(?,''T'',2,?)) M',
10,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_3',
'ISCTXMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class =' || chr(10) || '               ?) and (active=''A'') order by mis_code',
100,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_3',
'MICACCTM',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'')',
20,'MIS_CODE!TEXT!MIS_CODE~CODE_DESC!TEXT!CODE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_3',
'MICJRMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'') order by mis_code',
500,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_3',
'MICMOMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?)' || chr(10) || '             and (active=''A'') order by mis_code',
10,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_3',
'MICTXMIS',
'SELECT /*+ DYNAMIC_SAMPLING(M, 4)*/ MIS_CODE,MIS_CLASS,CODE_DESC FROM TABLE(FN_GET_MIS_CODES(?,''T'',3,?)) M',
10,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_4',
'ISCTXMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class =' || chr(10) || '               ?) and (active=''A'') order by mis_code',
100,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_4',
'MICACCTM',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'')',
20,'MIS_CODE!TEXT!MIS_CODE~CODE_DESC!TEXT!CODE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_4',
'MICJRMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'') order by mis_code',
500,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_4',
'MICMOMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?)' || chr(10) || '             and (active=''A'') order by mis_code',
10,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_4',
'MICTXMIS',
'SELECT /*+ DYNAMIC_SAMPLING(M, 4)*/ MIS_CODE,MIS_CLASS,CODE_DESC FROM TABLE(FN_GET_MIS_CODES(?,''T'',4,?)) M',
10,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_5',
'ISCTXMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class =' || chr(10) || '               ?) and (active=''A'') order by mis_code',
100,'MIS_CODE!TEXT!MIS_CODE~CODE_DESC!TEXT!CODE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_5',
'MICACCTM',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'')',
20,'MIS_CODE!TEXT!MIS_CODE~CODE_DESC!TEXT!CODE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_5',
'MICJRMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'') order by mis_code',
500,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_5',
'MICMOMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?)' || chr(10) || '             and (active=''A'') order by mis_code',
10,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_5',
'MICTXMIS',
'SELECT /*+ DYNAMIC_SAMPLING(M, 4)*/ MIS_CODE,MIS_CLASS,CODE_DESC FROM TABLE(FN_GET_MIS_CODES(?,''T'',5,?)) M',
10,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_6',
'ISCTXMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class =' || chr(10) || '               ?) and (active=''A'') order by mis_code',
100,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_6',
'MICACCTM',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'')',
20,'MIS_CODE!TEXT!MIS_CODE~CODE_DESC!TEXT!CODE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_6',
'MICJRMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'') order by mis_code',
500,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_6',
'MICMOMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?)' || chr(10) || '             and (active=''A'') order by mis_code',
10,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_6',
'MICTXMIS',
'SELECT /*+ DYNAMIC_SAMPLING(M, 4)*/ MIS_CODE,MIS_CLASS,CODE_DESC FROM TABLE(FN_GET_MIS_CODES(?,''T'',6,?)) M',
10,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_7',
'ISCTXMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class =' || chr(10) || '               ?) and (active=''A'') order by mis_code',
100,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_7',
'MICACCTM',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'')',
20,'MIS_CODE!TEXT!MIS_CODE~CODE_DESC!TEXT!CODE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_7',
'MICJRMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'') order by mis_code',
500,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_7',
'MICMOMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?)' || chr(10) || '             and (active=''A'') order by mis_code',
10,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_7',
'MICTXMIS',
'SELECT /*+ DYNAMIC_SAMPLING(M, 4)*/ MIS_CODE,MIS_CLASS,CODE_DESC FROM TABLE(FN_GET_MIS_CODES(?,''T'',7,?)) M',
10,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_8',
'ISCTXMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class =' || chr(10) || '               ?) and (active=''A'') order by mis_code',
100,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_8',
'MICACCTM',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'')',
20,'MIS_CODE!TEXT!MIS_CODE~CODE_DESC!TEXT!CODE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_8',
'MICJRMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'') order by mis_code',
500,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_8',
'MICMOMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?)' || chr(10) || '             and (active=''A'') order by mis_code',
10,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_8',
'MICTXMIS',
'SELECT /*+ DYNAMIC_SAMPLING(M, 4)*/ MIS_CODE,MIS_CLASS,CODE_DESC FROM TABLE(FN_GET_MIS_CODES(?,''T'',8,?)) M',
10,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_9',
'ISCTXMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class =' || chr(10) || '               ?) and (active=''A'') order by mis_code',
100,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_9',
'MICACCTM',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'')',
20,'MIS_CODE!TEXT!MIS_CODE~CODE_DESC!TEXT!CODE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_9',
'MICJRMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'') order by mis_code',
500,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_9',
'MICMOMIS',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?)' || chr(10) || '             and (active=''A'') order by mis_code',
10,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_9',
'MICTXMIS',
'SELECT /*+ DYNAMIC_SAMPLING(M, 4)*/ MIS_CODE,MIS_CLASS,CODE_DESC FROM TABLE(FN_GET_MIS_CODES(?,''T'',9,?)) M',
10,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_ACC',
'IFDATMMN',
'SELECT  DISTINCT ac_gl_no,ac_gl_desc FROM   (SELECT ac_gl_no              ,ac_gl_desc        FROM   sttbs_account        WHERE  branch_code = decode(?, ''*.*'', branch_code, ?) AND               ac_gl_ccy = decode(?, ''*.*'', ac_gl_ccy, ?) AND               ac_class IN (SELECT account_class                            FROM   sttm_account_class                            WHERE  ac_class_type <> ''Y'') AND auth_stat = ''A'' AND ac_gl_rec_status = ''O''        UNION        SELECT ac_gl_no           ,ac_gl_desc        FROM   sttbs_account        WHERE  branch_code IS NULL AND ac_or_gl = ''G'' AND ac_gl_rec_status = ''O'')WHERE  1 = 1 ORDER BY ac_gl_no',
100,'AC_GL_NO!TEXT!AC_GL_NO~AC_GL_DESC!TEXT!AC_GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_BRN',
'IFDATMMN',
'SELECT branch_code  ,branch_name  FROM   (SELECT branch_code              ,branch_name        FROM   sttms_branch        WHERE  auth_stat = ''A'' AND record_stat = ''O''        UNION        SELECT ''*.*''              ,''ALL BRANCH''        FROM   dual)WHERE  1 = 1 ORDER BY branch_code',
100,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_CCY',
'IADREDMN',
'SELECT DISTINCT(CCY_CODE), CCY_NAME FROM CYTMS_CCY_DEFN WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY CCY_CODE',
100,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_CCY',
'ICDREDMN',
'SELECT DISTINCT(CCY_CODE), CCY_NAME FROM CYTMS_CCY_DEFN WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY CCY_CODE',
100,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_CCY',
'PCDFTONL',
'SELECT bc.ccy_code CCY_CODE, cc.ccy_name CCY_NAME FROM sttms_branch_ccy bc, cytms_ccy_defn cc WHERE bc.ccy_code = cc.ccy_code AND bc.branch_code = global.current_branch order by CCY_CODE',
100,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_CCY',
'PCDONONL',
'SELECT bc.ccy_code CCY_CODE, cc.ccy_name CCY_NAME FROM sttms_branch_ccy bc, cytms_ccy_defn cc WHERE bc.ccy_code = cc.ccy_code AND bc.branch_code = global.current_branch order by CCY_CODE',
100,'CCY_CODE!TEXT!BC.CCY_CODE~CCY_NAME!TEXT!CC.CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_CODE',
'CSDACTCL',
'SELECT TRN_CODE, TRN_DESC FROM STTMS_TRN_CODE WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY TRN_CODE',
200,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_CODE',
'DEDJRONL',
'select trn_code,trn_desc,cheque_mandatory from sttms_trn_code where record_stat = ''O'' and auth_stat = ''A'' and avail_bal_reqd=''Y'' order by trn_code',
500,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_CODE',
'ICDBRMNT',
'select trn_code, trn_desc from sttms_trn_code where record_stat = ''O'' and once_auth = ''Y'' order by trn_code',
100,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_CODE',
'ICDPRMNT',
'SELECT TRN_CODE, TRN_DESC FROM STTMS_TRN_CODE WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY TRN_CODE',
100,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_CODE',
'LDDBRMNT',
'select trn_code, trn_desc from sttms_trn_code where record_stat = ''O'' and once_auth = ''Y'' order by trn_code',
200,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_CODE',
'STDBRANC',
'select trn_code, trn_desc from sttm_trn_code where record_stat = ''O'' and auth_stat = ''A'' and avl_info = ''I'' order by trn_code',
100,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_CODE_CHG',
'ICDPRMNT',
'SELECT TRN_CODE,TRN_DESC FROM STTMS_TRN_CODE WHERE RECORD_STAT=''O'' AND ONCE_AUTH=''Y'' ORDER BY TRN_CODE',
100,'TRN_CODE!TEXT!TRN_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_CODE_MAIN',
'DEDTEMPL',
'select trn_code, trn_desc from sttms_trn_code where record_stat = ''O'' and auth_stat = ''A'' order by trn_code',
500,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_CODE_OFF',
'DEDTEMPL',
'select trn_code, trn_desc from sttms_trn_code where record_stat = ''O'' and auth_stat = ''A'' order by trn_code',
500,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_CODE_PRE',
'ICDBRMNT',
'select trn_code, trn_desc from sttms_trn_code where record_stat = ''O'' and once_auth = ''Y'' order by trn_code',
100,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_CURRENCY',
'PCDINSTR',
'select bc.ccy_code CCY_CODE, cc.ccy_name CCY_NAME FROM sttms_branch_ccy bc, cytms_ccy_defn cc WHERE bc.ccy_code = cc.ccy_code AND bc.branch_code = global.current_branch',
100,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_MIS_1',
'EGDEGMST',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ? ) and (active=''A'') order by mis_code',
100,'MIS_CODE!TEXT!MIS_CODE~CODE_DESC!TEXT!CODE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_MIS_10',
'EGDEGMST',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'') order by mis_code',
100,'MIS_CODE!TEXT!MIS_CODE~CODE_DESC!TEXT!CODE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_MIS_2',
'EGDEGMST',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ? ) and (active=''A'') order by mis_code',
100,'MIS_CODE!TEXT!MIS_CODE~CODE_DESC!TEXT!CODE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_MIS_3',
'EGDEGMST',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'') order by mis_code',
100,'MIS_CODE!TEXT!MIS_CODE~CODE_DESC!TEXT!CODE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_MIS_4',
'EGDEGMST',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'') order by mis_code',
100,'MIS_CODE!TEXT!MIS_CODE~CODE_DESC!TEXT!CODE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_MIS_5',
'EGDEGMST',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'') order by mis_code',
100,'MIS_CODE!TEXT!MIS_CODE~CODE_DESC!TEXT!CODE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_MIS_6',
'EGDEGMST',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'') order by mis_code',
100,'MIS_CODE!TEXT!MIS_CODE~CODE_DESC!TEXT!CODE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_MIS_7',
'EGDEGMST',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'') order by mis_code',
100,'MIS_CODE!TEXT!MIS_CODE~CODE_DESC!TEXT!CODE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_MIS_8',
'EGDEGMST',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'') order by mis_code',
100,'MIS_CODE!TEXT!MIS_CODE~CODE_DESC!TEXT!CODE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_MIS_9',
'EGDEGMST',
'select mis_code,code_desc from gltms_mis_code where (mis_class = ?) and (active=''A'') order by mis_code',
100,'MIS_CODE!TEXT!MIS_CODE~CODE_DESC!TEXT!CODE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_MIS_CODE',
'MICAMFUN',
'SELECT MIS_CODE FROM GLTM_MIS_CODE WHERE MIS_CLASS=? AND ACTIVE = ''A'' ORDER BY MIS_CODE',
100,'MIS_CODE!TEXT!MIS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXN_PICK',
'STDACCLS',
'select trn_code,trn_desc from sttm_trn_code where trn_code not in (select txn_code from STTMS_ACLASS_TXNCODE where account_class =?)and  record_stat = ''O'' AND once_auth = ''Y'' order by trn_code',
100,'TRN_CODE!TEXT!TRN_CODE~TRN_DESC!TEXT!TRN_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXT_TER_CCY',
'IDDACSAL',
'select a.ccy_code, a.ccy_name from cytms_ccy_defn a  where a.auth_stat = ''A'' and a.record_stat = ''O'' and exists ( select 1 from csvws_product_currencies b where b.product_code = ? and b.ccy_code = a.ccy_code) order by a.ccy_code',
100,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TXT_TER_COUNTERPRTY',
'IDDACSAL',
'select customer_no , short_name from sttms_customer where customer_no <> ? and auth_stat = ''A'' and record_stat = ''O'' order by customer_no',
100,'CUSTOMER_NO!TEXT!CUSTOMER_NO~SHORT_NAME!TEXT!SHORT_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TYPE',
'DVDMGMNT',
'select distinct msg_type,description from mstm_msg_type where module in (''DV'',''OT'') union select ''ALL'', ''All Messages'' from dual order by 1',
'','MSG_TYPE!TEXT!MSG_TYPE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_TYPE',
'MSDCUSAD',
'SELECT MODULE, MSG_TYPE from (SELECT MODULE, MSG_TYPE   FROM MSTMS_MSG_TYPE  WHERE MODULE || MSG_TYPE NOT IN        (SELECT MODULE || MSG_TYPE           FROM MSTMS_MSG_MEDIA          WHERE MEDIA = ?) UNION SELECT ''AL'', ''ANY MSG TYPE''   FROM MSTMS_MSG_TYPE UNION SELECT MODULE, MSG_TYPE   FROM CSTM_DIARY_MSG  WHERE MODULE || MSG_TYPE NOT IN        (SELECT MODULE || MSG_TYPE           FROM MSTMS_MSG_MEDIA          WHERE MEDIA = ?)) where 1=1',
100,'MODULE!TEXT!MODULE~MSG_TYPE!TEXT!MSG_TYPE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE',
'CODUDEMT',
'SELECT * FROM (SELECT UDE_CODE,record_stat,once_auth FROM cotm_ude_master UNION SELECT ede_code,record_stat,once_auth FROM cotm_ede_master) where record_stat=''O'' and once_auth=''Y''',
100,'UDE_CODE!TEXT!UDE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE',
'ICCPLCON',
'SELECT DISTINCT u.ude_id,u.ude_value,u.rate_code FROM ictms_pr_int_udevals u, ictm_pr_int_effdt  e WHERE  u.branch_code = (SELECT decode((SELECT COUNT(*)   FROM ictms_pr_int_effdt   WHERE  branch_code = ? AND aclass = ? AND ccy_code = ? AND    product_code = ? AND record_stat = ''O'' AND    auth_stat = ''A'')  ,0  ,''ALL''  ,?)   FROM dual) AND u.aclass = ? AND u.ccy_code = ? AND u.product_code = ? AND u.ude_eff_dt = (SELECT MAX(u1.ude_eff_dt)   FROM ictms_pr_int_udevals u1   WHERE  u1.branch_code =   (SELECT decode((SELECT COUNT(*)     FROM ictms_pr_int_effdt     WHERE  branch_code = ? AND aclass = ? AND     ccy_code = ? AND product_code = ? AND     record_stat = ''O'' AND auth_stat = ''A'')    ,0    ,''ALL''    ,?)    FROM dual) AND u1.aclass = u.aclass AND   u1.ccy_code = u.ccy_code AND u1.product_code = u.product_code ) AND u.branch_code = e.branch_code AND u.aclass = e.aclass AND u.ccy_code = e.ccy_code AND u.product_code = e.product_code AND e.record_stat = ''O'' AND e.auth_stat = ''A''',
100,'UDE_ID!TEXT!UDE_ID~UDE_VALUE!TEXT!UDE_VALUE~RATE_CODE!TEXT!RATE_CODE',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE',
'LSDFXRVN',
'SELECT UDE_ID FROM CLTB_ACCOUNT_UDE_VALUES WHERE RATE_CODE IS NULL AND ACCOUNT_NUMBER = ?',
100,'UDE_ID!TEXT!UDE_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDEID',
'ICCREFPO',
'SELECT DISTINCT U.UDE_ID,U.UDE_VALUE,U.RATE_CODE FROM ICTMS_PR_INT_UDEVALS U, ICTM_PR_INT_EFFDT E WHERE U.BRANCH_CODE = (SELECT DECODE((SELECT COUNT(*) FROM ICTMS_PR_INT_EFFDT WHERE BRANCH_CODE = ? AND ACLASS = ? AND CCY_CODE = ? AND PRODUCT_CODE = ? AND RECORD_STAT = ''O'' AND AUTH_STAT = ''A''), 0, ''ALL'', ?) FROM DUAL) AND U.ACLASS = ? AND U.CCY_CODE = ? AND U.PRODUCT_CODE = ? AND U.UDE_EFF_DT = (SELECT MAX(U1.UDE_EFF_DT) FROM ICTMS_PR_INT_UDEVALS U1 WHERE U1.BRANCH_CODE = (SELECT DECODE((SELECT COUNT(*) FROM ICTMS_PR_INT_EFFDT WHERE BRANCH_CODE = ? AND ACLASS = ? AND CCY_CODE = ? AND PRODUCT_CODE = ? AND RECORD_STAT = ''O'' AND AUTH_STAT = ''A''), 0, ''ALL'', ?) FROM DUAL) AND U1.ACLASS = U.ACLASS AND U1.CCY_CODE = U.CCY_CODE AND U1.PRODUCT_CODE = U.PRODUCT_CODE AND U1.UDE_EFF_DT <= ?) AND U.BRANCH_CODE = E.BRANCH_CODE AND U.ACLASS = E.ACLASS AND U.CCY_CODE = E.CCY_CODE AND U.PRODUCT_CODE = E.PRODUCT_CODE AND E.RECORD_STAT = ''O'' AND E.AUTH_STAT = ''A''',
'','UDE_ID!TEXT!UDE_ID~UDE_VALUE!TEXT!UDE_VALUE~RATE_CODE!TEXT!RATE_CODE',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDEID',
'SFCPLCON',
'SELECT u.ude_id FROM   ictms_rule_ude u, ictms_pr_int p ' || chr(10) || 'WHERE  p.product_code = ?  AND u.rule_id = p.rule',
200,'UDE_ID!TEXT!UDE_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_CORP',
'STDCIF',
'Select allowed_value,value_description  from Cetm_Udef_Text_Lovs where Text_category=''C'' and language_code=global.lang and Seq_no in (Select Seq_no from Cetm_Udef_Text_Labels where Text_category=''C''  and Text_Label=? and language_code=global.lang)',
100,'ALLOWED_VALUE!TEXT!ALLOWED_VALUE~VALUE_DESCRIPTION!TEXT!VALUE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_EFF_DATE',
'ICDRATEQ',
'select DISTINCT to_char(UDE_EFF_DT,''YYYY-MM-DD'') from icvw_effdt',
100,'TO_CHAR(UDE_EFF_DT,YYYY-MM-DD)!TEXT!TO_CHAR(UDE_EFF_DT,YYYY-MM-DD)',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_EFF_DATE',
'IPDRATEQ',
'select DISTINCT to_char(UDE_EFF_DT,''YYYY-MM-DD'') from icvw_effdt',
100,'TO_CHAR(UDE_EFF_DT,YYYY-MM-DD)!TEXT!TO_CHAR(UDE_EFF_DT,YYYY-MM-DD)',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_ID',
'CIDACCDT',
'select ude_id, ude_desc from CLTMS_PRODUCT_UDE B where B.product_code = ?',
50,'UDE_ID!TEXT!UDE_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_ID',
'CLDACCDT',
'select ude_id, ude_desc from CLTMS_PRODUCT_UDE B where B.product_code = ?',
50,'UDE_ID!TEXT!UDE_ID~UDE_DESC!TEXT!UDE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_ID',
'CLDCROLL',
'select ude_id, ude_desc from CLTMS_PRODUCT_UDE B where B.product_code =?',
50,'UDE_ID!TEXT!UDE_ID~UDE_DESC!TEXT!UDE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_ID',
'CLDLOTEM',
'select ude_id, ude_desc from CLTMS_PRODUCT_UDE B where B.product_code = ?',
50,'UDE_ID!TEXT!UDE_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_ID',
'CLDPMNT',
'select a.elem_id,c.account_number from cltm_product_comp_frm_elems a, cltms_product_components b, cltbs_account_master c where c.account_number = ? and c.product_code=a.product_code  and  a.product_code = b.product_code and a.component_name=b.component_name  and a.elem_type=''U'' and b.component_type=''P''',
'','ELEM_ID!TEXT!ELEM_ID~ACCOUNT_NUMBER!TEXT!ACCOUNT_NUMBER',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_ID',
'CLDSROLL',
'select ude_id, ude_desc from CLTMS_PRODUCT_UDE B where B.product_code =(select product_code from CLTBS_ACCOUNT_MASTER where account_number=?)',
20,'UDE_ID!TEXT!UDE_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_ID',
'CLDUDCMT',
'SELECT DISTINCT UDE_ID FROM CLTM_PRODUCT_UDE WHERE PRODUCT_CODE LIKE NVL(?,''*'') MINUS SELECT UDE_ID FROM CLTM_UDE_CASCADE_DETAIL WHERE REFERENCE = ?',
20,'UDE_ID!TEXT!UDE_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_ID',
'CLDUDVMT',
'select udE_ID,UDE_DESC from cltm_product_ude WHERE PRODUCT_CODE = ?',
'','UDE_ID!TEXT!UDE_ID~UDE_DESC!TEXT!UDE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_ID',
'GEDQYFAC',
'SELECT TYPE_NAME AS UDE_ID, TYPE_VALUE AS DESCRIPTION FROM STTM_STATIC_TYPE WHERE TYPE = ''UDEID'' AND RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y''',
100,'UDE_ID!TEXT!UDE_ID~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_ID',
'ICDUDEUL',
'select ude_id FROM(select distinct ude_id from ICTM_RULE_UDE a ,ICTM_PR_INT b where a.rule_id = b.rule and b.product_code like NVL(?,''*'') MINUS select ude_id from ICTB_UDE_UTIL_QUERY_DETAIL where reference = ? ) WHERE 1=1 ORDER BY ude_id',
500,'UDE_ID!TEXT!UDE_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_ID',
'ICDUDVAL',
'select ude_id from ictms_rule_ude where rule_id = ? ORDER BY ude_id',
100,'UDE_ID!TEXT!UDE_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_ID',
'IPDUDVAL',
'select ude_id from ictms_rule_ude where rule_id = ? ORDER BY ude_id',
100,'UDE_ID!TEXT!UDE_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_ID',
'LEDACCDT',
'select ude_id, ude_desc from CLTMS_PRODUCT_UDE B where B.product_code = ?',
50,'UDE_ID!TEXT!UDE_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_ID',
'LEDPMNT',
'SELECT account_no, branch_code FROM stvws_account WHERE record_stat=''O'' AND ((Branch_code IS NOT NULL AND Branch_code = ? AND ac_or_gl IN (''A'',''G'')) OR (ac_or_gl=''G'' AND branch_code IS NULL))',
'','ELEM_ID!TEXT!ELEM_ID~ACCOUNT_NUMBER!TEXT!ACCOUNT_NUMBER',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_ID',
'LMDLIMIT',
'select ude_id, ude_desc from CLTMS_PRODUCT_UDE B where B.product_code = ?',
150,'UDE_ID!TEXT!UDE_ID~UDE_DESC!TEXT!UDE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_ID',
'LSDTRONL',
'select ude_id, ude_desc from CLTMS_PRODUCT_UDE B where B.product_code = ?',
50,'UDE_ID!TEXT!UDE_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_ID',
'MODACCDT',
'',50,'UDE_ID!TEXT!UDE_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_ID',
'MODPMNT',
'','','ELEM_ID!TEXT!ELEM_ID~ACCOUNT_NUMBER!TEXT!ACCOUNT_NUMBER',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_ID',
'STDACUDE',
'select DISTINCT ACLASS, BRANCH_CODE,PRODUCT_CODE,CCY_CODE, UDE_ID from ICTM_PR_INT_UDEVALS where BRANCH_CODE  = ? AND ACLASS= ? AND PRODUCT_CODE= ? AND CCY_CODE= ? ORDER BY UDE_ID',
100,'ACLASS!TEXT!ACLASS~BRANCH_CODE!TEXT!BRANCH_CODE~PRODUCT_CODE!TEXT!PRODUCT_CODE~CCY_CODE!TEXT!CCY_CODE~UDE_ID!TEXT!UDE_ID',
'STRING~STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_ID_NEW',
'ICDUDEUL',
'select ude_id FROM(select distinct ude_id from ICTM_RULE_UDE a ,ICTM_PR_INT b where a.rule_id = b.rule and b.product_code like NVL( ?,''*'') MINUS select ude_id from ICTB_UDE_UTIL_CHG_DETAIL where reference = ? ) WHERE 1=1 ORDER BY ude_id',
500,'UDE_ID!TEXT!UDE_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_PERS',
'STDCIF',
'Select allowed_value,value_description  from Cetm_Udef_Text_Lovs where Text_category=''P'' and language_code=global.lang and Seq_no in (Select Seq_no from Cetm_Udef_Text_Labels where Text_category=''P''  and Text_Label=? and language_code=global.lang)',
100,'ALLOWED_VALUE!TEXT!ALLOWED_VALUE~VALUE_DESCRIPTION!TEXT!VALUE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDE_RULE',
'CLDUDVMT',
'select UDE_RULE_CODE from CLTM_UDE_RULE WHERE AUTH_STAT=''A'' AND RECORD_STAT=''O''',
'','UDE_RULE_CODE!TEXT!UDE_RULE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDF',
'CLDPRMNT',
'SELECT A.FIELD_NAME,FIELD_DESCRIPTION FROM UDTMS_FIELDS A WHERE A.FIELD_TYPE in(''T'',''C'')AND AUTH_STAT=''A''AND RECORD_STAT=''O''AND NVL(USAGE_ALLOWED,''B'') in (''P'',''B'',''F'')',
100,'FIELD_NAME!TEXT!FIELD_NAME~FIELD_DESCRIPTION!TEXT!FIELD_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDF',
'CLDPROMT',
'select DISTINCT UDE_ID from CLTM_PRODUCT_UDE',
20,'UDE_ID!TEXT!UDE_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDF',
'CSCFNUDF',
'SELECT LOV  , LOV_DESC  FROM UDTMS_LOV WHERE FIELD_NAME = ?',
100,'LOV!TEXT!LOV~LOV_DESC!TEXT!LOV_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDF',
'CSCUFVAL',
'SELECT LOV, LOV_DESC  FROM UDTMS_LOV WHERE FIELD_NAME = ?',
100,'LOV!TEXT!LOV~LOV_DESC!TEXT!LOV_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDF',
'LSDTRONL',
'select LOV from UDTM_LOV WHERE FIELD_NAME = ?',
100,'LOV!TEXT!LOV',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDF',
'PCDFTONL',
'select field_value from pctms_ud_lookup_values where val_list = (select a.val_list from pctm_ud_product_params a, pctms_ud_field_name b where a.field_no =b.field_no and b.prod_category =  a.prod_category and b.prod_category = ? and b.language = GLOBAL.LANG and b.field_label = ?)',
100,'FIELD_VALUE!TEXT!FIELD_VALUE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDF',
'PCDINSTR',
'select field_value from pctms_ud_lookup_values WHERE VAL_LIST =?',
100,'FIELD_VALUE!TEXT!FIELD_VALUE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDF',
'PCDONONL',
'select field_value from pctms_ud_lookup_values where val_list = (select a.val_list from pctm_ud_product_params a, pctms_ud_field_name b, pctm_ud_maint c where a.field_no = b.field_no and b.prod_category =  a.prod_category and b.prod_category = ? and b.language = GLOBAL.LANG AND c.field_no = a.field_no and c.field_desc = ?)',
100,'FIELD_VALUE!TEXT!FIELD_VALUE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDF',
'PCDPTYDM',
'select field_value from pctms_ud_lookup_values where val_list = ? order by field_value',
500,'FIELD_VALUE!TEXT!FIELD_VALUE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDF1',
'STDCIF',
'SELECT LOV, LOV_DESC FROM UDTMS_LOV WHERE FIELD_NAME = ?',
100,'LOV!TEXT!LOV~LOV_DESC!TEXT!LOV_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDF2',
'STDCIF',
'SELECT LOV,LOV_DESC  FROM UDTMS_LOV WHERE FIELD_NAME = ?',
100,'LOV!TEXT!LOV~LOV_DESC!TEXT!LOV_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDF5',
'STDCIF',
'SELECT LOV,LOV_DESC  FROM UDTMS_LOV WHERE FIELD_NAME = ?',
100,'LOV!TEXT!LOV~LOV_DESC!TEXT!LOV_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDFS',
'CLDPRMNT',
'SELECT FIELD_NAME,FIELD_DESCRIPTION FROM UDTMS_FIELDS  WHERE FIELD_TYPE=''N''AND AUTH_STAT=''A''AND RECORD_STAT=''O''',
100,'FIELD_NAME!TEXT!FIELD_NAME~FIELD_DESCRIPTION!TEXT!FIELD_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDFSS',
'CLDPRMNT',
'SELECT FIELD_NAME,FIELD_DESCRIPTION FROM UDTMS_FIELDS  WHERE FIELD_TYPE= ''D'' AND AUTH_STAT = ''A'' AND RECORD_STAT= ''O'' AND NVL(USAGE_ALLOWED,''B'') in (''P'',''B'',''F'')',
100,'FIELD_NAME!TEXT!FIELD_NAME~FIELD_DESCRIPTION!TEXT!FIELD_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDF_FIELD_NO',
'PCDPDCTG',
'SELECT field_no, field_desc  FROM pctms_ud_maint WHERE record_stat = ''O'' AND once_auth = ''Y'' AND field_no NOT IN (SELECT FIELD_NO FROM pctms_ud_product_params WHERE prod_category = ? ) order BY field_no',
100,'FIELD_NO!TEXT!FIELD_NO~FIELD_DESC!TEXT!FIELD_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDF_NAME',
'CLDSDEMT',
'select function_id,main_menu from smtb_function_description',
100,'FUNCTION_ID!TEXT!FUNCTION_ID~MAIN_MENU!TEXT!MAIN_MENU',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDF_NAME',
'CSDACSUD',
'SELECT FIELD_NAME,FIELD_DESCRIPTION FROM ( SELECT A.FIELD_NAME, B.FIELD_DESCRIPTION FROM CSTMS_PRODUCT_UDF_FIELDS_MAP A, UDTMS_FIELDS B  WHERE A.FIELD_NAME = B.FIELD_NAME  AND A.PRODUCT_CODE = ? AND A.AUTH_STAT = ''A''  AND A.FIELD_NAME NOT IN (SELECT COD_UDF_NAME FROM CSTMS_CONTRACT_UDF_INFO  WHERE COD_PRODUCT = ? AND ONCE_AUTH  = ''Y''  AND RECORD_STAT = ''O'') ) WHERE 1=1 ORDER BY FIELD_NAME,FIELD_DESCRIPTION',
100,'FIELD_NAME!TEXT!FIELD_NAME~FIELD_DESCRIPTION!TEXT!FIELD_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDTM',
'CLDACCDT',
'select LOV,LOV_DESC from UDTM_LOV where FIELD_NAME = ?',
100,'LOV!TEXT!LOV~LOV_DESC!TEXT!LOV_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UDTM',
'CLDLOTEM',
'select LOV  from UDTM_LOV where FIELD_NAME = ?',
100,'LOV!TEXT!LOV',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UD_FIELD1',
'PCDISMAP',
'SELECT UD_MODULE, FIELD_NAME, FIELD_DESCRIPTION FROM PCTBS_TXN_IS_FIELDS UNION SELECT ''UD'', FIELD_NAME, FIELD_DESCRIPTION FROM UDTM_FIELDS ORDER BY 1',
100,'UD_MODULE!TEXT!UD_MODULE~FIELD_NAME!TEXT!FIELD_NAME~FIELD_DESCRIPTION!TEXT!FIELD_DESCRIPTION',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UD_FIELD2',
'PCDISMAP',
'SELECT  ''FIELD_VAL_''||A.FIELD_NUM field_name,C.FIELD_DESCRIPTION,''UD'' UD_MODULE FROM  CSTM_PRODUCT_UDF_FIELDS_MAP A, UDTM_FIELDS C,PCTB_TXN_IS_FIELDS D WHERE  A.PRODUCT_CODE = ? AND  A.FIELD_NAME = C.FIELD_NAME AND D.FIELD_NAME =''FIELD_VAL_''||A.FIELD_NUM union SELECT FIELD_NAME, FIELD_DESCRIPTION, UD_MODULE FROM PCTB_TXN_IS_FIELDS WHERE UD_MODULE <>''UD'' ORDER BY 1',
100,'FIELD_NAME!TEXT!FIELD_NAME~FIELD_DESCRIPTION!TEXT!FIELD_DESCRIPTION~UD_MODULE!TEXT!UD_MODULE',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UID_NAME',
'CODCIFDF',
'select type_name,type_value from  sttm_static_type where type =''UIDN'' and record_stat =''O'' and once_auth = ''Y''',
100,'TYPE_NAME!TEXT!TYPE_NAME~TYPE_VALUE!TEXT!TYPE_VALUE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UID_NAME',
'STDCCIF',
'select v.value from lmtms_type_values v where v.type=''CIF_ID_TYPE'' order by v.value',
100,'Identifer Code!TEXT!v.value',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UID_NAME',
'STDCIF',
'select v.value from lmtms_type_values v where v.type=''CIF_ID_TYPE'' order by v.value',
100,'Identifer Code!TEXT!v.value',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UID_NAME',
'STDCOCIF',
'select v.value from lmtms_type_values v where v.type=''CIF_ID_TYPE'' order by v.value',
100,'Identifer Code!TEXT!v.value',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ULT_BENEF1',
'FTDCONON',
'select benef_name,benef_ac_no,bic_code_awi,benef_address1,benef_address2 , receiver, ben_fax, ben_mob, ben_email from isvws_ult_benef',
100,'BENEF_NAME!TEXT!BENEF_NAME~BENEF_AC_NO!TEXT!BENEF_AC_NO~BIC_CODE_AWI!TEXT!BIC_CODE_AWI~BENEF_ADDRESS1!TEXT!BENEF_ADDRESS1~BENEF_ADDRESS2!TEXT!BENEF_ADDRESS2~RECEIVER!TEXT!RECEIVER',
'STRING~STRING~STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ULT_BENEF2',
'FTDCONON',
'select bic_code, bank_name from istms_bic_directory where ONCE_AUTH  = ''Y'' and record_stat = ''O'' order by bic_code',
100,'BIC_CODE!TEXT!BIC_CODE~BANK_NAME!TEXT!BANK_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ULT_CREDITOR_ID_COBIRTH',
'MSDPMTBR',
'SELECT COUNTRY_CODE,DESCRIPTION FROM STTMS_COUNTRY 	    WHERE AUTH_STAT = ''A'' AND RECORD_STAT = ''O'' order by COUNTRY_CODE',
100,'COUNTRY_CODE!TEXT!COUNTRY_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ULT_CREDITOR_ID_COBIRTH',
'PCDONONL',
'SELECT COUNTRY_CODE,DESCRIPTION FROM STTMS_COUNTRY 	    WHERE AUTH_STAT = ''A'' AND RECORD_STAT = ''O'' ORDER BY COUNTRY_CODE',
200,'COUNTRY_CODE!TEXT!COUNTRY_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ULT_CRED_ID_TYPE',
'MSDPMTBR',
'SELECT TYPE_VALUE,TYPE_DESC FROM PCTMS_TYPE_VALUES WHERE               TYPE_CODE = DECODE(?,''O'',''PARTY_ID_ORG'',''P'',''PARTY_ID_PVT'') order by TYPE_VALUE',
'','TYPE_VALUE!TEXT!TYPE_VALUE~TYPE_DESC!TEXT!TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ULT_CRED_ID_TYPE',
'PCDONONL',
'SELECT TYPE_VALUE,TYPE_DESC FROM PCTMS_TYPE_VALUES WHERE               TYPE_CODE = DECODE(?,''O'',''PARTY_ID_ORG'',''P'',''PARTY_ID_PVT'') ORDER BY TYPE_VALUE',
200,'TYPE_VALUE!TEXT!TYPE_VALUE~TYPE_DESC!TEXT!TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ULT_DEBTOR_ID_COBIRTH',
'MSDPMTBR',
'SELECT COUNTRY_CODE,DESCRIPTION FROM STTMS_COUNTRY 	    WHERE AUTH_STAT = ''A'' AND RECORD_STAT = ''O'' order by COUNTRY_CODE',
200,'COUNTRY_CODE!TEXT!COUNTRY_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ULT_DEBTOR_ID_COBIRTH',
'PCDONONL',
'SELECT COUNTRY_CODE,DESCRIPTION FROM STTMS_COUNTRY 	    WHERE AUTH_STAT = ''A'' AND RECORD_STAT = ''O'' ORDER BY COUNTRY_CODE',
200,'COUNTRY_CODE!TEXT!COUNTRY_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ULT_DEBT_ID_TYPE',
'MSDPMTBR',
'SELECT TYPE_VALUE,TYPE_DESC FROM PCTMS_TYPE_VALUES WHERE               TYPE_CODE = DECODE(?,''O'',''PARTY_ID_ORG'',''P'',''PARTY_ID_PVT'') order by TYPE_VALUE',
'','TYPE_VALUE!TEXT!TYPE_VALUE~TYPE_DESC!TEXT!TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ULT_DEBT_ID_TYPE',
'PCDONONL',
'SELECT TYPE_VALUE,TYPE_DESC FROM PCTMS_TYPE_VALUES WHERE               TYPE_CODE = DECODE(?,''O'',''PARTY_ID_ORG'',''P'',''PARTY_ID_PVT'') ORDER BY TYPE_VALUE',
200,'TYPE_VALUE!TEXT!TYPE_VALUE~TYPE_DESC!TEXT!TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UNDELIVERED_LINE',
'SEDDLONL',
'SELECT liab_id, line_cd||line_serial, main_line, ccy_restriction, line_currency, revolving_line,line_start_date, line_expiry_date, last_new_util_date, availability_flag, liab_br, record_stat, auth_stat  FROM ELVW_LIMITS_INT l WHERE l.liab_id =       (SELECT c.liability_no FROM sttms_customer c WHERE c.customer_no = ?) AND       nvl(l.last_new_util_date, to_date(''99991231'', ''YYYYMMDD'')) >=       (SELECT d.today          FROM sttms_dates d         WHERE d.branch_code = GLOBAL.CURRENT_BRANCH) AND l.record_stat = ''O'' AND l.auth_stat = ''A'' and       l.availability_flag = ''Y'' AND       (l.line_currency = ? OR l.ccy_restriction = ''N'') AND       (EXISTS (SELECT *                  FROM ELVW_LIMITS_CUST_REST_INT cr                 WHERE cr.liab_id = l.liab_id AND cr.line_cd = l.line_cd AND                       cr.line_serial = l.line_serial AND cr.customer_no = ?) OR        NOT EXISTS (SELECT *                      FROM ELVW_LIMITS_CUST_REST_INT cr                     WHERE cr.liab_id = l.liab_id AND cr.line_cd = l.line_cd AND                           cr.line_serial = l.line_serial)) AND       (EXISTS        (SELECT *           FROM ELVW_LIMITS_PROD_REST_INT pr          WHERE pr.liab_id = l.liab_id AND pr.line_cd = l.line_cd AND                pr.line_serial = l.line_serial AND                pr.product_code = substr('''', 4, 4)) OR NOT EXISTS        (SELECT *           FROM ELVW_LIMITS_PROD_REST_INT pr1          WHERE pr1.liab_id = l.liab_id AND pr1.line_cd = l.line_cd AND pr1.line_serial = l.line_serial)) AND       (EXISTS        (SELECT *           FROM ELVW_LIMITS_BR_REST_INT b          WHERE b.liab_id = l.liab_id AND b.line_cd = l.line_cd AND                b.line_serial = l.line_serial AND                b.branch_code = GLOBAL.CURRENT_BRANCH) OR NOT EXISTS        (SELECT *           FROM ELVW_LIMITS_BR_REST_INT b1          WHERE b1.liab_id = l.liab_id AND b1.line_cd = l.line_cd AND                b1.line_serial = l.line_serial)) AND (EXISTS (SELECT *      '||
'   FROM ELVW_LIMITS_CCY_REST_INT cy                                                               WHERE cy.liab_id =                                                                     l.liab_id AND                                                                     cy.line_cd =                                                                     l.line_cd AND                                                                     cy.line_serial =                                                         l.line_serial AND                                                                     cy.ccy_code = ?) OR NOT                                                                      EXISTS                                                               (SELECT *                                                                        FROM ELVW_LIMITS_CCY_REST_INT cy1                                                                       WHERE cy1.liab_id =                                                l.liab_id AND                                                                             cy1.line_cd =                                                                             l.line_cd AND                                                                             cy1.line_serial =                                                                             l.line_serial))',
100,'LIAB_ID!TEXT!LIAB_ID~LINE_CD||LINE_SERIAL!TEXT!LINE_CD||LINE_SERIAL~MAIN_LINE!TEXT!MAIN_LINE~CCY_RESTRICTION!TEXT!CCY_RESTRICTION~LINE_CURRENCY!TEXT!LINE_CURRENCY~REVOLVING_LINE!TEXT!REVOLVING_LINE~LINE_START_DATE!TEXT!LINE_START_DATE~LINE_EXPIRY_DATE!TEXT!LINE_EXPIRY_DATE~LAST_NEW_UTIL_DATE!TEXT!LAST_NEW_UTIL_DATE~AVAILABILITY_FLAG!TEXT!AVAILABILITY_FLAG~LIAB_BR!TEXT!LIAB_BR~RECORD_STAT!TEXT!RECORD_STAT~AUTH_STAT!TEXT!AUTH_STAT',
'STRING~STRING~STRING~STRING~STRING~STRING~DATE~DATE~DATE~STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UNDERLYING_ASSET_CURRENCY',
'ENDUINST',
'select ccy_code, ccy_name from cytms_ccy_defn where record_stat = ''O'' and nvl(ONCE_AUTH,''N'')=''Y'' and ccy_code in (Select ccy_code from csvws_product_currencies where product_code = ?) order by ccy_code',
'','CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UNITVALUE',
'SIDDIARY',
'SELECT * FROM(select cust_ac_no customer,branch_code branch from sttm_cust_account  where branch_code= global.current_branch and record_stat=''O'' and auth_stat=''A'' and ?=''ACCOUNT'' union  select  CUSTOMER_NO  customer,global.current_branch from sttm_customer where record_stat=''O'' and auth_stat=''A'' and ?=''CUSTOMER'' )WHERE 1=1 order by customer',
100,'CUSTOMER!TEXT!CUSTOMER~BRANCH!TEXT!BRANCH',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UNSETL_CUST_AC',
'PCDPDCTG',
'select ac_gl_no, ac_gl_ccy, branch_code  from (SELECT a.ac_gl_no, a.ac_gl_ccy, a.branch_code          FROM sttbs_account a         WHERE a.ac_or_gl = ''A''           AND ''A'' = ?           AND a.ac_gl_ccy =               (SELECT branch_lcy                  FROM sttms_branch b                 WHERE b.branch_code = a.branch_code)           AND a.once_auth = ''Y''           AND ? IN (''I'',''O'',''IC'',''OC'')         UNION        SELECT a.ac_gl_no, a.ac_gl_ccy, a.branch_code          FROM sttbs_account a         WHERE            a.ac_or_gl = ''G'' AND            ''G'' = ? AND            a.once_auth = ''Y'' AND            ? IN (''I'',''O'',''IC'',''OC'')) where 1 = 1 ORDER BY ac_gl_no',
100,'AC_GL_NO!TEXT!AC_GL_NO~AC_GL_CCY!TEXT!AC_GL_CCY~BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPLDSRC',
'CLDMDSBR',
'select source_code, source_desc from cotms_source where auth_stat = ''A'' and record_stat =''O''',
'','SOURCE_CODE!TEXT!SOURCE_CODE~SOURCE_DESC!TEXT!SOURCE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPLOAD_ID',
'CSDAUBIL',
'select upload_id from cstbs_policy_billing_upload where upload_status = ? order by upload_id',
500,'UPLOAD_ID!TEXT!UPLOAD_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPLOAD_ID',
'CVDUPLMT',
'select upload_id,upload_date from cvtb_upload_master' || chr(10) || '',
1000,'UPLOAD_ID!TEXT!UPLOAD_ID~UPLOAD_DATE!TEXT!UPLOAD_DATE',
'STRING~DATE',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPLOAD_SOURCE',
'CLDPMNT',
'select source_code, source_desc from cotms_source where auth_stat = ''A'' and record_stat =''O''',
'','SOURCE_CODE!TEXT!SOURCE_CODE~SOURCE_DESC!TEXT!SOURCE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPLOAD_SOURCE',
'LEDPMNT',
'select source_code, source_desc from cotms_source where auth_stat = ''A'' and record_stat =''O''',
'','SOURCE_CODE!TEXT!SOURCE_CODE~SOURCE_DESC!TEXT!SOURCE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPLOAD_SOURCE',
'MODPMNT',
'','','SOURCE_CODE!TEXT!SOURCE_CODE~SOURCE_DESC!TEXT!SOURCE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPLOAD_SRC_CR',
'CLDCROLL',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPLOAD_SRC_DR',
'CLDCROLL',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSCHGCR',
'CIDACCDT',
'select * from CIVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSCHGCR',
'CLDACCDT',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSCHGCR',
'CLDLOTEM',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSCHGCR',
'LEDACCDT',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSCHGCR',
'LSDTRONL',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSCHGCR',
'MODACCDT',
'',50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSCHGDR',
'CIDACCDT',
'select * from CIVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSCHGDR',
'CLDACCDT',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSCHGDR',
'CLDLOTEM',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSCHGDR',
'LEDACCDT',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSCHGDR',
'LSDTRONL',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSCHGDR',
'MODACCDT',
'',50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSCOMPCR',
'CIDACCDT',
'select * from CIVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSCOMPCR',
'CLDACCDT',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSCOMPCR',
'CLDLOTEM',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSCOMPCR',
'LEDACCDT',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSCOMPCR',
'LSDTRONL',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSCOMPCR',
'MODACCDT',
'',50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSCOMPDR',
'CIDACCDT',
'select * from CIVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSCOMPDR',
'CLDACCDT',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSCOMPDR',
'CLDLOTEM',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSCOMPDR',
'LEDACCDT',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSCOMPDR',
'LSDTRONL',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSCOMPDR',
'MODACCDT',
'',50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSOURCECR',
'CIDACCDT',
'select * from CIVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSOURCECR',
'CLDACCDT',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSOURCECR',
'CLDLOTEM',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSOURCECR',
'LEDACCDT',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSOURCECR',
'LSDTRONL',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSOURCECR',
'MODACCDT',
'',50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSOURCEDR',
'CIDACCDT',
'select * from CIVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSOURCEDR',
'CLDACCDT',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSOURCEDR',
'CLDLOTEM',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSOURCEDR',
'LEDACCDT',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSOURCEDR',
'LSDTRONL',
'select * from CLVW_UPLOAD_SOURCE',
50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPSOURCEDR',
'MODACCDT',
'',50,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPWD_FROM_ACC_HEAD',
'BCDPRMNT',
'select gl_code ,gl_desc from gltms_glmaster a where a.leaf = ''Y''' || chr(10) || '               order by category, gl_desc',
100,'GL_CODE!TEXT!GL_CODE~GL_DESC!TEXT!GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPWD_FROM_ACC_HEAD',
'MCDPRMNT',
'select gl_code,gl_desc from gltms_glmaster a where a.leaf = ''Y'' and a.customer=''I'' order by category, gl_desc',
100,'GL_CODE!TEXT!GL_CODE~GL_DESC!TEXT!GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPWD_FROM_ACC_HEAD',
'MMDPRMNT',
'select gl_code,gl_desc from gltms_glmaster a where a.leaf = ''Y'' and a.customer=''I'' order by category, gl_desc',
100,'GL_CODE!TEXT!GL_CODE~GL_DESC!TEXT!GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_UPWD_FROM_ACC_HEAD',
'SRDPRMNT',
'select gl_code,gl_desc from gltms_glmaster a where a.leaf = ''Y'' and a.customer=''I'' order by category, gl_desc',
100,'GL_CODE!TEXT!GL_CODE~GL_DESC!TEXT!GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USER',
'ACRDLTXN',
'select user_id, user_name from smtbs_user where home_branch = global.current_branch order by 1',
200,'USER_ID!TEXT!USER_ID~USER_NAME!TEXT!USER_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USER',
'ACRJRNAL',
'select user_id, user_name from smtbs_user where home_branch = global.current_branch order by 1',
200,'USER_ID!TEXT!USER_ID~USER_NAME!TEXT!USER_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USER',
'CSDDRYST',
'SELECT a.contract_ref_no,a.user_ref_no,b.diary_event_seq_no,b.diary_event_sub_seq_no FROM  CSTBS_CONTRACT a,CSTBS_CONTRACT_DIARY_STATUS b  WHERE a.contract_ref_no=b.contract_ref_no AND substr(a.contract_ref_no,1,3)=global.current_branch',
100,'CONTRACT_REF_NO!TEXT!A.CONTRACT_REF_NO~USER_REF_NO!TEXT!A.USER_REF_NO~DIARY_EVENT_SEQ_NO!TEXT!B.DIARY_EVENT_SEQ_NO~DIARY_EVENT_SUB_SEQ_NO!TEXT!B.DIARY_EVENT_SUB_SEQ_NO',
'STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USER',
'SEDREAS',
'SELECT user_id,user_name FROM (select distinct a.user_id,b.user_name from smvws_user_role_functions a, smtbs_user b where a.function_id = ''SEDDLONL'' and a.user_id = b.user_id and a.user_id != ? and a.branch_code = global.current_branch)WHERE 1=1 order by user_id',
100,'USER_ID!TEXT!USER_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USER',
'SMRCONTL',
'SELECT USER_ID, USER_NAME FROM SMTB_USER WHERE RECORD_STAT =''O'' AND AUTH_STAT =''A''',
500,'USER_ID!TEXT!USER_ID~USER_NAME!TEXT!USER_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USER',
'SMREVNLO',
'SELECT USER_ID, USER_NAME FROM SMTB_USER WHERE RECORD_STAT =''O'' AND AUTH_STAT =''A''',
500,'USER_ID!TEXT!USER_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USER',
'SMRPEVLG',
'select user_id from smtbs_user where home_branch =global.current_branch order by user_id',
2000,'USER_ID!TEXT!USER_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USER',
'SMRPUSPR',
'SELECT USER_ID , USER_NAME FROM SMTB_USER WHERE AUTH_STAT=''A''',
'','USER_ID!TEXT!USER_ID~USER_NAME!TEXT!USER_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USER',
'SMRUSREN',
'SELECT USER_ID, USER_NAME FROM SMTB_USER WHERE RECORD_STAT =''O'' AND AUTH_STAT =''A'' ORDER BY USER_ID',
500,'USER_ID!TEXT!USER_ID~USER_NAME!TEXT!USER_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USERID',
'RPDRNMNT',
'select user_id from (select distinct user_id from smtbs_user  minus select user_id from smvws_role_users where role_id in (select role_id from rptms_printer_role where branch_id = global.current_branch and printer_id = ? ) minus select user_id from rptms_printer_user where printer_id = ?  union select ''SYSTEM'' from dual) where 1 = 1',
200,'USER_ID!TEXT!USER_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USERS',
'LCDREAS',
'select user_id from (select distinct a.user_id from smvws_user_role_functions a,smtbs_user b where a.function_id = ''LCDTRONL'' and a.user_id = b.user_id and b.home_branch = global.current_branch and b.home_branch = a.branch_code) where 1=1 order by user_id',
'','','','','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USERSTAT',
'BCROBUDS',
'select distinct a.user_defined_status, b.description from bctbs_contract_master a, sttms_contract_statuses b where a.user_defined_status = b.status_code order by a.user_defined_status',
200,'USER_DEFINED_STATUS!TEXT!USER_DEFINED_STATUS~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USERS_LD',
'LDDREAS',
'select user_id' || chr(10) || '   from (select distinct a.user_id' || chr(10) || '           from smvws_user_role_functions a, smtbs_user b' || chr(10) || '          where a.function_id in' || chr(10) || '                (''LDDCOMNT'', ''LDDPRMNT'', ''LDVAMND'', ''LDDCONON'', ''CDDTRONL'',' || chr(10) || '                 ''CDDVAMND'', ''CDDPMNT'')' || chr(10) || '            and b.user_id = a.user_id' || chr(10) || '            and a.branch_code = global.current_branch)' || chr(10) || '  where 1 = 1' || chr(10) || '  order by user_id',
500,'USER_ID!TEXT!USER_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USERS_LD',
'MCDREAS',
'select distinct a.user_id from smvws_user_role_functions a, SMVW_smtbs_user b where a.function_id in (''MCDVAMND'', ''MCDCONON'') and b.userid=a.user_id and b.home_branch = global.current_branch and b.home_branch = a.branch_code order by a.user_id',
100,'USER_ID!TEXT!USER_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USERS_LD',
'MMDREAS',
'select distinct a.user_id from smvws_user_role_functions a, SMVW_smtbs_user b where a.function_id in (''MMDVAMND'', ''MMDCONON'') and b.userid=a.user_id and b.home_branch = global.current_branch and b.home_branch = a.branch_code order by a.user_id',
1000,'USER_ID!TEXT!USER_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USER_BRN',
'SMDBRNRS',
'SELECT BRANCH_CODE,BRANCH_NAME FROM STTM_BRANCH WHERE RECORD_STAT =''O'' AND ONCE_AUTH = ''Y'' ORDER BY BRANCH_CODE',
100,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USER_BRN',
'SMDBRRES',
'SELECT BRANCH_CODE,BRANCH_NAME FROM STTM_BRANCH WHERE RECORD_STAT =''O'' AND ONCE_AUTH = ''Y'' ORDER BY BRANCH_CODE',
100,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USER_DEFN_STATUS',
'GEDQYFAC',
'SELECT USER_DEFN_STATUS,DESCRIPTION,STATUS FROM GETM_USER_DEFN_STATUS WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY USER_DEFN_STATUS',
100,'USER_DEFN_STATUS!TEXT!USER_DEFN_STATUS~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USER_FUNC',
'SMDUSERD',
'SELECT FUNCTION_ID ,BALOON_HELP FROM (SELECT A.FUNCTION_ID , B.BALOON_HELP FROM SMTBS_MENU A, SMTBS_FUNCTION_DESCRIPTION B, SMTBS_MODULES C WHERE  A.FUNCTION_ID = B.FUNCTION_ID AND B.LANG_CODE = ''ENG'' AND A.AVAILABLE = 1  AND  A.MODULE = C.MODULE_ID ) WHERE 1=1 ORDER BY 1',
1000,'FUNCTION_ID!TEXT!FUNCTION_ID~BALOON_HELP!TEXT!BALOON_HELP',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USER_FUNC',
'SMDUSRDF',
'SELECT FUNCTION_ID ,BALOON_HELP FROM (SELECT A.FUNCTION_ID , B.BALOON_HELP FROM SMTBS_MENU A, SMTBS_FUNCTION_DESCRIPTION B, SMTBS_MODULES C WHERE  A.FUNCTION_ID = B.FUNCTION_ID AND B.LANG_CODE = GLOBAL.lang AND A.AVAILABLE = 1  AND  A.MODULE = C.MODULE_ID AND TO_NUMBER(SMPKSS.FN_DECRYPT_PASSWORD (C.MODULE_NO_USERS ,''CITIL'' )) > 0 )WHERE 1=1 ORDER BY 1',
1000,'FUNCTION_ID!TEXT!FUNCTION_ID~BALOON_HELP!TEXT!BALOON_HELP',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USER_ID',
'CLRPCAUR',
'SELECT USER_ID,USER_NAME FROM SMTB_USER WHERE  RECORD_STAT=''O'' AND ONCE_AUTH=''Y''',
100,'USER_ID!TEXT!USER_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USER_ID',
'CLRPUNMU',
'SELECT USER_ID,USER_NAME FROM SMTB_USER WHERE  RECORD_STAT=''O'' AND ONCE_AUTH=''Y''',
100,'USER_ID!TEXT!USER_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USER_ID',
'CSDIBLOG',
'select distinct USER_ID from CSTB_INTRADAY_BATCH_STATUS order by USER_ID',
100,'USER_ID!TEXT!USER_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USER_ID',
'FSDALRTG',
'SELECT USER_ID FROM SMTBS_USER WHERE once_auth = ''Y'' and record_stat = ''O'' and user_id not in (select a.user_id from fstms_alert_group_detail a where a.branch_code=GLOBAL.CURRENT_BRANCH AND a.module=''FS'' AND a.product_code=? AND a.ccy=? AND a.cls_status=?) and home_branch=GLOBAL.CURRENT_BRANCH order by USER_ID',
'','USER_ID!TEXT!USER_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USER_ID',
'RLRPCAUR',
'SELECT USER_ID,USER_NAME FROM SMTB_USER WHERE  RECORD_STAT=''O'' AND ONCE_AUTH=''Y''',
100,'USER_ID!TEXT!USER_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USER_ID',
'RLRPUNMU',
'SELECT USER_ID,USER_NAME FROM SMTB_USER WHERE  RECORD_STAT=''O'' AND ONCE_AUTH=''Y''',
100,'USER_ID!TEXT!USER_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_USER_ID',
'STDDEFAU',
'SELECT USER_ID, USER_NAME, HOME_BRANCH, BRANCH_NAME FROM ((SELECT ''ALL'' USER_ID, ''ALL'' USER_NAME, NULL HOME_BRANCH, NULL BRANCH_NAME FROM DUAL) UNION (SELECT A.USER_ID, A.USER_NAME, A.HOME_BRANCH, B.BRANCH_NAME FROM SMTB_USER A, STTM_BRANCH B WHERE A.ONCE_AUTH=''Y'' AND A.RECORD_STAT=''O'' AND B.BRANCH_CODE=A.HOME_BRANCH AND A.USER_ID NOT IN (SELECT C.USER_ID FROM STTM_BRN_USER_AUTHORISER C))) WHERE 1=1 ORDER BY USER_ID',
'','USER_ID!TEXT!USER_ID~USER_NAME!TEXT!USER_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_VALUE',
'REDMANMC',
'SELECT DISTINCT FIELD_VALUE FROM (SELECT TO_CHAR(AMOUNT) FIELD_VALUE FROM RETBS_EXTERNAL_ENTRY WHERE ? = ''AMOUNT'' AND RECON_CLASS = ? AND EXTERNAL_ENTITY = ? AND EXTERNAL_ACCOUNT = ? AND CURRENCY = ? and MATCH_INDICATOR = ''N'' UNION SELECT TO_CHAR(VALUE_DATE, ''DD-MM-YYYY'') FIELD_VALUE FROM RETBS_EXTERNAL_ENTRY WHERE ? = ''VALUE_DATE'' AND RECON_CLASS = ? AND EXTERNAL_ENTITY = ? AND EXTERNAL_ACCOUNT = ? AND CURRENCY = ? AND MATCH_INDICATOR = ''N'' UNION SELECT TO_CHAR(BOOKING_DATE, ''DD-MM-YYYY'') FIELD_VALUE FROM RETBS_EXTERNAL_ENTRY WHERE ? = ''BOOKING_DATE'' AND RECON_CLASS = ? AND EXTERNAL_ENTITY = ? AND EXTERNAL_ACCOUNT = ? AND CURRENCY = ? and MATCH_INDICATOR = ''N'' UNION SELECT TO_CHAR(DR_CR_INDICATOR) FIELD_VALUE FROM RETBS_EXTERNAL_ENTRY WHERE ? = ''DR_CR_INDICATOR'' AND RECON_CLASS = ? AND EXTERNAL_ENTITY = ? AND EXTERNAL_ACCOUNT = ? AND CURRENCY = ? and MATCH_INDICATOR = ''N'' UNION SELECT TO_CHAR(TRANSACTION_CODE) FIELD_VALUE FROM RETBS_EXTERNAL_ENTRY WHERE ? = ''TRANSACTION_CODE'' AND RECON_CLASS = ? AND EXTERNAL_ENTITY = ? AND EXTERNAL_ACCOUNT = ? AND CURRENCY = ? and MATCH_INDICATOR = ''N'' UNION SELECT TO_CHAR(INTERNAL_REF_NO) FIELD_VALUE FROM RETBS_EXTERNAL_ENTRY WHERE ? = ''INTERNAL_REF_NO'' AND RECON_CLASS = ? AND EXTERNAL_ENTITY = ? AND EXTERNAL_ACCOUNT = ? AND CURRENCY = ? and MATCH_INDICATOR = ''N'' UNION SELECT TO_CHAR(EXTERNAL_REF_NO) FIELD_VALUE FROM RETBS_EXTERNAL_ENTRY WHERE ? = ''EXTERNAL_REF_NO'' AND RECON_CLASS = ? AND EXTERNAL_ENTITY = ? AND EXTERNAL_ACCOUNT = ? AND CURRENCY = ? and MATCH_INDICATOR = ''N'' UNION SELECT TO_CHAR(SUPPLEMENTARY_DETAILS) FIELD_VALUE FROM RETBS_EXTERNAL_ENTRY WHERE ? = ''SUPPLEMENTARY_DETAILS'' AND RECON_CLASS = ? AND EXTERNAL_ENTITY = ? AND EXTERNAL_ACCOUNT = ? AND CURRENCY = ? and MATCH_INDICATOR = ''N'' UNION SELECT TO_CHAR(ENTRY_SEQ_NO) FIELD_VALUE FROM RETBS_EXTERNAL_ENTRY WHERE ? = ''ENTRY_SEQ_NO'' AND RECON_CLASS = ? AND EXTERNAL_ENTITY = ? AND EXTERNAL_ACCOUNT = ? AND CURRENCY = ? and MATCH_INDI'||
'CATOR = ''N'' UNION SELECT TO_CHAR(FUNDS_CODE) VALUE FROM RETBS_EXTERNAL_ENTRY WHERE ? = ''FUNDS_CODE'' AND RECON_CLASS = ? AND EXTERNAL_ENTITY = ? AND EXTERNAL_ACCOUNT = ? AND CURRENCY = ? and MATCH_INDICATOR = ''N'') WHERE 1 = 1',
100,'FIELD_VALUE!TEXT!FIELD_VALUE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_VALUE1',
'REDMANMC',
'SELECT DISTINCT FIELD_VALUE FROM (SELECT TO_CHAR(AMOUNT) FIELD_VALUE FROM RETBS_INTERNAL_ENTRY WHERE ? = ''AMOUNT'' AND RECON_CLASS = ? AND EXTERNAL_ENTITY = ? AND EXTERNAL_ACCOUNT = ? AND CURRENCY = ? and MATCH_INDICATOR = ''N'' UNION SELECT TO_CHAR(VALUE_DATE, ''DD-MM-YYYY'') FIELD_VALUE FROM RETBS_INTERNAL_ENTRY WHERE ? = ''VALUE_DATE'' AND RECON_CLASS = ? AND EXTERNAL_ENTITY = ? AND EXTERNAL_ACCOUNT = ? AND CURRENCY = ? AND MATCH_INDICATOR = ''N'' UNION SELECT TO_CHAR(BOOKING_DATE, ''DD-MM-YYYY'') FIELD_VALUE FROM RETBS_INTERNAL_ENTRY WHERE ? = ''BOOKING_DATE'' AND RECON_CLASS = ? AND EXTERNAL_ENTITY = ? AND EXTERNAL_ACCOUNT = ? AND CURRENCY = ? and MATCH_INDICATOR = ''N'' UNION SELECT TO_CHAR(DR_CR_INDICATOR) FIELD_VALUE FROM RETBS_INTERNAL_ENTRY WHERE ? = ''DR_CR_INDICATOR'' AND RECON_CLASS = ? AND EXTERNAL_ENTITY = ? AND EXTERNAL_ACCOUNT = ? AND CURRENCY = ? and MATCH_INDICATOR = ''N'' UNION SELECT TO_CHAR(TRANSACTION_CODE) FIELD_VALUE FROM RETBS_INTERNAL_ENTRY WHERE ? = ''TRANSACTION_CODE'' AND RECON_CLASS = ? AND EXTERNAL_ENTITY = ? AND EXTERNAL_ACCOUNT = ? AND CURRENCY = ? and MATCH_INDICATOR = ''N'' UNION SELECT TO_CHAR(INTERNAL_REF_NO) FIELD_VALUE FROM RETBS_INTERNAL_ENTRY WHERE ? = ''INTERNAL_REF_NO'' AND RECON_CLASS = ? AND EXTERNAL_ENTITY = ? AND EXTERNAL_ACCOUNT = ? AND CURRENCY = ? and MATCH_INDICATOR = ''N'' UNION SELECT TO_CHAR(EXTERNAL_REF_NO) FIELD_VALUE FROM RETBS_INTERNAL_ENTRY WHERE ? = ''EXTERNAL_REF_NO'' AND RECON_CLASS = ? AND EXTERNAL_ENTITY = ? AND EXTERNAL_ACCOUNT = ? AND CURRENCY = ? and MATCH_INDICATOR = ''N'' UNION SELECT TO_CHAR(SUPPLEMENTARY_DETAILS) FIELD_VALUE FROM RETBS_INTERNAL_ENTRY WHERE ? = ''SUPPLEMENTARY_DETAILS'' AND RECON_CLASS = ? AND EXTERNAL_ENTITY = ? AND EXTERNAL_ACCOUNT = ? AND CURRENCY = ? and MATCH_INDICATOR = ''N'' UNION SELECT TO_CHAR(ENTRY_SEQ_NO) FIELD_VALUE FROM RETBS_INTERNAL_ENTRY WHERE ? = ''ENTRY_SEQ_NO'' AND RECON_CLASS = ? AND EXTERNAL_ENTITY = ? AND EXTERNAL_ACCOUNT = ? AND CURRENCY = ? and MATCH_INDI'||
'CATOR = ''N'' UNION SELECT TO_CHAR(SUPPLEMENTARY_DETAILS) VALUE FROM RETBS_INTERNAL_ENTRY WHERE ? = ''SUPPLEMENTARY_DETAILS'' AND RECON_CLASS = ? AND EXTERNAL_ENTITY = ? AND EXTERNAL_ACCOUNT = ? AND CURRENCY = ? and MATCH_INDICATOR = ''N'') WHERE 1 = 1',
100,'FIELD_VALUE!TEXT!FIELD_VALUE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_VAR_CCY',
'CODVARRL',
'SELECT CCY_CODE FROM CYTM_CCY_DEFN WHERE ONCE_AUTH=''Y'' AND AUTH_STAT=''A'' AND RECORD_STAT=''O'' ORDER BY CCY_CODE',
100,'CCY_CODE!TEXT!CCY_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_VAR_CCY2',
'CODVARRL',
'SELECT CCY_CODE FROM CYTM_CCY_DEFN WHERE ONCE_AUTH=''Y'' AND AUTH_STAT=''A'' AND RECORD_STAT=''O'' ORDER BY CCY_CODE',
100,'CCY_CODE!TEXT!CCY_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_VAR_RULE',
'CODBENFT',
'SELECT var_rule_id,var_rule_desc,var_rule_type,var_rule_basis,var_rule_ccy FROM cotm_variance_rule WHERE  var_rule_basis = ? AND var_rule_type = ? AND once_auth = ''Y'' AND record_stat = ''O'' ORDER BY var_rule_id',
100,'VAR_RULE_ID!TEXT!VAR_RULE_ID~VAR_RULE_DESC!TEXT!VAR_RULE_DESC~VAR_RULE_TYPE!TEXT!VAR_RULE_TYPE~VAR_RULE_BASIS!TEXT!VAR_RULE_BASIS~VAR_RULE_CCY!TEXT!VAR_RULE_CCY',
'STRING~STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_VDATE_MISMATCH_ACC',
'STDBANKP',
'SELECT ac_gl_no FROM(select A.ac_gl_no from sttb_account A ,gltm_glmaster B where B.gl_code=A.ac_gl_no and B.leaf=''Y'' and B.category in(''1'',''2'') and B.customer=''I'') WHERE 1=1 ORDER BY ac_gl_no',
500,'AC_GL_NO!TEXT!AC_GL_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_VDATE_MISMATCH_CONT_ACC',
'STDBANKP',
'SELECT ac_gl_no FROM (select A.ac_gl_no from sttb_account A,gltm_glmaster B where B.gl_code=A.ac_gl_no and B.leaf=''Y''  and B.customer=''I''  and B.category in (''5'',''6'')) WHERE 1=1  order by ac_gl_no',
500,'AC_GL_NO!TEXT!AC_GL_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_VENDOR',
'XPCDLVEN',
'select vendor_code, vend_shrt_desc from xptms_vnd_mst where record_stat = ''O'' and once_auth = ''Y'' and vendor_code not in (select vendor_id from xptm_pr_vendor_restriction where product_code = ?) order by vendor_code',
'','VENDOR_CODE!TEXT!VENDOR_CODE~VEND_SHRT_DESC!TEXT!VEND_SHRT_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_VENDOR',
'XPDCONON',
'select distinct vendor_code,vend_shrt_desc from xptm_vnd_mst where Record_stat=''O'' and Once_Auth =''Y'' and vend_is_blacklisted =''N'' and vendor_code not in (select vendor_id from xptm_pr_vendor_restriction where product_code = ?) order by 2',
100,'VENDOR_CODE!TEXT!VENDOR_CODE~VEND_SHRT_DESC!TEXT!VEND_SHRT_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_VEND_CODE',
'VPDLIQON',
'SELECT DISTINCT VENDOR_CODE, VEND_SHRT_DESC, CREDIT_ACCOUNT FROM(SELECT DISTINCT V.VENDOR_CODE, X.VEND_SHRT_DESC, X.CREDIT_ACCOUNT FROM VPVW_VENDOR_ID V, XPTM_VND_MST X WHERE  V.VENDOR_CODE = X.VENDOR_CODE) WHERE 1 = 1 ORDER BY VENDOR_CODE',
100,'VENDOR_CODE!TEXT!VENDOR_CODE~VEND_SHRT_DESC!TEXT!VEND_SHRT_DESC~CREDIT_ACCOUNT!TEXT!CREDIT_ACCOUNT',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_VPACC',
'VPDLIQON',
'SELECT DISTINCT AC_GL_NO FROM STTB_ACCOUNT WHERE AC_GL_REC_STATUS = ''O'' AND AC_GL_CCY = ? AND AC_OR_GL = ''A'' AND ONCE_AUTH = ''Y'' AND BRANCH_CODE = GLOBAL.CURRENT_BRANCH AND AC_STAT_NO_CR = ''N'' AND CUST_NO LIKE DECODE(?, NULL, ''%'', ?) ORDER BY AC_GL_NO',
100,'AC_GL_NO!TEXT!AC_GL_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_VPACC_DET',
'VPDLIQON',
'SELECT DISTINCT AC_GL_NO FROM STTB_ACCOUNT WHERE AC_GL_REC_STATUS = ''O'' AND AC_GL_CCY = ? AND AC_OR_GL = ''A'' AND ONCE_AUTH = ''Y''  AND AC_STAT_NO_CR = ''N'' AND CUST_NO LIKE DECODE(?, NULL, ''%'', ?) AND BRANCH_CODE = ? ORDER BY AC_GL_NO',
100,'AC_GL_NO!TEXT!AC_GL_NO',
'STRING',
'','','Y'
)
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_WAKALA_ACC',
'CIDACCDT',
'SELECT ACCOUNT_NUMBER FROM CLTB_ACCOUNT_MASTER WHERE PRODUCT_CATEGORY= ''WAKALA'' AND ACCOUNT_STATUS = ''A'' AND AUTH_STAT = ''A'' AND AMOUNT_FINANCED = ? AND BRANCH_CODE = ? AND CUSTOMER_ID = ?',
50,'ACCOUNT_NUMBER!TEXT!ACCOUNT_NUMBER',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_WEB_BRANCH',
'SMDROLDF',
'SELECT FUNCTION_ID, SUB_MENU_2, FUNCTION_LEVEL FROM (SELECT DISTINCT A.FUNCTION_ID FUNCTION_ID, B.SUB_MENU_2 SUB_MENU_2, DECODE(A.AVAILABLE,0,''MENU ITEM'',1,''EXECUTABLE'') FUNCTION_LEVEL FROM SMTB_MENU A, SMTB_FUNCTION_DESCRIPTION B WHERE A.TYPE_STRING IN (''WB'') AND A.FUNCTION_ID=B.FUNCTION_ID AND B.LANG_CODE=GLOBAL.LANG AND A.MODULE=B.BRANCH_MODULE AND A.FUNCTION_ID NOT IN (SELECT ROLE_FUNCTION FROM SMTB_ROLE_DETAIL WHERE ROLE_ID = ?)) WHERE 1 = 1 ORDER BY FUNCTION_ID',
100,'FUNCTION_ID!TEXT!FUNCTION_ID~SUB_MENU_2!TEXT!SUB_MENU_2~FUNCTION_LEVEL!TEXT!FUNCTION_LEVEL',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_WEIGHT_LINE',
'FXDLMNET',
'SELECT l.line_cd || l.line_serial FROM ELVW_LIMITS_INT l,sttms_customer c WHERE l.liab_id = c.liability_no and c.customer_no = ? and l.record_stat = ''O'' and l.auth_stat = ''A'' and l.availability_flag = ''Y'' and l.ccy_restriction = ''N'' and ( EXISTS ( SELECT * FROM ELVW_LIMITS_CUST_REST_INT cr where cr.liab_id = c.liability_no and cr.line_cd = l.line_cd and cr.line_serial = l.line_serial and cr.customer_no = ? ) OR NOT EXISTS ( SELECT * FROM ELVW_LIMITS_CUST_REST_INT cr WHERE cr.liab_id = c.liability_no AND cr.line_cd = l.line_cd  AND cr.line_serial = l.line_serial ) ) AND ( EXISTS ( SELECT * FROM ELVW_LIMITS_BR_REST_INT b WHERE b.liab_id  = c.liability_no  AND  b.line_cd  = l.line_cd  AND   b.line_serial = l.line_serial  AND   b.branch_code = global.current_branch ) OR NOT EXISTS ( SELECT * FROM ELVW_LIMITS_BR_REST_INT b1 WHERE b1.liab_id  = c.liability_no AND  b1.line_cd  = l.line_cd AND  b1.line_serial = l.line_serial ) )',
100,'L.LINE_CD||L.LINE_SERIAL!TEXT!L.LINE_CD||L.LINE_SERIAL',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_WHOUSE',
'FTDPRMNT',
'select warehouse_code, warehouse_name from sttms_warehouse where record_stat=''O'' and once_auth=''Y'' ORDER BY warehouse_code',
100,'WAREHOUSE_CODE!TEXT!~WAREHOUSE_NAME!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_XREF',
'CGDQUERY',
'SELECT DISTINCT XREF FROM CSTBS_CLEARING_MASTER WHERE TXN_BRANCH = GLOBAL.CURRENT_BRANCH ORDER BY XREF',
100,'XREF!TEXT!XREF',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_XREF',
'DDDQUERY',
'SELECT xref FROM   istm_instr_txn WHERE  substr(contract_ref_no, 1, 3) = global.current_branch       ORDER BY xref',
1800,'XREF!TEXT!XREF',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_XREF',
'DEDQUERY',
'SELECT xref FROM detbs_rtl_teller WHERE substr(trn_ref_no,1,3) = global.current_branch         ORDER BY xref',
1800,'XREF!TEXT!XREF',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_XREF',
'UPDQUERY',
'SELECT COD_EXT_REFERENCE_NO FROM UPTBS_PTXN_LOG WHERE substr(COD_REFERENCE_NO,1,3)= global.current_branch ORDER BY COD_EXT_REFERENCE_NO',
100,'COD_EXT_REFERENCE_NO!TEXT!COD_EXT_REFERENCE_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV__STVWS_BRANCH_REFRESH__BRN',
'STDBRREF',
'select distinct brn from STVWS_BRANCH_REFRESH',
1000,'BRN!TEXT!BRN',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV__STVWS_BRANCH_REFRESH__TBL_NAME',
'STDBRREF',
'select TBL_NAME from   STTB_BRANCH_REFRESH_TABLES where REFRESH_REQD = ''Y''',
1000,'TBL_NAME!TEXT!TBL_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_cy',
'MSDMT920',
'SELECT CCY.CCY_CODE, CCY.CCY_NAME  FROM CYTMS_CCY_DEFN CCY WHERE RECORD_STAT = ''O''   AND ONCE_AUTH = ''Y'' ORDER BY CCY_CODE',
100,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LREFNO',
'BRSLIQD',
'',100,'','STRING',
'','BRVWS_BRLIQ_SUMMARY.LREFNO',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LS_BRANCH',
'LSSPCMAP',
'',100,'','STRING',
'','LSTMS_STP_PRODUCT_MAPPING.LS_BRANCH',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LS_PRODUCT',
'LSSPCMAP',
'',100,'','STRING',
'','LSTMS_STP_PRODUCT_MAPPING.LS_PRODUCT',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('Lov_Proj_Name',
'CSCPRJDT',
'SELECT NVL(PROJECT_NAME, '''') AS PROJECT_NAME, PROJECT_DESC from CSTM_DEVELOPER_PROJECTS',
'','PROJECT_NAME!TEXT!PROJECT_NAME~PROJECT_DESC!TEXT!PROJECT_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('Lov_Proj_Name',
'CSCPRJFT',
'SELECT NVL(PROJECT_NAME, '''') AS PROJECT_NAME, PROJECT_DESC from CSTM_DEVELOPER_PROJECTS',
'','PROJECT_NAME!TEXT!PROJECT_NAME~PROJECT_DESC!TEXT!PROJECT_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('Lov_Unit_Id',
'CSCPRJDT',
'SELECT NVL(UNIT_ID,'''') AS UNIT_ID, UNIT_HOLDER_NAME, PROJECT_NAME FROM CSTM_DEV_PROJECT_DETAILS WHERE PROJECT_NAME = nvl(?,PROJECT_NAME)',
'','UNIT_ID!TEXT!UNIT_ID~UNIT_HOLDER_NAME!TEXT!UNIT_HOLDER_NAME~PROJECT_NAME!TEXT!PROJECT_NAME',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('Lov_Unit_Id',
'CSCPRJFT',
'SELECT NVL(UNIT_ID,'''') AS UNIT_ID, UNIT_HOLDER_NAME, PROJECT_NAME FROM CSTM_DEV_PROJECT_DETAILS WHERE PROJECT_NAME = nvl(?,PROJECT_NAME)',
'','UNIT_ID!TEXT!UNIT_ID~UNIT_HOLDER_NAME!TEXT!UNIT_HOLDER_NAME~PROJECT_NAME!TEXT!PROJECT_NAME',
'STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAIN_CATEGORY',
'FASACAT',
'',100,'','STRING',
'','FATMS_ASSET_CATEGORY.MAIN_CATEGORY',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAIN_CHAR',
'MSSSWCHR',
'',100,'','STRING',
'','MSTMS_SWIFT_CHAR.MAIN_CHAR',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAIN_LINE',
'LMSCURLI',
'',100,'','STRING',
'LIAB_BR:global.current_branch',
'LMTMS_LIMITS.MAIN_LINE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAIN_LINE',
'LMSLIM01',
'',100,'','STRING',
'LIAB_BR:global.current_branch',
'LMTMS_LIMITS.MAIN_LINE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAIN_LINE',
'LMSLIMIT',
'',100,'','STRING',
'LIAB_BR:global.current_branch',
'LMTMS_LIMITS.MAIN_LINE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAIN_LINE',
'LMSQSUBL',
'',100,'','STRING',
'','LMVWS_LMTM_LIMITS.MAIN_LINE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAKERID',
'CISTSALE',
'',100,'','STRING',
'','CIVWS_ACCOUNT_SALE_CONFIRM.MAKERID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAKERID',
'UPSQUERY',
'',100,'','STRING',
'TXNBRN:global.current_branch',
'UPVWS_PTXN_LOG.MAKERID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAKERSTAMP',
'CISTSALE',
'',100,'','DATE',
'','CIVWS_ACCOUNT_SALE_CONFIRM.MAKERSTAMP',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAKER_DT_STAMP',
'PCSSFPRM',
'',100,'','DATE',
'','PCTMS_DISP_FILE_PARAM.MAKER_DT_STAMP',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAKER_ID',
'CFSADFEE',
'',100,'','STRING',
'','CSVWS_CFDADFEE_SUMMARY.MAKER_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAKER_ID',
'CSSADMIN',
'',100,'','STRING',
'','CSTMS_ADMINISTRATOR.MAKER_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAKER_ID',
'CSSDIAEV',
'',100,'','STRING',
'','CSTMS_DIARY_MASTER.MAKER_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAKER_ID',
'CSSDRYET',
'',100,'','STRING',
'','LSVW_DIARY_EVENT_SUMMARY.MAKER_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAKER_ID',
'CSSDRYMS',
'',100,'','STRING',
'','CFTMS_DIARY_EVENT_MSG.MAKER_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAKER_ID',
'CSSDRYST',
'',100,'','STRING',
'','LSVW_DIARY_STATUS_SUMMARY.MAKER_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAKER_ID',
'CSSPARDF',
'',100,'','STRING',
'','CSTMS_PARTY_TYPE_DEFN.MAKER_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAKER_ID',
'LLSPRMNT',
'',100,'','STRING',
'','LLVWS_PRODUCT.MAKER_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAKER_ID',
'PCSCONHS',
'',100,'','STRING',
'','PCTBS_CONTRACT_HISTORY.MAKER_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAKER_ID',
'PCSSFPRM',
'',100,'','STRING',
'','PCTMS_DISP_FILE_PARAM.MAKER_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAKER_ID',
'STSBINMT',
'',100,'','STRING',
'','STTMS_CARD_ISS_BIN.MAKER_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAKER_ID',
'STSSTATM',
'',100,'','STRING',
'','STTMS_CARD_STATUS.MAKER_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAKER_ID',
'XPSVNMNT',
'',100,'','STRING',
'','XPTMS_VND_MST.MAKER_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MANDATORY',
'GESFCONV',
'',100,'','STRING',
'','GEVW_FACT_COVENANT.MANDATORY',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MARGIN_CURRENCY',
'BRSUATST',
'',100,'','STRING',
'','BRTMS_ACCOUNT_BRANCH_SCHEME.MARGIN_CURRENCY',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MARKET_CATEGORY',
'SESMKTCD',
'',100,'','STRING',
'','SETMS_MARKET_MASTER.MARKET_CATEGORY',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MARKET_CODE',
'SESDLLEG',
'',100,'','STRING',
'','SEVW_DEAL_SUMMARYS.MARKET_CODE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MARKET_CODE',
'SESMKTCD',
'',100,'','STRING',
'','SETMS_MARKET_MASTER.MARKET_CODE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MARKET_DESCRIPTION',
'SESMKTCD',
'',100,'','STRING',
'','SETMS_MARKET_MASTER.MARKET_DESCRIPTION',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MARKET_TYPE',
'SESMKTCD',
'',100,'','STRING',
'','SETMS_MARKET_MASTER.MARKET_TYPE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MASTER_AGREEMENT_CODE',
'DVSCPMNT',
'',100,'','STRING',
'','DVTMS_COUNTERPARTY_MASTER.MASTER_AGREEMENT_CODE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MASTER_AGREEMENT_CODE',
'IDSMACOD',
'<Long>',
100,'','STRING',
'','DVTMS_COUNTERPARTY_MASTER.MASTER_AGREEMENT_CODE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MATCH_RULE_DESCRIPTION',
'RESRULDF',
'',100,'','STRING',
'','RETMS_MATCH_RULE_DEFN.MATCH_RULE_DESCRIPTION',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MATCH_RULE_ID',
'RESRULDF',
'',100,'','STRING',
'','RETMS_MATCH_RULE_DEFN.MATCH_RULE_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MATDT',
'CISINADT',
'',100,'','DATE',
'','CIVWS_ACCOUNT_DETAIL.MATDT',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MATDT',
'CISNOVDT',
'',100,'','DATE',
'','CIVWS_ACCOUNT_DETAIL.MATDT',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MATDT',
'CLSCOMVD',
'',100,'','STRING',
'','CLVWS_ACCOUNT_DETAIL.MATDT',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MATDT',
'MCSCONON',
'',100,'','DATE',
'MODULE:MC',
'MCVWS_CONTRACT_SUMMARY.MATDT',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MATDT',
'MCSPAMNT',
'',100,'','DATE',
'MODULE:MC',
'MCVWS_CONTRACT_SUMMARY.MATDT',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MATDT',
'MCSVAMND',
'',100,'','DATE',
'MODULE:MC',
'MCVWS_CONTRACT_SUMMARY.MATDT',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MATDT',
'SRSCONON',
'',100,'','STRING',
'MODULE:SR',
'SRVWS_CONTRACT_SUMMARY.MATDT',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MATDT',
'SRSPAMNT',
'',100,'','STRING',
'MODULE:SR',
'SRVWS_CONTRACT_SUMMARY.MATDT',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MATURED_AMT',
'LMSQUTIL',
'',100,'','INT',
'','LMVWS_LINE_UTILS_ALL.MATURED_AMT',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAX_NO_BULKS',
'PCSSFPRM',
'',100,'','INT',
'','PCTMS_DISP_FILE_PARAM.MAX_NO_BULKS',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAX_NO_FILES',
'PCSSFPRM',
'',100,'','INT',
'','PCTMS_DISP_FILE_PARAM.MAX_NO_FILES',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAX_NO_TXN',
'PCSSFPRM',
'',100,'','INT',
'','PCTMS_DISP_FILE_PARAM.MAX_NO_TXN',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MAX_RANGE',
'CSSSEQGN',
'',100,'','INT',
'','CSTMS_SEQUENCE_MASTER.MAX_RANGE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MCR_RULE_CODE',
'CLSMCRMT',
'',100,'','STRING',
'','CLTM_MCR_RULE.MCR_RULE_CODE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MCS',
'MSSMCS',
'',100,'','STRING',
'','MSTMS_MCS.MCS',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MD',
'EISVWPEN',
'',100,'','STRING',
'','EIVWS_PENDING_ITEMS.MD',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MDATE',
'IDSACSAL',
'<Long>',
100,'','DATE',
'BRNCODE:global.current_branch~MODCODE:ID',
'DVVWS_CONTRACT_SUMMARY_FCJ.MDATE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MEDIA',
'GWSQIMSG',
'',100,'','STRING',
'','GWTB_INCOMING_LOG.MEDIA',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MEDIA',
'GWSQOMSG',
'',100,'','STRING',
'','GWTB_OUTGOING_LOG.MEDIA',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MEDIA',
'GWSRETXN',
'',100,'','STRING',
'','GWTB_INCOMING_LOG.MEDIA',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MEDIA',
'MSSCACAD',
'',100,'','STRING',
'CUST_AC_BRN:global.current_branch',
'MSTMS_CUST_ACC_ADDRESS.MEDIA',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MEDIA',
'MSSCHGMN',
'',100,'','STRING',
'','MSTMS_CHG_MAINT.MEDIA',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MEDIA',
'MSSCUSAD',
'',100,'','STRING',
'','MSTMS_CUST_ADDRESS.MEDIA',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MEDIA',
'MSSFFT',
'',100,'','STRING',
'MSG_TYPE:FREE_FORMAT',
'MSTBS_DLY_MSG_OUT.MEDIA',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MEDIA',
'MSSHOLD',
'',100,'','STRING',
'','MSTBS_MSG_HOLD.MEDIA',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MEDIA',
'MSSINBRS',
'',100,'','STRING',
'','MSVWS_MSDINBRS.MEDIA',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MEDIA',
'MSSINRUT',
'',100,'','STRING',
'','MSTBS_INCOMING_ROUTING.MEDIA',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MEDIA',
'MSSMCS',
'',100,'','STRING',
'','MSTMS_MCS.MEDIA',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MEDIA',
'MSSMEDIA',
'',100,'','STRING',
'','MSTMS_MEDIA.MEDIA',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MEDIA',
'MSSMSFMT',
'',100,'','STRING',
'','MSTMS_MSG_FORMAT.MEDIA',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MEDIA',
'MSSOUBRS',
'',100,'','STRING',
'','MSVWS_MSSOUBRS.MEDIA',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MEDIA',
'MSSUNARC',
'',100,'','STRING',
'BRANCH:GLOBAL.CURRENT_BRANCH',
'MSTBS_ARCHIVE_OUT.MEDIA',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MEDIA_NO',
'MSSMEDIA',
'',100,'','STRING',
'','MSTMS_MEDIA.MEDIA_NO',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MEDIUM',
'DVSMGMNT',
'',100,'','STRING',
'','DVTMS_MSG_PARTY_MASTER.MEDIUM',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MERCHANT_ID',
'SWSMRCID',
'',100,'','STRING',
'','SWTMS_MERCHANT_DETAILS.MERCHANT_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MERCH_ID',
'SWSTRMID',
'',100,'','STRING',
'','SWTMS_TERMINAL_DETAILS.MERCH_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MESSAGE_TYPE',
'MSSSTPRF',
'',100,'','STRING',
'','MSTMS_STP_PREFS.MESSAGE_TYPE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MICRNO',
'DDSQUERY',
'',100,'','STRING',
'ISSBRN:global.current_branch',
'ISVWS_INSTR_TXN.MICRNO',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MID_RATE',
'COSQRATE',
'',100,'','INT',
'','CYTB_RATES_HISTORY.MID_RATE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MIN_RANGE',
'CSSSEQGN',
'',100,'','INT',
'','CSTMS_SEQUENCE_MASTER.MIN_RANGE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MIRRORING_OR_REPLICATION',
'RESCLASS',
'',100,'','STRING',
'','RETMS_RECON_CLASS_DEFN.MIRRORING_OR_REPLICATION',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MIRROR_AC',
'ILSMIRAC',
'',100,'','STRING',
'','ILTMS_MIRROR_ACCOUNT.MIRROR_AC',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MISHEAD',
'DESQUERY',
'',100,'','STRING',
'','DEVWS_RTL_TELLER.MISHEAD',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MIS_CLASS',
'MISADJ',
'',100,'','STRING',
'','MITBS_ADJ.MIS_CLASS',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MIS_HEAD',
'MISADJ',
'',100,'','STRING',
'','MITBS_ADJ.MIS_HEAD',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MIS_HEAD',
'MISHEAD',
'',100,'','STRING',
'','MITMS_MIS_HEAD.MIS_HEAD',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MIS_HEAD',
'STSTRCOD',
'',100,'','STRING',
'','STTMS_TRN_CODE.MIS_HEAD',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MIS_REQUIRED',
'DESUPLMA',
'',100,'','STRING',
'','DETB_UPLOAD_MASTER.MIS_REQUIRED',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MKTCD',
'SESBLKDL',
'',100,'','STRING',
'','SEVWS_BLOCK_DEAL_MASTER.MKTCD',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('ML_UTIL',
'LMSQUTIL',
'',100,'','INT',
'','LMVWS_LINE_UTILS_ALL.ML_UTIL',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MM_PROD_FOR_BORROW',
'FXSISPCM',
'',100,'','STRING',
'','FXTMS_PROD_CAT_MAINT.MM_PROD_FOR_BORROW',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MM_PROD_FOR_PLACEMENT',
'FXSISPCM',
'',100,'','STRING',
'','FXTMS_PROD_CAT_MAINT.MM_PROD_FOR_PLACEMENT',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODEL_PORTFOLIO_ID',
'STSMOPOF',
'',100,'','STRING',
'','STTMS_MPF_MASTER.MODEL_PORTFOLIO_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODEL_PORTFOLIO_NAME',
'STSMOPOF',
'',100,'','STRING',
'','STTMS_MPF_MASTER.MODEL_PORTFOLIO_NAME',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'AMSPRPCL',
'',100,'','STRING',
'','CSTMS_CLASS.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'CFSACFCL',
'',100,'','STRING',
'CLASS_TYPE:AF',
'CSTMS_CLASS.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'CFSADFEE',
'',100,'','STRING',
'','CSVWS_CFDADFEE_SUMMARY.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'CFSCHGCL',
'',100,'','STRING',
'CLASS_TYPE:CH',
'CSTMS_CLASS.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'CFSCOMCL',
'',100,'','STRING',
'','CFTMS_COMMISSION_CLASS.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'CFSINCLS',
'',100,'','STRING',
'','CFVWS_ICCF_CLASS.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'CFSINTCL',
'',100,'','STRING',
'','CSTMS_CLASS.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'CFSOCHCL',
'',100,'','STRING',
'','CSVWS_OLD_CHARGE_CLASS.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'CISINADT',
'',100,'','STRING',
'','CIVWS_ACCOUNT_DETAIL.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'CISNOVDT',
'',100,'','STRING',
'','CIVWS_ACCOUNT_DETAIL.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'CLSSTDPL',
'',100,'','STRING',
'','CLTM_STANDARD_POLICIES.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'COSBENFT',
'',100,'','STRING',
'','COTMS_BENEFIT_MASTER.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'COSVARRL',
'',100,'','STRING',
'','COTMS_VARIANCE_RULE.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'CSSACTCL',
'',100,'','STRING',
'CLASS_TYPE:AC',
'CSTM_CLASS.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'CSSCBRCL',
'',100,'','STRING',
'CLASS_TYPE:CB',
'CSTMS_CLASS.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'CSSCUCCL',
'',100,'','STRING',
'CLASS_TYPE:CR',
'CSTMS_CLASS.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'CSSDIAEV',
'',100,'','STRING',
'','CSTMS_DIARY_MASTER.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'CSSDRYMS',
'',100,'','STRING',
'','CFTMS_DIARY_EVENT_MSG.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'CSSLIMIT',
'',100,'','STRING',
'','CSTMS_GENERIC_LIMITS.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'CSSRHMCL',
'',100,'','STRING',
'CLASS_TYPE:RH',
'CSTMS_CLASS.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'CSSRPMNT',
'',100,'','STRING',
'','CSTMS_RISK_RATE.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'CSSSTNAR',
'',100,'','STRING',
'','CSTMS_NARRATIVE_MODULE.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'FASCATCL',
'',100,'','STRING',
'CLASS_TYPE:CR~MODULE:FA',
'CSTMS_CLASS.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'FASLOCCL',
'',100,'','STRING',
'CLASS_TYPE:LR',
'CSTMS_CLASS.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'FISLOCCL',
'',100,'','STRING',
'CLASS_TYPE:LR',
'CSTMS_CLASS.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'FSSALRTG',
'',100,'','STRING',
'BRANCH_CODE:global.current_branch',
'FSTMS_ALERT_GROUP_MASTER.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'IASPRPCL',
'',100,'','STRING',
'','IAVWS_IASPRPCL.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'ISSINSTR',
'',100,'','STRING',
'','ISTMS_INSTR.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'LQSDLIQ',
'',100,'','STRING',
'','LQVWS_RCVBL_CHG_SUMMARY.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'MCSCONON',
'',100,'','STRING',
'MODULE:MC',
'MCVWS_CONTRACT_SUMMARY.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'MSSHOLD',
'',100,'','STRING',
'','MSTBS_MSG_HOLD.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'MSSMSFMT',
'',100,'','STRING',
'','MSTMS_MSG_FORMAT.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'MSSMSTYP',
'',100,'','STRING',
'','MSTMS_MSG_TYPE.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'MSSOUBRS',
'',100,'','STRING',
'','MSVWS_MSSOUBRS.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'MSSUNARC',
'',100,'','STRING',
'BRANCH:GLOBAL.CURRENT_BRANCH',
'MSTBS_ARCHIVE_OUT.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'OVSAUDET',
'',100,'','STRING',
'','CSVWS_MODULE_CONTRACTS_OVDS.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'OVSAUSUM',
'',100,'','STRING',
'','CSVWS_MODULE_CONTRACTS_OVDS.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'PCSISMAP',
'',100,'','STRING',
'','PCTMS_IS_UDF_MAP.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'SESDPFCL',
'',100,'','STRING',
'','SEVWS_SEDDPFCL_SUMMARY.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'SESDPRCL',
'',100,'','STRING',
'MODULE:SD',
'SEVWS_SEDDPRCL_SUMMARY.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'SESPFPCL',
'',100,'','STRING',
'','SEVWS_SEDPFPCL_SUMMARY.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'SESPSRCL',
'',100,'','STRING',
'','CSTMS_CLASS.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'SESSEPCL',
'',100,'','STRING',
'','SEVWS_SECURITY_CLASS.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'SLSPRMNT',
'',100,'','STRING',
'MODULE:SL',
'CSVWS_PRODUCT_SL.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'SMSFNDES',
'',100,'','STRING',
'','SMTBS_MENU.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'SMSFNDSC',
'',100,'','STRING',
'','SMTBS_MENU.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'SRSCONON',
'',100,'','STRING',
'MODULE:SR',
'SRVWS_CONTRACT_SUMMARY.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'TASSCHCL',
'',100,'','STRING',
'','TATMS_TAX_SCHEME.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'TASTAXCL',
'',100,'','STRING',
'','TAVWS_TAX_CLASS.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE',
'UDSEVMNT',
'',100,'','STRING',
'','CSTBS_EVENT.MODULE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULECODE',
'UDSEVENT',
'',100,'','STRING',
'','UDVWS_EVENT_SUMMARY.MODULECODE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE_CODE',
'BCSAMTEX',
'',100,'','STRING',
'','BCTM_EXCH_CUTAMT_MASTER.MODULE_CODE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE_CODE',
'COSUPLDM',
'',100,'','STRING',
'','COTMS_SOURCE_PREF.MODULE_CODE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE_CODE',
'CSSPXMNT',
'',100,'','STRING',
'','CSTMS_PRODUCT_MAX_LIMIT_MASTER.MODULE_CODE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE_CODE',
'CSSSEQGN',
'',100,'','STRING',
'','CSTMS_SEQUENCE_MASTER.MODULE_CODE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE_CODE',
'IASFNONL',
'',100,'','STRING',
'','AMVWS_FUND_ONLINE_SUMMARY.MODULE_CODE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE_CODE',
'IDSBRNPM',
'<Long>',
100,'','STRING',
'BRANCH_CODE:global.current_branch',
'DVTMS_BRANCH_PARAMETERS.MODULE_CODE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE_CODE',
'ISSSRCMD',
'',100,'','STRING',
'','ISTMS_SOURCE_MODE_MASTER.MODULE_CODE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE_CODE',
'STSBREST',
'',100,'','STRING',
'','STTMS_BATCH_RESTRICT_MASTER.MODULE_CODE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE_ID',
'CSSPLMNT',
'',100,'','STRING',
'','CSTMS_PRODUCT_TXN_LIMITS.MODULE_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE_ID',
'CSSPURGE',
'',100,'','STRING',
'','CSTMS_PURGE_DETAILS.MODULE_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE_ID',
'EISMANPR',
'',100,'','STRING',
'BRANCH_CODE:global.current_branch',
'EITMS_MODULES_INSTALLED.MODULE_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE_ID',
'EISMNPRO',
'',100,'','STRING',
'','EITMS_MODULES_INSTALLED.MODULE_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE_ID',
'EISWPPGM',
'',100,'','STRING',
'','EIVWS_PENDING_PROGRAMS.MODULE_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MODULE_REFERENCE_NO',
'IFSCLGDT',
'',100,'','STRING',
'TXN_BRN:global.current_branch',
'IFTBS_CLEARING_UPLOAD.MODULE_REFERENCE_NO',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MOD_CODE',
'LMSQUTIL',
'',100,'','STRING',
'','LMVWS_LINE_UTILS_ALL.MOD_CODE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MOD_NO',
'GESQYFAC',
'',100,'','INT',
'','GEVW_QRY_FACILTY.MOD_NO',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MOD_NO',
'PCSSFPRM',
'',100,'','INT',
'','PCTMS_DISP_FILE_PARAM.MOD_NO',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MOD_NO',
'SESRWDEF',
'',100,'','INT',
'','SEVWS_SEDRWDEF_SUMMARY.MOD_NO',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MOD_NO',
'SESSGLMT',
'',100,'','INT',
'','SETMS_SGL_MASTER.MOD_NO',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MOD_NO',
'TASTAXCL',
'',100,'','INT',
'','TAVWS_TAX_CLASS.MOD_NO',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MPF_ID',
'STSBILLS',
'',100,'','STRING',
'','STTMS_MPF_BILLING.MPF_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MRN',
'RESMANMC',
'',100,'','STRING',
'','REVWS_MATCH_MAST_SUMM.MRN',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MRULID',
'RESMANMC',
'',100,'','STRING',
'','REVWS_MATCH_MAST_SUMM.MRULID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSDA_TYPE',
'IDSMACOD',
'<Long>',
100,'','STRING',
'','DVTMS_COUNTERPARTY_MASTER.MSDA_TYPE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSGTYPE',
'MSSINRUT',
'',100,'','STRING',
'','MSTBS_INCOMING_ROUTING.MSGTYPE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_ARCHIVE_PERIOD',
'MSSPREF',
'',100,'','INT',
'','MSTMS_BRANCH_PREFERENCE.MSG_ARCHIVE_PERIOD',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_CREATION_DT',
'MSSBLKBR',
'',100,'','STRING',
'','MSTMS_COM_PMT_HDR.MSG_CREATION_DT',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_GRP',
'MSSBLKBR',
'',100,'','STRING',
'','MSTMS_COM_PMT_HDR.MSG_GRP',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_ID',
'GWSINBRW',
'',100,'','STRING',
'','GWVWS_GWDINBRW_02.MSG_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_ID',
'GWSOTBRW',
'',100,'','STRING',
'','GWVW_GWDOTBRW_02.MSG_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_ID',
'GWSPBROW',
'',100,'','STRING',
'','GWVW_GWDPBROW_02.MSG_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_ID',
'GWSQIMSG',
'',100,'','STRING',
'','GWTB_INCOMING_LOG.MSG_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_ID',
'GWSQOMSG',
'',100,'','STRING',
'','GWTB_OUTGOING_LOG.MSG_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_ID',
'GWSRETXN',
'',100,'','STRING',
'','GWTB_INCOMING_LOG.MSG_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_REF_NO',
'GWSINBRW',
'',100,'','STRING',
'','GWVWS_GWDINBRW_02.MSG_REF_NO',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_REF_NO',
'GWSOTBRW',
'',100,'','STRING',
'','GWVW_GWDOTBRW_02.MSG_REF_NO',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_REF_NO',
'GWSPBROW',
'',100,'','STRING',
'','GWVW_GWDPBROW_02.MSG_REF_NO',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_REF_NO',
'MSSBLKBR',
'',100,'','STRING',
'','MSTMS_COM_PMT_HDR.MSG_REF_NO',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_STATUS',
'GWSINBRW',
'',100,'','STRING',
'','GWVWS_GWDINBRW_02.MSG_STATUS',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_STATUS',
'GWSOTBRW',
'',100,'','STRING',
'','GWVW_GWDOTBRW_02.MSG_STATUS',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_STATUS',
'MSSOUBRS',
'',100,'','STRING',
'','MSVWS_MSSOUBRS.MSG_STATUS',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_TAG',
'MSSPRMAP',
'',100,'','STRING',
'','CSTMS_MSG_PROD_MAP.MSG_TAG',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_TYPE',
'MSSCOMPY',
'',100,'','STRING',
'','MSTMS_COM_PAY_TYPES.MSG_TYPE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_TYPE',
'MSSCPYUD',
'',100,'','STRING',
'','MSTMS_COM_PAY_UDF_MASTER.MSG_TYPE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_TYPE',
'MSSHOLD',
'',100,'','STRING',
'','MSTBS_MSG_HOLD.MSG_TYPE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_TYPE',
'MSSMPYPR',
'',100,'','STRING',
'','MSTMS_COM_PAY_AMND_FIELDS.MSG_TYPE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_TYPE',
'MSSMSFMT',
'',100,'','STRING',
'','MSTMS_MSG_FORMAT.MSG_TYPE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_TYPE',
'MSSMSTYP',
'',100,'','STRING',
'','MSTMS_MSG_TYPE.MSG_TYPE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_TYPE',
'MSSMTUDF',
'',100,'','STRING',
'','MSTBS_MT_UDF.MSG_TYPE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_TYPE',
'MSSOUBRS',
'',100,'','STRING',
'','MSVWS_MSSOUBRS.MSG_TYPE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_TYPE',
'MSSPMTBR',
'',100,'','STRING',
'','MSTMS_COM_PMT_IN.MSG_TYPE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MSG_TYPE',
'MSSUNARC',
'',100,'','STRING',
'','MSTBS_ARCHIVE_OUT.MSG_TYPE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MTCSTAT',
'RESMANMC',
'',100,'','STRING',
'','REVWS_MATCH_MAST_SUMM.MTCSTAT',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MUDARABAH_FUNDID',
'ICSPALOG',
'',100,'','STRING',
'','ICTBS_PROFIT_APPLY_PARAMS.MUDARABAH_FUNDID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MUDARABAH_FUNDID',
'ICSPCLOG',
'',100,'','STRING',
'','ICTBS_PROFIT_CALC_PARAMS.MUDARABAH_FUNDID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MUDARABAH_FUNDID',
'ICSPRUPD',
'',100,'','STRING',
'','ICTWS_PROFIT_DISTRIBUTION.MUDARABAH_FUNDID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MUDARABAH_FUNDID',
'ICSWTMNT',
'',200,'','STRING',
'','STTMS_MUDARABAHFUND_SLAB_MAST.MUDARABAH_FUNDID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MULTI_CR_REF_NO',
'FTSTCONS',
'',100,'','STRING',
'','FTTB_CONTRACT_CONSOLIDATION.MULTI_CR_REF_NO',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('MUR',
'MSSNOTIF',
'',100,'','STRING',
'','MSVW_MSDNOTIF.MUR',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NAME',
'BRSMAST',
'',100,'','STRING',
'','BRTMS_BRMASTER.NAME',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NAME',
'GISOBDEF',
'',100,'','STRING',
'','GITM_TABLE_MASTER.NAME',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NAME',
'MSSFFT',
'',100,'','STRING',
'MSG_TYPE:FREE_FORMAT',
'MSTBS_DLY_MSG_OUT.NAME',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NAME',
'STSCCIF',
'',100,'','STRING',
'LBRN:global.current_branch',
'STVWS_CUSTOMER.NAME',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NAME',
'STSCIF',
'',100,'','STRING',
'LBRN:global.current_branch',
'STVWS_CUSTOMER.NAME',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NAME',
'STSCLCIF',
'',100,'','STRING',
'LBRN:global.current_branch',
'STVWS_CUSTOMER.NAME',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NAME',
'STSSACIF',
'',100,'','STRING',
'LBRN:global.current_branch',
'STVWS_CUSTOMER.NAME',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NAME',
'STSSDNCH',
'',100,'','STRING',
'LBRN:global.current_branch',
'STVWS_CUSTOMER.NAME',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NAME',
'STSSDNMN',
'',100,'','STRING',
'','STTMS_SDN_MASTER.NAME',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NATIONALITY',
'COSCIFDF',
'',100,'','STRING',
'','STTMS_CUSTOMER.NATIONALITY',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NETTING_DATE_CCY',
'FXSNETMA',
'',100,'','STRING',
'','FXTMS_NETTING_AGMT.NETTING_DATE_CCY',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NETTING_DAYS',
'FXSNETMA',
'',100,'','INT',
'','FXTMS_NETTING_AGMT.NETTING_DAYS',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NETTING_REF_NO',
'ISSNETNG',
'',100,'','STRING',
'','ISTB_NETTED_SETTLEMENTS.NETTING_REF_NO',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NETTING_TYPE',
'FXSNETMA',
'',100,'','STRING',
'','FXTMS_NETTING_AGMT.NETTING_TYPE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NETWORK',
'PCSCONHS',
'',100,'','STRING',
'','PCTBS_CONTRACT_HISTORY.NETWORK',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NETWORK_CODE',
'ISSCTMNT',
'',100,'','STRING',
'','ISTMS_CLEARING_CODE.NETWORK_CODE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NETWORK_CODE',
'ISSNTMNT',
'',100,'','STRING',
'','ISTMS_NETWORK_CODE.NETWORK_CODE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NETWORK_DESC',
'PCSCLRNT',
'',100,'','STRING',
'','PCTMS_CLEARING_NETWORK.NETWORK_DESC',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NETWORK_ID',
'ISSRTGSD',
'',100,'','STRING',
'','ISTMS_RTGS_DIRECTORY.NETWORK_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NETWORK_ID',
'PCSCLRNT',
'',100,'','STRING',
'','PCTMS_CLEARING_NETWORK.NETWORK_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NETWORK_ID',
'PCSSFPRM',
'',100,'','STRING',
'','PCTMS_DISP_FILE_PARAM.NETWORK_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NETWORK_ID',
'SWSNWDET',
'',100,'','STRING',
'','SWTMS_NETWORK_DETAILS.NETWORK_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NET_PRESTL_LINE',
'FXSLMNET',
'',100,'','STRING',
'','FXVWS_LMNET_AGMT.NET_PRESTL_LINE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NET_SETL_LINE',
'FXSLMNET',
'',100,'','STRING',
'','FXVWS_LMNET_AGMT.NET_SETL_LINE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NET_WEIGHT_LINE',
'FXSLMNET',
'',100,'','STRING',
'','FXVWS_LMNET_AGMT.NET_WEIGHT_LINE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NEW_MCK_NUMBER',
'FTSMCKCH',
'',100,'','STRING',
'','FTTBS_CONTRACT_MCK.NEW_MCK_NUMBER',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NEW_REFERENCE_NUMBER',
'FSDSTBRB',
'select contract_ref_no from (select f.contract_ref_no from fxtbs_contract_master f where f.cls_eligible = ''Y'' and substr(f.contract_ref_no, 1, 3) = global.current_branch and exists(select 1 from cstbs_contract c where c.contract_ref_no = f.contract_ref_no and c.contract_status in (''A'', ''L'') and c.auth_status = ''A'') ) where 1=1 Order By contract_ref_no',
100,'CONTRACT_REF_NO!TEXT!CONTRACT_REF_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NEW_REFERENCE_NUMBER',
'FSDSTSBR',
'select contract_ref_no from (select f.contract_ref_no from fxtbs_contract_master f where f.cls_eligible = ''Y'' and substr(f.contract_ref_no, 1, 3) = global.current_branch and exists(select 1 from cstbs_contract c where c.contract_ref_no = f.contract_ref_no and c.contract_status in (''A'', ''L'') and c.auth_status = ''A'') ) where 1=1 Order By contract_ref_no',
100,'CONTRACT_REF_NO!TEXT!CONTRACT_REF_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NEXT_FIRE_TIME',
'SMSJOBBR',
'',100,'','INT',
'','SMVW_JOB_SCHEDULE.NEXT_FIRE_TIME',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NEXT_WORKING_DAY',
'STSDATE',
'',100,'','DATE',
'','STTMS_AEOD_DATES.NEXT_WORKING_DAY',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NLTY',
'STSCCIF',
'',100,'','STRING',
'LBRN:global.current_branch',
'STVWS_CUSTOMER.NLTY',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NLTY',
'STSCIF',
'',100,'','STRING',
'LBRN:global.current_branch',
'STVWS_CUSTOMER.NLTY',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NLTY',
'STSCLCIF',
'',100,'','STRING',
'LBRN:global.current_branch',
'STVWS_CUSTOMER.NLTY',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NLTY',
'STSSACIF',
'',100,'','STRING',
'LBRN:global.current_branch',
'STVWS_CUSTOMER.NLTY',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NLTY',
'STSSDNCH',
'',100,'','STRING',
'LBRN:global.current_branch',
'STVWS_CUSTOMER.NLTY',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NODE',
'MSSMCS',
'',100,'','STRING',
'','MSTMS_MCS.NODE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NOTICE_DAYS',
'GESFCONV',
'',100,'','INT',
'','GEVW_FACT_COVENANT.NOTICE_DAYS',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NOTICE_ID',
'STSNTPRD',
'',100,'','STRING',
'','STTM_NOTICE_PERIOD.NOTICE_ID',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NOTIFICATION_CODE',
'GWSNOTFI',
'',100,'','STRING',
'','GWTMS_NOTIFICATIONS_INSTALLED.NOTIFICATION_CODE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NOTIFICATION_CODE',
'GWSNTFED',
'',100,'','STRING',
'','GWTM_NOTIFICATIONS_ENROUTE.NOTIFICATION_CODE',
'')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('NOTIFICATION_CODE',
'GWSNTFEN',
'',100,'','STRING',
'','GWTM_NOTIFICATIONS_ENROUTE.NOTIFICATION_CODE',
'')
;
END;
/



commit;
