PROMPT PROCESSING FOR SMZB_FUNCTION_LOV_006

BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PCUST',
'CLDINADT',
'select customer_no,customer_name1 from sttm_customer',
100,'DESCRIPTION!TEXT!~SETTLEMENT_MODE!TEXT!SETTLEMENT_MODE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PCUST',
'CLDLOTEM',
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
('LOV_PCUST',
'LEDACCDT',
'select customer_no,customer_name1 from sttm_customer',
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
('LOV_PCUST',
'LSDTRONL',
'select customer_no,customer_name1 from sttm_customer where 1=1',
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
('LOV_PCUST',
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
('LOV_PC_CATEGORY',
'CLDISTCH',
'select prod_category , Category_Desc  from pctms_product_category order by prod_category',
'','PROD_CATEGORY!TEXT!PROD_CATEGORY~CATEGORY_DESC!TEXT!CATEGORY_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PC_CAT_CR',
'CLDCROLL',
'select prod_category, Category_Desc from pctms_product_category where record_stat =''O''and once_auth=''Y''',
50,'PROD_CATEGORY!TEXT!PROD_CATEGORY~CATEGORY_DESC!TEXT!CATEGORY_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PC_CAT_DR',
'CLDCROLL',
'select prod_category, Category_Desc from pctms_product_category where record_stat =''O''and once_auth=''Y''',
50,'PROD_CATEGORY!TEXT!PROD_CATEGORY~CATEGORY_DESC!TEXT!CATEGORY_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PC_CHRG',
'CLDMDSBR',
'select prod_category , Category_Desc  from pctms_product_category where record_stat =''O'' and once_auth=''Y''',
'','PROD_CATEGORY!TEXT!PROD_CATEGORY~CATEGORY_DESC!TEXT!CATEGORY_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PC_CLEARING_BRN',
'STDBRANC',
'SELECT * FROM (SELECT branch_code, branch_name FROM sttm_branch WHERE once_auth = ''Y'' AND record_stat = ''O'' AND	branch_code = pc_clearing_brn  UNION SELECT  ? , ?  FROM dual ) WHERE 1=1 ORDER BY branch_code',
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
('LOV_PC_FIELDS_NAMES',
'PCDMSGMT',
'select field_name from (SELECT FIELD_NAME FROM MSTBS_COM_PAY_FIELDS WHERE TABLE_NAME IN(''FTTBS_UPLOAD_MASTER'',''ISTB_UPLOAD_CONTRACT_DETAILS'') AND          exists( SELECT 1   FROM cstms_product   WHERE module = ''FT'' AND product_code =?)         union all         SELECT FIELD_NAME FROM PCTB_TXN_FIELDS         where 1=1 AND not exists         (SELECT 1   FROM cstms_product   WHERE module = ''FT'' AND product_code =?))         where 1=1 ORDER BY field_name',
100,'FIELD_NAME!TEXT!FIELD_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PC_UD_FIELD_NO',
'PCDISMAP',
'select field_no, field_label from pctmS_ud_field_name where prod_category = ? ORDER BY 1',
100,'FIELD_NO!TEXT!FIELD_NO~FIELD_LABEL!TEXT!FIELD_LABEL',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PDT',
'PCDUPLDT',
'SELECT PROD_CATEGORY, CATEGORY_DESC FROM PCTMS_PRODUCT_CATEGORY WHERE ONCE_AUTH=''Y'' AND RECORD_STAT=''O'' ORDER BY 1',
100,'PROD_CATEGORY!TEXT!PROD_CATEGORY~CATEGORY_DESC!TEXT!CATEGORY_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PEA_IRR_TXNCODE',
'IADGLMNT',
'select  trn_code, trn_desc from sttms_trn_code a  where a.record_stat = ''O'' and a.auth_stat = ''A'' order by trn_code',
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
('LOV_PENAL',
'CLDPRMNT',
'Select item_name, item_desc from cltm_product_dynamic_data where ACTION_CODE = ''POPPENALBASIS'' and product_code =?',
100,'ITEM_NAME!TEXT!ITEM_NAME~ITEM_DESC!TEXT!ITEM_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PERIOD',
'GLDCHECK',
'select a.period_code from sttms_period_codes a, sttms_fin_cycle b where a.fin_cycle = b.fin_cycle and b.auth_stat = ''A'' and b.record_stat = ''O'' and a.fin_cycle = ? and pc_end_date < (select pc_end_date from sttms_period_codes where period_code = (select current_period from sttms_branch where branch_code = global.current_branch) and fin_cycle = (select current_cycle from sttms_branch where branch_code = global.current_branch))',
100,'PERIOD_CODE!TEXT!PERIOD_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PERIOD',
'GLRPBASH',
'select Period_Code,Fin_Cycle from CSVW_PERIOD_CODE',
1000,'PERIOD_CODE!TEXT!PERIOD_CODE~FIN_CYCLE!TEXT!FIN_CYCLE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PERIOD_CODE',
'GLDBRK',
'SELECT PERIOD_CODE FROM STTMS_PERIOD_CODES WHERE FIN_CYCLE = ? ORDER BY PERIOD_CODE',
100,'PERIOD_CODE!TEXT!PERIOD_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PERIOD_CODE',
'GLDMISBA',
'Select distinct period_code from gltbs_misbal where branch_code = ? and gl_code = ? and mis_class = ? order by gl_code',
100,'PERIOD_CODE!TEXT!PERIOD_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PERIOD_CODE',
'GLDVWMBA',
'SELECT DISTINCT PERIOD_CODE FROM GLTBS_MISBAL WHERE BRANCH_CODE = ? AND GL_CODE = ? AND MIS_CLASS = ? AND FIN_YEAR = ? AND CCY_CODE = ?',
100,'PERIOD_CODE!TEXT!PERIOD_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PERIOD_CODE',
'GLDWAVBL',
'SELECT PERIOD_CODE FROM STTMS_PERIOD_CODES ORDER BY PERIOD_CODE',
300,'PERIOD_CODE!TEXT!PERIOD_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PERIOD_CODE',
'GLRPBAL',
'select a.period_code from sttms_period_codes a, sttms_fin_cycle b where a.fin_cycle = b.fin_cycle and ONCE_AUTH = ''Y'' and b.record_stat = ''O'' and a.fin_cycle = ? and pc_end_date < (select pc_end_date from sttms_period_codes where period_code = (select current_period from sttms_branch where branch_code = GLOBAL.CURRENT_BRANCH) and fin_cycle = (select current_cycle from sttms_branch where branch_code = GLOBAL.CURRENT_BRANCH))',
1000,'PERIOD_CODE!TEXT!PERIOD_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PERIOD_CODE',
'IAREXCAC',
'SELECT DISTINCT PERIOD_CODE FROM  PSVWS_TXN_BAL_EXCLN',
100,'PERIOD_CODE!TEXT!PERIOD_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PERIOD_FIN',
'DEDJRONL',
'SELECT period_code,fin_cycle FROM(select x.period_code,x.fin_cycle from sttbs_per_code_status x, sttms_period_codes y where x.branch_code = GLOBAL.CURRENT_BRANCH and x.status=''O'' and x.period_code = y.period_code and x.fin_cycle = y.fin_cycle and y.pc_end_date <= (select max(b.pc_end_date) from sttms_branch a, sttms_period_codes b where a.current_period = b.period_code and a.branch_code = GLOBAL.CURRENT_BRANCH and a.current_cycle = b.fin_cycle))where 1=1',
500,'PERIOD_CODE!TEXT!PERIOD_CODE~FIN_CYCLE!TEXT!FIN_CYCLE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PERIOD_FIN',
'GLRPMABR',
'SELECT period_code,fin_cycle FROM sttm_period_codes order by period_code,fin_cycle',
1000,'PERIOD_CODE!TEXT!PERIOD_CODE~FIN_CYCLE!TEXT!FIN_CYCLE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PERIO_CODE',
'AMRFUNBL',
'select x.period_code,x.fin_cycle from sttbs_per_code_status x, sttms_period_codes y where x.branch_code = global.current_branch and x.period_code = y.period_code and x.fin_cycle = y.fin_cycle and y.pc_end_date <= (select max(b.pc_end_date) from sttms_branch a, sttms_period_codes b where a.current_period = b.period_code and a.branch_code = global.current_branch and a.current_cycle = b.fin_cycle )',
200,'PERIOD_CODE!TEXT!PERIOD_CODE~FIN_CYCLE!TEXT!FIN_CYCLE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PERIO_CODE',
'IARFUNBL',
'select period_code, fin_cycle from sttbs_per_code_status x where x.branch_code = global.current_branch  and EXISTS (SELECT 1 FROM sttms_period_codes y  WHERE x.period_code = y.period_code and  x.fin_cycle = y.fin_cycle  and y.pc_end_date <= (select max(b.pc_end_date) from sttms_branch a, sttms_period_codes b where a.current_period = b.period_code and a.branch_code = global.current_branch and a.current_cycle = b.fin_cycle) )',
200,'PERIOD_CODE!TEXT!PERIOD_CODE~FIN_CYCLE!TEXT!FIN_CYCLE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PF_CLASS_CODE',
'SEDDLPRD',
'SELECT A.CLASS_CODE,B.CLASS_DESCRIPTION FROM SETMS_LEG_CLASS A, CSTMS_CLASS B WHERE A.LEG_TYPE = ? AND B.CLASS_CODE = A.CLASS_CODE AND B.MODULE = ''SD'' AND B.ONCE_AUTH = ''Y'' AND B.RECORD_STAT = ''O'' ORDER BY A.CLASS_CODE',
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
('LOV_PHY_FILE_NAME',
'GIRFILOG',
'SELECT DISTINCT PHY_FILE_NAME FROM GITB_FILE_MASTER WHERE INTERFACE_CODE = ?',
100,'PHY_FILE_NAME!TEXT!PHY_FILE_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PID',
'FTDMT101',
'select ORD_CUST_IDENTIFIER  from MSTM_MT101_CUST_IDENTIFIER WHERE CUSTOMER_NO = ?',
100,'ORD_CUST_IDENTIFIER!TEXT!ORD_CUST_IDENTIFIER',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PM_ACCOUNT_NO',
'CIRPAYAC',
'select account_number from   cltb_account_master where  auth_stat = ''A'' and module_code =''CI''',
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
('LOV_PM_ACCOUNT_NO',
'CLRPAYAC',
'select account_number from   cltb_account_master where  auth_stat = ''A'' and module_code = ''CL''' || chr(10) || '',
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
('LOV_PM_ACCOUNT_NUMBER',
'CIRPAMSC',
'select account_number from cltb_account_master where auth_stat = ''A'' and account_status = ''A'' and module_code =''CI'' and branch_code = global.current_branch order by account_number',
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
('LOV_PM_ACCOUNT_NUMBER',
'CIRPLNHT',
'select account_number from cltb_account_master where auth_stat = ''A'' and account_status = ''A'' and module_code =''CI'' and branch_code = global.current_branch order by account_number',
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
('LOV_PM_ACCOUNT_NUMBER',
'CLRPADVC',
'select account_number from cltb_account_master where auth_stat = ''A'' and account_status = ''A'' and branch_code = global.current_branch and module_code <> ''CI'' order by account_number' || chr(10) || '',
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
('LOV_PM_ACCOUNT_NUMBER',
'CLRPAMSC',
'select account_number from cltb_account_master a,cltms_product_comp_frm p where a.product_code = p.product_code and a.auth_stat = ''A'' and a.account_status = ''A'' and a.branch_code = global.current_branch and module_code = ''CL'' and p.amortized = ''Y'' order by account_number',
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
('LOV_PM_ACCOUNT_NUMBER',
'CLRPLNHT',
'select account_number from cltb_account_master where auth_stat = ''A'' and account_status = ''A'' and branch_code = global.current_branch AND module_code<>''CI'' order by account_number',
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
('LOV_PM_ACCOUNT_NUMBER',
'CLRPRJCN',
'select account_number from cltb_account_master where auth_stat = ''A'' and account_status = ''A'' and branch_code = global.current_branch and module_code <> ''CI'' order by account_number' || chr(10) || '',
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
('LOV_PM_BRN_CODE',
'GLRDLEXP',
'SELECT BRANCH_CODE FROM STTM_BRANCH ORDER BY BRANCH_CODE',
100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PM_PRDCAT',
'CIRACREV',
'SELECT DISTINCT product_category FROM cltms_product ORDER BY product_category',
100,'PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PM_PRDCAT',
'CIRCOMLM',
'SELECT DISTINCT product_category FROM cltms_product ORDER BY product_category',
100,'PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PNL_GL',
'ICDPRMNT',
'SELECT GL_CODE,GL_DESC FROM GLTMS_GLMASTER WHERE LEAF=''Y'' AND CATEGORY IN (3,4) AND RECORD_STAT=''O'' AND ONCE_AUTH =''Y''',
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
('LOV_PNL_GL_LOSS',
'ICDPRMNT',
'SELECT GL_CODE,GL_DESC FROM GLTMS_GLMASTER WHERE LEAF=''Y'' AND CATEGORY IN (3,4) AND RECORD_STAT=''O'' AND ONCE_AUTH=''Y''',
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
('LOV_POLICY_CODE',
'CLDPRCMT',
'SELECT POLICY_CODE,POLICY_DESC FROM CLTM_POLICY WHERE AUTH_STAT = ''A'' AND RECORD_STAT= ''O'' AND POLICY_CATEGORY = ''S''order by POLICY_CODE',
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
('LOV_POLICY_CODE',
'CLDSTDPL',
'SELECT POLICY_CODE,POLICY_DESC FROM CLTM_POLICY WHERE RECORD_STAT = ''O'' AND AUTH_STAT = ''A''',
100,'POLICY_CODE!TEXT!POLICY_CODE~POLICY_DESC!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_POLICY_CODE_1',
'CLDPRCMT',
'SELECT POLICY_CODE, POLICY_DESC  FROM CLTM_POLICY WHERE AUTH_STAT = ''A'' AND RECORD_STAT = ''O'' AND POLICY_CATEGORY = ''O'' order by POLICY_CODE',
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
('LOV_POLICY_TYPE',
'BCDCIFIN',
'SELECT VALUE FROM LMTMS_TYPE_VALUES WHERE TYPE = ''INSURANCETYPE''',
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
('LOV_POL_SDE',
'CLDPOLMT',
'select sde_id from cltms_sde',
'','SDE_ID!TEXT!SDE_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_POOL',
'LMCOLUTL',
'SELECT POOL_CODE,POOL_DESCRIPTION, POOL_CCY,POOL_AMOUNT,POOL_UTIL,AUTH_STAT FROM LMTM_POOL WHERE  AUTH_STAT = ''A'' AND LIAB_ID = ? ORDER BY POOL_CODE',
25,'POOL_CODE!TEXT!POOL_CODE~POOL_DESCRIPTION!TEXT!POOL_DESCRIPTION~POOL_CCY!TEXT!POOL_CCY',
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
('LOV_POOLCODE',
'ISCTXMIS',
'select pool_code,pool_name,calc_method from mitms_pool_code where' || chr(10) || '               (record_stat=''O'') and (auth_stat=''A'') Order By pool_code',
100,'POOL_CODE!TEXT!POOL_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_POOLCODE',
'MICJRMIS',
'select pool_code,pool_name,calc_method from mitms_pool_code where (record_stat=''O'') and (auth_stat=''A'') ORDER BY POOL_CODE',
500,'POOL_CODE!TEXT!POOL_CODE~POOL_NAME!TEXT!POOL_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_POOLCODE',
'MICMOMIS',
'select pool_code,pool_name,calc_method from mitms_pool_code where' || chr(10) || '' || chr(10) || '             (record_stat=''O'') and (auth_stat=''A'')',
10,'POOL_CODE!TEXT!POOL_CODE~POOL_NAME!TEXT!POOL_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_POOLCODE',
'MICTXMIS',
'select pool_code,pool_name,decode (calc_method,1,''30(Euro)/360'',2,''30(US)/360'',3,''Actual/360'',4,''30(Euro)/365'',5,''30(US)/365'',6,''Actual/365'',7,''30(Euro)/Actual'',8,''30(US)/Actual'',9,''Actual/Actual'' ) calc_method1,calc_method  from mitms_pool_code where (record_stat=''O'') and (auth_stat=''A'')' || chr(10) || '',
100,'POOL_CODE!TEXT!POOL_CODE~POOL_NAME!TEXT!POOL_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_POOL_CODE',
'MICACCTM',
'select pool_code,pool_name from mitms_pool_code where (record_stat=''O'') and (auth_stat=''A'')',
20,'POOL_CODE!TEXT!POOL_CODE~POOL_NAME!TEXT!POOL_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_POOL_CODE',
'MIDADJ',
'select pool_code, pool_name from mitm_pool_code where record_stat=''O'' and once_auth=''Y'' order by pool_code',
10,'POOL_CODE!TEXT!POOL_CODE~POOL_NAME!TEXT!POOL_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_POOL_CODE',
'MIDDLREF',
'SELECT DISTINCT POOL_CODE,POOL_NAME FROM MITMS_POOL_CODE WHERE RECORD_STAT=''O'' AND ONCE_AUTH=''Y'' ORDER BY POOL_CODE',
100,'POOL_CODE!TEXT!POOL_CODE~POOL_NAME!TEXT!POOL_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_POOL_CODE',
'MIDGLPOL',
'select distinct pool_code, pool_name from mitms_pool_code where record_stat = ''O'' and ONCE_AUTH = ''Y'' order by pool_code',
100,'POOL_CODE!TEXT!POOL_CODE~POOL_NAME!TEXT!POOL_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_POOL_CODE',
'MIDREFRT',
'SELECT POOL_CODE, POOL_NAME FROM MITMS_POOL_CODE WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY POOL_CODE',
100,'POOL_CODE!TEXT!POOL_CODE~POOL_NAME!TEXT!POOL_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_POOL_CODE',
'MIRPRLO',
'select distinct pool_code, pool_name from mitms_pool_code order by pool_code',
200,'POOL_CODE!TEXT!POOL_CODE~POOL_NAME!TEXT!POOL_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_POOL_LINK',
'GEDQYFAC',
'SELECT ID,LIAB_ID,POOL_CODE,POOL_DESCRIPTION,POOL_CCY,POOL_AMOUNT,FUNCTION_TYPE FROM GETM_POOL WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' AND LIAB_ID = ? AND ID NOT IN(SELECT POOL_ID FROM GETBS_POOL_LINK WHERE FACILITY_ID = ?)',
100,'ID!TEXT!ID~LIAB_ID!TEXT!LIAB_ID~POOL_CODE!TEXT!POOL_CODE~POOL_DESCRIPTION!TEXT!POOL_DESCRIPTION~POOL_CCY!TEXT!POOL_CCY~POOL_AMOUNT!TEXT!POOL_AMOUNT~FUNCTION_TYPE!TEXT!FUNCTION_TYPE',
'STRING~STRING~STRING~STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PORTFOLIO',
'ENDINMRG',
'SELECT portfolio_id,portfolio_description FROM edtm_portfolio WHERE nvl(ONCE_AUTH,''N'')=''Y'' AND record_stat = ''O''',
100,'PORTFOLIO_ID!TEXT!PORTFOLIO_ID~PORTFOLIO_DESCRIPTION!TEXT!PORTFOLIO_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PORTFOLIO',
'SEDBLONL',
'select a.portfolio_id , a.portfolio_ref_no , a.portfolio_description , a.portfolio_customer_id  from setms_portfolio_master a where a.portfolio_local_branch = global.current_branch and a.record_stat = ''O'' and a.auth_stat = ''A'' and exists ( select 1 from setm_dealprod_pfolios_access where sedeal_product_code = ? and portfolio_id = a.portfolio_id and access_allowed_flag = ''Y'' ) and exists (select 1 from setbs_pfolio_skacbalances where portfolio_id = a.portfolio_id and security_id = ? and branch_code = global.current_branch) union select a.portfolio_id , a.portfolio_ref_no , a.portfolio_description , a.portfolio_customer_id   from setms_portfolio_master a where a.portfolio_local_branch = global.current_branch and a.record_stat = ''O'' and a.auth_stat = ''A'' and not exists ( select 1 from setm_dealprod_pfolios_access where sedeal_product_code = ? and portfolio_id = a.portfolio_id )and exists (select 1 from setbs_pfolio_skacbalances where portfolio_id = a.portfolio_id and security_id = ? and branch_code = global.current_branch ) and (exists ( select 1 from setms_dealproduct_restrictions c , setms_deal_product d where c.sedeal_product_code = ? and c.sedeal_product_code = d.product_code and c.seproduct_code = a.portfolio_product_code and c.seproduct_type = ''PF'' and d.pf_restriction_type = ''A'' ) or ( exists ( select 1 from cstms_product where product_code = a.portfolio_product_code and auth_stat = ''A'' and record_stat = ''O'' ) and not exists ( select 1 from setms_dealproduct_restrictions where sedeal_product_code = ? and seproduct_code = a.portfolio_product_code and seproduct_type = ''PF'' ) and exists ( select 1 from setms_deal_product where product_code = ? and pf_restriction_type = ''D'') ) )',
30,'PORTFOLIO_ID!TEXT!PORTFOLIO_ID~PORTFOLIO_DESCRIPTION!TEXT!PORTFOLIO_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PORTFOLIO',
'SEDDPRCL',
'select portfolio_id, portfolio_product_code, portfolio_description  from setms_portfolio_master where record_stat = ''O'' and auth_stat = ''A'' and portfolio_id not in (select portfolio_id from setms_pf_access_class  where class_code = ?   and module = ?) order by portfolio_id',
100,'PORTFOLIO_ID!TEXT!PORTFOLIO_ID~PORTFOLIO_PRODUCT_CODE!TEXT!PORTFOLIO_PRODUCT_CODE~PORTFOLIO_DESCRIPTION!TEXT!PORTFOLIO_DESCRIPTION',
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
('LOV_PORTFOLIO',
'SEDSKONL',
'select a.portfolio_id, a.portfolio_description , a.portfolio_customer_id , b.customer_name1  from setms_portfolio_master a , sttms_customer b where a.portfolio_customer_id=b.customer_no and  a.portfolio_local_branch = global.current_branch and a.record_stat = ''O'' and a.auth_stat = ''A'' and exists (select 1 from setbs_pfolio_skacbalances c where c.branch_code = global.current_branch and c.portfolio_id = a.portfolio_id and (nvl(c.current_position,0) - ( nvl(c.current_balance_blocked, 0) + nvl (c.unauth_released_block, 0) + nvl (c.unauth_buy_position, 0) + nvl (c.unauth_lodge_position, 0))) > 0) and exists ( select 1 from setm_dealprod_pfolios_access where portfolio_id = a.portfolio_id and access_allowed_flag = ''Y'' ) union select a.portfolio_id , a.portfolio_description , a.portfolio_customer_id , b.customer_name1 from setms_portfolio_master a , sttms_customer b  where a.portfolio_customer_id=b.customer_no and a.portfolio_local_branch = global.current_branch and a.record_stat = ''O'' and a.auth_stat = ''A'' and exists (select 1 from setbs_pfolio_skacbalances c where c.branch_code = global.current_branch and c.portfolio_id = a.portfolio_id and (nvl(c.current_position,0) - ( nvl(c.current_balance_blocked, 0) + nvl (c.unauth_released_block, 0) + nvl (c.unauth_buy_position, 0) + nvl (c.unauth_lodge_position, 0))) > 0) and not exists ( select 1 from setm_dealprod_pfolios_access where portfolio_id = a.portfolio_id ) and (exists ( select 1 from setms_dealproduct_restrictions c , setms_deal_product d where c.sedeal_product_code = d.product_code and c.seproduct_code = a.portfolio_product_code and c.seproduct_type = ''PF'' and d.pf_restriction_type = ''A'' ) or ( exists ( select 1 from cstms_product where product_code = a.portfolio_product_code and auth_stat = ''A'' and record_stat = ''O'' ) and not exists ( select 1 from setms_dealproduct_restrictions where seproduct_code = a.portfolio_product_code and seproduct_type = ''PF'' ) and exists ( select 1 from setms_deal_product'||
' where pf_restriction_type = ''D'') ) )',
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
('LOV_PORTFOLIOID',
'EDDLQONL',
'SELECT PORTFOLIO_ID,PORTFOLIO_DESCRIPTION,PF_CUSTOMER,CUSTOMER_NAME1 FROM (SELECT A.PORTFOLIO_ID,A.PORTFOLIO_DESCRIPTION,A.PF_CUSTOMER,B.CUSTOMER_NAME1 FROM EDVWS_DEAL_PRODUCT_INS_PF A,STTM_CUSTOMER B WHERE  SUBSTR(A.PORTFOLIO_REFERENCE,1,3) = ? AND A.DEAL_PRODUCT = ? AND A.INSTRUMENT_ID = ? AND A.PF_CUSTOMER = B.CUSTOMER_NO(+)) WHERE 1=1 ORDER BY 1',
100,'PORTFOLIO_ID!TEXT!PORTFOLIO_ID~PORTFOLIO_DESCRIPTION!TEXT!PORTFOLIO_DESCRIPTION~PF_CUSTOMER!TEXT!PF_CUSTOMER~CUSTOMER_NAME1!TEXT!CUSTOMER_NAME1',
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
('LOV_PORTFOLIOID_SUMMARY',
'EDDLSONL',
'SELECT DISTINCT(PORTFOLIOID) FROM EDVW_LS_DEAL_SUMMARY WHERE 1=1 ORDER BY 1',
200,'PORTFOLIOID!TEXT!PORTFOLIOID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PORTFOLIO_ID',
'EDDBSBAL',
'SELECT DISTINCT A.PORTFOLIO_ID, B.PORTFOLIO_DESCRIPTION FROM EDTMS_PORTFOLIO B, EDTB_BASKET_REFERENCE A WHERE A.PORTFOLIO_ID = B.PORTFOLIO_ID AND A.BRANCH = GLOBAL.CURRENT_BRANCH ORDER BY A.PORTFOLIO_ID',
100,'PORTFOLIO_ID!TEXT!PORTFOLIO_ID~PORTFOLIO_DESCRIPTION!TEXT!PORTFOLIO_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PORTFOLIO_ID',
'SEDRIMNT',
'SELECT A.PORTFOLIO_ID, A.PORTFOLIO_LOCAL_BRANCH ,A.PORTFOLIO_DESCRIPTION  FROM SETMS_PORTFOLIO_MASTER A WHERE PORTFOLIO_TYPE = ''B'' AND AUTH_STAT = ''A'' AND RECORD_STAT = ''O'' and A.PORTFOLIO_ID not in (select PORTFOLIO_ID from setms_risk_profile_det where risk_profile = ? )  AND A.PORTFOLIO_LOCAL_BRANCH = GLOBAL.CURRENT_BRANCH order by A.PORTFOLIO_ID',
100,'PORTFOLIO_ID!TEXT!PORTFOLIO_ID~PORTFOLIO_LOCAL_BRANCH!TEXT!PORTFOLIO_LOCAL_BRANCH',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PORTFOLIO_ID',
'SRCRPBLK',
'select portfolio_id,portfolio_description from setms_portfolio_master where portfolio_local_branch=global.current_branch',
100,'PORTFOLIO_ID!TEXT!PORTFOLIO_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PORTFOLIO_ID_FROM',
'SEDDLONL',
'SELECT a.portfolio_id, a.portfolio_ref_no, a.portfolio_description,a.portfolio_customer_id, a.portfolio_costing_method  FROM setms_portfolio_master a WHERE (a.portfolio_type = DECODE (? , ''BS'', ''B'', ''C'') OR a.portfolio_type = DECODE (? , ''BS'', ''I'', ''C''))AND ((NVL ((SELECT NVL(bankers_acceptance,''N'')FROM setms_deal_product WHERE product_code = ? ), ''N'') = ''Y''AND NVL (a.bankers_acceptance, ''N'') = ''Y''AND a.portfolio_type = ''I'')OR (NVL ((SELECT NVL(bankers_acceptance,''N'')FROM setms_deal_product WHERE product_code = ?), ''N'') = ''N''AND NVL (a.bankers_acceptance, ''N'') = ''N''))AND a.contract_status = ''A''AND a.portfolio_local_branch = GLOBAL.current_branch AND a.record_stat = ''O''AND a.auth_stat = ''A''AND EXISTS (SELECT 1 FROM setm_dealprod_pfolios_access WHERE sedeal_product_code = ? AND portfolio_id =  a.portfolio_id AND access_allowed_flag = ''Y'')AND EXISTS (SELECT 1 FROM sevws_allowed_pf_sec_combis vps WHERE vps.security =? AND vps.portfolio = a.portfolio_id)UNION SELECT a.portfolio_id,        a.portfolio_ref_no,        a.portfolio_description,       a.portfolio_customer_id,        a.portfolio_costing_method FROM   setms_portfolio_master a WHERE ( a.portfolio_type = DECODE (? , ''BS'', ''B'', ''C'')        OR a.portfolio_type = DECODE (? , ''BS'', ''I'', ''C'')       )   AND ((NVL ((SELECT NVL(bankers_acceptance,''N'')		            FROM setms_deal_product		            WHERE product_code = ?), ''N'') = ''Y''AND NVL (a.bankers_acceptance, ''N'') = ''Y'' AND a.portfolio_type = ''I'') OR (    NVL ((SELECT NVL(bankers_acceptance,''N'')FROM setms_deal_product WHERE product_code = ? ) , ''N'') = ''N'' AND NVL (a.bankers_acceptance, ''N'') = ''N''))  AND a.portfolio_local_branch = GLOBAL.current_branch   AND a.contract_status = ''A''   AND a.record_stat = ''O''   AND a.auth_stat = ''A''   AND NOT EXISTS (SELECT 1 FROM setm_dealprod_pfolios_access WHERE sedeal_product_code = ? AND portfolio_id = a.portfolio_id) AND (   EXISTS (SELECT 1 FROM se'||
'tms_dealproduct_restrictions c, setms_deal_product d  WHERE c.sedeal_product_code =? AND c.sedeal_product_code = d.product_code AND c.seproduct_code = a.portfolio_product_code AND c.seproduct_type = ''PF'' AND d.pf_restriction_type = ''A'')OR (    EXISTS (SELECT 1 FROM cstms_product WHERE product_code = a.portfolio_product_code AND auth_stat = ''A'' AND record_stat = ''O'') AND NOT EXISTS (SELECT 1 FROM setms_dealproduct_restrictions WHERE sedeal_product_code = ? AND seproduct_code = a.portfolio_product_code AND seproduct_type = ''PF'') AND EXISTS (SELECT 1 FROM setms_deal_product WHERE product_code = ? AND pf_restriction_type = ''D'')  )       )   AND EXISTS (SELECT 1  FROM sevws_allowed_pf_sec_combis vpsk  WHERE vpsk.security = ?   AND vpsk.portfolio = a.portfolio_id)',
100,'PORTFOLIO_ID!TEXT!PORTFOLIO_ID~PORTFOLIO_REF_NO!TEXT!PORTFOLIO_REF_NO~PORTFOLIO_DESCRIPTION!TEXT!PORTFOLIO_DESCRIPTION~PORTFOLIO_CUSTOMER_ID!TEXT!PORTFOLIO_CUSTOMER_ID~PORTFOLIO_COSTING_METHOD!TEXT!PORTFOLIO_COSTING_METHOD',
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
('LOV_PORTFOLIO_ID_SUMM',
'EDDLQONL',
'SELECT DISTINCT(PORTFOLIOID) FROM EDVWS_LIQUIDATION_DEAL_SUMMARY WHERE 1=1 ORDER BY 1',
100,'PORTFOLIOID!TEXT!PORTFOLIOID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PORTFOLIO_ID_TO',
'SEDDLONL',
'select a.portfolio_id ,        a.portfolio_ref_no ,        a.portfolio_description ,        a.portfolio_customer_id, a.portfolio_costing_method from   setms_portfolio_master a where ( a.portfolio_type = decode(? , ''BB'' , ''B'' , ''C'')         or a.portfolio_type = decode( ? , ''BB'' , ''I'' , ''C'')        ) and    a.portfolio_local_branch = global.current_branch and    a.contract_status = ''A'' and    a.record_stat = ''O'' and    a.auth_stat = ''A'' and exists (     select 1     from setm_dealprod_pfolios_access where sedeal_product_code = ?    and portfolio_id = a.portfolio_id     and access_allowed_flag = ''Y'' )  and exists (    select 1     from sevws_allowed_pf_sec_combis vps     where vps.security = ?     and   vps.portfolio = a.portfolio_id    ) union select a.portfolio_id ,        a.portfolio_ref_no ,        a.portfolio_description ,        a.portfolio_customer_id, a.portfolio_costing_method from   setms_portfolio_master a where ( a.portfolio_type = decode( ? , ''BB'' , ''B'' , ''C'') or a.portfolio_type = decode( ? , ''BB'' , ''I'' , ''C'') )  and a.portfolio_local_branch = global.current_branch and a.contract_status = ''A'' and a.record_stat = ''O'' and a.auth_stat = ''A'' and not exists (         select 1         from setm_dealprod_pfolios_access         where sedeal_product_code = ?         and portfolio_id = a.portfolio_id )         and (exists ( select 1                       from setms_dealproduct_restrictions c ,                            setms_deal_product d                       where c.sedeal_product_code = ?                      and c.sedeal_product_code = d.product_code                       and c.seproduct_code = a.portfolio_product_code                       and c.seproduct_type = ''PF''                       and d.pf_restriction_type = ''A''                       )              or (             exists ( select 1                       from cstms_product                       where product_code = a.portfolio_product_code                   '||
'    and auth_stat = ''A''        and record_stat = ''O''                       )               and not exists (                       select 1                       from setms_dealproduct_restrictions                       where sedeal_product_code = ?                      and seproduct_code = a.portfolio_product_code                       and seproduct_type = ''PF'' )               and exists ( select 1                            from setms_deal_product                            where product_code = ?                         and pf_restriction_type = ''D''                           )                  )             )         and exists (select 1                    from sevws_allowed_pf_sec_combis vps                    where vps.security = ?                    and vps.portfolio = a.portfolio_id                   )',
100,'PORTFOLIO_ID!TEXT!PORTFOLIO_ID~PORTFOLIO_REF_NO!TEXT!PORTFOLIO_REF_NO~PORTFOLIO_DESCRIPTION!TEXT!PORTFOLIO_DESCRIPTION~PORTFOLIO_CUSTOMER_ID!TEXT!PORTFOLIO_CUSTOMER_ID~PORTFOLIO_COSTING_METHOD!TEXT!PORTFOLIO_COSTING_METHOD',
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
('LOV_PORT_ACCESS',
'EDDDLPRD',
'SELECT portfolio_id, portfolio_product, portfolio_description FROM edtm_portfolio WHERE record_stat= ''O'' AND once_auth = ''Y'' AND portfolio_id NOT IN (SELECT portfolio_id FROM cstms_pf_access_for_deal_prd WHERE deal_product_code = ?) ORDER BY portfolio_id',
'','PORTFOLIO_ID!TEXT!PORTFOLIO_ID~PORTFOLIO_DESCRIPTION!TEXT!PORTFOLIO_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PORT_RESTRC',
'EDDDLPRD',
'SELECT product_code, product_description FROM cstms_product WHERE once_auth = ''Y'' AND record_stat = ''O'' AND module = ''EP'' AND product_code NOT IN (SELECT portfolio_product_code FROM cstms_pf_prd_res_for_deal_prd WHERE  deal_product_code = ? AND portfolio_module = ''ET'') ORDER BY product_code',
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
('LOV_PORT_RI',
'SEDDLONL',
'select distinct a.portfolio_id, b.portfolio_customer_id from setbs_pfolio_skacbalances a, setms_portfolio_master b where a.current_position > 0 and a.portfolio_id = b.portfolio_id and a.branch_code = global.current_branch and  (b.portfolio_type = DECODE (? , ''BS'', ''B'', ''C'') OR b.portfolio_type = DECODE (? , ''BS'', ''I'', ''C'')) and exists (select internal_security_id from setms_rights_warrants where intmdt_security_id = a.security_id)',
100,'PORTFOLIO_ID!TEXT!PORTFOLIO_ID~PORTFOLIO_CUSTOMER_ID!TEXT!PORTFOLIO_CUSTOMER_ID',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_POSEQV_GL',
'CYDCDEFN',
'SELECT GL_CODE, GL_DESC  FROM GLTMS_GLMASTER WHERE RECORD_STAT = ''O''  AND CATEGORY = ''9''  AND ONCE_AUTH = ''Y'' ORDER BY GL_CODE',
50,'GL_CODE!TEXT!GL_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_POSITION_GL',
'CYDCDEFN',
'SELECT GL_CODE, GL_DESC FROM GLTMS_GLMASTER WHERE RECORD_STAT=''O'' AND CATEGORY = ''8'' AND ONCE_AUTH = ''Y'' ORDER BY GL_CODE',
50,'GL_CODE!TEXT!GL_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_POSSIBLE_ANSWERS',
'CIDACCDT',
'SELECT POSSIBLE_ANSWERS,SCORE FROM CLTBS_CRDRATING_QUES_DETAIL WHERE QUEST_ID = ? and rule_id = ?',
100,'POSSIBLE_ANSWERS!TEXT!POSSIBLE_ANSWERS',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_POST_CMP_AUDF',
'GIDIFTDF',
'SELECT AUDF_NAME FROM GITB_AUDF WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY AUDF_NAME',
100,'AUDF_NAME!TEXT!AUDF_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_POST_FIELD_AUDF',
'GIDIFTDF',
'SELECT AUDF_NAME FROM GITB_AUDF WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY AUDF_NAME',
100,'AUDF_NAME!TEXT!AUDF_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_POST_MSG_AUDF',
'GIDIFTDF',
'SELECT AUDF_NAME FROM GITB_AUDF WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY AUDF_NAME',
100,'AUDF_NAME!TEXT!AUDF_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_POST_REC_AUDF',
'GIDIFTDF',
'SELECT AUDF_NAME FROM GITB_AUDF WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY AUDF_NAME',
100,'AUDF_NAME!TEXT!AUDF_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRD',
'AMDFNONL',
'select a.product_code,a.product_description, a.product_start_date,a.product_end_date from cstms_product a, amtms_fund_product b where a.record_stat= ''O'' and a.once_auth = ''Y'' and a.product_code = b.product order by a.product_code',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION~PRODUCT_START_DATE!TEXT!PRODUCT_START_DATE~PRODUCT_END_DATE!TEXT!PRODUCT_END_DATE',
'STRING~STRING~DATE~DATE',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRD',
'GLRPPLST',
'',500,'PERIOD_CODE!TEXT!PERIOD_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRD',
'GLRPPNL',
'select a.period_code from sttms_period_codes a, sttms_fin_cycle b where a.fin_cycle = b.fin_cycle and b.auth_stat = ''A'' and b.record_stat = ''O'' and a.fin_cycle = ? and a.period_code <> ''FIN'' and pc_end_date < (select pc_end_date from sttms_period_codes where period_code = (select current_period from sttms_branch where branch_code = global.current_branch) and fin_cycle = (select current_cycle from sttms_branch where branch_code = global.current_branch))',
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
('LOV_PRD',
'IADFNONL',
'select a.product_code, a.product_description  from cstms_product a, amtms_fund_product b  where a.record_stat = ''O'' and a.once_auth = ''Y'' AND a.auth_stat = ''A'' AND a.module = ''IA'' and  a.product_code = b.product and Nvl(b.islamic_syndication,''N'') <> ''Y''  order by a.product_code',
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
('LOV_PRD',
'SEDBLKDL',
'select product_code, product_description, product_type from (select a.product_code , a.product_description, a.product_type from cstms_product a , setms_combination_product b , csvws_available_prodbr c where a.product_type = ''CO'' and a.module=''SD'' and a.record_stat=''O'' and a.auth_stat=''A'' and a.product_code=b.combination_product and (exists (select 1 from  sttms_branch where branch_code=global.current_branch and ((nvl(fund_branch,''N'')=''Y'' and b.buy_product_type<>''CB'') or (Nvl(fund_branch,''N'')=''N'' and b.buy_product_type<>''**''))) or exists (select 1 from  sttms_branch where branch_code=global.current_branch and ((nvl(fund_branch,''N'')=''Y'' and b.sell_product_type<>''CS'') or (Nvl(fund_branch,''N'')=''N'' and b.sell_product_type<>''**'')))) and b.preferred_leg = c.product_code and c.user_id = global.User_id and c.branch_code = global.current_branch) where 1=1 order by product_code',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRD',
'SEDPSRCL',
'Select product_code,PRODUCT_DESCRIPTION  From CSTMS_PRODUCT WHERE product_code in (Select product from setms_security_product)  and product_code   not in (select SECURITY_PRODUCT_CODE from SETMS_SEC_RESTRICTIONS_CLASS where CLASS_CODE = ? and module = ?)and record_stat = ''O'' and auth_stat = ''A''  Order by product_code',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRDCODE',
'PCDCLAGT',
'select product_code,product_description,clg_ccy from (select c.product_code,c.product_description,p.clg_ccy from cstms_product c,pctms_product_preference p where c.module=''PC'' and c.record_stat=''O'' and c.once_auth=''Y'' and c.product_code = p.product_code) where 1=1 order by product_code',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION~CLG_CCY!TEXT!CLG_CCY',
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
('LOV_PRDCODE1',
'LSDTRONL',
'SELECT * FROM (select a.PRODUCT_CODE prd, b.product_desc  ,b.product_category from  LSTBS_BORROWER_DRAWDOWN_PROD a,cltms_product b, lstm_product c  where a.PRODUCT_CODE = b.product_code  and   b.product_code = c.product_code and   b.product_type=L and   b.module_code=LS and   c.PARTICIPANT_PRODUCT is not NULL and   a.contract_ref_no = ? and   a.version_no = (select version_no from cltb_account_master where account_number= ?) UNION select a.DD_PRODUCT_CODE, b.product_desc  ,b.product_category from lstbs_contract_borr_ddprod a, cltms_product b, lstm_product c  where a.DD_PRODUCT_CODE = b.product_code  and   b.product_code = c.product_code and   b.product_type=L and   b.module_code=LS and c.PARTICIPANT_PRODUCT is not NULL and a.contract_ref_no = ? and (a.version_no,a.customer_no) in (select version_no,customer_id from cltb_account_master where account_number= ?)) Z where 1=1',
10,'PRD!TEXT!PRD',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRDCT',
'FTDTCONS',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE AUTH_STAT = ''A''',
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
('LOV_PRD_CAT',
'CIRMATDT',
'select distinct product_category from cltb_account_master where module_code = ''CI''',
100,'PRODUCT_CATEGORY!TEXT!PM_PRD_CAT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRD_CAT',
'PCCACENT',
'select prod_category, category_desc from pctms_product_category where prod_category like ''*'' || ? || ''*'' and ONCE_AUTH = ''Y''and record_stat = ''O'' and product_type not in (''XI'', ''RI'') ORDER BY PROD_CATEGORY',
100,'PROD_CATEGORY!TEXT!PROD_CATEGORY~CATEGORY_DESC!TEXT!CATEGORY_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRD_CAT',
'PCCEVNTS',
'select prod_category, category_desc from pctms_product_category where prod_category like ''*'' || ? || ''*'' and ONCE_AUTH = ''Y''and record_stat = ''O'' and product_type not in (''XI'', ''RI'') ORDER BY PROD_CATEGORY',
100,'PROD_CATEGORY!TEXT!PROD_CATEGORY~CATEGORY_DESC!TEXT!CATEGORY_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRD_CAT',
'PCDFTONL',
'select prod_category, category_desc from pctms_product_category where ONCE_AUTH = ''Y'' and record_stat = ''O'' and product_type not in (''XO'',''RO'',''XI'',''RI'') ORDER BY PROD_CATEGORY',
100,'PROD_CATEGORY!TEXT!PROD_CATEGORY~CATEGORY_DESC!TEXT!CATEGORY_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRD_CAT',
'PCDONONL',
'select prod_category, category_desc from pctms_product_category where ONCE_AUTH = ''Y'' and record_stat = ''O'' AND AUTH_STAT=''A'' and product_type not in (''XI'', ''RI'', ''IN'') ORDER BY PROD_CATEGORY',
100,'PROD_CATEGORY!TEXT!PROD_CATEGORY~CATEGORY_DESC!TEXT!CATEGORY_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRD_CD',
'IARACENT',
'select a.period_code, to_char(b.pc_start_date, ''YYYY-MM-DD'') pc_start_date, to_char(b.pc_end_date, ''YYYY-MM-DD'') pc_end_date from sttbs_per_code_status a, sttms_period_codes b where a.branch_code = global.current_branch and b.fin_cycle = a.fin_cycle and b.period_code = a.period_code and b.fin_cycle = ? order by b.period_code',
100,'PERIOD_CODE!TEXT!PERIOD_CODE~PC_START_DATE!TEXT!PC_START_DATE~PC_END_DATE!TEXT!PC_END_DATE',
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
('LOV_PRD_CD',
'IARACRHS',
'select a.period_code, to_char(b.pc_start_date, ''YYYY-MM-DD'') pc_start_date, to_char(b.pc_end_date, ''YYYY-MM-DD'') pc_end_date from sttbs_per_code_status a, sttms_period_codes b where a.branch_code = global.current_branch and b.fin_cycle = a.fin_cycle and b.period_code = a.period_code and b.fin_cycle = ? order by b.period_code',
100,'PERIOD_CODE!TEXT!PERIOD_CODE~PC_START_DATE!TEXT!PC_START_DATE~PC_END_DATE!TEXT!PC_END_DATE',
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
('LOV_PRD_CD',
'IARBKNTD',
'select a.period_code, to_char(b.pc_start_date, ''YYYY-MM-DD'') pc_start_date, to_char(b.pc_end_date, ''YYYY-MM-DD'') pc_end_date from sttbs_per_code_status a, sttms_period_codes b where a.branch_code = global.current_branch and b.fin_cycle = a.fin_cycle and b.period_code = a.period_code and b.fin_cycle = ? order by b.period_code',
100,'PERIOD_CODE!TEXT!PERIOD_CODE~PC_START_DATE!TEXT!PC_START_DATE~PC_END_DATE!TEXT!PC_END_DATE',
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
('LOV_PRD_CD',
'IARLIQST',
'select a.period_code, to_char(b.pc_start_date, ''YYYY-MM-DD'') pc_start_date, to_char(b.pc_end_date, ''YYYY-MM-DD'') pc_end_date from sttbs_per_code_status a, sttms_period_codes b where a.branch_code = global.current_branch and b.fin_cycle = a.fin_cycle and b.period_code = a.period_code and b.fin_cycle = ? order by b.period_code',
100,'PERIOD_CODE!TEXT!PERIOD_CODE~PC_START_DATE!TEXT!PC_START_DATE~PC_END_DATE!TEXT!PC_END_DATE',
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
('LOV_PRD_CD',
'IARPFADJ',
'select a.period_code, to_char(b.pc_start_date, ''YYYY-MM-DD'') pc_start_date, to_char(b.pc_end_date, ''YYYY-MM-DD'') pc_end_date from sttbs_per_code_status a, sttms_period_codes b where a.branch_code = global.current_branch and b.fin_cycle = a.fin_cycle and b.period_code = a.period_code and b.fin_cycle = ? order by b.period_code',
100,'PERIOD_CODE!TEXT!PERIOD_CODE~PC_START_DATE!TEXT!PC_START_DATE~PC_END_DATE!TEXT!PC_END_DATE',
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
('LOV_PRD_CD',
'IARPSRUN',
'select a.period_code, to_char(b.pc_start_date, ''YYYY-MM-DD'') pc_start_date, to_char(b.pc_end_date, ''YYYY-MM-DD'') pc_end_date from sttbs_per_code_status a, sttms_period_codes b where a.branch_code = global.current_branch and b.fin_cycle = a.fin_cycle and b.period_code = a.period_code and b.fin_cycle = ? order by b.period_code',
100,'PERIOD_CODE!TEXT!PERIOD_CODE~PC_START_DATE!TEXT!PC_START_DATE~PC_END_DATE!TEXT!PC_END_DATE',
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
('LOV_PRD_CD',
'IARTDACC',
'select a.period_code, to_char(b.pc_start_date, ''YYYY-MM-DD'') pc_start_date, to_char(b.pc_end_date, ''YYYY-MM-DD'') pc_end_date from sttbs_per_code_status a, sttms_period_codes b where a.branch_code = global.current_branch and b.fin_cycle = a.fin_cycle and b.period_code = a.period_code and b.fin_cycle = ? order by b.period_code',
100,'PERIOD_CODE!TEXT!PERIOD_CODE~PC_START_DATE!TEXT!PC_START_DATE~PC_END_DATE!TEXT!PC_END_DATE',
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
('LOV_PRD_CODE',
'CIDACCDT',
'select PRODUCT_CODE, PRODUCT_CATEGORY from cltm_product where AUTH_STAT=''A'' AND ONCE_AUTH=''Y'' and module_code = ''CI''',
50,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRD_CODE',
'CIRMATDT',
'select distinct product_code from cltb_account_master where module_code = ''CI''',
100,'PRODUCT_CODE!TEXT!PM_PRD_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRD_CODE',
'CLDACCDT',
'select PRODUCT_CODE, PRODUCT_CATEGORY,PRODUCT_DESC from cltm_product where product_type = decode(? ,''CLDCOMIT'',''C'',''CLDSCOMT'',''C'',''MODCOMIT'',''C'',''MODSCOMT'',''C'',''L'') and auth_stat = ''A'' and record_stat = ''O'' and NVL(limits_product,''N'')!=''Y'' and module_code = decode(? ,''CLDCOMIT'',''CL'',''CLDSCOMT'',''CL'',''MODCOMIT'',''MO'',''MODSCOMT'',''MO'',''MODACCDT'',''MO'',''MODRENOG'',''MO'',''MODINADT'',''MO'',''MODSIMDT'',''MO'',''MODMROLL'',''MO'',''MODIMROL'',''MO'',''MODSIMVD'',''MO'',''CL'')',
50,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY~PRODUCT_DESC!TEXT!PRODUCT_DESC',
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
('LOV_PRD_CODE',
'CLDINADT',
'select PRODUCT_CODE, PRODUCT_CATEGORY from cltm_product where AUTH_STAT=''A'' AND ONCE_AUTH=''Y''',
50,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRD_CODE',
'CLDLOTEM',
'select PRODUCT_CODE, PRODUCT_CATEGORY,PRODUCT_DESC from cltm_product where product_type = decode(? ,''CLDCOMIT'',''C'',''CLDSCOMT'',''C'',''MODCOMIT'',''C'',''MODSCOMT'',''C'',''L'') and auth_stat = ''A'' and record_stat = ''O'' and NVL(limits_product,''N'')!=''Y'' and module_code = decode(? ,''CLDCOMIT'',''CL'',''CLDSCOMT'',''CL'',''MODCOMIT'',''MO'',''MODSCOMT'',''MO'',''MODACCDT'',''MO'',''CL'')',
50,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY~PRODUCT_DESC!TEXT!PRODUCT_DESC',
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
('LOV_PRD_CODE',
'LEDACCDT',
'SELECT PRODUCT_CODE,PRODUCT_CATEGORY,PRODUCT_DESC FROM CLTM_PRODUCT WHERE PRODUCT_TYPE= DECODE(''LEDACCDT'',''CLDCOMIT'',''C'',''CLDSCOMT'',''C'',''LEDACCDT'',''E'',''E'') AND AUTH_STAT = ''A'' AND RECORD_STAT = ''O''' || chr(10) || '',
50,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY~PRODUCT_DESC!TEXT!PRODUCT_DESC',
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
('LOV_PRD_CODE',
'LSDTRONL',
'select PRODUCT_CODE, PRODUCT_CATEGORY from cltm_product where product_type= decode(? ,''CLDCOMIT'',''C'',''CLDSCOMT'',''C'',''L'') ORDER BY PRODUCT_CODE',
50,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRD_CODE',
'MODACCDT',
'',50,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY~PRODUCT_DESC!TEXT!PRODUCT_DESC',
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
('LOV_PRD_CODE',
'STDREXBT',
'SELECT DISTINCT PERIOD_CODE FROM STTMS_PERIOD_CODES WHERE PERIOD_CODE<>''FIN''',
100,'PERIOD_CODE!TEXT!PERIOD_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRD_CTG',
'SLDEMPLR',
'SELECT PROD_CATEGORY, CATEGORY_DESC FROM PCTMS_PRODUCT_CATEGORY WHERE ONCE_AUTH= ''Y'' AND RECORD_STAT = ''O'' ORDER BY 1',
100,'PROD_CATEGORY!TEXT!PROD_CATEGORY~CATEGORY_DESC!TEXT!CATEGORY_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRD_FROM',
'IADPRCAL',
'SELECT FIN_CYCLE,PERIOD_CODE FROM STTM_PERIOD_CODES  WHERE FIN_CYCLE = ? ORDER BY FIN_CYCLE,PERIOD_CODE',
100,'FIN_CYCLE!TEXT!FIN_CYCLE~PERIOD_CODE!TEXT!PERIOD_CODE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRD_GROUP_SUMMARY',
'FTDPRMNT',
'select product_group, product_group_description from cstms_product_group where record_stat = ''O'' and once_auth=''Y'' ORDER BY product_group',
100,'PRODUCT_GROUP!TEXT!PRODUCT_GROUP~PRODUCT_GROUP_DESCRIPTION!TEXT!PRODUCT_GROUP_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRD_TO',
'IADPRCAL',
'SELECT FIN_CYCLE,PERIOD_CODE FROM STTM_PERIOD_CODES  WHERE FIN_CYCLE = ? ORDER BY FIN_CYCLE,PERIOD_CODE',
100,'FIN_CYCLE!TEXT!FIN_CYCLE~PERIOD_CODE!TEXT!PERIOD_CODE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PREMIUM_CCY',
'OTDCNONL',
'SELECT CCY_CODE,CCY_NAME FROM(SELECT A.CCY_CODE,A.CCY_NAME FROM CYTMS_CCY_DEFN A WHERE A.AUTH_STAT=''A'' AND A.RECORD_STAT=''O'' AND A.CCY_CODE not in (''XAU'',''XAG'',''XPD'',''XPT'') AND EXISTS(SELECT 1 FROM CSVWS_PRODUCT_CURRENCIES B WHERE B.PRODUCT_CODE=? AND B.CCY_CODE=A.CCY_CODE)) WHERE 1=1 ORDER BY CCY_CODE',
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
('LOV_PREP_CCY',
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
('LOV_PRE_CMP_AUDF',
'GIDIFTDF',
'SELECT AUDF_NAME FROM GITB_AUDF WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY AUDF_NAME',
100,'AUDF_NAME!TEXT!AUDF_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRE_FIELD_AUDF',
'GIDIFTDF',
'SELECT AUDF_NAME FROM GITB_AUDF WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY AUDF_NAME',
100,'AUDF_NAME!TEXT!AUDF_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRE_MSG_AUDF',
'GIDIFTDF',
'SELECT AUDF_NAME FROM GITB_AUDF WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY AUDF_NAME',
100,'AUDF_NAME!TEXT!AUDF_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRE_REC_AUDF',
'GIDIFTDF',
'SELECT AUDF_NAME FROM GITB_AUDF WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY AUDF_NAME',
100,'AUDF_NAME!TEXT!AUDF_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRICECODE',
'SEDMKTCD',
'SELECT PRICE_CODE,PRICE_CODE_DESC FROM SETMS_PRICE_CODE where record_stat = ''O'' and once_auth=''Y'' ORDER BY PRICE_CODE',
100,'PRICE_CODE!TEXT!PRICE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRICE_CODE',
'EDDCORAT',
'select Price_Code,Price_code_description  from edtm_price_code where record_stat = ''O'' and nvl(once_auth,''N'')= ''Y'' and auth_stat = ''A''',
'','PRICE_CODE!TEXT!PRICE_CODE~PRICE_CODE_DESCRIPTION!TEXT!PRICE_CODE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRICE_CODE',
'LMDCOL01',
'SELECT PRICE_CODE, MARKET_PRICE FROM LMTMS_SECURITY_PRICE WHERE SECURITY_ID = ? AND AUTH_STAT = ''A'' ORDER BY 1',
100,'PRICE_CODE!TEXT!PRICE_CODE~MARKET_PRICE!TEXT!MARKET_PRICE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRICE_CODE',
'LMDCOLLT',
'SELECT PRICE_CODE, MARKET_PRICE FROM LMTMS_SECURITY_PRICE WHERE SECURITY_ID = ? AND AUTH_STAT = ''A'' ORDER BY 1',
100,'PRICE_CODE!TEXT!PRICE_CODE~MARKET_PRICE!TEXT!MARKET_PRICE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRICE_CODE',
'LMDSECTY',
'SELECT VALUE FROM(SELECT VALUE FROM LMTMS_TYPE_VALUES WHERE TYPE = ''PRICE_CODE'' MINUS SELECT PRICE_CODE FROM LMTMS_SECURITY_PRICE WHERE SECURITY_ID = ?) WHERE 1=1 ORDER BY 1',
50,'VALUE!TEXT!VALUE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRICE_CODE',
'SEDMKRAT',
'select price_code, price_code_desc from setms_price_code where once_auth = ''Y'' and record_stat = ''O'' and price_code not in (select price_code from setms_price_detail where br_code = ? and security_code = ? ) order by price_code',
100,'PRICE_CODE!TEXT!PRICE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRICE_CODE',
'SEDSEONL',
'SELECT PRICE_CODE,PRICE_CODE_DESC FROM SETMS_PRICE_CODE WHERE RECORD_STAT=''O'' AND AUTH_STAT=''A'' ORDER BY PRICE_CODE',
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
('LOV_PRICE_CODE',
'SEDSEPCL',
'SELECT PRICE_CODE,PRICE_CODE_DESC FROM SETMS_PRICE_CODE WHERE RECORD_STAT=''O'' AND ONCE_AUTH = ''Y'' ORDER BY PRICE_CODE',
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
('LOV_PRICE_CODE',
'SEDSEPRD',
'SELECT PRICE_CODE,PRICE_CODE_DESC FROM SETMS_PRICE_CODE WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY PRICE_CODE',
'','PRICE_CODE!TEXT!~PRICE_CODE_DESC!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRICE_COMPONENT',
'CODBENFT',
'SELECT class_code, module, class_description, class_type' || chr(10) || '  FROM covw_rp_price_comp' || chr(10) || ' WHERE class_code IN' || chr(10) || '       (SELECT component' || chr(10) || '          FROM cftm_product_charge' || chr(10) || '         WHERE product = ?' || chr(10) || '           AND charge_type = ?' || chr(10) || '        UNION' || chr(10) || '        select component' || chr(10) || '          FROM cftm_product_iccf' || chr(10) || '         where product = ?' || chr(10) || '           and ? in (''I'', ''C'', ''M'')' || chr(10) || '        UNION' || chr(10) || '        SELECT charge_comp' || chr(10) || '          FROM cotm_rp_charge' || chr(10) || '         WHERE module IN (''RT'', ''PC'', ''CG'', ''UP'', ''DD'')' || chr(10) || ' AND ? IN (''C'')' || chr(10) || '        UNION' || chr(10) || '        SELECT a.product_code' || chr(10) || '          FROM cstm_product a' || chr(10) || '         WHERE a.product_code = ?' || chr(10) || '           AND a.module = ?' || chr(10) || '           AND ? in (''C'')' || chr(10) || '           AND a.record_stat = ''O''' || chr(10) || '           AND a.once_auth = ''Y''' || chr(10) || '        UNION' || chr(10) || '        SELECT distinct(a.rule_id || ''/'' || c.ude_id || ''/'' || b.frm_no) as class_code' || chr(10) || '          FROM ictm_rule a, ictm_rule_frm b, ictm_rule_ude c, ictm_pr_int d' || chr(10) || '         WHERE a.rule_id = b.rule_id' || chr(10) || '           and a.rule_id = d.rule' || chr(10) || ' and a.rule_id in' || chr(10) || '               (select rule from ictm_pr_int where product_code = ?)' || chr(10) || '           and b.frm_no in (select frm_no from ictms_rule_frm_elements cc where cc.rule_id = c.rule_id' || chr(10) || '           and  cc.element_id = c.ude_id)' || chr(10) || '           AND a.rule_id = c.rule_id' || chr(10) || '           and ? in (''IC'', ''IP'')' || chr(10) || '           and ? in (''I''))' || chr(10) || '   and module = ?' || chr(10) || '   and class_type = ?' || chr(10) || 'UNION' || chr(10) || 'SELECT ''EXCHANGE_RATE'' as class_code,' || chr(10) || '       ''AL'' as module,' || chr(10) || '       ''Exchange Rate'' as class_description,' || chr(10) || '       ''E'' as class_type' || chr(10) || '  FROM DUAL',
50,'CLASS_CODE!TEXT!CLASS_CODE~MODULE!TEXT!MODULE~CLASS_DESCRIPTION!TEXT!CLASS_DESCRIPTION~CLASS_TYPE!TEXT!CLASS_TYPE',
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
('LOV_PRICING_CURRENCY',
'ENDUINST',
'SELECT PRICING_CCY,CCY_NAME,ASSET_CCY,MARGIN_CCY,CCY_DECIMALS FROM (SELECT CCY_CODE PRICING_CCY, CCY_NAME, CCY_CODE ASSET_CCY, CCY_CODE MARGIN_CCY, CCY_DECIMALS FROM CYTMS_CCY_DEFN WHERE RECORD_STAT = ''O'' AND NVL(ONCE_AUTH, ''N'') = ''Y'' AND CCY_CODE IN (SELECT CCY_CODE FROM CSVWS_PRODUCT_CURRENCIES WHERE  PRODUCT_CODE = ?)) WHERE 1=1 ORDER BY 1',
'','PRICING_CCY!TEXT!PRICING_CCY~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRIMARY_ELEMENT',
'IPDRLMNT',
'select sde_id , sde_desc from ictms_sde where record_stat=''O'' and once_auth=''Y'' and sde_basis = ''B'' and sde_type = ''V'' order by sde_id',
100,'SDE_ID!TEXT!SDE_ID~SDE_DESC!TEXT!SDE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRINCLQBRN',
'ICCPLCON',
'select branch_code, branch_name from sttms_branch where record_stat = ''O'' and once_auth = ''Y'' order by branch_code',
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
('LOV_PRINCLQBRN',
'ISCPLCON',
'select branch_code, branch_name from sttms_branch where record_stat = ''O'' and auth_stat = ''A'' order by branch_code',
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
('LOV_PRINLQACC',
'ICCPLCON',
'select cust_ac_no , CCY , AC_DESC ac_desc   FROM sttms_cust_account where (branch_code = ? and account_type <> ''Y'' and cust_ac_no <> ? and ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O'') ORDER BY BRANCH_CODE, CUST_AC_NO',
100,'CUST_AC_NO!TEXT!CUST_AC_NO~CCY!TEXT!CCY~AC_DESC!TEXT!AC_DESC',
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
('LOV_PRINLQACC',
'ISCPLCON',
'select cust_ac_no , CCY , AC_DESC ac_desc   FROM sttms_cust_account where (branch_code = ? and account_type <> ''Y'' and cust_ac_no <> ? and       AUTH_STAT = ''A'' AND RECORD_STAT = ''O'') ORDER BY BRANCH_CODE, CUST_AC_NO',
100,'CUST_AC_NO!TEXT!CUST_AC_NO~CCY!TEXT!CCY~AC_DESC!TEXT!AC_DESC',
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
('LOV_PRINTER',
'BAREODFN',
'SELECT printer_name, printer_id FROM  (select distinct printer_name, p.printer_id from rptms_printer p, smvws_role_users u, rptms_printer_role r where u.user_id = global.user_id and u.home_branch = global.current_branch and u.role_id = r.role_id  and r.branch_id = global.current_branch and p.printer_id = r.printer_id  union  select distinct printer_name, p.printer_id  from rptms_printer p,rptms_printer_user n where  n.user_id = global.current_branch and p.printer_id = n.printer_id) WHERE 1 = 1',
100,'PRINTER_NAME!TEXT!PRINTER_NAME~PRINTER_ID!TEXT!PRINTER_ID',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRINTER',
'RPRCNDLG',
'SELECT printer_name,        printer_id FROM  (select distinct printer_name,                         p.printer_id                          from rptms_printer p, smvws_role_users u, rptms_printer_role r where   u.user_id = global.user_id and u.home_branch = global.current_branch and u.role_id = r.role_id  and r.branch_id = global.current_branch and p.printer_id = r.printer_id  union   select distinct printer_name, p.printer_id  from rptms_printer p,rptms_printer_user n    where  n.user_id = global.user_id and p.printer_id = n.printer_id) WHERE 1 = 1',
200,'PRINTER_NAME!TEXT!PRINTER_NAME~PRINTER_ID!TEXT!PRINTER_ID',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROCESS',
'FXRPPREX',
'select distinct process_id from cstbs_process_exception order by process_id',
100,'PROCESS_ID!TEXT!PROCESS_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROCESS',
'SMDFNDSC',
'SELECT PROCESS_CODE,PROCESS_DESC FROM SMTM_PROCESS_CODES  WHERE ONCE_AUTH =''Y'' AND RECORD_STAT=''O'' ORDER BY PROCESS_CODE',
100,'PROCESS_CODE!TEXT!PROCESS_CODE~PROCESS_DESC!TEXT!PROCESS_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROCESS',
'SMDROLDF',
'SELECT FUNCTION_ID, BALOON_HELP, PROCESS_CODE FROM(SELECT A.FUNCTION_ID FUNCTION_ID, B.BALOON_HELP BALOON_HELP, D.PROCESS_CODE PROCESS_CODE FROM SMTBS_MENU A, SMTBS_FUNCTION_DESCRIPTION B,SMTBS_MODULES C,SMTB_STAGE_MENU_DETAILS D WHERE TYPE_STRING IN (''P'') AND A.FUNCTION_ID NOT IN (SELECT ROLE_FUNCTION FROM SMTBS_ROLE_DETAIL WHERE ROLE_ID = ?) AND D.PROCESS_CODE NOT IN (SELECT ROLE_FUNCTION FROM SMTBS_ROLE_STAGE_DETAILS WHERE ROLE_ID = ?) AND A.FUNCTION_ID = B.FUNCTION_ID AND A.FUNCTION_ID = D.FUNCTION_ID AND B.LANG_CODE = GLOBAL.LANG AND A.MODULE = C.MODULE_ID AND TO_NUMBER(SMPKSS.FN_DECRYPT_PASSWORD (C.MODULE_NO_USERS ,''CITIL'' )) > 0) WHERE 1 = 1 ORDER BY FUNCTION_ID',
100,'FUNCTION_ID!TEXT!FUNCTION_ID~BALOON_HELP!TEXT!BALOON_HELP~PROCESS_CODE!TEXT!PROCESS_CODE',
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
('LOV_PROCESS',
'SMDROLED',
'SELECT FUNCTION_ID, BALOON_HELP, PROCESS_CODE FROM(SELECT A.FUNCTION_ID FUNCTION_ID, B.BALOON_HELP BALOON_HELP, D.PROCESS_CODE PROCESS_CODE FROM SMTBS_MENU A, SMTBS_FUNCTION_DESCRIPTION B,SMTBS_MODULES C,SMTB_STAGE_MENU_DETAILS D WHERE TYPE_STRING IN (''P'') AND A.FUNCTION_ID NOT IN (SELECT ROLE_FUNCTION FROM SMTBS_ROLE_DETAIL WHERE ROLE_ID = ?) AND D.PROCESS_CODE NOT IN (SELECT ROLE_FUNCTION FROM SMTBS_ROLE_STAGE_DETAILS WHERE ROLE_ID = ?) AND A.FUNCTION_ID = B.FUNCTION_ID AND A.FUNCTION_ID = D.FUNCTION_ID AND B.LANG_CODE = GLOBAL.LANG AND A.MODULE = C.MODULE_ID) WHERE 1 = 1 ORDER BY FUNCTION_ID',
100,'FUNCTION_ID!TEXT!FUNCTION_ID~BALOON_HELP!TEXT!BALOON_HELP~PROCESS_CODE!TEXT!PROCESS_CODE',
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
('LOV_PROCESS_BRANCH',
'SMDUSRDF',
'SELECT BRANCH_CODE,BRANCH_NAME  FROM STTM_BRANCH WHERE RECORD_STAT = ''O'' AND ONCE_AUTH=''Y'' ORDER BY 1',
1000,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROCESS_CODE',
'CSDDOCHK',
'SELECT PROCESS_CODE FROM SMTM_PROCESS_CODES where  rownum<=100 order by PROCESS_CODE',
100,'PROCESS_CODE!TEXT!PROCESS_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROCESS_FUNCTIONS',
'SMDUSRDF',
'SELECT FUNCTION_ID, BALOON_HELP, PROCESS_CODE FROM (SELECT A.FUNCTION_ID FUNCTION_ID, B.BALOON_HELP BALOON_HELP, D.PROCESS_CODE PROCESS_CODE FROM SMTBS_MENU A, SMTBS_FUNCTION_DESCRIPTION B, SMTBS_MODULES C, SMTB_STAGE_MENU_DETAILS D WHERE A.TYPE_STRING LIKE ''%P%''AND A.FUNCTION_ID = B.FUNCTION_ID AND A.FUNCTION_ID=D.FUNCTION_ID AND B.LANG_CODE = GLOBAL.lang AND A.AVAILABLE = 1 AND A.CUST_ACCESS = ? AND A.MODULE = C.MODULE_ID AND TO_NUMBER(SMPKSS.FN_DECRYPT_PASSWORD (C.MODULE_NO_USERS ,''CITIL'' )) > 0) WHERE 1 = 1  ORDER BY 1',
2000,'FUNCTION_ID!TEXT!FUNCTION_ID~BALOON_HELP!TEXT!BALOON_HELP~PROCESS_CODE!TEXT!PROCESS_CODE',
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
('LOV_PROCESS_REF_NO',
'GIRFILOG',
'SELECT DISTINCT PROCESS_REF_NO FROM GITM_UPLOAD_MASTER WHERE INTERFACE_CODE = ?',
100,'PROCESS_REF_NO!TEXT!PROCESS_REF_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROC_REF_NO',
'CIDDPMNT',
'SELECT PROCESS_REF_NO, DP_REF_NO, CUSTOMER, DP_AMOUNT FROM CLTB_ACCOUNT_DOWNPAYMENT  WHERE  auth_stat IN (''A'',''U'') AND BRANCH_CODE IN (SELECT BRANCH_CODE FROM SMVW_USER_BRANCHES WHERE USER_ID = global.user_id INTERSECT SELECT BRANCH_CODE  FROM SMTB_USER_ROLE WHERE USER_ID = global.user_id ) ORDER BY 1',
40,'PROCESS_REF_NO!TEXT!PROCESS_REF_NO~DP_REF_NO!TEXT!DP_REF_NO~CUSTOMER!TEXT!CUSTOMER~DP_AMOUNT!TEXT!DP_AMOUNT',
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
('LOV_PROD',
'BCROBTBP',
'select product_code,product_description from cstms_product where module =''BC'' and auth_stat =''A'' and record_stat =''O'' order by product_code',
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
('LOV_PROD',
'BCROBUNP',
'select product_code,product_description from cstms_product where module =''BC'' and auth_stat =''A'' and record_stat =''O'' order by product_code',
500,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD',
'BCRODPAY',
'select product_code,product_description from cstms_product where module =''BC'' and auth_stat =''A'' and record_stat =''O'' order by product_code',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD',
'CLDGLQRY',
'select product_code, product_desc,product_category from CLTMS_PRODUCT where auth_stat = ''A'' AND record_stat = ''O'' order by product_code',
50,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESC!TEXT!PRODUCT_DESC~PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY',
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
('LOV_PROD',
'CLDUDCMT',
'SELECT DISTINCT PRODUCT_CODE, PRODUCT_DESC FROM CLTM_PRODUCT WHERE AUTH_STAT = ''A'' AND RECORD_STAT = ''O'' and module_code <> ''CI''' || chr(10) || '',
20,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD',
'CSDAMLCG',
'select product_cat,description from (Select  A.product_cat product_cat , A.description description from cstms_aml_product_cat_master A where A.once_auth = ''Y'' and A.record_stat = ''O'' minus select B.product_cat , C.description from cstms_aml_customer_grp_dtls  b , cstms_aml_product_cat_master  C  where b.customer_grp = ? and b.product_cat = c.product_cat) where 1=1',
500,'PRODUCT_CAT!TEXT!PRODUCT_CAT~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD',
'DDDPRMNT',
'select * from (SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION,MODULE        FROM CSTMS_PRODUCT WHERE MODULE IN (''RT'',''CG'',''FT'')        AND RECORD_STAT=''O'' AND ONCE_AUTH=''Y'' UNION SELECT ''CLG'',''CLEARING PRODUCT'',''CG''        FROM DUAL) where 1=1 order by PRODUCT_CODE',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION~MODULE!TEXT!MODULE',
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
('LOV_PROD',
'FTDVDSPR',
'select product_code,product_description from cstms_product where product_code in (select product_code from fttms_product_definition union select prod_code from bctms_product_master where product_type=''I'' ) and record_stat = ''O'' and ONCE_AUTH = ''Y'' order by product_code',
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
('LOV_PROD',
'GLRPCCY',
'select a.period_code from sttms_period_codes a, sttms_fin_cycle b where a.fin_cycle = b.fin_cycle and b.auth_stat = ''A'' and b.record_stat = ''O'' and a.fin_cycle = ? and a.period_code <> ''FIN'' and pc_end_date < (select pc_end_date from sttms_period_codes where period_code = (select current_period from sttms_branch where branch_code = global.current_branch) and fin_cycle = (select current_cycle from sttms_branch where branch_code = global.current_branch))',
200,'PERIOD_CODE!TEXT!PERIOD_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD',
'GLRPGLCY',
'select a.period_code from sttms_period_codes a, sttms_fin_cycle b where a.fin_cycle = b.fin_cycle and b.auth_stat = ''A'' and b.record_stat = ''O'' and a.fin_cycle = ? and a.period_code <> ''FIN'' and pc_end_date < (select pc_end_date from sttms_period_codes where period_code = (select current_period from sttms_branch where branch_code = global.current_branch) and fin_cycle = (select current_cycle from sttms_branch where branch_code = global.current_branch))',
200,'PERIOD_CODE!TEXT!PERIOD_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD',
'GLRPUNC',
'select a.period_code from sttms_period_codes a, sttms_fin_cycle b where a.fin_cycle = b.fin_cycle and b.auth_stat = ''A'' and b.record_stat = ''O'' and a.fin_cycle = ? and a.period_code <> ''FIN'' and pc_end_date < (select pc_end_date from sttms_period_codes where period_code = (select current_period from sttms_branch where branch_code = global.current_branch) and fin_cycle = (select current_cycle from sttms_branch where branch_code = global.current_branch))',
200,'PERIOD_CODE!TEXT!PERIOD_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD',
'ICCCSPCN',
'select product_code,product_description,(select decode(c.chg_ccy,''ACY'',?,GLOBAL.LCY) 	from   ictms_pr_chg_consol c	where  c.prod=g.product_code) from (( SELECT DISTINCT a.product_code product_code,    b.product_description product_description  FROM   ictms_pr_chg_consol_aclass a,  cstms_product       b,  ictms_product_definition   c  WHERE  a.product_code = b.product_code AND  a.aclass = ? AND a.ccy = ? AND  b.auth_stat = ''A'' AND b.record_stat = ''O'' AND  a.product_code = c.product_code AND c.product_type = ''S'' AND NOT EXISTS   (SELECT 1   FROM   ictms_acc_pr p   WHERE  p.brn = ? AND p.acc = ? AND   p.prod = a.product_code)  ORDER  BY a.product_code))g where 1=1',
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
('LOV_PROD',
'ICCHSPCN',
'SELECT g.product_code,    g.product_description,    (SELECT decode(chg_ccy,''ACY'',?,GLOBAL.LCY)   from ictms_pr_chg c   where  c.product_code=g.product_code) FROM ((SELECT DISTINCT a.product_code,         b.product_description   FROM ictms_pr_chg_aclass  a,      cstms_product    b,      ictms_product_definition c   WHERE  a.product_code = b.product_code AND a.aclass = ? AND      a.ccy = ? AND b.auth_stat = ''A'' AND b.record_stat = ''O'' AND      a.product_code = c.product_code AND c.product_type = ''C'' AND      NOT EXISTS    (SELECT 1       FROM ictms_acc_pr p       WHERE  p.brn = ? AND p.acc = ? AND p.prod = a.product_code)) g) WHERE  1 = 1',
10,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD',
'LCRPCAC',
'select product_code,product_description from cstms_product where module =''LC'' and auth_stat =''A'' and record_stat =''O'' order by product_code',
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
('LOV_PROD',
'LCRPEX',
'select product_code,product_description from cstms_product where module =''LC'' and auth_stat =''A'' and record_stat =''O'' order by product_code',
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
('LOV_PROD',
'LDDPRULE',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM(SELECT A.PRODUCT_CODE PRODUCT_CODE, A.PRODUCT_DESCRIPTION  PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT A, CSVWS_AVAILABLE_PRODBR B,LDTMS_PRODUCT_MASTER C WHERE A.MODULE=''LD'' AND A.ONCE_AUTH=''Y'' AND A.RECORD_STAT=''O'' AND A.PRODUCT_CODE = C.PRODUCT AND C.PRODUCT_TYPE=''L'' AND C.AUTO_PROV_REQUIRED=''Y'' AND A.PRODUCT_CODE = B.PRODUCT_CODE AND B.BRANCH_CODE = GLOBAL.CURRENT_BRANCH AND B.USER_ID=GLOBAL.USER_ID) WHERE 1=1',
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
('LOV_PROD',
'LDRPLICU',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE MODULE =''LD'' AND AUTH_STAT =''A'' AND RECORD_STAT =''O'' ORDER BY PRODUCT_CODE',
500,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD',
'LIRPCAC',
'select product_code,product_description from cstms_product where module =''IL'' and auth_stat =''A'' and record_stat =''O'' order by product_code',
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
('LOV_PROD',
'LIRPEX',
'select product_code,product_description from cstms_product where module =''IL'' and auth_stat =''A'' and record_stat =''O'' order by product_code',
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
('LOV_PROD',
'LMRPPREX',
'select distinct(a.product_code), a.product_code||'' - ''||a.product_description product  from cstms_product a,lmtb_line_utils b where a.product_code=b.product and track_prod_exp = ''Y'' order by product',
200,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT!TEXT!PRODUCT',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD',
'MCDPAMNT',
'SELECT product_code, product_description FROM cstms_product where module=''MC''Order By product_code',
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
('LOV_PROD',
'MCDVAMND',
'SELECT product_code, product_description FROM cstms_product where module=''MC''',
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
('LOV_PROD',
'MMDPAMNT',
'SELECT product_code, product_description FROM cstms_product where module=''MM''',
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
('LOV_PROD',
'MMDVAMND',
'SELECT product_code, product_description FROM cstms_product where module=''MM''',
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
('LOV_PROD',
'PCDPRCAT',
'Select a.product_code,a.product_description,b.clg_ccy from cstms_product a,pctms_product_preference b where a.product_type in (''IC'',''OC'') and record_stat = ''O'' and once_auth = ''Y'' and module = ''PC'' and b.product_code = a.product_code order by product_code',
'','PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION~CLG_CCY!TEXT!CLG_CCY',
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
('LOV_PROD',
'SRDPAMNT',
'SELECT product_code, product_description FROM cstms_product where module=''SR''',
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
('LOV_PROD',
'SRDVAMND',
'SELECT product_code, product_description FROM cstms_product where module=''MM''',
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
('LOV_PRODCODE',
'BCRUEXCP',
'select product_code,product_description from cstms_product where module =''BC'' and auth_stat =''A'' and record_stat =''O'' order by product_code',
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
('LOV_PRODCODE',
'LSDTRONL',
'select  a.BORROWER_TRANCHE_PRODUCT, b.Product_desc,b.PRODUCT_CATEGORY from  lstms_facility_tr_product a, cltms_product b , lstm_product c where  a.product_code = substr(?,4,4) AND A.BORROWER_TRANCHE_PRODUCT =b.product_code AND B.RECORD_STAT=''O'' AND B.AUTH_STAT=''A'' and b.product_type =''C'' AND b.module_code =''LS'' AND b.product_code = c.product_code AND c.participant_product  IS NOT NULL ORDER BY a.BORROWER_TRANCHE_PRODUCT',
10,'BORROWER_TRANCHE_PRODUCT!TEXT!BORROWER_TRANCHE_PRODUCT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODCODE',
'SEDSKONL',
'select a.product_code,b.product_description,b.product_type from csvws_available_prodbr a, cstms_product b where a.product_code = b.product_code and a.user_id = global.user_id and a.branch_code = global.current_branch and b.module = ''SD'' and b.product_type =''SK'' order by a.product_code',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION~PRODUCT_TYPE!TEXT!',
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
('LOV_PRODCODE1',
'LSDTRONL',
'SELECT * FROM (select a.PRODUCT_CODE prd, b.product_desc  ,b.product_category from  LSTBS_BORROWER_DRAWDOWN_PROD a,cltms_product b, lstm_product c  where a.PRODUCT_CODE = b.product_code  and   b.product_code = c.product_code and   b.product_type=''L'' and   b.module_code=''LS'' and   c.PARTICIPANT_PRODUCT is not NULL and   a.contract_ref_no = ? and   a.version_no = (select version_no from cltb_account_master where account_number= ?) UNION select a.DD_PRODUCT_CODE, b.product_desc  ,b.product_category from lstbs_contract_borr_ddprod a, cltms_product b, lstm_product c  where a.DD_PRODUCT_CODE = b.product_code  and   b.product_code = c.product_code and   b.product_type=''L'' and   b.module_code=''LS'' and c.PARTICIPANT_PRODUCT is not NULL and a.contract_ref_no = ? and (a.version_no,a.customer_no) in (select version_no,customer_id from cltb_account_master where account_number= ?)) Z where 1=1',
10,'PRD!TEXT!PRD',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'BCDPRMNT',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE' || chr(10) || '               MODULE=''BC'' ORDER BY PRODUCT_CODE',
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
('LOV_PRODUCT',
'BCROBUDS',
'select product_code,product_description from cstms_product where module =''BC'' and auth_stat =''A'' and record_stat =''O'' order by product_code',
200,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'BRDASSOC',
'select product_code, product_description from cstms_product where record_stat = ''O'' and once_auth = ''Y'' and nvl(no_of_legs,1) = 1 and (module in (''FX'',''MM'',''DV'',''ID'',''LD'',''OT'',''ET'',''SR'',''MC'',''BC'') or (module =''SD'' and product_type in (''BB'',''BS''))) order by product_code',
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
('LOV_PRODUCT',
'CNDCAASG',
'SELECT PRODUCT_CODE FROM CSTM_PRODUCT WHERE MODULE=''CN'' AND ONCE_AUTH=''Y''',
'','PRODUCT_CODE!TEXT!',
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
('LOV_PRODUCT',
'CNRINTDT',
'SELECT DISTINCT PRODUCT FROM Cntb_Collections_Master WHERE VERSION_NO =1 AND PRODUCT IS NOT NULL',
10,'PRODUCT!TEXT!PRODUCT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'CODBENFT',
'SELECT C.PRODUCT_CODE, C.PRODUCT_DESCRIPTION  FROM CSTMS_PRODUCT C WHERE C.PRODUCT_CODE IN (SELECT PRODUCT_CODE FROM CSVWS_AVAILABLE_PRODBR WHERE USER_ID = GLOBAL.USER_ID) AND ((C.MODULE = ? and C.module not in (''IC'', ''IP'')) or (? = ''IC'' and exists (select 1 from ictm_pr_int ic where ic.product_code = c.product_code and nvl(ic.mudarabah_product, ''N'') = ''N'')) or (? = ''IP'' and exists(select 1 from ictm_pr_int ip where ip.product_code = c.product_code and nvl(ip.mudarabah_product, ''N'') = ''Y''))) AND C.PRODUCT_START_DATE <= GLOBAL.APPLICATION_DATE AND ((C.PRODUCT_END_DATE IS NULL) OR (C.PRODUCT_END_DATE > GLOBAL.APPLICATION_DATE)) ORDER BY C.PRODUCT_CODE',
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
('LOV_PRODUCT',
'CSDACSUD',
'SELECT PRODUCT_CODE, PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE ONCE_AUTH  = ''Y'' AND RECORD_STAT = ''O''  ORDER BY PRODUCT_CODE',
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
('LOV_PRODUCT',
'CSDPXMNT',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM (SELECT PRODUCT_CODE, PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE (MODULE = ''FT'' AND MODULE NOT IN ''ALL'') AND ONCE_AUTH=''Y'' AND RECORD_STAT =''O'' UNION (SELECT ''ALL'' PRODUCT_CODE, ''ALL PRODUCTS'' PRODUCT_DESCRIPTION FROM DUAL)) WHERE 1 = 1 ORDER BY PRODUCT_CODE',
1500,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'CSDRPMNT',
'SELECT * FROM ( SELECT   PRODUCT_CODE,PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE MODULE = ?  AND RECORD_STAT=''O'' AND  ONCE_AUTH=''Y'' UNION   SELECT ''ALL'',''ALL PRODUCTS'' FROM DUAL) WHERE 1=1',
50,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'DVDCPMNT',
'select product_group,product_group_description from cstms_product_group where once_auth = ''Y'' and record_stat = ''O'' order by product_group',
100,'PRODUCT_GROUP!TEXT!PRODUCT_GROUP~PRODUCT_GROUP_DESCRIPTION!TEXT!PRODUCT_GROUP_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'DVRPRVAL',
'select distinct product_code from dvtbs_reval_master',
200,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'EDDLQONL',
'SELECT PRODUCT_CODE, PRODUCT_DESCRIPTION FROM (SELECT A.PRODUCT_CODE,A.PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT A,CSVWS_AVAILABLE_PRODBR B,EDTMS_DEAL_PRODUCT C WHERE A.PRODUCT_CODE = B.PRODUCT_CODE AND A.PRODUCT_CODE = C.DEAL_PRODUCT AND B.BRANCH_CODE = GLOBAL.CURRENT_BRANCH AND B.USER_ID = GLOBAL.USER_ID AND A.MODULE =''ET'' AND A.PRODUCT_TYPE =''LQ'') WHERE 1=1 ORDER BY PRODUCT_CODE',
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
('LOV_PRODUCT',
'EDDPFMNT',
'select product_code,product_description,product_type from (select a.product_code product_code, a.product_description product_description, decode(a.product_type, ''O'', ''Own'', ''C'', ''Customer'') product_type from cstm_product a, csvw_available_prodbr b where a.record_stat = ''O'' and a.once_auth = ''Y'' and a.module = ''EP'' and a.product_code = b.product_code and b.branch_code = global.current_branch and user_id = global.user_id) where 1=1 order by product_code',
'','PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'FADQDRIL',
'SELECT PRODUCT_CODE, PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE MODULE=''FA'' AND ONCE_AUTH=''Y'' AND RECORD_STAT=''O''',
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
('LOV_PRODUCT',
'FTDCONON',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE PRODUCT_CODE IN (SELECT PRODUCT_CODE FROM CSVWS_AVAILABLE_PRODBR WHERE USER_ID = GLOBAL.USER_ID AND BRANCH_CODE = GLOBAL.current_branch) AND MODULE = ''FT'' AND PRODUCT_START_DATE <= GLOBAL.APPLICATION_DATE AND ((PRODUCT_END_DATE IS NULL) OR (PRODUCT_END_DATE > GLOBAL.APPLICATION_DATE)) ORDER BY PRODUCT_CODE',
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
('LOV_PRODUCT',
'FTDPRMNT',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE MODULE=''FT'' ORDER BY PRODUCT_CODE',
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
('LOV_PRODUCT',
'FTDRCST',
'SELECT DISTINCT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE MODULE=''RT''',
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
('LOV_PRODUCT',
'GEDQYFAC',
'SELECT ''ZSKR'' PRODUCT_CODE,''LIMITS PRODUCT FOR SECURITIES'' PRODUCT_DESCRIPTION FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM GETMS_FACILITY_PROD_REST WHERE FACILITY_ID = ? AND PRODUCT_CODE = ''ZSKR'') UNION SELECT TYPE_NAME,TYPE_VALUE FROM sttm_static_type A WHERE TYPE = ''PRODUCT'' AND RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y''AND NOT EXISTS(SELECT 1 FROM GETMS_FACILITY_PROD_REST B WHERE FACILITY_ID = ? AND A.TYPE = B.PRODUCT_CODE)',
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
('LOV_PRODUCT',
'IADMLONL',
'select product_code,product_description from cstms_product a where auth_Stat=''A'' and record_stat=''O'' and module=''IA''and exists(select 1 from amtms_multifund_master where prod_code = a.product_code and upper(prod_type)=''I'')',
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
('LOV_PRODUCT',
'ICCPLCON',
'SELECT PRODUCT,       (SELECT decode(prod_ccy, ''A'', ?, GLOBAL.LCY) from dual),       PRODUCT_DESCRIPTION,IL_PRODUCT,     (Select decode(IL_TYPE,''0'',''Pool Leader/Stand alone'',''Pool Reallocation'') from dual) FROM (SELECT P.PRODUCT_CODE PRODUCT, P.PROD_CCY, C.PRODUCT_DESCRIPTION,I.IL_PRODUCT,I.IL_TYPE         FROM ICTMS_PR_INT_ACLASS      P,               ICTMS_PRODUCT_DEFINITION D,               CSTM_PRODUCT             C,               ICTMS_PR_INT        I         WHERE P.ACLASS = ? AND P.CCY = ? AND P.RECORD_STAT = ''N'' AND               P.PRODUCT_CODE NOT IN               (SELECT P1.PROD                  FROM ICTMS_ACC_PR P1                 WHERE P1.BRN = ? AND P1.ACC = ?) AND               P.PRODUCT_CODE = D.PRODUCT_CODE AND D.PRODUCT_TYPE = ''I'' AND               C.PRODUCT_CODE = P.PRODUCT_CODE AND C.RECORD_STAT = ''O''  AND  P.PRODUCT_CODE= I.PRODUCT_CODE AND               P.PRODUCT_CODE IN (SELECT PRODUCT_CODE                                    FROM CSVW_PRODUCT_BRANCHES WHERE BRANCH_CODE = ?) AND               C.AUTH_STAT = ''A''         ORDER BY P.PRODUCT_CODE) WHERE 1 = 1 AND rownum <= 10',
100,'PRODUCT!TEXT!PRODUCT~(SELECTDECODE(PROD_CCY,A,ABC,GLOBAL.LCY)FROMDUAL)!TEXT!(SELECTDECODE(PROD_CCY,A,ABC,GLOBAL.LCY)FROMDUAL)~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION~IL_PRODUCT!TEXT!IL_PRODUCT~IL_TYPE!TEXT!IL_TYPE',
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
('LOV_PRODUCT',
'ICDRATEQ',
'select distinct prod from icvw_effdt order by prod',
100,'PROD!TEXT!PROD',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'IDDACSAL',
'select a.product_code, a.product_description , a.product_type,               b.type_description,a.rate_code_preferred, a.rate_type_preferred               from cstms_product a , dvtm_type_master b where a.module = ''ID''               and a.auth_stat = ''A'' and a.record_stat = ''O'' and a.Product_Type               = b.derivative_type AND exists ( select 1 from               csvws_available_prodbr c where c.user_id = global.user_id and               c.branch_code = global.current_branch and c.product_code =               a.product_code ) order by a.product_code',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION~PRODUCT_TYPE!TEXT!PRODUCT_TYPE~TYPE_DESCRIPTION!TEXT!TYPE_DESCRIPTION',
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
('LOV_PRODUCT',
'IDDMACOD',
'select product_group,product_group_description from cstms_product_group where once_auth = ''Y'' and record_stat = ''O'' order by product_group',
100,'PRODUCT_GROUP!TEXT!PRODUCT_GROUP~PRODUCT_GROUP_DESCRIPTION!TEXT!PRODUCT_GROUP_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'IDRPRVAL',
'select distinct product_code from dvtbs_reval_master WHERE product_code IN (SELECT product_code FROM cstm_product WHERE MODULE = ''ID'' AND record_stat = ''O'' AND once_auth = ''Y'')',
200,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'IPDRATEQ',
'select distinct a.prod from icvw_effdt a,cstm_product b where a.prod=b.product_code and b.module=''IC'' order by prod',
100,'PROD!TEXT!PROD',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'ISCPLCON',
'SELECT PRODUCT, (SELECT decode (prod_ccy,''A'',?,GLOBAL.LCY) from dual ), PRODUCT_DESCRIPTION FROM   (SELECT P.PRODUCT_CODE PRODUCT,  P.PROD_CCY,  C.PRODUCT_DESCRIPTION  FROM   ICTMS_PR_INT_ACLASS P,  ICTMS_PRODUCT_DEFINITION D,  CSTM_PRODUCT C  WHERE  P.ACLASS = ? AND P.CCY = ? AND P.RECORD_STAT = ''N'' AND  P.PRODUCT_CODE NOT IN  (SELECT P1.PROD   FROM   ICTMS_ACC_PR P1   WHERE  P1.BRN = ? AND P1.ACC = ?) AND  P.PRODUCT_CODE = D.PRODUCT_CODE AND D.PRODUCT_TYPE = ''I'' AND  C.PRODUCT_CODE = P.PRODUCT_CODE AND C.RECORD_STAT = ''O'' AND  P.PRODUCT_CODE IN  (SELECT PRODUCT_CODE   FROM   CSVW_PRODUCT_BRANCHES   WHERE  BRANCH_CODE = ?) AND C.AUTH_STAT = ''A''  ORDER  BY P.PRODUCT_CODE) WHERE  1 = 1 AND rownum <= 10',
100,'PRODUCT!TEXT!PRODUCT~(SELECTDECODE(PROD_CCY,A,ABC,GLOBAL.LCY)FROMDUAL)!TEXT!(SELECTDECODE(PROD_CCY,A,ABC,GLOBAL.LCY)FROMDUAL)',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'ISDINSTR',
'SELECT PRODUCT_CODE, PRODUCT_DESCRIPTION FROM (SELECT ''ALL'' PRODUCT_CODE, ''All Products'' PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT UNION SELECT PRODUCT_CODE, PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE MODULE = DECODE(?, ''FS'', ''FX'', ?) AND ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O'' UNION SELECT PROD_CATEGORY PRODUCT_CODE,CATEGORY_DESC PRODUCT_DESCRIPTION FROM PCTM_PRODUCT_CATEGORY WHERE PRODUCT_TYPE IN (''I'',''O'') AND ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O'') WHERE 1=1 ORDER BY 1',
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
('LOV_PRODUCT',
'ISDSRCMD',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM(SELECT PRODUCT_CODE PRODUCT_CODE,PRODUCT_DESCRIPTION PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE MODULE = ? AND RECORD_STAT = ''O'' AND ONCE_AUTH=''Y'' UNION SELECT ''****'' PRODUCT_CODE, ''ALL'' PRODUCT_DESCRIPTION FROM DUAL UNION SELECT INSTR_TYPE PRODUCT_CODE,INSTR_DESC PRODUCT_DESCRIPTION FROM ISTMS_INSTR_MASTER WHERE INSTR(''DD'',?)>0 AND RECORD_STAT = ''O'' AND ONCE_AUTH=''Y'') WHERE 1=1 ORDER BY 1',
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
('LOV_PRODUCT',
'LCDPMNT',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM(SELECT A.PRODUCT_CODE,B.PRODUCT_DESCRIPTION FROM CSVWS_PRODUCT_BRANCHES A,CSTMS_PRODUCT B WHERE A.BRANCH_CODE=GLOBAL.CURRENT_BRANCH AND A.PRODUCT_CODE=B.PRODUCT_CODE AND B.MODULE=''LC'')WHERE 1=1 ORDER BY PRODUCT_CODE',
10,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'LDDREVAC',
'select PRODUCT_CODE  ,PRODUCT_DESCRIPTION from (select PRODUCT_CODE  ,PRODUCT_DESCRIPTION from cstms_product where (MODULE =''LD''  or MODULE =''MM'') AND ONCE_AUTH = ''Y''  AND RECORD_STAT =''O'' UNION SELECT ''ALL'' , ''ALL PRODUCTS'' FROM cstms_product)where 1=1',
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
('LOV_PRODUCT',
'LDRPMATR',
'SELECT PRODUCT_CODE , PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' AND MODULE = ''LD'' ORDER BY PRODUCT_CODE',
500,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'LDRPOSCH',
'SELECT PRODUCT_CODE, PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' AND MODULE = ''LD'' ORDER BY PRODUCT_CODE',
500,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'LDRPREVN',
'select product_code, product_description from cstms_product where record_stat = ''O'' and auth_stat = ''A'' and module=''LD'' order by product_code',
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
('LOV_PRODUCT',
'LDRPSTAT',
'select product_code, product_description from cstms_product where record_stat = ''O'' and auth_stat = ''A'' and module = ''LD''order by product_code',
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
('LOV_PRODUCT',
'LECACCLS',
'SELECT PRODUCT_CODE, PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE MODULE = ''FA'' AND ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O''AND PRODUCT_CODE IN (    SELECT PRODUCT_CODE     FROM CSVWS_AVAILABLE_PRODBR     WHERE USER_ID = GLOBAL.USER_ID     AND BRANCH_CODE = GLOBAL.CURRENT_BRANCH) AND PRODUCT_START_DATE <= GLOBAL.APPLICATION_DATE AND ((PRODUCT_END_DATE IS NULL) OR (PRODUCT_END_DATE > GLOBAL.APPLICATION_DATE)) ORDER BY PRODUCT_CODE',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODDESC!TEXT!PRODDESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'LIRPGUCL',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM(SELECT A.PRODUCT_CODE,B.PRODUCT_DESCRIPTION FROM CSVWS_PRODUCT_BRANCHES A,CSTMS_PRODUCT B WHERE A.BRANCH_CODE=GLOBAL.CURRENT_BRANCH AND A.PRODUCT_CODE=B.PRODUCT_CODE AND B.MODULE=''LI'')WHERE 1=1 ORDER BY PRODUCT_CODE',
1000,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'LIRPOGRP',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM(SELECT A.PRODUCT_CODE,B.PRODUCT_DESCRIPTION FROM CSVWS_PRODUCT_BRANCHES A,CSTMS_PRODUCT B WHERE A.BRANCH_CODE=GLOBAL.CURRENT_BRANCH AND A.PRODUCT_CODE=B.PRODUCT_CODE AND B.MODULE=''LI'')WHERE 1=1 ORDER BY PRODUCT_CODE',
1000,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'LSCONDP',
'select a.borrower_drawdown_product  ,b.product_desc  from lstms_facility_dd_product a, cltm_product b where a.borrower_tranche_product = ? and a.product_code = substr(? ,4,4) and b.record_stat=''O'' and b.auth_stat=''A'' and a.borrower_drawdown_product =b.product_code   and exists(select 1 from cltm_product_components where component_name=''MAIN_INT'' and product_code=b.product_code and formula_type NOT in (3,4))',
100,'BORROWER_DRAWDOWN_PRODUCT!TEXT!BORROWER_DRAWDOWN_PRODUCT~PRODUCT_DESC!TEXT!PRODUCT_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'MCRPMATR',
'SELECT PRODUCT_CODE , PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' AND MODULE = ''MC'' ORDER BY PRODUCT_CODE',
500,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'MCRPOSCH',
'SELECT PRODUCT_CODE, PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' AND MODULE = ''MC'' ORDER BY PRODUCT_CODE',
500,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'MCRPREVN',
'select product_code, product_description from cstms_product where record_stat = ''O'' and auth_stat = ''A'' and module=''MC'' order by product_code',
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
('LOV_PRODUCT',
'MGDSCHEM',
'select product_code, product_description,product_type, decode(product_type,''BR'',''Broker'',''PF'',''Portfolio'','''') from cstm_product a where module = ''MG'' and nvl(ONCE_AUTH,''N'')=''Y'' and record_stat = ''O'' and exists(select 1 from csvws_available_prodbr where product_code = a.product_code and user_id = GLOBAL.user_id and branch_code = GLOBAL.current_branch) Order by product_code',
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
('LOV_PRODUCT',
'MMRPMATR',
'SELECT PRODUCT_CODE , PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' AND MODULE = ''MM'' ORDER BY PRODUCT_CODE',
500,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'MMRPOSCH',
'SELECT PRODUCT_CODE, PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' AND MODULE = ''MM'' ORDER BY PRODUCT_CODE',
500,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'MMRPREVN',
'select product_code, product_description from cstms_product where record_stat = ''O'' and auth_stat = ''A'' and module=''LD'' order by product_code',
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
('LOV_PRODUCT',
'MMRPSTAT',
'select product_code, product_description from cstms_product where record_stat = ''O'' and auth_stat = ''A'' and module = ''MM''order by product_code',
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
('LOV_PRODUCT',
'MSDADVFT',
'SELECT ''ALL'',''ANY PRODUCT'' FROM DUAL UNION  SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE RECORD_STAT=''O'' AND ONCE_AUTH=''Y'' AND AUTH_STAT=''A''',
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
('LOV_PRODUCT',
'MSDHOLD',
'select product_code, product_description from (select distinct product_code,product_description from cstms_product where auth_stat = ''A'' and record_stat = ''O'' union select ''ALL'',''ANY PRODUCT'' from cstms_product) where 1 = 1 order by product_code',
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
('LOV_PRODUCT',
'MSDHR',
'select product_code, product_description from (select ''ALL'' product_code,''ANY PRODUCT'' product_description from cstms_product union select distinct product_code,product_description from cstms_product where ONCE_AUTH = ''Y'' and record_stat = ''O'' AND AUTH_STAT=''A'') where 1=1 order by product_code',
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
('LOV_PRODUCT',
'MSDMSFMT',
'SELECT product_code, product_description FROM (select ''ALL'' product_code,''ANY PRODUCT'' product_description from cstms_product union select product_code,product_description from cstms_product where record_stat=''O'' and once_auth = ''Y'') where 1 = 1 order by product_code',
1000,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'MSDPRMAP',
'select product_code, product_description' || chr(10) || '  from (select product_code, product_description' || chr(10) || '          from cstms_product' || chr(10) || '         where product_code in (select product_code' || chr(10) || '                                  from csvws_product_branches' || chr(10) || '                                 where branch_code = ?)' || chr(10) || '           and module in (''LC'',''LI'',''BC'')' || chr(10) || '           and once_auth = ''Y''' || chr(10) || '           and record_stat = ''O''' || chr(10) || '        union' || chr(10) || '        select product_code, product_description' || chr(10) || '          from cstms_product' || chr(10) || '   where product_code in (select product_code' || chr(10) || '                                  from csvws_product_branches' || chr(10) || '                                 where branch_code = ?)' || chr(10) || '           and module in (''FT'')' || chr(10) || '           and once_auth = ''Y''' || chr(10) || '           and record_stat = ''O''' || chr(10) || '           AND PRODUCT_CODE IN (SELECT PRODUCT_CODE' || chr(10) || '                                  FROM FTTMS_PRODUCT_DEFINITION' || chr(10) || '                                 WHERE PRODUCT_TYPE = ?)' || chr(10) || '        UNION' || chr(10) || '        select prod_category, category_desc from pctm_product_category)' || chr(10) || ' where 1 = 1' || chr(10) || ' order by product_code',
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
('LOV_PRODUCT',
'OTDCEXER',
'SELECT PRODUCT_CODE, PRODUCT_DESCRIPTION  FROM (SELECT A.PRODUCT_CODE, A.PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT A, CSVWS_AVAILABLE_PRODBR B WHERE A.PRODUCT_CODE = B.PRODUCT_CODE AND A.MODULE = ''FX'' AND A.RECORD_STAT = ''O'' AND A.AUTH_STAT = ''A'' AND B.BRANCH_CODE = GLOBAL.current_branch AND B.USER_ID = GLOBAL.user_id AND A.PRODUCT_CODE IN (SELECT PRODUCT_CODE FROM FXTMS_PRODUCT_DEFINITION WHERE PRODUCT_TYPE = ''S'')) WHERE 1 = 1 ORDER BY PRODUCT_CODE',
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
('LOV_PRODUCT',
'OVDAUDET',
'SELECT product_code,product_description FROM cstm_product where module = ?',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
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
('LOV_PRODUCT',
'PCCACENT',
'SELECT A.PRODUCT_CODE, B.PRODUCT_DESCRIPTION FROM PCTMS_PRODCAT_EXT_CLG A,cstms_product B WHERE A.PROD_CATEGORY=? AND A.PRODUCT_CODE=B.PRODUCT_CODE AND B.RECORD_STAT=''O'' and B.ONCE_AUTH=''Y''',
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
('LOV_PRODUCT',
'PCCEVNTS',
'SELECT A.PRODUCT_CODE, B.PRODUCT_DESCRIPTION FROM PCTMS_PRODCAT_EXT_CLG A,cstms_product B WHERE A.PROD_CATEGORY=? AND A.PRODUCT_CODE=B.PRODUCT_CODE AND B.RECORD_STAT=''O'' and B.ONCE_AUTH=''Y''',
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
('LOV_PRODUCT',
'PCDCRAGT',
'SELECT a.product_code,         b.product_description,         a.cust_no,         c.customer_name1,         a.cust_ac_brn,         a.cust_ac_no,         a.creditor_id,         d.ccy    FROM pctms_client_agreement a, cstms_product b, sttms_customer c, STTMS_CUST_ACCOUNT d   where a.record_stat = ''O'' and a.once_auth = ''Y'' and         a.dd_agreement_reqd = ''Y'' and b.product_code = a.product_code and         b.product_type = ''OC'' and c.customer_no = a.cust_no and a.cust_ac_no = d.cust_ac_no and a.cust_ac_brn = d.branch_code   ORDER BY a.product_code, a.cust_no, a.cust_ac_brn, a.cust_ac_no',
100,'PRODUCT_CODE!TEXT!a.PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!b.PRODUCT_DESCRIPTION~CUST_NO!TEXT!a.CUST_NO~CUSTOMER_NAME1!TEXT!c.CUSTOMER_NAME1~CUST_AC_BRN!TEXT!a.CUST_AC_BRN~CUST_AC_NO!TEXT!a.CUST_AC_NO~CREDITOR_ID!TEXT!a.CREDITOR_ID~CCY!TEXT!d.CCY',
'STRING~STRING~STRING~STRING~STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'PCDFTONL',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM(SELECT A.PRODUCT_CODE, B.PRODUCT_DESCRIPTION FROM PCTMS_PRODCAT_EXT_CLG A,cstms_product B WHERE A.PROD_CATEGORY= ? AND A.PRODUCT_CODE=B.PRODUCT_CODE AND B.RECORD_STAT=''O'' and B.ONCE_AUTH=''Y'' UNION SELECT A.PRODUCT_CODE,B.PRODUCT_DESCRIPTION FROM PCTMS_PRODCAT_INT_CLG A,cstms_product B WHERE A.PROD_CATEGORY= ? AND A.PRODUCT_CODE=B.PRODUCT_CODE AND B.RECORD_STAT=''O'' and B.ONCE_AUTH=''Y'' UNION SELECT A.PRODUCT_CODE,B.PRODUCT_DESCRIPTION FROM PCTMS_PRODCAT_BOOK_TRF A,cstms_product B WHERE A.PROD_CATEGORY= ? AND A.PRODUCT_CODE=B.PRODUCT_CODE AND B.RECORD_STAT=''O'' and B.ONCE_AUTH=''Y'')WHERE 1=1 ORDER BY PRODUCT_CODE',
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
('LOV_PRODUCT',
'PCDONONL',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM(SELECT A.PRODUCT_CODE, B.PRODUCT_DESCRIPTION FROM PCTMS_PRODCAT_EXT_CLG A,cstms_product B WHERE A.PROD_CATEGORY= ? AND A.PRODUCT_CODE=B.PRODUCT_CODE AND B.RECORD_STAT=''O'' and B.ONCE_AUTH=''Y'' UNION SELECT A.PRODUCT_CODE,B.PRODUCT_DESCRIPTION FROM PCTMS_PRODCAT_INT_CLG A,cstms_product B WHERE A.PROD_CATEGORY= ? AND A.PRODUCT_CODE=B.PRODUCT_CODE AND B.RECORD_STAT=''O'' and B.ONCE_AUTH=''Y'' UNION SELECT A.PRODUCT_CODE,B.PRODUCT_DESCRIPTION FROM PCTMS_PRODCAT_BOOK_TRF A,cstms_product B WHERE A.PROD_CATEGORY= ? AND A.PRODUCT_CODE=B.PRODUCT_CODE AND B.RECORD_STAT=''O'' and B.ONCE_AUTH=''Y'')WHERE 1=1 ORDER BY PRODUCT_CODE',
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
('LOV_PRODUCT',
'SEDBLONL',
'select product_code,product_description,product_type from(select a.product_code,b.product_description,b.product_type from csvws_available_prodbr a, cstms_product b where a.product_code = b.product_code and a.user_id = global.user_id and a.branch_code = global.current_branch and b.module = ''SD'' and b.product_type =''BL'')where 1=1 order by product_code',
20,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'SEDDLONL',
'select product_code , product_description , product_start_date , product_end_date ,  product_type,  rights_exercise from(select a.product_code , b.product_description , b.product_start_date , b.product_end_date ,  b.product_type, ''N''  rights_exercise from csvws_available_prodbr a  ,cstms_product b where b.product_type in (''LG'',''WI'')  and b.module = decode((SELECT FUND_BRANCH FROM sttms_branch WHERE branch_code = global.current_branch )   ,''Y'',''&&'',''SD'') and a.product_code = b.product_code and a.user_id   = global.User_id and a.branch_code = global.current_branch   union     select a.product_code , a.product_description , a.product_start_date ,    a.product_end_date , a.product_type, b.rights_exercise from cstms_product a     , setms_combination_product b , csvws_available_prodbr c     where a.product_type = ''CO''     and a.module=''SD''     and a.record_stat=''O''     and a.auth_stat=''A''     and a.product_code=b.combination_product     and     (       b.buy_product_type <> decode (          (SELECT FUND_BRANCH FROM sttms_branch WHERE branch_code = global.current_branch ),''Y'',''CB'',''&&'') or b.sell_product_type <> decode (( SELECT FUND_BRANCH FROM sttms_branch WHERE branch_code = global.current_branch ),''Y'',''CS'',''&&'')) and b.preferred_leg = c.product_code and c.user_id = global.User_id and     c.branch_code =global.current_branch) WHERE 1=1',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION~PRODUCT_START_DATE!TEXT!PRODUCT_START_DATE~PRODUCT_END_DATE!TEXT!PRODUCT_END_DATE~PRODUCT_TYPE!TEXT!PRODUCT_TYPE~RIGHTS_EXERCISE!TEXT!RIGHTS_EXERCISE',
'STRING~STRING~DATE~DATE~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'SEDPFONL',
'SELECT PRODUCT_CODE, PRODUCT_DESCRIPTION FROM (SELECT B.PRODUCT_CODE, B.PRODUCT_DESCRIPTION  FROM CSVWS_AVAILABLE_PRODBR A, CSTMS_PRODUCT B WHERE B.PRODUCT_TYPE <> DECODE((SELECT NVL(FUND_BRANCH, ''N'') FROM STTMS_BRANCH WHERE BRANCH_CODE IN GLOBAL.CURRENT_BRANCH),''Y'',''C'',''#'') AND A.USER_ID = GLOBAL.USER_ID AND A.BRANCH_CODE = GLOBAL.CURRENT_BRANCH AND       A.PRODUCT_CODE = B.PRODUCT_CODE AND B.MODULE = ''SP'' AND       ONCE_AUTH = ''Y'') WHERE 1=1 ORDER BY PRODUCT_CODE',
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
('LOV_PRODUCT',
'SEDREAS',
'select product_code, product_description from cstms_product where product_code in (select product_code from cstbs_contract where module_code = ''SD'' and auth_status = ''U'' and template_status = ''N'' and contract_status <> ''H'' and branch = global.current_branch) and record_stat =''O'' and auth_stat =''A'' and module = ''SD'' and product_type in (''CO'', ''WI'', ''LG'', ''SK'', ''BL'') order by product_code',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'SEDSEONL',
'SELECT A.PRODUCT_CODE,C.PRODUCT_DESCRIPTION,B.SECURITY_TYPE,B.INTEREST_RATE_TYPE FROM CSVWS_AVAILABLE_PRODBR A,SETMS_SECURITY_PRODUCT B,CSTMS_PRODUCT C WHERE A.BRANCH_CODE=GLOBAL.CURRENT_BRANCH AND A.USER_ID=GLOBAL.USER_ID AND EXISTS (SELECT PRODUCT_CODE FROM SMVWS_USER_PRODUCTS WHERE USER_ID=GLOBAL.USER_ID AND PRODUCT_CODE=A.PRODUCT_CODE) AND B.PRODUCT=A.PRODUCT_CODE AND C.PRODUCT_CODE=A.PRODUCT_CODE ORDER BY A.PRODUCT_CODE',
100,'PRODUCT_CODE!TEXT!A.PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION~SECURITY_TYPE!TEXT!SECURITY_TYPE~INTEREST_RATE_TYPE!TEXT!INTEREST_RATE_TYPE',
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
('LOV_PRODUCT',
'SFCPLCON',
'SELECT PRODUCT,       product_description,       (SELECT decode(prod_ccy, ''A'', ?, GLOBAL.LCY) from dual) as currency  FROM (SELECT P.PRODUCT_CODE PRODUCT, P.PROD_CCY, C.PRODUCT_DESCRIPTION          FROM ICTMS_PR_INT_ACLASS      P,               ICTMS_PRODUCT_DEFINITION D,               CSTM_PRODUCT             C         WHERE P.ACLASS = ? AND P.CCY = ? AND P.RECORD_STAT = ''N'' AND               P.PRODUCT_CODE = D.PRODUCT_CODE AND D.PRODUCT_TYPE = ''I'' AND               C.PRODUCT_CODE = P.PRODUCT_CODE AND C.RECORD_STAT = ''O'' AND               P.PRODUCT_CODE IN               (SELECT PRODUCT_CODE                  FROM CSVW_PRODUCT_BRANCHES                 WHERE BRANCH_CODE = GLOBAL.CURRENT_BRANCH ) AND C.AUTH_STAT = ''A''         ORDER BY P.PRODUCT_CODE) WHERE 1 = 1 AND rownum <= 10',
200,'PRODUCT!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION~CURRENCY!TEXT!CONTRACT_CURRENCY',
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
('LOV_PRODUCT',
'SFCPLCON2',
'',100,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION~CONTRACT_CURRENCY!TEXT!CONTRACT_CURRENCY',
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
('LOV_PRODUCT',
'SFDCONON',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION  FROM CSTM_PRODUCT WHERE MODULE = ''SF'' and auth_stat=''A'' and record_stat=''O''',
1000,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'SIDCONON',
'select a.product_code,b.product_description from csvws_available_prodbr a, cstms_product b where a.product_code = b.product_code and a.user_id = global.user_id and a.branch_code = ? and b.module = ''SI'' order by a.product_code',
100,'PRODUCT_CODE!TEXT!A.PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!B.PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT',
'STDACCLS',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION,MODULE FROM  CSTM_PRODUCT WHERE RECORD_STAT = ''O''AND ONCE_AUTH = ''Y''AND MODULE IN (''LD'',''RT'',''CL'')ORDER BY PRODUCT_CODE',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION~MODULE!TEXT!MODULE',
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
('LOV_PRODUCT',
'XPDCONON',
'select distinct product_code, product_description   from (select a.product_code, a.product_description          from cstms_product a , Csvws_Product_Branches b         where a.module = ''XP''         and a.Product_Code = b.Product_Code    and b.Branch_Code = Global.Current_Branch       and a.product_start_date <= global.application_date           and ((a.product_end_date is null) or               a.product_end_date > global.application_date)  and auth_stat = ''A'') where 1 = 1 order by product_code',
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
('LOV_PRODUCT1',
'FXDPRDCO',
'select product_code from (select a.product_code from cstms_product a , fxtms_product_definition b where module = ''FX'' AND (b.ndf_indicator  =''N'' OR b.ndf_indicator IS NULL)and record_stat = ''O'' and once_auth = ''Y'' and a.product_code = b.product_code  and no_of_legs = 1 ) where 1=1 order by product_code',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT1',
'GEDQYFAC',
'SELECT TYPE_NAME,TYPE_VALUE FROM sttm_static_type WHERE TYPE = ''PRODUCT'' AND RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y''',
200,'TYPE_NAME!TEXT!TYPE_NAME~TYPE_VALUE!TEXT!TYPE_VALUE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT2',
'FXDPRDCO',
'select product_code from (select a.product_code from cstms_product a , fxtms_product_definition b where module = ''FX'' AND(b.ndf_indicator  =''N'' OR b.ndf_indicator IS NULL)and record_stat = ''O'' and once_auth = ''Y'' and a.product_code = b.product_code  and no_of_legs = 1 ) where 1=1 order by product_code',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCTCODE',
'CLDCHKMT',
'select product_code  , product_desc from (select ''ALL'' product_code , ''All Products'' product_desc  from dual where ''AL''=? Union select product_code, product_desc from cltm_product where once_auth = ''Y'' and record_stat = ''O'' and module_code = ? ) where 1 = 1',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESC!TEXT!PRODUCT_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCTS',
'ACRDLTXN',
'select product_code, product_description from cstms_product order by 1',
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
('LOV_PRODUCTS',
'ACRJRNAL',
'select product_code, product_description from cstms_product order by 1',
2000,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCTS',
'LCDPRMNT',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM CSTM_PRODUCT WHERE MODULE=''LC'' ORDER BY  PRODUCT_CODE',
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
('LOV_PRODUCTS',
'LCDREAS',
'SELECT PRODUCT_CODE, PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE PRODUCT_CODE IN (SELECT PRODUCT_CODE FROM CSTBS_CONTRACT WHERE MODULE_CODE = ''LC'' AND AUTH_STATUS = ''U'' AND TEMPLATE_STATUS = ''N'' AND BRANCH = GLOBAL.CURRENT_BRANCH ) AND RECORD_STAT =''O'' AND AUTH_STAT =''A'' AND MODULE = ''LC'' ORDER BY PRODUCT_CODE',
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
('LOV_PRODUCTS',
'LDRPEVNT',
'select product_code,product_description from cstms_product where module =''LD''and auth_stat =''A'' and record_stat =''O'' order by product_code',
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
('LOV_PRODUCTS',
'LMDPRDM',
'select product_code, product_description from lmtvs_product where product_code not in (select product_code from lmtms_temple_products_rest where lm_temple =? ) order by 1',
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
('LOV_PRODUCTS',
'MCRPEVNT',
'select product_code,product_description from cstms_product where module =''MC''and auth_stat =''A'' and record_stat =''O'' order by product_code',
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
('LOV_PRODUCTS',
'MMRPEVNT',
'select product_code,product_description from cstms_product where module =''MM''and auth_stat =''A'' and record_stat =''O'' order by product_code',
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
('LOV_PRODUCTS',
'SMDUSRDF',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM CSTM_PRODUCT WHERE RECORD_STAT = ''O'' AND ONCE_AUTH=''Y'' ORDER BY 1',
1000,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCTS_ALLOWED',
'LNDCONON',
'SELECT PRODUCT_CODE, PRODUCT_DESCRIPTION FROM (SELECT A.PRODUCT_CODE PRODUCT_CODE, A.PRODUCT_DESCRIPTION PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT A, CSVWS_AVAILABLE_PRODBR B WHERE A.MODULE = ''LN''AND A.PRODUCT_CODE = B.PRODUCT_CODE AND B.BRANCH_CODE = GLOBAL.CURRENT_BRANCH AND B.USER_ID = GLOBAL.USER_ID  AND EXISTS (SELECT L.PRODUCT_CODE FROM LSTMS_FACILITY_PRODUCT L WHERE L.PRODUCT_CODE = A.PRODUCT_CODE AND L.PARTICIPANT_PRODUCT IS NOT NULL)) WHERE 1=1 ORDER BY 1',
50,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCTS_LD',
'LDDREAS',
'select product_code, product_description from cstms_product where product_code in (select product_code from cstbs_contract where auth_status = ''U'' and module = ''LD'' ) and record_stat =''O'' and auth_stat =''A'' order by product_code',
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
('LOV_PRODUCTS_LD',
'MCDREAS',
'select product_code, product_description from cstms_product where product_code in (select product_code from cstbs_contract where auth_status = ''U'' and module = ''MC'' and branch = global.current_branch ) and record_stat =''O'' and auth_stat =''A'' order by product_code',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCTS_LD',
'MMDREAS',
'select product_code, product_description from cstms_product where product_code in (select product_code from cstbs_contract where auth_status = ''U'' and module = ''MM'' and branch = global.current_branch ) and record_stat =''O'' and auth_stat =''A'' order by product_code',
1000,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_ALLOWED',
'LDDCONON',
'SELECT product_code, product_description FROM cstms_product where module=''LD'' and record_stat =''O'' and auth_stat=''A'' order by 1',
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
('LOV_PRODUCT_ALLOWED',
'MCDCONON',
'SELECT product_code,product_description FROM cstms_product where module=''MC'' and AUTH_STAT = ''A'' and record_stat = ''O''',
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
('LOV_PRODUCT_ALLOWED',
'SRDCONON',
'SELECT PRODUCT_CODE, PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE PRODUCT_CODE IN (SELECT PRODUCT_CODE FROM CSVWS_AVAILABLE_PRODBR WHERE USER_ID = GLOBAL.USER_ID AND BRANCH_CODE = GLOBAL.current_branch) AND MODULE = ''SR'' AND PRODUCT_START_DATE <= GLOBAL.APPLICATION_DATE AND ((PRODUCT_END_DATE IS NULL) OR (PRODUCT_END_DATE > GLOBAL.APPLICATION_DATE)) ORDER BY PRODUCT_CODE',
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
('LOV_PRODUCT_CATEGORY',
'CLDPRMNT',
'SELECT ALL CLTM_PRODUCT_CATEGORY.PRODUCT_CATEGORY FROM CLTM_PRODUCT_CATEGORY WHERE (CLTM_PRODUCT_CATEGORY.RECORD_STAT = ''O'' AND CLTM_PRODUCT_CATEGORY.AUTH_STAT = ''A'')',
100,'PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_CODE',
'CLDPRCMT',
'select product_code, PRODUCT_DESC from cltm_product where auth_STAT=''A'' and record_stat=''O'' order by product_code',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESC!TEXT!PRODUCT_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_CODE',
'CLDPROMT',
'SELECT PRODUCT_CODE,PRODUCT_CATEGORY,PRODUCT_DESC' || chr(10) || '                                        FROM CLTM_PRODUCT' || chr(10) || '                                        WHERE RECORD_STAT =''O''' || chr(10) || '                                        AND AUTH_STAT = ''A''' || chr(10) || '                                        AND ONCE_AUTH =''Y''' || chr(10) || '                                        AND MODULE_CODE = ?' || chr(10) || '                                        ORDER BY PRODUCT_CODE',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY~PRODUCT_DESC!TEXT!PRODUCT_DESC',
'STRING' || chr(10) || '' || chr(10) || '~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_CODE',
'CLDUDVMT',
'select distinct product_code,product_desc from CLTM_PRODUCT WHERE AUTH_STAT=''A'' AND RECORD_STAT=''O''',
'','PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESC!TEXT!PRODUCT_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_CODE',
'CSDPLMNT',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM(SELECT DISTINCT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE MODULE = ? UNION SELECT ''ZALL'',''ALL PRODUCTS'' FROM DUAL UNION SELECT ''ZJRN'',''JOURNAL ENTRY TRANSACTIONS'' FROM DUAL) WHERE 1 = 1 ORDER BY PRODUCT_CODE',
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
('LOV_PRODUCT_CODE',
'DVDREASS',
'select   product_code,          product_description from     cstms_product where    product_code  in ( select product_code                             from   cstbs_contract                             where  module_code     =  ''DV''                             and    auth_status     =  ''U''                             and    template_status =  ''N''                             and    contract_status <> ''H''                             and    branch          = global.current_branch            ) and      record_stat  = ''O'' and      auth_stat    = ''A'' and      module       = ''DV''order by product_code',
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
('LOV_PRODUCT_CODE',
'FSDALRTG',
'select product_code,  product_description from  (select ''ALL'' product_code, ''ALL'' product_description from dual union select product_code, product_description from cstms_product where record_stat = ''O'' and once_auth = ''Y'' and module = ''FX'') where 1 = 1 order by product_code',
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
('LOV_PRODUCT_CODE',
'IDDREASS',
'<Long>',
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
('LOV_PRODUCT_CODE',
'ILDMIRAC',
'select product_code,product_description from cstms_product where module=''FT'' and record_stat=''O'' and once_auth=''Y''order by product_code',
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
('LOV_PRODUCT_CODE',
'ISDCCYRS',
'SELECT A.PRODUCT_CODE,A.PRODUCT_DESCRIPTION FROM CSTM_PRODUCT A, FTTM_PRODUCT_DEFINITION B WHERE A.PRODUCT_CODE=B.PRODUCT_CODE AND A.MODULE=''FT''AND B.PRODUCT_TYPE=''N'' AND A.RECORD_STAT=''O'' AND A.AUTH_STAT=''A''',
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
('LOV_PRODUCT_CODE',
'LMDLIMIT',
'SELECT ''ZSKR'' PRODUCT_CODE,''LIMITS PRODUCT FOR SECURITIES'' PRODUCT_DESCRIPTION  FROM DUAL WHERE NOT EXISTS ( SELECT 1 FROM LMTMS_LIMITS_PROD_REST WHERE LINE_CD=? AND LIAB_ID=? AND LINE_SERIAL=? AND PRODUCT_CODE = ''ZSKR'') UNION SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM LMTVS_PRODUCT A WHERE NOT EXISTS(SELECT 1 FROM LMTMS_LIMITS_PROD_REST B WHERE B.LINE_CD=? AND B.LIAB_ID=? AND B.LINE_SERIAL=? AND A.PRODUCT_CODE=B.PRODUCT_CODE)',
150,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_CODE',
'MCDPRMNT',
'select product_code,product_description from MCVW_PRODUCT_SUMMARY Order By product_code',
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
('LOV_PRODUCT_CODE',
'MMDPRMNT',
'select product_code,product_description from MMVW_PRODUCT_SUMMARY',
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
('LOV_PRODUCT_CODE',
'OTDCNONL',
'SELECT PRODUCT_CODE, PRODUCT_DESCRIPTION, PRODUCT_TYPE,PRODUCT_TYPE_DESC  FROM (SELECT A.PRODUCT_CODE,A.PRODUCT_DESCRIPTION,A.PRODUCT_TYPE,B.PRODUCT_TYPE_DESC FROM CSTMS_PRODUCT A, SMTBS_PRODUCT_TYPES B WHERE A.MODULE = ''OT'' AND A.AUTH_STAT = ''A'' AND A.RECORD_STAT = ''O'' AND A.PRODUCT_TYPE = B.PRODUCT_TYPE AND B.MODULE = ''OT'' AND B.LANGUAGE_CODE=GLOBAL.LANG) WHERE 1 = 1 ORDER BY PRODUCT_CODE',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION~PRODUCT_TYPE!TEXT!PRODUCT_TYPE~PRODUCT_TYPE_DESC!TEXT!PRODUCT_TYPE_DESC',
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
('LOV_PRODUCT_CODE',
'OTRPRFIX',
'Select distinct b.product_code  from dvtbs_period_rvn_rate a, cstbs_contract b where a.contract_ref_no = b.contract_ref_no and b.module_code = ''OT'' and b.contract_status = ''A'' and a.reset_done = ''Y''order by product_code',
200,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_CODE',
'PCDDRAGT',
'SELECT product_code, product_description, cust_no, customer_name1, cust_ac_brn, cust_ac_no,ac_gl_ccy  FROM (SELECT a.product_code, b.product_description, a.cust_no, c.customer_name1, a.cust_ac_brn, a.cust_ac_no,d.ac_gl_ccy          FROM pctms_client_agreement a, cstms_product b, sttms_customer c,	sttbs_account d         WHERE a.record_stat = ''O'' AND a.once_auth = ''Y'' AND a.dd_agreement_reqd = ''Y'' AND b.product_code = a.product_code AND               b.product_type = ''IC'' AND c.customer_no = a.cust_no and d.ac_gl_no=a.cust_ac_no) WHERE 1 = 1 ORDER BY product_code, cust_no, cust_ac_brn, cust_ac_no',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION~CUST_NO!TEXT!CUST_NO~CUSTOMER_NAME1!TEXT!CUSTOMER_NAME1~CUST_AC_BRN!TEXT!CUST_AC_BRN~CUST_AC_NO!TEXT!CUST_AC_NO~AC_GL_CCY!TEXT!AC_GL_CCY',
'STRING~STRING~STRING~STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_CODE',
'SRDPRMNT',
'select product_code,product_description from SRVW_PRODUCT_SUMMARY',
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
('LOV_PRODUCT_CODE',
'STDACUDE',
'select DISTINCT ACLASS, BRANCH_CODE,PRODUCT_CODE from ICTM_PR_INT_UDEVALS where BRANCH_CODE  = ? AND ACLASS= ? ORDER BY PRODUCT_CODE',
100,'BRANCH_CODE!TEXT!BRANCH_CODE~ACLASS!TEXT!ACLASS~PRODUCT_CODE!TEXT!PRODUCT_CODE',
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
('LOV_PRODUCT_CODE',
'STDFLTDS',
'SELECT DISTINCT A.PRODUCT_CODE, A.PRODUCT_DESCRIPTION,A.PRODUCT_TYPE FROM CSTMS_PRODUCT A, IFTM_ARC_MAINT B WHERE A.MODULE=''CG''  AND A.PRODUCT_CODE = B.COD_PROD_ACC_CLS AND A.RECORD_STAT=''O'' AND A.ONCE_AUTH=''Y'' AND B.RECORD_STAT=''O'' AND B.ONCE_AUTH=''Y'' ORDER BY  A.PRODUCT_CODE',
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
('LOV_PRODUCT_CODE',
'SWDPRMAP',
'SELECT PRODUCT_CODE, PRODUCT_DESCRIPTION FROM ( select distinct a.product_code, a.product_description from cstm_product a, detm_rt_preferences b where a.module = ''RT'' and b.switch_product = ''Y'' AND A.PRODUCT_CODE = B.PRODUCT_CODE AND LENGTH(A.PRODUCT_CODE) = ''4'') WHERE 1 = 1 ORDER BY PRODUCT_CODE',
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
('LOV_PRODUCT_COST_CODE1',
'MICAMFUN',
'select cost_code,cost_desc from mitms_cost_code where (cost_type in (''E'',''D'')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (record_stat = ''O'') and (once_auth=''Y'') ORDER BY cost_code',
100,'COST_CODE!TEXT!COST_CODE~COST_DESC!TEXT!COST_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_COST_CODE1',
'MICPRMNT',
'select cost_code,cost_desc from mitms_cost_code where (cost_type in (''E'',''D'')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (record_stat = ''O'') and (once_auth=''Y'') ORDER BY cost_code',
100,'COST_CODE!TEXT!COST_CODE~COST_DESC!TEXT!COST_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_COST_CODE2',
'MICAMFUN',
'select cost_code,cost_desc from mitms_cost_code where (cost_type in (''E'',''D'')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (record_stat = ''O'') and (ONCE_AUTH=''Y'')ORDER BY cost_code',
100,'COST_CODE!TEXT!COST_CODE~COST_DESC!TEXT!COST_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_COST_CODE2',
'MICPRMNT',
'select cost_code,cost_desc from mitms_cost_code where (cost_type in (''E'',''D'')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (record_stat = ''O'') and (ONCE_AUTH=''Y'')ORDER BY cost_code',
100,'COST_CODE!TEXT!COST_CODE~COST_DESC!TEXT!COST_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_COST_CODE3',
'MICAMFUN',
'select cost_code,cost_desc from mitms_cost_code where (cost_type in (''E'',''D'')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (record_stat = ''O'') and (ONCE_AUTH=''Y'')ORDER BY cost_code',
100,'COST_CODE!TEXT!COST_CODE~COST_DESC!TEXT!COST_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_COST_CODE3',
'MICPRMNT',
'select cost_code,cost_desc from mitms_cost_code where (cost_type in (''E'',''D'')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (record_stat = ''O'') and (ONCE_AUTH=''Y'')ORDER BY cost_code',
100,'COST_CODE!TEXT!COST_CODE~COST_DESC!TEXT!COST_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_COST_CODE4',
'MICAMFUN',
'select cost_code,cost_desc from mitms_cost_code where (cost_type in (''E'',''D'')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (record_stat = ''O'') and (ONCE_AUTH=''Y'')ORDER BY cost_code',
100,'COST_CODE!TEXT!COST_CODE~COST_DESC!TEXT!COST_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_COST_CODE4',
'MICPRMNT',
'select cost_code,cost_desc from mitms_cost_code where (cost_type in (''E'',''D'')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (record_stat = ''O'') and (ONCE_AUTH=''Y'')ORDER BY cost_code',
100,'COST_CODE!TEXT!COST_CODE~COST_DESC!TEXT!COST_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_COST_CODE5',
'MICAMFUN',
'select cost_code,cost_desc from mitms_cost_code where (cost_type in (''E'',''D'')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (record_stat = ''O'') and (ONCE_AUTH=''Y'')ORDER BY cost_code',
100,'COST_CODE!TEXT!COST_CODE~COST_DESC!TEXT!COST_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_COST_CODE5',
'MICPRMNT',
'select cost_code,cost_desc from mitms_cost_code where (cost_type in (''E'',''D'')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (cost_code <> nvl(?,'' '')) and (record_stat = ''O'') and (ONCE_AUTH=''Y'')ORDER BY cost_code',
100,'COST_CODE!TEXT!COST_CODE~COST_DESC!TEXT!COST_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_DETAILS',
'SFDCONON',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION  FROM CSTM_PRODUCT WHERE MODULE = ''SF'' and auth_stat=''A'' and record_stat=''O''',
500,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_GROUP',
'AMDFNPRD',
'select product_group, product_group_description from cstms_product_group where record_stat = ''O'' and once_auth = ''Y'' order by product_group',
500,'PRODUCT_GROUP!TEXT!PRODUCT_GROUP~PRODUCT_GROUP_DESCRIPTION!TEXT!PRODUCT_GROUP_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_GROUP',
'CLDFNPRD',
'select * from( select product_group, product_group_description   from cstms_product_group  where record_stat = ''O'' and auth_stat = ''A''  order by product_group) where 1=1',
100,'PRODUCT_GROUP!TEXT!PRODUCT_GROUP~PRODUCT_GROUP_DESCRIPTION!TEXT!PRODUCT_GROUP_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_GROUP',
'EDDDLPRD',
'SELECT product_group, product_group_description FROM cstms_product_group WHERE record_stat = ''O'' AND once_auth = ''Y'' ORDER BY product_group',
'','PRODUCT_GROUP!TEXT!PRODUCT_GROUP~PRODUCT_GROUP_DESCRIPTION!TEXT!PRODUCT_GROUP_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_GROUP',
'EDDPFPRD',
'SELECT product_group, product_group_description FROM cstms_product_group WHERE record_stat = ''O'' AND once_auth = ''Y'' ORDER BY product_group',
'','PRODUCT_GROUP!TEXT!PRODUCT_GROUP~PRODUCT_GROUP_DESCRIPTION!TEXT!PRODUCT_GROUP_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_GROUP',
'ENDINPRO',
'SELECT product_group, product_group_description FROM cstms_product_group WHERE record_stat = ''O'' AND once_auth = ''Y'' ORDER BY product_group',
'','PRODUCT_GROUP!TEXT!~PRODUCT_GROUP_DESCRIPTION!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_GROUP',
'FADPRMNT',
'SELECT PRODUCT_GROUP, PRODUCT_GROUP_DESCRIPTION FROM CSTM_PRODUCT_GROUP WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY PRODUCT_GROUP',
1000,'PRODUCT_GROUP!TEXT!PRODUCT_GROUP~PRODUCT_GROUP_DESCRIPTION!TEXT!PRODUCT_GROUP_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_GROUP',
'IADFNPRD',
'select product_group, product_group_description from cstms_product_group where record_stat = ''O'' and once_auth = ''Y'' order by product_group',
100,'PRODUCT_GROUP!TEXT!PRODUCT_GROUP~PRODUCT_GROUP_DESCRIPTION!TEXT!PRODUCT_GROUP_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_GROUP',
'LLDPRMNT',
'select product_group, product_group_description from cstms_product_group where record_stat = ''O'' and once_auth = ''Y'' order by product_group',
100,'PRODUCT_GROUP!TEXT!PRODUCT_GROUP~PRODUCT_GROUP_DESCRIPTION!TEXT!PRODUCT_GROUP_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_GROUP',
'LNDPRMNT',
'select product_group, product_group_description from cstms_product_group where record_stat = ''O'' and auth_stat = ''A''',
100,'PRODUCT_GROUP!TEXT!PRODUCT_GROUP~PRODUCT_GROUP_DESCRIPTION!TEXT!PRODUCT_GROUP_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_GROUP',
'MGDCPROD',
'SELECT product_group, product_group_description FROM cstms_product_group WHERE record_stat = ''O'' AND once_auth = ''Y'' ORDER BY product_group',
'','PRODUCT_GROUP!TEXT!PRODUCT_GROUP~PRODUCT_GROUP_DESCRIPTION!TEXT!PRODUCT_GROUP_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_GROUP',
'OTDPRMNT',
'select product_group, product_group_description from cstms_product_group where record_stat = ''O'' and once_auth = ''Y''',
100,'PRODUCT_GROUP!TEXT!PRODUCT_GROUP~PRODUCT_GROUP_DESCRIPTION!TEXT!PRODUCT_GROUP_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_GROUP',
'PCDPRMNT',
'select product_group, product_group_description from cstms_product_group where record_stat = ''O'' and once_auth = ''Y'' order by product_group',
'','PRODUCT_GROUP!TEXT!PRODUCT_GROUP~PRODUCT_GROUP_DESCRIPTION!TEXT!PRODUCT_GROUP_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_GROUP',
'PDDPRMNT',
'select product_group, product_group_description from cstms_product_group where record_stat = ''O'' and once_auth = ''Y'' order by product_group',
500,'PRODUCT_GROUP!TEXT!PRODUCT_GROUP~PRODUCT_GROUP_DESCRIPTION!TEXT!PRODUCT_GROUP_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_GROUP',
'SEDPFPRD',
'SELECT PRODUCT_GROUP, PRODUCT_GROUP_DESCRIPTION FROM CSTMS_PRODUCT_GROUP WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY PRODUCT_GROUP',
'','PRODUCT_GROUP!TEXT!~PRODUCT_GROUP_DESCRIPTION!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_GROUP',
'SFDPRMNT',
'SELECT PRODUCT_GROUP,PRODUCT_GROUP_DESCRIPTION FROM CSTM_PRODUCT_GROUP WHERE AUTH_STAT=''A'' AND RECORD_STAT=''O'' ORDER BY PRODUCT_GROUP',
250,'PRODUCT_GROUP!TEXT!PRODUCT_GROUP~PRODUCT_GROUP_DESCRIPTION!TEXT!PRODUCT_GROUP_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_GROUP',
'XPDPRMNT',
'select product_group, product_group_description from cstms_product_group where record_stat = ''O'' and once_auth = ''Y'' order by product_group',
'','PRODUCT_GROUP!TEXT!PRODUCT_GROUP~PRODUCT_GROUP_DESCRIPTION!TEXT!PRODUCT_GROUP_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_MISGROUP',
'MICAMFUN',
'select MIS_GROUP,GROUP_DESC from mitms_mis_group where (record_stat=''O'') and (ONCE_AUTH=''Y'')ORDER BY MIS_GROUP',
100,'MIS_GROUP!TEXT!MIS_GROUP~GROUP_DESC!TEXT!GROUP_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_MISGROUP',
'MICPRMNT',
'select MIS_GROUP,GROUP_DESC from mitms_mis_group where (record_stat=''O'') and (ONCE_AUTH=''Y'')ORDER BY MIS_GROUP',
100,'MIS_GROUP!TEXT!MIS_GROUP~GROUP_DESC!TEXT!GROUP_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_MODULE',
'PDDPRMNT',
'select module_id, module_desc from smtb_modules where module_id = ''PD'' and record_stat = ''O'' and once_auth = ''Y'' order by module_id',
500,'MODULE_ID!TEXT!MODULE_ID~MODULE_DESC!TEXT!MODULE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_PICK',
'IADACCLS',
'select product_code,product_description from cstm_product where product_code not in (select product_code from STTMS_ACLASS_PRODUCTS where account_class = ?) order by product_code',
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
('LOV_PRODUCT_PICK',
'STDACCLS',
'select product_code,product_description from cstm_product where product_code not in (select product_code from STTMS_ACLASS_PRODUCTS where account_class = ?) and record_stat = ''O'' AND once_auth = ''Y'' order by product_code',
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
('LOV_PRODUCT_POOL_CODE',
'MICAMFUN',
'select pool_code,pool_name from mitms_pool_code where (record_stat=''O'') and (ONCE_AUTH=''Y'')ORDER BY pool_code',
100,'POOL_CODE!TEXT!POOL_CODE~POOL_NAME!TEXT!POOL_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_POOL_CODE',
'MICPRMNT',
'select pool_code,pool_name from mitms_pool_code where (record_stat=''O'') and (ONCE_AUTH=''Y'')ORDER BY pool_code',
100,'POOL_CODE!TEXT!POOL_CODE~POOL_NAME!TEXT!POOL_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_SUMMARY',
'FTDPRMNT',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM FTVW_FTSPRMNT ORDER BY PRODUCT_CODE',
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
('LOV_PRODUCT_TYPE',
'AMDFNPRD',
'select product_type, product_type_desc from smtbs_product_types where function_id = ''AMDFNPRD''and language_code = global.lang and nvl(int_auth_stat,''A'')=''A'' order by product_type',
500,'PRODUCT_TYPE!TEXT!PRODUCT_TYPE~PRODUCT_TYPE_DESC!TEXT!PRODUCT_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_TYPE',
'BCDPRMNT',
'select product_type,product_type_desc from smtbs_product_types' || chr(10) || '               where function_id = ''BCDPRMNT'' and language_code = GLOBAL.LANG' || chr(10) || '               and nvl(int_auth_stat,''A'')=''A'' order by product_type',
100,'PRODUCT_TYPE!TEXT!PRODUCT_TYPE~PRODUCT_TYPE_DESC!TEXT!PRODUCT_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_TYPE',
'CLDFNPRD',
'select * from(select product_type, product_type_desc  from smtbs_product_types where function_id = ''CLGFNPRD'' and language_code = ''ENG'' and       nvl(int_auth_stat, ''A'') = ''A'' order by product_type) where 1=1',
100,'PRODUCT_TYPE!TEXT!PRODUCT_TYPE~PRODUCT_TYPE_DESC!TEXT!PRODUCT_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_TYPE',
'DEDRTPRM',
'select product_type,product_type_desc from smtbs_product_types where function_id = ''DEDRTPRM'' and nvl(int_auth_stat,''A'')=''A'' order by product_type',
100,'PRODUCT_TYPE!TEXT!PRODUCT_TYPE~PRODUCT_TYPE_DESC!TEXT!PRODUCT_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_TYPE',
'DVDPRMNT',
'select product_type,product_type_desc from smtbs_product_types where function_id = ''DVDPRMNT'' and language_code = ''ENG'' and nvl(int_auth_stat,''A'')=''A'' and product_type in (select DERIVATIVE_TYPE from dvtms_type_master) order by product_type',
100,'PRODUCT_TYPE!TEXT!PRODUCT_TYPE~PRODUCT_TYPE_DESC!TEXT!PRODUCT_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_TYPE',
'EDDDLPRD',
'SELECT product_type, product_type_desc FROM smtbs_product_types WHERE function_id = ''EDDDLPRD'' AND language_code = global.lang AND nvl(int_auth_stat,''A'')=''A'' ORDER BY product_type',
'','PRODUCT_TYPE!TEXT!PRODUCT_TYPE~PRODUCT_TYPE_DESC!TEXT!PRODUCT_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_TYPE',
'EDDPFPRD',
'SELECT product_type, product_type_desc FROM smtbs_product_types WHERE function_id = ''EDDPFPRD'' AND language_code = global.lang AND nvl(int_auth_stat,''A'')=''A'' ORDER BY product_type',
'','PRODUCT_TYPE!TEXT!PRODUCT_TYPE~PRODUCT_TYPE_DESC!TEXT!PRODUCT_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_TYPE',
'ENDINPRO',
'SELECT product_type, product_type_desc FROM smtbs_product_types WHERE function_id = ''ENDINPRO'' AND language_code = global.lang AND nvl(int_auth_stat,''A'')=''A'' ORDER BY product_type',
'','PRODUCT_TYPE!TEXT!~PRODUCT_TYPE_DESC!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_TYPE',
'FADPRMNT',
'SELECT PRODUCT_TYPE, PRODUCT_TYPE_DESC FROM SMTB_PRODUCT_TYPES WHERE FUNCTION_ID = ''FADPRMNT'' AND LANGUAGE_CODE = GLOBAL.lang AND NVL(INT_AUTH_STAT,''A'')=''A'' ORDER BY PRODUCT_TYPE',
1000,'PRODUCT_TYPE!TEXT!PRODUCT_TYPE~PRODUCT_TYPE_DESC!TEXT!PRODUCT_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_TYPE',
'FTDPRMNT',
'select product_type,product_type_desc from smtb_product_types where function_id = ''FTDPRMNT'' and language_code = GLOBAL.LANG and nvl(int_auth_stat,''A'')=''A'' order by product_type',
100,'PRODUCT_TYPE!TEXT!PRODUCT_TYPE~PRODUCT_TYPE_DESC!TEXT!PRODUCT_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_TYPE',
'IADFNPRD',
'select product_type, product_type_desc from smtbs_product_types where function_id = ''IADFNPRD''and language_code = global.lang and nvl(int_auth_stat,''A'')=''A'' order by product_type',
500,'PRODUCT_TYPE!TEXT!PRODUCT_TYPE~PRODUCT_TYPE_DESC!TEXT!PRODUCT_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_TYPE',
'ICDPRMNT',
'SELECT PRODUCT_TYPE,PRODUCT_TYPE_DESC FROM SMTBS_PRODUCT_TYPES WHERE FUNCTION_ID = ''ICDPRMNT'' AND LANGUAGE_CODE = GLOBAL.LANG AND NVL(INT_AUTH_STAT,''A'')=''A'' ORDER BY PRODUCT_TYPE',
100,'PRODUCT_TYPE!TEXT!PRODUCT_TYPE~PRODUCT_TYPE_DESC!TEXT!PRODUCT_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_TYPE',
'LCDPRMNT',
'select product_type,product_type_desc from smtbs_product_types where function_id = ''LCDPRMNT'' and language_code = GLOBAL.LANG and nvl(int_auth_stat,''A'')=''A'' order by product_type',
100,'PRODUCT_TYPE!TEXT!PRODUCT_TYPE~PRODUCT_TYPE_DESC!TEXT!PRODUCT_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_TYPE',
'MGDCPROD',
'SELECT product_type, product_type_desc FROM smtbs_product_types WHERE function_id = ''MGDCPROD'' AND language_code = global.lang AND nvl(int_auth_stat,''A'')=''A'' ORDER BY product_type',
'','PRODUCT_TYPE!TEXT!PRODUCT_TYPE~PRODUCT_TYPE_DESC!TEXT!PRODUCT_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_TYPE',
'MMDPRMNT',
'select product_type,product_type_desc from smtbs_product_types where function_id = ''MMDPRMNT'' and language_code = global.lang and nvl(int_auth_stat,''A'')=''A''',
10,'PRODUCT_TYPE!TEXT!PRODUCT_TYPE~PRODUCT_TYPE_DESC!TEXT!PRODUCT_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_TYPE',
'OTDPRMNT',
'select product_type,product_type_desc from smtbs_product_types where function_id = ''OTDPRMNT'' and language_code = global.lang and nvl(int_auth_stat,''A'')=''A''',
100,'PRODUCT_TYPE!TEXT!PRODUCT_TYPE~PRODUCT_TYPE_DESC!TEXT!PRODUCT_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_TYPE',
'PCDPRMNT',
'select product_type,product_type_desc  from smtbs_product_types where function_id = ''PCDPRMNT'' and language_code = GLOBAL.LANG and nvl(int_auth_stat,''A'')=''A'' order by product_type',
'','PRODUCT_TYPE!TEXT!PRODUCT_TYPE~PRODUCT_TYPE_DESC!TEXT!PRODUCT_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_TYPE',
'PDDPRMNT',
'select product_type, product_type_desc from smtbs_product_types where function_id = ''PDDPRMNT'' and language_code = global.lang and int_auth_stat =''A'' order by product_type',
500,'PRODUCT_TYPE!TEXT!PRODUCT_TYPE~PRODUCT_TYPE_DESC!TEXT!PRODUCT_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_TYPE',
'SEDPFPRD',
'SELECT PRODUCT_TYPE,PRODUCT_TYPE_DESC FROM SMTBS_PRODUCT_TYPES WHERE FUNCTION_ID = ''SEDPFPRD'' AND LANGUAGE_CODE = ''ENG'' AND NVL(int_auth_stat,''A'')=''A'' ORDER BY PRODUCT_TYPE',
'','PRODUCT_TYPE!TEXT!~PRODUCT_TYPE_DESC!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_TYPE',
'SEDSEPRD',
'SELECT PRODUCT_TYPE,PRODUCT_TYPE_DESC FROM SMTBS_PRODUCT_TYPES WHERE FUNCTION_ID = ''SEDSEPRD'' AND LANGUAGE_CODE = ''ENG'' AND NVL(int_auth_stat,''A'')=''A'' ORDER BY PRODUCT_TYPE',
'','PRODUCT_TYPE!TEXT!~PRODUCT_TYPE_DESC!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_TYPE',
'SLDPRMNT',
'SELECT PRODUCT_TYPE,PRODUCT_TYPE_DESC FROM SMTBS_PRODUCT_TYPES WHERE FUNCTION_ID = ''SLDPRMNT'' AND LANGUAGE_CODE = GLOBAL.LANG AND NVL(INT_AUTH_STAT,''A'')=''A'' ORDER BY PRODUCT_TYPE',
200,'PRODUCT_TYPE!TEXT!PRODUCT_TYPE~PRODUCT_TYPE_DESC!TEXT!PRODUCT_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_TYPE',
'SRDPRMNT',
'select product_type,product_type_desc from smtbs_product_types where function_id = ''SRDPRMNT'' and language_code = global.lang and nvl(int_auth_stat,''A'')=''A''',
10,'PRODUCT_TYPE!TEXT!PRODUCT_TYPE~PRODUCT_TYPE_DESC!TEXT!PRODUCT_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_TYPE',
'UPDPRDMN',
'select product_type,product_type_desc from smtbs_product_types where function_id = ''UPDPRDMN'' and nvl(int_auth_stat,''A'')=''A'' order by product_type',
100,'PRODUCT_TYPE!TEXT!PRODUCT_TYPE~PRODUCT_TYPE_DESC!TEXT!PRODUCT_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUCT_TYPE',
'XPDPRMNT',
'select product_type,product_type_desc  from smtbs_product_types where function_id = ''XPDPRMNT'' and language_code = GLOBAL.LANG and nvl(int_auth_stat,''A'')=''A'' order by product_type',
'','PRODUCT_TYPE!TEXT!PRODUCT_TYPE~PRODUCT_TYPE_DESC!TEXT!PRODUCT_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRODUDCT_OR_ACCOUNT_CLASS',
'STDTAXWV',
'select product, description from ( select account_class product , description  description  from sttms_account_class where record_stat = ''O'' and auth_stat = ''A''  union select product_code product , product_description description  from cstms_product where module in (''LD'', ''MM'') and record_stat = ''O'' and auth_stat = ''A''union select ''ALL'', ''All Products/Account Classes'' from dual ) where 1 = 1 order by product',
100,'PRODUCT!TEXT!PRODUCT~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_ACC',
'IFDATMMN',
'select DISTINCT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM (SELECT c.PRODUCT_CODE,c.PRODUCT_DESCRIPTION,c.MODULE,c.PRODUCT_TYPE FROM CSTM_PRODUCT c WHERE c.AUTH_STAT=''A'' AND c.RECORD_STAT=''O'' and c.module IN ( SELECT MODULE_ID FROM SMTB_MODULES WHERE ARC_APPLICABLE=''Y'') and ?=''P''UNION select s.account_class ,s.DESCRIPTION, ''ST'', ''ST'' from sttms_account_class s where s.AUTH_STAT=''A'' AND s.RECORD_STAT=''O''and ?=''A'')WHERE 1=1 ORDER BY PRODUCT_CODE',
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
('LOV_PROD_AVAIL',
'SEDPFONL',
'SELECT PRODUCT_CODE, PRODUCT_DESCRIPTION  FROM CSTMS_PRODUCT WHERE AUTH_STAT = ''A'' AND ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O'' AND MODULE = ''SS'' AND  PRODUCT_CODE NOT IN (SELECT SECURITY_PROD_DISALLOW    FROM SETMS_SEC_PROD_DISALLOW        WHERE PORTFOLIO_ID = ?) AND PRODUCT_CODE IN (SELECT PRODUCT FROM SETMS_SECURITY_PRODUCT)',
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
('LOV_PROD_CAT',
'CIRPMATR',
'select product_category from cltms_product_category order by 1',
20,'PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CAT',
'CIRPREVN',
'SELECT DISTINCT CAT.PRODUCT_CATEGORY FROM CLTMS_PRODUCT_CATEGORY CAT ,CLTMS_PRODUCT PRD WHERE PRD.PRODUCT_CATEGORY=CAT.PRODUCT_CATEGORY AND CAT.RECORD_STAT=''O'' AND CAT.AUTH_STAT=''A'' AND prd.Module_Code=''CI''',
20,'PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CAT',
'CLRPMATR',
'select product_category from cltms_product_category order by 1',
20,'PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CAT',
'CLRPREVN',
'select distinct c.product_category  from cltms_product_category c,cltms_product p where c.product_category = p.product_category and p.module_code = ''CL'' order by 1' || chr(10) || '',
20,'PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CAT',
'PCDCONAU',
'select prod_category from pctms_product_Category where  ONCE_AUTH=''Y'' AND RECORD_STAT =''O'' ORDER BY PROD_CATEGORY',
100,'PROD_CATEGORY!TEXT!PROD_CATEGORY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CAT',
'PCDMSGMT',
'select prod_category,category_desc from (SELECT prod_category,category_desc FROM pctms_product_category WHERE auth_stat = ''A'' AND record_stat = ''O'' AND product_type NOT IN (''XI'', ''RI'')UNION SELECT product_code,product_description FROM cstms_product WHERE module = ''FT'' AND auth_stat = ''A'' AND record_stat = ''O'')where 1=1 order by prod_category',
100,'PROD_CATEGORY!TEXT!PROD_CATEGORY~CATEGORY_DESC!TEXT!CATEGORY_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CAT',
'STDTRCOD',
'SELECT PRODUCT_CAT, DESCRIPTION  FROM (SELECT PRODUCT_CAT, DESCRIPTION  FROM CSTMS_AML_PRODUCT_CAT_MASTER WHERE ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O'' ORDER BY PRODUCT_CAT, DESCRIPTION ASC) WHERE 1=1',
200,'PRODUCT_CAT!TEXT!PRODUCT_CAT~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CATE',
'CIRDSBRM',
'select distinct product_category from cltb_account_master where module_code=''CI''',
'','PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CATE',
'CIRMISDT',
'select distinct product_code from cltm_product where module_code=''CI''',
'','PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CATE',
'CIRPFRWD',
'select distinct product_category from cltb_account_master',
'','PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CATE',
'CLRPFRWD',
'select distinct product_category from cltb_account_master',
'','PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CATEGORY',
'PCDINSTR',
'select prod_category, category_desc from pctms_product_category where once_auth = ''Y'' and record_stat = ''O'' and product_type in (''OC'',''O'')order by prod_category',
'','PROD_CATEGORY!TEXT!PROD_CATEGORY~CATEGORY_DESC!TEXT!CATEGORY_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CATEGORY',
'PCDISMAP',
'SELECT prod_category, category_desc FROM pctmS_product_category WHERE product_type = DECODE(?, ''P'', ''O'', ''R'', ''OC'') AND record_stat = ''O'' AND ONCE_AUTH =''Y'' AND transfer_type = DECODE(?,''A'',''B'',?) ORDER BY prod_category',
100,'PROD_CATEGORY!TEXT!PROD_CATEGORY~CATEGORY_DESC!TEXT!CATEGORY_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CATEGORY',
'PCDPDCTG',
'SELECT prod_category, category_desc   FROM pctms_product_category  WHERE product_type = decode(?, ''O'', ''I'', ''OC'', ''IC'', ''XI'', ''XO'', ''RI'', ''RO'', ''IN'', ''ON'', ''VO'', ''VI'') AND        ? IN (''O'', ''OC'', ''IN'', ''XI'', ''RI'', ''VO'') AND   NVL(collection_type,''@'') = NVL(?,''@'') AND record_stat = ''O'' AND once_auth = ''Y''  ORDER BY prod_category',
100,'PROD_CATEGORY!TEXT!PROD_CATEGORY~CATEGORY_DESC!TEXT!CATEGORY_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CATEGORY',
'PCDPTYDM',
'select prod_category, category_desc from pctms_product_category where cpty_details_reqd = ''Y'' and once_auth = ''Y'' and record_stat = ''O'' order by prod_category',
500,'PROD_CATEGORY!TEXT!PROD_CATEGORY~CATEGORY_DESC!TEXT!CATEGORY_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CCY',
'IFDATMMN',
' SELECT *' || chr(10) || '   FROM (SELECT CCY_CODE, CCY_NAME' || chr(10) || '           FROM (SELECT CCY_CODE, CCY_NAME' || chr(10) || '                   FROM CYTMS_CCY_DEFN' || chr(10) || '                  WHERE AUTH_STAT = ''A'' AND' || chr(10) || '                        CCY_CODE IN (SELECT CCY_CODE' || chr(10) || '                                       FROM CYTMS_CCY_DEFN' || chr(10) || '                                     MINUS' || chr(10) || '                                     SELECT SOLD_CCY A' || chr(10) || '                                       FROM CSTMS_PRODUCT_CCY_DISALLOW' || chr(10) || '                                      WHERE PRODUCT_CODE = ?)' || chr(10) || '                 UNION' || chr(10) || '                 SELECT ''*.*'', ''ALL CURRENCY'' FROM DUAL)' || chr(10) || '          WHERE 1 = 1' || chr(10) || '          ORDER BY CCY_CODE)' || chr(10) || '  WHERE ROWNUM <= 100',
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
('LOV_PROD_CODE',
'BCDAMTEX',
'SELECT * FROM(SELECT PRODUCT_CODE, PRODUCT_DESCRIPTION                    FROM CSTM_PRODUCT                   WHERE MODULE = ? AND ONCE_AUTH = ''Y'' AND                         RECORD_STAT = ''O'' AND                         PRODUCT_CODE NOT IN                         (SELECT PRODUCT_CODE                            FROM BCTM_EXCH_CUTAMT_MASTER                           WHERE BRANCH_CODE = ? AND MODULE_CODE = ?) UNION                           SELECT ''ZALL'', ''ALL PRODUCTS''                    FROM DUAL) WHERE 1=1',
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
('LOV_PROD_CODE',
'CIRFLPAY',
'select product_code from cltms_product where record_stat = ''O'' and auth_stat = ''A''',
'','PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CODE',
'CIRFTPAY',
'select product_code from cltms_product where record_stat = ''O'' and auth_stat = ''A''  and  product_category = ?',
'','PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CODE',
'CIRPMATR',
'select product_code from cltms_product where record_stat = ''O'' and auth_stat = ''A'' and  product_category = ?',
'','PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CODE',
'CIRPNWLN',
'select product_code from cltms_product where record_stat = ''O'' and auth_stat = ''A''  and  product_category = ?',
'','PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CODE',
'CIRPOSCH',
'SELECT PRODUCT_CODE FROM CLTMS_PRODUCT WHERE RECORD_STAT = ''O'' AND AUTH_STAT = ''A'' AND module_code=''CI''   AND  PRODUCT_CATEGORY = ? ORDER BY 1',
'','PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CODE',
'CIRPRETR',
'SELECT PRODUCT_CODE FROM CLTMS_PRODUCT WHERE RECORD_STAT = ''O'' AND AUTH_STAT = ''A'' AND module_code=''CI''   AND  PRODUCT_CATEGORY = ? ORDER BY 1',
'','PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CODE',
'CIRPREVN',
'SELECT PRODUCT_CODE FROM CLTMS_PRODUCT WHERE RECORD_STAT = ''O'' AND AUTH_STAT = ''A'' AND module_code=''CI''   AND  PRODUCT_CATEGORY = ?',
'','PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CODE',
'CIRPSTAT',
'SELECT PRODUCT_CODE FROM CLTMS_PRODUCT WHERE RECORD_STAT = ''O'' AND AUTH_STAT = ''A'' AND module_code=''CI''   AND  PRODUCT_CATEGORY = ? ORDER BY 1',
'','PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CODE',
'CIRRPREV',
'select product_code from cltms_product where record_stat = ''O'' and auth_stat = ''A''',
'','PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CODE',
'CLDCROLL',
'select product_code, product_desc  from CLTMS_PRODUCT where auth_stat = ''A'' AND product_type = ''L'' AND record_stat = ''O'' order by product_code',
50,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESC!TEXT!PRODUCT_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CODE',
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
('LOV_PROD_CODE',
'CLRPMATR',
'select product_code from cltms_product where record_stat = ''O'' and auth_stat = ''A'' and product_category = ?',
'','PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CODE',
'CLRPOSCH',
'select product_code from cltms_product where record_stat = ''O'' and auth_stat = ''A''  and  product_category = ?',
'','PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CODE',
'CLRPRETR',
'select product_code from cltms_product where record_stat = ''O'' and auth_stat = ''A''  and  product_category = ?',
'','PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CODE',
'CLRPREVN',
'select product_code from cltms_product where record_stat = ''O'' and auth_stat = ''A'' and product_category = ?',
'','PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CODE',
'CLRPSTAT',
'select product_code from cltms_product where record_stat = ''O'' and auth_stat = ''A''  and  product_category = ?',
'','PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CODE',
'IADIFONL',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT A WHERE ONCE_AUTH=''Y'' AND RECORD_STAT=''O'' AND MODULE=''IA''AND EXISTS(SELECT 1 FROM AMTMS_MULTIFUND_MASTER WHERE PROD_CODE = A.PRODUCT_CODE AND UPPER(PROD_TYPE)=''F'') ORDER BY PRODUCT_CODE',
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
('LOV_PROD_CODE',
'ICDOCALC',
'select product_code,PRODUCT_DESCRIPTION from CSTM_PRODUCT where record_stat = ''O'' and once_auth = ''Y'' AND module =''IC'' ORDER BY product_code',
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
('LOV_PROD_CODE',
'ICDOLIQ',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM CSTM_PRODUCT WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' AND MODULE=''IC'' ORDER BY PRODUCT_CODE',
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
('LOV_PROD_CODE',
'ICDUDEUL',
'select distinct prod from ictm_acc_pr where record_stat = ''O'' and once_auth = ''Y'' and brn = GLOBAL.CURRENT_BRANCH ORDER BY prod',
500,'PROD!TEXT!PROD',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_CODE',
'PCDACSMT',
'SELECT PRODUCT_CODE, PRODUCT_DESCRIPTION FROM(SELECT ''AL'' PRODUCT_CODE,''All Types'' PRODUCT_DESCRIPTION from dual where not exists(select 1 FROM PCTMS_AC_STMT b WHERE b.PRODUCT_CODE=''ALL'' and b.PRODUCT_TYPE=?) union SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT a WHERE MODULE=''PC'' and record_stat=''O'' AND ONCE_AUTH=''Y'' AND PRODUCT_TYPE IN(''I'',''XI'',''IC'',''OC'',''O'',''RI'',''AL'') AND NOT EXISTS(SELECT 1 FROM PCTMS_AC_STMT b WHERE b.PRODUCT_CODE=a.PRODUCT_CODE and b.PRODUCT_TYPE=?)) WHERE 1=1 order by product_code',
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
('LOV_PROD_CODE',
'PCDCHGAC',
'select product_code,product_description from(select ''ALL'' product_code,''All Products'' product_description from dual union select product_code,product_description from cstms_product where module=''PC'' and record_stat=''O'' and once_auth=''Y'') where 1=1 order by 1',
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
('LOV_PROD_CODE',
'PCDINSTR',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM(SELECT A.PRODUCT_CODE, B.PRODUCT_DESCRIPTION FROM PCTMS_PRODCAT_EXT_CLG A,cstms_product B WHERE A.PROD_CATEGORY= ? AND A.PRODUCT_CODE=B.PRODUCT_CODE AND B.RECORD_STAT=''O'' and B.ONCE_AUTH=''Y'' UNION SELECT A.PRODUCT_CODE,B.PRODUCT_DESCRIPTION FROM PCTMS_PRODCAT_INT_CLG A,cstms_product B WHERE A.PROD_CATEGORY= ? AND A.PRODUCT_CODE=B.PRODUCT_CODE AND B.RECORD_STAT=''O'' and B.ONCE_AUTH=''Y'' UNION SELECT A.PRODUCT_CODE,B.PRODUCT_DESCRIPTION FROM PCTMS_PRODCAT_BOOK_TRF A,cstms_product B WHERE A.PROD_CATEGORY= ? AND A.PRODUCT_CODE=B.PRODUCT_CODE AND B.RECORD_STAT=''O'' and B.ONCE_AUTH=''Y'')WHERE 1=1 ORDER BY PRODUCT_CODE',
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
('LOV_PROD_CODE',
'PCDISMAP',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM (SELECT product_code, product_description FROM   cstm_product WHERE  module = ? AND   ONCE_AUTH=''Y'' AND    record_stat = ''O'' UNION SELECT  ''ALL'',''All Products'' FROM   DUAL) WHERE 1=1 ORDER BY PRODUCT_CODE',
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
('LOV_PROD_CODE',
'VPDLIQON',
'SELECT DISTINCT PRODUCT_CODE FROM CLTMS_PRODUCT_RTH WHERE ACCOUNTING_ROLE = ''VENDORPAYABLEGL'' ORDER BY PRODUCT_CODE',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_DESC',
'STDNTMNT',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE ONCE_AUTH=''Y'' AND RECORD_STAT=''O'' ORDER BY PRODUCT_CODE',
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
('LOV_PROD_GROUP',
'SEDDLPRD',
'SELECT PRODUCT_GROUP, PRODUCT_GROUP_DESCRIPTION FROM CSTMS_PRODUCT_GROUP WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY PRODUCT_GROUP',
'','PRODUCT_GROUP!TEXT!~PRODUCT_GROUP_DESCRIPTION!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_INTERNAL',
'FXDNETMA',
'select product_code from (SELECT a.product_code FROM   fttms_product_definition a,cstms_product b WHERE  a.product_code = b.product_code AND a.product_type = ''N'' AND b. record_stat = ''O'' AND b. once_auth = ''Y'' ) where 1=1 order by product_code',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_OUT_BANK',
'FXDNETMA',
'select product_code from (select a.product_code from fttms_product_definition a, cstms_product b where a.product_code = b.product_code and a.product_type = ''O'' and a.transfer_type = ''B'' and b.record_stat = ''O'' and b.once_auth =''Y''  ) where 1=1 order by product_code',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_TYPE',
'CIRFTPAY',
'select distinct product_category from cltms_product_category',
'','PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_TYPE',
'CIRPNWLN',
'select distinct product_category from cltms_product_category',
'','PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_TYPE',
'CIRPOSCH',
'SELECT DISTINCT CAT.PRODUCT_CATEGORY FROM CLTMS_PRODUCT_CATEGORY CAT ,CLTMS_PRODUCT PRD WHERE PRD.PRODUCT_CATEGORY=CAT.PRODUCT_CATEGORY AND CAT.RECORD_STAT=''O'' AND CAT.AUTH_STAT=''A'' AND prd.Module_Code=''CI'' ORDER BY 1',
'','PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_TYPE',
'CIRPRETR',
'SELECT DISTINCT CAT.PRODUCT_CATEGORY FROM CLTMS_PRODUCT_CATEGORY CAT ,CLTMS_PRODUCT PRD WHERE PRD.PRODUCT_CATEGORY=CAT.PRODUCT_CATEGORY AND CAT.RECORD_STAT=''O'' AND CAT.AUTH_STAT=''A'' AND prd.Module_Code=''CI'' ORDER BY 1',
'','PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_TYPE',
'CIRPSTAT',
'SELECT DISTINCT CAT.PRODUCT_CATEGORY FROM CLTMS_PRODUCT_CATEGORY CAT ,CLTMS_PRODUCT PRD WHERE PRD.PRODUCT_CATEGORY=CAT.PRODUCT_CATEGORY AND CAT.RECORD_STAT=''O'' AND CAT.AUTH_STAT=''A'' AND prd.Module_Code=''CI'' ORDER BY 1',
'','PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_TYPE',
'CLRPOSCH',
'SELECT  DISTINCT(product_category) from cltms_product WHERE module_code=''CL'' and product_category IS NOT NULL',
'','PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_TYPE',
'CLRPRETR',
'select distinct c.product_category  from cltms_product_category c,cltms_product p where c.product_category = p.product_category and p.module_code = ''CL''' || chr(10) || '',
'','PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_TYPE',
'CLRPSTAT',
'select distinct product_category from cltms_product_category',
'','PRODUCT_CATEGORY!TEXT!PRODUCT_CATEGORY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_TYPE',
'FTDPRMNT',
'select product_type,product_type_desc from smtb_product_typeswhere product_type',
100,'','','','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_TYPE',
'PCDACSMT',
'select product_type, product_type_desc from (select ''AL'' product_type,''ALL TYPES'' product_type_desc from dual where not exists (select * from PCTMS_AC_STMT b where b.product_type=''AL'') union select product_type,product_type_desc from smtbs_product_types where function_id=''PCDPRMNT'' and module=''PC'' AND language_code = ''ENG'') where 1=1 order by product_type',
100,'PRODUCT_TYPE!TEXT!PRODUCT_TYPE~PRODUCT_TYPE_DESC!TEXT!PRODUCT_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROD_TYPE',
'SEDDLPRD',
'select product_type , product_type_desc from smtbs_product_types where function_id = ''SEDDLPRD'' and language_code = global.lang and NVL(int_auth_stat,''A'')=''A'' order by product_type',
'','PRODUCT_TYPE!TEXT!~PRODUCT_TYPE_DESC!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROFIT_GL',
'CSCACADD',
'select gl_code,gl_desc from gltm_glmaster where leaf=''Y'' and auth_stat=''A'' and once_auth=''Y'' and category in (3,4) ORDER BY GL_CODE',
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
('LOV_PROFIT_GL',
'RVDSETUP',
'SELECT GL_CODE,GL_DESC FROM GLTMS_GLMASTER WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' AND CATEGORY IN (''3'',''4'' , ''5'' , ''6'' ) AND HO_RES = ''A'' AND LEAF = ''Y''',
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
('LOV_PROFIT_REVAL_GL',
'IFDATMMN',
'SELECT AC_GL_NO, AC_GL_DESC FROM STTB_ACCOUNT where ac_or_gl=''G'' and auth_stat=''A'' AND ac_gl_rec_status=''O''',
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
('LOV_PROJECT',
'CLDACCDT',
'SELECT PROJECT_NAME,PROJECT_DESC FROM CSTMS_DEVELOPER_PROJECTS  WHERE ONCE_AUTH=''Y'' AND RECORD_STAT=''O'' AND DEVELOPER_CODE=? ORDER BY PROJECT_NAME',
100,'PROJECT_NAME!TEXT!PROJECT_NAME~PROJECT_DESC!TEXT!PROJECT_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROM',
'CIDACCDT',
'select PROMOTION_CODE  from CLTMS_PROMOTION_MASTER WHERE  RECORD_STAT = ''O'' AND AUTH_STAT = ''A''',
50,'PROMOTION_CODE!TEXT!PROMOTION_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROM',
'CLDACCDT',
'select PROMOTION_CODE  from CLTMS_PROMOTION_MASTER WHERE  RECORD_STAT = ''O'' AND AUTH_STAT = ''A''',
50,'PROMOTION_CODE!TEXT!PROMOTION_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROM',
'CLDINADT',
'select PROMOTION_CODE  from CLTMS_PROMOTION_MASTER WHERE  RECORD_STAT = ''O'' AND AUTH_STAT = ''A''',
50,'PROMOTION_CODE!TEXT!PROMOTION_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROM',
'CLDLOTEM',
'select PROMOTION_CODE  from CLTMS_PROMOTION_MASTER WHERE  RECORD_STAT = ''O'' AND AUTH_STAT = ''A''',
50,'PROMOTION_CODE!TEXT!PROMOTION_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROM',
'LEDACCDT',
'select PROMOTION_CODE  from CLTMS_PROMOTION_MASTER WHERE  RECORD_STAT = ''O'' AND AUTH_STAT = ''A''',
50,'PROMOTION_CODE!TEXT!PROMOTION_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROM',
'LSDTRONL',
'select PROMOTION_CODE  from CLTMS_PROMOTION_MASTER WHERE  RECORD_STAT = ''O'' AND AUTH_STAT = ''A''',
50,'PROMOTION_CODE!TEXT!PROMOTION_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROM',
'MODACCDT',
'',50,'PROMOTION_CODE!TEXT!PROMOTION_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PROTFOLIO',
'EDDLSONL',
'SELECT PORTFOLIO_ID,PORTFOLIO_DESCRIPTION,PF_CUSTOMER,CUSTOMER_NAME1 FROM EDVWS_DEAL_PRODUCT_INS_PF,STTM_CUSTOMER WHERE SUBSTR(PORTFOLIO_REFERENCE,1,3) = GLOBAL.CURRENT_BRANCH AND PF_CUSTOMER = CUSTOMER_NO(+) AND DEAL_PRODUCT = ? AND INSTRUMENT_ID = ? ORDER BY 1',
200,'PORTFOLIO_ID!TEXT!PORTFOLIO_ID~PORTFOLIO_DESCRIPTION!TEXT!PORTFOLIO_DESCRIPTION~PF_CUSTOMER!TEXT!PF_CUSTOMER~CUSTOMER_NAME1!TEXT!CUSTOMER_NAME1',
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
('LOV_PRO_CODE',
'CLDCROLL',
'SELECT a.product_code, a.product_desc FROM   cltms_product a WHERE  a.auth_stat = ''A'' AND    a.record_stat = ''O'' AND    a.product_type = ''L'' AND EXISTS(SELECT ''X'' FROM cltbs_account_master b WHERE b.product_code = a.product_code AND   b.branch_code = ?  AND   b.customer_id = ? AND   b.loan_type = ''L'' AND   b.auth_stat = ''A''  And b.account_status =''A'' AND   b.currency = ?) Order by a.product_code' || chr(10) || '',
50,'PRODUCT_CODE!TEXT!PRODUCT_CODE~PRODUCT_DESC!TEXT!PRODUCT_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_PRTFO_ID',
'EDDQBSWA',
'SELECT DISTINCT PORTFOLIO_ID, PORTFOLIO_DESCRIPTION,INSTRUMENT_ID,SERIES_ID,BROKER_CM_ID,BROKER_ACCOUNT' || chr(10) || '  FROM (SELECT DISTINCT A.PORTFOLIO_ID, B.PORTFOLIO_DESCRIPTION,' || chr(10) || '        A.INSTRUMENT_ID,A.SERIES_ID,A.BROKER_CM_ID,A.BROKER_ACCOUNT' || chr(10) || '          FROM EDTBS_BASKET_REFERENCE A, EDTMS_PORTFOLIO B' || chr(10) || '         WHERE A.PORTFOLIO_ID = B.PORTFOLIO_ID' || chr(10) || '           AND A.OWN_CUSTOMER = ''O''' || chr(10) || '           AND ((A.OPTION_FUTURE = ''F'') OR' || chr(10) || '               (A.OPTION_FUTURE = ''O'' AND A.PREMIUM_STYLE = ''F'') OR' || chr(10) || '  (B.OPTION_COSTING_METHOD = ''W''))' || chr(10) || '           AND A.BRANCH = Global.Current_Branch)' || chr(10) || ' WHERE 1 = 1' || chr(10) || ' ORDER BY PORTFOLIO_ID',
100,'PORTFOLIO_ID!TEXT!PORTFOLIO_ID~PORTFOLIO_DESCRIPTION!TEXT!PORTFOLIO_DESCRIPTION~INSTRUMENT_ID!TEXT!INSTRUMENT_ID~SERIES_ID!TEXT!SERIES_ID~BROKER_CM_ID!TEXT!BROKER_CM_ID~BROKER_ACCOUNT!TEXT!BROKER_ACCOUNT',
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
('LOV_PR_CLASS',
'SEDDLPRD',
'SELECT CLASS_CODE, CLASS_DESCRIPTION FROM CSTMS_CLASS WHERE CLASS_TYPE = ''PR'' AND RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' AND MODULE = ''SD'' ORDER BY CLASS_CODE',
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
('LOV_PYREFNO',
'VPDLIQON',
'SELECT DISTINCT PAYMENT_REF_NO FROM VPTBS_VPLIQ_MASTER WHERE SUBSTR(PAYMENT_REF_NO,1,3) = GLOBAL.CURRENT_BRANCH ORDER BY PAYMENT_REF_NO',
100,'PAYMENT_REF_NO!TEXT!PAYMENT_REF_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_QUERY',
'EDDMATCH',
'SELECT BRANCH_CODE FROM STTM_BRANCH WHERE RECORD_STAT=''O'' AND ONCE_AUTH=''Y''',
'','BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','EDVWS_EDDMATCH.BRN',
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
('LOV_QUERY_NO',
'MSDCOMMS',
'SELECT CODE, CODE_DESC FROM MSTBS_COMMSG_CODES WHERE TAG = ''75'' AND CATEGORY IN (SUBSTR(?, 1, 1), ''ALL'') ORDER BY CODE',
300,'CODE!TEXT!CODE~CODE_DESC!TEXT!CODE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_QUEUE',
'MSDINBRS',
'select distinct queue from smtbs_queue_rights where (user_role_id = global.user_id and user_role_flag = ''U'') or (user_role_flag = ''R'' and user_role_id in (select distinct role_id from smtbs_user_role where user_id = global.user_id))ORDER BY QUEUE',
500,'QUEUE!TEXT!QUEUE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_QUEUE',
'MSDINRUT',
'select queue, description from smtbs_queues where auth_stat = ''A'' and record_stat = ''O'' ORDER BY queue',
100,'QUEUE!TEXT!QUEUE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_QUEUE',
'MSDPRMAP',
'SELECT queue, description FROM (SELECT DISTINCT a.queue, a.description  FROM smtbs_queues a, mstbs_swift_msgs_queue b WHERE a.once_auth = ''Y'' AND a.record_stat = ''O'' AND  a.queue = b.queue AND ''MT'' || b.msg_code =  decode(substr(?, 1, 2), ''MT'', ?, ''MT'' || ?) UNION  SELECT DISTINCT a.queue, a.description FROM smtbs_queues a, mstbs_swift_msgs_queue b, mstms_com_pay_types c   WHERE a.once_auth = ''Y'' AND a.record_stat = ''O'' AND  ''MT'' || b.msg_code =  decode(substr(?, 1, 2), ''MT'', ?, ''MT'' || ?) AND b.msg_code = c.msg_type) WHERE 1 = 1  ORDER BY 1',
100,'QUEUE!TEXT!QUEUE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_QUEUES',
'SMDROLDF',
'SELECT QUEUE, DESCRIPTION FROM SMTB_QUEUES WHERE RECORD_STAT=''O'' AND ONCE_AUTH=''Y'' ORDER BY QUEUE',
100,'QUEUE!TEXT!QUEUE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_QUEUES',
'SMDUSRDF',
'SELECT QUEUE,DESCRIPTION FROM SMTB_QUEUES WHERE RECORD_STAT = ''O'' AND ONCE_AUTH=''Y'' ORDER BY QUEUE',
500,'QUEUE!TEXT!QUEUE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_QUEUES1',
'MSDMTUDF',
'select queue,description from (select a.queue,a.description from smtbs_queues  A, MSTBS_SWIFT_MSGS_QUEUE B where A.once_auth = ''Y'' and  A.record_stat = ''O'' and  a.queue=b.queue and b.msg_code like ?) where 1=1 order by queue',
100,'QUEUE!TEXT!QUEUE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_QUEUES2',
'MSDMTUDF',
'select queue,description from (select a.queue,a.description from smtbs_queues  A, MSTBS_SWIFT_MSGS_QUEUE B where A.once_auth = ''Y'' and  A.record_stat = ''O'' and  a.queue=b.queue and b.msg_code like ?) where 1=1 order by queue',
100,'QUEUE!TEXT!QUEUE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_QUEUES3',
'MSDMTUDF',
'select queue,description from (select a.queue,a.description from smtbs_queues  A, MSTBS_SWIFT_MSGS_QUEUE B where A.once_auth = ''Y'' and  A.record_stat = ''O'' and  a.queue=b.queue and b.msg_code like ?) where 1=1 order by queue',
100,'QUEUE!TEXT!QUEUE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_QUEUES4',
'MSDMTUDF',
'select queue,description from (select a.queue,a.description from smtbs_queues  A, MSTBS_SWIFT_MSGS_QUEUE B where A.once_auth = ''Y'' and  A.record_stat = ''O'' and  a.queue=b.queue and b.msg_code like ?) where 1=1 order by queue',
100,'QUEUE!TEXT!QUEUE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_QUEUES5',
'MSDMTUDF',
'select queue,description from (select a.queue,a.description from smtbs_queues  A, MSTBS_SWIFT_MSGS_QUEUE B where A.once_auth = ''Y'' and  A.record_stat = ''O'' and  a.queue=b.queue and b.msg_code like ?) where 1=1 order by queue',
100,'QUEUE!TEXT!QUEUE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE',
'DVDPRMNT',
'select ccy_rate_type,ccy_rate_type_desc from cytm_rate_type where               auth_stat = ''A'' and record_stat = ''O'' order by ccy_rate_type',
100,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE',
'SFCPLCON',
'SELECT * FROM ' || chr(10) || '(SELECT DISTINCT RATE_CODE FROM ICTMS_RATE_DEF R WHERE R.RECORD_STAT=''O'' AND R.AUTH_STAT = ''A'' AND R.CCY_CODE = ? ' || chr(10) || 'ORDER BY RATE_CODE)' || chr(10) || '',
200,'RATE_CODE!TEXT!RATE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATECD',
'ICCREFPO',
'SELECT DISTINCT RATE_CODE FROM ICTMS_RATE_DEF R WHERE R.RECORD_STAT=''O'' AND R.ONCE_AUTH = ''Y''',
'','RATE_CODE!TEXT!RATE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATECODE',
'CFCONINT',
'SELECT RATE_CODE,RATE_CODE_DESCRIPTION FROM CFTMS_RATE_CODE_DEFN WHERE RECORD_STAT=''O'' AND AUTH_STAT=''A'' ORDER BY RATE_CODE',
100,'RATE_CODE!TEXT!RATECODE~RATE_CODE_DESCRIPTION!TEXT!TENCODESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATECODE',
'ICCPLCON',
'select distinct rate_code from ictms_rate_def r where r.record_stat=''O'' And r.once_auth = ''Y'' and r.ccy_code = ? order by rate_code',
100,'RATE_CODE!TEXT!RATE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATECODE',
'ISCPLCON',
'select distinct rate_code from ictms_rate_def r where r.record_stat=''O'' And r.auth_stat = ''A'' and r.ccy_code = ? order by rate_code',
100,'RATE_CODE!TEXT!RATE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATECODE',
'ISCTXMIS',
'select distinct a.rate_code, a.rate_descr from cftms_rate_code a,' || chr(10) || '               cftms_float_rate_master b where a.rate_code = b.rate_code and' || chr(10) || '               a.record_stat = ''O'' and a.auth_stat = ''A'' and a.branch_code =' || chr(10) || '               b.branch_code Order By rate_code',
100,'RATE_CODE!TEXT!RATE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATECODE',
'MGDSCHEM',
'select ccy_rate_type,ccy_rate_type_desc from cytm_rate_type where nvl(ONCE_AUTH,''N'')=''Y'' and RECORD_STAT=''O'' order by ccy_rate_type',
100,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATECODE',
'MICJRMIS',
'select distinct a.rate_code, a.rate_descr from cftms_rate_code a,cftms_float_rate_master b where a.rate_code = b.rate_code and a.record_stat = ''O'' and a.auth_stat = ''A'' and b.ccy_code = ? and a.branch_code = GLOBAL.CURRENT_BRANCH and a.branch_code = b.branch_code',
500,'RATE_CODE!TEXT!RATE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATECODE',
'MICMOMIS',
'select distinct a.rate_code, a.rate_descr from cftms_rate_code a,' || chr(10) || '             cftms_float_rate_master b where a.rate_code = b.rate_code and' || chr(10) || '             a.record_stat = ''O'' and a.auth_stat = ''A'' and b.ccy_code = ? and' || chr(10) || '             a.branch_code = ? and a.branch_code = b.branch_code',
10,'RATE_CODE!TEXT!A.RATE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATECODE',
'MICTXMIS',
'select distinct a.rate_code, a.rate_descr from cftms_rate_code a, cftms_float_rate_master b where a.rate_code = b.rate_code and a.record_stat = ''O'' and a.auth_stat = ''A'' and a.branch_code = b.branch_code' || chr(10) || '',
100,'RATE_CODE!TEXT!A.RATE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATES',
'ICCHSPCN',
'SELECT DISTINCT rate_code FROM   ictms_rate_def r WHERE  r.record_stat = ''O'' AND r.auth_stat = ''A''',
100,'RATE_CODE!TEXT!RATE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATETYPE',
'DEDRTPRM',
'select ccy_rate_type,ccy_rate_type_desc from cytm_rate_type where once_auth = ''Y'' and record_stat = ''O'' order by ccy_rate_type',
100,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATETYPE',
'FXDDIRAT',
'SELECT CCY_RATE_TYPE , CCY_RATE_TYPE_DESC FROM CYTMS_RATE_TYPE WHERE RECORD_STAT=''O'' AND AUTH_STAT =''A''',
100,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATETYPE',
'FXDQIRAT',
'select ccy_rate_type , ccy_rate_type_desc from cytms_rate_type where record_stat=''O'' order by ccy_rate_type',
100,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATETYPE',
'UPDPRDMN',
'select ccy_rate_type,ccy_rate_type_desc from cytm_rate_type where once_auth = ''Y'' and record_stat = ''O'' order by ccy_rate_type',
100,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATETYPE_REF',
'SIDPRMNT',
'select ccy_rate_type, ccy_rate_type_desc from cytms_rate_type where record_stat=''O'' and auth_stat =''A''',
500,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'BCDPRMNT',
'select rate_code, rate_descr from cftms_rate_code where' || chr(10) || '               record_stat = ''O'' and ONCE_AUTH= ''Y'' and branch_code =' || chr(10) || '               GLOBAL.CURRENT_BRANCH order by rate_code',
100,'RATE_CODE!TEXT!RATE_CODE~RATE_DESCR!TEXT!RATE_DESCR',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'CFCINCLS',
'select rate_code, rate_descr from cftms_rate_code where record_stat = ''O'' and auth_stat = ''A'' and branch_code = global.current_branch',
100,'RATE_CODE!TEXT!RATE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'CFDFLRAT',
'select rate_code,rate_code_description from cftms_rate_code_defn where once_auth = ''Y'' and record_stat = ''O'' order by rate_code',
100,'RATE_CODE!TEXT!RATE_CODE~RATE_CODE_DESCRIPTION!TEXT!RATE_CODE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'CFDINCLS',
'select rate_code, rate_descr from cftms_rate_code where record_stat = ''O'' and auth_stat = ''A'' and branch_code = global.current_branch order by rate_code',
100,'RATE_CODE!TEXT!RATE_CODE~RATE_DESCR!TEXT!RATE_DESCR',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'CFDINTCL',
'SELECT RATE_CODE,RATE_CODE_DESCRIPTION FROM CFTMS_RATE_CODE_DEFN WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY RATE_CODE',
100,'RATE_CODE!TEXT!RATE_CODE~RATE_CODE_DESCRIPTION!TEXT!RATE_CODE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'CFDRUMNT',
'SELECT DISTINCT CCY_RATE_TYPE FROM CYTM_RATE_TYPE WHERE ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O''',
100,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'CIDACCDT',
'select distinct rate_code from cftms_rate_code where auth_stat = ''A'' and record_stat = ''O'' and branch_code = ?',
50,'RATE_CODE!TEXT!RATE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'CLDACCDT',
'SELECT *' || chr(10) || '  FROM (select CUST_AC_NO rate_code, branch_code, ''TD RATE'' as RATE_TYPE' || chr(10) || '          from sttms_cust_account a' || chr(10) || '         where account_type = ''Y''' || chr(10) || '           and auth_stat = ''A''' || chr(10) || '           and record_stat = ''O''' || chr(10) || '           and cust_no = ?' || chr(10) || '           and not exists' || chr(10) || '         (select 1' || chr(10) || '                  from sttms_account_class b' || chr(10) || '                 where (b.denm_deposit = ''Y'' or b.RD_FLAG = ''Y'' or' || chr(10) || '                       nvl(b.mudarabah_acc_class, ''N'') = ''Y'')' || chr(10) || '                   and b.account_class = a.account_class)' || chr(10) || '           and a.ac_open_date <= NVL(?, ?)' || chr(10) || '           and ccy = ?' || chr(10) || '           AND a.master_account_no is null' || chr(10) || '        union' || chr(10) || '        select distinct C.rate_code,' || chr(10) || '                        NULL branch_code,' || chr(10) || '                        ''FLOAT RATE'' as RATE_TYPE' || chr(10) || '          FROM CFTMS_RATE_CODE C, CFTMS_RATE_CCY D' || chr(10) || '         WHERE C.RATE_CODE = D.RATE_CODE' || chr(10) || '           AND C.BRANCH_CODE = D.BRANCH_CODE' || chr(10) || '           AND C.AUTH_STAT = ''A''' || chr(10) || '           AND C.RECORD_STAT = ''O''' || chr(10) || '  AND C.BRANCH_CODE = ?' || chr(10) || '           AND D.CCY_CODE = ?' || chr(10) || '         ORDER BY RATE_CODE)' || chr(10) || ' WHERE 1 = 1',
50,'RATE_CODE!TEXT!RATE_CODE~BRANCH_CODE!TEXT!BRANCH_CODE~RATE_TYPE!TEXT!RATE_TYPE',
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
('LOV_RATE_CODE',
'CLDCROLL',
'select CUST_AC_NO rate_code, branch_code, ''TD RATE'' as RATE_TYPE' || chr(10) || '  from sttms_cust_account a' || chr(10) || ' where account_type = ''Y''' || chr(10) || '   and auth_stat = ''A''' || chr(10) || '   and record_stat = ''O''' || chr(10) || '   and cust_no = ?' || chr(10) || '   and not exists' || chr(10) || ' (select 1' || chr(10) || '          from sttms_account_class b' || chr(10) || '         where (b.denm_deposit = ''Y'' or' || chr(10) || '               b.RD_FLAG = ''Y'' or nvl(b.mudarabah_acc_class, ''N'') = ''Y'')' || chr(10) || '           and b.account_class = a.account_class)' || chr(10) || '   and a.ac_open_date <= ?' || chr(10) || '   and ccy = ?' || chr(10) || '   AND a.master_account_no is null' || chr(10) || 'union' || chr(10) || 'select distinct rate_code, NULL branch_code, ''FLOAT RATE'' as RATE_TYPE' || chr(10) || '  from cftms_rate_code' || chr(10) || ' where auth_stat = ''A''' || chr(10) || '   and record_stat = ''O''' || chr(10) || '   and branch_code = ?' || chr(10) || ' order by rate_code',
50,'RATE_CODE!TEXT!RATE_CODE~BRANCH_CODE!TEXT!BRANCH_CODE~RATE_TYPE!TEXT!RATE_TYPE',
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
('LOV_RATE_CODE',
'CLDLOTEM',
'select distinct rate_code from cftms_rate_code where auth_stat = ''A'' and record_stat = ''O'' and branch_code = ?',
50,'RATE_CODE!TEXT!RATE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'CLDPRMNT',
'SELECT DISTINCT a.rate_type ccy_rate_code, c.ccy_rate_type_desc ccy_rate_desc FROM cytms_rates a, cytms_rates_master b, cytms_rate_type c WHERE a.rate_type = c.ccy_rate_type AND a.branch_code = b.branch_code AND a.ccy1 = b.ccy1 AND a.ccy2 = b.ccy2 AND b.auth_stat = ''A'' AND a.branch_code = global.current_branch',
100,'CCY_RATE_CODE!TEXT!CCY_RATE_CODE~CCY_RATE_DESC!TEXT!CCY_RATE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'CLDSROLL',
'select CUST_AC_NO rate_code, branch_code, ''TD RATE'' as RATE_TYPE' || chr(10) || '  from sttms_cust_account a' || chr(10) || ' where account_type = ''Y''' || chr(10) || '   and auth_stat = ''A''' || chr(10) || '   and record_stat = ''O''' || chr(10) || '   and (cust_no, ccy) in (select customer_id, currency' || chr(10) || '                            from cltbs_account_master' || chr(10) || '                           where account_number = ?)' || chr(10) || '   and not exists' || chr(10) || ' (select 1' || chr(10) || '          from sttms_account_class b' || chr(10) || '         where (b.denm_deposit = ''Y'' or' || chr(10) || '               b.RD_FLAG = ''Y'' or nvl(b.mudarabah_acc_class, ''N'') = ''Y'')' || chr(10) || '           and b.account_class = a.account_class)' || chr(10) || '   and a.ac_open_date <= ?' || chr(10) || '   AND a.master_account_no is null' || chr(10) || 'union' || chr(10) || 'select distinct rate_code, NULL branch_code, ''FLOAT RATE'' as RATE_TYPE' || chr(10) || '  from cftms_rate_code' || chr(10) || ' where auth_stat = ''A''' || chr(10) || '   and record_stat = ''O''' || chr(10) || '   and branch_code = ?' || chr(10) || ' order by rate_code',
50,'RATE_CODE!TEXT!RATE_CODE~BRANCH_CODE!TEXT!BRANCH_CODE~RATE_TYPE!TEXT!RATE_TYPE',
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
('LOV_RATE_CODE',
'CLDUDVMT',
'select rate_code,Quote_basis from clvw_ratelov where CCY_CODE = ?',
'','RATE_CODE!TEXT!RATE_CODE~QUOTE_BASIS!TEXT!QUOTE_BASIS',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'DVDBRRAT',
'select rate_code, rate_code_description from cftm_rate_code_defn where record_stat = ''O'' and once_auth = ''Y'' order by rate_code',
100,'RATE_CODE!TEXT!RATE_CODE~RATE_CODE_DESCRIPTION!TEXT!RATE_CODE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'FXDPRMNT',
'select rate_code, rate_descr from cftms_rate_code where record_stat = ''O'' and auth_stat = ''A'' and branch_code = global.current_branch order by rate_code',
500,'RATE_CODE!TEXT!RATE_CODE~RATE_DESCR!TEXT!RATE_DESCR',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'IADPDUDE',
'select distinct RATE_CODE from ICTM_RATE_DEF where (BRANCH_CODE =GLOBAL.CURRENT_BRANCH OR BRANCH_CODE = ''ALL'')AND   RECORD_STAT = ''O''AND AUTH_STAT =''A'' AND CCY_CODE  = ?',
100,'RATE_CODE!TEXT!RATE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'ICDUDVAL',
'select distinct rate_code from ICVWS_RES_ICRATES order by rate_code',
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
('LOV_RATE_CODE',
'IPDUDVAL',
'select distinct rate_code from ICVWS_RES_ICRATES order by rate_code',
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
('LOV_RATE_CODE',
'ISCINCLS',
'select rate_code, rate_descr from cftms_rate_code where record_stat = ''O'' and auth_stat = ''A'' and branch_code = global.current_branch Order By  rate_code',
100,'RATE_CODE!TEXT!RATE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'ISCTXMIS',
'select distinct a.rate_code, a.rate_descr from cftms_rate_code a,' || chr(10) || '               cftms_float_rate_master b where a.rate_code = b.rate_code and' || chr(10) || '               a.record_stat = ''O'' and a.auth_stat = ''A'' and a.branch_code =' || chr(10) || '               b.branch_codeOrder BY rate_code',
100,'RATE_CODE!TEXT!RATE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'LCDPRMNT',
'SELECT RATE_CODE,RATE_DESCR FROM CFTMS_RATE_CODE WHERE RECORD_STAT=''O'' AND AUTH_STAT=''A'' AND BRANCH_CODE=GLOBAL.CURRENT_BRANCH ORDER BY RATE_CODE',
100,'RATE_CODE!TEXT!RATE_CODE~RATE_DESCR!TEXT!RATE_DESCR',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'LEDACCDT',
'select CUST_AC_NO rate_code, branch_code, ''TD RATE'' as RATE_TYPE' || chr(10) || '  from sttms_cust_account a' || chr(10) || ' where account_type = ''Y''' || chr(10) || '   and auth_stat = ''A''' || chr(10) || '   and record_stat = ''O''' || chr(10) || '   and cust_no = ?' || chr(10) || '   and not exists' || chr(10) || ' (select 1' || chr(10) || '          from sttms_account_class b' || chr(10) || '         where (b.denm_deposit = ''Y'' or' || chr(10) || '               b.RD_FLAG = ''Y'' or nvl(b.mudarabah_acc_class, ''N'') = ''Y'')' || chr(10) || '           and b.account_class = a.account_class)' || chr(10) || '   and a.ac_open_date <= nvl(?,?)' || chr(10) || '   and ccy = ?' || chr(10) || '   AND a.master_account_no is null' || chr(10) || 'union' || chr(10) || 'select distinct rate_code, NULL branch_code, ''FLOAT RATE'' as RATE_TYPE' || chr(10) || '  from cftms_rate_code' || chr(10) || ' where auth_stat = ''A''' || chr(10) || '   and record_stat = ''O''' || chr(10) || '   and branch_code = ?' || chr(10) || ' order by rate_code',
50,'RATE_CODE!TEXT!RATE_CODE~BRANCH_CODE!TEXT!BRANCH_CODE~RATE_TYPE!TEXT!RATE_TYPE',
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
('LOV_RATE_CODE',
'LMDLIMIT',
'select distinct rate_code from cftms_rate_code where auth_stat = ''A'' and record_stat = ''O'' and branch_code = ?',
150,'RATE_CODE!TEXT!RATE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'LSDTRONL',
'select distinct rate_code from cftms_rate_code where auth_stat = ''A'' and record_stat = ''O'' and branch_code = ?',
50,'RATE_CODE!TEXT!RATE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'MCDPRMNT',
'select rate_code, rate_descr from cftms_rate_code where record_stat = ''O'' and auth_stat = ''A''Order By rate_code',
100,'RATE_CODE!TEXT!RATE_CODE~RATE_DESCR!TEXT!RATE_DESCR',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'MICJRMIS',
'select distinct a.rate_code, a.rate_descr from cftms_rate_code a,cftms_float_rate_master b where a.rate_code = b.rate_code and a.record_stat = ''O'' and a.auth_stat = ''A'' and b.ccy_code = ? and  a.branch_code =? and a.branch_code = b.branch_code',
500,'RATE_CODE!TEXT!RATE_CODE~RATE_DESCR!TEXT!RATE_DESCR',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'MICMOMIS',
'select distinct a.rate_code, a.rate_descr from cftms_rate_code a,' || chr(10) || '             cftms_float_rate_master b where a.rate_code = b.rate_code and' || chr(10) || '             a.record_stat = ''O'' and a.auth_stat = ''A'' and b.ccy_code = ?and' || chr(10) || '             a.branch_code =? and a.branch_code = b.branch_code',
100,'RATE_CODE!TEXT!RATE_CODE~RATE_DESCR!TEXT!RATE_DESCR',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'MICTXMIS',
'select distinct a.rate_code, a.rate_descr from cftms_rate_code a, cftms_float_rate_master b where a.rate_code = b.rate_code and a.record_stat = ''O'' and a.auth_stat = ''A'' and a.branch_code = b.branch_code' || chr(10) || '',
100,'RATE_CODE!TEXT!RATE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'MIDGLPOL',
'select distinct rate_code from ictms_rate_def where record_stat = ''O''and ONCE_AUTH = ''Y'' ORDER BY RATE_CODE',
100,'RATE_CODE!TEXT!REF_RATE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'MMDPRMNT',
'select rate_code, rate_descr from cftms_rate_code where record_stat = ''O'' and auth_stat = ''A''',
100,'RATE_CODE!TEXT!RATE_CODE~RATE_DESCR!TEXT!RATE_DESCR',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'MODACCDT',
'',50,'RATE_CODE!TEXT!RATE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'OTDCNONL',
'SELECT RATE_CODE,RATE_CODE_DESCRIPTION FROM CFTMS_RATE_CODE_DEFN WHERE AUTH_STAT=''A'' AND RECORD_STAT=''O'' ORDER BY RATE_CODE',
100,'RATE_CODE!TEXT!RATE_CODE~RATE_CODE_DESCRIPTION!TEXT!RATE_CODE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'PDDPRMNT',
'select rate_code, rate_descr from cftms_rate_code where record_stat = ''O'' and once_auth = ''Y'' and branch_code = global.current_branch',
500,'RATE_CODE!TEXT!RATE_CODE~RATE_DESCR!TEXT!RATE_DESCR',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'SEDMKTCD',
'select rate_code,rate_code_description from tatms_issr_tax_rate_code where auth_stat = ''A'' and record_stat = ''O'' order by rate_code',
100,'RATE_CODE!TEXT!RATE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'SEDSEONL',
'SELECT RATE_CODE,RATE_CODE_DESCRIPTION FROM( SELECT A.RATE_CODE RATE_CODE,' || chr(10) || 'A.RATE_CODE_DESCRIPTION RATE_CODE_DESCRIPTION' || chr(10) || 'FROM TATMS_ISSR_TAX_RATE_CODE A, TATMS_ISSR_TAX_RATE B' || chr(10) || 'WHERE A.AUTH_STAT = ''A''' || chr(10) || 'AND A.RECORD_STAT = ''O''' || chr(10) || 'AND A.RATE_CODE = B.RATE_CODE' || chr(10) || 'AND B.TAX_CCY = ?) WHERE 1=1' || chr(10) || '',
100,'RATE_CODE!TEXT!RATE_CODE~RATE_CODE_DESCRIPTION!TEXT!RATE_CODE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'SIDPRMNT',
'select rate_code, rate_descr from cftms_rate_code where record_stat = ''O'' and auth_stat = ''A'' and branch_code = global.current_branch',
500,'RATE_CODE!TEXT!RATE_CODE~RATE_DESCR!TEXT!RATE_DESCR',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'SRDPRMNT',
'select rate_code, rate_descr from cftms_rate_code where record_stat = ''O'' and auth_stat = ''A''',
100,'RATE_CODE!TEXT!RATE_CODE~RATE_DESCR!TEXT!RATE_DESCR',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'TACTAXCL',
'SELECT RATE_CODE,RATE_CODE_DESCRIPTION FROM TATMS_ISSR_TAX_RATE_CODE WHERE AUTH_STAT = ''A'' AND RECORD_STAT = ''O'' ORDER BY RATE_CODE',
100,'RATE_CODE!TEXT!RATE_CODE~RATE_CODE_DESCRIPTION!TEXT!RATE_CODE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'TADRATE',
'SELECT RATE_CODE,RATE_CODE_DESCRIPTION FROM TATMS_ISSR_TAX_RATE_CODE WHERE ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O'' ORDER BY RATE_CODE',
100,'RATE_CODE!TEXT!RATE_CODE~RATE_CODE_DESCRIPTION!TEXT!RATE_CODE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_CODE',
'TADTAXCL',
'select rate_code,rate_code_description from tatms_issr_tax_rate_code where auth_stat = ''A'' and record_stat = ''O'' order by rate_code',
100,'RATE_CODE!TEXT!RATE_CODE~RATE_CODE_DESCRIPTION!TEXT!RATE_CODE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_SOURCE',
'CFDFLRAT',
'select rate_source, rate_source_description from cftms_rate_source_defn where record_stat = ''O'' and once_auth = ''Y'' order by rate_source',
100,'RATE_SOURCE!TEXT!RATE_SOURCE~RATE_SOURCE_DESCRIPTION!TEXT!RATE_SOURCE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_SOURCE',
'CFDINTCL',
'SELECT RATE_SOURCE,RATE_SOURCE_DESCRIPTION FROM CFTMS_RATE_SOURCE_DEFN WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY RATE_SOURCE',
100,'RATE_SOURCE!TEXT!RATE_SOURCE~RATE_SOURCE_DESCRIPTION!TEXT!RATE_SOURCE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_SOURCE',
'DVDBRRAT',
'select rate_source, rate_source_description from cftm_rate_source_defn where record_stat = ''O'' and once_auth = ''Y'' order by rate_source',
100,'RATE_SOURCE!TEXT!RATE_SOURCE~RATE_SOURCE_DESCRIPTION!TEXT!RATE_SOURCE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_SOURCE',
'OTDCNONL',
'SELECT RATE_SOURCE,RATE_SOURCE_DESCRIPTION FROM CFTMS_RATE_SOURCE_DEFN WHERE RECORD_STAT=''O'' AND AUTH_STAT=''A'' ORDER BY RATE_SOURCE',
100,'RATE_SOURCE!TEXT!RATE_SOURCE~RATE_SOURCE_DESCRIPTION!TEXT!RATE_SOURCE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TO_USE',
'CLDPRMNT',
'Select item_name from cltm_product_dynamic_data where ACTION_CODE = ''POPRATEUSE'' and product_code =?',
100,'ITEM_NAME!TEXT!ITEM_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'BCDPRMNT',
'select ccy_rate_type,ccy_rate_type_desc from cytm_rate_type where' || chr(10) || '               record_stat=''O'' and ONCE_AUTH=''Y''order by ccy_rate_type',
100,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'CFDFLRAT',
'select rate_type,rate_type_description from cftms_rate_type_defn where once_auth = ''Y'' and record_stat = ''O'' and rate_type not in(select rate_type from cftms_rate_detail where branch =? and rate_code =? and tenor_code =? and rate_source =? and ccy_code =? and effective_date =?) order by rate_type',
100,'RATE_TYPE!TEXT!RATE_TYPE~RATE_TYPE_DESCRIPTION!TEXT!RATE_TYPE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'CLDFNPRD',
'select ccy_rate_type,ccy_rate_type_desc from cytm_rate_type where auth_stat = ''A'' and record_stat = ''O'' order by ccy_rate_type',
100,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'CLDPRMNT',
'select ccy_rate_type,ccy_rate_type_desc from CYTM_RATE_TYPE where record_stat = ''O'' AND auth_stat = ''A''',
100,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'CODQRATE',
'select ccy_rate_type,ccy_rate_type_desc from cytm_rate_type where record_stat = ''O'' and once_auth = ''Y'' order by 1',
100,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'CODRATES',
'SELECT CCY_RATE_TYPE, CCY_RATE_TYPE_DESC FROM CYTMS_RATE_TYPE WHERE RECORD_STAT=''O'' AND ONCE_AUTH= ''Y'' AND CCY_RATE_TYPE NOT IN ( SELECT RATE_TYPE FROM CYTMS_RATES WHERE CCY1 = ? AND CCY2 = ? )AND 1=1',
200,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'CSCACADD',
'select ccy_rate_type, ccy_rate_type_desc from cytm_rate_type where auth_stat=''A'' and once_auth=''Y'' order by ccy_rate_type',
100,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'CSDPXMNT',
'SELECT CCY_RATE_TYPE , CCY_RATE_TYPE_DESC FROM CYTMS_RATE_TYPE WHERE RECORD_STAT=''O'' AND ONCE_AUTH =''Y'' ORDER BY CCY_RATE_TYPE',
100,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'CYDQRATE',
'select ccy_rate_type,ccy_rate_type_desc from cytm_rate_type where record_stat = ''O'' and once_auth = ''Y'' order by 1',
100,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'EDDDLPRD',
'SELECT ccy_rate_type, ccy_rate_type_desc FROM cytm_rate_type WHERE once_auth = ''Y'' AND record_stat = ''O'' ORDER BY ccy_rate_type',
'','CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'EDDPFPRD',
'SELECT ccy_rate_type, ccy_rate_type_desc FROM cytm_rate_type WHERE once_auth = ''Y'' AND record_stat = ''O'' ORDER BY ccy_rate_type',
'','CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'ENDINPRO',
'SELECT ccy_rate_type, ccy_rate_type_desc FROM cytm_rate_type WHERE once_auth = ''Y'' AND record_stat = ''O'' ORDER BY ccy_rate_type',
'','CCY_RATE_TYPE!TEXT!~CCY_RATE_TYPE_DESC!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'FADPRMNT',
'SELECT CCY_RATE_TYPE,CCY_RATE_TYPE_DESC FROM CYTM_RATE_TYPE WHERE ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O'' ORDER BY CCY_RATE_TYPE',
100,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'FTDPRMNT',
'select ccy_rate_type,ccy_rate_type_desc from cytms_rate_type where record_stat=''O'' and ONCE_AUTH=''Y'' ORDER BY ccy_rate_type',
100,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'ICDPRMNT',
'SELECT CCY_RATE_TYPE,CCY_RATE_TYPE_DESC FROM CYTMS_RATE_TYPE WHERE RECORD_STAT=''O'' AND ONCE_AUTH=''Y''',
100,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'ILDSWEEP',
'select ccy_rate_type,ccy_rate_type_desc from cytm_rate_type where record_stat = ''O'' and auth_stat = ''A'' order by 1',
100,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'LCDPRMNT',
'SELECT CCY_RATE_TYPE,CCY_RATE_TYPE_DESC FROM CYTM_RATE_TYPE WHERE RECORD_STAT=''O'' AND AUTH_STAT=''A'' ORDER BY CCY_RATE_TYPE',
100,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'MGDCPROD',
'SELECT ccy_rate_type, ccy_rate_type_desc FROM cytm_rate_type WHERE once_auth = ''Y'' AND record_stat = ''O'' ORDER BY ccy_rate_type',
'','CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'OTDCNONL',
'SELECT CCY_RATE_TYPE,CCY_RATE_TYPE_DESC FROM CYTM_RATE_TYPE WHERE AUTH_STAT=''A'' AND RECORD_STAT=''O'' ORDER BY CCY_RATE_TYPE',
100,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'OTDPRMNT',
'select ccy_rate_type, ccy_rate_type_desc from cytm_rate_type where once_auth = ''Y'' and record_stat = ''O''',
100,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'PCDPRMNT',
'select ccy_rate_type,ccy_rate_type_desc from cytms_rate_type where once_auth = ''Y'' and record_stat = ''O'' order by ccy_rate_type',
'','CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'PDDPRMNT',
'select ccy_rate_type, ccy_rate_type_desc from cytm_rate_type where once_auth = ''Y'' and record_stat = ''O'' order by ccy_rate_type',
500,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'RVDSETUP',
'SELECT CCY_RATE_TYPE , CCY_RATE_TYPE_DESC FROM CYTMS_RATE_TYPE WHERE RECORD_STAT=''O'' AND ONCE_AUTH=''Y''',
500,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'SEDDLPRD',
'select ccy_rate_type,ccy_rate_type_desc from cytm_rate_type where once_auth = ''Y'' and record_stat = ''O'' order by ccy_rate_type',
'','CCY_RATE_TYPE!TEXT!~CCY_RATE_TYPE_DESC!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'SEDDPFCL',
'SELECT CCY_RATE_TYPE, CCY_RATE_TYPE_DESC FROM CYTMS_RATE_TYPE WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY CCY_RATE_TYPE',
100,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'SEDPFPRD',
'SELECT CCY_RATE_TYPE,CCY_RATE_TYPE_DESC FROM CYTMS_RATE_TYPE WHERE ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O'' ORDER BY CCY_RATE_TYPE',
'','CCY_RATE_TYPE!TEXT!~CCY_RATE_TYPE_DESC!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'SEDSEPRD',
'SELECT CCY_RATE_TYPE,CCY_RATE_TYPE_DESC FROM CYTMS_RATE_TYPE WHERE ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O'' ORDER BY CCY_RATE_TYPE',
'','CCY_RATE_TYPE!TEXT!~CCY_RATE_TYPE_DESC!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'SLDPRMNT',
'SELECT CCY_RATE_TYPE,CCY_RATE_TYPE_DESC FROM CYTM_RATE_TYPE WHERE ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O'' ORDER BY CCY_RATE_TYPE',
200,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'TADRATE',
'SELECT CCY_RATE_TYPE,CCY_RATE_TYPE_DESC FROM CYTMS_RATE_TYPE WHERE ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O'' ORDER BY CCY_RATE_TYPE',
100,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE',
'XPDPRMNT',
'select ccy_rate_type,ccy_rate_type_desc from cytms_rate_type where once_auth = ''Y'' and record_stat = ''O'' order by ccy_rate_type',
'','CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPES',
'AMDFNPRD',
'select ccy_rate_type,ccy_rate_type_desc from cytm_rate_type where once_auth = ''Y'' and record_stat = ''O'' order by ccy_rate_type',
500,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPES',
'IADFNPRD',
'select ccy_rate_type,ccy_rate_type_desc from cytm_rate_type where once_auth = ''Y'' and record_stat = ''O'' order by ccy_rate_type',
500,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE_PREF',
'PCDPRMNT',
'select ccy_rate_type,ccy_rate_type_desc from cytms_rate_type where once_auth = ''Y'' and record_stat = ''O'' order by ccy_rate_type',
'','CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RATE_TYPE_PREF',
'XPDPRMNT',
'select ccy_rate_type, ccy_rate_type_desc from cytms_rate_type where record_stat = ''O'' and once_auth = ''Y'' order by ccy_rate_type',
'','CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RCVR',
'CLDMDSBR',
'Select * from (select c.bic_code,  decode(c.relationship,''M'',''Mail'',''K'',''Keys'',''No'') Relationship,c.bank_name,c.BANK_ADDRESS1,c.BANK_ADDRESS2,c.BANK_ADDRESS3 from istms_bic_directory c where c.auth_stat = ''A'' and c.record_stat = ''O'' AND NVL(c.sub_type_code,''$#'') IN ( SELECT  d.sub_type_code  FROM  istms_subtype_code d WHERE   d.be_indicator = ''N'') UNION select (a.network_prefix || a.network_code || b.clearing_code) xxxx,'''',b.bank_name,b.address_1,b.address_2,b.address_3 from istms_network_code a,     istms_clearing_code b where b.network_code = a.network_code and b.clearing_code_ind = ''Y'' and a.ccy_code IN (SELECT TAG_CCY FROM ISTBS_CONTRACTIS) and b.record_stat = ''O'' and b.auth_stat =''A'') where 1=1',
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
('LOV_RCVR_CORR',
'CLDMDSBR',
'Select * from (select c.bic_code,  decode(c.relationship,''M'',''Mail'',''K'',''Keys'',''No'') Relationship,c.bank_name,c.BANK_ADDRESS1,c.BANK_ADDRESS2,c.BANK_ADDRESS3 from istms_bic_directory c where c.auth_stat = ''A'' and c.record_stat = ''O'' AND NVL(c.sub_type_code,''$#'') IN ( SELECT  d.sub_type_code  FROM  istms_subtype_code d WHERE   d.be_indicator = ''N'') UNION select (a.network_prefix || a.network_code || b.clearing_code) xxxx,'''',b.bank_name,b.address_1,b.address_2,b.address_3 from istms_network_code a,     istms_clearing_code b where b.network_code = a.network_code and b.clearing_code_ind = ''Y'' and a.ccy_code IN (SELECT TAG_CCY FROM ISTBS_CONTRACTIS) and b.record_stat = ''O'' and b.auth_stat =''A'') where 1=1',
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
('LOV_RCVR_CORRES',
'CLDACCDT',
'select BIC_CODE,RELATIONSHIP,BANK_NAME,BANK_ADDRESS1,BANK_ADDRESS2,BANK_ADDRESS3 from(select c.bic_code, decode(c.relationship,''M'',''Mail'',''K'',''Keys'',''No'') Relationship,c.bank_name,c.BANK_ADDRESS1,c.BANK_ADDRESS2,c.BANK_ADDRESS3 from istms_bic_directory c where c.auth_stat = ''A'' and c.record_stat = ''O''AND NVL(c.sub_type_code,''$#'') IN ( SELECT  d.sub_type_code FROM istms_subtype_code d WHERE   d.be_indicator = ''N'')UNION select (a.network_prefix||a.network_code||b.clearing_code) xxxx,'''',b.bank_name, b.address_1, b.address_2, b.address_3 from istms_network_code a,istms_clearing_code b where b.network_code = a.network_code and b.clearing_code_ind = ''Y'' and a.ccy_code =? and b.record_stat = ''O'' and b.auth_stat =''A'') where 1=1',
100,'BIC_CODE!TEXT!BIC_CODE~BANK_NAME!TEXT!BANK_NAME~BANK_ADDRESS1!TEXT!BANK_ADDRESS1~BANK_ADDRESS2!TEXT!BANK_ADDRESS2~BANK_ADDRESS3!TEXT!BANK_ADDRESS3',
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
('LOV_RCVR_CORRES',
'CLDCROLL',
'select BIC_CODE,RELATIONSHIP,BANK_NAME,BANK_ADDRESS1,BANK_ADDRESS2,BANK_ADDRESS3 from(select c.bic_code, decode(c.relationship,''M'',''Mail'',''K'',''Keys'',''No'') Relationship,c.bank_name,c.BANK_ADDRESS1,c.BANK_ADDRESS2,c.BANK_ADDRESS3 from istms_bic_directory c where c.auth_stat = ''A'' and c.record_stat = ''O''AND NVL(c.sub_type_code,''$#'') IN ( SELECT  d.sub_type_code FROM istms_subtype_code d WHERE   d.be_indicator = ''N'')UNION select (a.network_prefix||a.network_code||b.clearing_code) xxxx,'''',b.bank_name, b.address_1, b.address_2, b.address_3 from istms_network_code a,istms_clearing_code b where b.network_code = a.network_code and b.clearing_code_ind = ''Y'' and a.ccy_code =? and b.record_stat = ''O'' and b.auth_stat =''A'') where 1=1',
100,'BIC_CODE!TEXT!BIC_CODE~BANK_NAME!TEXT!BANK_NAME~BANK_ADDRESS1!TEXT!BANK_ADDRESS1~BANK_ADDRESS2!TEXT!BANK_ADDRESS2~BANK_ADDRESS3!TEXT!BANK_ADDRESS3',
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
('LOV_RCVR_CORRES',
'CLDLOTEM',
'select BIC_CODE,RELATIONSHIP,BANK_NAME,BANK_ADDRESS1,BANK_ADDRESS2,BANK_ADDRESS3 from(select c.bic_code, decode(c.relationship,''M'',''Mail'',''K'',''Keys'',''No'') Relationship,c.bank_name,c.BANK_ADDRESS1,c.BANK_ADDRESS2,c.BANK_ADDRESS3 from istms_bic_directory c where c.auth_stat = ''A'' and c.record_stat = ''O''AND NVL(c.sub_type_code,''$#'') IN ( SELECT  d.sub_type_code FROM istms_subtype_code d WHERE   d.be_indicator = ''N'')UNION select (a.network_prefix||a.network_code||b.clearing_code) xxxx,'''',b.bank_name, b.address_1, b.address_2, b.address_3 from istms_network_code a,istms_clearing_code b where b.network_code = a.network_code and b.clearing_code_ind = ''Y'' and a.ccy_code =? and b.record_stat = ''O'' and b.auth_stat =''A'') where 1=1',
100,'BIC_CODE!TEXT!BIC_CODE~BANK_NAME!TEXT!BANK_NAME~BANK_ADDRESS1!TEXT!BANK_ADDRESS1~BANK_ADDRESS2!TEXT!BANK_ADDRESS2~BANK_ADDRESS3!TEXT!BANK_ADDRESS3',
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
('LOV_RCVR_CORRES',
'CLDMDSBR',
'select BIC_CODE,RELATIONSHIP,BANK_NAME,BANK_ADDRESS1,BANK_ADDRESS2,BANK_ADDRESS3 from(select c.bic_code, decode(c.relationship,''M'',''Mail'',''K'',''Keys'',''No'') Relationship,c.bank_name,c.BANK_ADDRESS1,c.BANK_ADDRESS2,c.BANK_ADDRESS3 from istms_bic_directory c where c.auth_stat = ''A'' and c.record_stat = ''O''AND NVL(c.sub_type_code,''$#'') IN ( SELECT  d.sub_type_code FROM istms_subtype_code d WHERE   d.be_indicator = ''N'')UNION select (a.network_prefix||a.network_code||b.clearing_code) xxxx,'''',b.bank_name, b.address_1, b.address_2, b.address_3 from istms_network_code a,istms_clearing_code b where b.network_code = a.network_code and b.clearing_code_ind = ''Y'' and a.ccy_code =? and b.record_stat = ''O'' and b.auth_stat =''A'') where 1=1',
100,'BIC_CODE!TEXT!BIC_CODE~BANK_NAME!TEXT!BANK_NAME~BANK_ADDRESS1!TEXT!BANK_ADDRESS1~BANK_ADDRESS2!TEXT!BANK_ADDRESS2~BANK_ADDRESS3!TEXT!BANK_ADDRESS3',
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
('LOV_RCVR_CORRES',
'CLDPMNT',
'select BIC_CODE,RELATIONSHIP,BANK_NAME,BANK_ADDRESS1,BANK_ADDRESS2,BANK_ADDRESS3 from(select c.bic_code, decode(c.relationship,''M'',''Mail'',''K'',''Keys'',''No'') Relationship,c.bank_name,c.BANK_ADDRESS1,c.BANK_ADDRESS2,c.BANK_ADDRESS3 from istms_bic_directory c where c.auth_stat = ''A'' and c.record_stat = ''O''AND NVL(c.sub_type_code,''$#'') IN ( SELECT  d.sub_type_code FROM istms_subtype_code d WHERE   d.be_indicator = ''N'')UNION select (a.network_prefix||a.network_code||b.clearing_code) xxxx,'''',b.bank_name, b.address_1, b.address_2, b.address_3 from istms_network_code a,istms_clearing_code b where b.network_code = a.network_code and b.clearing_code_ind = ''Y'' and a.ccy_code =? and b.record_stat = ''O'' and b.auth_stat =''A'') where 1=1',
100,'BIC_CODE!TEXT!BIC_CODE~BANK_NAME!TEXT!BANK_NAME~BANK_ADDRESS1!TEXT!BANK_ADDRESS1~BANK_ADDRESS2!TEXT!BANK_ADDRESS2~BANK_ADDRESS3!TEXT!BANK_ADDRESS3',
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
('LOV_RCVR_CORRES',
'CLDSWMSG',
'select BIC_CODE,RELATIONSHIP,BANK_NAME,BANK_ADDRESS1,BANK_ADDRESS2,BANK_ADDRESS3 from(select c.bic_code, decode(c.relationship,''M'',''Mail'',''K'',''Keys'',''No'') Relationship,c.bank_name,c.BANK_ADDRESS1,c.BANK_ADDRESS2,c.BANK_ADDRESS3 from istms_bic_directory c where c.auth_stat = ''A'' and c.record_stat = ''O''AND NVL(c.sub_type_code,''$#'') IN ( SELECT  d.sub_type_code FROM istms_subtype_code d WHERE   d.be_indicator = ''N'')UNION select (a.network_prefix||a.network_code||b.clearing_code) xxxx,'''',b.bank_name, b.address_1, b.address_2, b.address_3 from istms_network_code a,istms_clearing_code b where b.network_code = a.network_code and b.clearing_code_ind = ''Y'' and a.ccy_code =? and b.record_stat = ''O'' and b.auth_stat =''A'') where 1=1',
100,'BIC_CODE!TEXT!BIC_CODE~BANK_NAME!TEXT!BANK_NAME~BANK_ADDRESS1!TEXT!BANK_ADDRESS1~BANK_ADDRESS2!TEXT!BANK_ADDRESS2~BANK_ADDRESS3!TEXT!BANK_ADDRESS3',
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
('LOV_RCVR_CORRES',
'FTDRCST',
'select bic_code,relationship,bank_name from (select ''X'' || b.bic_code xxxx,       b.bic_code,       decode(b.relationship, ''K'', ''Keys'', ''M'', ''Mail'', ''No'') relationship,       b.bank_name  from istms_bic_directory b where b.auth_stat = ''A'' and b.record_stat = ''O''   UNION  select ''A'' || (a.network_prefix || a.network_code || b.clearing_code) xxxx,       (a.network_prefix || a.network_code || b.clearing_code),       '''',       b.bank_name  from istms_network_code a, istms_clearing_code b where b.network_code = a.network_code and b.record_stat = ''O'' and       b.auth_stat = ''A'') WHERE 1=1 order by xxxx',
100,'BIC_CODE!TEXT!BIC_CODE~RELATIONSHIP!TEXT!RELATIONSHIP~BANK_NAME!TEXT!BANK_NAME',
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
('LOV_RCVR_CORRES',
'ISCONDET',
'select BIC_CODE,RELATIONSHIP,BANK_NAME,BANK_ADDRESS1,BANK_ADDRESS2,BANK_ADDRESS3 from(select c.bic_code, decode(c.relationship,''M'',''Mail'',''K'',''Keys'',''No'') Relationship,c.bank_name,c.BANK_ADDRESS1,c.BANK_ADDRESS2,c.BANK_ADDRESS3 from istms_bic_directory c where c.auth_stat = ''A'' and c.record_stat = ''O''AND NVL(c.sub_type_code,''Z'') IN ( SELECT  d.sub_type_code FROM istms_subtype_code d WHERE   d.be_indicator = ''N'')UNION select (a.network_prefix||a.network_code||b.clearing_code) xxxx,'''',b.bank_name, b.address_1, b.address_2, b.address_3 from istms_network_code a,istms_clearing_code b where b.network_code = a.network_code and b.clearing_code_ind = ''Y'' and a.ccy_code =? and b.record_stat = ''O'' and b.auth_stat =''A'') where 1=1',
100,'BIC_CODE!TEXT!BIC_CODE~BANK_NAME!TEXT!BANK_NAME~BANK_ADDRESS1!TEXT!BANK_ADDRESS1~BANK_ADDRESS2!TEXT!BANK_ADDRESS2~BANK_ADDRESS3!TEXT!BANK_ADDRESS3',
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
('LOV_RCVR_CORRES',
'LEDACCDT',
'select BIC_CODE,RELATIONSHIP,BANK_NAME,BANK_ADDRESS1,BANK_ADDRESS2,BANK_ADDRESS3 from(select c.bic_code, decode(c.relationship,''M'',''Mail'',''K'',''Keys'',''No'') Relationship,c.bank_name,c.BANK_ADDRESS1,c.BANK_ADDRESS2,c.BANK_ADDRESS3 from istms_bic_directory c where c.auth_stat = ''A'' and c.record_stat = ''O''AND NVL(c.sub_type_code,''$#'') IN ( SELECT  d.sub_type_code FROM istms_subtype_code d WHERE   d.be_indicator = ''N'')UNION select (a.network_prefix||a.network_code||b.clearing_code) xxxx,'''',b.bank_name, b.address_1, b.address_2, b.address_3 from istms_network_code a,istms_clearing_code b where b.network_code = a.network_code and b.clearing_code_ind = ''Y'' and a.ccy_code =? and b.record_stat = ''O'' and b.auth_stat =''A'') where 1=1',
100,'BIC_CODE!TEXT!BIC_CODE~BANK_NAME!TEXT!BANK_NAME~BANK_ADDRESS1!TEXT!BANK_ADDRESS1~BANK_ADDRESS2!TEXT!BANK_ADDRESS2~BANK_ADDRESS3!TEXT!BANK_ADDRESS3',
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
('LOV_RCVR_CORRES',
'MODACCDT',
'',100,'BIC_CODE!TEXT!BIC_CODE~BANK_NAME!TEXT!BANK_NAME~BANK_ADDRESS1!TEXT!BANK_ADDRESS1~BANK_ADDRESS2!TEXT!BANK_ADDRESS2~BANK_ADDRESS3!TEXT!BANK_ADDRESS3',
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
('LOV_RDE',
'CODELPLN',
'Select rde_code,RDE_DESC,RDE_TYPE,RDE_DATA_TYPE,RDE_MODULE from COVWS_RP_RDE where rde_module=''CO'' order by rde_code',
100,'RDE_CODE!TEXT!RDE_CODE~RDE_DESC!TEXT!RDE_DESC~RDE_TYPE!TEXT!RDE_TYPE~RDE_DATA_TYPE!TEXT!RDE_DATA_TYPE~RDE_MODULE!TEXT!RDE_MODULE',
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
('LOV_RDE',
'CODVARRL',
'Select * from COVWS_RP_RDE where rde_module in (''CO'',''AC'',?) AND RDE_MODULE <> ''RT'' order by rde_code',
100,'RDE_CODE!TEXT!RDE_CODE~RDE_DESC!TEXT!RDE_DESC~RDE_TYPE!TEXT!RDE_TYPE~RDE_DATA_TYPE!TEXT!RDE_DATA_TYPE~RDE_MODULE!TEXT!RDE_MODULE',
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
('LOV_REACCBRN',
'CIDACCDT',
'select branch_code, branch_name from sttms_branch where auth_stat = ''A'' AND record_stat = ''O''',
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
('LOV_REAL_FCY_CR_GL',
'DEDUPLPR',
'select gl_code, gl_desc from gltms_glmaster where record_stat = ''O'' and ONCE_AUTH = ''Y'' and leaf = ''Y'' and ccy_res = ''A'' and (category = ''1'' or category = ''2'') order by gl_code',
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
('LOV_REAL_FCY_DR_GL',
'DEDUPLPR',
'select gl_code, gl_desc from gltms_glmaster where record_stat = ''O'' and ONCE_AUTH = ''Y'' and leaf = ''Y'' and ccy_res = ''A'' and (category = ''1'' or category = ''2'') order by gl_code',
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
('LOV_REAL_LCY_CR_GL',
'DEDUPLPR',
'select gl_code, gl_desc from gltms_glmaster where record_stat = ''O'' and ONCE_AUTH = ''Y'' and leaf = ''Y'' and ccy_res = ''A'' and (category = ''1'' or category = ''2'') order by gl_code',
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
('LOV_REAL_LCY_DR_GL',
'DEDUPLPR',
'select gl_code, gl_desc from gltms_glmaster where record_stat = ''O'' and ONCE_AUTH = ''Y'' and leaf = ''Y'' and ccy_res = ''A'' and (category = ''1'' or category = ''2'') order by gl_code',
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
('LOV_REASON_NOTPOSTED',
'STDREFQU',
'select * from cstbs_referral_reason',
20,'REASON_CODE!TEXT!REASON_CODE~REASON_DESC!TEXT!REASON_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REASON_POSTED',
'STDREFQU',
'select * from cstbs_referral_reason',
100,'REASON_CODE!TEXT!REASON_CODE~REASON_DESC!TEXT!REASON_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REASSIGN_ID',
'DEDBTASN',
'select 	s2.user_id from	smtbs_user s2 where s2.user_id != ? and  exists ( select 1 				from smvws_browser_functions s1 				where s1.user_id = s2.user_id 				and s1.branch_code = global.current_branch  				and	s1.function_id = ''DEDBATOT'') 						or 		exists ( select 1 		from 	smvws_browser_functions s3 		where s3.user_id = s2.user_id 		and s3.branch_code = global.current_branch  		and s3.function_id =  DECODE ( ?,''T'',''DETLRONL'',''J'',''DEJRNONL'',''M'',''DEMLTONL'',''N'',''DEDJRNOL'') ) ',
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
('LOV_REBATE_AMT_CCY',
'OTDCNONL',
'SELECT CCY_CODE,CCY_NAME FROM(SELECT A.CCY_CODE,A.CCY_NAME FROM CYTMS_CCY_DEFN A WHERE A.AUTH_STAT=''A'' AND A.RECORD_STAT=''O'' AND EXISTS(SELECT 1 FROM CSVWS_PRODUCT_CURRENCIES B WHERE B.PRODUCT_CODE=? AND B.CCY_CODE=A.CCY_CODE)) WHERE 1=1 ORDER BY CCY_CODE',
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
('LOV_RECALL_CAT',
'PCDPDCTG',
'SELECT prod_category, category_desc FROM            ( SELECT prod_category, category_desc,''ALL'' parent_Prod_type               FROM pctmS_product_category              WHERE product_type = ''RI'' AND                    collection_type = decode(?, ''DD'', ''DD'', ''$$'')AND                    transfer_type = ?                     AND once_auth = ''Y'' AND                    record_stat = ''O'')Z                    WHERE parent_Prod_type=DECODE(?,''VI'','''',''VO'','''',''OC'','''',''ALL'')     ORDER BY prod_category',
100,'PROD_CATEGORY!TEXT!PROD_CATEGORY~CATEGORY_DESC!TEXT!CATEGORY_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RECEIVABLE_CON',
'ICDPRMNT',
'SELECT A.AC_GL_NO, B.GL_DESC FROM STTB_ACCOUNT A, GLTM_GLMASTER B WHERE A.AC_OR_GL = ''G'' AND A.AC_GL_NO = B.GL_CODE AND B.CATEGORY = ''1'' AND A.AC_GL_REC_STATUS = ''O'' AND A.ONCE_AUTH = ''Y'' ORDER BY 1',
100,'AC_GL_NO!TEXT!AC_GL_NO~GL_DESC!TEXT!GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RECEIVABLE_GL',
'ICDPRMNT',
'SELECT A.AC_GL_NO, B.GL_DESC FROM STTB_ACCOUNT A, GLTM_GLMASTER B WHERE A.AC_OR_GL = ''G'' AND A.AC_GL_NO = B.GL_CODE AND B.CATEGORY = ''1'' AND A.AC_GL_REC_STATUS = ''O'' AND A.ONCE_AUTH = ''Y'' ORDER BY 1',
100,'AC_GL_NO!TEXT!AC_GL_NO~GL_DESC!TEXT!GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RECEIVABLE_GL_CHG',
'ICDPRMNT',
'SELECT A.AC_GL_NO, B.GL_DESC FROM STTB_ACCOUNT A, GLTM_GLMASTER B WHERE A.AC_OR_GL = ''G'' AND A.AC_GL_NO = B.GL_CODE AND B.CATEGORY = ''1'' AND A.AC_GL_REC_STATUS = ''O'' AND A.ONCE_AUTH = ''Y'' ORDER BY 1',
100,'AC_GL_NO!TEXT!AC_GL_NO~GL_DESC!TEXT!GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RECEIVER',
'CSDDRYET',
'SELECT CUSTOMER_NO, SHORT_NAME FROM (SELECT CUSTOMER_NO, SHORT_NAME FROM STTMS_CUSTOMER WHERE RECORD_STAT = ''O'' AND AUTH_STAT = ''A'' MINUS SELECT A.RECEIVER CUSTOMER_NO, B.SHORT_NAME FROM CSTM_DIARY_MSG_RECEIVER A, STTMS_CUSTOMER B WHERE A.RECEIVER = B.CUSTOMER_NO AND A.CONTRACT_REF_NO = ? AND A.DIARY_EVENT_SEQ_NO = ? AND A.DIARY_EVENT_SUB_SEQ_NO = 0) WHERE 1=1 ORDER BY 1',
'','CUSTOMER_NO!TEXT!CUSTOMER_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RECEIVER',
'CSDDRYST',
'SELECT customer_no, customer_name1 FROM (SELECT customer_no, customer_name1 FROM sttms_customer WHERE record_stat = ''O'' AND auth_stat = ''A'' MINUS SELECT a.receiver, b.customer_name1 FROM CSTM_DIARY_MSG_RECEIVER a, sttms_customer b WHERE a.receiver = b.customer_no AND a.contract_ref_no=? AND a.diary_event_seq_no=? and a.diary_event_sub_seq_no=?) where 1=1 ORDER BY 1',
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
('LOV_RECEIVER',
'DVCSCADV',
'select a.receiver_id, a.medium, a.receiver_name, a.address_line1,               a.address_line2, a.address_line3, a.address_line4,               a.receiver_language from dvtms_msg_party_master a where exists (               select * from dvtms_msg_party_detail b where b.receiver_id =               a.receiver_id and b.medium = a.medium and b.party_type IN               (?,''ALL'') and b.cif_id =               DECODE(?,''DV_ASSIGN_2'',b.cif_id,''DV_ASSUME_2'',b.cif_id,?)) and               a.record_stat = ''O'' and a.auth_stat = ''A''',
100,'RECEIVER_ID!TEXT!RECEIVER_ID~MEDIUM!TEXT!MEDIUM~RECEIVER_NAME!TEXT!RECEIVER_NAME~ADDRESS_LINE1!TEXT!ADDRESS_LINE1~ADDRESS_LINE2!TEXT!ADDRESS_LINE2~ADDRESS_LINE3!TEXT!ADDRESS_LINE3~ADDRESS_LINE4!TEXT!ADDRESS_LINE4~RECEIVER_LANGUAGE!TEXT!RECEIVER_LANGUAGE',
'STRING~STRING~STRING~STRING~STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RECEIVER',
'FTDMT101',
'SELECT BIC_CODE FROM istm_txnccy_limit_MASTER WHERE SWIFT_MSG_TYPE = ''101'' AND TYPE IN (''O'',''B'') AND ONCE_AUTH = ''Y'' and record_stat = ''O'' order by bic_code',
100,'BIC_CODE!TEXT!BIC_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RECEIVER',
'FTDRCST',
'select bic_code,relationship,bank_name from (select  xxxx,bic_code,relationship,bank_name from (select ''X'' || b.bic_code xxxx,       b.bic_code,       decode(b.relationship, ''K'', ''Keys'', ''M'', ''Mail'', ''No'') relationship,       b.bank_name  from istms_bic_directory b where b.auth_stat = ''A'' and b.record_stat = ''O'' UNION select ''A'' || (a.network_prefix || a.network_code || b.clearing_code) xxxx,       (a.network_prefix || a.network_code || b.clearing_code),       '''',       b.bank_name from istms_network_code a, istms_clearing_code b where b.network_code = a.network_code and b.record_stat = ''O'' and       b.auth_stat = ''A'')) WHERE 1=1 order by xxxx',
100,'BIC_CODE!TEXT!BIC_CODE~RELATIONSHIP!TEXT!RELATIONSHIP~BANK_NAME!TEXT!BANK_NAME',
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
('LOV_RECEIVER',
'ISCONDET',
'select bic_code , relationship,bank_name,bank_address1,bank_address2,bank_address3 from (select c.bic_code, decode(c.relationship,''M'',''Mail'',''K'',''Keys'',''No'') Relationship,c.bank_name,c.BANK_ADDRESS1,c.BANK_ADDRESS2,c.BANK_ADDRESS3 from istms_bic_directory c where c.auth_stat = ''A'' and c.record_stat = ''O''AND NVL(c.sub_type_code,''Z'') IN ( SELECT  d.sub_type_code                                   FROM istms_subtype_code d                        WHERE   d.be_indicator = ''N'')UNION select (a.network_prefix||a.network_code||b.clearing_code) xxxx,'''',b.bank_name, b.address_1, b.address_2, b.address_3 from istms_network_code a,istms_clearing_code b where b.network_code = a.network_code and b.clearing_code_ind = ''Y'' and a.ccy_code =? and b.record_stat = ''O'' and b.auth_stat =''A'') where 1=1',
100,'BIC_CODE!TEXT!BIC_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RECEIVER',
'ISDINSTR',
'SELECT BIC_CODE, RELATIONSHIP, BANK_NAME FROM (SELECT B.BIC_CODE BIC_CODE ,DECODE(B.RELATIONSHIP,''K'',''Keys'',''M'',''Mail'',''No'') RELATIONSHIP,B.BANK_NAME BANK_NAME FROM ISTMS_BIC_DIRECTORY B WHERE B.ONCE_AUTH = ''Y'' AND B.RECORD_STAT = ''O'' UNION SELECT (A.NETWORK_PREFIX||A.NETWORK_CODE||B.CLEARING_CODE) BIC_CODE,'''' RELATIONSHIP,B.BANK_NAME BANK_NAME FROM ISTMS_NETWORK_CODE A,ISTMS_CLEARING_CODE B WHERE B.NETWORK_CODE = A.NETWORK_CODE AND B.RECORD_STAT = ''O'' AND B.ONCE_AUTH = ''Y'') WHERE 1=1 ORDER BY 1',
100,'BIC_CODE!TEXT!BIC_CODE~RELATIONSHIP!TEXT!RELATIONSHIP~BANK_NAME!TEXT!BANK_NAME',
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
('LOV_RECEIVER',
'MSDCHGMN',
'select customer_no, party_type, customer_name1 from ( SELECT ''ALL'' customer_no,''ALL '' party_type,''All Parties'' customer_name1 FROM dual UNION SELECT bic_code customer_no,''BIC'' party_type,bank_name customer_name1 FROM istms_bic_directory WHERE  AUTH_STAT=''A'' AND record_stat = ''O'' UNION SELECT customer_no,''CUS'' party_type,customer_name1 FROM sttms_customer WHERE  AUTH_STAT=''A'' AND record_stat = ''O'') where 1 = 1',
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
('LOV_RECEIVER',
'MSDHOLD',
'select customer_no, short_name, customer_name1 from (select customer_no,short_name, customer_name1 from sttms_customer where record_stat = ''O'' and auth_stat = ''A'' union select ''ALL'', ''ANY CUSTOMER'',''ANY CUSTOMER'' from sttms_customer) where 1 = 1 order by customer_no',
100,'CUSTOMER_NO!TEXT!CUSTOMER_NO~SHORT_NAME!TEXT!SHORT_NAME~CUSTOMER_NAME1!TEXT!CUSTOMER_NAME1',
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
('LOV_RECEIVER',
'MSDHR',
'select customer_no, customer_name1 from (select ''ALL'' customer_no, ''ANY CUSTOMER'' customer_name1 from sttms_customer union select customer_no, customer_name1 from sttms_customer where record_stat = ''O'' and ONCE_AUTH = ''Y'' AND AUTH_STAT=''A'') where 1=1 order by customer_no',
500,'CUSTOMER_NO!TEXT!CUSTOMER_NO~CUSTOMER_NAME1!TEXT!CUSTOMER_NAME1',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RECEIVER',
'MSDMT920',
'SELECT A.BIC_CODE,A.CUSTOMER_NO  FROM STTM_CUST_MT920_MAINT A ,STTM_CUSTOMER B WHERE A.CUSTOMER_NO = B.CUSTOMER_NO AND B.GENERATE_MT920 = ''Y'' AND B.RECORD_STAT =''O''AND B.AUTH_STAT =''A''  AND B.LOCAL_BRANCH = GLOBAL.CURRENT_BRANCH',
100,'BIC_CODE!TEXT!BIC_CODE~CUSTOMER_NO!TEXT!CUSTOMER_NO',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RECIEVER',
'FTDCONON',
'select bic_code, decode(relationship,''M'',''Mail'',''K'',''Keys'',''No'') Relationship, bank_name from istms_bic_directory where ONCE_AUTH = ''Y'' and record_stat = ''O'' and sk_arrangement=''Y'' order by bic_code',
100,'BIC_CODE!TEXT!BIC_CODE~RELATIONSHIP!TEXT!RELATIONSHIP~BANK_NAME!TEXT!BANK_NAME',
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
('LOV_RECON',
'REDMANMQ',
'select recon_class from retms_recon_class_defn where record_stat=''O'' and auth_stat=''A'' order by recon_class',
500,'RECON_CLASS!TEXT!RECON_CLASS',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RECON_CLASS',
'REDEXTAC',
'SELECT DISTINCT RECON_CLASS, RECON_CLASS_DESCRIPTION FROM RETMS_RECON_CLASS_DEFN WHERE RECORD_STAT = ''O'' AND AUTH_STAT = ''A'' ORDER BY RECON_CLASS',
100,'RECON_CLASS!TEXT!RECON_CLASS',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RECON_CLASS',
'REDMANMC',
'select recon_class, recon_class_description from retms_recon_class_defn where record_stat=''O'' and once_auth=''Y'' order by recon_class',
100,'RECON_CLASS!TEXT!RECON_CLASS~RECON_CLASS_DESCRIPTION!TEXT!RECON_CLASS_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RECON_CLASS',
'REDSTMIN',
'select recon_class, recon_class_description from retms_recon_class_defn where record_stat = ''O'' and auth_stat = ''A'' order by recon_class',
100,'RECON_CLASS!TEXT!RECON_CLASS~RECON_CLASS_DESCRIPTION!TEXT!RECON_CLASS_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RECVR_CORRES',
'ISDINSTR',
'SELECT BIC_CODE, RELATIONSHIP, BANK_NAME FROM (SELECT B.BIC_CODE BIC_CODE ,DECODE(B.RELATIONSHIP,''K'',''Keys'',''M'',''Mail'',''No'') RELATIONSHIP,B.BANK_NAME BANK_NAME FROM ISTMS_BIC_DIRECTORY B WHERE B.ONCE_AUTH = ''Y'' AND B.RECORD_STAT = ''O'' UNION SELECT (A.NETWORK_PREFIX||A.NETWORK_CODE||B.CLEARING_CODE) BIC_CODE,'''' RELATIONSHIP,B.BANK_NAME BANK_NAME FROM ISTMS_NETWORK_CODE A,ISTMS_CLEARING_CODE B WHERE B.NETWORK_CODE = A.NETWORK_CODE AND B.RECORD_STAT = ''O'' AND B.ONCE_AUTH = ''Y'') WHERE 1=1 ORDER BY 1',
100,'BIC_CODE!TEXT!BIC_CODE~RELATIONSHIP!TEXT!RELATIONSHIP~BANK_NAME!TEXT!BANK_NAME',
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
('LOV_RECV_ACCOUNT',
'ISDINSTR',
'' || chr(10) || 'SELECT ac_gl_no ac_gl_no,' || chr(10) || '       ac_gl_ccy ac_gl_ccy,' || chr(10) || '       decode(ac_or_gl, ''A'', cust_name1 || '' - '') || ac_gl_desc ac_gl_desc' || chr(10) || 'FROM   sttbs_account' || chr(10) || 'WHERE  nvl(branch_code, ''$'') =' || chr(10) || '       decode(ac_or_gl, ''A'', nvl(?, branch_code), ''G'', nvl(branch_code, ''$''))' || chr(10) || '       AND' || chr(10) || '       nvl(ac_gl_ccy, ''$'') = decode(ac_or_gl, ''A'', nvl(?,ac_gl_ccy ), ''G'', nvl(ac_gl_ccy, ''$''))' || chr(10) || '       AND auth_stat = ''A''' || chr(10) || '       AND ac_gl_rec_status = ''O''' || chr(10) || '       AND gl_category NOT IN (5, 6)' || chr(10) || '       AND ac_or_gl IN (''A'', ''G'')',
900,'AC_GL_NO!TEXT!AC_GL_NO~AC_GL_CCY!TEXT!AC_GL_CCY~AC_GL_DESC!TEXT!AC_GL_DESC',
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
('LOV_RECV_AC_CCY',
'ISDINSTR',
'SELECT CCY_CODE, CCY_NAME FROM CYTMS_CCY_DEFN WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y''ORDER BY 1',
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
('LOV_RECV_INTERMEDIARY',
'ISDINSTR',
'SELECT BIC_CODE, RELATIONSHIP, BANK_NAME FROM (SELECT B.BIC_CODE BIC_CODE ,DECODE(B.RELATIONSHIP,''K'',''Keys'',''M'',''Mail'',''No'') RELATIONSHIP,B.BANK_NAME BANK_NAME FROM ISTMS_BIC_DIRECTORY B WHERE B.ONCE_AUTH = ''Y'' AND B.RECORD_STAT = ''O'' UNION SELECT (A.NETWORK_PREFIX||A.NETWORK_CODE||B.CLEARING_CODE) BIC_CODE,'''' RELATIONSHIP,B.BANK_NAME BANK_NAME FROM ISTMS_NETWORK_CODE A,ISTMS_CLEARING_CODE B WHERE B.NETWORK_CODE = A.NETWORK_CODE AND B.RECORD_STAT = ''O'' AND B.ONCE_AUTH = ''Y'') WHERE 1=1 ORDER BY 1',
100,'BIC_CODE!TEXT!BIC_CODE~RELATIONSHIP!TEXT!RELATIONSHIP~BANK_NAME!TEXT!BANK_NAME',
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
('LOV_RECV_SETTLE_ACCOUNT',
'ISDSRCMD',
'SELECT AC_GL_NO, AC_GL_DESC FROM STTBS_ACCOUNT WHERE AC_OR_GL =''G'' AND GL_STAT_BLOCKED=''N'' AND GL_STAT_DE_POST =''Y'' AND AC_GL_REC_STATUS =''O''',
200,'AC_GL_NO!TEXT!AC_GL_NO~AC_GL_DESC!TEXT!AC_GL_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RECV_SETTL_PROD',
'ISDSRCMD',
'SELECT PRODUCT_CODE,PRODUCT_DESCRIPTION FROM(SELECT PRODUCT_CODE PRODUCT_CODE,PRODUCT_DESCRIPTION PRODUCT_DESCRIPTION FROM CSTMS_PRODUCT WHERE ((MODULE = ''CG'' AND PRODUCT_TYPE = ''OC'' AND ? = ''CLG'') OR (MODULE = ''RT'' AND PRODUCT_TYPE IN (''OT'', ''AT'') AND ? IN (''TLR'', ''ACC'', ''EPO'', ''SPG'', ''NPO'' ,''INS''))) AND RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' UNION SELECT PROD_CATEGORY PRODUCT_CODE,CATEGORY_DESC PRODUCT_DESCRIPTION FROM PCTMS_PRODUCT_CATEGORY WHERE  RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' AND ? = ''EAC'') WHERE 1=1 ORDER BY 1',
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
('LOV_REC_BRANCH',
'ISDINSTR',
'SELECT BRANCH_CODE, BRANCH_NAME FROM STTMS_BRANCH WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY BRANCH_CODE',
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
('LOV_REDISPATCH_CAT',
'PCDPDCTG',
'SELECT PROD_CATEGORY,CATEGORY_dESC FROM (SELECT prod_category, category_desc  FROM pctms_product_category WHERE product_type = ? AND collection_type = ? AND transfer_type = ? AND ? = ''OC'' AND once_auth = ''Y'' AND record_stat = ''O''UNION SELECT ?, ? FROM dual ) WHERE 1=1 AND ?=''OC''ORDER BY prod_category',
100,'PROD_CATEGORY!TEXT!PROD_CATEGORY~CATEGORY_DESC!TEXT!CATEGORY_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REFERENCE',
'FTDCONON',
'SELECT B.CONTRACT_REF_NO, B.EX_RATE FROM CSTB_CONTRACT A, FXTB_CONTRACT_MASTER B, FTTB_CONTRACT_MASTER C WHERE A.PRODUCT_CODE IN(SELECT C.PRODUCT_CODE FROM CSTM_PRODUCT C, FXTM_PRODUCT_DEFINITION F WHERE C.PRODUCT_CODE = F.PRODUCT_CODE AND F.PRODUCT_TYPE=''S'' AND C.MODULE=''FX'') AND A.CONTRACT_REF_NO = B.CONTRACT_REF_NO AND B.BOT_CCY = C.DR_CCY AND B.SOLD_CCY = C.CR_CCY',
100,'CONTRACT_REF_NO!TEXT!B.CONTRACT_REF_NO~EX_RATE!TEXT!B.EX_RATE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REFERENCE',
'MSDINBRS',
'select contract_ref_no from cstbs_contract where branch = global.current_branch and contract_status = ''A'' and auth_status = ''A'' ORDER BY CONTRACT_REF_NO',
500,'CONTRACT_REF_NO!TEXT!CONTRACT_REF_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REFERENCE',
'UDDEVENT',
'SELECT CONTRACT_REF_NO, CONTRACT_CCY, COUNTERPARTY, USER_DEFINED_STATUS,MODULE_CODE FROM CSTBS_CONTRACT WHERE BRANCH = ? ORDER BY CONTRACT_REF_NO',
100,'CONTRACT_REF_NO!TEXT!CONTRACT_REF_NO~CONTRACT_CCY!TEXT!CONTRACT_CCY~COUNTERPARTY!TEXT!COUNTERPARTY~MODULE_CODE!TEXT!MODULE_CODE',
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
('LOV_REFERENCE_NO',
'MSDCOMMS',
'select  *  from (select dcn, swift_msg_type, receiver,branch_date,decode(nvl(substr(?,2),''''),90,dcn,91,dcn,92,dcn,95,dcn,96 ,dcn,NULL) dcn1 from mstbs_dly_msg_out where receiver = nvl(?,'''') and   substr(swift_msg_type,1,1)= SUBSTR(?, 1, 1) and   ? = ''O'' union all select dcn, swift_msg_type, sender, branch_date,decode(nvl(substr(?,2),''''),90,dcn,91,dcn,92,dcn,95,dcn,96,dcn,NULL ) dcn1 from mstbs_dly_msg_in where substr(swift_msg_type,1,1) = SUBSTR(?, 1, 1) and   ? = ''I'') where 1=1',
200,'DCN!TEXT!DCN~SWIFT_MSG_TYPE!TEXT!SWIFT_MSG_TYPE~RECEIVER!TEXT!RECEIVER~BRANCH_DATE!TEXT!BRANCH_DATE',
'STRING~STRING~STRING~DATE',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REF_CCY',
'TADRULE',
'select ccy_code from cytm_ccy_defn where record_stat=''O'' and once_auth=''Y'' ORDER BY CCY_CODE',
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
('LOV_REF_NO',
'CSDDRYET',
'select a.contract_ref_no, a.user_ref_no from cstbs_contract a,sttms_customer b where a.counterparty=b.customer_no and a.module_code in (''LS'',''LN'',''LL'')and a.branch=global.current_branch',
500,'CONTRACT_REF_NO!TEXT!CONTRACT_REF_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REF_NO',
'DVDLMVAL',
'select b.contract_ref_no, b.user_ref_no from cstbs_contract a, dvtbs_contract_master b where a.branch = global.current_branch and a.module_code=''DV'' and a.contract_status=''A'' and a.auth_status=''A'' and b.contract_ref_no = a.contract_ref_no and b.version_no = a.latest_version_no order by b.contract_ref_no',
100,'CONTRACT_REF_NO!TEXT!CONTRACT_REF_NO~USER_REF_NO!TEXT!USER_REF_NO',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REF_NO',
'DVRPCACT',
'SELECT DISTINCT CONTRACT_REF_NO FROM CSTBS_CONTRACT WHERE AUTH_STATUS =''A'' AND MODULE_CODE=''DV''',
500,'CONTRACT_REF_NO!TEXT!CONTRACT_REF_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REF_NO',
'FTDCAUTH',
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
('LOV_REF_NO',
'GLRLDCLB',
'select CL_REF_NO from cstb_ldcl_migration_log',
100,'CL_REF_NO!TEXT!CL_REF_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REF_NO',
'IDDLMVAL',
'select contract_ref_no,user_ref_no from (select b.contract_ref_no, b.user_ref_no from cstbs_contract a, dvtbs_contract_master b where a.branch = global.current_branch and a.module_code = ''ID'' and a.contract_status = ''A'' and a.auth_status = ''A'' and b.contract_ref_no = a.contract_ref_no and b.version_no = a.latest_version_no) where 1 = 1 order by contract_ref_no',
100,'CONTRACT_REF_NO!TEXT!CONTRACT_REF_NO~USER_REF_NO!TEXT!USER_REF_NO',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REF_NO',
'IDRPCACT',
'SELECT DISTINCT CONTRACT_REF_NO FROM CSTBS_CONTRACT WHERE AUTH_STATUS =''A'' AND MODULE_CODE=''ID'' AND branch = global.current_branch',
500,'CONTRACT_REF_NO!TEXT!CONTRACT_REF_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REF_NO',
'LDDPENLT',
'SELECT CONTRACT_REF_NO FROM (SELECT DISTINCT A.CONTRACT_REF_NO FROM CSTBS_CONTRACT A , LDTBS_CONTRACT_MASTER B WHERE A.CONTRACT_REF_NO = B.CONTRACT_REF_NO AND A.CONTRACT_STATUS =''A'' AND A.CONTRACT_STATUS = B.CONTRACT_STATUS AND B.VALUE_DATE < GLOBAL.APPLICATION_DATE) WHERE 1=1 ORDER BY CONTRACT_REF_NO',
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
('LOV_REF_NO',
'MSDPRINT',
'SELECT DISTINCT REFERENCE_NO      FROM MSTBS_DLY_MSG_OUT WHERE REFERENCE_NO IS NOT NULL ORDER BY REFERENCE_NO',
200,'REFERENCE_NO!TEXT!REFERENCE_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REF_NO',
'OTDLMVAL',
'select contract_ref_no from (select b.contract_ref_no from cstbs_contract a, ottbs_contract_master b where a.branch = global.current_branch and a.module_code=''OT'' and a.contract_status=''A'' and a.auth_status=''A'' and b.contract_ref_no = a.contract_ref_no and b.version_no = a.latest_version_no) where 1=1 order by contract_ref_no',
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
('LOV_REG1',
'FTDMT101',
'SELECT REGULATORY_INFO1  FROM (        SELECT ''/BENEFRES/'' REGULATORY_INFO1          FROM DUAL        UNION        SELECT ''/ORDERRES/'' REGULATORY_INFO1          FROM DUAL) WHERE 1 = 1 ORDER BY REGULATORY_INFO1 ASC',
100,'REGULATORY_INFO1!TEXT!REGULATORY_INFO1',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REGIONAL_OFFICE',
'SMDBRANH',
'select branch_code, branch_name from sttm_branch where auth_stat = ''A'' and record_stat = ''O'' order by branch_code',
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
('LOV_REGIONAL_OFFICE',
'STDBRANC',
'select branch_code, branch_name from sttm_branch where auth_stat = ''A'' and record_stat = ''O'' order by branch_code',
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
('LOV_REG_CNTRY',
'STDCCIF',
'select country_code,description from sttm_country where auth_stat = ''A'' and record_stat = ''O'' order by country_code',
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
('LOV_REG_CNTRY',
'STDCIF',
'select country_code,description from sttm_country where auth_stat = ''A'' and record_stat = ''O'' order by country_code',
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
('LOV_REG_CNTRY',
'STDCOCIF',
'select country_code,description from sttm_country where auth_stat = ''A'' and record_stat = ''O'' order by country_code',
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
('LOV_REIM_INSTN',
'FTDRCST',
'select bic_code,relationship,bank_name from (select ''X'' || b.bic_code xxxx,       b.bic_code,       decode(b.relationship, ''K'', ''Keys'', ''M'', ''Mail'', ''No'') relationship,       b.bank_name  from istms_bic_directory b where b.auth_stat = ''A'' and b.record_stat = ''O'' UNION select ''A'' || (a.network_prefix || a.network_code || b.clearing_code) xxxx,       (a.network_prefix || a.network_code || b.clearing_code),       '''',       b.bank_name  from istms_network_code a, istms_clearing_code b where b.network_code = a.network_code and b.record_stat = ''O'' and       b.auth_stat = ''A'') WHERE 1=1 order by xxxx',
100,'BIC_CODE!TEXT!BIC_CODE~RELATIONSHIP!TEXT!RELATIONSHIP~BANK_NAME!TEXT!BANK_NAME',
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
('LOV_REIM_INSTN',
'ISDINSTR',
'SELECT BIC_CODE, RELATIONSHIP, BANK_NAME FROM (SELECT B.BIC_CODE BIC_CODE ,DECODE(B.RELATIONSHIP,''K'',''Keys'',''M'',''Mail'',''No'') RELATIONSHIP,B.BANK_NAME BANK_NAME FROM ISTMS_BIC_DIRECTORY B WHERE B.ONCE_AUTH = ''Y'' AND B.RECORD_STAT = ''O'' UNION SELECT (A.NETWORK_PREFIX||A.NETWORK_CODE||B.CLEARING_CODE) BIC_CODE,'''' RELATIONSHIP,B.BANK_NAME BANK_NAME FROM ISTMS_NETWORK_CODE A,ISTMS_CLEARING_CODE B WHERE B.NETWORK_CODE = A.NETWORK_CODE AND B.RECORD_STAT = ''O'' AND B.ONCE_AUTH = ''Y'') WHERE 1=1 ORDER BY 1',
100,'BIC_CODE!TEXT!BIC_CODE~RELATIONSHIP!TEXT!RELATIONSHIP~BANK_NAME!TEXT!BANK_NAME',
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
('LOV_REJECTCODE',
'PCDINAUC',
'SELECT REJECT_CODE, REJECT_REASON FROM PCTMS_REJECT_CODE A,PCTM_CLEARING_NETWORK B WHERE A.RECORD_STAT = ''O'' AND B.AUTH_STAT = ''A'' AND A.NETWORK_ID = B.NETWORK_ID AND B.RTGS_NETWORK_QUALIFIER IN (''N'', ''R'',''I'',''S'')',
100,'REJECT_CODE!TEXT!REJECT_CODE~REJECT_REASON!TEXT!REJECT_REASON',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REJECT_CAT',
'PCDPDCTG',
'SELECT prod_category,category_desc FROM ((SELECT prod_category,category_desc,''ALL'' parent_Prod_type FROM pctms_product_category WHERE product_type = ''XI'' AND collection_type = ? and transfer_type = ? AND record_stat = ''O'' AND once_auth = ''Y'')UNION ALL (SELECT prod_category,category_desc,''I'' parent_Prod_type FROM pctms_product_category WHERE product_type in (''IN'') and transfer_type = ? AND record_stat = ''O''AND once_auth = ''Y'' ))Z WHERE parent_Prod_type =DECODE(?, ''I'', ''I'',''VI'','''',''VO'','''',''OC'','''', ''ALL'') ORDER BY prod_category',
100,'PROD_CATEGORY!TEXT!PROD_CATEGORY~CATEGORY_DESC!TEXT!CATEGORY_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REJECT_CODE',
'PCCACENT',
'select reject_code, reject_Reason from pctms_reject_code',
100,'CPTY_AC_NO!TEXT!CPTY_AC_NO~CPTY_NAME!TEXT!CPTY_NAME~BANK_CODE!TEXT!BANK_CODE',
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
('LOV_REJECT_CODE',
'PCCEVNTS',
'select reject_code, reject_Reason from pctms_reject_code',
100,'CPTY_AC_NO!TEXT!CPTY_AC_NO~CPTY_NAME!TEXT!CPTY_NAME~BANK_CODE!TEXT!BANK_CODE',
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
('LOV_REJECT_CODE',
'PCDFTONL',
'select reject_code, reject_Reason from pctms_reject_code ORDER BY REJECT_CODE',
100,'REJECT_CODE!TEXT!REJECT_CODE~REJECT_REASON!TEXT!REJECT_REASON',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REJECT_CODE',
'PCDONONL',
'select reject_code, reject_Reason from pctms_reject_code ORDER BY REJECT_CODE',
100,'REJECT_CODE!TEXT!REJECT_CODE~REJECT_REASON!TEXT!REJECT_REASON',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REJECT_CODE',
'PCDRJCOD',
'SELECT TYPE_VALUE,TYPE_DESC FROM   pctm_type_values WHERE  TYPE_CODE = ''REJT_CODE''',
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
('LOV_REJECT_REASON',
'MCDPAMNT',
'SELECT DISTINCT MSG_TAG , TAG_VALUE FROM ISTMS_SWIFT_TAGVAL' || chr(10) || '',
100,'MSG_TAG!TEXT!MSG_TAG~TAG_VALUE!TEXT!TAG_VALUE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REJ_ACC_AFTER',
'PCDPRMNT',
'select ac_gl_no,ac_gl_ccy,branch_code from (select a.ac_gl_no,a.ac_gl_ccy, a.branch_code from sttbs_account  a where  a.ac_gl_ccy = (select branch_lcy from sttms_branch b where b.branch_code = GLOBAL.CURRENT_BRANCH) AND a.once_auth = ''Y''  AND  DECODE(a.AC_OR_GL,?,''A'',NULL)=''A'' UNION ALL select ac_gl_no,NULL,NULL from sttbs_account where  DECODE(AC_OR_GL,?,''G'',NULL)=''G'' and once_auth = ''Y'') where 1=1  order by ac_gl_no,ac_gl_ccy,branch_code',
'','AC_GL_NO!TEXT!AC_GL_NO~AC_GL_CCY!TEXT!AC_GL_CCY~BRANCH_CODE!TEXT!BRANCH_CODE',
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
('LOV_REJ_ACC_BEFORE',
'PCDPRMNT',
'select ac_gl_no,ac_gl_ccy, branch_code from (select a.ac_gl_no,a.ac_gl_ccy, a.branch_code from sttbs_account  a where  a.ac_gl_ccy = (select branch_lcy from sttms_branch b where b.branch_code = GLOBAL.CURRENT_BRANCH) AND a.once_auth = ''Y''  AND  DECODE(a.AC_OR_GL,?,''A'',NULL)=''A'' UNION ALL select ac_gl_no,NULL,NULL from sttbs_account where  DECODE(AC_OR_GL,?,''G'',NULL)=''G'' and once_auth = ''Y'') where 1=1 order by ac_gl_no,ac_gl_ccy,branch_code',
'','AC_GL_NO!TEXT!AC_GL_NO~AC_GL_CCY!TEXT!AC_GL_CCY~BRANCH_CODE!TEXT!BRANCH_CODE',
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
('LOV_REJ_COD',
'PCCRJRCL',
'select reject_code,reject_Reason from pctms_reject_code order by reject_code',
100,'REJECT_CODE!TEXT!REJECT_CODE~REJECT_REASON!TEXT!REJECT_REASON',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REJ_COD',
'PCDRECAL',
'select reject_code,reject_Reason from pctms_reject_code order by reject_code',
100,'REJECT_CODE!TEXT!REJECT_CODE~REJECT_REASON!TEXT!REJECT_REASON',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REJ_CODE',
'PCDERRCD',
'SELECT REJECT_CODE,REJECT_REASON  FROM PCTM_REJECT_CODE WHERE ONCE_AUTH =''Y'' AND RECORD_STAT = ''O'' ORDER BY REJECT_CODE',
'','REJECT_CODE!TEXT!REJECT_CODE~REJECT_REASON!TEXT!REJECT_REASON',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REJ_REASON',
'IFDCLGDT',
'SELECT REASON_CODE, REASON_DESC FROM CSTBS_CLG_REJ_REASON WHERE INSTRUMENT = ''CHQ'' AND ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O''',
100,'REASON_CODE!TEXT!REASON_CODE~REASON_DESC!TEXT!REASON_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REJ_REASON',
'MCDCONON',
'SELECT DISTINCT MSG_TAG , TAG_VALUE FROM ISTMS_SWIFT_TAGVAL' || chr(10) || '',
100,'MSG_TAG!TEXT!MSG_TAG~TAG_VALUE!TEXT!TAG_VALUE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RELATION',
'STDCUREL',
'SELECT  RELATION,DESCRIPTION FROM STTM_RELATION WHERE ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O'' ORDER BY RELATION',
200,'RELATION!TEXT!RELATION~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RELATIONSHIP',
'CSCCURLN',
'SELECT FIELD_NAME, FIELD_DESC  FROM CSTMS_RELATIONSHIP WHERE FIELD_NAME <> ''PRIMARY''   AND AUTH_STAT = ''A''   AND RECORD_STAT = ''O'' ORDER BY FIELD_NAME',
20,'FIELD_NAME!TEXT!FIELD_NAME~FIELD_DESC!TEXT!FIELD_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RELATIONSHIP',
'CSCCUSLN',
'SELECT FIELD_NAME, FIELD_DESC FROM CSTMS_RELATIONSHIP WHERE  FIELD_LIST = ? AND FIELD_NAME <>''PRIMARY''',
20,'FIELD_NAME!TEXT!FIELD_NAME~FIELD_DESC!TEXT!FIELD_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RELATIONSHIP',
'CSCRELLN',
'SELECT FIELD_NAME, FIELD_DESC FROM CSTMS_RELATIONSHIP WHERE  FIELD_LIST = ''T'' AND FIELD_NAME <>''PRIMARY''',
200,'FIELD_NAME!TEXT!FIELD_NAME~FIELD_DESC!TEXT!FIELD_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REL_CUST',
'DEDJRONL',
'select customer_no,short_name from sttms_customer where record_stat = ''O'' and auth_stat = ''A'' order by customer_no',
500,'CUSTOMER_NO!TEXT!CUSTOMER_NO~SHORT_NAME!TEXT!SHORT_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REL_REF',
'LDDCONON',
'select contract_ref_no, counterparty from (select a.contract_ref_no, a.counterparty from cstbs_contract a ,ldtbs_contract_master b where a.module_code = ''LS''and a.auth_status = ''A'' and a.product_type = ? and a.contract_ref_no = b.contract_ref_no and a.latest_version_no = b.version_no and b.borrower_leg = ''Y'') where 1=1 order by 1',
200,'CONTRACT_REF_NO!TEXT!CONTRACT_REF_NO~COUNTERPARTY!TEXT!COUNTERPARTY',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REL_REF',
'MCDCONON',
'select contract_ref_no, counterparty from (select a.contract_ref_no, a.counterparty from cstbs_contract a ,ldtbs_contract_master b where a.module_code = ''LS''and a.auth_status = ''A'' and a.product_type = ? and a.contract_ref_no = b.contract_ref_no and a.latest_version_no = b.version_no and b.borrower_leg = ''Y'') where 1=1',
100,'CONTRACT_REF_NO!TEXT!CONTRACT_REF_NO~COUNTERPARTY!TEXT!COUNTERPARTY',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REL_REF',
'SRDCONON',
'select contract_ref_no, counterparty from (select a.contract_ref_no, a.counterparty from cstbs_contract a ,ldtbs_contract_master b where a.module_code = ''LS''and a.auth_status = ''A'' and a.product_type = ? and a.contract_ref_no = b.contract_ref_no and a.latest_version_no = b.version_no and b.borrower_leg = ''Y'') where 1=1',
100,'CONTRACT_REF_NO!TEXT!CONTRACT_REF_NO~COUNTERPARTY!TEXT!COUNTERPARTY',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REM1',
'FTDMT101',
'SELECT REMITTANCE_INFO1  FROM (        SELECT ''/INV/'' REMITTANCE_INFO1          FROM DUAL        UNION        SELECT ''/IPI/'' REMITTANCE_INFO1          FROM DUAL        UNION        SELECT ''/RFB/'' REMITTANCE_INFO1          FROM DUAL        UNION        SELECT ''/ROC/'' REMITTANCE_INFO1          FROM DUAL        UNION        SELECT ''/TSU/'' REMITTANCE_INFO1          FROM DUAL) WHERE 1 = 1 ORDER BY REMITTANCE_INFO1 ASC',
100,'REMITTANCE_INFO1!TEXT!REMITTANCE_INFO1',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REPAIR_REASON1',
'MSDMTUDF',
'select err_code,message from (select A.err_code,A.message from ertb_msgs A,ertb_msgs_dtl B where A.Language = global.lang and A.err_code=B.err_code and A.type=''S'' and B.once_auth = ''Y'' and B.record_stat=''O'') where 1=1 order by err_code',
100,'ERR_CODE!TEXT!ERR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REPAIR_REASON2',
'MSDMTUDF',
'select err_code,message from (select A.err_code,A.message from ertb_msgs A,ertb_msgs_dtl B where A.Language = global.lang and A.err_code=B.err_code and A.type=''S'' and B.once_auth = ''Y'' and B.record_stat=''O'') where 1=1 order by err_code',
100,'ERR_CODE!TEXT!ERR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REPAIR_REASON3',
'MSDMTUDF',
'select err_code,message from (select A.err_code,A.message from ertb_msgs A,ertb_msgs_dtl B where A.Language = global.lang and A.err_code=B.err_code and A.type=''S'' and B.once_auth = ''Y'' and B.record_stat=''O'') where 1=1 order by err_code',
100,'ERR_CODE!TEXT!ERR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REPAIR_REASON4',
'MSDMTUDF',
'select err_code,message from (select A.err_code,A.message from ertb_msgs A,ertb_msgs_dtl B where A.Language = global.lang and A.err_code=B.err_code and A.type=''S'' and B.once_auth = ''Y'' and B.record_stat=''O'') where 1=1 order by err_code',
100,'ERR_CODE!TEXT!ERR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REPAIR_REASON5',
'MSDMTUDF',
'select err_code,message from (select A.err_code,A.message from ertb_msgs A,ertb_msgs_dtl B where A.Language = global.lang and A.err_code=B.err_code and A.type=''S'' and B.once_auth = ''Y'' and B.record_stat=''O'') where 1=1 order by err_code',
100,'ERR_CODE!TEXT!ERR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REPORT',
'ACDCASHF',
'select report, report_desc from gltms_cflow_mast where record_stat = ''O'' and once_auth = ''Y'' ORDER BY REPORT',
100,'REPORT!TEXT!REPORT~REPORT_DESC!TEXT!REPORT_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REPORT',
'ACRPCASH',
'select distinct report from gltms_cflow_det order by report',
200,'REPORT!TEXT!REPORT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REPORT',
'GLRPCFLO',
'select report, report_desc from gltms_cflow_mast where record_stat = ''O''',
200,'REPORT!TEXT!REPORT~REPORT_DESC!TEXT!REPORT_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REPORTING_CURRENCY',
'CODBNKPR',
'select ccy_code, ccy_name from cytms_ccy_defn where record_stat = ''O'' and auth_stat = ''A'' order by ccy_code',
10,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REPORTING_CURRENCY',
'STDBANKP',
'select ccy_code, ccy_name from cytms_ccy_defn where record_stat = ''O'' and auth_stat = ''A'' order by ccy_code',
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
('LOV_REPORTS',
'SMDROLDF',
'SELECT FUNCTION_ID, BALOON_HELP FROM (SELECT A.FUNCTION_ID FUNCTION_ID, B.BALOON_HELP BALOON_HELP FROM SMTBS_MENU A, SMTBS_FUNCTION_DESCRIPTION B, SMTBS_MODULES C WHERE A.TYPE_STRING IN (''R'',''U'') AND A.FUNCTION_ID NOT IN (SELECT ROLE_FUNCTION FROM SMTBS_ROLE_DETAIL WHERE ROLE_ID = ?) AND A.FUNCTION_ID = B.FUNCTION_ID AND B.LANG_CODE = GLOBAL.LANG AND A.MODULE = C.MODULE_ID AND TO_NUMBER(SMPKSS.FN_DECRYPT_PASSWORD (C.MODULE_NO_USERS ,''CITIL'' )) > 0  and a.RECORD_STAT=''O'' AND a.ONCE_AUTH=''Y'') WHERE 1 = 1 ORDER BY FUNCTION_ID',
100,'FUNCTION_ID!TEXT!FUNCTION_ID~BALOON_HELP!TEXT!BALOON_HELP',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REPORT_NAME',
'GLRPBAL',
'select report,rep_desc,branch_code from gltms_glmis_master where branch_code= GLOBAL.CURRENT_BRANCH and record_stat= ''O'' and auth_stat= ''A'' union select report, rep_desc, branch_code from gltms_glmis_master where branch_code in (select regional_office from sttms_branch WHERE branch_code = GLOBAL.CURRENT_BRANCH) and record_stat= ''O'' and auth_stat= ''A''  and report not in (select report from gltms_glmis_master where branch_code= GLOBAL.CURRENT_BRANCH and record_stat= ''O'' and auth_stat= ''A'' ) union select report, rep_desc, branch_code from gltms_glmis_master where branch_code= GLOBAL.HEAD_OFFICE and record_stat= ''O'' and auth_stat= ''A'' and report not in (select report from gltms_glmis_master where branch_code in (select regional_office from sttms_branch WHERE branch_code = GLOBAL.CURRENT_BRANCH)  and   record_stat= ''O'' and auth_stat= ''A'' ) and report not in (select report from gltms_glmis_master where branch_code = GLOBAL.CURRENT_BRANCH and record_stat= ''O'' and auth_stat= ''A'' )',
1000,'REPORT!TEXT!REPORT~REP_DESC!TEXT!REP_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REPRDACC',
'CIDACCDT',
'select ACCOUNT_NO,BRANCH_CODE,AC_DESC,ALT_AC_NO,CUSTOMER_NO,CURRENCY,AC_CLASS from STVWS_ACCOUNT',
100,'ACCOUNT_NO!TEXT!ACCOUNT_NO~BRANCH_CODE!TEXT!BRANCH_CODE~AC_DESC!TEXT!AC_DESC~ALT_AC_NO!TEXT!ALT_AC_NO~CUSTOMER_NO!TEXT!CUSTOMER_NO~CURRENCY!TEXT!CURRENCY~AC_CLASS!TEXT!AC_CLASS',
'STRING~STRING~STRING~STRING~STRING~STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REP_CCY',
'LDDBRMNT',
'select ccy_code, ccy_name from cytms_ccy_defn where record_stat = ''O'' and once_auth = ''Y'' order by ccy_code',
200,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REP_RATE_TYPE',
'LDDBRMNT',
'SELECT ccy_rate_type, ccy_rate_type_desc FROM CYTM_RATE_TYPE order by ccy_rate_type',
200,'CCY_RATE_TYPE!TEXT!CCY_RATE_TYPE~CCY_RATE_TYPE_DESC!TEXT!CCY_RATE_TYPE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REP_TYPE',
'CLDPRMNT',
'SELECT TYPE_DESCRIPTION, REPORTING_TYPE FROM CLTMS_REPORTING_COMP_TYPES',
100,'TYPE_DESCRIPTION!TEXT!TYPE_DESCRIPTION~REPORTING_TYPE!TEXT!REPORTING_TYPE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RESET_FINANCIAL_CENTRE',
'IDCINTDT',
'<Long>',
100,'CLEARING_HOUSE!TEXT!CLEARING_HOUSE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RESET_FINANCIAL_CENTRE',
'OTCINTDT',
'SELECT DISTINCT CLEARING_HOUSE FROM STTMS_CLG_HOL_MASTER WHERE RECORD_STAT = ''O'' AND AUTH_STAT = ''A''  ORDER BY CLEARING_HOUSE',
100,'CLEARING_HOUSE!TEXT!CLEARING_HOUSE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RESET_HOL_CCY',
'IDCINTDT',
'<Long>',
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
('LOV_RESET_HOL_CCY',
'OTCINTDT',
'SELECT CCY_CODE, CCY_NAME FROM CYTMS_CCY_DEFN WHERE AUTH_STAT = ''A'' AND RECORD_STAT = ''O'' ORDER BY CCY_CODE',
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
('LOV_RESTRICITION_VALUE',
'FRCFNONL',
'select value from  lmtms_type_values a where type = ? and not exists(select 1 from amtms_fund_restriction where fund_id = ? and type= ? and value = a.value)',
10,'VALUE!TEXT!VALUE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RESTRICTION_TYPE',
'FRCFNONL',
'Select  distinct type from  lmtms_type_of_types where type  like ''AM%'' and type not in (select distinct  restriction_type from  amtms_fund_restriction                     where  fund_id = ?)',
10,'TYPE!TEXT!TYPE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RESULT',
'CNDCOLIN',
'SELECT A.RESULT_CODE, A.NEXT_ACTION_ID  FROM CNTM_RESULTS_NEXT_ACTION A , CNTM_QAXRSN_MAPPING B  WHERE A.QUEUE_ID = B.QUEUE_ID AND A.QUEUE_ID=? AND A.ACTION_ID =? AND B.AUTH_STAT=''A''  UNION  SELECT ''WAITING'','''' FROM DUAL UNION SELECT ''PTP'', '''' FROM DUAL',
'','RESULT_CODE!TEXT!~NEXT_ACTION_ID!TEXT!',
'VARCHAR2~VARCHAR2',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RESULT',
'PCCEXPR',
'SELECT  A.CLASS_CODE,B.CLASS_DESCRIPTION  FROM CFTMS_CHARGE_CLASS A,CSTMS_CLASS B WHERE A.MODULE = ''PC'' AND  B.CLASS_CODE=A.CLASS_CODE ORDER BY A.CLASS_CODE',
'','CLASS_CODE!TEXT!CLASS_CODE~CLASS_DESCRIPTION!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RESULTANT_SECID',
'SEDSDVDF',
'select internal_sec_id,security_description, security_ccy,ccy_name from setms_security_master a,cytms_ccy_defn b where a.auth_stat =''A'' and a.security_type =''E'' and a.record_stat =''O'' and a.security_ccy = b.ccy_code order by internal_sec_id',
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
('LOV_RESULTANT_SECURITY_ID',
'SEDRWDEF',
'SELECT INTERNAL_SEC_ID,SECURITY_DESCRIPTION FROM SETMS_SECURITY_MASTER WHERE ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O'' AND SECURITY_TYPE = (SELECT DECODE( ? , ''W'' , ''B'', ''E'') FROM DUAL) ORDER BY INTERNAL_SEC_ID',
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
('LOV_RES_BRN_CODES',
'EGDEGMST',
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
('LOV_RES_CCY_CODES',
'EGDEGMST',
'Select ccy_code,ccy_name from cytms_ccy_defn where record_stat = ''O'' and auth_stat = ''A'' order by ccy_code',
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
('LOV_REVALINTO',
'RVDSETUP',
'SELECT GL_CODE,GL_DESC FROM GLTMS_GLMASTER WHERE RECORD_STAT=''O'' AND ONCE_AUTH=''Y'' AND CATEGORY IN (''1'',''2'') AND HO_RES = ''A'' AND LEAF = ''Y'' ORDER BY 1',
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
('LOV_REVAL_RATE_CODE',
'IDDACSAL',
'select rate_code, rate_code_description from cftms_rate_code_defn where auth_stat = ''A'' and record_stat = ''O'' order by rate_code',
100,'RATE_CODE!TEXT!RATE_CODE~RATE_CODE_DESCRIPTION!TEXT!RATE_CODE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REVAL_RATE_SOURCE',
'IDDACSAL',
'select rate_source, rate_source_description from cftms_rate_source_defn where record_stat = ''O'' and auth_stat = ''A'' order by rate_source',
100,'RATE_SOURCE!TEXT!RATE_SOURCE~RATE_SOURCE_DESCRIPTION!TEXT!RATE_SOURCE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REVAL_TXN',
'CSCACADD',
'select trn_code, trn_desc from sttm_trn_code where record_stat = ''O'' and once_auth=''Y'' order by trn_code',
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
('LOV_REVAL_TXN_CODE',
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
('LOV_REVERSE_CAT',
'PCDPDCTG',
'SELECT prod_category, category_desc  FROM pctms_product_category WHERE product_type = decode(?,''OC'',''VO'',''$$'') AND collection_type = ''DD'' AND transfer_type = ? AND record_stat = ''O'' AND once_auth = ''Y'' ORDER BY prod_category',
100,'PROD_CATEGORY!TEXT!PROD_CATEGORY~CATEGORY_DESC!TEXT!CATEGORY_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REVERSE_CODE',
'PCDONONL',
'select reject_code, reject_Reason from pctms_reject_code ORDER BY REJECT_CODE',
100,'REJECT_CODE!TEXT!REJECT_CODE~REJECT_REASON!TEXT!REJECT_REASON',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_REV_GL',
'BRDDISCO',
'select gl_code, gl_desc from gltms_glmaster where leaf=''Y'' and category in (''1'',''2'') and record_stat=''O'' and once_auth=''Y'' order by gl_code',
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
('LOV_REV_SETTLE_GL',
'PCDPRMNT',
'select ac_gl_no	from sttbs_account where AC_OR_GL=''G'' and once_auth = ''Y'' order by ac_gl_no',
'','AC_GL_NO!TEXT!AC_GL_NO',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RGN_FINANCIAL_CENTRE',
'IDCINTDT',
'<Long>',
100,'CLEARING_HOUSE!TEXT!CLEARING_HOUSE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RGN_FINANCIAL_CENTRE',
'OTCINTDT',
'SELECT DISTINCT CLEARING_HOUSE FROM STTMS_CLG_HOL_MASTER WHERE RECORD_STAT=''O'' AND AUTH_STAT=''A'' ORDER BY CLEARING_HOUSE',
100,'CLEARING_HOUSE!TEXT!CLEARING_HOUSE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RGREF',
'ISCTXMIS',
'select a.contract_ref_no, a.branch,b.mis_group, b.mis_group_txn,' || chr(10) || '               b.mis_group_comp, b.pool_code, b.txn_mis_1, b.txn_mis_2,' || chr(10) || '               b.txn_mis_3, b.txn_mis_4, b.txn_mis_5, b.txn_mis_6, b.txn_mis_7,' || chr(10) || '               b.txn_mis_8, b.txn_mis_9, b.txn_mis_10, b.comp_mis_1,' || chr(10) || '               b.comp_mis_2, b.comp_mis_3, b.comp_mis_4, b.comp_mis_5,' || chr(10) || '               b.comp_mis_6, b.comp_mis_7, b.comp_mis_8, b.comp_mis_9,' || chr(10) || '               b.comp_mis_10, b.cost_code1, b.cost_code2, b.cost_code3,' || chr(10) || ' b.cost_code4, b.cost_code5 from cstbs_contract a,' || chr(10) || '               mitbs_class_mapping b where a.contract_ref_no = b.unit_ref_no and' || chr(10) || '               a.branch = ? and a.auth_status = ''A'' and a.contract_status = ''A''' || chr(10) || '               Order By contract_ref_no',
100,'CONTRACT_REF_NO!TEXT!contract_ref_no',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RGREF',
'MICJRMIS',
'select a.contract_ref_no, a.branch,b.mis_group, b.mis_group_txn,b.mis_group_comp, b.pool_code, b.txn_mis_1, b.txn_mis_2,b.txn_mis_3, b.txn_mis_4, b.txn_mis_5, b.txn_mis_6, b.txn_mis_7,b.txn_mis_8, b.txn_mis_9, b.txn_mis_10, b.comp_mis_1,b.comp_mis_2, b.comp_mis_3, b.comp_mis_4, b.comp_mis_5,b.comp_mis_6, b.comp_mis_7, b.comp_mis_8, b.comp_mis_9,b.comp_mis_10, b.cost_code1, b.cost_code2, b.cost_code3,b.cost_code4, b.cost_code5 from cstbs_contract a,mitbs_class_mapping b where a.contract_ref_no = b.unit_ref_no and a.branch = ? and a.auth_status = ''A'' and a.contract_status = ''A''',
500,'CONTRACT_REF_NO!TEXT!CONTRACT_REF_NO~BRANCH!TEXT!BRANCH',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RGREF',
'MICMOMIS',
'select a.contract_ref_no, a.branch,b.mis_group, b.mis_group_txn,' || chr(10) || '             b.mis_group_comp, b.pool_code, b.txn_mis_1, b.txn_mis_2,' || chr(10) || '             b.txn_mis_3, b.txn_mis_4, b.txn_mis_5, b.txn_mis_6, b.txn_mis_7,' || chr(10) || '             b.txn_mis_8, b.txn_mis_9, b.txn_mis_10, b.comp_mis_1, b.comp_mis_2,' || chr(10) || '             b.comp_mis_3, b.comp_mis_4, b.comp_mis_5, b.comp_mis_6,' || chr(10) || '             b.comp_mis_7, b.comp_mis_8, b.comp_mis_9, b.comp_mis_10,' || chr(10) || '             b.cost_code1, b.cost_code2, b.cost_code3, b.cost_code4,' || chr(10) || ' b.cost_code5 from cstbs_contract a, mitbs_class_mapping b where' || chr(10) || '             a.contract_ref_no = b.unit_ref_no and a.branch = ? and' || chr(10) || '             a.auth_status = ''A'' and a.contract_status = ''A''',
10,'CONTRACT_REF_NO!TEXT!CONTRACT_REF_NO~BRANCH!TEXT!BRANCH',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RGREF',
'MICTXMIS',
'select a.contract_ref_no, a.branch,b.mis_group, b.mis_group_txn, b.mis_group_comp, b.pool_code, b.txn_mis_1, b.txn_mis_2, b.txn_mis_3, b.txn_mis_4, b.txn_mis_5, b.txn_mis_6, b.txn_mis_7, b.txn_mis_8, b.txn_mis_9, b.txn_mis_10, b.comp_mis_1, b.comp_mis_2, b.comp_mis_3, b.comp_mis_4, b.comp_mis_5, b.comp_mis_6, b.comp_mis_7, b.comp_mis_8, b.comp_mis_9, b.comp_mis_10, b.cost_code1, b.cost_code2, b.cost_code3, b.cost_code4, b.cost_code5 from cstbs_contract a, mitbs_class_mapping b where a.contract_ref_no = b.unit_ref_no and a.branch = ? and a.auth_status = ''A'' and a.contract_status = ''A''',
100,'CONTRACT_REF_NO!TEXT!contract_ref_no',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RG_BRANCH_CODE',
'CIDBRPMT',
'SELECT * FROM ((select a.branch_code, a.branch_name from sttms_branch a where record_stat = ''O'' and auth_stat = ''A'' and a.branch_code =global.current_branch and exists (select ''x''from SMVWS_USER_BRANCH_stat b where a.branch_code = b.branch_code)) UNION (select a.branch_code, a.branch_name from sttms_branch a where record_stat = ''O'' and auth_stat = ''A'' and global.current_branch=(select home_branch from smtb_user where user_id = global.user_id) and a.branch_code <>  global.current_branch and exists (select ''x''from SMVWS_USER_BRANCH_stat b where a.branch_code = b.branch_code))) WHERE 1 = 1',
1000,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RG_BRANCH_CODE',
'CLDBRPMT',
'SELECT * FROM ((select a.branch_code, a.branch_name from sttms_branch a where record_stat = ''O'' and auth_stat = ''A'' and a.branch_code =global.current_branch and exists (select ''x''from SMVWS_USER_BRANCH_stat b where a.branch_code = b.branch_code)) UNION (select a.branch_code, a.branch_name from sttms_branch a where record_stat = ''O'' and auth_stat = ''A'' and global.current_branch=(select home_branch from smtb_user where user_id = global.user_id) and a.branch_code <>  global.current_branch and exists (select ''x''from SMVWS_USER_BRANCH_stat b where a.branch_code = b.branch_code))) WHERE 1 = 1',
1000,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RG_BRANCH_CODE',
'LEDBRPMT',
'SELECT * FROM ((select a.branch_code, a.branch_name from sttms_branch a where record_stat = ''O'' and auth_stat = ''A'' and a.branch_code =global.current_branch and exists (select ''x''from SMVWS_USER_BRANCH_stat b where a.branch_code = b.branch_code)) UNION (select a.branch_code, a.branch_name from sttms_branch a where record_stat = ''O'' and auth_stat = ''A'' and global.current_branch=(select home_branch from smtb_user where user_id = global.user_id) and a.branch_code <>  global.current_branch and exists (select ''x''from SMVWS_USER_BRANCH_stat b where a.branch_code = b.branch_code))) WHERE 1 = 1',
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
('LOV_RG_BRANCH_CODE',
'LSDBRMNT',
'SELECT * FROM ((select a.branch_code, a.branch_name from sttms_branch a where record_stat = ''O'' and auth_stat = ''A'' and a.branch_code =global.current_branch and exists (select ''x''from SMVWS_USER_BRANCH_stat b where a.branch_code = b.branch_code)) UNION (select a.branch_code, a.branch_name from sttms_branch a where record_stat = ''O'' and auth_stat = ''A'' and global.current_branch=(select home_branch from smtb_user where user_id = global.user_id) and a.branch_code <>  global.current_branch and exists (select ''x''from SMVWS_USER_BRANCH_stat b where a.branch_code = b.branch_code))) WHERE 1 = 1',
1000,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RG_CUST_AC',
'CADCHBOO',
'select a.cust_ac_no, a.ac_desc from sttms_cust_account a where a.branch_code = ? and a.cheque_book_facility = ''Y'' and a.record_stat = ''O'' and a.auth_stat = ''A''',
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
('LOV_RIGHTS_1',
'SEDBNKPM',
'select a.combination_product,b.product_description from setms_combination_product a, cstms_product b where a.buy_product_type = ''CB'' and a.sell_product_type = ''CS'' and a.rights_exercise = ''Y'' and a.combination_product = b.product_code and b.record_stat = ''O'' and b.auth_stat = ''A'' order by a.combination_product',
100,'COMBINATION_PRODUCT!TEXT!COMBINATION_PRODUCT~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RIGHTS_2',
'SEDBNKPM',
'select a.combination_product,b.product_description from setms_combination_product a, cstms_product b where a.buy_product_type = ''CB'' and a.sell_product_type = ''BS'' and a.rights_exercise = ''N'' and a.combination_product = b.product_code and b.record_stat = ''O'' and b.auth_stat = ''A'' order by a.combination_product',
100,'COMBINATION_PRODUCT!TEXT!COMBINATION_PRODUCT~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RIGHTS_3',
'SEDBNKPM',
'select a.combination_product,b.product_description from setms_combination_product a, cstms_product b where a.buy_product_type = ''CB'' and a.sell_product_type = ''CS'' and a.rights_exercise = ''N'' and a.combination_product = b.product_code and b.auth_stat = ''A'' and b.record_stat = ''O'' order by a.combination_product',
100,'COMBINATION_PRODUCT!TEXT!COMBINATION_PRODUCT~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RIGHTS_4',
'SEDBNKPM',
'select a.combination_product,b.product_description from setms_combination_product a, cstms_product b where a.buy_product_type = ''BB'' and a.sell_product_type = ''CS'' and a.rights_exercise = ''N'' and a.combination_product = b.product_code and b.record_stat = ''O'' and b.auth_stat = ''A'' order by a.combination_product',
100,'COMBINATION_PRODUCT!TEXT!COMBINATION_PRODUCT~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RIGHTS_5',
'SEDBNKPM',
'select a.combination_product,b.product_description from setms_combination_product a, cstms_product b where a.buy_product_type = ''CB'' and a.sell_product_type = ''CS'' and a.rights_exercise = ''N'' and a.combination_product = b.product_code and b.auth_stat = ''A'' and b.record_stat = ''O'' order by a.combination_product',
100,'COMBINATION_PRODUCT!TEXT!COMBINATION_PRODUCT~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RIGHTS_6',
'SEDBNKPM',
'select a.combination_product,b.product_description from setms_combination_product a, cstms_product b where a.buy_product_type = ''BB'' and a.sell_product_type = ''CS'' and a.rights_exercise = ''N'' and a.combination_product = b.product_code and b.record_stat = ''O'' and b.auth_stat = ''A'' order by a.combination_product',
100,'COMBINATION_PRODUCT!TEXT!COMBINATION_PRODUCT~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RIGHTS_7',
'SEDBNKPM',
'select a.combination_product,b.product_description from setms_combination_product a, cstms_product b where a.buy_product_type = ''CB'' and a.sell_product_type = ''CS'' and a.rights_exercise = ''N'' and a.combination_product = b.product_code and b.auth_stat = ''A'' and b.record_stat = ''O'' order by a.combination_product',
100,'COMBINATION_PRODUCT!TEXT!COMBINATION_PRODUCT~PRODUCT_DESCRIPTION!TEXT!PRODUCT_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RISK_CATEGORY',
'CSDRPMNT',
'SELECT RISK_CATEGORY,DESCRIPTION FROM STTMS_RISK_CATEGORY WHERE RECORD_STAT=''O'' AND ONCE_AUTH=''Y''',
50,'RISK_CATEGORY!TEXT!RISK_CATEGORY',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RISK_CATEGORY',
'STDCCIF',
'select  RISK_CATEGORY,description  from STTMS_RISK_CATEGORY where  RECORD_STAT = ''O'' and AUTH_STAT = ''A''',
100,'RISK_CATEGORY!TEXT!RISK_CATEGORY~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RISK_CATEGORY',
'STDCIF',
'select  RISK_CATEGORY,description  from STTMS_RISK_CATEGORY where  RECORD_STAT = ''O'' and AUTH_STAT = ''A''',
100,'RISK_CATEGORY!TEXT!RISK_CATEGORY~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RISK_CATEGORY',
'STDCOCIF',
'select  RISK_CATEGORY,description  from STTMS_RISK_CATEGORY where  RECORD_STAT = ''O'' and AUTH_STAT = ''A''',
100,'RISK_CATEGORY!TEXT!RISK_CATEGORY~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RISK_WEIGHT',
'DVDCPMNT',
'select line_code || line_serial linecode from stvw_core_el_facility where liab_id IN (select liab_id from STVW_CORE_EL_liab_cust where customer_no = ?)  and record_stat = ''O'' and auth_stat = ''A'' order by line_code',
100,'LINECODE!TEXT!LINECODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RISK_WEIGHT',
'IDDACSAL',
'SELECT LINES FROM (select CSPKE_MISC.FN_GETPARAM(dvpks_upload_validations.fn_fetch_valid_lines(?,?,?,?,?),ROWNUM)  lines from DUAL CONNECT BY  LEVEL<=dvpks_upload_validations.fn_NUM_CHARS(dvpks_upload_validations.fn_fetch_valid_lines(?,?,?,?,?)))order by LINES',
100,'LINES!TEXT!LINES',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RISK_WEIGHT',
'IDDMACOD',
'select line_cd||line_serial linecode from lmtbs_limits where liab_id = (select liability_no from sttms_customer where customer_no = ?) and record_stat = ''O'' and auth_stat = ''A'' order by line_cd',
100,'LINECODE!TEXT!LINECODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RLTDACUNT',
'ISCTXMIS',
'select a.cust_ac_no, b.mis_group, b.mis_group_txn,' || chr(10) || '               b.mis_group_comp, b.pool_code, b.txn_mis_1, b.txn_mis_2,' || chr(10) || '               b.txn_mis_3, b.txn_mis_4, b.txn_mis_5, b.txn_mis_6, b.txn_mis_7,' || chr(10) || '               b.txn_mis_8, b.txn_mis_9, b.txn_mis_10, b.comp_mis_1,' || chr(10) || '               b.comp_mis_2, b.comp_mis_3, b.comp_mis_4, b.comp_mis_5,' || chr(10) || '               b.comp_mis_6, b.comp_mis_7, b.comp_mis_8, b.comp_mis_9,' || chr(10) || '               b.comp_mis_10, b.cost_code1, b.cost_code2, b.cost_code3,' || chr(10) || '              b.cost_code4, b.cost_code5 from sttms_cust_account a,' || chr(10) || '               mitbs_class_mapping b where a.cust_ac_no = b.unit_ref_no and' || chr(10) || '               a.branch_code = ? and a.auth_stat = ''A'' and a.record_stat =' || chr(10) || '               ''O''Order By cust_ac_no',
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
('LOV_RLTDACUNT',
'MICJRMIS',
'select Distinct a.cust_ac_no, b.mis_group, b.mis_group_txn,b.mis_group_comp, b.pool_code, b.txn_mis_1, b.txn_mis_2,b.txn_mis_3, b.txn_mis_4, b.txn_mis_5, b.txn_mis_6, b.txn_mis_7,b.txn_mis_8, b.txn_mis_9, b.txn_mis_10, b.comp_mis_1, b.comp_mis_2,b.comp_mis_3, b.comp_mis_4, b.comp_mis_5, b.comp_mis_6,b.comp_mis_7, b.comp_mis_8, b.comp_mis_9, b.comp_mis_10,b.cost_code1, b.cost_code2, b.cost_code3, b.cost_code4,b.cost_code5  from sttms_cust_account a, mitbs_class_mapping b where a.cust_ac_no = b.unit_ref_no and a.branch_code = ? and a.branch_code =b.branch_code and a.auth_stat  = ''A'' and a.record_stat = ''O''',
500,'CUST_AC_NO!TEXT!CUST_AC_NO~MIS_GROUP!TEXT!MIS_GROUP',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RLTDACUNT',
'MICMOMIS',
'select a.cust_ac_no, b.mis_group, b.mis_group_txn,' || chr(10) || '             b.mis_group_comp, b.pool_code, b.txn_mis_1, b.txn_mis_2,' || chr(10) || '             b.txn_mis_3, b.txn_mis_4, b.txn_mis_5, b.txn_mis_6, b.txn_mis_7,' || chr(10) || '             b.txn_mis_8, b.txn_mis_9, b.txn_mis_10, b.comp_mis_1, b.comp_mis_2,' || chr(10) || '             b.comp_mis_3, b.comp_mis_4, b.comp_mis_5, b.comp_mis_6,' || chr(10) || '             b.comp_mis_7, b.comp_mis_8, b.comp_mis_9, b.comp_mis_10,' || chr(10) || '             b.cost_code1, b.cost_code2, b.cost_code3, b.cost_code4,' || chr(10) || '            b.cost_code5 from sttms_cust_account a, mitbs_class_mapping b where' || chr(10) || '             a.cust_ac_no = b.unit_ref_no and a.branch_code = ? and a.auth_stat' || chr(10) || '             = ''A'' and a.record_stat = ''O''',
10,'CUST_AC_NO!TEXT!CUST_AC_NO~MIS_GROUP!TEXT!MIS_GROUP',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RLTDACUNT',
'MICTXMIS',
'select distinct a.cust_ac_no, b.mis_group, b.mis_group_txn, b.mis_group_comp, b.pool_code, b.txn_mis_1, b.txn_mis_2, b.txn_mis_3, b.txn_mis_4, b.txn_mis_5, b.txn_mis_6, b.txn_mis_7, b.txn_mis_8, b.txn_mis_9, b.txn_mis_10, b.comp_mis_1, b.comp_mis_2, b.comp_mis_3, b.comp_mis_4, b.comp_mis_5, b.comp_mis_6, b.comp_mis_7, b.comp_mis_8, b.comp_mis_9, b.comp_mis_10, b.cost_code1, b.cost_code2, b.cost_code3, b.cost_code4, b.cost_code5 from sttms_cust_account a, mitbs_class_mapping b where a.cust_ac_no = b.unit_ref_no and b.branch_code = ? and a.auth_stat = ''A'' and a.record_stat = ''O''',
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
('LOV_ROLE',
'CSDRHMCL',
'SELECT ROLE_CODE, ROLE_DESCRIPTION FROM CSTBS_ACCROLE WHERE MODULE = ? AND nvl(ROLE_TYPE,''$'') <> ''X''ORDER BY ROLE_CODE ASC',
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
('LOV_ROLE',
'RPDRNMNT',
'select distinct role_id, role_description from (select distinct a.role_id, b.role_description from smvws_role_branches a, smtbs_role_master b where a.branch = ? and a.role_id = b.role_id minus select u.role_id, v.role_description from rptms_printer_role u, smtbs_role_master v where u.branch_id = global.current_branch and u.printer_id = ? and u.role_id = v.role_id)where 1=1',
200,'ROLE_ID!TEXT!ROLE_ID~ROLE_DESCRIPTION!TEXT!ROLE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ROLE',
'SMDUSERD',
'SELECT DISTINCT ROLE_ID,ROLE_DESCRIPTION FROM SMTB_ROLE_MASTER WHERE ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O'' ORDER BY ROLE_ID',
1000,'ROLE_ID!TEXT!ROLE_ID~ROLE_DESCRIPTION!TEXT!ROLE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ROLE',
'SMDUSRDF',
'SELECT DISTINCT ROLE_ID,ROLE_DESCRIPTION FROM SMTB_ROLE_MASTER WHERE ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O'' ORDER BY ROLE_ID',
1000,'ROLE_ID!TEXT!ROLE_ID~ROLE_DESCRIPTION!TEXT!ROLE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ROLE',
'SMRROLPR',
'SELECT ROLE_ID, ROLE_DESCRIPTION FROM SMTB_ROLE_MASTER WHERE RECORD_STAT =''O'' AND AUTH_STAT =''A'' ORDER BY ROLE_ID',
500,'ROLE_ID!TEXT!ROLE_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ROLE',
'SMRSUMRY',
'SELECT ROLE_ID, ROLE_DESCRIPTION FROM SMTB_ROLE_MASTER WHERE RECORD_STAT =''O'' AND AUTH_STAT =''A''',
500,'ROLE_ID!TEXT!ROLE_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ROLEID',
'SMRPRLPR',
'SELECT ROLE_ID,ROLE_DESCRIPTION FROM SMTBS_ROLE_MASTER WHERE AUTH_STAT=''A'' AND RECORD_STAT=''O''',
'','ROLE_ID!TEXT!ROLE_ID~ROLE_DESCRIPTION!TEXT!ROLE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ROLE_BRANCH',
'SMDUSERD',
'SELECT BRANCH_CODE,BRANCH_NAME FROM STTM_BRANCH WHERE RECORD_STAT = ''O'' AND ONCE_AUTH=''Y'' ORDER BY BRANCH_CODE',
1000,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ROLE_BRANCH',
'SMDUSRDF',
'SELECT BRANCH_CODE,BRANCH_NAME FROM STTM_BRANCH WHERE RECORD_STAT = ''O'' AND ONCE_AUTH=''Y'' ORDER BY BRANCH_CODE',
1000,'BRANCH_CODE!TEXT!BRANCH_CODE~BRANCH_NAME!TEXT!BRANCH_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ROLE_TO_HEAD_CLASS1',
'EDDPFMNT',
'SELECT class_code,class_description FROM cstms_class WHERE module = ''EP'' AND class_type = ''RH'' AND nvl(once_auth,''N'')=''Y'' AND record_stat = ''O'' ORDER BY class_code',
15,'CLASS_CODE!TEXT!CLASS_CODE~CLASS_DESCRIPTION!TEXT!CLASS_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ROLE_TO_HEAD_CLASS2',
'EDDPFMNT',
'SELECT class_code,class_description FROM cstms_class WHERE module = ''EP'' AND class_type = ''RH'' AND nvl(once_auth,''N'')=''Y'' AND record_stat = ''O'' ORDER BY class_code',
15,'CLASS_CODE!TEXT!CLASS_CODE~CLASS_DESCRIPTION!TEXT!CLASS_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ROLE_TO_HEAD_CLASS3',
'EDDPFMNT',
'SELECT class_code,class_description FROM cstms_class WHERE module = ''EP'' AND class_type = ''RH'' AND nvl(once_auth,''N'')=''Y'' AND record_stat = ''O'' ORDER BY class_code',
15,'CLASS_CODE!TEXT!CLASS_CODE~CLASS_DESCRIPTION!TEXT!CLASS_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ROLL_COMP',
'CIDACCDT',
'select COMPONENT_NAME,COMPONENT_DESC from cltm_product_components where product_code = ?',
50,'COMPONENT_NAME!TEXT!COMPONENT_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ROLL_COMP',
'CLDACCDT',
'select COMPONENT_NAME,COMPONENT_DESC from cltm_product_components where product_code = ? and NVL(comp_reporting_type, ''#'') <> ''PV''',
50,'COMPONENT_NAME!TEXT!COMPONENT_NAME~COMPONENT_DESC!TEXT!COMPONENT_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ROLL_COMP',
'CLDLOTEM',
'select COMPONENT_NAME,COMPONENT_DESC from cltm_product_components where product_code = ? and NVL(comp_reporting_type, ''#'') <> ''PV''',
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
('LOV_ROLL_COMP',
'CLDPRMNT',
'Select item_name, item_desc from cltm_product_dynamic_data where ACTION_CODE = ''POPLIQORDER'' and product_code =?',
100,'ITEM_NAME!TEXT!ITEM_NAME~ITEM_DESC!TEXT!ITEM_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ROLL_COMP',
'LEDACCDT',
'select COMPONENT_NAME,COMPONENT_DESC from cltm_product_components where product_code = ? and NVL(comp_reporting_type, ''#'') <> ''PV''',
50,'COMPONENT_NAME!TEXT!COMPONENT_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ROLL_COMP',
'LSDTRONL',
'select COMPONENT_NAME,COMPONENT_DESC from cltm_product_components where product_code = ?',
50,'COMPONENT_NAME!TEXT!COMPONENT_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ROLL_COMP',
'MODACCDT',
'',50,'COMPONENT_NAME!TEXT!COMPONENT_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ROUNDING_PARTICIPANT',
'LDDBRMNT',
'Select customer_no,customer_name1 FROM sttms_customer WHERE record_stat =''O'' AND once_auth = ''Y'' order by customer_no',
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
('LOV_ROUTE_CODE',
'ILDMIRAC',
'SELECT route_code FROM CSTM_ARC_SETTLE where record_stat=''O'' and once_auth=''Y''order by route_code',
100,'ROUTE_CODE!TEXT!ROUTE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ROUTINGBANK',
'ISCONDET',
'select bank_code,bank_name from ( select a.bank_code,a.bank_name from pctms_bank_param a,sttms_branch b where a.record_stat=''O'' and a.auth_stat = ''A''and b.branch_code = ? and a.bank_code <> b.clearing_bank_code ) where 1=1  order by bank_code',
100,'BANK_CODE!TEXT!BANK_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_ROUTINGBANK',
'PCDBNKMT',
'select a.bank_code,a.bank_name from pctms_bank_param a,pctms_bank_clg_network b where a.record_stat=''O'' and a.once_auth=''Y'' and a.bank_code <>? and a.bank_code=b.bank_code and b.routing=''D'' and b.network_id=? AND ? = ''I'' order by bank_code',
100,'BANK_CODE!TEXT!LBL_ROUTING_BANKCODE~BANK_NAME!TEXT!BANK_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RSK_PRFL',
'STDCCIF',
'select distinct risk_profile from setms_risk_profile_mast where auth_stat=''A'' and record_stat=''O'' order by risk_profile',
100,'RISK_PROFILE!TEXT!RISK_PROFILE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RSK_PRFL',
'STDCIF',
'select distinct risk_profile from setms_risk_profile_mast where auth_stat=''A'' and record_stat=''O'' order by risk_profile',
100,'RISK_PROFILE!TEXT!RISK_PROFILE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RSK_PRFL',
'STDCOCIF',
'select distinct risk_profile from setms_risk_profile_mast where auth_stat=''A'' and record_stat=''O'' order by risk_profile',
100,'RISK_PROFILE!TEXT!RISK_PROFILE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RS_CLASS',
'SEDPFPRD',
'SELECT CLASS_CODE,CLASS_DESCRIPTION FROM CSTMS_CLASS WHERE CLASS_TYPE = ''SR'' AND RECORD_STAT = ''O'' AND ONCE_AUTH =''Y'' AND MODULE =''SP'' ORDER BY CLASS_CODE',
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
('LOV_RTCD',
'CFCINCHG',
'SELECT *' || chr(10) || '  FROM (select distinct a.rate_code, a.rate_descr' || chr(10) || '          from cftms_rate_code a, cftms_float_rate_master b' || chr(10) || '         where a.rate_code = b.rate_code' || chr(10) || '           and a.record_stat = ''O''' || chr(10) || '           and a.auth_stat = ''A''' || chr(10) || '           and b.ccy_code = ?' || chr(10) || '           and a.branch_code = ?' || chr(10) || '           and a.branch_code = b.branch_code)' || chr(10) || ' WHERE 1 = 1' || chr(10) || '',
10,'RATE_CODE!TEXT!RATE_CODE~RATE_DESCR!TEXT!RATE_DESCR' || chr(10) || '',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RTCD',
'CFINTCHG',
'select distinct a.rate_code, a.rate_descr from cftms_rate_code a, cftms_float_rate_master b where a.rate_code = b.rate_code and a.record_stat = ''O'' and a.auth_stat = ''A'' and b.ccy_code = ? and a.branch_code = ? and a.branch_code = b.branch_code',
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
('LOV_RTH',
'AMDFNONL',
'select class_code,class_description from cstms_class where module = ''AM'' and class_type = ''RH'' and ONCE_AUTH = ''Y''',
100,'CLASS_CODE!TEXT!CLASS_CODE~CLASS_DESCRIPTION!TEXT!CLASS_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RTH',
'IADFNONL',
'select class_code,class_description from cstms_class where module = ''AM'' and class_type = ''RH'' and ONCE_AUTH = ''Y''',
100,'CLASS_CODE!TEXT!CLASS_CODE~CLASS_DESCRIPTION!TEXT!CLASS_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RTH1',
'SEDPFONL',
'SELECT CLASS_CODE, CLASS_DESCRIPTION  FROM CSTMS_CLASS WHERE MODULE = ''SP'' AND CLASS_TYPE = ''RH'' AND AUTH_STAT = ''A'' AND ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O'' ORDER BY CLASS_CODE',
100,'CLASS_CODE!TEXT!CLASS_CODE~CLASS_DESCRIPTION!TEXT!CLASS_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RTH2',
'SEDPFONL',
'SELECT CLASS_CODE, CLASS_DESCRIPTION  FROM CSTMS_CLASS WHERE MODULE = ''SP'' AND CLASS_TYPE = ''RH'' AND AUTH_STAT = ''A'' AND ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O'' ORDER BY CLASS_CODE',
100,'CLASS_CODE!TEXT!CLASS_CODE~CLASS_DESCRIPTION!TEXT!CLASS_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RTH3',
'SEDPFONL',
'SELECT CLASS_CODE, CLASS_DESCRIPTION  FROM CSTMS_CLASS WHERE MODULE = ''SP'' AND CLASS_TYPE = ''RH'' AND AUTH_STAT = ''A'' AND ONCE_AUTH = ''Y'' AND RECORD_STAT = ''O'' ORDER BY CLASS_CODE',
100,'CLASS_CODE!TEXT!CLASS_CODE~CLASS_DESCRIPTION!TEXT!CLASS_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RTPROD',
'STDCLOSE',
'SELECT DISTINCT PRODUCT_CODE, PRODUCT_DESCRIPTION FROM CSTM_PRODUCT A, IFTM_ARC_MAINT B WHERE A.PRODUCT_CODE = B.COD_PROD_ACC_CLS AND A.MODULE = ''RT'' AND A.ONCE_AUTH = ''Y'' AND A.RECORD_STAT = ''O''',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE',
'BCDPRMNT',
'select rule, description from cftms_rule where record_stat = ''O''' || chr(10) || '               and ONCE_AUTH= ''Y''and currency = ''ALL'' and currency2 = ''ALL'' and' || chr(10) || '               customer = ''ALL'' and customer_group=''ALL'' and branch_code=''ALL''' || chr(10) || '               order by rule',
100,'RULE!TEXT!RULE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE',
'BRDASSOC',
'select rule, description from CFTM_RULE where type=''B'' and record_stat = ''O'' and once_auth = ''Y'' order by rule',
100,'RULE!TEXT!RULE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE',
'CFCINCLS',
'select rule, description from cftms_rule where record_stat = ''O'' and auth_stat = ''A''and currency = ''ALL'' and currency2 = ''ALL'' and customer = ''ALL'' and customer_group=''ALL'' and branch_code=''ALL'' and type = ''I''',
100,'RULE!TEXT!RULE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE',
'CFCONCHG',
'select rule,description from cftms_rule where currency = ''ALL'' and currency2 = ''ALL'' and customer = ''ALL'' and customer_group=''ALL'' and branch_code=''ALL''',
10,'','','','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE',
'CFCPRACF',
'select distinct rule from cftms_rule where type=''H'' and once_auth=''Y'' and record_stat=''O'' order by rule',
200,'RULE!TEXT!RULE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE',
'CFCPRCHG',
'select rule,description from cftms_rule where currency = ''ALL'' and currency2 = ''ALL'' and customer = ''ALL'' and customer_group=''ALL'' and branch_code=''ALL''and type = ''H'' order by rule',
100,'RULE!TEXT!RULE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE',
'CFDCHGCL',
'SELECT RULE,DESCRIPTION  FROM CFTMS_RULE  WHERE CURRENCY = ''ALL''  AND CURRENCY2 = ''ALL''  AND CUSTOMER = ''ALL'' AND CUSTOMER_GROUP=''ALL'' AND BRANCH_CODE=''ALL'' AND TYPE=''H'' AND RECORD_STAT =''O'' AND ONCE_AUTH =''Y'' ORDER BY RULE',
100,'RULE!TEXT!RULE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE',
'CFDCOMCL',
'SELECT RULE,DESCRIPTION FROM CFTMS_RULE WHERE RECORD_STAT=''O'' AND AUTH_STAT=''A'' AND CURRENCY=''ALL'' AND CURRENCY2=''ALL'' AND CUSTOMER=''ALL'' AND CUSTOMER_GROUP=''ALL'' AND BRANCH_CODE=''ALL'' AND TYPE<>''H''',
100,'RULE!TEXT!RULE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE',
'CFDINCLS',
'select rule, description from cftms_rule where record_stat = ''O'' and auth_stat = ''A'' and currency = ''ALL'' and currency2 = ''ALL''  and customer = ''ALL'' and customer_group=''ALL'' and branch_code=''ALL'' and type = ''I'' order by rule',
100,'RULE!TEXT!RULE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE',
'CFDRUMNT',
'SELECT DISTINCT RULE_ID,DESCRIPTION FROM(SELECT A.RULE_ID, B.DESCRIPTION FROM CFVWS_RES_ICCF A, CFTBS_ICCF_RLBRN B WHERE A.BRANCH_CODE = DECODE(?, ''ALL'', a.branch_code, global.current_branch) AND   A.RULE_ID = B.RULE_ID) WHERE 1=1  ORDER BY RULE_ID',
200,'RULE_ID!TEXT!RULE_ID~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE',
'FXDPRMNT',
'select rule, description from cftms_rule where record_stat = ''O'' and auth_stat = ''A'' and currency = ''ALL'' and currency2 = ''ALL'' and customer = ''ALL'' and customer_group = ''ALL'' and branch_code = ''ALL'' and type = ''H'' order by rule',
500,'RULE!TEXT!RULE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE',
'ICDISFM',
'select rule_id, frm_no from (select f.rule_id rule_id, f.frm_no frm_no from ictms_rule_frm f, ictm_rule r where f.book_flag in (''B'', ''T'', ''N'') and f.rule_id || ltrim(rtrim(to_char(f.frm_no))) not in(select i.rule_id || ltrim(rtrim(to_char(i.frm_no))) from ictms_is_fmt i) and r.rule_id = f.rule_id and r.moduleid = ''IC'' and r.record_stat = ''O'' and r.auth_stat = ''A'' and exists(select ''x'' from ictm_rule_frm_elements a where a.rule_id = f.rule_id and a.frm_no = f.frm_no) AND IL_RULE = ''N'') where 1 = 1 order by rule_id',
100,'RULE_ID!TEXT!RULE_ID~FRM_NO!TEXT!FRM_NO',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE',
'IPDISFM',
'select rule_id, frm_no from (select f.rule_id rule_id, f.frm_no frm_no from ictms_rule_frm f, ictm_rule r where f.book_flag in (''B'', ''T'', ''N'') and f.rule_id || ltrim(rtrim(to_char(f.frm_no))) not in (select i.rule_id || ltrim(rtrim(to_char(i.frm_no))) from ictms_is_fmt i) and r.rule_id = f.rule_id and r.moduleid = ''IP'' and r.record_stat = ''O'' and r.auth_stat = ''A'' and exists (select ''x'' from ictm_rule_frm_elements a where a.rule_id = f.rule_id and a.frm_no = f.frm_no) AND IL_RULE = ''N'') where 1 = 1 order by rule_id',
100,'RULE_ID!TEXT!RULE_ID~FRM_NO!TEXT!FRM_NO',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE',
'ISCINCLS',
'select rule, description from cftms_rule where record_stat = ''O'' and auth_stat = ''A''and currency = ''ALL'' and currency2 = ''ALL'' and customer = ''ALL'' and customer_group=''ALL'' and branch_code=''ALL'' and type = ''I''Order By rule',
100,'RULE!TEXT!RULE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE',
'LCDPRMNT',
'SELECT RULE,DESCRIPTION FROM CFTMS_RULE WHERE RECORD_STAT=''O'' AND AUTH_STAT=''A'' AND CURRENCY=''ALL'' AND CURRENCY2=''ALL'' AND CUSTOMER=''ALL'' AND CUSTOMER_GROUP=''ALL'' AND BRANCH_CODE=''ALL'' AND TYPE<>''H'' ORDER BY RULE',
100,'RULE!TEXT!RULE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE',
'PDDPRMNT',
'select rule, description from cftms_rule where record_stat = ''O'' and once_auth = ''Y'' and currency = ''ALL'' and currency2 = ''ALL'' and customer = ''ALL'' and customer_group=''ALL'' and branch_code=''ALL''',
500,'RULE!TEXT!RULE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE',
'REDCLASS',
'select distinct match_rule_id, match_rule_description from retms_match_rule_defn where record_stat = ''O'' and auth_stat = ''A'' and match_rule_id not in (select match_rule_id from retms_class_rule_seq where recon_class = ? ) order by match_rule_id',
100,'MATCH_RULE_ID!TEXT!MATCH_RULE_ID~MATCH_RULE_DESCRIPTION!TEXT!MATCH_RULE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE',
'REDEXTAC',
'SELECT DISTINCT MATCH_RULE_ID, MATCH_RULE_DESCRIPTION FROM RETMS_MATCH_RULE_DEFN WHERE RECORD_STAT = ''O'' AND AUTH_STAT = ''A'' AND MATCH_RULE_ID NOT IN (SELECT MATCH_RULE_ID FROM RETMS_EXTACC_RULE_SEQ WHERE RECON_CLASS = ? AND EXTERNAL_ENTITY = ? AND EXTERNAL_ACCOUNT = ?)',
100,'MATCH_RULE_ID!TEXT!MATCH_RULE_ID~MATCH_RULE_DESCRIPTION!TEXT!MATCH_RULE_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE',
'SIDPRMNT',
'select rule, description from cftms_rule where record_stat = ''O'' and auth_stat = ''A''and currency = ''ALL'' and currency2 = ''ALL'' and customer = ''ALL'' and customer_group=''ALL'' and branch_code=''ALL''',
500,'RULE!TEXT!RULE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE',
'TACTAXCL',
'SELECT DISTINCT RULE_CODE,DESCRIPTION FROM TATMS_RULE WHERE RECORD_STAT = ''O'' AND AUTH_STAT = ''A'' ORDER BY RULE_CODE',
100,'RULE_CODE!TEXT!RULE_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE',
'TADSCHEM',
'select distinct a.rule_code, a.description from tatms_rule a where a.once_auth = ''Y'' and a.record_stat = ''O'' and a.cust_category = ''ALL'' and a.country_code = ''ALL'' and a.effective_date = (select min(b.effective_date) from tatms_rule b where a.rule_code = b.rule_code) and a.rule_code not in (select distinct rule from tatms_scheme_detail where scheme_code = ?) order by a.rule_code',
100,'RULE_CODE!TEXT!RULE_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE',
'TARAYABL',
'select distinct rule_code, description from tatms_rule where auth_stat=''A'' and record_stat=''O'' order by rule_code',
200,'RULE_CODE!TEXT!RULE_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE_BOOK',
'FIDRULMP',
'SELECT RULE_CODE FROM FATMS_RULE_MASTER WHERE ONCE_AUTH = ''Y'' AND RECORD_STAT= ''O''  ORDER BY RULE_CODE',
100,'RULE_CODE!TEXT!RULE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE_FOR_TRAN',
'TADTAXCL',
'select rule_code,description from tatms_rule where record_stat = ''O'' and once_auth = ''Y'' order by rule_code',
100,'RULE_CODE!TEXT!RULE_CODE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE_ID',
'CFDOCHCL',
'SELECT RULE, DESCRIPTION FROM CFTMS_RULE WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' AND CURRENCY = ''ALL'' AND CURRENCY2 = ''ALL'' AND CUSTOMER = ''ALL'' AND CUSTOMER_GROUP=''ALL'' AND BRANCH_CODE=''ALL'' AND TYPE = ''H'' ORDER BY RULE',
100,'RULE!TEXT!RULE~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE_ID',
'RERPMC',
'select distinct match_rule_id from retbs_match_master where recon_class = ? and external_entity = ? and external_account = ?',
200,'MATCH_RULE_ID!TEXT!MATCH_RULE_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE_MAIN',
'CFDRUMNT',
'SELECT * FROM(SELECT  A.BRANCH_CODE, B.BRANCH_NAME FROM CFVWS_RES_ICCF A,STTMS_BRANCH B WHERE A.RULE_ID= ? AND A.BRANCH_CODE <> ''ALL'' AND A.BRANCH_CODE = B.BRANCH_CODE UNION SELECT ''ALL'',''All Branches'' FROM DUAL) WHERE 1=1',
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
('LOV_RULE_NAME',
'CIDACCDT',
'SELECT RULE_NAME FROM CLTMS_CREDIT_SCORE_RULE WHERE PRODUCT_CODE = ?',
100,'RULE_NAME!TEXT!RULE_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE_NAME',
'CLDACCDT',
'SELECT RULE_NAME FROM CLTMS_CREDIT_SCORE_RULE WHERE PRODUCT_CODE = ?',
10,'RULE_NAME!TEXT!RULE_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE_NAME',
'CLDLOTEM',
'SELECT RULE_NAME FROM CLTMS_CREDIT_SCORE_RULE WHERE PRODUCT_CODE = ?',
10,'RULE_NAME!TEXT!RULE_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE_NAME',
'LEDACCDT',
'SELECT RULE_NAME FROM CLTMS_CREDIT_SCORE_RULE WHERE PRODUCT_CODE = ?',
10,'RULE_NAME!TEXT!RULE_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE_NAME',
'MODACCDT',
'',10,'RULE_NAME!TEXT!RULE_NAME',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE_SCHEME',
'SEDDLPRD',
'SELECT DISTINCT RULE_CODE, DESCRIPTION FROM TATMS_RULE WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY RULE_CODE',
'','RULE_CODE!TEXT!~DESCRIPTION!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RULE_TAX',
'FIDRULMP',
'SELECT RULE_CODE FROM FATMS_RULE_MASTER WHERE ONCE_AUTH = ''Y'' AND RECORD_STAT= ''O''  ORDER BY RULE_CODE',
100,'RULE_CODE!TEXT!RULE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RVLTRNCODE',
'RVDSETUP',
'SELECT TRN_CODE , TRN_DESC FROM STTMS_TRN_CODE WHERE RECORD_STAT=''O'' AND ONCE_AUTH=''Y'' ORDER BY 1',
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
('LOV_RVN_CCY',
'LDDCONON',
'select ccy_code, ccy_name from cytms_ccy_defn where record_stat = ''O'' and once_auth = ''Y'' order by 1',
300,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RVN_CCY',
'MCDCONON',
'select ccy_code, ccy_name from cytms_ccy_defn where record_stat = ''O'' and auth_stat = ''A''',
10,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RVN_CCY',
'SRDCONON',
'select ccy_code, ccy_name from cytms_ccy_defn where record_stat = ''O'' and auth_stat = ''A''',
10,'CCY_CODE!TEXT!CCY_CODE~CCY_NAME!TEXT!CCY_NAME',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RVN_CCY_CODE',
'IDCINTDT',
'<Long>',
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
('LOV_RVN_CCY_CODE',
'OTCINTDT',
'SELECT CCY_CODE,CCY_NAME FROM CYTMS_CCY_DEFN WHERE AUTH_STAT=''A'' AND RECORD_STAT=''O'' ORDER BY CCY_CODE',
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
('LOV_RVT_CODE',
'CODCURVT',
'SELECT RVT_CODE,RVT_DESC FROM COTMS_RVT WHERE AUTH_STAT=''A''AND RECORD_STAT=''O''',
100,'RVT_CODE!TEXT!RVT_CODE~RVT_DESC!TEXT!RVT_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_RW_LINE_CODE',
'OTDCNONL',
'SELECT LINE_CD FROM(SELECT LINE_CD||LINE_SERIAL LINE_CD FROM ELVW_LIMITS_INT L WHERE L.LIAB_ID=(SELECT CUST1.LIABILITY_NO FROM' || chr(10) || '   STTMS_CUSTOMER CUST1 WHERE CUST1.CUSTOMER_NO=?)AND NVL(L.LAST_NEW_UTIL_DATE,TO_DATE(''' || chr(10) || '                 99991231'',''YYYYMMDD' || chr(10) || '                 ''))>=(SELECT DATES.TODAY FROM STTMS_DATES DATES WHERE DATES.BRANCH_CODE=GLOBAL.CURRENT_BRANCH) AND L.RECORD_STAT=''O' || chr(10) || '                 '' AND L.AUTH_STAT=''A'' AND L.AVAILABILITY_FLAG=''Y''' || chr(10) || '                 AND(L.LINE_CURRENCY=? OR L.CCY_RESTRICTION=''N'')AND(EXISTS(SELECT * FROM ELVW_LIMITS_CUST_REST_INT CR WHERE' || chr(10) || '                 CR.LIAB_ID=(SELECT CUST2.LIABILITY_NO FROM STTMS_CUSTOMER CUST2' || chr(10) || '                 WHERE CUST2.CUSTOMER_NO=?)AND CR.LINE_CD=L.LINE_CD AND CR.LINE_SERIAL=L.LINE_SERIAL AND CR.CUSTOMER_NO=?)OR NOT EXISTS' || chr(10) || '                 (SELECT * FROM ELVW_LIMITS_CUST_REST_INT CR  WHERE CR.LIAB_ID=(SELECT CUST3.LIABILITY_NO FROM STTMS_CUSTOMER CUST3 WHERE' || chr(10) || '                 CUST3.CUSTOMER_NO=?)AND CR.LINE_CD=L.LINE_CD AND CR.LINE_SERIAL=L.LINE_SERIAL))AND(EXISTS(SELECT * FROM' || chr(10) || '                 ELVW_LIMITS_PROD_REST_INT PR WHERE PR.LIAB_ID=(SELECT CUST4.LIABILITY_NO FROM STTMS_CUSTOMER CUST4 WHERE CUST4.CUSTOMER_NO=?)' || chr(10) || '                 AND PR.LINE_CD=L.LINE_CD AND PR.LINE_SERIAL=L.LINE_SERIAL AND PR.PRODUCT_CODE=?)OR NOT EXISTS(SELECT * FROM' || chr(10) || '                 ELVW_LIMITS_PROD_REST_INT PR1 WHERE PR1.LIAB_ID=(SELECT CUST5.LIABILITY_NO FROM STTMS_CUSTOMER CUST5 WHERE CUST5.CUSTOMER_NO=?)' || chr(10) || '                 AND PR1.LINE_CD=L.LINE_CD AND PR1.LINE_SERIAL=L.LINE_SERIAL))AND (EXISTS(SELECT * FROM ELVW_LIMITS_BR_REST_INT B WHERE' || chr(10) || '                 B.LIAB_ID=(SELECT CUST6.LIABILITY_NO FROM STTMS_CUSTOMER CUST6 WHERE CUST6.CUSTOMER_NO=?)AND B.LINE_CD=L.LINE_CD AND' || chr(10) || '                 B.LINE_SERIAL=L.LINE_SERIAL AND B.BRANCH_CODE=GLOBAL.CURRENT_BRANCH)OR NOT EXISTS(SELECT * FROM ELVW_LIMITS_BR_REST_INT B1' || chr(10) || '                 WHERE B1.LIAB_ID=(SELECT CUST7.LIABILITY_NO FROM STTMS_CUSTOMER CUST7 WHERE CUST7.CUSTOMER_NO=?'||
')AND B1.LINE_CD=L.LINE_CD AND' || chr(10) || '                 B1.LINE_SERIAL=L.LINE_SERIAL))AND(EXISTS(SELECT * FROM ELVW_LIMITS_CCY_REST_INT CY WHERE CY.LIAB_ID=(SELECT CUST8.LIABILITY_NO' || chr(10) || '                 FROM STTMS_CUSTOMER CUST8 WHERE CUST8.CUSTOMER_NO=?)AND CY.LINE_CD=L.LINE_CD AND CY.LINE_SERIAL=L.LINE_SERIAL AND CY.CCY_CODE=?)' || chr(10) || '                 OR NOT EXISTS(SELECT * FROM ELVW_LIMITS_CCY_REST_INT CY1 WHERE CY1.LIAB_ID=(SELECT CUST9.LIABILITY_NO FROM STTMS_CUSTOMER CUST9' || chr(10) || '                 WHERE CUST9.CUSTOMER_NO=?)AND CY1.LINE_CD=L.LINE_CD AND CY1.LINE_SERIAL=L.LINE_SERIAL))) WHERE 1=1',
100,'LINE_CD!TEXT!LINE_CD',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_ACC',
'CIDACCDT',
'SELECT ACCOUNT_NUMBER FROM CLTB_ACCOUNT_MASTER WHERE BRANCH_CODE = ? and module_code = ''CI'' AND ACCOUNT_STATUS NOT IN (''V'',''L'') ORDER BY ACCOUNT_NUMBER',
100,'ACCOUNT_NUMBER!TEXT!ACCOUNT_NUMBER',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_ACC',
'CLDACCDT',
'SELECT ACCOUNT_NUMBER FROM CLTB_ACCOUNT_MASTER WHERE ACCOUNT_STATUS = ''A'' AND NVL(LOAN_TYPE,''L'')=''L'' AND BRANCH_CODE = ? AND MODULE_CODE = decode( ? ,''CLDCOMIT'',''CL'',''CLDSCOMT'',''CL'',''MODCOMIT'',''MO'',''MODSCOMT'',''MO'',''MODACCDT'',''MO'',''MODRENOG'',''MO'',''MODMROLL'',''MO'',''MODNOVDT'',''MO'',''MODVDAMD'',''MO'',''MODIMROL'',''MO'',''MODINADT'',''MO'',''CL'') ',
100,'ACCOUNT_NUMBER!TEXT!ACCOUNT_NUMBER',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_ACC',
'CLDLOTEM',
'SELECT ACCOUNT_NUMBER FROM CLTB_ACCOUNT_MASTER WHERE AUTH_STAT = ''A'' AND ACCOUNT_STATUS = ''A'' AND NVL(LOAN_TYPE,''L'')=''L'' AND BRANCH_CODE = ?',
100,'ACCOUNT_NUMBER!TEXT!ACCOUNT_NUMBER',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_ACC',
'LEDACCDT',
'SELECT ACCOUNT_NUMBER FROM CLTB_ACCOUNT_MASTER WHERE AUTH_STAT = ''A'' AND ACCOUNT_STATUS = ''A'' AND NVL(LOAN_TYPE,''E'')=''E'' AND BRANCH_CODE = ?',
100,'ACCOUNT_NUMBER!TEXT!ACCOUNT_NUMBER',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_ACC',
'LSDTRONL',
'SELECT ACCOUNT_NUMBER FROM CLTB_ACCOUNT_MASTER WHERE MODULE_CODE=''LS'' AND LOAN_TYPE =DECODE(?,''LSDTRONL'',''C'',''LSDTRAMD'',''C'',''LSDDDONL'',''L'',''L'') AND BRANCH_CODE = ? AND AUTH_STAT = DECODE(?,''LSDMROLL'',''A'',AUTH_STAT) ORDER BY ACCOUNT_NUMBER',
100,'ACCOUNT_NUMBER!TEXT!ACCOUNT_NUMBER',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_ACC',
'MODACCDT',
'',100,'ACCOUNT_NUMBER!TEXT!ACCOUNT_NUMBER',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CCYDEF',
'CIDACCDT',
'select ccy_code, ccy_name from CYTMS_CCY_DEFN where auth_stat = ''A'' AND record_stat = ''O''',
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
('LOV_R_CCYDEF',
'CLDACCDT',
'select ccy_code, ccy_name from CYTMS_CCY_DEFN where auth_stat = ''A'' AND record_stat = ''O''',
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
('LOV_R_CCYDEF',
'CLDLOTEM',
'select ccy_code, ccy_name from CYTMS_CCY_DEFN where auth_stat = ''A'' AND record_stat = ''O''',
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
('LOV_R_CCYDEF',
'LEDACCDT',
'select ccy_code, ccy_name from CYTMS_CCY_DEFN where auth_stat = ''A'' AND record_stat = ''O''',
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
('LOV_R_CCYDEF',
'LSDTRONL',
'select ccy_code, ccy_name from CYTMS_CCY_DEFN where auth_stat = ''A'' AND record_stat = ''O''',
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
('LOV_R_CCYDEF',
'MODACCDT',
'',100,'CCY_CODE!TEXT!CCY_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_CLGBK',
'CIDACCDT',
'SELECT clg_bank_code, clg_bank_name FROM detms_clg_bank_code where record_stat=''O'' and auth_stat=''A''',
100,'CLG_BANK_CODE!TEXT!CLG_BANK_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_CLGBK',
'CLDACCDT',
'SELECT clg_bank_code, clg_bank_name FROM detms_clg_bank_code where record_stat=''O'' and auth_stat=''A''',
100,'CLG_BANK_CODE!TEXT!CLG_BANK_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_CLGBK',
'CLDLOTEM',
'SELECT clg_bank_code, clg_bank_name FROM detms_clg_bank_code where record_stat=''O'' and auth_stat=''A''',
100,'CLG_BANK_CODE!TEXT!CLG_BANK_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_CLGBK',
'LEDACCDT',
'SELECT clg_bank_code, clg_bank_name FROM detms_clg_bank_code where record_stat=''O'' and auth_stat=''A''',
100,'CLG_BANK_CODE!TEXT!CLG_BANK_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_CLGBK',
'LSDTRONL',
'SELECT clg_bank_code, clg_bank_name FROM detms_clg_bank_code where record_stat=''O'' and auth_stat=''A''',
100,'CLG_BANK_CODE!TEXT!CLG_BANK_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_CLGBK',
'MODACCDT',
'',100,'CLG_BANK_CODE!TEXT!CLG_BANK_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_CLGBRN',
'CIDACCDT',
'select branch_code,branch_desc from detms_clg_brn_code',
100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_CLGBRN',
'CLDACCDT',
'select branch_code,branch_desc from detms_clg_brn_code',
100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_CLGBRN',
'CLDLOTEM',
'select branch_code,branch_desc from detms_clg_brn_code',
100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_CLGBRN',
'LEDACCDT',
'select branch_code,branch_desc from detms_clg_brn_code',
100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_CLGBRN',
'LSDTRONL',
'select branch_code,branch_desc from detms_clg_brn_code',
100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_CLGBRN',
'MODACCDT',
'',100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_ENDPT',
'CIDACCDT',
'select end_point,end_point_description from sttms_end_point where record_stat = ''O'' and auth_stat = ''A''',
100,'END_POINT!TEXT!END_POINT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_ENDPT',
'CLDACCDT',
'select end_point,end_point_description from sttms_end_point where record_stat = ''O'' and auth_stat = ''A''',
100,'END_POINT!TEXT!END_POINT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_ENDPT',
'CLDLOTEM',
'select end_point,end_point_description from sttms_end_point where record_stat = ''O'' and auth_stat = ''A''',
100,'END_POINT!TEXT!END_POINT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_ENDPT',
'LEDACCDT',
'select end_point,end_point_description from sttms_end_point where record_stat = ''O'' and auth_stat = ''A''',
100,'END_POINT!TEXT!END_POINT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_ENDPT',
'LSDTRONL',
'select end_point,end_point_description from sttms_end_point where record_stat = ''O'' and auth_stat = ''A''',
100,'END_POINT!TEXT!END_POINT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_ENDPT',
'MODACCDT',
'',100,'END_POINT!TEXT!END_POINT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_SECTOR',
'CIDACCDT',
'select sector_code from detms_clg_brn_code',
100,'SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_SECTOR',
'CLDACCDT',
'select sector_code from detms_clg_brn_code',
100,'SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_SECTOR',
'CLDLOTEM',
'select sector_code from detms_clg_brn_code',
100,'SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_SECTOR',
'LEDACCDT',
'select sector_code from detms_clg_brn_code',
100,'SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_SECTOR',
'LSDTRONL',
'select sector_code from detms_clg_brn_code',
100,'SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_SECTOR',
'MODACCDT',
'',100,'SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_STTLACC',
'CIDACCDT',
'SELECT AC_GL_NO, branch_code from sttbs_account where ac_or_gl=''A'' and ac_gl_rec_status=''O''',
100,'AC_GL_NO!TEXT!AC_GL_NO~BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_STTLACC',
'CLDACCDT',
'SELECT ACCOUNT_NO, BRANCH_CODE  FROM STVWS_ACCOUNT WHERE RECORD_STAT = ''O''   AND ' || chr(10) || '((BRANCH_CODE IS NOT NULL AND BRANCH_CODE = ? AND       AC_OR_GL IN (''A'', ''G'')) OR (AC_OR_GL = ''G'' AND BRANCH_CODE IS NULL))',
100,'ACCOUNT_NO!TEXT!ACCOUNT_NO~BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_STTLACC',
'CLDLOTEM',
'SELECT AC_GL_NO, branch_code from sttbs_account where ac_or_gl=''A'' and ac_gl_rec_status=''O''',
100,'AC_GL_NO!TEXT!AC_GL_NO~BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_STTLACC',
'LEDACCDT',
'SELECT AC_GL_NO, branch_code from sttbs_account where ac_or_gl=''A'' and ac_gl_rec_status=''O''',
100,'AC_GL_NO!TEXT!AC_GL_NO~BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_STTLACC',
'LSDTRONL',
'SELECT AC_GL_NO, branch_code from sttbs_account where ac_or_gl=''A'' and ac_gl_rec_status=''O''',
100,'AC_GL_NO!TEXT!AC_GL_NO~BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_STTLACC',
'MODACCDT',
'',100,'AC_GL_NO!TEXT!AC_GL_NO~BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_STTLBRN',
'CIDACCDT',
'select branch_code, branch_name from sttms_branch where auth_stat = ''A'' AND record_stat = ''O''',
100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_STTLBRN',
'CLDACCDT',
'select branch_code, branch_name from sttms_branch where auth_stat = ''A'' AND record_stat = ''O''',
100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_STTLBRN',
'CLDLOTEM',
'select branch_code, branch_name from sttms_branch where auth_stat = ''A'' AND record_stat = ''O''',
100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_STTLBRN',
'LEDACCDT',
'select branch_code, branch_name from sttms_branch where auth_stat = ''A'' AND record_stat = ''O''',
100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_STTLBRN',
'LSDTRONL',
'select branch_code, branch_name from sttms_branch where auth_stat = ''A'' AND record_stat = ''O''',
100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_STTLBRN',
'MODACCDT',
'',100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_STTLPRD',
'CIDACCDT',
'select product_code, Product_Description from cstms_product where  module =''RT'' and product_type in (''OT'',''AT'')',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_STTLPRD',
'CLDACCDT',
'select product_code, Product_Description from cstms_product where  module =''RT'' and product_type in (''OT'',''AT'')',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_STTLPRD',
'CLDLOTEM',
'select product_code, Product_Description from cstms_product where  module =''RT'' and product_type in (''OT'',''AT'')',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_STTLPRD',
'LEDACCDT',
'select product_code, Product_Description from cstms_product where  module =''RT'' and product_type in (''OT'',''AT'')',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_STTLPRD',
'LSDTRONL',
'select product_code, Product_Description from cstms_product where  module =''RT'' and product_type in (''OT'',''AT'')',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_STTLPRD',
'MODACCDT',
'',100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CR_UPSOURCE',
'CIDACCDT',
'select source_code, source_desc from cotms_source where auth_stat = ''A'' and record_stat =''O''',
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
('LOV_R_CR_UPSOURCE',
'CLDACCDT',
'select source_code, source_desc from cotms_source where auth_stat = ''A'' and record_stat =''O''',
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
('LOV_R_CR_UPSOURCE',
'CLDLOTEM',
'select source_code, source_desc from cotms_source where auth_stat = ''A'' and record_stat =''O''',
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
('LOV_R_CR_UPSOURCE',
'LEDACCDT',
'select source_code, source_desc from cotms_source where auth_stat = ''A'' and record_stat =''O''',
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
('LOV_R_CR_UPSOURCE',
'LSDTRONL',
'select source_code, source_desc from cotms_source where auth_stat = ''A'' and record_stat =''O''',
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
('LOV_R_CR_UPSOURCE',
'MODACCDT',
'',100,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_CUSTNM',
'CIDACCDT',
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
('LOV_R_CUSTNM',
'CLDACCDT',
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
('LOV_R_CUSTNM',
'CLDLOTEM',
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
('LOV_R_CUSTNM',
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
('LOV_R_CUSTNM',
'LSDTRONL',
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
('LOV_R_CUSTNM',
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
('LOV_R_C_STTLCCY',
'CIDACCDT',
'select ccy_code, ccy_name from CYTMS_CCY_DEFN where auth_stat = ''A'' AND record_stat = ''O''',
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
('LOV_R_C_STTLCCY',
'CLDACCDT',
'select ccy_code, ccy_name from CYTMS_CCY_DEFN where auth_stat = ''A'' AND record_stat = ''O''',
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
('LOV_R_C_STTLCCY',
'CLDLOTEM',
'select ccy_code, ccy_name from CYTMS_CCY_DEFN where auth_stat = ''A'' AND record_stat = ''O''',
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
('LOV_R_C_STTLCCY',
'LEDACCDT',
'select ccy_code, ccy_name from CYTMS_CCY_DEFN where auth_stat = ''A'' AND record_stat = ''O''',
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
('LOV_R_C_STTLCCY',
'LSDTRONL',
'select ccy_code, ccy_name from CYTMS_CCY_DEFN where auth_stat = ''A'' AND record_stat = ''O''',
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
('LOV_R_C_STTLCCY',
'MODACCDT',
'',100,'CCY_CODE!TEXT!CCY_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_CLGBK',
'CIDACCDT',
'SELECT clg_bank_code, clg_bank_name FROM detms_clg_bank_code where record_stat=''O'' and auth_stat=''A''',
100,'CLG_BANK_CODE!TEXT!CLG_BANK_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_CLGBK',
'CLDACCDT',
'SELECT clg_bank_code, clg_bank_name FROM detms_clg_bank_code where record_stat=''O'' and auth_stat=''A''',
100,'CLG_BANK_CODE!TEXT!CLG_BANK_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_CLGBK',
'CLDLOTEM',
'SELECT clg_bank_code, clg_bank_name FROM detms_clg_bank_code where record_stat=''O'' and auth_stat=''A''',
100,'CLG_BANK_CODE!TEXT!CLG_BANK_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_CLGBK',
'LEDACCDT',
'SELECT clg_bank_code, clg_bank_name FROM detms_clg_bank_code where record_stat=''O'' and auth_stat=''A''',
100,'CLG_BANK_CODE!TEXT!CLG_BANK_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_CLGBK',
'LSDTRONL',
'SELECT clg_bank_code, clg_bank_name FROM detms_clg_bank_code where record_stat=''O'' and auth_stat=''A''',
100,'CLG_BANK_CODE!TEXT!CLG_BANK_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_CLGBK',
'MODACCDT',
'',100,'CLG_BANK_CODE!TEXT!CLG_BANK_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_CLGBRN',
'CIDACCDT',
'select branch_code,branch_desc from detms_clg_brn_code',
100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_CLGBRN',
'CLDACCDT',
'select branch_code,branch_desc from detms_clg_brn_code',
100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_CLGBRN',
'CLDLOTEM',
'select branch_code,branch_desc from detms_clg_brn_code',
100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_CLGBRN',
'LEDACCDT',
'select branch_code,branch_desc from detms_clg_brn_code',
100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_CLGBRN',
'LSDTRONL',
'select branch_code,branch_desc from detms_clg_brn_code',
100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_CLGBRN',
'MODACCDT',
'',100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_ENDPT',
'CIDACCDT',
'select end_point,end_point_description from sttms_end_point where record_stat = ''O'' and auth_stat = ''A''',
100,'END_POINT!TEXT!END_POINT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_ENDPT',
'CLDACCDT',
'select end_point,end_point_description from sttms_end_point where record_stat = ''O'' and auth_stat = ''A''',
100,'END_POINT!TEXT!END_POINT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_ENDPT',
'CLDLOTEM',
'select end_point,end_point_description from sttms_end_point where record_stat = ''O'' and auth_stat = ''A''',
100,'END_POINT!TEXT!END_POINT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_ENDPT',
'LEDACCDT',
'select end_point,end_point_description from sttms_end_point where record_stat = ''O'' and auth_stat = ''A''',
100,'END_POINT!TEXT!END_POINT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_ENDPT',
'LSDTRONL',
'select end_point,end_point_description from sttms_end_point where record_stat = ''O'' and auth_stat = ''A''',
100,'END_POINT!TEXT!END_POINT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_ENDPT',
'MODACCDT',
'',100,'END_POINT!TEXT!END_POINT',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_SECTOR',
'CIDACCDT',
'select sector_code from detms_clg_brn_code',
100,'SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_SECTOR',
'CLDACCDT',
'select sector_code from detms_clg_brn_code',
100,'SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_SECTOR',
'CLDLOTEM',
'select sector_code from detms_clg_brn_code',
100,'SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_SECTOR',
'LEDACCDT',
'select sector_code from detms_clg_brn_code',
100,'SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_SECTOR',
'LSDTRONL',
'select sector_code from detms_clg_brn_code',
100,'SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_SECTOR',
'MODACCDT',
'',100,'SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_STTLACC',
'CIDACCDT',
'SELECT AC_GL_NO, branch_code from sttbs_account where ac_or_gl=''A'' and ac_gl_rec_status=''O''',
100,'AC_GL_NO!TEXT!AC_GL_NO~BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_STTLACC',
'CLDACCDT',
'SELECT ACCOUNT_NO, BRANCH_CODE' || chr(10) || '  FROM STVWS_ACCOUNT' || chr(10) || ' WHERE RECORD_STAT = ''O''' || chr(10) || '   AND ((BRANCH_CODE IS NOT NULL AND BRANCH_CODE = ? AND' || chr(10) || '       AC_OR_GL IN (''A'', ''G'')) OR (AC_OR_GL = ''G'' AND BRANCH_CODE IS NULL))',
100,'ACCOUNT_NO!TEXT!ACCOUNT_NO~BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_STTLACC',
'CLDLOTEM',
'SELECT AC_GL_NO, branch_code from sttbs_account where ac_or_gl=''A'' and ac_gl_rec_status=''O''',
100,'AC_GL_NO!TEXT!AC_GL_NO~BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_STTLACC',
'LEDACCDT',
'SELECT AC_GL_NO, branch_code from sttbs_account where ac_or_gl=''A'' and ac_gl_rec_status=''O''',
100,'AC_GL_NO!TEXT!AC_GL_NO~BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_STTLACC',
'LSDTRONL',
'SELECT AC_GL_NO, branch_code from sttbs_account where ac_or_gl=''A'' and ac_gl_rec_status=''O''',
100,'AC_GL_NO!TEXT!AC_GL_NO~BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_STTLACC',
'MODACCDT',
'',100,'AC_GL_NO!TEXT!AC_GL_NO~BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_STTLBRN',
'CIDACCDT',
'select branch_code, branch_name from sttms_branch where auth_stat = ''A'' AND record_stat = ''O''',
100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_STTLBRN',
'CLDACCDT',
'select branch_code, branch_name from sttms_branch where auth_stat = ''A'' AND record_stat = ''O''',
100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_STTLBRN',
'CLDLOTEM',
'select branch_code, branch_name from sttms_branch where auth_stat = ''A'' AND record_stat = ''O''',
100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_STTLBRN',
'LEDACCDT',
'select branch_code, branch_name from sttms_branch where auth_stat = ''A'' AND record_stat = ''O''',
100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_STTLBRN',
'LSDTRONL',
'select branch_code, branch_name from sttms_branch where auth_stat = ''A'' AND record_stat = ''O''',
100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_STTLBRN',
'MODACCDT',
'',100,'BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_STTLPRD',
'CIDACCDT',
'select product_code, Product_Description from cstms_product where  module =''RT'' and product_type in (''OT'',''AT'')',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_STTLPRD',
'CLDACCDT',
'select product_code, Product_Description from cstms_product where  module =''RT'' and product_type in (''OT'',''AT'')',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_STTLPRD',
'CLDLOTEM',
'select product_code, Product_Description from cstms_product where  module =''RT'' and product_type in (''OT'',''AT'')',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_STTLPRD',
'LEDACCDT',
'select product_code, Product_Description from cstms_product where  module =''RT'' and product_type in (''OT'',''AT'')',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_STTLPRD',
'LSDTRONL',
'select product_code, Product_Description from cstms_product where  module =''RT'' and product_type in (''OT'',''AT'')',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_STTLPRD',
'MODACCDT',
'',100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_DR_UPSOURCE',
'CIDACCDT',
'select source_code, source_desc from cotms_source where auth_stat = ''A'' and record_stat =''O'' Union Select ''FLEXCUBE'', ''Flexcube'' from dual order by source_code',
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
('LOV_R_DR_UPSOURCE',
'CLDACCDT',
'select source_code, source_desc from cotms_source where auth_stat = ''A'' and record_stat =''O'' Union Select ''FLEXCUBE'', ''Flexcube'' from dual order by source_code',
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
('LOV_R_DR_UPSOURCE',
'CLDLOTEM',
'select source_code, source_desc from cotms_source where auth_stat = ''A'' and record_stat =''O'' Union Select ''FLEXCUBE'', ''Flexcube'' from dual order by source_code',
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
('LOV_R_DR_UPSOURCE',
'LEDACCDT',
'select source_code, source_desc from cotms_source where auth_stat = ''A'' and record_stat =''O'' Union Select ''FLEXCUBE'', ''Flexcube'' from dual order by source_code',
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
('LOV_R_DR_UPSOURCE',
'LSDTRONL',
'select source_code, source_desc from cotms_source where auth_stat = ''A'' and record_stat =''O'' Union Select ''FLEXCUBE'', ''Flexcube'' from dual order by source_code',
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
('LOV_R_DR_UPSOURCE',
'MODACCDT',
'',100,'SOURCE_CODE!TEXT!SOURCE_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_D_STTLCCY',
'CIDACCDT',
'select ccy_code, ccy_name from CYTMS_CCY_DEFN where auth_stat = ''A'' AND record_stat = ''O''',
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
('LOV_R_D_STTLCCY',
'CLDACCDT',
'select ccy_code, ccy_name from CYTMS_CCY_DEFN where auth_stat = ''A'' AND record_stat = ''O''',
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
('LOV_R_D_STTLCCY',
'CLDLOTEM',
'select ccy_code, ccy_name from CYTMS_CCY_DEFN where auth_stat = ''A'' AND record_stat = ''O''',
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
('LOV_R_D_STTLCCY',
'LEDACCDT',
'select ccy_code, ccy_name from CYTMS_CCY_DEFN where auth_stat = ''A'' AND record_stat = ''O''',
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
('LOV_R_D_STTLCCY',
'LSDTRONL',
'select ccy_code, ccy_name from CYTMS_CCY_DEFN where auth_stat = ''A'' AND record_stat = ''O''',
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
('LOV_R_D_STTLCCY',
'MODACCDT',
'',100,'CCY_CODE!TEXT!CCY_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_FORMAT',
'CLDPRMNT',
'select DISTINCT(FORMAT) from MSTM_MSG_FORMAT WHERE MODULE IN (''CL'',''LS'') AND MSG_TYPE = decode(?,''LS'',clpks_prd_text.LS_REVN_NOTC1,clpks_prd_text.CL_REVN_NOTC1)',
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
('LOV_R_PRD_CODE',
'CIDACCDT',
'select PRODUCT_CODE from cltm_product where AUTH_STAT=''A'' AND ONCE_AUTH=''Y''',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_PRD_CODE',
'CLDACCDT',
'select PRODUCT_CODE from cltm_product where AUTH_STAT=''A'' AND ONCE_AUTH=''Y''',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_PRD_CODE',
'CLDLOTEM',
'select PRODUCT_CODE from cltm_product where AUTH_STAT=''A'' AND ONCE_AUTH=''Y''',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_PRD_CODE',
'LEDACCDT',
'select PRODUCT_CODE from cltm_product where AUTH_STAT=''A'' AND ONCE_AUTH=''Y''',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_PRD_CODE',
'LSDTRONL',
'select PRODUCT_CODE from cltm_product where AUTH_STAT=''A'' AND ONCE_AUTH=''Y''',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_R_PRD_CODE',
'MODACCDT',
'',100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SACC',
'CLDMDSBR',
'SELECT ac_or_gl, account_no, branch_code FROM stvws_account WHERE ((Branch_code IS NOT NULL AND  Branch_code = nvl(?,Branch_code) AND(ac_or_gl IN (''A'',''G'') ) )OR (ac_or_gl=''G'' and branch_code IS NULL))AND record_stat=''O''',
'','AC_OR_GL!TEXT!AC_OR_GL~ACCOUNT_NO!TEXT!ACCOUNT_NO~BRANCH_CODE!TEXT!BRANCH_CODE',
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
('LOV_SACC_DSB',
'CIDACCDT',
'SELECT ac_or_gl, account_no, branch_code FROM stvws_account WHERE ((Branch_code IS NOT NULL AND  Branch_code = nvl(?,Branch_code) AND(ac_or_gl IN (''A'',''G'') ) )OR (ac_or_gl=''G'' and branch_code IS NULL))AND record_stat=''O'' order By account_no',
100,'AC_OR_GL!TEXT!AC_OR_GL~ACCOUNT_NO!TEXT!ACCOUNT_NO~BRANCH_CODE!TEXT!BRANCH_CODE',
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
('LOV_SACC_NML',
'CIDACCDT',
'SELECT ac_or_gl, account_no, branch_code FROM stvws_account WHERE ((Branch_code IS NOT NULL AND  Branch_code = nvl(?,Branch_code) AND(ac_or_gl IN (''A'',''G'') ) )OR (ac_or_gl=''G'' and branch_code IS NULL))AND record_stat=''O'' order By account_no',
100,'AC_OR_GL!TEXT!AC_OR_GL~ACCOUNT_NO!TEXT!ACCOUNT_NO~BRANCH_CODE!TEXT!BRANCH_CODE',
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
('LOV_SAL_PDT',
'SLDEMPLY',
'SELECT PRODUCT_CODE FROM CSTMS_PRODUCT WHERE MODULE = ''SL'' AND RECORD_STAT = ''O'' AND ONCE_AUTH= ''Y'' ORDER BY 1',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SAL_PDT',
'SLDSALCP',
'SELECT DISTINCT PRODUCT_CODE FROM CSTMS_PRODUCT WHERE MODULE = ''SL'' AND RECORD_STAT = ''O'' AND ONCE_AUTH= ''Y'' ORDER BY 1',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SAL_PROD',
'SLDEMPLR',
'SELECT PRODUCT_CODE FROM CSTMS_PRODUCT WHERE MODULE = ''SL'' AND RECORD_STAT = ''O'' AND ONCE_AUTH= ''Y'' ORDER BY 1',
100,'PRODUCT_CODE!TEXT!PRODUCT_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SAV_AC_NO',
'IADREDMN',
'SELECT CUST_AC_NO,ac_desc,ccy FROM STTM_CUST_ACCOUNT WHERE ONCE_AUTH= ''Y'' AND record_stat <> ''C'' AND BRANCH_CODE = ? AND account_class in (select distinct account_class from STTM_ACCOUNT_CLASS where ac_class_type=''S'' and once_auth= ''Y'' and record_stat <> ''C'') ORDER BY CUST_AC_NO',
100,'CUST_AC_NO!TEXT!CUST_AC_NO~AC_DESC!TEXT!AC_DESC~CCY!TEXT!CCY',
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
('LOV_SAV_AC_NO',
'ICDREDMN',
'SELECT CUST_AC_NO,ac_desc,ccy FROM STTM_CUST_ACCOUNT WHERE ONCE_AUTH= ''Y'' AND record_stat <> ''C'' AND BRANCH_CODE = ? AND account_class in (select distinct account_class from STTM_ACCOUNT_CLASS where ac_class_type=''S'' and once_auth= ''Y'' and record_stat <> ''C'') ORDER BY CUST_AC_NO',
100,'CUST_AC_NO!TEXT!CUST_AC_NO~AC_DESC!TEXT!AC_DESC~CCY!TEXT!CCY',
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
('LOV_SB',
'CLDMDSBR',
'select a.branch_code from sttms_branch a where record_stat = ''O'' and auth_stat = ''A''',
'','BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SBRANCHCHG',
'CLDMDSBR',
'select a.branch_code from sttms_branch a where record_stat = ''O'' and auth_stat = ''A''',
'','BRANCH_CODE!TEXT!BRANCH_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SCCY',
'CFCINCLS',
'select ccy_code, ccy_name from cytms_ccy_defn where record_stat = ''O'' and auth_stat = ''A'' and ccy_code not in (select currency from cftms_product_currency_limits where product = ? and component = ?)',
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
('LOV_SCCY',
'ISCINCLS',
'select ccy_code, ccy_name from cytms_ccy_defn where record_stat = ''O'' and auth_stat = ''A'' and ccy_code not in (select currency from cftms_product_currency_limits where product = ? and component = ?)',
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
('LOV_SCHDUEDT',
'CLDISTCH',
'SELECT TO_CHAR(SCHEDULE_DUE_DATE,''YYYY-MM-DD'') SCH_DUE_DATE, sch_status FROM CLTBS_ACCOUNT_SCHEDULES WHERE ACCOUNT_NUMBER = ? AND COMPONENT_NAME = ? AND BRANCH_CODE = ?',
'','SCH_DUE_DATE!TEXT!SCHEDULE_DUE_DATE~SCH_STATUS!TEXT!SCH_STATUS',
'DATE~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SCHEMA',
'STDSCCHK',
'select USERNAME,USER_ID,CREATED from all_users order by username',
500,'','','','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SCHEME',
'CODELEBT',
'select scheme_id,scheme_desc from cotm_scheme_master where once_auth=''Y'' and record_stat=''O'' order by scheme_id',
100,'SCHEME_ID!TEXT!SCHEME_ID~SCHEME_DESC!TEXT!SCHEME_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SCHEME',
'CODSCMST',
'SELECT distinct SCHEME_ID FROM COTB_CUST_SCHEME_DETAILS WHERE CUSTOMER_NO = ? and linkage_stat in (''A'',''W'',''X'')',
'','SCHEME_ID!TEXT!SCHEME_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SCHEME',
'FXDPRMNT',
'select scheme_code, description from tatms_scheme where record_stat = ''O'' and once_auth = ''Y'' order by scheme_code',
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
('LOV_SCHEME',
'SEDDLPRD',
'SELECT SCHEME, DESCRIPTION FROM TATMS_TAX_SCHEME WHERE MODULE = ''SD'' AND RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY SCHEME',
'','SCHEME!TEXT!~DESCRIPTION!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SCHEME',
'SEDMKTCD',
'SELECT SCHEME,DESCRIPTION FROM TATMS_TAX_SCHEME WHERE MODULE = ''SE'' AND RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY SCHEME',
100,'SCHEME!TEXT!SCHEME~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SCHEME',
'SEDPFPRD',
'SELECT SCHEME,DESCRIPTION FROM TATMS_TAX_SCHEME WHERE MODULE = ''SP'' AND RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY SCHEME',
'','SCHEME!TEXT!~DESCRIPTION!TEXT!',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SCHEME',
'TACTAXCL',
'SELECT SCHEME,DESCRIPTION FROM TATMS_TAX_SCHEME WHERE MODULE = ? AND RECORD_STAT = ''O'' AND AUTH_STAT = ''A'' ORDER BY SCHEME',
100,'SCHEME!TEXT!SCHEME~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SCHEMEID_SUMMARY',
'MGDSETLM',
'SELECT DISTINCT(SCHEMEID) FROM MGVW_MARGIN_STTLEMENT_SUMMARY WHERE 1=1 ORDER BY 1',
10,'SCHEMEID!TEXT!SCHEMEID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SCHEME_DETAILS',
'CODCUSCM',
'SELECT SCHEME_ID,SCHEME_DESC FROM COTMS_SCHEME_MASTER WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY SCHEME_ID',
'','SCHEME_ID!TEXT!SCHEME_ID~SCHEME_DESC!TEXT!SCHEME_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SCHEME_ID',
'BRDUATST',
'SELECT SCHEME_ID, SCHEME_DESCRIPTION FROM MGTBS_SCHEME WHERE  AUTH_STAT = ''A'' AND BRANCH = ? AND CUSTOMER_NO = ? AND CCY = ? ORDER BY SCHEME_ID',
100,'SCHEME_ID!TEXT!SCHEME_ID~SCHEME_DESCRIPTION!TEXT!SCHEME_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SCHEME_ID',
'MGDQCBAL',
'select DISTINCT SCHEME_ID,SCHEME_DESCRIPTION,CUSTOMER_NO,CCY  from MGTBS_SCHEME where   branch = global.current_branch',
100,'SCHEME_ID!TEXT!SCHEME_ID',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SCHEME_ID',
'MGDSETLM',
'SELECT SCHEME_ID,' || chr(10) || '       SCHEME_DESCRIPTION,' || chr(10) || '       CUSTOMER_NAME1,' || chr(10) || '       CUSTOMER_NO,' || chr(10) || '       CCY,' || chr(10) || '       SETTLEMENT_BRANCH,' || chr(10) || '       SETTLEMENT_ACCOUNT,' || chr(10) || '       SCHEME_REFERENCE,' || chr(10) || '       CR_BALANCE' || chr(10) || '  FROM (SELECT A.SCHEME_ID,' || chr(10) || '               A.SCHEME_DESCRIPTION,' || chr(10) || '               B.CUSTOMER_NAME1,' || chr(10) || '               A.CUSTOMER_NO,' || chr(10) || '               A.CCY,' || chr(10) || '               A.SETTLEMENT_BRANCH,' || chr(10) || '               A.SETTLEMENT_ACCOUNT,' || chr(10) || '               A.SCHEME_REFERENCE,' || chr(10) || '               (NVL(C.CR_BALANCE,0) - NVL(C.DR_BALANCE,0)) CR_BALANCE' || chr(10) || '          FROM MGTBS_SCHEME A, STTMS_CUSTOMER B, MGTB_BALANCE C' || chr(10) || '         WHERE A.BRANCH = GLOBAL.CURRENT_BRANCH' || chr(10) || '           AND A.CUSTOMER_NO = B.CUSTOMER_NO' || chr(10) || '           AND A.RECORD_STAT = ''O''' || chr(10) || '           AND A.AUTH_STAT = ''A''' || chr(10) || '           AND A.SCHEME_ID = C.SCHEME_ID' || chr(10) || '           AND EXISTS (SELECT 1' || chr(10) || '                  FROM CSTBS_CONTRACT' || chr(10) || '                 WHERE CONTRACT_REF_NO = A.SCHEME_REFERENCE' || chr(10) || '                   AND AUTH_STATUS = ''A''' || chr(10) || '                   AND CONTRACT_STATUS = ''A''))' || chr(10) || ' WHERE 1 = 1' || chr(10) || ' ORDER BY SCHEME_ID, CCY',
200,'SCHEME_ID!TEXT!SCHEME_ID~CUSTOMER_NO!TEXT!CUSTOMER_NO~SETTLEMENT_ACCOUNT!TEXT!SETTLEMENT_ACCOUNT~CR_BALANCE!TEXT!CR_BALANCE',
'STRING~STRING~STRING~NUMBER',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SCHFINCTR',
'IDCPRDET',
'<Long>',
100,'CLEARING_HOUSE!TEXT!CLEARING_HOUSE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SCHHOLCCY',
'IDCPRDET',
'<Long>',
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
('LOV_SCH_FINANCIAL_CENTRE',
'IDCINTDT',
'<Long>',
100,'CLEARING_HOUSE!TEXT!CLEARING_HOUSE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SCH_FINANCIAL_CENTRE',
'OTCINTDT',
'SELECT DISTINCT CLEARING_HOUSE FROM STTMS_CLG_HOL_MASTER WHERE RECORD_STAT=''O'' AND AUTH_STAT=''A'' ORDER BY CLEARING_HOUSE',
100,'CLEARING_HOUSE!TEXT!CLEARING_HOUSE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SCH_HOL_CCY',
'IDCINTDT',
'<Long>',
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
('LOV_SCH_HOL_CCY',
'OTCINTDT',
'SELECT CCY_CODE,CCY_NAME FROM CYTMS_CCY_DEFN WHERE AUTH_STAT=''A'' AND RECORD_STAT=''O'' ORDER BY CCY_CODE',
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
('LOV_SCH_ID',
'CODCUSCH',
'select a.scheme_id, b.scheme_desc, to_char(b.sc_start_dt,''YYYY-MM-DD'') sc_start_dt, to_char(b.sc_end_dt,''YYYY-MM-DD'') sc_end_dt   from cotb_cust_scheme_details a, cotms_scheme_master b  where a.scheme_id = b.scheme_id   and a.customer_no = ?',
100,'SCHEME_ID!TEXT!SCHEME_ID~SCHEME_DESC!TEXT!SCHEME_DESC~SC_START_DT!TEXT!SC_START_DT~SC_END_DT!TEXT!SC_END_DT',
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
('LOV_SCH_LINKED_REF',
'LDDCONON',
'select ref, ccy, available_amt, rate, LINKED_AMOUNT from ldvw_collateral_lov where ref_type = ? and cust_no = ? and        TO_DATE(value_dt, ''DD/MM/RRRR'') <=decode(ref_type,''A'',              TO_DATE(''01/01/2008'',''DD/MM/RRRR''),TO_DATE(?, ''DD/MM/RRRR'')) and TO_DATE(MAT_DT,''DD/MM/RRRR'') > decode(ref_type, ''A'', TO_DATE(''30/12/2007'',''DD/MM/RRRR''), TO_DATE(?, ''DD/MM/RRRR''))',
10,'REF!TEXT!REF~CCY!TEXT!CCY~AVAILABLE_AMT!TEXT!AVAILABLE_AMT~RATE!TEXT!RATE~LINKED_AMOUNT!TEXT!LINKED_AMOUNT',
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
('LOV_SCODE',
'SEDBLKDL',
'select a.internal_sec_id , a.security_description , a.security_ref_no , a.security_type , a.interest_quotation_method ,  a.local_market_of_issue , a.quantity_quotation_method , a.price_quotation_method ,   a.security_ccy , a.security_ccy payccy , a.form_type , a.minimum_tradable_quantity ,   a.fractional_quantity_allowed , a.initial_face_value , a.unit_decimals , a.start_of_trading_date,   a.redemption_or_expiry_date, a.redemption_price,a.index_flag    from setms_security_master a , cstms_product b where (a.security_type in (''B'', ''E'', ''Z'') or (a.security_type in (''W'', ''R'') and a.renouncable = ''Y'') ) and a.record_stat = ''O'' and a.auth_stat = ''A'' and b.module = ''SD'' and b.auth_stat = ''A'' and b.record_stat = ''O'' and b.product_code = (SELECT  preferred_leg FROM setms_combination_product WHERE combination_product = ?) and exists ( select 1 from csvws_product_currencies where product_code = (SELECT  preferred_leg FROM setms_combination_product WHERE combination_product = ?) and ccy_code = a.security_ccy ) and exists ( select 1 from csvws_product_branches where product_code = (SELECT  preferred_leg FROM setms_combination_product WHERE combination_product = ?) and branch_code = GLOBAL.CURRENT_BRANCH) and exists ( select 1 from setms_dealprod_security_access where sedeal_product_code = (SELECT  preferred_leg FROM setms_combination_product WHERE combination_product = ?) and security_id = a.internal_sec_id and access_allowed_flag = ''A'' ) union select a.internal_sec_id , a.security_description , a.security_ref_no , a.security_type , a.interest_quotation_method , a.local_market_of_issue , a.quantity_quotation_method , a.price_quotation_method , a.security_ccy , a.security_ccy payccy , a.form_type , a.minimum_tradable_quantity , a.fractional_quantity_allowed , a.initial_face_value , a.unit_decimals , a.start_of_trading_date, a.redemption_or_expiry_date , a.redemption_price,a.index_flag from setms_security_master a, cstms_product b where (a.security_type in'||
' (''B'', ''E'', ''Z'') or (a.security_type in (''W'', ''R'') and a.renouncable = ''Y'') ) and a.record_stat = ''O'' and a.auth_stat = ''A'' and b.module = ''SD'' and b.auth_stat = ''A'' and b.record_stat = ''O'' and b.product_code = (SELECT  preferred_leg FROM setms_combination_product WHERE combination_product = ?) and exists ( select 1 from csvws_product_currencies where product_code = (SELECT  preferred_leg FROM setms_combination_product WHERE combination_product = ?) and ccy_code = a.security_ccy ) and exists ( select 1 from csvws_product_branches where product_code = (SELECT  preferred_leg FROM setms_combination_product WHERE combination_product = ?) and branch_code = GLOBAL.CURRENT_BRANCH) and not exists ( select 1 from setms_dealprod_security_access where sedeal_product_code = (SELECT  preferred_leg FROM setms_combination_product WHERE combination_product = ?) and security_id = a.internal_sec_id ) and (exists ( select 1 from setms_dealproduct_restrictions c , setms_deal_product d where c.sedeal_product_code = b.product_code and d.product_code = c.sedeal_product_code and c.seproduct_code = a.product and c.seproduct_type = ''SE'' and d.se_restriction_type = ''A'' ) or ( exists ( select 1 from cstms_product where product_code = a.product and auth_stat = ''A'' and record_stat = ''O'' ) and not exists ( select 1 from setms_dealproduct_restrictions where sedeal_product_code = b.product_code and seproduct_type = ''SE'' and seproduct_code = a.product) and exists ( select 1 from setms_deal_product where product_code = b.product_code and se_restriction_type = ''D'' ) ) )Order By internal_sec_id',
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
('LOV_SCRNG_RESLV_RULE',
'CLDPRCMT',
'SELECT scm_RULE_ID,rule_desc FROM CLTM_scm_rule where auth_STAT=''A'' and record_stat=''O'' order by scm_RULE_ID',
100,'SCM_RULE_ID!TEXT!SCM_RULE_ID~RULE_DESC!TEXT!RULE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SDE_ID',
'CLDPRCMT',
'select SDE_ID,sde_datatype  from cltm_sde',
100,'SDE_ID!TEXT!SDE_ID~SDE_DATATYPE!TEXT!SDE_DATA_TYPE',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SDE_ID',
'CLDUDRMT',
'select sde_id from cltm_sde',
1000,'SDE_ID!TEXT!FIELD',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SDE_ID',
'IPDRLMNT',
'select sde_id , sde_desc from ictms_sde where record_stat=''O'' and once_auth =''Y'' order by sde_id',
100,'SDE_ID!TEXT!SDE_ID~SDE_DESC!TEXT!SDE_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SD_REF_NUMBER',
'SFDCSSUB',
'SELECT CONTRACT_REF_NO,       USER_REF_NO,       DESCRIPTION,       CONTRACT_CCY,       PRODUCT_TYPE  FROM (SELECT S.CONTRACT_REF_NO,               C.USER_REF_NO,               S.DESCRIPTION,               S.CONTRACT_CCY,               CASE P.PRODUCT_TYPE                 WHEN ''N'' THEN                  ''NORMAL DEPOSIT''                 WHEN ''D'' THEN                  ''DUAL CURRENCY DEPOSIT''               END AS PRODUCT_TYPE          FROM SFTBS_CONTRACT_MASTER S, CSTBS_CONTRACT C, CSTMS_PRODUCT P         WHERE C.CONTRACT_REF_NO = S.CONTRACT_REF_NO AND               C.MODULE_CODE = ''SF'' AND C.AUTH_STATUS = ''A'' AND               C.CONTRACT_STATUS = SFPKS_CONTRACTSTATUS.GETCONTSTATUS_ACTIVE AND         P.PRODUCT_CODE = C.PRODUCT_CODE AND               S.EVENT_SEQ_NO =               (SELECT MAX(B.EVENT_SEQ_NO)                  FROM SFTBS_CONTRACT_MASTER B                 WHERE B.CONTRACT_REF_NO = S.CONTRACT_REF_NO))  WHERE 1 = 1  ORDER BY CONTRACT_REF_NO',
20,'CONTRACT_REF_NO!TEXT!CONTRACT_REF_NO~USER_REF_NO!TEXT!USER_REF_NO',
'STRING~STRING',
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
('LOV_SECCD_CHRG',
'CLDMDSBR',
'select sector_code from detms_clg_brn_code where bank_code =? and  branch_code =?',
'','SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECCODE',
'SEDBLONL',
'select a.internal_sec_id, a.security_description , a.security_ref_no , a.security_type  , a.local_market_of_issue , a.quantity_quotation_method , a.security_ccy ,  a.form_type ,  a.redemption_or_expiry_date from setms_security_master a , cstms_product b where ( a.security_type in (''B'', ''E'', ''Z'') or ( a.security_type in (''W'', ''R'') and a.renouncable = ''Y'' ) ) and a.record_stat = ''O'' and a.auth_stat = ''A'' and b.module = ''SD'' and b.auth_stat = ''A'' and b.record_stat = ''O'' and b.product_code = ? and exists ( select 1 from csvws_product_currencies where product_code = ? and ccy_code = a.security_ccy ) and exists ( select 1 from csvws_product_branches where product_code = ? and branch_code = global.current_branch )and exists ( select 1 from setbs_pfolio_skacbalances where security_id = a.internal_sec_id ) and exists ( select 1 from setms_dealprod_security_access where sedeal_product_code = ? and security_id = a.internal_sec_id and access_allowed_flag = ''A'' ) union select a.internal_sec_id , a.security_description , a.security_ref_no , a.security_type ,  a.local_market_of_issue , a.quantity_quotation_method ,a.security_ccy ,  a.form_type ,   a.redemption_or_expiry_date from setms_security_master a , cstms_product b where ( a.security_type in (''B'', ''E'', ''Z'') or ( a.security_type in (''W'', ''R'') and a.renouncable = ''Y'' ) ) and a.record_stat = ''O'' and a.auth_stat = ''A'' and b.module = ''SD'' and b.auth_stat = ''A'' and b.record_stat = ''O'' and b.product_code = ? and exists ( select 1 from setbs_pfolio_skacbalances where security_id = a.internal_sec_id ) and exists ( select 1 from csvws_product_currencies where product_code = ? and ccy_code = a.security_ccy ) and exists ( select 1 from csvws_product_branches where product_code = ? and branch_code = global.current_branch )and not exists ( select 1 from setms_dealprod_security_access where sedeal_product_code = ? and security_id = a.internal_sec_id and access_allowed_flag = ''D'' ) and ( exist'||
's ( select 1 from setms_dealproduct_restrictions c , setms_deal_product d where c.sedeal_product_code = b.product_code and d.product_code = c.sedeal_product_code and c.seproduct_code = a.product and c.seproduct_type = ''SE'' and d.se_restriction_type = ''A'' ) or ( exists ( select 1 from cstms_product where product_code = a.product and auth_stat = ''A'' and record_stat = ''O'' ) and not exists ( select 1 from setms_dealproduct_restrictions where sedeal_product_code = b.product_code and seproduct_code = a.product and seproduct_type = ''SE'' ) and exists ( select 1 from setms_deal_product where product_code = b.product_code and se_restriction_type = ''D'' ) ) )',
50,'INTERNAL_SEC_ID!TEXT!INTERNAL_SEC_ID~SECURITY_DESCRIPTION!TEXT!SECURITY_DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECCODE',
'SEDSKONL',
'select a.internal_sec_id , a.security_description ,a.security_ccy from setms_security_master a , cstms_product b where ( a.security_type in (''B'', ''E'', ''Z'') or ( a.security_type in (''W'', ''R'') and a.renouncable = ''Y'' ) ) and a.record_stat = ''O'' and a.auth_stat = ''A'' and b.module = ''SD'' and b.auth_stat = ''A'' and b.record_stat = ''O'' and exists ( select 1 from csvws_product_currencies where ccy_code = a.security_ccy ) and exists ( select 1 from csvws_product_branches where branch_code = global.current_branch ) and exists ( select 1 from setms_dealprod_security_access where security_id = a.internal_sec_id and access_allowed_flag = ''A'' ) union select a.internal_sec_id , a.security_description , a.security_ccy from setms_security_master a , cstms_product b where ( a.security_type in (''B'', ''E'', ''Z'') or ( a.security_type in (''W'', ''R'') and a.renouncable = ''Y'' ) ) and a.record_stat = ''O'' and a.auth_stat = ''A'' and b.module = ''SD'' and b.auth_stat = ''A'' and b.record_stat = ''O'' and exists ( select 1 from csvws_product_currencies where ccy_code = a.security_ccy ) and exists ( select 1 from csvws_product_branches where branch_code = global.current_branch ) and not exists ( select 1 from setms_dealprod_security_access where security_id = a.internal_sec_id and access_allowed_flag = ''D'' ) and ( exists ( select 1 from setms_dealproduct_restrictions c , setms_deal_product d where c.sedeal_product_code = b.product_code and d.product_code = c.sedeal_product_code and c.seproduct_code = a.product and c.seproduct_type = ''SE'' and d.se_restriction_type = ''A'' ) or ( exists ( select 1 from cstms_product where product_code = a.product and auth_stat = ''A'' and record_stat = ''O'' ) and not exists ( select 1 from setms_dealproduct_restrictions where sedeal_product_code = b.product_code and seproduct_type = ''SE'' and seproduct_code = a.product ) and exists ( select 1 from setms_deal_product where product_code = b.product_code and se_restriction_typ'||
'e = ''D'' ) ) )',
100,'INTERNAL_SEC_ID!TEXT!INTERNAL_SEC_ID~SECURITY_DESCRIPTION!TEXT!SECURITY_DESCRIPTION~SECURITY_CCY!TEXT!',
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
('LOV_SECFORMCD',
'SRCRPBLK',
'select security_form_code from setbs_pfolio_skacbalances where portfolio_id = ?and security_id = ?and sk_location_id = ?and sk_location_account = ?',
100,'SECURITY_FORM_CODE!TEXT!SECURITY_FORM_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECPRD',
'SEDPSRCL',
'select a.internal_sec_id, a.security_ref_no, a.product, a.security_description from setms_security_master a where a.internal_sec_id not in (select int_security_id from setms_sec_access_class where class_code = ? and module = ?) and a.auth_stat = ''A'' and a.record_stat = ''O'' order by a.internal_sec_id',
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
('LOV_SECTOR',
'CODCIFDF',
'SELECT SECTOR_NAME,DESCRIPTION FROM GETM_SECTOR_TYPE WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY SECTOR_NAME',
100,'SECTOR_NAME!TEXT!SECTOR_NAME~DESCRIPTION!TEXT!DESCRIPTION',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECTOR',
'DEDBNKCD',
'SELECT SECTOR_CODE FROM STTMS_SECTORS  WHERE RECORD_STAT = ''O'' AND  ONCE_AUTH = ''Y'' ORDER BY SECTOR_CODE',
100,'SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECTOR',
'STDFLTDS',
'SELECT SECTOR_CODE, SECTOR_DESC FROM STTMS_SECTORS WHERE RECORD_STAT = ''O'' AND ONCE_AUTH = ''Y'' ORDER BY SECTOR_CODE',
200,'SECTOR_CODE!TEXT!SECTOR_CODE~SECTOR_DESC!TEXT!SECTOR_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECTORCD',
'CLDMDSBR',
'select sector_code from detms_clg_brn_code where bank_code =? and  branch_code = ?',
'','SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECTORCHGCR',
'CIDACCDT',
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
('LOV_SECTORCHGCR',
'CLDACCDT',
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
('LOV_SECTORCHGCR',
'CLDLOTEM',
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
('LOV_SECTORCHGCR',
'LEDACCDT',
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
('LOV_SECTORCHGCR',
'LSDTRONL',
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
('LOV_SECTORCHGCR',
'MODACCDT',
'',50,'SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECTORCHGDR',
'CIDACCDT',
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
('LOV_SECTORCHGDR',
'CLDACCDT',
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
('LOV_SECTORCHGDR',
'CLDLOTEM',
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
('LOV_SECTORCHGDR',
'LEDACCDT',
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
('LOV_SECTORCHGDR',
'LSDTRONL',
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
('LOV_SECTORCHGDR',
'MODACCDT',
'',50,'SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECTORCOMPCR',
'CIDACCDT',
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
('LOV_SECTORCOMPCR',
'CLDACCDT',
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
('LOV_SECTORCOMPCR',
'CLDLOTEM',
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
('LOV_SECTORCOMPCR',
'LEDACCDT',
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
('LOV_SECTORCOMPCR',
'LSDTRONL',
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
('LOV_SECTORCOMPCR',
'MODACCDT',
'',50,'SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECTORCOMPDR',
'CIDACCDT',
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
('LOV_SECTORCOMPDR',
'CLDACCDT',
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
('LOV_SECTORCOMPDR',
'CLDLOTEM',
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
('LOV_SECTORCOMPDR',
'LEDACCDT',
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
('LOV_SECTORCOMPDR',
'LSDTRONL',
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
('LOV_SECTORCOMPDR',
'MODACCDT',
'',50,'SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECTORCOMPRE',
'CIDACCDT',
'select sector_code from detms_clg_brn_code where bank_code= ? and branch_code = ?',
100,'SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECTORCR',
'CIDACCDT',
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
('LOV_SECTORCR',
'CLDACCDT',
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
('LOV_SECTORCR',
'CLDLOTEM',
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
('LOV_SECTORCR',
'LEDACCDT',
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
('LOV_SECTORCR',
'LSDTRONL',
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
('LOV_SECTORCR',
'MODACCDT',
'',50,'SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECTORDR',
'CIDACCDT',
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
('LOV_SECTORDR',
'CLDACCDT',
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
('LOV_SECTORDR',
'CLDLOTEM',
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
('LOV_SECTORDR',
'LEDACCDT',
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
('LOV_SECTORDR',
'LSDTRONL',
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
('LOV_SECTORDR',
'MODACCDT',
'',50,'SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECTOR_CODE',
'CLDISTCH',
'select sector_code from detms_clg_brn_code where bank_code = ? and  branch_code = ?',
'','SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECTOR_CODE',
'CLDPMNT',
'select sector_code from detms_clg_brn_code where bank_code=? and branch_code=?',
'','SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECTOR_CODE',
'LEDPMNT',
'select sector_code from detms_clg_brn_code where bank_code=? and branch_code=?',
'','SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECTOR_CODE',
'MODPMNT',
'','','SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECTOR_CODE',
'STDBRANC',
'SELECT SECTOR_CODE ,SECTOR_DESC  FROM  STTM_SECTORS WHERE  AUTH_STAT=''A''  AND  RECORD_STAT=''O'' ORDER BY SECTOR_CODE',
100,'SECTOR_CODE!TEXT!SECTOR_CODE~SECTOR_DESC!TEXT!SECTOR_DESC',
'STRING~STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECTOR_CODE_CHG',
'CLDMSTCH',
'select sector_code from detms_clg_brn_code where bank_code = ? and  branch_code = ?',
'','SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECTOR_CODE_CHG',
'LEDMSTCH',
'select sector_code from detms_clg_brn_code where bank_code = ? and  branch_code = ?',
'','SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECTOR_CODE_CHG',
'MODMSTCH',
'select sector_code from detms_clg_brn_code where bank_code = ? and  branch_code = ?',
'','SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/
BEGIN
INSERT INTO SMZB_FUNCTION_LOV
(LOVID,CONTAINERID,LOVQUERY,FETCH_RECORDS
,REDUCTION_FIELD,REDUCTION_TYPE,WHERE_CLAUSE_SUMMARY,QUERY_FIELD,MULTIBRN_WHERE_CLAUSE
)
 VALUES 
('LOV_SECTOR_CODE_CR',
'CLDCROLL',
'select sector_code from detms_clg_brn_code where bank_code= ? and branch_code = ?',
50,'SECTOR_CODE!TEXT!SECTOR_CODE',
'STRING',
'','','')
;
END;
/



commit;
