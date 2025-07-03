CREATE OR REPLACE PACKAGE olpks_de_upload AS
/*----------------------------------------------------------------------------------------------------
**
** File Name    : olpks_de_upload.SPC
**
** Module       : DATA ENTRY
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

/* CHANGE_HISTORY
-- olpkss_de_upload
-- AUTHOR INDIRA BALAN
-- Modified By Supra For Handling Multiple Batches at one shot
-- Added p_batchno as IN parameter to fn_update_exception and fn_entry_details
11-FEB-2001		FCC3.9 DEV	I-FACE2.0 RETRO CHANGES
27-AUG-2002	FCC 4.1 OCT 2002 Changes from Mainstream, Change in fn_free_batch, now returns varchar2.

20-MAR-2003 FCC4.2 APRIL 2003 Retro from Mainstream Auto Generation of Batch Nos. 
		Added overloaded function Fn_free_batch.


*/


FUNCTION fn_batch_upload(
	p_branch        IN        oltms_branch.BRANCH_CODE%TYPE,
	p_appldate      IN        oltbs_jrnl_log_de.INITIATION_DATE%TYPE,
	p_curr_userid   IN 	  oltbs_jrnl_log_de.MAKER_ID%TYPE,
	p_batchno	IN	  oltbs_batch_master.BATCH_NO%TYPE,
	p_source_code	IN	  oltbs_upload_master_de.SOURCE_CODE%TYPE,
	p_ovd		IN	  char,
	p_lcy		IN	  oltbs_jrnl_log_de.CCY_CD%TYPE,
	p_lang		IN	  varchar2,
	p_total_ent	IN OUT	  number,
	p_errcode 	IN OUT	  varchar2,
	p_errdata 	IN OUT	  varchar2,
	p_ent_uploaded	IN OUT	  number,
	p_ent_rejected	IN OUT	  number)RETURN BOOLEAN;

--iface changes
FUNCTION fn_batch_upload
	(
	p_branch        		IN        	oltms_branch.BRANCH_CODE%TYPE,
	p_appldate      		IN        	oltbs_jrnl_log_de.INITIATION_DATE%TYPE,
	p_curr_userid   		IN 	  	oltbs_jrnl_log_de.MAKER_ID%TYPE,
	p_batchno			IN	  	oltbs_batch_master.BATCH_NO%TYPE,
	p_source_code		IN	  	oltbs_upload_master_de.SOURCE_CODE%TYPE,
	p_ovd				IN	  	VARCHAR2,
	p_lcy				IN	  	oltbs_jrnl_log_de.CCY_CD%TYPE,
	p_lang			IN	  	VARCHAR2,
	p_mis_required		IN		VARCHAR2,
	p_auto_auth			IN		VARCHAR2,
	p_udf_upload		IN		VARCHAR2,
	p_gl_offset_entry		IN		VARCHAR2,
	p_txn_code			IN		oltbs_upload_master_de.txn_code%TYPE,
	p_offset_gl			IN		oltbs_upload_detail_de.account%TYPE,
	p_total_ent			IN OUT	NUMBER,
	p_ent_uploaded		IN OUT	NUMBER,
	p_ent_rejected		IN OUT	NUMBER,
	p_error_code		IN OUT	VARCHAR2,
	p_error_parameter		IN OUT	VARCHAR2
	)
RETURN BOOLEAN;
--end iface
FUNCTION fn_update_exception(
	p_branch	IN	oltms_branch.BRANCH_CODE%TYPE,
	p_source_code	IN	oltbs_upload_detail_de.SOURCE_CODE%TYPE,
	p_batchno		IN	oltbs_upload_detail_de.BATCH_NO%TYPE,
	p_curr_no	IN	oltbs_upload_detail_de.CURR_NO%TYPE,
	p_stat		IN	oltbs_upload_detail_de.UPLOAD_STAT%TYPE,
	p_errcode	IN	varchar2,
	p_param		IN	varchar2)RETURN BOOLEAN;

FUNCTION fn_ent_update(
	p_det_rec	IN	oltbs_upload_detail_de%ROWTYPE,
	p_batch_no	IN	oltbs_batch_master.BATCH_NO%TYPE,
	p_ref_no	IN	oltbs_jrnl_log_de.REFERENCE_NO%TYPE,
	p_appldt	IN	oltbs_jrnl_log_de.VALUE_DATE%TYPE,
	p_lcy		IN	oltbs_jrnl_log_de.CCY_CD%TYPE,
	p_ovd		IN	CHAR,
	p_userid	IN 	oltbs_jrnl_log_de.MAKER_ID%TYPE,
	p_errcode	IN OUT	varchar2,
	p_params	IN OUT	varchar2)RETURN BOOLEAN;

FUNCTION fn_entry_details(
	p_branch	IN	oltms_branch.BRANCH_CODE%TYPE,
	p_source_code	IN	oltbs_upload_master_de.SOURCE_CODE%TYPE,
	p_batch_no		IN	oltbs_upload_master_de.BATCH_NO%TYPE,
	p_tot_ent	IN OUT	oltbs_upload_master_de.TOTAL_ENTRIES%TYPE,
	p_upload_ent	IN OUT	oltbs_upload_master_de.UPLOADED_ENTRIES%TYPE,
	p_errcode	IN OUT	VARCHAR2)
RETURN BOOLEAN;

--FCC 4.1 OCT 2002 changes from Mainstream batch_no type is changed --starts
function fn_check_batch_bal (	p_brn in varchar2 , p_batch_no in oltbs_batch_master.BATCH_NO%TYPE, 
					    	p_err	out varchar2 , p_prm out varchar2 ) return boolean;

function fn_check_batch_bal_txn (	p_brn in varchar2 ,p_batch_no in oltbs_batch_master.BATCH_NO%TYPE, 
					    	p_err	out varchar2 , p_prm out varchar2 ) return boolean;
--FCC 4.1 OCT 2002 changes from Mainstream batch_no type is changed --ends

function fn_free_batch (p_brn in varchar2 ) return varchar2;
-- FCC4.2 APRIL 2003 Retro from Mainstream Auto Generation of Batch Nos..Starts
function fn_free_batch(p_brn in varchar2,param in varchar2) return varchar2;
-- FCC4.2 APRIL 2003 Retro from Mainstream Auto Generation of Batch Nos..Ends


--- USDFBME FUNCTION ADDED TO ACCEPT MIS DETAILS
--- RETROED ON 18/NOV/1998
/*19-SEP-2001	fcc 3.8(CITIPLC FCC370 SFR No. 219) Added a new in parameter to fn_mis_details. Ac or Gl so that we can save on the 
						  -- select from oltb_account in this function.*/

FUNCTION fn_mis_details
		(
		pRefNo	IN	oltbs_jrnl_log_de.reference_no%type,
		pUpldRec	IN	oltbs_upload_detail_de%Rowtype,
            pAcorGl	IN	oltbs_account.ac_or_gl%type, --fcc 3.8 retro sfr 219  in parameter added
		pErrorCode	OUT	Varchar2,
		pParams	OUT	Varchar2
		)
RETURN BOOLEAN;

-- USDFBME END OF ADDITION

-- ASPAC FUNCTION ADDED TO DISPLAY THE REJECTED ITEMS DURING DE UPLOAD

FUNCTION Fn_get_reason
         (
         p_err_code ertb_msgs.err_code%type,
         p_parameter oltbs_upload_exceptions.parameters%type
         )
RETURN varchar2;

-- ASPAC END OF ADDITION

fchan utl_file.file_type;
--iface changes
FUNCTION	fn_acstinfo_upload
			(p_module 		 in 	oltbs_contract_info.module%type,
			 p_contract_ref_no in oltbs_daily_log_ac.TRN_REF_NO%type,
			 p_event_seq_no 	 in 	oltbs_contract_info.event_seq_no%type,
			 p_branch_code 	 in 	oltbs_acstatement_upload.branch_code%type,
			 p_batch_no 	 in 	oltbs_acstatement_upload.batch_no%type,       
			 p_curr_no 	 	 in 	oltbs_acstatement_upload.curr_no%type,      
			 p_err_code 	 in 	out ertbs_msgs.err_code%type
			)
RETURN BOOLEAN;
--end iface changes
--
-- FCC 42 ops changes Starts
--
FUNCTION fn_batch_upload
		(
		p_department_code   	IN		VARCHAR2,
		p_source_code 	  	IN		VARCHAR2,
		p_batch_no		  	IN		oltbs_batch_master.batch_no%TYPE,
		p_curr_userid		IN		oltbs_dept_upload_master.user_id%TYPE,
		p_ovd				IN		oltbs_dept_upload_master.process_override%TYPE,
		p_total_ent             IN OUT	oltbs_dept_upload_master.total_entries%TYPE,
		p_ent_uploaded		IN OUT	NUMBER,
		p_ent_rejected		IN OUT	NUMBER,
		p_error_code 		IN OUT	VARCHAR2,
		p_error_param		IN OUT	VARCHAR2
		)
		RETURN BOOLEAN;

--
-- FCC 42 ops changes Ends
--

END olpks_de_upload;
/
CREATE or replace SYNONYM olpkss_de_upload for olpks_de_upload
/