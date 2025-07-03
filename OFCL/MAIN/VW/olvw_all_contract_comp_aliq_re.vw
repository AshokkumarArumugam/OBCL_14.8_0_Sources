CREATE OR REPLACE FORCE VIEW olvw_all_contract_comp_aliq_re(COMPONENT,COMP_AUTO_LIQ,CONTRACT_REF_NO,VERSION_NO) AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_contract_comp_aliq_re.VW
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
             ,comp_auto_liq
             ,contract_ref_no
             ,version_no
       FROM   oltbs_contract_comp_aliq_redfn)
      UNION
      (SELECT component
             ,comp_auto_liq
             ,contract_ref_no
             ,version_no
       FROM   olars_contract_comp_aliq_redfn)
      UNION
      (SELECT component
             ,comp_auto_liq
             ,contract_ref_no
             ,version_no
       FROM   olpts_contract_comp_aliq_redfn)
      UNION
      (SELECT component
             ,comp_auto_liq
             ,contract_ref_no
             ,version_no
       FROM   olpps_contract_comp_aliq_redfn)
/