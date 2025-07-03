CREATE OR REPLACE PACKAGE Lfpks_Fee_Recalc AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name    : lfpks_fee_recalc.SPC
  **
  ** Module       : CF
  This source is part of the Oracle Banking Corporate Lending  Software Product.   
  Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
  No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
  
  Oracle Financial Services Software Limited.
  Oracle Park, Off Western Express Highway,
  Goregaon (East), 
  Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------------------
  */
  /* Change History - Start
  FCC 6.2.2 04-Jan-2005 Rajiv Kumar Phase2 -- Package created to Recalculate Fee on change of Margin Maintenance
  FCC 6.2.2 03-Mar-2005 Rajiv Kumar Phase2 ITR1 SFR# 62 -- Package reorganized.
  
  Change History - End
         
         **Changed By         : Pallavi R
         **Date               : 29-Apr-2020
         **Change Description : Fee Recalc Changes
         **Search String      : OBCL_14.4_LS_Fee_Recalc Changes  

  **Changed By         : Sowmya Bitra
  **Date               : 27-April-2023
  **Change Description : ECA Support for FRFX
  **Search String      : OBCL_14.8_ECA_Changes 		 
    
    *******************************************************************************************************/
	--OBCL_14.4_LS_Fee_Recalc Changes Starts
  g_Batch_Recalc        VARCHAR2(1) := 'N'; 
  g_Simulate_Recalc_Eca VARCHAR2(1) := 'N';  --OBCL_14.8_ECA_Changes
  g_List_Of_Date        VARCHAR2(32767) := NULL;
  g_List_Of_Amount_Tags VARCHAR2(32767) := NULL;
  g_List_Of_Amounts     VARCHAR2(32767) := NULL;
  g_List_Of_Amount_Ccys VARCHAR2(32767) := NULL;  
  FUNCTION Fn_Liqd_Frfx(p_Contract_Ref_No     IN Oltbs_Contract.Contract_Ref_No%TYPE,
                        p_Processing_Date     IN DATE,
                        p_List_Of_Amount_Tags IN VARCHAR2,
                        p_List_Of_Amounts     IN VARCHAR2,
                        p_List_Of_Amount_Ccys IN VARCHAR2,
						p_List_Of_Dates       IN VARCHAR2,
                        p_Error_Code          IN OUT VARCHAR2,
                        p_Error_Parameter     IN OUT VARCHAR2) RETURN BOOLEAN;
						--OBCL_14.4_LS_Fee_Recalc Changes Ends
  FUNCTION Fn_Process_For_Product(p_Module           IN Oltbs_Contract.Module_Code%TYPE,
                                  p_Branch           IN Oltms_Branch.Branch_Code%TYPE,
                                  p_Product          IN Oltbs_Contract.Product_Code%TYPE,
                                  p_Processing_Date  IN DATE,
                                  p_Commit_Frequency IN Oltbs_Automatic_Process_Master.Eod_Commit_Count%TYPE,
                                  p_Error_Code       IN OUT VARCHAR2,
                                  p_Error_Parameter  IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Repickup_Fee(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                           p_Processing_Date IN DATE,
                           p_Error_Code      IN OUT VARCHAR2,
                           p_Error_Parameter IN OUT VARCHAR2) RETURN BOOLEAN;
  -- Fee Rate Changes -- aji start
  FUNCTION Fn_Fee_Revision(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                           p_Processing_Date IN DATE,
                           p_Value_Date      IN DATE,
                           p_Error_Code      IN OUT VARCHAR2,
                           p_Error_Parameter IN OUT VARCHAR2)
  
   RETURN BOOLEAN;
  -- Fee Rate Changes -- aji end
  
 --OBCL_14.8_ECA_Changes Start  
 FUNCTION Fn_Batch_Eca_Fee_Recalc(p_Module           IN Oltbs_Contract.Module_Code%TYPE,
                                   p_Branch           IN Oltms_Branch.Branch_Code%TYPE,
                                   p_Product          IN Oltbs_Contract.Product_Code%TYPE,
                                   p_Processing_Date  IN DATE,
                                   p_Commit_Frequency IN Oltbs_Automatic_Process_Master.Eod_Commit_Count%TYPE,
                                   p_Error_Code       IN OUT VARCHAR2,
                                   p_Error_Parameter  IN OUT VARCHAR2) 
  RETURN VARCHAR2;
  FUNCTION Fn_Batch_Fee_Recalc(p_Module           IN Oltbs_Contract.Module_Code%TYPE,
                               p_Branch           IN Oltms_Branch.Branch_Code%TYPE,
                               p_Product          IN Oltbs_Contract.Product_Code%TYPE,
                               p_Processing_Date  IN DATE,
                               p_Commit_Frequency IN Oltbs_Automatic_Process_Master.Eod_Commit_Count%TYPE,
                               p_Error_Code       IN OUT VARCHAR2,
                               p_Error_Parameter  IN OUT VARCHAR2) 
  RETURN VARCHAR2;
  --OBCL_14.8_ECA_Changes End

END Lfpks_Fee_Recalc;
/
CREATE OR REPLACE Synonym Lfpkss_Fee_Recalc FOR Lfpks_Fee_Recalc
/