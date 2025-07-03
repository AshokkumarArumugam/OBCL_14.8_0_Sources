CREATE OR REPLACE FORCE VIEW olvw_all_contract_drawdown_icc(BASIS_AMOUNT,CALCULATED_AMOUNT,COMPONENT,CONTRACT_REF_NO,CURRENCY,DAILY_AVERAGE_AMOUNT,END_DATE,ICCF_CALC_METHOD,NO_OF_DAYS,PREPAYMENT_PENALTY_SEQ_NO,PRODUCT,RATE,RATE_SIGN,SCHEDULE_DATE,START_DATE) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_contract_drawdown_icc.VW
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(SELECT basis_amount
             ,calculated_amount
             ,component
             ,contract_ref_no
             ,currency
             ,daily_average_amount
             ,end_date
             ,iccf_calc_method
             ,no_of_days
             ,prepayment_penalty_seq_no
             ,product
             ,rate
             ,rate_sign
             ,schedule_date
             ,start_date
       FROM   oltbs_contract_drawdown_iccf)
      UNION
      (SELECT basis_amount
             ,calculated_amount
             ,component
             ,contract_ref_no
             ,currency
             ,daily_average_amount
             ,end_date
             ,iccf_calc_method
             ,no_of_days
             ,prepayment_penalty_seq_no
             ,product
             ,rate
             ,rate_sign
             ,schedule_date
             ,start_date
       FROM   olars_contract_drawdown_iccf)
      UNION
      (SELECT basis_amount
             ,calculated_amount
             ,component
             ,contract_ref_no
             ,currency
             ,daily_average_amount
             ,end_date
             ,iccf_calc_method
             ,no_of_days
             ,prepayment_penalty_seq_no
             ,product
             ,rate
             ,rate_sign
             ,schedule_date
             ,start_date
       FROM   olpts_contract_drawdown_iccf)
      UNION
      (SELECT basis_amount
             ,calculated_amount
             ,component
             ,contract_ref_no
             ,currency
             ,daily_average_amount
             ,end_date
             ,iccf_calc_method
             ,no_of_days
             ,prepayment_penalty_seq_no
             ,product
             ,rate
             ,rate_sign
             ,schedule_date
             ,start_date
       FROM   olpps_contract_drawdown_iccf)
/