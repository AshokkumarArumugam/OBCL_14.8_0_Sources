CREATE OR REPLACE PACKAGE tlpks_contract
AS

/*----------------------------------------------------------------------------------------------------
**
** File Name	: tlpks_contract.SPC
** Module		: SECONDARY LOAN TRADING
**
	This source is part of the Oracle Banking Corporate Lending  Software Product.   
	Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
	No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 

	Oracle Financial Services Software Limited.
	Oracle Park, Off Western Express Highway,
	Goregaon (East), 
	Mumbai - 400 063, India.
----------------------------------------------------------------------------------------------------
Change history

15-JUL-2008 FLEXCUBE V.CL Release 7.4 ,New Unit Developed for processing of SLT contract 
24-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#53,global flag g_manual_authorization added to handle reversal of
						trade from trade online screen.
24-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#53,procedure pr_set_g_manual_authorization added to set g_manual_authorization.
26-AUG-2009 CITIUS-LS#6235, Clearpar and SLT incremental changes retro - changed the copyright clause.
20-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag04,Expense Code change changes,added new function fn_rcls_process

  Changed By         : Jayaram N
  Date               : 21-Feb-2022
  Change Description : TLDTDUPL - TRADE DRAFT STATUS FAILED - Trade Job failing when multiple UDF values
  Search String      : Bug#33853369
-----------------------------------------------------------------------------------------------------
*/

l_valid			BOOLEAN;
l_errno			NUMBER;
g_trade_identifier	tltbs_upload_master.trade_identifier%type;
g_manual_authorization	VARCHAR2(1);--24-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#53,g_manual_authorization added.
FUNCTION fn_create_new_contract
(
p_ext_contract_ref_no   IN TLTB_UPLOAD_MASTER.ext_contract_ref_no%TYPE,
p_trade_ref_no		IN OUT TLTB_UPLOAD_MASTER.ext_contract_ref_no%TYPE,
p_source_code		IN TLTB_UPLOAD_MASTER.source_code%TYPE,
p_branch		IN TLTB_UPLOAD_MASTER.branch%TYPE,
p_version_no		IN TLTB_UPLOAD_MASTER.version_no%TYPE,
p_position_identifier	IN OUT TLTB_UPLOAD_MASTER.position_identifier%TYPE,	
p_err_code	        IN OUT VARCHAR2,
p_err_params	        IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_process_events
(
p_ext_contract_ref_no   IN oltbs_contract.contract_ref_no%TYPE,
p_trade_ref_no		IN OUT oltbs_contract.contract_ref_no%TYPE,
p_source_code		IN tltbs_upload_master.source_code%TYPE,
p_branch		IN tltbs_upload_master.branch%TYPE,
p_processing_date	IN DATE,
p_contract_stat		IN oltbs_contract.contract_status%TYPE,
p_auth_status		IN oltbs_contract.auth_status%TYPE,
p_version_no		IN oltbs_contract.latest_version_no%TYPE,
p_TranType             	IN OUT oltms_trn_type.trn_type%TYPE,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_tbok_process
(
p_events_control_rec	IN tltbs_upload_events_control%ROWTYPE,
p_ext_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
p_trade_ref_no		IN OUT oltbs_contract.contract_ref_no%TYPE,
p_version_no		IN oltbs_contract.latest_version_no%TYPE,
p_source_code		IN tltbs_upload_master.source_code%TYPE,
p_branch		IN tltbs_upload_master.branch%TYPE,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION  fn_tstl_process
(
p_ext_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
p_trade_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
p_processing_date	IN DATE,
p_version_no		IN oltbs_contract.latest_version_no%TYPE,
p_auth_status		IN oltbs_contract.auth_status%TYPE,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION  fn_rstl_process
(
p_trade_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION  fn_trev_process
(
p_ext_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
p_trade_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
p_processing_date	IN DATE,
p_version_no		IN oltbs_contract.latest_version_no%TYPE,
p_contract_stat		IN oltbs_contract.contract_status%TYPE,
p_auth_status		IN oltbs_contract.auth_status%TYPE,
p_TranType             	IN oltms_trn_type.trn_type%TYPE,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION  fn_tcnc_process
(
p_events_control_rec	IN tltbs_upload_events_control%ROWTYPE,
p_ext_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
p_trade_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
p_processing_date	IN DATE,
p_version_no		IN oltbs_contract.latest_version_no%TYPE,
p_contract_stat		IN oltbs_contract.contract_status%TYPE,
p_auth_status		IN oltbs_contract.auth_status%TYPE,
p_tcnc_event_check	IN OUT VARCHAR2,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION  fn_tamd_process
(
p_events_control_rec	IN tltbs_upload_events_control%ROWTYPE,
p_ext_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
p_trade_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
p_processing_date	IN DATE,
p_version_no		IN oltbs_contract.latest_version_no%TYPE,
p_contract_stat		IN oltbs_contract.contract_status%TYPE,
p_auth_status		IN oltbs_contract.auth_status%TYPE,
p_tcnc_event_check	IN OUT VARCHAR2,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION  fn_rmem_process
(
p_trade_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
FUNCTION  fn_telv_process
(
p_events_control_rec	IN tltbs_upload_events_control%ROWTYPE,
p_ext_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
p_trade_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
p_processing_date	IN DATE,
p_version_no		IN oltbs_contract.latest_version_no%TYPE,
p_auth_status		IN oltbs_contract.auth_status%TYPE,
p_tcnc_event_check	IN OUT VARCHAR2,
p_err_code		IN OUT VARCHAR2,
p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;

FUNCTION fn_populate_UDF
(
p_ext_contract_ref_no	IN	tltbs_upload_master.ext_contract_ref_no%TYPE,
p_trade_ref_no		IN 	oltbs_contract.contract_ref_no%TYPE,
p_version_no		IN 	oltbs_contract.latest_version_no%TYPE,
p_error_code		IN OUT	VARCHAR2,
p_error_parameter	IN OUT	VARCHAR2
)
RETURN BOOLEAN;
FUNCTION fn_populate_ssi
(
p_ext_contract_ref_no	IN tltbs_upload_master.ext_contract_ref_no%TYPE,
p_trade_ref_no		IN OLTB_CONTRACT.contract_ref_no%TYPE,
p_version_no		IN NUMBER,
P_err_code		IN OUT	VARCHAR2,
p_err_params		IN OUT	VARCHAR2
)
RETURN BOOLEAN;
PROCEDURE pr_set_g_manual_authorization--24-DEC-2008 FLEXCUBE V.CL Release 7.4 MTR1 SFR#53,added
(
P_flag	IN	VARCHAR2
);
--20-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag04,Expense Code change changes start
FUNCTION  fn_rcls_process
(
	p_events_control_rec	IN tltbs_upload_events_control%ROWTYPE,
	p_ext_contract_ref_no	IN oltbs_contract.contract_ref_no%TYPE,
	p_trade_ref_no		IN oltbs_contract.contract_ref_no%TYPE,
	p_processing_date		IN DATE,
	p_version_no		IN oltbs_contract.latest_version_no%TYPE,
	p_contract_stat		IN oltbs_contract.contract_status%TYPE,
	p_auth_status		IN oltbs_contract.auth_status%TYPE,
	p_err_code			IN OUT VARCHAR2,
	p_err_params		IN OUT VARCHAR2
)
RETURN BOOLEAN;
--20-OCT-2013 Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R714 FS Vol1 Tag04,Expense Code change changes end

--Bug#33853369:Changes starts here
FUNCTION Fn_Contract_Udf_Upload_Type(p_External_Ref_No IN VARCHAR2
                                    ,p_Contract_Ref_No IN VARCHAR2
                                    ,p_Version_No      IN NUMBER DEFAULT 1
                                    ,p_Product         IN oltms_product.Product_Code%TYPE
                                    ,p_Action          IN VARCHAR2
                                    ,p_Error_Code      IN OUT VARCHAR2
                                    ,p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;

 FUNCTION Fn_Update_Cont_Udf(p_Contract_Ref_No  IN VARCHAR2
                             ,p_Version_No      IN NUMBER DEFAULT 1
                             ,p_Udf_Rec         IN oltms_contract_userdef_fields%ROWTYPE
                             ,p_Error_Code      IN OUT VARCHAR2
                             ,p_Error_Parameter IN OUT VARCHAR2
                             )RETURN BOOLEAN;
                             
FUNCTION Fn_Copy_Cont_Filed(p_Product         IN VARCHAR2
                            ,p_Field_Name      IN VARCHAR2
                            ,p_Field_Val       IN VARCHAR2
                            ,p_Udf_Rec         IN OUT oltms_contract_userdef_fields%ROWTYPE
                            ,p_Error_Code      IN OUT VARCHAR2
                            ,p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;

FUNCTION Fn_Get_Cont_Field_Val(p_Tbl_Upl_Udf     IN tlpks_tlcupudf_main.ty_tb_v_userdef_fields__det
                              ,p_Product         IN oltms_product.Product_Code%TYPE
                              ,p_Field_Name      IN VARCHAR2
                              ,p_Field_Num       OUT NUMBER
                              ,p_Field_Val       OUT VARCHAR2
                              ,p_Error_Code      IN OUT VARCHAR2
                              ,p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN ;							  
--Bug#33853369:Changes starts here
end tlpks_contract;							  
/
CREATE OR REPLACE SYNONYM tlpkss_contract FOR tlpks_contract
/