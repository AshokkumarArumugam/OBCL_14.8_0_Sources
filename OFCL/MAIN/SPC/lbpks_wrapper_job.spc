CREATE OR REPLACE PACKAGE lbpks_wrapper_job AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : lbpks_wrapper_job.SPC
**
** Module       : LOANS SYNDICATION
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
CHANGE HISTORY
12-JUN-2007 PerfTuningChanges "CITILS, LC Balance   Movement" IT-BugFix - 12-JUN-2007
14-JUN-2007 PerfTuningChanges CITILS, LC Balance Movement IT-BugFix - 14-JUN-2007
			Added a new function specification fn_validate_dd_outstanding  to validate the liqd amount against the dd outstanding and include the current instruction.
			and added function specification Fn_validate_valdt to validate the value dates of the instruction.

07-NOV-2008 CITIUS-LS#SRT1451 STP Consolidation -A new Function fn_populate_job_queue is added  
10-NOV-2008 CITIUS-LS#SRT1452 STP and Code Consolidation Site - Compilation Errors
-------------------------------------------------------------------------------------------
*/



--08-JUN-2007 CITILS, LC Balance Movement
  /*FUNCTION Fn_Job_Start(P_branch IN oltbs_contract.branch%type,
				p_Error_Code IN OUT VARCHAR2)
  RETURN BOOLEAN ;


   FUNCTION Fn_Job_Stop(P_branch IN oltbs_contract.branch%type,
				p_Error_Code IN OUT VARCHAR2)
   RETURN BOOLEAN ;*/

   PROCEDURE Pr_Contract_Upload(P_branch IN oltbs_contract.branch%type,
								P_seq_no	lbtbs_job_queue.SEQ_NO%type);



   PROCEDURE PR_Process_Job(P_seq_no	IN lbtbs_job_queue.SEQ_NO%type,
							P_branch IN oltbs_contract.branch%type,
							/*P_action IN VARCHAR2,*/--12-JUN-2007 PerfTuningChanges "CITILS, LC Balance   Movement" IT-BugFix  changes
							p_Module IN VARCHAR2
							) ;

   --PROCEDURE pr_populate_job_queue;--CITIUS-LS#SRT1452 STP and Code Consolidation Site - Compilation Errors
   
   --08-JUN-2007 CITILS, LC Balance Movement
-- 07-NOV-2008 CITIUS-LS#SRT1451 A new Function fn_populate_job_queue is added  changes Starts
FUNCTION fn_populate_job_queue(p_contract_ref_no VARCHAR2)
RETURN BOOLEAN;	
-- 07-NOV-2008 CITIUS-LS#SRT1451 A new Function fn_populate_job_queue is added  changes Ends

   --PerfTuningChanges CITILS, LC Balance Movement IT-BugFix - 14-JUN-2007 START
FUNCTION fn_validate_dd_outstanding(p_contract_ref_no IN VARCHAR2,
									p_serial_no IN NUMBER,
									p_error_code OUT VARCHAR2,
									p_error_param OUT VARCHAR2) 
RETURN BOOLEAN;

FUNCTION Fn_validate_valdt (p_contract_ref_no IN VARCHAR2
			   	    ,p_serial_no  IN NUMBER
				    ,p_date   OUT DATE
		                ,p_error_code OUT VARCHAR2
			   	    ,p_error_param OUT VARCHAR2)
RETURN BOOLEAN;
--PerfTuningChanges CITILS, LC Balance Movement IT-BugFix - 14-JUN-2007 ends



   FUNCTION Fn_Insert_Error_Log(Modulecode   IN VARCHAR2
                              ,Eventcode    IN VARCHAR2
                              ,P_brrefno      IN VARCHAR2
                              ,Statuscode   IN VARCHAR2
                              ,Errormessage IN VARCHAR2)
   RETURN BOOLEAN;

END lbpks_wrapper_job ;
/