CREATE OR REPLACE FORCE VIEW olvw_instr_log
(
 branch                 
,module                 
,counterparty           
,currency               
,product_code           
,settlement_seq_no      
,mod_no                 
,process_status         
,process_id
,process_dt_stamp
,auth_status
,ssi_mnemonic--SSI Mnemonic Propogation - UK Changes
)
AS
--SSI Mnemonic Propogation - UK Changes displayed a new field in the view
/*----------------------------------------------------------------------------------------------------
 This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
--------------------------------------------------------------------------------------------------
*/
(
SELECT DISTINCT
  a.branch                 
 ,a.module                 
 ,a.counterparty           
 ,a.currency               
 ,a.product_code           
 ,a.settlement_seq_no      
 ,a.mod_no                 
 ,a.process_status
 ,a.process_id
 ,a.process_dt_stamp
 ,b.auth_stat
 ,b.ssi_mnemonic--SSI Mnemonic Propogation - UK Changes
FROM   oltms_instr_log a,
	   oltms_instr b
WHERE  a.mod_no = (SELECT MAX(mod_no)
				   FROM   oltms_instr_log c
				   WHERE  c.branch            =   a.branch               
				   AND 	  c.module            =   a.module              
				   AND 	  c.counterparty      =   a.counterparty        
				   AND 	  c.currency          =   a.currency            
				   AND 	  c.product_code      =   a.product_code        
				   AND 	  c.settlement_seq_no =   a.settlement_seq_no
				   )
AND    b.branch            =   a.branch               
AND    b.module            =   a.module              
AND    b.counterparty      =   a.counterparty        
AND    b.currency          =   a.currency            
AND    b.product_code      =   a.product_code        
AND    b.settlement_seq_no =   a.settlement_seq_no   
)	
/	

CREATE OR REPLACE SYNONYM olvws_instr_log FOR olvw_instr_log
/