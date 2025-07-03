CREATE OR REPLACE PACKAGE Cspks_Csdxlupd_Kernel AS
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
   
   SFR Number         :
   Changed By         :
   Change Description :
   
   -------------------------------------------------------------------------------------------------------
   */

   PROCEDURE Pr_Skip_Handler(p_Stage IN VARCHAR2);

   FUNCTION Fn_Main(p_Source           IN VARCHAR2
                   ,p_Source_Operation IN VARCHAR2
                   ,p_Function_Id      IN VARCHAR2
                   ,p_Action_Code      IN VARCHAR2
                   ,p_Child_Function   IN VARCHAR2
                   ,p_Multi_Trip_Id    IN VARCHAR2
                   ,p_Request_No       IN VARCHAR2
                   ,p_Csdxlupd         IN OUT Cspks_Csdxlupd_Main.Ty_Csdxlupd
                   ,p_Status           IN OUT VARCHAR2
                   ,p_Err_Code         IN OUT VARCHAR2
                   ,p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Post_Build_Type_Structure(p_Source           IN VARCHAR2
                                        ,p_Source_Operation IN VARCHAR2
                                        ,p_Function_Id      IN VARCHAR2
                                        ,p_Action_Code      IN VARCHAR2
                                        ,p_Child_Function   IN VARCHAR2
                                        ,p_Addl_Info        IN Cspks_Req_Global.Ty_Addl_Info
                                        ,p_Csdxlupd         IN OUT Cspks_Csdxlupd_Main.Ty_Csdxlupd
                                        ,p_Err_Code         IN OUT VARCHAR2
                                        ,p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;

END Cspks_Csdxlupd_Kernel;
/
CREATE OR REPLACE SYNONYM cspkss_csdxlupd_kernel FOR cspks_csdxlupd_kernel
/