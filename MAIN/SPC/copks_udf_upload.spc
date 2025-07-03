CREATE OR REPLACE PACKAGE copks_udf_upload AS
/*------------------------------------------------------------------------------------------
**
** This source is part of the Oracle FLEXCUBE Software Product.
** Copyright (R) 2016 , Oracle and/or its affiliates.  All rights reserved
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
------------------------------------------------------------------------------------------
*/
/*
   ----------------------------------------------------------------------------------------------------
   CHANGE HISTORY
	**
	** Changed by 	 : Vinutha Kini
	** Changed on 	 : 26-Aug-2016
	** Description	 : Core clean up for 12.3
	** Search String : Standalone12.3 CleanUp   

	** Modified By           : Dekyi
	** Modified On           : 16-July-2019
	** Modified Reason       : EHD Ref: WFGUNVUSA_14_20_JUN_2019_01_0000. forward port from Bug#29935366.
	** Search string         : 14.2_EXTN_30060122

   */
   TYPE Ty_Upl_Func_Udf IS TABLE OF Udtbs_Func_Udf_Upload_Detail%ROWTYPE INDEX BY PLS_INTEGER;


    G_UDF_SOURCE_CODE  VARCHAR2(100);  

	--12.4_EXTN_29935366  starts
   PROCEDURE Pr_Set_Skip_Kernel;
   PROCEDURE Pr_Set_Activate_Kernel;
   PROCEDURE Pr_Set_Skip_Cluster;
   PROCEDURE Pr_Set_Activate_Cluster;

   FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
   FUNCTION Fn_Skip_Custom RETURN BOOLEAN;
   FUNCTION Fn_Skip_Cluster RETURN BOOLEAN;  
	--12.4_EXTN_29935366  ends
  
   FUNCTION Fn_Validate_Function_Udf(p_Tbl_Upl_Udf     IN Ty_Upl_Func_Udf
                                    ,p_Function_Id     IN VARCHAR2 --DIJ
                                    ,p_Action          IN VARCHAR2
                                    ,p_Error_Code      IN OUT VARCHAR2
                                    ,p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Validate_Function_Udf(p_Udf_Rec         IN Cstms_Function_Userdef_Fields%ROWTYPE
                                    ,p_Function_Id     IN VARCHAR2	--DIJ
                                    ,p_Action          IN VARCHAR2
                                    ,p_Error_Code      IN OUT VARCHAR2
                                    ,p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;

 
   FUNCTION Fn_Function_Udf_Upload_Type(p_Source_Code     IN VARCHAR2
                                       ,p_Function_Id     IN VARCHAR2  --DIJ
                                       ,p_Reckey          IN VARCHAR2
                                       ,p_Action          IN VARCHAR2
                                       ,p_Tbl_Upl_Udf     IN Ty_Upl_Func_Udf
                                       ,p_Error_Code      IN OUT VARCHAR2
                                       ,p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Function_Udf_Upload_Type(p_Source_Code     IN VARCHAR2
                                       ,p_Function_Id     IN VARCHAR2 --DIJ
                                       ,p_Reckey          IN VARCHAR2
                                       ,p_Action          IN VARCHAR2
                                       ,p_Udf_Rec         IN Cstms_Function_Userdef_Fields%ROWTYPE
                                       ,p_Error_Code      IN OUT VARCHAR2
                                       ,p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;
  


   FUNCTION Fn_Query_Func_Udfdetails(p_Function_Id  IN VARCHAR2
                                    ,p_Reckey       IN VARCHAR2
                                    ,p_Udf_Det      IN OUT Ty_Upl_Func_Udf
                                    ,p_Error_Code   IN OUT VARCHAR2
                                    ,p_Error_Params IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Query_Func_Udfdetails(p_Function_Id  IN VARCHAR2
                                    ,p_Reckey       IN VARCHAR2
                                    ,p_Udf_Rec      IN OUT Cstms_Function_Userdef_Fields%ROWTYPE
                                    ,p_Error_Code   IN OUT VARCHAR2
                                    ,p_Error_Params IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Get_Func_Field_No(p_Functionid      IN VARCHAR2
                                ,p_Field_Name      IN VARCHAR2
                                ,p_Field_Num       OUT NUMBER
                                ,p_Error_Code      IN OUT VARCHAR2
                                ,p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;

  
   FUNCTION Fn_Pickup_Func_Udf(Pprm_Function_Id  IN VARCHAR2
                              ,Pprm_Rec_Key      IN VARCHAR2
                              ,l_Error_Code      IN OUT VARCHAR2
                              ,l_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;

 
   FUNCTION Fn_Query_Func_Udfdetails(p_Function_Id  IN VARCHAR2
                                    ,p_Reckey       IN VARCHAR2
                                    ,p_Not_In_List  IN VARCHAR2
                                    ,p_Udf_Rec      IN OUT Cstms_Function_Userdef_Fields%ROWTYPE
                                    ,p_Udf_Det      IN OUT Ty_Upl_Func_Udf
                                    ,p_Error_Code   IN OUT VARCHAR2
                                    ,p_Error_Params IN OUT VARCHAR2) RETURN BOOLEAN;
  

   FUNCTION Fn_Populate_Func_Udf_Details(p_Function_Id     IN VARCHAR2
                                        ,p_Udf_Rec         IN Cstm_Function_Userdef_Fields%ROWTYPE
                                        ,p_Field_List      IN VARCHAR2
                                        ,p_Udf_Details     IN OUT Ty_Upl_Func_Udf
                                        ,p_Error_Code      IN OUT VARCHAR2
                                        ,p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;
   
   
FUNCTION Fn_Get_Type(p_Source     	IN  Cotms_Source.SOURCE_CODE%TYPE
					,p_Maintenance_Seq_No    IN VARCHAR2 --Standalone12.3 Changes
					,p_function_id   IN VARCHAR2
					,p_branch_code   IN VARCHAR2
					,p_Source_Seq_No IN NUMBER --Standalone12.3 Changes
					,p_Ty_Udf_Det    IN OUT Copks_Udf_Upload.Ty_Upl_Func_Udf --Standalone12.3 CleanUp
					,p_Err_Code      IN OUT VARCHAR2
					,p_Err_Param     IN OUT VARCHAR2) RETURN BOOLEAN;
  
g_rec_key cstm_function_userdef_fields.rec_key%type;  
END copks_udf_upload;
/
create or replace synonym copkss_udf_upload for copks_udf_upload
/