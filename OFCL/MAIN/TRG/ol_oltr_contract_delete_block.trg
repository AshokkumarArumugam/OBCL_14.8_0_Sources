create or replace trigger ol_oltr_contract_delete_block
/*----------------------------------------------------------------------------------------------------
	File Name : ol_oltr_contract_delete_block.trg
**	This source is part of the Oracle Banking Corporate Lending  Software Product.   
**	Copyright © 2007 - 2018  Oracle and/or its affiliates.  All rights reserved.   
**	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form 
or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated
in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
**	Oracle Financial Services Software Limited.
**	Oracle Park, Off Western Express Highway,
**	Goregaon (East), 
**	Mumbai - 400 063, India.

----------------------------------------------------------------------------------------------------
*/
AFTER delete on OLTB_CONTRACT
for each row
begin
	IF NVL(:new.contract_ref_no , 'X' ) = 'X'		--Fcc40 June 2002 26/05/2002
	THEN
		DELETE oltbs_contract_amount_block 
		where CONTRACT_REF_NO = :OLD.CONTRACT_REF_NO;
	END IF;
exception
 WHEN others THEN
	raise_application_error(-20001,'Error with amount block update ' || sqlerrm);
end;
/