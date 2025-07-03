CREATE OR REPLACE PACKAGE olpks_services
/*----------------------------------------------------------------------------------------------------
**
** File Name	: olpks_services.spc
**
** Module	: INTERFACE
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
/*
29-AUG-2013  CITIUS#17927  Introduced new package as part of CBNA trade date conversion

  **Changed By          : ArunaDevi Rajendran
  **Change Description  : New function added to validate customer status frozen/deceased/whereabout unknown by sync call to UBS 
  **Search String       : OBCL_14.4_EAC
  **Changed On          : 21-Oct-2020

  **Changed By         : Navoneel Nandan
  **Date               : 23-Sep-2021
  **Change Description : Added Function for Blocking the ELCM Amount
  **Search String      : OBCL_14.4_Progessive_DSBR
  
    Changed By         : Pallavi R
    Changed On         : 01-Feb-2023
    Change Reason      : On version query audit details are displaying properly
    Search String      : Bug#34900616_1 Changes    
	
	Changed By         : Rashmi B V
    Changed On         : 10-Jul-2023
    Change Reason      : Query Parent audit details for Child Contracts
    Search String      : Bug#35432660
	
	**Changed By         : Sowmya bitra
	**Date               : 30-Jul-2024
	**Change Description : OBCL_14.8_VERSION_ROLL Changes
	**Search String      : OBCL_14.8_VERSION_ROLL Changes

    Changed By         : Sowmya Bitra
    Date               : 13-Aug-2024
    Change Description : OBCL_14.8_VER_ROL_LS Changes
    Search String      : OBCL_14.8_VER_ROL_LS Changes 
	
	Changed By         : Vineeth T M
    Date               : 10-Sep-2024
    Change Description : Delete prev version details from main tables
    Search String      : BUG#37023283 changes
	
  **Changed By         : Sowmya Bitra
  **Date               : 11-NOV-2024
  **Change Description : Version Rollover Reversal Changes for LS
  **Search String      : OBCL_14.8_LS_Version_Rollover_Revv changes
  -------------------------------------------------------------------------------------------------------

*/
AS

TYPE tbl_lt_product_master IS TABLE OF XMLTYPE
INDEX BY TLTM_PRODUCT_MASTER.product%TYPE;

g_tbl_lt_product_master			tbl_lt_product_master;	

TYPE tbl_lookup_posn_product IS TABLE OF TLTB_POSITION_CONTRACT.product_code%TYPE
INDEX BY VARCHAR2(100);

g_tbl_lookup_posn_product			tbl_lookup_posn_product;	



TYPE tbl_lookup_ldr_details IS TABLE OF XMLTYPE
INDEX BY OLTB_FACILITY_DETAILS_LDR.cusip_no%TYPE;

g_tbl_lookup_ldr_details			tbl_lookup_ldr_details;	


TYPE  cache_cusip_no IS TABLE OF  OLTB_CONTRACT_MASTER.cusip_no%TYPE
INDEX BY VARCHAR2(50);

g_cache_cusip_no		cache_cusip_no;

Function fn_ol_get_cusip_no
(
	p_contract_ref_no	varchar2
)
RETURN VARCHAR2;

FUNCTION fn_get_trdt_acct_flag
(
p_product_Code		IN TLTM_PRODUCT_MASTER.product%TYPE
)
RETURN TLTM_PRODUCT_MASTER.trade_date_acct%TYPE;

FUNCTION fn_get_position_product
(
p_cusip_no					IN TLTB_POSITION_CONTRACT.cusip_no%TYPE,
p_expense_Code			IN TLTB_POSITION_CONTRACT.expense_Code%TYPE,
p_position_identifier		IN TLTB_POSITION_CONTRACT.position_identifier%TYPE
)
RETURN TLTM_PRODUCT_MASTER.trade_date_acct%TYPE;

FUNCTION fn_get_pearl_rec
(
	p_Expense_Code	oltbs_exp_code_goc_map.expense_code%TYPE,
	p_sr_ledger_type	oltbs_exp_code_goc_map.sr_ledger_type%TYPE
)
RETURN XMLTYPE;

FUNCTION fn_get_mitb_rec
(
	p_unit_ref_no	OLTB_CLASS_MAPPING.unit_ref_no%TYPE
)
RETURN XMLTYPE;

FUNCTION	Fn_get_cfpi_branches
RETURN VARCHAR2;

FUNCTION fn_Get_udf_val
			(
			p_function_id		cstm_udf_vals.function_id%TYPE,
			p_field_name		cstm_udf_vals.field_name%TYPE,
			p_rec_key			cstm_udf_vals.rec_key%TYPE
			)
RETURN VARCHAR;

FUNCTION fn_get_ldr_details
			(
			p_cusip_no		IN TLTB_POSITION_CONTRACT.cusip_no%TYPE
			)
RETURN XMLTYPE;
--27-AUG-2013 CITIUS#17893 Changes. Start
FUNCTION Fn_get_fnd_unfnd_percent
				(
				p_cusip_no			IN	tltbs_contract_master.cusip_no%type,
				p_processing_date		IN	DATE,
				p_type				IN	VARCHAR2 ,
				p_consider_lc			IN	VARCHAR2 DEFAULT 'Y'
				)
RETURN NUMBER;

FUNCTION fn_get_orig_trade_flag
				(
					p_trn_Ref_no	OLTB_CONTRACT.contracT_ref_no%TYPE
				)
RETURN VARCHAR2;
--27-AUG-2013 CITIUS#17893 Changes. End
--OBCL_14.4_EAC starts
FUNCTION Fn_CustStatus_Validate(p_Source        IN VARCHAR2,
                                p_Action_Code   IN VARCHAR2,
                                p_Function_Id   IN VARCHAR2,
                                p_MsgID         IN VARCHAR2,
                                p_Err_Code      IN OUT VARCHAR2,
                                p_Err_Params    IN OUT VARCHAR2)
RETURN BOOLEAN;
--OBCL_14.4_EAC ends
--OBCL_14.4_Progessive_DSBR Changes Starts
FUNCTION Fn_Block_Limits(Pm_Ldrec    IN OUT Oltbs_Contract_Master%ROWTYPE,
								p_Esn  IN Oltbs_Contract_Amend_Due.Event_Seq_No%TYPE ,
								Pm_Event    IN VARCHAR2,
                                Pm_Err_Code IN OUT VARCHAR2
                                ) RETURN INTEGER ;
FUNCTION Fn_UnBlock_Limits(Pm_Ldrec    IN OUT Oltbs_Contract_Master%ROWTYPE,
															Pm_Action   IN VARCHAR2 DEFAULT 'C',
																p_Esn  IN Oltbs_Contract_Amend_Due.Event_Seq_No%TYPE ,
																Pm_Event    IN VARCHAR2,
                                Pm_Err_Code IN OUT VARCHAR2
                                ) RETURN INTEGER ;
--OBCL_14.4_Progessive_DSBR Changes Ends

  --Bug#34900616_1 Changes Starts
  FUNCTION Fn_Query_Audit_Log(p_Cont_Ref      IN Oltb_Contract.Contract_Ref_No%TYPE,
                              p_Version       IN Oltb_Contract.Latest_Version_No%TYPE,
                              p_Ver_Flag      IN VARCHAR2,
                              p_Event_Log_Rec OUT Oltb_Contract_Event_Log%ROWTYPE,
                              p_Err_Code      IN OUT VARCHAR2,
                              p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN;
  --Bug#34900616_1 Changes Ends
  
  -- Bug#35432660 starts
  FUNCTION Fn_Query_Parent_Audit_Log(p_Cont_Ref      IN Oltb_Contract.Contract_Ref_No%TYPE,
                                      p_Event_Log_Rec OUT Oltb_Contract_Event_Log%ROWTYPE,
                                      p_Err_Code      IN OUT VARCHAR2,
                                      p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN;
  -- Bug#35432660 ends 
  
  --OBCL_14.8_VERSION_ROLL Changes Start
  FUNCTION fn_version_backup(p_contractrefno IN Oltbs_Contract.Contract_Ref_No%TYPE,
                             p_version_no    IN NUMBER,
                             p_Err_Code      IN OUT VARCHAR2,
                             p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN;
							 
  FUNCTION fn_delete_version_backup(p_contractrefno IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                    p_version_no    IN NUMBER,
                                    p_Err_Code      IN OUT VARCHAR2,
                                    p_Err_Params    IN OUT VARCHAR2) RETURN BOOLEAN;
									
  FUNCTION fn_restore_prev_ver(p_contractrefno IN Oltbs_Contract.Contract_Ref_No%TYPE,
                               p_Bk_Version_No    IN NUMBER, --OBCL_14.8_LS_Version_Rollover_Revv changes
                               p_Err_Code      IN OUT VARCHAR2,
                               p_Err_Params    IN OUT VARCHAR2)
  RETURN BOOLEAN;
  
  FUNCTION fn_create_new_version_revv(p_Reference_No IN VARCHAR2,
                                      p_Bk_Version_No IN Oltbs_Contract_Version_Roll.Bk_Version_No%TYPE, --OBCL_14.8_LS_Version_Rollover_Revv changes
                                     p_Err_Code     IN OUT VARCHAR2,
                                     p_Err_Params   IN OUT VARCHAR2)
  RETURN BOOLEAN;
  
  FUNCTION fn_update_curr_product(p_contractrefno      IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                  p_from_version_no    IN NUMBER,
                                  p_Err_Code           IN OUT VARCHAR2,
                                  p_Err_Params         IN OUT VARCHAR2)
  RETURN BOOLEAN;
  --OBCL_14.8_VERSION_ROLL Changes End
 
  --OBCL_14.8_VER_ROL_LS Changes Start 
  FUNCTION fn_check_version_roll_ref(p_Reference_No IN VARCHAR2,
                                     p_Ver_Roll_Ref IN OUT VARCHAR2,
                                     p_Err_Code     IN OUT VARCHAR2,
                                     p_Err_Params   IN OUT VARCHAR2)
  RETURN BOOLEAN;
  --OBCL_14.8_VER_ROL_LS Changes End
  --Bug#37023283 changes start
  FUNCTION fn_delete_main(p_Reference_No IN oltbs_contract.CONTRACT_REF_NO%type,
                          p_Roll_Esn     IN oltbs_contract.LATEST_EVENT_SEQ_NO%type,
                          p_Err_Code     IN OUT VARCHAR2,
                          p_Err_Params   IN OUT VARCHAR2)
  RETURN BOOLEAN;
  --Bug#37023283 changes end
END olpks_services;
/
CREATE OR REPLACE SYNONYM olpkss_services FOR olpks_services
/