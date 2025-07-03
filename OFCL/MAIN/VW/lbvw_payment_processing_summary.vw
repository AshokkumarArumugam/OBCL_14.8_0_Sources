CREATE OR REPLACE VIEW LBVW_PAYMENT_PROCESSING_SUMMARY AS
/*-----------------------------------------------------------------------------------------------
**
** File Name    : LBVW_PAYMENT_PROCESSING_SUMMARY.VW
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
**Change Description : Added view required for summary screen for LBDMTPRC

**Changed By         : Narendra Dhaker
**Date               : 20-May-2021
**Change Description : Product Access restriction
**Search String      : Product Access restriction
-----------------------------------------------------------------------------------------------
*/
(
  SELECT  
       a.contract_ref_no ,
       a.product_code ,
       a.branch      
  FROM        
        OLTBS_CONTRACT a,
        LBTBS_BORROWER_FRONTING b
  WHERE  a.contract_ref_no=b.contract_ref_no  
  ----Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = a.product_code --OBCL_14.8_CE_Length_Changes
   AND USER_ID = global.user_id)
--Product Access restriction - End
)
/
create or replace synonym LBVWS_PAYMENT_PROCESSING_SUMMARY for LBVW_PAYMENT_PROCESSING_SUMMARY
/