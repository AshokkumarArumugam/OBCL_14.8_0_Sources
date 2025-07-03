CREATE OR REPLACE PACKAGE olpks_eipks AS
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_eipks.SPC
**
** Module		: CORE SERVICES
**
This source is part of the Oracle Banking Corporate Lending  Software Product.
Copyright ? 2019 , Oracle and/or its affiliates.  All rights reserved.
No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.

Oracle Financial Services Software Limited.
Oracle Park, Off Western Express Highway,
Goregaon (East),
Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
*/
/* CHANGE_HISTORY

  Changed By         : Divya J
  Date               : 24-MAY-2018
  Change Description : Remove objects belonging to other modules
  Search String      : OBCL_14_1_Cleanup

Changed By         : Arvind Baskar
  Date               : 17-JUL-2019
  Change Description : Hook changes
  Search String      : Bug#30331191  
  

*/
--Bug#30331191    changes start
  PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
--Bug#30331191    changes end
FUNCTION fn_preBOD	( pBranch 	IN VARCHAR2,
			  pBranchDate 	IN DATE,
			  pErrCode	OUT VARCHAR2,
			  pParam 	OUT VARCHAR2 )
RETURN BOOLEAN;
----------------------------------------------------------
FUNCTION FN_CHECK_PGM_STATUS ( 	branch IN VARCHAR2,
				function IN VARCHAR2,
				eoc_group OUT VARCHAR2,
				proceed OUT BOOLEAN,
				retmsgcode OUT VARCHAR2)
RETURN BOOLEAN;

FUNCTION FN_CHECK_PGM_STATUS ( 	branch IN VARCHAR2,
				function IN VARCHAR2,
				eoc_group OUT VARCHAR2,
				run_status OUT  VARCHAR2,
				proceed OUT BOOLEAN,
				retmsgcode IN OUT VARCHAR2)
RETURN BOOLEAN;
----------------------------------------------------------
FUNCTION FN_UPDATE_PGM_STATUS (	branch IN VARCHAR2,
				function IN VARCHAR2,
				retmsgcode OUT VARCHAR2)
RETURN BOOLEAN;
----------------------------------------------------------
FUNCTION FN_MARK_STATUS (	branch IN VARCHAR2,
				eoc_group IN VARCHAR2,
				app_date IN DATE,
				retmsgcode OUT VARCHAR2,
				param	   OUT VARCHAR2)
RETURN BOOLEAN;
----------------------------------------------------------
FUNCTION FN_UNMARK_EOT(	branch IN VARCHAR2,
			sms_seq_no IN NUMBER,
			app_date IN DATE,
			retmsgcode OUT VARCHAR2 )
RETURN BOOLEAN;
----------------------------------------------------------
FUNCTION FN_GENERATE_RUNSHEET (	branch IN VARCHAR2,
				eoc_group IN VARCHAR2,
				app_date IN DATE,
				retmsgcode OUT VARCHAR2)
RETURN BOOLEAN;
----------------------------------------------------------
FUNCTION FN_END_OF_DAY	( pbranch IN VARCHAR2,
			  app_date IN DATE,
			  retmsgcode IN OUT VARCHAR2,
			  retparams IN OUT VARCHAR2)
RETURN BOOLEAN;
----------------------------------------------------------
FUNCTION get_txt(p_err_code in varchar2) return varchar2;
---------------------------------------------------------

FUNCTION fn_defer_eod_process (
 p_branch VARCHAR2,
				p_branch_date				DATE,
				p_errcode		IN OUT		ertb_msgs.err_code%TYPE
				)
RETURN BOOLEAN;

PROCEDURE PR_MSPKSSEOD( pm_job integer, pbranch in varchar2);

--OBCL_14_1_Cleanup Starts
/*FUNCTION FN_PENDING_ITEMS (p_brn varchar2,p_dept varchar2) return boolean;*/
--OBCL_14_1_Cleanup Ends

FUNCTION fn_insert_products
			    (
			    p_function_id		IN		VARCHAR2,
			    p_product		IN		oltms_product.product_code%TYPE,
			    p_error_code		IN OUT	VARCHAR2,
			    p_error_parameter	IN OUT	VARCHAR2
			    )
RETURN BOOLEAN;

FUNCTION fn_get_eoc_group
	(
	pm_eoc_group	OUT		VARCHAR2,
	pm_err_code		IN OUT	VARCHAR2,
	pm_params		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;

FUNCTION fn_ins_pending_programs
				(
 pbranch VARCHAR2,
				p_errcode	IN OUT	ertb_msgs.err_code%TYPE
				)
RETURN BOOLEAN;

FUNCTION fn_truncate_temp_table
(
	pm_errcode        IN OUT      VARCHAR2
,	pm_param         IN OUT      VARCHAR2
)
RETURN BOOLEAN;
------------------------------------------------------------
FUNCTION fn_recreate_seq (pbranch IN VARCHAR2, retmsgcode OUT VARCHAR2)
RETURN BOOLEAN;
FUNCTION fn_jobs_running
(
	p_branch	IN	oltbs_ops_process_status.branch%TYPE
)
RETURN NUMBER;

END olpks_eipks;
/
create or replace synonym olpkss_eipks for olpks_eipks
/