CREATE OR REPLACE FORCE VIEW olvw_all_contract_pmnt_linkage(BORROWER_LEG_ESN,BORROWER_LEG_REF_NO,PARTICIPANT_LEG_ESN,PARTICIPANT_LEG_REF_NO) AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_all_contract_pmnt_linkage.VW
**
**This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
(SELECT borrower_leg_esn
             ,borrower_leg_ref_no
             ,participant_leg_esn
             ,participant_leg_ref_no
       FROM   oltbs_contract_pmnt_linkages)
      UNION
      (SELECT borrower_leg_esn
             ,borrower_leg_ref_no
             ,participant_leg_esn
             ,participant_leg_ref_no
       FROM   olars_contract_pmnt_linkages)
      UNION
      (SELECT borrower_leg_esn
             ,borrower_leg_ref_no
             ,participant_leg_esn
             ,participant_leg_ref_no
       FROM   olpts_contract_pmnt_linkages)
      UNION
      (SELECT borrower_leg_esn
             ,borrower_leg_ref_no
             ,participant_leg_esn
             ,participant_leg_ref_no
       FROM   olpps_contract_pmnt_linkages)
/