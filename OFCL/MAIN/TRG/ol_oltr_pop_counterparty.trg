CREATE OR REPLACE TRIGGER ol_oltr_pop_counterparty
/*----------------------------------------------------------------------------------------------------
**
** File Name    : ol_oltr_pop_counterparty.trg
**
** Module       : SETTLEMENT
**
** This source is part of the Oracle Banking Corporate Lending  Software Product.   Copyright © 2018 , Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.

----------------------------------------------------------------------------------------------------
*/

-- PHPCBC til no. 51.  To print counterparty name and address in advices 
BEFORE INSERT OR UPDATE ON OLTB_MSGHO
FOR EACH ROW
WHEN (NEW.COUNTERPARTY IS NULL)
BEGIN
	SELECT C.COUNTERPARTY 
	INTO :NEW.COUNTERPARTY
	FROM  oltbs_contract C
	WHERE C.CONTRACT_REF_NO = :NEW.CONTRACT_REF_NO;
EXCEPTION
	WHEN NO_DATA_FOUND THEN
		NULL;
END ol_oltr_pop_counterparty;
/