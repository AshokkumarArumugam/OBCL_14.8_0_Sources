CREATE OR REPLACE FORCE VIEW lbvw_contract_amend_due_sum as
/*-------------------------------------------------------------------------------------- 
**  
**  File Name :lbvw_contract_amend_due_sum.VW 
**  
**  Module    :LS-Loan Syndication and commitments
**  
**This source is part of the Oracle Banking Corporate Lending  Software Product. 
**Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
**No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
**in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
**or otherwise, translated in any language or computer language, without the prior written permission 
**of Oracle and/or its affiliates. 
**Oracle Financial Services Software Limited.
**Oracle Park, Off Western Express Highway,
**Goregaon (East), 
**Mumbai - 400 063, India.
---------------------------------------------------------------------------------------
*/
SELECT B.CONTRACT_REF_NO,
B.EVENT_SEQ_NO,
B.VALUE_DATE,
B.DIFFERENTIAL_AMOUNT,
B.NEW_CREDIT_LINE,
B.NEW_MATURITY_DATE,
B.NEW_REVOLVING_FLAG,
B.TRANSACTION_DATE,
B.ICCF_CHANGED,
B.AMENDMENT_APPLIED,
B.VAMI_ESN,
B.CR_AGREEMENT_DATE,
B.CR_AGREEMENT_AMEND,
B.CONTRACTUAL_EFFECTIVE_DATE,
B.CONTRACTUAL_MATURITY_DATE,
B.PROPAGATE_DRAWDOWN,
B.NONPRORATA,
B.AMEND_INST_STATUS,
B.PROPAGATE_RATIO,
B.REMARKS,
B.TRANS_EXCLUDE_FROM_STATEMENT,
B.TRANS_REMARKS,
B.NEW_MATURITY_TYPE,
B.EXTERNAL_TRAN_REF_NO,
B.TENOR_BASED_SPREAD,
B.REASON_CODE,
B.PRAM_ESN,
B.REAMORT_DATE,
B.HFS_TRANSFER,
A.CONTRACT_STATUS,
A.AUTH_STATUS
FROM OLTBS_CONTRACT_AMEND_DUE B,OLTB_CONTRACT_EVENT_LOG A
WHERE A.CONTRACT_REF_NO =B.CONTRACT_REF_NO
AND A.MODULE ='LB'
/
create or replace synonym LBVWS_CONTRACT_AMEND_DUE_SUM for lbvw_contract_amend_due_sum
/