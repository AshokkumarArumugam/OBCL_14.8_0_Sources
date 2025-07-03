CREATE OR REPLACE VIEW LBVW_BORR_UTILIZATION_SUMMARY AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : LBVW_BORR_UTILIZATION_SUMMARY.VW
**
** Module       : LOANS and SYNDICATION											
**
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2020  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.

**Changed By         : Sowmya Bitra
**Date               : 09-Oct-2020
**Change Description : Added view required for summary screen for LBDFBRLM
-----------------------------------------------------------------------------------------------
*/
(
  SELECT  
       a.contract_ref_no ,
       a.product_code ,
       a.branch 
  FROM        
        OLTBS_CONTRACT a,
        LBTBS_TRANCHE_BORR_LMT_TXNDET b
  WHERE  a.contract_ref_no=b.syndication_ref_no  
)
/
create or replace synonym LBVWS_BORR_UTILIZATION_SUMMARY for LBVW_BORR_UTILIZATION_SUMMARY
/