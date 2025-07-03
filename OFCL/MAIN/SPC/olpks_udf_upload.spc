CREATE OR REPLACE PACKAGE olpks_udf_upload AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle Banking Software Product
** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.
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
   ----------------------------------------------------------------------------------------------------
   CHANGE HISTORY
   
   DATE            SFR/REASON              DESCRIPTION
   02-MAR-2003     FCC 5.2 - 9i changes    Both the spec and the body need to have the same default parameters in Oracle 9i
   20-NOV-2006             FC_UBS_V.UM_7.3.0.0.0.0.0 GATEWAY CHANGES
   09-JUL-2007     KERNEL80.0 Changes
                   UDF Upload Type is Chaged.INdex By from VARCAHR2 to PLS_INTEGER
   24/jun/2008           New Flow Changes     FCUBS10.1           Code Added for New Flow Routing_type N
   20-JAN-2009     10.3 Changes for UDF in Main Screen
   
   
   
   --FC_UBS_V.UM_7.3.0.0.0.0.0 Added For GATEWAY  Starts
   --KERNEL8.0 CHnages Starts
   
   TYPE ty_upl_func_udf IS TABLE OF udtbs_func_udf_upload_detail%ROWTYPE
   INDEX BY  udtbs_func_udf_upload_detail.field_name%TYPE;
   
   TYPE ty_upl_cont_udf IS TABLE OF oltbs_cont_udf_upload_detail%ROWTYPE
   INDEX BY  udtbs_func_udf_upload_detail.field_name%TYPE;
   
   Modified By       : V.Rakesh Kumar
   Modified On       : 24-Sep-2012
   Modified Reason   : Added Fn_Default_cont_Udfdetails,Changes related to Pick up the Default values maintianed for the UDFs
   Search String     : 9NT1525_12.0_RETRO_TFCBTWD_14585240
   Retro Source	     : 9NT1525_11.4_CNSL_TFCBTWD_14555099

	Modified By		: Vinodkumar Subramaniam
	Modified On		: 07-Nov-2012
	Modified Reason	: Added a global Variable for Source code G_UDF_SOURCE_CODE and validated for the UDF Check Since the validation should happen only for Gateway
	Search String	: 9NT1525_12.0_TFCBTWD_SFR#14568920_RETRO
	
     Modified By        : Guruprasad Bhat
     Modified On        : 23-June-2014
     Modified Reason    : RETRO-Bug#18824706-Unique UDF can be only one. Was throwing error from Same Contract modification.Fixed this issue based on Contract ref no.
     Search String      : Fix for Bug# 18837213
	 
	Modified By     : Anoop R
    Modified On     : 01-Sep-2014
    Modified Reason : Fixed the issue where the unique UDF error was thrown when modifying the same record for maintenace screens.
					  Its value should be validated only against other records.
    Search String   : 1203_IRONVBR_19515885	

    ** Modified By           : Chandra Achuta
    ** Modified On           : 04-NOV-2019
    ** Modified Reason       : EHD Ref: RABOCBT_12.2_28_JUN_2019_01_0000.
    ** Search string         : Bug#30489109	
	
    **Changed By         : Kavitha Asokan
    **Date               : 21-May-2024
    **Change Description : REDWOOD UDF DESIGN CHANGES - Added 2 new blocks for date and number fields 
    **Search String      : Bug#36630898
  
	 **Changed By         : Vineeth T M
	 **Date               : 30-Jul-2024
	 **Change Description : OBCL_14.8_VER_ROL Changes
	 **Search String      : OBCL_14.8_VER_ROL Changes  
  
   */
   TYPE Ty_Upl_Func_Udf IS TABLE OF Udtbs_Func_Udf_Upload_Detail%ROWTYPE INDEX BY PLS_INTEGER;
   --Bug#36630898 changes starts 
   TYPE Ty_Upl_Func_Udf_num IS TABLE OF OLVWS_CONT_UDF_UPLOAD_DETAIL_NUM%ROWTYPE INDEX BY PLS_INTEGER;
   TYPE Ty_Upl_Func_Udf_date IS TABLE OF OLVWS_CONT_UDF_UPLOAD_DETAIL_DATE%ROWTYPE INDEX BY PLS_INTEGER;
   --Bug#36630898 changes ends
   TYPE Ty_Upl_Cont_Udf IS TABLE OF oltbs_cont_udf_upload_detail%ROWTYPE INDEX BY PLS_INTEGER;
   --KERNEL8.0 CHnages Ends

   --FC_UBS_V.UM_7.3.0.0.0.0.0 Added For GATEWAY  Ends
    G_UDF_SOURCE_CODE  VARCHAR2(100);  --9NT1525_12.0_TFCBTWD_SFR#14568920_RETRO added
    --Bug#30489109  changes starts
	PROCEDURE Pr_Skip_Handler(P_Stage IN VARCHAR2);
	PROCEDURE Pr_Set_Skip_Kernel;
	PROCEDURE Pr_Set_Activate_Kernel;
	PROCEDURE Pr_Set_Skip_Cluster;
	PROCEDURE Pr_Set_Activate_Cluster;
	FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
	--Bug#30489109  changes ends
   FUNCTION Fn_Upload(p_Source_Code     IN VARCHAR2
                     ,p_External_Ref_No IN VARCHAR2
                     ,p_Contract_Ref_No IN VARCHAR2
                      --FCC 5.2 - 9i changes
                      --, p_version_no    IN  NUMBER
                     ,p_Version_No IN NUMBER DEFAULT 1
                     ,p_Err        IN OUT VARCHAR2
                     ,p_Prms       IN OUT VARCHAR2) RETURN BOOLEAN;

   --FC_UBS_V.UM_7.3.0.0.0.0.0 Added For GATEWAY  Starts

   FUNCTION Fn_Validate_Contract_Udf(p_Tbl_Upl_Udf     IN olpks_olctrudf_main.ty_tb_v_cont_udf_upload_detail
                                    ,p_Tbl_Upl_Udf_date IN olpks_olctrudf_main.ty_tb_v_udf_upload_detail_date --Bug#36630898 changes
									,p_Tbl_Upl_Udf_num IN olpks_olctrudf_main.ty_tb_v_udf_upload_detail_num --Bug#36630898 changes
                                    ,p_Product         IN oltms_product.Product_Code%TYPE
                                    ,p_Action          IN VARCHAR2
                                    ,p_Error_Code      IN OUT VARCHAR2
                                    ,p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Validate_Function_Udf(p_Tbl_Upl_Udf     IN Ty_Upl_Func_Udf
                                    ,p_Function_Id     IN oltms_product.Product_Code%TYPE
                                    ,p_Action          IN VARCHAR2
                                    ,p_Error_Code      IN OUT VARCHAR2
                                    ,p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;
   -- FCUBS10.1 New Flow Changes Starts
   FUNCTION Fn_Validate_Function_Udf(p_Udf_Rec         IN oltms_function_userdef_fields%ROWTYPE
                                    ,p_Function_Id     IN oltms_product.Product_Code%TYPE
                                    ,p_Action          IN VARCHAR2
                                    ,p_Error_Code      IN OUT VARCHAR2
                                    ,p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Contract_Udf_Upload_Type(p_Source_Code     IN VARCHAR2
                                       ,p_External_Ref_No IN VARCHAR2
                                       ,p_Contract_Ref_No IN VARCHAR2
                                       ,p_Version_No      IN NUMBER DEFAULT 1
                                       ,p_Product         IN oltms_product.Product_Code%TYPE
                                       ,p_Action          IN VARCHAR2
                                       ,p_Tbl_Upl_Udf     IN olpks_olctrudf_main.ty_tb_v_cont_udf_upload_detail
									   ,p_Tbl_Upl_Udf_date     IN olpks_olctrudf_main.ty_tb_v_udf_upload_detail_date --Bug#36630898 changes
									   ,p_Tbl_Upl_Udf_num IN olpks_olctrudf_main.ty_tb_v_udf_upload_detail_num --Bug#36630898 changes
                                       ,p_Error_Code      IN OUT VARCHAR2
                                       ,p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Function_Udf_Upload_Type(p_Source_Code     IN VARCHAR2
                                       ,p_Function_Id     IN oltms_product.Product_Code%TYPE
                                       ,p_Reckey          IN VARCHAR2
                                       ,p_Action          IN VARCHAR2
                                       ,p_Tbl_Upl_Udf     IN Ty_Upl_Func_Udf
                                       ,p_Error_Code      IN OUT VARCHAR2
                                       ,p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;
   -- FCUBS10.1 New Flow Changes Starts
   FUNCTION Fn_Function_Udf_Upload_Type(p_Source_Code     IN VARCHAR2
                                       ,p_Function_Id     IN oltms_product.Product_Code%TYPE
                                       ,p_Reckey          IN VARCHAR2
                                       ,p_Action          IN VARCHAR2
                                       ,p_Udf_Rec         IN oltms_function_userdef_fields%ROWTYPE
                                       ,p_Error_Code      IN OUT VARCHAR2
                                       ,p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;
   -- FCUBS10.1 New Flow Changes  ENDS

   --KERNEL8.0 CHnages Starts
   FUNCTION Fn_Query_Func_Udfdetails(p_Function_Id  IN VARCHAR2
                                    ,p_Reckey       IN VARCHAR2
                                    ,p_Udf_Det      IN OUT Ty_Upl_Func_Udf
                                    ,p_Error_Code   IN OUT VARCHAR2
                                    ,p_Error_Params IN OUT VARCHAR2) RETURN BOOLEAN;
   -- FCUBS10.1 New Flow Changes Starts
   FUNCTION Fn_Query_Func_Udfdetails(p_Function_Id  IN VARCHAR2
                                    ,p_Reckey       IN VARCHAR2
                                    ,p_Udf_Rec      IN OUT oltms_function_userdef_fields%ROWTYPE
                                    ,p_Error_Code   IN OUT VARCHAR2
                                    ,p_Error_Params IN OUT VARCHAR2) RETURN BOOLEAN;

   -- FCUBS10.1 New Flow Changes  ENDS

   FUNCTION Fn_Query_Cont_Udfdetails(p_Function_Id  IN VARCHAR2
                                    ,p_Key          IN VARCHAR2
                                    ,p_Udf_Det      IN OUT olpks_olctrudf_main.ty_tb_v_cont_udf_upload_detail
									--Bug#36630898 changes starts 
									,p_Udf_Det_date IN OUT olpks_olctrudf_main.Ty_Tb_v_udf_upload_detail_date
									,p_udf_Det_Num  IN OUT olpks_olctrudf_main.Ty_Tb_v_udf_upload_detail_num
									--Bug#36630898 changes ends 
                                    ,p_Error_Code   IN OUT VARCHAR2
                                    ,p_Error_Params IN OUT VARCHAR2) RETURN BOOLEAN;

   --KERNEL8.0 CHnages Ends

   FUNCTION Fn_Get_Cont_Field_No(p_Product         IN oltms_product.Product_Code%TYPE
                                ,p_Field_Name      IN VARCHAR2
                                ,p_Field_Num       OUT NUMBER
                                ,p_Error_Code      IN OUT VARCHAR2
                                ,p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Get_Func_Field_No(p_Functionid      IN VARCHAR2
                                ,p_Field_Name      IN VARCHAR2
                                ,p_Field_Num       OUT NUMBER
                                ,p_Error_Code      IN OUT VARCHAR2
                                ,p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Pickup_Cont_Udf(p_Cont_Ref        IN VARCHAR2
                              ,p_Module          IN VARCHAR2
                              ,p_Prod            IN VARCHAR2
                              ,l_Error_Code      IN OUT VARCHAR2
                              ,l_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Pickup_Func_Udf(Pprm_Function_Id  IN VARCHAR2
                              ,Pprm_Rec_Key      IN VARCHAR2
                              ,l_Error_Code      IN OUT VARCHAR2
                              ,l_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;

   --FC_UBS_V.UM_7.3.0.0.0.0.0 Added For GATEWAY  Ends
   --10.3 Changes for UDF in Main Starts
   FUNCTION Fn_Query_Func_Udfdetails(p_Function_Id  IN VARCHAR2
                                    ,p_Reckey       IN VARCHAR2
                                    ,p_Not_In_List  IN VARCHAR2
                                    ,p_Udf_Rec      IN OUT oltms_function_userdef_fields%ROWTYPE
                                    ,p_Udf_Det      IN OUT Ty_Upl_Func_Udf
                                    ,p_Error_Code   IN OUT VARCHAR2
                                    ,p_Error_Params IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Query_Cont_Udfdetails(p_Function_Id  IN VARCHAR2
                                    ,p_Key          IN VARCHAR2
                                    ,p_Not_In_List  IN VARCHAR2
                                    ,p_Udf_Rec      IN OUT oltms_contract_userdef_fields%ROWTYPE
                                    ,p_Udf_Det      IN OUT olpks_olctrudf_main.ty_tb_v_cont_udf_upload_detail
									--Bug#36630898 changes starts 
									,p_Udf_Det_date  IN OUT olpks_olctrudf_main.Ty_Tb_v_udf_upload_detail_date
									,p_Udf_Det_num  IN OUT olpks_olctrudf_main.Ty_Tb_v_udf_upload_detail_num
									--Bug#36630898 changes ends 
                                    ,p_Error_Code   IN OUT VARCHAR2
                                    ,p_Error_Params IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Populate_Func_Udf_Details(p_Function_Id     IN VARCHAR2
                                        ,p_Udf_Rec         IN OLTM_FUNCTION_USERDEF_FIELDS%ROWTYPE
                                        ,p_Field_List      IN VARCHAR2
                                        ,p_Udf_Details     IN OUT Ty_Upl_Func_Udf
                                        ,p_Error_Code      IN OUT VARCHAR2
                                        ,p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Populate_Cont_Udf_Details(p_Function_Id     IN VARCHAR2
                                        ,p_Udf_Rec         IN oltms_contract_userdef_fields%ROWTYPE
                                        ,p_Field_List      IN VARCHAR2
                                        ,p_Udf_Details     IN OUT olpks_olctrudf_main.ty_tb_v_cont_udf_upload_detail
                                        ,p_Error_Code      IN OUT VARCHAR2
                                        ,p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;
   --10.3 Changes for UDF in Main Ends
     --upload changes 11.3 starts
   FUNCTION Fn_Get_Type(p_Source        OLTB_EXT_CONTRACT_STAT.SOURCE%TYPE
                       ,p_Source_Ref    IN OLTB_EXT_CONTRACT_STAT.External_Ref_No%TYPE
                       ,p_Source_Seq_No OLTB_EXT_CONTRACT_STAT.External_Seq_No%TYPE
                       ,p_Ty_Udf_Det    IN OUT olpks_olctrudf_main.ty_tb_v_cont_udf_upload_detail
                       ,p_Subsystemstat IN OUT VARCHAR2
                       ,p_Err_Code      IN OUT VARCHAR2
                       ,p_Err_Param     IN OUT VARCHAR2) RETURN BOOLEAN;
  --upload changes 11.3 starts
  -- changes for Upload Package generator
  FUNCTION Fn_Get_Type(p_Source     IN  OLTB_UPLOAD_MASTER_ST.SOURCE_CODE%TYPE
                       ,p_Maintenance_Seq_No    IN OLTB_UPLOAD_MASTER_ST.maintenance_seq_no%TYPE
					             ,p_function_id   IN VARCHAR2
					             ,p_branch_code   IN VARCHAR2
                       ,p_Source_Seq_No IN OLTB_UPLOAD_MASTER_ST.SOURCE_Seq_No%TYPE
                       ,p_Ty_Udf_Det    IN OUT olpks_udf_upload.Ty_Upl_Func_Udf                       
                       ,p_Err_Code      IN OUT VARCHAR2
                       ,p_Err_Param     IN OUT VARCHAR2) RETURN BOOLEAN;
   -- changes for Upload Package generator
  --9NT1525_12.0_RETRO_TFCBTWD_14585240 Starts
  Function Fn_Default_cont_Udfdetails(p_Function_Id IN VARCHAR2,
                                      p_udf_det     IN OUT olpks_olctrudf_main.ty_tb_v_cont_udf_upload_detail,
                                      p_Err_Code    IN OUT VARCHAR2,
                                      p_Err_Params  IN OUT VARCHAR2)
    RETURN BOOLEAN;  
--9NT1525_12.0_RETRO_TFCBTWD_14585240 Ends	
-- Added as Fix for Bug# 18837213 starts
g_cont_ref_no OLTB_CONTRACT.CONTRACT_REF_NO%TYPE; 
-- Added as Fix for Bug# 18837213 ends
g_rec_key OLTM_FUNCTION_USERDEF_FIELDS.rec_key%type;  --1203_IRONVBR_19515885 added
FUNCTION fn_upload_row	(	p_source_code	IN	VARCHAR2
					,	p_external_ref_no	IN	VARCHAR2
					,	p_contract_ref_no	IN	VARCHAR2
					,	p_version_no	IN	NUMBER	DEFAULT 1--FCC 4.2 APR 2003 9i Changes
					,	p_err			IN OUT	VARCHAR2
					,	p_prms		IN OUT	VARCHAR2
					)
	RETURN BOOLEAN;
	
--Bug#36630898 changes starts
	
function Fn_Cont_check_amend_fields ( p_Product    IN oltms_product.Product_Code%TYPE,
                                      p_Field_Name IN  VARCHAR2, 
									  p_field_val  IN  VARCHAR2, 
									  p_Udf_Rec    IN OUT oltms_contract_userdef_fields%ROWTYPE,
									  p_val_req    IN VARCHAR,
									  p_Error_Code  OUT VARCHAR2,
									  p_Error_Parameter OUT VARCHAR2 )
 RETURN BOOLEAN;

--Bug#36630898 changes ends
--OBCL_14.8_VER_ROL Changes start
FUNCTION Fn_Update_Cont_Udf(p_Contract_Ref_No IN VARCHAR2
                           ,p_Version_No      IN NUMBER DEFAULT 1
                           ,p_Udf_Rec         IN oltms_contract_userdef_fields%ROWTYPE
                           ,p_Error_Code      IN OUT VARCHAR2
                           ,p_Error_Parameter IN OUT VARCHAR2
                           ,p_New_Product     in oltbs_contract.product_code%type) 
                            RETURN BOOLEAN ;
--OBCL_14.8_VER_ROL Changes end
                                 
END olpks_udf_upload;
/
CREATE OR REPLACE SYNONYM  olpkss_udf_upload FOR olpks_udf_upload
/