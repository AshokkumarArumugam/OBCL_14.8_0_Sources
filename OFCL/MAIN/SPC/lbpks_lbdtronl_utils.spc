CREATE OR REPLACE PACKAGE lbpks_lbdtronl_utils AS
  /*-----------------------------------------------------------------------------------------------------
  **
  ** File Name  : lbpks_lbdtronl_utils.spc
  **
  ** Module     : LB
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
  
  Changed By         : Sowmya Bitra
  Changed On         : 14-Aug-2020
  Search String      : OBCL_14.1_SupportBug#31443785 Changes  
  Change Reason      : Code changes to default schedules. (forward port)

        **Changed By         : Pallavi R
        **Date               : 21-Feb-2022
        **Change Description : Changes done for Linkage Amount Changes
        **Search String      : OBCL_14.5_SMTB_#33864064 Changes
		
		
		 
    Changed By         : anusha K
  Date               : 16-May-2022	
  Change Description : increased variable length
  Search String      : OBCL_14.5_SUPP_SMTB_#34094682 CHANGES
  
  **Changed By         : Jayaram
  **Date               : 03-Apr-2024
  **Change Description : Component Wise Payment Details
  **Search String      : Bug#36459259
  
    Changed By       :Anusha k
  Changed on         :26-Nov-2024
  Change Description :added version no global variable
  Search String      :OBCL_14.7_#37247701 CHANGES
		
  -------------------------------------------------------------------------------------------------------
  */

  g_ccy_mnemonics                VARCHAR2(5) := 'TRUE';
  g_value_date_allowed_to_change VARCHAR2(5) := 'FALSE';
  g_redn_sch_def                 VARCHAR2(1) := 'N';
  g_schedules_exploded           VARCHAR2(5) := 'FALSE';
  g_redn_sch_exploded            VARCHAR2(5) := 'FALSE';
  g_comit_redn_sch_chng          VARCHAR2(5) := 'FALSE';
  g_borr_mnemonic_changed        VARCHAR2(1) := 'N';
  g_field_value_payoff_fee       varchar2(1000);
  g_field_value_ratevar          varchar2(1000);
  g_query_prev                   NUMBER(1) := 1;
  g_skip_subsys_val               VARCHAR2(1) := 'N';
  g_Ldtms_Product_Master Oltms_Product_Master_Ld%ROWTYPE; --OBCL_14.4_TAX_Changes
  g_prm_sch_defaulted          varchar2(1000) := 'FALSE'; --OBCL_14.1_SupportBug#31443785 Changes  
  G_ty_schedules               lbpks_lbdtronl_main.ty_tb_oltbs_contract_schedules; --OBCL_14.1_SupportBug#31443785 Changes Change
  g_Linkages_Action      VARCHAR2(20); --OBCL_14.5_SMTB_#33864064 Changes--OBCL_14.5_SUPP_SMTB_#34094682 CHANGES increased length
  g_version_no  oltb_Contract.LATEST_VERSION_NO%type; --OBCL_14.7_#37247701 CHANGES
  FUNCTION Fn_product_Default(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_lbdtronl         IN lbpks_lbdtronl_Main.Ty_lbdtronl,
                              p_Wrk_lbdtronl     IN OUT lbpks_lbdtronl_Main.Ty_lbdtronl,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_Default_and_validate(p_Source           IN VARCHAR2,
                                   p_Source_Operation IN VARCHAR2,
                                   p_Function_Id      IN VARCHAR2,
                                   p_Action_Code      IN VARCHAR2,
                                   p_lbdtronl         IN lbpks_lbdtronl_Main.Ty_lbdtronl,
                                   p_Prev_lbdtronl    IN lbpks_lbdtronl_Main.Ty_lbdtronl,
                                   p_Wrk_lbdtronl     IN OUT lbpks_lbdtronl_Main.Ty_lbdtronl,
                                   p_Err_Code         IN OUT VARCHAR2,
                                   p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION fn_unlock_preauth(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_lbdtronl         IN lbpks_lbdtronl_Main.Ty_lbdtronl,
                             p_Prev_lbdtronl    IN lbpks_lbdtronl_Main.Ty_lbdtronl,
                             p_Wrk_lbdtronl     IN OUT lbpks_lbdtronl_Main.Ty_lbdtronl,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;

  FUNCTION Fn_get_desc(p_Source           IN VARCHAR2,
                       p_Source_Operation IN VARCHAR2,
                       p_Function_Id      IN VARCHAR2,
                       p_Action_Code      IN VARCHAR2,
                       p_Wrk_lbdtronl     IN OUT lbpks_lbdtronl_Main.Ty_lbdtronl,
                       p_Err_Code         IN OUT VARCHAR2,
                       p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION fn_copy_tranche(p_Source           IN VARCHAR2,
                           p_Source_Operation IN VARCHAR2,
                           p_Function_Id      IN VARCHAR2,
                           p_Action_Code      IN VARCHAR2,
                           p_Wrk_lbdtronl     IN OUT lbpks_lbdtronl_Main.Ty_lbdtronl,
                           p_Err_Code         IN OUT VARCHAR2,
                           p_Err_Params       IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION fn_delete_tranche(p_Source           IN VARCHAR2,
                             p_Source_Operation IN VARCHAR2,
                             p_Function_Id      IN VARCHAR2,
                             p_Action_Code      IN VARCHAR2,
                             p_Wrk_lbdtronl     IN OUT lbpks_lbdtronl_Main.Ty_lbdtronl,
                             p_Err_Code         IN OUT VARCHAR2,
                             p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_sgen_ovd(p_Source       IN VARCHAR2,
                       p_Function_Id  IN VARCHAR2,
                       pContractRefNo IN oltbs_contract.contract_ref_no%Type,
                       pEsn           IN oltbs_contract.latest_event_seq_no%Type,
                       pSgenDate      IN Date) RETURN BOOLEAN;
  FUNCTION fn_reverse_tranche(p_Source           IN VARCHAR2,
                              p_Source_Operation IN VARCHAR2,
                              p_Function_Id      IN VARCHAR2,
                              p_Action_Code      IN VARCHAR2,
                              p_Wrk_lbdtronl     IN OUT lbpks_lbdtronl_Main.Ty_lbdtronl,
                              p_Err_Code         IN OUT VARCHAR2,
                              p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_validate_repay_sch(p_Source           IN VARCHAR2,
                                 p_Source_Operation IN VARCHAR2,
                                 p_Function_Id      IN VARCHAR2,
                                 p_Action_Code      IN VARCHAR2,
                                 p_lbdtronl    IN lbpks_lbdtronl_Main.Ty_lbdtronl,--ankk
                                 p_Prev_lbdtronl    IN lbpks_lbdtronl_Main.Ty_lbdtronl,
                                 p_Wrk_lbdtronl     IN OUT lbpks_lbdtronl_Main.Ty_lbdtronl,
                                 p_Err_Code         IN OUT VARCHAR2,
                                 p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_log_override(p_Source       IN VARCHAR2,
                           p_Function_Id  IN VARCHAR2,
                           p_Action_Code  IN VARCHAR2,
                           p_wrk_lbdtronl IN OUT lbpks_lbdtronl_main.ty_lbdtronl,
                           p_Err_Code     IN OUT VARCHAR2,
                           p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION Fn_version_Query(p_Source           IN VARCHAR2,
                            p_Source_Operation IN VARCHAR2,
                            p_Function_Id      IN VARCHAR2,
                            p_Action_Code      IN VARCHAR2,
                            p_Full_Data        IN VARCHAR2 DEFAULT 'Y',
                            p_With_Lock        IN VARCHAR2 DEFAULT 'N',
                            p_lbdtronl         IN lbpks_lbdtronl_Main.Ty_lbdtronl,
                            p_Wrk_lbdtronl     IN OUT lbpks_lbdtronl_Main.Ty_lbdtronl,
                            p_Err_Code         IN OUT VARCHAR2,
                            p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  FUNCTION fn_log_changes(p_Source       IN VARCHAR2,
                          p_Function_Id  IN VARCHAR2,
                          p_wrk_lbdtronl IN OUT lbpks_lbdtronl_main.ty_lbdtronl,
                          p_Err_Code     IN OUT VARCHAR2,
                          p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
  FUNCTION fn_validate_cif(p_Source       IN VARCHAR2,
                           p_Function_Id  IN VARCHAR2,
                           p_wrk_lbdtronl IN OUT lbpks_lbdtronl_main.ty_lbdtronl,
                           p_Err_Code     IN OUT VARCHAR2,
                           p_Err_Params   IN OUT VARCHAR2) RETURN BOOLEAN;
   --OBCL_14.0__ACC_COLLETRAL_LINK changes start --Bug 27484732 start
   FUNCTION Fn_Upload_Multiple_Linkages(p_Source       IN VARCHAR2,
                                    p_Function_Id  IN VARCHAR2,
                                    p_Action_Code  IN VARCHAR2,
                                    p_lbdtronl         IN lbpks_lbdtronl_Main.Ty_lbdtronl,
                                    p_Prev_lbdtronl    IN Lbpks_lbdtronl_Main.Ty_lbdtronl,
                                    p_Wrk_lbdtronl IN OUT Lbpks_lbdtronl_Main.Ty_lbdtronl,
                                    p_Err_Code     IN OUT VARCHAR2,
                                    p_Err_Params   IN OUT VARCHAR2) 
      RETURN BOOLEAN;
  --OBCL_14.0__ACC_COLLETRAL_LINK changes end --bug 27484732 end
  
  --OBCL_14.1_SupportBug#31443785 Changes Start
    PROCEDURE Pr_Create_Dflt_Schedules(p_Function_Id  IN VARCHAR2,
                                     p_Source       VARCHAR2,
                                     p_Wrk_Lbdtronl IN OUT Lbpks_Lbdtronl_Main.Ty_Lbdtronl,
                                     p_Action_Code  IN VARCHAR2);
  --OBCL_14.1_SupportBug#31443785 Changes End
  
  --Bug#32724405 - Front to back trace - Start
FUNCTION Fn_Update_RefNum(p_contract_ref_num IN VARCHAR2,
						  p_channel_ref_num  IN VARCHAR2,
						  p_process_ref_num  IN VARCHAR2,						  
						  p_Err_Code         IN OUT VARCHAR2,
						  p_Err_Params       IN OUT VARCHAR2)
RETURN BOOLEAN;
--Bug#32724405 - Front to back trace - End
  
  --Bug#36459259:Changes Starts here      
FUNCTION Fn_get_CompWisedetails(p_Source           IN VARCHAR2,
                                p_Source_Operation IN VARCHAR2,
                                p_Function_Id      IN VARCHAR2,
                                p_Action_Code      IN VARCHAR2,
                                p_Child_Function   IN VARCHAR2,                               
                                p_lbdtronl         IN Lbpks_Lbdtronl_Main.Ty_Lbdtronl,
                                p_Wrk_Lbdtronl     IN OUT Lbpks_Lbdtronl_Main.Ty_Lbdtronl,
                                p_Err_Code         IN OUT VARCHAR2,
                                p_Err_Params       IN OUT VARCHAR2)
    RETURN BOOLEAN;
  --Bug#36459259:Changes Ends here   
  
 
END lbpks_lbdtronl_utils;
/
CREATE OR REPLACE SYNONYM lbpkss_lbdtronl_utils FOR lbpks_lbdtronl_utils
/