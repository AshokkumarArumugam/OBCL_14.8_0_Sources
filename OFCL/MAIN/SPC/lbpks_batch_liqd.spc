CREATE OR REPLACE PACKAGE Lbpks_Batch_Liqd AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : Lbpks_Batch_Liqd.spc
  **
  ** Module     : Loans and Deposits
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Oracle Banking Corporate Lending  Software Product.   Copyright © 2018.  All rights reserved
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
  CHANGE HISTORY
  
  SFR Number         :
  Changed By         :
  Change Description :
  
  Changed By         : Palanisamy M
  Date               : 29-May-2023
  Change Description : Hook for FN_PROCESS_FOR_ROLL 
  Search String      : Bug#35432990   
  -------------------------------------------------------------------------------------------------------
  */
  
  --Bug#35432990 Changes starts
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
  FUNCTION Fn_Skip_Custom RETURN BOOLEAN;
  --Bug#35432990 Changes ends


  FUNCTION Fn_Process_For_Roll(p_Branch             IN Oltbs_Contract.Branch%TYPE,
                               p_User_Id            IN VARCHAR2,
                               p_Processingdate     IN DATE,
                               p_Module             IN VARCHAR2,
                               p_Eca_Check_Required IN VARCHAR2,
                               p_Eca_Ref_No         IN VARCHAR2,
                               p_Contract_Ref_No    IN Lbtbs_Contract_Consol_Master.Contract_Ref_No%TYPE,
                               p_Tranche_Ref_No     IN Lbtbs_Contract_Consol_Master.Tranche_Ref_No%TYPE,
                               p_Rollover_Status    IN Lbtbs_Contract_Consol_Master.Rollover_Status%TYPE,
                               p_Value_Date         IN Lbtbs_Contract_Consol_Master.Value_Date%TYPE,
                               p_Jobseqno           IN Lbtbs_Job_Queue.Seq_No%TYPE,
							   --Bug#34941996 Start
							   p_Elcm_Msgid         IN OUT VARCHAR2,
							   p_rfr_Msgid          IN OUT VARCHAR2,
							   --Bug#34941996 End
                               Perrorcode           IN OUT VARCHAR2,
                               Perrorparam          IN OUT VARCHAR2)
    RETURN VARCHAR2;
  FUNCTION Fn_Process_Roll_Eca(p_Branch          IN Oltbs_Contract.Branch%TYPE,
                               p_User_Id         IN VARCHAR2,
                               p_Contract_Ref_No IN Lbtbs_Contract_Consol_Master.Contract_Ref_No%TYPE,
                               p_Processingdate  IN DATE,
                               p_Eca_Clean_Reqd  IN VARCHAR2,
                               p_Eca_Ref_No      OUT VARCHAR2,
                               p_Error_Code      IN OUT VARCHAR2,
                               p_Error_Parameter IN OUT VARCHAR2)
    RETURN VARCHAR2;
  FUNCTION Fn_Process_Del_Eca(p_Branch          IN Oltbs_Contract.Branch%TYPE,
                              p_User_Id         IN VARCHAR2,
                              p_Contract_Ref_No IN Lbtbs_Contract_Consol_Master.Contract_Ref_No%TYPE,
                              p_Ref_No          IN VARCHAR2,
                              p_Err_Code        IN OUT VARCHAR2,
                              p_Err_Param       IN OUT VARCHAR2)
    RETURN VARCHAR2;
END Lbpks_Batch_Liqd;
/
CREATE OR REPLACE Synonym Lbpkss_Batch_Liqd FOR Lbpks_Batch_Liqd
/