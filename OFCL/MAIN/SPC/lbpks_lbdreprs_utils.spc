CREATE OR REPLACE PACKAGE lbpks_lbdreprs_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdreprs_utils.spc
  **
  ** Module     : Oracle Lending
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

  SFR Number         :25983705
  Changed By         :Kirandeep Kaur
  Change Description :unable to save record
  SFR                :12.4_25983705
  
  **Changed By         : Ranjan Kumar
  **Change Description :  block_ref_gen_has for contract created from contract
  **Search String      :  14.1_SUP_EL_BLOCK_REF_CHANGES

  **Changed By         : Ravi
  **Change Description : Canada BA Changes --Support for Discounted loan in LS
  **Search String      : Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R721 FS Vol1 Tag06 Changes
  **Changed On         : 01-SEP-2019

  Changed By          : ANUSHA K
  Change Description  : OBCL_14.3_LS_Sublimit_Validation_Changes
  Search String       : OBCL_14.3_LS_Sublimit_Validation_Changes
  Changed On          : 27-feb-2019
  
  Changed By          : Sowmya Bitra
  Change Description  : Gateway and auto auth changes 
  Search String       : OBCL_14.5_LS_Gateway Changes
  Changed On          : 20-May-2021
  
  Changed By          : Ramya M
  Change Description  : OBCL_14.5_LS_PARTICIPANT_BA_RATE_CHANGES
  Search String       : OBCL_14.5_LS_PARTICIPANT_BA_RATE_CHANGES
  Changed On          : 15-FEB-2022
  
  Changed By          : Ramya M
  Change Description  : Added validation for participant BA Rates
  Search String       : OBCL_14.5_LS_PARTICIPANT_BA_RATE_CHANGES
  Changed On          : 13-MAR-2022
   Changed By         : Rajni Kumari
    Date               : 24-Aug-2022
    Change Description : Bug 34487912 - LBDREPRS: EXCHANGE RATE SUB SCREEN VALUES NOT AUTO POPULATED OR RETAINED  
    Search String      : OBCL_14.5_SMTB_#34487912
	
  **Changed By         : Sowmya Bitra
  **Date               : 01-Dec-2022
  **Change Description : Changes for editing rate fixing required flag during split reprice transaction
  **Search String      : Bug#34819588	
 
  **  Changed By         : Mohan Pal
  **  Changed On         : 12-Jan-2024
  **  Change Description : Moved the Margin component population logic and created a new function Fn_process_Margin_Comp.
                           Provided pre and post hook on the above function.
  **  Search String      : Bug#361679355
 
  -------------------------------------------------------------------------------------------------------
  */

  g_prm_tranche_ccy   VARCHAR2(30);
  g_prm_cont_ccy      VARCHAR2(30);
  g_prm_maturity_date DATE;
  g_prm_contract_ref  VARCHAR2(30);
  g_prm_chk           VARCHAR2(30);
  G_PRM_ESN           Number;
  g_prm_installment   VARCHAR2(30);
  g_prm_sch           VARCHAR2(30);
  g_prm_flrcl_base    VARCHAR2(30);
  g_prm_tranche_ref   VARCHAR2(30);
  g_prm_advices       VARCHAR2(30);
  g_prm_module        VARCHAR2(30);
  g_prm_amount        NUMBER;
  g_prm_maturity      DATE;
  g_prm_irfx          VARCHAR2(1);
  g_prm_cont_stat     VARCHAR2(30);
  g_PRM_EXFX_REQ      varchar2(1);
  G_prm_settlement_pickup varchar2(1);
   g_prm_int_flag         varchar2(1);



  FUNCTION fn_base_rate_chk(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_contract_ref_no  varchar2,
                            p_split_serial_no  number,
                            p_wrk_lbdreprs     IN OUT lbpks_lbdreprs_main.ty_lbdreprs,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Validate_Items(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_Child_Function   IN VARCHAR2,
                             p_lbdreprs         IN lbpks_lbdreprs_main.ty_lbdreprs,
                             p_prev_lbdreprs    IN OUT lbpks_lbdreprs_main.ty_lbdreprs,
                             p_wrk_lbdreprs     IN OUT lbpks_lbdreprs_main.ty_lbdreprs,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION Fn_liqd_int_Y_valdations(p_Source           IN VARCHAR2,
                                    p_Source_Operation IN VARCHAR2,
                                    p_Function_Id      IN VARCHAR2,
                                    p_Action_Code      IN VARCHAR2,
                                    /* p_Child_Function   IN VARCHAR2,*/
                                    p_lbdreprs      IN lbpks_lbdreprs_main.ty_lbdreprs,
                                    p_prev_lbdreprs IN OUT lbpks_lbdreprs_main.ty_lbdreprs,
                                    p_wrk_lbdreprs  IN OUT lbpks_lbdreprs_main.ty_lbdreprs,
                                    p_Err_Code      IN OUT VARCHAR2,
                                    p_Err_Params    IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Reopen_Record(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Child_Function   IN VARCHAR2,
                            p_Multi_Trip_Id    IN VARCHAR2,
                            p_lbdreprs         IN lbpks_lbdreprs_Main.ty_lbdreprs,
                            p_Prev_lbdreprs    IN lbpks_lbdreprs_Main.ty_lbdreprs,
                            p_Wrk_lbdreprs     IN OUT lbpks_lbdreprs_Main.ty_lbdreprs,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

 FUNCTION Fn_On_Query(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Child_Function   IN VARCHAR2,
                       p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                       p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                       p_QryData_Reqd     IN VARCHAR2,
                       p_lbdreprs         IN lbpks_lbdreprs_main.ty_lbdreprs,
                       p_wrk_lbdreprs     IN OUT lbpks_lbdreprs_main.ty_lbdreprs,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_err_params       IN OUT VARCHAR2) RETURN BOOLEAN ;


  FUNCTION Fn_Populate_Items(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_Child_Function   IN VARCHAR2,
                             p_pk_or_full       IN VARCHAR2 DEFAULT 'FULL',
                             p_lbdreprs         IN OUT lbpks_lbdreprs_Main.ty_lbdreprs,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

FUNCTION Fn_Insert_Items(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Child_Function   IN VARCHAR2,
                           p_Multi_Trip_Id    IN VARCHAR2,
                           p_lbdreprs         IN lbpks_lbdreprs_main.ty_lbdreprs,
                           p_prev_lbdreprs    IN lbpks_lbdreprs_main.ty_lbdreprs,
                           p_wrk_lbdreprs     IN OUT lbpks_lbdreprs_main.ty_lbdreprs,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2)
                            RETURN BOOLEAN ;
 FUNCTION Fn_Def_Rates_Pickup(Pcontract         IN oltbs_contract.Contract_Ref_No%TYPE,
                               Pccy              IN oltbs_contract.Contract_Ccy%TYPE,
                               Pbranch           IN oltbs_contract.Branch%TYPE,
                               Psplit_Serialno   IN oltbs_contract_split_master.Split_Serial_No%TYPE,
                               Pproduct          IN oltbs_contract.Product_Code%TYPE,
                               p_Serial_No       IN oltbs_contract_split_detail.Serial_No%TYPE,
                               Pamount           IN oltbs_contract_split_detail.Amount%TYPE,
                               Pcont_Tenor       IN oltbs_split_product_intcomps.Reset_Tenor%TYPE,
                               Pvalue_Date       IN DATE,
                               p_lbdreprs        IN OUT lbpks_lbdreprs_main.ty_lbdreprs,
                               p_Borrow_Lend_Ind IN VARCHAR2,
                               p_Rate_Calc_Type  IN VARCHAR2,
                               p_Err_Code        IN OUT VARCHAR2,
                               p_Err_Params      IN OUT VARCHAR2)

							    RETURN BOOLEAN;

       PROCEDURE PR_MRG_COMP_PICKUP(p_wrk_lbdreprs     IN OUT lbpks_lbdreprs_main.ty_lbdreprs,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2,
                               p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2);

          PROCEDURE PR_INT_COMP_PICKUP(p_wrk_lbdreprs     IN OUT lbpks_lbdreprs_main.ty_lbdreprs,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2,
                               p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2);
				--12.4_25983705 starts
              FUNCTION Fn_Reverse_Record(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_lbdreprs         IN lbpks_lbdreprs_Main.ty_lbdreprs,
                            p_Wrk_lbdreprs     IN OUT lbpks_lbdreprs_Main.ty_lbdreprs,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
	--12.4_25983705 ends

        FUNCTION Fn_Delete_Record(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_lbdreprs         IN lbpks_lbdreprs_Main.ty_lbdreprs,
                            p_Wrk_lbdreprs     IN OUT lbpks_lbdreprs_Main.ty_lbdreprs,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;


 FUNCTION Fn_Subsystem_Pickup(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_code      IN VARCHAR2,
                                 p_lbdreprS        IN lbpks_lbdreprS_Main.Ty_lbdreprs,
                                 p_Prev_lbdreprs    IN OUT lbpks_lbdreprS_Main.Ty_lbdreprS,
                                 p_wrk_lbdreprs     IN OUT lbpks_lbdreprS_Main.Ty_lbdreprS,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2)
      RETURN BOOLEAN ;
FUNCTION fn_date_validation(p_effective_date IN DATE,
                              p_tenor_value    IN OUT NUMBER,
                              p_tenor_unit     IN OUT VARCHAR2,
                              p_eff_end_date   IN OUT DATE,
                              p_char_date      IN OUT VARCHAR2,
                              p_err_code       IN OUT VARCHAR2,
                              p_err_prms       IN OUT VARCHAR2,
                              l_contract       IN OUT VARCHAR2)
    RETURN BOOLEAN;
FUNCTION fn_validate(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Child_Function   IN VARCHAR2,
                       p_lbdreprs         IN lbpks_lbdreprs_Main.Ty_lbdreprs,
                       p_Prev_lbdreprs    IN OUT lbpks_lbdreprs_Main.Ty_lbdreprs,
                       p_Wrk_lbdreprs     IN OUT lbpks_lbdreprs_Main.Ty_lbdreprs,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
FUNCTION fn_validate_exchange_rate(p_Source    IN  VARCHAR2,
                       p_Source_Operation  IN     VARCHAR2,
                       p_Function_Id       IN     VARCHAR2,
                       p_Action_Code       IN     VARCHAR2,
                       p_Child_Function    IN  VARCHAR2,
                       p_lbdreprs IN   lbpks_lbdreprs_Main.Ty_lbdreprs,
                       p_Prev_lbdreprs IN OUT lbpks_lbdreprs_Main.Ty_lbdreprs,
                       p_Wrk_lbdreprs IN OUT  lbpks_lbdreprs_Main.Ty_lbdreprs,
                       p_Err_Code       IN  OUT VARCHAR2,
                       p_Err_Params     IN  OUT VARCHAR2) RETURN BOOLEAN;
FUNCTION fn_validate_rate_setting(p_Source    IN  VARCHAR2,
                      p_Source_Operation  IN     VARCHAR2,
                      p_Function_Id       IN     VARCHAR2,
                      p_Action_Code       IN     VARCHAR2,
                      p_Child_Function    IN  VARCHAR2,
                      p_lbdreprs IN   lbpks_lbdreprs_Main.Ty_lbdreprs,
                      p_Prev_lbdreprs IN OUT lbpks_lbdreprs_Main.Ty_lbdreprs,
                      p_Wrk_lbdreprs IN OUT  lbpks_lbdreprs_Main.Ty_lbdreprs,
                      p_Err_Code       IN  OUT VARCHAR2,
                      p_Err_Params     IN  OUT VARCHAR2)RETURN BOOLEAN;
         ---14.1_SUP_EL_BLOCK_REF_CHANGES start --
   FUNCTION fn_update_el_limittrack_process(
									                     p_Wrk_lbdreprs    IN OUT lbpks_lbdreprs_Main.ty_lbdreprs,
                                       p_outstanding_Amt    IN  Oltbs_Contract_Master.Amount%TYPE,
                                       p_error_code      IN OUT VARCHAR2,
                                       p_error_parameter IN OUT VARCHAR2)
    RETURN BOOLEAN;
    ----14.1_SUP_EL_BLOCK_REF_CHANGES start end

--Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R721 FS Vol1 Tag06 Changes starts
PROCEDURE PR_BA_Details_PICKUP(p_wrk_lbdreprs     IN OUT lbpks_lbdreprs_main.ty_lbdreprs,
                               p_Err_Code         IN OUT VARCHAR2,
                               p_Err_Params       IN OUT VARCHAR2,
                               p_Source           IN VARCHAR2,
                               p_Source_Operation IN VARCHAR2,
                               p_Function_Id      IN VARCHAR2,
                               p_Action_Code      IN VARCHAR2);
--Oracle FLEXCUBE Universal Banking 3.3.0.0.0CITI_R721 FS Vol1 Tag06 Changes ends

--OBCL_14.3_LS_Sublimit_Validation_Changes starts

  FUNCTION Fn_SUBLIMITS_CHECK(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_lbdreprs         IN lbpks_lbdreprs_Main.ty_lbdreprs,
                              p_Wrk_lbdreprs     IN OUT lbpks_lbdreprs_Main.ty_lbdreprs,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --OBCL_14.3_LS_Sublimit_Validation_Changes ends
  
    --OBCL_14.5_LS_Gateway Changes start
    FUNCTION fn_auto_auth(p_Source            IN VARCHAR2,
                        p_Source_Operation  IN VARCHAR2,
                        p_Function_Id       IN VARCHAR2,
                        p_Action_Code       IN VARCHAR2,
                        p_Child_Function    IN VARCHAR2,
                        p_Multi_Trip_Id     IN VARCHAR2,
                        p_lbdreprs          IN lbpks_lbdreprs_main.ty_lbdreprs,
                        p_Prev_lbdreprs     IN lbpks_lbdreprs_main.ty_lbdreprs,
                        p_Wrk_lbdreprs      IN OUT lbpks_lbdreprs_main.ty_lbdreprs,
                        p_Err_Code          IN OUT VARCHAR2,
                        p_Err_Params        IN OUT VARCHAR2) 
    RETURN BOOLEAN;
	--OBCL_14.5_LS_Gateway Changes end
	/*OBCL_14.5_LS_PARTICIPANT_BA_RATE_CHANGES STARTS*/
PROCEDURE Pr_insert_ba_part_dtls(p_Wrk_Lbdreprs     IN OUT Lbpks_Lbdreprs_Main.Ty_Lbdreprs,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2,
                                 p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN VARCHAR2);
PROCEDURE pr_get_BA_part_rate_Dtls(p_Main_Function    IN VARCHAR2,
  p_wrk_lbdreprs     IN OUT lbpks_lbdreprs_Main.Ty_lbdreprs);
 PROCEDURE PR_update_BORR_ba_rate(p_Main_Function IN SMTB_MENU.FUNCTION_ID%TYPE,
                               p_cont_ref_no  IN lbtbs_contract_part_ba_dtls.contract_ref_no%type,
                               p_wrk_lbdreprs IN  lbpks_lbdreprs_main.ty_lbdreprs
                              );
PROCEDURE PR_VALIDATE_PART_BA_DETAILs(p_Source IN VARCHAR2, --OBCL_14.5_LS_PARTICIPANT_BA_RATE_CHANGES
                                                            p_Function_Id IN VARCHAR2,
                                                            p_Wrk_lbdreprs      IN OUT lbpks_lbdreprs_main.ty_lbdreprs);
					  
	/*OBCL_14.5_LS_PARTICIPANT_BA_RATE_CHANGES ENDS*/							  
--OBCL_14.5_SMTB_#34487912 starts
FUNCTION Fn_Populate_Exrate_Details(p_Source           IN VARCHAR2,
                                      p_Source_Operation IN VARCHAR2,
                                      p_Function_Id      IN VARCHAR2,
                                      p_Action_Code      IN VARCHAR2,
                                         p_Lbdreprs         IN Lbpks_Lbdreprs_Main.Ty_Lbdreprs,  
                                       p_Prev_Lbdreprs    IN OUT Lbpks_Lbdreprs_Main.Ty_Lbdreprs,  
                                      p_Wrk_Lbdreprs IN OUT Lbpks_Lbdreprs_Main.Ty_Lbdreprs,
                                      p_Err_Code     IN OUT VARCHAR2,
                                      p_Err_Params   IN OUT VARCHAR2)
    RETURN BOOLEAN ;
--OBCL_14.5_SMTB_#34487912 ends

--Bug#34819588 Changes Start
FUNCTION Fn_RePopulate_RateFixing_Details(p_Source           IN VARCHAR2,
                                        p_Source_Operation IN VARCHAR2,
                                        p_Function_Id      IN VARCHAR2,
                                        p_Action_Code      IN VARCHAR2,
                                        p_Lbdreprs         IN Lbpks_Lbdreprs_Main.Ty_Lbdreprs,
                                        p_Prev_Lbdreprs    IN OUT Lbpks_Lbdreprs_Main.Ty_Lbdreprs,
                                        p_Wrk_Lbdreprs     IN OUT Lbpks_Lbdreprs_Main.Ty_Lbdreprs,
                                        p_Err_Code         IN OUT VARCHAR2,
                                        p_Err_Params       IN OUT VARCHAR2)
  RETURN BOOLEAN ;
--Bug#34819588 Changes END
  --Bug#36167935 ADDED STARTS 
    PROCEDURE Pr_Set_Skip_Kernel;
    PROCEDURE Pr_Set_Activate_Kernel;
    PROCEDURE Pr_Set_Skip_Cluster;
    PROCEDURE Pr_Set_Activate_Cluster;
    FUNCTION Fn_Skip_Kernel RETURN BOOLEAN;
    FUNCTION Fn_Skip_Cluster RETURN BOOLEAN;
    FUNCTION Fn_Skip_Custom RETURN BOOLEAN;   
  
  
  FUNCTION Fn_process_Margin_Comp(p_Source           IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_contract_ref_no IN VARCHAR2,
                                p_Split_Serial_No     IN NUMBER,
                                p_Split_Prod   IN VARCHAR2,
                                P_Serial_No      IN NUMBER,
                                p_Wrk_Lbdreprs IN OUT Lbpks_Lbdreprs_Main.Ty_Lbdreprs,
                                p_Err_Code     IN OUT VARCHAR2,
                                p_Err_Params   IN OUT VARCHAR2)
  RETURN BOOLEAN;
  --Bug#36167935 ADDED ENDS
END lbpks_lbdreprs_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdreprs_kernel FOR lbpks_lbdreprs_utils
/