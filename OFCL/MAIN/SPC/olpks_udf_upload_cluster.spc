CREATE OR REPLACE PACKAGE olpks_udf_upload_cluster AS
  /*-----------------------------------------------------------------------------------------------------
    **
    ** File Name  : olpks_udf_upload_cluster.spc
    **
    ** Module     : Loans and Deposits
    **
    ** This source is part of the Oracle FLEXCUBE Software Product.
    ** Copyright (R) 2008,2019 , Oracle and/or its affiliates.  All rights reserved
    **
    **
    ** No part of this work may be reproduced, stored in a retrieval system, adopted
    ** or transmitted in any form or by any means, electronic, mechanical,
    ** photographic, graphic, optic recording or otherwise, translated in any
    ** language or computer language, without the prior written permission of
    ** Oracle and/or its affiliates.
    **
    ** Oracle Financial Services Software Limited.
    ** Oracle Park, Off Western Express Highway,
    ** Goregaon (East),
    ** Mumbai - 400 063, India
    ** India
    -------------------------------------------------------------------------------------------------------
*/
/*
-----------------------------------------------------------------------------------------------
CHANGE HISTORY

** Modified By           : Chandra Achuta
** Modified On           : 04-NOV-2019
** Modified Reason       : EHD Ref: RABOCBT_12.2_28_JUN_2019_01_0000.
** Search string         : Bug#30489109

** Modified By           : Chandra Achuta
** Modified On           : 12-FEB-2020
** Modified Reason       : EHD Ref: RABOCBT_12.3_14_NOV_2019_01.
** Search string         : Bug#30881230

  **Changed By         : Kavitha Asokan
  **Date               : 21-May-2024
  **Change Description : REDWOOD UDF DESIGN CHANGES - Added new parameters to the existing UDF functions.
  **Search String      : Bug#36630898
-----------------------------------------------------------------------------------------------------
*/
 

	FUNCTION Fn_Pre_Query_Func_Udfdetails(p_Function_Id  IN VARCHAR2,
										  p_Reckey       IN VARCHAR2,
										  p_Not_In_List  IN VARCHAR2,
										  p_Udf_Rec      IN OUT oltms_function_userdef_fields%ROWTYPE,
										  p_Udf_Det      IN OUT olpks_udf_upload.Ty_Upl_Func_Udf,
										  p_Error_Code   IN OUT VARCHAR2,
										  p_Error_Params IN OUT VARCHAR2) RETURN BOOLEAN;
									   
	FUNCTION Fn_Post_Query_Func_Udfdetails(p_Function_Id  IN VARCHAR2,
										   p_Reckey       IN VARCHAR2,
										   p_Not_In_List  IN VARCHAR2,
										   p_Udf_Rec      IN OUT oltms_function_userdef_fields%ROWTYPE,
										   p_Udf_Det      IN OUT olpks_udf_upload.Ty_Upl_Func_Udf,
										   p_Error_Code   IN OUT VARCHAR2,
										   p_Error_Params IN OUT VARCHAR2) RETURN BOOLEAN;
									   
	FUNCTION Fn_Pre_Query_Cont_Udfdetails(p_Function_Id  IN VARCHAR2,
										  p_Key          IN VARCHAR2,
										  p_Not_In_List  IN VARCHAR2,
										  p_Udf_Rec      IN OUT oltms_contract_userdef_fields%ROWTYPE,
										  p_Udf_Det      IN OUT olpks_olctrudf_main.ty_tb_v_cont_udf_upload_detail,
										  --Bug#36630898 changes starts 
									      p_Udf_Det_date IN OUT olpks_olctrudf_main.Ty_Tb_v_udf_upload_detail_date,
									      p_udf_Det_Num  IN OUT olpks_olctrudf_main.Ty_Tb_v_udf_upload_detail_num,
									      --Bug#36630898 changes ends 
										  p_Error_Code   IN OUT VARCHAR2,
										  p_Error_Params IN OUT VARCHAR2) RETURN BOOLEAN;
									   
	FUNCTION Fn_Post_Query_Cont_Udfdetails(p_Function_Id  IN VARCHAR2,
										   p_Key          IN VARCHAR2,
										   p_Not_In_List  IN VARCHAR2,
										   p_Udf_Rec      IN OUT oltms_contract_userdef_fields%ROWTYPE,
										   p_Udf_Det      IN OUT olpks_olctrudf_main.ty_tb_v_cont_udf_upload_detail,
										   --Bug#36630898 changes starts 
									       p_Udf_Det_date IN OUT olpks_olctrudf_main.Ty_Tb_v_udf_upload_detail_date,
									       p_udf_Det_Num  IN OUT olpks_olctrudf_main.Ty_Tb_v_udf_upload_detail_num,
									      --Bug#36630898 changes ends
										   p_Error_Code   IN OUT VARCHAR2,
										   p_Error_Params IN OUT VARCHAR2) RETURN BOOLEAN;
										 
    --Bug#30881230  Changes Starts 
    FUNCTION Fn_Pre_Contract_Udf_Upld_Type(p_Source_Code     IN VARCHAR2,
                                           p_External_Ref_No IN VARCHAR2,
                                           p_Contract_Ref_No IN VARCHAR2,
                                           p_Version_No      IN NUMBER DEFAULT 1,
                                           p_Product         IN oltms_product.Product_Code%TYPE,
                                           p_Action          IN VARCHAR2,
                                           p_Tbl_Upl_Udf     IN olpks_olctrudf_main.ty_tb_v_cont_udf_upload_detail,
										    --Bug#36630898 changes starts 
									       p_Tbl_Upl_Udf_date IN  olpks_olctrudf_main.Ty_Tb_v_udf_upload_detail_date,
									       p_Tbl_Upl_Udf_num  IN  olpks_olctrudf_main.Ty_Tb_v_udf_upload_detail_num,
									      --Bug#36630898 changes ends
                                           p_Error_Code      IN OUT VARCHAR2,
                                           p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;
				
    FUNCTION Fn_Post_Contract_Udf_Upld_Type(p_Source_Code     IN VARCHAR2,
                                            p_External_Ref_No IN VARCHAR2,
                                            p_Contract_Ref_No IN VARCHAR2,
                                            p_Version_No      IN NUMBER DEFAULT 1,
                                            p_Product         IN oltms_product.Product_Code%TYPE,
                                            p_Action          IN VARCHAR2,
                                            p_Tbl_Upl_Udf     IN olpks_olctrudf_main.ty_tb_v_cont_udf_upload_detail,
											--Bug#36630898 changes starts 
									        p_Tbl_Upl_Udf_date IN  olpks_olctrudf_main.Ty_Tb_v_udf_upload_detail_date,
									        p_Tbl_Upl_Udf_num  IN  olpks_olctrudf_main.Ty_Tb_v_udf_upload_detail_num,
									        --Bug#36630898 changes ends
                                            p_Error_Code      IN OUT VARCHAR2,
                                            p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;				
    --Bug#30881230  Changes Ends									   										 
										   
									   
END olpks_udf_upload_cluster;
/
CREATE or REPLACE synonym olpkss_udf_upload_cluster for olpks_udf_upload_cluster
/