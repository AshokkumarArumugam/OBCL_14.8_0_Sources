CREATE OR REPLACE PACKAGE Cspks_Csdxlupd_Utils AS
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
   
   SFR Number         :
   Changed By         :
   Change Description :
   
  Modified By       : Vinu Priyesh V.A.
  Modified On       : 26-June-2014
  Modified Reason   : During excel upload through import in csdxlupd STTM_CUST_ACCOUNT_BREAKUP is not getting populated due to which
                      while creating account through front end getting error as account already exist. Introducing a global variable
                      to use in insertion of record in STTM_CUST_ACCOUNT_BREAKUP table.
  Search String     : 9NT1606_12_0_3_RETRO_19070663 
   
   -------------------------------------------------------------------------------------------------------
   */
   g_xlupd  VARCHAR2(50); --9NT1606_12_0_3_RETRO_19070663 added
   FUNCTION Fn_Process(p_Action_Code IN VARCHAR2
                      ,p_Csdxlupd    IN OUT Cspks_Csdxlupd_Main.Ty_Csdxlupd
                      ,p_Status      IN OUT VARCHAR2
                      ,p_Err_Code    IN OUT VARCHAR2
                      ,p_Err_Params  IN OUT VARCHAR2) RETURN BOOLEAN;
                      
    PROCEDURE  pr_Gen_Batch_Ref(p_Action_Code IN VARCHAR2
                              ,P_Batch_Ref OUT VARCHAR2
                             ,P_BRANCH IN VARCHAR2
                             ,P_Application_Date IN varchar2
                            ,p_Err_Code    IN OUT VARCHAR2
                            ,p_Err_Params  IN OUT VARCHAR2);

END Cspks_Csdxlupd_Utils;
/