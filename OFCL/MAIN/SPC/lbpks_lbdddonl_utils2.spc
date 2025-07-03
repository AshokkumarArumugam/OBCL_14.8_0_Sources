CREATE OR REPLACE PACKAGE Lbpks_Lbdddonl_Utils2 AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdddonl_utils.spc
  **
  ** Module     : Syndication Loans and Commitments
  **
  ** This source is part of the Oracle Banking Software Product.
  ** Copyright Â© 2007 - 2019  Oracle and/or its affiliates.  All rights reserved
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
  
  **Changed By         : Abhik Das
  **Changed On         : 21-May-2020
  **Change Description : Added Code for SOFR Changes
  **Search String      : OBCL_14.4_SOFR_Changes
  -------------------------------------------------------------------------------------------------------
  */
  g_rfr_save_process       VARCHAR2(1) := 'N';-- --OBCL_14.4_SOFR changes
  FUNCTION Fn_Validate_Int_Prepayment(p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;

  FUNCTION Fn_Save_Validations_1(p_Source       IN VARCHAR2,
                                 p_Function_Id  IN VARCHAR2,
                                 p_Action_Code  IN VARCHAR2,
                                 p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;

  FUNCTION Fn_Validate_Before_Events(p_Source       IN VARCHAR2,
                                     p_Function_Id  IN VARCHAR2,
                                     p_Action_Code  IN VARCHAR2,
                                     p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;

  FUNCTION Fn_Populate_Work_Udf(p_Function_Id IN Oltws_Udf_Local_Vals.Function_Id%TYPE,
                                p_Cref        IN Oltws_Udf_Local_Vals.Rec_Key%TYPE,
                                p_Version_No  IN Oltbs_Contract.Latest_Version_No%TYPE,
                                p_Action_Code IN VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Ixfx_Erfx_Check(p_Source       IN VARCHAR2,
                              p_Function_Id  IN VARCHAR2,
                              p_Action_Code  IN VARCHAR2,
                              p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;

  FUNCTION Fn_Process_Events(p_Source       IN VARCHAR2,
                             p_Function_Id  IN VARCHAR2,
                             p_Action_Code  IN VARCHAR2,
                             p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;

  FUNCTION Fn_Add_Amount_Due_Details(p_Source       IN VARCHAR2,
                                     p_Function_Id  IN VARCHAR2,
                                     p_Action_Code  IN VARCHAR2,
                                     p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;

  FUNCTION Fn_Reval(p_Source       IN VARCHAR2,
                    p_Function_Id  IN VARCHAR2,
                    p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;

  FUNCTION Fn_Save_Validations_2(p_Source       IN VARCHAR2,
                                 p_Function_Id  IN VARCHAR2,
                                 p_Action_Code  IN VARCHAR2,
                                 p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;

  FUNCTION Fn_Cascade_Conversion(p_Source       IN VARCHAR2,
                                 p_Function_Id  IN VARCHAR2,
                                 p_Action_Code  IN VARCHAR2,
                                 p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;

  FUNCTION Fn_Save(p_Source       IN VARCHAR2,
                   p_Function_Id  IN VARCHAR2,
                   p_Action_Code  IN VARCHAR2,
                   p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;

  FUNCTION Fn_Date_Validations(p_Source       IN VARCHAR2,
                               p_Function_Id  IN VARCHAR2,
                               p_Action_Code  IN VARCHAR2,
                               p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;

  FUNCTION Fn_Tranche_Participant_Prop(p_Source       IN VARCHAR2,
                                       p_Function_Id  IN VARCHAR2,
                                       p_Action_Code  IN VARCHAR2,
                                       p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;

  FUNCTION Fn_Roll_Value_Dt_Validation(p_Source       IN VARCHAR2,
                                       p_Function_Id  IN VARCHAR2,
                                       p_Action_Code  IN VARCHAR2,
                                       p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;

  FUNCTION Fn_Prop_Flr_Clg(p_Err_Code     OUT VARCHAR2,
                           p_Err_Param    OUT VARCHAR2,
                           p_Source       IN VARCHAR2,
                           p_Function_Id  IN VARCHAR2,
                           p_Action_Code  IN VARCHAR2,
                           p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;
  FUNCTION Fn_End_Of_Input(p_Error_Code   OUT VARCHAR2,
                           p_Source       IN VARCHAR2,
                           p_Function_Id  IN VARCHAR2,
                           p_Action_Code  IN VARCHAR2,
                           p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;

  FUNCTION Fn_Future_Sch_Chk(p_Source       IN VARCHAR2,
                             p_Function_Id  IN VARCHAR2,
                             p_Action_Code  IN VARCHAR2,
                             p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;

  FUNCTION Fn_Rate_Fixing_Check(p_Source       IN VARCHAR2,
                                p_Function_Id  IN VARCHAR2,
                                p_Action_Code  IN VARCHAR2,
                                p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;

  PROCEDURE Pr_Sublimit_Validation(p_Source       IN VARCHAR2,
                                   p_Function_Id  IN VARCHAR2,
                                   p_Action_Code  IN VARCHAR2,
                                   p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);
  PROCEDURE Pr_Chk_Tax_Pref(p_Source       IN VARCHAR2,
                            p_Function_Id  IN VARCHAR2,
                            p_Action_Code  IN VARCHAR2,
                            p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  PROCEDURE Pr_Update_Propagation_Master(p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  PROCEDURE Pr_Delete_Handoff(Pm_Contract_Ref_No VARCHAR2);

  PROCEDURE Pr_Check_Grace_Days(p_Source       IN VARCHAR2,
                                p_Function_Id  IN VARCHAR2,
                                p_Action_Code  IN VARCHAR2,
                                p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  PROCEDURE Pr_Tranche_Currlmt_Val(p_Source       IN VARCHAR2,
                                   p_Function_Id  IN VARCHAR2,
                                   p_Action_Code  IN VARCHAR2,
                                   p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  PROCEDURE Pr_Check_Contract_Input(p_Source       IN VARCHAR2,
                                    p_Function_Id  IN VARCHAR2,
                                    p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  PROCEDURE Pr_Credit_Line(p_Source       IN VARCHAR2,
                           p_Function_Id  IN VARCHAR2,
                           p_Action_Code  IN VARCHAR2,
                           p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  PROCEDURE Pr_Rate_Fix(p_Source       IN VARCHAR2,
                        p_Function_Id  IN VARCHAR2,
                        p_Action_Code  IN VARCHAR2,
                        p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  PROCEDURE Pr_Check_Partdriven_Fee(p_Source       IN VARCHAR2,
                                    p_Function_Id  IN VARCHAR2,
                                    p_Action_Code  IN VARCHAR2,
                                    p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  PROCEDURE Pr_Populate_Reval_Sch(p_Source       IN VARCHAR2,
                                  p_Function_Id  IN VARCHAR2,
                                  p_Action_Code  IN VARCHAR2,
                                  p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  PROCEDURE Pr_Update_Markit_Cont_Id(p_Source       IN VARCHAR2,
                                     p_Function_Id  IN VARCHAR2,
                                     p_Action_Code  IN VARCHAR2,
                                     p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  PROCEDURE Pr_Set_Linkage_Seq(p_Source       IN VARCHAR2,
                               p_Function_Id  IN VARCHAR2,
                               p_Action_Code  IN VARCHAR2,
                               p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  PROCEDURE Pr_Mesg_Handoff_On_Save(p_Source       IN VARCHAR2,
                                    p_Function_Id  IN VARCHAR2,
                                    p_Action_Code  IN VARCHAR2,
                                    p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);
  --PAlr Changes Starts
  /* PROCEDURE Pr_Set_Rollover_Defaults(p_Source       IN VARCHAR2,
                                       p_Function_Id  IN VARCHAR2,
                                       p_Action_Code  IN VARCHAR2,
                                       p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

     PROCEDURE Pr_Rollover_Validations(p_Source       IN VARCHAR2,
                                      p_Function_Id  IN VARCHAR2,
                                      p_Action_Code  IN VARCHAR2,
                                      p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  PROCEDURE Pr_Set_Roll_Basis_Defaults(p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);
  */
  --PAlr Changes Ends
  FUNCTION Fn_Rollover_Vdbal_Validate(p_Source       IN VARCHAR2,
                                      p_Function_Id  IN VARCHAR2,
                                      p_Action_Code  IN VARCHAR2,
                                      p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;
  PROCEDURE Pr_Clearing_Line(p_Source       IN VARCHAR2,
                             p_Function_Id  IN VARCHAR2,
                             p_Action_Code  IN VARCHAR2,
                             p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  FUNCTION Fn_Validate_Dd_Amount(l_Date         DATE,
                                 p_Source       IN VARCHAR2,
                                 p_Function_Id  IN VARCHAR2,
                                 p_Action_Code  IN VARCHAR2,
                                 p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;

  FUNCTION Fn_Chk_Schedule_Present(p_Source       IN VARCHAR2,
                                   p_Function_Id  IN VARCHAR2,
                                   p_Action_Code  IN VARCHAR2,
                                   p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;
END Lbpks_Lbdddonl_Utils2;
/