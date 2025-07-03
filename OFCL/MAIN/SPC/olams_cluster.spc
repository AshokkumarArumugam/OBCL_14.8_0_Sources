CREATE OR REPLACE PACKAGE Olams_Cluster AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : Olams_Cluster.spc
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

  
  Changed By         : Gomathi G
  Changed On         : 20-NOV-2020
  Change Description : Provided Pre and post hooks to system proceed with VAMI if Commitment is fully utilized during AutoCap process
  Search String      : OBCL_14.3_SUPPORT_BUG#32170309
  
  **Changed By         : Chandra Achuta
  **Date               : 18-MAR-2022
  **Change Description : Hook request for FWDVAMI case.
  **Search String      : Bug#33613314  
  
  **Changed By         : Chandra Achuta
  **Date               : 02-JUN-2022
  **Change Description : Hook request for error code skip case.
  **Search String      : Bug#34224604  
  -------------------------------------------------------------------------------------------------------
  */
--OBCL_14.3_SUPPORT_BUG#32170309  changes starts
FUNCTION fn_pre_auto_cap_process(p_contract_ref_no    IN oltb_contract.contract_ref_no%TYPE
                             ,p_total_interest_amt IN oltb_amount_due.amount_due%TYPE
                             ,p_total_reverse_avl  IN oltb_contract_preference.interest_reserve_availability%TYPE
                             ,p_processing_date    IN DATE
                             ,pfuncid              IN VARCHAR2
                             ,p_err_code           IN OUT VARCHAR2
                             ,p_err_param          IN OUT VARCHAR2
							  )
    RETURN BOOLEAN;
FUNCTION fn_post_auto_cap_process(p_contract_ref_no    IN oltb_contract.contract_ref_no%TYPE
                             ,p_total_interest_amt IN oltb_amount_due.amount_due%TYPE
                             ,p_total_reverse_avl  IN oltb_contract_preference.interest_reserve_availability%TYPE
                             ,p_processing_date    IN DATE
                             ,pfuncid              IN VARCHAR2
                             ,p_err_code           IN OUT VARCHAR2
                             ,p_err_param          IN OUT VARCHAR2
							 )
    RETURN BOOLEAN;
--OBCL_14.3_SUPPORT_BUG#32170309 Changes ends
--Bug#33613314  Changes Starts 
  FUNCTION Fn_Pre_Vami(Ref_No       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                        Vamb_Esn     IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                        Vami_Ver     IN Oltbs_Contract_Master.Version_No%TYPE,
                        Proc_Date    IN DATE,
                        p_Mode       IN CHAR,
                        p_Event_Code IN Oltbs_Contract_Event_Log.Event_Code%TYPE DEFAULT 'VAMI'
                       ) RETURN BOOLEAN;

  FUNCTION Fn_Post_Vami(Ref_No       IN Oltbs_Contract.Contract_Ref_No%TYPE,
                        Vamb_Esn     IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                        Vami_Ver     IN Oltbs_Contract_Master.Version_No%TYPE,
                        Proc_Date    IN DATE,
                        p_Mode       IN CHAR,
                        p_Event_Code IN Oltbs_Contract_Event_Log.Event_Code%TYPE DEFAULT 'VAMI'
                       ) RETURN BOOLEAN;
--Bug#33613314  Changes Ends
  --Bug#34224604  Changes Starts
  FUNCTION Fn_Vami(Ref_No            IN Oltbs_Contract.Contract_Ref_No%TYPE,
                   Vamb_Esn          IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                   Vami_Ver          IN Oltbs_Contract_Master.Version_No%TYPE,
                   Proc_Date         IN DATE,
                   p_Mode            IN CHAR,
                   p_Event_Code      IN Oltbs_Contract_Event_Log.Event_Code%TYPE DEFAULT 'VAMI',
                   p_fn_call_id      IN OUT NUMBER,
                   p_Tb_cluster_data IN OUT GLOBAL.Ty_Tb_Cluster_Data)
    RETURN BOOLEAN;

  FUNCTION fn_amendment_reversal(p_contract_ref_no IN OUT oltbs_contract.contract_ref_no%TYPE,
                                 p_event_seq_no    IN oltbs_contract_event_log.event_seq_no%TYPE,
                                 p_backup_required IN VARCHAR2,
                                 p_error_code      IN OUT VARCHAR2,
                                 p_error_params    IN OUT VARCHAR2,
                                 p_fn_call_id      IN OUT NUMBER,
                                 p_Tb_cluster_data IN OUT GLOBAL.Ty_Tb_Cluster_Data)
    RETURN BOOLEAN;
  --Bug#34224604  Changes Ends 					   
END Olams_Cluster;
/
CREATE OR REPLACE Synonym Olamss_Cluster FOR Olams_Cluster


/