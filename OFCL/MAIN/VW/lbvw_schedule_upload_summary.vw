CREATE OR REPLACE FORCE VIEW lbvw_schedule_upload_summary as
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lbvw_schedule_upload_summary.vw
** Module       : LB
**
** This source is part of the Oracle Banking Software Product.
  ** Copyright (R) 2008,2019 , Oracle and/or its affiliates.  All rights reserved
  **
  **
  ** No part of this work may be reproduced, stored in a retrieval system, adopted
  ** or transmitted in any form or by any means, electronic, mechanical,
  ** photographic, graphic, optic recording or otherwise, translated in any
  ** language or computer language, without the prior written permission of
  ** Oracle and/or its affiliates.
  **
  ** Oracle Financial Services Software Limited.
  ** Oracle Park, Off Western Express Highway,
  ** Goregaon (East),
  ** Mumbai - 400 063, India
  ** India
  -------------------------------------------------------------------------------------------------------
  CHANGE HISTORY
  
  SFR Number         : 29959798
  Changed By         :
  Change Description :
  
  	Changed By         : Narendra Dhaker
	Date               : 20-May-2021
	Change Description : Product Access restriction
	Search String      : Product Access restriction
  -------------------------------------------------------------------------------------------------------
  */
SELECT "REFERENCE_NO","FILE_NAME","MAKER_ID","MAKER_DT_STAMP","CHECKER_ID","CHECKER_DT_STAMP","AUTH_STAT","RECORD_STAT","ONCE_AUTH","MOD_NO" FROM LBTB_SCHEDULE_UPLOAD_MASTER
----Product Access restriction - Start
where exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = (SELECT sypks_utils.get_product(REFERENCE_NO) FROM DUAL)
   AND USER_ID = global.user_id)
--Product Access restriction - End
/
CREATE OR REPLACE SYNONYM LBVWS_SCHEDULE_UPLOAD_SUMMARY FOR LBVW_SCHEDULE_UPLOAD_SUMMARY
/