CREATE OR REPLACE VIEW olvw_payment_summary AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_payment_summary.VW
**
** Module       : LOANS and SYNDICATION											
**
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
/*
**Changed By         : Gomathi G
**Date               : 22-MAY-2020
**Change Description : Added code to select Maturity date field
**Search String      : OBCL_14.3_Support_Bug#31389284 Changes

**Changed By         : Kaushik A S/Ramya M/Janki K
**Changed On         : 24-Aug-2020
**Search String      : OBCL_14.5_LS_OL_DISCOUNTED_SCHEDULE
**Change Reason      : OBCL_14.5_Discounted_Schedule_Changes  for Configurable refund

**Changed By          : Navoneel Nandan
**Changed On          : 23-Jun-2021
**Change Description  : Added Close Revolving Loan Flag to the view.
**Search String       : OBCL_14.5_Open_Loans

**Changed By         : Revathi Dharmalingam
**Date               : 03-NOV-2021
**Change Description : Added spot_rate & payment_ccy for FX Variation Changes 
**Search String      : OBCL_14.5_FX_Variation Changes

**Changed By         : Sowmya Bitra
**Date               : 25-April-2024
**Change Description : Added Prepaid_Principal_Amount to capture prepaid amount used for Penalty calculation
**Search String      : Bug#36548811

-----------------------------------------------------------------------------------------------
*/
SELECT b.external_ref_no  XREF,
       a.contract_ref_no FCCREF,
       a.event_seq_no EVENTSEQNO,
       b.counterparty  CPTY,
       b.user_defined_status STATUS,
       c.principal_outstanding_bal OSBAL,
       b.contract_ccy CCY,
             --to_char(a.old_maturity_date, 'RRRR-MM-DD')  OLDMATDT,
             --to_char(a.new_maturity_date, 'RRRR-MM-DD') NEWMATDT,
             --a.calc_split_dt  EFFFROM,
             --a.prepmt_basis PREPMTBASIS,
             --a.prepmt_effective_from PREPMTEFFFROM,
       --to_char(a.value_date, 'RRRR-MM-DD') VALDT,
       a.value_date VALDT,
       a.total_paid TOTPAID,
       --to_char(a.limit_date, 'RRRR-MM-DD') LIMITDT,
       a.limit_date LIMITDT,
       a.discount_rate DISCRATE,
             --a.total_prepaid TOTPREPAID,
       a.limit_amount LIMITAMT,
       a.liquidated_face_value LIQDFACEVAL,
       a.prepayment_penalty_rate PREPMTPENRATE,
       a.prepayment_penalty_amount PREPMTPENAMT,
       a.pmt_adj_amt1 PREPMTADJAMT1,
       a.pmt_adj_amt2 PREPMTADJAMT2,
       a.payment_remarks PAYMNTREM,
       0 LCYEQVTTOTPAID,
       0 LCYEQVTTOTPREPAID,
       0 LCYEQVTLIMITAMT,
       0 LCYEQVTLIQDFACEVALUE,
       0 LIQDORDER, --Bug 24936916
       '' SYNDNO,--added
       0 CURRPMNT,--Bug 24936916
       0 TOTPAMNT,--Bug 24936916
       0 OSBALREP,
       b.BRANCH BRANCH,
       b.department_code DEPARTCODE,
       b.treasury_source TREASSOURCE,
       a.INTEREST_WAIVER INTWAIVER,
       a.INTEREST_WAIVER_AMT INTWAIVERAMT,
       a.DDA_ADVICE_REQ DDAADVREQ,
       a.OVD_MEMO_POSTING OVDMEMOPOSTING,
       ALLOW_TAX_REFUND ALLOWTAXREFUND,
       INT_ON_PREPAID_PRINCIPAL PREPAIDPRINTRATE,
       LIQD_INT_ON_PREPAID_PRINCIPAL LIQDINTPREPAIDPRIN,
       REAPPLY_INT_ON_OUTSTAND_AMT REAPPINTOUTAMT,
       REAPPLY_INT_ON_PREPAID_AMT REAPPINTPREPAIDAMT,
       LIQUIDATE_DEPOSIT LIQDDEP,
       EXTERNAL_TRAN_REF_NO EXTTRNREFNO,
       PAYMENT_SCH_PROCESSING PAYSCHDPROCESS,
       a.subsystem_stat  SUBSYSSTAT,
          --[SITECODE: 12.1,INTERNAL, Negative Interest Rate] starts
          --'' LCYEQVTNEGAMT,
          a. negative_amount_settled,
          -- [SITECODE: 12.1,INTERNAL, Negative Interest Rate] ends
	--OBCL_14.3_SUPPORT_BUG#31389284 changes starts
       (SELECT maturity_date
       from oltb_contract_master d
       where d.contract_ref_no= b.contract_ref_no
       AND d.version_no = b.latest_version_no) MATDT,
     --OBCL_14.3_SUPPORT_BUG#31389284 changes_ends
       (SELECT customer_name1 FROM oltms_customer WHERE customer_no = b.counterparty) CPTYNAME,
       b.LATEST_EVENT_SEQ_NO LATEVNTSEQNO,
       '' CURREVNTSEQNO,
       b.CONTRACT_STATUS CONTRACTSTATUS,
       b.PRODUCT_TYPE PRODTYPE,
       C.CURRENT_FACE_VALUE CURRFACEVALUE,
       b.LATEST_VERSION_NO LATVERNO,
       C.PRINCIPAL_OUTSTANDING_BAL OSREPAMT,
       b.CURR_EVENT_CODE CURREVNTCODE,
       b.WORKFLOW_STATUS WORKFLSTATUS,
       b.RATE_REVISION_STATUS RATEREVSTATUS,
       b.MODULE_CODE MODULECODE,
       b.PRODUCT_CODE PRODCODE,
       a.PAYMENT_STATUS PAYMTSTATUS,
       0 NETAMTDUE,
       '' TAXPAYSTATUS,
       a.INT_ON_OUTSTANDING_PRINCIPAL INTONOUTPRINCPL,
       a.KEEP_THIS_CONTRACT_ACTIVE KEEPTHISCONTACTIVE,
       a.TRANS_EXCLUDE_FROM_STATEMENT TRANSEXCFROMSTAT,
       a.TRANS_REMARKS TRANSREMARKS,
       '' PC_REMARKS,
	   --OBCL_14.2_RESD starts
	   a.RESIDUAL_FLAG RESIDUAL_FLAG,
	   a.RESIDUAL_AMOUNT RESIDUAL_AMOUNT,
	   a.PAYMENT_TYPE PAYMENT_TYPE
	   --OBCL_14.2_RESD ends
	   ,Reduce_Tenor REDTENOR--OBCL_14.2_Prepayment_Sch Change
	   ,a.INTEREST_REFUND_REQUIRED INTREFREQ --OBCL_14.5_LS_OL_DISCOUNTED_SCHEDULE
       ,a.CLOSE_RVLNG_LOAN--OBCL_14.5_Open_Loans
	   --OBCL_14.5_FX_Variation Changes Start
	   ,a.spot_rate
       ,a.payment_ccy
	   --OBCL_14.5_FX_Variation Changes End
	   ,a.Prepaid_Principal_Amount PREPAIDPRINAMT --Bug#36548811 Changes
       FROM oltbs_contract_liq_summary a,
            OLTB_CONTRACT              b,
            oltbs_contract_balance     c
       WHERE  b.contract_ref_no = a.contract_ref_no AND
              c.contract_ref_no = a.contract_ref_no /*AND
              a.event_seq_no = (select max(event_seq_no)
              FROM oltbs_contract_liq_summary
              WHERE contract_ref_no = a.contract_ref_no)*/--Bug B24936916
/
CREATE OR REPLACE SYNONYM OLVWS_PAYMENT_SUMMARY FOR olvw_payment_summary
/