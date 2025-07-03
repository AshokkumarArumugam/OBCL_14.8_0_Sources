CREATE OR REPLACE FORCE VIEW olvw_all_contract_roll_int_rat(AMOUNT,CCY_DECIMALS,CCY_ROUND_RULE,CCY_ROUND_UNIT,COMPONENT,CONTRACT_REF_NO,DEFAULT_FROM,EVENT_SEQ_NO,INT_BASIS,INT_PERIOD_BASIS,MARGIN,PENALTY_TENOR,RATE,RATE_CODE,RATE_SIGN,RATE_TYPE,SPLIT_NO,SPREAD,VERSION_NO) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_contract_roll_int_rat.VW
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(SELECT amount
             ,ccy_decimals
             ,ccy_round_rule
             ,ccy_round_unit
             ,component
             ,contract_ref_no
             ,default_from
             ,event_seq_no
             ,int_basis
             ,int_period_basis
             ,margin
             ,penalty_tenor
             ,rate
             ,rate_code
             ,rate_sign
             ,rate_type
             ,split_no
             ,spread
             ,version_no
       FROM   oltbs_contract_roll_int_rates)
      UNION
      (SELECT amount
             ,ccy_decimals
             ,ccy_round_rule
             ,ccy_round_unit
             ,component
             ,contract_ref_no
             ,default_from
             ,event_seq_no
             ,int_basis
             ,int_period_basis
             ,margin
             ,penalty_tenor
             ,rate
             ,rate_code
             ,rate_sign
             ,rate_type
             ,split_no
             ,spread
             ,version_no
       FROM   olars_contract_roll_int_rates)
      UNION
      (SELECT amount
             ,ccy_decimals
             ,ccy_round_rule
             ,ccy_round_unit
             ,component
             ,contract_ref_no
             ,default_from
             ,event_seq_no
             ,int_basis
             ,int_period_basis
             ,margin
             ,penalty_tenor
             ,rate
             ,rate_code
             ,rate_sign
             ,rate_type
             ,split_no
             ,spread
             ,version_no
       FROM   olpts_contract_roll_int_rates)
      UNION
      (SELECT amount
             ,ccy_decimals
             ,ccy_round_rule
             ,ccy_round_unit
             ,component
             ,contract_ref_no
             ,default_from
             ,event_seq_no
             ,int_basis
             ,int_period_basis
             ,margin
             ,penalty_tenor
             ,rate
             ,rate_code
             ,rate_sign
             ,rate_type
             ,split_no
             ,spread
             ,version_no
       FROM   olpps_contract_roll_int_rates)
/