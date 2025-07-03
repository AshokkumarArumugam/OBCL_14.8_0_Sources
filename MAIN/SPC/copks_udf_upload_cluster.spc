CREATE OR REPLACE PACKAGE copks_udf_upload_cluster AS
/*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright ? 2011 - 2013  Oracle and/or its affiliates.  All rights reserved.
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
-----------------------------------------------------------------------------------------------
CHANGE HISTORY

	** Modified By           : Dekyi
	** Modified On           : 16-July-2019
	** Modified Reason       : EHD Ref: WFGUNVUSA_14_20_JUN_2019_01_0000. forward port from Bug#29935366.
	** Search string         : 14.2_EXTN_30060122
-----------------------------------------------------------------------------------------------------
*/
 
--14.2_EXTN_30060122 starts
	FUNCTION Fn_Pre_Query_Func_Udfdetails(p_Function_Id  IN VARCHAR2
                                       ,p_Reckey       IN VARCHAR2
                                       ,p_Not_In_List  IN VARCHAR2
                                       ,p_Udf_Rec      IN OUT Cstms_Function_Userdef_Fields%ROWTYPE
                                       ,p_Udf_Det      IN OUT Copks_Udf_Upload.Ty_Upl_Func_Udf
                                       ,p_Error_Code   IN OUT VARCHAR2
                                       ,p_Error_Params IN OUT VARCHAR2) RETURN BOOLEAN;
									   
	FUNCTION Fn_Post_Query_Func_Udfdetails(p_Function_Id  IN VARCHAR2
                                       ,p_Reckey       IN VARCHAR2
                                       ,p_Not_In_List  IN VARCHAR2
                                       ,p_Udf_Rec      IN OUT Cstms_Function_Userdef_Fields%ROWTYPE
                                       ,p_Udf_Det      IN OUT Copks_Udf_Upload.Ty_Upl_Func_Udf
                                       ,p_Error_Code   IN OUT VARCHAR2
                                       ,p_Error_Params IN OUT VARCHAR2) RETURN BOOLEAN;
									   
--14.2_EXTN_30060122 ends
END copks_udf_upload_cluster;
/
CREATE or REPLACE synonym copkss_udf_upload_cluster for copks_udf_upload_cluster
/