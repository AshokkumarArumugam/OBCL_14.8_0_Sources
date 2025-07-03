CREATE OR REPLACE FORCE VIEW olvw_all_contract_control(CONTRACT_REF_NO,ENTRY_BY,ENTRY_TIME,PROCESS_CODE) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_contract_control.VW
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
             ,entry_by
             ,entry_time
             ,process_code
       FROM   oltbs_contract_control)
      UNION
      (SELECT contract_ref_no
             ,entry_by
             ,entry_time
             ,process_code
       FROM   olars_contract_control)
      UNION
      (SELECT contract_ref_no
             ,entry_by
             ,entry_time
             ,process_code
       FROM   olpts_contract_control)
      UNION
      (SELECT contract_ref_no
             ,entry_by
             ,entry_time
             ,process_code
       FROM   olpps_contract_control)
/
create or replace synonym olvws_all_contract_control for olvw_all_contract_control
/