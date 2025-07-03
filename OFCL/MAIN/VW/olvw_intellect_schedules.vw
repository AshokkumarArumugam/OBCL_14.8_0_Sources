CREATE OR REPLACE FORCE VIEW  olvw_intellect_schedules                      
as
/*----------------------------------------------------------------------------------------
  **
  ** File Name    :olvw_intellect_schedules.VW
  **
  ** Module       :LOANS AND DEPOSITS
  **
  ** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------
  */
/*CHANGE HISTORY
  08-JUL-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO EURCITIPLC#17182 Bullet schedules should not to be sent
  08-JUL-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#17194 Changes to Bullet schedule and outflow record
  25-JUL-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO EURCITIPLC#17547 Changes, excluded the liquidated schedules
*/
SELECT a.contract_ref_no
       ,lbpkss_services.fn_get_comp_type(a.contract_ref_no,A.component) "COMPONENT_TYPE"
       ,a.due_date
       ,DECODE(lbpkss_services.fn_get_comp_type(a.contract_ref_no,A.component),'I',null,'P',a.amount_due) "AMOUNT_DUE"
FROM oltb_amount_due a 
WHERE lbpkss_services.fn_get_comp_type(a.contract_ref_no,a.component) IN ('P','I') 
AND inflow_outflow<>'O' --08-JUL-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO CITIUS#17194 Changes
AND EXISTS(SELECT 1 FROM OLTB_CONTRACT_SCHEDULES b , oltbs_contract c 
		WHERE b.contract_ref_no 	= a.contract_ref_no 
                    AND b.contract_ref_no	= c.contract_ref_no 
                    AND b.version_no		= c.latest_version_no 
                    AND lbpkss_services.fn_get_comp_type(b.contract_ref_no,b.component) IN ('P','I') 
                    AND b.frequency <> 'B' 
           )
--08-JUL-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO EURCITIPLC#17182 changes Starts           
AND  a.DUE_DATE<>(SELECT b.start_date FROM OLTB_CONTRACT_SCHEDULES b , oltbs_contract c 
                    WHERE b.contract_ref_no     = a.contract_ref_no 
                    AND b.contract_ref_no    = c.contract_ref_no 
                    AND b.version_no        = c.latest_version_no 
                    --AND lbpkss_services.fn_get_comp_type(b.contract_ref_no,b.component) IN ('P','I')  --08-JUL-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO EURCITIPLC#17192 ends
                    AND b.component=a.component --08-JUL-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO EURCITIPLC#17192 Changes
                    AND b.frequency = 'B'
                   )
--08-JUL-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO EURCITIPLC#17182 changes Ends                   
AND  nvl((nvl(a.amount_due,0)-(nvl(a.amount_settled,0)+nvl(pay_recv_amount,0)+nvl(adjusted_amount,0))),0) <> 0--25-JUL-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R713 RETRO EURCITIPLC#17547 Changes
ORDER BY  2 DESC , 3 ASC		   
/
               

CREATE OR REPLACE SYNONYM olvws_intellect_schedules FOR olvw_intellect_schedules
/