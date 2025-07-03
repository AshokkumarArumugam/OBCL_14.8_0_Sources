CREATE OR REPLACE PACKAGE Lbpks_Lbrateset_Utils IS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lfpks_ratefix_utils.spc
  **
  ** Module     : Loans and Deposits
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
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
  
  Created by        :
  Created Date      :
  Description       :
  
  **Changed By         : Pallavi R
  **Date               : 17-Jan-2019
  **Change Description : Rate fixing changes for multiple components                         
  **Search String      : OBCL_14.3_#Multi_RTFX Changes 

  **  Changed By         : Vineeth T M
  **  Changed On         : 27-Sep-2023
  **  Change Description : Pass interest details to function validating rate fixing details
  **  Search String      : OBCL_14.7_SUPP#35835575_ADL_1 changes  
  
  -------------------------------------------------------------------------------------------------------
  */
  FUNCTION Fn_Validate_Rate_Set(p_Source           IN Cotms_Source.Source_Code%TYPE,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Wrk_Lbcintrs     IN OUT Lbpks_Lbcintrs_Main.Ty_Lbcintrs,
                                p_Calling_Function IN VARCHAR2,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Upload(p_Source       IN VARCHAR2,
                     p_Function_Id  IN VARCHAR2,
                     p_Action_Code  IN VARCHAR2,
                     p_Wrk_Lbcintrs IN OUT Lbpks_Lbcintrs_Main.Ty_Lbcintrs,
                     p_Event_Seq_No IN VARCHAR2,
                     p_Err_Code     IN OUT VARCHAR2,
                     p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Query(p_Source       IN VARCHAR2,
                    p_Function_Id  IN VARCHAR2,
                    p_Action_Code  IN VARCHAR2,
                    p_Wrk_Lbcintrs IN OUT Lbpks_Lbcintrs_Main.Ty_Lbcintrs,
                    p_Loop_Count   IN NUMBER,
                    p_Rate_Fix     IN VARCHAR2,
                    p_Err_Code     IN OUT VARCHAR2,
                    p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Validate_Rate_Fix(p_Source      IN Cotms_Source.Source_Code%TYPE,
                                p_Function_Id IN VARCHAR2,
                                p_Action_Code IN VARCHAR2,
                                --OBCL_14.3_#Multi_RTFX Changes Starts
                                --p_Wrk_Lbcintrs IN OUT Lbpks_Lbcintrs_Main.Ty_Lbcintrs,
								p_Cont_Ref            IN VARCHAR2,
                                p_Rate_Fixing_Details IN OUT Lbtb_Rate_Fixing_Details%ROWTYPE,
                                --OBCL_14.3_#Multi_RTFX Changes Ends     
                                p_lftb_contract_interest in lftbs_contract_interest%rowtype,--OBCL_14.7_SUPP#35835575_ADL_1 changes
                                p_Err_Code   IN OUT VARCHAR2,
                                p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
END Lbpks_Lbrateset_Utils;
/