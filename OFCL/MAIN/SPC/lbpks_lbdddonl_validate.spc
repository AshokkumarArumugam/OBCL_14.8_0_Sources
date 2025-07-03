CREATE OR REPLACE PACKAGE Lbpks_Lbdddonl_Validate AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdddonl_validate.spc
  **
  ** Module     : Syndication Loans and Commitments
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
  
  SFR Number         :
  Changed By         :
  Change Description :
  
  **Changed By         : Ravi
  **Change Description : Canada BA Changes --Support for Discounted loan in LS
  **Search String      : Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R721 FS Vol1 Tag06 Changes 
  **Changed On         : 01-SEP-2019
  
  **Changed By         : RAMYA M
  **Change Description :  OBCL_14.5_LS_PARTICIPANT_BA_RATE_CHANGES 
  **Search String      :  OBCL_14.5_LS_PARTICIPANT_BA_RATE_CHANGES 
  **Changed On         : 06-FEB-2022
  
  **Changed By         : Sudharshini Balaji
  **Date               : 17-JUN-2022
  **Change Description : Added code for updating No.of schedules for Daily frequency with ignore holiday as N
  **Search String      : Bug#34230742
  -------------------------------------------------------------------------------------------------------
  */
  PROCEDURE Pr_Refresh_Iccf_Main_Comp(p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                                      p_Action_Code  IN VARCHAR2,
                                      p_Function_Id  IN VARCHAR2,
                                      p_Source       IN VARCHAR2,
                                      Raise_Fail     IN VARCHAR2 DEFAULT 'N');

  PROCEDURE Pr_Subsystem_Warning(p_Function_Id  IN VARCHAR2,
                                 p_Source       VARCHAR2,
                                 p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                                 p_Action_Code  IN VARCHAR2);

  PROCEDURE Pr_Populate_Int_Exch_Date(p_Function_Id  IN VARCHAR2,
                                      p_Source       VARCHAR2,
                                      p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  FUNCTION Fn_Del_Fee_Details(p_Error_Code   IN OUT VARCHAR2,
                              p_Error_Param  IN OUT VARCHAR2,
                              Paction        IN VARCHAR2,
                              p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                              p_Function_Id  IN VARCHAR2,
                              p_Source       IN VARCHAR2) RETURN BOOLEAN;

  PROCEDURE Pr_Create_Line_Group(p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  PROCEDURE Pr_Set_Reporting_Ccy(p_Function_Id  IN VARCHAR2,
                                 p_Source       VARCHAR2,
                                 p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);
  PROCEDURE Pr_Part_Default(p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  PROCEDURE Pr_Gtemp_Validate_Part(p_Flag         VARCHAR2,
                                   p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                                   p_Action_Code  IN VARCHAR2,
                                   p_Function_Id  IN VARCHAR2,
                                   p_Source       VARCHAR2,
                                   p_Err_Code     IN OUT VARCHAR2,
                                   p_Err_Params   IN OUT VARCHAR2);

  FUNCTION Fn_Restore_Fee_Details(p_Wrk_Lbdddonl    IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                                  p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                  p_End_Date        IN DATE,
                                  p_Error_Code      IN OUT VARCHAR2,
                                  p_Error_Param     IN OUT VARCHAR2,
                                  p_Function_Id     IN VARCHAR2,
                                  p_Source          VARCHAR2) RETURN BOOLEAN;

  PROCEDURE Pr_Get_Tranche_Linkages(p_Function_Id  IN VARCHAR2,
                                    p_Source       VARCHAR2,
                                    p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                                    p_Action_Code  IN VARCHAR2);

  PROCEDURE Pr_Block_Conversion(p_Function_Id  IN VARCHAR2,
                                p_Source       VARCHAR2,
                                p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  PROCEDURE Pr_Populate_Stmt_Day(p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  PROCEDURE Pr_Check_Drawdown_Input(p_Function_Id  IN VARCHAR2,
                                    p_Source       VARCHAR2,
                                    p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                                    p_Action_Code  IN VARCHAR2);

  PROCEDURE Pr_Tranche_Currlmt_Chk(p_Function_Id  IN VARCHAR2,
                                   p_Source       VARCHAR2,
                                   p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                                   p_Action_Code  IN VARCHAR2);
  FUNCTION Fn_Check_Tr_Pik_Mrg(p_Action_Code  IN VARCHAR2,
                               p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;

  PROCEDURE Pr_Create_Dflt_Schedules(p_Function_Id  IN VARCHAR2,
                                     p_Source       VARCHAR2,
                                     p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                                     p_Action_Code  IN VARCHAR2);

  FUNCTION Fn_Check_Partial_Prepmt_Flag(p_Function_Id  IN VARCHAR2,
                                        p_Source       VARCHAR2,
                                        p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;

  PROCEDURE Pr_Chk_Part_Margin(p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                               p_Function_Id  IN VARCHAR2,
                               p_Source       IN VARCHAR2);

  FUNCTION Fn_Validate_Int_Pay_Prop(p_Contract_Ref_No Oltbs_Amount_Due_Cs.Contract_Ref_No%TYPE)
    RETURN VARCHAR2;

  FUNCTION Fn_Comp_Type(p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                        p_Component    IN VARCHAR2) RETURN VARCHAR2;

  PROCEDURE Pr_Calc_Enddt(p_Function_Id  IN VARCHAR2,
                          p_Source       VARCHAR2,
                          p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  PROCEDURE Pr_Calc_Uncovered_Amt(p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  PROCEDURE Pr_Get_Linkage_Details(p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                                   p_Function_Id  IN VARCHAR2,
                                   p_Source       IN VARCHAR2);

  /*PROCEDURE PR_CREATE_QUERY(P_LINKAGE_TYPE  VARCHAR2,
  P_LINKAGE_GROUP VARCHAR2,
  p_wrk_lbdddonl  IN OUT lbpks_lbdddonl_Main.Ty_lbdddonl,
  p_Action_Code   IN VARCHAR2);*/
  --PAlr Changes Starts
  /* PROCEDURE Pr_Roll_Pi_Check(p_Function_Id  IN VARCHAR2,
                             p_Source       VARCHAR2,
                             p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);
  
  FUNCTION Fn_Outstanding_Amt(p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN NUMBER;
  
    
  FUNCTION Fn_Insert_Roll_Int_Comp(p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;
  
  FUNCTION Fn_Insert_Roll_Margin_Comp(p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;
  
  PROCEDURE Pr_Roll_Maturity_Date(p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                                  p_Function_Id  IN VARCHAR2,
                                  p_Source       IN VARCHAR2);
  
  PROCEDURE Pr_Roll_Maturity_Dt_Validation(p_Function_Id  IN VARCHAR2,
                                           p_Source       VARCHAR2,
                                           p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);
  
  FUNCTION Fn_Chk_Roll_Reprice(p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;*/
  --PAlr Changes Ends
  FUNCTION Fn_Rollover_Osamt(p_Contract_Ref_No      IN Oltbs_Contract_Rollover.Contract_Ref_No%TYPE,
                             p_Rollover_Amount_Type IN Oltbs_Contract_Rollover.Rollover_Amount_Type%TYPE,
                             p_Maturity_Date        IN Oltbs_Contract_Rollover.Maturity_Date%TYPE,
                             p_Tot_Outstanding_Amt  OUT Oltbs_Contract_Rollover.Rollover_Amt%TYPE)
    RETURN BOOLEAN;
  FUNCTION Fn_Od_Liqd_Sch_Chk(p_Function_Id  IN VARCHAR2,
                              p_Source       VARCHAR2,
                              p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;
  PROCEDURE Pr_Get_Pdt_Reval_Reqd(p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  PROCEDURE Pr_Part_Fee(p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                        k              NUMBER,
                        p_Action_Code  IN VARCHAR2);

  PROCEDURE Pr_Populate_Escrow(p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  PROCEDURE Pr_Ins_Contract_Liq_Order(p_Function_Id  IN VARCHAR2,
                                      p_Source       VARCHAR2,
                                      p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                                      p_Action_Code  IN VARCHAR2);

  PROCEDURE Pr_Sch_Redn(p_Function_Id  IN VARCHAR2,
                        p_Source       VARCHAR2,
                        p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                        p_Action_Code  IN VARCHAR2);

  PROCEDURE Pr_Check_Schedules(p_Function_Id  IN VARCHAR2,
                               p_Source       VARCHAR2,
                               p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                               p_Action_Code  IN VARCHAR2);

  PROCEDURE Pr_Redefine_Sch(p_Function_Id  IN VARCHAR2,
                            p_Source       VARCHAR2,
                            p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                            p_Action_Code  IN VARCHAR2);

  PROCEDURE Pr_Fee_Ammend(p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  PROCEDURE Pr_Validate_Schedule_Dates(p_Function_Id  IN VARCHAR2,
                                       p_Source       VARCHAR2,
                                       p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                                       p_Action_Code  IN VARCHAR2);

  PROCEDURE Pr_Validate_Amount(p_Function_Id  IN VARCHAR2,
                               p_Source       VARCHAR2,
                               p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                               p_Action_Code  IN VARCHAR2);

  PROCEDURE Pr_Explode_Schedules(p_Function_Id  IN VARCHAR2,
                                 p_Source       VARCHAR2,
                                 p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                                 p_Action_Code  IN VARCHAR2);
                                 
  --Bug#34230742 CHANGES STARTS --
  FUNCTION Fn_Daily_Schedules_Update
        (  p_Function_Id  IN VARCHAR2,
           p_Source       IN VARCHAR2,
           p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
           p_SOFR_Flg     IN VARCHAR2,
           p_Err_Code     IN OUT VARCHAR2,
           p_Err_Params   IN OUT VARCHAR2
           ) RETURN BOOLEAN;
--Bug#34230742 CHANGES   ENDS --                            

  PROCEDURE Pr_Validate_Schedules_Amort(p_Function_Id  IN VARCHAR2,
                                        p_Source       VARCHAR2,
                                        p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                                        p_Action_Code  IN VARCHAR2);

  PROCEDURE Pr_Check_Sgen_Validation(p_Function_Id  IN VARCHAR2,
                                     p_Source       VARCHAR2,
                                     p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                                     p_Action_Code  IN VARCHAR2);

  FUNCTION Fn_Check_Rate_Preferences(p_Contract_Ref_No VARCHAR2,
                                     p_Linkage_Group   VARCHAR2,
                                     p_Wrk_Lbdddonl    IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl)
    RETURN BOOLEAN;

  PROCEDURE Pr_Chk_Pram_Partial_Prepmt(p_Function_Id  IN VARCHAR2,
                                       p_Source       VARCHAR2,
                                       p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  FUNCTION Fn_Validation(p_Contract_Ref_No IN Oltbs_Contract_Master.Contract_Ref_No%TYPE,
                         p_Flag            VARCHAR2,
                         p_Wrk_Lbdddonl    IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                         p_Function_Id     IN VARCHAR2,
                         p_Source          VARCHAR2) RETURN BOOLEAN;

  PROCEDURE Pr_Validate_Md_For_Holiday(p_Function_Id  IN VARCHAR2,
                                       p_Source       VARCHAR2,
                                       p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  PROCEDURE Pr_Populate_Iccf_Main_Comp(p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);

  PROCEDURE Pr_Refresh_Bidding(p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl,
                               p_Function_Id  IN VARCHAR2,
                               p_Source       VARCHAR2);

  --Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R721 FS Vol1 Tag06 Changes starts
  PROCEDURE PR_VALIDATE_BA_DETAILS(p_Source       VARCHAR2,
                                   p_Function_Id  IN VARCHAR2,
                                   p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);
  --Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R721 FS Vol1 Tag06 Changes ends                                             

  --OBCL_14.5_LS_PARTICIPANT_BA_RATE_CHANGES  Starts
    PROCEDURE PR_VALIDATE_PART_BA_DETAILS(p_Source       VARCHAR2,
                                   p_Function_Id  IN VARCHAR2,
                                   p_Wrk_Lbdddonl IN OUT Lbpks_Lbdddonl_Main.Ty_Lbdddonl);
   --OBCL_14.5_LS_PARTICIPANT_BA_RATE_CHANGES  ENDS
  
END Lbpks_Lbdddonl_Validate;
/