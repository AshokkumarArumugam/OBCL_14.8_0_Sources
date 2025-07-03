CREATE OR REPLACE TRIGGER "TRG_VDBAL_DETAIL"         
/*----------------------------------------------------------------------------------------------------
**
** File Name : ol_trg_vdbal_detail.TRG

** Module      : 
**
This source is part of the Oracle Banking Corporate Lending  Software Product. 
Copyright © 2007 - 2018  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted 
in any form or by any means, electronic, mechanical, photographic, graphic, optic recording
or otherwise, translated in any language or computer language, without the prior written permission 
of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/*---CHANGE HISTORY------------------------------------------------------------------------------------
    Created By           : 
    Created On           : 
    Purpose              :  
    Modified By          : 
    Modified On          : 
    Fix Description      : 
    Search String        : 

-------------------------------------------------------------------------------------------------------
*/ 
	AFTER INSERT OR UPDATE
	ON OLTB_CONTRACT_VDBAL_DETAIL
	FOR EACH ROW
BEGIN
	debug.pr_Debug('OL','inside trigger TRG_LDTBS_CONTRACT_VDBAL_DETAIL');
	debug.pr_Debug('OL','new.opening_balance'||:new.opening_balance);
	debug.pr_Debug('OL','new.closing_balance'||:new.closing_balance);
	debug.pr_Debug('OL','new.dr_turnover'||:new.dr_turnover);
	debug.pr_Debug('OL','new.cr_turnover'||:new.cr_turnover);
	debug.pr_Debug('OL','new.commitment_ccy_closing_bal'||:new.commitment_ccy_closing_bal);
	debug.pr_Debug('OL','new.commitment_ccy_opening_bal'||:new.commitment_ccy_opening_bal);
	debug.pr_Debug('OL','new.commitment_ccy_dr_turnover'||:new.commitment_ccy_dr_turnover);
	debug.pr_Debug('OL','new.commitment_ccy_cr_turnover'||:new.commitment_ccy_cr_turnover);
EXCEPTION
WHEN OTHERS
THEN
	debug.pr_Debug('OL','in WT re');
END;
/