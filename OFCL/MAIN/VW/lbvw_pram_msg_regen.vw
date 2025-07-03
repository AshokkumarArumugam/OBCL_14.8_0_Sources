CREATE OR REPLACE FORCE VIEW lbvw_pram_msg_regen AS
/* -----------------------------------------------------------------------------------------------
 **
 **    File Name    : lbvw_pram_msg_regen.vw
 **    Module       : LS
 **
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 
Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
----------------------------------Change History Starts----------------------------------------
--01-FEB-2008 FCC V.CL Release 7.4 BAU Thirdparty Fax
----------------------------------Change History Ends------------------------------------------
*/
SELECT a.borrower_ref_no , 
       c.product_type contract_type, 
       a.participant_ref_no , 
       a.participant ,  
       a.pram_source_ref_no,
       b.customer_name1 || b.customer_name2 participant_name, -- 18-JUL-2012 CITIUS#14408 Fax regeneration changes added comma
       a.generate, --18-JUL-2012 CITIUS#14408 Fax regeneration changes
       a.status  -- 18-JUL-2012 CITIUS#14408 Fax regeneration changes
FROM lbtb_pram_msg_regen a , oltm_customer b , OLTB_CONTRACT c
WHERE a.participant = b.customer_no
AND a.borrower_ref_no = c.contract_ref_no
AND a.part_esn  = (SELECT max(part_esn) FROM lbtb_pram_msg_regen
		 WHERE borrower_ref_no =  a.borrower_ref_no 
		 AND participant_ref_no = a.participant_ref_no)
/