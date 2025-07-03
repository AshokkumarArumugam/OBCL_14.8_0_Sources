CREATE OR REPLACE PACKAGE Olpks_Lm_Misc AS
  /*----------------------------------------------------------------------------------------------------
  **
  ** File Name  : olpks_lm_misc.SPC
  **
  ** Module  : XXLIMITS
  **
    This source is part of the Oracle Banking Corporate Lending  Software Product.   
    Copyright © 2007 - 2019  Oracle and/or its affiliates.  All rights reserved.   
    No part of this work may be reproduced, stored in a retrieval system, adopted or transmitted in any form or by any means, electronic, mechanical, photographic, graphic, optic recording or otherwise, translated in any language or computer language, without the prior written permission of Oracle and/or its affiliates. 
  
    Oracle Financial Services Software Limited.
    Oracle Park, Off Western Express Highway,
    Goregaon (East), 
    Mumbai - 400 063, India.
  ----------------------------------------------------------------------------------------------------
  */
  /*-----CHANGE HISTORY
  --12-APR-2002 FCC4.0 overloaded function get_valid_lines
  --26-APR-2002 FCC4.0 June-2002 added Fn_validate_limit,Fn_check_liab,fn_ins_liab
  --08 -MAY-2002 FCC 4.0 CHANGES  changing the liab_id type from varchar2 to base table type.
  --09-MAY-2002 FCC 4.0 June 2002 changes deleting the overloaded get_valid_lines as x9$(aspac)check is done instead while calling
    09-aug-2002 FCC4.1 AUG 2002 functions to update the overline od date.
  -- 11-JUN-2003 FCC 4.3 AUG 2003 DEVELOPMENT 
    OVERLOADED PROCEDURE ccyamt1_to_amt2
  17-OCT-2003 RETRO FCC4.4 DEC-2003 TIL#5276 20-FEB-2003  gRefNo changed to vahr(30) from (23) 
              as lmtb_line_util ref no is 30 as is assigned to this.
  19-jul-2005 FCC 4.6.2 JULY 2005 CITI CHANGES LS63 senthil --add the package variable  gcontractrefno,gproduct_type,gliqd,greverse,gblocked_reval_amt
  28-jul-2005 FCC 4.6.2 JULY 2005 CITI CHANGES LS63 senthil --add the package variable  gpayment_reverse,gpayment_delete 
  06-JUL-2005 FCC V.CL 7.1 RELEASE Variable gpayment_reverse_delete added by svs on 06/07/06 .
  06-Jun-2016 OFCL standalone changes, commented not required code. Search string--- OFCL12.2 Not required
  
    **Changed By         : Pallavi R
    **Date               : 25-Jul-2017
    **Change Description : Changes done for Multiple Collateral/Pool Linkages
    **Search String      : OBCL_12.5.0.0.0_Multi_Linkage changes 
  
  **Changed By         : Pallavi R
  **Date               : 25-Oct-2017
  **Change Description : ELCM External LOV Changes
  **Search String      : OBCL_12.5.0.0.0_Support_#26924371_LOV Changes    
  ------------------------------------------------------------------------------------------------------------------------------------  */

  TYPE Ovrd_Rec IS RECORD(
    o_Code VARCHAR2(255),
    Msg    VARCHAR2(2000));
  TYPE Ovrd_Tab_Typ IS TABLE OF Ovrd_Rec INDEX BY BINARY_INTEGER;
  Ovrd_Tab   Ovrd_Tab_Typ;
  Ovrd_Idx   NUMBER := 1;
  Ovrd_Codes VARCHAR2(32000) := ''; -- USDFBME UPGRADE 10-SEPT-1999 SUNNY
  Ovrd_Str   VARCHAR2(32000) := ''; -- USDFBME UPGRADE 10-SEPT-1999 SUNNY

  Ovrd_Mod       VARCHAR2(2) := NULL;
  Debug_On       BOOLEAN := FALSE;
  Rebuild_Tenors BOOLEAN := FALSE;
  Reval_Running  BOOLEAN := FALSE;
  Line_Ccy_Chg   BOOLEAN := FALSE;
  Err_Msg        VARCHAR2(2000) := ' ';

  -- CITIPLC : Changes for Displaying Line Expired Warning
  Gisacc CHAR(1);
  --gRefNo VARCHAR2(23);
  Grefno         VARCHAR2(30); -- RETRO FCC4.4 DEC-2003 Til#5276changed to 30 as lmtb_line_util ref no is 30 as is assigned to this.
  Gcontract_Text VARCHAR2(30) := NULL;
  Gaccount_Text  VARCHAR2(30) := NULL;

  -- FCC 4.6.2 JULY 2005 CITI LS63 START 
  Gcontract_No            Oltbs_Contract_Master.Contract_Ref_No%TYPE; -- this variable get hte value in olpks_init.fn_call_limmit
  Gproduct_Type           VARCHAR2(1);
  Gliqd                   VARCHAR2(1) := 'N'; -- this variable get the value in olpks_manual_liquidation.FN_CONTRACT_LIQUDATION and used in lmtr_chg_util trigger
  Greverse                VARCHAR2(1) := 'N'; --  this variable get the value in ldpks_reverse.fn_contract_reversal and used in lmtr_chg_util tigger
  Gblocked_Reval_Amt      NUMBER; -- this variable gett hte value in lmpks_reval.and used in olpks_lm_misc.update_line.  
  Gdelete                 VARCHAR2(1) := 'N';
  Gpayment_Reverse        VARCHAR2(1) := 'N'; --  this variable get the value in ldpks_reverse.fn_contract_reversal and used in lmtr_chg_util tigger
  Gpayment_Reverse_Delete VARCHAR2(1) := 'N'; --    FCC V.CL 7.1 RELEASE added by svs on 06/07/06 .
  Gvami_Delete            VARCHAR2(1) := 'N'; --    FCC V.CL 7.1 RELEASE added by svs on 08/07/06 .
  Gpayment_Delete         VARCHAR2(1) := 'N'; --  this variable get the value in ldpks_reverse.fn_contract_reversal and used in lmtr_chg_util tigger
  --used in olpks_lm_misc.update_line.    
  -- FCC 4.6.2 JULY 2005 CITI LS63 END  

  -- The following are needed for triggers to communicate with each other

  PROCEDURE Dbg(Msg VARCHAR2);
  FUNCTION Get_Txt(Fld_Val VARCHAR2, Lang VARCHAR2) RETURN VARCHAR2;

 /*PROCEDURE ccyamt1_to_amt2(brn VARCHAR2,ccy1 VARCHAR2, ccy2 VARCHAR2,
                amt1 NUMBER, amt2 OUT NUMBER);
                
 PROCEDURE ccyamt1_to_amt2(brn VARCHAR2,ccy1 VARCHAR2, ccy2 VARCHAR2, amt1 NUMBER, p_Type VARCHAR2, amt2 OUT NUMBER); 
                */ -- OFCL12.2 Not required

  PROCEDURE Set_Err(Ecode VARCHAR2, Emsg VARCHAR2);
  FUNCTION Set_Ovr(Dst BOOLEAN := FALSE) RETURN INTEGER;
  PROCEDURE Get_Ovr;

  /*FUNCTION get_spot_date RETURN DATE;
  FUNCTION get_tenor(l_id lmtms_liab.liab_id%TYPE,l_cd VARCHAR2,l_sr NUMBER,l_tnr NUMBER) 
  RETURN NUMBER ;
  PRAGMA RESTRICT_REFERENCES(get_tenor,WNDS,WNPS);
  
  FUNCTION fmt_amt(c VARCHAR2,n NUMBER) RETURN VARCHAR2;
  PRAGMA RESTRICT_REFERENCES(fmt_amt,WNDS,WNPS);
  
  FUNCTION recalc_tenor(l_id lmtms_liab.liab_id%TYPE, 
              ln_id lmtms_limits.line_cd%TYPE,
              ln_sr NUMBER, ln_ccy VARCHAR2) 
  RETURN BOOLEAN;
  
  FUNCTION lm_eod(b oltms_branch.branch_code%TYPE)
  RETURN BOOLEAN;
  
  PROCEDURE cascade_tenors(liab_id lmtms_liab.liab_id%TYPE,line_cd CHAR, 
              line_serial NUMBER,tnr NUMBER ,
                           old_xs NUMBER,xs_amt NUMBER);
  
  */ -- OFCL12.2 Not reqd

  FUNCTION Get_Valid_Lines(Cust    IN Oltms_Customer.Customer_No%TYPE,
                           Brn     IN Oltms_Branch.Branch_Code%TYPE,
                           Prod    IN VARCHAR2,
                           Ccy     IN Cytms_Ccy_Defn.Ccy_Code%TYPE,
                           Tnr     IN NUMBER := 0,
                           Get_Mat IN BOOLEAN := FALSE) RETURN VARCHAR2;
  --fcc 4.0 changes overloading get_valid_lines
  /*FUNCTION get_valid_lines(cust  IN  oltms_customer.customer_no%TYPE,
         brn  IN  oltms_branch.branch_code%TYPE,
         prod  IN VARCHAR2,  
         ccy  IN  cytms_ccy_defn.ccy_code%TYPE,
         tnr  IN  number := 0,
         get_mat IN  BOOLEAN := FALSE,
        liab  IN lmtms_liab.liab_id%TYPE
        )
  RETURN VARCHAR2;*/

  -- fcc 4.0 changes changing varchar2 of liab_id to lmtms_liab.liab_id%TYPE

 /*PROCEDURE update_line(liab_br VARCHAR2, liab_id VARCHAR2, 
              line_id VARCHAR2, util_ccy VARCHAR2,
              util_amt IN OUT NUMBER, mat_amt IN OUT NUMBER, 
              uncoll_amt IN OUT NUMBER, tenor NUMBER,
              line_type OUT CHAR,line_ccy OUT VARCHAR2,
              ml OUT CHAR);
  -- fcc 4.0 changes changing varchar2 of liab_id to lmtms_liab.liab_id%TYPE
 PROCEDURE update_line(liab_br VARCHAR2, liab_id lmtms_liab.liab_id%TYPE, 
              line_id VARCHAR2, util_ccy VARCHAR2,
              util_amt IN OUT NUMBER, mat_amt IN OUT NUMBER, 
              uncoll_amt IN OUT NUMBER, tenor NUMBER);
  */

 /*PROCEDURE update_line(liab_br VARCHAR2, liab_id lmtms_liab.liab_id%TYPE, 
              line_id VARCHAR2, util_ccy VARCHAR2,
              util_amt IN OUT NUMBER, mat_amt IN OUT NUMBER, 
              uncoll_amt IN OUT NUMBER, tenor NUMBER,
              line_type OUT CHAR,line_ccy OUT VARCHAR2,
              ml IN OUT CHAR, util_amt_line_ccy NUMBER, mat_amt_line_ccy NUMBER, uncoll_amt_line_ccy NUMBER, operation CHAR);
  
 PROCEDURE update_line(liab_br VARCHAR2, liab_id lmtms_liab.liab_id%TYPE, 
              line_id VARCHAR2, util_ccy VARCHAR2,
              util_amt IN OUT NUMBER, mat_amt IN OUT NUMBER, 
              uncoll_amt IN OUT NUMBER, tenor NUMBER,
              util_amt_line_ccy NUMBER, mat_amt_line_ccy NUMBER,
             uncoll_amt_line_ccy NUMBER, operation CHAR);*/ -- OFCL12.2 Not reqd

  PROCEDURE Add_Ovrd(o_Code VARCHAR2, o_Str VARCHAR2);

  PROCEDURE Clr_Ovrd;

  /*FUNCTION get_cust_clean_risk(c_id VARCHAR2,d1 DATE,liab_ccy VARCHAR2,
 liab_br VARCHAR2) RETURN NUMBER;
  
  FUNCTION get_cust_clean_risk(c_id VARCHAR2,d1 DATE) RETURN NUMBER;*/ -- OFCL112.2 Not required

  -- fcc 4.0 changes changing varchar2 of liab_id to oltms_customer.liability_no%TYPE
  -- FUNCTION get_liab_clean_risk(l_id oltms_customer.liability_no%TYPE,d1 DATE) RETURN NUMBER; -- OFCL12.2 Not required

  /*------------------------------------------------------------------------------------------*/
  /* Functions get_cust_sec_clean_risk and get_liab_sec_clean_risk added for securities module*/
  /* 29/10/98                                                                                 */
  /*------------------------------------------------------------------------------------------*/

  /*FUNCTION get_cust_sec_clean_risk 
      (
      c_id    oltms_customer.customer_no%TYPE,
      p_date  DATE,
      p_liab_br  oltms_branch.branch_code%TYPE,
      p_liab_ccy  lmtms_liab.limit_ccy%TYPE
      )
  RETURN NUMBER;
  
  FUNCTION get_liab_sec_clean_risk 
      (
      p_liab_id    oltms_customer.liability_no%TYPE,
      p_date    DATE,
      p_liab_br  oltms_branch.branch_code%TYPE,
      p_liab_ccy  lmtms_liab.limit_ccy%TYPE
      )
  RETURN NUMBER;*/ -- OFCL12.2 Not required

  /*------------------------------------------------------------------------------------------*/

  /*PROCEDURE mnt_rebuild_line(lb VARCHAR2,LN VARCHAR2,ls NUMBER, lccy VARCHAR2);
  PROCEDURE pr_change_main_line(p_liab_id VARCHAR2,p_line_cd VARCHAR2,
                p_line_serial NUMBER,p_main_line VARCHAR2);
  
  
  FUNCTION Fn_check_liab(
                P_cust     oltms_customer.CUSTOMER_NO%TYPE,
               p_liab     oltms_customer.LIABILITY_NO%TYPE,
               p_version_no   oltws_customer.version_no%type
               )
  RETURN BOOLEAN;
  
  FUNCTION Fn_validate_limit(
           P_liab_id         IN   lmtm_liab.LIAB_ID%TYPE,
          p_overall_limit    IN   lmtm_liab.OVERALL_LIMIT%TYPE,
          p_fx_clean_limit    IN   lmtm_liab.FX_CLEAN_RISK_LIMIT%TYPE,
          p_sec_clean_limit    IN   lmtm_liab.SEC_CLEAN_RISK_LIMIT%TYPE,
          p_sec_pstl_limit    IN   lmtm_liab.SEC_PSTL_RISK_LIMIT%TYPE,
          P_check_what      IN   VARCHAR2,
          P_error_code    OUT  ertbs_msgs.ERR_CODE%TYPE          
            )
  RETURN BOOLEAN;
  
  FUNCTION fn_ins_liab(
              p_rowid   IN  VARCHAR2,
             P_errcode OUT VARCHAR2
             )
  RETURN BOOLEAN;
  
  
  
  
  FUNCTION fn_reset_liab_util(
                  p_cust      IN  oltms_customer.customer_no%TYPE,
                 p_liab_old    IN   oltms_customer.LIABILITY_NO%TYPE,
                 p_err_code    OUT   VARCHAR2,
                 p_err_param  OUT   VARCHAR2
                 )
  RETURN BOOLEAN;
  FUNCTION Fn_close_liab(
                p_cust      IN     oltms_customer.customer_no%TYPE,    
                p_liab_old    IN   oltms_customer.LIABILITY_NO%TYPE,
               p_err_code    OUT   VARCHAR2,
               p_err_param  OUT   VARCHAR2
              )
  RETURN BOOLEAN;
  
  FUNCTION Fn_recalc_liab_util(
                  p_cust      IN     oltms_customer.customer_no%TYPE,
                 p_liab_new    IN   oltms_customer.LIABILITY_NO%TYPE,
                 p_err_code    OUT   VARCHAR2,
                 p_err_param  OUT   VARCHAR2
                 )
  RETURN BOOLEAN;
  FUNCTION fn_check_cif_util(
                  p_cust      IN     oltms_customer.customer_no%TYPE,
                 p_err_code    OUT   VARCHAR2,
                 p_err_param  OUT   VARCHAR2
                  )
  RETURN BOOLEAN;*/ -- OFCL12.2 Not required

  --fcc4.1 oct 2002 changes for overline update
  ---- OFCL12.2 Not required
  /*function fn_cust_acc_overline_update (
           p_branch  sttms_cust_account.branch_code%type
          ,p_liab_id sttm_cust_account.liab_id%type
          ,p_line_cd lmtm_limits.line_cd%type
          ,p_line_serial lmtm_limits.line_serial%type
               )return boolean ; -- called in update lines
  
  
  function fn_cust_acc_overline_update (
           p_branch sttms_cust_account.branch_code%type
          ) return boolean; -- called in eod */
  ---- OFCL12.2 Not required
  --fcc4.1 oct 2002 changes for overline update

  -- 11-JUN-2003 FCC 4.3 AUG 2003 START
  -- overloaded procedure added

  -- 11-JUN-2003 FCC 4.3 AUG 2003 END

  --FCC 4.6.2 JULY 2005 CITI CHANGES  START 
  PROCEDURE Reset_Pkg_Variable;
  --FCC 4.6.2 JULY 2005 CITI CHANGES  END
--OBCL_12.5.0.0.0_Support_#26924371_LOV Changes Starts
/*--OBCL_12.5.0.0.0_Multi_Linkage changes Starts
  FUNCTION Get_Valid_Lines(Cust       IN Oltms_Customer.Customer_No%TYPE,
                           Brn        IN Oltms_Branch.Branch_Code%TYPE,
                           Prod       IN VARCHAR2,
                           Ccy        IN Cytms_Ccy_Defn.Ccy_Code%TYPE,
                           Tnr        IN NUMBER,
                           Get_Mat    IN BOOLEAN := FALSE,
                           p_Line_Det OUT Sypks_Utils.Ty_Line_Id_Details)
    RETURN BOOLEAN;
  FUNCTION Get_Valid_Collat(Cust       IN Oltms_Customer.Customer_No%TYPE,
                            Brn        IN Oltms_Branch.Branch_Code%TYPE,
                            Prod       IN VARCHAR2,
                            Ccy        IN Cytms_Ccy_Defn.Ccy_Code%TYPE,
                            Tnr        IN NUMBER,
                            Get_Mat    IN BOOLEAN := FALSE,
                            p_Line_Det OUT Sypks_Utils.Ty_Line_Id_Details)
    RETURN BOOLEAN;
  FUNCTION Get_Valid_Pool(Cust       IN Oltms_Customer.Customer_No%TYPE,
                          Brn        IN Oltms_Branch.Branch_Code%TYPE,
                          Prod       IN VARCHAR2,
                          Ccy        IN Cytms_Ccy_Defn.Ccy_Code%TYPE,
                          Tnr        IN NUMBER,
                          Get_Mat    IN BOOLEAN := FALSE,
                          p_Line_Det OUT Sypks_Utils.Ty_Line_Id_Details)
    RETURN BOOLEAN;
  --OBCL_12.5.0.0.0_Multi_Linkage changes Ends*/
--OBCL_12.5.0.0.0_Support_#26924371_LOV Changes Ends
END Olpks_Lm_Misc;
/
CREATE OR REPLACE Synonym Olpkss_Miscz FOR Olpks_Lm_Misc
/