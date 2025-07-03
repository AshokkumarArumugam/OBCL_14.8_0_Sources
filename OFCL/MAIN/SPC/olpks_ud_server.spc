create or replace package olpks_ud_server as
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle Banking Software Product
** Copyright © 2002 - 2010  Oracle and/or its affiliates.  All rights reserved.
** 												
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise,
** translated in any language or computer language,
** without the prior written permission of Oracle and/or its affiliates.
**
**
** Oracle Financial Services Software Limited.
** Oracle Park, Off Western Express Highway,
** Goregaon (East),
** Mumbai - 400 063, India.
------------------------------------------------------------------------------------------
*/
/*
-------------------------------------------------------------------------------------------*/
/*
change history
-- fcc 4.5 added new functions
-- fcc 4.5  added new function fn_exec_cube_entity
-- fcc 5.1lot1 changes for special customer.
-- fcubs 10.5 STR2 SFR No.1316 Changes to add functions for backup,restore and delete backup values of UDF.



  Changed By         :  Bala Nandakumer
  Changed On         :  13-Sep-2009
  Change Description :  9NT1428 - FC_UBS_V.UM_11.2.0.0.0.0.0 CL User Defined Events
  Search String      :  9NT1428 - FC_UBS_V.UM_11.2.0.0.0.0.0_CL User Defined Events

*/
type ty_event_trigger is 
table of oltms_event_trigger%rowtype
index by binary_integer;

tb_event_trigger 			ty_event_trigger;

type ty_amttag_drv is 
table of oltms_amount_tag_drv%rowtype
index by binary_integer;

tb_amttag_drv 			ty_amttag_drv;

type rec_error is record
     (rec_field_name        varchar2(100),
      rec_error_code        varchar2(100),
      rec_error_param       varchar2(1000));
      
type     ty_error is
table of rec_error
index by binary_integer;

tb_drv_err     ty_error;
tb_val_err     ty_error;

type rec_field_val is record
     (rec_field_val_text        oltms_product_userdef_fields.field_val_1%type,
      rec_field_val_number      number,
      rec_field_val_date        date);
      
type     ty_field_val is
table of rec_field_val
index by binary_integer;

tb_field_val     ty_field_val;
tb_field_val1    ty_field_val;

g_field_val      varchar2(150);

type rec_return_val is record
     (rec_return_val   boolean);


type     ty_return_val is
table of  rec_return_val
index by binary_integer;

tb_return_val    ty_return_val;

return_val        boolean;

g_cube_count      number ;

function fn_create	(	l_field_name  		varchar2,
					l_alt_field_name        varchar2,
			 		l_field_type 		varchar2,
			 		l_func_type	  	varchar2,
				 	l_drv_rule_type 		varchar2,
					l_drv_rule			varchar2,
					l_val_rule_type 		varchar2,
			 		l_val_rule			varchar2,
			 		l_default_value 		varchar2,
			 		l_err_code   out 	varchar2,
			 		l_err_param  out 	varchar2)
return boolean ;

function fn_drv_fields	(	l_func_name  			varchar2,
 	          	     		l_func_type  			varchar2,
 			     		l_rec_key    			varchar2,
 			     		l_flag 				varchar2,
 			     		l_contract_ref_no          	varchar2,
					l_version_no               	number,
					l_field_name			varchar2,
              		     	l_err_code      	out		varchar2,
 			     		l_err_param     out		varchar2)
return boolean ;

function fn_alt_field_name(	l_field_name IN varchar2,
					 alt_field_name OUT varchar2) 
return boolean;

function fn_val_fields	( 	l_func_name              	varchar2,
	          			l_func_type              	varchar2,
					rec_key                		varchar2,
					l_flag 				varchar2,
					l_contract_ref_no          	varchar2,
					l_version_no               	number,
					l_field_name               	varchar2,
              		      l_err_code      out      	varchar2,
			      	l_err_param     out      	varchar2)
return boolean ;

function fn_val_code      (	stmt_code     varchar2,
				l_rule_type     varchar2,
				l_field_type    varchar2,
				l_field_name    varchar2,
				l_func_type     varchar2,
				stmt_code_out out varchar2,
				l_err_code     out  varchar2,
				l_err_param    out  varchar2)
return boolean ;

 function fn_check_mask
		(
		p_cif		in 	varchar2,
		l_cif_mask  in    varchar2   ,
		l_err_code out varchar2,
		l_err_param out varchar2
		) 
return boolean ;
 function fn_drv(drv_rule IN OUT varchar2,field_name varchar2,
 		 l_err_code out varchar2,
		l_err_param out varchar2
		) return boolean ;
 
function fn_parse(txt varchar2,
			l_err_code out varchar2,
		    l_err_param out varchar2
		) return boolean ;

function fn_check_code(	pr_name	in 		varchar2,
				l_obj_type      in              varchar2)
return boolean;
function  fn_assign_parse(	l_alt_field_name     		varchar2,
					l_field_val			varchar2,
					err_code    out      	varchar2,
					err_param   out      	varchar2) 
return boolean ;	

function fn_get_valid_vals(	l_field_name   		varchar2,
				   	l_return_val 	out      boolean,
 					err_code_out      out   varchar2,
					err_param_out     out   varchar2,
				   	l_err_code 		out	varchar2,
					l_err_param 	out	varchar2)
return boolean ;
function fn_drop(  l_field_name  	varchar2)
return boolean ;
function fn_get_parse (		l_field_name     		varchar2,
					l_field_val	out		varchar2,
					err_code    out      	varchar2,
					err_param   out      	varchar2) 
return boolean ;
function fn_assign_evnt_trig(	l_action_code    		varchar2,
					l_event_trigger    	oltms_event_trigger%rowtype,
					event_trigger_out out   ty_event_trigger)
return boolean ;
function fn_assign_amttag_drv(	l_action_code    		varchar2,
				 		l_amttag_drv	    	oltms_amount_tag_drv%rowtype,
						amttag_drv_out out   ty_amttag_drv)
return boolean ;
--fcc4.5 changes start
function fn_assgmt_process(		pModuleCode			oltbs_contract.module_code%TYPE,
						pContractRefNo	 	oltbs_liq_summary_upload.contract_ref_no%TYPE,
						pVersionNo			oltbs_contract.latest_version_no%TYPE,
						pProductCode		oltms_product.product_code%TYPE,
						pEventCode		 	oltbs_liq_summary_upload.event_code%TYPE,
						pEventSeqNo			oltbs_contract.latest_event_seq_no%TYPE,
						l_err_code     out  	varchar2,
						l_err_param    out  	varchar2)
return boolean ;
function fn_put_udf_field_vals(	l_contract_ref_no 	oltms_contract_userdef_fields.contract_ref_no%type,
						l_err_code     out      varchar2,
						l_err_param	   out	varchar2)			
return boolean ;
--STR2 SFR No.1316 Starts
function fn_restore_udf
	(pcontractrefno IN OLTB_CONTRACT.contract_ref_no%type
	,p_err_code 	IN OUT VARCHAR2
	,p_err_param 	IN OUT VARCHAR2)
return boolean;

function fn_delete_backup_udf
	(pcontractrefno IN OLTB_CONTRACT.contract_ref_no%type
	,p_err_code 	IN OUT VARCHAR2
	,p_err_param 	IN OUT VARCHAR2)
return boolean;

function fn_backup_udf
	(pcontractrefno IN OLTB_CONTRACT.contract_ref_no%type
	,p_err_code 	IN OUT VARCHAR2
	,p_err_param 	IN OUT VARCHAR2)
return boolean;
--STR2 SFR No.1316 ENDS

FUNCTION fn_get_udf_field_vals(	pContractRefNo	IN 		oltbs_liq_summary_upload.contract_ref_no%TYPE,
						pVersionNo		IN		oltbs_contract.latest_version_no%TYPE,
						pProductCode	IN		oltms_product.product_code%TYPE,
						pEventCode		IN		oltbs_liq_summary_upload.event_code%TYPE,
						pEventSeqNo		IN		oltbs_contract.latest_event_seq_no%TYPE,
						perrcode		out		varchar2,
						perrparam		out 		varchar2)
RETURN BOOLEAN ;
FUNCTION fn_get_valuedate(	pModuleCode		IN		oltbs_contract.module_code%TYPE,
					pContractRefNo	IN 		oltbs_liq_summary_upload.contract_ref_no%TYPE,
					pVersionNo		IN		oltbs_contract.latest_version_no%TYPE,
					pProductCode	IN		oltms_product.product_code%TYPE,
					pEventCode		IN 		oltbs_liq_summary_upload.event_code%TYPE,
					pEventSeqNo		IN		oltbs_contract.latest_event_seq_no%TYPE,
					pValueDate		OUT		oltbs_liq_summary_upload.value_date%TYPE,
					pErrCode		IN OUT	varchar2,
					pErrParam		IN OUT	varchar2)
RETURN BOOLEAN ;
FUNCTION fn_get_currency(	pModuleCode		IN		oltbs_contract.module_code%TYPE,
					pContractRefNo	IN		oltbs_liq_summary_upload.contract_ref_no%TYPE,
					pVersionNo		IN		oltbs_contract.latest_version_no%TYPE,
					pProductCode	IN 		oltms_product.product_code%TYPE,
					pEventCode		IN		oltbs_liq_summary_upload.event_code%TYPE,
					pEventSeqNo		IN		oltbs_contract.latest_event_seq_no%TYPE,
					pAmountTag		IN		oltbs_liq_upload.component%TYPE,
					pCcy			OUT		oltbs_liq_upload.currency%TYPE,
					pErrCode		IN OUT	varchar2,
					pErrParam		IN OUT	varchar2)
RETURN BOOLEAN ;
FUNCTION fn_get_Amount(	pModuleCode		IN		oltbs_contract.module_code%TYPE,
				pContractRefNo	IN		oltbs_liq_summary_upload.contract_ref_no%TYPE,
				pVersionNo		IN		oltbs_contract.latest_version_no%TYPE,
				pProductCode	IN 		oltms_product.product_code%TYPE,
				pEventCode		IN		oltbs_liq_summary_upload.event_code%TYPE,
				pEventSeqNo		IN		oltbs_contract.latest_event_seq_no%TYPE,	
				pAmountTag		IN		oltbs_liq_upload.component%TYPE,	
				pAmountPaid		OUT		oltbs_liq_upload.amount_paid%TYPE,
				pErrCode		IN OUT	varchar2,
				pErrParam		IN OUT	varchar2)
RETURN BOOLEAN ;
function  fn_exec_cube_entity (	l_udtms_fields   IN      udtms_fields%rowtype,
						l_field_val      IN      varchar2,
						err_code         IN OUT  varchar2,
						err_param        IN OUT  varchar2)
return boolean ;

--fcc4.5 changes end here 
--fcc5.1lo1 changes for special customer
FUNCTION fn_field_num_to_val(  num       IN  number,
                               lrk       IN  varchar2,
                               func      IN  varchar2,
                               field_val OUT varchar2) 
return BOOLEAN;

FUNCTION fn_stmt(a   IN  varchar2,
                 b   OUT varchar2) 
return boolean; 
--fcc5.1lot1 changes for special customer ends.
--9NT1428 - FC_UBS_V.UM_11.2.0.0.0.0.0_CL User Defined Events starts
/*
FUNCTION fn_clget_valuedate(	pModuleCode		IN		oltbs_contract.module_code%TYPE,
					pAccno	IN 		oltbs_clevent_master.account_number%TYPE,
					pBranch		IN		oltbs_clevent_master.branch_code%TYPE,
					pProductCode	IN		cltms_product.product_code%TYPE,
					pEventCode		IN 		oltbs_clevent_master.event_code%TYPE,
					pEventSeqNo		IN		oltbs_clevent_master.event_seq_no%TYPE,
					pValueDate		OUT		oltbs_clevent_master.value_date%TYPE,
					pErrCode		IN OUT	varchar2,
					pErrParam		IN OUT	varchar2)
RETURN BOOLEAN ;
FUNCTION fn_clget_currency(	pModuleCode		IN		oltbs_contract.module_code%TYPE,
					pAccno	IN 		oltbs_clevent_master.account_number%TYPE,
					pBranch		IN		oltbs_clevent_master.branch_code%TYPE,
					pProductCode	IN 		cltms_product.product_code%TYPE,
					pEventCode		IN		oltbs_clevent_master.event_code%TYPE,
					pEventSeqNo		IN		oltbs_clevent_master.event_seq_no%TYPE,
					pAmountTag		IN		oltbs_clevent_detail.amount_tag%TYPE,
					pCcy			OUT		oltbs_clevent_detail.ccy%TYPE,
					pErrCode		IN OUT	varchar2,
					pErrParam		IN OUT	varchar2)
RETURN BOOLEAN ;
FUNCTION fn_clget_Amount(	pModuleCode		IN		oltbs_contract.module_code%TYPE,
        pAccno	IN 		oltbs_clevent_master.account_number%TYPE,
				pBranch		IN		oltbs_clevent_master.branch_code%TYPE,
				pProductCode	IN 		cltms_product.product_code%TYPE,
				pEventCode		IN		oltbs_clevent_master.event_code%TYPE,
				pEventSeqNo		IN		oltbs_clevent_master.event_seq_no%TYPE,
				pAmountTag		IN		oltbs_clevent_detail.amount_tag%TYPE,
				pAmountPaid		OUT		oltbs_clevent_detail.amount_paid%TYPE,
				pErrCode		IN OUT	varchar2,
				pErrParam		IN OUT	varchar2)
RETURN BOOLEAN ;  
*/
--9NT1428 - FC_UBS_V.UM_11.2.0.0.0.0.0_CL User Defined Events ends
--FCUBS_12.2_PX_Changes starts
FUNCTION fn_drv_val_rule(l_func_name      VARCHAR2,
                           l_field_name     VARCHAR2,
                           l_alt_field_name VARCHAR2, ----- FCC 4.4 ITR1
                           rec_key          VARCHAR2,
                           drv_val_text     VARCHAR2) RETURN BOOLEAN;
--FCUBS_12.2_PX_Changes ends
END olpks_ud_server;
/
create or replace synonym olpkss_ud_server for olpks_ud_server	
/