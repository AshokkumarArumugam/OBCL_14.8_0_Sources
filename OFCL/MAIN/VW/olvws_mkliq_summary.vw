create or replace view olvw_mkliq_summary as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olvw_mkliq_summary.vw
**
** Module	: LD
**
**This source is part of the Oracle Flexcube Corporate Lending  Software Product.   Copyright © 2016 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
SFR                    :29262722 
Changed by             :Srinivasulu Ch
Change Description     :Added condition to not include other than active and liquidated contracts
Search String          :Bug#29262722 

SFR                    :31611347 
Changed by             :Abhik Das
Change Description     :Added condition to not include other than liquidated contracts and OL module
Search String          :Bug#31611347 

SFR                    :31611347 
Changed by             :Vineeth T M
Change Description     :Corrections to use this view for LBSMKLIQ screen also.
Search String          :OBCL_14.4_SUPP#31611347 changes

	Changed By         : Narendra Dhaker
	Date               : 20-May-2021
	Change Description : Product Access restriction
	Search String      : Product Access restriction
----------------------------------------------------------------------------------------------------
*/
select b.contract_ref_no,
         b.module,  
         --OBCL_14.4_SUPP#31611347 changes start
         --b.contract_status,
         --b.auth_status,
         a.contract_status,
         a.auth_status,
         --OBCL_14.4_SUPP#31611347 changes start
         b.event_code,
         b.event_date,
         b.event_seq_no
  from  oltbs_contract a,
        oltb_contract_event_log b,
        oltbs_addl_text c   ---Bug#29262722 
        where a.contract_ref_no = b.contract_ref_no
        AND a.contract_ref_no= c.reference_no   ---Bug#29262722 
        --and a.latest_event_seq_no =b.event_seq_no --OBCL_14.4_SUPP#31611347 changes
        AND b.event_seq_no =c.evnt_seq_no  ---Bug#29262722 
		--OBCL_14.4_SUPP#31611347 changes start
        /*AND a.contract_status=b.contract_status   ---Bug#29262722
        AND b.contract_status not in ('V','Y','H')  ----Bug#29262722
		AND b.contract_status='L' ----Bug#31611347
        AND a.module_code='OL' ----Bug#31611347*/
         and b.event_seq_no =
            (select max(event_seq_no)
               from oltb_contract_event_log d
              where d.contract_ref_no = b.contract_ref_no
                AND d.event_code = 'LIQD')
				----Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = a.product_code --OBCL_14.8_CE_Length_Changes
   AND USER_ID = global.user_id)
--Product Access restriction - End
	    --OBCL_14.4_SUPP#31611347 changes end
		
/
create or replace synonym olvws_mkliq_summary for olvw_mkliq_summary
/