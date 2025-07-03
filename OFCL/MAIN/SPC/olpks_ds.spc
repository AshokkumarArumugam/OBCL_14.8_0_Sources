create or replace package olpks_ds as
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_ds.SPC
**
** Module		: DE
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




/*CHANGE HISTORY

28-OCT-2003	FCC 4.4 DEC 2003 RETRO CITIPLC SFR PLC43040006	Missing change FCC4.0.2	CITIPLC	PLC401000155 retroed -
					Added new function to check live gls in other nodes while closing a GL.

*/



function fn_chk_live(
	pm_func_id		smtbs_menu.function_id%TYPE, -- Function id of the calling function
	pm_key			varchar2, -- Key of the table on which maintenance is being done
	pm_select		varchar2, -- Select statement for the check
	pm_update		varchar2, -- Update statement for setting status
	pm_dist_fail		IN OUT varchar2, -- List of branches to which connect failed
	pm_chk_fail		IN OUT varchar2) return integer; -- List of branches on which the check failed

-- Function to be called by maintenance to checl all nodes


function fn_chk_node(
	pm_select		varchar2, -- Select statement for the check
	pm_update 		varchar2) return integer; -- Update statement for setting status

-- Function to check at each node

procedure pr_chk_job(

	pm_job			integer, -- Job id of the job
	pm_func_id		varchar2, -- Function of calling function
	pm_key			varchar2, -- Key of the table on which maintenance is being done
	pm_node			varchar2); -- Node of job

-- Procedure to execute the job


function fn_del_jobs(
	pm_func_id		varchar2, -- Function id of calling function
	pm_key			varchar2) return integer; -- Key of table

-- Function to be called on reopen to remove pending jobs for closure and delete the records from xxtbs_maint


function fn_chk_eod(
	pm_branch	IN varchar2,
	pm_func_id		IN OUT varchar2) return integer;

-- Function to check eod status. Returns a list of function ids if any with failed status

--FCC 4.4 DEC 2003 RETRO CITIPLC SFR PLC43040006 CHANGES STARTS

function fn_chk_live_gl(
	pm_func_id		smtbs_menu.function_id%TYPE, 
	pm_key			varchar2,
 pm_customer varchar2,
	pm_update		varchar2,
	pm_dist_fail		IN OUT varchar2,
	pm_chk_fail		IN OUT varchar2
	) 
	return integer ;

--FCC 4.4 DEC 2003 RETRO CITIPLC SFR PLC43040006 CHANGES ENDS	


end olpks_ds;
/
create or replace synonym  olpkss_ds for olpks_ds
/