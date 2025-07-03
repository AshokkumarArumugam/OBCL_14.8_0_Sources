CREATE OR REPLACE PACKAGE Aepks_Eoc_Utils AS
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
---------------------------------------------------------------------------------------------------
   CHANGE HISTORY

   Date                 : 27/09/2012
   Updated By           : Surendra Gubba
   Release              : FCUBS12.0
   Bug Number           : 14670063
   Change Description   : Introduced Fn_Chk_Eoc_Master Function to chk EOC Master Table before processing the EOC Request.
   Search Tag           : 14670063-MULTIPLE RUNS OF EOD FIX  
   **
	** Changed by 	 : Vinutha Kini
	** Changed on 	 : 07-Sep-2016
	** Description	 : Core clean up for 12.3Payments
	** Search String : Standalone12.3 CleanUp_1   
   
   -------------------------------------------------------------------------------------------------------
   */

   FUNCTION Fn_Get_Application RETURN VARCHAR2;

   FUNCTION Fn_Get_Param_Value(p_Param_Name IN VARCHAR2) RETURN VARCHAR2;
   FUNCTION Fn_Get_Branch_Data(p_Branch      IN Sttm_Core_Branch.Branch_Code%TYPE --Standalone12.3 CleanUp_1
                              ,p_End_Of_Inut IN OUT VARCHAR2
                              ,p_Eoc_Stage   IN OUT VARCHAR2
                              ,p_Prev_Day    IN OUT DATE
                              ,p_Today       IN OUT DATE
                              ,p_Next_Day    IN OUT DATE
                              ,p_Eod_Date    IN OUT DATE
                              ,p_Err_Code    IN OUT VARCHAR2
                              ,p_Err_Params  IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Lock_Batch(p_Branch     VARCHAR2
                         ,p_Stage      VARCHAR2
                         ,p_Batch      VARCHAR2
                         ,p_Status     VARCHAR2
                         ,p_Err_Code   IN OUT VARCHAR2
                         ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Lock_Stage(p_Branch     VARCHAR2
                         ,p_Stage      VARCHAR2
                         ,p_Status     VARCHAR2
                         ,p_Err_Code   IN OUT VARCHAR2
                         ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Lock_Branch(p_Branch     VARCHAR2
                          ,p_Status     VARCHAR2
                          ,p_Err_Code   IN OUT VARCHAR2
                          ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Lock_Eoc(p_Eoc_Ref_No VARCHAR2
                       ,p_Status     VARCHAR2
                       ,p_Err_Code   IN OUT VARCHAR2
                       ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Get_Sid(p_Sid    IN OUT VARCHAR2
                      ,p_Serial IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Get_Curr_Stage(p_End_Of_Input IN VARCHAR2 DEFAULT 'N') RETURN VARCHAR2;
   FUNCTION Fn_Get_End_Of_Input(p_Stage IN VARCHAR2) RETURN VARCHAR2;
   FUNCTION Fn_Cleanup_Eoc_Status(p_Err_Code   IN OUT VARCHAR2
                                 ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Log_Eoc_Master(p_Eoc_Master IN Aetb_Eoc_Master%ROWTYPE
                             ,p_Err_Code   IN OUT VARCHAR2
                             ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Insert_Eoc_Master(p_Eoc_Master IN OUT Aetb_Eoc_Master%ROWTYPE
                                ,p_Err_Code   IN OUT VARCHAR2
                                ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Log_Eoc_Branch(p_Eoc_Branch IN Aetb_Eoc_Branches%ROWTYPE
                             ,p_Err_Code   IN OUT VARCHAR2
                             ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Insert_Eoc_Branch(p_Eoc_Branch IN OUT Aetb_Eoc_Branches%ROWTYPE
                                ,p_Err_Code   IN OUT VARCHAR2
                                ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Log_Program(p_Program    IN Aetb_Eoc_Programs%ROWTYPE
                          ,p_Err_Code   IN OUT VARCHAR2
                          ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Insert_Program(p_Program    IN OUT Aetb_Eoc_Programs%ROWTYPE
                             ,p_Err_Code   IN OUT VARCHAR2
                             ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Log_Runchat(p_Runchart   IN Aetb_Eoc_Runchart%ROWTYPE
                          ,p_Err_Code   IN OUT VARCHAR2
                          ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Insert_Runchat(p_Runchart   IN OUT Aetb_Eoc_Runchart%ROWTYPE
                             ,p_Err_Code   IN OUT VARCHAR2
                             ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Clear_Days_Runchat(p_Branch     IN Sttms_Core_Branch.Branch_Code%TYPE --Standalone12.3 CleanUp_1
                                 ,p_Date       IN DATE
                                 ,p_Err_Code   IN OUT VARCHAR2
                                 ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Clear_Todays_Runchat(p_Branch     IN Sttms_Core_Branch.Branch_Code%TYPE --Standalone12.3 CleanUp_1
                                   ,p_Err_Code   IN OUT VARCHAR2
                                   ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Clear_Prevdays_Runchat(p_Branch     IN Sttms_Core_Branch.Branch_Code%TYPE --Standalone12.3 CleanUp_1
                                     ,p_Err_Code   IN OUT VARCHAR2
                                     ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Gen_Error_Messages(p_Codes  IN VARCHAR2
                                 ,p_Params IN VARCHAR2) RETURN VARCHAR2;
   FUNCTION Fn_Is_Stop(p_Branch     IN VARCHAR2
                      ,p_Err_Code   IN OUT VARCHAR2
                      ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Get_Eoc_Min_Max_Stages(p_Eoc_Ref           IN VARCHAR2
                                     ,p_Eoc_Min_Stage     IN OUT VARCHAR2
                                     ,p_Eoc_Min_Stage_Seq IN OUT VARCHAR2
                                     ,p_Eoc_Max_Stage     IN OUT VARCHAR2
                                     ,p_Eoc_Max_Stage_Seq IN OUT VARCHAR2
                                     ,p_Err_Code          IN OUT VARCHAR2
                                     ,p_Err_Params        IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Update_Eoc_Threads(p_Eoc_Ref   IN VARCHAR2
                                 ,p_Incr_Decr IN VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Update_Branch_Threads(p_Branch    IN VARCHAR2
                                    ,p_Incr_Decr IN VARCHAR2) RETURN BOOLEAN;
-- 14670063-MULTIPLE RUNS OF EOD FIX Starts
FUNCTION Fn_Chk_Eoc_Master(p_Eoc_Ref_No IN AETB_EOC_MASTER.EOC_REF_NO%TYPE,
                           p_Err_Code   IN OUT VARCHAR2,
                           p_Err_Params IN OUT VARCHAR2 )
                       RETURN BOOLEAN;
-- 14670063-MULTIPLE RUNS OF EOD FIX Ends
									
END Aepks_Eoc_Utils;
/
CREATE OR REPLACE SYNONYM Aepkss_Eoc_Utils FOR Aepks_Eoc_Utils
/