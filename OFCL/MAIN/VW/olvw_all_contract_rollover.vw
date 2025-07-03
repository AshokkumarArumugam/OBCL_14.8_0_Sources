CREATE OR REPLACE FORCE VIEW olvw_all_contract_rollover(APPLY_CHARGE,APPLY_TAX,CONTRACT_REF_NO,DRAWDOWN_SCH_NO,EVENT_SEQ_NO,LIQUIDATE_OD_SCHEDULES,MATURITY_DATE,MATURITY_DAYS,MATURITY_TYPE,NEW_COMPONENTS_ALLOWED,NOTICE_DAYS,REF_RATE,REF_RATE_SIGN,ROLLOVER_AMOUNT_TYPE,ROLLOVER_AMT,ROLLOVER_ICCF_FROM,ROLLOVER_TYPE,ROLL_BY,ROLL_INST_STATUS,ROLL_RESET_TENOR,SCHEDULE_DEFINITION_BASIS,TREAT_SPL_AMT_AS,UPDATE_UTILISATION,VERSION_NO) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_contract_rollover.VW
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(SELECT apply_charge
             ,apply_tax
             ,contract_ref_no
             ,drawdown_sch_no
             ,event_seq_no
             ,liquidate_od_schedules
             ,maturity_date
             ,maturity_days
             ,maturity_type
             ,new_components_allowed
             ,notice_days
             ,ref_rate
             ,ref_rate_sign
             ,rollover_amount_type
             ,rollover_amt
             ,rollover_iccf_from
             ,rollover_type
             ,roll_by
             ,roll_inst_status
             ,roll_reset_tenor
             ,schedule_definition_basis
             ,treat_spl_amt_as
             ,update_utilisation
             ,version_no
       FROM   oltbs_contract_rollover)
      UNION
      (SELECT apply_charge
             ,apply_tax
             ,contract_ref_no
             ,drawdown_sch_no
             ,event_seq_no
             ,liquidate_od_schedules
             ,maturity_date
             ,maturity_days
             ,maturity_type
             ,new_components_allowed
             ,notice_days
             ,ref_rate
             ,ref_rate_sign
             ,rollover_amount_type
             ,rollover_amt
             ,rollover_iccf_from
             ,rollover_type
             ,roll_by
             ,roll_inst_status
             ,roll_reset_tenor
             ,schedule_definition_basis
             ,treat_spl_amt_as
             ,update_utilisation
             ,version_no
       FROM   olars_contract_rollover)
      UNION
      (SELECT apply_charge
             ,apply_tax
             ,contract_ref_no
             ,drawdown_sch_no
             ,event_seq_no
             ,liquidate_od_schedules
             ,maturity_date
             ,maturity_days
             ,maturity_type
             ,new_components_allowed
             ,notice_days
             ,ref_rate
             ,ref_rate_sign
             ,rollover_amount_type
             ,rollover_amt
             ,rollover_iccf_from
             ,rollover_type
             ,roll_by
             ,roll_inst_status
             ,roll_reset_tenor
             ,schedule_definition_basis
             ,treat_spl_amt_as
             ,update_utilisation
             ,version_no
       FROM   olpts_contract_rollover)
      UNION
      (SELECT apply_charge
             ,apply_tax
             ,contract_ref_no
             ,drawdown_sch_no
             ,event_seq_no
             ,liquidate_od_schedules
             ,maturity_date
             ,maturity_days
             ,maturity_type
             ,new_components_allowed
             ,notice_days
             ,ref_rate
             ,ref_rate_sign
             ,rollover_amount_type
             ,rollover_amt
             ,rollover_iccf_from
             ,rollover_type
             ,roll_by
             ,roll_inst_status
             ,roll_reset_tenor
             ,schedule_definition_basis
             ,treat_spl_amt_as
             ,update_utilisation
             ,version_no
       FROM   olpps_contract_rollover)
/