CREATE OR REPLACE package olpks_new_purge_1 AS



/*----------------------------------------------------------------------------------------------------

**----------------------------------------------------------------------------------------------------
** File Name    : olpks_new_purge_1.SPC
**
** Module       : LD
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

/*

CHANGE HISTORY

24-02-2004 FCC 4.5 APRIL 2004 CREATION OF PACKAGE



CHANGES HISTORY

*/
---------------------------------------------------------------------------------------------------
FUNCTION fn_insert_archival
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%type,
	p_errorcode		IN OUT	varchar2,
	p_params		IN OUT	varchar2
	)
RETURN BOOLEAN;
----------------------------------------------------------------------------------------------------
FUNCTION fn_delete_archival
		(
		p_contract_ref_no	IN	oltbs_contract.contract_ref_no%type,
		p_errorcode		IN OUT	varchar2,
		p_params		IN OUT	varchar2
		)
RETURN BOOLEAN;
----------------------------------------------------------------------------------------------------
FUNCTION fn_insert_temp
	(
	p_contract_ref_no	IN	oltbs_contract.contract_ref_no%type,
	p_errorcode		IN OUT	varchar2,
	p_params		IN OUT	varchar2
	)
RETURN BOOLEAN;
----------------------------------------------------------------------------------------------------
FUNCTION fn_delete_temp
		(
		p_contract_ref_no	IN	oltbs_contract.contract_ref_no%type,
		p_branch		IN	oltms_branch.branch_code%type,
		p_errorcode		IN OUT	varchar2,
		p_params		IN OUT	varchar2
		)
RETURN BOOLEAN;
----------------------------------------------------------------------------------------------------
END olpks_new_purge_1;
/
create or replace synonym olpkss_new_purge_1 for olpks_new_purge_1
/