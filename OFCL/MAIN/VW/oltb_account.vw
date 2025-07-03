CREATE OR REPLACE FORCE VIEW oltb_account AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : oltb_account.VW

Change History
  
Changed By         : Abhinav Kumar
Date               : 07-Nov-2024
Change Description : Modified Column SOURCE_SYSTEM_ACC_NO -> CUST_ACCOUNT_NO from STTM_CORE_ACCOUNT
                     as LBDINSTR screen was showing Source system account number instead of Account number maintained in STDCRACC. 
Search String      : Bug#37184103 

Changed By         : Akhila Samson
Date               : 25-Nov-2024
Change Description : Added the code to display only open account details. 
Search String      : Bug#37309005 
--------------------------------------------------------------------------------------------------------------------------------------
*/
SELECT
AC_GL_NO,
AC_OR_GL,
AC_GL_DESC,
AC_CLASS,
CUST_NO,
AC_GL_CCY,
BRANCH_CODE,
IBAN_AC_NO,
AC_OPEN_DATE,
AC_STAT_DORMANT,
AC_STAT_FROZEN,
AC_STAT_NO_CR,
AC_STAT_NO_DR,
GL_ACLASS_TYPE,
GL_CATEGORY,
GL_STAT_BLOCKED,
AUTH_STAT,
ONCE_AUTH,
ac_gl_rec_status,
OFFLINE_LIMIT,
AC_NATIVE,
msg_netting,
CUST_NAME1,
Internal_gl_type,
charge_details,
ac_netting
--FROM (SELECT SOURCE_SYSTEM_ACC_NO AC_GL_NO, --Bug#37184103
FROM (SELECT CUST_ACCOUNT_NO AC_GL_NO,  --Bug#37184103
'A' AC_OR_GL,
CUST_AC_NAME AC_GL_DESC,
ACCOUNT_CLASS AC_CLASS,
CUSTOMER_NO CUST_NO,
CUST_AC_CCY AC_GL_CCY,
SOURCE_SYSTEM_ACC_BRN BRANCH_CODE,
CUST_AC_IBAN IBAN_AC_NO,
AC_OPEN_DATE,
AC_STAT_DORMANT,
AC_STAT_FROZEN,
AC_STAT_NO_CR,
AC_STAT_NO_DR,
'9' GL_ACLASS_TYPE,
NULL GL_CATEGORY,
NULL GL_STAT_BLOCKED,
AUTH_STAT,
ONCE_AUTH,
RECORD_STAT ac_gl_rec_status,
OFFLINE_LIMIT,
AC_NATIVE,
msg_netting,
CUST_NAME1,
Null internal_gl_type,
charge_details,
ac_netting
FROM sytv_acc_master
UNION
SELECT GL_CODE AC_GL_NO,
'G' AC_OR_GL,
GL_DESC AC_GL_DESC,
NULL AC_CLASS,
NULL CUST_NO,
NULL AC_GL_CCY,
NULL BRANCH_CODE,
NULL IBAN_AC_NO,
NULL AC_OPEN_DATE,
NULL AC_STAT_DORMANT,
NULL AC_STAT_FROZEN,
NULL AC_STAT_NO_CR,
NULL AC_STAT_NO_DR,
TYPE GL_ACLASS_TYPE,
CATEGORY GL_CATEGORY,
BLOCK GL_STAT_BLOCKED,
AUTH_STAT,
ONCE_AUTH,
RECORD_STAT ac_gl_rec_status,
NULL OFFLINE_LIMIT,
null AC_NATIVE,
null MSG_NETTING,
null CUST_NAME1,
'N' Internal_gl_type,
null charge_details,
null ac_netting
FROM sytv_gl_master)
--Bug#37309005 Start
WHERE ac_gl_rec_status = 'O'
AND AUTH_STAT  = 'A'
--Bug#37309005 End
/
create or replace synonym oltbs_account for oltb_account
/
