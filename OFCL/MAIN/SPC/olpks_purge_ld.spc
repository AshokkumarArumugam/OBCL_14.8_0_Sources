CREATE OR REPLACE package olpks_purge_ld IS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_purge_ld.SQL
**
** Module		: LOANS AND DEPOSITS
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/

/*------------------------------------------CHANGE HISTORY----------------------------------

28-MAY-2003 FCC4.3 AUG 2003 TRLCITI TIL #355 Purge retro from PLNCITI

------------------------------------END CHANGE HISTORY-------------------------------------
*/



Procedure PR_PURGE 	(p_sobr	    	IN  oltbs_contract.BRANCH%TYPE,
			 p_br_date  	IN  oltbs_contract.BOOK_DATE%TYPE,
			 p_action_code	IN  VARCHAR2,
			 p_module	IN  oltbs_contract.MODULE_CODE%TYPE Default Null );

/*Function fn_get_commit_freq(
	p_funcid	IN	OLTBS_COMMITFREQ.FUNCTION_ID%TYPE)
	RETURN NUMBER;*/

Function fn_delete_contract (
		p_prod_type			IN	oltbs_contract.product_type%Type,
		p_cparty				IN	oltbs_contract.counterparty%Type,
      Pcontract_ref_no 	IN oltbs_contract_master.contract_ref_no%TYPE)
        Return Boolean;

end olpks_purge_ld;
/