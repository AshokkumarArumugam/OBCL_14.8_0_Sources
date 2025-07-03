CREATE OR REPLACE VIEW olvw_tmp_rfr_qry_iccf_calc AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : olvw_tmp_rfr_qry_iccf_calc.VW
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
    PREPAYMENT_PENALTY_SEQ_NO,
    SCHEDULE_DATE,
    START_DATE,
    PRODUCT,
    CURRENCY,
    END_DATE,
    BASIS_AMOUNT,
    RATE,
    NO_OF_DAYS,
    CALCULATED_AMOUNT,
    ICCF_CALC_METHOD,
    DAILY_AVERAGE_AMOUNT,
    RATE_SIGN,
    INT_APPLICATION,
    COMPOUND_INTEREST,
    TAX_AMOUNT,
    COMPUTATION_DAYS,
    BASE_COMP_AMOUNT,
    SPRD_COMP_AMOUNT,
    MRGN_COMP_AMOUNT,
    BASE_RATE,
    SPRD_RATE,
    MRGN_RATE,
    TOTAL_COMP_RATE,
    TOTAL_SIMPLE_RATE,
    TOTAL_COMP_INT,
    TOTAL_SIMPLE_INT,
    RATE_PICKUP_DATE,
    CALC_DATE,
    BASE_INDEX_RATE,
    RFR_EFFEC_RATE,
    RATE_FACTOR,
    ACR,
    UCR,
    NCR,
    PICKEDUP_BASE_RATE,
    ADJUSTMENT_RATE
FROM
    OLTBS_CONTRACT_ICCF_CALC
UNION ALL
SELECT
    CONTRACT_REF_NO,
    COMPONENT,
    PREPAYMENT_PENALTY_SEQ_NO,
    SCHEDULE_DATE,
    START_DATE,
    PRODUCT,
    CURRENCY,
    END_DATE,
    BASIS_AMOUNT,
    RATE,
    NO_OF_DAYS,
    CALCULATED_AMOUNT,
    ICCF_CALC_METHOD,
    DAILY_AVERAGE_AMOUNT,
    RATE_SIGN,
    INT_APPLICATION,
    COMPOUND_INTEREST,
    TAX_AMOUNT,
    COMPUTATION_DAYS,
    BASE_COMP_AMOUNT,
    SPRD_COMP_AMOUNT,
    MRGN_COMP_AMOUNT,
    BASE_RATE,
    SPRD_RATE,
    MRGN_RATE,
    TOTAL_COMP_RATE,
    TOTAL_SIMPLE_RATE,
    TOTAL_COMP_INT,
    TOTAL_SIMPLE_INT,
    RATE_PICKUP_DATE,
    CALC_DATE,
    BASE_INDEX_RATE,
    RFR_EFFEC_RATE,
    RATE_FACTOR,
    ACR,
    UCR,
    NCR,
    PICKEDUP_BASE_RATE,
    ADJUSTMENT_RATE
FROM
    OLTBS_TMP_RFR_ICCF_CALC
/
CREATE OR REPLACE SYNONYM olvws_tmp_rfr_qry_iccf_calc FOR olvw_tmp_rfr_qry_iccf_calc
/