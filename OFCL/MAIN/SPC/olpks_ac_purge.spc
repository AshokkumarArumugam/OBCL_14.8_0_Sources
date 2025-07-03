CREATE OR REPLACE package olpks_ac_purge AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_ac_purge.SPC
**
** Module       : ACCOUNTING
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
29-Sep-2008 CITIUPG73100414 Invalid correction. As part of invalid compilation unit is taken from existing baseline and only difference was below changes
						02-JUN-2007 PLCLON4407119 Purging related changes for parallaization. New function fn_purgewrp called from olpks_parallel.

------------------------------------END CHANGE HISTORY-------------------------------------
*/

-- OBJECT : olpks_ac_purge               DATE /TIME : 09-MAY-97
-- AUTHOR K.SAIRAM

-- ISSUES FOR DISTRIBUTION
--	How to purge the entries posted to this account from other branches
--	as there is no oltbs_contract record here
--	When to purge the dummy inter entries posted in this branch

PROCEDURE pr_purge(
		pm_Branch	IN	oltms_branch_cond.branch_code%TYPE,
		pm_Appldate IN	DATE,
		pm_action	IN	VARCHAR2,
		pm_return	OUT	VARCHAR2
		);
		
--PLCLON4407119 Changes Start
FUNCTION fn_purgewrp(
		pm_Branch	IN	oltms_branch_cond.branch_code%TYPE,
		pm_seq_no	IN 	NUMBER,
		pm_appldate	IN 	DATE
		)
RETURN BOOLEAN;
--PLCLON4407119 Changes End

END olpks_ac_purge;
/
CREATE or replace SYNONYM olpkss_purgex FOR olpks_ac_purge
/