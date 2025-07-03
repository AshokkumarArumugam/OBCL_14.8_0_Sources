CREATE OR REPLACE PACKAGE Aepks_Aedstart_Kernel AS
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
   -------------------------------------------------------------------------------------------------------
   CHANGE HISTORY
   
    Modified By           : Harikrishna
    Modified On           : 15-May-2015
    Modified Reason       : bug#21082853
    Search String         : FCUBS_12.1.0_21082853
	
Modified By        : Saisudha Rathinavelu
Modified On        : 23-Jan-2017
Modified Reason    : Retro for hook change bug id 23219523.
Search String      : 12.3_RETRO_Bug#25398904
   -------------------------------------------------------------------------------------------------------
   */

   g_Eoc_Type VARCHAR2(32767);
   PROCEDURE Pr_Init;

   PROCEDURE Pr_Skip_Handler(p_Stage IN VARCHAR2);
   
   --12.3_RETRO_Bug#25398904 Changes starts here
   PROCEDURE Pr_Set_Skip_Kernel;
   PROCEDURE Pr_Set_Activate_Kernel;
   PROCEDURE Pr_Set_Skip_Cluster;
   PROCEDURE Pr_Set_Activate_Cluster;

   FUNCTION Fn_Skip_Custom  RETURN BOOLEAN;                        
   FUNCTION Fn_Skip_Kernel  RETURN BOOLEAN;
   FUNCTION Fn_Skip_Cluster RETURN BOOLEAN;
   --12.3_RETRO_Bug#25398904 Changes ends here
   
   FUNCTION Fn_Get_Eoc_Seq(p_Eoc_Stage IN VARCHAR2) RETURN NUMBER;
   FUNCTION Fn_Get_Eoc_Stage(p_Eoc_Seq IN NUMBER) RETURN VARCHAR2;

   FUNCTION Fn_Set_Sid(p_Eoc_Ref    IN VARCHAR2
                      ,p_Err_Code   IN OUT VARCHAR2
                      ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;

   PROCEDURE Pr_Update_Batch_Status(p_Branch         IN VARCHAR2
                                   ,p_Stage          IN VARCHAR2
                                   ,p_Batch          IN VARCHAR2
                                   ,p_Error_Handling IN VARCHAR2
                                   ,p_Status         IN VARCHAR2
                                   ,p_Err_Code       IN VARCHAR2
                                   ,p_Err_Params     IN VARCHAR2);
   PROCEDURE Pr_Update_Stage_Status(p_Branch     IN VARCHAR2
                                   ,p_Stage      IN VARCHAR2
                                   ,p_Status     IN VARCHAR2
                                   ,p_Err_Code   IN VARCHAR2
                                   ,p_Err_Params IN VARCHAR2);
   PROCEDURE Pr_Update_Branch_Status(p_Branch     IN VARCHAR2
                                    ,p_Status     IN VARCHAR2
                                    ,p_Err_Code   IN VARCHAR2
                                    ,p_Err_Params IN VARCHAR2);

   FUNCTION Fn_Main(p_Source           IN VARCHAR2
                   ,p_Source_Operation IN VARCHAR2
                   ,p_Function_Id      IN VARCHAR2
                   ,p_Action_Code      IN VARCHAR2
                   ,p_Child_Function   IN VARCHAR2
                   ,p_Multi_Trip_Id    IN VARCHAR2
                   ,p_Request_No       IN VARCHAR2
                   ,p_Aedstart         IN OUT Aepks_Aedstart_Main.Ty_Aedstart
                   ,p_Status           IN OUT VARCHAR2
                   ,p_Err_Code         IN OUT VARCHAR2
                   ,p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Post_Build_Type_Structure(p_Source           IN VARCHAR2
                                        ,p_Source_Operation IN VARCHAR2
                                        ,p_Function_Id      IN VARCHAR2
                                        ,p_Action_Code      IN VARCHAR2
                                        ,p_Child_Function   IN VARCHAR2
                                        ,p_Addl_Info        IN Cspks_Req_Global.Ty_Addl_Info
                                        ,p_Aedstart         IN OUT Aepks_Aedstart_Main.Ty_Aedstart
                                        ,p_Err_Code         IN OUT VARCHAR2
                                        ,p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Process_For_a_Branch(p_Branch         IN VARCHAR2
                                   ,p_Target_Eoc_Seq IN NUMBER
                                   ,p_Status         IN OUT VARCHAR2
                                   ,p_Err_Code       IN OUT VARCHAR2
                                   ,p_Err_Params     IN OUT VARCHAR2
								   ,p_eoc_type IN VARCHAR2 DEFAULT 'ASN')--21082756
								   RETURN BOOLEAN;

   FUNCTION Fn_Run_Batch(p_Branch         IN VARCHAR2
                        ,p_Stage          IN VARCHAR2
                        ,p_Batch          IN VARCHAR2
                        ,p_Exec_Layer     IN VARCHAR2
                        ,p_Error_Handling IN VARCHAR2
                        ,p_Status         IN OUT VARCHAR2
                        ,p_Err_Code       IN OUT VARCHAR2
                        ,p_Err_Params     IN OUT VARCHAR2) RETURN BOOLEAN;

   PROCEDURE Pr_Update_Eoc_Status(p_Eoc_Ref IN VARCHAR2
                                 ,p_Status  IN VARCHAR2);

END Aepks_Aedstart_Kernel;
/
CREATE OR REPLACE SYNONYM Aepkss_Aedstart_Kernel FOR Aepks_Aedstart_Kernel
/