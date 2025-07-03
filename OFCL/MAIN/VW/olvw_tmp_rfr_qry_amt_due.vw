CREATE OR REPLACE VIEW olvw_tmp_rfr_qry_amt_due AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_tmp_rfr_qry_amt_due.VW
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
-----------------------------------------------------------------------------------------------
*/
SELECT
    CONTRACT_REF_NO,
    COMPONENT,
    DUE_DATE,
    AMOUNT_DUE,
    CURRENCY_AMT_DUE,
    ACCOUNT_DUE,
    BRANCH_ACCOUNT_DUE,
    COUNTERPARTY,
    AMOUNT_SETTLED,
    INFLOW_OUTFLOW,
    BASIS_AMOUNT_TAG,
    ADJUSTED_AMOUNT,
    SCHEDULE_LINKAGE,
    MSG_EVENT_SEQ_NO,
    SCH_PICKED_FOR_LIQ,
    BILLING_EVENT_SEQ_NO,
    COMPONENT_TYPE,
    SGEN_AC_BRANCH,
    SGEN_AC_NO,
    SGEN_AC_CCY,
    SGEN_AMOUNT,
    SGEN_XRATE,
    PREVIOUS_ACCRUAL_REF_NO,
    PREVIOUS_ACCRUAL_TO_DATE,
    CURRENT_NET_ACCRUAL,
    TILL_DATE_ACCRUAL,
    STATUS,
    REFINANCE_REQD,
    CURRENT_MEMO_ACCRUAL,
    NOTC_GEN,
    NOTC_EVENT_SEQ_NO,
    DISC_ACCR_APPLICABLE,
    PAY_MSG_DATE,
    RECV_MSG_DATE,
    RNTC_MSG_DATE,
    RNTC_EVENT_SEQ_NO,
    TAX_DUE,
    TAX_SETTLED,
    TAX_ADJUSTED,
    CONTRACT_CCY,
    AMT_IN_CONT_CCY,
    PAY_CONF_STATUS,
    PAY_CONF_MAKER_ID,
    PAY_CONF_MAKER_DT_STAMP,
    NETTING_STATUS,
    NETTING_TIMESTAMP,
    SETTLED_STATUS,
    PAY_RECV_AMOUNT,
    MORA_INT,
    HOL_DUE_DATE,
    AMOUNT_DUE_ACTUAL,
    EXP_FEE_SCH,
    PAY_BY_DATE,
    CALC_END_DATE,
    LAST_CALC_DATE,
    LAST_RATE_PICKUP_DATE,
    SCHEDULE_DATE
FROM
    OLTBS_AMOUNT_DUE_CS
UNION ALL
Select 
    CONTRACT_REF_NO,
    COMPONENT,
    DUE_DATE,
    AMOUNT_DUE,
    CURRENCY_AMT_DUE,
    ACCOUNT_DUE,
    BRANCH_ACCOUNT_DUE,
    COUNTERPARTY,
    AMOUNT_SETTLED,
    INFLOW_OUTFLOW,
    BASIS_AMOUNT_TAG,
    ADJUSTED_AMOUNT,
    SCHEDULE_LINKAGE,
    MSG_EVENT_SEQ_NO,
    SCH_PICKED_FOR_LIQ,
    BILLING_EVENT_SEQ_NO,
    COMPONENT_TYPE,
    SGEN_AC_BRANCH,
    SGEN_AC_NO,
    SGEN_AC_CCY,
    SGEN_AMOUNT,
    SGEN_XRATE,
    PREVIOUS_ACCRUAL_REF_NO,
    PREVIOUS_ACCRUAL_TO_DATE,
    CURRENT_NET_ACCRUAL,
    TILL_DATE_ACCRUAL,
    STATUS,
    REFINANCE_REQD,
    CURRENT_MEMO_ACCRUAL,
    NOTC_GEN,
    NOTC_EVENT_SEQ_NO,
    DISC_ACCR_APPLICABLE,
    PAY_MSG_DATE,
    RECV_MSG_DATE,
    RNTC_MSG_DATE,
    RNTC_EVENT_SEQ_NO,
    TAX_DUE,
    TAX_SETTLED,
    TAX_ADJUSTED,
    CONTRACT_CCY,
    AMT_IN_CONT_CCY,
    PAY_CONF_STATUS,
    PAY_CONF_MAKER_ID,
    PAY_CONF_MAKER_DT_STAMP,
    NETTING_STATUS,
    NETTING_TIMESTAMP,
    SETTLED_STATUS,
    PAY_RECV_AMOUNT,
    MORA_INT,
    HOL_DUE_DATE,
    AMOUNT_DUE_ACTUAL,
    EXP_FEE_SCH,
    PAY_BY_DATE,
    CALC_END_DATE,
    LAST_CALC_DATE,
    LAST_RATE_PICKUP_DATE,
    SCHEDULE_DATE
from 
    OLTBS_TMP_RFR_AMT_DUE
/
CREATE OR REPLACE SYNONYM olvws_tmp_rfr_qry_amt_due FOR olvw_tmp_rfr_qry_amt_due
/