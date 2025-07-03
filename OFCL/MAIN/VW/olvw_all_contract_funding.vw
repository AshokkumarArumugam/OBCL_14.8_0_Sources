CREATE OR REPLACE FORCE VIEW olvw_all_contract_funding(CONTRACT_REF_NO,CURR_FUNDING_AMOUNT,EFFECTIVE_DATE,EVENT_SEQ_NO,NEXT_INTEREST_DATE,NEXT_PRINCIPAL_DATE,NEXT_REVISION_DATE,PREV_FUNDING_AMOUNT) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_contract_funding.VW
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(SELECT contract_ref_no
             ,curr_funding_amount
             ,effective_date
             ,event_seq_no
             ,next_interest_date
             ,next_principal_date
             ,next_revision_date
             ,prev_funding_amount
       FROM   oltbs_contract_funding)
      UNION
      (SELECT contract_ref_no
             ,curr_funding_amount
             ,effective_date
             ,event_seq_no
             ,next_interest_date
             ,next_principal_date
             ,next_revision_date
             ,prev_funding_amount
       FROM   olars_contract_funding)
      UNION
      (SELECT contract_ref_no
             ,curr_funding_amount
             ,effective_date
             ,event_seq_no
             ,next_interest_date
             ,next_principal_date
             ,next_revision_date
             ,prev_funding_amount
       FROM   olpts_contract_funding)
      UNION
      (SELECT contract_ref_no
             ,curr_funding_amount
             ,effective_date
             ,event_seq_no
             ,next_interest_date
             ,next_principal_date
             ,next_revision_date
             ,prev_funding_amount
       FROM   olpps_contract_funding)
/