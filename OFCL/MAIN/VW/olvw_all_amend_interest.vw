CREATE OR REPLACE FORCE VIEW olvw_all_amend_interest(BORROW_LEND_IND,BRANCH_CODE,CHANGE_DURING_AMENDMENT,COMPONENT,CONTRACT_REFERENCE_NO,CUST_MARGIN,EVENT,EVENT_SEQUENCE_NO,ICCF_CHANGED,INTEREST_BASIS,MAX_RATE,MIN_RATE,PICKUP_EVENT_SEQUENCE_NO,RATE,RATE_CALC_TYPE,RATE_CODE,RATE_TYPE,RESET_TENOR,SPREAD,STATUS,WAIVER) AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_amend_interest.VW
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(SELECT borrow_lend_ind
             ,branch_code
             ,change_during_amendment
             ,component
             ,contract_reference_no
             ,cust_margin
             ,event
             ,event_sequence_no
             ,iccf_changed
             ,interest_basis
             ,max_rate
             ,min_rate
             ,pickup_event_sequence_no
             ,rate
             ,rate_calc_type
             ,rate_code
             ,rate_type
             ,reset_tenor
             ,spread
             ,status
             ,waiver
       FROM   oltbs_amend_interest)
      UNION
      (SELECT borrow_lend_ind
             ,branch_code
             ,change_during_amendment
             ,component
             ,contract_reference_no
             ,cust_margin
             ,event
             ,event_sequence_no
             ,iccf_changed
             ,interest_basis
             ,max_rate
             ,min_rate
             ,pickup_event_sequence_no
             ,rate
             ,rate_calc_type
             ,rate_code
             ,rate_type
             ,reset_tenor
             ,spread
             ,status
             ,waiver
       FROM   olars_amend_interest)
      UNION
      (SELECT borrow_lend_ind
             ,branch_code
             ,change_during_amendment
             ,component
             ,contract_reference_no
             ,cust_margin
             ,event
             ,event_sequence_no
             ,iccf_changed
             ,interest_basis
             ,max_rate
             ,min_rate
             ,pickup_event_sequence_no
             ,rate
             ,rate_calc_type
             ,rate_code
             ,rate_type
             ,reset_tenor
             ,spread
             ,status
             ,waiver
       FROM   olpts_amend_interest)
      UNION
      (SELECT borrow_lend_ind
             ,branch_code
             ,change_during_amendment
             ,component
             ,contract_reference_no
             ,cust_margin
             ,event
             ,event_sequence_no
             ,iccf_changed
             ,interest_basis
             ,max_rate
             ,min_rate
             ,pickup_event_sequence_no
             ,rate
             ,rate_calc_type
             ,rate_code
             ,rate_type
             ,reset_tenor
             ,spread
             ,status
             ,waiver
       FROM   olpps_amend_interest)
/