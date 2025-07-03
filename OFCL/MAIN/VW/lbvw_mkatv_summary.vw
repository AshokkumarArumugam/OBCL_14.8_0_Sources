create or replace view lbvw_mkatv_summary as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: lbvw_mkatv_summary.vw
**
** Module	: LD
**
**This source is part of the Oracle Flexcube Corporate Lending  Software Product.   Copyright © 2016 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.

	Changed By         : Narendra Dhaker
	Date               : 20-May-2021
	Change Description : Product Access restriction
	Search String      : Product Access restriction

----------------------------------------------------------------------------------------------------
*/
select b.contract_ref_no,
         b.module,
         a.contract_status,
         a.auth_status,
         b.event_code,
         b.event_date,
         b.event_seq_no
  from  oltbs_contract a,
        oltb_contract_event_log b,
        oltbs_addl_text c
      where a.contract_ref_no = b.contract_ref_no
        AND a.contract_ref_no= c.reference_no
        AND b.event_seq_no =c.evnt_seq_no
        and b.event_seq_no =
            (select max(event_seq_no)
               from oltb_contract_event_log d
              where d.contract_ref_no = b.contract_ref_no
                AND d.event_code = 'MRKA')
				----Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = a.product_code --OBCL_14.8_CE_Length_Changes
   AND USER_ID = global.user_id)
--Product Access restriction - End
/
create or replace synonym lbvws_mkatv_summary for lbvw_mkatv_summary
/