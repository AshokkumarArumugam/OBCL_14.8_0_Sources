CREATE OR REPLACE VIEW olvw_all_amount_due AS
/*
----------------------------------------------------------------------------------------------------
**
** File Name    : olvw_all_amount_due.vw
** Module       : LD
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
----------------------------------------------------------------------------------------------------
*/
(SELECT account_due
             ,adjusted_amount
             ,amount_due
             ,amount_settled
             ,basis_amount_tag
             ,billing_event_seq_no
             ,branch_account_due
             ,component
             ,component_type
             ,contract_ref_no
             ,counterparty
             ,currency_amt_due
             ,current_memo_accrual
             ,current_net_accrual
             ,disc_accr_applicable
             ,due_date
             ,inflow_outflow
             ,msg_event_seq_no
             ,notc_event_seq_no
             ,notc_gen
             ,pay_msg_date
             ,previous_accrual_ref_no
             ,previous_accrual_to_date
             ,recv_msg_date
             ,refinance_reqd
             ,schedule_linkage
             ,sch_picked_for_liq
             ,sgen_ac_branch
             ,sgen_ac_ccy
             ,sgen_ac_no
             ,sgen_amount
             ,sgen_xrate
             ,status
             ,till_date_accrual
       FROM   oltbs_amount_due_cs)
      UNION
      (SELECT account_due
             ,adjusted_amount
             ,amount_due
             ,amount_settled
             ,basis_amount_tag
             ,billing_event_seq_no
             ,branch_account_due
             ,component
             ,component_type
             ,contract_ref_no
             ,counterparty
             ,currency_amt_due
             ,current_memo_accrual
             ,current_net_accrual
             ,disc_accr_applicable
             ,due_date
             ,inflow_outflow
             ,msg_event_seq_no
             ,notc_event_seq_no
             ,notc_gen
             ,pay_msg_date
             ,previous_accrual_ref_no
             ,previous_accrual_to_date
             ,recv_msg_date
             ,refinance_reqd
             ,schedule_linkage
             ,sch_picked_for_liq
             ,sgen_ac_branch
             ,sgen_ac_ccy
             ,sgen_ac_no
             ,sgen_amount
             ,sgen_xrate
             ,status
             ,till_date_accrual
       FROM   olars_amount_due)
/
create or replace synonym olvws_all_amount_due for olvw_all_amount_due
/