CREATE OR REPLACE FORCE VIEW olvw_all_schedule_status_chang(COMPONENT,CONTRACT_REF_NO,EVENT_SEQ_NO,FROM_STATUS,SCHEDULE_DATE,TO_STATUS) AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_schedule_status_chang.VW
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(SELECT component
             ,contract_ref_no
             ,event_seq_no
             ,from_status
             ,schedule_date
             ,to_status
       FROM   oltbs_schedule_status_change)
      UNION
      (SELECT component
             ,contract_ref_no
             ,event_seq_no
             ,from_status
             ,schedule_date
             ,to_status
       FROM   olars_schedule_status_change)
      UNION
      (SELECT component
             ,contract_ref_no
             ,event_seq_no
             ,from_status
             ,schedule_date
             ,to_status
       FROM   olpts_schedule_status_change)
      UNION
      (SELECT component
             ,contract_ref_no
             ,event_seq_no
             ,from_status
             ,schedule_date
             ,to_status
       FROM   olpps_schedule_status_change)
/