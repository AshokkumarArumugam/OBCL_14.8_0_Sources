create or replace package cspks_req_utils_custom as
   /*------------------------------------------------------------------------------------------
** This source is part of the Oracle FLEXCUBE Universal Banking Software Product.
** Copyright © 2015  Oracle and/or its affiliates.  All rights reserved.
**
** No part of this work may be reproduced, stored in a retrieval system,
** adopted or transmitted in any form or by any means, electronic, mechanical,
** photographic, graphic, optic recording or otherwise,
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
---------------------------------------------------------------------------------------------------
	-- Author  : Piyush Sharma
	-- Created : 29-AUG-2016
	-- Purpose : Extensible hooks for cspks_req_utils
	-- Bug NO  : 24344281
	
   CHANGE HISTORY

Modified By        : Saisudha Rathinavelu
Modified On        : 26-Sep-2017
Modified Reason    : Retro for hook change bug id 26257077.
Search String      : 12.4_RETRO_Bug#26550104

   -------------------------------------------------------------------------------------------------------
   */

  PROCEDURE Pr_Skip_Handler(p_Stage in VARCHAR2);

   PROCEDURE Pr_Pre_Get_Final_Err_Code(p_Function_Id   IN VARCHAR2,
                                  p_Action_Code   IN VARCHAR2,
                                  p_Post_Upl_Stat IN VARCHAR2,
                                  p_Err_Code      IN OUT VARCHAR2,
                                  p_Err_Params    IN OUT VARCHAR2);

   PROCEDURE Pr_Post_Get_Final_Err_Code(p_Function_Id   IN VARCHAR2,
                                  p_Action_Code   IN VARCHAR2,
                                  p_Post_Upl_Stat IN VARCHAR2,
                                  p_Err_Code      IN OUT VARCHAR2,
                                  p_Err_Params    IN OUT VARCHAR2);
--12.4_RETRO_Bug#26550104 Changes starts here
FUNCTION Fn_Post_Get_Key_Information(p_Source           IN VARCHAR2,
                                  p_Source_Operation IN VARCHAR2,
                                  p_Function_Id      IN VARCHAR2,
                                  p_Action_Code      IN VARCHAR2,
                                  p_Function_Type    IN VARCHAR2,
                                  p_Master_Node      IN VARCHAR2,
                                  p_Master_Block     IN VARCHAR2,
                                  p_Master_Xsd_Node  IN VARCHAR2,
                                  p_Pk_Cols          IN VARCHAR2,
                                  p_Pk_Vals          IN VARCHAR2,
                                  p_Key_Info         IN OUT Cspks_Req_Global.Ty_Addl_Info,
                                  p_Error_Code       IN OUT VARCHAR2,
                                  p_Error_Params     IN OUT VARCHAR2)
    RETURN BOOLEAN;
--12.4_RETRO_Bug#26550104 Changes ends here
END cspks_req_utils_custom;
/
CREATE or REPLACE SYNONYM cspkss_req_utils_custom FOR cspks_req_utils_custom
/