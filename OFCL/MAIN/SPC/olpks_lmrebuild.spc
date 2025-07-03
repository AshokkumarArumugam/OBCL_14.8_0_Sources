CREATE OR REPLACE PACKAGE Olpks_Lmrebuild AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_lmrebuild.SPC
  **
  ** Module    : LOANS and DEPOSITS
  **
    This source is part of the Oracle Banking Corporate Lending  Software Product.   
    Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East), 
    Mumbai - 400 063, India.
  
  **Changed By         : Pallavi R
    **Date               : 25-Jul-2017
    **Change Description : Changes done for Multiple Collateral/Pool Linkages
    **Search String      : OBCL_12.5.0.0.0_Multi_Linkage changes 
  
  **Changed By         : Krithika G
    **Date               : 25-Jul-2017
    **Change Description : Changes done for VAMI Multiple Linkages
    **Search String      : OBCL_12.5_Vami Linkage Changes
  
  **Changed By         : Krithika G
    **Date               : 01-Sep-2017
    **Change Description : Changes done for Liability Utilization without Linkages
    **Search String      : OBCL_12.5_#26734911
  ----------------------------------------------------------------------------------------------------
  */

  FUNCTION Fn_Rebuild_All_Limits(Pmodule    IN Oltbs_Contract.Module_Code%TYPE,
                                 Perrorcode IN OUT Ertbs_Msgs.Err_Code%TYPE)
    RETURN BOOLEAN;

  FUNCTION Fn_Rebuild_Limits(Pcontractrefno IN Oltbs_Contract.Contract_Ref_No%TYPE,
                             Perrorcode     IN OUT Ertbs_Msgs.Err_Code%TYPE)
    RETURN BOOLEAN;
  --CITIUS-LS#SRT1452 STP
  --VB addition start on 19-DEC-2005 for CITIUS, Till#273
  FUNCTION Fn_Rebuild_Limits(Pcontractrefno    IN Oltbs_Contract.Contract_Ref_No%TYPE,
                             p_Old_Credit_Line IN VARCHAR2,
                             Perrorcode        IN OUT Ertbs_Msgs.Err_Code%TYPE)
    RETURN BOOLEAN;
  --VB addition end on 19-DEC-2005 for CITIUS, Till#273
  --CITIUS-LS#SRT1452 STP

  -- OFCL12.2 ITR2 SFR#25168683 Changes Starts
  FUNCTION Fn_Rebuild_Limits(Pcontractrefno IN Oltbs_Contract.Contract_Ref_No%TYPE,
                             Perrorcode     IN OUT Ertbs_Msgs.Err_Code%TYPE,
                             p_Event        IN VARCHAR2,
                             p_Esn          IN NUMBER) RETURN BOOLEAN;
  -- OFCL12.2 ITR2 SFR#25168683 Changes Ends
  --OBCL_12.5.0.0.0_Multi_Linkage changes Starts
  FUNCTION Fn_Rebuild_Multi_Link(p_Cont_Rec IN OUT Oltb_Contract_Master%ROWTYPE,
                                 --OBCL_12.5_#26734911
                                 p_Acc_Multi_Link IN OUT Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls,
                                 p_Mode           IN VARCHAR2,
                                 Perrorcode       IN OUT Ertbs_Msgs.Err_Code%TYPE)
    RETURN BOOLEAN;
  --OBCL_12.5.0.0.0_Multi_Linkage changes Ends
  --OBCL_12.5_Vami Linkage Changes
  FUNCTION Fn_Vami_Multi_Link(p_Cont_Rec IN OUT Oltb_Contract_Master%ROWTYPE,
                              --OBCL_12.5_#26734911
                              p_Acc_Multi_Link IN OUT Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls,
                              /*p_Mode           IN VARCHAR2,*/
                              Perrorcode IN OUT Ertbs_Msgs.Err_Code%TYPE)
    RETURN BOOLEAN;
  --OBCL_12.5_Vami Linkage Changes Ends

  -- DSBR Changes starts

  FUNCTION Fn_Dsbr_Multi_Link(p_Cont_Rec          IN OUT Oltb_Contract_Master%ROWTYPE,
                              p_Acc_Multi_Link    IN OUT Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls,
                              p_Rec_Cont_Dsbr_Sch IN OUT Oltbs_Contract_Dsbr_Sch%ROWTYPE,
                              Perrorcode          IN OUT Ertbs_Msgs.Err_Code%TYPE)
    RETURN BOOLEAN;

-- DSBR Changes ends

END Olpks_Lmrebuild;
/
CREATE OR REPLACE Synonym Olpkss_Lmrebuild FOR Olpks_Lmrebuild
/