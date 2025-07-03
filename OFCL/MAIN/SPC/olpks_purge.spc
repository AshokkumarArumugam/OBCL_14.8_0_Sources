CREATE OR REPLACE package olpks_purge AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_purge.SPC
**
** Module       : CORE SERVICES
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

-- This package is used as a gate way for calling the respective module
-- specific purge functions. The module specific purge functions are
-- assumed to be in a pre - defined package/function the structure of 
-- which is given below
-- module + 'PKSS_ + 'fn_purge'
-- As an input parameter the branch from which purge is initiated is 
-- passed to the function
28-MAY-2003 FCC4.3 AUG 2003 TRLCITI TIL #355 Purge retro from PLNCITI

------------------------------------END CHANGE HISTORY-------------------------------------
*/



-- is called from the client with a list modules to be purged
-- although there is no purge date (date until which information needs to be
-- purged) it is kept here as a CYA and is not used in the function
-- pm_action_code indicates whether the control came for generating the
-- report or for purging the contract. Valid valued are R and P
-- R is only report P is purge and report


FUNCTION fn_start_purge(
	pm_Branch		IN	oltbs_purge_rlog.branch_code%TYPE,
	pm_User			IN		varchar2,
	pm_Modules		IN	varchar2,
	pm_ApplDate		IN	date,
	pm_PurgeDate		IN	date,
	pm_action_code		IN	varchar2,
	pm_Errcode		IN OUT	varchar2,
	pm_Params		IN OUT	varchar2
	)RETURN BOOLEAN;

PROCEDURE pr_upd_log(
			p_log 			IN 	oltbs_purge_plog%rowtype,
			pm_action		IN	varchar2);

PROCEDURE pr_clean_log(
	pm_branch		IN	oltbs_purge_rlog.branch_code%TYPE,
	pm_module		IN	varchar2,
	pm_action		IN	varchar2
	);

Function fn_get_commit_freq
			(
			p_funcid		IN	OLTBS_COMMITFREQ.FUNCTION_ID%TYPE
			)
	RETURN NUMBER;

PROCEDURE pr_purge_common_tables(
	pContract_Ref_No	IN	oltbs_contract.contract_ref_no%Type
	);

fchan utl_file.file_type;
END olpks_purge;
/
create or replace synonym olpkss_purge for olpks_purge
/