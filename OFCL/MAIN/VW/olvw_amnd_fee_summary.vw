CREATE OR REPLACE FORCE VIEW OLVW_AMND_FEE_SUMMARY AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : OLVW_AMND_FEE_SUMMARY.VW
**
** Module       : OL										
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

**Changed By         : Rashmi BV
**Date               : 18-Nov-2024
**Change Description : Summary screen show multiple rows
**Search String      : Bug#37283474
-----------------------------------------------------------------------------------------------
*/
(
  SELECT  b.contract_ref_no,    
    b.auth_status,
    b.CONTRACT_STATUS,
    c.branch,
    c.module_code 
  FROM        
        OLTB_CONTRACT_EVENT_LOG b,
        oltbs_contract c
        WHERE  b.contract_ref_no=c.contract_ref_no
        AND c.module_code='OL'
		AND b.event_code = 'FAMD'
        AND c.branch=global.current_branch
		--Bug#37283474 starts
		AND b.event_seq_no = (SELECT d.event_seq_no
                       from OLTB_CONTRACT_EVENT_LOG d
                       WHERE d.contract_ref_no=b.contract_ref_no
                       AND d.Event_Code = b.event_code
                       ORDER BY 1 DESC
                       fetch first 1 rows only)                 
		--Bug#37283474 ends 
		--Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = c.product_code --OBCL_14.8_CE_Length_Changes
      AND USER_ID = global.user_id)
--Product Access restriction - End
)
/
CREATE OR REPLACE SYNONYM OLVWS_AMND_FEE_SUMMARY FOR OLVW_AMND_FEE_SUMMARY
/