CREATE OR REPLACE PACKAGE Olpks_Batch_Afeeliq AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : Olpks_Batch_Afeeliq.spc
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
  
  **Changed By         : Sowmya Bitra
  **Date               : 21-April-2023
  **Change Description : ECA Support for Adhoc Fees
  **Search String      : OBCL_14.8_ECA_Changes
  
  **Changed By         : Sowmya Bitra
  **Date               : 06-June-2023
  **Change Description : EAC Check during LS FWDFELR
  **Search String      : Bug#35420647 Changes
  
  -------------------------------------------------------------------------------------------------------
  */
  FUNCTION Fn_Process_For_Contract(p_Reference    IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                   p_Event_Seq_No IN Oltb_Contract.Latest_Event_Seq_No%TYPE,
                                   p_Felr_Esn     OUT Oltb_Contract.Latest_Event_Seq_No%TYPE,
                                   p_Err_Code     IN OUT VARCHAR2,
                                   p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Process_Fwdfelr(p_Module           IN Oltbs_Contract.Module_Code%TYPE,
                              p_Branch           IN Oltbs_Contract.Branch%TYPE,
                              p_User_Id          IN VARCHAR2,
                              p_Processing_Date  IN DATE,
                              p_Commit_Frequency IN NUMBER,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
	
  --OBCL_14.8_ECA_Changes Start	
  FUNCTION Fn_Batch_Fwdfelr(p_Module           IN Oltbs_Contract.Module_Code%TYPE,
                            p_Branch           IN Oltbs_Contract.Branch%TYPE,
                            p_User_Id          IN VARCHAR2,
                            p_Processing_Date  IN DATE,
							p_Contract_Ref_No  IN Oltbs_Contract.Contract_Ref_No%TYPE,  --Bug#35420647 Changes
                            p_Commit_Frequency IN NUMBER,
							p_Eac_Msgid        IN OUT VARCHAR2, --Bug#35420647 Changes
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
  RETURN VARCHAR2;
  
  FUNCTION Fn_Create_Eca_Request(p_Module           IN Oltbs_Contract.Module_Code%TYPE,
                                 p_Branch           IN Oltbs_Contract.Branch%TYPE,
                                 p_User_Id          IN VARCHAR2,
                                 p_Processing_Date  IN DATE,    
                                 p_Commit_Frequency IN NUMBER,                            
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2)
  RETURN VARCHAR2; 	
  --OBCL_14.8_ECA_Changes End
  
END Olpks_Batch_Afeeliq;
/
CREATE OR REPLACE Synonym Olpkss_Batch_Afeeliq FOR Olpks_Batch_Afeeliq
/