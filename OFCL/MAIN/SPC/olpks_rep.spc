CREATE OR REPLACE PACKAGE olpks_rep AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_rep.SPC
**
** Module		: LOANS and DEPOSITS
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


PROCEDURE pr_refresh_event_details
				(
				p_all_or_single	IN	CHAR,
				p_module				IN	oltbs_contract.module_code%Type,
				p_ref_no				IN	oltbs_contract.contract_ref_no%Type,
				p_from_dt			IN	Date,
				p_to_dt				IN	Date
				);
PROCEDURE pr_pop_event_det
				(
				pContractRefNo	IN	oltbs_contract.contract_ref_no%type,
				pFromdate		IN	date,
				pToDate			IN	date
				);
End olpks_rep;
/
Create or replace Synonym olpkss_rep FOR olpks_rep
/