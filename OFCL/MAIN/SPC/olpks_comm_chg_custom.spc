CREATE OR REPLACE PACKAGE olpks_comm_chg_custom AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_comm_chg_custom.SPC
**
** Module		: LOANS AND DEPOSITS
**
	This source is part of the Oracle Flexcube Corporate Lending  Software Product.   
	Copyright © 2019 , Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/

/*----------------------------------CHANGE HISTORY----------------------------------
**SFR Number         :
**Changed By         :
**Change Description :
**Search String      :
------------------------------------END CHANGE HISTORY-------------------------------------
*/

	function fn_pop_iccf_calc(
	pm_ref		oltbs_contract_master.contract_ref_no%type,
	pm_comp	oltbs_contract_iccf_calc.component%type,
	pm_vd		date,
	pm_amount	oltbs_contract_balance.principal_outstanding_bal%type,
	pm_inc_dec	char,
	p_fn_call_id IN NUMBER,
    p_tb_custom_data IN OUT global.ty_tb_custom_data)
	RETURN BOOLEAN;

END olpks_comm_chg_custom;
/


CREATE or replace SYNONYM olpkss_comm_chg_custom FOR olpks_comm_chg_custom
/