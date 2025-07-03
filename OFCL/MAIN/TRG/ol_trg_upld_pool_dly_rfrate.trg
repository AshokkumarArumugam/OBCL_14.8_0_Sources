CREATE OR REPLACE TRIGGER ol_trg_upld_pool_dly_rfrate
/*----------------------------------------------------------------------------------------------------
**
** File Name	: ol_trg_upld_pool_dly_rfrate.trg
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

AFTER INSERT ON OLTB_UPLD_POOL_DLY_RFRATE_DET
FOR EACH ROW	
BEGIN

INSERT INTO OLTB_UPLOAD_POOL_DLY_REF_RATES
		(
		BRANCH_CODE,            
		POOL_CODE,              
		CCY,                    
		PROCESS_FLAG
		)
VALUES
		(
		:NEW.BRANCH_CODE,
		:NEW.POOL_CODE,
		:NEW.CCY,
		'U'
		);
EXCEPTION
	WHEN DUP_VAL_ON_INDEX
	THEN
		UPDATE OLTB_UPLOAD_POOL_DLY_REF_RATES SET PROCESS_FLAG = 'U'
		WHERE BRANCH_CODE = :NEW.BRANCH_CODE
		AND	POOL_CODE = :NEW.POOL_CODE
		AND	CCY	  = :NEW.CCY;

	WHEN OTHERS
	THEN
		Debug.pr_debug('AC','In WHen Others of TRIGGER ol_trg_upld_pool_dly_rfrate');
		Debug.pr_debug('AC','Oracle Error	:'||SQLERRM);
		RAISE;
END;
/