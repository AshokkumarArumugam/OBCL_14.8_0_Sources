Create Or Replace Package olpks_status2
As

/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_status2.SPC
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
DATE		VERSION NO	CODE		DESCRIPTION

18-SEP-2002	FCC 4.1 OCT 2002		Changes done for Loans Status Accounting
08-OCT-2002 FCC 4.1 OCT 2002		STAT1 SFR 87 Enhanced to include Fn_get_any_sch_days
16-JUL-2003 BOUAT TIL #	219  added fn_get_curr_stat and fn_get_roll_today
19-MAR-2010 FLEXCUBE V.CL Release 7.6 CITIPBG CASA Changes, added Fn_get_last_contact_days and changed the copyright clause

**SFR Number         : 30639254   
**Changed By         : Sirajudheen S
**Change Description : Hooks provided for fn_get_any_sch_days
**Search String      : Bug#30639254  
------------------------------------END CHANGE HISTORY-------------------------------------
*/
--Bug#30639254   changes start
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
  --Bug#30639254   changes end

	Function Fn_get_transfer_days 
		(
			p_contract_ref_no 	In		Varchar2,
			p_component			In		Varchar2,
			p_processing_date		In		Date,
			p_schedule_date		In		Date, 
			p_err_code			In Out	Varchar2,
			p_err_param			In Out	Varchar2
		)
	Return Number;

	Function Fn_get_maturity_days 
		(
			p_contract_ref_no 	In		Varchar2,
			p_component			In		Varchar2,
			p_processing_date		In		Date,
			p_schedule_date		In		Date,
			p_err_code			In Out	Varchar2,
			p_err_param			In Out	Varchar2
		)
	Return Number;

	Function Fn_get_tenor_days 
		(
			p_contract_ref_no 	In		Varchar2,
			p_err_code			In Out	Varchar2,
			p_err_param			In Out	Varchar2
		)
	Return Number;

	--FCC 4.1 OCT 2002 STAT1 SFR 87 starts
	Function Fn_get_any_sch_days 
		(
			p_contract_ref_no 	In		Varchar2,
			p_component			In		Varchar2,
			p_processing_date		In		Date,
			p_schedule_date		In		Date,
			p_err_code			In Out	Varchar2,
			p_err_param			In Out	Varchar2
		)
	Return Number;
	--FCC 4.1 OCT 2002 STAT1 SFR 87 ends

	--BOUAT TIL#219 changes starts... 
	function fn_get_curr_stat
		(
			p_contract_ref_no 	In		Varchar2,
			p_err_code			In Out	Varchar2,
			p_err_param			In Out	Varchar2
		)
	Return varchar2;
	function fn_get_roll_today
		(
			p_contract_ref_no 	In		Varchar2,
			p_err_code			In Out	Varchar2,
			p_err_param			In Out	Varchar2
		)
	Return boolean;
	--BOUAT TIL#219 changes ends...
	--19-MAR-2010 FLEXCUBE V.CL Release 7.6 CITIPBG CASA Changes starts here
	function Fn_get_last_contact_days
		(
			p_contract_ref_no 	In		Varchar2,
			p_err_code			In Out	Varchar2,
			p_err_param			In Out	Varchar2
		)
	Return Number;
	--19-MAR-2010 FLEXCUBE V.CL Release 7.6 CITIPBG CASA Changes ends here
End olpks_status2;
/
Create or replace Synonym olpkss_status2 For olpks_status2
/