CREATE OR REPLACE PACKAGE olpks_parallel
IS
/*---------------------------------------------------------------------------------
**
** File Name	: olpks_parallel.SPC
**
** Module		: Core Services
**
This source is part of the Oracle Banking Corporate Lending  Software Product.   
Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East), 
Mumbai - 400 063, India.

----------------------------------------------------------------------------------------
*/

/* Change History
09-03-04	FCC 4.5 LOT1 ITR1 SFR 132
07-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#<2>, <29-SEP-2008>, <CITIUPG73100414> changes, 
		a) Invalid correction.
		b) PLCLON4407119 Purging related changes.
		c) Copyright changed.
*/
	TYPE contract
	IS RECORD
		(
 branch sttm_core_branch.branch_code%TYPE,
		contract_ref_no		VARCHAR2(30),
		funcid				VARCHAR2(10),
		process_date		DATE,
		seq_no				NUMBER,
		run_seq_no			NUMBER 		
		);
	
	TYPE contracts_table
	IS TABLE OF	contract
	INDEX BY BINARY_INTEGER;

FUNCTION	fn_populate_sequences
				(
				p_no_of_jobs		IN OUT	VARCHAR2,
				p_table_seq			IN OUT	contracts_table,
				p_error_code		IN OUT	VARCHAR2,
				p_error_param		IN OUT	VARCHAR2
				)

RETURN BOOLEAN;


FUNCTION fn_submit_job
				(
				p_func_id		IN		VARCHAR2,
				p_no_of_seq		IN		INTEGER,
				p_date			IN		DATE,
				p_module_code	IN		VARCHAR2,
				p_errcode		IN	OUT	VARCHAR2,
				p_errparam		IN	OUT	VARCHAR2
				)
RETURN BOOLEAN;
	

PROCEDURE pr_process_seq
				(
 p_branch VARCHAR2,
				p_funcid		VARCHAR2,
				p_module_code		VARCHAR2,
				p_date			DATE,
				p_seq_no		INTEGER,
 p_user_id VARCHAR2 -- FCC 4.5 ITR1 SFR 402
				);
				
FUNCTION fn_batchExc
     		   (
			   pm_funid        IN 		VARCHAR2,
			   pm_ref_no       IN 		oltbs_contract.contract_ref_no%TYPE,
			   pm_processdate  IN		DATE,
			   pm_errcode	   IN 	OUT	VARCHAR2,
			   pm_errparam     IN 	OUT	VARCHAR2
			   )
			   RETURN BOOLEAN;

FUNCTION fn_wrpbatch
			(
			p_module_code	IN			VARCHAR2,
			p_funcid		IN			VARCHAR2,	
			p_tbl			IN			contracts_table,
			p_seq_no		IN			NUMBER,
			p_mode			IN			VARCHAR2,
			p_errcode		IN	OUT		VARCHAR2,
			p_errparam		IN	OUT		VARCHAR2
			)
			RETURN BOOLEAN;

FUNCTION fn_insert_pop_exception_queue
	(
	pm_branch				IN		VARCHAR2,
	pm_contract_ref_no		IN		VARCHAR2,
	pm_function_id			IN		VARCHAR2,
	pm_processing_date		IN		DATE,
	pm_err_code				IN 	OUT	VARCHAR2,
	pm_err_param			IN	OUT	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION	fn_populate_mm_queues
	(
	p_function_id		IN		VARCHAR2,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION	pr_populate_fx_queues
	(
	p_function_id		IN		VARCHAR2,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION	fn_process_exception
	(
	p_funcid			IN			VARCHAR2,
	p_error_code		IN OUT		VARCHAR2,
	p_error_parameter		IN OUT		VARCHAR2
	)
RETURN BOOLEAN;
FUNCTION fn_exception_process
			(
			p_error_code	IN	OUT	VARCHAR2,
			p_error_param	IN	OUT	VARCHAR2
			)
RETURN BOOLEAN;
	
FUNCTION	fn_populate_mis_queues
	(
	p_branch_rec		IN		oltms_branch%ROWTYPE,
	p_function_id		IN		VARCHAR2,
	p_proc_date			IN		DATE,
	p_no_of_jobs		IN		NUMBER,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

--07-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#<2>, <29-SEP-2008>, <CITIUPG73100414> changes start here
FUNCTION fn_populate_dt_queue 
	(
	p_funcid			VARCHAR2,	
	p_module			VARCHAR2,
	p_from_date			DATE,
	p_to_date			DATE,
	p_no_of_jobs		NUMBER,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter	IN OUT	VARCHAR2	
	)
RETURN BOOLEAN;

FUNCTION fn_populate_ac_queues(
	p_funcid		VARCHAR2,	
	p_no_of_jobs	NUMBER,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter	IN OUT	VARCHAR2	)
RETURN BOOLEAN ;

FUNCTION fn_contract_purgewrp(
		pm_Branch	IN	oltms_branch_cond.branch_code%TYPE,
		pm_seq_no	IN 	NUMBER,
		pm_module	IN 	VARCHAR2,
		pm_function IN  VARCHAR2
		)
RETURN BOOLEAN;
--07-JAN-2009 FLEXCUBE V.CL Release 7.4 ITR1 SFR#<2>, <29-SEP-2008>, <CITIUPG73100414> changes start here

END olpks_parallel;
/
CREATE	or replace SYNONYM	olpkss_parallel	FOR	olpks_parallel
/