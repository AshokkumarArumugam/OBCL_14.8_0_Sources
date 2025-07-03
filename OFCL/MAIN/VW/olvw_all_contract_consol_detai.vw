CREATE OR REPLACE FORCE VIEW olvw_all_contract_consol_detai(APPLY_CHARGE,APPLY_TAX,CONTRACT_REF_NO,DEFAULT_CONTRACT,DRAWDOWN_NO,LIQUIDATE_OD_SCHEDULES,PARTICIPANT_REF_NO,ROLLOVER_AMOUNT_TYPE,SPECIAL_AMOUNT,SPECIAL_AMOUNT_TYPE) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_contract_consol_detai.VW
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
             ,default_contract
             ,drawdown_no
             ,liquidate_od_schedules
             ,participant_ref_no
             ,rollover_amount_type
             ,special_amount
             ,special_amount_type
       FROM   oltbs_contract_consol_detail)
      UNION
      (SELECT apply_charge
             ,apply_tax
             ,contract_ref_no
             ,default_contract
             ,drawdown_no
             ,liquidate_od_schedules
             ,participant_ref_no
             ,rollover_amount_type
             ,special_amount
             ,special_amount_type
       FROM   olars_contract_consol_detail)
      UNION
      (SELECT apply_charge
             ,apply_tax
             ,contract_ref_no
             ,default_contract
             ,drawdown_no
             ,liquidate_od_schedules
             ,participant_ref_no
             ,rollover_amount_type
             ,special_amount
             ,special_amount_type
       FROM   olpts_contract_consol_detail)
      UNION
      (SELECT apply_charge
             ,apply_tax
             ,contract_ref_no
             ,default_contract
             ,drawdown_no
             ,liquidate_od_schedules
             ,participant_ref_no
             ,rollover_amount_type
             ,special_amount
             ,special_amount_type
       FROM   olpps_contract_consol_detail)
/