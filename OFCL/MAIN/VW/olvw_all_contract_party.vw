CREATE OR REPLACE FORCE VIEW olvw_all_contract_party(BORROWER_LEG_REF_NO,CONTRACT_REF_NO,CREDIT_LINE,CR_SETTLE_ACCOUNT,CR_SETTLE_AC_BRANCH,DFLT_SETTLE_CCY,DRAWDOWN_NUMBER,DR_SETL_CCY,DR_SETTLE_ACCOUNT,DR_SETTLE_AC_BRANCH,EVENT_SEQ_NO,LEAD_AGENT,OPEN_CLOSE,PARTICIPATION,PARTICIPATION_AMOUNT,PARTY_ID,PARTY_NAME,PARTY_PRODUCT_CODE,PARTY_PRODUCT_TYPE,SYNDICATION_REF_NO,USER_REF_NO,VERSION_NO) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_contract_party.VW
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(SELECT borrower_leg_ref_no
             ,contract_ref_no
             ,credit_line
             ,cr_settle_account
             ,cr_settle_ac_branch
             ,dflt_settle_ccy
             ,drawdown_number
             ,dr_setl_ccy
             ,dr_settle_account
             ,dr_settle_ac_branch
             ,event_seq_no
             ,lead_agent
             ,open_close
             ,participation
             ,participation_amount
             ,party_id
             ,party_name
             ,party_product_code
             ,party_product_type
             ,syndication_ref_no
             ,user_ref_no
             ,version_no
       FROM   oltbs_contract_party)
      UNION
      (SELECT borrower_leg_ref_no
             ,contract_ref_no
             ,credit_line
             ,cr_settle_account
             ,cr_settle_ac_branch
             ,dflt_settle_ccy
             ,drawdown_number
             ,dr_setl_ccy
             ,dr_settle_account
             ,dr_settle_ac_branch
             ,event_seq_no
             ,lead_agent
             ,open_close
             ,participation
             ,participation_amount
             ,party_id
             ,party_name
             ,party_product_code
             ,party_product_type
             ,syndication_ref_no
             ,user_ref_no
             ,version_no
       FROM   olars_contract_party)
      UNION
      (SELECT borrower_leg_ref_no
             ,contract_ref_no
             ,credit_line
             ,cr_settle_account
             ,cr_settle_ac_branch
             ,dflt_settle_ccy
             ,drawdown_number
             ,dr_setl_ccy
             ,dr_settle_account
             ,dr_settle_ac_branch
             ,event_seq_no
             ,lead_agent
             ,open_close
             ,participation
             ,participation_amount
             ,party_id
             ,party_name
             ,party_product_code
             ,party_product_type
             ,syndication_ref_no
             ,user_ref_no
             ,version_no
       FROM   olpts_contract_party)
      UNION
      (SELECT borrower_leg_ref_no
             ,contract_ref_no
             ,credit_line
             ,cr_settle_account
             ,cr_settle_ac_branch
             ,dflt_settle_ccy
             ,drawdown_number
             ,dr_setl_ccy
             ,dr_settle_account
             ,dr_settle_ac_branch
             ,event_seq_no
             ,lead_agent
             ,open_close
             ,participation
             ,participation_amount
             ,party_id
             ,party_name
             ,party_product_code
             ,party_product_type
             ,syndication_ref_no
             ,user_ref_no
             ,version_no
       FROM   olpps_contract_party)
/