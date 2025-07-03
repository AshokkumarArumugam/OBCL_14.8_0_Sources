create or replace package olpks_comm_chg as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_comm_chg.SPC
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


function fn_pop_iccf_calc(
	pm_ref		oltbs_contract_master.contract_ref_no%type,
	pm_comp	oltbs_contract_iccf_calc.component%type,
	pm_vd		date,
	pm_amount	oltbs_contract_balance.principal_outstanding_bal%type,
	pm_inc_dec	char) return boolean;

end olpks_comm_chg;
/
create or replace synonym olpkss_comm_chg for olpks_comm_chg
/