CREATE OR REPLACE PACKAGE Olpks_Lmpks AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_lmpks.SPC
  **
  ** Module   : XXLIMITS
  **
    This source is part of the Oracle Banking Corporate Lending  Software Product.
    Copyright ? 2019 , Oracle and/or its affiliates.  All rights reserved.
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates.
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East),
    Mumbai - 400 063, India.
  
  
  ----------------------------------------------------------------------------------------------------
  */
  /*
      Name            : olpks_lmpks
      Description     : XXLIMITS External Services Package
      Author          : S. Ramesh
      Date Created    : 21/10/96
      Change History  : 26/11/96 -- Revamped Routines after FX TLD
          : 21/01/97 -- Revamped Routines for Distribution
          : 17/02/97 -- Baselined
          : 18/02/97 -- Added Alter_Utils for LD
          : 06/05/97 -- Added fn_rbld_acc for Core Services
          : 29/10/98 -- Added fn_incr_sec_clean_risk and
            fn_decr_sec_clean_risk
                  : 29/06/01 -- Added fn_check_netting_flag
  
   CHANGE HISTORY:
        31-OCT-2001 CITILATAM RETRO SFR 11 :In olpks_lmpks new_util to be defined in spec also.
    15-MAY-2002 FCC 4.0 June 2002 changes fn_delete_util_liab added to delete the utils for liab_id when limit check flag is set as 'N'
        overloaded fn_del_util for passing FORCE_DEL_UTIL
  
   Change History:
  
  Changed By       : Krithika Gopalakrishnan
  Change Description  : Changes done for Multiple Collateral/Pool Linkages. Added Functions
              Fn_Call_Multi_Elcm_Utilization, New_Multi_Util, Fn_New_Multi_Linkages, Fn_Alter_Multi_Util, Decrease_Multi_Utils, Lm_Exec1, Lm_Send1, fn_decr_multi_util.
  Date          : 07/07/2017
  Search String      : OBCL 12.5.0.0.0_Changes done for Multiple Collateral/Pool Linkages
  
  
  Changed By         : Pallavi R
  Change Description : Reverted all changes of 'OBCL 12.5.0.0.0_Changes done for Multiple Collateral/Pool Linkages'
  Date               : 21-Jul-2017
  Search String      : OBCL_12.5.0.0.0_Multi_Linkage changes
  
  Changed By         : Pallavi R
  Date               : 03-Oct-2017
  Change Description : ELCM Integartion Changes
  Search String      : OBCL_12.5.0.0.0_Support_#26866549 Changes
  
  **Changed By         : Krithika G
  **Change Description : OBCL 14.1 Block Changes
  **Search String      : OBCL_14.1_LS_ELCM_Block_Changes
  
  **SFR Number		  : 28378380
  **Changed By        : Krithika G
  **Change Description : Hook changes for ELCM call for future dated ELCM call
  **Search String      : OBCL_14.2_Hook_Change_Fut_ELCM
  
  Changed By         : Ramya/Pallavi
  Changed On         : 21-Apr-2022
  Change Description : Done code changes to track collateral limits for external participants
  Search String      : OBCL_14.5_LS_TRACK_COLLAT_EXT_PARTICIPANT
  -------------------------------------------------------------------------------------------------------*/

  Ovrd_Str          VARCHAR2(2000) := ' ';
  Payment_Reversal  BOOLEAN := FALSE; -- USDFBME 01/AUG/1998 SEE ALSO LMMISC.SQL(update_line)
  Elcm_Call_Counter NUMBER := 0;
  Prev_Elcm_Uref    VARCHAR2(50) := '';
  ELCM_Util_Id      NUMBER := 0;
  Prev_ELCM_ESN     NUMBER := 0;
  
  --OBCL_14.0__ACC_COLLETRAL_LINK changes start
  g_UPLOAD_STATUS  BOOLEAN := FALSE;
  g_UPLOAD_METHOD  VARCHAR2(10):='';
  --OBCL_14.0__ACC_COLLETRAL_LINK changes end
  g_CUSTOM_CALL  BOOLEAN := FALSE;  --OBCL_14.2_Hook_Change_Fut_ELCM

  -- OFCL12.2 Temp changes
  /*OBCL_14.5_LS_TRACK_COLLAT_EXT_PARTICIPANT starts*/
  
 TYPE Ty_Ext_Part IS TABLE OF Lbtbs_Part_Coll_Link_Dtls.Customer_No%TYPE INDEX BY BINARY_INTEGER;
  l_Ext_Part Ty_Ext_Part; 
  
  /*OBCL_14.5_LS_TRACK_COLLAT_EXT_PARTICIPANT ENDS*/
  
  PROCEDURE Pr_Set_Skip_Kernel;
  PROCEDURE Pr_Set_Activate_Kernel;
  PROCEDURE Pr_Set_Skip_Cluster;
  PROCEDURE Pr_Set_Activate_Cluster;
  FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;

  FUNCTION Fn_New_Util(Lm_Det1 Oltbs_Line_Utils%ROWTYPE,
                       Ret_Ovr CHAR := 'N') RETURN INTEGER;

  FUNCTION Fn_Incr_Util(Lm_Det1 Oltbs_Line_Utils%ROWTYPE,
                        Ret_Ovr CHAR := 'N') RETURN INTEGER;

  FUNCTION Fn_Decr_Util(Lm_Det1 Oltbs_Line_Utils%ROWTYPE) RETURN INTEGER;

  FUNCTION Fn_Alter_Util(Lm_Det1 Oltbs_Line_Utils%ROWTYPE,
                         Ret_Ovr CHAR := 'N') RETURN INTEGER;

  -- OFCL12.2 Temp changes Ends

  /*FUNCTION fn_incr_util(lm_det1 oltbs_line_utils%ROWTYPE,ret_ovr CHAR :='N',p_event varchar2,p_esn number,p_force CHAR:='N')
  RETURN INTEGER;
  
  FUNCTION fn_decr_util(lm_det1 oltbs_line_utils%ROWTYPE,ret_ovr CHAR := 'N',p_event varchar2,p_esn number,p_force CHAR:='N') RETURN INTEGER;*/

  FUNCTION Fn_New_Util(Lm_Det1 Oltbs_Line_Utils%ROWTYPE,
                       Ret_Ovr CHAR := 'N',
                       p_Event VARCHAR2,
                       p_Esn   NUMBER) RETURN INTEGER;

  FUNCTION Fn_Incr_Util(Lm_Det1 Oltbs_Line_Utils%ROWTYPE,
                        Ret_Ovr CHAR := 'N',
                        p_Event VARCHAR2,
                        p_Esn   NUMBER,
                        p_Force CHAR := 'N') RETURN INTEGER;

  FUNCTION Fn_Alter_Util(Lm_Det1 Oltbs_Line_Utils%ROWTYPE,
                         Ret_Ovr CHAR := 'N',
                         p_Event VARCHAR2,
                         p_Esn   NUMBER) RETURN INTEGER;

  FUNCTION Fn_Decr_Util(Lm_Det1 Oltbs_Line_Utils%ROWTYPE,
                        Ret_Ovr CHAR := 'N',
                        p_Event VARCHAR2,
                        p_Esn   NUMBER,
                        p_Force CHAR := 'N') RETURN INTEGER;

 FUNCTION Fn_Mature(Ref_Num VARCHAR2, Cust_Id VARCHAR2) RETURN INTEGER;

  FUNCTION Fn_Force_Decr_Util(Lm_Det1 Oltbs_Line_Utils%ROWTYPE)
    RETURN INTEGER;

 FUNCTION Fn_Del_Util(Ref_Num VARCHAR2, Cust_Id VARCHAR2) RETURN INTEGER;
 FUNCTION Fn_Del_Util(Ref_Num VARCHAR2, Cust_Id VARCHAR2, Fn_Id VARCHAR2)
    RETURN INTEGER; -- fcc 4.0 changes
  FUNCTION Fn_Delete_Util_Liab(Pliab VARCHAR2) RETURN BOOLEAN; -- fcc 4.0 changes

  FUNCTION Fn_Reverse_Util(Lm_Det1 Oltbs_Line_Utils%ROWTYPE,
                           Ret_Ovr CHAR := 'N',
                           p_Event VARCHAR2,
                           p_Esn   NUMBER) RETURN INTEGER;

  FUNCTION Fn_Reverse_Event_Util(Lm_Det1 Oltbs_Line_Utils%ROWTYPE,
                                 Ret_Ovr CHAR := 'N',
                                 p_Event VARCHAR2,
                                 p_Esn   NUMBER) RETURN INTEGER;

  FUNCTION Fn_Set_Bal(Lm_Det    Oltbs_Line_Utils%ROWTYPE,
                      Ret_Ovr   CHAR := 'N',
                      Del       CHAR := 'Y',
                      Ret_Code  OUT VARCHAR2,
                      Ret_Param OUT VARCHAR2) RETURN INTEGER;

  FUNCTION Fn_Set_Accr_Int(Lm_Det1 Oltbs_Line_Utils%ROWTYPE) RETURN INTEGER;

  FUNCTION Fn_Rollover_Util(Lm_Det  Oltbs_Line_Utils%ROWTYPE,
                            Ret_Ovr CHAR := 'N') RETURN INTEGER;

  /*FUNCTION fn_incr_cln_risk(cust oltms_customer.customer_no%TYPE,
                net_type VARCHAR2, b_amt NUMBER,
                b_ccy cytms_ccy_defn.ccy_code%TYPE,b_date DATE,
                s_amt NUMBER, s_ccy cytms_ccy_defn.ccy_code%TYPE,
                s_date DATE, ret_ovr CHAR := 'N')
  RETURN INTEGER;
  
  FUNCTION fn_decr_cln_risk(cust oltms_customer.customer_no%TYPE,
                net_type VARCHAR2, b_amt NUMBER,
                b_ccy cytms_ccy_defn.ccy_code%TYPE,b_date DATE,
                s_amt NUMBER, s_ccy cytms_ccy_defn.ccy_code%TYPE,
                s_date DATE, ret_ovr CHAR := 'N') RETURN INTEGER;
  
  FUNCTION  fn_incr_sec_clean_risk
        (
        p_reference_no  oltbs_contract.contract_ref_no%TYPE,
        p_contract_status lmtbs_sec_prestl_risk.matured%TYPE,
        p_cust    oltms_customer.customer_no%TYPE,
        p_buy_sell    char,
        p_internal_sec_id setms_security_master.internal_sec_id%TYPE,
        p_units   setbs_deal_master.deal_quantity%TYPE,
        p_sec_ccy   cytms_ccy_defn.ccy_code%TYPE,
        p_deal_price  number,
        p_dstl_date   date,
        p_netcons_ccy cytms_ccy_defn.ccy_code%TYPE,
        p_netcons_amt number,
        p_mstl_date   date,
        p_ret_ovr   char := 'N'
        )
  RETURN INTEGER;
  
  FUNCTION  fn_decr_sec_clean_risk
        (
        p_reference_no  oltbs_contract.contract_ref_no%TYPE,
        p_contract_status lmtbs_sec_prestl_risk.matured%TYPE,
        p_cust    oltms_customer.customer_no%TYPE,
        p_buy_sell    char,
        p_internal_sec_id setms_security_master.internal_sec_id%TYPE,
        p_units   setbs_deal_master.deal_quantity%TYPE,
        p_sec_ccy   cytms_ccy_defn.ccy_code%TYPE,
        p_deal_price  number,
        p_dstl_date   date,
        p_netcons_ccy cytms_ccy_defn.ccy_code%TYPE,
        p_netcons_amt number,
        p_mstl_date   date,
        p_ret_ovr   char := 'N'
        )
  RETURN INTEGER;
  
  FUNCTION  fn_recalc_prestl_risk
        (
        p_branch    oltms_branch.branch_code%TYPE
        )
  RETURN BOOLEAN;*/ -- OFCL12.2 Not required

 /*FUNCTION fn_rbld_acc(brn VARCHAR2,acc_no VARCHAR2) RETURN INTEGER;--
  
  
 FUNCTION fn_rbld_replicate_acc(brn VARCHAR2,acc_no VARCHAR2) RETURN INTEGER;
  
  
  FUNCTION fn_upd_issuer_risk
      (
      p_branch  oltms_branch.branch_code%TYPE
      )
  RETURN BOOLEAN;*/ -- OFCL12.2 Not reqd

  /*FUNCTION fn_check_netting_flag     -- CITIPLC-3.7-LMNET- Added by Pavan for option to net debit and credit exposures.
              (
              lm_det            IN         oltbs_line_utils%ROWTYPE,
              net_flag          IN OUT     CHAR
              )
  
  RETURN BOOLEAN;*/ -- OFCL12.2 Not reqd

  FUNCTION Fn_Check_Util -- Added by S Rajesh for securities
  (p_Is_Account IN Oltbs_Line_Utils.Is_Account%TYPE,
   p_Ref_No     IN Oltbs_Line_Utils.Ref_No%TYPE,
   p_Amt_Tag    IN Oltbs_Line_Utils.Amt_Tag%TYPE,
   p_Cust_Id    IN Oltbs_Line_Utils.Cust_Id%TYPE,
   p_Branch     IN Oltbs_Line_Utils.Branch%TYPE,
   p_Line_Row   OUT Oltbs_Line_Utils%ROWTYPE,
   p_Flag       OUT VARCHAR2)
  
   RETURN BOOLEAN;

  ---------------------------------------------------------------------------
  -- *********************        W A R N I N G     ****************************
  -- *** THE FOLLOWING ARE SOLELY FOR XXLIMITS INTERNAL USE !!!!!!!!!!!!!! ***
  -- *** MODULES SHOULD   N E V E R   USE THESE FUNCTIONS AND PROCEDURES ***
  -- ***********************************************************************

  FUNCTION Get_Lm_Err RETURN VARCHAR2; -- Display error messages for debug

  /*PROCEDURE lmjob(nod VARCHAR2,job INTEGER); -- OFCL12.2 Not required
  
  PROCEDURE lm_recv(fnid VARCHAR2,ia CHAR,rn VARCHAR2,atg VARCHAR2,ci VARCHAR2,
            lni VARCHAR2,ccy VARCHAR2,amt NUMBER, unc NUMBER,
            int_sec_id VARCHAR2, p_units NUMBER, br VARCHAR2,
            pr VARCHAR2, lbi VARCHAR2, tbas CHAR,tn NUMBER, mdt VARCHAR2,
            cexp VARCHAR2, mcd VARCHAR2,tcue CHAR, tpre CHAR, tcoe CHAR,
            mat CHAR, mamt NUMBER,tstp VARCHAR2,otyp CHAR,
            ocd IN OUT VARCHAR2, oprm IN OUT VARCHAR2,retval OUT NUMBER);*/ -- OFCL12.2 Not reqd

  PROCEDURE Lm_Recv(Fnid   VARCHAR2,
                    Rn     VARCHAR2,
                    Otyp   CHAR,
                    Ocd    IN OUT VARCHAR2,
                    Oprm   IN OUT VARCHAR2,
                    Retval OUT NUMBER);

  PROCEDURE Lm_Recv(Fnid   VARCHAR2,
                    Cu     VARCHAR2,
                    Nty    CHAR,
                    Ba     NUMBER,
                    Bc     VARCHAR2,
                    Bd     VARCHAR2,
                    Sa     NUMBER,
                    Sc     VARCHAR2,
                    Sd     VARCHAR2,
                    Otyp   CHAR,
                    Ocd    IN OUT VARCHAR2,
                    Oprm   IN OUT VARCHAR2,
                    Retval OUT NUMBER);

  /*PROCEDURE lm_recv(p_fnid VARCHAR2, p_reference_no VARCHAR2, p_contract_status CHAR,
  p_cu VARCHAR2, p_buy_sell VARCHAR2, p_int_sec_id VARCHAR2, p_units NUMBER,
  p_sec_ccy VARCHAR2, p_deal_price NUMBER, p_dstl_date VARCHAR2,
  p_ccy VARCHAR2, p_ns_amt NUMBER, p_mstl_date VARCHAR2,
  otyp CHAR, ocd IN OUT VARCHAR2,oprm IN OUT VARCHAR2, retval OUT NUMBER);*/ -- OFCL12.2 Not reqd

  FUNCTION New_Util(Lm_Det1 Oltbs_Line_Utils%ROWTYPE, Ret_Ovr CHAR := 'N') --CITILATAM RETRO SFR 11 CHANGES
   RETURN BOOLEAN; --CITILATAM RETRO SFR 11 CHANGES
  --OBCL_12.5.0.0.0_Support_#26866549 Changes Starts
  FUNCTION Fn_Validate_Auth(p_Ref        IN VARCHAR2,
                            p_Brn        IN VARCHAR2,
                            p_Err_Code   IN OUT VARCHAR2,
                            p_Err_Params IN OUT VARCHAR2) RETURN BOOLEAN;
  --OBCL_12.5.0.0.0_Support_#26866549 Changes Ends
  --OBCL_12.5.0.0.0_Multi_Linkage changes Starts
  FUNCTION Fn_New_Multi_Util(p_Lm_Mas IN Oltb_Contract_Master%ROWTYPE,
                             p_Lm_Det IN Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls,
                             Ret_Ovr  CHAR := 'N') RETURN INTEGER;
  FUNCTION Fn_New_Multi_Util(p_Lm_Mas IN Oltb_Contract_Master%ROWTYPE,
                             p_Lm_Det IN Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls,
                             Ret_Ovr  CHAR := 'N',
                             p_Event  VARCHAR2,
                             p_Esn    NUMBER) RETURN INTEGER;
  FUNCTION Fn_Alter_Multi_Util(p_Lm_Mas IN Oltb_Contract_Master%ROWTYPE,
                               p_Lm_Det IN Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls,
                               Ret_Ovr  CHAR := 'N') RETURN INTEGER;
  FUNCTION Fn_Alter_Multi_Util(p_Lm_Mas IN Oltb_Contract_Master%ROWTYPE,
                               p_Lm_Det IN Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls,
                               Ret_Ovr  CHAR := 'N',
                               p_Event  VARCHAR2,
                               p_Esn    NUMBER) RETURN INTEGER;
  FUNCTION Fn_Incr_Multi_Util(p_Lm_Mas IN Oltb_Contract_Master%ROWTYPE,
                              p_Lm_Det IN Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls,
                              Ret_Ovr  CHAR := 'N') RETURN INTEGER;
  FUNCTION Fn_Incr_Multi_Util(p_Lm_Mas IN Oltb_Contract_Master%ROWTYPE,
                              p_Lm_Det IN Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls,
                              Ret_Ovr  CHAR := 'N',
                              p_Event  VARCHAR2,
                              p_Esn    NUMBER,
                              p_Force  CHAR := 'N') RETURN INTEGER;
  FUNCTION Fn_Decr_Multi_Util(p_Lm_Mas IN Oltb_Contract_Master%ROWTYPE,
                              p_Lm_Det IN Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls)
    RETURN INTEGER;
  FUNCTION Fn_Decr_Multi_Util(p_Lm_Mas IN Oltb_Contract_Master%ROWTYPE,
                              p_Lm_Det IN Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls,
                              Ret_Ovr  CHAR := 'N',
                              p_Event  VARCHAR2,
                              p_Esn    NUMBER,
                              p_Force  CHAR := 'N') RETURN INTEGER;
  FUNCTION Fn_Rev_Multi_Util(p_Lm_Mas IN Oltb_Contract_Master%ROWTYPE,
                             p_Lm_Det IN Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls,
                             Ret_Ovr  CHAR := 'N',
                             p_Event  VARCHAR2,
                             p_Esn    NUMBER) RETURN INTEGER;
  FUNCTION Fn_Rev_Event_Multi_Util(p_Lm_Mas IN Oltb_Contract_Master%ROWTYPE,
                                   p_Lm_Det IN Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls,
                                   Ret_Ovr  CHAR := 'N',
                                   p_Event  VARCHAR2,
                                   p_Esn    NUMBER) RETURN INTEGER;

--OBCL_12.5.0.0.0_Multi_Linkage changes Ends

--OBCL_14.1_LS_ELCM_Block_Changes 

FUNCTION Fn_Call_Elcm_Multi_Util(p_Action       IN VARCHAR2,
                                   p_Lm_Mas       IN Oltb_Contract_Master%ROWTYPE,
                                   p_Lm_Det       IN Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls,
                                   p_Event        IN VARCHAR2,
                                   p_Esn          IN NUMBER,
                                   p_Err_Code     IN OUT VARCHAR2,
                                   p_Error_Params IN OUT VARCHAR2,
                                   p_Force        IN CHAR := 'N',
                                   p_Elcm_Call_Type  IN VARCHAR2)
    RETURN BOOLEAN;

FUNCTION Fn_New_Multi_Util(p_Lm_Mas IN Oltb_Contract_Master%ROWTYPE,
                             p_Lm_Det IN Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls,
                             Ret_Ovr  CHAR := 'N',
                             p_Event  VARCHAR2,
                             p_Esn    NUMBER,
                             p_Elcm_Call_Type IN VARCHAR2) RETURN INTEGER;
             
FUNCTION Fn_Alter_Multi_Util(p_Lm_Mas IN Oltb_Contract_Master%ROWTYPE,
                               p_Lm_Det IN Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls,
                               Ret_Ovr  CHAR := 'N',
                               p_Event  VARCHAR2,
                               p_Esn    NUMBER,
                               p_Elcm_Call_Type IN VARCHAR2) RETURN INTEGER;
                               
FUNCTION Fn_Alter_Multi_Util(p_Lm_Mas IN Oltb_Contract_Master%ROWTYPE,
                               p_Lm_Det IN Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls,
                               Ret_Ovr  CHAR := 'N',
                               p_Elcm_Call_Type IN VARCHAR2) RETURN INTEGER;
                               
FUNCTION Fn_Incr_Multi_Util(p_Lm_Mas IN Oltb_Contract_Master%ROWTYPE,
                              p_Lm_Det IN Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls,
                              Ret_Ovr  CHAR := 'N',
                              p_Event  VARCHAR2,
                              p_Esn    NUMBER,
                              p_Force  CHAR := 'N',
                              p_Elcm_Call_Type IN VARCHAR2) RETURN INTEGER;
                            
FUNCTION Fn_Decr_Multi_Util(p_Lm_Mas IN Oltb_Contract_Master%ROWTYPE,
                              p_Lm_Det IN Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls,
                              Ret_Ovr  CHAR := 'N',
                              p_Event  VARCHAR2,
                              p_Esn    NUMBER,
                              p_Force  CHAR := 'N',
                              p_Elcm_Call_Type IN VARCHAR2) RETURN INTEGER;
                             
FUNCTION Fn_Rev_Multi_Util(p_Lm_Mas IN Oltb_Contract_Master%ROWTYPE,
                             p_Lm_Det IN Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls,
                             Ret_Ovr  CHAR := 'N',
                             p_Event  VARCHAR2,
                             p_Esn    NUMBER,
                             p_Elcm_Call_Type IN VARCHAR2) RETURN INTEGER;
                            
FUNCTION Fn_Rev_Event_Multi_Util(p_Lm_Mas IN Oltb_Contract_Master%ROWTYPE,
                                   p_Lm_Det IN Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls,
                                   Ret_Ovr  CHAR := 'N',
                                   p_Event  VARCHAR2,
                                   p_Esn    NUMBER,
                                   p_Elcm_Call_Type IN vARCHAR2) RETURN INTEGER;

FUNCTION Fn_Decr_Multi_Util(p_Lm_Mas IN Oltb_Contract_Master%ROWTYPE,
                              p_Lm_Det IN Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls,
                              p_Elcm_Call_Mode  IN VARCHAR2)
    RETURN INTEGER;
FUNCTION Fn_Incr_Multi_Util(p_Lm_Mas IN Oltb_Contract_Master%ROWTYPE,
                              p_Lm_Det IN Olpks_Oldtronl_Main.Ty_Tb_Oltbs_Acc_Coll_Link_Dtls,
                              Ret_Ovr  CHAR := 'N',
                              p_Elcm_Call_Type  IN VARCHAR2) RETURN INTEGER;
--OBCL_14.1_LS_ELCM_Block_Changes Ends

END Olpks_Lmpks;
/
CREATE OR REPLACE Synonym Olpkss_Lmpks FOR Olpks_Lmpks
/