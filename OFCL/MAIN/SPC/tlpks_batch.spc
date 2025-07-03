create or replace PACKAGE tlpks_batch
AS 
/*----------------------------------------------------------------------------------------------------
**
** File Name : tlpks_batch.SPC
** Module	 : SECONDARY LOAN TRADING
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
Change History

14-JUN-2008 FLEXCUBE V.CL Release 7.4 ,New Unit Developed for batch processing for SLT 
27-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#136 Fix Changes
	    Moved the function fn_jobs_running to olpks_eipks.SQL to stop marking the EOTI process while back ground jobs are running
14-Dec-2011 Flexcube V.CL Release 7.10 FS Tag14,Adjustments - S2 to Flexcube Interface change : Added functions to populate report changes during EOD.	    
27-APR-2012 Flexcube V.CL Release 7.11 FS Tag 05 Trade Date accounting entries Change:Added declaration of Fn_trdt_bal_chng.
17-JUL-2012 Flexcube V.CL Release 7.11 IUT SFR#120 change
22-OCT-2012 CITIUS#15186 CFPI Changes 
						1) DBS feed should not include balances for those GL which dont have Global and local acc UDF value maintained at chart of screen
						2) CFPI Branches should not allowed to close if Global and local acc is missing for any Gl code for which accounting posted for that day
19-Feb-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#16267 changes,LT batch tuning changes.
06-NOV-2014 Oracle Flexcube Universal Banking 3.3.0.0.0CITI_R715 FS Vol2 Tag 03 Trade reclass changes to post RCLS after cusip is available.
16-SEP-2019 -- Search String :SFR#29959798 OBCL_14.4_Ticket_Settlement_Message_Director
----------------------------------------------------------------------------------------------------
*/
FUNCTION fn_process_for_a_day
(
p_module				IN		oltbs_contract.MODULE_CODE%TYPE,
p_current_accrual_ref_no	IN OUT	oltbs_auto_function_details.CURRENT_ACCRUAL_REF_NO%TYPE,
p_parallelize_auto_function	IN		oltbs_auto_function_setup.PARALLELIZE_AUTO_FUNCTION%TYPE,
p_processing_date			IN		DATE,
p_error_code				IN OUT	VARCHAR2,
p_error_param				IN OUT	VARCHAR2
)
RETURN BOOLEAN;
--14-Dec-2011 Flexcube V.CL Release 7.10 FS Tag14,Adjustments - S2 to Flexcube Interface change start
FUNCTION Fn_populate_psr_goc	
RETURN BOOLEAN;
FUNCTION Fn_populate_rlz_unrlz_s2	
RETURN BOOLEAN;
--14-Dec-2011 Flexcube V.CL Release 7.10 FS Tag14,Adjustments - S2 to Flexcube Interface change end

--27-APR-2012 Flexcube V.CL Release 7.11 FS Tag 05 Trade Date accounting entries Change start
FUNCTION Fn_trdt_bal_chng
		(
		p_branch		IN	VARCHAR2, --17-JUL-2012 Flexcube V.CL Release 7.11 IUT SFR#120 change
		p_processing_date	IN	DATE,
		p_commit_frequency	IN 	oltbs_automatic_process_master.eod_commit_count%TYPE,--19-Feb-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#16267 changes
		p_err_code		IN OUT	VARCHAR2,
		p_err_params		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
--27-APR-2012 Flexcube V.CL Release 7.11 FS Tag 05 Trade Date accounting entries Change end

--22-OCT-2012 CITIUS#15186 Changes starts
FUNCTION fn_check_cfpi_global_local_acc
				(
				p_branch		IN	VARCHAR2, 
				p_err_code		IN OUT	VARCHAR2,
				p_err_params		IN OUT	VARCHAR2					
				)	
RETURN BOOLEAN;
--22-OCT-2012 CITIUS#15186 Changes ends
--06-NOV-2014 Oracle Flexcube Universal Banking 3.3.0.0.0CITI_R715 FS Vol2 Tag 03 Trade reclass changes start
FUNCTION Fn_reclass_trade
		(
		p_branch		IN	VARCHAR2,
		p_commit_frequency	IN 	oltbs_automatic_process_master.eod_commit_count%TYPE,
		p_err_code		IN OUT	VARCHAR2,
		p_err_params		IN OUT	VARCHAR2
		)
RETURN BOOLEAN;
--06-NOV-2014 Oracle Flexcube Universal Banking 3.3.0.0.0CITI_R715 FS Vol2 Tag 03 Trade reclass changes end

-- Changes for SFR#29959798 Start here
FUNCTION Fn_markit_archival
	(
	p_branch			IN oltbs_contract.branch%type,
	p_error_code		IN OUT	VARCHAR2,
	p_error_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION Fn_lt_archival
	(
	p_branch		IN oltbs_contract.branch%type,
        p_processing_date       IN DATE,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter	IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
-- Changes for SFR#29959798 Ends here

END tlpks_batch;
/
CREATE OR REPLACE SYNONYM tlpkss_batch FOR tlpks_batch
/