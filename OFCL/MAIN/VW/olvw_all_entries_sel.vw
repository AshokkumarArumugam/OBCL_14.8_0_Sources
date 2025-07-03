CREATE OR REPLACE force VIEW olvw_all_entries_sel ( 
MODULE                         ,
TRN_REF_NO                     ,
EVENT_SR_NO                    ,
EVENT                          ,
AC_ENTRY_SR_NO                 ,
AC_BRANCH                      ,
AC_NO                          ,
AC_CCY                         ,
DRCR_IND                       ,
TRN_CODE                       ,
AMOUNT_TAG                     ,
FCY_AMOUNT                     ,
EXCH_RATE                      ,
LCY_AMOUNT                     ,
RELATED_CUSTOMER               ,
RELATED_ACCOUNT                ,
RELATED_REFERENCE              ,
MIS_FLAG                       ,
MIS_HEAD                       ,
TRN_DT                         ,
VALUE_DT                       ,
TXN_INIT_DATE                  ,
FINANCIAL_CYCLE                ,
PERIOD_CODE                    ,
INSTRUMENT_CODE                ,
BATCH_NO                       ,
CURR_NO                        ,
USER_ID                        ,
BANK_CODE                      ,
AVLDAYS                        ,
BALANCE_UPD                    ,
TYPE                           ,
AUTH_ID                        ,
PRINT_STAT                     ,
AUTH_STAT                      ,
CATEGORY                       ,
CUST_GL                        ,
DISTRIBUTED                    ,
NODE                           ,
DELETE_STAT                    ,
ON_LINE                        ,
UPDACT                         ,
NODE_SR_NO                     ,
NETTING_IND                    ,
IB                             ,
FLG_POSITION_STATUS            ,
GLMIS_UPDATE_FLAG              ,
PRODUCT_ACCRUAL                ,
TRANSACTION_COUNT              ,
VDBAL_UPDATE_FLAG              ,
GLMIS_UPDATE_STATUS            ,
DEPARTMENT_CODE                ,
CUSTOM_REF_NO                  ,
INTERFACE_REF_NO               ,
CUSTOMER_REF_NO                ,
PROCESSED_FLAG                 ,
MIS_SPREAD                     ,
AML_EXCEPTION                  ,
HIDE_TXN_IN_STMT               ,
PNL_HIST_IND                   ,
ECA_ALLOWED                    ,
ECA_STATUS                     ,	-- Fcc4.0 related changes
INTERNAL_GL_TYPE               ,	--Fcc4.0 related changes
SYSTEM_AC_NO                   ,
MIS_UNIT_TYPE                  ,
MIS_UNIT_REF_NO                ,
SYS_AC_VDBAL_UPD               ,
EOD_WASH_STATUS                ,	-- FCC4.0 JUNE 2002 change
UNCOL_PROCESS_STATUS           ,	-- Fcc4.1 Oct2002 (3.91 LATAM) related change
RECV_ORIG_AC_NO                ,	--23-APR-2003 FCC 4.2 APR 2003 CHANGES for ITR1 SFR NO 611 deleteion of the contract was not deleting  the receivable
--
--FCC 4.3 AUG 2003 GAAP Changes start
--
GAAP_INDICATOR                 ,
--
--FCC 4.3 AUG 2003 GAAP Changes end
-- 
BAL_CHK_ONLINE                 ,
BAL_CHK_BATCH                  ,
REVL_ONLINE                    ,	--Fcc 4.3 Aug 2003 Contract revaln changes
--
--01-AUG-2003 FCC 4.3 AUG 2003 DELINQUENCY CHANGES BEGIN
--
--DELINQUENCY_CLASS	       ,		
DELINQUENCY_PRODUCT            ,	--FCC 4.3.1 Changes
--
--01-AUG-2003 FCC 4.3 AUG 2003 DELINQUENCY CHANGES BEGIN
--
COMBINED_BAL_UPD_ALLOWED       ,	/* Added for FCC 4.5 APR 2004 Fast changes */
NETTED_ENTRY                   ,	/* Added for FCC 4.5 APR 2004 Fast changes */
--
-- FCC 4.6 Sep04 Retro (India) BEGIN
--
AUTOREV_REJ_ECA                ,
ECA_DURING                     ,
flip_drcr_tov  			 , -- FCC 4.6 Sep04 Retro (India) Changes --CITIPLC PLC44040030 changes
ECA_CUTOFF_DATETIME 	       ,           --CITIPLC PLC44040030 changes
--
-- FCC 4.6 Sep04 Retro (India) END
--
ACCOUNTING_ROLE,		  -- FCC 4.6 SEP04 Release Changes
IL_BVT_PROCESSED,
ROW_ID) AS 
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_all_entries_sel.VW
**
** Module       : CORE ENTITIES
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/* 
CHANGE HISTORY
24-01-2002 Fcc39 related changes Added one more column HIDE_TXN_IN_STMT in the view
28-JAN-2002 FCC3.9 LATAM 	 change is related to tracking accrual history for previous year, current month
				 or current year, while GL trnasfer during status change in LD
			 	 Added new field PNL_HIST_IND
05-04-2002 Fcc4.0 June2002  related change added columns INTERNAL_GL_TYPE,SYSTEM_AC_NO,MIS_UNIT_TYPE,MIS_UNIT_REF_NO,
							SYS_AC_VDBAL_UPD
29-04-2002 Fcc4.0 June2002  related changes Added new columns ECA_ALLOWED and ECA_STATUS(RBCS) 
18-JUNE-2002 FCC4.0 JUNE 2002 related changes added new column EOD_WASH_STATUS
25-SEPT-2002 Fcc4.1 Oct2002 (3.91 LATAM) related changes.Added column names in the select.Added one more column 
							 UNCOL_PROCESS_STATUS in oltbs_daily_log_ac which will tell 
							 whether the txn has been processed for uncollected or not.  
23-APR-2003 FCC 4.2 APR 2003 CHANGES for ITR1 SFR NO 611 deleteion of the contract was not deleting  the receivable
17-JUN-2003	FCC 4.3 AUG 2003 GAAP Changes.Taken care of gaap_indicator to oltbs_daily_log_ac
08-JUN-2003	FCC 4.3 AUG 2003 GAAP Changes.Added gaap_indicator
24-JUL-2003 FCC 4.3 AUG 2003 added revl_online flag for contract revaln.
01-AUG-2003	FCC 4.3 AUG 2003 Delinquency Changes Added Columns delinquency_class,bal_chk_online and bal_chk_batch
26-JUL-2004	FCC 4.6 Sep04 Retro (India) .. Original definition hushed to have the same sequence of columns
		from OLTB_DAILY_LOG_AC.
24-AUG-2004	-- FCC 4.6 SEP04 Release Changes .. added accounting role column in view
21-SEP-2004 	FCC 4.6 SEP 2004 CHANGES SFR 290
21-SEP-2004	FCC 4.6 SEP 2004 CHANGES SFR 659
05-JAN-2005 FCC4.6.1 JAN 2005 CITIPLC PLC44040030 changes
	Order of the columns Flip_drcr_tov and Eca_cutoff_datetime has been changed in the column list.
19-JAN-2005 FCC 4.6.1 JAN 2005 ITR-1 SFR-196 For changing copyright clause / release name
*/
-- CREATE OR REPLACE force VIEW olvw_all_entries_sel ( 
-- MODULE                 ,
-- TRN_REF_NO             ,
-- EVENT_SR_NO            ,
-- EVENT                  ,
-- AC_ENTRY_SR_NO         ,
-- AC_BRANCH              ,
-- AC_NO                  ,
-- AC_CCY                 ,
-- DRCR_IND               ,
-- TRN_CODE               ,
-- AMOUNT_TAG             ,
-- FCY_AMOUNT             ,
-- EXCH_RATE              ,
-- LCY_AMOUNT             ,
-- RELATED_CUSTOMER       ,
-- RELATED_ACCOUNT        ,
-- RELATED_REFERENCE      ,
-- MIS_FLAG               ,
-- MIS_HEAD               ,
-- TRN_DT                 ,
-- VALUE_DT               ,
-- TXN_INIT_DATE          ,
-- FINANCIAL_CYCLE        ,
-- PERIOD_CODE            ,
-- INSTRUMENT_CODE        ,
-- BATCH_NO               ,
-- CURR_NO                ,
-- USER_ID                ,
-- BANK_CODE              ,
-- AVLDAYS                ,
-- BALANCE_UPD            ,
-- TYPE                   ,
-- AUTH_ID                ,
-- PRINT_STAT             ,
-- AUTH_STAT              ,
-- CATEGORY               ,
-- CUST_GL                ,
-- DISTRIBUTED            ,
-- NODE                   ,
-- DELETE_STAT            ,
-- ON_LINE                ,
-- UPDACT                 ,
-- NODE_SR_NO             ,
-- NETTING_IND            ,
-- IB                     ,
-- FLG_POSITION_STATUS    ,
-- GLMIS_UPDATE_FLAG      ,
-- PRODUCT_ACCRUAL        ,
-- AML_EXCEPTION          ,
-- TRANSACTION_COUNT      ,
-- VDBAL_UPDATE_FLAG      ,
-- GLMIS_UPDATE_STATUS    ,
-- DEPARTMENT_CODE        ,
-- CUSTOM_REF_NO          ,
-- INTERFACE_REF_NO       ,
-- CUSTOMER_REF_NO        ,
-- PROCESSED_FLAG         ,
-- MIS_SPREAD             ,
-- HIDE_TXN_IN_STMT       ,
-- PNL_HIST_IND           ,
-- INTERNAL_GL_TYPE       ,	--Fcc4.0 related changes
-- SYSTEM_AC_NO	       ,
-- MIS_UNIT_TYPE	       ,
-- MIS_UNIT_REF_NO	       ,
-- ECA_ALLOWED	       ,
-- SYS_AC_VDBAL_UPD       ,	
-- ECA_STATUS	       , -- Fcc4.0 related changes
-- EOD_WASH_STATUS        , -- FCC4.0 JUNE 2002 change
-- UNCOL_PROCESS_STATUS   , -- Fcc4.1 Oct2002 (3.91 LATAM) related change
-- RECV_ORIG_AC_NO,--23-APR-2003 FCC 4.2 APR 2003 CHANGES for ITR1 SFR NO 611 deleteion of the contract was not deleting  the receivable
-- --
-- --FCC 4.3 AUG 2003 GAAP Changes start
-- --
-- gaap_indicator,
-- --
-- --FCC 4.3 AUG 2003 GAAP Changes end
-- --
-- revl_online, --Fcc 4.3 Aug 2003 Contract revaln changes
-- --01-AUG-2003 FCC 4.3 AUG 2003 DELINQUENCY CHANGES BEGIN
-- --DELINQUENCY_CLASS,
-- DELINQUENCY_PRODUCT, --FCC 4.3.1 Changes
-- BAL_CHK_ONLINE,
-- BAL_CHG_BATCH,
-- --01-AUG-2003 FCC 4.3 AUG 2003 DELINQUENCY CHANGES END
-- NETTED_ENTRY,/* Added for FCC 4.5 APR 2004 Fast changes */ 
-- COMBINED_BAL_UPD_ALLOWED, /* Added for FCC 4.5 APR 2004 Fast changes */
-- ROW_ID) AS 
-- SELECT  a.*,
-- 	a.ROWID ROW_ID
-- from oltbs_daily_log_ac a
-- where a.delete_stat = ' '
-- /
-- SELECT  a.*,   -- FCC 4.6 Sep04 Retro (India) a.* is replaced by specific columns name.
SELECT 
MODULE                         ,
TRN_REF_NO                     ,
EVENT_SR_NO                    ,
EVENT                          ,
AC_ENTRY_SR_NO                 ,
AC_BRANCH                      ,
AC_NO                          ,
AC_CCY                         ,
DRCR_IND                       ,
TRN_CODE                       ,
AMOUNT_TAG                     ,
FCY_AMOUNT                     ,
EXCH_RATE                      ,
LCY_AMOUNT                     ,
RELATED_CUSTOMER               ,
RELATED_ACCOUNT                ,
RELATED_REFERENCE              ,
MIS_FLAG                       ,
MIS_HEAD                       ,
TRN_DT                         ,
VALUE_DT                       ,
TXN_INIT_DATE                  ,
FINANCIAL_CYCLE                ,
PERIOD_CODE                    ,
INSTRUMENT_CODE                ,
BATCH_NO                       ,
CURR_NO                        ,
USER_ID                        ,
BANK_CODE                      ,
AVLDAYS                        ,
BALANCE_UPD                    ,
TYPE                           ,
AUTH_ID                        ,
PRINT_STAT                     ,
AUTH_STAT                      ,
CATEGORY                       ,
CUST_GL                        ,
DISTRIBUTED                    ,
NODE                           ,
DELETE_STAT                    ,
ON_LINE                        ,
UPDACT                         ,
NODE_SR_NO                     ,
NETTING_IND                    ,
IB                             ,
FLG_POSITION_STATUS            ,
GLMIS_UPDATE_FLAG              ,
PRODUCT_ACCRUAL                ,
TRANSACTION_COUNT              ,
VDBAL_UPDATE_FLAG              ,
GLMIS_UPDATE_STATUS            ,
DEPARTMENT_CODE                ,
CUSTOM_REF_NO                  ,
INTERFACE_REF_NO               ,
CUSTOMER_REF_NO                ,
PROCESSED_FLAG                 ,
MIS_SPREAD                     ,
AML_EXCEPTION                  ,
HIDE_TXN_IN_STMT               ,
PNL_HIST_IND                   ,
ECA_ALLOWED                    ,
ECA_STATUS                     ,
INTERNAL_GL_TYPE               ,
SYSTEM_AC_NO                   ,
MIS_UNIT_TYPE                  ,
MIS_UNIT_REF_NO                ,
SYS_AC_VDBAL_UPD               ,
EOD_WASH_STATUS                ,
UNCOL_PROCESS_STATUS           ,
RECV_ORIG_AC_NO                ,
GAAP_INDICATOR                 ,
BAL_CHK_ONLINE                 ,
BAL_CHK_BATCH                  ,
REVL_ONLINE                    ,
DELINQUENCY_PRODUCT            ,
COMBINED_BAL_UPD_ALLOWED       ,
NETTED_ENTRY                   ,
AUTOREV_REJ_ECA                ,
ECA_DURING                     ,
flip_drcr_tov  		       ,	-- FCC 4.6 SEP04 Release Changes
ECA_CUTOFF_DATETIME            ,
accounting_role			,	-- FCC 4.6 SEP04 Release Changes
IL_BVT_PROCESSED,
a.ROWID ROW_ID
from oltbs_daily_log_ac a
where a.delete_stat = ' '
/
create or replace synonym olvws_all_entries_sel for olvw_all_entries_sel
/