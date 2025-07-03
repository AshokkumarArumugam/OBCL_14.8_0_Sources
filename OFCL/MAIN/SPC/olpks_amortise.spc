CREATE OR REPLACE PACKAGE Olpks_Amortise AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_amortise.SPC
  **
  ** Module   : LD
  **
    This source is part of the Oracle Banking Corporate Lending  Software Product.   
    Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East), 
    Mumbai - 400 063, India.
  
  CHANHE HISTORY-
     
  30-OCT-2003 FCC4.4 Dec 2003 'INT_PERIOD_BASIS'  Development Changes
      Added p_ref_no  as IN VARCHAR2 in FUNCTION fn_amort_sch
  30-DEC-2011 Flexcube V.CL Release 7.10,FS Volume02 Tag15 Changes:Principal and interest amortization Changes.
  12-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15355 changes, for Amortization type of loans, system is not populating contract interest detail table for main interest component
  ----------------------------------------------------------------------------------------------------
  
  **Changed By         : Arvind Baskar
      **Date               : 29-APR-2019
      **Change Description : Hook for fn_amort
      **Search String      : Bug#29692696 
  
    **Changed By         : Chandra Achuta
    **Date               : 24-OCT-2019
    **Change Description : In product spread type as slab/tier spread maintenance subscreen should be dusable in OLDVAMND. 
    **Search String      : Bug#30310926
    
    **Changed By         : Arunprasath
    ** Date              : 18-DEC-2019
    **Change Description : Moratorium type consumer credit changes
    **Search String      : OBCL_14.4_Consumer_Credit
    
     Changed By          : Pallavi R
     Changed On          : 22-Nov-2021
     Change Description  : Rate application is proper after revesal of prepayment (after schedule payment)
     Search String       : OBCL_14.5_Supp_BNTB_#33544434 Changes      
    
     Changed By          : Kavitha Asokan
     Changed On          : 19-Mar-2023
     Change Description  : To call Zero cash flow function for amortize contracts.
     Search String       : Bug#36332455 changes      
    
  ***************************************************************************************************************************/
  --Bug#29692696  changes start
  PROCEDURE Pr_Skip_Handler(p_Stage IN VARCHAR2);
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
  --Bug#29692696  changes end
  g_Contract_Bal_Chk BOOLEAN := FALSE; --Bug#30310926  code added
  --OBCL_14.5_Supp_BNTB_#33544434 Changes Starts
  g_Pre_Payment VARCHAR2(1) := 'N';
  g_Due_Date    DATE;
  --OBCL_14.5_Supp_BNTB_#33544434 Changes Ends
  g_allow_cash_flow_upd  VARCHAR2(1) := 'N'; --Bug#36332455 changes 
  TYPE Ty_Rec_Rate IS RECORD(
    Component Oltbs_Contract_Iccf_Calc.Component%TYPE,
    Rate      Lftbs_Contract_Interest.Rate%TYPE,
    Eff_Date  DATE);

  TYPE Ty_Tab_Rate IS TABLE OF Ty_Rec_Rate INDEX BY BINARY_INTEGER;

  TYPE Ty_Rec_Amort IS RECORD(
    Schedule_Date   DATE,
    Schedule_Days   NUMBER,
    Basis_Amount    NUMBER,
    Princ_Amount    NUMBER,
    Main_Int_Amount NUMBER,
    Factor          NUMBER,
    Mora_Int        NUMBER); --OBCL_14.4_Consumer_Credit

  TYPE Ty_Tab_Amort IS TABLE OF Ty_Rec_Amort INDEX BY BINARY_INTEGER;

  FUNCTION Fn_Amort(p_Action_Code        IN VARCHAR2,
                    p_Ref_No             IN VARCHAR2,
                    p_Latest_Ver_No      IN NUMBER,
                    p_Principal          IN NUMBER,
                    p_Component          IN VARCHAR2,
                    p_Amort_Meth         IN VARCHAR2,
                    p_Eff_Date           IN DATE,
                    p_Proc_Date          IN DATE,
                    h_Tab                IN Olpkss_Recompute_Schedules.Tab_Ty_Comput,
                    p_Vamb_Esn           IN Oltbs_Contract_Event_Log.Event_Seq_No%TYPE,
                    p_Holiday_Chk_Failed OUT BOOLEAN,
                    p_Errmsg             IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Amort(p_Action_Code        IN VARCHAR2,
                    p_Ref_No             IN VARCHAR2,
                    p_Latest_Ver_No      IN NUMBER,
                    p_Principal          IN NUMBER,
                    p_Component          IN VARCHAR2,
                    p_Amort_Meth         IN VARCHAR2,
                    p_Eff_Date           IN DATE,
                    p_Proc_Date          IN DATE,
                    p_Holiday_Chk_Failed OUT BOOLEAN,
                    p_Errmsg             IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Amort_Sch(p_Ref_No      IN Oltbs_Contract.Contract_Ref_No%TYPE, -- 30-OCT-2003 FCC4.4 Dec 2003 'INT_PERIOD_BASIS'  Development Changes
                        p_Component   IN VARCHAR2,
                        p_Tab_Amort   IN Ty_Tab_Amort,
                        p_Amort_Meth  IN CHAR,
                        p_Action_Code IN VARCHAR2,
                        p_Eff_Date    IN DATE,
                        p_Ccy_Code    IN VARCHAR2,
                        p_Int_Rate    IN Lftbs_Contract_Interest.Rate%TYPE,
                        p_Int_Basis   IN Lftbs_Contract_Interest.Interest_Basis%TYPE,
                        p_Errmsg      IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Reduce_Amort(p_Action_Code      IN VARCHAR2, --30-DEC-2011 Flexcube V.CL Release 7.10,FS Volume02 Tag15 Changes
                           p_Ref_No           IN VARCHAR2,
                           p_Principal        IN NUMBER,
                           p_Ccy_Code         IN Cytms_Ccy_Defn.Ccy_Code%TYPE,
                           p_Int_Rate         IN Lftbs_Contract_Interest.Rate%TYPE,
                           p_Int_Basis        IN Lftbs_Contract_Interest.Interest_Basis%TYPE,
                           p_Value_Date       IN DATE,
                           p_Tab_Amort        IN OUT Ty_Tab_Amort,
                           p_Consider_Reamort IN VARCHAR2, --30-DEC-2011 Flexcube V.CL Release 7.10,FS Volume02 Tag15 Changes
                           p_Error_Code       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Rule78_Amort(p_Action_Code      IN VARCHAR2, --30-DEC-2011 Flexcube V.CL Release 7.10,FS Volume02 Tag15 Changes
                           p_Ref_No           IN VARCHAR2,
                           p_Principal        IN NUMBER,
                           p_Ccy_Code         IN Cytms_Ccy_Defn.Ccy_Code%TYPE,
                           p_Int_Rate         IN Lftbs_Contract_Interest.Rate%TYPE,
                           p_Int_Basis        IN Lftbs_Contract_Interest.Interest_Basis%TYPE,
                           p_Value_Date       IN DATE,
                           p_Tab_Amort        IN OUT Ty_Tab_Amort,
                           p_Consider_Reamort IN VARCHAR2, --30-DEC-2011 Flexcube V.CL Release 7.10,FS Volume02 Tag15 Changes
                           p_Error_Code       IN OUT VARCHAR2) RETURN BOOLEAN;

  FUNCTION Fn_Calc_Amort_Schedules(p_Action_Code      IN VARCHAR2, --30-DEC-2011 Flexcube V.CL Release 7.10,FS Volume02 Tag15 Changes
                                   p_Ref_No           IN VARCHAR2,
                                   p_Principal        IN NUMBER,
                                   p_Ccy_Code         IN Cytms_Ccy_Defn.Ccy_Code%TYPE,
                                   p_Int_Rate         IN Lftbs_Contract_Interest.Rate%TYPE,
                                   p_Int_Basis        IN Lftbs_Contract_Interest.Interest_Basis%TYPE,
                                   p_Amort_Meth       IN VARCHAR2,
                                   p_Value_Date       IN DATE,
                                   p_Tab_Amort        IN OUT Ty_Tab_Amort,
                                   p_Consider_Reamort IN VARCHAR2, --30-DEC-2011 Flexcube V.CL Release 7.10,FS Volume02 Tag15 Changes
                                   p_Error_Code       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --12-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15355 changes start here
  FUNCTION Fn_Write_Amort_Int_Details(p_Contract_Ref_No IN Oltbs_Contract.Contract_Ref_No%TYPE,
                                      p_Component       IN Lftbs_Contract_Interest.Component%TYPE,
                                      p_Module          IN Oltbs_Contract.Module_Code%TYPE,
                                      p_Eff_Date        IN Lftbs_Contract_Interest.Value_Date%TYPE,
                                      p_End_Date        IN Lftbs_Contract_Interest.Value_Date%TYPE,
                                      p_Err_Code        IN OUT VARCHAR2,
                                      p_Err_Param       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --12-DEC-2012 FLEXCUBE Universal Banking 3.3.0.0.0CITI_R712 RETRO CITIUS#15355 changes end here

END Olpks_Amortise;
/
CREATE OR REPLACE Synonym Olpkss_Amortise FOR Olpks_Amortise
/