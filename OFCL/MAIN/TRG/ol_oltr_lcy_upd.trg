CREATE OR REPLACE TRIGGER ol_oltr_lcy_upd
/*----------------------------------------------------------------------------------------------------
**
** File Name    : ol_oltr_lcy_upd.trg
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2018 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
BEFORE UPDATE OR INSERT 
ON OLTB_DLY_MSG_IN
FOR EACH ROW
DECLARE
l_rate NUMBER;
l_flag NUMBER;
L_ERRCODE VARCHAR2(100);
l_lcy  OLTB_DLY_MSG_IN.LCY_AMOUNT%TYPE;
BEGIN
IF NVL(:NEW.AMOUNT,0) <> 0 AND :NEW.ccy <> global.LCY THEN  
    IF NOT cypkss.FN_GETRATE(global.CURRENT_BRANCH
	 				  ,:NEW.ccy
					  ,global.LCY
					  ,l_rate
					  ,l_flag
					  ,L_ERRCODE
					  )
	THEN
		DEBUG.PR_DEBUG('OL','ERROR IN getting rate IN TRIGGER ol_oltr_lcy_upd ERR->'||L_ERRCODE);		  
		l_lcy := NULL;		  
	ELSE
		IF NOT cypkss.FN_AMT1_TO_AMT2(
		   	   						  :NEW.ccy
									  ,global.LCY
									  ,:NEW.AMOUNT
									  ,l_rate
									  ,'Y'
									  ,l_lcy
									  ,L_ERRCODE    				  	  	
		   	   						  )
		THEN
			DEBUG.PR_DEBUG('OL','LCY amount ERROR AFTER calling FN_AMT1_TO_AMT2 IN TRIGGER ol_oltr_lcy_upd ERR->' ||L_ERRCODE);		  
			l_lcy := NULL;
		ELSE
			DEBUG.PR_DEBUG('OL',' LCY recieved AS '||l_lcy);
		END IF;
	END IF; 
ELSE
	l_lcy :=  NVL(:NEW.AMOUNT,0);
END IF;
	:NEW.LCY_AMOUNT  := l_lcy;
EXCEPTION
WHEN OTHERS THEN 
	 DEBUG.PR_DEBUG('OL',' In when others trigger ol_oltr_lcy_upd ERR ->'||SQLERRM);
	 l_lcy := NULL;
END;
/