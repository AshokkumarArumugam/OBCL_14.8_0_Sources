CREATE OR REPLACE PACKAGE Lfpks_Lfdacfin_Lsprop AS
  /*-----------------------------------------------------------------------------------------------------
    **
    ** File Name  : Lfpks_Lfdacfin_Lsprop.sql
    **
    ** Module     : The ICCF
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
    Search String      :
  
  -----------------------------------------------------------------
    */
  FUNCTION Fn_Ls_Process(p_Source IN VARCHAR2,
                         --p_Source_Operation IN VARCHAR2,
                         p_Function_Id  IN VARCHAR2,
                         p_Action_Code  IN VARCHAR2,
                         p_Event_Code   IN VARCHAR2,
						 p_Event_Value_Date IN DATE,
                         p_Lfdacfin     IN Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                         p_Wrk_Lfdacfin IN OUT Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                         p_Err_Code     IN OUT VARCHAR2,
                         p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
 
  FUNCTION Fn_Delete_Contract(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                              p_Version_No      IN Oltbs_Contract.Latest_Version_No%TYPE,
                              p_Latest_Esn      IN Oltbs_Contract.Latest_Event_Seq_No%TYPE,
                              p_Error_Code      IN OUT VARCHAR2,
                              p_Error_Parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Process_Backup(p_Contract_Ref_No IN Lftbs_Accr_Fee_Master.Contract_Ref_No%TYPE,
                             p_Action_Code     IN VARCHAR2,
                             p_Proceed_Ahead   OUT BOOLEAN,
                             p_Error_Code      IN OUT VARCHAR2,
                             p_Error_Parameter IN OUT VARCHAR2,
                             p_Delete_Backup   IN VARCHAR2 DEFAULT 'Y' --Fcc4.2 OPS related changes..
                             ) RETURN BOOLEAN;
        
  FUNCTION Fn_Reverse(p_Source           IN VARCHAR2,
                      p_Source_Operation IN VARCHAR2,
                      p_Function_Id      IN VARCHAR2,
                      p_Action_Code      IN VARCHAR2,
                      p_Lfdacfin         IN Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                      p_Wrk_Lfdacfin     IN OUT Lfpks_Lfdacfin_Main.Ty_Lfdacfin,
                      p_Err_Code         IN OUT VARCHAR2,
                      p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
END Lfpks_Lfdacfin_Lsprop;
/
CREATE OR REPLACE Synonym Lfpkss_Lfdacfin_Lsprop FOR Lfpks_Lfdacfin_Lsprop
/