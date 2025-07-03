CREATE OR REPLACE TRIGGER ol_trg_upld_pool_dly_rfrt
/*----------------------------------------------------------------------------------------------------
**
** File Name	: ol_trg_upld_pool_dly_rfrt.trg
**
** Module      : Mis
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2018 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.  
----------------------------------------------------------------------------------------------------
*/

BEFORE INSERT ON OLTB_UPLD_POOL_DLY_RFRATE_DET
FOR EACH ROW
BEGIN
	DELETE OLTB_UPLD_POOL_DLY_RFRATE_DET
	WHERE BRANCH_CODE = :NEW.BRANCH_CODE
	AND	 POOL_CODE      = :NEW.POOL_CODE
	AND	CCY            	   = :NEW.CCY
	AND	EFF_DATE          = :NEW.EFF_DATE;
EXCEPTION
WHEN OTHERS
THEN
	NULL;
END;
/