CREATE OR REPLACE VIEW lbvw_trnupld_summary(ext_contract_ref_no, product, counterparty, customer_name, user_id, last_saved_timestamp, branch, module, source_code) as
/*-----------------------------------------------------------------------------------------------
**
** File Name    : lbvw_trnupld_summary.VW
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

**Changed By         : Palanisamy M
**Date               : 16-Nov-2023
**Change Description : Added Customer Name in Counterparty LOV

-----------------------------------------------------------------------------------------------
*/
(
  SELECT M.EXT_CONTRACT_REF_NO,
		 M.PRODUCT,
		 M.COUNTERPARTY,
		 C.CUSTOMER_NAME1,
		 M.USER_ID,
		 M.LAST_SAVED_TIMESTAMP,
		 M.BRANCH,
		 M.MODULE,
		 M.SOURCE_CODE
	FROM OLTBS_UPLOAD_MASTER M, OLTMS_CUSTOMER C
   WHERE M.COUNTERPARTY = C.CUSTOMER_NO)
/
CREATE OR REPLACE SYNONYM lbvws_trnupld_summary FOR lbvw_trnupld_summary
/