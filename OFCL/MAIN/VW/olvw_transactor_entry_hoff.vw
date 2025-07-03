CREATE OR REPLACE FORCE VIEW olvw_transactor_entry_hoff(
		DT_FLAG,
		COUNTRY_CODE,
		AC_BRANCH,
		BATCH_NO,
		TICKET_NO,
		ACCOUNT_NUMBER,
		ACCOUNT_CURRENCY,
		FCY_AMOUNT,
		LCY_AMOUNT,
		VALUE_DT,
		BOOK_DT, 
		TRN_CODE,
		REFERENCE_NUMBER,
		APA_CODE,
		DRCR_IND,
		CONTRACT_CODE,
		CUST_GL,
		MODULE,
		EVENT_SEQUENCE_NUMBER,
		EVENT_CODE,
		AC_ENTRY_SR_NO,
		EXCHANGE_RATE,
		FINANCIAL_CYCLE,
		PERIOD_CODE,
		USER_ID,
		AUTH_ID,
		AMOUNT_TAG,
		RELATED_CUSTOMER,
		RELATED_ACCOUNT,
		RELATED_REFERENCE,
		MIS_FLAG,
		MIS_HEAD,
		TYPE,
		CATEGORY,
		IB,
		TXN_MIS_1,
		TXN_MIS_2,
		TXN_MIS_3,
		TXN_MIS_4,
		TXN_MIS_5,
		TXN_MIS_6,
		TXN_MIS_7,
		TXN_MIS_8,
		TXN_MIS_9,
		TXN_MIS_10,
		COMP_MIS_1,
		COMP_MIS_2,
		COMP_MIS_3,
		COMP_MIS_4,
		COMP_MIS_5,
		COMP_MIS_6,
		COMP_MIS_7,
		COMP_MIS_8,
		COMP_MIS_9,
		COMP_MIS_10,
		REF_XRATE,  --HUFCITI TIL#1292 changes...
		CUSTOMER_REF_NO,
		DEPARTMENT_CODE,
		TRANSACTION_COUNT,
		USER_STATUS,
		INVOICE_NO,
		DESCRIPTION,
		INSTRUMENT_CODE,
		ROLLOVER_COUNT,
		REPROGRAM_COUNTER_NO,
		--19-APR-2004 FCC 4.6 PLC46100059 Starts
		PRODUCT,
		GAAP_INDICATOR
		--19-APR-2004 FCC 4.6 PLC46100059 Ends
		)
AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_transactor_entry_hoff.VW
**
** Module       : Interface
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
**
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------------
*/
/* 
CHANGE HISTORY:
09-JUL-2004 FCC 4.6 SEP 2004 RETRO HUFCITI Til No 1292   REF_XRATE column is added
18-JAN-2004 SFR CITIPLC PLC46020022 Added the copyright clause.
						Added the missing retro of  PLC44080016, PLC44060085, PLC44060105. Changes are as described below
						PLC44080016 Added missed out retro PLC4007050 and also removed the hardcoded date format.
						PLC44060085		Related Customer, if blank, should be handed off with the Branch Walkin Customer. 
						PLC44060105		1. Product for IC entries should also be displayed.  Just selecting from OLTB_CONTRACT will not give this.  
												Hence a module check is introduced, and if the module is decoded as IC then, sypks_utils.get_product(TRN_REF_NO) 
												is taken as the product code.
									2. DROP  SYNONYM and CREATE SYNONYM introduced for the view.
19-APR-2004 FCC 4.6 PLC46100059 TRANSACTOR-UTI changes-Added GAAP Indicator.And moved the create or replace to the top
*/
--CREATE OR REPLACE VIEW olvw_transactor_entry_hoff		
SELECT 	'D' DT_FLAG,
		B.COUNTRY_CODE,
		A.AC_BRANCH,
		A.BATCH_NO,
		A.CURR_NO TICKET_NO,
		A.AC_NO ACCOUNT_NUMBER,
		A.AC_CCY ACCOUNT_CURRENCY,
		A.FCY_AMOUNT,
		A.LCY_AMOUNT,
		--06-FEB-2004 PLC44080016 Starts
		--to_char(A.VALUE_DT,'yyyymmdd') value_dt, -- 3.8 changes ends 
		A.VALUE_DT,
		--to_char(A.TRN_DT,'yyyymmdd') book_dt, -- PYGCITILATAM specific change - 03/28/02
		A.TRN_DT,
		--06-FEB-2004 PLC44080016 Ends
		A.TRN_CODE,
		A.TRN_REF_NO REFERENCE_NUMBER,-- 3.8 changes
		--IFAC.COSMOS_REF_NO,
		null apa_code,
		A.DRCR_IND,    -- 3.8 changes start
		A.MODULE || A.EVENT CONTRACT_CODE,
		A.CUST_GL,
		A.MODULE,
		A.EVENT_SR_NO EVENT_SEQUENCE_NUMBER,
		A.EVENT EVENT_CODE,
		A.AC_ENTRY_SR_NO,
		A.EXCH_RATE EXCHANGE_RATE,
		A.FINANCIAL_CYCLE,
		A.PERIOD_CODE,
		A.USER_ID,
		A.AUTH_ID,
		A.AMOUNT_TAG,
		NVL(LTRIM(RTRIM(A.RELATED_CUSTOMER)),B.WALKIN_CUSTOMER) RELATED_CUSTOMER,	--13-MAR-2004 PLC44060085
		A.RELATED_ACCOUNT,
		A.RELATED_REFERENCE,
		A.MIS_FLAG,
		A.MIS_HEAD,
		A.TYPE,
		A.CATEGORY,
		A.IB,
		--06-FEB-2004 PLC4007050 Starts
		--MAP.TXN_MIS_1, -- 3.8 changes ends
		NVL ( MAP.TXN_MIS_1, MISBRN.TXN_MIS_CODE1 ) TXN_MIS_1,
		--06-FEB-2004 PLC4007050 Starts
		MAP.TXN_MIS_2,
		MAP.TXN_MIS_3,
		MAP.TXN_MIS_4,
		MAP.TXN_MIS_5,
		MAP.TXN_MIS_6,
		MAP.TXN_MIS_7,
		MAP.TXN_MIS_8,
		MAP.TXN_MIS_9,
		MAP.TXN_MIS_10,
		MAP.COMP_MIS_1,
		MAP.COMP_MIS_2,
		MAP.COMP_MIS_3,
		MAP.COMP_MIS_4,
		MAP.COMP_MIS_5,
		MAP.COMP_MIS_6,
		MAP.COMP_MIS_7,
		MAP.COMP_MIS_8,
		MAP.COMP_MIS_9,
		MAP.COMP_MIS_10, -- 3.8 changes start
		NVL(MAP.REF_XRATE, 0), --HUFCITI TIL#1292 changes...
		A.CUSTOMER_REF_NO --,GL.MIS3,GL.MIS1,GL.MIS2 -- 3.9 changes
		--PYGCITILATAM 17/APR/2002 PYSIT TILL #41 ANNA CHANGES STARTS
		,A.DEPARTMENT_CODE
		,A.TRANSACTION_COUNT
		,L.USER_DEFINED_STATUS
		--PYGCITILATAM 17/APR/2002 PYSIT TILL #41 ANNA CHANGES ENDS
		,'1',
		--T.ADDL_TEXT,
		REPLACE (T.ADDL_TEXT, CHR (10), ' '), --BOPROD TIL# 2 REPLACE LINE FEED CHAR BY A SPACE.
		A.INSTRUMENT_CODE,		--BOUAT # 45
		M.ROLLOVER_COUNT , M.REPROGRAM_COUNTER_NO,
		--FCC 4.4 Changes Starts
		--01-APR-2004 PLC44060105 - START
		--L.PRODUCT_CODE
		DECODE(a.module,'IC',(SELECT sypks_utils.get_product(A.TRN_REF_NO) FROM DUAL),l.product_code) product
		--01-APR-2004 PLC44060105 - END
		--FCC 4.4 Changes Ends
		--19-APR-2004 FCC 4.6 PLC46100059 Starts
		,GAAP_INDICATOR
		--19-APR-2004 FCC 4.6 PLC46100059 Ends
FROM
		oltms_branch B,
		oltbs_class_mapping MAP,
		oltbs_daily_log_ac A,
		--06-FEB-2004 SFR PLC4007050 Starts
		OLTM_BRANCH_PARAMETERS_MI MISBRN,
		--06-FEB-2004 SFR PLC4007050 Ends
		oltbs_contract L,
		oltbs_contract_master M,
		OLTB_ADDL_TEXT T		-- BOUAT # 45
WHERE 	B.BRANCH_CODE = A.AC_BRANCH AND A.DELETE_STAT !='D'
		-- and A.AC_ENTRY_SR_NO = IFAC.AC_ENTRY_SR_NO
		--      AND GL.TRN_REF_NO = A.TRN_REF_NO -- 3.9 changes
		AND a.ac_branch	= misbrn.branch_code -- 06-FEB-2004 SFR PLC4007050
		AND A.AUTH_STAT='A'
		AND MAP.UNIT_TYPE(+)= DECODE(A.CUST_GL,'A','A',DECODE(A.MODULE,'IC','A','R'))
		AND MAP.BRANCH_CODE(+) = sypks_utils.get_branch(A.TRN_REF_NO)
		AND MAP.UNIT_REF_NO (+) = decode(A.CUST_GL,'A',A.AC_NO,
		DECODE(A.MODULE,'IC',A.RELATED_ACCOUNT,A.TRN_REF_NO)) -- 3.8 changes ends
		AND L.CONTRACT_REF_NO (+) = A.TRN_REF_NO
		AND M.CONTRACT_REF_NO (+) = L.CONTRACT_REF_NO
		AND M.VERSION_NO (+) = L.LATEST_VERSION_NO
		--BOUAT # 45 STARTS
		--AND A.TRN_REF_NO = I.CONTRACT_REF_NO(+)
		AND A.TRN_REF_NO = T.REFERENCE_NO(+)
		AND A.EVENT_SR_NO = T.EVNT_SEQ_NO(+)
		AND A.BALANCE_UPD <> 'T'
		--BOUAT # 45 ENDS
/
CREATE or replace SYNONYM olvws_transactor_entry_hoff 
FOR olvw_transactor_entry_hoff
/