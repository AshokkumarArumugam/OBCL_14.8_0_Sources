CREATE OR REPLACE PACKAGE lbpks_batch_cluster AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_batch_cluster.spc
  **
  ** Module     : Syndication Loans and Commitments
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Oracle Banking Corporate Lending  Software Product.   Copyright Â© 2018.  All rights reserved
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
  Created By         :  Vineeth T M
  Change Description :

  **  Changed By         :
  **  Changed On         :
  **  Change Description :
  **  Search String      :

  Changed By         : Vineeth T M
  Changed On         : 14-Jul-2022
  Search String      : bug#34373625 changes
  Change Reason      : Adding hook for Fn_Process_Atomic_Task_Batch
  -------------------------------------------------------------------------------------------------------
  */

  
  --bug#34373625 changes starts
    Function Fn_Pre_Process_Atomic_Task_Batch(p_Branch                 IN VARCHAR2,
                                        p_Userid                 IN VARCHAR2,
                                        p_Module                 IN Oltbs_Contract.Module_Code%TYPE,
                                        p_Current_Accrual_Ref_No IN OUT Oltbs_Auto_Function_Details.Current_Accrual_Ref_No%TYPE,
                                        p_Processing_Date        IN DATE,
                                        p_Process_Name           IN Oltbs_Automatic_Process_Master.Process_Name%TYPE,
                                        p_Product                IN Oltbs_Contract.Product_Code%TYPE,
                                        p_Commit_Frequency       IN Oltbs_Automatic_Process_Master.Bod_Commit_Count%TYPE,
                                        p_Task_Rowid             IN ROWID,
                                        p_Processor_Seq_No       IN INTEGER,
                                        p_Fn_Call_Id in out Number,
                                        p_Tb_Cluster_Data in out Global.Ty_Tb_Cluster_Data,    
                                        p_Error_Code             IN OUT VARCHAR2,
                                        p_Error_Parameter        IN OUT VARCHAR2)
      RETURN BOOLEAN;

     Function Fn_Post_Process_Atomic_Task_Batch(p_Branch                 IN VARCHAR2,
                                        p_Userid                 IN VARCHAR2,
                                        p_Module                 IN Oltbs_Contract.Module_Code%TYPE,
                                        p_Current_Accrual_Ref_No IN OUT Oltbs_Auto_Function_Details.Current_Accrual_Ref_No%TYPE,
                                        p_Processing_Date        IN DATE,
                                        p_Process_Name           IN Oltbs_Automatic_Process_Master.Process_Name%TYPE,
                                        p_Product                IN Oltbs_Contract.Product_Code%TYPE,
                                        p_Commit_Frequency       IN Oltbs_Automatic_Process_Master.Bod_Commit_Count%TYPE,
                                        p_Task_Rowid             IN ROWID,
                                        p_Processor_Seq_No       IN INTEGER,
                                        p_Fn_Call_Id in out Number,
                                        p_Tb_Cluster_Data in out Global.Ty_Tb_Cluster_Data,    
                                        p_Error_Code             IN OUT VARCHAR2,
                                        p_Error_Parameter        IN OUT VARCHAR2)
      RETURN BOOLEAN;
      --bug#34373625 changes ends

END lbpks_batch_cluster;
/
CREATE or replace SYNONYM lbpkss_batch_cluster FOR lbpks_batch_cluster
/