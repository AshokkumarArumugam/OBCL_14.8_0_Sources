CREATE OR REPLACE VIEW OLVW_RATE_FIX_SUMMARY 
AS
SELECT S.CONTRACT_REF_NO  AS CONTRACTREFNO,
/*-----------------------------------------------------------------------------------------------------
** File Name  : olvw_rate_fix_summary.vw
** Module     : Oracle Lending
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright ? 2021 ,
   Oracle and/or its affiliates.  All rights reserved.
   No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.   
   Oracle Financial Services Software Limited.
   Oracle Park, Off Western Express Highway,
   Goregaon (East),
   Mumbai - 400 063, India.
-----------------------------------------------------------------------------------------
**-------------------------------------------------------------------------------------------------------
** CHANGE HISTORY:
** Created By         : Abhinav Kumar
** Date               : 09-Feb-2021
** Change Description : Rate Fixing Summary screen -OLSRTFIX. 
** Search String      : OBCL_14.4_support_Bug#32452036 

**Changed By         : Narendra Dhaker
**Date               : 26-May-2021
**Change Description : Product Access restriction
**Search String      : Product Access restriction
**-------------------------------------------------------------------------------------------------------*/
	 S.CURRENT_RESET_DATE AS CURRENTRESETDATE,
	 S.COMPONENT          AS COMPO,
	 S.EVENT_SEQ_NO       AS ESN,
	 S.RATE               AS RATE,
	 S.SPREAD             AS SPREAD,
	 S.NEXT_RESET_DATE    AS NEXTRESETDT,
	 S.RATE_CODE          AS RATCD,
	 S.RESET_VALUE_DATE   AS RESETVALDT
FROM OLTB_RATE_FIXING_DETAILS S
WHERE S.EVENT_SEQ_NO =
	 (SELECT MAX(EVENT_SEQ_NO)
		FROM OLTB_RATE_FIXING_DETAILS O
	   WHERE O.CONTRACT_REF_NO = S.CONTRACT_REF_NO)
	   --Product Access restriction - Start
and exists (Select 1
	 From OLVW_USER_ACCESS_PRODUCTS
	 Where PRODUCT_CODE = (SELECT sypks_utils.get_product(S.CONTRACT_REF_NO) FROM DUAL)
      AND USER_ID = global.user_id)
--Product Access restriction - End
/
CREATE OR REPLACE SYNONYM OLVWS_RATE_FIX_SUMMARY FOR OLVW_RATE_FIX_SUMMARY
/