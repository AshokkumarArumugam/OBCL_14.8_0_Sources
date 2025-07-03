create or replace package lbpks_upload_addon as
/*------------------------------------------------------------------------------
** File Name			: lbpks_upload_addon.SPC
**
** Module			:LOAN SYNDICATION
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
------------------------------------------------------------------------------
*/

/*
------------------------------CHANGE HISTORY-----------------------------------------------
09-OCT-2006 FLEXCUBE V.CL Release 7.1 ITR1 SFR#39, Package Created by Aji
	    This package has been created as lbpks_upload package had grown over 15 k lines and it was
	    getting difficult to manage the entire code under a single package so all the internally called
	    units from this package have been taken out and this separate packge lbpks_upload_addon has been
	    created .
12-OCT-2006 FLEXCUBE V.CL Release 7.1 ITR2 SFR#74, Mithilesh
19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO Start Here
11-SEP-2007 FCC 7.3 RETRO of CITILS46110282 
17-Jan-2006  CITILS46110282 Changes for facility upload amount validations
				Commented CITILS46110255 and changes done in fn_update_balance for proper updation of lbtbs_contract_balance and do same check.
19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO End Here


	Created BY         : Jayaram (on behalf of Prathap Suresh)
    Created on         : 25-Jan-2023
    Created Reason     : 34889755: During wrapper contract creation Fee custom table population was missing. Same has been added.
    Search String      : Bug#34889755
	
	Changed BY         : Arunprasath
    Changed on         : 08-Jan-2025
    Changed Reason     : LS_Migration_Changes
    Search String      : Bug#37292205
------------------------------------END CHANGE HISTORY-------------------------------------
*/

gErrList		VARCHAR2(32000);		--aji
gErrParamList	VARCHAR2(32000);	--aji

--FLEXCUBE V.CL Release 7.1 ITR2 SFR#74, Mithilesh, 061012, Commented the Variables Start
--gModule		oltbs_contract.module_code%TYPE; -- aji 27-apr-2006
--gSourceCode	oltbs_upload_master.source_code%TYPE;--FLEXCUBE V.CL Release 7.0 Rollover Changes by Sambhaji 03-MAY-2006
--FLEXCUBE V.CL Release 7.1 ITR2 SFR#74, Mithilesh, 061012, Commented the Variables End

type upldFeeTbl is table of lftbs_upload_fee%rowtype index by binary_integer;
TYPE tbl_upl_sch IS TABLE OF oltbs_upload_schedules%ROWTYPE INDEX BY BINARY_INTEGER;
TYPE tbl_upl_linkages IS TABLE OF oltbs_upload_linkages%ROWTYPE INDEX BY BINARY_INTEGER;
--TYPE tbl_repo_blocks IS TABLE OF setbs_upload_repo_blocks%ROWTYPE INDEX BY BINARY_INTEGER;

FUNCTION fn_upload_contract
	(
	psourcecode      		IN      	oltbs_upload_master.source_code%TYPE,
	pextrefno        		IN      	oltbs_upload_master.ext_contract_ref_no%TYPE,
	pimpmode         		IN      	VARCHAR2,
	pcuberefno       		OUT     	oltbs_contract.contract_ref_no%TYPE, --02-JUL-03  FCC 4.3 AUG 2003  CEEMEA Changes FOR TIDE
	p_masterec       		IN      	oltbs_upload_master%ROWTYPE,
	tbl_upload_schedules 		IN OUT  	tbl_upl_sch, --plsql
	tbl_upload_linkages  		IN OUT  	tbl_upl_linkages, --plsql
	p_mis_rec        		IN      	oltbs_upload_class_mapping%ROWTYPE,
	tb_udf           		IN      	olpkss_upload_ud.tbl_udf_type,
	tb_settle        		IN      	olpkss_upload.tbl_settle_type	,
	p_contractis_record		IN      	oltbs_contractis_cs%ROWTYPE	,
	tb_interest1      		IN      	lfpkss_upload.tbl_interest_type,
	--p_tbl_repo          		IN        	tbl_repo_blocks, --24-JAN-2005 FCC 4.6.1 JAN 2005 SR Upload changes. plsql  --FCC 4.6.1 LOT1 YACR changes --FCC 4.6.1 Security Repo changes
	ppostimpstatus   		OUT     	VARCHAR2, --02-JUL-03  FCC 4.3 AUG 2003  CEEMEA Changes FOR TIDE
	perrorcode       		IN OUT  	VARCHAR2,
	perrorparams     		IN OUT  	VARCHAR2
	)
	RETURN BOOLEAN;

FUNCTION fn_authorise_contract (
	p_ext_contract_rec   IN 	oltbs_ext_contract_stat%ROWTYPE,
	p_contract_ref_no    IN 	VARCHAR2,
	p_error_code	   IN OUT	VARCHAR2,
	p_error_param	   IN OUT	VARCHAR2
   )
	RETURN BOOLEAN;
FUNCTION fn_default_tax (
	p_ext_contract_rec   IN 	oltbs_ext_contract_stat%ROWTYPE,
	p_contract_ref_no IN	VARCHAR2,
	p_contract_type	IN	VARCHAR2,
	p_drawdown_no IN NUMBER,
	p_err 		   IN OUT	VARCHAR2,
	p_err_params	   IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;
-- 23-May-2006 FLEXCUBE V.CL Release 7.0 LOT2 ITR1 SFR#12, upload related changes aji
FUNCTION fn_default_Borrower (
				p_ext_contract_rec   IN 	oltbs_ext_contract_stat%ROWTYPE,
				p_contract_ref_no IN	VARCHAR2,
				p_facility_ref_no IN	VARCHAR2,
				p_err 		   IN OUT	VARCHAR2,
				p_err_params	   IN OUT	VARCHAR2
	)
	RETURN BOOLEAN;

-- 26-MAY-2006 FLEXCUBE V.CL Release 7.0 LOT2 ITR2 SFR#48 Aji
FUNCTION fn_default_dd_product ( p_ext_contract_rec   	IN 	oltbs_ext_contract_stat%ROWTYPE,
					  		p_contract_ref_no 	IN	VARCHAR2,
					 		p_product_code		IN 	oltms_product.product_code%TYPE,
					  		p_err 		   IN OUT	VARCHAR2,
					  		p_err_params	   IN OUT	VARCHAR2
							)
RETURN BOOLEAN;

FUNCTION fn_check_entity (
	p_ext_contract_refno   IN	  oltbs_ext_contract_stat.external_ref_no%TYPE,
	p_diary_event_seq_no   IN	  OLTB_UPLD_CONTRACTDIARY_EVNT.diary_event_seq_no%TYPE,
	p_err_code		     IN OUT   VARCHAR2,
	p_err_params	     IN OUT   VARCHAR2
   )
	RETURN BOOLEAN;

function FN_UPLOAD_DRAWDOWN_SCHED
(
	p_ext_contract_rec 	in 	oltbs_ext_contract_stat%rowtype,
	p_err			IN OUT	varchar2,
	p_err_params		IN OUT	varchar2
)
return boolean;
--19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO Start Here
-- FCC 7.3 RETRO of CITILS46110282 Changes START
 FUNCTION fn_update_balance (
	p_val 		   IN   NUMBER,
	-- FCC 7.3 RETRO of CITILS46110282 Changes START
	l_upload_cont_rec IN oltbs_contract_master%rowtype       --CITILS46110282 Changes
	--l_upload_party_rec IN oltbs_contract_party%rowtype     --CITILS46110282 Changes
	-- FCC 7.3 RETRO of CITILS46110282 Changes END
	
   )
	RETURN BOOLEAN;
-- FCC 7.3 RETRO of CITILS46110282 Changes END
--19-OCT-2007 FCC V.CL 7.3 UK CONSOLIDATION RETRO End Here

FUNCTION Fn_Temp_Roll_Refno(p_old_contract_ref_no IN  OLTBS_CONTRACT.CONTRACT_REF_NO%TYPE,

                                p_temp_roll_refno_rec IN  OLTBS_TEMP_ROLL_REFNO.CONTRACT_REF_NO%TYPE,
                                p_version_no          IN  OLTBS_TEMP_ROLL_REFNO.VERSION_NO%TYPE,
                                p_Source_Code         IN  OLTBS_TEMP_ROLL_REFNO.SOURCE_CODE%TYPE,
                                p_Err_Code            IN OUT VARCHAR2)
  RETURN BOOLEAN;

--Bug#34889755 Changes starts  
FUNCTION FN_UPDATE_TAX_DETAIL (
	P_EXT_CONTRACT_REC IN OLTBS_EXT_CONTRACT_STAT%ROWTYPE,
	P_CONTRACT_REF_NO  IN VARCHAR2,
	P_PRODUCT_TYPE    IN OLTBS_UPLOAD_MASTER.PRODUCT_TYPE%TYPE,
	P_ERROR_CODE      IN OUT VARCHAR2,
	P_ERR_PARAM       IN OUT VARCHAR2
   )
	RETURN BOOLEAN;
--Bug#34889755 Changes ends
--Bug#37292205 Start
FUNCTION fn_upload_dr_contract(Psourcecode          IN Oltbs_Upload_Master.Source_Code%TYPE,
                              Pextrefno            IN Oltbs_Upload_Master.Ext_Contract_Ref_No%TYPE,
                              Pimpmode             IN VARCHAR2,
                              Pcuberefno           OUT Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_Masterec           IN Oltbs_Upload_Master%ROWTYPE,
                              Tbl_Upload_Schedules IN OUT Tbl_Upl_Sch, --plsql
                              Tb_Interest1         IN Lfpkss_Upload.Tbl_Interest_Type,
							  p_lbdddonl      IN OUT lbpks_lbdddonl_main.ty_lbdddonl,
                              Perrorcode     IN OUT VARCHAR2,
                              Perrorparams   IN OUT VARCHAR2) RETURN BOOLEAN ;


FUNCTION fn_upload_tr_contract(Psourcecode          IN Oltbs_Upload_Master.Source_Code%TYPE,
                              Pextrefno            IN Oltbs_Upload_Master.Ext_Contract_Ref_No%TYPE,
                              Pimpmode             IN VARCHAR2,
                              Pcuberefno           OUT Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_Masterec           IN Oltbs_Upload_Master%ROWTYPE,
                              Tbl_Upload_Schedules IN OUT Tbl_Upl_Sch, --plsql
							  p_lbdtronl      IN OUT lbpks_lbdtronl_main.ty_lbdtronl,
                              Perrorcode     IN OUT VARCHAR2,
                              Perrorparams   IN OUT VARCHAR2) RETURN BOOLEAN;
--Bug#37292205 End

end lbpks_upload_addon;
/
create or replace synonym lbpkss_upload_addon for lbpks_upload_addon
/