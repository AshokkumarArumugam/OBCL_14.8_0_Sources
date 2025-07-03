CREATE OR REPLACE PACKAGE Aepks_Eoc_Vals AS
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
    Created By             : Anmol
Created On             : 25-June-2014
  Change Description   : Hooks provided so as to Delete Unauthorized Transactions at EOD.
Search Tag     : 19059626 Extensibility Hook changes
   -------------------------------------------------------------------------------------------------------
   */
   
       --19059626 Extensibility Hook changes starts
   PROCEDURE Pr_Set_Skip_Kernel;
   PROCEDURE Pr_Set_Activate_Kernel;
   PROCEDURE Pr_Set_Skip_Cluster;
   PROCEDURE Pr_Set_Activate_Cluster;

   FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
  --19059626 Extensibility Hook changes ends
   FUNCTION Fn_Validate_Eoc(p_Aedstart   IN OUT Aepks_Aedstart_Main.Ty_Aedstart
                           ,p_Err_Code   IN OUT VARCHAR2
                           ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Check_Predecessors(p_Branch     IN VARCHAR2
                                 ,p_Stage      IN VARCHAR2
                                 ,p_Batch      IN VARCHAR2
                                 ,p_Err_Code   IN OUT VARCHAR2
                                 ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Validate_Rerun(p_Branch     VARCHAR2
                             ,p_Stage      VARCHAR2
                             ,p_Batch      VARCHAR2
                             ,p_Err_Code   IN OUT VARCHAR2
                             ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Validate_Run_Batch(p_Branch     VARCHAR2
                                 ,p_Stage      VARCHAR2
                                 ,p_Batch      VARCHAR2
                                 ,p_Err_Code   IN OUT VARCHAR2
                                 ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;

   FUNCTION Fn_Validate_Run_Stage(p_Branch     VARCHAR2
                                 ,p_Stage      VARCHAR2
                                 ,p_Err_Code   IN OUT VARCHAR2
                                 ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
   FUNCTION Fn_Validate_Run_Branch(p_Branch     IN VARCHAR2
                                  ,p_Err_Code   IN OUT VARCHAR2
                                  ,p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;

END Aepks_Eoc_Vals;
/
CREATE OR REPLACE SYNONYM Aepkss_Eoc_Vals FOR Aepks_Eoc_Vals
/